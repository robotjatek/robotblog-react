using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

using RobotBlog.Configuration;
using RobotBlog.Controllers.DTOs;
using RobotBlog.Models;
using RobotBlog.Services.Hash;
using RobotBlog.Services.Mail;

namespace RobotBlog.Services.Login
{
    public class LoginService : ILoginService
    {
        private readonly Context _context;
        private readonly IHashService _hashService;
        private readonly IMailService _mailService;
        private readonly UserConfiguration _userConfiguration;

        public LoginService(Context context, IHashService hashService, IMailService mailService, IOptions<UserConfiguration> userConfiguration)
        {
            _context = context;
            _hashService = hashService;
            _mailService = mailService;
            _userConfiguration = userConfiguration.Value;
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
            var salt = _hashService.CreateSalt();
            var hash = _hashService.HashPassword(registerDTO.Password, salt);

            var user = new User
            {
                Email = registerDTO.Email,
                Username = registerDTO.Username,
                PreferredLanguage = registerDTO.PreferredLanguage,
                Password = hash,
                Role = Roles.User.ToString(),
            };

            try
            {
                Validator.ValidateObject(user, new ValidationContext(user), true);
                var result = (await _context.User.AddAsync(user)).Entity;

                if (_userConfiguration.EmailActivationRequired)
                {
                    result.ActivationToken = Guid.NewGuid().ToString();
                    await _mailService.SendActivationEmail(result);
                }

                await _context.SaveChangesAsync();
                return result;
            }
            catch (DbUpdateException)
            {
                return null;
            }
        }

        public async Task Activate(string token)
        {
            var toActivate = await _context.User.FirstOrDefaultAsync(u => u.ActivationToken == token);
            if (toActivate == null)
            {
                throw new ActivationFailedException();
            }

            toActivate.ActivationToken = null;
            await _context.SaveChangesAsync();
        }

        public async Task ResetPassword(string token, string password)
        {
            var date = DateTime.Now.AddDays(-1);
            var toReset = await _context.User.FirstOrDefaultAsync(u =>
                u.PasswordResetToken == token &&
                u.PasswordResetTime != null &&
                date <= u.PasswordResetTime.Value);

            if (toReset == null)
            {
                throw new UnknownTokenException();
            }

            var salt = _hashService.CreateSalt();
            var hash = _hashService.HashPassword(password, salt);
            toReset.Password = hash;
            toReset.PasswordResetToken = null;
            toReset.PasswordResetTime = null;
            await _context.SaveChangesAsync();
        }

        public async Task SendPasswordResetMail(string email)
        {
            var toReset = await _context.User.FirstOrDefaultAsync(u => u.Email == email);
            if (toReset == null)
            {
                throw new UnknownAccountException();
            }

            var resetToken = Guid.NewGuid().ToString();
            var passwordResetTime = DateTime.Now;
            toReset.PasswordResetToken = resetToken;
            toReset.PasswordResetTime = passwordResetTime;
            await _context.SaveChangesAsync();

            await _mailService.SendPasswordResetEmail(toReset);
        }
    }
}
