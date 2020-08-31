using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using RobotBlog.Controllers.DTOs;
using RobotBlog.Models;
using RobotBlog.Services.Hash;

namespace RobotBlog.Services.Login
{
    public class LoginService : ILoginService
    {
        private readonly Context _context;
        private readonly IHashService _hashService;

        public LoginService(Context context, IHashService hashService)
        {
            _context = context;
            _hashService = hashService;
        }

        public async Task<User> Login(string email, string password)
        {
            var result = await _context.User
                .Include(u => u.BlogPosts)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (result != null && _hashService.Verify(result.Password, password))
            {
                return result;
            }

            return null;
        }

        public async Task<User> Register(RegisterDTO registerDTO)
        {
            //TODO: activation email
            User result;
            var salt = _hashService.CreateSalt();
            var hash = _hashService.HashPassword(registerDTO.Password, salt);
            var user = new User
            {
                Email = registerDTO.Email,
                Password = hash,
                Role = Roles.User.ToString()
            };

            try
            {
                Validator.ValidateObject(user, new ValidationContext(user), true);
                result = (await _context.User.AddAsync(user)).Entity;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                result = null;
            }

            return result;
        }
    }
}
