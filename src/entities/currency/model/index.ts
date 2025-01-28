import { sample } from 'effector'
import { createGate } from 'effector-react'
import { fetchCryptoFx, fetchFiatFx } from './effects'

export const СurrencyGate = createGate()

sample({
  clock: СurrencyGate.open,
  target: [fetchFiatFx.start, fetchCryptoFx.start]
})

export * from './effects'
export * from './endpoints'
export * from './schema'
export * from './store'
export * from './types'
