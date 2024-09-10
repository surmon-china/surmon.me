import axios, { isAxiosError } from '@/server/services/axios'
import { WEB_SCRAPER_TOKEN } from '@/config/bff.yargs'
import { UNDEFINED } from '/@/constants/value'
import { isNodeDev } from '@/server/environment'
import type { TwitterTweet, TwitterProfile, TwitterAggregate } from './index'

export interface SotweUserInfo {
  id: string
  name: string
  screenName: string
  profileImageMedium: string
  profileImageOriginal: string
  verified: boolean
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
// So one has to look for third party online services, here are some of the available scraper services:
// - https://dashboard.scrape.do
// - https://dashboard.scraperapi.com
// - https://apilayer.com/marketplace/adv_scraper-api
// - https://app.zenrows.com
// - ...
const fetchSotweAggregate = async (twitterUsername: string): Promise<SotweAggregate> => {
  try {
    const target = `https://api.sotwe.com/v3/user/${twitterUsername}`
    // const scraper = `http://api.scrape.do/?token=${WEB_SCRAPER_TOKEN}&url=${target}`
    const scraper = `https://api.scraperapi.com/?api_key=${WEB_SCRAPER_TOKEN}&url=${target}`
    // To avoid wasting request credits, tokens are not used in development environments
    const response = await axios.get<SotweAggregate>(isNodeDev ? target : scraper, { timeout: 28000 })
    return response.data
  } catch (error: unknown) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}

const improveSotweTweet = (tweet: SotweTweet): string => {
  // remove new lines and multiple spaces
  // replace unknown characters
  let result = tweet.text.replaceAll('\n', ' ').replace(/ +/g, ' ').replaceAll('�', '_')
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
  const profile: TwitterProfile = {
    id: sotwe?.info?.id,
    name: sotwe?.info?.name || twitterUsername,
    avatar: sotwe?.info?.profileImageOriginal || '',
    description: sotwe?.info.description || UNDEFINED,
    location: sotwe?.info.location || UNDEFINED,
    tweetCount: sotwe?.info.postCount ?? UNDEFINED,
    followerCount: sotwe?.info.followerCount ?? UNDEFINED,
    followingCount: sotwe?.info.followingCount ?? UNDEFINED
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
      html: improveSotweTweet(tweet),
      date: tweet.createdAt,
      location: tweet.location?.name || UNDEFINED,
      favoriteCount: tweet.favoriteCount ?? UNDEFINED,
      retweetCount: tweet.retweetCount ?? UNDEFINED,
      mediaCount: tweet.mediaEntities?.length ?? 0,
      isReply: !!tweet.inReplyToUserId,
      isQuote: !!tweet.quotedStatus,
      isRetweet: !!tweet.retweetedStatus,
      hasVideo: tweet.mediaEntities?.some((media) => media.type === 'video'),
      hasImage: tweet.mediaEntities?.some((media) => media.type === 'photo')
    })
  })

  return { profile, tweets }
}
