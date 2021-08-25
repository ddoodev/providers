import { GatewayShardsInfo } from '@src/gateway/GatewayShardsInfo'
import { Provider } from '@src/Provider'
import { GatewayBotInfo } from '@src/gateway/GatewayBotInfo'

/**
 * Represents a gateway provider. Custom gateway providers must implement it.
 *
 * The gateway provider operates events and connects the bot's shards to Discord.
 *
 * **All events must eventually pass through the gateway manager**.
 * Gateway manager emits events to the client and manages events overload protection.
 * If you use a message broker, you still must send events to the client through the gateway manager.
 *
 * Gateway [rate limits](https://discord.com/developers/docs/topics/gateway#rate-limiting) must be handled by the provider itself.
 *
 * @see https://github.com/Discordoo/discordoo/blob/develop/src/gateway/DefaultGatewayProvider.ts
 * */
export interface GatewayProvider extends Provider {
  /**
   * Connect to discord's gateway
   * @param shards - information about shards to serve
   * */
  connect(shards?: GatewayShardsInfo): Promise<unknown>

  /** Disconnect from gateway */
  disconnect(): Promise<unknown>

  /**
   * Disconnect from gateway, then set new shards configuration and connect
   * @param shards - information about shards to serve
   * */
  shards(shards: GatewayShardsInfo): Promise<unknown>

  /**
   * Emit event to the gateway manager or remote host (e.g. rabbitmq), but not to the client directly
   * @param event - event name to emit
   * @param data - data to emit with the event
   * */
  emit(event: string, ...data: any[]): unknown

  /**
   * Send some data to the gateway
   * @param data - data to send
   * */
  send(data: Record<string, any>): unknown

  /**
   * Get gateway bot information
   * @see https://discord.com/developers/docs/topics/gateway#get-gateway-bot
   * */
  getGateway(): Promise<GatewayBotInfo>
}
