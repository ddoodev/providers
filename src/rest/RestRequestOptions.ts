import { AuthLike } from '@src/rest/AuthLike'

/** Options for the rest request */
export interface RestRequestOptions {
  /** Reason for X-Audit-Log-Reason header */
  reason?: string
  /** Auth to use for this request */
  auth?: AuthLike
  /** Whether use any auth for request or not */
  useAuth?: boolean
}
