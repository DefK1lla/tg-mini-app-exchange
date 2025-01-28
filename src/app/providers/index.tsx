import '@/features/i18n'
import { appStarted } from '@/shared/model/events'
import { useEffect } from 'react'
import ErrorBoundary from './error-boundary'
import { Layout } from './layout'
import Router from './router'
import { TelegramProvider } from './theme'

const RootProvider = () => {
  useEffect(() => {
    appStarted()
  })
  return (
    <ErrorBoundary>
      <TelegramProvider>
        <Router layout={Layout} />
      </TelegramProvider>
    </ErrorBoundary>
  )
}

export default RootProvider
