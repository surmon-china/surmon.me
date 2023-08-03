/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

import { getProxyURL } from '/@/transforms/url'
import { isDev } from '/@/app/environment'

export const DEFAULT_AVATAR = '/images/gravatar.png'

export const getGravatarByHash = (hash: string) => {
  const target = `https://www.gravatar.com/avatar/${hash}`
  return isDev ? target : getProxyURL(target)
}

export const getDisqusAvatarByUsername = (username: string) => {
  // https://disqus.com/api/docs/images/
  const target = `https://disqus.com/api/users/avatars/${username}.jpg`
  return isDev ? target : getProxyURL(target)
}
