using BlogApp.Server.Data;
using BlogApp.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BlogApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogPostsController : ControllerBase
    {
        private readonly BlogDbContext _context;

        public BlogPostsController(BlogDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _context.BlogPosts.ToListAsync();
            return Ok(posts);
        }

        [HttpGet("myblogs")]
        [Authorize]
        public async Task<IActionResult> GetMyBlogs()
        {
            var username = User.FindFirst("Username")?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(role))
                return Unauthorized();

            List<BlogPost> posts;

            if (role == "admin")
            {
                posts = await _context.BlogPosts.ToListAsync();
            }
            else
            {
                posts = await _context.BlogPosts
                    .Where(p => p.Usertk == username)
                    .ToListAsync();
            }

            return Ok(posts);
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id);
            if (post == null) return NotFound();
            return Ok(post);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] BlogPost post)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User ID claim missing.");

            var user = await _context.Users.FindAsync(int.Parse(userId));
            if (user == null) return Unauthorized("User not found.");

            post.Author = post.Author;
            post.CreatedAt = DateTime.UtcNow;
            post.Usertk = user.Username;

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { message = "Invalid blog data", errors });
            }

            _context.BlogPosts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] BlogPost updated)
        {
            var post = await _context.BlogPosts.FindAsync(id);
            if (post == null) return NotFound();

            post.Title = updated.Title;
            post.Category = updated.Category;
            post.Description = updated.Description;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.BlogPosts.FindAsync(id);
            if (post == null) return NotFound();

            _context.BlogPosts.Remove(post);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
