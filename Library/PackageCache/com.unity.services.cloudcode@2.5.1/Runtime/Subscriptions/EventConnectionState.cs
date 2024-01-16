namespace Unity.Services.CloudCode.Subscriptions
{
    /// <summary>
    /// An enum describing the current state of a Cloud Code Event subscription's connection status.
    /// </summary>
    public enum EventConnectionState
    {
        /// <summary>
        /// The cloud code event subscription has reached an unknown state.
        /// </summary>
        Unknown,

        /// <summary>
        /// The cloud code event subscription is currently unsubscribed.
        /// </summary>
        Unsubscribed,

        /// <summary>
        /// The cloud code event subscription is currently trying to connect to the service.
        /// </summary>
        Subscribing,

        /// <summary>
        /// The cloud code event subscription is currently connected, and ready to receive messages.
        /// </summary>
        Subscribed,

        /// <summary>
        /// The cloud code event subscription is currently connected, but for some reason is having trouble receiving messages.
        /// </summary>
        Unsynced,

        /// <summary>
        /// The cloud code event subscription is currently in an error state, and won't recover on its own.
        /// </summary>
        Error,
    }
}
