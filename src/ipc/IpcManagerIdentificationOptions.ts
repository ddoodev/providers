/**
 * Information about the identification of the sharding manager.
 *
 * This information will be passed to the IPC transport provider when the connect() (or disconnect()) method is called.
 * */
export interface IpcManagerIdentificationOptions {
  /** This is a unique identifier generated by the library for each sharding manager, including shards. */
  id: string
  /** IP address (v6/v4) or domain name to connect or disconnect from. */
  host: string
  /** Port. What else? */
  port: number
  /** The username used for a more secure connection. */
  user?: string
  /** The password used for a more secure connection. */
  password?: string
}