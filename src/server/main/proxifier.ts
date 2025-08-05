/**
 * @file BFF Server proxy
 * @module server/proxy
 * @author Surmon <https://github.com/surmon-china>
 */

import http from 'http'
import https from 'https'
import { pipeline } from 'stream/promises'
import { base64UrlEncode, base64UrlDecode } from '@/transforms/base64'
import { createLogger } from '@/utils/logger'
import { respondWith } from './responder'
import { MIME_TYPES } from '@/constants/mime-type'
import * as HTTP_CODES from '@/constants/http-code'
import type { RequestContext } from './index'

export const logger = createLogger('BFF:Proxy')

// Timeout (in milliseconds) when proxy receives no response from target.
const PROXY_REQUEST_TIMEOUT = 10_000
// Timeout (in milliseconds) when proxy receives no response from target.
const RESPONSE_TIMEOUT = 15_000
// User-Agent used by the proxy server.
const PROXY_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/'

export interface ProxifierOptions {
  prefix: string
  allowedSourceRegexp?: RegExp
  shouldBlockTargetUrl?: (url: URL) => boolean
}

export const createProxifier = (options: ProxifierOptions) => {
  const decodeProxyUrl = (url: string) => base64UrlDecode(url)
  const makeRedirectLocation = (location: string) => {
    const slash = options.prefix.endsWith('/')
    return `${options.prefix}${slash ? '' : '/'}${base64UrlEncode(location)}`
  }

  return async (context: RequestContext) => {
    const { request, response } = context
    let targetURL: string | null = null
    let parsedURL: URL | null = null

    // Step 1: Decode target URL
    try {
      targetURL = decodeProxyUrl(context.path.replace(options.prefix, ''))
      response.setHeader('x-original-url', targetURL)
      parsedURL = new URL(targetURL)
    } catch (error: any) {
      return respondWith(response, {
        status: HTTP_CODES.BAD_REQUEST,
        body: error?.message || 'Invalid target URL',
        contentType: MIME_TYPES.text
      })
    }

    const { protocol, hostname } = parsedURL

    if (protocol !== 'http:' && protocol !== 'https:') {
      return respondWith(response, {
        status: HTTP_CODES.BAD_REQUEST,
        body: 'Unsupported protocol',
        contentType: MIME_TYPES.text
      })
    }

    if (
      !hostname ||
      !hostname.includes('.') ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.lan') ||
      /^10\./.test(hostname) ||
      /^192\.168\./.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) // private IP range
    ) {
      return respondWith(response, {
        status: HTTP_CODES.BAD_REQUEST,
        body: 'Invalid or disallowed hostname',
        contentType: MIME_TYPES.text
      })
    }

    // Step 2: Block target url
    if (options.shouldBlockTargetUrl?.(parsedURL)) {
      return respondWith(response, {
        status: HTTP_CODES.FORBIDDEN,
        body: 'Forbidden target URL',
        contentType: MIME_TYPES.text
      })
    }

    // Step 3: Check referer/origin
    if (options.allowedSourceRegexp) {
      const origin = request.headers.origin
      const referer = request.headers.referer
      const isAllowedReferer = !referer || options.allowedSourceRegexp.test(referer)
      const isAllowedOrigin = !origin || options.allowedSourceRegexp.test(origin)
      if (!isAllowedReferer || !isAllowedOrigin) {
        return respondWith(response, {
          status: HTTP_CODES.FORBIDDEN,
          body: 'Forbidden source',
          contentType: MIME_TYPES.text
        })
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
        method: 'GET',
        headers: {
          ...request.headers,
          host: parsedURL.hostname,
          'user-agent': PROXY_UA
        }
      },
      async (proxyResponse) => {
        // If the target resource redirects, the proxy server still needs to encode the format of the redirection.
        const statusCode = proxyResponse.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR
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
        response.writeHead(proxyResponse.statusCode || HTTP_CODES.INTERNAL_SERVER_ERROR, proxyResponse.headers)

        try {
          // Use pipeline to handle response stream
          await pipeline(proxyResponse, response)
        } catch (error: any) {
          respondWith(response, {
            status: HTTP_CODES.INTERNAL_SERVER_ERROR,
            body: error.message,
            contentType: MIME_TYPES.text
          })
        }
      }
    )

    // Step 5: Handle request error
    proxyRequest.on('error', (error: any) => {
      logger.failure(`Request failed: ${error.message} > ${targetURL}`)
      respondWith(response, {
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        body: error.message,
        contentType: MIME_TYPES.text
      })
    })

    // Step 6: Timeout handling
    proxyRequest.setTimeout(PROXY_REQUEST_TIMEOUT, () => {
      logger.failure(`Proxy request timeout: ${parsedURL.href}`)
      proxyRequest.destroy()
      respondWith(response, {
        status: HTTP_CODES.GATEWAY_TIMEOUT,
        body: 'Proxy request timeout',
        contentType: MIME_TYPES.text
      })
    })

    response.setTimeout(RESPONSE_TIMEOUT, () => {
      if (!response.headersSent && !response.writableEnded) {
        logger.debug(`Response timeout`)
        respondWith(response, {
          status: HTTP_CODES.GATEWAY_TIMEOUT,
          body: 'Response timeout',
          contentType: MIME_TYPES.text
        })
      }
    })

    try {
      await pipeline(request, proxyRequest)
    } catch (error: any) {
      respondWith(response, {
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        body: error.message,
        contentType: MIME_TYPES.text
      })
    }
  }
}
