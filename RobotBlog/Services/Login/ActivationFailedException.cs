using System;
using System.Runtime.Serialization;

namespace RobotBlog.Services.Login
{
    public class ActivationFailedException : Exception
    {
        public ActivationFailedException()
        {
        }

        public ActivationFailedException(string message) : base(message)
        {
        }

        public ActivationFailedException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected ActivationFailedException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
