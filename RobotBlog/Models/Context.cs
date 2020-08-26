
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace RobotBlog.Models
{
    public class Context : DbContext
    {
        private readonly IConfiguration _configuration;

        public DbSet<User> User { get; set; }

        public DbSet<BlogPost> BlogPost { get; set; }

        public Context(DbContextOptions<Context> dbContextOptions, IConfiguration configuration) : base(dbContextOptions)
        {
            _configuration = configuration;
            this.Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            var connectionString = _configuration["MySqlConnection"];
            builder.UseMySQL(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
                entity
                .HasMany(e => e.BlogPosts)
                .WithOne(u => u.User)
                .IsRequired();
            });

            builder.Entity<BlogPost>(entity =>
            {
                entity.HasMany(e => e.TranslatedBlogPosts).WithOne(e => e.BlogPost);
            });

            var user = new User
            {
                ID = 2,
                Email = "user@a",
                Username = "robotjatek",
                Password = "a",
                Role = Roles.User.ToString(),
                PreferredLanguage = "hu"
            };

            var admin = new User
            {
                ID = 1,
                Email = "admin@a",
                Username = "admin",
                Password = "a",
                Role = Roles.Admin.ToString(),
                PreferredLanguage = "en",
            };

            builder.Entity<User>().HasData(
                admin,
                user);

            builder.Entity<BlogPost>()
                .HasData(new
                {
                    BlogPostId = 1,
                    UserID = 1,
                    Date = System.DateTime.Now
                },
                new
                {
                    BlogPostId = 2,
                    UserID = 1,
                    Date = System.DateTime.Now
                });

            builder.Entity<TranslatedBlogPost>()
                .HasData(new
                {
                    ID = 1,
                    Language = "hu",
                    BlogPostID = 1,
                    Title = "Magyar cím",
                    Content = "Magyar tartalom"
                },
                new
                {
                    ID = 2,
                    Language = "en",
                    BlogPostID = 1,
                    Title = "English title",
                    Content = "English content"
                },
                new
                {
                    ID = 3,
                    Language = "en",
                    BlogPostID = 2,
                    Title = "English title2",
                    Content = "English content2\r\n*Second Paragraph*"
                });
        }
    }
}
