/**
 * @file BFF instagram getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { argv } from 'yargs'

// 1. Generate long-lived access tokens for Instagram Testers
// https://developers.facebook.com/apps/625907498725071/instagram-basic-display/basic-display/?business_id=277570526188879

// 2. Get medias useing API
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields

// 3. TODO: Refresh token
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/refresh_access_token
const fields = `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp`
const token = argv.instagram_token

export interface InstagramMediaItem {
  id: string
  username: string
  caption?: string
  permalink: string
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO' | string
  media_url: string
  thumbnail_url?: string
  timestamp: string
}

export const getInstagramMedias = async () => {
  const response = await axios.get<{ data: Array<InstagramMediaItem> }>(
    `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`,
    { timeout: 8000 }
  )
  if (response.status === 200 && response.data.data) {
    return response.data.data
  } else {
    throw response.data
  }
}
