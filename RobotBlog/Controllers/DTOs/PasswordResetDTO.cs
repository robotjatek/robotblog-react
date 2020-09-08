using System.ComponentModel.DataAnnotations;

namespace RobotBlog.Controllers.DTOs
{
    public class PasswordResetDTO
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
