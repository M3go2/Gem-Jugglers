using System;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    class ProblemJsonDeserializationException : Exception
    {
        public ScriptName ScriptName { get; }
        public ProblemJson ProblemJson { get; }
        public ProblemJsonDeserializationException(ScriptName scriptName, IProblemJsonDeserializationResponse response)
            : base(Format(scriptName, response.ProblemJson, response.OriginalException))
        {
        }

        static string Format(ScriptName scriptName, ProblemJson problemJson, Exception e)
        {
            return L10n.Tr(e.Message);
        }
    }
}
