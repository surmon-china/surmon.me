/**
 * @file 路径判定器 / ES module
 * @module services/route-validator
 * @author Surmon <https://github.com/surmon-china>
 */

import systemConstants from '~/constants/system'

export const isIndexRoute = (name: string) =>
  name === systemConstants.Route.Index

export const isArticleDetailRoute = (name: string) =>
  name === systemConstants.Route.ArticleDetail

export const isSearchArchiveRoute = (name: string) =>
  name === systemConstants.Route.SearchArchive

export const isGuestbookRoute = (name: string) =>
  name === systemConstants.Route.Guestbook

export const isServiceRoute = (name: string) =>
  name === systemConstants.Route.Service

export const isMusicRoute = (name: string) =>
  name === systemConstants.Route.Music

export const isAppRoute = (name: string) => name === systemConstants.Route.App
