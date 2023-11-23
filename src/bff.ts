/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */

import dotenv from 'dotenv'
import { META } from '@/config/app.config'
import { BFF_TUNNEL_PREFIX as TUN, getBFFServerPort } from '@/config/bff.config'
import { NODE_ENV, isNodeDev } from '@/server/environment'
import { BAD_REQUEST } from '@/constants/http-code'
import { TunnelModule } from '@/constants/tunnel'
import { getRssXml } from './server/getters/rss'
import { getSitemapXml } from './server/getters/sitemap'
import { getGTagScript } from './server/getters/gtag'
import { getAllWallpapers } from './server/getters/wallpaper'
import { getMyGoogleMap } from './server/getters/my-google-map'
import { getTwitterAggregate } from './server/getters/twitter'
import { getGitHubSponsors, getGitHubContributions } from './server/getters/github'
import { getInstagramMedias, getInstagramMediaChildren, getInstagramCalendar } from './server/getters/instagram'
import { getYouTubeChannelPlayLists, getYouTubeVideoListByPlayerlistId } from './server/getters/youtube'
import { getGitHubStatistic, getNPMStatistic } from './server/getters/open-srouce'
import { getDoubanMovies } from './server/getters/douban'
import { getSongList } from './server/getters/netease-music'
import { getWebFont, WebFontContentType } from './server/getters/webfont'
import { enableDevRenderer } from './server/renderer/dev'
import { enableProdRenderer } from './server/renderer/prod'
import { responser, errorer } from './server/helpers/responser'
import cacher, { minutes, hours, days } from './server/helpers/cacher'
import { createExpressApp } from './server'
import { createLogger } from '@/utils/logger'

export const logger = createLogger('BFF')

// init env variables for BFF server env
dotenv.config()

