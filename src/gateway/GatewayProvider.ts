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

  /**
   * Disconnect from gateway
   * @param shards - id of shards to disconnect
   * */
  disconnect(shards?: number[]): Promise<unknown>

  /**
   * Reconnect shard(s)
   * @param shards - id of shards to reconnect
   * */
  reconnect(shards?: number[]): Promise<unknown>

  /**
   * Disconnect from gateway, then set new shards configuration and connect
   * @param shards - information about shards to serve
   * */
  reorganizeShards(shards: GatewayShardsInfo): Promise<unknown>

  /**
   * Emit event to the gateway manager or remote host (e.g. rabbitmq), but not to the client directly
   * @param event - event name to emit
   * @param data - data to emit with the event
   * */
  emit(event: string, ...data: any[]): unknown

  /**
   * Send some data to the gateway
   * @param data - data to send
   * @param shards - id of shards to send data to
   * */
  send(data: Record<string, any>, shards?: number[]): unknown

  /**
   * Get gateway bot information
   * @see https://discord.com/developers/docs/topics/gateway#get-gateway-bot
   * */
  getGateway(): Promise<GatewayBotInfo>

  /**
   * Insert the shard in the spawn queue. You can simply use GatewayManager.waitShardSpawnTurn for this (client.internals.gateway)
   * @param shardId - id of the shard to insert into the queue
   * */
  waitShardSpawnTurn(shardId: number): Promise<unknown>

  /**
   * Get the network latency of the shards websocket
   * */
  ping(): number

  /**
   * Get the network latency of the shards websocket separately
   * */
  ping(shards: number[]): number[]

  ping(shards?: number[]): number | number[]

  // TODO: presenceUpdate
  // TODO: requestGuildMembers
}
