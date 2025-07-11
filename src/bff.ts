/**
 * @file BFF Server
 * @module bff
 * @author Surmon <https://github.com/surmon-china>
 */

// This is required for dotenvx to work properly in the BFF server environment.
// It should be the first import in this file to ensure all environment variables are loaded before any other imports.
// https://github.com/dotenvx/dotenvx
import '@dotenvx/dotenvx/config'

import { STATIC_URL } from '@/configs/bff.api'
import { PUBLIC_PATH, NODE_ENV, isNodeProd } from '@/configs/bff.env'
import { APP_META, BFF_CONFIG } from '@/configs/app.config'
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '@/constants/http-code'
import { UNDEFINED } from '@/constants/value'
import { TunnelModule } from '@/constants/tunnel'

import { createBFFServerApp } from './server/main'
import { createCacheStore } from './server/services/cache'
import { createDevRenderer } from './server/renderer/dev'
import { createProdRenderer } from './server/renderer/prod'
import { createLogger } from '@/utils/logger'
import { respond } from './server/main/responder'
import { getErrorMessage } from './server/utils/error'
import cacher, { minutes, hours, days } from './server/utils/cacher'

import { getRssXml } from './server/getters/rss'
import { getSitemapXml } from './server/getters/sitemap'
import { getGTagScript } from './server/getters/gtag'
import { getAllWallpapers } from './server/getters/wallpaper'
import { getMyGoogleMap } from './server/getters/my-google-map'
import { getNPMStatistic } from './server/getters/npm'
import { getDoubanMovies } from './server/getters/douban'
import { getSongList } from './server/getters/netease-music'
import { getYouTubeChannelPlayLists, getYouTubeVideoListByPlayerListId } from './server/getters/youtube'
import { getGitHubStatistic, getGitHubSponsors, getGitHubContributions } from './server/getters/github'
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

export const logger = createLogger('BFF')

// Init BFF server cache service
const cache = await createCacheStore({
  namespace: APP_META.domain.replace(/\./gi, '_')
})

// Create server app
const app = createBFFServerApp({
  cache,
  poweredBy: APP_META.title,
  proxy: {
    prefix: BFF_CONFIG.proxy_url_prefix + '/',
    allowedSourceRegexp: isNodeProd ? BFF_CONFIG.proxy_allow_list_regexp : UNDEFINED,
    shouldBlockTargetUrl: (url) => {
      if (url.hostname.endsWith(APP_META.domain)) {
        return url.hostname !== new URL(STATIC_URL).hostname
      } else {
        return false
      }
    }
  },
  onError: (error, request) => {
    logger.failure('Error:', `"${request.url}" >`, getErrorMessage(error))
    return respond.error(error, INTERNAL_SERVER_ERROR)
  }
})

// sitemap.xml
app.usePathRequest('/sitemap.xml', async () => {
  return respond.xml(await getSitemapXml())
})

// rss.xml
app.usePathRequest('/rss.xml', async () => {
  return respond.xml(await getRssXml())
})

// gtag script
const getGtagCache = cacher.interval(cache, {
  key: 'gtag',
  ttl: days(7),
  interval: days(3),
  retry: hours(1),
  getter: getGTagScript
})

app.usePathRequest('/gtag-script', async () => {
  return respond.javascript(await getGtagCache())
})

// Bing wallpapers
const getWallpaperCache = cacher.interval(cache, {
  key: TunnelModule.BingWallpaper,
  ttl: days(1),
  interval: hours(6),
  retry: minutes(30),
  getter: getAllWallpapers
})

app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.BingWallpaper}`, async () => {
  return respond.json(await getWallpaperCache())
})

// 163 music BGM list
const get163MusicCache = cacher.interval(cache, {
  key: TunnelModule.NetEaseMusic,
  ttl: days(2),
  interval: hours(12),
  retry: minutes(10),
  getter: getSongList
})

app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.NetEaseMusic}`, async () => {
  return respond.json(await get163MusicCache())
})

// Threads profile
const getThreadsProfileCache = cacher.interval(cache, {
  key: TunnelModule.ThreadsProfile,
  ttl: days(7),
  interval: hours(12),
  retry: hours(1),
  getter: getThreadsProfile
})

app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsProfile}`, async () => {
  return respond.json(await getThreadsProfileCache())
})

// Threads medias
const threadsMediasCache = {
  firstPage: cacher.interval(cache, {
    key: 'threads_medias_page_first',
    ttl: hours(12),
    interval: minutes(20),
    retry: minutes(5),
    getter: getThreadsMedias
  }),
  paginate: (afterToken: string) => {
    return cacher.passive(cache, {
      key: `threads_medias_page_${afterToken}`,
      ttl: hours(12),
      getter: () => getThreadsMedias({ after: afterToken })
    })
  }
}

// Threads medias route
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMedias}`, async (context) => {
  const afterToken = context.query?.after
  if (afterToken && typeof afterToken !== 'string') {
    return respond.error('Invalid params!', BAD_REQUEST)
  }

  return respond.json(
    afterToken ? await threadsMediasCache.paginate(afterToken) : await threadsMediasCache.firstPage()
  )
})

// Threads media children
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMediaChildren}`, async (context) => {
  const mediaId = context.query?.id
  if (!mediaId || typeof mediaId !== 'string') {
    return respond.error('Invalid params!', BAD_REQUEST)
  }

  return respond.json(
    await cacher.passive(cache, {
      key: `threads_media_children_${mediaId}`,
      ttl: days(7),
      getter: () => getThreadsMediaChildren(mediaId)
    })
  )
})

// Threads media conversation
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMediaConversation}`, async (context) => {
  const mediaId = context.query?.id
  if (!mediaId || typeof mediaId !== 'string') {
    return respond.error('Invalid params!', BAD_REQUEST)
  }

  return respond.json(
    await cacher.passive(cache, {
      key: `threads_media_conversation_${mediaId}`,
      ttl: days(7),
      getter: () => getThreadsMediaConversation(mediaId)
    })
  )
})

