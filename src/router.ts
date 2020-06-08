import { Router, RouteRecordRaw, ScrollBehavior, RouterHistory, createRouter } from 'vue-router'
import { GlobalState, LayoutColumn } from './state'
import ErrorPage from './pages/error.vue'

export enum RouteName {
  Index = 'index',
  ArticleDetail = 'article-article_id',
  SearchArchive = 'search-keyword',
  Guestbook = 'guestbook',
  Service = 'service',
  App = 'app',
  Music = 'music',
  About = 'about',
  Vlog = 'vlog',
  Sitemap = 'sitemap',
  Error = 'error'
}

const routerMiddleware = (router: Router, state: GlobalState) => {
  router.beforeEach((_, to) => {
    const isFullColumns = [
      RouteName.About,
      RouteName.Vlog,
      RouteName.Sitemap
    ].includes((to.name || '') as RouteName)

    const isFullPageColumns = [
      RouteName.Music,
      RouteName.App,
      RouteName.Service
    ].includes((to.name || '') as RouteName)

    state.layoutColumn.setLayoutColumn(
      isFullColumns
        ? LayoutColumn.Full
        : isFullPageColumns
          ? LayoutColumn.Screen
          : LayoutColumn.Normal
    )
  })
}

const routes: RouteRecordRaw[] = [
   {
    path: '/',
    name: RouteName.Index,
    component: async () => import(/* webpackChunkName: 'index' */ './pages/new.vue')
  },
  // {
  //   path: '/',
  //   name: 'index',
  //   component: async () => import(/* webpackChunkName: 'index' */ './pages/index.vue')
  // },
  // {
  //   path: `/about`,
  //   name: 'about',
  //   component: async () => import(/* webpackChunkName: 'about' */ './pages/about.vue')
  // },
  // {
  //   path: `/app`,
  //   name: 'app',
  //   component: async () => import(/* webpackChunkName: 'app' */ './pages/app.vue')
  // },
  // {
  //   path: `/service`,
  //   name: 'service',
  //   component: async () => import(/* webpackChunkName: 'service' */ './pages/service.vue')
  // },
  // {
  //   name: 'error',
  //   path: '/:data(.*)',
  //   component: ErrorPage
  // }
]

const scrollBehavior: ScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}

export interface RouterConfig {
  history: RouterHistory
  globalState: GlobalState
}
export const createUniversalRouter = (config: RouterConfig) => {
  const router = createRouter({
    history: config.history,
    routes: config.globalState.userAgent.isMobile
      ? routes.filter(route => route.name !== RouteName.Music)
      : routes,
    scrollBehavior
  })

  routerMiddleware(router, config.globalState)
  return router
}
