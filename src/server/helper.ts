/**
 * @file BFF Server helper
 * @module server.helper
 * @author Surmon <https://github.com/surmon-china>
 */

import path from 'path'

export const ROOT_PATH = process.cwd()
export const PUBLIC_PATH = path.join(ROOT_PATH, 'public')
export const PRDO_CLIENT_PATH = path.join(ROOT_PATH, 'dist', 'client')
export const PRDO_SERVER_PATH = path.join(ROOT_PATH, 'dist', 'server')
