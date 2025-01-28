import { createForm } from '@effector-reform/core'
import { zodAdapter } from '@effector-reform/zod'
import { LoginFormSchema } from './schema'

export const loginForm = createForm({
  schema: {
    pin: ''
  },
  validation: zodAdapter(LoginFormSchema)
})
