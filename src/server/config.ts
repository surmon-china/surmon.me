/**
 * @file BFF Server configuration and path constants
 * @module server.config
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'
import { isNodeDev } from '@/server/env'
import { getOnlineApiURL, getLocalApiURL } from '@/config/bff.config'

// Keep it as a function, since the process.env variables are only valid after the application is completely run
export const getNodePressAPI = () => {
  const local = getLocalApiURL()
  const online = getOnlineApiURL()
  return isNodeDev ? local : online
}

export const ROOT_PATH = process.cwd()
export const DIST_PATH = path.join(ROOT_PATH, 'dist')
export const PROD_CLIENT_PATH = path.join(DIST_PATH, 'client')
export const PROD_SERVER_PATH = path.join(DIST_PATH, 'server')

export const PUBLIC_PATH = isNodeDev ? path.join(ROOT_PATH, 'public') : PROD_CLIENT_PATH
