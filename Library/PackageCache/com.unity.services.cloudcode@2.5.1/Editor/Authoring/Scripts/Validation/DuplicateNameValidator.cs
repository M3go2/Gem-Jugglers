using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Linq;
using Unity.Services.DeploymentApi.Editor;
using UnityEditor;

namespace Unity.Services.CloudCode.Authoring.Editor.Scripts.Validation
{
    sealed class DuplicateNameValidator : IDisposable
    {
        public static readonly string DuplicateNameError = L10n.Tr("Duplicate script name");

        readonly ObservableCollection<IDeploymentItem> m_Scripts;

        public DuplicateNameValidator(ObservableCollection<IDeploymentItem> scripts)
        {
            m_Scripts = scripts;
            m_Scripts.CollectionChanged += ScriptsOnCollectionChanged;

            foreach (var script in m_Scripts)
            {
                script.PropertyChanged += ScriptOnPropertyChanged;
            }

            DetectDuplicateNames(m_Scripts);
        }

        public void Dispose()
        {
            m_Scripts.CollectionChanged -= ScriptsOnCollectionChanged;
        }

        void ScriptsOnCollectionChanged(object sender, NotifyCollectionChangedEventArgs e)
        {
            if (e.OldItems != null)
            {
                foreach (var script in e.OldItems.Cast<Script>())
                {
                    script.PropertyChanged -= ScriptOnPropertyChanged;
                }
            }

            if (e.NewItems != null)
            {
                foreach (var script in e.NewItems.Cast<Script>())
                {
                    script.PropertyChanged += ScriptOnPropertyChanged;
                }
            }

            DetectDuplicateNames(m_Scripts);
        }

        void ScriptOnPropertyChanged(object sender, PropertyChangedEventArgs e)
        {
            if (e.PropertyName == nameof(IDeploymentItem.Name))
            {
                DetectDuplicateNames(m_Scripts);
            }
        }

        public static void DetectDuplicateNames(IReadOnlyCollection<IDeploymentItem> scripts)
        {
            var nameCounts = new Dictionary<string, int>();
            foreach (var script in scripts)
            {
                SetOrUpdate(nameCounts, script.Name, n => n + 1, 1);
            }

            foreach (var script in scripts)
            {
                var jsScript = script as Script;
                var duplicateNameState = jsScript.States.FirstOrDefault(state => state.Description == DuplicateNameError);

                if (nameCounts[script.Name] > 1)
                {
                    var errorDetail = $"Cloud code script with name '{script.Name}' already exists";
                    AddDuplicateNameAssetState(jsScript, errorDetail);
                }
                else if (duplicateNameState.Description != null)
                {
                    jsScript.States.Remove(duplicateNameState);
                }
            }
        }

        static void AddDuplicateNameAssetState(Script script, string errorDetail)
        {
            var containsDuplicateErrorName = script.States != null &&
                script.States.Any(state => state.Description == DuplicateNameError);

            if (containsDuplicateErrorName)
            {
                return;
            }

            var duplicateNameAssetState = new AssetState(DuplicateNameError, errorDetail, SeverityLevel.Warning);
            script.States.Add(duplicateNameAssetState);
        }

        static void SetOrUpdate<TKey, TValue>(IDictionary<TKey, TValue> dictionary, TKey key, Func<TValue, TValue> update, TValue initial)
        {
            if (dictionary.ContainsKey(key))
            {
                dictionary[key] = update(dictionary[key]);
            }
            else
            {
                dictionary[key] = initial;
            }
        }
    }
}
