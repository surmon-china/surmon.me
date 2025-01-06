import type { Request } from 'express'
import type { RequestContext } from '@/ssr'

export const createRequestContext = (request: Request): RequestContext => {
  return {
    headers: request.headers,
    cookies: request.cookies,
    url: request.originalUrl
  }
}
