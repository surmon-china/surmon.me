/**
 * @file Identity state
 * @module store.identity
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { getJSON, setJSON, remove } from '/@/utils/storage'
import nodepress from '/@/services/nodepress'
import { Author } from './comment'

export type UserLocalProfile = Author
export enum UserType {
  Null = 0,
  Local = 1,
  Disqus = 2
}

const LOCAL_STORGAE_KEY = 'identity-state'

export const useIdentityStore = defineStore('identity', {
  state: () => ({
    // disqus config
    disqusConfig: null as any,
    // user
    user: {
      type: UserType.Null,
      localProfile: null as UserLocalProfile | null,
      disqusProfile: null as any | null
    },
    // vote history
    vote: {
      likedPages: [] as number[],
      likedComments: [] as number[],
      dislikedComments: [] as number[]
    },
    // feedback history
    feedbacks: [] as any[]
  }),
  getters: {
    isLikedPage: (state) => (id: number) => state.vote.likedPages.includes(id),
    isLikedComment: (state) => (id: number) => state.vote.likedComments.includes(id),
    isDislikedComment: (state) => (id: number) => state.vote.dislikedComments.includes(id),
    author: (state): Author | null => {
      if (state.user.type === UserType.Local) {
        return state.user.localProfile
      }
      if (state.user.type === UserType.Disqus) {
        return {
          name: state.user.disqusProfile?.name,
          site: state.user.disqusProfile?.url || state.user.disqusProfile?.profileUrl
        }
      }
      return null
    }
  },
  actions: {
    likeComment(commentID: number) {
      this.vote.likedComments.push(commentID)
    },
    dislikeComment(commentID: number) {
      this.vote.dislikedComments.push(commentID)
    },
    likePage(id: number) {
      this.vote.likedPages.push(id)
    },
    addFeedback(data) {
      this.feedbacks.push(data)
    },
    fromStorage() {
      try {
        this.$state = getJSON(LOCAL_STORGAE_KEY) || this.$state
      } catch (error) {
        remove(LOCAL_STORGAE_KEY)
      }
    },
    initOnClient() {
      // 1. bind client storage
      this.fromStorage()
      this.$subscribe(() => setJSON(LOCAL_STORGAE_KEY, this.$state))
      window.addEventListener('storage', (event) => {
        if (event.key === LOCAL_STORGAE_KEY) {
          this.fromStorage()
        }
      })
      // 2. init and reset user info
      if (this.$state.user.type === UserType.Disqus) {
        this.fetchDisqusUserInfo().catch(() => {
          this.user.disqusProfile = null
          this.user.type = UserType.Null
        })
      } else {
        this.user.disqusProfile = null
      }
      // 3. refetch disqus config
      this.fetchDisqusConfig()
    },
    saveLocalUser(user: UserLocalProfile) {
      this.user.localProfile = { ...user }
      this.user.type = UserType.Local
    },
    removeLocalUser() {
      this.user.localProfile = null
      this.user.type = UserType.Null
    },
    fetchDisqusLogout() {
      return nodepress.get('/disqus/oauth-logout').then(() => {
        this.user.disqusProfile = null
        this.user.type = UserType.Null
      })
    },
    fetchDisqusUserInfo() {
      return nodepress.get<any>('/disqus/user-info').then((response) => {
        this.user.disqusProfile = response.result
        this.user.type = UserType.Disqus
      })
    },
    fetchDisqusConfig() {
      return nodepress.get<string>('/disqus/config').then((response) => {
        this.disqusConfig = response.result
      })
    }
  }
})
