/**
 * @file History store
 * @module store/history
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { ref, reactive, computed, watch } from 'vue'
import { LocalStorageKey } from '/@/constants/storage-key'
import localstorage from '/@/utils/storage'

interface HistoryState {
  feedbacks: any[]
  likedArticles: number[]
  likedComments: number[]
  dislikedComments: number[]
}

export const useHistoryStore = defineStore('history', () => {
  const feedbacks = ref<any[]>([])
  const likedArticles = reactive(new Set<number>())
  const likedComments = reactive(new Set<number>())
  const dislikedComments = reactive(new Set<number>())

  const isLikedArticle = computed(() => (id: number) => likedArticles.has(id))
  const isLikedComment = computed(() => (id: number) => likedComments.has(id))
  const isDislikedComment = computed(() => (id: number) => dislikedComments.has(id))

  const likeArticle = (id: number) => {
    likedArticles.add(id)
  }

  const likeComment = (commentId: number) => {
    likedComments.add(commentId)
  }

  const dislikeComment = (commentId: number) => {
    dislikedComments.add(commentId)
  }

  const addFeedback = (data) => {
    feedbacks.value.push(data)
  }

  const getState = (): HistoryState => ({
    feedbacks: feedbacks.value,
    likedArticles: Array.from(likedArticles),
    likedComments: Array.from(likedComments),
    dislikedComments: Array.from(dislikedComments)
  })

  const setState = (state: HistoryState | null) => {
    feedbacks.value = state?.feedbacks || []

    likedArticles.clear()
    likedComments.clear()
    dislikedComments.clear()

    state?.likedArticles?.forEach((id) => likedArticles.add(id))
    state?.likedComments?.forEach((id) => likedComments.add(id))
    state?.dislikedComments?.forEach((id) => dislikedComments.add(id))
  }

  const resetStateFromStorage = () => {
    try {
      setState(localstorage.getJSON<HistoryState>(LocalStorageKey.HistoryState))
    } catch {
      setState(null)
      localstorage.remove(LocalStorageKey.HistoryState)
    }
  }

  const initOnClient = () => {
    // Load data form storage
    resetStateFromStorage()

    // Sync storage to store
    window.addEventListener('storage', ({ key }) => {
      if (key === LocalStorageKey.HistoryState) {
        resetStateFromStorage()
      }
    })

    // Sync store to storage
    watch(
      () => getState(),
      (state) => localstorage.setJSON(LocalStorageKey.HistoryState, state),
      { deep: true }
    )
  }

  return {
    feedbacks,
    isLikedArticle,
    isLikedComment,
    isDislikedComment,
    addFeedback,
    likeArticle,
    likeComment,
    dislikeComment,
    initOnClient
  }
})
