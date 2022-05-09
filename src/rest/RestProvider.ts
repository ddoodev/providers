import { RestFinishedResponse } from '@src/rest/RestFinishedResponse'
import { RestRequestOptions } from '@src/rest/RestRequestOptions'
import { RestRequestData } from '@src/rest/RestRequestData'
import { Provider } from '@src/Provider'

/**
 * Represents a rest provider. Custom rest providers must implement it.
 *
 * 1. **Must not throw any errors**. Use RestFailedResponse instead.
 *
 * 2. Optionally can handle rate limits. Built-in rate limits handling can be disabled in the rest options.
 *
 * @see https://github.com/Discordoo/discordoo/blob/develop/src/rest/DefaultRestProvider.ts
 * */
export interface RestProvider extends Provider {

  /**
   * Perform a request
   * @param data - request data
   * @param options - request options
   * */
  request<T = any>(data: RestRequestData, options?: RestRequestOptions): RestFinishedResponse<T>

}
