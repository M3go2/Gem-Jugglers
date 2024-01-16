using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Package
{
    interface IPackageVersionProvider
    {
        Task<string> GetPackageVersionAsync(string packageName);
    }
}
