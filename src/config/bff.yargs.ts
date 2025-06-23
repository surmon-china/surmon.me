/**
 * @file BFF yargs config
 * @module config.bff.yargs
 * @author Surmon <https://github.com/surmon-china>
 */

import yargsArgv from 'yargs-parser'
const argv = yargsArgv(process.argv.slice(2))

export const YOUTUBE_API_KEY = argv.youtube_token
export const INSTAGRAM_TOKEN = argv.instagram_token
export const THREADS_TOKEN = argv.threads_token
