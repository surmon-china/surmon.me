/**
 * @file comment helper
 * @author Surmon <https://github.com/surmon-china>
 */

import { useCdnDomain } from '/@/app/context'
import { getAssetURL } from '/@/transforms/url'
import { createLogger } from '/@/utils/logger'

export const logger = createLogger('APP:Comment')

export const EMOJIS = [
  ...['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡'],
  ...['😤', '😭', '😱', '😳', '😵', '🌚'],
  ...['🙏', '💪', '👌', '🤘', '👍', '👎', '👏'],
  ...['🌻', '🌹', '💊', '🐶', '🐈', '✨', '❤️‍🔥', '💔', '💩', '👻', '🚩']
]

export enum CommentEvents {
  Sort = 'sort',
  Page = 'page',
  Vote = 'vote',
  Blossom = 'blossom',
  Delete = 'delete',
  Reply = 'reply',
  CancelReply = 'cancelReply',
  Submit = 'submit'
}

export const getDisqusUserURL = (username: string) => {
  return `https://disqus.com/by/${username}/`
}

export const MIN_COMMENT_LENGTH = 3
export const MAX_COMMENT_LENGTH = 3000

const HAHA_KEYWORDS = ['2333', 'haha', '哈哈']
const SIX_KEYWORDS = ['666', '赞', '棒', '优秀']
const HEHE_KEYWORDS = ['呵呵']

export const luanchEmojiRain = (content: string) => {
  if (HAHA_KEYWORDS.find((keyword) => content.includes(keyword))) {
    window.$launchEmojiRain?.({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getAssetURL(useCdnDomain(), '/images/emojis/haha.png')
    })
  } else if (SIX_KEYWORDS.find((keyword) => content.includes(keyword))) {
    window.$launchEmojiRain?.({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getAssetURL(useCdnDomain(), '/images/emojis/666.png')
    })
  } else if (HEHE_KEYWORDS.find((keyword) => content.includes(keyword))) {
    window.$launchEmojiRain?.({
      staggered: false,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getAssetURL(useCdnDomain(), '/images/emojis/hehe.png')
    })
  } else if (Math.random() <= 0.5) {
    window.$launchEmojiRain?.({
      scale: 0.6,
      staggered: true,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getAssetURL(useCdnDomain(), '/images/emojis/doge.png')
    })
  }
}
