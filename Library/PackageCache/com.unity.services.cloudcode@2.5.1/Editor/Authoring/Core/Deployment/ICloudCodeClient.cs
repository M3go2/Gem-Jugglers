using System.Collections.Generic;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    interface ICloudCodeClient
    {
        Task<ScriptName> UploadFromFile(IScript script);
        Task Publish(ScriptName scriptName);
        Task Delete(ScriptName scriptName);
        Task<IScript> Get(ScriptName scriptName);
        Task<List<ScriptInfo>> ListScripts();
    }
}
