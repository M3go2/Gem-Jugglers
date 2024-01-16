namespace Unity.Services.CloudCode.Authoring.Editor.Core.Solution
{
    interface ITemplateInfo
    {
        string PathSolution { get; }
        string PathProject { get; }
        string PathExampleClass { get; }
        string PathConfig { get; }
        string PathConfigUser { get; }
    }
}
