/**
 * @file History store
 * @module store/history
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { ref, reactive, computed, watch } from 'vue'
import { getJSON, setJSON, remove } from '/@/utils/storage'

interface HistoryState {
  feedbacks: any[]
  likedArticles: number[]
  likedComments: number[]
  dislikedComments: number[]
}

const LOCAL_STORAGE_KEY = 'history-state'

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

  const loadState = (): HistoryState | null => {
    const local = getJSON<HistoryState>(LOCAL_STORAGE_KEY)
    if (local) return local

    const legacy = getJSON<any>('identity-state')
    if (legacy) {
      return {
        feedbacks: legacy.feedbacks ?? [],
        likedArticles: legacy.vote?.likedArticles ?? [],
        likedComments: legacy.vote?.likedComments ?? [],
        dislikedComments: legacy.vote?.dislikedComments ?? []
      }
    }

    return null
  }

  const resetStateFromStorage = () => {
    try {
      const localState = loadState()
      if (!localState) return

      feedbacks.value = localState.feedbacks || []

      likedArticles.clear()
      likedComments.clear()
      dislikedComments.clear()

      localState.likedArticles?.forEach((id) => likedArticles.add(id))
      localState.likedComments?.forEach((id) => likedComments.add(id))
      localState.dislikedComments?.forEach((id) => dislikedComments.add(id))
    } catch {
      remove(LOCAL_STORAGE_KEY)
    }
  }

  const initOnClient = () => {
    resetStateFromStorage()
    watch(
      () => getState(),
      (state) => setJSON(LOCAL_STORAGE_KEY, state),
      { deep: true }
    )
    window.addEventListener('storage', (event) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        resetStateFromStorage()
      }
    })
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
