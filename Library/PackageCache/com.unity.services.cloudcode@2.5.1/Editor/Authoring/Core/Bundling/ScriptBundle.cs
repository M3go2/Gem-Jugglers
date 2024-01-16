using System.Collections.Generic;

namespace Unity.Services.CloudCode.Authoring.Editor.Core.Bundling
{
    class ScriptBundle
    {
        public string Source { get; }
        public IReadOnlyCollection<string> Dependencies { get; }

        public ScriptBundle(string source, IReadOnlyCollection<string> dependencies)
        {
            Source = source;
            Dependencies = dependencies;
        }
    }
}
