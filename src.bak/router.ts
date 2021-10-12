/**
 * @file App router
 * @module app/router
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouteRecordRaw, NavigationGuard, NavigationGuardNext, RouterHistory, createRouter } from 'vue-router'
import { NOT_FOUND, INVALID_ERROR } from '/@/constants/error'
import { LANGUAGE_KEYS } from '/@/language/key'
import { LayoutColumn } from '/@/services/layout'
import { isSSR } from '/@/environment'
import { isValidDateParam } from '/@/transforms/validate'
import { scrollToTop } from '/@/utils/effects'
import IndexPage from './pages/index.vue'
import ArchivePage from './pages/archive.vue'
import ArticlePage from './pages/article/index.vue'
import CategoryPage from './pages/category.vue'
import TagPage from './pages/tag.vue'
import DatePage from './pages/date.vue'
import SearchPage from './pages/search.vue'
import MusicPage from './pages/music.vue'
import LensPage from './pages/lens.vue'
import JobPage from './pages/job.vue'
import AboutPage from './pages/about.vue'
import FreelancerPage from './pages/freelancer.vue'
import GuestbookPage from './pages/guestbook.vue'
import AppPage from './pages/app.vue'

export enum CategorySlug {
  Code = 'code',
  Insight = 'insight',
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
      layout: LayoutColumn.Wide
    }
  },
  {
    path: '/article/:article_id',
    name: RouteName.Article,
    component: ArticlePage,
    props: to => ({ articleId: Number(to.params.article_id) }),
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
    props: to => ({ categorySlug: to.params.category_slug }),
    meta: {
      async validate({ route, i18n, store }) {
        const { category_slug } = route.params
        if (!category_slug) {
          return Promise.reject({
            code: INVALID_ERROR,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Category slug → <string>'
          })
        }
        if (isSSR) {
          const targetCategory = store.state.category.data.find(
            category => category.slug === category_slug
          )
          if (!targetCategory) {
            return Promise.reject({
              code: NOT_FOUND,
              message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + `Category ${category_slug} not found`
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
    props: to => ({ tagSlug: to.params.tag_slug }),
    meta: {
      async validate({ route, i18n, store }) {
        const { tag_slug } = route.params
        if (!tag_slug) {
          return Promise.reject({
            code: INVALID_ERROR,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + 'Tag slug → <string>'
          })
        }
        if (isSSR && !store.state.tag.data.find(tag => tag.slug === tag_slug)) {
          return Promise.reject({
            code: NOT_FOUND,
            message: i18n.t(LANGUAGE_KEYS.QUERY_PARAMS_ERROR) + `Tag ${tag_slug} not found`
          })
        }
      }
    }
  },
  {
    path: '/date/:date',
    name: RouteName.DateArchive,
    component: DatePage,
    props: to => ({ date: to.params.date }),
    meta: {
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
    props: to => ({ keyword: to.params.keyword }),
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
      static: true,
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/lens',
    name: RouteName.Lens,
    component: LensPage,
    meta: {
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/job',
    name: RouteName.Job,
    component: JobPage,
    meta: {
      static: true,
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/about',
    name: RouteName.About,
    component: AboutPage,
    meta: {
      static: true,
      layout: LayoutColumn.Wide
    }
  },
  {
    path: '/freelancer',
    name: RouteName.Freelancer,
    component: FreelancerPage,
    meta: {
      static: true,
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/guestbook',
    name: RouteName.Guestbook,
    component: GuestbookPage,
  },
  {
    path: '/app',
    name: RouteName.App,
    component: AppPage,
    meta: {
      static: true,
      layout: LayoutColumn.Page
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

export interface RouterCreatorConfig {
  history: RouterHistory
  beforeMiddleware?: NavigationGuard | NavigationGuard[]
  afterMiddleware?: NavigationGuardNext | NavigationGuardNext[]
}
export const createUniversalRouter = (config: RouterCreatorConfig) => {
  const router = createRouter({
    routes,
    strict: true,
    history: config.history,
    linkActiveClass: 'link-active',
    scrollBehavior(_, __, savedPosition) {
      return savedPosition || scrollToTop()
    }
  })

  if (config.beforeMiddleware) {
    Array.isArray(config.beforeMiddleware)
      ? config.beforeMiddleware.forEach(router.beforeResolve)
      : router.beforeResolve(config.beforeMiddleware)
  }
  if (config.afterMiddleware) {
    Array.isArray(config.afterMiddleware)
      ? config.afterMiddleware.forEach(router.afterEach)
      : router.afterEach(config.afterMiddleware)
  }

  return router
}
