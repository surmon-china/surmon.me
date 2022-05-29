/**
 * @file BFF open-srouce getter
 * @module server.getter.open-srouce
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { THIRD_IDS } from '@/config/app.config'

const fetchStatisticJSON = async (fileName: string) => {
  const url = `https://raw.githubusercontent.com/${THIRD_IDS.GITHUB_USER_ID}/${THIRD_IDS.GITHUB_USER_ID}/release/${fileName}`
  const response = await axios.get<string>(url, { timeout: 6000 })
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}

export const getGitHubStatistic = () => fetchStatisticJSON('github.json')
export const getNPMStatistic = () => fetchStatisticJSON('npm.json')
