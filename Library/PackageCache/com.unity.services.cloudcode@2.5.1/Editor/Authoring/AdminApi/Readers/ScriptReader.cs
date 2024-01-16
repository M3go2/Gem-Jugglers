using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.CloudCode.Authoring.Editor.Parameters.UI;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using UnityEditor;


namespace Unity.Services.CloudCode.Authoring.Editor.AdminApi.Readers
{
    class ScriptReader : IScriptReader
    {
        const string k_AssetsSubstring = "Assets";

        public Task<Script> ReadFromPath(string path)
        {
            var body = ReadSource(path);
            var language = GetLanguage(path);
            var parameters = GetParams(path);
            var script = new Script(ScriptName.FromPath(path), body, parameters)
            {
                Language = language
            };

            return Task.FromResult(script);
        }

        static Language GetLanguage(string path)
        {
            return Language.JS;
        }

        static List<CloudCodeParameter> GetParams(string path)
        {
            return GetParametersFromPath(path);
        }

        string ReadSource(string path)
        {
            try
            {
                return File.ReadAllText(path);
            }
            catch (DirectoryNotFoundException d)
            {
                throw new ScriptNotFoundException(path, d);
            }
            catch (FileNotFoundException f)
            {
                throw new ScriptNotFoundException(path, f);
            }
        }

        static List<CloudCodeParameter> GetParametersFromPath(string path)
        {
            var relativePath = GetRelativeAssetPath(path);
            var asset = AssetImporter.GetAtPath(relativePath) as CloudCodeScriptImporter;
            return asset?.Parameters;
        }

        static string GetRelativeAssetPath(string path)
        {
            var index = path.IndexOf(k_AssetsSubstring);

            if (index == -1)
            {
                return string.Empty;
            }

            return path.Substring(index);
        }
    }
}
