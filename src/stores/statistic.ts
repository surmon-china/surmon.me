/**
 * @file Statistic state
 * @module store.statistic
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
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
  return useFetchStore<NodePressStatistic | null>({
    data: null,
    fetcher: async () => {
      const response = await nodepress.get<NodePressStatistic>('/expansion/statistic')
      return response.result
    }
  })
})

export const useGitHubStatisticStore = defineStore('githubStatistic', () => {
  return useFetchStore<any>({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch(TunnelModule.OpenSourceGitHubStatistic)
  })
})

export interface NpmStatistic {
  downloads: Record<string, number>
  packages: Array<any>
}

export const useNpmStatisticStore = defineStore('npmStatistic', () => {
  const fetchStore = useFetchStore<NpmStatistic | null>({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch<NpmStatistic>(TunnelModule.OpenSourceNPMStatistic)
  })

  const totalPackages = computed(() => {
    return fetchStore.data.value ? Object.keys(fetchStore.data.value.downloads).length : 0
  })

  const totalDownloads = computed(() => {
    return fetchStore.data.value
      ? Object.values<number>(fetchStore.data.value.downloads).reduce((p, c) => p + c, 0)
      : 0
  })

  const averageScore = computed(() => {
    const packages = fetchStore.data.value?.packages
    if (!packages?.length) {
      return 0
    }
    // https://itnext.io/increasing-an-npm-packages-search-score-fb557f859300
    const totalScore = packages.reduce((p, c) => p + c.score.final, 0)
    return (totalScore / packages.length).toFixed(3)
  })

  return {
    ...fetchStore,
    totalPackages,
    totalDownloads,
    averageScore
  }
})
