using System.ComponentModel.DataAnnotations;

namespace RobotBlog.Controllers.DTOs
{
    public class PasswordResetRequestDTO
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}
