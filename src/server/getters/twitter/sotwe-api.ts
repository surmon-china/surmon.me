import axios, { isAxiosError } from '@/server/services/axios'
import { SOTWE_SCRAPER_TOKEN } from '@/config/bff.yargs'
import { isNodeDev } from '@/server/environment'

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

export const improveSotweTweet = (tweet: SotweTweet, resultHTML = false): string => {
  let result = tweet.text.replaceAll('\n', ' ')
  // remove media urls
  tweet.mediaEntities?.forEach((media) => {
    result = result.replace(media.url, '')
  })
  // replace url with link
  tweet.urlEntities?.forEach((url) => {
    result = result.replace(
      url.url,
      !resultHTML
        ? url.text
        : `<a
            class="link"
            target="_blank"
            rel="external nofollow noopener"
            title="${url.expandedURL}"
            href="${url.expandedURL}"
          >${url.displayURL}</a>`
    )
  })
  return result
}

// Don't try to simulate a browser request, it will be blocked by Cloudflare.
// Can't make requests based on headless browsers because it takes up too much memory
// So one has to look for third party online services, here are some of the available crawler services:
// - https://dashboard.scrape.do
// - https://apilayer.com/marketplace/adv_scraper-api
// - ...
export const getSotweAggregate = async (twitterUsername: string): Promise<SotweAggregate> => {
  try {
    const target = `https://api.sotwe.com/v3/user/${twitterUsername}`
    const scraper = `http://api.scrape.do/?token=${SOTWE_SCRAPER_TOKEN}&url=${target}`
    // To avoid wasting request credits, tokens are not used in development environments
    const response = await axios.get<SotweAggregate>(isNodeDev ? target : scraper)
    return response.data
  } catch (error: unknown) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}
