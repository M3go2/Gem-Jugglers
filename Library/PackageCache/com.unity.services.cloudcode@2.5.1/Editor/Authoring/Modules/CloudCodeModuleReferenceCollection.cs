using Unity.Services.CloudCode.Authoring.Editor.Shared.Assets;

namespace Unity.Services.CloudCode.Authoring.Editor.Modules
{
    class CloudCodeModuleReferenceCollection : ObservableAssets<CloudCodeModuleReference>
    {
        public CloudCodeModuleReferenceCollection()
            : base(new AssetPostprocessorProxy(), true) {}
    }
}
