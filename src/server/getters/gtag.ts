/**
 * @file BFF GA getter
 * @module server.getter.gtag
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { GA_MEASUREMENT_ID } from '@/config/app.config'
import { getGAScriptURL } from '@/transforms/outside'

export const getGTagScript = async () => {
  const response = await axios.get<string>(getGAScriptURL(GA_MEASUREMENT_ID), { timeout: 6000 })
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}
