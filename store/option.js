/*
*
* 全局设置数据状态
*
*/

export const state = () => {
  return {

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

    // 是否开启rtc
    openWebrtc: false,

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
  }
}

export const getters = {
  mobileLayout: state => state.mobileLayout
}

export const mutations = {

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
    state.globalOption.data.meta.likes ++
  },

  // 切换弹幕状态
  UPDATE_BARRAGE_STATE(state, action) {
    if (action !== undefined) {
      state.openBarrage = !!action
    } else {
      state.openBarrage = !state.openBarrage
    }
  },

  // 切换RTC状态
  UPDATE_WEBRTC_STATE(state, action) {
    if (action !== undefined) {
      state.openWebrtc = !!action
    } else {
      state.openWebrtc = !state.openWebrtc
    }
  }
}
