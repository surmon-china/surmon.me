/**
 * @file App universal context
 * @module universal.context
 * @author Surmon <https://github.com/surmon-china>
 */

export interface SSRData {
  [key: string]: any
}

// SSR state
const SSR_STATE_KEY = '__INITIAL_SSR_STATE__'
export const renderSSRStateScript = (data: any) => {
  return `<script>window.${SSR_STATE_KEY} = ${data}</script>`
}
export const getSSRStateValue = <T = any>(key: keyof SSRData): T | undefined => {
  return (window as any)[SSR_STATE_KEY]?.[key]
}

// SSR context
const SSR_CONTEXT_KEY = '__SSR_CONTEXT__'
export const renderSSRContextScript = (data: any) => {
  return `<script>window.${SSR_CONTEXT_KEY} = ${data}</script>`
}
export const getSSRContextData = (): Partial<SSRData> | null => {
  return (window as any)[SSR_CONTEXT_KEY] || null
}
export const getSSRContextValue = <T = any>(key: keyof SSRData): T | undefined => {
  return getSSRContextData()?.[key]
}
