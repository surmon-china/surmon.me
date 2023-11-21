/**
 * @file BFF open-srouce getter
 * @module server.getter.open-srouce
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'

const fetchStatisticJSON = async <T = any>(fileName: string): Promise<T> => {
  const url = `https://raw.githubusercontent.com/${IDENTITIES.GITHUB_USER_NAME}/${IDENTITIES.GITHUB_USER_NAME}/release/${fileName}`
  const response = await axios.get<T>(url, { timeout: 6000 })
  return response.data
}

export interface GitHubStatistic {
  followerCount: number
  followingCount: number
  gistCount: number
  repositoryCount: number
  organizationCount: number
  totalStarCount: number
  totalCodeSize: number
}

export const getGitHubStatistic = () => {
  return fetchStatisticJSON<any>('github.json').then((data) => ({
    followerCount: data.userinfo.followers,
    followingCount: data.userinfo.following,
    gistCount: data.userinfo.public_gists,
    repositoryCount: data.userinfo.public_repos,
    organizationCount: data.organizations.length,
    totalStarCount: data.statistics.stars,
    totalCodeSize: data.statistics.size
  }))
}

export interface NpmStatistic {
  totalPackages: number
  totalDownloads: number
  averageScore: number
}

interface NPM_JSON {
  downloads: Record<string, number>
  packages: Array<any>
}

export const getNPMStatistic = () => {
  return fetchStatisticJSON<NPM_JSON>('npm.json').then((data) => {
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
    } as NpmStatistic
  })
}
