/**
 * @file Lens state
 * @module store.lens
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'

export const useLensStore = defineStore('lens', {
  state: () => ({
    plogs: {
      fetching: false,
      data: [] as Array<any>
    },
    vlogs: {
      fetching: false,
      data: [] as Array<any>
    }
  }),
  actions: {
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
