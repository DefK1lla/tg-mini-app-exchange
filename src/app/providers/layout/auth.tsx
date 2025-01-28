import { TabsList } from '@telegram-apps/telegram-ui'
import { CSSProperties, PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

const tabsStyles: CSSProperties = { position: 'relative', zIndex: 99999 }

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{ position: 'relative', background: 'var(--tg-bg-color)' }}>
      <TabsList style={tabsStyles}>
        <TabsList.Item
          selected={location.pathname === '/sign-in'}
          onClick={() => navigate('/sign-in')}
        >
          {t('auth.sign_in')}
        </TabsList.Item>
        <TabsList.Item
          selected={location.pathname === '/sign-up'}
          onClick={() => navigate('/sign-up')}
        >
          {t('auth.sign_up')}
        </TabsList.Item>
      </TabsList>

      {children}
    </div>
  )
}
