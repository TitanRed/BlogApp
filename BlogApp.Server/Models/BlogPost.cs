namespace BlogApp.Server.Models
{
    public class BlogPost
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Author { get; set; } = null!;

        public string? Usertk { get; set; }

        public string Category { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime? CreatedAt { get; set; }

    }
}
