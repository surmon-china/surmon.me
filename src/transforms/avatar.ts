/**
 * @file Avatar
 * @author Surmon <https://github.com/surmon-china>
 */

// https://disqus.com/api/docs/images/
export const getDisqusAvatarByUsername = (username: string) => {
  return `https://disqus.com/api/users/avatars/${username}.jpg`
}

export const getGravatarByHash = (hash: string) => {
  return `https://www.gravatar.com/avatar/${hash}`
}

// https://docs.gravatar.com/rest/hash/
export const getGravatarByEmail = async (email: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(email.trim().toLowerCase())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return getGravatarByHash(hash)
}
