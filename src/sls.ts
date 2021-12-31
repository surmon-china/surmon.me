/**
 * @file Serverless server entry
 * @module Serverless
 * @author Surmon <https://github.com/surmon-china>
 */

import { getBFFServerPort } from '@/config/bff.config'
import { enableProdRuntime } from './server/runtime/prod'
import { createExpressApp } from './server'

const { app, server } = createExpressApp()

// TODO
enableProdRuntime(app)
server.listen(getBFFServerPort())

// MARK
export const initializer = (context, callback) => {
  console.log('serverless initializing')
  callback(null, '')
}

// MARK
export const handler = (request, response, context) => {
  console.log('hello world')
  response.send('hello world')
}
