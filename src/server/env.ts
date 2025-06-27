/**
 * @file Environment variables and runtime detection for the BFF server
 * @module server/environment
 * @author Surmon <https://github.com/surmon-china>
 */

// https://vite.dev/guide/env-and-mode.html#node-env-and-modes
export enum NodeEnvironment {
  Development = 'development',
  Production = 'production'
}

export const NODE_ENV = process.env.NODE_ENV as NodeEnvironment
export const isNodeDev = process.env.NODE_ENV === NodeEnvironment.Development
export const isNodeProd = process.env.NODE_ENV === NodeEnvironment.Production
