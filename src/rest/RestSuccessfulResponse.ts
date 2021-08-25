import { RestResponse } from '@src/rest/RestResponse'

/** Rest provider must return this when request executed successfully. */
export interface RestSuccessfulResponse<Body = any> extends RestResponse {
  success: true
  /** Request result (json body) */
  result: Body
}
