/**
 * @file BFF archive cacher
 * @module server.archive
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import LRU from 'lru-cache'
import { loadEnv } from 'vite'
import { RequestHandler } from 'express'
import { META } from '@/config/app.config'
import { getSitemapXML } from './sitemap'
import { getRSSXML } from './rss'
import { ROOT_PATH } from '../helper'

export const getPageUrl = (page) => `${META.url}/${page}`
export const getTagUrl = (tag) => `${META.url}/tag/${tag}`
export const getCategoryUrl = (category) => `${META.url}/category/${category}`
export const getArticleUrl = (id) => `${META.url}/article/${id}`

const appProdENV = loadEnv('production', ROOT_PATH)
const archiveURL = `${appProdENV.VITE_API_ONLINE_URL}/archive`
const UPDATE_TIME = {
  HOURS_05: 1000 * 60 * 30,
  HOURS_1: 1000 * 60 * 60
}

enum ArchiveCacheKey {
  Data = 'data',
  Sitemap = 'sitemap',
  RSS = 'rss'
}
const archiveCache = new LRU({
  max: Infinity,
  maxAge: 1000 * 60 * 60 * 2 // 2 hour cache
})

export const handleSitemapRequest: RequestHandler = (_, response) => {
  response.header('Content-Type', 'application/xml')
  response.send(archiveCache.get(ArchiveCacheKey.Sitemap))
}

export const handleRSSRequest: RequestHandler = (_, response) => {
  response.header('Content-Type', 'application/xml')
  response.send(archiveCache.get(ArchiveCacheKey.RSS))
}

export const fecthArchiveData = () => {
  return axios
    .get<any>(archiveURL, { timeout: 6000 })
    .then((response) => {
      if (response.status === 200) {
        return response.data.result
      } else {
        return Promise.reject(response.statusText)
      }
    })
    .catch((error) => {
      return Promise.reject(error.toJSON?.() || error)
    })
}

export const startArchiveUpdater = () => {
  ;(function doUpdate() {
    fecthArchiveData()
      .then(async (archive) => {
        const sitemap = await getSitemapXML(archive)
        archiveCache.set(ArchiveCacheKey.Data, archive)
        archiveCache.set(ArchiveCacheKey.RSS, getRSSXML(archive))
        archiveCache.set(ArchiveCacheKey.Sitemap, sitemap.toString())
        setTimeout(doUpdate, UPDATE_TIME.HOURS_1)
      })
      .catch((error) => {
        console.warn('[archive]', '更新失败', new Date(), error)
        setTimeout(doUpdate, UPDATE_TIME.HOURS_05)
      })
  })()
}
