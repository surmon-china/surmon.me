/**
 * @file App router
 * @module app.router
 * @author Surmon <https://github.com/surmon-china>
 */

import {
  RouteRecordRaw,
  NavigationGuard,
  NavigationGuardNext,
  RouterHistory,
  createRouter
} from 'vue-router'
import { NOT_FOUND, INVALID_ERROR } from '/@/constants/error'
import { LANGUAGE_KEYS } from '/@/language/key'
import { LayoutColumn } from '/@/services/layout'
import { isClient } from '/@/app/environment'
import { isValidDateParam } from '/@/transforms/validate'
import { scrollToTop } from '/@/utils/effects'
import IndexPage from '/@/pages/index.vue'
import ArchivePage from '/@/pages/archive.vue'
import ArticlePage from '/@/pages/article/index.vue'
import CategoryPage from '/@/pages/category.vue'
import TagPage from '/@/pages/tag.vue'
import DatePage from '/@/pages/date.vue'
import SearchPage from '/@/pages/search.vue'
import MusicPage from '/@/pages/music.vue'
import LensPage from '/@/pages/lens.vue'
import JobPage from '/@/pages/job.vue'
import AboutPage from '/@/pages/about.vue'
import MerchPage from '/@/pages/merch/index.vue'
import FreelancerPage from '/@/pages/freelancer.vue'
import GuestbookPage from '/@/pages/guestbook.vue'
import AppPage from '/@/pages/app.vue'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** second */
    ssrCacheAge?: number
    layout?: LayoutColumn
    validate?: (params: any) => Promise<any>
  }
}

export enum CategorySlug {
  Code = 'code',
  Insight = 'insight'
}

