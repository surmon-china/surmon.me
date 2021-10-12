/**
 * @file BFF Barrage server
 * @module server/barrage
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'
import fs from 'fs-extra'
import { Socket, Server } from 'socket.io'
import { debounce } from 'lodash'
import { SocketEvent } from '/@/constants/barrage'
import { DATA_PATH } from './helper'

// file
const dataFile = path.resolve(DATA_PATH, 'barrages.json')
const defaultFile = path.resolve(DATA_PATH, 'barrages.default.json')

// init
fs.ensureFileSync(dataFile)
fs.ensureFileSync(defaultFile)
const barrages = fs.readJsonSync(dataFile, { throws: false }) || []
const defaultBarrages = fs.readJsonSync(defaultFile, { throws: false }) || []
if (!barrages.length) {
  barrages.push(...defaultBarrages)
}

// 更新本地文件数据
const updateLocalBarragesFile = async () => {
  try {
    await fs.outputJson(dataFile, barrages)
    // console.log('最新聊天记录保存成功!')
  } catch (error) {
    console.warn('最新弹幕记录保存失败', error)
  }
}

// 30秒为一个周期，保存一次最新弹幕记录
const updateDebounce = debounce(updateLocalBarragesFile, 1000 * 30)

export const startBarrageSocket = (ioServer: Server) => {
  // get counts
  const getCounts = () => ({
    // @ts-ignore
    users: ioServer.engine.clientsCount,
    count: barrages.length
  })

  ioServer.on('connection', (socketWithClient: Socket) => {
    // 通知所有数量的更新
    const sendCountToClients = () => {
      socketWithClient.broadcast.emit(SocketEvent.UpdateCount, getCounts())
    }

    // 每次有连接发生变化，都需要更新总数量 & 且通知客户端
    sendCountToClients()
    socketWithClient.on('disconnect', () => {
      sendCountToClients()
    })

    // 最后一批弹幕记录
    socketWithClient.on(SocketEvent.LastList, (callback) => {
      callback(barrages.slice(-66))
    })

    // 弹幕总数量
    socketWithClient.on(SocketEvent.Count, (callback) => {
      callback(getCounts())
    })

    // 广播新弹幕 & 且通知客户端数量变化
    socketWithClient.on(SocketEvent.Send, (barrage) => {
      barrages.push(barrage)
      socketWithClient.broadcast.emit(SocketEvent.Create, barrage)
      updateDebounce()
      sendCountToClients()
    })
  })
}
