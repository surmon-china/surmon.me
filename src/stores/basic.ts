/**
 * @file App basic state
 * @module store/basic
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { CommentPostId } from '/@/constants/biz-state'
import { AdminProfile, AppOption, AppRemoteConfig } from '/@/interfaces/option'
import { useIdentityStore, UserType } from './identity'
import nodepress from '/@/services/nodepress'

export const useAdminProfileStore = defineStore('adminProfile', () => {
  return createFetchStore<AdminProfile | null>({
    data: null,
    async fetcher() {
      const response = await nodepress.get<AdminProfile>('/admin/profile')
      return response.result
    }
  })
})

export const useAppOptionStore = defineStore('appOption', () => {
  const fetchStore = createFetchStore<AppOption | null>({
    shallow: false,
    data: null,
    async fetcher() {
      const response = await nodepress.get<AppOption>('/option')
      return response.result
    }
  })

  const appConfig = computed<AppRemoteConfig>(() => {
    const configString = fetchStore.data.value?.app_config
    const configJson = configString ? JSON.parse(configString) : {}
    return {
      AD_PC_CARROUSEL: undefined,
      AD_PC_NAV: [],
      AD_PC_ASIDE_SWIPER: [],
      ...configJson
    }
  })

  const postSiteLike = () => {
    const identityStore = useIdentityStore()
    return nodepress
      .post<number>('/vote/post', {
        vote: 1,
        post_id: CommentPostId.Guestbook,
        author: identityStore.author
      })
      .then((response) => {
        if (fetchStore.data.value) {
          fetchStore.data.value.meta.likes = response.result
        }
      })
  }

  const postFeedback = (feedback: { emotion: number; content: string }) => {
    const identityStore = useIdentityStore()
    const authorName = identityStore.author?.name || null
    return nodepress.post('/feedback', {
      ...feedback,
      tid: 0,
      user_name: authorName ? `${authorName} (${UserType[identityStore.user.type]})` : null,
      user_email: identityStore.author?.email || null
    })
  }

  return {
    ...fetchStore,
    appConfig,
    postSiteLike,
    postFeedback
  }
})
