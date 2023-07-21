/**
 * @file BFF server environment
 * @module environment
 * @author Surmon <https://github.com/surmon-china>
 */

export enum NodeEnv {
  Development = 'development',
  Production = 'production'
}

export const NODE_ENV = process.env.NODE_ENV as NodeEnv
export const isNodeDev = process.env.NODE_ENV === NodeEnv.Development
export const isNodeProd = process.env.NODE_ENV === NodeEnv.Production
