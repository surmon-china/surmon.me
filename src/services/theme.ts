/**
 * @file theme service
 * @module service.theme
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, computed } from 'vue'
import storage from './storage'

export const THEME_STORAGE_KEY = 'theme'
export const getStorageTheme = () => storage.get(THEME_STORAGE_KEY)

export enum Theme {
  Default = 'default',
  Dark = 'dark'
}

const themes = Object.values(Theme)
const ThemeSymbol = Symbol('theme')
const createThemeStore = (initTheme: Theme) => {
  const theme = ref(initTheme)
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
    const historyTheme = getStorageTheme()
    if (historyTheme) {
      set(
        historyTheme === Theme.Dark
          ? Theme.Dark
          : Theme.Default
      )
    }
  }

  return {
    theme: computed(() => theme.value),
    set,
    toggle,
    resetOnClient
  }
}

export type ThemeService = ReturnType<typeof createThemeStore>
export const createTheme = (initTheme: Theme) => {
  const themeStore = createThemeStore(initTheme)
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
