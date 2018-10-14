/**
 * @file Api config / Commonjs module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

const { isProdMode } = require('./environment')

module.exports = {
  cdnUrl: isProdMode ? 'https://cdn.surmon.me' : '',
  proxyUrl: isProdMode ? 'https://surmon.me/proxy/' : '/proxy/',
  baseUrl: isProdMode ? 'https://api.surmon.me' : 'http://localhost:8000',
  socketHost: isProdMode ? 'https://surmon.me' : 'http://localhost:3000'
}
