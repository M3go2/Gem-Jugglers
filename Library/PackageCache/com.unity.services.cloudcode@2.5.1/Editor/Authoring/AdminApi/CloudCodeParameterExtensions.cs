using System.Collections.Generic;
using System.Linq;
using Unity.Services.CloudCode.Authoring.Client.Models;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using CoreLanguage = Unity.Services.CloudCode.Authoring.Editor.Core.Model.Language;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    static class CloudCodeParameterExtensions
    {
        static CloudCodeScriptParams.TypeOptions ConvertParamTypeToTypeOptions(ParameterType parameterType)
        {
            switch (parameterType)
            {
                case ParameterType.String:
                    return CloudCodeScriptParams.TypeOptions.STRING;
                case ParameterType.Numeric:
                    return CloudCodeScriptParams.TypeOptions.NUMERIC;
                case ParameterType.Boolean:
                    return CloudCodeScriptParams.TypeOptions.BOOLEAN;
                case ParameterType.JSON:
                    return CloudCodeScriptParams.TypeOptions.JSON;
                case ParameterType.Any:
                    return CloudCodeScriptParams.TypeOptions.ANY;
            }

            return default;
        }

        public static List<CloudCodeScriptParams> GetCloudCodeScriptParamsList(this IScript script)
        {
            var scriptParameters = script
                .Parameters
                ?.Select(x => x.ToCloudCodeScriptParams())
                    .ToList();
            return scriptParameters;
        }

        public static CloudCodeScriptParams ToCloudCodeScriptParams(
            this CloudCodeParameter parameter)
        {
            return new CloudCodeScriptParams(
                parameter.Name,
                ConvertParamTypeToTypeOptions(parameter.ParameterType),
                parameter.Required);
        }

        static ParameterType ConvertTypeOptionsToParamType(CloudCodeScriptParams.TypeOptions parameterType)
        {
            switch (parameterType)
            {
                case CloudCodeScriptParams.TypeOptions.STRING:
                    return ParameterType.String;
                case CloudCodeScriptParams.TypeOptions.NUMERIC:
                    return ParameterType.Numeric;
                case CloudCodeScriptParams.TypeOptions.BOOLEAN:
                    return ParameterType.Boolean;
                case CloudCodeScriptParams.TypeOptions.JSON:
                    return ParameterType.JSON;
                case CloudCodeScriptParams.TypeOptions.ANY:
                    return ParameterType.Any;
            }

            return default;
        }

        public static Language ToCloudScriptLanguage(this CoreLanguage? language)
        {
            if (!language.HasValue)
                return Language.JS;

            switch (language.Value)
            {
                case CoreLanguage.JS:
                default:
                    return Language.JS;
            }
        }

        public static CloudCodeParameter ToCloudCodeParameter(this CloudCodeScriptParams parameter)
        {
            return new CloudCodeParameter
            {
                Name = parameter.Name,
                ParameterType = ConvertTypeOptionsToParamType(parameter.Type),
                Required = parameter.Required
            };
        }
    }
}
