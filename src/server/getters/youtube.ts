/**
 * @file BFF YouTube getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { argv } from 'yargs'
import { THIRD_IDS } from '@/config/app.config'

// 1. Generate API key
// https://console.cloud.google.com/apis/credentials
const token = argv.youtube_token

// 2. Get playlist by Channel ID
// https://developers.google.com/youtube/v3/docs/playlists/list
export const getYouTubeChannelPlayLists = async () => {
  const response = await axios.get<any>(`https://www.googleapis.com/youtube/v3/playlists`, {
    timeout: 8000,
    params: {
      part: 'snippet,contentDetails',
      maxResults: 50,
      channelId: THIRD_IDS.YOUTUBE_CHANNEL_ID,
      key: token
    }
  })
  if (response.status === 200 && response.data.items) {
    return response.data.items
  } else {
    throw response.data
  }
}

// 3. Get video list by playlist ID
// https://developers.google.com/youtube/v3/docs/playlistItems/list
// MARK: can't order by date, max results 50
export const getYouTubeVideoListByPlayerlistID = async (playlistID: string) => {
  const response = await axios.get<any>(`https://www.googleapis.com/youtube/v3/playlistItems`, {
    timeout: 8000,
    params: {
      part: 'snippet,contentDetails',
      maxResults: 50,
      playlistId: playlistID,
      key: token
    }
  })
  if (response.status === 200 && response.data.items) {
    return response.data.items
  } else {
    throw response.data
  }
}
