export interface GatewayShardsInfo {
  /** Gateway shards ids to serve */
  shards: number[]
  /** The number of shards the client has */
  totalShards: number
}
