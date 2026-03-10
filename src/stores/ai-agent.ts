/**
 * @file AI Agent store
 * @module store/ai-agent
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { ref, shallowRef, reactive, computed, readonly } from 'vue'
import { useIdentityStore } from './identity'
import { LocalStorageKey } from '/@/constants/storage-key'
import localstorage from '/@/utils/storage'
import aiAgent from '/@/services/ai-agent'
import API_CONFIG from '/@/configs/app.api'

const TOKEN_HEADER_NAME = 'X-Token'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  // For new message create from store
  created_at: string | null
  // For assistant message error state
  error?: string | null
}

export interface ToolCall {
  id: string
  name: string
  status: 'calling' | 'done'
}

export interface StreamingState {
  status: 'idle' | 'streaming' | 'error'
  toolCalls: ToolCall[]
  abortController: AbortController | null
}

export const useAiAgentStore = defineStore('ai-agent', () => {
  const identityStore = useIdentityStore()

  const fetching = shallowRef(false)
  const initialized = shallowRef(false)
  const error = shallowRef<Error | null>(null)

  const token = shallowRef<string | null>(null)
  const messages = ref<ChatMessage[]>([])

  const streaming = reactive<StreamingState>({
    status: 'idle',
    toolCalls: [],
    abortController: null
  })

  const isStreaming = computed(() => {
    return streaming.status === 'streaming'
  })

  const abortStreaming = () => {
    streaming.abortController?.abort()
  }

  const sendMessage = async (message: string) => {
    if (streaming.status === 'streaming') return

    // New user message
    messages.value.push({
      role: 'user',
      content: message,
      created_at: null
    } satisfies ChatMessage)

    // Assistant message states
    streaming.status = 'streaming'
    streaming.toolCalls = []
    streaming.abortController = new AbortController()

    // New assistant message
    messages.value.push({
      role: 'assistant',
      content: '',
      created_at: null,
      error: null
    })
    const assistantMessage = messages.value.at(-1)!

    try {
      const response = await fetch(`${API_CONFIG.AI_AGENT}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          [TOKEN_HEADER_NAME]: token.value ?? ''
        },
        body: JSON.stringify({
          message,
          author_name: identityStore.profile?.name,
          author_email: identityStore.profile?.email,
          user_id: identityStore.userProfile?.id
        }),
        signal: streaming.abortController.signal
      })

      if (!response.ok) {
        const errorJson = await response.json()
        streaming.status = 'error'
        assistantMessage.error = (errorJson.message ?? response.statusText) || '请求失败'
        return
      }

      // Stream
      const reader = response.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()!

        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const raw = line.slice(5).trim()
          if (!raw || raw === '[DONE]') continue

          try {
            const data = JSON.parse(raw)
            if (data.type === 'text') {
              assistantMessage.content += data.content
            } else if (data.type === 'tool_start') {
              streaming.toolCalls.push({
                id: data.name,
                name: data.name,
                status: 'calling'
              })
            } else if (data.type === 'tool_end') {
              const last = streaming.toolCalls.at(-1)
              if (last) last.status = 'done'
            } else if (data.type === 'done') {
              streaming.status = 'idle'
            } else if (data.type === 'error') {
              streaming.status = 'error'
              assistantMessage.error = data.message
            }
          } catch {
            // Ignore lines that failed to be parsed
          }
        }
      }
    } catch (_error: any) {
      if (_error.name === 'AbortError') {
        // Remove lastest assistant message
        messages.value.pop()
        streaming.status = 'idle'
      } else {
        streaming.status = 'error'
        assistantMessage.error = _error.message
      }
    }
  }

  const resetState = () => {
    localstorage.remove(LocalStorageKey.AiAgentState)
    error.value = null
    token.value = null
    messages.value = []
    initialized.value = false
  }

  const fetchToken = async (): Promise<string> => {
    const local = localstorage.getJSON<{ token: string }>(LocalStorageKey.AiAgentState)
    if (local?.token) return local.token
    const response = await aiAgent.get<{ data: string }>('/chat/token')
    localstorage.setJSON(LocalStorageKey.AiAgentState, { token: response.data })
    return response.data
  }

  const initialize = async () => {
    if (initialized.value || fetching.value) return
    fetching.value = true
    error.value = null
    try {
      token.value = await fetchToken()
      const response = await aiAgent.get<{ data: ChatMessage[] }>('/chat/history', {
        headers: { [TOKEN_HEADER_NAME]: token.value }
      })
      messages.value = response.data
      initialized.value = true
    } catch (_error: any) {
      error.value = _error
      throw _error
    } finally {
      fetching.value = false
    }
  }

  return {
    token: readonly(token),
    messages: readonly(messages),
    initialized: readonly(initialized),
    fetching: readonly(fetching),
    error: readonly(error),
    streaming: readonly(streaming),
    isStreaming,
    abortStreaming,
    sendMessage,
    resetState,
    initialize
  }
})
