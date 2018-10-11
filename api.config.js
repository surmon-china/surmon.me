/**
 * @file Api config / Commonjs module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

const { isProdMode } = require('./environment')

module.exports = {
  cdnUrl: isProdMode ? 'https://cdn.surmon.me' : '',
  baseUrl: isProdMode ? 'https://api.surmon.me' : 'http://localhost:8000',
  proxyUrl: isProdMode ? 'https://surmon.me/proxy/' : '/proxy/',
  socketHost: isProdMode ? 'https://surmon.me' : 'http://localhost:3000'
}
