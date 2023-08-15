/**
 * @file BFF Server proxy
 * @module server.proxy
 * @author Surmon <https://github.com/surmon-china>
 */

import httpProxy from 'http-proxy'
import { RequestHandler } from 'express'
import { FORBIDDEN, BAD_REQUEST, INVALID_ERROR } from '@/constants/http-code'
import { BFF_PROXY_PREFIX, BFF_PROXY_ALLOWLIST_REGEXP } from '@/config/bff.config'
import { isNodeProd } from '@/server/environment'

export const PROXY_ROUTE_PATH = `${BFF_PROXY_PREFIX}/*`

export const proxyer = (): RequestHandler => {
  // https://github.com/http-party/node-http-proxy
  const proxy = httpProxy.createProxyServer({
    proxyTimeout: 10 * 1000,
    timeout: 10 * 1000,
    prependPath: true,
    ignorePath: true,
    toProxy: false,
    xfwd: true
  })

  proxy.on('proxyReq', (proxyRequest, request: any) => {
    // https://github.com/http-party/node-http-proxy/issues/813#issuecomment-161266263
    request._proxyRequest = proxyRequest
    proxyRequest.setHeader(
      'User-Agent',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/'
    )
  })

  proxy.on('proxyRes', (proxyResponse) => {
    const statusCode = proxyResponse.statusCode as number
    const location = proxyResponse.headers.location
    // If the target resource redirects, the proxy server still needs to encode the format of the redirection
    if ([301, 302, 307, 308].includes(statusCode) && location) {
      proxyResponse.headers.location = `${BFF_PROXY_PREFIX}/${btoa(location)}`
    }
    if (statusCode === 200) {
      // If the target resource does not specify a Cache-Control, set it to a 1-year max-age
      if (!proxyResponse.headers['cache-control']) {
        proxyResponse.headers['cache-control'] = 'public, max-age=31536000'
      }
    }
  })

  proxy.on('error', (error: any, request: any, response: any, target: any) => {
    // https://github.com/http-party/node-http-proxy/issues/813
    // https://github.com/http-party/node-http-proxy/issues/813#issuecomment-161266263
    if (request.socket.destroyed && error.code === 'ECONNRESET') {
      request._proxyRequest?.abort?.()
    }
    console.warn(`[BFF] proxy error: ${error.message} > ${target?.href}`)
    response.writeHead(INVALID_ERROR, { 'Content-Type': 'text/plain' })
    response.end('Proxy error: ' + error.message)
  })

  return (request, response) => {
    const targetURL = atob(request.params['0'])
    response.setHeader('x-original-url', targetURL)

    let parsedURL: URL | null = null
    try {
      parsedURL = new URL(targetURL)
    } catch (_) {
      response.status(BAD_REQUEST).send('Proxy error: invalid url')
      return
    }

    if (isNodeProd) {
      const referer = (request.headers.referrer as string) || request.headers.referer
      const origin = request.headers.origin
      const isAllowedReferer = !referer || BFF_PROXY_ALLOWLIST_REGEXP.test(referer)
      const isAllowedOrigin = !origin || BFF_PROXY_ALLOWLIST_REGEXP.test(origin)
      if (!isAllowedReferer || !isAllowedOrigin) {
        response.status(FORBIDDEN).send('Proxy error: forbidden')
        return
      }
    }

    const headers: Record<string, string> = {}

    proxy.web(request, response, {
      target: targetURL,
      changeOrigin: true,
      followRedirects: false,
      autoRewrite: false,
      headers: {
        host: parsedURL.hostname,
        ...headers
      }
    })
  }
}
