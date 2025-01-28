import { appStarted } from '@/shared/model/events'
import { createI18nextIntegration } from '@withease/i18next'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { z } from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import { i18nConfig } from './config'
import { resources } from './i18nResources'

const detectionOptions = {
  order: ['path', 'navigator'],
  lookupFromPathIndex: 0,
  lookupQuerystring: i18nConfig.urlParam,
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  convertDetectedLanguage: (lng: string) => {
    const fullLang = i18nConfig.supportedLanguages.find((l) =>
      l.code.startsWith(lng)
    )
    if (fullLang === undefined) {
      return lng
    } else {
      return fullLang.code
    }
  }
}

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: i18nConfig.debug,
    resources,
    fallbackLng: i18nConfig.fallbackLang.code,
    lng: localStorage.getItem('i18nextLng') || 'ka',
    detection: detectionOptions,
    // keySeparator: false,
    supportedLngs: i18nConfig.supportedLanguages.map((l) => l.code),
    // nonExplicitSupportedLngs: true,
    returnEmptyString: false,
    interpolation: {
      escapeValue: false
    }
  })

z.setErrorMap(zodI18nMap)

export const { $instance, $t, $isReady, $language } = createI18nextIntegration({
  instance: i18next,
  setup: appStarted
})

export default i18next
