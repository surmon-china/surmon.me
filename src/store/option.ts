/**
 * @file App options state
 * @module store/option
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, GetterTree, ActionTree } from 'vuex'
import { IRootState } from '.'
import http from '/@/services/http'

export enum OptionModuleGetters {
  ADConfig = 'adConfig'
}
export enum OptionModuleMutations {
  SetAdminInfo = 'setAdminInfo',
  SetAppOptionFetching = 'setAppOptionFetching',
  SetAppOptionData = 'setAppOptionData',
  IncrementAppLikes = 'incrementAppLikes',
}
export enum OptionModuleActions {
  FetchAdminInfo = 'fetchAdminInfo',
  FetchAppOption = 'fetchAppOption',
  PostSiteLike = 'postSiteLike'
}

export interface AD_CONFIG {
  PC_CARROUSEL: false | {
    disabled?: boolean
    index: number
    url: string
    src: string
    title: string
  }
  PC_NAV: Array<{
    disabled?: boolean
    hot?: boolean
    icon: string
    color: string
    url: string
    i18n: {
      en: string
      zh: string
    }
  }>
  PC_ASIDE_SWIPER: Array<{
    disabled?: boolean
    url: string
    src: string
  }>
  PC_ABOUT_PAGE_SWIPER: Array<{
    disabled?: boolean
    url: string
    src: string
  }>
}

const defaultAdConfig: AD_CONFIG = {
  PC_CARROUSEL: false,
  PC_NAV: [],
  PC_ASIDE_SWIPER: [],
  PC_ABOUT_PAGE_SWIPER: [],
}

const state = () => ({
  adminInfo: null as any,
  appOption: {
    fetching: false,
    data: null as any as {
      [key: string]: any
      ad_config: string
    }
  }
})

export const getters: GetterTree<OptionState, IRootState> = {
  [OptionModuleGetters.ADConfig](state): AD_CONFIG {
    const optionAdConfig = state.appOption.data?.ad_config
    const adConfig: AD_CONFIG = {
      ...defaultAdConfig,
      ...(optionAdConfig ? JSON.parse(optionAdConfig) : {})
    }
    // filter disabled ad itmes
    adConfig.PC_NAV = adConfig.PC_NAV.filter(ad => !ad.disabled)
    adConfig.PC_ASIDE_SWIPER = adConfig.PC_ASIDE_SWIPER.filter(ad => !ad.disabled)
    adConfig.PC_ABOUT_PAGE_SWIPER = adConfig.PC_ABOUT_PAGE_SWIPER.filter(ad => !ad.disabled)
    return adConfig
  }
}

const mutations: MutationTree<OptionState> = {
  // 服务端配置的管理员信息
  [OptionModuleMutations.SetAdminInfo](state, adminInfo) {
    state.adminInfo = adminInfo
  },
  // 服务端配置
  [OptionModuleMutations.SetAppOptionFetching](state, fetching: boolean) {
    state.appOption.fetching = fetching
  },
  [OptionModuleMutations.SetAppOptionData](state, appOption) {
    state.appOption.data = appOption
  },
  [OptionModuleMutations.IncrementAppLikes](state) {
    if (state.appOption.data) {
      state.appOption.data.meta.likes++
    }
  }
}

const actions: ActionTree<OptionState, IRootState> = {
  [OptionModuleActions.FetchAdminInfo]({ commit }) {
    return http
      .get('/auth/admin')
      .then(response => {
        commit(OptionModuleMutations.SetAdminInfo, response.result)
        return response
      })
  },
  [OptionModuleActions.FetchAppOption]({ commit, state }, force = false) {
    if (!force && state.appOption.data) {
      return Promise.resolve(state.appOption.data)
    }

    commit(OptionModuleMutations.SetAppOptionFetching, true)
    return http
      .get('/option')
      .then(response => {
        commit(OptionModuleMutations.SetAppOptionData, response.result)
        return response
      })
      .finally(() => {
        commit(OptionModuleMutations.SetAppOptionFetching, false)
      })
  },
  [OptionModuleActions.PostSiteLike]({ commit }) {
    return http.patch('/like/site').then(response => {
      commit(OptionModuleMutations.IncrementAppLikes)
      return response
    })
  }
}

const optionModule: Module<OptionState, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export type OptionState = ReturnType<typeof state>
export default optionModule
