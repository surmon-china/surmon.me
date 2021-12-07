/**
 * @file Outside
 * @module service.outside
 * @author Surmon <https://github.com/surmon-china>
 */

export const getGAScriptUrl = (gaMeasurementID: string) => {
  return `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`
}
