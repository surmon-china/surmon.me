import { createLogger } from '@/utils/logger'

export const bffLogger = createLogger('BFF')
export const cacheLogger = createLogger('BFF:Cache')
export const proxyLogger = createLogger('BFF:Proxy')
export const cacherLogger = createLogger('BFF:Cacher')
export const getterLogger = createLogger('BFF:Getter')
