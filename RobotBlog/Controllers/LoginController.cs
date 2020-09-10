using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using RobotBlog.Controllers.DTOs;
using RobotBlog.Models;
using RobotBlog.Services.Login;

namespace RobotBlog.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILoginService _loginService;

        public LoginController(IConfiguration configuration, ILoginService loginService)
        {
            _configuration = configuration;
            _loginService = loginService;
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> Protected()
        {
            var result = await Task.FromResult("hello");
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Authenticate([FromBody] LoginDTO login)
        {
            var user = await _loginService.Login(login.Email, login.Password);

            if (user == null)
            {
                return Unauthorized(new LoginErrorDTO
                {
                    Reason = LoginErrorReason.UnkownUser
                });
            }

            if (user.ActivationToken != null)
            {
                return StatusCode(403, new LoginErrorDTO
                {
                    Reason = LoginErrorReason.Inactive
                });
            }

            var token = this.GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user
            });
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterDTO registerDTO)
        {
            var user = await _loginService.Register(registerDTO);
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Activate([FromBody] ActivationDTO dto)
        {
            await _loginService.Activate(dto.Token);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PasswordReset([FromBody] PasswordResetDTO dto)
        {
            try
            {
                await _loginService.ResetPassword(dto.Token, dto.Password);
                return Ok();
            }
            catch (UnknownTokenException)
            {
                return Unauthorized(new
                {
                    Reason = "invalid-token"
                });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> RequestResetMail([FromBody] PasswordResetRequestDTO dto)
        {
            try
            {
                await _loginService.SendPasswordResetMail(dto.Email);
                return Ok();
            }
            catch (UnknownAccountException)
            {
                return Unauthorized(new
                {
                    Reason = "invalid-user"
                });
            }
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creditentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var issuer = _configuration["Jwt:Issuer"];

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Make jwt token unique
                new Claim("role", user.Role)
            };

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: issuer,
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creditentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
