/**
 * @file Identity state
 * @module store.identity
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { shallowRef, reactive, computed, unref, watch } from 'vue'
import { Author } from '/@/interfaces/comment'
import { getJSON, setJSON, remove } from '/@/utils/storage'
import nodepress from '/@/services/nodepress'

export type UserLocalProfile = Author
export enum UserType {
  Null = 0,
  Local = 1,
  Disqus = 2
}

interface IdentityState {
  disqusConfig: any
  user: {
    type: UserType
    localProfile: UserLocalProfile | null
    disqusProfile: any | null
  }
  vote: {
    likedPages: number[]
    likedComments: number[]
    dislikedComments: number[]
  }
  feedbacks: any[]
}

const LOCAL_STORGAE_KEY = 'identity-state'

export const useIdentityStore = defineStore('identity', () => {
  // disqus config
  const disqusConfig = shallowRef<any>(null)
  // user
  const user = reactive({
    type: UserType.Null,
    localProfile: null as UserLocalProfile | null,
    disqusProfile: null as any | null
  })
  // vote history
  const vote = reactive({
    likedPages: [] as number[],
    likedComments: [] as number[],
    dislikedComments: [] as number[]
  })
  // feedback history
  const feedbacks = reactive<any[]>([])

  // getters
  const isLikedPage = computed(() => (id: number) => vote.likedPages.includes(id))
  const isLikedComment = computed(() => (id: number) => vote.likedComments.includes(id))
  const isDislikedComment = computed(() => (id: number) => vote.dislikedComments.includes(id))
  const author = computed<Author | null>(() => {
    if (user.type === UserType.Local) {
      return user.localProfile
    }
    if (user.type === UserType.Disqus) {
      return {
        name: user.disqusProfile?.name,
        site: user.disqusProfile?.url || user.disqusProfile?.profileUrl
      }
    }
    return null
  })

  const likeComment = (commentId: number) => {
    vote.likedComments.push(commentId)
  }

  const dislikeComment = (commentId: number) => {
    vote.dislikedComments.push(commentId)
  }

  const likePage = (id: number) => {
    vote.likedPages.push(id)
  }

  const addFeedback = (data) => {
    feedbacks.push(data)
  }

  const saveLocalUser = (profile: UserLocalProfile) => {
    user.localProfile = { ...profile }
    user.type = UserType.Local
  }

  const removeLocalUser = () => {
    user.type = UserType.Null
    user.localProfile = null
  }

  const fetchDisqusLogout = async () => {
    await nodepress.get('/disqus/oauth-logout')
    user.type = UserType.Null
    user.disqusProfile = null
  }

  const fetchDisqusUserInfo = async () => {
    const response = await nodepress.get<any>('/disqus/user-info')
    user.disqusProfile = response.result
    user.type = UserType.Disqus
  }

  const fetchDisqusConfig = async () => {
    const response = await nodepress.get<string>('/disqus/config')
    disqusConfig.value = response.result
  }

  const getStoreState = () => ({
    disqusConfig: unref(disqusConfig),
    user: user,
    vote: vote,
    feedbacks: feedbacks
  })

  const setStoreState = (state: IdentityState) => {
    disqusConfig.value = state.disqusConfig
    user.type = state.user.type
    user.localProfile = state.user.localProfile
    user.disqusProfile = state.user.disqusProfile
    vote.likedPages = state.vote.likedPages
    vote.likedComments = state.vote.likedComments
    vote.dislikedComments = state.vote.dislikedComments
    feedbacks.splice(0, feedbacks.length, ...state.feedbacks)
  }

  const resetStateFromStorage = () => {
    try {
      const localState = getJSON<IdentityState>(LOCAL_STORGAE_KEY)
      if (localState) {
        setStoreState(localState)
      }
    } catch (error) {
      remove(LOCAL_STORGAE_KEY)
    }
  }

  const initOnClient = () => {
    // 1. init disqus config
    fetchDisqusConfig()
    // 2. bind client storage
    // 2.1 init state from storage
    resetStateFromStorage()
    // 2.2 bind state to storage
    watch(
      () => getStoreState(),
      (state) => setJSON(LOCAL_STORGAE_KEY, state),
      { deep: true }
    )
    // 2.3 reset state when storage changed
    window.addEventListener('storage', (event) => {
      if (event.key === LOCAL_STORGAE_KEY) {
        resetStateFromStorage()
      }
    })
    // 3. init and reset disqus cache
    if (user.type === UserType.Disqus) {
      fetchDisqusUserInfo().catch(() => {
        user.disqusProfile = null
        user.type = UserType.Null
      })
    } else {
      user.disqusProfile = null
    }
  }

  return {
    disqusConfig,
    user,
    vote,
    feedbacks,
    author,
    isLikedPage,
    isLikedComment,
    isDislikedComment,
    likeComment,
    dislikeComment,
    likePage,
    addFeedback,
    saveLocalUser,
    removeLocalUser,
    fetchDisqusLogout,
    fetchDisqusUserInfo,
    fetchDisqusConfig,
    initOnClient
  }
})
