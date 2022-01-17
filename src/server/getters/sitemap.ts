/**
 * @file Archive sitemap generator
 * @module server.getter.sitemap
 * @author Surmon <https://github.com/surmon-china>
 */

import { Readable } from 'stream'
import { SitemapStream, streamToPromise, SitemapItemLoose, EnumChangefreq } from 'sitemap'
import { getArchiveData, getArticleURL, getPageURL, getTagURL, getCategoryURL } from './archive'
import { META } from '@/config/app.config'

export const getSitemapXML = async (archiveData?: any) => {
  const archive = archiveData || (await getArchiveData())
  const sitemapStream = new SitemapStream({
    hostname: META.url
  })

  const sitemapItemList: SitemapItemLoose[] = [
    { url: META.url, changefreq: EnumChangefreq.ALWAYS, priority: 1 },
    {
      url: getPageURL('about'),
      changefreq: EnumChangefreq.YEARLY,
      priority: 1
    },
    {
      url: getPageURL('merch'),
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

  archive.categories.forEach((category) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getCategoryURL(category.slug)
    })
  })

  archive.tags.forEach((tag) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getTagURL(tag.slug)
    })
  })

  archive.articles.forEach((article) => {
    sitemapItemList.push({
      priority: 0.8,
      changefreq: EnumChangefreq.DAILY,
      url: getArticleURL(article.id),
      lastmodISO: new Date(article.update_at).toISOString()
    })
  })

  return streamToPromise(Readable.from(sitemapItemList).pipe(sitemapStream)).then((data) =>
    data.toString()
  )
}
