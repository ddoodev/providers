/**
 * If the client uses sharding, information about how many shards to serve is received during the execution of client.start().
 * Therefore, gateway needs such an option, it will override the existing settings and use them to connect.
 * */
export interface GatewayShardsInfo {
  /** Gateway shards ids to serve */
  shards: number[]
  /** The number of shards the client has */
  totalShards: number
}
