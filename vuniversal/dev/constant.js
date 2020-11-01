const path = require('path')

exports.OUT_PATH = path.join(__dirname, '..', '..', '.vun')
exports.CLIENT_OUT_PATH = path.join(exports.OUT_PATH, 'client')
exports.SERVER_OUT_PATH = path.join(exports.OUT_PATH)

exports.MESSAGE_TYPE = Object.freeze({
  BUILD_DONE: 'BUILD_DONE',
  BUILD_ERROR: 'BUILD_ERROR',
  RE_BUILD: 'RE_BUILD',
})
