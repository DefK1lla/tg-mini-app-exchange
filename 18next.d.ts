import 'i18next'
import 'react-i18next'

type Nullable<T> = T | null | undefined
type NonEmptyArray<T> = [T, ...T[]]

type GeneratePaths<T> = {
  [K in keyof T]: T[K] extends object
    ? `${K & string}.${GeneratePaths<T[K]>}`
    : `${K & string}`
}[keyof T]

declare module 'react-i18next' {
  export function useTranslation(): {
    t: TFunction
    i18n: ReturnType<typeof getI18n>
  }
}

declare global {
  interface Window {
    REACT_APP_ADMIN_BASE_API_URL: string
    REACT_APP_TICKETS_BASE_API_URL: string
    REACT_APP_TICKETS_BASE_WS: string
  }

  declare type TFunctionArg = GeneratePaths<
    typeof import('@/features/i18n/translations/en.json')
  >

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  declare type TFunction = (v: TFunctionArg, data?: any) => string

  type DeepPartial<T> = T extends object
    ? {
        [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T
  }

  type NestedKeyOf<ObjectType extends object> = {
    [Key in keyof ObjectType &
      (string | number)]: ObjectType[Key] extends object
      ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
      : `${Key}`
  }[keyof ObjectType & (string | number)]

  type NestedKey<T extends object> = NestedKeyOf<T>
}
