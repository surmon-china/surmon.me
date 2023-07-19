/**
 * @file BFF instagram getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */

import axios, { AxiosError } from 'axios'
import { IDENTITIES } from '@/config/app.config'
import { INSTAGRAM_TOKEN } from '@/config/bff.yargs'

// 1. Generate long-lived access tokens for Instagram Testers (60 days)
// https://developers.facebook.com/apps/625907498725071/instagram-basic-display/basic-display/

// 2. Get medias useing API
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields

// 3. TODO: Refresh token
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/refresh_access_token

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
  const fields = `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp`
  const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${INSTAGRAM_TOKEN}`
  const response = await axios.get<{ data: Array<InstagramMediaItem> }>(url, { timeout: 8000 })
  return response.data.data
}

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media
const fetchPageMedias = (sinceUnix: number, nextToken?: string) => {
  return axios
    .get<any>(`https://graph.instagram.com/v13.0/${IDENTITIES.INSTAGRAM_FB_ID}/media`, {
      timeout: 8000,
      params: {
        access_token: INSTAGRAM_TOKEN,
        fields: `id,timestamp`,
        limit: 100, // MARK: max 100
        since: sinceUnix,
        after: nextToken
      }
    })
    .then((response) => response.data)
    .catch((error: AxiosError) => Promise.reject(error.toJSON()))
}

interface AllMediasFetchParams {
  sinceUnix: number
  nextToken?: string
  medias?: Array<InstagramMediaItem>
  onSucceed?(medias: Array<InstagramMediaItem>)
  onFailed?(error: any)
}

function doFetchAllMedias({ sinceUnix, nextToken, medias = [], onSucceed, onFailed }: AllMediasFetchParams) {
  fetchPageMedias(sinceUnix, nextToken)
    .then((result: any) => {
      medias.push(...result.data)
      if (result.paging.next) {
        doFetchAllMedias({
          nextToken: result.paging.cursors.after,
          sinceUnix,
          medias,
          onSucceed,
          onFailed
        })
      } else {
        onSucceed?.(medias)
      }
    })
    .catch(onFailed)
}

const calendarTemp = {
  data: [] as Array<{ date: string; count: number }>
}

function fetchAllMedias() {
  console.info('[BFF] instagram.fetchAllMedias...')
  calendarTemp.data = []

  // startTime: Only get the most recent 12 months of data
  const today = new Date()
  today.setDate(1)
  today.setFullYear(today.getFullYear() - 1)
  const prevYearToday = Math.round(today.getTime() / 1000)

  doFetchAllMedias({
    sinceUnix: prevYearToday,
    onSucceed: (medias) => {
      console.info(`[BFF] instagram.fetchAllMedias done, ${medias.length} medias. refetch when after 18h`)
      setTimeout(() => fetchAllMedias(), 18 * 60 * 60 * 1000)
      const map = new Map<string, number>()
      medias.forEach((media) => {
        const key = media.timestamp.slice(0, 10)
        map.has(key) ? map.set(key, map.get(key)! + 1) : map.set(key, 1)
      })
      calendarTemp.data = Array.from(map, ([date, count]) => ({ date, count }))
    },
    onFailed: (error) => {
      console.warn(`[BFF] instagram.fetchAllMedias failed, retry when after 30s`, error)
      setTimeout(() => fetchAllMedias(), 30 * 1000)
    }
  })
}

export const initInstagramCalendar = () => fetchAllMedias()
export const getInstagramCalendar = async () => calendarTemp.data
