/**
 * @file App local global state
 * @module app/global-state
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, computed, reactive, readonly } from 'vue'
import { INTERNAL_SERVER_ERROR } from '/@/constants/http-code'
import { LayoutColumn } from '/@/constants/layout'
import { uaParser, isZhUser } from '/@/transforms/ua'
import { isClient } from '/@/configs/app.env'
import { normalizeUnknowErrorToAppError } from './error'
import type { AppError } from './error'
import logger from '/@/utils/logger'

export type AppErrorValue = AppError | null

export interface GlobalStateOptions {
  userAgent: string
  language: string
  layout: LayoutColumn
  error: AppErrorValue
}

const GlobalStateSymbol = Symbol('globalState')
export type GlobalState = ReturnType<typeof createGlobalState>
export const createGlobalState = (options: GlobalStateOptions) => {
  // User agent state
  // This state is used to store the user agent string and parsed device information.
  // It is initialized with the user agent string passed in the options.
  // It also includes the original user agent string, language, and a flag
  // indicating whether the user is a Chinese user (based on the language).
  // The `uaParser` function is used to parse the user agent string and extract device
  // information such as browser, OS, and device type.
  const userAgent = {
    original: options.userAgent,
    language: options.language,
    isZhUser: isZhUser(options.language),
    ...uaParser(options.userAgent)
  }

  // Hydrated state
  // This state is used to determine whether the app has been hydrated on the client side.
  // It is initialized to false, and set to true after the first hydration.
  // This is useful for avoiding unnecessary data fetching on the client side after hydration.
  // It is also used to determine whether the app is in the hydration phase.
  // The `isHydrated` state is not reactive, so it can be used in computed properties without causing unnecessary re-renders.
  // It is set to true in the `setHydrate` method, which is called after the first hydration.
  // This state is not used in the SSR context, so it is only used in the client-side app.
  let isHydrated = false
  const setHydrate = () => {
    isHydrated = true
  }

  // App error state
  // This state is used to store the global error that occurs in the app.
  // It is initialized with the error passed in the options, or null if no error is provided.
  // The `error` state is reactive, so it can be used in computed properties and templates.
  // The `setError` method is used to update the error state.
  // It accepts an error object, string, or null, and updates the `error` state accordingly.
  const error = ref<AppErrorValue>(options.error ?? null)
  const setError = (_error: unknown) => {
    if (isClient) logger.failure('error:', _error)
    // If the error is null, it clears the error state.
    error.value = !_error
      ? null
      : normalizeUnknowErrorToAppError(_error, {
          code: INTERNAL_SERVER_ERROR,
          message: 'Unknown Error'
        })
  }

  // UI layout
  const layoutValue = ref(options.layout)
  const layoutColumn = computed(() => ({
    layout: layoutValue.value,
    isNormal: layoutValue.value === LayoutColumn.Normal,
    isWide: layoutValue.value === LayoutColumn.Wide,
    isFull: layoutValue.value === LayoutColumn.Full
  }))
  const setLayoutColumn = (layout: LayoutColumn) => {
    if (layout !== layoutValue.value) {
      layoutValue.value = layout
    }
  }

  // Global switchers
  const switcher = reactive({
    sponsor: false,
    feedback: false,
    statement: false
  })
  const toggleSwitcher = (key: keyof typeof switcher, value: boolean) => {
    switcher[key] = value
  }

  const globalState = {
    // Device state
    userAgent,

    // Hydrate state
    setHydrate,
    get isHydrated() {
      return isHydrated
    },

    // App error state
    error: readonly(error),
    setError,

    // Layout state
    layoutColumn,
    setLayoutColumn,

    // Global switchers
    switcher: readonly(switcher),
    toggleSwitcher
  }

  return {
    ...globalState,
    install(app: App) {
      app.provide(GlobalStateSymbol, globalState)
    }
  }
}

export const useGlobalState = (): GlobalState => {
  return inject(GlobalStateSymbol) as GlobalState
}
