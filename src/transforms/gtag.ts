/**
 * @file Google Analytics
 * @module transform.gtag
 * @author Surmon <https://github.com/surmon-china>
 */

export const getGaScriptURL = (measurementId: string) => {
  return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
}
