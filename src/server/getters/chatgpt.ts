/**
 * @file ChatGPT getter
 * @module server.getter.chatgpt
 * @author Surmon <https://github.com/surmon-china>
 */

import axios from 'axios'
import { getChatGPTShareURL } from '@/transforms/chatgpt'

export interface ChatGPTShareLink {
  title: string
  model: string
  created_at: number
  updated_at: number
  first_answer: string
}

export const getChatGPTShareLink = async (shareId: string): Promise<ChatGPTShareLink> => {
  const { data: html } = await axios.get<any>(getChatGPTShareURL(shareId), { timeout: 6000 })
  if (!html) {
    throw new Error('ChatGPT share link not found.')
  }

  // The code implementation here is coupled to the way the ChatGPT website works, which may change at any time, but exposes a consistent interface to clients
  const regex = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  const matched = html.match(regex)?.[0]?.replace(regex, '$1')
  if (!matched) {
    throw new Error('ChatGPT data not found.')
  }

  const parsedJSON = JSON.parse(matched)
  const data = parsedJSON.props.pageProps.serverResponse.data

  const firstAnswer = data.linear_conversation.find((conversion) => {
    return conversion?.message?.author?.role === 'assistant'
  })

  if (!firstAnswer) {
    throw new Error('ChatGPT first answer not found.')
  }

  return {
    model: data.model.title,
    title: data.title,
    created_at: data.create_time,
    updated_at: data.update_time,
    first_answer: firstAnswer.message.content.parts[0]
  }
}
