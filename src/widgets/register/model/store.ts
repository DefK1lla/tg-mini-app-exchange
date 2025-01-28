import { createForm } from '@effector-reform/core'
import { zodAdapter } from '@effector-reform/zod'
import { createStore } from 'effector'
import { CODE_TTL } from './const'
import { RegisterFormSchema } from './schema'
import { RegisterSteps } from './types'

export const registerForm = createForm({
  schema: {
    token: '',
    pin: '',
    confirmPin: ''
  },
  validation: zodAdapter(RegisterFormSchema),
  validationStrategies: ['change']
})

export const $registerStep = createStore(RegisterSteps.TOKEN)
export const $code = createStore('')
export const $codeTtl = createStore<number>(CODE_TTL)
