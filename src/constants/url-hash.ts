/**
 * @file URL Hash constant
 * @module constant.url-hash
 * @author Surmon <https://github.com/surmon-china>
 */

export const COMMENTS_URL_HASH = 'comments'
export const COMMENT_ITEM_URL_HASH_PREFIX = 'comment-'

export const getCommentIdByUrlHash = (hash: string) => {
  return hash.replace(COMMENT_ITEM_URL_HASH_PREFIX, '')
}

export const getCommentUrlHashById = (commentId: string | number) => {
  return `${COMMENT_ITEM_URL_HASH_PREFIX}${commentId}`
}
