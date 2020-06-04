/**
 * @file Route transformer / ES module
 * @module transforms/route
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouteName } from '/@/router'

export const getArticleDetailRoute = (articleID: string | number) => {
  return `/article/${articleID}`
}

export const isArticleDetail = (name: string) => name === RouteName.ArticleDetail
export const isSearchArchive = (name: string) => name === RouteName.SearchArchive
export const isGuestbook = (name: string) => name === RouteName.Guestbook
export const isService = (name: string) => name === RouteName.Service
export const isMusic = (name: string) => name === RouteName.Music
export const isApp = (name: string) => name === RouteName.App
