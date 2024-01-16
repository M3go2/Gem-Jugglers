using System;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects.Exceptions
{
    public class DotnetNotFoundException : Exception
    {
        static readonly string s_CallToAction
            = L10n.Tr("Please make sure that your development environment is properly set up. Preferences > Cloud Code Modules > .NET development environment");

        public DotnetNotFoundException()
            : base($"Failed to locate dotnet executable. {s_CallToAction}")
        {
        }
    }
}
