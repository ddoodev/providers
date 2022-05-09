/** Operation Codes used in inter-process communication messages */
export enum IpcOpCodes {
  /** Includes common event (t) */
  DISPATCH,
  /** IPC Server should send this to identify itself in IPC Client */
  IDENTIFY,
  /** IPC Client sends this to IPC Server to explain to him who he is. Contains shards list, heartbeat interval */
  HELLO,
  /** Used to cache operating across shards */
  CACHE_OPERATE,
  /** Looks like something went wrong */
  ERROR,
  /** Something urgent is happening. We need to react now. */
  EMERGENCY,
  /** Reserved for future. */
  INVALID_SESSION,
}
