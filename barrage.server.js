
const fs = require('fs')

// extend
const underscore = require('./utils/underscore-simple')

// init
const defaultBarrages = require('./data/barrages.default.json') || []
const barrages = require('./data/barrages.json') || []
if (!barrages.length) {
  barrages.push(...defaultBarrages)
}

// 更新本地文件数据
const updateLocalBarragesFile = () => {
  fs.writeFile('./data/barrages.json', JSON.stringify(barrages), err => {
    if (err) {
      console.log('最新弹幕记录保存失败', err)
    } else {
      // console.log('最新聊天记录保存成功!')
    }
  })
}

// 30秒为一个周期，保存一次最新弹幕记录
const updateDebounce = underscore.debounce(updateLocalBarragesFile, 1000 * 30)
let socketClients = 0

const parseBarrageServer = io => {

  // 弹幕
  io.on('connection', socket => {

    // 每次有新人加入，都更新客户端数量
    io.clients((error, clients) => {
      if (error) {
        console.log('客户端数获取失败', error)
      } else {
        socketClients = clients.length
      }
    })
    // 最后一批弹幕记录
    socket.on('barrage-last-list', callback => {
      callback(barrages.slice(-66))
    })
    // 弹幕总数量
    socket.on('barrage-count', callback => {
      callback({
        users: socketClients,
        count: barrages.length
      })
    })
    // 广播弹幕
    socket.on('barrage-send', barrage => {
      barrages.push(barrage)
      socket.broadcast.emit('barrage-create', barrage)
      socket.broadcast.emit('barrage-update-count', {
        users: socketClients,
        count: barrages.length
      })
      updateDebounce()
    })
  })
}

module.exports = parseBarrageServer
