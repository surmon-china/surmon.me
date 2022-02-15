/**
 * @file Aggregate state
 * @module store.aggregate
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'

export const useArticleCalendarStore = defineStore('calendar', {
  state: () => ({
    fetching: false,
    data: [] as Array<{ day: string; count: number }>
  }),
  actions: {
    fetch() {
      this.data = []
      this.fetching = true
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      return nodepress
        .get('/article/calendar', { params: { timezone } })
        .then((response) => {
          this.data = response.result
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
