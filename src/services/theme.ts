/**
 * @file theme service
 * @module service.theme
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, readonly, computed } from 'vue'
import storage from './storage'

export const THEME_STORAGE_KEY = 'theme'
export const getStorageTheme = () => storage.get(THEME_STORAGE_KEY)

export enum Theme {
  Default = 'default',
  Dark = 'dark'
}

const themes = Object.values(Theme)
const ThemeSymbol = Symbol('theme')
const createThemeStore = (defaultTheme: Theme) => {
  const theme = ref(defaultTheme)
  const set = (newTheme: Theme) => {
    if (themes.includes(newTheme) && newTheme !== theme.value) {
      theme.value = newTheme
      storage.set(THEME_STORAGE_KEY, newTheme)
    }
  }
  const toggle = () => set(
    theme.value === Theme.Dark
      ? Theme.Default
      : Theme.Dark
  )
  const resetOnClient = () => {
    // history
    const historyTheme = getStorageTheme()
    if (historyTheme) {
      set(historyTheme === Theme.Dark
        ? Theme.Dark
        : Theme.Default
      )
      return
    }

    // auto
    const darkQuery = "(prefers-color-scheme: dark)"
    const lightQuery = "(prefers-color-scheme: light)"
    const isDarkMode = window.matchMedia(darkQuery).matches
    const isLightMode = window.matchMedia(lightQuery).matches
    const isNotSpecified = window.matchMedia("(prefers-color-scheme: no-preference)").matches
    if (isNotSpecified) {
      window.matchMedia(darkQuery).addListener(({ matches }) => matches && set(Theme.Dark))
      window.matchMedia(lightQuery).addListener(({ matches }) => matches && set(Theme.Default))
      return
    }
    if (isDarkMode) {
      set(Theme.Dark)
      return
    }
    if (isLightMode) {
      set(Theme.Default)
      return
    }
  }

  return {
    theme: readonly(theme),
    set,
    toggle,
    resetOnClient
  }
}

export type ThemeService = ReturnType<typeof createThemeStore>
export const createTheme = (defaultTheme: Theme) => {
  const themeStore = createThemeStore(defaultTheme)
  return {
    ...themeStore,
    install(app: App) {
      app.provide(ThemeSymbol, themeStore)
    }
  }
}

export const useTheme = (): ThemeService => {
  return inject(ThemeSymbol) as ThemeService
}
