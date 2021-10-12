/**
 * @file Environment
 * @author Surmon <https://github.com/surmon-china>
 */

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test'
}

// @ts-ignore
export const NODE_ENV = process.env.NODE_ENV as NodeEnv
// @ts-ignore
export const isDev = NODE_ENV === NodeEnv.Development
// @ts-ignore
export const isProd = NODE_ENV === NodeEnv.Production
export const isTest = NODE_ENV === NodeEnv.Test
