/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */

import { IDENTITIES } from '@/config/app.config'
import { getWebTwitterProfile, getWebTwitterUserTweets, GetTweetsParams } from './web-api'

export interface TwitterProfile {
  id: string
  name: string
  avatar: string
  createdAt?: number
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
  html: string
  date: number
  location?: string
  mediaCount: number
  favoriteCount?: number
  commentCount?: number
  retweetCount?: number
  quoteCount?: number
  viewCount?: number
  hasImage?: boolean
  hasVideo?: boolean
  isQuote?: boolean
  isReply: boolean
  isRetweet: boolean
  ref?: TwitterTweet
}

export interface TwitterTweetListResponse<T = TwitterTweet> {
  data: Array<T>
  cursors: {
    top?: string
    bottom?: string
  }
}

export interface TwitterAggregate {
  profile: TwitterProfile
  tweets: Array<TwitterTweet>
}

export const getTwitterProfile = (): Promise<TwitterProfile> => {
  return getWebTwitterProfile(IDENTITIES.TWITTER_USER_NAME)
}

export const getTwitterTweets = (params?: GetTweetsParams): Promise<TwitterTweetListResponse> => {
  return getWebTwitterUserTweets(IDENTITIES.TWITTER_USER_ID, params)
}
