/*
 Based on https://github.com/discordjs/discord-api-types/blob/d1498c3ce2eaea11c9946726ef758f7de489253b/payloads/v9/gateway.ts
 (MIT license)
*/

/** https://discord.com/developers/docs/topics/gateway#get-gateway-bot */
export interface GatewayBotInfo {
  /** The WSS URL that can be used for connecting to the gateway */
  url: string
  /**
   * The recommended number of shards to use when connecting
   * @see https://discord.com/developers/docs/topics/gateway#sharding
   * */
  shards: number
  /**
   * Information on the current session start limit
   * @see https://discord.com/developers/docs/topics/gateway#session-start-limit-object
   * */
  session_start_limit: {
    /** The total number of session starts the current user is allowed */
    total: number
    /** The remaining number of session starts the current user is allowed */
    remaining: number
    /** The number of milliseconds after which the limit resets */
    reset_after: number
    /** The number of identify requests allowed per 5 seconds */
    max_concurrency: number
  }
}
