using System.Threading.Tasks;

using RobotBlog.Models;

namespace RobotBlog.Services.Mail
{
    public interface IMailService
    {
        Task SendActivationEmail(User user);

        Task SendPasswordResetEmail(User user);
    }
}
