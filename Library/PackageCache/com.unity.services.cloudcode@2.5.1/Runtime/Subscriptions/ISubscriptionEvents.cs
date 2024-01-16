using System.Threading.Tasks;

namespace Unity.Services.CloudCode.Subscriptions
{
    /// <summary>
    /// An interface allowing the subscription and unsubscription to the Cloud Code subscription system and the callbacks
    /// invoked when an event occurs on the notification system.
    /// </summary>
    public interface ISubscriptionEvents
    {
        /// <summary>
        /// The callbacks associated with the Cloud Code events subscription.
        /// </summary>
        SubscriptionEventCallbacks Callbacks { get; }

        /// <summary>
        /// Subscribes or re-subscribes to the events system.
        /// </summary>
        /// <returns>An awaitable task.</returns>
        /// <exception cref="CloudCodeException">Represents an exception that occurs when communicating with the Cloud Code service.</exception>
        Task SubscribeAsync();

        /// <summary>
        /// Unsubscribes from the events system.
        /// </summary>
        /// <returns>An awaitable task.</returns>
        /// <exception cref="CloudCodeException">Represents an exception that occurs when communicating with the Cloud Code service.</exception>
        Task UnsubscribeAsync();
    }
}
