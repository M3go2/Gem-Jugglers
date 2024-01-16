using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Analytics.Deployment
{
    // Lowercase to match the naming schema
    [Serializable]
    struct DeploymentParameters
    {
        public string origin;
        public string environment;
        public string status;
        public string exception;
        public float duration;
        public int size;
    }
}
