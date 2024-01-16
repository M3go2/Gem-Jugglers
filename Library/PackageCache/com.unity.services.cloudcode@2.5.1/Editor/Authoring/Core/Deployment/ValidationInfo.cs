using System;
using System.Collections.Generic;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    class ValidationInfo
    {
        public IReadOnlyList<IScript> ValidScripts { get; }
        public IReadOnlyDictionary<IScript, Exception> InvalidScripts { get; }

        public ValidationInfo(
            IReadOnlyList<IScript> validScripts,
            IReadOnlyDictionary<IScript, Exception> invalidScripts)
        {
            ValidScripts = validScripts;
            InvalidScripts = invalidScripts;
        }
    }
}
