/**
 * @file App foundation store
 * @module store/foundation
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { AdminProfile, AppOptions, AppRemoteConfig } from '/@/interfaces/options'
import { useIdentityStore } from './identity'
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
  const identityStore = useIdentityStore()
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
      AD_PC_SIDEBAR_SWIPER: [],
      ...configJson
    }
  })

  const postFeedback = (feedback: { emotion: number; content: string }) => {
    return nodepress.post(
      '/feedback',
      {
        ...feedback,
        author_name: identityStore.profile?.name,
        author_email: identityStore.profile?.email
      },
      {
        token: identityStore.token
      }
    )
  }

  return {
    ...fetchStore,
    appConfig,
    postFeedback
  }
})
