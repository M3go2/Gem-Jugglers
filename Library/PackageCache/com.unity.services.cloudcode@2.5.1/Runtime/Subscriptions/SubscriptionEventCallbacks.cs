using System;

namespace Unity.Services.CloudCode.Subscriptions
{
    public class SubscriptionEventCallbacks
    {
        /// <summary>
        /// Event called when a message is received
        /// </summary>
        public event Action<IMessageReceivedEvent> MessageReceived;

        /// <summary>
        /// Event called when the connection state of the events subscription changes.
        /// </summary>
        public event Action<EventConnectionState> ConnectionStateChanged;

        /// <summary>
        /// Event called when subscription was kicked remotely.
        /// </summary>
        public event Action Kicked;

        /// <summary>
        /// Event called when the subscription system sent an error message.
        /// </summary>
        public event Action<string> Error;

        /// <summary>
        /// Invoked when a player MESSAGE event occurs on the subscription channel.
        /// </summary>
        /// <param name="messageReceivedEvent">The payload of the message event.</param>
        internal void InvokeMessageReceived(IMessageReceivedEvent messageReceivedEvent)
        {
            MessageReceived?.Invoke(messageReceivedEvent);
        }

        /// <summary>
        /// Invoked when the connection state of the events subscription changes.
        /// </summary>
        /// <param name="state">The state of the connection</param>
        internal void InvokeEventConnectionStateChanged(EventConnectionState state)
        {
            ConnectionStateChanged?.Invoke(state);
        }

        /// <summary>
        /// Invoked when a subscription was kicked remotely.
        /// </summary>
        internal void InvokeEventKicked()
        {
            Kicked?.Invoke();
        }

        /// <summary>
        /// Invoked when the subscription system sent an error message.
        /// </summary>
        internal void InvokeEventError(string error)
        {
            Error?.Invoke(error);
        }
    }
}
