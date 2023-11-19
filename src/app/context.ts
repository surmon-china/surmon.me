import { useSSRContext, getCurrentInstance } from 'vue'
import { getSSRContextValue } from '/@/universal'
import type { RenderErrorValue } from './state'
import { isServer } from './environment'
import logger from '/@/utils/logger'

export interface SSRContext {
  requestURL: string
  country?: string
  language?: string
  userAgent?: string
  cookieTheme?: string
  cdnDomain: string
  assetsPrefix: string
  cacheStatus?: string
  error?: RenderErrorValue
  [key: string]: any
}

export const useSSRContextValue = <T = any>(key: keyof SSRContext): T | void => {
  if (isServer) {
    if (!getCurrentInstance()) {
      logger.warn(`useSSRContextValue() can only be used inside setup().`)
    }
    return useSSRContext<SSRContext>()?.[key]
  } else {
    return getSSRContextValue<SSRContext[typeof key]>(key)
  }
}

export const useCountry = () => useSSRContextValue<string>('country')
export const useCacheStatus = () => useSSRContextValue<string>('cacheStatus')

export const useCDNDomain = () => {
  const domain = useSSRContextValue<string>('cdnDomain')
  if (!domain) {
    throw new Error('CDN domain is not defined.')
  } else {
    return domain
  }
}

export const useRequestURL = () => {
  const url = useSSRContextValue<string>('requestURL')
  if (!url) {
    throw new Error('Request URL is not defined.')
  } else {
    return url
  }
}
