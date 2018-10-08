/**
 * @file Webpack CDN 解析器 / Commonjs module
 * @author Surmon <surmon@foxmail.com>
 */

const apiConfig = require('../api.config')
const { isProdMode } = require('../environment')

module.exports = source => {
  if (isProdMode) {
    source = source.replace(/src="\/images\//g, `src="${apiConfig.cdnUrl}/images/`)
    source = source.replace(/src="\/partials\//g, `src="${apiConfig.cdnUrl}/partials/`)
  }
  return source
}
