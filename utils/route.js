/**
 * @file 路径判定器 / ES module
 * @module utils/route
 * @author Surmon <https://github.com/surmon-china>
 */

import systemConstants from '~/constants/system'

export const isIndexRoute = name => name === systemConstants.Route.Index
export const isArticleDetailRoute = name => name === systemConstants.Route.ArticleDetail
export const isSearchArchiveRoute = name => name === systemConstants.Route.SearchArchive
export const isGuestbookRoute = name => name === systemConstants.Route.Guestbook
export const isServiceRoute = name => name === systemConstants.Route.Service
export const isMusicRoute = name => name === systemConstants.Route.Music
export const isAppRoute = name => name === systemConstants.Route.App
