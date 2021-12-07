/**
 * @file Archive sitemap generator
 * @module server.archive.sitemap
 * @author Surmon <https://github.com/surmon-china>
 */

import { Readable } from 'stream'
import { SitemapStream, streamToPromise, SitemapItemLoose, EnumChangefreq } from 'sitemap'
import { META } from '@/config/app.config'
import { getArticleUrl, getPageUrl, getTagUrl, getCategoryUrl } from '.'

export const getSitemapXML = (archive) => {
  const sitemapStream = new SitemapStream({
    hostname: META.url
  })

  const sitemapItemList: SitemapItemLoose[] = [
    { url: META.url, changefreq: EnumChangefreq.ALWAYS, priority: 1 },
    {
      url: getPageUrl('about'),
      changefreq: EnumChangefreq.YEARLY,
      priority: 1
    },
    {
      url: getPageUrl('merch'),
      changefreq: EnumChangefreq.YEARLY,
      priority: 1
    },
    {
      url: getPageUrl('archive'),
      changefreq: EnumChangefreq.ALWAYS,
      priority: 1
    },
    {
      url: getPageUrl('guestbook'),
      changefreq: EnumChangefreq.ALWAYS,
      priority: 1
    }
  ]

  archive.categories.forEach((category) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getCategoryUrl(category.slug)
    })
  })

  archive.tags.forEach((tag) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getTagUrl(tag.slug)
    })
  })

  archive.articles.forEach((article) => {
    sitemapItemList.push({
      priority: 0.8,
      changefreq: EnumChangefreq.DAILY,
      url: getArticleUrl(article.id),
      lastmodISO: new Date(article.update_at).toISOString()
    })
  })

  return streamToPromise(Readable.from(sitemapItemList).pipe(sitemapStream))
}
