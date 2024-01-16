using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Dotnet
{
    class DotnetCommandFailedException : Exception
    {
        public DotnetCommandFailedException(string message) : base(message) {}
    }
}
