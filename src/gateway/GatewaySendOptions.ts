export interface GatewaySendOptions {
  /** Shards to send data to */
  shards?: number[]
  /** Whether this request is important or not. If yes, it must send this request first. */
  important?: boolean
}
