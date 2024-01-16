using Unity.Services.CloudCode.Authoring.Editor.Shared.Assets;
using UnityEngine;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts
{
    class CloudCodeScript : ScriptableObject, IPath
    {
        [SerializeField]
        Script m_Model;

        public Script Model { get => m_Model; internal set => m_Model = value; }
        public string Path { get => Model.Path; set => Model.Path = value; }
    }
}
