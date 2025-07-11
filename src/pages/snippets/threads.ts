import { shallowRef } from 'vue'
import { useEnhancer } from '/@/app/enhancer'
import type { ThreadsMediaListResponse } from '/@/server/getters/threads'
import { TunnelModule } from '/@/constants/tunnel'
import { getProxyURL } from '/@/transforms/url'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/configs/app.env'
import tunnel from '/@/services/tunnel'

export const useThreadsMediaUrl = (url?: string) => {
  if (!url) return null
  const { cdnDomain, isCNUser } = useEnhancer()
  return isCNUser ? getProxyURL(cdnDomain, url) : url
}

export const useThreadsMediasRequest = () => {
  const fetching = shallowRef(false)
  const fetchMedias = async (afterToken?: string) => {
    try {
      fetching.value = true
      const request = tunnel.fetch<ThreadsMediaListResponse>(TunnelModule.ThreadsMedias, {
        after: afterToken
      })
      return await (isClient ? delayPromise(360, request) : request)
    } finally {
      fetching.value = false
    }
  }

  return {
    fetching,
    fetchMedias
  }
}
