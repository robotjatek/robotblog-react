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

        public MailService(IOptions<MailConfiguration> configuration)
        {
            _configuration = configuration.Value;
        }

        public async Task SendActivationEmail(User user)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("RobotBlog", _configuration.SenderMail));
            message.To.Add(new MailboxAddress(user.Username, user.Email));
            message.Subject = "RobotBlog - User activation";
            message.Body = new TextPart(TextFormat.Html)
            {
                Text = await CreateActivationEmailBody(user)
            };

            using var client = new SmtpClient();
            await client.ConnectAsync(_configuration.Host, _configuration.Port, _configuration.UseSSL);
            if (_configuration.UseAuthentication)
            {
                await client.AuthenticateAsync(_configuration.Username, _configuration.Password);
            }
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        private async Task<string> CreateActivationEmailBody(User user)
        {
            var language = user.PreferredLanguage ?? "en";
            var templatesPath = Path.Combine(Directory.GetCurrentDirectory(), "Templates");
            var translationPath = Path.Combine(templatesPath, "Activation", $"{language}.json");
            var translationJson = File.ReadAllText(translationPath);
            var translationDefinition = JsonConvert.DeserializeObject<Dictionary<string, string>>(translationJson);

            var templateEngine = new RazorLightEngineBuilder()
                .UseFileSystemProject(templatesPath)
                .UseMemoryCachingProvider()
                .Build();

            var model = new
            {
                user.Username
            };

            var translator = new EmailTranslator();
            var translatedModel = await translator.Translate(templateEngine, translationDefinition, model);
            translatedModel.Add(new KeyValuePair<string, object>("url", $"{_configuration.ActivationURL}/{user.ActivationToken}"));

            var result = await templateEngine.CompileRenderAsync("Activation/template.cshtml", translatedModel);
            return result;
        }
    }
}
