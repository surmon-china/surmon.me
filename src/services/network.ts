/**
 * @file Network / ES module
 * @module utils/network
 * @author Surmon <https://github.com/surmon-china>
 */

import http from './http'

export const ping = (url: string) => {
  return http.request({
    url,
    method: 'get',
    timeout: 1888
  })
}

export const isOutsideOfGFW = () => ping('https://www.google.com.hk')
