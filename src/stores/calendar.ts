/**
 * @file Calendar state
 * @module store.calendar
 * @author Surmon <https://github.com/surmon-china>
 */

import { TunnelModule } from '/@/constants/tunnel'
import nodepress from '/@/services/nodepress'
import tunnel from '/@/services/tunnel'
import { defineFetchStore } from './_fetch'

type CalendarDay = { date: string; count: number }

export const useArticleCalendarStore = defineFetchStore({
  id: 'articleCalendar',
  initData: [] as Array<CalendarDay>,
  onlyOnce: true,
  async fetcher() {
    const response = await nodepress.get<Array<CalendarDay>>('/article/calendar', {
      params: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }
    })
    return response.result
  }
})

export const useTwitterCalendarStore = defineFetchStore({
  id: 'twitterCalendar',
  initData: [] as Array<CalendarDay>,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch<Array<CalendarDay>>(TunnelModule.TwitterCalendar)
})

export const useInstagramCalendarStore = defineFetchStore({
  id: 'instagramCalendar',
  initData: [] as Array<CalendarDay>,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch<Array<CalendarDay>>(TunnelModule.InstagramCalendar)
})

export const useGitHubCalendarStore = defineFetchStore({
  id: 'githubContributionsCalendar',
  initData: null,
  onlyOnce: true,
  fetcher: () => tunnel.dispatch(TunnelModule.GitHubContributions),
  getters: {
    days(state): Array<{ date: string; count: number; color: string }> {
      if (!state.data) {
        return []
      }

      return state.data.weeks
        .map((week) => week.contributionDays)
        .flat()
        .map((day) => ({
          date: day.date,
          count: day.contributionCount,
          color: day.color
        }))
    }
  }
})
