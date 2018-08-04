/*
 *
 * i18n 服务
 *
*/

import Vue from 'vue'
import i18nConfig from '~/i18n.config'

const languages = i18nConfig.languages.map(lang => lang.code)
const languageDatas = i18nConfig.data
const productData = {}

// console.log('数据应该放在这里处理', languages, languageDatas)

// 递归分析数据
const buildProductData = (parentLangs, currentLangs, prveKey, targetLang) => {
  // 循环，如果发现到了级别
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

// console.log('productData', productData)

Vue.mixin({
  computed: {
    $i18n() {
      const language = this.$store.state.option.language
      // console.log(language, productData, productData[language])
      return productData[language]
    }
  }
})

// Vue.prototype.cdnUrl = apiConfig.cdnUrl
