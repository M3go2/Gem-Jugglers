using System;
using System.Collections.Generic;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    class DeploymentException : AggregateException
    {
        public DeployResult Result { get; }

        public DeploymentException(
            IEnumerable<Exception> exceptions,
            DeployResult result) : base(exceptions)
        {
            Result = result;
        }
    }
}
