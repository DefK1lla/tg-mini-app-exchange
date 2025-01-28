import { logoutFx } from '@/shared/model/effects'
import {
  initDataUser,
  showBackButton,
  User,
  useSignal
} from '@telegram-apps/sdk-react'
import { createEvent, createStore, sample } from 'effector'
import { useEffect } from 'react'

export const $userInfo = createStore<User | null>(null)

export const setUserInfo = createEvent<User>()

sample({
  clock: setUserInfo,
  target: $userInfo
})

export const useTelegramWatchers = () => {
  const userInfo = useSignal(initDataUser)

  useEffect(() => {
    if (userInfo) setUserInfo(userInfo)
  }, [userInfo])

  useEffect(() => {
    logoutFx.start()
    showBackButton()
  }, [])
}
