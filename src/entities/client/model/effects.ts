import { baseURL } from '@/shared/api'
import { createJsonQuery, declareParams } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { compose, prop } from 'ramda'
import { CLIENT_ENDPOINTS } from './endpoints'
import { FetchClientInfoResSchema } from './schema'
import { FetchClientInfoReq } from './types'

export const fetchClientInfoFx = createJsonQuery({
  request: {
    method: 'GET',
    url: compose(baseURL, CLIENT_ENDPOINTS.fetchInfo, prop('id')),
    credentials: 'include',
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  },
  params: declareParams<FetchClientInfoReq>(),
  response: {
    contract: zodContract(FetchClientInfoResSchema)
  }
})
