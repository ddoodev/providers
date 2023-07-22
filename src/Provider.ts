export interface Provider {
  /**
   * The init() function exists to tell the provider when the client is starting.
   * If the provider started incorrectly, it should throw an error and reject the promise.
   * */
  init(): Promise<unknown>
}
