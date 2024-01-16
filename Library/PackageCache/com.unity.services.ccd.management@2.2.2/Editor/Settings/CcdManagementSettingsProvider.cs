using System.Collections.Generic;
using Unity.Services.Core;
using Unity.Services.Core.Editor;
using UnityEditor;
using UnityEngine.UIElements;

namespace Unity.Services.Ccd.Management
{
    class CcdManagementSettingsProvider : EditorGameServiceSettingsProvider
    {
        bool m_Enabled;
        VisualElement m_Root;
        CcdManagementSettingsLoadingUI m_LoadingUI;
        CcdManagementSettingsCommonUI m_CommonUI;
        CcdManagementSettingsEnabledUI m_EnabledUI;
        CcdManagementSettingsDisabledUI m_DisabledUI;

        CcdManagementSettingsProvider(SettingsScope scopes, IEnumerable<string> keywords = null)
            : base(GetSettingsPath(), scopes, keywords) {}

        [SettingsProvider]
        public static SettingsProvider CreateSettingsProvider()
        {
            return new CcdManagementSettingsProvider(SettingsScope.Project);
        }

        internal static string GetSettingsPath()
        {
            return GenerateProjectSettingsPath(UIConstants.LocalizedStrings.Ccd);
        }

        protected override IEditorGameService EditorGameService =>
            EditorGameServiceRegistry.Instance.GetEditorGameService<CcdManagementIdentifier>();
        protected override string Title =>  UIConstants.LocalizedStrings.Ccd;
        protected override string Description => UIConstants.LocalizedStrings.Description;

        protected override VisualElement GenerateServiceDetailUI()
        {
            m_Root = new VisualElement();
            m_LoadingUI = new CcdManagementSettingsLoadingUI();
            m_CommonUI = new CcdManagementSettingsCommonUI();
            m_EnabledUI = new CcdManagementSettingsEnabledUI();
            m_DisabledUI = new CcdManagementSettingsDisabledUI(RefreshDetailUI);
            SetupStyleSheets();
            RefreshDetailUI();
            return m_Root;
        }

        protected override VisualElement GenerateUnsupportedDetailUI()
        {
            return GenerateServiceDetailUI();
        }

        void SetupStyleSheets()
        {
            var styleSheet = AssetDatabase.LoadAssetAtPath<StyleSheet>(UIConstants.StyleSheetPaths.Common);
            if (styleSheet != null)
                m_Root.styleSheets.Add(styleSheet);
        }

        async void RefreshDetailUI()
        {
            if (m_Root is null)
                return;
            m_Root.Clear();
            m_Root.Add(m_CommonUI);
            m_Root.Add(m_LoadingUI);
            try
            {
                await CcdManagement.Instance.GetOrgAsync();
                m_Enabled = true;
            }
            catch (CcdManagementException e)
            {
                if (e.ErrorCode != CommonErrorCodes.Forbidden)
                {
                    if (m_Root.Contains(m_LoadingUI))
                        m_Root.Remove(m_LoadingUI);
                    throw;
                }
                m_Enabled = false;
            }
            if (m_Root.Contains(m_LoadingUI))
                m_Root.Remove(m_LoadingUI);
            m_Root.Add(m_Enabled ? (VisualElement)m_EnabledUI : m_DisabledUI);
        }
    }
}
