/**
 * @file Wallpaper state
 * @module store.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { Language } from '/@/language'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'

export type Wallpaper = Record<Language, Array<any>>

export const useWallpaperStore = defineStore('wallpaper', () => {
  const fetchStore = createFetchStore<Wallpaper | null>({
    fetcher: () => tunnel.dispatch<Wallpaper>(TunnelModule.BingWallpaper),
    once: true,
    data: null
  })

  const papers = computed(() => {
    return (language: Language) => fetchStore.data.value?.[language]
  })

  return { ...fetchStore, papers }
})
