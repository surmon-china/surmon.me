/**
 * @file Api config / Commonjs module
 * @author Surmon <surmon@foxmail.com>
 */

const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  cdnUrl: isProdMode ? 'https://cdn.surmon.me' : '',
  baseUrl: isProdMode ? 'https://api.surmon.me' : 'http://localhost:8000',
  proxyUrl: isProdMode ? 'https://surmon.me/proxy/' : '/proxy/',
  socketHost: isProdMode ? 'https://surmon.me' : 'http://localhost:3000'
}
