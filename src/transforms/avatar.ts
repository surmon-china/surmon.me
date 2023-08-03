/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

export const DEFAULT_AVATAR = '/images/gravatar.png'

export const getGravatarByHash = (hash: string) => {
  return `https://www.gravatar.com/avatar/${hash}`
}

export const getDisqusAvatarByUsername = (username: string) => {
  // https://disqus.com/api/docs/images/
  return `https://disqus.com/api/users/avatars/${username}.jpg`
}
