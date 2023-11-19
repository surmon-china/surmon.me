/**
 * @file App logger
 * @module utils/logger
 * @author Surmon <https://github.com/surmon-china>
 */

export const createLogger = (scope: string) => ({
  log: (...messages) => console.log(`[${scope}]`, ...messages),
  info: (...messages) => console.info(`[${scope}]`, ...messages),
  warn: (...messages) => console.warn(`[${scope}]`, ...messages),
  error: (...messages) => console.error(`[${scope}]`, ...messages),
  debug: (...messages) => console.debug(`[${scope}]`, ...messages)
})

export default createLogger('APP')
