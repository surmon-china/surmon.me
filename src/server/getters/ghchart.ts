/**
 * @file BFF ghchart getter
 * @module server.getter.ghchart
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { THIRD_IDS } from '@/config/app.config'

// https://github.com/surmon-china/README.md/blob/main/templates/github-contributions-calendar/README.md
export const getGitHubChartSVG = async () => {
  const response = await axios.get<string>(
    `https://readme.app.surmon.me/api/render?template_id=github-contributions-calendar&props.username=${THIRD_IDS.GITHUB_USER_ID}&props.size=10&props.gap=3&svg.width=686&svg.height=88`,
    { timeout: 8000 }
  )
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}
