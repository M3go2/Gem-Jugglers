using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    interface IScriptReader
    {
        Task<Script> ReadFromPath(string path);
    }
}
