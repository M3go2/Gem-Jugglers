using System.Threading.Tasks;
using Unity.Services.CloudCode.Internal;
using Unity.Services.CloudCode.Internal.Apis.CloudCode;
using Unity.Services.CloudCode.Internal.CloudCode;
using Unity.Services.CloudCode.Internal.Models;
using Unity.Services.Core.Configuration.Internal;
using Unity.Services.Wire.Internal;

namespace Unity.Services.CloudCode.Subscriptions
{
    class TokenProvider : IChannelTokenProvider
    {
        readonly ICloudProjectId m_CloudProjectId;
        readonly ICloudCodeApiClient m_ApiClient;
        readonly TokenProviderMode m_ProviderMode;

        internal enum TokenProviderMode
        {
            Player,
            Project
        }

        internal TokenProvider(ICloudCodeApiClient apiClient, ICloudProjectId projectId, TokenProviderMode providerMode)
        {
            m_CloudProjectId = projectId;
            m_ApiClient = apiClient;
            m_ProviderMode = providerMode;
        }

        public async Task<ChannelToken> GetTokenAsync()
        {
            Response<SubscriptionTokenResponse> response;
            if (m_ProviderMode == TokenProviderMode.Player)
            {
                response = await m_ApiClient.SubscriptionTokenPlayerAsync(
                    new SubscriptionTokenPlayerRequest(m_CloudProjectId.GetCloudProjectId()));
            }
            else
            {
                response = await m_ApiClient.SubscriptionTokenProjectAsync(
                    new SubscriptionTokenProjectRequest(m_CloudProjectId.GetCloudProjectId()));
            }

            return new ChannelToken() { ChannelName = response.Result.Channel, Token = response.Result.Token };
        }
    }
}
