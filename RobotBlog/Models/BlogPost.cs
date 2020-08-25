using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RobotBlog.Models
{
    public class BlogPost
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? BlogPostId { get; set; }

        public int UserID { get; set; }

        public User User { get; set; }

        public DateTime Date { get; set; }

        public ICollection<TranslatedBlogPost> TranslatedBlogPosts { get; set; }
    }
}
