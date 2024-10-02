/**
 * @file Media state
 * @module store.media
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
import { isClient } from '/@/app/environment'
import { delayPromise } from '/@/utils/delayer'
import type { ThreadsProfile, ThreadsMediaListResponse } from '/@/server/getters/threads'
import type { InstagramProfile, InstagramMediaListResponse } from '/@/server/getters/instagram'
import tunnel from '/@/services/tunnel'

// Douban movies
export const useDoubanMoviesStore = defineStore('doubanMovies', () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch(TunnelModule.DoubanMovies)
  })
})

// Threads profile
export const useThreadsProfileStore = defineStore('threadsProfile', () => {
  return createFetchStore<ThreadsProfile | null>({
    data: null,
    fetcher: () => tunnel.dispatch<ThreadsProfile>(TunnelModule.ThreadsProfile)
  })
})

// Threads latest medias
export const useThreadsLatestMediasStore = defineStore('threadsLatestMedias', () => {
  return createFetchStore<ThreadsMediaListResponse | null>({
    data: null,
    fetcher: () => {
      const request = tunnel.dispatch<ThreadsMediaListResponse>(TunnelModule.ThreadsMedias)
      return isClient ? delayPromise(480, request) : request
    }
  })
})

// Instagram profile
export const useInstagramProfileStore = defineStore('instagramProfile', () => {
  return createFetchStore<InstagramProfile | null>({
    data: null,
    fetcher: () => tunnel.dispatch<InstagramProfile>(TunnelModule.InstagramProfile)
  })
})

// Instagram latest medias
export const useInstagramLatestMediasStore = defineStore('instagramLatestMedias', () => {
  return createFetchStore<InstagramMediaListResponse | null>({
    data: null,
    fetcher: () => {
      const request = tunnel.dispatch<InstagramMediaListResponse>(TunnelModule.InstagramMedias)
      return isClient ? delayPromise(480, request) : request
    }
  })
})

// YouTube playlist
export const useYouTubePlayListStore = defineStore('youtubePlaylist', () => {
  return createFetchStore<Array<any>>({
    data: [],
    async fetcher() {
      const response = await tunnel.dispatch<Array<any>>(TunnelModule.YouTubePlaylist)
      response.sort((a, b) => a.snippet.position - b.snippet.position)
      return response
    }
  })
})

// My Google map
export const useMyGoogleMapStore = defineStore('myGoogleMap', () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch(TunnelModule.MyGoogleMap)
  })
})
