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

export const getDateArchiveRoute = (date: string) => {
  return `/date/${date}`
}

export const getArticleDetailRoute = (articleID: string | number) => {
  return `/article/${articleID}`
}

export const isArticleDetail = (name: RouteRecordName) => name === RouteName.Article
export const isSearchArchive = (name: RouteRecordName) => name === RouteName.SearchArchive
export const isGuestbook = (name: RouteRecordName) => name === RouteName.Guestbook
export const isService = (name: RouteRecordName) => name === RouteName.Service
export const isMusic = (name: RouteRecordName) => name === RouteName.Music
export const isApp = (name: RouteRecordName) => name === RouteName.App
