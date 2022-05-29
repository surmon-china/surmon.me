/**
 * @file BFF douban getter
 * @module server.getter.douban
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { THIRD_IDS, VALUABLE_LINKS } from '@/config/app.config'

export const getDoubanMovies = () => {
  const URL = `https://m.douban.com/rexxar/api/v2/user/${THIRD_IDS.DOUBAN_USER_ID}/collection_stats?type=movie&for_mobile=1`
  return axios
    .get<any>(URL, {
      timeout: 6000,
      headers: {
        Referer: VALUABLE_LINKS.DOUBAN_MOVIE
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        return Promise.reject(response.data)
      }
    })
    .catch((error) => {
      return Promise.reject(error.toJSON?.() || error)
    })
}
