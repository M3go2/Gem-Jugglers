using Unity.Services.CloudCode.Authoring.Editor.Shared.Infrastructure.IO;

namespace Unity.Services.CloudCode.Authoring.Editor
{
    static class CloudCodePackage
    {
        public const string Name = "com.unity.services.cloudcode";
        public static readonly string RootPath = $"Packages/{Name}";
        public static readonly string EditorPath = PathUtils.Join(RootPath, "Editor");
    }
}
