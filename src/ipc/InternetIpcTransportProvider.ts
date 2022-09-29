import { IpcPacketLike } from '@src/ipc/IpcPacketLike'
import { IpcTransportProviderEventCallback } from '@src/ipc/IpcTransportProviderEventCallback'
import { Provider } from '@src/Provider'
import { IpcManagerIdentificationOptions } from '@src/ipc/IpcManagerIdentificationOptions'

/**
 * **IT IS DANGEROUS TO CREATE YOUR OWN PROVIDERS OF THIS TYPE.
 * THIS PROVIDER HAS ACCESS TO ABSOLUTELY ANY INFORMATION INSIDE THE BOT.
 * THIS PROVIDER IS ABLE TO DO ABSOLUTELY ANYTHING WITH THE BOT.
 * READ THE SECURITY INSTRUCTIONS IN THE DESCRIPTION OF THE listen() METHOD.**
 *
 * Represents a internet ipc transport provider. Custom internet ipc transport providers must implement it.
 *
 * 1. Unlike LocalIpcTransportProvider, operates with sharding managers on different machines via the Internet.
 * 2. The listen() method is called once inside each sharding manager.
 * 3. We will create ONLY 1 instance of your provider in each sharding manager.
 * Your provider must operate multiple connections within a single instance.
 * 4. Your provider should not take more than 100 milliseconds to send a single packet through an ideal connection (localhost).
 * 5. **Your provider should handle disconnects.**
 * When the sharding manager is disconnected, your provider should call the
 * [IpcOpCodes](https://ddoo.dev/docs/api/Providers/latest/ipc/enums/IpcOpCodes).ERROR op code with
 * the [IpcEvents](https://ddoo.dev/docs/api/Providers/latest/ipc/enums/IpcEvents).DISCONNECTED
 * event in all the listeners connected to the sharding manager.
 * Then your provider should disable these listeners.
 * */
export interface InternetIpcTransportProvider extends Provider {
  /**
   * Your provider should create a server.
   * 1. This server should only accept packets from authorized connections.
   * 2. Also, your server should handle the processing and authorization of connections.
   * 3. **It is strongly recommended to use TLS-protected connections.**
   * 4. Your provider will receive default settings from a user with TLS certificates, if the user specifies them.
   * If the user does not specify them, we strongly recommend encrypting the traffic yourself
   * in any way available and not accepting any unencrypted traffic.
   * **Unencrypted traffic can lead to the seizure of control over the entire system of sharding managers.**
   * 5. NEVER ACCEPT CONNECTIONS WITHOUT A USER AND PASSWORD. IF AN ATTEMPT IS MADE TO START THE PROVIDER WITHOUT THIS INFORMATION,
   * THE PROVIDER IS OBLIGED TO THROW AN ERROR AND STOP THE PROCESS.
   * 6. **DO NOT USE PASSWORDS LESS THAN 16 CHARACTERS LONG.** THROW AN ERROR AND STOP THE PROCESS.
   * 7. **ALL HACKING ATTEMPTS WILL BE ON YOUR PROVIDER.
   * THERE IS NO WAY WE CAN PROTECT OUR SYSTEM IF A HOLE IS FOUND IN YOUR PROVIDER.**
   * YOUR PROVIDER WILL HANDLE THE MANAGEMENT COMMANDS OF THE ENTIRE BOT.
   * **IT WILL EVENTUALLY BE POSSIBLE TO PULL THE BOT TOKEN THROUGH YOUR PROVIDER IF YOU DON'T TAKE CARE OF SECURITY.**
   * */
  listen(identity: IpcManagerIdentificationOptions): Promise<void>

  /**
   * Connect to the specified sharding manager.
   * 1. Your provider must connect to the address specified in the identification data,
   * and also provide the receiving server with information about the user and password, if such is provided.
   * 2. If the user and password are specified and are not correct,
   * **your provider should throw an error with message that starts with "Authentication failed."**.
   * Message will be used for error detection and further processing. **The error message you wrote will be given to the user.**
   * 3. If the server we are trying to connect to is inactive,
   * **your provider should throw an error with message that starts with "The server is unavailable."**.
   * Message will be used for error detection and further processing. **The error message you wrote will be given to the user.**
   * 4. Your provider must return the negative number of the sharding manager.
   * @param identity - Identification information for each sharding manager.
   * */
  connect(identity: IpcManagerIdentificationOptions): Promise<number>

  /**
   * Disconnect from the specified sharding manager.
   * Your provider should emit event (packet) with
   * [IpcOpCodes](https://ddoo.dev/docs/api/Providers/latest/ipc/enums/IpcOpCodes).DISPATCH op code and
   * [IpcEvents](https://ddoo.dev/docs/api/Providers/latest/ipc/enums/IpcEvents).DISCONNECTED as t.
   * @param identity - Identification information for each sharding manager.
   * */
  disconnect(identity: IpcManagerIdentificationOptions): Promise<void>

  /**
   * Send the package to the specified shard.
   * @param identity - Identification information for each sharding manager.
   * @param packet - Standardized data in JSON.
   * */
  send(identity: IpcManagerIdentificationOptions, packet: IpcPacketLike): void

  /**
   * Connect the listener. Each incoming packet must be sent to all signed listeners at the same time.
   * @param listenerId - The unique ID of the listener.
   * It contains the sharding manager number, look for for
   * [DiscordooSnowflake](https://ddoo.dev/docs/api/Discordoo/latest/utils/classes/DiscordooSnowflake#method:deconstruct).
   * The listener should receive packets only from this sharding manager.
   * @param fn - Listener callback.
   * */
  subscribe(listenerId: string, fn: IpcTransportProviderEventCallback): void

  /**
   * Remove the listener.
   * @param listenerId - The unique ID of the listener. It contains the sharding manager number, look for
   * [DiscordooSnowflake](https://ddoo.dev/docs/api/Discordoo/latest/utils/classes/DiscordooSnowflake#method:deconstruct).
   * */
  unsubscribe(listenerId: string): void

}