import {
  $debug,
  backButton,
  initData,
  init as initSDK,
  miniApp,
  themeParams,
  viewport
} from '@telegram-apps/sdk-react'

export function init(debug: boolean): void {
  $debug.set(debug)

  initSDK()

  if (debug) {
    import('eruda').then((lib) => lib.default.init()).catch(console.error)
  }

  if (!backButton.isSupported() || !miniApp.isSupported()) {
    throw new Error('ERR_NOT_SUPPORTED')
  }

  backButton.mount()
  miniApp.mount()
  themeParams.mount()
  initData.restore()
  void viewport
    .mount()
    .catch((e) => {
      console.error('Something went wrong mounting the viewport', e)
    })
    .then(() => {
      viewport.bindCssVars()
    })

  miniApp.bindCssVars()
  themeParams.bindCssVars()
}
