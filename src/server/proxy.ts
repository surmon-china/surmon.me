/**
 * @file BFF Server proxy
 * @module server.proxy
 * @author Surmon <https://github.com/surmon-china>
 */

import httpProxy from 'http-proxy'
import { RequestHandler } from 'express'
import { ProxyModule } from '@/constants/proxy'
import { FORBIDDEN, BAD_REQUEST, INVALID_ERROR } from '@/constants/error'
import { BFF_PROXY_PREFIX, BFF_PROXY_ALLOWLIST } from '@/config/bff.config'
import { isNodeProd } from '@/server/environment'
import { META } from '@/config/app.config'

const proxyOriginMap = new Map([
  [ProxyModule.Default, META.url],
  [ProxyModule.Douban, 'https://www.douban.com'],
  [ProxyModule.Instagram, 'https://www.instagram.com'],
  [ProxyModule.YouTube, 'https://www.youtube.com'],
  [ProxyModule.NetEaseMusic, 'https://music.163.com'],
  [ProxyModule.Disqus, 'https://surmon.disqus.com']
])

export const PROXY_ROUTE_PATH = `${BFF_PROXY_PREFIX}/:module/*`

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

  proxy.on('proxyRes', (proxyResponse, request: any) => {
    const statusCode = proxyResponse.statusCode as number
    const location = proxyResponse.headers.location
    if ([301, 302, 307, 308].includes(statusCode) && location) {
      proxyResponse.headers.location = `${BFF_PROXY_PREFIX}/${request.params.module}/${encodeURIComponent(
        location
      )}`
    }
    // proxy cache
    if (statusCode === 200) {
      proxyResponse.headers['cache-control'] = `max-age=315360000`
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
    if (isNodeProd) {
      const referer = (request.headers.referrer as string) || request.headers.referer
      const origin = request.headers.origin
      const isAllowedReferer = !referer || BFF_PROXY_ALLOWLIST.some((i) => referer.startsWith(i))
      const isAllowedOrigin = !origin || BFF_PROXY_ALLOWLIST.some((i) => origin.startsWith(i))
      if (!isAllowedReferer || !isAllowedOrigin) {
        response.status(FORBIDDEN).send()
        return
      }
    }

    const targetURL = decodeURIComponent(request.params['0'])
    let parsedURL: URL | null = null
    try {
      parsedURL = new URL(targetURL)
    } catch (_) {
      response.status(BAD_REQUEST).send('Proxy error: invalid url')
      return
    }

    const headers: Record<string, string> = {}
    const origin = proxyOriginMap.get(request.params.module as ProxyModule)
    if (origin) {
      headers.Origin = origin
      headers.Referer = `${origin}/`
    }

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
