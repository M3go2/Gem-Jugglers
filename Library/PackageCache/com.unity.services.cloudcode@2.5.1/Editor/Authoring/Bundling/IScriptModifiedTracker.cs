using System;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;

namespace Unity.Services.CloudCode.Authoring.Editor.Bundling
{
    interface IScriptModifiedTracker
    {
        event EventHandler<Script> ScriptModified;
        void EmitExisting();
    }
}
