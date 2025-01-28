import { LangCode } from '@/features/i18n'
import { IconLeftArrow } from '@/shared/assets'
import { PIN_LENGTH } from '@/shared/model/const'
import { AUTH_URLS, RoutesList, URLS } from '@/shared/model/router'
import { Pending } from '@/shared/ui/pending'
import { useForm } from '@effector-reform/react'
import {
  Button,
  Input,
  PinInput,
  Placeholder,
  Text
} from '@telegram-apps/telegram-ui'
import { useUnit } from 'effector-react'
import { compose, includes, join, map, mergeRight, pathOr, split } from 'ramda'
import { CSSProperties, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import {
  $code,
  $codeTtl,
  $registerStep,
  createNewCodeEv,
  createVerificationCodeFx,
  registerForm,
  registerFx,
  registerNextStepEv,
  registerPrevStepEv,
  RegisterSteps,
  setCode,
  verifyEv,
  verifyFx
} from './model'

const langStyles: CSSProperties = {
  position: 'fixed',
  bottom: 36,
  left: 20,
  zIndex: 9999,
  width: 'calc(100% / 3 - 25px)',
  height: 50,
  borderRadius: 16
}

const wrapperStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'var(--tg-bg-color)'
}

const Token = ({
  value,
  onChange,
  onCotinue
}: {
  value: string
  onChange: (value: string) => void
  onCotinue: () => void
}) => {
  const { t } = useTranslation()
  return (
    <div style={wrapperStyles}>
      <Input
        header={t('auth.token_label')}
        placeholder={t('auth.token_placeholder')}
        value={value}
        onChange={compose(onChange, pathOr('', ['target', 'value']))}
      />
      <Button
        onClick={onCotinue}
        style={{ margin: '0 20px' }}
        disabled={!value}
      >
        {t('auth.continue')}
      </Button>
    </div>
  )
}

const Pin = ({
  onChange,
  value
}: {
  value: string
  onChange: (value: string) => void
}) => {
  const { t } = useTranslation()

  return (
    <PinInput
      value={compose(map(Number), split(''))(value)}
      onChange={compose(onChange, join(''))}
      label={t('auth.create_a_pin')}
      pinCount={PIN_LENGTH}
    />
  )
}

const ConfirmPin = ({
  currentPin,
  value,
  onChange
}: {
  currentPin: string
  onChange: (value: string) => void
  value: string
}) => {
  const { t } = useTranslation()
  return (
    <PinInput
      value={compose(map(Number), split(''))(value)}
      onChange={compose(onChange, join(''))}
      label={
        value?.length === PIN_LENGTH && value !== currentPin
          ? t('auth.pins_dont_match')
          : t('auth.confirm_a_pin')
      }
      pinCount={PIN_LENGTH}
    />
  )
}

const Verification = ({
  onRetry,
  onSubmit,
  value,
  onChange,
  ttl
}: {
  onRetry: () => void
  onSubmit: () => void
  value: string
  onChange: (value: string) => void
  ttl: number
}) => {
  const { t } = useTranslation()
  return (
    <div style={wrapperStyles}>
      <Input
        header={t('auth.code')}
        placeholder={t('auth.verification_code')}
        value={value}
        onChange={compose(onChange, pathOr('', ['target', 'value']))}
      />
      <Button style={{ margin: '0 15px' }} onClick={onSubmit}>
        {t('auth.submit')}
      </Button>

      <div style={{ textAlign: 'center' }}>
        <Text>
          {t('auth.no_code')} {ttl}
        </Text>
        <Button onClick={onRetry} mode='plain' disabled={ttl > 0}>
          {t('auth.refech_code')}
        </Button>
      </div>
    </div>
  )
}

export const Success = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div
      style={mergeRight(wrapperStyles, {
        padding: '0 15px'
      })}
    >
      <div style={{ marginBottom: 15, textAlign: 'center' }}>
        <Text>{t('auth.success')}</Text>
      </div>
      <Button onClick={() => navigate(AUTH_URLS[RoutesList.SIGN_IN])}>
        {t('auth.sign_in')}
      </Button>
    </div>
  )
}

const AlreadyRegistered = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <div style={wrapperStyles}>
      <Placeholder
        header={t('common.oops')}
        description={
          <>
            <div style={{ marginBottom: 15 }}>
              {t('auth.already_registered')}
            </div>
            <Button
              mode='filled'
              onClick={() => navigate(URLS[RoutesList.EXCHANGE])}
            >
              {t('auth.sign_in')}
            </Button>
          </>
        }
      >
        <img
          alt='Telegram sticker'
          src='https://xelene.me/telegram.gif'
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    </div>
  )
}

export const Register = () => {
  const { i18n } = useTranslation()
  const { step, isRegisterPending, isCodePending, code, ttl, isVerifyPending } =
    useUnit({
      step: $registerStep,
      isRegisterPending: registerFx.$pending,
      isCodePending: createVerificationCodeFx.$pending,
      code: $code,
      ttl: $codeTtl,
      isVerifyPending: verifyFx.$pending
    })
  const isPending = isRegisterPending || isCodePending || isVerifyPending
  const form = useForm(registerForm)

  const widgets: Record<number, ReactNode> = {
    [RegisterSteps.TOKEN]: (
      <Token
        value={form.fields.token.value}
        onChange={form.fields.token.onChange}
        onCotinue={registerNextStepEv}
      />
    ),
    [RegisterSteps.PIN]: (
      <Pin value={form.fields.pin.value} onChange={form.fields.pin.onChange} />
    ),
    [RegisterSteps.CONFIRM_PIN]: (
      <ConfirmPin
        value={form.fields.confirmPin.value}
        onChange={form.fields.confirmPin.onChange}
        currentPin={form.fields.pin.value}
      />
    ),
    [RegisterSteps.VERIFICATION]: (
      <Verification
        ttl={ttl}
        value={code}
        onChange={setCode}
        onSubmit={verifyEv}
        onRetry={createNewCodeEv}
      />
    ),
    [RegisterSteps.ALREADY_REGISTERED]: <AlreadyRegistered />,
    [RegisterSteps.SUCCESS]: <Success />
  }

  if (isPending) return <Pending />

  return (
    <>
      {!includes(step)([
        RegisterSteps.TOKEN,
        RegisterSteps.ALREADY_REGISTERED
      ]) && (
        <Button
          mode='plain'
          style={{ position: 'relative', zIndex: 999 }}
          onClick={() => registerPrevStepEv()}
        >
          <IconLeftArrow style={{ position: 'relative', top: 3 }} />
        </Button>
      )}

      {widgets[step]}

      <Button
        mode='plain'
        style={langStyles}
        onClick={() =>
          i18n.changeLanguage(
            i18n.language === LangCode.EN ? LangCode.KA : LangCode.EN
          )
        }
      >
        {i18n.language.toUpperCase()}
      </Button>
    </>
  )
}
