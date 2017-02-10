'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _3aac985e = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/index.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/index.vue')

const _fbe1079e = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/music.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/music.vue')

const _1af4bd99 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/about.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/about.vue')

const _0e78dbb6 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/project.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/project.vue')

const _bb46747e = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/sitemap.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/sitemap.vue')

const _03ccfa66 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/guestbook.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/guestbook.vue')

const _22e63be0 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/date/_date.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/date/_date.vue')

const _6c9571e3 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/article/movie.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/article/movie.vue')

const _3d98b283 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/category/movie.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/category/movie.vue')

const _4d0a6e34 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/tag/_tag_slug.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/tag/_tag_slug.vue')

const _44a63786 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/search/_keyword.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/search/_keyword.vue')

const _3e0060d4 = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/article/_article_id.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/article/_article_id.vue')

const _7da0350a = process.BROWSER_BUILD ? () => System.import('/Users/surmon/Projects/Node.js/surmon.me/pages/category/_category_slug.vue') : require('/Users/surmon/Projects/Node.js/surmon.me/pages/category/_category_slug.vue')



const scrollBehavior = function(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }


export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'link-active',
  scrollBehavior,
  routes: [
		{
			path: "/",
			component: _3aac985e,
			name: "index"
		},
		{
			path: "/music",
			component: _fbe1079e,
			name: "music"
		},
		{
			path: "/about",
			component: _1af4bd99,
			name: "about"
		},
		{
			path: "/project",
			component: _0e78dbb6,
			name: "project"
		},
		{
			path: "/sitemap",
			component: _bb46747e,
			name: "sitemap"
		},
		{
			path: "/guestbook",
			component: _03ccfa66,
			name: "guestbook"
		},
		{
			path: "/date/:date?",
			component: _22e63be0,
			name: "date-date"
		},
		{
			path: "/article/movie",
			component: _6c9571e3,
			name: "article-movie"
		},
		{
			path: "/category/movie",
			component: _3d98b283,
			name: "category-movie"
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
			path: "/article/:article_id?",
			component: _3e0060d4,
			name: "article-article_id"
		},
		{
			path: "/category/:category_slug?",
			component: _7da0350a,
			name: "category-category_slug"
		}
  ]
})
