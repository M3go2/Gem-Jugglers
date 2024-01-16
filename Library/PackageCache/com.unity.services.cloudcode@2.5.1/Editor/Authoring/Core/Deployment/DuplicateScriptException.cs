using System;
using System.Collections.Generic;
using System.Linq;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Deployment
{
    class DuplicateScriptException : Exception
    {
        public IReadOnlyList<IScript> DuplicateScripts { get; }
        public string ShortMessage { get; }
        public override string Message { get; }

        public DuplicateScriptException(IScript invalidScript, IReadOnlyList<IScript> duplicateScripts)
        {
            var duplicates = duplicateScripts
                .Where(d => d.Name.GetNameWithoutExtension() == invalidScript.Name.GetNameWithoutExtension())
                .Except(new[] { invalidScript })
                .ToList();

            DuplicateScripts = duplicates;

            var duplicatesStr = string.Join(", ", duplicates.Select(d => $"'{d.Path}'"));

            ShortMessage = $"'{invalidScript.Path}' was found duplicated with other files: {duplicatesStr}";
            Message = $"Multiple scripts with the name '{invalidScript.Name}' were found. "
                + "Only a single script for a given name may be deployed at the same time. "
                + "Give all scripts unique names or deploy them separately to proceed.\n"
                + ShortMessage;
        }
    }
}
