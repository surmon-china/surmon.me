/**
 * @file Aggregate state
 * @module store.aggregate
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'
import nodepress from '/@/services/nodepress'

export const useArticleCalendarStore = defineStore('articleCalendar', {
  state: () => ({
    fetching: false,
    data: [] as Array<{ date: string; count: number }>
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

export const useTwitterCalendarStore = defineStore('twitterCalendar', {
  state: () => ({
    fetching: false,
    data: [] as Array<{ date: string; count: number }>
  }),
  actions: {
    fetch() {
      this.data = []
      this.fetching = true
      return tunnel
        .dispatch(TunnelModule.TwitterCalendar)
        .then((response) => {
          this.data = response
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})

export const useGitHubCalendarStore = defineStore('githubCalendar', {
  state: () => ({
    fetching: false,
    data: null as any
  }),
  getters: {
    days(): Array<{ date: string; count: number; color: string }> {
      if (!this.data) {
        return []
      }

      return this.data.weeks
        .map((week) => week.contributionDays)
        .flat()
        .map((day) => ({
          date: day.date,
          count: day.contributionCount,
          color: day.color
        }))
    }
  },
  actions: {
    fetch() {
      this.data = []
      this.fetching = true
      return tunnel
        .dispatch(TunnelModule.GitHubContributions)
        .then((response) => {
          this.data = response
        })
        .finally(() => {
          this.fetching = false
        })
    }
  }
})
