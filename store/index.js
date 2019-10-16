/**
 * @file 根数据状态，仅用以调度初始化任务 / ES module
 * @module store/entry
 * @author Surmon <https://github.com/surmon-china>
 */

import { isServer } from '~/environment'
import { uaParser } from '~/transforms/ua'
import systemConstants from '~/constants/system'

export const actions = {

  // 全局服务初始化
  nuxtServerInit(store, { req }) {

    // 检查设备类型
    const userAgent = isServer
      ? req.headers['user-agent']
      : navigator.userAgent
    const { isMobile, isWechat, isChrome } = uaParser(userAgent)

    store.commit('global/updateUserAgent', userAgent)
    store.commit('global/updateMobileLayoutState', isMobile)
    store.commit('global/updateImageExt',
      isMobile || isWechat || !isChrome
        ? systemConstants.ImageExt.Jpg
        : systemConstants.ImageExt.Webp
    )

    // 如果是移动端，则设置语言为中文
    if (isMobile) {
      store.commit('global/updateLanguage', systemConstants.Language.Zh)
    }

    // 初始化时的全局任务
    const initFetchAppData = [
      // 配置数据
      // store.dispatch('global/fetchAdminInfo'),
      // store.dispatch('global/fetchAppOption'),
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
