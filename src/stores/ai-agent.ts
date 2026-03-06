/**
 * @file AI Agent store
 * @module store/ai-agent
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { shallowRef, readonly } from 'vue'
import localforage from 'localforage'
import localstorage from '/@/utils/storage'
import { APP_DB_NAME, DatabaseStoreName, LocalStorageKey } from '/@/constants/storage-key'
import aiAgent from '/@/services/ai-agent'
import logger from '/@/utils/logger'

const aiChatHistoryStore = localforage.createInstance({
  name: APP_DB_NAME,
  storeName: DatabaseStoreName.AiChatHistory
})

export const useAiAgentStore = defineStore('ai-agent', () => {
  const token = shallowRef<string | null>(null)
  const messages = shallowRef<any[]>([])

  const ensureToken = async () => {
    try {
      const localState = localstorage.getJSON<{ token: string }>(LocalStorageKey.AiAgentState)
      if (localState?.token) {
        token.value = localState.token
      } else {
        const response = await aiAgent.get<{ token: string }>('/chat/token')
        token.value = response.data.token
        localstorage.setJSON(LocalStorageKey.AiAgentState, { token: token.value })
      }
    } catch (error) {
      logger.error('初始化 AI Agent Token 失败', error)
    }
  }

  const initMessages = async () => {
    try {
      messages.value = (await aiChatHistoryStore.getItem<any>('data')) || []
    } catch {
      messages.value = []
      aiChatHistoryStore.removeItem('data')
    }
  }

  const setMessages = async (_messages: any[]) => {
    messages.value = _messages
    await aiChatHistoryStore.setItem<any>('data', _messages)
  }

  return {
    token: readonly(token),
    messages: readonly(messages),
    ensureToken,
    initMessages,
    setMessages
  }
})
