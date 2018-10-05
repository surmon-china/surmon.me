/**
 * @file GA 更新器 / Commonjs module
 * @author Surmon <surmon@foxmail.com>
 */

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const consola = require('consola')

const UPDATE_TIME = {
  HOURS_1: 1000 * 60 * 60 * 1,
  HOURS_24: 1000 * 60 * 60 * 24
}

// 更新脚本
const updateGAScript = () => {
  const doUpdate = () => {
    axios.get('http://www.google-analytics.com/analytics.js', { timeout: 6000 }).then(res => {
      if (res.status === 200) {

        // 成功，24小时更新一次
        fs.writeFileSync(path.join(__dirname, '..', 'static', 'scripts') + '/analytics.js', res.data)
        consola.info('GA 脚本更新成功', new Date())
        setTimeout(doUpdate, UPDATE_TIME.HOURS_24)
      } else {

        // 失败，1小时更新一次
        consola.info('GA 脚本更新失败', new Date(), res.data)
        setTimeout(doUpdate, UPDATE_TIME.HOURS_1)
      }
      
    }).catch(error => {
      // 1小时更新
      consola.info('GA 脚本更新网络连接失败', new Date(), error)
      setTimeout(doUpdate, UPDATE_TIME.HOURS_1)
    })
  }
  doUpdate()
}

module.exports = updateGAScript
