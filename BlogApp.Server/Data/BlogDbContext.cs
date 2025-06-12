using BlogApp.Server.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BlogApp.Server.Data
{
    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options)
            : base(options) { }

        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<User> Users { get; set; }

        // To be added later:
        // public DbSet<Admin> Admins { get; set; }
    }
}
