/**
 * @file BFF Server responder
 * @module server/util/responder
 * @author Surmon <https://github.com/surmon-china>
 */

import _isObject from 'lodash-es/isObject'
import { isAxiosError } from 'axios'
import type { RequestHandler, Response } from 'express'
import { INTERNAL_SERVER_ERROR } from '@/constants/http-code'
import { createLogger } from '@/utils/logger'

export const logger = createLogger('BFF')

export const getErrorMessage = (_error: unknown) => {
  const error = isAxiosError(_error) ? _error.toJSON() : _error
  return typeof error === 'string'
    ? error
    : error instanceof Error || _isObject(error)
      ? (error as any).message || (error as any)?.name
      : JSON.stringify(error)
}

export interface ErrorHandlerOptions {
  message: unknown
  code?: number
}

export const handleError = (response: Response, { code, message }: ErrorHandlerOptions) => {
  logger.failure(`Error:`, isAxiosError(message) ? message.toJSON() : message)
  response.status(code ?? INTERNAL_SERVER_ERROR)
  response.send(getErrorMessage(message))
}

export const responder = (promise: () => Promise<any>): RequestHandler => {
  return (_, response) => {
    promise()
      .then((data) => response.send(data))
      .catch((error: unknown) => handleError(response, { message: error }))
  }
}
