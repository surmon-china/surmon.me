/**
 * @file App basic state
 * @module store.basic
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineFetchStore } from './_fetch'
import { defineStore } from 'pinia'
import { UniversalKeyValue, CommentPostID } from '/@/constants/state'
import { useIdentityStore, UserType } from './identity'
import nodepress from '/@/services/nodepress'

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
}

const defaultAdConfig: AD_CONFIG = {
  PC_CARROUSEL: false,
  PC_NAV: [],
  PC_ASIDE_SWIPER: []
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

export const useAdminInfoStore = defineFetchStore({
  id: 'adminInfo',
  initData: null as null | AdminInfo,
  fetcher: () => nodepress.get<AdminInfo>('/auth/admin').then((response) => response.result)
})

export const useAppOptionStore = defineStore({
  id: 'appOption',
  state: () => ({
    fetched: false,
    fetching: false,
    data: null as null | AppOption
  }),
  getters: {
    adConfig: (state) => {
      const optionAdConfig = state.data?.ad_config
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
    fetch(force = false) {
      if (!force && this.fetched) {
        return Promise.resolve()
      }

      this.fetching = true
      return nodepress
        .get<AppOption>('/option')
        .then((response) => {
          this.data = response.result
          this.fetched = true
        })
        .finally(() => {
          this.fetching = false
        })
    },

    postSiteLike() {
      const identityStore = useIdentityStore()
      return nodepress
        .post('/vote/post', {
          post_id: CommentPostID.Guestbook,
          vote: 1,
          author: identityStore.author
        })
        .then((response) => {
          if (this.data) {
            this.data.meta.likes = response.result
          }
        })
    },

    postFeedback(feedback: { emotion: number; content: string }) {
      const identityStore = useIdentityStore()
      const authorName = identityStore.author?.name || null
      return nodepress.post('/feedback', {
        ...feedback,
        tid: 0,
        user_name: authorName ? `${authorName} (${UserType[identityStore.user.type]})` : null,
        user_email: identityStore.author?.email || null
      })
    }
  }
})
