/**
 * @file BFF Server tunnel
 * @module server/tunnel
 * @author Surmon <https://github.com/surmon-china>
 */

import LRU from 'lru-cache'
import express, { RequestHandler } from 'express'
import { INVALID_ERROR } from '/@/constants/error'
import { TunnelModule } from '/@/constants/tunnel'
import { getTunnelApiPath } from '/@/transforms/url'
import { bilibiliService } from './bilibili'
import { wallpaperService } from './wallpaper'
import { githubService } from './github'
import { musicService } from './music'

// cache
export const tunnelCache = new LRU<TunnelModule, any>({
  max: Infinity
})

// router
const handleTunnelService = (tunnelService: () => Promise<any>): RequestHandler => {
  return (_, response) => {
    tunnelService()
      .then((data) => response.send(data))
      .catch((error) => {
        response.status(INVALID_ERROR)
        response.send(error.message)
      })
  }
}

export const tunnelRouter = express.Router()
tunnelRouter.get(
  getTunnelApiPath(TunnelModule.Bilibili),
  handleTunnelService(bilibiliService)
)
tunnelRouter.get(
  getTunnelApiPath(TunnelModule.Wallpaper),
  handleTunnelService(wallpaperService)
)
tunnelRouter.get(
  getTunnelApiPath(TunnelModule.GitHub),
  handleTunnelService(githubService)
)
tunnelRouter.get(
  getTunnelApiPath(TunnelModule.Music),
  handleTunnelService(musicService)
)
