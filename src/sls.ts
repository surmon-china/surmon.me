/**
 * @file Serverless server entry
 * @module Serverless
 * @author Surmon <https://github.com/surmon-china>
 */

import { getBFFServerPort } from '@/config/bff.config'
import { enableProdRenderer } from './server/renderer/prod'
import { createExpressApp } from './server'

let slsServer: Awaited<ReturnType<typeof createExpressApp>> | null = null

export const initializer = async (context, callback) => {
  console.log('serverless initializing')
  slsServer = await createExpressApp()
  enableProdRenderer(slsServer.app, slsServer.cache)
  slsServer.server.listen(getBFFServerPort())
  callback(null, '')
}

// TODO: Serverless
export const handler = (request, response) => {
  // slsServer?.app
  // ...
  console.log('hello world')
  response.send('hello world')
}
