using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    class NodeProject
    {
        public const string ProjectFile = "package.json";

        const string k_Scripts = "scripts";
        const string k_Dependencies = "dependencies";
        const string k_DevDependencies = "devDependencies";

        readonly string m_Path;

        internal readonly JObject project;

        public NodeProject(string path) : this(path, JObject.Parse(File.ReadAllText(path)))
        {
        }

        internal NodeProject(string path, JObject project)
        {
            m_Path = path;
            this.project = project;
        }

        public bool HasScript(string scriptName)
        {
            if (!project.TryGetValue(k_Scripts, out var scriptsToken))
            {
                return false;
            }

            var scripts = scriptsToken.ToObject<Dictionary<string, string>>();

            return scripts.ContainsKey(scriptName);
        }

        public void SetValue(string key, string value)
        {
            var added = project.TryAdd(key, value);
            if (!added)
            {
                project[key] = value;
            }
        }

        public T GetValue<T>(string key)
        {
            if (project.TryGetValue(key, out var token))
            {
                return token.Value<T>();
            }

            return default;
        }

        public void AddDependencies(IDictionary<string, string> newDependencies)
        {
            AddValuesToDictionary(k_Dependencies, newDependencies);
        }

        public void AddDevDependencies(IDictionary<string, string> newDependencies)
        {
            AddValuesToDictionary(k_DevDependencies, newDependencies);
        }

        public void Save()
        {
            File.WriteAllText(m_Path, ToString());
        }

        public override string ToString()
        {
            return project.ToString(Formatting.Indented);
        }

        void AddValuesToDictionary(string key, IDictionary<string, string> values)
        {
            if (!project.TryGetValue(key, out var originalValues) || !(originalValues is JObject))
            {
                originalValues = new JObject();
            }

            foreach (var kv in values)
            {
                originalValues[kv.Key] = kv.Value;
            }

            project[key] = originalValues;
        }
    }
}
