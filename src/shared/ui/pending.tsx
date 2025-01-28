import { Spinner } from '@telegram-apps/telegram-ui'

export const Pending = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: 'calc(100vh - 245px)',
        position: 'fixed',
        top: '50%',
        left: '45%'
      }}
    >
      <Spinner size='l' />
    </div>
  )
}
