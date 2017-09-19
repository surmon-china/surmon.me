import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _3aac985e = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _03ccfa66 = () => import('../pages/guestbook.vue' /* webpackChunkName: "pages/guestbook" */).then(m => m.default || m)
const _0e78dbb6 = () => import('../pages/project.vue' /* webpackChunkName: "pages/project" */).then(m => m.default || m)
const _b5eed1a6 = () => import('../pages/app.vue' /* webpackChunkName: "pages/app" */).then(m => m.default || m)
const _1af4bd99 = () => import('../pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _fbe1079e = () => import('../pages/music.vue' /* webpackChunkName: "pages/music" */).then(m => m.default || m)
const _bb46747e = () => import('../pages/sitemap.vue' /* webpackChunkName: "pages/sitemap" */).then(m => m.default || m)
const _4d0a6e34 = () => import('../pages/tag/_tag_slug.vue' /* webpackChunkName: "pages/tag/_tag_slug" */).then(m => m.default || m)
const _44a63786 = () => import('../pages/search/_keyword.vue' /* webpackChunkName: "pages/search/_keyword" */).then(m => m.default || m)
const _7da0350a = () => import('../pages/category/_category_slug.vue' /* webpackChunkName: "pages/category/_category_slug" */).then(m => m.default || m)
const _3e0060d4 = () => import('../pages/article/_article_id.vue' /* webpackChunkName: "pages/article/_article_id" */).then(m => m.default || m)
const _22e63be0 = () => import('../pages/date/_date.vue' /* webpackChunkName: "pages/date/_date" */).then(m => m.default || m)



const scrollBehavior = function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/",
			component: _3aac985e,
			name: "index"
		},
		{
			path: "/guestbook",
			component: _03ccfa66,
			name: "guestbook"
		},
		{
			path: "/project",
			component: _0e78dbb6,
			name: "project"
		},
		{
			path: "/app",
			component: _b5eed1a6,
			name: "app"
		},
		{
			path: "/about",
			component: _1af4bd99,
			name: "about"
		},
		{
			path: "/music",
			component: _fbe1079e,
			name: "music"
		},
		{
			path: "/sitemap",
			component: _bb46747e,
			name: "sitemap"
		},
		{
			path: "/tag/:tag_slug?",
			component: _4d0a6e34,
			name: "tag-tag_slug"
		},
		{
			path: "/search/:keyword?",
			component: _44a63786,
			name: "search-keyword"
		},
		{
			path: "/category/:category_slug?",
			component: _7da0350a,
			name: "category-category_slug"
		},
		{
			path: "/article/:article_id?",
			component: _3e0060d4,
			name: "article-article_id"
		},
		{
			path: "/date/:date?",
			component: _22e63be0,
			name: "date-date"
		}
    ],
    fallback: false
  })
}
