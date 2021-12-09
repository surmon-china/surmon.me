/**
 * @file BFF Server bilibili
 * @module server.tunnel.bilibili
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { TunnelModule } from '@/constants/tunnel'
import { BILIBILI_UID, META } from '@/config/app.config'
import { tunnelCache } from '.'

const PAGE_SIZE = 45
const PAGE = 1

const fetchVideoData = async (): Promise<Array<any>> => {
  const videosResult = await axios.request<any>({
    headers: { 'User-Agent': META.title },
    url: `https://api.bilibili.com/x/space/arc/search?mid=${BILIBILI_UID}&ps=${PAGE_SIZE}&tid=0&pn=${PAGE}&order=pubdate&jsonp=jsonp`
  })
  if (videosResult.data.code === 0) {
    return videosResult.data.data.list.vlist
  } else {
    throw new Error(String(videosResult.status + videosResult.statusText))
  }
}

const autoUpdateData = () => {
  fetchVideoData()
    .then((data) => {
      tunnelCache.set(TunnelModule.BiliBili, data)
      // 成功后 1 小时更新一次数据
      setTimeout(autoUpdateData, 1000 * 60 * 60 * 1)
    })
    .catch((error) => {
      // 失败后 5 分钟更新一次数据
      console.warn('[Tunnel BiliBili]', '请求失败', error)
      setTimeout(autoUpdateData, 1000 * 60 * 5)
    })
}

autoUpdateData()

export const bilibiliService = async (): Promise<any> => {
  if (tunnelCache.has(TunnelModule.BiliBili)) {
    return tunnelCache.get(TunnelModule.BiliBili)
  } else {
    const data = await fetchVideoData()
    tunnelCache.set(TunnelModule.BiliBili, data)
    return data
  }
}
