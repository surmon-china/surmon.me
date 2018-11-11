/**
 * @file 全局设置数据状态 / ES module
 * @module store/option
 * @author Surmon <https://github.com/surmon-china>
 */

import i18nConfig from '~/i18n.config'

export const state = () => ({

  // 同构常量
  constants: null,

  // 默认语言
  language: i18nConfig.default,

  // 节能模式
  powerSavingMode: false,

  // 页面的栏目展示类型（3栏/2栏）
  fullColumn: false,
  errorColumn: false,

  // 图片格式
  imgExt: 'webp',

  // 是否为移动端
  mobileLayout: false,

  // 移动端侧边栏
  mobileSidebar: false,

  // 是否开启弹幕
  openBarrage: false,

  // 弹幕是否已首次渲染
  barrageMounted: false,

  // 是否开启rtc
  openWebrtc: false,

  // 山河入梦
  openWallpaper: false,

  // ua
  userAgent: '',

  // 服务端博主信息
  adminInfo: {
    fetching: false,
    data: {}
  },

  // 服务端设置的全局配置
  globalOption: {
    fetching: false,
    data: {
      meta: {
        likes: 0
      }
    }
  }
})

export const getters = {
  mobileLayout: state => state.mobileLayout,
  langIsEn: state => state.language === 'en'
}

export const mutations = {

  // 设置常量
  SET_CONSTANTS(state, action) {
    state.constants = action.result
  },

  // 设置UA
  SET_USER_AGENT(state, action) {
    state.userAgent = action
  },

  // 设置图片格式
  SET_IMG_EXT(state, action) {
    state.imgExt = action
  },

  // 设置是否移动端状态
  SET_MOBILE_LAYOUT(state, action) {
    state.mobileLayout = action
  },

  // 切换移动端侧边栏
  SET_MOBILE_SIDEBAR(state, action) {
    state.mobileSidebar = action
  },

  // 设置栏目结构
  SET_FULL_COLUMU(state, action) {
    state.fullColumn = action
  },

  // 设置错误页面模板
  SET_ERROR_COLUMU(state, action) {
    state.errorColumn = action
  },

  // 获取服务端配置的管理员信息
  REQUEST_ADMIN_INFO(state) {
    state.adminInfo.fetching = true
  },
  REQUEST_ADMIN_INFO_SUCCESS(state, action) {
    state.adminInfo.fetching = false
    state.adminInfo.data = action.result
  },
  REQUEST_ADMIN_INFO_FAILURE(state) {
    state.adminInfo.fetching = false
    state.adminInfo.data = {}
  },

  // 获取服务端配置
  REQUEST_GLOBAL_OPTIONS(state) {
    state.globalOption.fetching = true
  },
  REQUEST_GLOBAL_OPTIONS_SUCCESS(state, action) {
    state.globalOption.fetching = false
    state.globalOption.data = action.result
  },
  REQUEST_GLOBAL_OPTIONS_FAILURE(state) {
    state.globalOption.fetching = false
  },

  // 喜欢本站
  LIKE_SITE(state, action) {
    state.globalOption.data.meta.likes++
  },

  // 切换弹幕状态
  UPDATE_BARRAGE_STATE(state, action) {
    state.openBarrage = action !== undefined ? !!action : !state.openBarrage
    if (state.openBarrage && !state.barrageMounte) {
      state.barrageMounted = true
    }
  },

  // 切换RTC状态
  UPDATE_WEBRTC_STATE(state, action) {
    state.openWebrtc = action !== undefined ? !!action : !state.openWebrtc
  },

  // 切换节电模式
  TOGGLE_POWER_SAVING_MODE(state, action) {
    state.powerSavingMode = action
  },

  // 切换墙纸开关
  TOGGLE_WALLPAPER(state, action) {
    state.openWallpaper = action !== undefined ? !!action : !state.openWallpaper
  },

  // 切换语言
  SWITCH_LANGUAGE(state, action) {
    state.language = action
  }
}
