import { LangCode } from '@/features/i18n'
import { PIN_LENGTH } from '@/shared/model/const'
import { useField } from '@effector-reform/react'
import { Button, PinInput, Snackbar, Text } from '@telegram-apps/telegram-ui'
import { useUnit } from 'effector-react'
import { compose, join, map, split } from 'ramda'
import { CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { loginForm, loginFx } from './model'

const langStyles: CSSProperties = {
  position: 'fixed',
  bottom: 36,
  left: 20,
  zIndex: 1,
  width: 'calc(100% / 3 - 25px)',
  height: 50,
  borderRadius: 16
}

export const Login = () => {
  const { t, i18n } = useTranslation()
  const pin = useField(loginForm.fields.pin)
  const hasError = useUnit(loginFx.$failed)

  return (
    <>
      <PinInput
        label={t('auth.enter_your_pin')}
        onChange={compose(pin.onChange, join(''))}
        value={compose(map(Number), split(''))(pin.value)}
        pinCount={PIN_LENGTH}
      />
      {hasError && (
        <Snackbar onClose={() => {}} duration={2000} style={{ zIndex: 2 }}>
          <div>
            <Text style={{ color: 'red' }} size={25}>
              {t('auth.login_error')}
            </Text>
          </div>
          <Text>{t('auth.login_error')}</Text>
        </Snackbar>
      )}
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
