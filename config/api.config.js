/**
 * @file Api config / Commonjs module
 * @module api.config
 * @author Surmon <https://github.com/surmon-china>
 */

const apiJson = require('./api.json')
const { NODE_ENV } = require('../environment')

module.exports = apiJson[NODE_ENV]
