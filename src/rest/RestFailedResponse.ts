import { RestResponse } from '@src/rest/RestResponse'

/** Rest provider must return this when request execution failed. */
export interface RestFailedResponse extends RestResponse {
  success: false
  result: any // TODO: RestError
}
