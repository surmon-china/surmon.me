/**
 * @file vue-awesome-swiper
 * @module utils
 * @author Surmon <https://github.com/surmon-china>
 */

export const littleCamelCase = (string: string): string => {
  return string.replace(/-([a-z0-9])/g, (c) => c[1].toUpperCase())
}

export const kebabcase = (string: string): string => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
