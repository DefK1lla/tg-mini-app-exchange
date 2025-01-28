import { СurrencyGate } from '@/entities/currency'
import { useGate } from 'effector-react'
import { PropsWithChildren, useCallback, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Cookies, { CookieChangeOptions } from 'universal-cookie'

export const Private = ({ children }: PropsWithChildren) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies()
  const navigate = useNavigate()

  useGate(СurrencyGate)

  const cookiesLister = useCallback(
    (e: CookieChangeOptions) => {
      if (e.name === import.meta.env.VITE_SESSION_COOKIE && !e.value)
        navigate('/sign-in')
    },
    [navigate]
  )

  useEffect(() => {
    cookies.addChangeListener(cookiesLister)
    return () => cookies.removeChangeListener(cookiesLister)
  }, [cookies, cookiesLister])

  if (cookies.get(import.meta.env.VITE_SESSION_COOKIE)) return children
  return <Navigate to='/sign-in' replace />
}
