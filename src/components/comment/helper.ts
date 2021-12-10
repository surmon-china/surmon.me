/**
 * @file comment helper
 * @author Surmon <https://github.com/surmon-china>
 */

import { email as emailRegex } from '/@/constants/regex'
import { getGravatarByEmail } from '/@/transforms/thumbnail'
import { getFileCDNUrl } from '/@/transforms/url'

export const EMOJIS = [
  ...['😃', '😂', '😅', '😉', '😌', '😔', '😓', '😢', '😍', '😘', '😜', '😡'],
  ...['😤', '😭', '😱', '😳', '😵', '🌚'],
  ...['🙏', '👆', '👇', '👌', '🤘', '👍', '👎', '💪', '👏'],
  ...['🌻', '🌹', '💊', '🐶', '❤️', '💔', '💩', '👻'],
  ...['🇨🇳', '🇺🇸', '🇯🇵 ', '🚩']
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

export const humanizeGravatarUrlByEmail = (email: string) => {
  return emailRegex.test(email) ? getGravatarByEmail(email) : getFileCDNUrl('/images/gravatar.png')
}

export const luanchEmojiRain = (content: string) => {
  const luanchRain = (window as any).$luanchEmojiRain
  if (content.includes('2333') || content.includes('哈哈')) {
    luanchRain({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getFileCDNUrl('/images/emojis/haha.png')
    })
  } else if (content.includes('666') || content.includes('赞')) {
    luanchRain({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getFileCDNUrl('/images/emojis/666.png')
    })
  } else if (content.includes('呵呵')) {
    luanchRain({
      staggered: false,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getFileCDNUrl('/images/emojis/hehe.png')
    })
  } else if (Math.random() <= 0.6) {
    // 否则以 60% 的概率随机出现
    luanchRain({
      scale: 0.6,
      staggered: true,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getFileCDNUrl('/images/emojis/funny.png')
    })
  }
}
