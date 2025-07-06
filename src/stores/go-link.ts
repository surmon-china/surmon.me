/**
 * @file go.surmon.me URL map state
 * @module store/go-link
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { shallowRef, computed } from 'vue'
import type { GoLinkMap } from '/@/configs/app.config'
import { GO_LINK_MAP, VALUABLE_LINKS } from '/@/configs/app.config'
import vanilla from '/@/services/vanilla'

export const useGoLinkStore = defineStore('goLinkMap', () => {
  const remoteLinkMap = shallowRef<GoLinkMap>()
  const fetchRemoteLinkMap = () => {
    return vanilla.get<GoLinkMap>(VALUABLE_LINKS.GO_LINK_MAP_ENDPOINT).then((response) => {
      remoteLinkMap.value = response.data
    })
  }

  const map = computed(() => ({
    ...GO_LINK_MAP,
    ...remoteLinkMap.value
  }))

  return { fetchRemoteLinkMap, map }
})
