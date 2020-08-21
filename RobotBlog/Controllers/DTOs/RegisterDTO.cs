using System.ComponentModel.DataAnnotations;

namespace RobotBlog.Controllers.DTOs
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; } //TODO: hash this
    }
}
