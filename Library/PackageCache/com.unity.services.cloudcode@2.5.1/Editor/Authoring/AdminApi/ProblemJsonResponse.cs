using System.Text;
using Newtonsoft.Json;
using Unity.Services.CloudCode.Authoring.Client;
using Unity.Services.CloudCode.Authoring.Client.Http;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    interface IProblemJsonResponse
    {
        public ProblemJson ProblemJson { get; }
        public HttpClientResponse HttpClientResponse { get; }
    }

    class ProblemJsonResponse<T> : Response<T>, IProblemJsonResponse
    {
        public ProblemJson ProblemJson { get; }
        public HttpClientResponse HttpClientResponse { get; }

        public ProblemJsonResponse(HttpClientResponse clientResponse)
            : base(clientResponse, default)
        {
            var text = Encoding.UTF8.GetString(clientResponse.Data);
            ProblemJson = IsolatedJsonConvert.DeserializeObject<ProblemJson>(text, new JsonSerializerSettings());
            HttpClientResponse = clientResponse;
        }
    }
}
