using System;
using System.Text.RegularExpressions;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts
{
    static class CloudCodeFileExtensions
    {
        const string Es10 = ".es10";
        const string Js = ".js";

        public static string[] SupportedExtensions(string unityVersion)
        {
            if (EditorSupportsJs(unityVersion))
            {
                return new[] { Es10, Js };
            }
            return new[] { Es10 };
        }

        public static string Preferred(string unityVersion = null)
        {
            if (string.IsNullOrEmpty(unityVersion))
                unityVersion = Application.unityVersion;

            if (EditorSupportsJs(unityVersion))
            {
                return Js;
            }

            return Es10;
        }

        static bool EditorSupportsJs(string unityVersion)
        {
            var yearMajorMinorVersion = Regex.Split(unityVersion, @"[a-zA-Z]")[0];
            var parsedVersion = Version.Parse(yearMajorMinorVersion);
            if (parsedVersion >= new Version(2022, 2))
            {
                return true;
            }

            if (parsedVersion < new Version(2022, 0) && parsedVersion >= new Version(2021, 2, 11))
            {
                return true;
            }

            return false;
        }
    }
}
