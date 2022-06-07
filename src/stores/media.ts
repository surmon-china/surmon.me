/**
 * @file Media state
 * @module store.media
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
import { isClient } from '/@/app/environment'
import { delayPromise } from '/@/utils/delayer'
import type { InstagramMediaItem } from '/@/server/getters/instagram'
import tunnel from '/@/services/tunnel'

const LENS_PAGE_FETCH_DELAY = 480

// Douban movies
export const useDoubanMoviesStore = defineFetchStore({
  id: 'doubanMovies',
  initData: null,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch(TunnelModule.DoubanMovies)
})

// Instagram medias
export const useInstagramMediasStore = defineFetchStore({
  id: 'instagramMedias',
  initData: [] as Array<InstagramMediaItem>,
  fetcher() {
    const _fetch = tunnel.dispatch<Array<InstagramMediaItem>>(TunnelModule.InstagramMedias)
    return isClient ? delayPromise(LENS_PAGE_FETCH_DELAY, _fetch) : _fetch
  }
})

// YouTube playlist
export const useYouTubePlayListStore = defineFetchStore({
  id: 'youtubePlaylist',
  initData: [] as Array<any>,
  async fetcher() {
    const response = await tunnel.dispatch<Array<any>>(TunnelModule.YouTubePlaylist)
    response.sort((a, b) => a.snippet.position - b.snippet.position)
    return response
  }
})

// YouTube video list
export const fetchYouTubeVideoList = (playlistID: string) => {
  const fetch = tunnel.dispatch<Array<any>>(TunnelModule.YouTubeVideoList, { id: playlistID })
  return isClient ? delayPromise(LENS_PAGE_FETCH_DELAY, fetch) : fetch
}

// Twitter userinfo
export type TwitterUserinfo = Record<string, any>
export const useTwitterUserinfoStore = defineFetchStore({
  id: 'twitterUserinfo',
  initData: null as null | TwitterUserinfo,
  fetcher: () => tunnel.dispatch<TwitterUserinfo>(TunnelModule.TwitterUserInfo)
})

// Twitter tweets
export interface TweeterTweets {
  data: any[]
  includes: Record<string, Array<any>>
  meta: Record<string, any>
}
export const useTwitterTweetsStore = defineFetchStore({
  id: 'twitterTweets',
  initData: null as null | TweeterTweets,
  fetcher: () => tunnel.dispatch<TweeterTweets>(TunnelModule.TwitterTweets)
})

// My Google map
export const useMyGoogleMapStore = defineFetchStore({
  id: 'myGoogleMap',
  initData: null,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch(TunnelModule.MyGoogleMap)
})
