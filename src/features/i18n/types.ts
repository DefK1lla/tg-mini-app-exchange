export enum LangCode {
  KA = 'ka',
  EN = 'en'
}

export type SupportedLang = {
  code: LangCode
  label: string
}

export type I18NConfig = {
  supportedLanguages: SupportedLang[]
  fallbackLang: SupportedLang
  urlParam: string
  debug: boolean
}
