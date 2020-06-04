
import path from 'path'
import express, { Handler } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { AppCreater } from './creater'
import { isDev } from './env'
import { render } from './render'

export interface VuniversalMiddlewareOptions {
  appCreater: AppCreater
  // static?: string
  // redner?: boolean
}

export function vuniversal(options: VuniversalMiddlewareOptions): Handler {
  return (request, response) => {
    const renderer = () => {
      render({
        appCreater: options.appCreater,
        url: request.originalUrl,
      })
      .then(html => response.status(200).send(html))
      .catch(error => response.status(404).send(String(error)))
    }

    if (isDev) {
      const proxyer = () => {
        if (
          request.path.startsWith(`/${process.env.VUN_ASSETS_DIR}/`) ||
          request.path.includes('hot-update')
        ) {
          // TODO: 反代有问题，有时候会响应失败，测热更新就可以了
          createProxyMiddleware({
            target: process.env.VUN_DEV_SERVER_URL,
            changeOrigin: true
          })(request, response, renderer)
        } else {
          renderer()
        }
      }
      express.static(process.env.VUN_PUBLIC_DIR as string)(request, response, proxyer)
    } else {
      express.static(path.join(__dirname, '..', 'client'))(request, response, renderer)
    }
  }
}