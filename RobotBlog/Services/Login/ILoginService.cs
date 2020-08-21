using System.Threading.Tasks;

using RobotBlog.Controllers.DTOs;
using RobotBlog.Models;

namespace RobotBlog.Services.Login
{
    public interface ILoginService
    {
        Task<User> Login(string email, string password);

        Task<User> Register(RegisterDTO registerDTO);
    }
}