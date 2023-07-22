import { GatewayOpCodes } from '../../src/gateway/GatewayOpCodes'

export interface GatewaySendPayloadLike {
  op: GatewayOpCodes
  d?: any
}
