/**
 * @file Email URL
 * @module transform/email
 * @author Surmon <https://github.com/surmon-china>
 */

import { stringify } from './query-string'

export interface EmailLinkOptions {
  email: string
  subject?: string
  body?: string
}

export const getEmailLink = (email: string | EmailLinkOptions) => {
  if (typeof email === 'string') {
    return `mailto:${email}`
  }

  const { email: _email, ...content } = email
  return `mailto:${_email}?` + stringify(content)
}
