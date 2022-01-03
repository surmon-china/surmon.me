/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */

export const BFF_TUNNEL_PREFIX = '/_tunnel'
export const BFF_PROXY_PREFIX = '/_proxy'
export const BFF_PROXY_ALLOWLIST = ['https://surmon.me', 'https://cdn.surmon.me']

export const getBFFServerPort = () => Number(process.env.PORT || 3000)
