import { IpcPacketLike } from '../../src/ipc/IpcPacketLike'

/**
 * Callback for IPC events listeners.
 *
 * @param from - shard or sharding manager number where the package came from.
 * @param packet - packet data.
 * */
export type IpcTransportProviderEventCallback = (from: number, packet: IpcPacketLike) => any
