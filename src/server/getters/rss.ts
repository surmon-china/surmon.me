/**
 * @file Archive RSS generator
 * @module server/getter/rss
 * @author Surmon <https://github.com/surmon-china>
 */

import RSS from 'rss'
import axios from '@/server/services/axios'
import { APP_META } from '@/configs/app.config'
import { NODEPRESS_API_URL } from '@/configs/bff.api'
import type { Archive } from '@/interfaces/archive'
import type { NodePressResult } from '@/services/nodepress'
import { getArticleURL } from '../utils/url'

export const getRssXml = async () => {
  const api = `${NODEPRESS_API_URL}/archive`
  const response = await axios.get<NodePressResult<Archive>>(api, { timeout: 6000 })
  const archive = response.data.result
  const feed = new RSS({
    title: APP_META.title,
    description: APP_META.zh_sub_title,
    site_url: APP_META.url,
    feed_url: `${APP_META.url}/rss.xml`,
    image_url: `${APP_META.url}/icon.png`,
    managingEditor: APP_META.author,
    webMaster: APP_META.author,
    generator: `${APP_META.domain}`,
    categories: archive.categories.map((category) => category.slug),
    copyright: `${new Date().getFullYear()} ${APP_META.title}`,
    language: 'zh',
    ttl: 60
  })

  archive.articles.forEach((article) => {
    return feed.item({
      title: article.title,
      description: article.description,
      url: getArticleURL(article.id),
      guid: String(article.id),
      categories: article.categories.map((category) => category.slug),
      author: APP_META.author,
      date: article.created_at,
      enclosure: {
        url: article.thumbnail
      }
    })
  })

  return feed.xml({ indent: true })
}
