using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Package
{
    class PackageVersionProvider : IPackageVersionProvider
    {
        public async Task<string> GetPackageVersionAsync(string packageName)
        {
            var listRequest = UnityEditor.PackageManager.Client.List();
            await Task.Yield();

            var spinWait = new SpinWait();
            while (!listRequest.IsCompleted)
            {
                spinWait.SpinOnce();
            }

            if (listRequest.Error != null)
            {
                throw new PackageManagerRequestException(
                    $"Package Manager request failed: {listRequest.Error.errorCode} {listRequest.Error.message}");
            }

            var packages = listRequest.Result;

            return packages.FirstOrDefault(p => p.name == packageName)?.version;
        }
    }
}
