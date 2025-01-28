import { FieldError } from '@effector-reform/core'
import { InputProps, Text, Input as TgInput } from '@telegram-apps/telegram-ui'

export const Input = (props: {
  inputProps: InputProps
  error?: FieldError
  value?: string | number | null
  onChange?: (value: string) => void
}) => {
  return (
    <>
      <TgInput
        {...props.inputProps}
        onChange={(e) => props.onChange?.(e.target.value)}
        value={props.value || ''}
      />
      {props.error && (
        <div style={{ padding: '0 22px' }}>
          <Text style={{ color: 'red', position: 'relative', top: -15 }}>
            {props.error}
          </Text>
        </div>
      )}
    </>
  )
}
