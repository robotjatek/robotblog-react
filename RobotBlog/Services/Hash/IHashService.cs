namespace RobotBlog.Services.Hash
{
    public interface IHashService
    {
        byte[] CreateSalt();

        string HashPassword(string password, byte[] salt);

        bool Verify(string dbPassword, string incomingPassword);
    }
}
