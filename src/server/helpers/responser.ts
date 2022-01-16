/**
 * @file BFF Server responser
 * @module server.responser
 * @author Surmon <https://github.com/surmon-china>
 */

import { RequestHandler, Response } from 'express'
import { INVALID_ERROR } from '@/constants/error'

export const erroror = (response: Response, error: any) => {
  console.warn(`[BFF] error:`, error)
  response.status(INVALID_ERROR)
  response.send(error?.message || String(error))
}

export const responser = (promise: () => Promise<any>): RequestHandler => {
  return (_, response) => {
    promise()
      .then((data) => response.send(data))
      .catch((error) => erroror(response, error))
  }
}
