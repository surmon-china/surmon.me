import axios, { isAxiosError } from '@/server/services/axios'
import { SOTWE_SCRAPER_TOKEN } from '@/config/bff.yargs'
import { isNodeDev } from '@/server/environment'
import type { TwitterTweet, TwitterUserinfo, TwitterAggregate } from './index'

export interface SotweUserInfo {
  name: string
  screenName: string
  profileImageMedium: string
  profileImageOriginal: string
  verified: boolean
  id: string
  location: string
  description: string
  urlEntity: {
    text: string
    url: string
    expandedURL: string
    displayURL: string
    start: number
    end: number
  }
  url: string
  createdAt: number
  followingCount: number
  followerCount: number
  favouritesCount: number
  postCount: number
  listedCount: number
  profileBannerOriginal: string
  geoEnabled: boolean
  userProtected: boolean
  possiblySensitive: boolean
  profileInterstitialType: string
}

export interface SotweTweet {
  id: string
  text: string
  lang: string
  createdAt: number
  user?: SotweUserInfo
  userMentionEntities?: Array<any>
  urlEntities?: Array<{
    text: string
    url: string
    expandedURL: string
    displayURL: string
    start: number
    end: number
  }>
  mediaEntities?: Array<{
    id: string
    url: string
    mediaURL: string
    expandedURL: string
    displayURL: string
    type: 'photo' | 'video' | 'animated_gif'
    text: string
  }>
  location?: {
    id: string
    name: string
    countryCode: string
    country: string
    placeType: string
    url: string
    fullName: string
    lat: number
    lng: number
  }
  favoriteCount: 0
  retweetCount: 0
  pinned: false
  possiblySensitive: false
  ageRestricted: false
  truncated: false
  quotedStatus?: SotweTweet
  retweetedStatus?: SotweTweet
  conversation?: Array<SotweTweet>
  inReplyToUserId?: string
}

export interface SotweAggregate {
  data: Array<SotweTweet>
  info: SotweUserInfo
}

// Don't try to simulate a browser request, it will be blocked by Cloudflare.
// Can't make requests based on headless browsers because it takes up too much memory
// So one has to look for third party online services, here are some of the available crawler services:
// - https://dashboard.scrape.do
// - https://apilayer.com/marketplace/adv_scraper-api
// - ...
const fetchSotweAggregate = async (twitterUsername: string): Promise<SotweAggregate> => {
  try {
    const target = `https://api.sotwe.com/v3/user/${twitterUsername}`
    const scraper = `http://api.scrape.do/?token=${SOTWE_SCRAPER_TOKEN}&url=${target}`
    // To avoid wasting request credits, tokens are not used in development environments
    const response = await axios.get<SotweAggregate>(isNodeDev ? target : scraper, { timeout: 18000 })
    return response.data
  } catch (error: unknown) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}

const improveSotweTweet = (tweet: SotweTweet): string => {
  let result = tweet.text.replaceAll('\n', ' ').replace(/ +/g, ' ')
  // remove media urls
  tweet.mediaEntities?.forEach((media) => {
    result = result.replace(media.url, '')
  })
  // replace url with link
  tweet.urlEntities?.forEach((url) => {
    result = result.replace(url.url, url.text)
  })
  return result
}

export const getSotweTwitterAggregate = async (twitterUsername: string): Promise<TwitterAggregate> => {
  const sotwe = await fetchSotweAggregate(twitterUsername)
  const tweets: Array<TwitterTweet> = []
  const userinfo: TwitterUserinfo = {
    name: sotwe?.info?.name || twitterUsername,
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
      owner: twitterUsername,
      text: improveSotweTweet(tweet),
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
