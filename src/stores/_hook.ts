/**
 * @file Store hook
 * @module store.hook
 * @author Surmon <https://github.com/surmon-china>
 */

import { Pinia } from 'pinia'

import { useArticleListStore, useHottestArticleListStore, useArticleDetailStore } from './article'
import { useAnnouncementStore } from './announcement'
import { useArchiveStore } from './archive'
import { useCommentStore } from './comment'
import { useCategoryStore } from './category'
import { useTagStore } from './tag'
import { useIdentityStore } from './identity'
import { useWallpaperStore } from './wallpaper'
import { useSponsorStore } from './sponsor'
import { useAdminInfoStore, useAppOptionStore } from './basic'
import { useNodepressStatisticStore, useGitHubStatisticStore, useNpmStatisticStore } from './statistic'
import { useArticleCalendarStore, useInstagramCalendarStore, useGitHubCalendarStore } from './calendar'
import { useDoubanMoviesStore, useInstagramMediasStore, useYouTubePlayListStore, useTwitterStore } from './media'

export const useStores = (pinia?: Pinia) => ({
  articleList: useArticleListStore(pinia),
  articleDetail: useArticleDetailStore(pinia),
  hottestArticleList: useHottestArticleListStore(pinia),
  announcement: useAnnouncementStore(pinia),
  category: useCategoryStore(pinia),
  tag: useTagStore(pinia),
  comment: useCommentStore(pinia),
  archive: useArchiveStore(pinia),
  identity: useIdentityStore(pinia),
  adminInfo: useAdminInfoStore(pinia),
  appOption: useAppOptionStore(pinia),
  wallpaper: useWallpaperStore(pinia),
  sponsor: useSponsorStore(pinia),

  nodepressStatistic: useNodepressStatisticStore(pinia),
  githubStatistic: useGitHubStatisticStore(pinia),
  npmStatistic: useNpmStatisticStore(pinia),

  articleCalendar: useArticleCalendarStore(pinia),
  instagramCalendar: useInstagramCalendarStore(pinia),
  githubCalendar: useGitHubCalendarStore(pinia),

  doubanMovies: useDoubanMoviesStore(pinia),
  instagramMedias: useInstagramMediasStore(pinia),
  youtubePlayList: useYouTubePlayListStore(pinia),
  twitter: useTwitterStore(pinia)
})
