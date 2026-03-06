/**
 * @file AI Agent API
 * @module service/ai-agent
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import type { AxiosError } from 'axios'
import type { AppError } from '/@/app/error'
import API_CONFIG from '/@/configs/app.api'

const aiAgent = axios.create({
  baseURL: API_CONFIG.AI_AGENT
})

aiAgent.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    return Promise.reject({
      code: error.status!,
      message: error.response?.data ?? error.response?.statusText ?? error?.message
    } satisfies AppError)
  }
)

export default aiAgent
