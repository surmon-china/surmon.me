import axios, { isAxiosError } from '@/server/services/axios'
import { TWITTER_COOKIE } from '@/config/bff.yargs'
import type { TwitterProfile, TwitterTweet } from './index'

// https://blog.nest.moe/posts/how-to-login-to-twitter#cookie
// https://blog.nest.moe/posts/how-to-crawl-twitter-with-graphql#guest-token-cookie
// https://github.com/DIYgod/RSSHub/blob/master/lib/routes/twitter/api/web-api/utils.ts
const BASE_URL = 'https://x.com/i/api'

// prettier-ignore
// https://blog.nest.moe/posts/how-to-crawl-twitter-with-graphql#authorization
// https://github.com/DIYgod/RSSHub/blob/master/lib/routes/twitter/api/web-api/constants.ts
const bearerToken = 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA'

// prettier-ignore
// https://github.com/DIYgod/RSSHub/blob/master/lib/utils/rand-user-agent.ts
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

// https://github.com/DIYgod/RSSHub/blob/master/lib/routes/twitter/api/web-api/constants.ts
const gqlFeatureUser = {
  hidden_profile_likes_enabled: true,
  hidden_profile_subscriptions_enabled: true,
  responsive_web_graphql_exclude_directive_enabled: true,
  verified_phone_label_enabled: false,
  subscriptions_verification_info_is_identity_verified_enabled: true,
  subscriptions_verification_info_verified_since_enabled: true,
  highlights_tweets_tab_ui_enabled: true,
  responsive_web_twitter_article_notes_tab_enabled: true,
  creator_subscriptions_tweet_preview_api_enabled: true,
  responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
  responsive_web_graphql_timeline_navigation_enabled: true
}

const gqlFeatureFeed = {
  responsive_web_graphql_exclude_directive_enabled: true,
  verified_phone_label_enabled: false,
  creator_subscriptions_tweet_preview_api_enabled: true,
  responsive_web_graphql_timeline_navigation_enabled: true,
  responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
  c9s_tweet_anatomy_moderator_badge_enabled: true,
  tweetypie_unmention_optimization_enabled: true,
  responsive_web_edit_tweet_api_enabled: true,
  graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
  view_counts_everywhere_api_enabled: true,
  longform_notetweets_consumption_enabled: true,
  responsive_web_twitter_article_tweet_consumption_enabled: true,
  tweet_awards_web_tipping_enabled: false,
  freedom_of_speech_not_reach_fetch_enabled: true,
  standardized_nudges_misinfo: true,
  tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
  rweb_video_timestamps_enabled: true,
  longform_notetweets_rich_text_read_enabled: true,
  longform_notetweets_inline_media_enabled: true,
  responsive_web_enhance_cards_enabled: false
}

const gqlTweetDetailFeatures = {
  rweb_tipjar_consumption_enabled: true,
  responsive_web_graphql_exclude_directive_enabled: true,
  verified_phone_label_enabled: false,
  creator_subscriptions_tweet_preview_api_enabled: true,
  responsive_web_graphql_timeline_navigation_enabled: true,
  responsive_web_graphql_skip_user_profile_image_extensions_enabled: false,
  communities_web_enable_tweet_community_results_fetch: true,
  c9s_tweet_anatomy_moderator_badge_enabled: true,
  articles_preview_enabled: false,
  tweetypie_unmention_optimization_enabled: true,
  responsive_web_edit_tweet_api_enabled: true,
  graphql_is_translatable_rweb_tweet_is_translatable_enabled: true,
  view_counts_everywhere_api_enabled: true,
  longform_notetweets_consumption_enabled: true,
  responsive_web_twitter_article_tweet_consumption_enabled: true,
  tweet_awards_web_tipping_enabled: false,
  creator_subscriptions_quote_tweet_preview_enabled: false,
  freedom_of_speech_not_reach_fetch_enabled: true,
  standardized_nudges_misinfo: true,
  tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled: true,
  tweet_with_visibility_results_prefer_gql_media_interstitial_enabled: true,
  rweb_video_timestamps_enabled: true,
  longform_notetweets_rich_text_read_enabled: true,
  longform_notetweets_inline_media_enabled: true,
  responsive_web_enhance_cards_enabled: false
}

