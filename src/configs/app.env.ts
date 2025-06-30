/**
 * @file App environment
 * @module config/app-env
 * @author Surmon <https://github.com/surmon-china>
 */

// defined in vite.config.ts
export const APP_VERSION = __APP_VERSION__

// https://vite.dev/guide/env-and-mode.html
export const APP_MODE = import.meta.env.MODE

// process.env.NODE_ENV
export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD

// is SSR or not
export const isServer = import.meta.env.SSR
export const isClient = !isServer
