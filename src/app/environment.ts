/**
 * @file app environment
 * @author Surmon <https://github.com/surmon-china>
 */

// app env
export const isSSR = !!import.meta.env.VITE_SSR
export const isSPA = !isSSR

// runtime env
export const isServer = typeof window === 'undefined'
export const isClient = !isServer
