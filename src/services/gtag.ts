/**
 * @file GA 统计服务
 * @module service.gtag
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, reactive, readonly, inject, Plugin } from 'vue'
import { Router } from 'vue-router'
import { getGAScriptUrl } from '/@/transforms/outside'
import loadScript from '/@/utils/script-loader'
// MARK: https://zh.nuxtjs.org/faq/ga
// MARK: https://github.com/nuxt-community/google-gtag/blob/master/lib/plugin.js
// DOC: https://developers.google.com/analytics/devguides/collection/gtagjs/pages?hl=zh-cn

declare global {
  interface Window {
    gtag(...args: any[]): any
    dataLayer: any[]
  }
}

export interface GtagConfig {
  [key: string]: any
}

export interface GtagPluginConfig {
  id: string
  router: Router
  customResourceURL?: string
  config?: GtagConfig
}

const GtagSymbol = Symbol('gtag')
export type Gtag = ReturnType<typeof createGtag>
export const createGtag = (options: GtagPluginConfig) => {
  if (window.gtag == null) {
    window.dataLayer = window.dataLayer || []
    window.gtag = (...args) => window.dataLayer.push(...args)
    window.gtag('js', new Date())
    window.gtag('config', options.id, options.config)
  }

  if (!options.id || !options.router) {
    return
  }

  const push = (...args) => {
    if (state.readied && !state.disabled) {
      window.gtag(...args)
    }
  }

  const resourceURL = options.customResourceURL || getGAScriptUrl(options.id)

  const state = reactive({
    readied: false,
    disabled: false
  })

  loadScript(resourceURL, { async: true }).then(() => {
    state.readied = true
    options.router.afterEach((to) => {
      const location = window.location.origin + to.fullPath
      push('config', options.id, {
        page_title: document.title,
        page_path: to.fullPath,
        page_location: location
      })
    })
  })

  const gtag = {
    state: readonly(state),
    enable: () => {
      state.disabled = false
    },
    disable: () => {
      state.disabled = true
    },
    set(config: GtagConfig) {
      push('set', config)
    },
    config(config: GtagConfig) {
      push('config', options.id, config)
    },
    // https://developers.google.com/analytics/devguides/collection/gtagjs/events?hl=zh-cn
    event(
      eventName: string,
      config?: GtagConfig & {
        event_action?: string
        event_category?: string
        event_label?: string
        value?: number
      }
    ) {
      push('event', eventName, config)
    }
  }

  return gtag
}

export const useGtag = (): Gtag => {
  return inject(GtagSymbol) as Gtag
}

type PluginInstallFunction = Plugin & {
  installed?: boolean
}

const install: PluginInstallFunction = (app: App, config: GtagPluginConfig) => {
  if (install.installed) {
    return
  }
  const gtag = createGtag(config)
  app.provide(GtagSymbol, gtag)
  app.config.globalProperties.$gtag = gtag
  install.installed = true
}
export default { install }
