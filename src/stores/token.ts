/**
 * @file Token store
 * @module store/token
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { AuthTokenResult } from '/@/interfaces/auth'
import { LocalStorageKey } from '/@/constants/storage-key'
import localstorage from '/@/utils/storage'
import nodepress from '/@/services/nodepress'

const PROACTIVE_REFRESH_THRESHOLD_SECONDS = 10 * 60

interface TokenState {
  accessToken: string | null
  refreshToken: string | null
  expiresAt: number | null
}

export const useTokenStore = defineStore('token', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const expiresAt = ref<number | null>(null)

  const getCountdown = (): number => {
    if (!accessToken.value || !expiresAt.value) return 0
    const remaining = expiresAt.value - Math.floor(Date.now() / 1000)
    return remaining > 0 ? remaining : 0
  }

  const isValid = (): boolean => {
    return !!accessToken.value && getCountdown() > 0
  }

  const shouldProactiveRefresh = (): boolean => {
    return isValid() && getCountdown() < PROACTIVE_REFRESH_THRESHOLD_SECONDS
  }

  const setToken = (auth: AuthTokenResult) => {
    accessToken.value = auth.access_token
    refreshToken.value = auth.refresh_token ?? null
    expiresAt.value = Math.floor(Date.now() / 1000) + auth.expires_in
  }

  const clearToken = () => {
    accessToken.value = null
    refreshToken.value = null
    expiresAt.value = null
  }

  const refresh = async (): Promise<void> => {
    if (!refreshToken.value) throw new Error('Refresh token 不存在.')

    const response = await nodepress.post<AuthTokenResult>('/account/auth/refresh-token', {
      refresh_token: refreshToken.value
    })
    setToken(response.result)
  }

  const getState = (): TokenState => ({
    accessToken: accessToken.value,
    refreshToken: refreshToken.value,
    expiresAt: expiresAt.value
  })

  const setState = (state: TokenState | null) => {
    accessToken.value = state?.accessToken ?? null
    refreshToken.value = state?.refreshToken ?? null
    expiresAt.value = state?.expiresAt ?? null
  }

  const resetStateFromStorage = () => {
    try {
      setState(localstorage.getJSON<TokenState>(LocalStorageKey.TokenState))
    } catch {
      clearToken()
      localstorage.remove(LocalStorageKey.TokenState)
    }
  }

  const initOnClient = () => {
    // Load data form storage
    resetStateFromStorage()

    // Sync storage to store
    window.addEventListener('storage', ({ key }) => {
      if (key === LocalStorageKey.TokenState) {
        resetStateFromStorage()
      }
    })

    // Sync store to storage
    watch(
      () => getState(),
      (state) => localstorage.setJSON(LocalStorageKey.TokenState, state)
    )
  }

  return {
    accessToken,
    refreshToken,
    expiresAt,
    isValid,
    shouldProactiveRefresh,
    setToken,
    clearToken,
    refresh,
    initOnClient
  }
})
