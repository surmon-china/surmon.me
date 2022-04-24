/**
 * @file Statistic state
 * @module store.statistic
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import nodepress from '/@/services/nodepress'

export interface Statistic {
  tags: number
  articles: number
  comments: number
  todayViews: number
  totalViews: number
  totalLikes: number
  averageEmotion: number
}

export const useStatisticStore = defineStore('statistic', {
  state: () => ({
    fetching: false,
    statistic: null as null | Statistic
  }),
  actions: {
    fetchStatistic() {
      this.fetching = true
      return nodepress
        .get<Statistic>('/expansion/statistic')
        .then((response) => {
          this.statistic = response.result
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
