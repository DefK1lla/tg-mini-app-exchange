import { useTelegramWatchers } from '@/entities/telegram'
import { miniApp, useLaunchParams, useSignal } from '@telegram-apps/sdk-react'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { PropsWithChildren } from 'react'

export const TelegramProvider = ({ children }: PropsWithChildren) => {
  const lp = useLaunchParams()
  const isDark = useSignal(miniApp.isDark)

  useTelegramWatchers()

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      {children}
    </AppRoot>
  )
}
