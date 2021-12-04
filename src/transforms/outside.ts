/**
 * @file 外部一些服务
 * @module service.outside
 * @author Surmon <https://github.com/surmon-china>
 */

export const getGAScriptUrl = (gaMeasurementId: string) => {
  return `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
}
