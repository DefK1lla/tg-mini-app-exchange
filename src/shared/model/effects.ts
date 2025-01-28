import { createJsonQuery, unknownContract } from '@farfetched/core'
import { baseURL } from '../api'
import { ENDPOINTS } from './endpoints'

export const logoutFx = createJsonQuery({
  request: {
    method: 'POST',
    url: baseURL(ENDPOINTS.logout())
  },
  response: {
    contract: unknownContract
  }
})
