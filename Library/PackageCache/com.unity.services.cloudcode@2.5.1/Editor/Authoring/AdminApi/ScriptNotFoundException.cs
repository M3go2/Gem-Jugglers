using System;
using System.IO;

namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi
{
    class ScriptNotFoundException : IOException
    {
        public ScriptNotFoundException(string path, Exception innerException)
            : base($"Script not found at {path}", innerException)
        {
        }
    }
}
