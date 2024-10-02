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
import {
  getThreadsProfile,
  getThreadsMedias,
  getThreadsMediaChildren,
  getThreadsMediaConversation
} from './server/getters/threads'
import {
  getInstagramProfile,
  getInstagramMedias,
  getInstagramMediaChildren,
  getInstagramCalendar
} from './server/getters/instagram'
import { getYouTubeChannelPlayLists, getYouTubeVideoListByPlayerListId } from './server/getters/youtube'
import { getGitHubStatistic, getGitHubSponsors, getGitHubContributions } from './server/getters/github'
import { getNPMStatistic } from './server/getters/npm'
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

  // Threads profile
  const getThreadsProfileCache = cacher.interval(cache, {
    key: TunnelModule.ThreadsProfile,
    ttl: days(7),
    interval: hours(12),
    retry: hours(1),
    getter: getThreadsProfile
  })

  app.get(
    `${TUN}/${TunnelModule.ThreadsProfile}`,
    responser(() => getThreadsProfileCache())
  )

  // Threads latest medias
  const getThreadsFirstPageMediasCache = cacher.interval(cache, {
    key: 'threads_medias_page_first',
    ttl: hours(12),
    interval: minutes(20),
    retry: minutes(5),
    getter: getThreadsMedias
  })

  // Threads medias route
  app.get(`${TUN}/${TunnelModule.ThreadsMedias}`, (request, response, next) => {
    const afterToken = request.query.after
    if (afterToken && typeof afterToken !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return !afterToken
        ? getThreadsFirstPageMediasCache()
        : cacher.passive(cache, {
            key: `threads_medias_page_${afterToken}`,
            ttl: hours(12),
            getter: () => getThreadsMedias({ after: afterToken })
          })
    })(request, response, next)
  })

  // Threads media children
  app.get(`${TUN}/${TunnelModule.ThreadsMediaChildren}`, (request, response, next) => {
    const mediaId = request.query.id
    if (!mediaId || typeof mediaId !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return cacher.passive(cache, {
        key: `threads_media_children_${mediaId}`,
        ttl: days(7),
        getter: () => getThreadsMediaChildren(mediaId)
      })
    })(request, response, next)
  })

  // Threads media conversation
  app.get(`${TUN}/${TunnelModule.ThreadsMediaConversation}`, (request, response, next) => {
    const mediaId = request.query.id
    if (!mediaId || typeof mediaId !== 'string') {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    responser(() => {
      return cacher.passive(cache, {
        key: `threads_media_conversation_${mediaId}`,
        ttl: days(7),
        getter: () => getThreadsMediaConversation(mediaId)
      })
    })(request, response, next)
  })

  // Instagram profile
  app.get(
    `${TUN}/${TunnelModule.InstagramProfile}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.InstagramProfile,
        ttl: hours(12),
        getter: getInstagramProfile
      })
    })
  )

  // Instagram first page medias cache
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
        getter: () => getYouTubeVideoListByPlayerListId(playlistId)
      })
    })(request, response, next)
  })

  // GitHub sponsors
  app.get(
    `${TUN}/${TunnelModule.GitHubSponsors}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.GitHubSponsors,
        ttl: hours(4),
        getter: getGitHubSponsors
      })
    })
  )

  // GitHub contributions
  app.get(
    `${TUN}/${TunnelModule.GitHubContributions}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.GitHubContributions,
        ttl: hours(4),
        getter: getGitHubContributions
      })
    })
  )

  // GitHub statistic
  app.get(
    `${TUN}/${TunnelModule.StatisticGitHubJson}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.StatisticGitHubJson,
        ttl: hours(8),
        getter: getGitHubStatistic
      })
    })
  )

  // NPM statistic
  app.get(
    `${TUN}/${TunnelModule.StatisticNpmJson}`,
    responser(() => {
      return cacher.passive(cache, {
        key: TunnelModule.StatisticNpmJson,
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
    const fontName = decodeURIComponent(String(request.query.fontname)).trim()
    const text = decodeURIComponent(String(request.query.text)).trim()
    if (!text || !fontName) {
      errorer(response, { code: BAD_REQUEST, message: 'Invalid params' })
      return
    }

    try {
      const data = await getWebFont({ fontName, text })
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
    const port = typeof address === 'string' ? address : (address?.port ?? getBFFServerPort())
    logger.success(
      `${META.title} app is running!`,
      `| env: ${NODE_ENV}`,
      `| port: ${port}`,
      `| ${new Date().toLocaleString()}`
    )
  })
})
