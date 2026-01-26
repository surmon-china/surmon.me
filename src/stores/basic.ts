/**
 * @file App basic state
 * @module store/basic
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { AdminProfile, AppOptions, AppRemoteConfig } from '/@/interfaces/option'
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

export const useAppOptionsStore = defineStore('appOptions', () => {
  const fetchStore = createFetchStore<AppOptions | null>({
    shallow: false,
    data: null,
    async fetcher() {
      const response = await nodepress.get<AppOptions>('/options')
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
    postFeedback
  }
})
