export interface RawAttachment {
  /** Attachment filename */
  name: string
  /** Attachment binary data */
  data: ArrayBuffer | Buffer
  /** Whether this attachment is ephemeral */
  ephemeral: boolean
}