export enum RouteName {
  Home = 'home',
  Article = 'article-detail',
  TagArchive = 'tag-archive',
  CategoryArchive = 'category-archive',
  DateArchive = 'date-archive',
  SearchArchive = 'search-archive',
  Guestbook = 'guestbook',
  Freelancer = 'freelancer',
  App = 'app',
  Music = 'music',
  Job = 'job',
  About = 'about',
  Merch = 'merch',
  Lens = 'lens',
  Archive = 'archive',
  Error = 'error'
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    component: IndexPage
  },
  {
    path: '/archive',
    name: RouteName.Archive,
    component: ArchivePage,
    meta: {
      ssrCacheAge: 60 * 60 * 6,
      layout: LayoutColumn.Full
    }
  },
  {
    path: '/article/:article_id',
    name: RouteName.Article,
    component: ArticlePage,
    props: (to) => ({ articleId: Number(to.params.article_id) }),
    meta: {
      async validate({ route, i18n }) {
        if (!Number.isInteger(Number(route.params.article_id))) {
          return Promise.reject({
            code: INVALID_ERROR,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Article ID → <number>'
          })
        }
      }
    }
  },
  {
    path: '/category/:category_slug',
    name: RouteName.CategoryArchive,
    component: CategoryPage,
    props: (to) => ({ categorySlug: to.params.category_slug }),
    meta: {
      async validate({ route, i18n, store }) {
        const { category_slug } = route.params
        if (!category_slug) {
          return Promise.reject({
            code: INVALID_ERROR,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Category slug → <string>'
          })
        }
        if (isClient) {
          const targetCategory = store.state.value?.category.categories.find(
            (category) => category.slug === category_slug
          )
          if (!targetCategory) {
            return Promise.reject({
              code: NOT_FOUND,
              message:
                i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + `Category ${category_slug} not found`
            })
          }
        }
      }
    }
  },
  {
    path: '/tag/:tag_slug',
    name: RouteName.TagArchive,
    component: TagPage,
    props: (to) => ({ tagSlug: to.params.tag_slug }),
    meta: {
      async validate({ route, i18n, store }) {
        const { tag_slug } = route.params
        if (!tag_slug) {
          return Promise.reject({
            code: INVALID_ERROR,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Tag slug → <string>'
          })
        }
        if (isClient) {
          const tagretTag = store.state.value?.tag.tags.find((tag) => tag.slug === tag_slug)
          if (!tagretTag) {
            return Promise.reject({
              code: NOT_FOUND,
              message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + `Tag ${tag_slug} not found`
            })
          }
        }
      }
    }
  },
  {
    path: '/date/:date',
    name: RouteName.DateArchive,
    component: DatePage,
    props: (to) => ({ date: to.params.date }),
    meta: {
      ssrCacheAge: 60 * 60 * 24,
      async validate({ route, i18n }) {
        const { date } = route.params
        if (!date || !isValidDateParam(date)) {
          return Promise.reject({
            code: INVALID_ERROR,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + `Invalid date ${date || ''}`
          })
        }
      }
    }
  },
  {
    path: '/search/:keyword',
    name: RouteName.SearchArchive,
    component: SearchPage,
    props: (to) => ({ keyword: to.params.keyword }),
    meta: {
      async validate({ route, i18n }) {
        if (!route.params.keyword) {
          return Promise.reject({
            code: INVALID_ERROR,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Keywords ?'
          })
        }
      }
    }
  },
  {
    path: '/music',
    name: RouteName.Music,
    component: MusicPage,
    meta: {
      ssrCacheAge: Infinity,
      layout: LayoutColumn.Full
    }
  },
  {
    path: '/lens',
    name: RouteName.Lens,
    component: LensPage,
    meta: {
      ssrCacheAge: 60 * 60 * 24,
      layout: LayoutColumn.Full
    }
  },
  {
    path: '/job',
    name: RouteName.Job,
    component: JobPage,
    meta: {
      ssrCacheAge: Infinity,
      layout: LayoutColumn.Full
    }
  },
  {
    path: '/about',
    name: RouteName.About,
    component: AboutPage,
    meta: {
      ssrCacheAge: Infinity,
      layout: LayoutColumn.Full
    }
  },
  {
    path: '/merch',
    name: RouteName.Merch,
    component: MerchPage,
    meta: {
      ssrCacheAge: 60 * 30,
      layout: LayoutColumn.Full
    }
  },
  {
    path: '/freelancer',
    name: RouteName.Freelancer,
    component: FreelancerPage,
    meta: {
      ssrCacheAge: Infinity,
      layout: LayoutColumn.Full
    }
  },
  {
    path: '/guestbook',
    name: RouteName.Guestbook,
    component: GuestbookPage,
    meta: {
      ssrCacheAge: 60 * 2
    }
  },
  {
    path: '/app',
    name: RouteName.App,
    component: AppPage,
    meta: {
      ssrCacheAge: Infinity,
      layout: LayoutColumn.Full
    }
  },
  {
    name: RouteName.Error,
    path: '/:error(.*)',
    component: {},
    meta: {
      async validate({ i18n }) {
        return Promise.reject({
          code: NOT_FOUND,
          message: i18n.t(LANGUAGE_KEYS.NOT_FOUND)
        })
      }
    }
  }
]

export interface RouterCreatorOptions {
  history: RouterHistory
  beforeMiddleware?: NavigationGuard | NavigationGuard[]
  afterMiddleware?: NavigationGuardNext | NavigationGuardNext[]
}
export const createUniversalRouter = (options: RouterCreatorOptions) => {
  const router = createRouter({
    routes,
    strict: true,
    history: options.history,
    linkActiveClass: 'link-active',
    scrollBehavior(_, __, savedPosition) {
      return savedPosition || scrollToTop()
    }
  })

  if (options.beforeMiddleware) {
    Array.isArray(options.beforeMiddleware)
      ? options.beforeMiddleware.forEach(router.beforeResolve)
      : router.beforeResolve(options.beforeMiddleware)
  }
  if (options.afterMiddleware) {
    Array.isArray(options.afterMiddleware)
      ? options.afterMiddleware.forEach(router.afterEach)
      : router.afterEach(options.afterMiddleware)
  }

  return router
}
