/**
 * @file go.surmon.me URL map state
 * @module store/go-links
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { shallowRef, computed } from 'vue'
import type { GoLinksMap } from '/@/configs/app.config'
import { GO_LINKS_MAP, VALUABLE_LINKS } from '/@/configs/app.config'
import vanilla from '/@/services/vanilla'

export const useGoLinksStore = defineStore('goLinksMap', () => {
  const remoteLinksMap = shallowRef<GoLinksMap>()
  const fetchRemoteLinksMap = () => {
    return vanilla.get<GoLinksMap>(VALUABLE_LINKS.GO_LINKS_MAP_ENDPOINT).then((response) => {
      remoteLinksMap.value = response.data
    })
  }

  const map = computed(() => ({
    ...GO_LINKS_MAP,
    ...remoteLinksMap.value
  }))

  return { fetchRemoteLinksMap, map }
})
