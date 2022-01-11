/**
 * @file Lens state
 * @module store.lens
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { TunnelModule } from '/@/constants/tunnel'
import type { InstagramMediaItem } from '/@/server/getters/instagram'
import tunnel from '/@/services/tunnel'

export const useLensStore = defineStore('lens', {
  state: () => ({
    instagram: {
      fetching: false,
      data: [] as Array<InstagramMediaItem>
    },
    youtube: {
      fetching: false,
      data: [] as Array<any>
    },
    bilibili: {
      fetching: false,
      data: [] as Array<any>
    }
  }),
  actions: {
    fetchInstagramMedias() {
      if (this.instagram.data.length) {
        return Promise.resolve()
      }

      this.instagram.fetching = true
      return tunnel
        .dispatch(TunnelModule.Instagram)
        .then((response) => {
          this.instagram.data = response
        })
        .finally(() => {
          this.instagram.fetching = false
        })
    },
    fetchYouTubePlaylist() {
      if (this.youtube.data.length) {
        return Promise.resolve()
      }

      this.youtube.fetching = true
      return tunnel
        .dispatch(TunnelModule.YouTubePlaylist)
        .then((response) => {
          response.sort((a, b) => a.snippet.position - b.snippet.position)
          this.youtube.data = response
        })
        .finally(() => {
          this.youtube.fetching = false
        })
    },
    fetchYouTubeVideoList(playlistID: string) {
      return tunnel.dispatch(TunnelModule.YouTubeVideoList, { id: playlistID })
    },
    fetchBilibiliVideos() {
      if (this.bilibili.data.length) {
        return Promise.resolve()
      }

      this.bilibili.fetching = true
      return tunnel
        .dispatch(TunnelModule.BiliBili)
        .then((response) => {
          this.bilibili.data = response
        })
        .finally(() => {
          this.bilibili.fetching = false
        })
    }
  }
})
