using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.DeploymentApi.Editor;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Deployment
{
    class OpenCommand : Command
    {
        readonly JsAssetHandler m_JsAssetHandler;

        public override string Name => L10n.Tr("Open");

        public OpenCommand(JsAssetHandler jsAssetHandler)
        {
            m_JsAssetHandler = jsAssetHandler;
        }

        public override Task ExecuteAsync(IEnumerable<IDeploymentItem> items, CancellationToken cancellationToken = default)
        {
            var filePaths = items.Select(x => x.Path);

            foreach (var filePath in filePaths)
            {
                m_JsAssetHandler.OpenFile(filePath);
            }

            return Task.CompletedTask;
        }
    }
}
