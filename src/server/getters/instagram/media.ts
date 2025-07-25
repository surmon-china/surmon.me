import axios from '@/server/services/axios'
import { INSTAGRAM_TOKEN } from '@/configs/bff.args'

export interface InstagramMediaItem {
  id: string
  username: string
  caption?: string
  permalink: string
  media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO' | string
  media_url: string
  thumbnail_url?: string
  timestamp: string
  like_count: number
}

export interface InstagramMediaListResponse<T = InstagramMediaItem> {
  data: Array<T>
  paging: {
    next?: string
    cursors: {
      after?: string
      before?: string
    }
  }
}

export interface InstagramMediaGetterOptions {
  fields?: string
  limit?: number
  since?: number
  after?: string
}

// https://developers.facebook.com/docs/instagram-platform/reference/instagram-media
export const getInstagramMedias = async <T = InstagramMediaItem>(options?: InstagramMediaGetterOptions) => {
  try {
    const defaultFields = `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp,like_count`
    const params: Record<string, any> = {
      access_token: INSTAGRAM_TOKEN,
      fields: options?.fields ?? defaultFields,
      // MARK: max 100
      limit: options?.limit ?? 24
    }
    // MARK: unix timestamp
    if (options?.since) {
      params.since = options.since
    }
    // MARK: cursor
    if (options?.after) {
      params.after = options.after
    }

    const response = await axios.get<InstagramMediaListResponse<T>>('https://graph.instagram.com/me/media', {
      timeout: 8000,
      params
    })

    return response.data
  } catch (error: any) {
    throw error?.response?.data?.error?.message ?? error
  }
}

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media/children
export const getInstagramMediaChildren = (mediaId: string) => {
  const url = `https://graph.instagram.com/${mediaId}/children`
  const params = {
    access_token: INSTAGRAM_TOKEN,
    fields: `id,media_type,media_url,thumbnail_url,timestamp`
  }
  return axios
    .get<InstagramMediaListResponse>(url, { timeout: 8000, params })
    .then((response) => response.data.data)
    .catch((error) => Promise.reject(error?.response?.data?.error?.message ?? error))
}
