/**
 * @file BFF bilibili getter
 * @module server.getter.bilibili
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { BILIBILI_UID, META } from '@/config/app.config'

const PAGE_SIZE = 36
const PAGE = 1

export const getBiliBiliVideos = async (): Promise<Array<any>> => {
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
