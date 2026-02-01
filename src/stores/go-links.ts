/**
 * @file go.surmon.me URL map store
 * @module store/go-links
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { shallowRef, computed } from 'vue'
import type { GoLinksMap } from '/@/configs/app.config'
import { GO_LINKS_MAP, RESOURCE_LINKS } from '/@/configs/app.config'
import vanilla from '/@/services/vanilla'

export const useGoLinksStore = defineStore('goLinksMap', () => {
  const remoteLinksMap = shallowRef<GoLinksMap>()
  const mixedLinksMap = computed(() => ({
    ...GO_LINKS_MAP,
    ...remoteLinksMap.value
  }))

  const fetchRemoteLinksMap = () => {
    return vanilla.get<GoLinksMap>(RESOURCE_LINKS.GO_LINKS_MAP_ENDPOINT).then((response) => {
      remoteLinksMap.value = response.data
    })
  }

  return { fetchRemoteLinksMap, mixedLinksMap }
})
