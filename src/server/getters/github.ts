/**
 * @file BFF GitHub getter
 * @module server.getter.github
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { argv } from 'yargs'
import { THIRD_IDS, META } from '@/config/app.config'

// https://github.com/settings/tokens
const bearerToken = argv.github_token

export interface GitHubRepository {
  html_url: string
  name: string
  fork: boolean
  forks: number
  forks_count: number
  description: string
  open_issues_count: number
  stargazers_count: number
  created_at: string
  language: string
}

export const getGitHubRepositories = async (): Promise<Array<GitHubRepository>> => {
  const response = await axios.request<any>({
    headers: { 'User-Agent': META.title },
    url: `http://api.github.com/users/${THIRD_IDS.GITHUB_USER_ID}/repos?per_page=168`
  })
  return response.data.map(
    (rep) =>
      ({
        html_url: rep.html_url,
        name: rep.name || ' ',
        fork: rep.fork,
        forks: rep.forks,
        forks_count: rep.forks_count,
        description: rep.description || ' ',
        open_issues_count: rep.open_issues_count,
        stargazers_count: rep.stargazers_count,
        created_at: rep.created_at,
        language: rep.language
      } as GitHubRepository)
  )
}

const isISODateString = (dateString: string) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateString)) return false
  return new Date(dateString).toISOString() === dateString
}

export const getGitHubContributions = async (from: string, to: string): Promise<any> => {
  if (!isISODateString(from) || !isISODateString(to)) {
    return Promise.reject('Invalid date string!')
  }

  const response = await axios.request<any>({
    headers: { Authorization: `bearer ${bearerToken}` },
    url: `https://api.github.com/graphql`,
    method: 'POST',
    data: JSON.stringify({
      query: `query {
        user(login: "${THIRD_IDS.GITHUB_USER_ID}") {
          contributionsCollection(from: "${from}", to: "${to}") {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  weekday
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }`
    })
  })

  if (response.data.errors) {
    throw Error(response.data.errors.map((error) => error.message).join('; '))
  }

  return response.data.data.user.contributionsCollection.contributionCalendar
}
