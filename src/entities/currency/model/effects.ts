import { baseURL } from '@/shared/api'
import { createJsonQuery } from '@farfetched/core'
import { zodContract } from '@farfetched/zod'
import { CURRENCY_ENDPOINTS } from './endpoints'
import { CurrencyResSchema } from './schema'

export const fetchCryptoFx = createJsonQuery({
  request: {
    url: baseURL(CURRENCY_ENDPOINTS.crypto()),
    method: 'GET',
    credentials: 'include',
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  },
  response: {
    contract: zodContract(CurrencyResSchema)
  }
})

export const fetchFiatFx = createJsonQuery({
  request: {
    url: baseURL(CURRENCY_ENDPOINTS.fiat()),
    method: 'GET',
    credentials: 'include',
    headers: {
      'ngrok-skip-browser-warning': '69420'
    }
  },
  response: {
    contract: zodContract(CurrencyResSchema)
  }
})
