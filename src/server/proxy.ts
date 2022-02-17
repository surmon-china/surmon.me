/**
 * @file BFF Server proxy
 * @module server.proxy
 * @author Surmon <https://github.com/surmon-china>
 */

import { RequestHandler } from 'express'
import { createProxyServer } from 'http-proxy'
import { FORBIDDEN, BAD_REQUEST } from '@/constants/error'
import { ProxyModule } from '@/constants/proxy'
import { BFF_PROXY_PREFIX, BFF_PROXY_ALLOWLIST } from '@/config/bff.config'
import { isProd } from '@/environment'

interface ProxyConfigItem {
  module: ProxyModule
  origin?: string
  referer?: string
}

const proxys: ProxyConfigItem[] = [
  {
    module: ProxyModule.Default,
    origin: 'https://surmon.me',
    referer: 'https://surmon.me/'
  },
  {
    module: ProxyModule.Instagram,
    origin: 'https://www.instagram.com',
    referer: 'https://www.instagram.com/'
  },
  {
    module: ProxyModule.YouTube,
    origin: 'https://www.youtube.com',
    referer: 'https://www.youtube.com/'
  },
  {
    module: ProxyModule.NetEasyMusic,
    origin: 'https://music.163.com',
    referer: 'https://music.163.com/'
  },
  {
    module: ProxyModule.Disqus,
    referer: 'https://surmon.disqus.com/'
  }
]

export const PROXY_ROUTE_PATH = `${BFF_PROXY_PREFIX}/:module/*`

export const proxyer = (): RequestHandler => {
  // https://github.com/http-party/node-http-proxy
  const proxyMap = new Map(proxys.map(({ module, ...rest }) => [module, rest]))
  const proxy = createProxyServer({
    prependPath: true,
    ignorePath: true,
    toProxy: false,
    xfwd: true
  })

  // https://github.com/http-party/node-http-proxy/issues/813
  proxy.on('error', (error: any, _, response: any, target: any) => {
    console.warn(`[BFF] proxy error: ${error.message} > ${target?.href}`)
    if (!response.headersSent) {
      response.writeHead(500, { 'content-type': 'application/json' })
    }
    response.end(JSON.stringify({ error: 'proxy_error', reason: error.message }))
  })

  proxy.on('proxyReq', (proxyRequest) => {
    proxyRequest.setHeader(
      'User-Agent',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/'
    )
  })

  proxy.on('proxyRes', (proxyResponse, request: any) => {
    const statusCode = proxyResponse.statusCode as number
    const location = proxyResponse.headers.location
    if ([301, 302, 307, 308].includes(statusCode) && location) {
      proxyResponse.headers.location = `${BFF_PROXY_PREFIX}/${
        request.params.module
      }/${encodeURIComponent(location)}`
    }
    // proxy cache
    if (statusCode === 200) {
      proxyResponse.headers['cache-control'] = `max-age=315360000`
    }
  })

  return (request, response) => {
    if (isProd) {
      const referer = (request.headers.referrer as string) || request.headers.referer
      const origin = request.headers.origin
      const isAllowedReferer = !referer || BFF_PROXY_ALLOWLIST.some((i) => referer.startsWith(i))
      const isAllowedOrigin = !origin || BFF_PROXY_ALLOWLIST.some((i) => origin.startsWith(i))
      if (!isAllowedReferer || !isAllowedOrigin) {
        response.status(FORBIDDEN).send()
        return
      }
    }

    const config = proxyMap.get(request.params.module as ProxyModule)
    const targetURL = decodeURIComponent(request.params['0'])
    let parsedURL: URL | null = null
    try {
      parsedURL = new URL(targetURL)
    } catch (error) {
      response.status(BAD_REQUEST).send()
      return
    }

    const headers: any = {}
    if (config?.origin) {
      headers['Origin'] = config.origin
    }
    if (config?.referer) {
      headers['Referer'] = config.referer
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
