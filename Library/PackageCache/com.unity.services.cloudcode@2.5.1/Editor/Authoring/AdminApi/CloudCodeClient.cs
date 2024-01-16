using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Client;
using Unity.Services.CloudCode.Authoring.Client.Apis.Default;
using Unity.Services.CloudCode.Authoring.Client.Default;
using Unity.Services.CloudCode.Authoring.Client.Http;
using Unity.Services.CloudCode.Authoring.Client.Models;
using Unity.Services.CloudCode.Authoring.Editor.Core.Bundling;
using Unity.Services.CloudCode.Authoring.Editor.Core.Deployment;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.IO;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Clients;
using Unity.Services.Core.Editor;
using CoreLanguage = Unity.Services.CloudCode.Authoring.Editor.Core.Model.Language;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    class CloudCodeClient : ICloudCodeScriptsClient
    {
        const string k_ContentType = "Content-Type";
        const string k_ProblemJson = "application/problem+json";
        const int k_DuplicatePublishCode = 9018;

        readonly IAccessTokens m_TokenProvider;
        readonly IDefaultApiClient m_Client;
        readonly IEnvironmentProvider m_EnvironmentProvider;
        readonly IProjectIdProvider m_ProjectIdProvider;
        readonly IScriptBundler m_Bundler;
        readonly IFileReader m_FileReader;

        public CloudCodeClient(
            IAccessTokens tokenProvider,
            IEnvironmentProvider environmentProvider,
            IProjectIdProvider projectIdProvider,
            IDefaultApiClient client,
            IScriptBundler bundler,
            IFileReader fileReader)
        {
            m_TokenProvider = tokenProvider;
            m_Client = client;
            m_EnvironmentProvider = environmentProvider;
            m_ProjectIdProvider = projectIdProvider;
            m_Bundler = bundler;
            m_FileReader = fileReader;
        }

        public async Task<ScriptName> UploadFromFile(IScript script)
        {
            await UpdateToken();
            if (!await ScriptExists(script.Name))
            {
                EnsureSuccess(script.Name, await CreateScript(script));
            }
            else
            {
                EnsureSuccess(script.Name, await UpdateScript(script));
            }

            return script.Name;
        }

        public async Task Publish(ScriptName scriptName)
        {
            await UpdateToken();
            var request = new PublishScriptRequest(
                m_ProjectIdProvider.ProjectId,
                m_EnvironmentProvider.Current,
                scriptName.GetNameWithoutExtension());

            var res = await WrapRequest(m_Client.PublishScriptAsync(request));

            var isDuplicateError = res is IProblemJsonResponse problem && IsDuplicatePublishError(problem.ProblemJson);
            if (!isDuplicateError)
            {
                EnsureSuccess(scriptName, res);
            }
        }

        static bool IsDuplicatePublishError(ProblemJson problemJson)
        {
            return problemJson.Code == k_DuplicatePublishCode;
        }

        public async Task Delete(ScriptName scriptName)
        {
            await UpdateToken();
            var request = new DeleteScriptRequest(m_ProjectIdProvider.ProjectId, m_EnvironmentProvider.Current, scriptName.GetNameWithoutExtension());
            var res = await WrapRequest(m_Client.DeleteScriptAsync(request));
            EnsureSuccess(scriptName, res);
        }

        public async Task<IScript> Get(ScriptName scriptName)
        {
            await UpdateToken();
            var request = new GetScriptRequest(m_ProjectIdProvider.ProjectId, m_EnvironmentProvider.Current, scriptName.GetNameWithoutExtension());
            var res = await WrapRequest(m_Client.GetScriptAsync(request));

            EnsureSuccess(scriptName, res);

            var name = new ScriptName(res.Result.Name);
            var body = res.Result.ActiveScript.Code;
            var parameters = res.Result.Params
                .Select(p => p.ToCloudCodeParameter())
                .ToList();
            return new Script(name, body, parameters);
        }

        public async Task<List<ScriptInfo>> ListScripts()
        {
            await UpdateToken();
            var offset = 0;
            var limit = 100;
            var results = new List<CloudCodeListScriptsResponseResultsInner>();
            int resultsCount;

            do
            {
                var request = new ListScriptsRequest(m_ProjectIdProvider.ProjectId, m_EnvironmentProvider.Current, offset: offset, limit: limit);
                var res = await WrapRequest(m_Client.ListScriptsAsync(request));

                EnsureSuccess(new ScriptName(string.Empty), res);
                resultsCount = res.Result.Results.Count;
                results.AddRange(res.Result.Results);
                offset += limit;
            }
            while (resultsCount == limit);

            var scriptInfos = new List<ScriptInfo>();

            foreach (var entry in results)
            {
                scriptInfos.Add(ScriptInfoFromResponse(entry));
            }

            return scriptInfos;
        }

        async Task UpdateToken()
        {
            var client = m_Client as DefaultApiClient;
            if (client == null)
                return;

            string token = await m_TokenProvider.GetServicesGatewayTokenAsync();
            var headers = new AdminApiHeaders<CloudCodeClient>(token);
            client.Configuration = new Configuration(
                null,
                null,
                null,
                headers.ToDictionary());
        }

        static ScriptInfo ScriptInfoFromResponse(CloudCodeListScriptsResponseResultsInner response)
        {
            return new ScriptInfo(
                response.Name,
                CloudCodeFileExtensions.Preferred(),
                response.LastPublishedDate.ToString(),
                (CoreLanguage)response.Language);
        }

        async Task<Response> CreateScript(IScript script)
        {
            var(source, scriptParameters) = await GetScriptSource(script);

            var createScript = new CloudCodeCreateScriptRequest(
                script.Name.GetNameWithoutExtension(),
                CloudCodeCreateScriptRequest.TypeOptions.API,
                source,
                scriptParameters);
            var request = new CreateScriptRequest(m_ProjectIdProvider.ProjectId, m_EnvironmentProvider.Current, createScript);
            return await WrapRequest(m_Client.CreateScriptAsync(request));
        }

        async Task<Response> UpdateScript(IScript script)
        {
            var(source, scriptParameters) = await GetScriptSource(script);

            var updateScript = new CloudCodeUpdateScriptRequest(
                scriptParameters,
                source);
            var request = new UpdateScriptRequest(m_ProjectIdProvider.ProjectId, m_EnvironmentProvider.Current, script.Name.GetNameWithoutExtension(), updateScript);
            return await WrapRequest(m_Client.UpdateScriptAsync(request));
        }

        async Task<(string, List<CloudCodeScriptParams>)> GetScriptSource(IScript script)
        {
            var source = await m_Bundler.ShouldBeBundled(script.Path, CancellationToken.None)
                ? (await m_Bundler.Bundle(script.Path, CancellationToken.None)).Source
                : await m_FileReader.ReadAllTextAsync(script.Path, CancellationToken.None);

            List<CloudCodeScriptParams> scriptParameters = script.GetCloudCodeScriptParamsList();
            return (source, scriptParameters);
        }

        async Task<bool> ScriptExists(ScriptName scriptName)
        {
            var existsRequest = new GetScriptRequest(m_ProjectIdProvider.ProjectId, m_EnvironmentProvider.Current, scriptName.GetNameWithoutExtension());
            var res = await WrapRequest(m_Client.GetScriptAsync(existsRequest));
            switch (res.Status)
            {
                case (int)HttpStatusCode.OK:
                    return true;
                case (int)HttpStatusCode.NotFound:
                    return false;
                default:
                    throw new UnexpectedRemoteStatusCodeException(res.Status);
            }
        }

        static async Task<Response> WrapRequest(Task<Response> request)
        {
            try
            {
                return await request;
            }
            catch (HttpException e)
            {
                if (HasProblemJson(e.Response))
                {
                    return new ProblemJsonResponse<object>(e.Response);
                }
                return new Response(e.Response);
            }
            catch (ResponseDeserializationException e)
            {
                if (HasProblemJson(e.response))
                {
                    return new ProblemJsonResponse<object>(e.response);
                }
                return new ProblemJsonDeserializationResponse<object>(e.response, e);
            }
        }

        static async Task<Response<T>> WrapRequest<T>(Task<Response<T>> request)
        {
            try
            {
                return await request;
            }
            catch (ResponseDeserializationException e)
            {
                if (HasProblemJson(e.response))
                {
                    return new ProblemJsonResponse<T>(e.response);
                }
                return new ProblemJsonDeserializationResponse<T>(e.response, e);
            }
            catch (HttpException e)
            {
                if (HasProblemJson(e.Response))
                {
                    return new ProblemJsonResponse<T>(e.Response);
                }
                return new Response<T>(e.Response, default);
            }
        }

        static bool HasProblemJson(HttpClientResponse response)
        {
            if (response.Headers != null && response.Headers.ContainsKey(k_ContentType))
            {
                var contentType = response?.Headers[k_ContentType];
                return contentType != null && contentType.StartsWith(k_ProblemJson);
            }

            return false;
        }

        static void EnsureSuccess(ScriptName scriptName, Response res)
        {
            if (res is IProblemJsonDeserializationResponse problemJsonDeserializationResponse)
            {
                throw new ProblemJsonDeserializationException(scriptName, problemJsonDeserializationResponse);
            }

            if (res is IProblemJsonResponse problemJsonResponse)
            {
                throw new ProblemJsonHttpException(scriptName, problemJsonResponse.ProblemJson, problemJsonResponse.HttpClientResponse);
            }

            if (res.Status >= 200 && res.Status <= 299)
            {
                return;
            }

            throw new UnexpectedRemoteStatusCodeException(res.Status);
        }
    }
}
