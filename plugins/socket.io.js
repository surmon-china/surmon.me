/**
 * @file socket 服务 / ES module
 * @module plugins/socket.io
 * @author Surmon <https://github.com/surmon-china>
 */

import io from 'socket.io-client'
import apiConfig from '~/config/api.config'

const socket = io(apiConfig.SOCKET, {
  transports: ['websocket']
})

export default socket
