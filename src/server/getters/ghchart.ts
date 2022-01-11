/**
 * @file BFF ghchart getter
 * @module server.getter.ghchart
 * @author Surmon <https://github.com/surmon-china>
 * @repo https://github.com/sallar/github-contributions-chart
 */

import axios from 'axios'
import { THIRD_IDS } from '@/config/app.config'

export const getGitHubChartSVG = async () => {
  const response = await axios.get<string>(
    `https://ghchart.rshah.org/${THIRD_IDS.GITHUB_USER_ID}`,
    { timeout: 8000 }
  )
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}
