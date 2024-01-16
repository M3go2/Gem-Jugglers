using System;

namespace Unity.Services.CloudCode.Authoring.Editor.Analytics.Deployment
{
    sealed class DisposableScope : IDisposable
    {
        readonly Action m_OnScopeEnd;

        public DisposableScope(Action onScopeEnd)
        {
            m_OnScopeEnd = onScopeEnd;
        }

        public void Dispose()
        {
            m_OnScopeEnd();
        }
    }
}
