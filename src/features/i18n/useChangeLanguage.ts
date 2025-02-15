import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { i18nConfig } from './config'

export const useChangeLanguage = (currentUrl: string, currentLang: string) => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  const changeLanguage = (targetLang: string) => {
    i18n.changeLanguage(targetLang)

    // eslint-disable-next-line fp/no-let
    let redirectUrl = currentUrl
    if (currentLang === i18nConfig.fallbackLang.code) {
      // If the current language is the default language, add the target language code to the beginning of the URL
      // eslint-disable-next-line fp/no-mutation
      redirectUrl = `/${targetLang}${currentUrl}`
    } else if (targetLang === i18nConfig.fallbackLang.code) {
      // If the target language is the default language, remove the current language code from the URL
      // eslint-disable-next-line fp/no-mutation
      redirectUrl = currentUrl.replace(`/${currentLang}`, '')
    } else {
      // If the target language is different from both the current language and the default language, replace the current language code with the target language code
      // eslint-disable-next-line fp/no-mutation
      redirectUrl = currentUrl.replace(`/${currentLang}`, `/${targetLang}`)
    }
    if (redirectUrl) {
      navigate(redirectUrl)
    }
  }

  return { changeLanguage }
}
