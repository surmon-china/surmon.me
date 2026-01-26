/**
 * @file Store hook
 * @module store/hook
 * @author Surmon <https://github.com/surmon-china>
 */

import { Pinia } from 'pinia'

import { useAnnouncementStore } from './announcement'
import { useArchiveStore } from './archive'
import { useCommentStore } from './comment'
import { useCategoryStore } from './category'
import { useTagStore } from './tag'
import { useGoLinksStore } from './go-links'
import { useIdentityStore } from './identity'
import { useWallpaperStore } from './wallpaper'
import { useGitHubSponsorsStore } from './sponsors'
import { useAdminProfileStore, useAppOptionsStore } from './basic'
import { useNodepressStatisticsStore, useGitHubStatisticsStore, useNpmStatisticsStore } from './statistics'
import { useArticlesCalendarStore, useInstagramCalendarStore, useGitHubCalendarStore } from './calendar'
import {
  useDoubanMoviesStore,
  useThreadsProfileStore,
  useThreadsLatestMediasStore,
  useInstagramLatestMediasStore,
  useInstagramProfileStore,
  useYouTubePlayListStore
} from './media'
import {
  useArticleListStore,
  useArticleDetailStore,
  useHottestArticleListStore,
  useFeaturedArticleListStore,
  useLatestArticleListStore
} from './article'

export const useStores = (pinia?: Pinia) => ({
  hottestArticleListStore: useHottestArticleListStore(pinia),
  featuredArticleListStore: useFeaturedArticleListStore(pinia),
  latestArticleListStore: useLatestArticleListStore(pinia),

  // BIZ
  articleListStore: useArticleListStore(pinia),
  articleDetailStore: useArticleDetailStore(pinia),
  announcementStore: useAnnouncementStore(pinia),
  categoryStore: useCategoryStore(pinia),
  tagStore: useTagStore(pinia),
  commentStore: useCommentStore(pinia),
  archiveStore: useArchiveStore(pinia),
  identityStore: useIdentityStore(pinia),
  adminProfileStore: useAdminProfileStore(pinia),
  appOptionsStore: useAppOptionsStore(pinia),
  wallpaperStore: useWallpaperStore(pinia),

  // links map
  goLinksStore: useGoLinksStore(pinia),

  // statistic
  nodepressStatisticsStore: useNodepressStatisticsStore(pinia),
  githubStatisticsStore: useGitHubStatisticsStore(pinia),
  npmStatisticsStore: useNpmStatisticsStore(pinia),

  // calendar
  articlesCalendarStore: useArticlesCalendarStore(pinia),
  instagramCalendarStore: useInstagramCalendarStore(pinia),
  githubCalendarStore: useGitHubCalendarStore(pinia),

  // third
  githubSponsorsStore: useGitHubSponsorsStore(pinia),
  doubanMoviesStore: useDoubanMoviesStore(pinia),
  threadsProfileStore: useThreadsProfileStore(pinia),
  threadsLatestMediasStore: useThreadsLatestMediasStore(pinia),
  instagramProfileStore: useInstagramProfileStore(pinia),
  instagramLatestMediasStore: useInstagramLatestMediasStore(pinia),
  youtubePlayListStore: useYouTubePlayListStore(pinia)
})
