/**
 * @file Route transformer
 * @module transforms/route
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouteName } from '/@/router'

type RouteRecordName = string | symbol | null | undefined

export const getTagArchiveRoute = (tagSlug: string) => {
  return `/tag/${tagSlug}`
}

export const getCategoryArchiveRoute = (categorySlug: string) => {
  return `/category/${categorySlug}`
}

export const getDateArchiveRoute = (date: string) => {
  return `/date/${date}`
}

export const getArticleDetailRoute = (articleId: string | number) => {
  return `/article/${articleId}`
}

export const isArticleDetail = (name: RouteRecordName) => name === RouteName.Article
export const isSearchArchive = (name: RouteRecordName) => name === RouteName.SearchArchive
export const isGuestbook = (name: RouteRecordName) => name === RouteName.Guestbook
export const isService = (name: RouteRecordName) => name === RouteName.Service
export const isMusic = (name: RouteRecordName) => name === RouteName.Music
export const isApp = (name: RouteRecordName) => name === RouteName.App
