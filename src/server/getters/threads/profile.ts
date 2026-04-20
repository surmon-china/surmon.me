import axios from '@/server/services/axios'
import { THREADS_TOKEN } from '@/configs/bff.env'

export interface ThreadsProfile {
  id: string
  name: string
  username: string
  avatar_url: string
  biography: string
  followers_count: number // Total number of followers.
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
      avatar_url: response.data.threads_profile_picture_url,
      biography: response.data.threads_biography
    } satisfies Partial<ThreadsProfile>
  } catch (error: any) {
    throw error.response?.data?.error?.message ?? error
  }
}

const getThreadsUserFollowersCount = async () => {
  try {
    // https://developers.facebook.com/docs/threads/insights
    const uri = 'https://graph.threads.net/v1.0/me/threads_insights'
    // MARK: Per the documentation, `followers_count` always reflects the latest real-time value, regardless of the `since` and `until` parameters.
    const metric = 'followers_count'
    const response = await axios.get<any>(uri, {
      params: { access_token: THREADS_TOKEN, metric },
      timeout: 8000
    })
    // MARK: data.data[index] follow the `metric`'s order
    return response.data.data[0].total_value.value as number
  } catch (error: any) {
    throw error.response?.data?.error?.message ?? error
  }
}

export const getThreadsProfile = async (): Promise<ThreadsProfile> => {
  const [userProfile, followersCount] = await Promise.all([
    getThreadsUserProfile(),
    getThreadsUserFollowersCount()
  ])

  return {
    ...userProfile,
    followers_count: followersCount
  }
}
