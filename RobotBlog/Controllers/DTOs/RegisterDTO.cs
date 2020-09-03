using System.ComponentModel.DataAnnotations;

using RobotBlog.Controllers.DTOs.Validators;

namespace RobotBlog.Controllers.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [StringRange(ValidValues = new[] { "hu", "en" })]
        public string PreferredLanguage { get; set; }
    }
}
