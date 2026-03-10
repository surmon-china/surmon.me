/**
 * @file AI Agent API
 * @module service/ai-agent
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { AppError } from '/@/app/error'
import API_CONFIG from '/@/configs/app.api'

const aiAgent = axios.create({
  baseURL: API_CONFIG.AI_AGENT
})

const extractError = (error: AxiosError<any>): AppError => ({
  code: error.response?.status ?? error.status ?? 0,
  message: error.response?.data?.message ?? error.response?.statusText ?? error.message
})

aiAgent.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<any>) => Promise.reject(extractError(error))
)

type AiAgentInstance = Omit<typeof aiAgent, 'get' | 'post' | 'request'> & {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
  request<T = any>(config: AxiosRequestConfig): Promise<T>
}

export default aiAgent as AiAgentInstance
