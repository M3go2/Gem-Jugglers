using System.Collections.Generic;
using System.Threading.Tasks;
using Unity.Services.CloudCode.Subscriptions;

namespace Unity.Services.CloudCode
{
    /// <summary>
    /// Client SDK for Cloud Code.
    /// https://dashboard.unity3d.com/cloud-code
    ///
    /// Streamline your game code in the cloud. Cloud Code shifts your game logic away from your servers, interacting seamlessly with backend services.
    /// </summary>
    public interface ICloudCodeService
    {
        /// <summary>
        /// Calls a Cloud Code function.
        /// </summary>
        /// <param name="function">Cloud Code function to call</param>
        /// <param name="args">Arguments for the cloud code function. Will be serialized to JSON.</param>
        /// <returns>String representation of the return value of the called function. Intended to enable custom serializers.</returns>
        /// <exception cref="CloudCodeException">Thrown if request is unsuccessful.</exception>
        /// <exception cref="CloudCodeRateLimitedException">Thrown if the service returned rate limited error.</exception>
        Task<string> CallEndpointAsync(string function, Dictionary<string, object> args = null);

        /// <summary>
        /// Calls a Cloud Code function.
        /// </summary>
        /// <param name="function">Cloud Code function to call.</param>
        /// <param name="args">Arguments for the cloud code function. Will be serialized to JSON.</param>
        /// <typeparam name="TResult">Serialized from JSON returned by Cloud Code.</typeparam>
        /// <returns>Serialized output from the called function.</returns>
        /// <exception cref="CloudCodeException">Thrown if request is unsuccessful.</exception>
        /// <exception cref="CloudCodeRateLimitedException">Thrown if the service returned rate limited error.</exception>
        Task<TResult> CallEndpointAsync<TResult>(string function, Dictionary<string, object> args = null);

        /// <summary>
        /// Calls a Cloud Code function.
        /// </summary>
        /// <param name="module">Cloud Code Module to call</param>
        /// <param name="function">Cloud Code function to call.</param>
        /// <param name="args">Arguments for the cloud code function. Will be serialized to JSON.</param>
        /// <returns>String representation of the return value of the called function. Intended to enable custom serializers.</returns>
        /// <exception cref="CloudCodeException">Thrown if request is unsuccessful.</exception>
        /// <exception cref="CloudCodeRateLimitedException">Thrown if the service returned rate limited error.</exception>
        Task<string> CallModuleEndpointAsync(string module, string function, Dictionary<string, object> args = null);

        /// <summary>
        /// Calls a Cloud Code function.
        /// </summary>
        /// <param name="module">Cloud Code Module to call</param>
        /// <param name="function">Cloud Code function to call.</param>
        /// <param name="args">Arguments for the cloud code function. Will be serialized to JSON.</param>
        /// <typeparam name="TResult">Serialized from JSON returned by Cloud Code.</typeparam>
        /// <returns>Serialized output from the called function.</returns>
        /// <exception cref="CloudCodeException">Thrown if request is unsuccessful.</exception>
        /// <exception cref="CloudCodeRateLimitedException">Thrown if the service returned rate limited error.</exception>
        Task<TResult> CallModuleEndpointAsync<TResult>(string module, string function, Dictionary<string, object> args = null);

        /// <summary>
        /// Subscribe to push messages from the Cloud Code service for the currently logged in player.
        /// </summary>
        /// <param name="callbacks">The event callbacks to be invoked when messages are received from Cloud Code</param>
        /// <returns>SubscriptionEvents object that can be used to unsubscribe from messages.</returns>
        /// <exception cref="CloudCodeException">Thrown if request is unsuccessful.</exception>
        Task<ISubscriptionEvents> SubscribeToPlayerMessagesAsync(SubscriptionEventCallbacks callbacks);

        /// <summary>
        /// Subscribe to push messages from the Cloud Code service for all project-wide messages.
        /// </summary>
        /// <param name="callbacks">The event callbacks to be invoked when messages are received from Cloud Code</param>
        /// <returns>SubscriptionEvents object that can be used to unsubscribe from messages.</returns>
        /// <exception cref="CloudCodeException">Thrown if request is unsuccessful.</exception>
        Task<ISubscriptionEvents> SubscribeToProjectMessagesAsync(SubscriptionEventCallbacks callbacks);
    }

    public class CloudCodeService
    {
        public static ICloudCodeService Instance { get; internal set; }
    }
}
