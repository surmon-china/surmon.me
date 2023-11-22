import axios from '@/server/services/axios'
import { XMLParser } from 'fast-xml-parser'

// https://github.com/zedeus/nitter
// https://github.com/zedeus/nitter/wiki/Instances
// ✅ https://nitter.net/${username}
// ❌ https://nitter.net/${username}/rss
// ❌ https://twiiit.com/${username}/rss
// ❌ https://singapore.unofficialbird.com/${username}
// ❌ https://singapore.unofficialbird.com/${username}/rss

export interface NitterRss {
  userinfo: {
    name: string
    avatar: string
  }
  tweets: Array<{
    id: string
    owner: string
    text: string
    html: string
    date: number
    mediaCount: number
    hasImage: boolean
    isReply: boolean
    isRetweet: boolean
  }>
}

export const getNitterRss = async (twitterUsername: string): Promise<NitterRss> => {
  const url = `https://twiiit.com/${twitterUsername}/rss`
  const response = await axios.get<string>(url, { timeout: 8000 })
  const xmlParser = new XMLParser()
  const { rss: result } = xmlParser.parse(response.data)
  return {
    userinfo: {
      name: result.channel.title.split(' / ')?.[0]?.trim() || null,
      avatar: result.channel.image.url
    },
    tweets: result.channel.item.map((item: any) => {
      const linkURL = new URL(item.link)
      const urlParts = linkURL.pathname.split('/')
      return {
        id: urlParts[urlParts.length - 1],
        owner: urlParts[1],
        text: item.title.replaceAll('\n', ' '),
        html: item.description.replaceAll('\n', ' ').replaceAll('<br>', ' '),
        date: new Date(item.pubDate).getTime(),
        hasImage: item.description.includes('<img'),
        isReply: item.title.startsWith('R to '),
        isRetweet: item.title.startsWith('RT '),
        mediaCount: item.description.match(/<(img|video)/g)?.length || 0
      }
    })
  }
}
