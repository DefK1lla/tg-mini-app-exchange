export const EXCHANGE_ENDPOINTS = {
  create: () => '/exchange/v1/exchange',
  fetchOne: (id: string) => `/exchange/v1/exchange/${id}`,
  fetchAll: () => '/exchange/v1/exchanges'
}
