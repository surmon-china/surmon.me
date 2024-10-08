import axios, { isAxiosError } from '@/server/services/axios'
import { IDENTITIES } from '@/config/app.config'

export interface InstagramProfile {
  name: string
  avatar: string
  category: string
  biography: string
  mediaCount: number
  followerCount: number
  followingCount: number
}

// Unstable access to Instagram API
// https://stackoverflow.com/a/73376216/6222535
export const getInstagramProfile = async (): Promise<InstagramProfile> => {
  try {
    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${IDENTITIES.INSTAGRAM_USERNAME}`
    const agent =
      'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)'
    const response = await axios.get<any>(url, { timeout: 8000, headers: { 'User-Agent': agent } })
    if (response.data.status !== 'ok') {
      return Promise.reject(response.data)
    } else {
      return {
        name: response.data.data.user.full_name,
        avatar: response.data.data.user.profile_pic_url_hd,
        category: response.data.data.user.category_name,
        biography: response.data.data.user.biography,
        mediaCount: response.data.data.user.edge_owner_to_timeline_media.count,
        followerCount: response.data.data.user.edge_followed_by.count,
        followingCount: response.data.data.user.edge_follow.count
      }
    }
  } catch (error) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}
