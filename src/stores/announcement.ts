/**
 * @file Announcement state
 * @module store.announcement
 * @author Surmon <https://github.com/surmon-china>
 */

import { defineFetchStore } from './_fetch'
import nodepress from '/@/services/nodepress'

export const useAnnouncementStore = defineFetchStore({
  id: 'announcement',
  initData: [] as Array<$TODO>,
  cleanWhenRefetch: true,
  async fetcher(params?: any) {
    const response = await nodepress.get('/announcement', { params })
    return response.result.data as Array<$TODO>
  }
})
