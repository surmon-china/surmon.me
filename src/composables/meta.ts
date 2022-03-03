/**
 * @file meta
 * @module composable.meta
 * @author Surmon <https://github.com/surmon-china>
 * @link https://github.com/vueuse/head
 */

import { computed, inject } from 'vue'
import type { ComputedGetter } from '@vue/reactivity'
import { createHead, useHead, HeadObject, HeadAttrs, renderHeadToString } from '@vueuse/head'
import { useI18n } from '/@/composables/i18n'

export interface MetaResult {
  readonly headTags: string
  readonly htmlAttrs: string
  readonly bodyAttrs: string
}

const MetaTitlerSymbol = Symbol('meta-titler')
type MeatTitler = (title: string) => string

export interface MetaConfig {
  titler?: MeatTitler
}
export const createMeta = (metaConfig?: MetaConfig) => {
  const head = createHead()
  return {
    ...head,
    renderToString(): MetaResult {
      return renderHeadToString(head)
    },
    install(app, ...rest: any[]) {
      app.provide(MetaTitlerSymbol, metaConfig?.titler || ((title) => title))
      app.use(head, ...rest)
      return head
    }
  }
}

export interface MetaObject extends HeadObject {
  title?: string
  pageTitle?: string
  keywords?: string
  description?: string
}

export function useMeta(source: MetaObject | ComputedGetter<MetaObject>) {
  const i18n = useI18n()
  const titler = inject(MetaTitlerSymbol) as MeatTitler

  const meta = computed<HeadObject>(() => {
    const sourceObject = typeof source === 'function' ? source() : source
    const { title, pageTitle, keywords, description, ...restSource } = sourceObject

    // title | page title
    const mTitle = title ? title : pageTitle ? titler(pageTitle) : ''

    // metas
    const mMeta = (restSource.meta as HeadAttrs[]) || []

    // keywords
    if (keywords) {
      mMeta.push({
        key: 'keywords',
        name: 'keywords',
        content: keywords
      })
    }

    // description
    if (description) {
      mMeta.push({
        key: 'description',
        name: 'description',
        content: description
      })
    }

    // html i18n
    const mHTMLAttrs = {
      lang: i18n.l.value?.iso,
      ...restSource.htmlAttrs
    }

    return {
      ...restSource,
      title: mTitle,
      meta: mMeta,
      htmlAttrs: mHTMLAttrs
    }
  })

  return useHead(meta)
}
