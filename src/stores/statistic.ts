/**
 * @file Statistic state
 * @module store.statistic
 * @author Surmon <https://github.com/surmon-china>
 */

import nodepress from '/@/services/nodepress'
import tunnel from '/@/services/tunnel'
import { TunnelModule } from '/@/constants/tunnel'
import { defineFetchStore } from './_fetch'

export interface NodePressStatistic {
  tags: number
  articles: number
  comments: number
  todayViews: number
  totalViews: number
  totalLikes: number
  averageEmotion: number
}
export const useNodepressStatisticStore = defineFetchStore({
  id: 'nodepressStatistic',
  initData: null as null | NodePressStatistic,
  onlyOnce: false,
  fetcher() {
    return nodepress
      .get<NodePressStatistic>('/expansion/statistic')
      .then((response) => response.result)
  }
})

export const useGitHubStatisticStore = defineFetchStore({
  id: 'openSourceGitHubStatisticStore',
  initData: null,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch(TunnelModule.OpenSourceGitHubStatistic)
})

export interface NPMStatistic {
  downloads: Record<string, number>
  packages: Array<any>
}
export const useNPMStatisticStore = defineFetchStore({
  id: 'openSourceNPMStatisticStore',
  initData: null as null | NPMStatistic,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch<NPMStatistic>(TunnelModule.OpenSourceNPMStatistic),
  getters: {
    totalPackages(state): number {
      return state.data ? Object.keys(state.data.downloads).length : 0
    },
    totalDownloads(state): number {
      let count = 0
      if (state.data) {
        Object.values<number>(state.data.downloads).forEach((c) => {
          count += c
        })
      }
      return count
    },
    averageScore(state) {
      if (!state.data) {
        return 0
      }
      // https://itnext.io/increasing-an-npm-packages-search-score-fb557f859300
      let score = 0
      state.data.packages.forEach((p) => {
        score += p.score.final
      })
      return (score / state.data.packages.length).toFixed(3)
    }
  }
})
