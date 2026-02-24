/**
 * @file Identity store
 * @module store/identity
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { ref, shallowRef, computed, watch, nextTick } from 'vue'
import { getJSON, setJSON, remove } from '/@/utils/storage'
import { User, UserIdentityProvider } from '/@/interfaces/user'
import { openOAuthPopup } from '/@/utils/oauth'
import nodepress from '/@/services/nodepress'
import logger from '/@/utils/logger'

export interface IdentityProfile {
  name: string
  email: string
  website?: string
}

export interface IdentityState {
  token: string | null
  guestProfile: IdentityProfile | null
}

const LOCAL_STORGAE_KEY = 'identity-state'

export const useIdentityStore = defineStore('identity', () => {
  const token = shallowRef<string | null>(null)
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
    } else if (guestProfile.value) {
      return guestProfile.value
    } else {
      return null
    }
  })

  const setToken = (_token: string) => {
    token.value = _token
  }

  const saveGuestProfile = (profile: IdentityProfile) => {
    guestProfile.value = { ...profile }
  }

  const removeGuestProfile = () => {
    guestProfile.value = null
  }

  const fetchUserProfile = async () => {
    try {
      const response = await nodepress.get<any>('/account/profile', { token: token.value! })
      userProfile.value = response.result
    } catch (error) {
      userProfile.value = null
      token.value = null
      throw error
    }
  }

  const userLogout = async () => {
    await nodepress.post('/account/auth/logout', {}, { token: token.value! })
    userProfile.value = null
    token.value = null
    removeGuestProfile()
  }

  const userLoginWith = async (provider: UserIdentityProvider) => {
    openOAuthPopup({
      provider,
      nodepressApi: `/account/auth/${provider}/login`,
      async onSuccess(message) {
        if (message.token) {
          try {
            setToken(message.token)
            await fetchUserProfile()
            await nextTick()
            removeGuestProfile()
          } catch (error) {
            logger.warn('Fetch user profile failed after OAuth', error)
          }
        }
      }
    })
  }

  const getState = () => ({
    token: token.value,
    guestProfile: guestProfile.value
  })

  const resetStateFromStorage = () => {
    try {
      const localState = getJSON<IdentityState>(LOCAL_STORGAE_KEY)
      if (localState) {
        token.value = localState.token
        guestProfile.value = localState.guestProfile
      }
    } catch {
      remove(LOCAL_STORGAE_KEY)
    }
  }

  const initOnClient = () => {
    resetStateFromStorage()
    watch(
      () => getState(),
      (state) => setJSON(LOCAL_STORGAE_KEY, state),
      { deep: true }
    )
    window.addEventListener('storage', (event) => {
      if (event.key === LOCAL_STORGAE_KEY) {
        resetStateFromStorage()
      }
    })
    if (token.value) {
      fetchUserProfile().catch((error) => {
        logger.warn('Init fetch user profile failed.', error)
      })
    }
  }

  return {
    profile,
    userProfile,
    guestProfile,
    isUser,
    isGuest,
    isAnonymous,
    token,
    setToken,
    saveGuestProfile,
    removeGuestProfile,
    fetchUserProfile,
    userLoginWith,
    userLogout,
    initOnClient
  }
})
