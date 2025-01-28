import { sample } from 'effector'
import { createGate } from 'effector-react'
import { fetchAllExchangesFx } from './effects'

export const ExchangesGate = createGate()

sample({
  clock: ExchangesGate.open,
  target: fetchAllExchangesFx.start
})

sample({
  clock: fetchAllExchangesFx.finished.failure,
  fn: (res) => console.log('failure', res)
})

sample({
  clock: fetchAllExchangesFx.finished.success,
  fn: (res) => console.log('success', res)
})

export * from './effects'
export * from './schema'
export * from './types'
