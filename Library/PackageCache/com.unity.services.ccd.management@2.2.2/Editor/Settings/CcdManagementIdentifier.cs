using Unity.Services.Core.Editor;

namespace Unity.Services.Ccd.Management
{
    public struct CcdManagementIdentifier : IEditorGameServiceIdentifier
    {
        public string GetKey() => "CcdManagement";
    }
}
