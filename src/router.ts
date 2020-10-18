import { RouteRecordRaw, NavigationGuard, NavigationGuardNext, RouterHistory, createRouter } from 'vue-router'
import { scrollToTop } from '/@/utils/effects'
import { LayoutColumn } from '/@/state'
import IndexPage from './pages/index.vue'
import ErrorPage from './pages/error.vue'

export enum CategorySlug {
  Code = 'code',
  Insight = 'think',
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
    component: () => import('./pages/archive.vue'),
    meta: {
      layout: LayoutColumn.Wide
    }
  },
  {
    path: '/article/:article_id',
    name: RouteName.Article,
    component: () => import('./pages/article/index.vue')
  },
  {
    path: '/category/:category_slug',
    name: RouteName.CategoryArchive,
    component: () => import('./pages/category.vue')
  },
  {
    path: '/tag/:tag_slug',
    name: RouteName.TagArchive,
    component: () => import('./pages/tag.vue')
  },
  {
    path: '/date/:date',
    name: RouteName.DateArchive,
    component: () => import('./pages/date.vue')
  },
  {
    path: '/search/:keyword',
    name: RouteName.SearchArchive,
    component: () => import('./pages/search.vue')
  },
  {
    path: '/music',
    name: RouteName.Music,
    component: () => import('./pages/music.vue'),
    meta: {
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/lens',
    name: RouteName.Lens,
    component: () => import('./pages/lens.vue'),
    meta: {
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/job',
    name: RouteName.Job,
    component: () => import('./pages/job.vue'),
    meta: {
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/about',
    name: RouteName.About,
    component: () => import('./pages/about.vue'),
    meta: {
      layout: LayoutColumn.Wide
    }
  },
  {
    path: '/freelancer',
    name: RouteName.Freelancer,
    component: () => import('./pages/freelancer.vue'),
    meta: {
      layout: LayoutColumn.Page
    }
  },
  {
    path: '/guestbook',
    name: RouteName.Guestbook,
    component: () => import('./pages/guestbook.vue')
  },
  {
    path: '/app',
    name: RouteName.App,
    component: () => import('./pages/app.vue'),
    meta: {
      layout: LayoutColumn.Page
    }
  },
  {
    name: 'error',
    path: '/:error(.*)',
    component: ErrorPage
  }
]

export interface RouterCreateConfig {
  history: RouterHistory
  beforeMiddleware?: NavigationGuard | NavigationGuard[]
  afterMiddleware?: NavigationGuardNext | NavigationGuardNext[]
}
export const createUniversalRouter = (config: RouterCreateConfig) => {
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
      ? config.beforeMiddleware.forEach(router.beforeEach)
      : router.beforeEach(config.beforeMiddleware)
  }
  if (config.afterMiddleware) {
    Array.isArray(config.afterMiddleware)
      ? config.afterMiddleware.forEach(router.afterEach)
      : router.afterEach(config.afterMiddleware)
  }

  return router
}
