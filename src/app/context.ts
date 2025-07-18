import { useSSRContext } from 'vue'
import { isServer } from '/@/configs/app.env'
import { getSSRContextValue } from './universal'
import type { AppErrorValue } from './state'

export interface SSRContext {
  requestUrl: string
  userAgent: string | undefined
  acceptLanguage: string | undefined
  cookieTheme: string | undefined
  countryName: string | undefined
  countryCode: string | undefined
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

export const useCountryCode = () => {
  return useSSRContextValue<string>('countryCode')
}
