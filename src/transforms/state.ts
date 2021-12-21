/**
 * @file App state transformer
 * @module transformer.state
 * @author Surmon <https://github.com/surmon-china>
 */

import { ref, onMounted, watchEffect } from 'vue'
import { getAccessor } from '/@/services/storage'
import { UNDEFINED, isNull, isUndefined } from '/@/constants/value'
import { OriginState, UniversalExtend } from '/@/constants/state'
import { USER_LIKE_HISTORY } from '/@/constants/storage'

export const isOriginalType = (originState?: OriginState) => {
  return isNull(originState) || isUndefined(null) || originState === OriginState.Original
}
export const isHybridType = (originState: OriginState) => originState === OriginState.Hybrid
export const isReprintType = (originState: OriginState) => originState === OriginState.Reprint

export const getExtendsObject = (
  _extends: UniversalExtend[] | void
): {
  [key: string]: string
} => {
  return _extends?.length ? _extends.reduce((v, c) => ({ ...v, [c.name]: c.value }), {}) : {}
}

export const getExtendValue = (_extends: UniversalExtend[], key: string) => {
  return _extends.length ? getExtendsObject(_extends)[key] : UNDEFINED
}

const defaultUserLikeHistory = {
  pages: [] as number[],
  comments: [] as number[]
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
