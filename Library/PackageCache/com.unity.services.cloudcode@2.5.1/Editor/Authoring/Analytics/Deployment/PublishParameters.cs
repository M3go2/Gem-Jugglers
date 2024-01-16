using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Analytics.Deployment
{
    [Serializable]
    struct PublishParameters
    {
        public string origin;
        public string environment;
        public string status;
        public string exception;
    }
}
