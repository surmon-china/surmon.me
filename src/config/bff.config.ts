/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */

export const API_TUNNEL_PREFIX = '/_tunnel'
export const DEFAULT_SERVER_PORT = 3000
export const getPort = () => Number(process.env.PORT || DEFAULT_SERVER_PORT)
