using System.Collections.Generic;
using System.Threading.Tasks;

using RobotBlog.Models;

namespace RobotBlog.Controllers
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogPost>> GetBlogPosts(int page);

        Task<BlogPost> GetBlogPost(int id);
    }
}