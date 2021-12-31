/**
 * @file Archive RSS generator
 * @module server.getter.rss
 * @author Surmon <https://github.com/surmon-china>
 */

import RSS from 'rss'
import { META } from '@/config/app.config'
import { getArchiveData, getArticleURL } from './archive'

export const getRSSXML = async (archiveData?: any) => {
  const archive = archiveData || (await getArchiveData())
  const feed = new RSS({
    title: META.title,
    description: META.sub_title,
    site_url: META.url,
    feed_url: `${META.url}/rss.xml`,
    image_url: `${META.url}/icon.png`,
    managingEditor: META.author,
    webMaster: META.author,
    generator: `${META.domain}`,
    categories: archive.categories.map((category) => category.slug),
    copyright: `${new Date().getFullYear()} ${META.title}`,
    language: 'zh',
    ttl: 60
  })
  archive.articles.forEach((article) =>
    feed.item({
      title: article.title,
      description: article.description,
      url: getArticleURL(article.id),
      guid: getArticleURL(article.id),
      categories: article.category.map((category) => category.slug),
      author: META.author,
      date: article.create_at,
      enclosure: {
        url: article.thumb
      }
    })
  )
  return feed.xml({ indent: true })
}
