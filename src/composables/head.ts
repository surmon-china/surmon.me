/**
 * @file head
 * @module composable.head
 * @author Surmon <https://github.com/surmon-china>
 * @link https://github.com/vueuse/head
 */

import { computed, inject, ComputedGetter } from 'vue'
import {
  HeadObject as VueuseHeadObject,
  createHead as createVueuseHead,
  useHead as useVueuseHead,
  useSeoMeta as useVueuseSeoMeta,
  renderHeadToString
} from '@vueuse/head'
import { useEnhancer } from '/@/app/enhancer'
import { getPageURL, getTargetCDNURL } from '/@/transforms/url'
import { META, IDENTITIES } from '/@/config/app.config'

export type HeadResult = Awaited<ReturnType<typeof renderHeadToString>>

const DEFAULT_OG_IMAGE = getTargetCDNURL('/images/og-social-card.jpg')
const HeadTitlerSymbol = Symbol('head-titler')
type HeadTitler = (title: string) => string

export interface HeadConfig {
  titler?: HeadTitler
}

export const createHead = (headConfig?: HeadConfig) => {
  const head = createVueuseHead()
  return {
    ...head,
    renderToString() {
      return renderHeadToString(head)
    },
    install(app, ...rest: any[]) {
      app.provide(HeadTitlerSymbol, headConfig?.titler || ((title) => title))
      app.use(head, ...rest)
      return head
    }
  }
}

export interface HeadObject extends VueuseHeadObject {
  title?: string
  pageTitle?: string
  description?: string
  keywords?: string
  // https://ogp.me/
  // https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
  // https://developers.facebook.com/docs/sharing/webmasters/
  // https://ahrefs.com/blog/open-graph-meta-tags/
  ogType?: 'website' | 'object' | 'article' | 'blog' | 'product' | 'bbs' | 'image' | 'profile'
  ogUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageWidth?: number
  ogImageHeight?: number
}

export function useHead(source: HeadObject | ComputedGetter<HeadObject>) {
  const { i18n, route } = useEnhancer()
  const titler = inject<HeadTitler>(HeadTitlerSymbol)
  const meta = computed<HeadObject>(() => {
    const {
      title,
      pageTitle,
      keywords,
      description,
      ogType,
      ogUrl,
      ogTitle,
      ogDescription,
      ogImage,
      ogImageWidth,
      ogImageHeight,
      ...restSource
    } = typeof source === 'function' ? source() : source

    // title | page title
    const _pureTitle = title ?? pageTitle
    const _title = title ? title : pageTitle ? titler?.(pageTitle) : ''

    // metas
    const _meta = (restSource.meta as any[]) || [
      // keywords
      {
        key: 'keywords',
        name: 'keywords',
        content: keywords ?? ''
      },
      // description
      {
        key: 'description',
        name: 'description',
        content: description ?? ''
      },
      // twitter
      {
        key: 'twitter-new-widgets',
        name: 'twitter:widgets:new-embed-design',
        content: 'on'
      },
      {
        key: 'twitter-site',
        name: 'twitter:site',
        content: `@${IDENTITIES.TWITTER_USER_NAME}`
      },
      {
        key: 'twitter-creator',
        name: 'twitter:creator',
        content: `@${IDENTITIES.TWITTER_USER_NAME}`
      },
      {
        key: 'twitter-card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        key: 'twitter-image-src',
        name: 'twitter:image:src',
        content: ogImage ?? DEFAULT_OG_IMAGE
      },
      {
        key: 'twitter-title',
        name: 'twitter:title',
        content: ogTitle ?? _title ?? ''
      },
      {
        key: 'twitter-description',
        name: 'twitter:description',
        content: ogDescription ?? description ?? ''
      },
      // og
      {
        key: 'og-type',
        property: 'og:type',
        content: ogType ?? 'object'
      },
      {
        key: 'og-site-name',
        property: 'og:site_name',
        content: META.title
      },
      {
        key: 'og-title',
        property: 'og:title',
        content: ogTitle ?? _pureTitle ?? ''
      },
      {
        key: 'og-description',
        property: 'og:description',
        content: ogDescription ?? description ?? ''
      },
      {
        key: 'og-url',
        property: 'og:url',
        content: ogUrl ?? getPageURL(route.fullPath)
      },
      {
        key: 'og-image',
        property: 'og:image',
        content: ogImage ?? DEFAULT_OG_IMAGE
      },
      {
        key: 'og-image-alt',
        property: 'og:image:alt',
        content: ogTitle ?? _title ?? ''
      },
      {
        key: 'og-image-width',
        property: 'og:image:width',
        content: ogImageWidth ?? (ogImage ? '' : '1000')
      },
      {
        key: 'og-image-height',
        property: 'og:image:height',
        content: ogImageHeight ?? (ogImage ? '' : '526')
      },
      {
        key: 'og-locale',
        property: 'og:locale',
        content: i18n.l.value?.iso ?? ''
      }
    ]

    return {
      ...restSource,
      title: _title,
      meta: _meta
    }
  })

  return useVueuseHead(meta)
}
