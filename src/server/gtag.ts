/**
 * @file BFF GA updater
 * @module server.gtag
 * @author Surmon <https://github.com/surmon-china>
 */

import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { GA_MEASUREMENT_ID } from '@/config/app.config'
import { getGAScriptUrl } from '@/transforms/outside'
import { EFFECTS_PATH } from './helper'

const UPDATE_TIME = {
  HOURS_1: 1000 * 60 * 60 * 1,
  HOURS_24: 1000 * 60 * 60 * 24
}

export const startGTagScriptUpdater = () => {
  ;(function doUpdate() {
    axios
      .get<any>(getGAScriptUrl(GA_MEASUREMENT_ID), { timeout: 6000 })
      .then((response) => {
        if (response.status === 200) {
          fs.writeFileSync(path.resolve(EFFECTS_PATH, 'gtag.js'), response.data)
          console.info('[GA Script]', '更新成功', new Date())
          setTimeout(doUpdate, UPDATE_TIME.HOURS_24)
        } else {
          console.warn('[GA Script]', '更新失败', new Date(), response.data)
          setTimeout(doUpdate, UPDATE_TIME.HOURS_1)
        }
      })
      .catch((error) => {
        console.warn(
          '[GA Script]',
          '更新网络连接失败',
          new Date(),
          error.message,
          error?.toJSON?.()
        )
        setTimeout(doUpdate, UPDATE_TIME.HOURS_1)
      })
  })()
}
