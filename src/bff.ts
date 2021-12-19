/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */

import express from 'express'
import { NODE_ENV, isDev } from '@/environment'
import { TunnelModule } from '@/constants/tunnel'
import { API_TUNNEL_PREFIX, getPort } from '@/config/bff.config'
import { getRSSXML } from './server/getters/rss'
import { getSitemapXML } from './server/getters/sitemap'
import { getGTagScript } from './server/getters/gtag'
import { getGitHubChartSVG } from './server/getters/ghchart'
import { getBiliBiliVideos } from './server/getters/bilibili'
import { getAllWallpapers } from './server/getters/wallpaper'
import { getGitHubRepositories } from './server/getters/github'
import { getSongList } from './server/getters/music'
import { enableDevRuntime } from './server/runtime/dev'
import { enableProdRuntime } from './server/runtime/prod'
import { PUBLIC_PATH } from './server/helper'
import { responser, erroror } from './server/responser'
import { cacher } from './server/cacher'
import { createExpressApp } from './server'

// @ts-expect-error
process.noDeprecation = true

// app
const { app, server } = createExpressApp()

// static
app.use(express.static(PUBLIC_PATH))

// resources
app.get('/sitemap.xml', async (_, response) => {
  try {
    const data = await cacher({
      key: 'sitemap',
      age: 60 * 60, // 1 hours
      getter: getSitemapXML
    })
    response.header('Content-Type', 'application/xml')
    response.send(data)
  } catch (error) {
    erroror(response, error)
  }
})

app.get('/rss.xml', async (_, response) => {
  try {
    const data = await cacher({
      key: 'rss',
      age: 60 * 60, // 1 hours
      getter: getRSSXML
    })
    response.header('Content-Type', 'application/xml')
    response.send(data)
  } catch (error) {
    erroror(response, error)
  }
})

app.get('/gtag.js', async (_, response) => {
  try {
    const data = await cacher({
      key: 'gtag',
      age: 60 * 60 * 24, // 24 hours
      retryWhen: 60 * 60 * 1, // 1 hours
      getter: getGTagScript
    })
    response.header('Content-Type', 'application/javascript')
    response.send(data)
  } catch (error) {
    erroror(response, error)
  }
})

app.get('/ghchart.svg', async (_, response) => {
  try {
    const data = await cacher({
      key: 'ghchart',
      age: 60 * 60 * 6, // 6 hours
      retryWhen: 60 * 60 * 30, // 30 minutes
      getter: getGitHubChartSVG
    })
    response.header('Content-Type', 'image/svg+xml')
    response.send(data)
  } catch (error) {
    erroror(response, error)
  }
})

// tunnel
app.get(
  `${API_TUNNEL_PREFIX}/${TunnelModule.BiliBili}`,
  responser(
    cacher({
      key: 'bilibili',
      age: 60 * 60 * 1, // 1 hours
      retryWhen: 60 * 5, // 5 minutes
      getter: getBiliBiliVideos
    })
  )
)

app.get(
  `${API_TUNNEL_PREFIX}/${TunnelModule.Wallpaper}`,
  responser(
    cacher({
      key: 'wallpaper',
      age: 60 * 60 * 8, // 8 hours
      retryWhen: 60 * 30, // 30 minutes
      getter: getAllWallpapers
    })
  )
)

app.get(
  `${API_TUNNEL_PREFIX}/${TunnelModule.GitHub}`,
  responser(
    cacher({
      key: 'github',
      age: 60 * 60 * 2, // 2 hours
      retryWhen: 60 * 30, // 30 minutes
      getter: getGitHubRepositories
    })
  )
)

app.get(
  `${API_TUNNEL_PREFIX}/${TunnelModule.Music}`,
  responser(
    cacher({
      key: 'music',
      age: 60 * 60 * 1, // 1 hours
      retryWhen: 60 * 10, // 10 minutes
      getter: getSongList
    })
  )
)

// app effect
isDev ? enableDevRuntime(app) : enableProdRuntime(app)

// run
server.listen(getPort(), () => {
  const infos = [
    `in ${NODE_ENV}`,
    `at ${new Date().toLocaleString()}`,
    `listening on ${JSON.stringify(server.address())}`
  ]
  console.info('[surmon.me]', `Run! ${infos.join(', ')}.`)
})
