using Unity.Services.CloudCode.Authoring.Editor.Core.Logging;
using SharedLogger = Unity.Services.CloudCode.Authoring.Editor.Shared.Logging.Logger;

namespace Unity.Services.CloudCode.Authoring.Editor.Logging
{
    class Logger : ILogger
    {
        public void LogError(object message)
        {
            SharedLogger.LogError(message);
        }

        public void LogWarning(object message)
        {
            SharedLogger.LogWarning(message);
        }

        public void LogInfo(object message)
        {
            SharedLogger.Log(message);
        }

        public void LogVerbose(object message)
        {
            SharedLogger.LogVerbose(message);
        }
    }
}
