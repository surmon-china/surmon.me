import { getInstagramMedias } from './media'

interface InstagramBasicMediaItem {
  id: string
  timestamp: string
}

interface AllMediasFetchParams {
  since: number
  after?: string
  medias?: InstagramBasicMediaItem[]
  onSucceeded?(medias: InstagramBasicMediaItem[]): void
  onFailed?(error: unknown): void
}

async function fetchAllMedias({
  since,
  after,
  medias = [],
  onSucceeded,
  onFailed
}: AllMediasFetchParams): Promise<void> {
  try {
    const result = await getInstagramMedias<InstagramBasicMediaItem>({
      fields: 'id,timestamp',
      limit: 100,
      since,
      after
    })

    if (result.paging.next) {
      await fetchAllMedias({
        since,
        after: result.paging.cursors.after,
        medias: [...medias, ...result.data],
        onSucceeded,
        onFailed
      })
    } else {
      onSucceeded?.([...medias, ...result.data])
    }
  } catch (error) {
    onFailed?.(error)
  }
}

export interface InstagramCalendarItem {
  date: string
  count: number
}

export const getInstagramCalendar = () => {
  return new Promise<Array<InstagramCalendarItem>>((resolve, reject) => {
    // startTime: Only get the most recent 12 months of data
    const today = new Date()
    today.setDate(1)
    today.setFullYear(today.getFullYear() - 1)
    const prevYearToday = Math.round(today.getTime() / 1000)

    fetchAllMedias({
      since: prevYearToday,
      onFailed: reject,
      onSucceeded: (medias) => {
        const mediaMap = medias.reduce((accumulator, media) => {
          const key = media.timestamp.slice(0, 10)
          return accumulator.set(key, (accumulator.get(key) || 0) + 1)
        }, new Map<string, number>())
        resolve(Array.from(mediaMap, ([date, count]) => ({ date, count })))
      }
    })
  })
}
