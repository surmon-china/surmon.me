/**
 * @file BFF wallpaper getter
 * @module server.getter.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import WonderfulBingWallpaper, { WonderfulBingWallpaperOption } from 'wonderful-bing-wallpaper'

export interface IWallpaper {
  zh: any[]
  en: any[]
}

export const getWallpapers = async (params?: WonderfulBingWallpaperOption): Promise<any> => {
  try {
    const wbw = new WonderfulBingWallpaper()
    const wallpaperJSON = await wbw.getWallpapers({ ...params, size: 8 })
    return wbw.humanizeWallpapers(wallpaperJSON)
  } catch (error) {
    throw 'wallpaper parsing JSON failed: ' + String(error)
  }
}

// ZH cache
export const getZHWallpapers = () => {
  return getWallpapers({
    local: 'zh-CN',
    host: 'cn.bing.com',
    ensearch: 0
  })
}

// EN cache
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
