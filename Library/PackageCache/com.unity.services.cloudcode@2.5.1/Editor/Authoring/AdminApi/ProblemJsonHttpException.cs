using System.Collections.Generic;
using System.Text;
using Unity.Services.CloudCode.Authoring.Client.Http;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    class ProblemJsonHttpException : HttpException
    {
        public ScriptName ScriptName { get; }
        public ProblemJson ProblemJson { get; }

        public ProblemJsonHttpException(ScriptName scriptName, ProblemJson problemJson, HttpClientResponse response) : base(Format(scriptName, problemJson))
        {
            ScriptName = scriptName;
            ProblemJson = problemJson;
            Response = response;
        }

        static string Format(ScriptName scriptName, ProblemJson problemJson)
        {
            var builder = new StringBuilder();
            builder.Append($"[{scriptName}] {problemJson.Title}. {problemJson.Detail}");
            foreach (var error in problemJson.Errors ?? new List<ProblemJsonError>())
            {
                builder.Append($"\nERROR [{error.Field}]: {string.Join(", ", error.Messages)}");
            }

            return builder.ToString();
        }
    }
}
