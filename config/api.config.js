/**
 * @file Api config / Commonjs module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

const apiJson = require('./api.json')
const { NODE_ENV } = require('../environment')

const apis = apiJson[NODE_ENV]

module.exports = {
  cdnUrl: apis.cdnUrl,
  proxyUrl: apis.proxyUrl,
  baseUrl: apis.baseUrl,
  socketHost: apis.socketHost
}
