/**
 * @file BFF GitHub getter
 * @module server/getter/github
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { VALUABLE_LINKS } from '@/configs/app.config'

export const fetchGitHubStatisticJSON = async <T = any>(fileName: string): Promise<T> => {
  const url = `${VALUABLE_LINKS.GITHUB_STATISTIC_JSON_URL}${fileName}`
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
  return fetchGitHubStatisticJSON<any>('github.json').then((data) => ({
    followerCount: data.userinfo.followers,
    followingCount: data.userinfo.following,
    gistCount: data.userinfo.public_gists,
    repositoryCount: data.userinfo.public_repos,
    organizationCount: data.organizations.length,
    totalStarCount: data.statistics.stars,
    totalCodeSize: data.statistics.size
  }))
}

export interface GitHubSponsorUser {
  login: string
  name: string
  url: string
  avatarUrl: string
  websiteUrl: string
}

export interface GitHubSponsorsResponse {
  totalCount: number
  currentSponsors: GitHubSponsorUser[]
  pastSponsors: GitHubSponsorUser[]
}

export const getGitHubSponsors = () => {
  return fetchGitHubStatisticJSON<GitHubSponsorsResponse>('github.sponsors.json')
}

export interface GitHubContributionDay {
  weekday: number
  date: string // YYYY-MM-DD
  contributionCount: number
  color: string
}

export interface GitHubContributionsResponse {
  totalContributions: number
  weeks: Array<{
    contributionDays: Array<GitHubContributionDay>
  }>
}

export const getGitHubContributions = () => {
  return fetchGitHubStatisticJSON<GitHubContributionsResponse>('github.contributions.json')
}
