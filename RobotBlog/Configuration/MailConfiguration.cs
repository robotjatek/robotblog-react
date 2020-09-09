namespace RobotBlog.Configuration
{
    public class MailConfiguration
    {
        public const string SECTION = "Mail";

        public string Host { get; set; }
        public int Port { get; set; }
        public bool UseSSL { get; set; }
        public bool UseAuthentication { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string SenderMail { get; set; }
        public string ActivationURL { get; set; }
        public string PasswordResetURL { get; set; }
    }
}