const gqlFeatures = {
  UserByScreenName: gqlFeatureUser,
  UserByRestId: gqlFeatureUser,
  UserTweets: gqlFeatureFeed,
  UserMedia: gqlFeatureFeed,
  Likes: gqlFeatureFeed,
  TweetDetail: gqlTweetDetailFeatures
}

const graphQLEndpointsMap = {
  UserByScreenName: '/graphql/k5XapwcSikNsEsILW5FvgA/UserByScreenName',
  UserByRestId: '/graphql/tD8zKvQzwY3kdx5yz6YmOw/UserByRestId',
  UserTweets: '/graphql/eS7LO5Jy3xgmd3dbL044EA/UserTweets',
  UserMedia: '/graphql/TOU4gQw8wXIqpSzA4TYKgg/UserMedia',
  Likes: '/graphql/B8I_QCljDBVfin21TTWMqA/Likes',
  TweetDetail: '/graphql/zJvfJs3gSbrVhC0MKjt_OQ/TweetDetail'
}

export const fetchTwitter = (url: string, params = {}) => {
  if (!TWITTER_COOKIE) {
    throw new Error('Twitter cookie is not configured')
  }

  const jsonCookie = Object.fromEntries(TWITTER_COOKIE.split(';').map((i) => i.trim().split('=')))
  if (!jsonCookie.auth_token || !jsonCookie.ct0) {
    throw new Error('Twitter cookie is not valid')
  }

  return axios(url, {
    params: params ?? {},
    headers: {
      'user-agent': userAgent,
      authority: 'x.com',
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: bearerToken,
      dnt: '1',
      pragma: 'no-cache',
      referer: 'https://x.com/narendramodi',
      'x-twitter-active-user': 'yes',
      'x-twitter-auth-type': 'OAuth2Session',
      'x-twitter-client-language': 'en',
      'x-csrf-token': jsonCookie.ct0,
      cookie: TWITTER_COOKIE
    }
  })
}

export const getWebTwitterProfile = async (twitterUsername: string): Promise<TwitterProfile> => {
  try {
    const response = await fetchTwitter(BASE_URL + graphQLEndpointsMap.UserByScreenName, {
      variables: JSON.stringify({
        screen_name: twitterUsername,
        withSafetyModeUserFields: true
      }),
      features: JSON.stringify(gqlFeatures.UserByScreenName),
      fieldToggles: JSON.stringify({
        withAuxiliaryUserLabels: false
      })
    })

    const userId = response.data.data.user.result.rest_id
    const userInfo = response.data.data.user.result.legacy
    return {
      id: userId,
      name: userInfo?.name,
      avatar: userInfo?.profile_image_url_https.replace(/_normal.jpg$/, '.jpg'),
      createdAt: new Date(userInfo?.created_at).getTime(),
      description: userInfo?.description,
      location: userInfo.location,
      tweetCount: userInfo.statuses_count,
      followerCount: userInfo.followers_count,
      followingCount: userInfo.friends_count
    }
  } catch (error: unknown) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}

export interface GetTweetsParams {
  count?: number
  cursor?: string
  [key: string]: any
}

