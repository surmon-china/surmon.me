import { XMLParser } from 'fast-xml-parser'
import { SOTWE_SCRAPER_TOKEN } from '@/config/bff.yargs'
import { isNodeDev } from '@/server/environment'
import axios, { isAxiosError } from '@/server/services/axios'

export interface NitterTweet {
  id: string
  owner: string
  text: string
  date: number
  commentCount: number
  favoriteCount: number
  retweetCount: number
  mediaCount: number
  hasImage: boolean
  hasVideo: boolean
  isQuote: false
  isRetweet: false
  isReply: false
}

const fetchNitterTweets = async (twitterUsername: string): Promise<string> => {
  try {
    const target = `https://nitter.net/${twitterUsername}?scroll=true`
    const scraper = `http://api.scrape.do/?token=${SOTWE_SCRAPER_TOKEN}&url=${target}`
    // To avoid wasting request credits, tokens are not used in development environments
    const response = await axios.get<string>(isNodeDev ? target : scraper, { timeout: 30000 })
    return response.data
  } catch (error: unknown) {
    throw isAxiosError(error) ? error.toJSON() : error
  }
}

const parseUTCDate = (str: string) => {
  const parts = str.split('·').map((part) => part.trim())

  // date
  const dateParts = parts[0].split(' ')
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = monthNames.indexOf(dateParts[0]) + 1
  const day = parseInt(dateParts[1].replace(',', ''))
  const year = parseInt(dateParts[2])

  // time
  const timeParts = parts[1].split(' ')[0].split(':')
  let hours = parseInt(timeParts[0])
  const minutes = parseInt(timeParts[1])
  const ampm = parts[1].split(' ')[1]

  // 12h > 24h
  if (ampm === 'PM' && hours !== 12) hours += 12
  if (ampm === 'AM' && hours === 12) hours = 0

  return new Date(Date.UTC(year, month - 1, day, hours, minutes))
}

export const getNitterTweets = async (twitterUsername: string): Promise<Array<NitterTweet>> => {
  const html = await fetchNitterTweets(twitterUsername)
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    parseAttributeValue: true,
    processEntities: true,
    htmlEntities: true
  })

  return parser
    .parse(html)
    .div.div.filter((item) => item.class.includes('timeline-item'))
    .map((item) => {
      const bodyParts = item.div.div
      const itemHeader = bodyParts[0].div
      const itemContent = bodyParts.find((i) => i.class?.includes('tweet-content'))
      const itemStates = bodyParts.find((i) => i.class?.includes('tweet-stats'))?.span
      const getItemState = (name: string) => {
        const state = itemStates.find((i) => i.div.span.class.includes(name))
        return state.div['#text']
      }

      // attachments
      const itemAttachments: any[] = []
      const attNode = bodyParts.find((i) => i.class?.includes('attachments'))?.div
      if (Array.isArray(attNode)) {
        attNode.forEach((att) => {
          itemAttachments.push(...(Array.isArray(att.div) ? att.div : [att.div]))
        })
      } else {
        if (Array.isArray(attNode?.div)) {
          itemAttachments.push(...attNode.div)
        } else if (attNode) {
          itemAttachments.push(attNode?.div ?? attNode)
        }
      }

      return {
        id: item.a.href.match(/\/status\/(\d+)#/)?.[1],
        owner: twitterUsername,
        text: itemContent?.['#text']?.replaceAll('\n', ' ')?.replace(/ +/g, ' ') || '',
        date: parseUTCDate(itemHeader.div.span.a.title).getTime(),
        commentCount: getItemState('icon-comment') || 0,
        favoriteCount: getItemState('icon-heart') || 0,
        retweetCount: getItemState('icon-quote') || 0,
        mediaCount: itemAttachments.length,
        hasImage: itemAttachments.find((i) => i.class?.includes('image')) ? true : false,
        hasVideo: itemAttachments.find((i) => i.class?.includes('video')) ? true : false,
        isQuote: false,
        isRetweet: false,
        isReply: false
      }
    })
}
