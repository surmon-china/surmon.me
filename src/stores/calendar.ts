/**
 * @file Calendar state
 * @module store.calendar
 * @author Surmon <https://github.com/surmon-china>
 */

import { computed } from 'vue'
import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { TunnelModule } from '/@/constants/tunnel'
import nodepress from '/@/services/nodepress'
import tunnel from '/@/services/tunnel'

type CalendarDay = { date: string; count: number }

export const useArticleCalendarStore = defineStore('articleCalendar', () => {
  return createFetchStore<CalendarDay[]>({
    once: true,
    data: [],
    async fetcher() {
      const response = await nodepress.get<Array<CalendarDay>>('/article/calendar', {
        params: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }
      })
      return response.result
    }
  })
})

export const useInstagramCalendarStore = defineStore('instagramCalendar', () => {
  return createFetchStore<CalendarDay[]>({
    once: true,
    data: [],
    fetcher: () => {
      return tunnel.dispatch<Array<CalendarDay>>(TunnelModule.InstagramCalendar)
    }
  })
})

export const useGitHubCalendarStore = defineStore('githubContributionsCalendar', () => {
  const fetchStore = createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel.dispatch(TunnelModule.GitHubContributions)
  })

  const days = computed<Array<{ date: string; count: number; color: string }>>(() => {
    if (!fetchStore.data.value) {
      return []
    }

    return fetchStore.data.value.weeks
      .map((week) => week.contributionDays)
      .flat()
      .map((day) => ({
        date: day.date,
        count: day.contributionCount,
        color: day.color
      }))
  })

  return { ...fetchStore, days }
})
