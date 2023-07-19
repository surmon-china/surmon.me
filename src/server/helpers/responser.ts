/**
 * @file BFF Server responser
 * @module server.helper.responser
 * @author Surmon <https://github.com/surmon-china>
 */

import { isAxiosError } from 'axios'
import { RequestHandler, Response } from 'express'
import { INVALID_ERROR } from '@/constants/error'

export interface ErrorerOptions {
  message: unknown
  code?: number
}
export const errorer = (response: Response, { code, message }: ErrorerOptions) => {
  console.warn(`[BFF] error:`, isAxiosError(message) ? message.toJSON() : message)
  response.status(code ?? INVALID_ERROR)
  response.send(
    typeof message === 'string'
      ? message
      : message instanceof Error
      ? message.message || message.name
      : String(message)
  )
}

export const responser = (promise: () => Promise<any>): RequestHandler => {
  return (_, response) => {
    promise()
      .then((data) => response.send(data))
      .catch((error: unknown) => errorer(response, { message: error }))
  }
}
