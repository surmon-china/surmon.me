/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

import { isDev } from '/@/environment'
import { getFileCDNUrl } from '/@/transforms/url'
import API_CONFIG from '/@/config/api.config'

export const getDefaultAvatar = () => {
  return getFileCDNUrl('/images/gravatar.png')
}

export const getGravatarByHash = (hash?: string | null) => {
  if (!hash) {
    return getDefaultAvatar()
  }
  // https://en.gravatar.com/site/implement/images/
  if (isDev) {
    return `https://www.gravatar.com/avatar/${hash}`
  }
  return `${API_CONFIG.GRAVATAR}/${hash}`
}

export const getDisqusAvatarByUsername = (username: string) => {
  // https://disqus.com/api/docs/images/
  return `https://disqus.com/api/users/avatars/${username}.jpg`
}
