/**
 * @file App local global state
 * @module app/global-state
 * @author Surmon <https://github.com/surmon-china>
 */

import { type App, inject, ref, computed, reactive, readonly } from 'vue'
import { uaParser, isZhUser } from '/@/transforms/ua'
import { PageLayout } from '/@/constants/page-layout'
import { APP_CONFIG } from '/@/configs/app.config'
import { isClient } from '/@/configs/app.env'
import { formatErrorToAppError } from './error'
import type { AppError } from './error'
import logger from '/@/utils/logger'

const GlobalStateSymbol = Symbol('globalState')

export type AppErrorValue = AppError | null

export interface GlobalStateOptions {
  userAgent: string
  languages: string[]
  layout: PageLayout
  error: AppErrorValue
}

export const createGlobalState = (options: GlobalStateOptions) => {
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

  // User agent state
  // This state is used to store the user agent string and parsed device information.
  // It is initialized with the user agent string passed in the options.
  // It also includes the original user agent string, language, and a flag
  // indicating whether the user is a Chinese user (based on the language).
  // The `uaParser` function is used to parse the user agent string and extract device
  // information such as browser, OS, and device type.
  const userAgent = {
    original: options.userAgent,
    languages: options.languages,
    isZhUser: isZhUser(options.languages),
    ...uaParser(options.userAgent)
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
      : formatErrorToAppError(_error, {
          code: APP_CONFIG.default_error_code,
          message: 'Unknown Error'
        })
  }

  // UI layout
  const pageLayoutValue = ref(options.layout)
  const pageLayout = computed(() => ({
    layout: pageLayoutValue.value,
    isNormal: pageLayoutValue.value === PageLayout.Normal,
    isWide: pageLayoutValue.value === PageLayout.Wide,
    isFull: pageLayoutValue.value === PageLayout.Full
  }))

  const setPageLayout = (layout: PageLayout) => {
    if (layout !== pageLayoutValue.value) {
      pageLayoutValue.value = layout
    }
  }

  // Global switchers
  const switcher = reactive({
    sponsorModal: false,
    feedbackModal: false,
    statementModal: false,
    userProfileModal: false,
    bodyScrollable: true
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
    pageLayout,
    setPageLayout,

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

export type GlobalState = ReturnType<typeof createGlobalState>

export const useGlobalState = (): GlobalState => {
  return inject(GlobalStateSymbol) as GlobalState
}
