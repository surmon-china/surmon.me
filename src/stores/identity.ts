/**
 * @file Identity store
 * @module store/identity
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { User, UserIdentityProvider } from '/@/interfaces/user'
import { LocalStorageKey } from '/@/constants/storage-key'
import { openOAuthPopup } from '/@/utils/oauth'
import { useTokenStore } from './token'
import localstorage from '/@/utils/storage'
import logger from '/@/utils/logger'
import nodepress from '/@/services/nodepress'

export interface IdentityProfile {
  name: string
  email: string
  website?: string
}

interface IdentityState {
  guestProfile: IdentityProfile | null
}

export const useIdentityStore = defineStore('identity', () => {
  const tokenStore = useTokenStore()

  const userProfile = ref<User | null>(null)
  const guestProfile = ref<IdentityProfile | null>(null)

  const isUser = computed(() => !!userProfile.value)
  const isGuest = computed(() => !isUser.value && !!guestProfile.value)
  const isAnonymous = computed(() => !isUser.value && !isGuest.value)

  const profile = computed<IdentityProfile | null>(() => {
    if (userProfile.value) {
      return {
        name: userProfile.value.name,
        email: userProfile.value.email as string,
        website: userProfile.value.website ?? undefined
      } satisfies IdentityProfile
    }
    return guestProfile.value
  })

  const setGuestProfile = (profile: IdentityProfile) => {
    guestProfile.value = { ...profile }
  }

  const clearGuestProfile = () => {
    guestProfile.value = null
  }

  const fetchUserProfile = async () => {
    try {
      const response = await nodepress.get<User>('/account/profile', { token: tokenStore.accessToken })
      userProfile.value = response.result
    } catch (error) {
      userProfile.value = null
      throw error
    }
  }

  const userLogout = async () => {
    try {
      await nodepress.post(
        '/account/auth/logout',
        { refresh_token: tokenStore.refreshToken },
        { token: tokenStore.accessToken }
      )
    } catch (error) {
      logger.warn('Logout request failed, clearing local state anyway.', error)
    } finally {
      userProfile.value = null
      tokenStore.clearToken()
      clearGuestProfile()
    }
  }

  const userLoginWith = (provider: UserIdentityProvider) => {
    openOAuthPopup({
      provider,
      nodepressApi: `/account/auth/${provider}/login`,
      onSuccess(message) {
        if (message.auth) {
          tokenStore.setToken(message.auth)
          clearGuestProfile()
          fetchUserProfile().catch((error) => {
            logger.warn('Fetch user profile failed after OAuth', error)
          })
        }
      }
    })
  }

  const getState = (): IdentityState => ({
    guestProfile: guestProfile.value
  })

  const setState = (state: IdentityState | null) => {
    guestProfile.value = state?.guestProfile ?? null
  }

  const resetStateFromStorage = () => {
    try {
      setState(localstorage.getJSON<IdentityState>(LocalStorageKey.IdentityState))
    } catch {
      setState(null)
      localstorage.remove(LocalStorageKey.IdentityState)
    }
  }

  const initOnClient = async () => {
    // Load data form storage
    resetStateFromStorage()

    // Sync storage to store
    window.addEventListener('storage', ({ key }) => {
      if (key === LocalStorageKey.IdentityState) {
        resetStateFromStorage()
      }
    })

    // Sync store to storage
    watch(
      () => getState(),
      (state) => localstorage.setJSON(LocalStorageKey.IdentityState, state),
      { deep: true }
    )

    // Authentication Initialization Pipeline
    // Token refresh is handled gracefully at two strategic points, eliminating
    // the need for a complex request-level 401 retry interceptor.
    // (Assumes a reasonably long access token TTL, e.g., 2-7 days)
    // 1. Boot-time Rescue: If the token is expired upon returning, it is refreshed immediately.
    // 2. Proactive Renewal: If the token is nearing expiration, a background refresh is triggered silently to extend the session seamlessly.
    try {
      // Step 1: Always ensure token validity first. Attempt to rescue an expired access token.
      if (!tokenStore.isValid() && tokenStore.refreshToken) {
        await tokenStore.refresh()
      }

      // Step 2: With a guaranteed token, fetch the user profile.
      // At this point, the state is definitively either "logged in" or "guest".
      if (tokenStore.isValid()) {
        await fetchUserProfile()
        // Step 3: Proactively refresh the token in the background (fire-and-forget) if it's approaching expiration.
        if (tokenStore.shouldProactiveRefresh()) {
          tokenStore.refresh().catch((error) => logger.warn('Proactive refresh failed.', error))
        }
      }
    } catch (error) {
      // Step 4: Graceful degradation.
      // If any part of the pipeline fails (e.g., refresh fails, or server rejects a "valid" token with 401),
      // we clear the invalid credentials and fall back to a clean state.
      logger.warn('Auth pipeline failed during boot. Clearing invalid tokens.', error)
      tokenStore.clearToken()
    }

    // Step 5: Cross-Tab Synchronization.
    // Listen for token changes triggered by login/logout activities in other browser windows.
    watch(
      () => tokenStore.accessToken,
      (token, prevToken) => {
        if (token && token !== prevToken && !userProfile.value) {
          fetchUserProfile().catch(() => {})
        } else if (!token) {
          userProfile.value = null
        }
      }
    )
  }

  return {
    profile,
    userProfile,
    guestProfile,
    isUser,
    isGuest,
    isAnonymous,
    setGuestProfile,
    clearGuestProfile,
    fetchUserProfile,
    userLoginWith,
    userLogout,
    initOnClient
  }
})
