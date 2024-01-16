using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Unity.Services.CloudCode.Internal.Http;
using Unity.Services.Core;
using Unity.Services.Wire.Internal;
using UnityEngine;

namespace Unity.Services.CloudCode.Subscriptions
{
    /// <summary>
    /// A class for you to provide the callbacks to invoke for Cloud Code events, a way to subscribe and unsubscribe
    /// to Cloud Code events and get real time updates on the connection state of the Cloud Code subscription system.
    /// </summary>
    class SubscriptionChannel : ISubscriptionEvents
    {
        readonly JsonSerializerSettings m_JsonSerializerSettings =
            new JsonSerializerSettings { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

        /// <summary>
        /// This object allows the subscription to a channel.
        /// </summary>
        readonly IChannel m_Channel;

        /// <summary>
        /// Offers the methods to call when events occur on the channel.
        /// </summary>
        public SubscriptionEventCallbacks Callbacks { get; }

        /// <summary>
        /// Initialize the subscription channel with event callbacks.
        /// </summary>
        /// <param name="channel">This object allows the subscription to a channel.</param>
        /// <param name="callbacks">The callbacks you want to be called from the events subscription.</param>
        internal SubscriptionChannel(IChannel channel, SubscriptionEventCallbacks callbacks)
        {
            Callbacks = callbacks;

            m_Channel = channel;
            m_Channel.MessageReceived += payload => { OnSubscriptionMessage(payload, callbacks); };
            m_Channel.BinaryMessageReceived += bytes => { OnSubscriptionMessageBytes(bytes, callbacks); };
            m_Channel.NewStateReceived += state => { OnSubscriptionNewState(state, callbacks); };
            m_Channel.KickReceived += () => { OnSubscriptionKick(callbacks); };
            m_Channel.ErrorReceived += error => { OnSubscriptionError(error, callbacks); };
        }

        ///<inheritdoc cref="ISubscriptionEvents.SubscribeAsync"/>
        public async Task SubscribeAsync()
        {
            try
            {
                await m_Channel.SubscribeAsync();
            }
            catch (RequestFailedException ex)
            {
                throw ex.ErrorCode switch
                {
                    23003 => new CloudCodeException(CloudCodeExceptionReason.SubscriptionError, 1337,
                        $"The connection to the subscribe system failed.", ex),
                    23008 => new CloudCodeException(CloudCodeExceptionReason.SubscriptionError, 1337,
                        $"Subscription system is already in a subscribed state.", ex),
                    _ => new CloudCodeException(CloudCodeExceptionReason.SubscriptionError, 1337,
                        DefaultErrorMessage(ex.ErrorCode), ex)
                };
            }
        }

        ///<inheritdoc cref="ISubscriptionEvents.UnsubscribeAsync"/>
        public async Task UnsubscribeAsync()
        {
            try
            {
                await m_Channel.UnsubscribeAsync();
            }
            catch (RequestFailedException ex)
            {
                throw ex.ErrorCode switch
                {
                    23009 => new CloudCodeException(CloudCodeExceptionReason.SubscriptionError, 1337,
                        $"Subscription system is already in an unsubscribed state.", ex),
                    _ => new CloudCodeException(CloudCodeExceptionReason.SubscriptionError, 1337,
                        DefaultErrorMessage(ex.ErrorCode), ex)
                };
            }
        }

        /// <summary>
        /// Invoked when a new message is received on the subscription channel.
        /// </summary>
        /// <param name="payload">The payload received on the subscription channel.</param>
        /// <param name="callbacks">The callbacks you want to be called from the events subscription.</param>
        void OnSubscriptionMessage(string payload, SubscriptionEventCallbacks callbacks)
        {
            try
            {
                callbacks.InvokeMessageReceived(
                    IsolatedJsonConvert.DeserializeObject<MessageReceivedEvent>(payload, m_JsonSerializerSettings));
            } catch (JsonException ex)
            {
                Debug.unityLogger.LogException(ex);
            }
        }

        /// <summary>
        /// Invoked when a new message is received as bytes on the subscription channel.
        /// </summary>
        /// <param name="payload">The payload received on the subscription channel.</param>
        /// <param name="callbacks">The callbacks you want to be called from the events subscription.</param>
        void OnSubscriptionMessageBytes(byte[] payload, SubscriptionEventCallbacks callbacks)
        {
            try
            {
                callbacks.InvokeMessageReceived(
                    IsolatedJsonConvert.DeserializeObject<MessageReceivedEvent>(Encoding.ASCII.GetString(payload),
                        m_JsonSerializerSettings));
            } catch (JsonException ex)
            {
                Debug.unityLogger.LogException(ex);
            }
        }

        /// <summary>
        /// Event called when the connection state of the Cloud Code event subscription changes.
        /// </summary>
        /// <param name="state">The new state the subscription system is currently in.</param>
        /// <param name="callbacks">The callbacks you want to be called from the Cloud Code event subscription.</param>
        void OnSubscriptionNewState(SubscriptionState state, SubscriptionEventCallbacks callbacks)
        {
            switch (state)
            {
                case SubscriptionState.Unsubscribed: callbacks.InvokeEventConnectionStateChanged(EventConnectionState.Unsubscribed); break;
                case SubscriptionState.Subscribing: callbacks.InvokeEventConnectionStateChanged(EventConnectionState.Subscribing); break;
                case SubscriptionState.Synced: callbacks.InvokeEventConnectionStateChanged(EventConnectionState.Subscribed); break;
                case SubscriptionState.Unsynced: callbacks.InvokeEventConnectionStateChanged(EventConnectionState.Unsynced); break;
                case SubscriptionState.Error: callbacks.InvokeEventConnectionStateChanged(EventConnectionState.Error); break;
                // Currently, it's impossible to reach the default case.
                default: callbacks.InvokeEventConnectionStateChanged(EventConnectionState.Unknown); break;
            }
        }

        /// <summary>
        /// Event called when there was a remote kick event in the subscription system.
        /// </summary>
        /// <param name="callbacks">The callbacks you want to be called from the Cloud Code event subscription.</param>
        void OnSubscriptionKick(SubscriptionEventCallbacks callbacks)
        {
            callbacks.InvokeEventKicked();
        }

        /// <summary>
        /// Event called when an error was sent from the subscription system.
        /// </summary>
        /// <param name="error">The error that was received from the subscription system.</param>
        /// <param name="callbacks">The callbacks you want to be called from the Cloud Code event subscription.</param>
        void OnSubscriptionError(string error, SubscriptionEventCallbacks callbacks)
        {
            callbacks.InvokeEventError(error);
        }

        /// <summary>
        /// Default error message string builder to centralize errors raised by the SubscriptionChannel based on the Wire error code.
        /// </summary>
        /// <param name="wireErrorCode">The error code received by the Wire subscription system.</param>
        static string DefaultErrorMessage(int wireErrorCode)
        {
            return $"There was an error when trying to connect to the Cloud Code service for subscription messages. (error code: {wireErrorCode})";
        }
    }
}
