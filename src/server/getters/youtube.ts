/**
 * @file BFF YouTube getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'
import { YOUTUBE_API_KEY } from '@/config/bff.yargs'

// 1. Generate API key
// https://console.cloud.google.com/apis/credentials

// 2. Get playlist by Channel ID
// https://developers.google.com/youtube/v3/docs/playlists/list
export const getYouTubeChannelPlayLists = async () => {
  const response = await axios.get<any>(`https://www.googleapis.com/youtube/v3/playlists`, {
    timeout: 8000,
    params: {
      part: 'snippet,contentDetails',
      maxResults: 50,
      channelId: IDENTITIES.YOUTUBE_CHANNEL_ID,
      key: YOUTUBE_API_KEY
    }
  })
  return response.data.items
}

// 3. Get video list by playlist ID
// https://developers.google.com/youtube/v3/docs/playlistItems/list
// MARK: can't order by date, max results 50
export const getYouTubeVideoListByPlayerlistId = async (playlistId: string) => {
  const response = await axios.get<any>(`https://www.googleapis.com/youtube/v3/playlistItems`, {
    timeout: 8000,
    params: {
      part: 'snippet,contentDetails',
      maxResults: 50,
      playlistId: playlistId,
      key: YOUTUBE_API_KEY
    }
  })
  return response.data.items
}
