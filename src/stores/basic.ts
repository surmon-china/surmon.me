/**
 * @file App basic state
 * @module store.basic
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { CommentPostId } from '/@/constants/state'
import { UNDEFINED } from '/@/constants/value'
import { AdminInfo, AppOption, AppAdConfig } from '/@/interfaces/option'
import { useIdentityStore, UserType } from './identity'
import nodepress from '/@/services/nodepress'

export const useAdminInfoStore = defineStore('adminInfo', () => {
  return createFetchStore<AdminInfo | null>({
    data: null,
    async fetcher() {
      const response = await nodepress.get<AdminInfo>('/auth/admin')
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

  const adConfig = computed<AppAdConfig>(() => {
    const adConfig = fetchStore.data.value?.ad_config
    return {
      PC_CARROUSEL: UNDEFINED,
      PC_NAV: [],
      PC_ASIDE_SWIPER: [],
      ...(adConfig ? JSON.parse(adConfig) : {})
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
    adConfig,
    postSiteLike,
    postFeedback
  }
})
