using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode
{
    [Obsolete("The interface provided by CloudCode has moved to CloudCodeService.Instance, and should be accessed from there instead. This API will be removed in an upcoming release.")]
    public static class CloudCode
    {
        [Obsolete("The interface provided by CloudCode.CallEndpointAsync(string, object) has been replaced by CloudCodeService.Instance.CallEndpointAsync(string, Dictionary<string, object>), and should be accessed from there instead. This API will be removed in an upcoming release.", false)]
        public static async Task<string> CallEndpointAsync(string function, object args)
        {
            return await CloudCodeService.Instance.CallEndpointAsync(function, ConvertObjectToDictionary(args));
        }

        [Obsolete("The interface provided by CloudCode.CallEndpointAsync<TResult>(string, object) has been replaced by CloudCodeService.Instance.CallEndpointAsync<TResult>(string, Dictionary<string, object>), and should be accessed from there instead. This API will be removed in an upcoming release.", false)]
        public static async Task<TResult> CallEndpointAsync<TResult>(string function, object args)
        {
            return await CloudCodeService.Instance.CallEndpointAsync<TResult>(function, ConvertObjectToDictionary(args));
        }

        private static Dictionary<string, object> ConvertObjectToDictionary(object args)
        {
            var dictionaryArgs = new Dictionary<string, object>();

            var fields = args?.GetType().GetFields();

            if (fields != null)
            {
                foreach (var field in fields)
                {
                    dictionaryArgs[field.Name] = field.GetValue(args);
                }
            }

            return dictionaryArgs;
        }
    }
}
