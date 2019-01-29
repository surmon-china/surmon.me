/**
 * @file socket 服务 / ES module
 * @module plugins/socket.io
 * @author Surmon <https://github.com/surmon-china>
 */

import io from 'socket.io-client'
import { socketHost } from '~/config/api.config.esm'

const socket = io(socketHost, {
  transports: ['websocket']
})

export default socket
