/**
 * @file Aggregate state
 * @module store.aggregate
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { TunnelModule } from '/@/constants/tunnel'
import tunnel from '/@/services/tunnel'
import nodepress from '/@/services/nodepress'

type CalendarDay = { date: string; count: number }

export const useArticleCalendarStore = defineStore('articleCalendar', {
  state: () => ({
    fetching: false,
    data: [] as Array<CalendarDay>
  }),
  actions: {
    fetch() {
      if (this.data.length) {
        return Promise.resolve()
      }

      this.fetching = true
      return nodepress
        .get('/article/calendar', {
          params: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }
        })
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
    data: [] as Array<CalendarDay>
  }),
  actions: {
    fetch() {
      if (this.data.length) {
        return Promise.resolve()
      }

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

export const useInstagramCalendarStore = defineStore('instagramCalendar', {
  state: () => ({
    fetching: false,
    data: [] as Array<CalendarDay>
  }),
  actions: {
    fetch() {
      if (this.data.length) {
        return Promise.resolve()
      }

      this.fetching = true
      return tunnel
        .dispatch(TunnelModule.InstagramCalendar)
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
      if (this.data) {
        return Promise.resolve()
      }

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
