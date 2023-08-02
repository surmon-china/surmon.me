import { getInstagramMedias } from './media'

interface InstagramBasicMediaItem {
  id: string
  timestamp: string
}

interface AllMediasFetchParams {
  since: number
  after?: string
  medias?: Array<InstagramBasicMediaItem>
  onSucceed?(medias: Array<InstagramBasicMediaItem>)
  onFailed?(error: unknown)
}

function doFetchAllMedias({ since, after, medias = [], onSucceed, onFailed }: AllMediasFetchParams) {
  getInstagramMedias<InstagramBasicMediaItem>({ fields: 'id,timestamp', limit: 100, since, after })
    .then((result) => {
      medias.push(...result.data)
      if (result.paging.next) {
        doFetchAllMedias({
          medias,
          since,
          after: result.paging.cursors.after,
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
    since: prevYearToday,
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