// Instagram profile
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramProfile}`, async () => {
  return respond.json(
    await cacher.passive(cache, {
      key: TunnelModule.InstagramProfile,
      ttl: hours(12),
      getter: getInstagramProfile
    })
  )
})

// Instagram medias cache
const instagramMediasCache = {
  firstPage: cacher.interval(cache, {
    key: 'instagram_medias_page_first',
    ttl: hours(12),
    interval: hours(3),
    retry: minutes(10),
    getter: getInstagramMedias
  }),
  paginate: (afterToken: string) => {
    return cacher.passive(cache, {
      key: `instagram_medias_page_${afterToken}`,
      ttl: hours(12),
      getter: () => getInstagramMedias({ after: afterToken })
    })
  }
}

// Instagram medias route
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramMedias}`, async (context) => {
  const afterToken = context.query?.after
  if (afterToken && typeof afterToken !== 'string') {
    return respond.error('Invalid params!', BAD_REQUEST)
  }

  const result = afterToken
    ? await instagramMediasCache.paginate(afterToken)
    : await instagramMediasCache.firstPage()
  return respond.json(result)
})

// Instagram media children
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramMediaChildren}`, async (context) => {
  const mediaId = context.query?.id
  if (!mediaId || typeof mediaId !== 'string') {
    return respond.error('Invalid params!', BAD_REQUEST)
  }

  return respond.json(
    await cacher.passive(cache, {
      key: `instagram_media_children_${mediaId}`,
      ttl: days(7),
      getter: () => getInstagramMediaChildren(mediaId)
    })
  )
})

// Instagram calendar
const getInsCalendarCache = cacher.interval(cache, {
  key: TunnelModule.InstagramCalendar,
  ttl: hours(36),
  interval: hours(18),
  retry: minutes(2),
  getter: getInstagramCalendar
})

app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramCalendar}`, async () => {
  return respond.json(await getInsCalendarCache())
})

// YouTube playlists
const getYouTubePlaylistsCache = cacher.interval(cache, {
  key: TunnelModule.YouTubePlaylist,
  ttl: days(3),
  interval: hours(24),
  retry: minutes(10),
  getter: getYouTubeChannelPlayLists
})

app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.YouTubePlaylist}`, async () => {
  return respond.json(await getYouTubePlaylistsCache())
})

// YouTube videos
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.YouTubeVideoList}`, async (context) => {
  const playlistId = context.query?.id
  if (!playlistId || typeof playlistId !== 'string') {
    return respond.error('Invalid params!', BAD_REQUEST)
  }

  return respond.json(
    await cacher.passive(cache, {
      key: `youtube_playlist_${playlistId}`,
      ttl: hours(1),
      getter: () => getYouTubeVideoListByPlayerListId(playlistId)
    })
  )
})

// GitHub sponsors
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.GitHubSponsors}`, async () => {
  return respond.json(
    await cacher.passive(cache, {
      key: TunnelModule.GitHubSponsors,
      ttl: hours(4),
      getter: getGitHubSponsors
    })
  )
})

// GitHub contributions
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.GitHubContributions}`, async () => {
  return respond.json(
    await cacher.passive(cache, {
      key: TunnelModule.GitHubContributions,
      ttl: hours(4),
      getter: getGitHubContributions
    })
  )
})

// GitHub statistic
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.StatisticGitHubJson}`, async () => {
  return respond.json(
    await cacher.passive(cache, {
      key: TunnelModule.StatisticGitHubJson,
      ttl: hours(8),
      getter: getGitHubStatistic
    })
  )
})

// NPM statistic
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.StatisticNpmJson}`, async () => {
  return respond.json(
    await cacher.passive(cache, {
      key: TunnelModule.StatisticNpmJson,
      ttl: hours(8),
      getter: getNPMStatistic
    })
  )
})

// Douban movies
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.DoubanMovies}`, async () => {
  return respond.json(
    await cacher.passive(cache, {
      key: TunnelModule.DoubanMovies,
      ttl: days(3),
      getter: getDoubanMovies
    })
  )
})

// GoogleMaps - My Maps
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.MyGoogleMap}`, async () => {
  return respond.json(
    await cacher.passive(cache, {
      key: TunnelModule.MyGoogleMap,
      ttl: hours(6),
      getter: getMyGoogleMap
    })
  )
})

// Vue renderer
if (isNodeProd) {
  // MARK: If additional services like compression are needed,
  // they should be implemented upstream in the web server or added here as middleware.
  // ---
  // Serve static files from the public directory in production
  // https://github.com/lukeed/sirv/tree/main/packages/sirv
  const { default: sirv } = await import('sirv')
  app.useConnectMiddleware(sirv(PUBLIC_PATH, { etag: true }))
  // Render Vue app in production
  const { render } = await createProdRenderer(cache)
  app.useWildRequest((context) => render(context))
} else {
  const { render, viteServer } = await createDevRenderer(cache)
  // Use vite's connect instance as middleware
  app.useConnectMiddleware(viteServer.middlewares)
  app.useWildRequest((context) => render(context))
}

// Run server
app.listen(BFF_CONFIG.server_port, (addressInfo) => {
  logger.success(
    `${APP_META.title} app is running!`,
    `| env: ${NODE_ENV}`,
    `| port: ${addressInfo.port}`,
    `| address: ${addressInfo.address}`,
    `| ${new Date().toLocaleString()}`
  )
})
