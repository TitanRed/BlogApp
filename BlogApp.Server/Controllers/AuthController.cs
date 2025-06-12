using BlogApp.Server.Data;
using BlogApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly BlogDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(BlogDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            return BadRequest("User already exists");

        var user = new User
        {
            Email = dto.Email,
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "user"
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto userDto)
    {
        try
        {
            Console.WriteLine($"[Login Attempt] Email: {userDto.Email}, Password: {userDto.Password}");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (user == null)
            {
                Console.WriteLine("User not found.");
                return Unauthorized("Invalid email or password");
            }

            Console.WriteLine($"[DB PasswordHash] {user.PasswordHash}");

            bool passwordMatch = BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash);
            Console.WriteLine($"[Password Match] {passwordMatch}");

            if (!passwordMatch)
                return Unauthorized("Invalid email or password");

            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("Username", user.Username)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            string generatedToken = new JwtSecurityTokenHandler().WriteToken(token);
            Console.WriteLine($"[Generated Token] {generatedToken}");

            return Ok(new { token = generatedToken });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Login Error] {ex.Message}");
            return StatusCode(500, "Internal Server Error: " + ex.Message);
        }
    }

    [Authorize]
    [HttpPost("become-admin")]
    public async Task<IActionResult> BecomeAdmin()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId)) return Unauthorized();

        var user = await _context.Users.FindAsync(int.Parse(userId));
        if (user == null) return Unauthorized();

        user.Role = "admin";
        user.Username = "admin";

        await _context.SaveChangesAsync();

        return Ok(new { message = "You are now an admin." });
    }



}
