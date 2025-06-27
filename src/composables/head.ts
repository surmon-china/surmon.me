/**
 * @file head
 * @module composable.head
 * @author Surmon <https://github.com/surmon-china>
 * @link https://github.com/unjs/unhead
 */

import { computed, ComputedGetter } from 'vue'
import { useSeoMeta, MetaFlat } from '@unhead/vue'
import { useEnhancer } from '/@/app/enhancer'
import { getPageURL } from '/@/transforms/url'
import { META } from '/@/config/app.config'

export { useHead, useSeoMeta } from '@unhead/vue'

export interface UsePageSeoInput {
  /** Directly override the title content. */
  title?: string
  /** Will be concatenated with the title template. */
  pageTitle?: string
  /** Each item will be concatenated with the title template. */
  pageTitles?: string[]
  /** Use this tag to provide a short description of the page. */
  description?: string
  /** A comma-separated list of keywords. */
  keywords?: string

  // Open Graph
  ogUrl?: string
  ogType?: MetaFlat['ogType']
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogImageAlt?: string
  ogImageWidth?: string | number
  ogImageHeight?: string | number

  // Product specific
  articleTags?: MetaFlat['articleTag']
  articleCategory?: MetaFlat['articleSection']
  articleModifiedTime?: MetaFlat['articleModifiedTime']
  articlePublishedTime?: MetaFlat['articlePublishedTime']
}

export function usePageSeo(input: UsePageSeoInput | ComputedGetter<UsePageSeoInput>) {
  const { i18n, route } = useEnhancer()
  const _ = computed(() => {
    const value = typeof input === 'function' ? input() : input
    const { title, pageTitle, pageTitles, ...rest } = value
    const separator = META.title_separator
    const pureTitle = pageTitle ?? pageTitles?.join(separator)
    const fullTitle = title ?? (pureTitle ? [pureTitle, META.title].join(separator) : META.title)
    return { pureTitle, fullTitle, ...rest }
  })

  return useSeoMeta({
    // Basic SEO
    title: computed(() => _.value.fullTitle),
    description: () => _.value.description,
    keywords: () => _.value.keywords,
    // Open Graph
    ogType: () => _.value.ogType ?? 'website',
    ogTitle: () => _.value.ogTitle ?? _.value.pureTitle,
    ogDescription: () => _.value.ogDescription ?? _.value.description,
    ogUrl: () => _.value.ogUrl ?? getPageURL(route.fullPath),
    ogImage: () => _.value.ogImage ?? getPageURL(META.default_og_image),
    ogImageAlt: () => _.value.ogImageAlt ?? _.value.ogTitle ?? _.value.fullTitle,
    ogImageWidth: () => _.value.ogImageWidth ?? (_.value.ogImage ? null : '1000'),
    ogImageHeight: () => _.value.ogImageHeight ?? (_.value.ogImage ? null : '526'),
    ogSiteName: () => META.title,
    ogLocale: () => i18n.l.value?.iso,
    // Twitter
    twitterTitle: () => _.value.ogTitle ?? _.value.fullTitle,
    twitterDescription: () => _.value.ogDescription ?? _.value.description,
    twitterImage: () => _.value.ogImage ?? getPageURL(META.default_og_image),
    twitterImageAlt: () => _.value.ogImageAlt ?? _.value.ogTitle ?? _.value.fullTitle,
    twitterCard: 'summary_large_image',
    // Product specific https://ogp.me/#type_article
    articlePublishedTime: () => _.value.articlePublishedTime,
    articleModifiedTime: () => _.value.articleModifiedTime,
    articleSection: () => _.value.articleCategory,
    articleTag: () => _.value.articleTags
  })
}
