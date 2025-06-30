/**
 * @file Environment variables and runtime detection for the BFF server
 * @module config/bff-env
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'

// https://vite.dev/guide/env-and-mode.html#node-env-and-modes
export enum NodeEnvironment {
  Development = 'development',
  Production = 'production'
}

export const NODE_ENV = process.env.NODE_ENV as NodeEnvironment
export const isNodeDev = process.env.NODE_ENV === NodeEnvironment.Development
export const isNodeProd = process.env.NODE_ENV === NodeEnvironment.Production

export const ROOT_PATH = process.cwd()
export const DIST_PATH = path.join(ROOT_PATH, 'dist')
export const PROD_CLIENT_PATH = path.join(DIST_PATH, 'client')
export const PROD_SERVER_PATH = path.join(DIST_PATH, 'server')
export const PUBLIC_PATH = isNodeDev ? path.join(ROOT_PATH, 'public') : PROD_CLIENT_PATH
