import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { Placeholder } from '@telegram-apps/telegram-ui'
import '@telegram-apps/telegram-ui/dist/styles.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { TelegramProvider } from './app/providers/theme'
import './index.css'

import { init } from './init'

const root = createRoot(document.getElementById('root')!)

try {
  init(
    retrieveLaunchParams().startParam === 'debug' ||
      import.meta.env.VITE_CURRENT_ENV === 'DEV' ||
      import.meta.env.VITE_CURRENT_ENV === 'LOCAL'
  )

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
} catch (e) {
  console.error(e)
  root.render(
    <TelegramProvider>
      <Placeholder
        header='Oops'
        description='You are using too old Telegram client to run this application'
      >
        <img
          alt='Telegram sticker'
          src='https://xelene.me/telegram.gif'
          style={{ display: 'block', width: '144px', height: '144px' }}
        />
      </Placeholder>
    </TelegramProvider>
  )
}
