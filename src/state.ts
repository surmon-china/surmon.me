/**
 * @file 全局设置数据状态
 * @module store/option
 * @author Surmon <https://github.com/surmon-china>
 */

import { App, inject, ref, computed, reactive, readonly } from 'vue'
import { uaParser, isZhUser } from '/@/transforms/ua'

export enum ImageExt {
  WebP = 'webp',
  Jpg = 'jpeg'
}

export enum LayoutColumn {
  Normal = 0,
  Wide = 1,
  Full = 2, // not used
  Page = 3
}

export interface GlobalStateConfig {
  userAgent: string
  language: string
}

const GlobalStateSymbol = Symbol('globalState')
export type GlobalState = ReturnType<typeof createGlobalState>
export const createGlobalState = (config: GlobalStateConfig) => {

  // UserAgent & device info
  const userAgent = reactive({
    original: config.userAgent,
    language: config.language,
    isZhUser: isZhUser(config.language),
    ...uaParser(config.userAgent)
  })
  const resetUserAgentOnClient = () => {
    userAgent.original = navigator.userAgent
    Object.assign(userAgent, uaParser(config.userAgent))
  }

  // 页面的栏目展示类型
  const layoutValue = ref(LayoutColumn.Normal)
  const layoutColumn = readonly({
    layout: readonly(layoutValue),
    setValue(layout: LayoutColumn) {
      layoutValue.value = layout
    },
    isNormal: computed(() => layoutValue.value === LayoutColumn.Normal),
    isWide: computed(() => layoutValue.value === LayoutColumn.Wide),
    isFullColumn: computed(() => layoutValue.value === LayoutColumn.Full),
    isFullPage: computed(() => layoutValue.value === LayoutColumn.Page)
  })

  // Aliyun OSS: https://oss.console.aliyun.com/bucket/oss-cn-hangzhou/surmon-static/process/img
  // MARK: 微信/Safari/移动端无法精确判断兼容性，使用 jpg 格式
  const imageExtValue = computed(() => {
    return userAgent.isMobile || userAgent.isWechat || userAgent.isSafari
      ? ImageExt.Jpg as ImageExt
      : ImageExt.WebP as ImageExt
  })
  const imageExt = {
    ext: imageExtValue,
    isJpg: computed(() => imageExtValue.value === ImageExt.Jpg),
    isWebP: computed(() => imageExtValue.value === ImageExt.WebP)
  }

  // 所有业务的开关
  const switchBox = reactive({
    // 移动端侧边栏
    mobileSidebar: false,
    // 是否开启弹幕
    barrage: false,
    // 开启轨迹地图
    liveMap: false,
    // 山河入梦
    wallpaper: false,
  })
  const resetLanguageOnClient = () => {
    const language = navigator.language
    userAgent.language = navigator.language
    userAgent.isZhUser = isZhUser(language)
  }

  const resetOnClient = () => {
    resetUserAgentOnClient()
    resetLanguageOnClient()
  }

  const globalState = readonly({
    userAgent,
    layoutColumn,
    imageExt,
    switchBox,
    switchTogglers: {
      liveMap() { switchBox.liveMap = !switchBox.liveMap },
      wallpaper() { switchBox.wallpaper = !switchBox.wallpaper },
      barrage() { switchBox.barrage = !switchBox.barrage },
      mobileSidebar: (open?: boolean) => {
        switchBox.mobileSidebar = open !== null
          ? !!open
          : !switchBox.mobileSidebar
      },
    },
    resetOnClient
  })

  return {
    ...globalState,
    install(app: App) {
      app.provide(GlobalStateSymbol, globalState)
    }
  }
}

export const useGlobalState = (): GlobalState => {
  return inject(GlobalStateSymbol) as GlobalState
}
