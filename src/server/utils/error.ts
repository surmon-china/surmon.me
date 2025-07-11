/**
 * @file BFF Server error helper
 * @module server/util/error
 * @author Surmon <https://github.com/surmon-china>
 */

import { isAxiosError } from 'axios'
import { AppErrorClass } from '@/app/error'

export const getErrorMessage = (error: unknown): string => {
  if (error == null) {
    return 'Unknown Error'
  }

  if (typeof error === 'string') {
    return error
  }

  if (isAxiosError(error)) {
    if (error.message) {
      return error.message
    }
    // @ts-ignore
    if (error.errors?.length) {
      // @ts-ignore
      return error.errors.map((e: any) => e.message).join(', ')
    }
    return error.cause?.message || 'Axios Error'
  }

  if (error instanceof Error || error instanceof AppErrorClass) {
    return error.message || error.name
  }

  if (typeof error === 'object') {
    return (error as any).message
  }

  return JSON.stringify(error)
}
