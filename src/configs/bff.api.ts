/**
 * @file BFF API configuration. These environment variables are injected via the BFF `dotenvx` plugin.
 * @module config/bff-api
 * @author Surmon <https://github.com/surmon-china>
 */

import { isNodeDev } from './bff.env'

export const STATIC_URL = process.env.VITE_STATIC_URL as string
export const API_ONLINE_URL = process.env.VITE_API_ONLINE_URL as string
export const API_LOCAL_URL = process.env.VITE_API_LOCAL_URL as string

export const NODEPRESS_API_URL = isNodeDev ? API_LOCAL_URL : API_ONLINE_URL
