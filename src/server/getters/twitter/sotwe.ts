import axios, { RawAxiosRequestHeaders, isAxiosError } from 'axios'

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

export const getSotweAggregate = async (twitterUsername: string): Promise<SotweAggregate> => {
  try {
    const url = `https://api.sotwe.com/v3/user/${twitterUsername}`
    // MARK: Don't try to simulate a browser request, it will be blocked by Cloudflare.
    const headers: RawAxiosRequestHeaders = {
      // 'User-Agent': 'PostmanRuntime/7.32.3'
    }
    const response = await axios.get<SotweAggregate>(url, { timeout: 8000, headers })
    return response.data
  } catch (error: unknown) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}
