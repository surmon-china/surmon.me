/**
 * @file Wallpaper state
 * @module store.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineFetchStore } from './_fetch'
import { Language } from '/@/language'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'

export type Wallpaper = Record<Language, Array<any>>

export const useWallpaperStore = defineFetchStore({
  id: 'wallpaper',
  initData: null as null | Wallpaper,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch<Wallpaper>(TunnelModule.BingWallpaper),
  getters: {
    papers: (state) => {
      return (language: Language) => state.data?.[language]
    }
  }
})
