import { $userInfo } from '@/entities/telegram'
import { sample } from 'effector'
import { createGate } from 'effector-react'
import { fetchClientInfoFx } from './effects'

export const ClientGate = createGate()

sample({
  clock: ClientGate.open,
  source: {
    id: $userInfo.map((u) => u?.id),
    clientInfo: fetchClientInfoFx.$data
  },
  filter: (src) => !!src.id && !src.clientInfo,
  fn: (src) => ({ id: String(src.id) }),
  target: fetchClientInfoFx.start
})

sample({
  clock: fetchClientInfoFx.finished.success,
  fn: (res) => console.log('success', res)
})

sample({
  clock: fetchClientInfoFx.finished.failure,
  fn: (res) => console.log('failure', res)
})

export * from './effects'
export * from './endpoints'
export * from './schema'
export * from './types'
