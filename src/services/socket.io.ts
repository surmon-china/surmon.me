/**
 * @file socket 服务
 * @module service/socket.io
 * @author Surmon <https://github.com/surmon-china>
 */

import socketIO from 'socket.io-client'
import API_CONFIG from '/@/config/api.config'

declare global {
  interface Window {
    $socket: socketIO.Socket
  }
}

export const initSocketAndExport = () => {
  window.$socket = socketIO.io(API_CONFIG.SOCKET, {
    transports: ['websocket']
  })
}
