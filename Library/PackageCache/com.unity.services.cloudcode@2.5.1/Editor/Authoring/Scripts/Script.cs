using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using Unity.Services.CloudCode.Authoring.Editor.Core.Model;
using Unity.Services.DeploymentApi.Editor;
using UnityEngine;
using CoreLanguage = Unity.Services.CloudCode.Authoring.Editor.Core.Model.Language;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts
{
    [Serializable]
    class Script : IScript, IDeploymentItem, ISerializationCallbackReceiver, ITypedItem
    {
        float m_Progress;
        DeploymentStatus m_Status;
        string m_Path;
        string m_Type = "JavaScript";

        ScriptName m_Name;
        CoreLanguage? m_Language = CoreLanguage.JS;

        public string Body { get; set; }
        public List<CloudCodeParameter> Parameters { get; internal set; }

        string IDeploymentItem.Name => Name.ToString();

        public event PropertyChangedEventHandler PropertyChanged;

        public ScriptName Name
        {
            get => m_Name;
            set => SetField(ref m_Name, value);
        }

        public CoreLanguage? Language
        {
            get => m_Language;
            set
            {
                SetField(ref m_Language, value);
                Type = "JavaScript";
            }
        }

        public string Path
        {
            get { return m_Path; }
            set { SetField(ref m_Path, value, OnPathChanged); }
        }

        public string Type
        {
            get => m_Type;
            set => SetField(ref m_Type, value);
        }

        public float Progress
        {
            get { return m_Progress; }
            set { SetField(ref m_Progress, value); }
        }

        public DeploymentStatus Status
        {
            get { return m_Status; }
            set { SetField(ref m_Status, value); }
        }

        public ObservableCollection<AssetState> States { get; }

        public string LastPublishedDate { get; set; }

        protected Script()
        {
            m_Progress = 0;
            m_Status = DeploymentStatus.Empty;
            States = new ObservableCollection<AssetState>();
        }

        public Script(string path)
            : this()
        {
            Path = path.Replace(System.IO.Path.DirectorySeparatorChar, System.IO.Path.AltDirectorySeparatorChar);
        }

        public Script(ScriptName name, string body, List<CloudCodeParameter> parameters)
            : this()
        {
            Name = name;
            Body = body;
            Parameters = parameters;
        }

        public void OnBeforeSerialize()
        {
            // empty since name is derived and does not need to be stored
        }

        public void OnAfterDeserialize()
        {
            if (Path != null)
            {
                Name = ScriptName.FromPath(Path);
            }
        }

        void OnPathChanged(string newPath)
        {
            Name = ScriptName.FromPath(newPath);
        }

        void OnPropertyChanged([CallerMemberName] string caller = null)
        {
            var handler = PropertyChanged;
            if (handler != null)
            {
                handler(this, new PropertyChangedEventArgs(caller));
            }
        }

        bool SetField<T>(ref T field, T value,
            Action<T> onFieldChanged = null,
            [CallerMemberName] string caller = null)
        {
            if (EqualityComparer<T>.Default.Equals(field, value))
                return false;
            field = value;
            OnPropertyChanged(caller);
            onFieldChanged?.Invoke(field);

            return true;
        }
    }
}
