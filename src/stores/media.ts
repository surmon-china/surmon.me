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
import type { InstagramMediaListResponse, InstagramProfile } from '/@/server/getters/instagram'
import type { TwitterAggregate } from '/@/server/getters/twitter'
import tunnel from '/@/services/tunnel'

// Douban movies
export const useDoubanMoviesStore = defineStore('doubanMovies', () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch(TunnelModule.DoubanMovies)
  })
})

// Instagram timeline
export const useInstagramTimelineStore = defineStore('instagramTimeline', () => {
  return createFetchStore<InstagramMediaListResponse | null>({
    data: null,
    fetcher: () => {
      const request = tunnel.dispatch<InstagramMediaListResponse>(TunnelModule.InstagramMedias)
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

// Twitter userinfo
export const useTwitterStore = defineStore('twitterAggregate', () => {
  return createFetchStore<TwitterAggregate | null>({
    data: null,
    fetcher: () => {
      return tunnel.dispatch<TwitterAggregate>(TunnelModule.TwitterAggregate)
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
