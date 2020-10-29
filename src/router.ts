import { RouteRecordRaw, NavigationGuard, NavigationGuardNext, RouterHistory, createRouter } from 'vue-router'
import { scrollToTop } from '/@/utils/effects'
import { LayoutColumn } from '/@/state'
import IndexPage from './pages/index.vue'

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
    props: to => ({ articleId: Number(to.params.article_id) }),
    component: () => import('./pages/article/index.vue')
  },
  {
    path: '/category/:category_slug',
    name: RouteName.CategoryArchive,
    props: to => ({ categorySlug: to.params.category_slug }),
    component: () => import('./pages/category.vue')
  },
  {
    path: '/tag/:tag_slug',
    name: RouteName.TagArchive,
    props: to => ({ tagSlug: to.params.tag_slug }),
    component: () => import('./pages/tag.vue')
  },
  {
    path: '/date/:date',
    name: RouteName.DateArchive,
    props: to => ({ date: to.params.date }),
    component: () => import('./pages/date.vue')
  },
  {
    path: '/search/:keyword',
    name: RouteName.SearchArchive,
    props: to => ({ keyword: to.params.keyword }),
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
    name: RouteName.Error,
    path: '/:error(.*)',
    component: {
      setup: () => Promise.reject({ code: 404 })
    }
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
