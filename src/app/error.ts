/**
 * @file App global error
 * @module app/error
 * @author Surmon <https://github.com/surmon-china>
 */

import { isAxiosError } from 'axios'

export interface AppError {
  code: number
  message: string
}

export class AppErrorClass extends Error implements AppError {
  code: number
  constructor(message: string, code: number) {
    super(message)
    this.name = 'AppError'
    this.code = code
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export const createAppError = (message: string, code: number) => {
  return new AppErrorClass(message, code)
}

export const formatErrorToAppError = (error: unknown, fallbackError: AppError): AppError => {
  // If the error is an Axios error, it extracts the response data and message.
  if (isAxiosError(error)) {
    return {
      code: error.status ?? fallbackError.code,
      message: error.response?.data?.message || error.message || fallbackError.message
    }
  }

  // If the error is an instance of AppErrorClass, it extracts the code and message from the error.
  if (error instanceof AppErrorClass) {
    return {
      code: error.code ?? fallbackError.code,
      message: error.message
    }
  }

  if (error instanceof Error) {
    return {
      code: (error as any).code ?? fallbackError.code,
      message: error.message
    }
  }

  // If the error is a string, it sets the message and uses a default code.
  if (typeof error === 'string') {
    return { ...fallbackError, message: error }
  }

  // If the error is an object, it extracts the code and message from the object, using a default code if not provided.
  if (typeof error === 'object') {
    return {
      code: (error as any).code ?? fallbackError.code,
      message: (error as any).message || fallbackError.message
    }
  }

  // If the error is of an unknown type, it returns a fallback error with the message stringified.
  return {
    code: fallbackError.code,
    message: JSON.stringify(error)
  }
}
