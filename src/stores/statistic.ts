/**
 * @file Statistic state
 * @module store.statistic
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
import type { GitHubStatistic, NpmStatistic } from '/@/server/getters/open-srouce'
import nodepress from '/@/services/nodepress'
import tunnel from '/@/services/tunnel'

export interface NodePressStatistic {
  tags: number
  articles: number
  comments: number
  todayViews: number
  totalViews: number
  totalLikes: number
  averageEmotion: number
}

export const useNodepressStatisticStore = defineStore('nodepressStatistic', () => {
  return createFetchStore<NodePressStatistic | null>({
    data: null,
    fetcher: async () => {
      const response = await nodepress.get<NodePressStatistic>('/expansion/statistic')
      return response.result
    }
  })
})

export const useGitHubStatisticStore = defineStore('githubStatistic', () => {
  return createFetchStore<GitHubStatistic | null>({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch(TunnelModule.OpenSourceGitHubStatistic)
  })
})

export const useNpmStatisticStore = defineStore('npmStatistic', () => {
  return createFetchStore<NpmStatistic | null>({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch<NpmStatistic>(TunnelModule.OpenSourceNPMStatistic)
  })
})
