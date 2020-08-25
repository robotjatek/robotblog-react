namespace RobotBlog.Models
{
    public class TranslatedBlogPost
    {
        public int ID { get; set; }

        public string Language { get; set; }

        public int BlogPostID { get; set; }

        public BlogPost BlogPost { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
    }
}
