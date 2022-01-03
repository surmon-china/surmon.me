/**
 * @file Lens state
 * @module store.lens
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { TunnelModule } from '/@/constants/tunnel'
import { ProxyModule } from '/@/constants/proxy'
import type { InstagramMediaItem } from '/@/server/getters/instagram'
import { getTargetProxyURL } from '/@/transforms/url'
import tunnel from '/@/services/tunnel'

// https://www.instagram.com/p/['IMAGE-CODE']/?__a=1
// https://www.surinderbhomra.com/Blog/2016/05/16/Resize-An-Instagram-Image-Using-A-Media-Query-Parameter
export const getInstagramImage = (media: InstagramMediaItem, size?: 't' | 'm' | 'l') => {
  if (size) {
    return getTargetProxyURL(`${media.permalink}/media/?size=${size}`, ProxyModule.Instagram)
  } else {
    return getTargetProxyURL(media.media_url, ProxyModule.Instagram)
  }
}

export const useLensStore = defineStore('lens', {
  state: () => ({
    plogs: {
      fetching: false,
      data: [] as Array<InstagramMediaItem>
    },
    vlogs: {
      fetching: false,
      data: [] as Array<any>
    }
  }),
  actions: {
    fetchPlogs() {
      if (this.plogs.data.length) {
        return Promise.resolve()
      }

      this.plogs.fetching = true
      return tunnel
        .dispatch(TunnelModule.Instagram)
        .then((response) => {
          this.plogs.data = response
        })
        .finally(() => {
          this.plogs.fetching = false
        })
    },
    fetchVlogs() {
      if (this.vlogs.data.length) {
        return Promise.resolve()
      }

      this.vlogs.fetching = true
      return tunnel
        .dispatch(TunnelModule.BiliBili)
        .then((response) => {
          this.vlogs.data = response
        })
        .finally(() => {
          this.vlogs.fetching = false
        })
    }
  }
})
