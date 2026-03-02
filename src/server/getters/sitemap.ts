/**
 * @file Archive sitemap generator
 * @module server/getter/sitemap
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { Readable } from 'stream'
import { SitemapStream, streamToPromise, EnumChangefreq } from 'sitemap'
import type { SitemapItemLoose } from 'sitemap'
import type { Tag } from '@/interfaces/tag'
import type { Category } from '@/interfaces/category'
import type { ArticleListItem } from '@/interfaces/article'
import type { CacheStore } from '@/server/services/cache'
import type { NodePressSuccessResponse } from '@/services/nodepress'
import { NODEPRESS_API_URL } from '@/configs/bff.api'
import { APP_PROFILE } from '@/configs/app.config'
import { getArticleURL, getPageURL, getTagURL, getCategoryURL } from '../utils/url'

export const getDataFromNodePress = async <T>(
  apiPath: string,
  cache?: { store: CacheStore; key: string }
) => {
  // HACK: use cache to avoid frequent API requests
  // https://github.com/surmon-china/nodepress/blob/main/src/constants/cache.constant.ts
  if (cache) {
    const cached = await cache.store.withoutNamespace?.().get<T>(`nodepress:${cache.key}`)
    if (cached) return cached
  }
  const response = await axios.get<NodePressSuccessResponse<T>>(`${NODEPRESS_API_URL}${apiPath}`)
  return response.data.result
}

export const getSitemapXml = async (store: CacheStore) => {
  const [articles, categories, tags] = await Promise.all([
    getDataFromNodePress<ArticleListItem[]>('/articles/all', { store, key: 'public-all-articles' }),
    getDataFromNodePress<Category[]>('/categories/all', { store, key: 'public-all-categories' }),
    getDataFromNodePress<Tag[]>('/tags/all', { store, key: 'public-all-tags' })
  ])

  const sitemapStream = new SitemapStream({
    hostname: APP_PROFILE.url
  })

  const sitemapItemList: SitemapItemLoose[] = [
    { url: APP_PROFILE.url, changefreq: EnumChangefreq.ALWAYS, priority: 1 },
    {
      url: getPageURL('about'),
      changefreq: EnumChangefreq.YEARLY,
      priority: 1
    },
    {
      url: getPageURL('archive'),
      changefreq: EnumChangefreq.ALWAYS,
      priority: 1
    },
    {
      url: getPageURL('guestbook'),
      changefreq: EnumChangefreq.ALWAYS,
      priority: 1
    }
  ]

  categories.forEach((category) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getCategoryURL(category.slug)
    })
  })

  tags.forEach((tag) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getTagURL(tag.slug)
    })
  })

  articles.forEach((article) => {
    sitemapItemList.push({
      priority: 0.8,
      changefreq: EnumChangefreq.DAILY,
      url: getArticleURL(article.id),
      lastmodISO: new Date(article.updated_at).toISOString()
    })
  })

  const buffer = await streamToPromise(Readable.from(sitemapItemList).pipe(sitemapStream))
  return buffer.toString()
}
