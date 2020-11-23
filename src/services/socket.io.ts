/**
 * @file socket 服务
 * @module service/socket.io
 * @author Surmon <https://github.com/surmon-china>
 */

import socketIO from 'socket.io-client'
import API_CONFIG from '/@/config/api.config'

const socket = socketIO.io(API_CONFIG.SOCKET, {
  transports: ['websocket']
})

export default socket
