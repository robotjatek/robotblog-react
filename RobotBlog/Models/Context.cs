using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace RobotBlog.Models
{
    public class Context : DbContext
    {
        private readonly IConfiguration _configuration;

        public DbSet<User> User { get; set; }

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
            });

            builder.Entity<User>().HasData(
                new User
                {
                    ID = 1,
                    Email = "admin@a",
                    Password = "a",
                    Role = Roles.Admin.ToString(),
                    PreferredLanguage = "en"
                },
                new User
                {
                    ID = 2,
                    Email = "user@a",
                    Password = "a",
                    Role = Roles.User.ToString(),
                    PreferredLanguage = "hu"
                });
        }
    }
}
