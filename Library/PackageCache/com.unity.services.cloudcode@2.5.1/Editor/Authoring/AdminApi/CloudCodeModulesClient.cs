using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Client;
using Unity.Services.CloudCode.Authoring.Client.Apis.Default;
using Unity.Services.CloudCode.Authoring.Client.Default;
using Unity.Services.CloudCode.Authoring.Client.Http;
using Unity.Services.CloudCode.Authoring.Client.Models;
using Unity.Services.CloudCode.Authoring.Editor.Core.Deployment;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.IO;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Clients;
using Unity.Services.Core.Editor;
using CoreLanguage = Unity.Services.CloudCode.Authoring.Editor.Core.Model.Language;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    class CloudCodeModulesClient : ICloudCodeModulesClient
    {
        const string k_ContentType = "Content-Type";
        const string k_ProblemJson = "application/problem+json";

        readonly IAccessTokens m_TokenProvider;
        readonly IDefaultApiClient m_Client;
        readonly IEnvironmentProvider m_EnvironmentProvider;
        readonly IProjectIdProvider m_ProjectIdProvider;
        readonly IFileReader m_FileReader;

        public CloudCodeModulesClient(
            IAccessTokens tokenProvider,
            IEnvironmentProvider environmentProvider,
            IProjectIdProvider projectIdProvider,
            IDefaultApiClient client,
            IFileReader fileReader)
        {
            m_TokenProvider = tokenProvider;
            m_Client = client;
            m_EnvironmentProvider = environmentProvider;
            m_ProjectIdProvider = projectIdProvider;
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

        public Task Publish(ScriptName scriptName)
        {
            // Modules publish immediately upon creation.
            return Task.CompletedTask;
        }

        public async Task Delete(ScriptName scriptName)
        {
            await UpdateToken();
            var request = new DeleteModuleRequest(
                m_ProjectIdProvider.ProjectId,
                m_EnvironmentProvider.Current,
                scriptName.GetNameWithoutExtension());
            var res = await WrapRequest(m_Client.DeleteModuleAsync(request));
            EnsureSuccess(scriptName, res);
        }

        public async Task<IScript> Get(ScriptName scriptName)
        {
            await UpdateToken();
            var request = new GetModuleRequest(
                m_ProjectIdProvider.ProjectId,
                m_EnvironmentProvider.Current,
                scriptName.GetNameWithoutExtension());

            var res =
                await WrapRequest(m_Client.GetModuleAsync(request));

            EnsureSuccess(scriptName, res);

            var name = new ScriptName(res.Result.Name);
            var parameters = new List<CloudCodeParameter>();
            return new Script(name, "", parameters);
        }

        public async Task<List<ScriptInfo>> ListScripts()
        {
            await UpdateToken();
            var offset = 0;
            var limit = 100;
            var results = new List<ModuleMetadata>();
            int resultsCount;

            do
            {
                var request = new ListModulesRequest(
                    m_ProjectIdProvider.ProjectId,
                    m_EnvironmentProvider.Current,
                    limit);

                var res =
                    await WrapRequest(m_Client.ListModulesAsync(request));

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
                "https://services.unity.com/api",
                null,
                null,
                headers.ToDictionary());
        }

        static ScriptInfo ScriptInfoFromResponse(ModuleMetadata response)
        {
            return new ScriptInfo(
                response.Name,
                ".ccm",
                response.DateModified.ToString(),
                Language.CS);
        }

        async Task<Response> CreateScript(IScript script)
        {
            Stream stream = null;
            Response<CloudCodeCreateModuleResponse> response;
            try
            {
                stream = await LoadModuleContentsAsync(script.Path);
                var request = new CreateModuleRequest(
                    m_ProjectIdProvider.ProjectId,
                    m_EnvironmentProvider.Current,
                    script.Name.GetNameWithoutExtension(),
                    "CS", stream);
                response = await WrapRequest(m_Client.CreateModuleAsync(request));
            }
            finally
            {
                if (stream != null)
                {
                    await stream.DisposeAsync();
                }
            }
            return response;
        }

        async Task<Response> UpdateScript(IScript script)
        {
            Stream stream = null;
            Response<CloudCodeUpdateModuleResponse> response;
            try
            {
                stream = await LoadModuleContentsAsync(script.Path);

                var request = new UpdateModuleRequest(
                    m_ProjectIdProvider.ProjectId,
                    m_EnvironmentProvider.Current,
                    script.Name.GetNameWithoutExtension(), stream);

                response = await WrapRequest(m_Client.UpdateModuleAsync(request));
            }
            finally
            {
                if (stream != null)
                {
                    await stream.DisposeAsync();
                }
            }

            return response;
        }

        async Task<bool> ScriptExists(ScriptName scriptName)
        {
            var existsRequest = new GetModuleRequest(
                m_ProjectIdProvider.ProjectId,
                m_EnvironmentProvider.Current,
                scriptName.GetNameWithoutExtension());

            var res =
                await WrapRequest(m_Client.GetModuleAsync(existsRequest));

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

        public async Task<Stream> LoadModuleContentsAsync(string filePath)
        {
            try
            {
                return await m_FileReader.Open(filePath, FileMode.Open, FileAccess.Read);
            }
            catch (FileNotFoundException exception)
            {
                throw new Exception(exception.Message);
            }
            catch (UnauthorizedAccessException exception)
            {
                throw new Exception(string.Join(" ", exception.Message,
                    "Make sure that the CLI has the permissions to access the file and that the " +
                    "specified path points to a file and not a directory."));
            }
        }
    }
}
