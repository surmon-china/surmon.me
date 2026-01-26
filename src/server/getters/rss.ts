/**
 * @file Archive RSS generator
 * @module server/getter/rss
 * @author Surmon <https://github.com/surmon-china>
 */

import RSS from 'rss'
import axios from '@/server/services/axios'
import { APP_PROFILE } from '@/configs/app.config'
import { NODEPRESS_API_URL } from '@/configs/bff.api'
import type { Archive } from '@/interfaces/archive'
import type { NodePressSuccessResponse } from '@/services/nodepress'
import type { CacheStore } from '@/server/services/cache'
import { getArticleURL } from '../utils/url'

export const getRssXml = async (cache: CacheStore) => {
  // HACK: use cache to avoid frequent API requests
  let archiveData = await cache.withoutNamespace?.().get<Archive>('nodepress:archive')
  if (!archiveData) {
    const api = `${NODEPRESS_API_URL}/archive`
    const response = await axios.get<NodePressSuccessResponse<Archive>>(api, { timeout: 6000 })
    archiveData = response.data.result
  }

  const feed = new RSS({
    title: APP_PROFILE.title,
    description: APP_PROFILE.sub_title_zh,
    site_url: APP_PROFILE.url,
    feed_url: `${APP_PROFILE.url}/rss.xml`,
    image_url: `${APP_PROFILE.url}/icon.png`,
    managingEditor: APP_PROFILE.author,
    webMaster: APP_PROFILE.author,
    generator: `${APP_PROFILE.domain}`,
    categories: archiveData.categories.map((category) => category.slug),
    copyright: `${new Date().getFullYear()} ${APP_PROFILE.title}`,
    language: 'zh',
    ttl: 60
  })

  archiveData.articles.forEach((article) => {
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
