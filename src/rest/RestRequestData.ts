import { RestRequestMethods } from '@src/rest/RestRequestMethods'
import { RawAttachment } from '@src/rest/RawAttachment'

/** Data for the rest request */
export interface RestRequestData {
  /** GET, POST, etc. */
  method: RestRequestMethods
  /** Url path: https://www.youtube.com/ **watch?v=g0WmiI2QUw0** */
  path: string
  /** Files to attach (empty array if 0) */
  attachments: RawAttachment[]
  /** Request body */
  body?: Record<any, any>
  /** Request headers */
  headers?: Record<string, any>
}
