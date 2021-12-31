/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */

export const API_TUNNEL_PREFIX = '/_tunnel'
export const getBFFServerPort = () => Number(process.env.PORT || 3000)
