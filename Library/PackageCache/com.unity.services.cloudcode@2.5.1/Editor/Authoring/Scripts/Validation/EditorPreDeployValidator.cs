using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Deployment;
using Unity.Services.CloudCode.Authoring.Editor.Core.Logging;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.Parameters;
using Unity.Services.CloudCode.Authoring.Editor.Projects.Exceptions;
using Unity.Services.DeploymentApi.Editor;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts.Validation
{
    class EditorPreDeployValidator : PreDeployValidator
    {
        readonly IInScriptParameters m_InScriptParameters;

        public EditorPreDeployValidator(ILogger logger, IInScriptParameters inScriptParameters)
            : base(logger)
        {
            m_InScriptParameters = inScriptParameters;
            DuplicateNameConsoleError = L10n.Tr(DuplicateNameConsoleError + " See Deployment Window for details.");
        }

        public override async Task<ValidationInfo> Validate(
            IReadOnlyList<IScript> scripts)
        {
            var validationInfo = await base.Validate(scripts);
            var invalidScripts = new Dictionary<IScript, Exception>(validationInfo.InvalidScripts);
            foreach (var script in validationInfo.ValidScripts)
            {
                if (script.Language == Language.JS)
                {
                    try
                    {
                        await m_InScriptParameters.GetParametersFromPath(script.Path);
                    }
                    catch (InvalidOperationException e)
                    {
                        OnFailedToGetParametersFromPath(invalidScripts, script, e);
                    }
                    catch (NpmCommandFailedException e)
                    {
                        OnFailedToGetParametersFromPath(invalidScripts, script, e);
                    }
                }
            }

            return new ValidationInfo(
                validationInfo.ValidScripts.Except(invalidScripts.Keys).ToList(),
                invalidScripts);
        }

        static void OnFailedToGetParametersFromPath(
            IDictionary<IScript, Exception> invalidScripts,
            IScript script,
            Exception e)
        {
            invalidScripts.Add(script, e);
            var concreteScript = (Script)script;
            concreteScript.Status = DeploymentStatus.FailedToDeploy;
            var state = new AssetState(
                "Failed to parse in-script parameters.",
                e.Message,
                level: SeverityLevel.Error);
            concreteScript.States.Add(state);
        }

        protected override void NotifyDuplicateScriptError(IReadOnlyList<IScript> scripts, IReadOnlyList<IScript> duplicateScripts)
        {
            m_Logger.LogError(DuplicateNameConsoleError);

            DuplicateNameValidator.DetectDuplicateNames(scripts.Cast<IDeploymentItem>().ToList());
        }
    }
}
