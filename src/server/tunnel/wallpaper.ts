/**
 * @file BFF Server wallpaper
 * @module server.tunnel.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import schedule from 'node-schedule'
import WonderfulBingWallpaper, { WonderfulBingWallpaperOption } from 'wonderful-bing-wallpaper'
import { TunnelModule } from '@/constants/tunnel'
import { tunnelCache } from '.'

export interface IWallpaper {
  zh: any
  en: any
}

const wbw = new WonderfulBingWallpaper()

// 获取今日壁纸
const fetchWallpapers = async (params?: WonderfulBingWallpaperOption): Promise<any> => {
  const wallpaperJSON = await wbw.getWallpapers({ ...params, size: 8 })
  try {
    return wbw.humanizeWallpapers(wallpaperJSON)
  } catch (error) {
    throw 'wallpaper 控制器解析 JSON 失败' + error
  }
}

// 今日壁纸缓存（ZH）
const fetchZHWallpapers = () =>
  fetchWallpapers({
    local: 'zh-CN',
    host: 'cn.bing.com',
    ensearch: 0
  })

// 今日壁纸缓存（EN）
const getENWallpapers = () =>
  fetchWallpapers({
    local: 'en-US',
    host: 'bing.com',
    ensearch: 1
  })

const fetchAllWallpapers = async (): Promise<IWallpaper> => {
  const [zh, en] = await Promise.all([fetchZHWallpapers(), getENWallpapers()])
  return { zh, en }
}

const autoUpdateData = () => {
  fetchAllWallpapers()
    .then((data) => {
      // 成功后，仅 set cache
      tunnelCache.set(TunnelModule.Wallpaper, data)
    })
    .catch((error) => {
      // 失败后 10 分钟更新一次数据
      console.warn('[Tunnel Wallpaper]', '请求失败', error)
      setTimeout(autoUpdateData, 1000 * 60 * 10)
    })
}

// 初始化默认拉取数据
autoUpdateData()
// 周期时间定为每天的 0:00:10 重新获取数据
schedule.scheduleJob('10 0 0 * * *', autoUpdateData)

export const wallpaperService = async (): Promise<any> => {
  if (tunnelCache.has(TunnelModule.Wallpaper)) {
    return tunnelCache.get(TunnelModule.Wallpaper)
  } else {
    const data = await fetchAllWallpapers()
    tunnelCache.set(TunnelModule.Wallpaper, data)
    return data
  }
}
