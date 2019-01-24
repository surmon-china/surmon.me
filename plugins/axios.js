/**
 * @file Axios 扩展服务 / ES module
 * @module plugins/axios
 * @author Surmon <https://github.com/surmon-china>
 */

const SUCCESS_STATUS_TEXT = 'success'

export default function ({ $axios }) {
  $axios.onResponse(response => {
    return response
    /*
    // 重写响应器，兼容 Axios 在不同协议下的不同表现
    const isSuccess = response.statusText
      ? response.data && response.data.status === SUCCESS_STATUS_TEXT // HTTP2
      : response.status === SUCCESS_STATUS_TEXT // HTTP1.1
    return isSuccess
      ? response.data ? response.data : response
      : Promise.reject(response)
    */
  })
}
