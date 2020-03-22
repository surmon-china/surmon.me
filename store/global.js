/**
 * @file 全局设置数据状态 / ES module
 * @module store/option
 * @author Surmon <https://github.com/surmon-china>
 */

import i18nConfig from '~/config/i18n.config'
import stateConstants from '~/constants/state'
import systemConstants from '~/constants/system'
import { getStorageReader } from '~/services/local-storage'

const localThemeReader = getStorageReader(systemConstants.StorageField.Theme)

export const state = () => ({
  // 主题
  theme: systemConstants.Theme.Default,

  // 同构常量
  constants: stateConstants,

  // 图片格式，见 OSS: https://oss.console.aliyun.com/bucket/oss-cn-hangzhou/surmon-static/process/img
  imageExt: systemConstants.ImageExt.WebP,

  // ua
  userAgent: '',

  // 默认语言
  language: i18nConfig.default,

  // 页面的栏目展示类型（3栏/2栏）
  isTwoColumns: false,
  isThreeColumns: false,

  // 是否为移动端
  isMobile: false,

  // 是否中文用户
  isZHUser: true,

  // 移动端侧边栏
  onMobileSidebar: false,

  // 是否开启弹幕
  onBarrage: false,

  // 开启轨迹地图
  onMyMap: false,

  // 山河入梦
  onWallpaper: false,

  // 服务端博主信息
  adminInfo: {},

  // 服务端设置的全局配置
  appOption: {
    fetching: false,
    data: null
  }
})

export const getters = {
  isMobile: state => state.isMobile,
  isEnLang: state => state.language === systemConstants.Language.En,
  isDarkTheme: state => state.theme === systemConstants.Theme.Dark,
  isWebPImage: state => state.imageExt === systemConstants.ImageExt.WebP,
}

export const mutations = {
  // 主题
  updateTheme(state, action) {
    const themes = [systemConstants.Theme.Default, systemConstants.Theme.Dark]
    if (themes.includes(action)) {
      state.theme = action
      localThemeReader.set(action)
    }
  },
  resetTheme(state) {
    const historyTheme = localThemeReader.get()
    if (historyTheme) {
      const theme =
        historyTheme === systemConstants.Theme.Dark
          ? systemConstants.Theme.Dark
          : systemConstants.Theme.Default
      state.theme = theme
      localThemeReader.set(theme)
    }
  },

  // 设置UA
  updateUserAgent(state, action) {
    state.userAgent = action
  },

  // 设置图片格式
  updateImageExt(state, action) {
    state.imageExt = action
  },

  // 设置是否移动端状态
  updateMobileState(state, action) {
    state.isMobile = action
  },

  // 切换移动端侧边栏
  updateMobileSidebarOnState(state, action) {
    state.onMobileSidebar = action
  },

  // 设置两栏页面结构
  updateTwoColumnsState(state, action) {
    state.isTwoColumns = action
  },

  // 设置三栏页面结构
  updateThreeColumnsState(state, action) {
    state.isThreeColumns = action
  },

  // 喜欢本站
  updateSiteLikes(state) {
    state.appOption.data.meta.likes++
  },

  // 切换弹幕状态
  toggleUpdateBarrageOnState(state, action) {
    state.onBarrage = action != null ? !!action : !state.onBarrage
  },

  // 切换 MyMap 状态
  toggleMyMapOnState(state) {
    state.onMyMap = !state.onMyMap
  },

  // 切换墙纸开关
  toggleUpdateWallpaperOnState(state, action) {
    state.onWallpaper = action != null ? !!action : !state.onWallpaper
  },

  // 切换语言
  updateLanguage(state, action) {
    state.language = action
  },

  // 用户身份
  updateZHState(state, action) {
    state.isZHUser = action
  },

  // 服务端配置的管理员信息
  updateAdminInfo(state, action) {
    state.adminInfo = action.result
  },

  // 服务端配置
  updateAppOptionFetching(state, action) {
    state.appOption.fetching = action
  },
  updateAppOptionData(state, action) {
    state.appOption.data = action.result
  },
  updateLikesIncrement(state) {
    state.appOption.data.meta.likes++
  }
}

export const actions = {
  // 获取博主资料
  fetchAdminInfo({ commit }) {
    return this.$axios
      .$get('/auth/admin')
      .then(response => commit('updateAdminInfo', response))
  },

  // 获取全局配置
  fetchAppOption({ commit, state }, force = false) {
    if (!force && state.appOption.data) {
      return Promise.resolve()
    }
    commit('updateAppOptionFetching', true)
    return this.$axios
      .$get(`/option`)
      .then(response => {
        commit('updateAppOptionData', response)
        commit('updateAppOptionFetching', false)
      })
      .catch(() => commit('updateAppOptionFetching', false))
  },

  // 喜欢主站
  fetchLikeSite({ commit }) {
    return this.$axios.$patch(`/like/site`).then(response => {
      commit('updateLikesIncrement')
      return Promise.resolve(response)
    })
  }
}
