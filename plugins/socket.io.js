/**
 * @file socket 服务 / ES module
 * @module plugins/socket.io
 * @author Surmon <https://github.com/surmon-china>
 */

import apiConfig from '~/api.config'
import io from 'socket.io-client'

const socket = io(apiConfig.socketHost, {
  transports: ['websocket']
})

export default socket
