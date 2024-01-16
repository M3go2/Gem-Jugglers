namespace Unity.Services.CloudCode.Authoring.Editor.Projects
{
    interface IExternalCodeEditor
    {
        string CurrentEditorInstallation { get; }

        bool OSOpenFile(string appPath, string arguments);

        bool OpenProject(string filePath = "", int line = -1, int column = -1);

        string QuoteForProcessStart(string arg);
    }
}
