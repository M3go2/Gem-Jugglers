using System;
using UnityEditor;
using UnityEngine;
using UnityEngine.UIElements;

namespace Unity.Services.Ccd.Management
{
    static class UIUtils
    {
        public static VisualElement GetUiFromTemplate(string templatePath)
        {
            var template = AssetDatabase.LoadAssetAtPath<VisualTreeAsset>(templatePath);
            return template == null ? null : template.CloneTree().contentContainer;
        }

        public static void AddOnClickedForElement(this VisualElement self, Action onClicked, string elementName)
        {
            var link = self.Q(elementName);
            if (link is null) return;
            var clickable = new Clickable(onClicked);
            link.AddManipulator(clickable);
        }

        public static void AddOnClickedForButton(this VisualElement self, Action onClicked, string elementName)
        {
            var button = self.Q<Button>(elementName);
            if (button is null) return;
            button.clicked += onClicked;
        }

        public static void AddImage(this VisualElement self, string path, string elementName)
        {
            var image = self.Q<Image>(elementName);
            if (image is null) return;
            image.image = (Texture)EditorGUIUtility.Load(path);
            image.scaleMode = ScaleMode.StretchToFill;
        }
    }
}
