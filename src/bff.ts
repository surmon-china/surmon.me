/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */

import express from 'express'
import { NODE_ENV, isDev } from '@/environment'
import { TunnelModule } from '@/constants/tunnel'
import { BFF_TUNNEL_PREFIX, getBFFServerPort } from '@/config/bff.config'
import { getRSSXML } from './server/getters/rss'
import { getSitemapXML } from './server/getters/sitemap'
import { getGTagScript } from './server/getters/gtag'
import { getAllWallpapers } from './server/getters/wallpaper'
import { getMyGoogleMap } from './server/getters/my-google-map'
import { getGitHubSponsors, getGitHubContributions } from './server/getters/github'
import {
  getTwitterTweets,
  getTwitterUserinfo,
  getTwitterCalendar,
  initTwitterCalendar
} from './server/getters/twitter'
import {
  getInstagramMedias,
  getInstagramCalendar,
  initInstagramCalendar
} from './server/getters/instagram'
import {
  getYouTubeChannelPlayLists,
  getYouTubeVideoListByPlayerlistID
} from './server/getters/youtube'
import { getGitHubStatistic, getNPMStatistic } from './server/getters/open-srouce'
import { getOpenSeaAssets, getOpenSeaCollections } from './server/getters/opensea'
import { getDoubanMovies } from './server/getters/douban'
import { getSongList } from './server/getters/netease-music'
import { getWebFont, WebFontContentType } from './server/getters/webfont'
import { enableDevRenderer } from './server/renderer/dev'
import { enableProdRenderer } from './server/renderer/prod'
import { PUBLIC_PATH } from './server/helpers/configurer'
import { responsor, erroror } from './server/helpers/responsor'
import { cacher } from './server/helpers/cacher'
import { createExpressApp } from './server'

// @ts-expect-error
process.noDeprecation = true

// app
createExpressApp().then(({ app, server, cache }) => {
  // static
  app.use(express.static(PUBLIC_PATH))
  // init thirds task
  initTwitterCalendar()
  initInstagramCalendar()

  // sitemap
  app.get('/sitemap.xml', async (_, response) => {
    try {
      const data = await cacher({
        cache,
        key: 'sitemap',
        age: 60 * 60 * 1, // 1 hours
        getter: getSitemapXML
      })
      response.header('Content-Type', 'application/xml')
      response.send(data)
    } catch (error) {
      erroror(response, error)
    }
  })

  // RSS
  app.get('/rss.xml', async (_, response) => {
    try {
      const data = await cacher({
        cache,
        key: 'rss',
        age: 60 * 60 * 1, // 1 hours
        getter: getRSSXML
      })
      response.header('Content-Type', 'application/xml')
      response.send(data)
    } catch (error) {
      erroror(response, error)
    }
  })

  // gtag
  app.get('/effects/gtag', async (_, response) => {
    try {
      const data = await cacher({
        cache,
        key: 'gtag',
        age: 60 * 60 * 24, // 24 hours
        retryWhen: 60 * 60 * 1, // 1 hours
        getter: getGTagScript
      })
      response.header('Content-Type', 'text/javascript')
      response.send(data)
    } catch (error) {
      erroror(response, error)
    }
  })

  // WebFont
  app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.WebFont}`, async (request, response) => {
    const fontname = decodeURIComponent(String(request.query.fontname)).trim()
    const text = decodeURIComponent(String(request.query.text)).trim()
    if (!text || !fontname) {
      return erroror(response, 'Invalid params')
    }
    try {
      const data = await getWebFont({ fontname, text })
      response.header('Content-Type', WebFontContentType)
      response.send(data)
    } catch (error) {
      erroror(response, error)
    }
  })

  // Bing wallpapers
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.BingWallpaper}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.BingWallpaper,
        age: 60 * 60 * 6, // 6 hours
        retryWhen: 60 * 30, // 30 minutes
        getter: getAllWallpapers
      })
    })
  )

  // My GoogleMap
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.MyGoogleMap}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.MyGoogleMap,
        age: 60 * 60 * 6, // 6 hours
        retryWhen: 60 * 30, // 30 minutes
        getter: getMyGoogleMap
      })
    })
  )

  // GitHub sponsors
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubSponsors}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.GitHubSponsors,
        age: 60 * 60 * 18, // 18 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getGitHubSponsors
      })
    })
  )

  // GitHub contributions
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubContributions}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.GitHubContributions,
        age: 60 * 60 * 12, // 12 hours
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
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.OpenSourceGitHubStatistic,
        age: 60 * 60 * 8, // 8 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getGitHubStatistic
      })
    })
  )

  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSourceNPMStatistic}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.OpenSourceNPMStatistic,
        age: 60 * 60 * 8, // 8 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getNPMStatistic
      })
    })
  )

  // 163 music BGM list
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.NetEaseMusic}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.NetEaseMusic,
        age: 60 * 60 * 12, // 12 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getSongList
      })
    })
  )

  // Douban movies
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.DoubanMovies}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.DoubanMovies,
        age: 60 * 60 * 32, // 32 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getDoubanMovies
      })
    })
  )

  // Twitter userinfo
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterUserInfo}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.TwitterUserInfo,
        age: 60 * 60 * 12, // 12 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getTwitterUserinfo
      })
    })
  )

  // Twitter newest tweets
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterTweets}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.TwitterTweets,
        age: 60 * 60 * 1, // 1 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getTwitterTweets
      })
    })
  )

  // Twitter tweets calendar
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterCalendar}`,
    responsor(() => getTwitterCalendar())
  )

  // Instagram newest medias
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramMedias}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.InstagramMedias,
        age: 60 * 60 * 2, // 2 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getInstagramMedias
      })
    })
  )

  // Instagram calendar
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramCalendar}`,
    responsor(() => getInstagramCalendar())
  )

  // YouTube platlists
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubePlaylist}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.YouTubePlaylist,
        age: 60 * 60 * 24, // 24 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getYouTubeChannelPlayLists
      })
    })
  )

  // YouTube videos
  app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubeVideoList}`, (request, response, next) => {
    const playlistID = request.query.id
    if (!playlistID || typeof playlistID !== 'string') {
      return erroror(response, 'Invalid params')
    }
    responsor(() => {
      return cacher({
        cache,
        key: `youtube_playlist_${playlistID}`,
        age: 60 * 60 * 1, // 1 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: () => getYouTubeVideoListByPlayerlistID(playlistID)
      })
    })(request, response, next)
  })

  // OpenSea assets
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSeaAssets}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.OpenSeaAssets,
        age: 60 * 60 * 1, // 1 hours
        retryWhen: 60 * 10, // 10 minutes
        getter: getOpenSeaAssets
      })
    })
  )

  // OpenSea collections
  app.get(
    `${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSeaCollections}`,
    responsor(() => {
      return cacher({
        cache,
        key: TunnelModule.OpenSeaCollections,
        age: 60 * 60 * 0.5, // 30 minutes
        retryWhen: 60 * 5, // 5 minutes
        getter: getOpenSeaCollections
      })
    })
  )

  // vue renderer
  isDev ? enableDevRenderer(app, cache) : enableProdRenderer(app, cache)

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
