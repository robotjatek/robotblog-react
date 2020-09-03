namespace RobotBlog.Controllers.DTOs
{
    public static class LoginErrorReason
    {
        public const string UnkownUser = "UnknownUser";
        public const string Inactive = "InactiveUser";
    }

    public class LoginErrorDTO
    {
        public string Reason { get; set; }
    }
}
