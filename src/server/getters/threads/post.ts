import axios, { isAxiosError } from '@/server/services/axios'
import { THREADS_TOKEN } from '@/config/bff.yargs'

export interface ThreadsMedia {
  id: string
  media_product_type: 'THREADS'
  media_type: 'TEXT_POST' | 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'AUDIO' | 'REPOST_FACADE'
  media_url?: string
  permalink: string
  owner: Record<string, string>
  username: string
  text: string
  timestamp: string
  shortcode: string
  is_quote_post: boolean
  children?: {
    data: Array<{
      id: string
    }>
  }
}

export interface ThreadsMediaListResponse<T = ThreadsMedia> {
  data: Array<T>
  paging: {
    cursors: {
      after?: string
      before?: string
    }
  }
}

export interface ThreadsMediaGetterOptions {
  fields?: string
  limit?: number
  since?: number
  after?: string
}

const THREADS_MEDIA_FULL_FIELDS = `id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post`

// https://developers.facebook.com/docs/threads/threads-media
export const getThreadsMedias = async <T = ThreadsMedia>(options?: ThreadsMediaGetterOptions) => {
  try {
    const uri = 'https://graph.threads.net/v1.0/me/threads'
    const params: Record<string, any> = {
      access_token: THREADS_TOKEN,
      fields: options?.fields ?? THREADS_MEDIA_FULL_FIELDS,
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

    const response = await axios.get<ThreadsMediaListResponse<T>>(uri, { timeout: 8000, params })
    return response.data
  } catch (error) {
    throw isAxiosError(error) ? (error.response?.data?.error ?? error.toJSON()) : error
  }
}

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media/children
export const getThreadsMediaChildren = (threadsMediaId: string) => {
  const uri = `https://graph.threads.net/v1.0/${threadsMediaId}`
  const params = {
    access_token: THREADS_TOKEN,
    fields: THREADS_MEDIA_FULL_FIELDS
  }
  return axios
    .get<ThreadsMediaListResponse>(uri, { timeout: 8000, params })
    .then((response) => response.data.data)
    .catch((error) => {
      return Promise.reject(isAxiosError(error) ? (error.response?.data?.error ?? error.toJSON()) : error)
    })
}
