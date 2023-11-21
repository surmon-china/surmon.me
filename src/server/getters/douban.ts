/**
 * @file BFF douban getter
 * @module server.getter.douban
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'

export const getDoubanMovies = async () => {
  const api = `https://m.douban.com/rexxar/api/v2/user/${IDENTITIES.DOUBAN_USER_ID}/collection_stats?type=movie&for_mobile=1`
  const referer = `https://m.douban.com/people/${IDENTITIES.DOUBAN_USER_ID}/movie_charts`
  const response = await axios.get<any>(api, {
    timeout: 1000 * 12,
    headers: { Referer: referer }
  })
  return response.data
}
