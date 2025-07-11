/**
 * @file BFF Server main
 * @module server/main
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import cookie from 'cookie'
import type { AddressInfo } from 'net'
import type { Server, IncomingMessage, ServerResponse } from 'http'
import type { CacheStore } from '@/server/services/cache'
import { MIME_TYPES } from '@/constants/mime-type'
import * as HTTP_CODES from '@/constants/http-code'
import { type ProxifierOptions, createProxifier } from './proxifier'
import { type RequestResult, respondWith } from './responder'

export interface RequestContext {
  readonly url: string
  readonly path: string
  readonly query: Record<string, string>
  readonly cookies: Record<string, string | undefined>
  readonly headers: Record<string, string | undefined>
  request: IncomingMessage
  response: ServerResponse
}

export interface ServerAppCreatorOptions {
  cache: CacheStore
  poweredBy?: string
  proxy?: ProxifierOptions | false
  onError?: (error: unknown, request: IncomingMessage) => RequestResult
}

export type RequestHandler = (context: RequestContext) => RequestResult | Promise<RequestResult>

// https://github.com/senchalabs/connect
export type ConnectMiddleware = (
  request: IncomingMessage,
  response: ServerResponse,
  next?: () => void | Promise<void>
) => void

export const createBFFServerApp = (options: ServerAppCreatorOptions) => {
  const middlewares: ConnectMiddleware[] = []
  const pathRoutes = new Map<string, RequestHandler>()
  let wildRouteHandler: RequestHandler | null = null

  // Handle proxy requests
  const proxifier = options.proxy ? createProxifier(options.proxy) : null

  const server = http.createServer(async (request: IncomingMessage, response: ServerResponse) => {
    // Set default headers
    response.setHeader('X-Powered-By', options.poweredBy ?? 'Node')

    // Only handle GET methods
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return respondWith(response, {
        status: HTTP_CODES.METHOD_NOT_ALLOWED,
        body: 'Only GET and HEAD methods are allowed',
        contentType: MIME_TYPES.text
      })
    }

    // Ensure request URL is valid
    if (!request.url) {
      return respondWith(response, {
        status: HTTP_CODES.BAD_REQUEST,
        body: 'URL is required',
        contentType: MIME_TYPES.text
      })
    }

    try {
      // Resolve request context
      const { pathname, searchParams } = new URL(request.url, 'http://localhost')
      const context: RequestContext = {
        url: request.url,
        path: pathname,
        query: Object.fromEntries(searchParams.entries()),
        cookies: cookie.parse(request.headers.cookie || ''),
        headers: request.headers as Record<string, string | undefined>,
        request,
        response
      }

      // Middleware processing
      for (const middleware of middlewares) {
        await new Promise<void>((resolve, reject) => {
          try {
            middleware(request, response, (error?: any) => (error ? reject(error) : resolve()))
          } catch (err) {
            reject(err)
          }
        })
      }

      // Handle proxy requests
      if (options.proxy && proxifier) {
        if (context.path.startsWith(options.proxy.prefix)) {
          return await proxifier(context)
        }
      }

      // Handle registered route
      const handler = pathRoutes.get(context.path) ?? wildRouteHandler
      return handler
        ? respondWith(response, await handler(context))
        : respondWith(response, {
            status: HTTP_CODES.NOT_FOUND,
            body: 'Not Found',
            contentType: MIME_TYPES.text
          })
    } catch (error) {
      respondWith(
        response,
        options.onError?.(error, request) ?? {
          status: HTTP_CODES.INTERNAL_SERVER_ERROR,
          body: 'Internal Server Error',
          contentType: MIME_TYPES.text
        }
      )
    }
  })

  return {
    useConnectMiddleware: (middleware: ConnectMiddleware) => {
      middlewares.push(middleware)
    },
    usePathRequest: (path: string, handler: RequestHandler) => {
      pathRoutes.set(path, handler)
    },
    useWildRequest: (handler: RequestHandler) => {
      wildRouteHandler = handler
    },
    listen: (port: number, listeningListener: (info: AddressInfo) => void): Server => {
      return server.listen(port, () => listeningListener(server.address() as AddressInfo))
    }
  }
}
