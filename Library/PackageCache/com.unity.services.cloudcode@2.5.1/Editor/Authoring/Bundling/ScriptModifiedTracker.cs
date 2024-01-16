using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.Linq;
using Unity.Services.CloudCode.Authoring.Editor.Scripts;
using Unity.Services.CloudCode.Authoring.Editor.Shared.Assets;
using Unity.Services.DeploymentApi.Editor;

namespace Unity.Services.CloudCode.Authoring.Editor.Bundling
{
    sealed class ScriptModifiedTracker : IScriptModifiedTracker, IDisposable
    {
        public event EventHandler<Script> ScriptModified;

        readonly ObservableCollection<IDeploymentItem> m_Scripts;
        readonly AssetPostprocessorProxy m_PostprocessorProxy;

        public ScriptModifiedTracker(ObservableCollection<IDeploymentItem> scripts, AssetPostprocessorProxy assetPostprocessorProxy)
        {
            m_PostprocessorProxy = assetPostprocessorProxy;
            m_PostprocessorProxy.AllAssetsPostprocessed += PostprocessorProxyOnAllAssetsPostprocessed;
            m_Scripts = scripts;
            m_Scripts.CollectionChanged += ScriptsOnScriptsChanged;
        }

        public void EmitExisting()
        {
            foreach (var item in m_Scripts)
            {
                ScriptModified?.Invoke(m_Scripts, (Script)item);
            }
        }

        void ScriptsOnScriptsChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            foreach (var oldItem in e.OldItems?.Cast<Script>() ?? new List<Script>())
            {
                ScriptModified?.Invoke(m_Scripts, oldItem);
            }
            foreach (var newItem in e.NewItems?.Cast<Script>() ?? new List<Script>())
            {
                ScriptModified?.Invoke(m_Scripts, newItem);
            }
        }

        void PostprocessorProxyOnAllAssetsPostprocessed(object sender, PostProcessEventArgs e)
        {
            foreach (var newItemPath in e.ImportedAssetPaths)
            {
                foreach (var newItem in m_Scripts.Where(item => item.Path == newItemPath))
                {
                    ScriptModified?.Invoke(this, (Script)newItem);
                }
            }

            foreach (var updatedItemPath in e.MovedAssetPaths)
            {
                foreach (var updatedItem in m_Scripts.Where(item => item.Path == updatedItemPath))
                {
                    ScriptModified?.Invoke(this, (Script)updatedItem);
                }
            }

            foreach (var updatedItemPath in e.MovedFromAssetPaths)
            {
                foreach (var updatedItem in m_Scripts.Where(item => item.Path == updatedItemPath))
                {
                    ScriptModified?.Invoke(this, (Script)updatedItem);
                }
            }

            foreach (var removedItemPath in e.DeletedAssetPaths)
            {
                foreach (var removedItem in m_Scripts.Where(item => item.Path == removedItemPath))
                {
                    ScriptModified?.Invoke(this, (Script)removedItem);
                }
            }
        }

        public void Dispose()
        {
            m_PostprocessorProxy.AllAssetsPostprocessed -= PostprocessorProxyOnAllAssetsPostprocessed;
            m_Scripts.CollectionChanged -= ScriptsOnScriptsChanged;

            if (m_Scripts is IDisposable disposable)
            {
                disposable.Dispose();
            }
        }
    }
}
