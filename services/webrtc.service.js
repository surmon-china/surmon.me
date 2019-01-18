/**
 * @file WebRTC 服务 / Commonjs module
 * @module server/wertc
 * @author Surmon <https://github.com/surmon-china>
 * remote: https://github.com/andyet/signalmaster/blob/master/sockets.js
 */

const crypto = require('crypto')
const uuid = require('node-uuid')
const { argv } = require('yargs')

const config = {
  rooms: {
    maxClients: 30
  },
  stunservers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    { urls: 'stun:stun.ekiga.net' },
    { urls: 'stun:stun.ideasip.com' },
    { urls: 'stun:stun.rixtelecom.se' },
    { urls: 'stun:stun.schlund.de' },
    { urls: 'stun:stun.stunprotocol.org:3478' },
    { urls: 'stun:stun.voiparound.com' },
    { urls: 'stun:stun.voipbuster.com' },
    { urls: 'stun:stun.voipstunt.com' },
    { urls: 'stun:stun.voxgratia.org' }
  ],
  turnservers: [
    {
      urls: [argv.rtc_uri],
      secret: argv.rtc_key,
      expiry: 86400
    }
  ]
}

// 存储所有filter
const filters = {}
const beautys = {}

// 过滤回调函数
const safeCb = cb => (typeof cb === 'function') ? cb : (() => {})

// 服务
const webrtcService = io => {

  // webrtc
  io.on('connection', socket => {
    // console.log('webrtc socket 有人加入')

    socket.resources = {
      screen: false,
      video: true,
      audio: false
    }

    // 取消订阅
    const removeFeed = type => {
      Reflect.deleteProperty(filters, socket.id)
      if (socket.room) {
        io.sockets.in(socket.room).emit('remove', {
          id: socket.id,
          type: type
        })
        if (!type) {
          socket.leave(socket.room)
          socket.room = undefined
        }
      }
    }

    // 加入房间
    const join = (name, cb) => {
      // sanity check
      if (typeof name !== 'string') return
      // check if maximum number of sockets reached
      const romeCount = Object.keys(io.sockets.sockets)
      // console.log('有人加入房间', name, romeCount)
      if (config.rooms && config.rooms.maxClients > 0 && romeCount >= config.rooms.maxClients) {
          return safeCb(cb)('full')
      }
      removeFeed()
      safeCb(cb)(null, (name => {
        const adapter = io.nsps['/'].adapter
        const sockets = adapter.rooms[name] ? adapter.rooms[name].sockets : {}
        const result = {
          clients: {}
        }
        Object.keys(sockets).forEach(id => {
          result.clients[id] = adapter.nsp.connected[id].resources
        })
        return result
      })(name))
      socket.join(name)
      socket.room = name
    }

    // 监听用户滤镜改变
    socket.on('webrtc-set-filter', filterDetail => {
      filters[filterDetail.peerId] = filterDetail.filter
      socket.broadcast.emit('webrtc-set-filter', filterDetail)
    })

    // 监听用户美颜改变
    socket.on('webrtc-set-beauty', beautyDetail => {
      beautys[beautyDetail.peerId] = beautyDetail.beauty
      socket.broadcast.emit('webrtc-set-beauty', beautyDetail)
    })

    // pass a message to another id
    socket.on('message', details => {
      if (!details) return

      const otherClient = io.to(details.to)
      if (!otherClient) return

      details.from = socket.id
      otherClient.emit('message', details)
    })

    socket.on('shareScreen', () => {
      socket.resources.screen = true
    })

    socket.on('unshareScreen', type => {
      socket.resources.screen = false
      removeFeed('screen')
    })

    // 用户加入房间
    socket.on('join', (name, cb) => {
      // console.log('webrtc socket 有人加入房间', name)
      join(name, cb)
    })
    
    // we don't want to pass "leave" directly because the
    // event type string of "socket end" gets passed too.
    socket.on('disconnect', () => {
      // console.log('webrtc socket 有人失去连接')
      removeFeed()
    })
    
    socket.on('leave', () => {
      // console.log('webrtc socket 有人离开')
      removeFeed()
    })

    socket.on('create', (name, cb) => {
      // console.log('webrtc socket 有人创建房间', name)
      if (arguments.length == 2) {
        cb = (typeof cb == 'function') ? cb : function () {}
        name = name || uuid()
      } else {
        cb = name
        name = uuid()
      }
      // check if exists
      const room = io.nsps['/'].adapter.rooms[name]
      if (room && room.length) {
        safeCb(cb)('taken')
      } else {
        join(name)
        safeCb(cb)(null, name)
      }
    })

    // 当前所有滤镜
    socket.on('webrtc-filters', callback => {
      callback(filters)
    })
    
    // 当前所有美颜状态
    socket.on('webrtc-beautys', callback => {
      callback(beautys)
    })

    // 向新用户广播所有已有滤镜
    // socket.emit('webrtc-filters', filters)

    // 向新用户广播所有已有美颜
    // socket.emit('webrtc-beautys', beautys)

    /*
    // support for logging full webrtc traces to stdout
    // useful for large-scale error monitoring
    socket.on('trace', data => {
      console.log('trace', JSON.stringify(
        [data.type, data.session, data.prefix, data.peer, data.time, data.value]
      ))
    })
    */

    /*
    // 为 TURN 认证创建共享密钥
    // 该过程在 draft-uberti-behave-turn-rest 中描述
    const credentials = []
    // allow selectively vending turn credentials based on origin.
    const origin = socket.handshake.headers.origin
    if (!config.turnorigins || config.turnorigins.includes(origin)) {
      config.turnservers.forEach(server => {
        const hmac = crypto.createHmac('sha1', server.secret)
        // default to 86400 seconds timeout unless specified
        const username = Math.floor(new Date().getTime() / 1000) + (parseInt(server.expiry || 86400, 10)) + ""
        hmac.update(username)
        credentials.push({
          username: username,
          credential: hmac.digest('base64'),
          urls: server.urls || server.url
        })
      })
    }

    // tell socket about stun and turn servers and generate nonces
    // console.log('server send stuns', config.stunservers || [])
    socket.emit('stunservers', config.stunservers || [])
    
    console.log('server send turnservers', config.turnservers, credentials)
    socket.emit('turnservers', credentials)
    socket.emit('turnservers', config.turnservers)
    */
  })
}

module.exports = webrtcService
