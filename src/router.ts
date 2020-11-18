import { RouteRecordRaw, NavigationGuard, NavigationGuardNext, RouterHistory, createRouter } from 'vue-router'
import { scrollToTop } from '/@/utils/effects'
import { LayoutColumn } from '/@/state'
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
    component: ArchivePage,
    meta: {
      layout: LayoutColumn.Wide
    }
  },
  {
    path: '/article/:article_id',
    name: RouteName.Article,
    component: ArticlePage,
    props: to => ({ articleId: Number(to.params.article_id) })
  },
  {
    path: '/category/:category_slug',
    name: RouteName.CategoryArchive,
    component: CategoryPage,
    props: to => ({ categorySlug: to.params.category_slug })
  },
  {
    path: '/tag/:tag_slug',
    name: RouteName.TagArchive,
    component: TagPage,
    props: to => ({ tagSlug: to.params.tag_slug })
  },
  {
    path: '/date/:date',
    name: RouteName.DateArchive,
    component: DatePage,
    props: to => ({ date: to.params.date })
  },
  {
    path: '/search/:keyword',
    name: RouteName.SearchArchive,
    component: SearchPage,
    props: to => ({ keyword: to.params.keyword })
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
