/**
 * @file Route transformer
 * @module transformer/route
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouteName, CategorySlug } from '/@/router'

type RouteRecordName = string | symbol | null | undefined

export const getTagArchiveRoute = (tagSlug: string) => {
  return `/tag/${tagSlug}`
}

export const getCategoryArchiveRoute = (categorySlug: CategorySlug) => {
  return `/category/${categorySlug}`
}

export const getDateArchiveRoute = (date: string) => {
  return `/date/${date}`
}

export const getArticleDetailRoute = (articleId: string | number) => {
  return `/article/${articleId}`
}

export const getPageRoute = (routeName: RouteName) => {
  return `/${routeName}`
}

export const isArticleDetail = (name: RouteRecordName) => name === RouteName.Article
export const isSearchArchive = (name: RouteRecordName) => name === RouteName.SearchArchive
export const isGuestbook = (name: RouteRecordName) => name === RouteName.Guestbook
export const isFreelancer = (name: RouteRecordName) => name === RouteName.Freelancer
export const isMusic = (name: RouteRecordName) => name === RouteName.Music
export const isApp = (name: RouteRecordName) => name === RouteName.App
