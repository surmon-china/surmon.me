/**
 * @file Theme
 * @module composable/theme
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, computed, readonly } from 'vue'
import storage from '/@/utils/storage'

export const THEME_STORAGE_KEY = 'theme'

export enum Theme {
  Light = 'light',
  Dark = 'dark'
}

const themes = [Theme.Light, Theme.Dark]
const ThemeSymbol = Symbol('theme')

export const createTheme = (initialValue: Theme) => {
  const theme = ref<Theme>(initialValue === Theme.Dark ? Theme.Dark : Theme.Light)
  const isDark = computed(() => theme.value === Theme.Dark)

  const set = (newTheme: Theme) => {
    if (themes.includes(newTheme) && newTheme !== theme.value) {
      theme.value = newTheme
      storage.set(THEME_STORAGE_KEY, newTheme)
    }
  }

  const toggle = () => set(isDark.value ? Theme.Light : Theme.Dark)

  const themeState = { theme: readonly(theme), isDark, set, toggle }

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
