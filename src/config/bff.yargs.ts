/**
 * @file BFF yargs config
 * @module config.bff.yargs
 * @author Surmon <https://github.com/surmon-china>
 */

import yargs from 'yargs'
const argv = yargs(process.argv.slice(2)).argv

export const YOUTUBE_API_KEY = argv.youtube_token
export const INSTAGRAM_TOKEN = argv.instagram_token
export const THREADS_TOKEN = argv.threads_token
export const ZHIHU_COOKIE = '' ?? argv.zhihu_cookie
