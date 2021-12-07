/**
 * @file Dev environment
 * @module environment
 * @author Surmon <https://github.com/surmon-china>
 */

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test'
}

export const NODE_ENV = process.env.NODE_ENV as NodeEnv
export const isDev = process.env.NODE_ENV === NodeEnv.Development
export const isProd = process.env.NODE_ENV === NodeEnv.Production
export const isTest = process.env.NODE_ENV === NodeEnv.Test
