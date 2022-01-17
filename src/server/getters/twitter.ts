/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { argv } from 'yargs'
import { THIRD_IDS } from '@/config/app.config'

// 1. Generate tokens
// https://developer.twitter.com/en/portal/projects-and-apps
const bearerToken = argv.twitter_bearer_token

// 2. Get userinfo
// https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username
const getTwitterUserinfoByUsername = async (username: string) => {
  const response = await axios.get<any>(`https://api.twitter.com/2/users/by/username/${username}`, {
    timeout: 8000,
    params: {
      'user.fields': `location,url,description,profile_image_url,public_metrics`
    },
    headers: {
      Authorization: `Bearer ${bearerToken}`
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
      Authorization: `Bearer ${bearerToken}`
    }
  })
  if (response.status === 200) {
    return response.data
  } else {
    throw response.data
  }
}

export const getTwitterUserinfo = () => {
  return getTwitterUserinfoByUsername(THIRD_IDS.TWITTER_USER_ID)
}

let uidCache: string | null = null
export const getTwitterTweets = async () => {
  uidCache = uidCache || ((await getTwitterUserinfo()).id as string)
  return await getTwitterTweetsByUID(uidCache)
}
