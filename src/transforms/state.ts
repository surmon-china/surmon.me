
import { computed } from 'vue'
import { getAccesser } from '/@/services/storage'
import { OriginState } from '/@/constants/state'
import { USER_LIKE_HISTORY } from '/@/constants/storage'

export const isOriginal = (originState: OriginState) => originState === OriginState.Original
export const isHybrid = (originState: OriginState) => originState === OriginState.Hybrid
export const isReprint = (originState: OriginState) => originState === OriginState.Reprint

export const getExtendsValue = (target: any, key: string) => {
  if (!target?.extends?.length) {
    return null
  }
  const targetExtend = target.extends.find(t => t.name === key)
  return targetExtend ? targetExtend.value : null
}

const getUserLikeHistory = () => getAccesser(
  USER_LIKE_HISTORY, {
    pages: [] as number [],
    comments: [] as number []
  }
)

export const getPagesLike = () => computed(() => getUserLikeHistory().value.pages)
export const getCommentsLike = () => computed(() => getUserLikeHistory().value.comments)
export const likePage = (postId: number) => getPagesLike().value.push(postId)
export const likeComment = (commentId: number) => getCommentsLike().value.push(commentId)

export const isPageLiked = (postId: number) => computed(() => {
  const pagesLike = getPagesLike()
  return pagesLike.value.includes(postId)
})

export const isCommentLiked = (commentId: number) => computed(() => {
  const commentsLike = getPagesLike()
  return commentsLike.value.includes(commentId)
})
