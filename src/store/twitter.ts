/**
 * @file Twitter state
 * @module store.twitter
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'

export const useTwitterStore = defineStore('twitter', {
  state: () => ({
    userinfo: {
      fetching: false,
      data: null as null | Record<string, any>
    },
    tweets: {
      fetching: false,
      data: null as null | {
        data: any[]
        includes: any[]
        meta: Record<string, any>
      }
    }
  }),
  actions: {
    fetchUserinfo() {
      this.userinfo.fetching = true
      return tunnel
        .dispatch(TunnelModule.TwitterUserInfo)
        .then((response) => {
          this.userinfo.data = response
        })
        .finally(() => {
          this.userinfo.fetching = false
        })
    },
    fetchTweets() {
      this.tweets.fetching = true
      return tunnel
        .dispatch(TunnelModule.TwitterTweets)
        .then((response) => {
          this.tweets.data = response
        })
        .finally(() => {
          this.tweets.fetching = false
        })
    }
  }
})
