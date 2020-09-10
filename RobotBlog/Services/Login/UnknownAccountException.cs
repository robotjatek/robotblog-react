using System;
using System.Runtime.Serialization;

namespace RobotBlog.Services.Login
{
    public class UnknownAccountException : Exception
    {
        public UnknownAccountException()
        {
        }

        public UnknownAccountException(string message) : base(message)
        {
        }

        public UnknownAccountException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected UnknownAccountException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
