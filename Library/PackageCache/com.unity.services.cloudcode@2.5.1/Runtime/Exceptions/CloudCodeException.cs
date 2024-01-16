using System;
using System.Text;
using Unity.Services.CloudCode.Internal.Http;
using Unity.Services.CloudCode.Internal.Models;
using Unity.Services.Core;

namespace Unity.Services.CloudCode
{
    /// <summary>
    /// A machine-readable reason for which an exception was thrown, in case different failure modes require different follow-up actions.
    /// </summary>
    public enum CloudCodeExceptionReason
    {
        Unknown = 0,

        NoInternetConnection = 1,
        ProjectIdMissing = 2,
        PlayerIdMissing = 3,
        AccessTokenMissing = 4,
        InvalidArgument = 5,
        Unauthorized = 6,

        NotFound = 7,
        TooManyRequests = 8,
        ServiceUnavailable = 9,

        ScriptError = 10,

        SubscriptionError = 11
    }

    /// <summary>
    /// An exception specific to the Cloud Code service.
    /// </summary>
    public class CloudCodeException : RequestFailedException
    {
        private readonly string m_GivenMessage;

        /// <summary>
        /// The reason the exception was thrown, selected from the CloudCodeExceptionReason enum.
        /// </summary>
        public CloudCodeExceptionReason Reason { get; private set; }

        private CloudCodeException(CloudCodeExceptionReason reason, int errorCode, string message)
            : base(errorCode, message)
        {
            Reason = reason;
            m_GivenMessage = message;
        }

        internal CloudCodeException(CloudCodeExceptionReason reason, int errorCode, string message, Exception innerException)
            : base(errorCode, message, innerException)
        {
            Reason = reason;
            m_GivenMessage = message;
        }

        string m_Message = null;

        public override string ToString()
        {
            if (m_Message == null)
            {
                var sb = new StringBuilder();
                sb.AppendLine(Reason.ToString());

                if (InnerException is HttpException<BasicErrorResponse> err)
                {
                    AppendBasicHttpExceptionDetails(sb, err);
                }
                else if (InnerException is HttpException<ValidationErrorResponse> validationErr)
                {
                    AppendValidationHttpExceptionDetails(sb, validationErr);
                }
                else if (InnerException is HttpException<InvocationErrorResponse> invocationErr)
                {
                    AppendInvocationErrorExceptionDetails(sb, invocationErr);
                }
                else if (InnerException is HttpException httpException)
                {
                    sb.AppendLine(httpException.Response.ErrorMessage);
                }
                else
                {
                    if (m_GivenMessage != null)
                    {
                        sb.AppendLine(m_GivenMessage);
                    }
                    if (InnerException != null)
                    {
                        sb.AppendLine(InnerException.Message);
                    }
                }

                m_Message = sb.ToString();
                return m_Message;
            }

            return m_Message;
        }

        private static void AppendInvocationErrorExceptionDetails(StringBuilder sb, HttpException<InvocationErrorResponse> invocationErr)
        {
            sb.AppendLine(invocationErr.Message);

            if (invocationErr.ActualError != null)
            {
                sb.AppendLine(invocationErr.ActualError.Title);

                if (!String.IsNullOrEmpty(invocationErr.ActualError.Detail))
                {
                    sb.AppendLine(invocationErr.ActualError.Detail);
                }

                if (invocationErr.ActualError.Details != null)
                {
                    foreach (var errorMessage in invocationErr.ActualError.Details)
                    {
                        sb.AppendLine($"{errorMessage.Name}: {errorMessage.Message}");
                        sb.AppendLine($"{String.Join(Environment.NewLine + "  ", errorMessage.StackTrace)}");
                    }
                }
            }
        }

        private static void AppendValidationHttpExceptionDetails(StringBuilder sb, HttpException<ValidationErrorResponse> validationErr)
        {
            sb.AppendLine(validationErr.Message);

            if (validationErr.ActualError != null)
            {
                sb.AppendLine(validationErr.ActualError.Title);

                if (!String.IsNullOrEmpty(validationErr.ActualError.Detail))
                {
                    sb.AppendLine(validationErr.ActualError.Detail);
                }

                if (validationErr.ActualError.Errors != null)
                {
                    foreach (var errorMessage in validationErr.ActualError.Errors)
                    {
                        sb.AppendLine($"{errorMessage.Field}: {String.Join(",", errorMessage.Messages)}");
                    }
                }
            }
        }

        private static void AppendBasicHttpExceptionDetails(StringBuilder sb, HttpException<BasicErrorResponse> err)
        {
            sb.AppendLine(err.Message);

            if (err.ActualError != null)
            {
                sb.AppendLine(err.ActualError.Title);

                if (!String.IsNullOrEmpty(err.ActualError.Detail))
                {
                    sb.AppendLine(err.ActualError.Detail);
                }

                if (err.ActualError.Details != null)
                {
                    foreach (var errorMessage in err.ActualError.Details)
                    {
                        sb.AppendLine(errorMessage.GetAsString());
                    }
                }
            }
        }

        public override string Message => ToString();
    }
}
