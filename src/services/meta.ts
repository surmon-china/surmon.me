/**
 * @file Meta service
 * @module service.meta
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed, createApp } from 'vue'
import type { ComputedGetter } from '@vue/reactivity'
import {
  createMetaManager,
  MetaConfig as VueMetaConfig,
  useMeta as useVueMeta,
  MetaSource
} from 'vue-meta'
import { useI18n } from './i18n'

let titleComputer = (title: string) => title
export const meatTitle = (title: string) => {
  return titleComputer(title)
}

export interface MetaConfig {
  titler?(title: string): string
  vueMetaSSR?: boolean
  vueMetaConfig?: VueMetaConfig
}
export const createMeta = (metaConfig?: MetaConfig) => {
  titleComputer = metaConfig?.titler || titleComputer
  const manager = createMetaManager(metaConfig?.vueMetaSSR, metaConfig?.vueMetaConfig)
  // https://github.com/nuxt/framework/blob/main/packages/nuxt3/src/meta/runtime/lib/vue-meta.plugin.ts
  const bindClient = () => {
    const teleportTarget = document.createElement('div')
    teleportTarget.id = 'head-target'
    document.body.appendChild(teleportTarget)
    createApp({ render: () => manager.render({}) }).mount('#head-target')
  }

  ;(manager as any).bindClient = bindClient
  return manager as typeof manager & { bindClient: typeof bindClient }
}

export interface MetaObject extends MetaSource {
  title?: string
  pageTitle?: string
  keywords?: string
  description?: string
  // ref to vue-meta
  [key: string]: any
}

export function useMeta(source: MetaObject | ComputedGetter<MetaObject>) {
  const i18n = useI18n()

  const meta = computed(() => {
    const { title, pageTitle, keywords, ...restSource } =
      typeof source === 'function' ? source() : source
    // title | page title
    const metaTitle = title ? title : pageTitle ? meatTitle(pageTitle) : ''
    // keywords
    const keywordMeta = {
      vmid: 'keywords',
      name: 'keywords',
      property: 'keywords',
      content: keywords
    }
    // html i18n
    const htmlAttrs = {
      lang: i18n.l.value?.iso
    }

    return {
      ...restSource,
      title: metaTitle,
      meta: [...(restSource.meta || []), keywordMeta],
      htmlAttrs: {
        ...htmlAttrs,
        ...restSource.htmlAttrs
      }
    }
  })

  return useVueMeta(meta)
}
