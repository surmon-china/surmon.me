/**
 * @file Announcement state
 * @module store.announcement
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'

export const useAnnouncementStore = defineStore('announcement', {
  state: () => ({
    fetching: false,
    announcements: [] as Array<$TODO>
  }),
  actions: {
    fetchList(params?: any) {
      this.announcements = []
      this.fetching = true
      return nodepress
        .get('/announcement', { params })
        .then((response) => {
          this.announcements = response.result.data
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
