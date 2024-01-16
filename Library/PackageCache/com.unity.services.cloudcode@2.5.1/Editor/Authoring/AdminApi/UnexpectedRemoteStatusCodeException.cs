using System;
using System.Net;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    class UnexpectedRemoteStatusCodeException : Exception
    {
        public readonly HttpStatusCode StatusCode;

        public UnexpectedRemoteStatusCodeException(long status) :
            base($"Received unexpected status code from cloud code server: {FormatStatusCode(status)}")
        {
            StatusCode = (HttpStatusCode)status;
        }

        static string FormatStatusCode(long status)
        {
            return $"{status} {(HttpStatusCode)status}";
        }
    }
}
