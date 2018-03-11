/*
 *
 * socket 服务
 *
*/

import apiConfig from '~/api.config'
import io from 'socket.io-client'
const socket = io(apiConfig.socketHost, {
  transports: ['websocket']
})
export default socket
