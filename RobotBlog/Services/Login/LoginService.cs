using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using RobotBlog.Controllers.DTOs;
using RobotBlog.Models;

namespace RobotBlog.Services.Login
{
    public class LoginService : ILoginService
    {
        private readonly Context _context;

        public LoginService(Context context)
        {
            _context = context;
        }

        public async Task<User> Login(string email, string password)
        {
            var result = await _context.User.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
            return result;
        }

        public async Task<User> Register(RegisterDTO registerDTO)
        {
            //TODO: activation email
            User result = null;

            var user = new User
            {
                Email = registerDTO.Email,
                Password = registerDTO.Password,
                Role = Roles.User.ToString()
            };

            try
            {
                Validator.ValidateObject(user, new ValidationContext(user), true);
                result = (await _context.User.AddAsync(user)).Entity;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException e)
            {
                result = null;
            }


            return result;
        }
    }
}
