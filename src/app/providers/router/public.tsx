import { PropsWithChildren, useCallback, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Cookies, { CookieChangeOptions } from 'universal-cookie'

export const Public = ({ children }: PropsWithChildren) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies()
  const navigate = useNavigate()

  const cookiesLister = useCallback(
    (e: CookieChangeOptions) => {
      if (e.name === import.meta.env.VITE_SESSION_COOKIE && e.value)
        navigate('/exchange')
    },
    [navigate]
  )

  useEffect(() => {
    cookies.addChangeListener(cookiesLister)
    return () => cookies.removeChangeListener(cookiesLister)
  }, [cookies, cookiesLister])

  if (!cookies.get(import.meta.env.VITE_SESSION_COOKIE)) return children
  return <Navigate to='/exchange' replace />
}
