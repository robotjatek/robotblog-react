using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace RobotBlog.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> BlogPosts(int page)
        {
            var result = await _blogService.GetBlogPosts(page);
            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> BlogPost(int id)
        {
            var result = await _blogService.GetBlogPost(id);
            return Ok(result);
        }
    }
}
