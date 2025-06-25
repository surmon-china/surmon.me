/**
 * @file BFF Server proxy
 * @module server.service.proxy
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import https from 'https'
import { pipeline } from 'stream/promises'
import type { RequestHandler, Request } from 'express'
import { base64UrlEncode, base64UrlDecode } from '@/transforms/base64'
import { FORBIDDEN, BAD_REQUEST, INVALID_ERROR, GATEWAY_TIMEOUT } from '@/constants/http-code'
import { BFF_PROXY_PREFIX, BFF_PROXY_ALLOWLIST_REGEXP, getStaticURL } from '@/config/bff.config'
import { META } from '@/config/app.config'
import { isNodeProd } from '@/server/environment'
import { createLogger } from '@/utils/logger'

export const logger = createLogger('BFF:Proxy')
export const PROXY_ROUTE_PATH = `${BFF_PROXY_PREFIX}/*url`

// Timeout (in milliseconds) when proxy receives no response from target.
const PROXY_REQUEST_TIMEOUT = 10_000
// Timeout (in milliseconds) when proxy receives no response from target.
const RESPONSE_TIMEOUT = 15_000
// User-Agent used by the proxy server.
const PROXY_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/'

const getProxyUrlFromRequest = (request: Request) => base64UrlDecode(String(request.params.url))
const makeRedirectLocation = (location: string) => `${BFF_PROXY_PREFIX}/${base64UrlEncode(location)}`

export const proxyer = (): RequestHandler => {
  return async (request, response) => {
    let targetURL: string | null = null
    let parsedURL: URL | null = null

    // Helper: unified error response
    const sendError = (message: string, statusCode = INVALID_ERROR) => {
      if (!response.headersSent) {
        response.writeHead(statusCode, { 'Content-Type': 'text/plain' })
      }
      response.end(`Proxy error: ${message}`)
    }

    // Step 1: Decode target URL
    try {
      targetURL = getProxyUrlFromRequest(request)
      response.setHeader('x-original-url', targetURL)
      parsedURL = new URL(targetURL)
    } catch (error: any) {
      sendError(error?.message || 'Invalid target URL', BAD_REQUEST)
      return
    }

    // Step 2: Block internal app requests
    if (parsedURL.hostname.endsWith(META.domain)) {
      const staticURL = new URL(getStaticURL())
      if (parsedURL.hostname !== staticURL.hostname) {
        sendError('Invalid internal URL', BAD_REQUEST)
        return
      }
    }

    // Step 3: Check referer/origin in prod
    if (isNodeProd) {
      const origin = request.headers.origin
      const referer = (request.headers.referrer as string) || request.headers.referer
      const isAllowedReferer = !referer || BFF_PROXY_ALLOWLIST_REGEXP.test(referer)
      const isAllowedOrigin = !origin || BFF_PROXY_ALLOWLIST_REGEXP.test(origin)
      if (!isAllowedReferer || !isAllowedOrigin) {
        sendError('Forbidden', FORBIDDEN)
        return
      }
    }

    // Step 4: Create proxy request to the target server
    const isHttps = parsedURL.protocol === 'https:'
    const requestLib = isHttps ? https : http
    const proxyRequest = requestLib.request(
      {
        protocol: parsedURL.protocol,
        hostname: parsedURL.hostname,
        path: parsedURL.pathname + (parsedURL.search || ''),
        port: parsedURL.port,
        method: request.method,
        headers: {
          ...request.headers,
          host: parsedURL.hostname,
          'user-agent': PROXY_UA
        }
      },
      async (proxyResponse) => {
        // If the target resource redirects, the proxy server still needs to encode the format of the redirection.
        const statusCode = proxyResponse.statusCode || INVALID_ERROR
        if ([301, 302, 307, 308].includes(statusCode)) {
          const location = proxyResponse.headers.location
          if (location) {
            proxyResponse.headers.location = makeRedirectLocation(location)
          }
        }

        // Set long cache-control if not provided
        if (statusCode === 200 && !proxyResponse.headers['cache-control']) {
          proxyResponse.headers['cache-control'] = 'public, max-age=31536000'
        }

        // Pipe response headers
        response.writeHead(proxyResponse.statusCode || INVALID_ERROR, proxyResponse.headers)

        try {
          // Use pipeline to handle response stream
          await pipeline(proxyResponse, response)
        } catch (error: any) {
          // Handle response stream errors
          logger.warn(`Response pipeline failed: ${error.message}`)
          sendError(error.message)
        }
      }
    )

    // Step 5: Handle request error
    proxyRequest.on('error', (error: any) => {
      logger.failure(`Request failed: ${error.message} > ${targetURL}`)
      sendError(error.message)
    })

    // Step 6: Timeout handling
    proxyRequest.setTimeout(PROXY_REQUEST_TIMEOUT, () => {
      logger.failure(`Proxy request timeout: ${parsedURL.href}`)
      proxyRequest.destroy()
      sendError('Proxy request timeout', GATEWAY_TIMEOUT)
    })

    response.setTimeout(RESPONSE_TIMEOUT, () => {
      if (!response.headersSent && !response.writableEnded) {
        logger.debug(`Response timeout`)
        sendError('Response timeout', GATEWAY_TIMEOUT)
      }
    })

    try {
      await pipeline(request, proxyRequest)
    } catch (error: any) {
      logger.warn(`Request pipeline failed: ${error.message}`)
      sendError(error.message)
    }
  }
}
