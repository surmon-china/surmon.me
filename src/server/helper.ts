/**
 * @file BFF Server helper
 * @module server/helper
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'
import { NODE_ENV } from '../environment'
import type { UserConfig } from 'vite'

/**
 * dist
 * |- server.js
 * data
 * public
*/
export const APP_PATH = path.join(__dirname)
export const ROOT_PATH = path.join(APP_PATH, '..')
export const DATA_PATH = path.join(ROOT_PATH, 'data')
export const PUBLIC_PATH = path.join(ROOT_PATH, 'public')

// config
export const viteConfig: UserConfig = require(path.join(ROOT_PATH, 'vite.config'))(NODE_ENV)
