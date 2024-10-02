import { ref, shallowReactive, shallowRef, computed } from 'vue'
import { useThreadsLatestMediasStore } from '/@/stores/media'
import type { ThreadsMedia, ThreadsMediaListResponse } from '/@/server/getters/threads'
import { TunnelModule } from '/@/constants/tunnel'
import { delayPromise } from '/@/utils/delayer'
import { isClient } from '/@/app/environment'
import tunnel from '/@/services/tunnel'

export const useThreadsMediasData = () => {
  const loading = ref(false)
  const latestThreadsStore = useThreadsLatestMediasStore()
  const localMedias = shallowReactive<Array<ThreadsMedia>>([])
  const lastPaging = shallowRef<ThreadsMediaListResponse['paging'] | null>(null)
  const afterToken = computed(() => {
    return localMedias.length ? lastPaging.value?.cursors?.after : latestThreadsStore.data?.paging.cursors?.after
  })
  const finished = computed(() => !afterToken.value)
  const allMedias = computed(() => {
    const latest = latestThreadsStore.data?.data ?? []
    return [...latest, ...localMedias]
  })

  const fetchMoreMedias = async () => {
    try {
      loading.value = true
      const request = tunnel.dispatch<ThreadsMediaListResponse>(TunnelModule.ThreadsMedias, {
        after: afterToken.value
      })
      const response = await (isClient ? delayPromise(360, request) : request)
      localMedias.push(...response.data)
      lastPaging.value = response.paging
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    finished,
    allMedias,
    latestThreadsStore,
    fetchMoreMedias
  }
}
