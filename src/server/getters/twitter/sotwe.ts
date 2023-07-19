import superagent from 'superagent'

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

const agent = superagent.agent()

export const getSotweAggregate = (twitterUsername: string): Promise<SotweAggregate> => {
  return agent
    .get(`https://api.sotwe.com/v3/user/${twitterUsername}`)
    .set('referer', 'https://www.sotwe.com/')
    .set('Origin', 'https://www.sotwe.com')
    .set('Accept', 'application/json, text/plain, */*')
    .set('Accept-Language', 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-TW;q=0.6')
    .set(
      'User-Agent',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
    )
    .then((response) => response.body)
}