// https://github.com/DIYgod/RSSHub/blob/master/lib/routes/twitter/api/web-api/utils.ts#L88C1-L114C3
export const getWebTwitterUserTweets = async (userId: string, params?: GetTweetsParams) => {
  try {
    const response = await fetchTwitter(BASE_URL + graphQLEndpointsMap.UserTweets, {
      features: JSON.stringify(gqlFeatures.UserTweets),
      variables: JSON.stringify({
        userId,
        ...params,
        // MARK: Whatever the setting, it's actually 20
        count: 20,
        includePromotedContent: true,
        withQuickPromoteEligibilityTweetFields: true,
        withVoice: true,
        withV2Timeline: true
      })
    })

    // Getting the right raw data
    const instructions = response.data?.data?.user?.result?.timeline_v2?.timeline?.instructions ?? []
    const entries1 = instructions.find((i) => i.type === 'TimelineAddToModule')?.moduleItems // Media
    const entries2 = instructions.find((i) => i.type === 'TimelineAddEntries').entries
    const entries: any[] = entries1 || entries2

    // Converting data structures
    const tweets: TwitterTweet[] = []
    const topCursor = entries.find((e) => e.entryId?.startsWith?.('cursor-top-'))?.content.value
    const bottomCursor = entries.find((e) => e.entryId?.startsWith?.('cursor-bottom-'))?.content.value

    const parseSingleTweet = (tweet: any, references?: any[]): TwitterTweet => {
      const user = tweet.core.user_results?.result
      const tweetMedias: any[] = tweet.legacy?.entities?.media ?? []
      const tweetUrls: any[] = tweet.legacy?.entities?.urls ?? []
      const tweetDisplayTextRange = tweet.legacy.display_text_range
      const tweetFullText = tweet.legacy.full_text
      // remove medias url in full text
      // MARK: Split Emoji https://stackoverflow.com/a/37535876/6222535
      const pureText = [...tweetFullText].slice(...tweetDisplayTextRange).join('')
      // replace url with link
      const htmlText = !tweetUrls.length
        ? pureText
        : tweetUrls.reduce((result, url) => {
            const linkHtml = `<a class="link" rel="external nofollow noopener" target="_blank" href="${url.expanded_url}">[${url.display_url}]</a>`
            const [start, end] = url.indices
            return result.substring(0, start) + linkHtml + result.substring(end)
          }, pureText)

      const result: TwitterTweet = {
        id: tweet.legacy.id_str,
        owner: user?.legacy?.screen_name,
        text: pureText,
        html: htmlText,
        date: new Date(tweet.legacy.created_at).getTime(),
        location: tweet.legacy.place?.country,
        viewCount: Number(tweet.views?.count ?? 0),
        favoriteCount: tweet.legacy.favorite_count,
        commentCount: tweet.legacy.reply_count,
        retweetCount: tweet.legacy.retweet_count,
        quoteCount: tweet.legacy.quote_count,
        mediaCount: tweetMedias.length,
        hasImage: tweetMedias.some((media) => media.type === 'photo'),
        hasVideo: tweetMedias.some((media) => media.type === 'video'),
        isQuote: tweet.legacy.is_quote_status,
        isReply: !!tweet.legacy.in_reply_to_status_id_str,
        isRetweet: tweet.legacy.retweeted
      }

      if (result.isQuote && tweet.quoted_status_result) {
        result.ref = parseSingleTweet(tweet.quoted_status_result.result)
      } else if (result.isRetweet && tweet.legacy.retweeted_status_result) {
        result.ref = parseSingleTweet(tweet.legacy.retweeted_status_result.result)
      } else if (result.isReply) {
        const refId = tweet.legacy.in_reply_to_status_id_str
        const refTarget = references?.find((ref) => ref.rest_id === refId)
        if (refTarget) {
          result.ref = parseSingleTweet(refTarget)
        }
      }

      return result
    }

    entries.forEach((entry) => {
      if (entry.entryId.startsWith('tweet-')) {
        tweets.push(parseSingleTweet(entry.content.itemContent.tweet_results.result))
      } else if (entry.entryId.startsWith('profile-conversation-')) {
        const conversationTweets = entry.content.items.map((i) => i.item.itemContent.tweet_results.result)
        conversationTweets.forEach((tweet) => {
          tweets.push(parseSingleTweet(tweet, conversationTweets))
        })
      }
    })

    return {
      data: tweets,
      cursors: {
        top: topCursor,
        bottom: bottomCursor
      }
    }
  } catch (error: unknown) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}
