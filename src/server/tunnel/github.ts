/**
 * @file BFF Server github
 * @module server.tunnel.github
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { TunnelModule } from '@/constants/tunnel'
import { GITHUB_UID, META } from '@/config/app.config'
import { tunnelCache } from '.'

export interface IGithubRepository {
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

const getRepositories = async (): Promise<Array<IGithubRepository>> => {
  const response = await axios.request<any>({
    headers: { 'User-Agent': META.title },
    url: `http://api.github.com/users/${GITHUB_UID}/repos?per_page=1000`
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
      } as IGithubRepository)
  )
}

const autoUpdateData = () => {
  getRepositories()
    .then((data) => {
      tunnelCache.set(TunnelModule.GitHub, data)
      // 成功后 2 小时更新一次数据
      setTimeout(autoUpdateData, 1000 * 60 * 60 * 2)
    })
    .catch((error) => {
      // 失败后 10 分钟更新一次数据
      console.warn('[Tunnel GitHub]', '请求失败', error)
      setTimeout(autoUpdateData, 1000 * 60 * 10)
    })
}

autoUpdateData()

export const githubService = async (): Promise<any> => {
  if (tunnelCache.has(TunnelModule.GitHub)) {
    return tunnelCache.get(TunnelModule.GitHub)
  } else {
    const data = await getRepositories()
    tunnelCache.set(TunnelModule.GitHub, data)
    return data
  }
}
