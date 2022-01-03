/**
 * @file comment helper
 * @author Surmon <https://github.com/surmon-china>
 */

import { getTargetCDNURL } from '/@/transforms/url'

export const EMOJIS = [
  ...['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡'],
  ...['😤', '😭', '😱', '😳', '😵', '🌚'],
  ...['🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏'],
  ...['🌻', '🌹', '💊', '🐶', '❤️‍🔥', '💔', '💩', '👻', '🚩']
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

const HAHA_KEYWORDS = ['2333', 'haha', '哈哈']
const SIX_KEYWORDS = ['666', '赞', '棒', '优秀']
const HEHE_KEYWORDS = ['呵呵']

export const luanchEmojiRain = (content: string) => {
  const luanchRain = (window as any).$luanchEmojiRain
  if (HAHA_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getTargetCDNURL('/images/emojis/haha.png')
    })
  } else if (SIX_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getTargetCDNURL('/images/emojis/666.png')
    })
  } else if (HEHE_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      staggered: false,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getTargetCDNURL('/images/emojis/hehe.png')
    })
  } else if (Math.random() <= 0.5) {
    // 否则以 50% 的概率随机出现
    luanchRain({
      scale: 0.6,
      staggered: true,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getTargetCDNURL('/images/emojis/doge.png')
    })
  }
}
