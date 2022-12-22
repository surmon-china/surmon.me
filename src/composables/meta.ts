/**
 * @file meta
 * @module composable.meta
 * @author Surmon <https://github.com/surmon-china>
 * @link https://github.com/vueuse/head
 */

import { computed, inject, ComputedGetter } from 'vue'
import { createHead, useHead, HeadObject, renderHeadToString } from '@vueuse/head'
import { getPageURL, getTargetCDNURL } from '/@/transforms/url'
import { useEnhancer } from '/@/app/enhancer'
import { META, IDENTITIES } from '/@/config/app.config'

export type MetaResult = Awaited<ReturnType<typeof renderHeadToString>>

const DEFAULT_OG_IMAGE = getTargetCDNURL('/images/og-social-card.jpg')
const MetaTitlerSymbol = Symbol('meta-titler')
type MeatTitler = (title: string) => string

export interface MetaConfig {
  titler?: MeatTitler
}

export const createMeta = (metaConfig?: MetaConfig) => {
  const head = createHead()
  return {
    ...head,
    renderToString() {
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

export function useMeta(source: MetaObject | ComputedGetter<MetaObject>) {
  const { i18n, route } = useEnhancer()
  const titler = inject<MeatTitler>(MetaTitlerSymbol)
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
    const _language = i18n.l.value?.iso ?? ''

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
        content: _language
      }
    ]

    return {
      ...restSource,
      title: _title,
      meta: _meta,
      htmlAttrs: {
        lang: _language,
        ...restSource.htmlAttrs
      }
    }
  })

  return useHead(meta)
}
