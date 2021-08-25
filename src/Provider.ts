/** Base interface for all providers */
export interface Provider {
  /**
   * The init() function exists to tell the provider when the client connects to Discord.
   * If the provider started incorrectly, it should throw an error and reject the promise.
   * */
  init(): Promise<unknown>
}
