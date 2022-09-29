import { GatewayOpCodes } from '@src/gateway/GatewayOpCodes'

export interface GatewayReceivePayloadLike {
  op: GatewayOpCodes
  d?: any
  s?: number
  t?: string
}