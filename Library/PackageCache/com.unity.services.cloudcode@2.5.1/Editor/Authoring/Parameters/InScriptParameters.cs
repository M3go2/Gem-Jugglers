using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Unity.Services.CloudCode.Authoring.Editor.Core.Bundling;
using Unity.Services.CloudCode.Authoring.Editor.Core.Logging;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.IO;
using Unity.Services.CloudCode.Authoring.Editor.Projects;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Parameters
{
    class InScriptParameters : IInScriptParameters
    {
        struct EvaluatedParam
        {
            public ParameterType type { get; set; }
            public bool required { get; set; }
        }

        static readonly string k_FailedToParseMessage = L10n.Tr("Failed to parse in-script parameters. ");
        static readonly string k_FailedToParseParameterMessageFormat = L10n.Tr("Failed to parse parameter '{0}'. ");
        static readonly string k_FailedToParseParameterTypeMessageFormat = L10n.Tr("Could not parse '{0}'.");

        readonly INodeJsRunner m_ScriptRunner;
        readonly ILogger m_Logger;
        readonly IScriptBundler m_Bundler;
        readonly IFileReader m_FileReader;

        public InScriptParameters(INodeJsRunner runner, ILogger logger, IScriptBundler scriptBundler, IFileReader fileReader)
        {
            m_ScriptRunner = runner;
            m_Logger = logger;
            m_Bundler = scriptBundler;
            m_FileReader = fileReader;
        }

        public async Task<List<CloudCodeParameter>> GetParametersFromPath(
            string path,
            CancellationToken cancellationToken = default)
        {
            var shouldBundle = await m_Bundler.ShouldBeBundled(path, cancellationToken);
            string scriptPath = path;
            if (shouldBundle)
            {
                var bundle = await m_Bundler.Bundle(path, cancellationToken);
                scriptPath = Path.Combine(Path.GetTempPath(), Path.GetFileName(path));
                await File.WriteAllTextAsync(scriptPath, bundle.Source, cancellationToken);
            }

            try
            {
                var fullScriptPath = Path.GetFullPath(ScriptPaths.ScriptParameters);
                var output = await m_ScriptRunner.ExecNodeJs(
                    new[] { fullScriptPath, scriptPath },
                    string.Empty,
                    cancellationToken);

                output = output.Trim();

                if (TryParseParameters(path, output, out var parameters))
                {
                    return parameters;
                }

                throw new InvalidOperationException(k_FailedToParseMessage);
            }
            finally
            {
                if (shouldBundle)
                {
                    File.Delete(scriptPath);
                }
            }
        }

        bool TryParseParameters(string path, string output, out List<CloudCodeParameter> result)
        {
            result = null;
            if (output == string.Empty)
            {
                return true;
            }

            try
            {
                JObject parameters = JObject.Parse(output);

                var parsedParams = new List<CloudCodeParameter>();
                foreach (var symbol in parameters)
                {
                    var paramName = symbol.Key;
                    var cloudCodeParam = new CloudCodeParameter
                    {
                        Name = paramName
                    };

                    if (!TryParseParameter(symbol.Value, cloudCodeParam, out var failureReason))
                    {
                        LogFailedToParse(
                            path,
                            string.Format(k_FailedToParseParameterMessageFormat, paramName)
                            + failureReason);
                        return false;
                    }

                    parsedParams.Add(cloudCodeParam);
                }
                result = parsedParams;
                return true;
            }
            catch (JsonReaderException)
            {
                LogFailedToParse(path, k_FailedToParseMessage);
                return false;
            }
            catch (JsonSerializationException)
            {
                LogFailedToParse(path, k_FailedToParseMessage);
                return false;
            }
        }

        static bool TryParseParameter(JToken param, CloudCodeParameter result, out string failureReason)
        {
            failureReason = string.Empty;

            if (param is JValue)
            {
                return TryParseValue(param, result, out failureReason);
            }

            if (param is JObject jParamData)
            {
                return TryParseObject(result, jParamData);
            }
            return false;
        }

        static bool TryParseValue(JToken param, CloudCodeParameter result, out string failureReason)
        {
            failureReason = string.Format(
                k_FailedToParseParameterTypeMessageFormat,
                param);
            try
            {
                ParameterType type = param.ToObject<ParameterType>();
                result.ParameterType = type;
            }
            catch (JsonSerializationException)
            {
                return false;
            }
            catch (ArgumentException)
            {
                return false;
            }

            return true;
        }

        static bool TryParseObject(CloudCodeParameter result, JObject jParamData)
        {
            try
            {
                var paramData = jParamData.ToObject<EvaluatedParam>();
                result.ParameterType = paramData.type;
                result.Required = paramData.required;
            }
            catch (JsonSerializationException)
            {
                return false;
            }
            return true;
        }

        void LogFailedToParse(string path, string message)
        {
            m_Logger.LogError($"Failed to parse at '{path}': {message}");
        }
    }
}
