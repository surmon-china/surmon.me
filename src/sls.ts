/**
 * @file Serverless server entry
 * @module Serverless
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
import { responser, erroror } from './server/responser'
import { cacher } from './server/cacher'
import { createExpressApp } from './server'

const { app, server } = createExpressApp()

enableProdRuntime(app)

// run
server.listen(getPort(), () => {
  const infos = [
    `in ${NODE_ENV}`,
    `at ${new Date().toLocaleString()}`,
    `listening on ${JSON.stringify(server.address())}`
  ]
  console.info('[surmon.me]', `Run! ${infos.join(', ')}.`)
})

export const initializer = (context, callback) => {
  console.log('serverless initializing')
  callback(null, '')
}

// TODO!
export const handler = (request, response, context) => {
  console.log('hello world')
  response.send('hello world')
}
