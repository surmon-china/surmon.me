/**
 * @file 根数据状态，仅用以调度初始化任务 / ES module
 * @module store/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import { isServer } from '~/environment'
import { uaParser } from '~/transformers/ua'
import systemConstants from '~/constants/system'

export const actions = {
  nuxtServerInit(store, { req }) {
    // 检查设备类型
    const userLanguage = isServer ? req.headers['accept-language'] : navigator.language
    const userAgent = isServer ? req.headers['user-agent'] : navigator.userAgent
    const { isMobile, isWechat, isIE, isSafari } = uaParser(userAgent)
    const isZHUser = !userLanguage || userLanguage.includes(systemConstants.Language.Zh)

    store.commit('global/updateUserAgent', userAgent)
    store.commit('global/updateZHState', isZHUser)

    // 微信/Safari/移动端无法精确判断兼容性，使用 jpg 格式
    if (isMobile || isWechat || isIE || isSafari) {
      store.commit('global/updateImageExt', systemConstants.ImageExt.Jpg)
    }

    // 如果是非中文地区用户则设置为英文
    if (!isZHUser) {
      store.commit('global/updateLanguage', systemConstants.Language.En)
    }

    // 移动端
    if (isMobile) {
      store.commit('global/updateMobileState', true)
    }

    // 初始化时的全局任务
    const initFetchAppData = [
      // 内容数据
      store.dispatch('tag/fetchList'),
      store.dispatch('category/fetchList')
    ]

    // 如果不是移动端的话，则请求热门文章
    if (!isMobile) {
      initFetchAppData.push(store.dispatch('article/fetchHotList'))
    }

    return Promise.all(initFetchAppData)
  }
}
