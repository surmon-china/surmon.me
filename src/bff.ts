/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */

import dotenv from 'dotenv'
import express from 'express'
import { NODE_ENV, isNodeDev } from '@/server/environment'
import { BFF_TUNNEL_PREFIX, getBFFServerPort } from '@/config/bff.config'
import { TunnelModule } from '@/constants/tunnel'
import { BAD_REQUEST } from '@/constants/http-code'
import { getRssXml } from './server/getters/rss'
import { getSitemapXml } from './server/getters/sitemap'
import { getGTagScript } from './server/getters/gtag'
import { getAllWallpapers } from './server/getters/wallpaper'
import { getMyGoogleMap } from './server/getters/my-google-map'
import { getTwitterAggregate } from './server/getters/twitter'
import { getGitHubSponsors, getGitHubContributions } from './server/getters/github'
import {
  getInstagramMedias,
  getInstagramMediaChildren,
  getInstagramCalendar,
  initInstagramCalendar
} from './server/getters/instagram'
import { getYouTubeChannelPlayLists, getYouTubeVideoListByPlayerlistId } from './server/getters/youtube'
import { getGitHubStatistic, getNPMStatistic } from './server/getters/open-srouce'
import { getDoubanMovies } from './server/getters/douban'
import { getSongList } from './server/getters/netease-music'
import { getWebFont, WebFontContentType } from './server/getters/webfont'
import { enableDevRenderer } from './server/renderer/dev'
import { enableProdRenderer } from './server/renderer/prod'
import { PUBLIC_PATH } from './server/helpers/configurer'
import { responser, errorer } from './server/helpers/responser'
import { cacher } from './server/helpers/cacher'
import { createExpressApp } from './server'

// init env variables for BFF server env
dotenv.config()

// app
createExpressApp().then(async ({ app, server, cache }) => {
  // static
  app.use(express.static(PUBLIC_PATH))
  // init thirds task
  initInstagramCalendar()

  // sitemap
  app.get('/sitemap.xml', async (_, response) => {
    try {
      response.header('Content-Type', 'application/xml')
      response.send(await getSitemapXml())
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // RSS
  app.get('/rss.xml', async (_, response) => {
    try {
      response.header('Content-Type', 'application/xml')
      response.send(await getRssXml())
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // gtag
  app.get('/effects/gtag', async (_, response) => {
    try {
      const data = await cacher({
        cache,
        key: 'gtag',
        ttl: 60 * 60 * 48, // 48 hours
        retryWhen: 60 * 60 * 1, // 1 hours
        getter: getGTagScript
      })
      response.header('Content-Type', 'text/javascript')
      response.send(data)
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // WebFont
  app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.WebFont}`, async (request, response) => {
    const fontname = decodeURIComponent(String(request.query.fontname)).trim()
    const text = decodeURIComponent(String(request.query.text)).trim()
    if (!text || !fontname) {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    try {
      const data = await getWebFont({ fontname, text })
      // never expired
      response.header('Cache-Control', 'public, max-age=31536000')
      response.header('Content-Type', WebFontContentType)
      response.send(data)
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // Bing wallpapers
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.BingWallpaper}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.BingWallpaper,
        ttl: 60 * 60 * 6, // 6 hours
        retryWhen: 60 * 30, // 30 minutes
        getter: getAllWallpapers
      })
    })
  )

  // My GoogleMap
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.MyGoogleMap}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.MyGoogleMap,
        ttl: 60 * 60 * 6, // 6 hours
        retryWhen: 60 * 30, // 30 minutes
        getter: getMyGoogleMap
      })
    })
  )

  // GitHub sponsors
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubSponsors}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.GitHubSponsors,
        ttl: 60 * 60 * 18, // 18 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getGitHubSponsors
      })
    })
  )

  // GitHub contributions
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubContributions}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.GitHubContributions,
        ttl: 60 * 60 * 8, // 8 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: () => {
          const now = new Date()
          const end = now.toISOString()
          now.setFullYear(now.getFullYear() - 1)
          const start = now.toISOString()
          return getGitHubContributions(start, end)
        }
      })
    })
  )

  // open-source
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSourceGitHubStatistic}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.OpenSourceGitHubStatistic,
        ttl: 60 * 60 * 8, // 8 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getGitHubStatistic
      })
    })
  )

  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSourceNPMStatistic}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.OpenSourceNPMStatistic,
        ttl: 60 * 60 * 8, // 8 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getNPMStatistic
      })
    })
  )

  // 163 music BGM list
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.NetEaseMusic}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.NetEaseMusic,
        ttl: 60 * 60 * 6, // 6 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getSongList
      })
    })
  )

  // Douban movies
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.DoubanMovies}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.DoubanMovies,
        ttl: 60 * 60 * 32, // 32 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getDoubanMovies
      })
    })
  )

  // Twitter aggregate
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterAggregate}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.TwitterAggregate,
        ttl: 60 * 60 * 1, // 1 hour
        retryWhen: 60 * 10, // 10 minutes
        getter: getTwitterAggregate
      })
    })
  )

  // Instagram medias
  app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramMedias}`, (request, response, next) => {
    const afterToken = request.query.after
    if (afterToken && typeof afterToken !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return cacher({
        cache,
        key: `instagram_medias_page_${afterToken ?? 'first'}`,
        preRefresh: !afterToken, // Disable pre-refresh when not first pafe
        ttl: 60 * 60 * 3, // 3 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: () => getInstagramMedias({ after: afterToken })
      })
    })(request, response, next)
  })

  // Instagram media children
  app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramMediaChildren}`, (request, response, next) => {
    const mediaId = request.query.id
    if (!mediaId || typeof mediaId !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return cacher({
        cache,
        key: `instagram_media_children_${mediaId}`,
        ttl: 60 * 60 * 24 * 7, // 7 days
        retryWhen: 60 * 10, // 10 minutes
        getter: () => getInstagramMediaChildren(mediaId)
      })
    })(request, response, next)
  })

  // Instagram calendar
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramCalendar}`,
    responser(() => getInstagramCalendar())
  )

  // YouTube platlists
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubePlaylist}`,
    responser(() => {
      return cacher({
        cache,
        key: TunnelModule.YouTubePlaylist,
        ttl: 60 * 60 * 24, // 24 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getYouTubeChannelPlayLists
      })
    })
  )

  // YouTube videos
  app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubeVideoList}`, (request, response, next) => {
    const playlistId = request.query.id
    if (!playlistId || typeof playlistId !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return cacher({
        cache,
        key: `youtube_playlist_${playlistId}`,
        ttl: 60 * 60 * 1, // 1 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: () => getYouTubeVideoListByPlayerlistId(playlistId)
      })
    })(request, response, next)
  })

  // vue renderer
  await (isNodeDev ? enableDevRenderer(app, cache) : enableProdRenderer(app, cache))

  // run
  server.listen(getBFFServerPort(), () => {
    const infos = [
      `in ${NODE_ENV}`,
      `at ${new Date().toLocaleString()}`,
      `listening on ${JSON.stringify(server.address())}`
    ]
    console.info('[surmon.me]', `Run! ${infos.join(', ')}.`)
  })
})
