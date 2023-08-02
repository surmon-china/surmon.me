/**
 * @file Country utils
 * @author Surmon <https://github.com/surmon-china>
 */

// https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
// ISO 3166-1 https://en.wikipedia.org/wiki/ISO_3166-1
export const isCNCode = (code: string) => {
  return code === 'CN'
}
