/**
 * @file BFF yargs config
 * @module config.bff.yargs
 * @author Surmon <https://github.com/surmon-china>
 */

import yargs from 'yargs'
const argv = yargs(process.argv.slice(2)).argv

export const GITHUB_BEARER_TOKEN = argv.github_token
export const INSTAGRAM_TOKEN = argv.instagram_token
export const YOUTUBE_API_KEY = argv.youtube_token
