/**
 * @file i18n 语言格式转换器 / ES module
 * @module transforms/i18n-transfer
 * @author Surmon <https://github.com/surmon-china>
 */

export default i18nConfig => {

  const languages = i18nConfig.languages.map(lang => lang.code)
  const languageDatas = i18nConfig.data
  const productData = {}

  // 递归分析数据
  const buildProductData = (parentLangs, currentLangs, prveKey, targetLang) => {
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
    productData[lang] = JSON.parse(JSON.stringify(languageDatas))
    buildProductData(null, productData[lang], null, lang)
  })

  return productData
}
