using System.Security.Cryptography;
using System.Text;

using Isopoh.Cryptography.Argon2;

namespace RobotBlog.Services.Hash
{
    public class HashService : IHashService
    {
        //TODO: Move these into a configuration file
        private const int _lanes = 12;
        private const int _threads = 12;
        private const int _cost = 4096;

        public byte[] CreateSalt()
        {
            var buffer = new byte[1024];
            using var rng = new RNGCryptoServiceProvider();
            rng.GetBytes(buffer);
            return buffer;
        }

        public string HashPassword(string password, byte[] salt)
        {
            var passwordBytes = Encoding.UTF8.GetBytes(password);

            var argonConfig = new Argon2Config
            {
                Lanes = _lanes,
                Threads = _threads,
                Password = passwordBytes,
                Salt = salt,
                MemoryCost = _cost,
            };

            using var argon = new Argon2(argonConfig);
            using var hash = argon.Hash();
            return argonConfig.EncodeString(hash.Buffer);
        }

        public bool Verify(string dbPassword, string incomingPassword)
        {
            return Argon2.Verify(dbPassword, incomingPassword);
        }
    }
}
