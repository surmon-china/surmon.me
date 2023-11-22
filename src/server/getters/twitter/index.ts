/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */

import { IDENTITIES } from '@/config/app.config'
import { UNDEFINED } from '@/constants/value'
import { createLogger } from '@/utils/logger'
import { getSotweTwitterAggregate } from './sotwe-api'
import { getNitterTweets } from './nitter-html'

const logger = createLogger('BFF:Twitter')

export interface TwitterUserinfo {
  name: string
  avatar: string
  description?: string
  location?: string
  tweetCount?: number
  followerCount?: number
  followingCount?: number
}

export interface TwitterTweet {
  id: string
  owner: string
  text: string
  date: number
  location?: string
  mediaCount: number
  favoriteCount?: number
  retweetCount?: number
  commentCount?: number
  hasImage?: boolean
  hasVideo?: boolean
  isQuote?: boolean
  isReply: boolean
  isRetweet: boolean
}

export interface TwitterAggregate {
  userinfo: TwitterUserinfo
  tweets: Array<TwitterTweet>
}

export const getTwitterAggregate = async (): Promise<TwitterAggregate> => {
  const [sotwe, nitter] = await Promise.allSettled([
    getSotweTwitterAggregate(IDENTITIES.TWITTER_USER_NAME),
    getNitterTweets(IDENTITIES.TWITTER_USER_NAME)
  ])

  if (sotwe.status === 'rejected') {
    throw sotwe.reason
  }

  if (nitter.status === 'rejected') {
    logger.failure('Get Nitter tweets failed:', nitter.reason)
    return sotwe.value
  }

  const sotweAggregate = sotwe.value
  const nitterTweets = nitter.value

  const resolvedTweets = sotweAggregate.tweets.map((tweet) => {
    const found = nitterTweets.find((t) => t.id === tweet.id)
    return {
      ...tweet,
      text: found?.text ?? tweet.text,
      commentCount: found?.commentCount ?? tweet.commentCount ?? UNDEFINED,
      favoriteCount: found?.favoriteCount ?? tweet.favoriteCount ?? UNDEFINED
    }
  })

  return { ...sotweAggregate, tweets: resolvedTweets }
}
