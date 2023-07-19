/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

import { ProxyModule } from '/@/constants/proxy'
import { getCDN_URL, getProxyURL } from '/@/transforms/url'
import { isDev } from '/@/environment'

export const getDefaultAvatar = () => {
  return getCDN_URL('/images/gravatar.png')
}

export const getGravatarByHash = (hash?: string | null) => {
  if (!hash) {
    return getDefaultAvatar()
  }

  const target = `https://www.gravatar.com/avatar/${hash}`
  return isDev ? target : getProxyURL(target, ProxyModule.Default)
}

export const getDisqusAvatarByUsername = (username: string) => {
  // https://disqus.com/api/docs/images/
  const target = `https://disqus.com/api/users/avatars/${username}.jpg`
  return getProxyURL(target, ProxyModule.Disqus)
}
