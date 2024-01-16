using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Package
{
    class PackageManagerRequestException : Exception
    {
        public PackageManagerRequestException(string msg)
            : base(msg)
        {
        }
    }
}
