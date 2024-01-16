namespace Unity.Services.CloudCode.Authoring.Editor.Core.Solution
{
    interface IPathResolver
    {
        string GetSolutionPath(string dstDirectory, string moduleName);
        string GetProjectPath(string dstDirectory, string moduleName);
        string GetExampleClassPath(string dstDirectory, string moduleName);
        string GetPubxmlPath(string dstDirectory, string moduleName, bool isUserFile);
    }
}
