using System;

namespace Unity.Services.CloudCode
{
    /// <summary>
    /// An exception that is thrown when the client has been rate limited.
    /// </summary>
    public class CloudCodeRateLimitedException : CloudCodeException
    {
        /// <summary>
        /// The number of seconds until the client is no longer rate limited.
        /// </summary>
        public int RetryAfter { get; private set; }

        internal CloudCodeRateLimitedException(CloudCodeExceptionReason reason, int errorCode, string message, Exception innerException, int retryAfter)
            : base(reason, errorCode, message, innerException)
        {
            RetryAfter = retryAfter;
        }
    }
}
