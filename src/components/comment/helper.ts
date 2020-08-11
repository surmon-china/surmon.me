import { email as emailRegex } from '/@/constants/regex'
import { getGravatarByEmail } from '/@/transforms/thumbnail'
import { getFileCDNUrl } from '/@/transforms/url'
import { scrollTo } from '/@/utils/scroller'

export const EMOJIS = [
  '😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡', '😤', '😭', '😱',
  '😳', '😵', '🌚', '🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏', '🌻', '🌹', '💊',
  '🇨🇳', '🇺🇸', '🇯🇵 ', '🚩', '🐶', '❤️', '💔', '💩', '👻'
]

export enum CommentEvent {
  Reply = 'reply',
  Like = 'like',
  Sort = 'sort',
  Page = 'page',
  CancelReply = 'cancel-reply',
  SyncProfile = 'update:profile',
  SaveProfile = 'save-profile',
  EditProfile = 'edit-profile',
  ClearProfile = 'clear-profile',
  CancelProfile = 'cancel-profile',
  TogglePreview = 'toggle-preview',
  Submit = 'submit'
}

export enum ElementID {
  Warpper = 'comment-warpper',
  Publisher = 'comment-publisher',
}

export const getCommentElementId = (commentId: string | number): string => {
  return `comment-item-${commentId}`
}

export const humanizeGravatarUrl = (gravatar?: string | null) => {
  return gravatar || getFileCDNUrl('/images/comment/anonymous.jpg')
}

export const getGravatarUrlByEmail = (email: string) => {
  return emailRegex.test(email)
    ? getGravatarByEmail(email)
    : null
}

export const scrollToElementAnchor = (elementId: string, offset = 0) => {
  const targetElement = document.getElementById(elementId)
  if (targetElement) {
    scrollTo(targetElement, 200, { offset })
  }
}
