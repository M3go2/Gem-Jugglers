// WARNING: Auto generated code. Modifications will be lost!
using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Shared.DependencyInversion
{
    class DependencyNotFoundException : Exception
    {
        public DependencyNotFoundException(Type serviceType)
            : base($"Could not find factory for {serviceType.Name}. Make sure that {serviceType.Name} was registered to your ServiceCollection")
        {
        }
    }
}
