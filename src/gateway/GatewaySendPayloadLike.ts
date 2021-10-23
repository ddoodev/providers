import { GatewayOpCodes } from '@src/gateway/GatewayOpCodes'

export type GatewaySendPayloadLike = { op: GatewayOpCodes; d?: any }
