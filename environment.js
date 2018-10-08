/**
 * @file Environment / Commonjs module
 * @author Surmon <surmon@foxmail.com>
 */

const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  isProdMode
}
