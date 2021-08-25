import { RestSuccessfulResponse } from '@src/rest/RestSuccessfulResponse'
import { RestFailedResponse } from '@src/rest/RestFailedResponse'

/**
 * Just type alias because we don't like use ctrl+c and ctrl+v
 * */
export type RestFinishedResponse<T> = Promise<RestSuccessfulResponse<T> | RestFailedResponse>
