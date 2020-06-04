/**
 * @file HTTP service
 * @module service/http
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
// import CONFIG from '/@/constants/system'

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Fetch failed:', error)
    return Promise.reject(error)
  }
)

export default axios
