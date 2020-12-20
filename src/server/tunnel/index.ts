/**
 * @file BFF Server tunnel
 * @module server/tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

import LRU from 'lru-cache'
import Router from 'koa-router'
import { TunnelModule } from '/@/constants/tunnel'
import { getTunnelApiPath } from '/@/transforms/url'
import { bilibiliTunnel } from './bilibili'
import { wallpaperTunnel } from './wallpaper'
import { githubTunnel } from './github'
import { musicTunnel } from './music'

// cache
export const tunnelCache = new LRU<TunnelModule, any>({
  max: Infinity,
})

// router
export const tunnelRouter = new Router()
tunnelRouter.get(getTunnelApiPath(TunnelModule.Bilibili), bilibiliTunnel)
tunnelRouter.get(getTunnelApiPath(TunnelModule.Wallpaper), wallpaperTunnel)
tunnelRouter.get(getTunnelApiPath(TunnelModule.GitHub), githubTunnel)
tunnelRouter.get(getTunnelApiPath(TunnelModule.Music), musicTunnel)
