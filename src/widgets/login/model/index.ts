import { $userInfo } from '@/entities/telegram'
import { PIN_LENGTH } from '@/shared/model/const'
import { sample } from 'effector'
import { compose, prop } from 'ramda'
import { loginFx } from './effects'
import { loginForm } from './store'

sample({
  clock: loginForm.$values.map((v) => v.pin),
  source: $userInfo,
  filter: (src, clck) => !!src?.id && clck.length === PIN_LENGTH,
  fn: (src, clck) => ({
    id: compose(String, prop('id'))(src),
    pin: clck
  }),
  target: loginFx.start
})

sample({
  clock: loginFx.$finished,
  target: loginForm.reset
})

export * from './effects'
export * from './schema'
export * from './store'
