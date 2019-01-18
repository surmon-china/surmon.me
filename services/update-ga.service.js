/**
 * @file GA 更新器 / Commonjs module
 * @module expansions/analytics/update
 * @author Surmon <https://github.com/surmon-china>
 */

const fs = require('fs')
const path = require('path')
const axios = require('axios')

const UPDATE_TIME = {
  HOURS_1: 1000 * 60 * 60 * 1,
  HOURS_24: 1000 * 60 * 60 * 24
}

// 更新脚本
const updateGAScript = () => {
  (function doUpdate() {
    axios.get('http://www.google-analytics.com/analytics.js', { timeout: 6000 })
      .then(response => {
        if (response.status === 200) {
          fs.writeFileSync(path.resolve(__dirname, '..', 'static', 'scripts') + '/analytics.js', response.data)
          console.log('GA 脚本更新成功', new Date())
          setTimeout(doUpdate, UPDATE_TIME.HOURS_24)
        } else {
          console.warn('GA 脚本更新失败', new Date(), response.data)
          setTimeout(doUpdate, UPDATE_TIME.HOURS_1)
        }
      })
      .catch(error => {
        console.warn('GA 脚本更新网络连接失败', new Date(), error)
        setTimeout(doUpdate, UPDATE_TIME.HOURS_1)
      })
  }())
}

module.exports = updateGAScript
