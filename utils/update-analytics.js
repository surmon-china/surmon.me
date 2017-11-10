/* 定时更新 GA 脚本 */

const fs = require('fs')
const path = require('path')
const axios = require('axios')

// 更新脚本
const updateGAScript = () => {
  const doUpdate = () => {
    axios.get('http://www.google-analytics.com/analytics.js', { timeout: 6000 }).then(res => {
      if (res.status === 200) {
        // 10小时更新
        fs.writeFileSync(path.join(__dirname, '..', 'static', 'scripts') + '/analytics.js', res.data)
        // console.log('GA 脚本更新成功', new Date())
        setTimeout(doUpdate, 1000 * 60 * 60 * 10)
      } else {
        console.log('GA 脚本更新失败', new Date(), res.data)
        setTimeout(doUpdate, 1000 * 60 * 60 * 1)
      }
      
    }).catch(error => {
      // 1小时更新
      console.log('GA 脚本更新网络连接失败', new Date(), error)
      setTimeout(doUpdate, 1000 * 60 * 60 * 1)
    })
  }
  doUpdate()
}

module.exports = updateGAScript
