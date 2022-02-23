/**
 * @file Wallpaper state
 * @module store.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { TunnelModule } from '/@/constants/tunnel'
import { Language } from '/@/language'
import tunnel from '/@/services/tunnel'

export const WALLPAPER_API_PATH = '/wallpaper/list'

export const useWallpaperStore = defineStore('wallpaper', {
  state: () => ({
    fetching: false,
    wallpapers: null as any as {
      [lang in Language]: Array<any>
    }
  }),
  getters: {
    papers: (state) => {
      return (language: Language) => state.wallpapers?.[language]
    }
  },
  actions: {
    fetchPapers() {
      // return data when exists
      if (this.wallpapers) {
        return Promise.resolve()
      }

      this.fetching = true
      return tunnel
        .dispatch(TunnelModule.Wallpaper)
        .then((response) => {
          this.wallpapers = response
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