// create http server app
createExpressApp().then(async ({ app, server, cache }) => {
  // sitemap.xml
  app.get('/sitemap.xml', async (_, response) => {
    try {
      response.header('Content-Type', 'application/xml')
      response.send(await getSitemapXml())
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // rss.xml
  app.get('/rss.xml', async (_, response) => {
    try {
      response.header('Content-Type', 'application/xml')
      response.send(await getRssXml())
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // gtag script
  const getGtagCache = cacher.interval(cache, {
    key: 'gtag',
    ttl: days(7),
    interval: days(3),
    retry: hours(1),
    getter: getGTagScript
  })

  app.get('/gtag-script', async (_, response) => {
    try {
      response.header('Content-Type', 'text/javascript')
      response.send(await getGtagCache())
    } catch (error) {
      errorer(response, { message: error })
    }
  })

  // Twitter aggregate
  const getTwitterAggregateCache = cacher.interval(cache, {
    key: TunnelModule.TwitterAggregate,
    ttl: hours(12),
    interval: hours(2.5),
    retry: minutes(10),
    getter: getTwitterAggregate
  })

  app.get(
    `${TUN}/${TunnelModule.TwitterAggregate}`,
    responser(() => getTwitterAggregateCache())
  )

  // Bing wallpapers
  const getWallpaperCache = cacher.interval(cache, {
    key: TunnelModule.BingWallpaper,
    ttl: days(1),
    interval: hours(6),
    retry: minutes(30),
    getter: getAllWallpapers
  })

  app.get(
    `${TUN}/${TunnelModule.BingWallpaper}`,
    responser(() => getWallpaperCache())
  )

  // GitHub sponsors
  const getSponsorsCache = cacher.interval(cache, {
    key: TunnelModule.GitHubSponsors,
    ttl: days(3),
    interval: hours(18),
    retry: minutes(10),
    getter: getGitHubSponsors
  })

  app.get(
    `${TUN}/${TunnelModule.GitHubSponsors}`,
    responser(() => getSponsorsCache())
  )

  // 163 music BGM list
  const get163MusicCache = cacher.interval(cache, {
    key: TunnelModule.NetEaseMusic,
    ttl: days(2),
    interval: hours(12),
    retry: minutes(10),
    getter: getSongList
  })

  app.get(
    `${TUN}/${TunnelModule.NetEaseMusic}`,
    responser(() => get163MusicCache())
  )

  // Instagram medias cache
  const getInsFirstPageMediasCache = cacher.interval(cache, {
    key: 'instagram_medias_page_first',
    ttl: hours(12),
    interval: hours(3),
    retry: minutes(10),
    getter: getInstagramMedias
  })

  // Instagram medias route
  app.get(`${TUN}/${TunnelModule.InstagramMedias}`, (request, response, next) => {
    const afterToken = request.query.after
    if (afterToken && typeof afterToken !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return !afterToken
        ? getInsFirstPageMediasCache()
        : cacher.passive(cache, {
            key: `instagram_medias_page_${afterToken}`,
            ttl: hours(12),
            getter: () => getInstagramMedias({ after: afterToken })
          })
    })(request, response, next)
  })

  // Instagram media children
  app.get(`${TUN}/${TunnelModule.InstagramMediaChildren}`, (request, response, next) => {
    const mediaId = request.query.id
    if (!mediaId || typeof mediaId !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return cacher.passive(cache, {
        key: `instagram_media_children_${mediaId}`,
        ttl: days(7),
        getter: () => getInstagramMediaChildren(mediaId)
      })
    })(request, response, next)
  })

  // Instagram calendar
  const getInsCalendarCache = cacher.interval(cache, {
    key: TunnelModule.InstagramCalendar,
    ttl: hours(36),
    interval: hours(18),
    retry: minutes(2),
    getter: getInstagramCalendar
  })

  app.get(
    `${TUN}/${TunnelModule.InstagramCalendar}`,
    responser(() => getInsCalendarCache())
  )

  // YouTube playlists
  const getYouTubePlaylistsCache = cacher.interval(cache, {
    key: TunnelModule.YouTubePlaylist,
    ttl: days(3),
    interval: hours(24),
    retry: minutes(10),
    getter: getYouTubeChannelPlayLists
  })

  app.get(
    `${TUN}/${TunnelModule.YouTubePlaylist}`,
    responser(() => getYouTubePlaylistsCache())
  )

  // YouTube videos
  app.get(`${TUN}/${TunnelModule.YouTubeVideoList}`, (request, response, next) => {
    const playlistId = request.query.id
    if (!playlistId || typeof playlistId !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return cacher.passive(cache, {
        key: `youtube_playlist_${playlistId}`,
        ttl: hours(1),
        getter: () => getYouTubeVideoListByPlayerlistId(playlistId)
      })
    })(request, response, next)
  })

  // GitHub contributions
  app.get(
    `${TUN}/${TunnelModule.GitHubContributions}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.GitHubContributions,
        ttl: hours(8),
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

  // GitHub statistic
  app.get(
    `${TUN}/${TunnelModule.OpenSourceGitHubStatistic}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.OpenSourceGitHubStatistic,
        ttl: hours(8),
        getter: getGitHubStatistic
      })
    })
  )

  // NPM statistic
  app.get(
    `${TUN}/${TunnelModule.OpenSourceNPMStatistic}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.OpenSourceNPMStatistic,
        ttl: hours(8),
        getter: getNPMStatistic
      })
    })
  )

  // Douban movies
  app.get(
    `${TUN}/${TunnelModule.DoubanMovies}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.DoubanMovies,
        ttl: days(3),
        getter: getDoubanMovies
      })
    })
  )

  // GoogleMaps - My Maps
  app.get(
    `${TUN}/${TunnelModule.MyGoogleMap}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.MyGoogleMap,
        ttl: hours(6),
        getter: getMyGoogleMap
      })
    })
  )

  // WebFont
  app.get(`${TUN}/${TunnelModule.WebFont}`, async (request, response) => {
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

  // vue renderer
  await (isNodeDev ? enableDevRenderer(app, cache) : enableProdRenderer(app, cache))

  // run
  server.listen(getBFFServerPort(), () => {
    const address = server.address()
    const port = typeof address === 'string' ? address : address?.port ?? getBFFServerPort()
    logger.success(
      `${META.title} app is running!`,
      `| env: ${NODE_ENV}`,
      `| port: ${port}`,
      `| ${new Date().toLocaleString()}`
    )
  })
})
