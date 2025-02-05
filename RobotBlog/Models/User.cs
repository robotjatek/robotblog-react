﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Newtonsoft.Json;

namespace RobotBlog.Models
{
    public enum Roles
    {
        Admin,
        User
    }

    public class User
    {
        public User()
        {
            PreferredLanguage = "hu"; //TODO: remove constructor when the PreferredLanguage setting is exposed on the frontend
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ID { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        [JsonIgnore]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public string PreferredLanguage { get; set; }

        public ICollection<BlogPost> BlogPosts { get; set; }

        public string ActivationToken { get; set; }

        public string PasswordResetToken { get; set; }

        public DateTime? PasswordResetTime { get; set; }
    }
}
