/**
 * @file Google analytics
 * @module composable.gtag
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, reactive, readonly, inject, Plugin, nextTick } from 'vue'
import { Router } from 'vue-router'
import { getGaScriptURL } from '/@/transforms/gtag'
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

export interface GtagConfig {
  [key: string]: any
}

export interface GtagPluginConfig {
  id: string
  router?: Router
  customResourceURL?: string
  config?: GtagConfig
}

const GtagSymbol = Symbol('gtag')
export type Gtag = ReturnType<typeof createGtag>
export const createGtag = (options: GtagPluginConfig) => {
  if (!options.id) {
    return
  }

  const resourceURL = options.customResourceURL || getGaScriptURL(options.id)
  const state = reactive({
    loaded: false,
    disabled: false
  })

  loadScript(resourceURL, { async: true }).then(() => {
    state.loaded = true
  })

  if (window.gtag == null) {
    window.dataLayer = window.dataLayer || []
    // MARK: important! only function
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', options.id, options.config)
  }

  const push = (...args) => {
    if (!state.disabled) {
      window.gtag?.(...args)
    }
  }

  if (options.router) {
    options.router.afterEach((to, from) => {
      if (to.path !== from.path) {
        nextTick().then(() => {
          const location = window.location.origin + to.fullPath
          push('event', 'page_view', {
            page_title: document.title,
            page_location: location,
            page_path: to.fullPath,
            send_to: options.id
          })
        })
      }
    })
  }

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
