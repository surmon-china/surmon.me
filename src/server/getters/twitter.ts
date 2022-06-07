/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { IDENTITIES } from '@/config/app.config'
import { TWITTER_BEARER_TOKEN } from '@/config/bff.argv'

// 1. Generate tokens
// https://developer.twitter.com/en/portal/projects-and-apps

// 2. Get userinfo
// https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username
const getTwitterUserinfoByUsername = async (username: string) => {
  const response = await axios.get<any>(`https://api.twitter.com/2/users/by/username/${username}`, {
    timeout: 8000,
    params: {
      'user.fields': `location,url,description,profile_image_url,public_metrics`
    },
    headers: {
      Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
    }
  })
  if (response.status === 200 && response.data.data) {
    return response.data.data
  } else {
    throw response.data
  }
}

// 3. Get tweets
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
const getTwitterTweetsByUID = async (UID: string) => {
  const response = await axios.get<any>(`https://api.twitter.com/2/users/${UID}/tweets`, {
    timeout: 8000,
    params: {
      exclude: 'replies',
      expansions: `attachments.media_keys,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id`,
      'tweet.fields': `attachments,author_id,context_annotations,conversation_id,created_at,entities,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld`,
      'user.fields': `created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`,
      'place.fields': `contained_within,country,country_code,full_name,id,name,place_type`,
      'media.fields': `duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics`,
      max_results: 46
    },
    headers: {
      Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
    }
  })
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}

export const getTwitterUserinfo = () => {
  return getTwitterUserinfoByUsername(IDENTITIES.TWITTER_USER_NAME)
}

let uidCache: string | null = null
const ensureUID = async () => {
  if (uidCache) {
    return uidCache
  } else {
    uidCache = (await getTwitterUserinfo()).id as string
    return uidCache
  }
}

export const getTwitterTweets = async () => {
  const uid = await ensureUID()
  return await getTwitterTweetsByUID(uid)
}

// ---------------------------------------------------------
// Tweets calendar

const fetchPageTweets = async (startTime: string, pagination_token?: string) => {
  const uid = await ensureUID()
  return axios
    .get<any>(`https://api.twitter.com/2/users/${uid}/tweets`, {
      timeout: 8000,
      params: {
        'tweet.fields': `id,created_at`,
        start_time: startTime,
        pagination_token,
        max_results: 100
      },
      headers: {
        Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
      }
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        return Promise.reject(response.data)
      }
    })
    .catch((error) => {
      return Promise.reject(error.toJSON())
    })
}

interface AllTweetsFetchParams {
  startTime: string
  nextToken?: string
  tweets?: Tweets
  onSucceed?(tweets: Tweets)
  onFailed?(error: any)
}

function doFetchAllTweets({
  startTime,
  nextToken,
  tweets = [],
  onSucceed,
  onFailed
}: AllTweetsFetchParams) {
  fetchPageTweets(startTime, nextToken)
    .then((result: any) => {
      if (result.data) {
        tweets.push(...result.data)
      }
      if (result.meta.next_token) {
        doFetchAllTweets({
          startTime,
          nextToken: result.meta.next_token,
          tweets,
          onSucceed,
          onFailed
        })
      } else {
        onSucceed?.(tweets)
      }
    })
    .catch(onFailed)
}

type Tweets = Array<{ text: string; id: string; created_at: string }>
const calendarTemp = {
  tweets: [] as Tweets,
  calendar: [] as Array<{ count: number; date: string }>
}

function fetchAllTweets() {
  console.info(`[BFF] twitter.fetchAllTweets`)
  calendarTemp.tweets = []
  calendarTemp.calendar = []

  // startTime
  const today = new Date()
  today.setDate(1)
  today.setFullYear(today.getFullYear() - 1)
  const prevYearToday = today.toISOString()

  doFetchAllTweets({
    startTime: prevYearToday,
    onSucceed: (tweets) => {
      console.info(
        `[BFF] twitter.fetchAllTweets done, ${tweets.length} tweets. refetch when after 18h`
      )
      setTimeout(() => fetchAllTweets(), 18 * 60 * 60 * 1000)
      const map = new Map<string, number>()
      tweets.forEach((tweet) => {
        const key = tweet.created_at.slice(0, 10)
        map.has(key) ? map.set(key, map.get(key)! + 1) : map.set(key, 1)
      })
      calendarTemp.calendar = Array.from(map, ([date, count]) => ({ date, count }))
    },
    onFailed: (error) => {
      console.warn(`[BFF] twitter.fetchAllTweets error, retry when after 30s`, error)
      setTimeout(() => fetchAllTweets(), 30 * 1000)
    }
  })
}

export const initTwitterCalendar = () => fetchAllTweets()
export const getTwitterCalendar = async () => calendarTemp.calendar
