import { GatewayShardsInfo } from '@src/gateway/GatewayShardsInfo'
import { Provider } from '@src/Provider'
import { GatewayBotInfo } from '@src/gateway/GatewayBotInfo'
import { GatewaySendOptions } from '@src/gateway/GatewaySendOptions'
import { GatewaySendPayloadLike } from '@src/gateway/GatewaySendPayloadLike'

/**
 * Represents a gateway provider. Custom gateway providers must implement it.
 *
 * The gateway provider operates events and connects the bot's shards to Discord.
 *
 * **All events expect custom must eventually pass through the gateway manager**. (GatewayManager.emit())
 * If your provider adds new events, these events should not pass through the GatewayManager.
 * Gateway manager emits events to the client and manages events overload protection and manages cache.
 * If you use a message broker, you still must send events to the client through the gateway manager (on the recipient's side).
 *
 * **WARNING:**
 * YOUR PROVIDER MUST EMIT
 * [GUILD_MEMBERS_CHUNK](https://discord.com/developers/docs/topics/gateway#guild-members-chunk-guild-members-chunk-event-fields)
 * AND
 * [READY](https://discord.com/developers/docs/topics/gateway#ready)
 * AND
 * [GUILD_CREATE](https://discord.com/developers/docs/topics/gateway#guild-create)
 * EVENTS WITH RAW DATA TO THE GATEWAY MANAGER REGARDLESS OF THE SITUATION.
 * IF YOU DON'T EMIT GUILD_MEMBERS_CHUNK, THE ClientMembersManager#fetchMany AND ClientMembersManager#fetch
 * AND ALL DEPENDENT FUNCTIONS WILL RETURN AN INFINITE PROMISE OR TIMEOUT ERROR.
 * IF YOU DON'T EMIT READY AND GUILD_CREATE, THE CLIENT WILL NEVER BE ABLE TO START CORRECTLY.
 * IF RUNNING IN SHARDING INSTANCE, THE CLIENT WILL BE CYCLICALLY RESTARTED.
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
   * @param shardId - id of shard from which the event came
   * @param event - event name to emit
   * @param data - data to emit with the event
   * */
  emit(shardId: number, event: string, ...data: any[]): unknown

  /**
   * Send some data to the gateway
   * @param data - data to send
   * @param options - send options
   * */
  send(data: GatewaySendPayloadLike, options?: GatewaySendOptions): unknown

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
   * Get the network latency of the shards websocket separately [ [ shardId, latency ], [ shardId, latency ] ]
   * */
  ping(shards: number[]): Array<[ number, number ]>

  ping(shards?: number[]): number | Array<[ number, number ]>

}
