/**
 * @file ChatGPT state
 * @module store.chat-gpt
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { useFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
import type { ChatGPTShareLink } from '/@/server/getters/chatgpt'
import tunnel from '/@/services/tunnel'

export const useChatGPTStore = defineStore('chatgpt', () => {
  return useFetchStore<ChatGPTShareLink | null>({
    data: null,
    preclean: true,
    fetcher(shareId: string) {
      return tunnel.dispatch(TunnelModule.ChatGPT, { id: shareId })
    }
  })
})
