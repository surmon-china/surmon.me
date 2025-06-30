/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

export const DEFAULT_AVATAR = '/images/gravatar.png'

export const getGravatarByHash = (hash: string) => {
  return `https://www.gravatar.com/avatar/${hash}`
}

// https://disqus.com/api/docs/images/
export const getDisqusAvatarByUsername = (username: string) => {
  return `https://disqus.com/api/users/avatars/${username}.jpg`
}
