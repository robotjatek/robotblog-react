using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RobotBlog.Models
{
    public enum Roles
    {
        Admin,
        User
    }

    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ID { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string Username { get; set; }

        [JsonIgnore]
        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        [DefaultValue("hu")]
        public string PreferredLanguage { get; set; }

        public ICollection<BlogPost> BlogPosts { get; set; }
    }
}
