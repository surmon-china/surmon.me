/**
 * @file HTTP service
 * @module service/http
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import API_CONFIG from '/@/config/api.config'

axios.interceptors.response.use(
  response => response,
  error => {
    // TODO: notifition
    console.debug('Tosta:', error)
    return Promise.reject(error)
  }
)

export default axios.create({
  baseURL: API_CONFIG.BASE,
})

