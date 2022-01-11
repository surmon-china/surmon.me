/**
 * @file BFF GitHub getter
 * @module server.getter.github
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { THIRD_IDS, META } from '@/config/app.config'

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
