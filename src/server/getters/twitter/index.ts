/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */

import { IDENTITIES } from '@/config/app.config'
import { getterLogger } from '@/server/logger'
import { getSotweAggregate, improveSotweTweet, SotweTweet } from './sotwe'

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
  html: string
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
  const sotwe = await getSotweAggregate(IDENTITIES.TWITTER_USER_NAME).catch((error) => {
    getterLogger.warn('Twitter sotwe aggregate is empty.', error?.message ?? String(error))
    return null
  })

  if (!sotwe) {
    return Promise.reject('Twitter aggregate data is empty.')
  }

  const tweets: Array<TwitterTweet> = []
  const userinfo: TwitterUserinfo = {
    name: sotwe?.info?.name || IDENTITIES.TWITTER_USER_NAME,
    avatar: sotwe?.info?.profileImageOriginal || '',
    description: sotwe?.info.description || void 0,
    location: sotwe?.info.location || void 0,
    tweetCount: sotwe?.info.postCount ?? void 0,
    followerCount: sotwe?.info.followerCount ?? void 0,
    followingCount: sotwe?.info.followingCount ?? void 0
  }

  // sotwe all tweets
  const sotweTweets: SotweTweet[] = []
  if (sotwe?.data.length) {
    sotwe.data.forEach((item) => {
      sotweTweets.push(item)
      if (item.conversation?.length) {
        sotweTweets.push(...item.conversation)
      }
    })
  }

  sotweTweets.forEach((tweet) => {
    // not retweet
    if (tweet.retweetedStatus) {
      return
    }
    // not reply to other
    if (tweet.inReplyToUserId && tweet.inReplyToUserId !== sotwe.info.id) {
      return
    }
    // not your own tweet
    if (tweet.user && tweet.user.id !== sotwe.info.id) {
      return
    }

    tweets.push({
      id: tweet.id,
      owner: IDENTITIES.TWITTER_USER_NAME,
      text: improveSotweTweet(tweet, false),
      html: improveSotweTweet(tweet, true),
      date: tweet.createdAt,
      location: tweet.location?.name || void 0,
      favoriteCount: tweet.favoriteCount ?? void 0,
      retweetCount: tweet.retweetCount ?? void 0,
      mediaCount: tweet.mediaEntities?.length ?? 0,
      isReply: !!tweet.inReplyToUserId,
      isQuote: !!tweet.quotedStatus,
      isRetweet: !!tweet.retweetedStatus,
      hasVideo: tweet.mediaEntities?.some((media) => media.type === 'video'),
      hasImage: tweet.mediaEntities?.some((media) => media.type === 'photo')
    })
  })

  return { userinfo, tweets }
}
