export interface RestResponse {
  /** Whether request executed successfully or not */
  success: boolean
  /** Response status code or -1 to indicate an internal error of the provider */
  statusCode: number | -1
  /** Response headers */
  headers: any
  /** The delay between sending the request and the first bit of the response */
  latency: number
}
