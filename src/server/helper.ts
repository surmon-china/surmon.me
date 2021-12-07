/**
 * @file BFF Server helper
 * @module server.helper
 * @author Surmon <https://github.com/surmon-china>
 */

import fs from 'fs'
import path from 'path'
import { isDev } from '@/environment'

export const ROOT_PATH = process.cwd()
export const PRDO_CLIENT_PATH = path.join(ROOT_PATH, 'dist', 'client')
export const PRDO_SERVER_PATH = path.join(ROOT_PATH, 'dist', 'server')

export const PUBLIC_PATH = isDev ? path.join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH
export const EFFECTS_PATH = path.join(PUBLIC_PATH, 'effects')

export const packageJSON = JSON.parse(
  fs.readFileSync(path.resolve(ROOT_PATH, 'package.json'), 'utf-8')
)
