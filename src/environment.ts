/**
 * @file Environment
 * @module environment
 * @author Surmon <https://github.com/surmon-china>
 */

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test'
}

// dev env
// @ts-ignore
export const NODE_ENV = process.env.NODE_ENV as NodeEnv || import.meta.env.MODE
// @ts-ignore
export const isDev = NODE_ENV === NodeEnv.Development || import.meta.env.DEV
// @ts-ignore
export const isProd = NODE_ENV === NodeEnv.Production || import.meta.env.PROD
export const isTest = NODE_ENV === NodeEnv.Test

// app env
// @ts-ignore
export const isSSR = !!import.meta.env.VITE_SSR
export const isSPA = !isSSR

// runtime env
export const isServer = typeof window === 'undefined'
export const isClient = !isServer
