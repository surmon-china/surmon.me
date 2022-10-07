/**
 * @file Store hook
 * @module store.hook
 * @author Surmon <https://github.com/surmon-china>
 */

import { Pinia } from 'pinia'

import { useTagStore } from './tag'
import { useCategoryStore } from './category'
import { useCommentStore } from './comment'
import { useArticleListStore, useArticleDetailStore } from './article'
import { useAnnouncementStore } from './announcement'
import { useArchiveStore } from './archive'
import { useIdentityStore } from './identity'
import { useAdminInfoStore, useAppOptionStore } from './basic'
import { useWallpaperStore } from './wallpaper'
import { useOpenSeaAssetsStore, useOpenSeaCollectionsStore } from './nft'
import {
  useNodepressStatisticStore,
  useGitHubStatisticStore,
  useNPMStatisticStore
} from './statistic'
import {
  useArticleCalendarStore,
  useTwitterCalendarStore,
  useInstagramCalendarStore,
  useGitHubCalendarStore
} from './calendar'
import {
  useDoubanMoviesStore,
  useInstagramMediasStore,
  useYouTubePlayListStore,
  useTwitterUserinfoStore,
  useTwitterTweetsStore
} from './media'

export const useStores = (pinia?: Pinia) => ({
  announcement: useAnnouncementStore(pinia),
  articleList: useArticleListStore(pinia),
  articleDetail: useArticleDetailStore(pinia),
  category: useCategoryStore(pinia),
  tag: useTagStore(pinia),
  comment: useCommentStore(pinia),
  archive: useArchiveStore(pinia),
  identity: useIdentityStore(pinia),
  adminInfo: useAdminInfoStore(pinia),
  appOption: useAppOptionStore(pinia),
  wallpaper: useWallpaperStore(pinia),

  nodepressStatistic: useNodepressStatisticStore(pinia),
  githubStatistic: useGitHubStatisticStore(pinia),
  npmStatistic: useNPMStatisticStore(pinia),

  articleCalendar: useArticleCalendarStore(pinia),
  twitterCalendar: useTwitterCalendarStore(pinia),
  instagramCalendar: useInstagramCalendarStore(pinia),
  githubCalendar: useGitHubCalendarStore(pinia),

  doubanMovies: useDoubanMoviesStore(pinia),
  instagramMedias: useInstagramMediasStore(pinia),
  youtubePlayList: useYouTubePlayListStore(pinia),
  twitterUserinfo: useTwitterUserinfoStore(pinia),
  twitterTweets: useTwitterTweetsStore(pinia),
  openseaAssets: useOpenSeaAssetsStore(pinia),
  openseaCollections: useOpenSeaCollectionsStore(pinia)
})
