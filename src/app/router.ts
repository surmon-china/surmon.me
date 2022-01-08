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
import { NOT_FOUND, BAD_REQUEST } from '/@/constants/error'
import { LANGUAGE_KEYS } from '/@/language/key'
import { LayoutColumn } from '/@/services/layout'
import { isValidDateParam } from '/@/transforms/validate'
import { scrollToTop } from '/@/utils/effects'

// mobile flow
import MobileFlow from '/@/components/flow-mobile/index.vue'
// desktop flow
import IndexFlowPage from '/@/pages/index.vue'
import CategoryFlowPage from '/@/pages/category.vue'
import TagFlowPage from '/@/pages/tag.vue'
import DateFlowPage from '/@/pages/date.vue'
import SearchFlowPage from '/@/pages/search.vue'

// core pages
import ArticleDetailPage from '/@/pages/article/index.vue'
import ArchivePage from '/@/pages/archive.vue'
import AboutDesktopPage from '/@/pages/about/desktop.vue'
import AboutMobilePage from '/@/pages/about/mobile.vue'
import GuestbookPage from '/@/pages/guestbook.vue'
import AppPage from '/@/pages/app.vue'

// service pages
import MusicPage from '/@/pages/music.vue'
import LensPage from '/@/pages/lens/index.vue'
import JobPage from '/@/pages/job.vue'
import MerchPage from '/@/pages/merch/index.vue'
import FreelancerPage from '/@/pages/freelancer.vue'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    responsive?: boolean
    layout?: LayoutColumn
    validate?: (params: any) => Promise<any>
    /** seconds */
    ssrCacheAge?: number | false
  }
}

export enum CategorySlug {
  Code = 'code',
  Insight = 'insight'
}

export enum RouteName {
  Home = 'home',
  Article = 'article-detail',
  CategoryFlow = 'category-flow',
  TagFlow = 'tag-flow',
  DateFlow = 'date-flow',
  SearchFlow = 'search-flow',
  Archive = 'archive',
  Guestbook = 'guestbook',
  About = 'about',
  App = 'app',
  Freelancer = 'freelancer',
  Music = 'music',
  Job = 'job',
  Merch = 'merch',
  Lens = 'lens',
  Error = 'error'
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    components: {
      default: IndexFlowPage,
      mobile: MobileFlow
    },
    meta: {
      responsive: true,
      ssrCacheAge: 60 * 2 // 2 mins
    }
  },
  {
    path: '/article/:article_id',
    name: RouteName.Article,
    components: {
      default: ArticleDetailPage,
      mobile: ArticleDetailPage
    },
    props: {
      default: (to) => ({ articleId: Number(to.params.article_id) }),
      mobile: (to) => ({
        isMobile: true,
        articleId: Number(to.params.article_id)
      })
    },
    meta: {
      responsive: true,
      ssrCacheAge: 30, // 30 seconds
      async validate({ route, i18n }) {
        if (!Number.isInteger(Number(route.params.article_id))) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Article ID → <number>'
          })
        }
      }
    }
  },
  {
    path: '/category/:category_slug',
    name: RouteName.CategoryFlow,
    components: {
      default: CategoryFlowPage,
      mobile: MobileFlow
    },
    props: {
      default: (to) => ({ categorySlug: to.params.category_slug }),
      mobile: (to) => ({ categorySlug: to.params.category_slug })
    },
    meta: {
      responsive: true,
      ssrCacheAge: 60 * 2, // 2 mins
      async validate({ route, i18n }) {
        const { category_slug } = route.params
        if (!category_slug) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Category slug → <string>'
          })
        }
      }
    }
  },
  {
    path: '/tag/:tag_slug',
    name: RouteName.TagFlow,
    components: {
      default: TagFlowPage,
      mobile: MobileFlow
    },
    props: {
      default: (to) => ({ tagSlug: to.params.tag_slug }),
      mobile: (to) => ({ tagSlug: to.params.tag_slug })
    },
    meta: {
      responsive: true,
      ssrCacheAge: 60 * 2, // 2 mins
      async validate({ route, i18n }) {
        const { tag_slug } = route.params
        if (!tag_slug) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Tag slug → <string>'
          })
        }
      }
    }
  },
  {
    path: '/date/:date',
    name: RouteName.DateFlow,
    components: {
      default: DateFlowPage,
      mobile: MobileFlow
    },
    props: {
      default: (to) => ({ date: to.params.date }),
      mobile: (to) => ({ date: to.params.date })
    },
    meta: {
      responsive: true,
      ssrCacheAge: 60 * 60 * 24, // 24 hours
      async validate({ route, i18n }) {
        const { date } = route.params
        if (!date || !isValidDateParam(date)) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + `Invalid date ${date || ''}`
          })
        }
      }
    }
  },
  {
    path: '/search/:keyword',
    name: RouteName.SearchFlow,
    components: {
      default: SearchFlowPage,
      mobile: MobileFlow
    },
    props: {
      default: (to) => ({ keyword: to.params.keyword }),
      mobile: (to) => ({ searchKeyword: to.params.keyword })
    },
    meta: {
      responsive: true,
      ssrCacheAge: false,
      async validate({ route, i18n }) {
        if (!route.params.keyword) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Keywords ?'
          })
        }
      }
    }
  },
  {
    path: '/archive',
    name: RouteName.Archive,
    components: {
      default: ArchivePage,
      mobile: ArchivePage
    },
    props: {
      mobile: {
        isMobile: true
      }
    },
    meta: {
      responsive: true,
      layout: LayoutColumn.Full,
      ssrCacheAge: 60 * 60 // 1 hours
    }
  },
  {
    path: '/about',
    name: RouteName.About,
    components: {
      default: AboutDesktopPage,
      mobile: AboutMobilePage
    },
    meta: {
      responsive: true,
      layout: LayoutColumn.Full,
      ssrCacheAge: Infinity
    }
  },
  {
    path: '/guestbook',
    name: RouteName.Guestbook,
    components: {
      default: GuestbookPage,
      mobile: GuestbookPage
    },
    props: {
      mobile: {
        isMobile: true
      }
    },
    meta: {
      responsive: true,
      ssrCacheAge: 60 * 1 // 1 mins
    }
  },
  {
    path: '/app',
    name: RouteName.App,
    components: {
      default: AppPage,
      mobile: AppPage
    },
    props: {
      mobile: {
        isMobile: true
      }
    },
    meta: {
      responsive: true,
      layout: LayoutColumn.Full,
      ssrCacheAge: Infinity
    }
  },
  {
    path: '/merch',
    name: RouteName.Merch,
    component: MerchPage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
      ssrCacheAge: 60 * 60 * 12 // 12 hours
    }
  },
  {
    path: '/lens',
    name: RouteName.Lens,
    component: LensPage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
      ssrCacheAge: 60 * 60 * 4 // 4 hours
    }
  },
  {
    path: '/music',
    name: RouteName.Music,
    component: MusicPage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
      ssrCacheAge: Infinity
    }
  },
  {
    path: '/job',
    name: RouteName.Job,
    component: JobPage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
      ssrCacheAge: Infinity
    }
  },
  {
    path: '/freelancer',
    name: RouteName.Freelancer,
    component: FreelancerPage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
      ssrCacheAge: Infinity
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
