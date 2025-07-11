import axios from '@/server/services/axios'
import { THREADS_TOKEN } from '@/configs/bff.args'

export interface ThreadsProfile {
  // profile
  id: string
  name: string
  username: string
  avatar: string
  biography: string

  // insights
  totalLikes: number // The number of likes on your posts.
  totalReposts: number // The number of replies on your posts. (This number includes only top-level replies.)
  totalQuotes: number // The number of times your posts were reposted.
  followersCount: number // Your total number of followers on Threads.
}

const getThreadsUserProfile = async () => {
  try {
    // https://developers.facebook.com/docs/threads/threads-profiles
    const uri = 'https://graph.threads.net/v1.0/me'
    const fields = 'id,username,name,threads_profile_picture_url,threads_biography'
    const response = await axios.get<any>(uri, {
      params: { access_token: THREADS_TOKEN, fields },
      timeout: 8000
    })

    return {
      id: response.data.id,
      name: response.data.name,
      username: response.data.username,
      avatar: response.data.threads_profile_picture_url,
      biography: response.data.threads_biography
    }
  } catch (error: any) {
    throw error.response?.data?.error?.message ?? error
  }
}

const getThreadsUserInsights = async () => {
  try {
    // https://developers.facebook.com/docs/threads/insights
    const uri = 'https://graph.threads.net/v1.0/me/threads_insights'
    const metric = 'likes,reposts,quotes,followers_count'
    const response = await axios.get<any>(uri, {
      params: { access_token: THREADS_TOKEN, metric },
      timeout: 8000
    })

    // MARK: data.data[index] follow the `metric`'s order
    return {
      totalLikes: response.data.data[0].total_value.value,
      totalReposts: response.data.data[1].total_value.value,
      totalQuotes: response.data.data[2].total_value.value,
      followersCount: response.data.data[3].total_value.value
    }
  } catch (error: any) {
    throw error.response?.data?.error?.message ?? error
  }
}

export const getThreadsProfile = async (): Promise<ThreadsProfile> => {
  const [userProfile, userInsights] = await Promise.all([getThreadsUserProfile(), getThreadsUserInsights()])
  return {
    ...userProfile,
    ...userInsights
  }
}
