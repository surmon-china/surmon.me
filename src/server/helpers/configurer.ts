/**
 * @file BFF Server helper
 * @module server.helper
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'
import { isDev } from '@/environment'

// MARK: 与非生产资料解耦
export const NODEPRESS_API = `https://api.surmon.me`

export const ROOT_PATH = process.cwd()
export const DIST_PATH = path.join(ROOT_PATH, 'dist')
export const PRDO_CLIENT_PATH = path.join(DIST_PATH, 'client')
export const PRDO_SERVER_PATH = path.join(DIST_PATH, 'server')

export const PUBLIC_PATH = isDev ? path.join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH
