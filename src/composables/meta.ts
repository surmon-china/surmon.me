/**
 * @file meta
 * @module composable.meta
 * @author Surmon <https://github.com/surmon-china>
 * @link https://github.com/vueuse/head
 */

import { computed, inject, ComputedGetter } from 'vue'
import { createHead, useHead, HeadObject, HeadAttrs, renderHeadToString } from '@vueuse/head'
import { useEnhancer } from '/@/app/enhancer'
import { getPageURL, getTargetCDNURL } from '/@/transforms/url'
import { META, IDENTITIES } from '/@/config/app.config'

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
  description?: string
  keywords?: string
  // https://ogp.me/
  // https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
  // https://developers.facebook.com/docs/sharing/webmasters/
  // https://ahrefs.com/blog/open-graph-meta-tags/
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  ogType?: 'website' | 'article' | 'blog' | 'product' | 'bbs' | 'image' | 'profile'
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
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
      twitterCard,
      ogType,
      ogTitle,
      ogDescription,
      ogImage,
      ogUrl,
      ...restSource
    } = typeof source === 'function' ? source() : source

    // title | page title
    const _pureTitle = title ?? pageTitle
    const _title = title ? title : pageTitle ? titler?.(pageTitle) : ''
    const _language = i18n.l.value?.iso ?? ''

    // metas
    const _meta = (restSource.meta as HeadAttrs[]) || [
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
        key: 'twitter-card',
        name: 'twitter:card',
        content: twitterCard ?? 'summary'
      },
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
      // og
      {
        key: 'og-type',
        property: 'og:type',
        content: ogType ?? 'website'
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
        content: ogImage ?? getTargetCDNURL('/images/og-social-card.jpg')
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
