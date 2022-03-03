/**
 * @file Email URL
 * @module transform.email
 * @author Surmon <https://github.com/surmon-china>
 */

import qs from 'qs'

export interface EmailLinkOptions {
  email: string
  subject?: string
  body?: string
}
export const emailLink = (email: string | EmailLinkOptions) => {
  if (typeof email === 'string') {
    return `mailto:${email}`
  }

  const { email: _email, ...content } = email
  return `mailto:${_email}?` + qs.stringify(content)
}
