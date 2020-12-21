/**
 * @file BFF ghchart updater
 * @module server/ghchart
 * @author Surmon <https://github.com/surmon-china>
 * @repo https://github.com/sallar/github-contributions-chart
 */

import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { GITHUB_UID } from '/@/config/app.config'
import { PUBLIC_PATH } from './helper'

const UPDATE_TIME = {
  HOURS_05: 1000 * 60 * 30,
  HOURS_6: 1000 * 60 * 60 * 6
}

export const startGitHubChartUpdater = () => {
  (function doUpdate() {
    axios.get(`https://ghchart.rshah.org/${GITHUB_UID}`, { timeout: 6000 })
      .then(response => {
        if (response.status === 200) {
          fs.writeFileSync(path.resolve(
            PUBLIC_PATH,
            'images',
            'ghchart.svg'
            ),
            response.data
          )
          console.log('GitHub Chart 更新成功', new Date())
          setTimeout(doUpdate, UPDATE_TIME.HOURS_6)
        } else {
          console.warn('GitHub Chart 更新失败', new Date(), response.data)
          setTimeout(doUpdate, UPDATE_TIME.HOURS_05)
        }
      })
      .catch(error => {
        console.warn('GitHub Chart 更新网络连接失败', new Date(), error.message, error?.toJSON())
        setTimeout(doUpdate, UPDATE_TIME.HOURS_05)
      })
  }())
}
