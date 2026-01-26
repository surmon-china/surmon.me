/**
 * @file Statistics store
 * @module store/statistics
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
import type { NpmStatistics } from '/@/server/getters/npm'
import type { GitHubStatistics } from '/@/server/getters/github'
import nodepress from '/@/services/nodepress'
import tunnel from '/@/services/tunnel'

export interface NodePressStatistics {
  tags: number
  articles: number
  comments: number
  todayViews: number
  totalViews: number
  totalLikes: number
  averageEmotion: number
}

export const useNodepressStatisticsStore = defineStore('nodepressStatistics', () => {
  return createFetchStore<NodePressStatistics | null>({
    data: null,
    fetcher: async () => {
      const response = await nodepress.get<NodePressStatistics>('/system/statistics')
      return response.result
    }
  })
})

export const useGitHubStatisticsStore = defineStore('githubStatistics', () => {
  return createFetchStore<GitHubStatistics | null>({
    once: true,
    data: null,
    fetcher: () => tunnel.fetch(TunnelModule.StatisticsGitHubJson)
  })
})

export const useNpmStatisticsStore = defineStore('npmStatistics', () => {
  return createFetchStore<NpmStatistics | null>({
    once: true,
    data: null,
    fetcher: () => tunnel.fetch<NpmStatistics>(TunnelModule.StatisticsNpmJson)
  })
})
