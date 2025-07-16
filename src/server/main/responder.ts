/**
 * @file BFF Server responder
 * @module server/respond
 * @author Surmon <https://github.com/surmon-china>
 */

import _isNil from 'lodash-es/isNil'
import type { ServerResponse } from 'http'
import { APP_CONFIG } from '@/configs/app.config'
import { MIME_TYPES } from '@/constants/mime-type'
import { SUCCESS } from '@/constants/http-code'
import { getErrorMessage } from '../utils/error'

export interface RequestResult {
  status: number
  body: any
  contentType?: string
  headers?: Record<string, string>
}

export const respondWith = (response: ServerResponse, result: RequestResult) => {
  const headers = { 'Content-Type': result.contentType, ...result.headers }
  const body = _isNil(result.body)
    ? ''
    : Buffer.isBuffer(result.body)
      ? result.body
      : typeof result.body === 'object' && headers['Content-Type']?.includes(MIME_TYPES.json)
        ? JSON.stringify(result.body)
        : String(result.body)

  if (!response.headersSent) {
    response.writeHead(result.status, headers)
  }

  if (!response.writableEnded) {
    response.end(body)
  }
}

export const respond = {
  json: (body: any, status = SUCCESS): RequestResult => ({
    body,
    status,
    contentType: MIME_TYPES.json
  }),
  text: (body: string, status = SUCCESS): RequestResult => ({
    body,
    status,
    contentType: MIME_TYPES.text
  }),
  html: (body: string, status = SUCCESS): RequestResult => ({
    body,
    status,
    contentType: MIME_TYPES.html
  }),
  xml: (body: string, status = SUCCESS): RequestResult => ({
    body,
    status,
    contentType: MIME_TYPES.xml
  }),
  javascript: (body: string, status = SUCCESS): RequestResult => ({
    body,
    status,
    contentType: MIME_TYPES.javascript
  }),
  error: (error: unknown, status: number = APP_CONFIG.default_error_code): RequestResult => ({
    status,
    body: getErrorMessage(error),
    contentType: MIME_TYPES.text
  })
}
