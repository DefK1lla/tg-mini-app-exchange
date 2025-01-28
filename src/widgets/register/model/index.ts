import { $userInfo } from '@/entities/telegram'
import { PIN_LENGTH } from '@/shared/model/const'
import { isHttpErrorCode } from '@farfetched/core'
import { sample } from 'effector'
import {
  __,
  always,
  compose,
  dec,
  gt,
  inc,
  isNotNil,
  lt,
  prop,
  subtract
} from 'ramda'
import { CODE_TTL } from './const'
import { createVerificationCodeFx, registerFx, verifyFx } from './effects'
import {
  createNewCodeEv,
  registerNextStepEv,
  registerPrevStepEv,
  setCode,
  startTimer,
  stopTimer,
  tick,
  verifyEv
} from './events'
import { $code, $codeTtl, $registerStep, registerForm } from './store'
import { RegisterSteps } from './types'

sample({
  clock: setCode,
  target: $code
})

sample({
  clock: registerNextStepEv,
  source: $registerStep,
  filter: gt(RegisterSteps.VERIFICATION),
  fn: inc,
  target: $registerStep
})

sample({
  clock: registerPrevStepEv,
  source: $registerStep,
  filter: lt(RegisterSteps.TOKEN),
  fn: dec,
  target: $registerStep
})

sample({
  clock: registerForm.$values.map((v) => v.pin),
  source: $registerStep,
  filter: (step, pin) =>
    step === RegisterSteps.PIN && pin.length === PIN_LENGTH,
  fn: inc,
  target: $registerStep
})

sample({
  clock: registerForm.$values.map((v) => v.confirmPin),
  source: { step: $registerStep, pin: registerForm.$values.map((v) => v.pin) },
  filter: (src, confirmPin) =>
    src.step === RegisterSteps.CONFIRM_PIN &&
    confirmPin === src.pin &&
    src.pin.length === PIN_LENGTH,
  target: registerForm.submit
})

sample({
  clock: registerForm.submitted,
  source: {
    userId: $userInfo.map((v) => v?.id),
    form: registerForm.$values,
    errors: registerForm.$errors
  },
  fn: (src) => ({
    userId: String(src.userId),
    referralToken: src.form.token,
    pinCode: src.form.pin
  }),
  target: registerFx.start
})

sample({
  clock: registerFx.finished.success,
  fn: (res) => res.result,
  target: [registerNextStepEv, createVerificationCodeFx.start]
})

sample({
  clock: registerFx.finished.failure,
  filter: isHttpErrorCode(409),
  fn: always(RegisterSteps.ALREADY_REGISTERED),
  target: [registerForm.reset, $registerStep]
})

sample({
  clock: createNewCodeEv,
  source: registerFx.$data,
  filter: isNotNil,
  target: createVerificationCodeFx.start
})

sample({
  clock: createVerificationCodeFx.finished.success,
  fn: always(CODE_TTL),
  target: [$codeTtl, startTimer]
})

sample({
  clock: tick,
  source: $codeTtl,
  filter: lt(0),
  fn: subtract(__, 1),
  target: $codeTtl
})

sample({
  clock: [stopTimer, startTimer],
  fn: always(CODE_TTL),
  target: $codeTtl
})

sample({
  clock: verifyEv,
  source: {
    code: $code,
    registrationId: registerFx.$data.map((v) => v?.registrationId)
  },
  filter: compose(Boolean, prop('registrationId')),
  fn: (src) => ({
    code: src.code,
    registrationId: src.registrationId!
  }),
  target: verifyFx.start
})

sample({
  clock: verifyFx.finished.success,
  fn: always(RegisterSteps.SUCCESS),
  target: $registerStep
})

export * from './effects'
export * from './events'
export * from './store'
export * from './types'
