/** Represents what IPC packets look like approximately. */
export interface IpcPacketLike {
  /** IPC operating codes. Example: IpcOpCodes.EMERGENCY (0) */
  op: number
  /** The name of the event that carries the package. Example: 'RATE_LIMIT_HIT' */
  t?: string
  /** Any JSON-serializable data */
  d?: any
}