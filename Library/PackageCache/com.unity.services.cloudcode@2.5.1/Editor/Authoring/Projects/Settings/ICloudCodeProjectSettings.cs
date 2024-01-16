namespace Unity.Services.CloudCode.Authoring.Editor.Projects.Settings
{
    interface ICloudCodeProjectSettings
    {
        public string ExternalEditorPath { get; set; }
        public string ExternalEditorArgsFormat { get; set; }
        public string DotnetPath { get; set; }
        public string NodeJsPath { get; set; }
        public string NpmPath { get; set; }
        void Load();
        void Save();
    }
}
