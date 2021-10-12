import fs from 'fs'
import path from 'path'
import express, { Express } from 'express'
import compression from 'compression'
import { ROOT_PATH } from '../helper'
import { isProd } from '/@/environment'

export const enableProdRuntime = async (app: Express) => {
  app.use(compression())

  const indexHTML = fs.readFileSync(
    path.resolve(ROOT_PATH, 'dist', 'client', 'index.html'),
    'utf-8'
  )
  const clientManifest = require(path.resolve(
    ROOT_PATH,
    'dist',
    'client',
    'ssr-manifest.json'
  ))

  app.use('*', async (request, response) => {
    try {
      const url = request.originalUrl
      const render = require('./dist/server/entry-server.js').render
      const [appHtml, preloadLinks] = await render(url, clientManifest)
      const html = indexHTML
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
      response.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.log(e.stack)
      response.status(500).end(e.stack)
    }
  })
}
