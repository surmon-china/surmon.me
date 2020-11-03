
import { computed, ref } from 'vue'
import { isServer } from '/@/environment'
import { getAccesser } from '/@/services/storage'
import { OriginState } from '/@/constants/state'
import { USER_LIKE_HISTORY } from '/@/constants/storage'

export const isOriginalType = (originState: OriginState) => originState === OriginState.Original
export const isHybridType = (originState: OriginState) => originState === OriginState.Hybrid
export const isReprintType = (originState: OriginState) => originState === OriginState.Reprint

export const getExtendsValue = (target: any, key: string) => {
  if (!target?.extends?.length) {
    return null
  }
  const targetExtend = target.extends.find(t => t.name === key)
  return targetExtend ? targetExtend.value : null
}

const getUserLikeHistory = () => {
  const defaultState = {
    pages: [] as number [],
    comments: [] as number []
  }
  return isServer
    ? ref(defaultState)
    : getAccesser(USER_LIKE_HISTORY, defaultState)
}

export const usePageLike = (postId: number) => {
  const likeHistory = getUserLikeHistory()
  return {
    isLiked: computed(() => likeHistory.value.pages.includes(postId)),
    like: () => likeHistory.value.pages.push(postId)
  }
}

export const useCommentsLike = () => {
  const likeHistory = getUserLikeHistory()
  return {
    isLiked: (commentId: number) => likeHistory.value.comments.includes(commentId),
    like: (commentId: number) => likeHistory.value.comments.push(commentId)
  }
}
