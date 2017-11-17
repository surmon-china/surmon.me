/*
 *
 * remote: https://github.com/andyet/signalmaster/blob/master/sockets.js
 *
*/

const crypto = require('crypto')
const uuid = require('node-uuid')
const argv = require('yargs').argv
const apiConfig = require('./api.config')

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

// 过滤回调函数
function safeCb(cb) {
  if (typeof cb === 'function') {
    return cb
  } else {
    return function () {}
  }
}

// 存储所有filter
let filters = {}
let beautys = {}

const parseWebrtcServer = io => {

  // webrtc
  io.sockets.on('connection', client => {

    client.resources = {
      screen: false,
      video: true,
      audio: false
    }

    // 取消订阅
    function removeFeed(type) {
      delete filters[client.id]
      if (client.room) {
        io.sockets.in(client.room).emit('remove', {
          id: client.id,
          type: type
        })
        if (!type) {
          client.leave(client.room)
          client.room = undefined
        }
      }
    }

    // 加入房间
    function join(name, cb) {
      // sanity check
      if (typeof name !== 'string') return
      // check if maximum number of clients reached
      const romeCount = Object.keys(io.sockets.sockets)
      if (config.rooms && config.rooms.maxClients > 0 && romeCount >= config.rooms.maxClients) {
          return safeCb(cb)('full')
      }
      removeFeed()
      safeCb(cb)(null, (name => {
        const adapter = io.nsps['/'].adapter
        const clients = adapter.rooms[name] ? adapter.rooms[name].sockets : {}
        const result = {
          clients: {}
        }
        Object.keys(clients).forEach(id => {
          result.clients[id] = adapter.nsp.connected[id].resources
        })
        return result
      })(name))
      client.join(name)
      client.room = name
    }

    // 监听用户滤镜改变
    client.on('webrtc-set-filter', filterDetail => {
      filters[filterDetail.peerId] = filterDetail.filter
      client.broadcast.emit('webrtc-set-filter', filterDetail)
    })

    // 向新用户广播所有已有滤镜
    client.emit('webrtc-filters', filters)

    // 监听用户美颜改变
    client.on('webrtc-set-beauty', beautyDetail => {
      beautys[beautyDetail.peerId] = beautyDetail.beauty
      client.broadcast.emit('webrtc-set-beauty', beautyDetail)
    })

    // 向新用户广播所有已有梅美颜
    client.emit('webrtc-beautys', beautys)

    // pass a message to another id
    client.on('message', details => {
      if (!details) return

      const otherClient = io.to(details.to)
      if (!otherClient) return

      details.from = client.id
      otherClient.emit('message', details)
    })

    client.on('shareScreen', () => {
      client.resources.screen = true
    })

    client.on('unshareScreen', type => {
      client.resources.screen = false
      removeFeed('screen')
    })

    client.on('join', join)
    
    // we don't want to pass "leave" directly because the
    // event type string of "socket end" gets passed too.
    client.on('disconnect', () => {
      removeFeed()
    })
    client.on('leave', () => {
      removeFeed()
    })

    client.on('create', (name, cb) => {
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

    /*
    // support for logging full webrtc traces to stdout
    // useful for large-scale error monitoring
    client.on('trace', data => {
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
    const origin = client.handshake.headers.origin
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

    // tell client about stun and turn servers and generate nonces
    // console.log('server send stuns', config.stunservers || [])
    client.emit('stunservers', config.stunservers || [])
    
    console.log('server send turnservers', config.turnservers, credentials)
    client.emit('turnservers', credentials)
    client.emit('turnservers', config.turnservers)
    */

  })
}

module.exports = parseWebrtcServer
