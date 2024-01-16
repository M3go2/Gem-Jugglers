using System;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects.Exceptions
{
    class NpmNotFoundException : Exception
    {
        static readonly string s_CallToAction
            = L10n.Tr("Please make sure that your development environment is properly set up. Preferences > Cloud Code Scripts > Javascript development environment");

        public NpmNotFoundException(string nodePath, string npmPath)
            : base($"failed to locate npm executable. [nodejs: {nodePath}, npm: {npmPath}]. {s_CallToAction}")
        {
        }
    }
}
