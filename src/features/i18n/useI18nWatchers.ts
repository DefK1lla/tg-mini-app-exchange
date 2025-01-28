import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { i18nConfig } from './config'

export const useI18nWatcher = () => {
  const { i18n } = useTranslation()
  const { lang } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.key === 'default' && location.pathname === '/') {
      navigate('/')
    }
  }, [location.key])

  useEffect(() => {
    if (
      i18n.resolvedLanguage !== lang &&
      i18nConfig.supportedLanguages.find((l) => l.code === lang) !== undefined
    ) {
      i18n.changeLanguage(lang)
    }
  }, [lang])

  useEffect(() => {
    if (
      lang !== undefined &&
      lang !== '' &&
      i18nConfig.supportedLanguages.find((l) => l.code === lang) === undefined
    ) {
      navigate(`${i18nConfig.fallbackLang.code}/not-found`)
    }
  }, [lang])

  return
}
