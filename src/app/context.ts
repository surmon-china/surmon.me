import { useSSRContext } from 'vue'
import { isServer } from '/@/configs/app.env'
import { getSSRContextValue } from './universal'
import type { AppErrorValue } from './state'

export interface SSRContext {
  requestURL: string
  country?: string
  language?: string
  userAgent?: string
  cookieTheme?: string
  cdnDomain: string
  assetsPrefix: string
  cacheStatus?: string
  error: AppErrorValue
  [key: string]: any
}

export const useSSRContextValue = <T = any>(key: keyof SSRContext): T | void => {
  if (isServer) {
    return useSSRContext<SSRContext>()?.[key]
  } else {
    return getSSRContextValue<SSRContext[typeof key]>(key)
  }
}

export const useCdnDomain = () => {
  const domain = useSSRContextValue<string>('cdnDomain')
  if (!domain) throw new Error('CDN domain is not defined.')
  return domain
}

export const useRequestURL = () => {
  const url = useSSRContextValue<string>('requestURL')
  if (!url) throw new Error('Request URL is not defined.')
  return url
}

export const useCountry = () => {
  return useSSRContextValue<string>('country')
}

export const useCacheStatus = () => {
  return useSSRContextValue<string>('cacheStatus')
}
