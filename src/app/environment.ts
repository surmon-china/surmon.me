/**
 * @file App environment
 * @module app.environment
 * @author Surmon <https://github.com/surmon-china>
 */

export enum EnvMode {
  Development = 'development',
  Production = 'production'
}

// defined in vite.config.ts
export const APP_VERSION = __APP_VERSION__

export const APP_ENV = import.meta.env.MODE as EnvMode
export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD

export const isServer = import.meta.env.SSR
export const isClient = !isServer
