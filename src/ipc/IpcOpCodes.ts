export enum IpcOpCodes {
    /** Includes common event (t) */
    DISPATCH = 0,
    /** IPC Server should send this to identify itself in IPC Client */
    IDENTIFY = 1,
    /** IPC Client sends this to IPC Server to explain to him who he is. Contains shards list, heartbeat interval */
    HELLO = 2,
    /** Used to cache operating across shards */
    CACHE_OPERATE = 3,
    /** Looks like something went wrong */
    ERROR = 4,
    /** Something urgent is happening. We need to react now. */
    EMERGENCY = 5,
    /** Reserved for future. */
    INVALID_SESSION = 6
}
