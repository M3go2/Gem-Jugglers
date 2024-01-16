using System;
using Unity.Services.CloudCode.Authoring.Client.Http;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    interface IProblemJsonDeserializationResponse
    {
        public ProblemJson ProblemJson { get; }
        public HttpClientResponse HttpClientResponse { get; }
        public Exception OriginalException { get; }
    }

    class ProblemJsonDeserializationResponse<T> : ProblemJsonResponse<T>, IProblemJsonDeserializationResponse
    {
        public ProblemJsonDeserializationResponse(
            HttpClientResponse clientResponse,
            Exception originalException)
            : base(clientResponse)
        {
            OriginalException = originalException;
        }

        public Exception OriginalException { get; }
    }
}
