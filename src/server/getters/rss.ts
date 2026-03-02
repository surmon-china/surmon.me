/**
 * @file Archive RSS generator
 * @module server/getter/rss
 * @author Surmon <https://github.com/surmon-china>
 */

import RSS from 'rss'
import { APP_PROFILE } from '@/configs/app.config'
import type { ArticleListItem } from '@/interfaces/article'
import type { Category } from '@/interfaces/category'
import type { CacheStore } from '@/server/services/cache'
import { getArticleURL } from '../utils/url'
import { getDataFromNodePress } from './sitemap'

export const getRssXml = async (store: CacheStore) => {
  const [articles, categories] = await Promise.all([
    getDataFromNodePress<ArticleListItem[]>('/articles/all', { store, key: 'public-all-articles' }),
    getDataFromNodePress<Category[]>('/categories/all', { store, key: 'public-all-categories' })
  ])

  const feed = new RSS({
    title: APP_PROFILE.title,
    description: APP_PROFILE.sub_title_zh,
    site_url: APP_PROFILE.url,
    feed_url: `${APP_PROFILE.url}/rss.xml`,
    image_url: `${APP_PROFILE.url}/icon.png`,
    managingEditor: APP_PROFILE.author,
    webMaster: APP_PROFILE.author,
    generator: `${APP_PROFILE.domain}`,
    categories: categories.map((category) => category.slug),
    copyright: `${new Date().getFullYear()} ${APP_PROFILE.title}`,
    language: 'zh',
    ttl: 60
  })

  articles.forEach((article) => {
    return feed.item({
      title: article.title,
      description: article.summary,
      url: getArticleURL(article.id),
      guid: String(article.id),
      categories: article.categories.map((category) => category.slug),
      author: APP_PROFILE.author,
      date: article.created_at,
      enclosure: {
        url: article.thumbnail
      }
    })
  })

  return feed.xml({ indent: true })
}
