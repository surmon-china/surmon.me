/**
 * @file BFF GA getter
 * @module server.getter.gtag
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'
import { getGaScriptURL } from '@/transforms/gtag'

export const getGTagScript = async () => {
  const url = getGaScriptURL(IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID)
  const response = await axios.get<string>(url, { timeout: 6000 })
  return response.data
}
