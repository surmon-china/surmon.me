
import { getJSON, setJSON } from '/@/services/storage'
import { OriginState } from '/@/constants/state'
import { USER, USER_LIKE_HISTORY } from '/@/constants/storage'

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

const getUserLikeHistory = () => getJSON(USER_LIKE_HISTORY)

export const getPagesLike = (): number[] => {
  return getUserLikeHistory()?.pages || []
}

export const getCommentsLike = (): number[] => {
  return getUserLikeHistory()?.comments || []
}

export const setPagesLike = (pages: number[] = []) => {
  const json = getUserLikeHistory() || {}
  json.pages = pages
  setJSON(USER_LIKE_HISTORY, json)
}

export const setCommentsLike = (comments: number[] = []) => {
  const json = getUserLikeHistory() || {}
  json.comments = comments
  setJSON(USER_LIKE_HISTORY, json)
}

export const isPageLiked = (postId: number) => {
  return getPagesLike().includes(postId)
}

export const isCommentLiked = (commentId: number) => {
  return getCommentsLike().includes(commentId)
}
