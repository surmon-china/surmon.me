/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */

import { IDENTITIES } from '@/config/app.config'
import { getSotweAggregate, improveSotweTweet, SotweTweet } from './sotwe'
import { getNitterRss } from './nitter'

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
  // Use of different public services to ensure high availability
  const [nitter, sotwe] = await Promise.all([
    getNitterRss(IDENTITIES.TWITTER_USER_NAME).catch((error) => {
      console.warn('[Twitter] nitter rss is empty.', error?.message ?? String(error))
      return null
    }),
    getSotweAggregate(IDENTITIES.TWITTER_USER_NAME).catch((error) => {
      console.warn('[Twitter] sotwe aggregate is empty.', error?.message ?? String(error))
      return null
    })
  ])
  if (!nitter && !sotwe) {
    return Promise.reject('[Twitter] aggregate data is empty.')
  }

  const tweets: Array<TwitterTweet> = []
  const userinfo: TwitterUserinfo = {
    name: sotwe?.info?.name || nitter?.userinfo.name || IDENTITIES.TWITTER_USER_NAME,
    avatar: sotwe?.info?.profileImageOriginal || nitter?.userinfo.avatar || '',
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

  // 1. nitter & sotwe > mix
  // 2. nitter only
  if (nitter?.tweets.length) {
    nitter.tweets.forEach((tweet) => {
      // No longer reserved for reprinting retweet, as it causes data to be inconsistent in both the model and the front-end
      if (tweet.isRetweet) {
        return
      }

      const found = sotweTweets.find((item) => item.id === tweet.id)
      tweets.push({
        id: tweet.id,
        owner: tweet.owner,
        text: found ? improveSotweTweet(found, false) : tweet.text,
        html: found ? improveSotweTweet(found, true) : tweet.html,
        date: found?.createdAt || tweet.date,
        location: found?.location?.name || void 0,
        favoriteCount: found?.favoriteCount ?? void 0,
        retweetCount: found?.retweetCount ?? void 0,
        mediaCount: found?.mediaEntities?.length ?? tweet.mediaCount ?? 0,
        isReply: (found?.inReplyToUserId ? true : tweet.isReply) ?? void 0,
        isQuote: found ? !!found?.quotedStatus : void 0,
        isRetweet: (found?.retweetedStatus ? true : tweet.isRetweet) ?? void 0,
        hasVideo: found?.mediaEntities?.some((media) => media.type === 'video'),
        hasImage: found?.mediaEntities?.some((media) => media.type === 'photo') || tweet.hasImage
      })
    })
    // 3. sotwe only
  } else if (sotwe && sotweTweets.length) {
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
  }

  return { userinfo, tweets }
}
