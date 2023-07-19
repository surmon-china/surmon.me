/**
 * @file head
 * @module composable.head
 * @author Surmon <https://github.com/surmon-china>
 * @link https://github.com/unjs/unhead
 */

import { computed, ComputedGetter } from 'vue'
import { UseSeoMetaInput } from 'unhead'
import { Head, useHead as useUnhead, useSeoMeta as useUnheadSeoMeta } from '@unhead/vue'
import { useEnhancer } from '/@/app/enhancer'
import { getPageURL, getCDN_URL } from '/@/transforms/url'
import { META, IDENTITIES } from '/@/config/app.config'

export type { Head } from '@unhead/vue'
export { createHead } from '@unhead/vue'

export const useHead = (source: Head | ComputedGetter<Head>) => {
  return useUnhead(
    computed<Head>(() => {
      return typeof source === 'function' ? source() : source
    })
  )
}

const DEFAULT_TITLER = (title: string) => `${title} | ${META.title}`
const DEFAULT_OG_IMAGE = getCDN_URL('/images/og-social-card.jpg')

export interface SeoObject extends UseSeoMetaInput {
  title?: string
  pageTitle?: string
  description?: string
  keywords?: string
}

export function useSeo(source: SeoObject | ComputedGetter<SeoObject>) {
  const { i18n, route } = useEnhancer()
  return useUnheadSeoMeta(
    computed<UseSeoMetaInput>(() => {
      const value = typeof source === 'function' ? source() : source
      const { title, pageTitle, description, keywords, ...sm } = value

      // title | page title
      const pureTitle = title ?? pageTitle
      const fullTitle = title ? title : pageTitle ? DEFAULT_TITLER(pageTitle) : ''

      return {
        title: fullTitle,
        description: description ?? '',
        keywords: keywords ?? '',
        twitterSite: `@${IDENTITIES.TWITTER_USER_NAME}`,
        twitterCreator: IDENTITIES.TWITTER_USER_NAME,
        twitterCard: 'summary_large_image',
        twitterImage: sm?.ogImage ?? DEFAULT_OG_IMAGE,
        twitterTitle: sm?.ogTitle ?? fullTitle ?? '',
        twitterDescription: sm?.ogDescription ?? description ?? '',
        ogType: sm?.ogType ?? 'website',
        ogSiteName: META.title,
        ogTitle: sm?.ogTitle ?? pureTitle ?? '',
        ogDescription: sm?.ogDescription ?? description ?? '',
        ogUrl: sm?.ogUrl ?? getPageURL(route.fullPath),
        ogImage: sm?.ogImage ?? DEFAULT_OG_IMAGE,
        ogImageAlt: sm?.ogImageAlt ?? sm?.ogTitle ?? fullTitle ?? '',
        ogImageWidth: sm?.ogImageWidth ?? (sm?.ogImage ? '' : '1000'),
        ogImageHeight: sm?.ogImageHeight ?? (sm?.ogImage ? '' : '526'),
        ogLocale: i18n.l.value?.iso ?? ''
      }
    })
  )
}
