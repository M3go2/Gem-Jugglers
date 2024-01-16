namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    class ExternalCodeEditor : IExternalCodeEditor
    {
        public bool OpenProject(string filePath = "", int line = -1, int column = -1)
        {
            return CodeEditor.CodeEditor.CurrentEditor.OpenProject(filePath, line, column);
        }

        public string QuoteForProcessStart(string arg)
        {
            return CodeEditor.CodeEditor.QuoteForProcessStart(arg);
        }

        public string CurrentEditorInstallation => CodeEditor.CodeEditor.CurrentEditorInstallation;

        public bool OSOpenFile(string appPath, string arguments)
        {
            return CodeEditor.CodeEditor.OSOpenFile(appPath, arguments);
        }
    }
}
