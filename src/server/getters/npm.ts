/**
 * @file BFF NPM getter
 * @module server/getter/npm
 * @author Surmon <https://github.com/surmon-china>
 */

import { fetchGitHubStatisticsJson } from './github'

export interface NpmStatistics {
  totalPackages: number
  totalDownloads: number
  averageScore: number
}

interface NPM_JSON {
  downloads: Record<string, number>
  packages: Array<any>
}

export const getNPMStatistics = async () => {
  const data = await fetchGitHubStatisticsJson<NPM_JSON>('npm.json')
  const totalPackages = data ? Object.keys(data.downloads).length : 0
  const totalDownloads = data ? Object.values<number>(data.downloads).reduce((p, c) => p + c, 0) : 0
  const averageScore = (() => {
    const packages = data?.packages
    if (!packages?.length) {
      return 0
    }
    // https://itnext.io/increasing-an-npm-packages-search-score-fb557f859300
    const totalScore = packages.reduce((p, c) => p + c.score.final, 0)
    return (totalScore / packages.length).toFixed(3)
  })()

  return {
    totalPackages,
    totalDownloads,
    averageScore
  } as NpmStatistics
}
