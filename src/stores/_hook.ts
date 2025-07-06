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
import { useGoLinkStore } from './go-link'
import { useIdentityStore } from './identity'
import { useWallpaperStore } from './wallpaper'
import { useGitHubSponsorsStore } from './sponsors'
import { useAdminInfoStore, useAppOptionStore } from './basic'
import { useNodepressStatisticStore, useGitHubStatisticStore, useNpmStatisticStore } from './statistic'
import { useArticleCalendarStore, useInstagramCalendarStore, useGitHubCalendarStore } from './calendar'
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
  hottestArticleList: useHottestArticleListStore(pinia),
  featuredArticleList: useFeaturedArticleListStore(pinia),
  latestArticleList: useLatestArticleListStore(pinia),

  // BIZ
  articleList: useArticleListStore(pinia),
  articleDetail: useArticleDetailStore(pinia),
  announcement: useAnnouncementStore(pinia),
  category: useCategoryStore(pinia),
  tag: useTagStore(pinia),
  comment: useCommentStore(pinia),
  archive: useArchiveStore(pinia),
  identity: useIdentityStore(pinia),
  adminInfo: useAdminInfoStore(pinia),
  appOption: useAppOptionStore(pinia),
  wallpaper: useWallpaperStore(pinia),

  // link map
  goLink: useGoLinkStore(pinia),

  // sponsor
  githubSponsors: useGitHubSponsorsStore(pinia),

  // statistic
  nodepressStatistic: useNodepressStatisticStore(pinia),
  githubStatistic: useGitHubStatisticStore(pinia),
  npmStatistic: useNpmStatisticStore(pinia),

  // calendar
  articleCalendar: useArticleCalendarStore(pinia),
  instagramCalendar: useInstagramCalendarStore(pinia),
  githubCalendar: useGitHubCalendarStore(pinia),

  // third
  doubanMovies: useDoubanMoviesStore(pinia),
  threadsProfile: useThreadsProfileStore(pinia),
  threadsLatestMedias: useThreadsLatestMediasStore(pinia),
  instagramProfile: useInstagramProfileStore(pinia),
  instagramLatestMedias: useInstagramLatestMediasStore(pinia),
  youtubePlayList: useYouTubePlayListStore(pinia)
})
