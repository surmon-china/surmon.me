/**
 * @file Tags state
 * @module store/tag
 * @author Surmon <https://github.com/surmon-china>
 */

import { Module, MutationTree, GetterTree, ActionTree } from 'vuex'
import { firstUpperCase } from '/@/transforms/text'
import { IRootState } from '.'
import http from '/@/services/http'

export enum TagModuleMutations {
  SetFetched = 'setFetched',
  SetFetching = 'setFetching',
  SetListData = 'setListData'
}
export enum TagModuleGetters {
  FullNameTags = 'fullNameTags'
}
export enum TagModuleActions {
  FetchAll = 'fetchAll'
}

export interface ITag {
  name: string
  slug: string
  description: string
  create_at?: Date
  update_at?: Date
  count?: number
  _id?: string
  extends: $TODO[]
}

export interface ITagMap {
  [key: string]: ITag
}

const state = () => ({
  fetched: false,
  fetching: false,
  data: [] as Array<ITag>
})

export const getters: GetterTree<TagState, IRootState> = {
  [TagModuleGetters.FullNameTags](state) {
    // 全量标签列表（本身、全小写、全大写、首字母大写）
    const tags = state.data
    const tagMap: ITagMap = {}
    tags.forEach(tag => {
      ;[
        tag.name,
        tag.name.toLowerCase(),
        tag.name.toUpperCase(),
        firstUpperCase(tag.name)
      ].forEach(tagName => {
        tagMap[tagName] = tag
      })
    })
    return tagMap
  }
}

const mutations: MutationTree<TagState> = {
  [TagModuleMutations.SetFetched](state, fetched: boolean) {
    state.fetched = fetched
  },
  [TagModuleMutations.SetFetching](state, fetching: boolean) {
    state.fetching = fetching
  },
  [TagModuleMutations.SetListData](state, result) {
    state.data = result.data
  }
}

const actions: ActionTree<TagState, IRootState> = {
  [TagModuleActions.FetchAll]({ state, commit }) {
    if (state.fetched) {
      return Promise.resolve(state.data)
    }
    commit(TagModuleMutations.SetFetching, true)
    return http
      .get('/tag', { params: { cache: 1 }})
      .then(response => {
        commit(TagModuleMutations.SetListData, response.result)
        commit(TagModuleMutations.SetFetched, true)
        return response
      })
      .finally(() => {
        commit(TagModuleMutations.SetFetching, false)
      })
  }
}

const tagModule: Module<TagState, IRootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export type TagState = ReturnType<typeof state>
export default tagModule
