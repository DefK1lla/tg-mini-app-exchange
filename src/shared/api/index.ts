import { always, equals, ifElse } from 'ramda'

export const baseURL = (endpoint: string) => {
  const url = ifElse(
    equals('LOCAL'),
    always(import.meta.env.VITE_PROXY),
    always(import.meta.env.VITE_BASE_API_URL)
  )(import.meta.env.VITE_CURRENT_ENV)
  return url + endpoint
}
