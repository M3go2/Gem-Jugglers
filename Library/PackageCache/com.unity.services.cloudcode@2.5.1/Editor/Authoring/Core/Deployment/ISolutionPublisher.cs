using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    interface ISolutionPublisher
    {
        public Task<string> PublishToFolder(string solutionPath, string outputPath, CancellationToken cancellationToken);
    }
}
