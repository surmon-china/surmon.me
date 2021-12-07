/**
 * @file App meta options state
 * @module store.meta
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'

export interface MerchItemConfig {
  name: string
  description: string
  detail: string
  src: string
  url: string
}

export interface AD_CONFIG {
  PC_CARROUSEL:
    | false
    | {
        disabled?: boolean
        index: number
        url: string
        src: string
        title: string
      }
  PC_NAV: Array<{
    disabled?: boolean
    icon: string
    color: string
    url: string
    text?: string
    i18n: {
      en: string
      zh: string
    }
  }>
  PC_ASIDE_SWIPER: Array<{
    disabled?: boolean
    url: string
    src: string
  }>
  PC_MERCH_PRODUCTS: Array<MerchItemConfig>
  PC_MERCH_BROKERS: Array<MerchItemConfig>
}

const defaultAdConfig: AD_CONFIG = {
  PC_CARROUSEL: false,
  PC_NAV: [],
  PC_ASIDE_SWIPER: [],
  PC_MERCH_PRODUCTS: [],
  PC_MERCH_BROKERS: []
}

export const useMetaStore = defineStore('meta', {
  state: () => ({
    adminInfo: {
      fetching: false,
      data: null as null | any
    },
    appOptions: {
      fetching: false,
      data: null as null | {
        [key: string]: any
        ad_config: string
      }
    }
  }),
  getters: {
    adConfig: (state) => {
      const optionAdConfig = state.appOptions.data?.ad_config
      const adConfig: AD_CONFIG = {
        ...defaultAdConfig,
        ...(optionAdConfig ? JSON.parse(optionAdConfig) : {})
      }
      // filter disabled ad itmes
      adConfig.PC_NAV = adConfig.PC_NAV.filter((ad) => !ad.disabled)
      adConfig.PC_ASIDE_SWIPER = adConfig.PC_ASIDE_SWIPER.filter((ad) => !ad.disabled)
      return adConfig
    }
  },
  actions: {
    fetchAdminInfo() {
      this.adminInfo.fetching = true
      return nodepress
        .get('/auth/admin')
        .then((response) => {
          this.adminInfo.data = response.result
        })
        .finally(() => {
          this.adminInfo.fetching = false
        })
    },

    fetchAppOptions(force = false) {
      if (!force && this.appOptions.data) {
        return Promise.resolve()
      }

      this.appOptions.fetching = true
      return nodepress
        .get('/option')
        .then((response) => {
          this.appOptions.data = response.result
        })
        .finally(() => {
          this.appOptions.fetching = false
        })
    },

    postSiteLike() {
      return nodepress.patch('/like/site').then((response) => {
        if (this.appOptions.data) {
          this.appOptions.data.meta.likes++
        }
      })
    }
  }
})
