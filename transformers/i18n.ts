/**
 * @file i18n 语言格式转换器 / ES module
 * @module transforms/i18n
 * @author Surmon <https://github.com/surmon-china>
 */

import { Ii18nConfig } from '~/config/i18n.config.type'

export const i18nTransfer = (i18nConfig: Ii18nConfig) => {
  const languages = i18nConfig.languages.map(lang => lang.code)
  const languagesData = i18nConfig.data
  const productData = {} as $TODO

  const buildProductData = (
    parentLangs: $TODO,
    currentLangs: $TODO,
    prveKey: $TODO,
    targetLang: $TODO
  ) => {
    for (const item in currentLangs) {
      if (item === targetLang) {
        parentLangs[prveKey] = currentLangs[item]
      } else if (typeof currentLangs[item] === 'object') {
        buildProductData(currentLangs, currentLangs[item], item, targetLang)
      }
    }
  }

  // 根据语言创建数据
  languages.forEach(lang => {
    productData[lang] = JSON.parse(JSON.stringify(languagesData))
    buildProductData(null, productData[lang], null, lang)
  })

  return productData
}
