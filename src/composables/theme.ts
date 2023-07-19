/**
 * @file Theme
 * @module composable.theme
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, readonly } from 'vue'
import cookies from 'js-cookie'
import storage from '/@/utils/storage'

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

const DARK_THEME_QUERY = '(prefers-color-scheme: dark)'
const LIGHT_THEME_QUERY = '(prefers-color-scheme: light)'

export const THEME_STORAGE_KEY = 'theme'
export const getClientLocalTheme = () => {
  // local theme
  const historyTheme = storage.get(THEME_STORAGE_KEY)
  if (historyTheme) {
    return historyTheme === Theme.Dark ? Theme.Dark : Theme.Light
  }
  // system theme
  if (window.matchMedia(DARK_THEME_QUERY).matches) {
    return Theme.Dark
  }
  if (window.matchMedia(LIGHT_THEME_QUERY).matches) {
    return Theme.Light
  }
  // not specified || not support
  return Theme.Light
}

const ThemeSymbol = Symbol('theme')
const themes = [Theme.Light, Theme.Dark]
export const createTheme = (initTheme: Theme) => {
  const theme = ref<Theme>(initTheme === Theme.Dark ? Theme.Dark : Theme.Light)
  const set = (newTheme: Theme) => {
    if (themes.includes(newTheme) && newTheme !== theme.value) {
      theme.value = newTheme
      cookies.set(THEME_STORAGE_KEY, newTheme)
      storage.set(THEME_STORAGE_KEY, newTheme)
    }
  }
  const toggle = () => set(theme.value === Theme.Dark ? Theme.Light : Theme.Dark)
  const bindClientSystem = () => {
    window.matchMedia(DARK_THEME_QUERY).addEventListener('change', ({ matches }) => matches && set(Theme.Dark))
    window.matchMedia(LIGHT_THEME_QUERY).addEventListener('change', ({ matches }) => matches && set(Theme.Light))
  }

  const themeState = {
    theme: readonly(theme),
    set,
    toggle,
    bindClientSystem
  }

  return {
    ...themeState,
    install(app: App) {
      app.provide(ThemeSymbol, themeState)
    }
  }
}

export const useTheme = () => {
  return inject(ThemeSymbol) as Omit<ReturnType<typeof createTheme>, 'install'>
}
