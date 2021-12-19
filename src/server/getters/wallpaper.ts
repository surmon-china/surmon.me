/**
 * @file BFF wallpaper getter
 * @module server.getter.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import WonderfulBingWallpaper, { WonderfulBingWallpaperOption } from 'wonderful-bing-wallpaper'

export interface IWallpaper {
  zh: any
  en: any
}

const wbw = new WonderfulBingWallpaper()

// 获取今日壁纸
export const getWallpapers = async (params?: WonderfulBingWallpaperOption): Promise<any> => {
  const wallpaperJSON = await wbw.getWallpapers({ ...params, size: 8 })
  try {
    return wbw.humanizeWallpapers(wallpaperJSON)
  } catch (error) {
    throw 'wallpaper 控制器解析 JSON 失败' + error
  }
}

// 今日壁纸缓存（ZH）
export const getZHWallpapers = () => {
  return getWallpapers({
    local: 'zh-CN',
    host: 'cn.bing.com',
    ensearch: 0
  })
}

// 今日壁纸缓存（EN）
export const getENWallpapers = () => {
  return getWallpapers({
    local: 'en-US',
    host: 'bing.com',
    ensearch: 1
  })
}

export const getAllWallpapers = async (): Promise<IWallpaper> => {
  const [zh, en] = await Promise.all([getZHWallpapers(), getENWallpapers()])
  return { zh, en }
}
