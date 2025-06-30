import axios, { isAxiosError } from '@/server/services/axios'
import { INSTAGRAM_TOKEN } from '@/configs/bff.args'

export interface InstagramProfile {
  id: string
  username: string
  account_type: 'BUSINESS' | 'MEDIA_CREATOR' | 'PERSONAL'
  media_count: number
}

// https://developers.facebook.com/docs/instagram-basic-display-api/reference/user
export const getInstagramProfile = () => {
  const params = {
    access_token: INSTAGRAM_TOKEN,
    fields: `id,username,account_type,media_count`
  }
  return axios
    .get<InstagramProfile>(`https://graph.instagram.com/me`, { timeout: 8000, params })
    .then((response) => response.data)
    .catch((error) => {
      return Promise.reject(isAxiosError(error) ? (error.response?.data?.error ?? error.toJSON()) : error)
    })
}
