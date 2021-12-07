/**
 * @file Theme service
 * @module service.theme
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, readonly } from 'vue'
import cookies from 'js-cookie'
import storage from './storage'

const DARK_THEME_QUERY = '(prefers-color-scheme: dark)'
const LIGHT_THEME_QUERY = '(prefers-color-scheme: light)'
const NO_PREFERENCE_QUERY = '(prefers-color-scheme: no-preference)'

export const THEME_STORAGE_KEY = 'theme'
export const getClientLocalTheme = () => {
  // local theme
  const historyTheme = storage.get(THEME_STORAGE_KEY)
  if (historyTheme) {
    return historyTheme === Theme.Dark ? Theme.Dark : Theme.Default
  }
  // system theme
  if (window.matchMedia(DARK_THEME_QUERY).matches) {
    return Theme.Dark
  }
  if (window.matchMedia(LIGHT_THEME_QUERY).matches) {
    return Theme.Default
  }
  // not specified || not support
  return Theme.Default
}

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
      cookies.set(THEME_STORAGE_KEY, newTheme)
      storage.set(THEME_STORAGE_KEY, newTheme)
    }
  }

  const toggle = () => set(theme.value === Theme.Dark ? Theme.Default : Theme.Dark)

  const bindClientSystem = () => {
    window
      .matchMedia(DARK_THEME_QUERY)
      .addEventListener('change', ({ matches }) => matches && set(Theme.Dark))
    window
      .matchMedia(LIGHT_THEME_QUERY)
      .addEventListener('change', ({ matches }) => matches && set(Theme.Default))
  }

  return {
    theme: readonly(theme),
    set,
    toggle,
    bindClientSystem
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
