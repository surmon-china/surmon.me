/**
 * @file BFF ghchart getter
 * @module server.getter.ghchart
 * @author Surmon <https://github.com/surmon-china>
 * @repo https://github.com/sallar/github-contributions-chart
 */

import axios from 'axios'
import { GITHUB_UID } from '@/config/app.config'

export const getGitHubChartSVG = async () => {
  const response = await axios.get<string>(`https://ghchart.rshah.org/${GITHUB_UID}`, {
    timeout: 8000
  })
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}
