using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using RobotBlog.Controllers;
using RobotBlog.Models;

namespace RobotBlog.Services.Blog
{
    public class BlogService : IBlogService
    {
        private static readonly int PAGE_SIZE = 10;
        private readonly Context _context;

        public BlogService(Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BlogPost>> GetBlogPosts(int page)
        {
            var result = await _context
                .BlogPost
                .Include(b => b.TranslatedBlogPosts)
                .Include(b => b.User)
                .OrderByDescending(b => b.BlogPostId)
                .Skip(page * PAGE_SIZE)
                .Take(PAGE_SIZE)
                .ToListAsync();
            return result;
        }

        public async Task<BlogPost> GetBlogPost(int id)
        {
            var result = await _context
                .BlogPost
                .Include(b => b.TranslatedBlogPosts)
                .Include(b => b.User)
                .FirstOrDefaultAsync(b => b.BlogPostId == id);
            return result;
        }
    }
}
