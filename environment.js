/**
 * @file Environment / Commonjs module
 * @module environment
 * @author Surmon <https://github.com/surmon-china>
 */

const environment = process.env
const isDevMode = Object.is(environment.NODE_ENV, 'development')
const isProdMode = Object.is(environment.NODE_ENV, 'production')

const isStatic = process && process.static
const isServer = process && process.server
const isBrowser = process && process.browser

module.exports = {
  isDevMode,
  isProdMode,
  environment,
  
  isStatic,
  isBrowser,
  isServer
}
