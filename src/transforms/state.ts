/**
 * @file App state transformer
 * @module transformer/state
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, onMounted, watchEffect } from 'vue'
import { getAccessor } from '/@/services/storage'
import { OriginState } from '/@/constants/state'
import { USER_LIKE_HISTORY } from '/@/constants/storage'

export const isOriginalType = (originState?: OriginState) => originState == null || originState === OriginState.Original
export const isHybridType = (originState: OriginState) => originState === OriginState.Hybrid
export const isReprintType = (originState: OriginState) => originState === OriginState.Reprint

export const getExtendsValue = (target: any, key: string) => {
  if (!target?.extends?.length) {
    return null
  }
  const targetExtend = target.extends.find(t => t.name === key)
  return targetExtend ? targetExtend.value : null
}

const defaultUserLikeHistory = {
  pages: [] as number [],
  comments: [] as number []
}

const getUserLikeHistory = () => {
  return getAccessor(USER_LIKE_HISTORY, defaultUserLikeHistory)
}

export const usePageLike = (postId: number) => {
  const isLiked = ref(false)
  let likeHistory = null as any

  onMounted(() => {
    likeHistory = getUserLikeHistory()
    watchEffect(() => {
      isLiked.value = likeHistory.value.pages.includes(postId)
    })
  })

  return {
    isLiked,
    like: () => likeHistory.value.pages.push(postId)
  }
}

export const useCommentsLike = () => {
  const userLikeHistory = ref({ ...defaultUserLikeHistory })

  onMounted(() => {
    const liveHistory = getUserLikeHistory()
    watchEffect(() => {
      userLikeHistory.value = liveHistory.value
    })
  })

  return {
    isLiked: (commentId: number) => userLikeHistory.value.comments.includes(commentId),
    like: (commentId: number) => userLikeHistory.value.comments.push(commentId)
  }
}
