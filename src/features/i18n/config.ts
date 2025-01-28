import { I18NConfig, LangCode, SupportedLang } from './types'

const langENUS: SupportedLang = {
  code: LangCode.EN,
  label: 'English (US)'
}

const langGEGE: SupportedLang = {
  code: LangCode.KA,
  label: 'Georgian (KA)'
}

export const i18nConfig: I18NConfig = {
  supportedLanguages: [langENUS, langGEGE],
  fallbackLang: langENUS,
  urlParam: 'lang',
  debug: false
}
