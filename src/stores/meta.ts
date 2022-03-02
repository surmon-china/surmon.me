/**
 * @file App meta options state
 * @module store.meta
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'
import { UniversalKeyValue } from '/@/constants/state'
import { useUniversalStore, UserType } from './universal'

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

export interface AdminInfo {
  name: string
  slogan: string
  avatar: string
}

export interface AppOption {
  title: string
  sub_title: string
  description: string
  keywords: Array<string>
  statement: string
  site_url: string
  site_email: string
  meta: {
    likes: number
  }
  friend_links: Array<UniversalKeyValue>
  ad_config: string
}

export const useMetaStore = defineStore('meta', {
  state: () => ({
    adminInfo: {
      fetching: false,
      data: null as null | AdminInfo
    },
    appOptions: {
      fetching: false,
      data: null as null | AppOption
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
        .get<AdminInfo>('/auth/admin')
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
        .get<AppOption>('/option')
        .then((response) => {
          this.appOptions.data = response.result
        })
        .finally(() => {
          this.appOptions.fetching = false
        })
    },

    postSiteLike() {
      const universalStore = useUniversalStore()
      return nodepress.post('/vote/site', { author: universalStore.author }).then((response) => {
        if (this.appOptions.data) {
          this.appOptions.data.meta.likes = response.result
        }
      })
    },

    postFeedback(feedback: { emotion: number; content: string }) {
      const universalStore = useUniversalStore()
      const authorName = universalStore.author?.name || null
      return nodepress.post('/feedback', {
        ...feedback,
        tid: 0,
        user_name: authorName ? `${authorName} (${UserType[universalStore.user.type]})` : null,
        user_email: universalStore.author?.email || null
      })
    }
  }
})
