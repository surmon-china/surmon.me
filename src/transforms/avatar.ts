/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

import { ProxyModule } from '/@/constants/proxy'
import { getTargetCDNURL, getTargetProxyURL } from '/@/transforms/url'
import { isSPA } from '/@/app/environment'
import { isDev } from '/@/environment'

export const getDefaultAvatar = () => {
  return getTargetCDNURL('/images/gravatar.png')
}

export const getGravatarByHash = (hash?: string | null) => {
  if (!hash) {
    return getDefaultAvatar()
  }

  const target = `https://www.gravatar.com/avatar/${hash}`
  return isDev ? target : getTargetProxyURL(target, ProxyModule.Default)
}

export const getDisqusAvatarByUsername = (username: string) => {
  // https://disqus.com/api/docs/images/
  const target = `https://disqus.com/api/users/avatars/${username}.jpg`
  return isSPA ? target : getTargetProxyURL(target, ProxyModule.Disqus)
}
