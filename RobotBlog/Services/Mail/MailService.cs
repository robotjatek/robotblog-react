using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

using MailKit.Net.Smtp;

using Microsoft.Extensions.Options;

using MimeKit;
using MimeKit.Text;

using Newtonsoft.Json;

using RazorLight;

using RobotBlog.Configuration;
using RobotBlog.Models;

namespace RobotBlog.Services.Mail
{
    public class MailService : IMailService
    {
        private readonly MailConfiguration _configuration;
        private readonly EmailTranslator _emailTranslator;
        private readonly RazorLightEngine _templateEngine;

        public MailService(IOptions<MailConfiguration> configuration, EmailTranslator emailTranslator, RazorLightEngine templateEngine)
        {
            _configuration = configuration.Value;
            _emailTranslator = emailTranslator;
            _templateEngine = templateEngine;
        }

        public async Task SendActivationEmail(User user)
        {
            var messageBody = await CreateActivationEmailBody(user);
            var message = CreateMessage("RobotBlog - User activation", "RobotBlog", _configuration.SenderMail, user, messageBody);
            await ConnectAndSend(message);
        }

        public async Task SendPasswordResetEmail(User user)
        {
            var messageBody = await CreatePasswordResetEmailBody(user);
            var message = CreateMessage("RobotBlog - Password reset", "RobotBlog", _configuration.SenderMail, user, messageBody);
            await ConnectAndSend(message);
        }

        private MimeMessage CreateMessage(string subject, string sender, string senderMail, User recipient, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(sender, senderMail));
            message.To.Add(new MailboxAddress(recipient.Username, recipient.Email));
            message.Subject = subject;
            message.Body = new TextPart(TextFormat.Html)
            {
                Text = body
            };

            return message;
        }

        private async Task<string> CreateActivationEmailBody(User user)
        {
            var language = user.PreferredLanguage ?? "en";
            var translationDefinition = LoadTranslationDefinition(language, "Activation");

            var model = new
            {
                user.Username
            };

            var translatedModel = await _emailTranslator.Translate(_templateEngine, translationDefinition, model, language, "activation");
            translatedModel.Add(new KeyValuePair<string, object>("url", $"{_configuration.ActivationURL}/{user.ActivationToken}"));

            var result = await _templateEngine.CompileRenderAsync("template.cshtml", translatedModel);
            return result;
        }

        private async Task<string> CreatePasswordResetEmailBody(User user)
        {
            var language = user.PreferredLanguage ?? "en";
            var translationDefinition = LoadTranslationDefinition(language, "PasswordReset");

            var model = new
            {
                user.Username
            };
            var translatedModel = await _emailTranslator.Translate(_templateEngine, translationDefinition, model, language, "password-reset");
            translatedModel.Add(new KeyValuePair<string, object>("url", $"{_configuration.PasswordResetURL}/{user.PasswordResetToken}"));

            var result = await _templateEngine.CompileRenderAsync("template.cshtml", translatedModel);
            return result;
        }

        private Dictionary<string, string> LoadTranslationDefinition(string language, string translationFolder)
        {
            var templatesPath = Path.Combine(Directory.GetCurrentDirectory(), "Templates");
            var translationPath = Path.Combine(templatesPath, translationFolder, $"{language}.json");
            var translationJson = File.ReadAllText(translationPath);
            var translationDefinition = JsonConvert.DeserializeObject<Dictionary<string, string>>(translationJson);

            return translationDefinition;
        }

        private async Task ConnectAndSend(MimeMessage message)
        {
            using var client = new SmtpClient();
            await client.ConnectAsync(_configuration.Host, _configuration.Port, _configuration.UseSSL);
            if (_configuration.UseAuthentication)
            {
                await client.AuthenticateAsync(_configuration.Username, _configuration.Password);
            }
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
