/**
 * @file App environment
 * @module app.environment
 * @author Surmon <https://github.com/surmon-china>
 */

export const isServer = import.meta.env.SSR
export const isClient = !isServer
