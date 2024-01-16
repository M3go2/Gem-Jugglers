using System.Collections.Generic;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    class DeployResult
    {
        public IReadOnlyList<IScript> Created { get;  }
        public IReadOnlyList<IScript> Updated { get; }
        public IReadOnlyList<IScript> Deleted { get; }

        public IReadOnlyList<IScript> Deployed { get; }
        public IReadOnlyList<IScript> Failed { get; }

        public DeployResult(
            IReadOnlyList<IScript> created,
            IReadOnlyList<IScript> updated,
            IReadOnlyList<IScript> deleted,
            IReadOnlyList<IScript> deployed,
            IReadOnlyList<IScript> failed)
        {
            Created = created;
            Updated = updated;
            Deleted = deleted;
            Deployed = deployed;
            Failed = failed;
        }
    }
}
