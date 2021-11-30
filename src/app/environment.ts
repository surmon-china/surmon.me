/**
 * @file App environment
 * @module app.environment
 * @author Surmon <https://github.com/surmon-china>
 */

// app env
export const isSSR = Boolean(import.meta.env.SSR)
export const isSPA = !isSSR

// runtime env
export const isServer = typeof window === 'undefined'
export const isClient = !isServer
