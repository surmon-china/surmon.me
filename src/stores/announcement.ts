/**
 * @file Announcement state
 * @module store.announcement
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineStore } from 'pinia'
import { createFetchStore } from './_fetch'
import { Announcement } from '/@/interfaces/announcement'
import { PaginationList } from '/@/interfaces/common'
import nodepress from '/@/services/nodepress'

export const useAnnouncementStore = defineStore('announcement', () => {
  return createFetchStore<Announcement[]>({
    data: [],
    preclean: true,
    async fetcher(params?: any) {
      const response = await nodepress.get<PaginationList<Announcement>>('/announcement', { params })
      return response.result.data
    }
  })
})
