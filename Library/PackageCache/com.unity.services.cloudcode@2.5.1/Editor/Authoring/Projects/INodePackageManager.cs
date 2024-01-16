using System.Threading;
using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    interface INodePackageManager : INpmScriptRunner
    {
        Task Init(CancellationToken cancellationToken = default);
        Task Install(CancellationToken cancellationToken = default);
        Task Ci(CancellationToken cancellationToken = default);
        Task Test(CancellationToken cancellationToken = default);
    }
}
