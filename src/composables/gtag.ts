/**
 * @file Google analytics
 * @module composable/gtag
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, Plugin, reactive, readonly, inject } from 'vue'
import { getGtagScriptURL } from '/@/transforms/gtag'
import { loadScript } from '/@/utils/scripter'
// MARK: https://zh.nuxtjs.org/faq/ga
// MARK: https://github.com/nuxt-community/google-gtag/blob/master/lib/plugin.js
// DOC: https://developers.google.com/analytics/devguides/collection/gtagjs/pages?hl=zh-cn

declare global {
  interface Window {
    gtag(...args: any[]): any
    dataLayer: any[]
  }
}

interface GtagConfig {
  [key: string]: any
}

export interface GtagPluginConfig {
  id: string
  customResourceUrl?: string
  config?: GtagConfig
}

const createGtagState = (pluginConfig: GtagPluginConfig) => {
  if (!pluginConfig.id) {
    return
  }

  const resourceURL = pluginConfig.customResourceUrl || getGtagScriptURL(pluginConfig.id)
  const state = reactive({
    loaded: false,
    disabled: false
  })

  loadScript(resourceURL, { async: true }).then(() => {
    state.loaded = true
  })

  if (window.gtag == null) {
    window.dataLayer = window.dataLayer || []
    // MARK: important! only anonymous function
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', pluginConfig.id, pluginConfig.config)
  }

  const enable = () => {
    state.disabled = false
  }

  const disable = () => {
    state.disabled = true
  }

  const push = (...args) => {
    if (!state.disabled) {
      window.gtag?.(...args)
    }
  }

  const set = (config: GtagConfig) => {
    push('set', config)
  }

  const config = (config: GtagConfig) => {
    push('config', pluginConfig.id, config)
  }

  // https://support.google.com/analytics/answer/9267735?hl=zh-Hans
  const event = (
    eventName: string,
    config?: GtagConfig & {
      event_category?: string
      event_label?: string
      value?: number
    }
  ) => {
    push('event', eventName, config)
  }

  // https://developers.google.com/analytics/devguides/collection/ga4/reference/events?hl=zh-cn&client_type=gtag#search
  const search = () => {}

  // https://developers.google.com/analytics/devguides/collection/ga4/views?hl=zh-cn&client_type=gtag
  const pageView = (payload: { title: string; location: string; path: string }) => {
    push('event', 'page_view', {
      page_title: payload.title,
      page_location: payload.location,
      page_path: payload.path,
      send_to: pluginConfig.id
    })
  }

  return {
    state: readonly(state),
    enable,
    disable,
    set,
    config,
    event,
    pageView
  }
}

export type Gtag = ReturnType<typeof createGtagState>

const GtagSymbol = Symbol('gtag-state')

export const gtag: Plugin<GtagPluginConfig> = {
  install(app: App, config: GtagPluginConfig) {
    const gtag = createGtagState(config)
    app.provide(GtagSymbol, gtag)
    app.config.globalProperties.$gtag = gtag
  }
}

export const useGtag = (): Gtag => {
  return inject(GtagSymbol) as Gtag
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $gtag: Gtag
  }
}
