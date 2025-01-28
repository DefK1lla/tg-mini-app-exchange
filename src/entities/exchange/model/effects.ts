import { baseURL } from '@/shared/api'
import { createJsonQuery, declareParams } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { compose, identity, propOr } from 'ramda'
import { EXCHANGE_ENDPOINTS } from './endpoints'
import {
  CreateExchangeResSchema,
  FetchAllExchangesResSchema,
  FetchExchangeResSchema
} from './schema'
import { CreateExchangeReq, FetchExchangeReq } from './types'

export const createExchangeFx = createJsonQuery({
  request: {
    url: baseURL(EXCHANGE_ENDPOINTS.create()),
    method: 'POST',
    body: identity,
    credentials: 'include'
  },
  params: declareParams<CreateExchangeReq>(),
  response: {
    contract: zodContract(CreateExchangeResSchema)
  }
})

export const fetchExchangeFx = createJsonQuery({
  request: {
    url: compose(baseURL, EXCHANGE_ENDPOINTS.fetchOne, propOr('', 'id')),
    method: 'GET',
    query: identity,
    credentials: 'include',
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  },
  params: declareParams<FetchExchangeReq>(),
  response: {
    contract: zodContract(FetchExchangeResSchema)
  }
})

export const fetchAllExchangesFx = createJsonQuery({
  request: {
    method: 'GET',
    url: baseURL(EXCHANGE_ENDPOINTS.fetchAll()),
    credentials: 'include',
    headers: {
      'ngrok-skip-browser-warning': '69420'
    },
    query: {
      limit: 30,
      offset: 0
    }
  },
  response: {
    contract: zodContract(FetchAllExchangesResSchema)
  }
})
