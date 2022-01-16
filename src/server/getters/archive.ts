/**
 * @file BFF archive getter
 * @module server.getter.archive
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { META } from '@/config/app.config'
import { NODEPRESS_API } from '../helpers/configurer'

export const getPageURL = (page) => `${META.url}/${page}`
export const getTagURL = (tag) => `${META.url}/tag/${tag}`
export const getCategoryURL = (category) => `${META.url}/category/${category}`
export const getArticleURL = (id) => `${META.url}/article/${id}`

export const getArchiveData = () => {
  return axios
    .get<any>(`${NODEPRESS_API}/archive`, { timeout: 6000 })
    .then((response) => {
      if (response.status === 200) {
        return response.data.result
      } else {
        return Promise.reject(response.statusText)
      }
    })
    .catch((error) => {
      return Promise.reject(error.toJSON?.() || error)
    })
}
