/**
 * @file System constant / ES module
 * @module system.constant
 * @author Surmon <https://github.com/surmon-china>
 */

export const Language = {
  Zh: 'zh',
  En: 'en'
}

export const Theme = {
  Default: 'default',
  Dark: 'dark'
}

export const Route = {
  Index: 'index',
  ArticleDetail: 'article-article_id',
  SearchArchive: 'search-keyword',
  Guestbook: 'guestbook',
  Service: 'service',
  App: 'app',
  Music: 'music',
  About: 'about',
  Vlog: 'vlog',
  Sitemap: 'sitemap'
}

export const ImageExt = {
  WebP: 'webp',
  Jpg: 'jpeg'
}

export const StorageField = {
  Theme: 'theme',
  User: 'user',
  UserLikeHistory: 'user_like_history'
}

export const GAEventActions = {
  Click: '点击',
  View: '触及',
  Toggle: '切换'
}

export const GAEventTags = {
  Comment: '评论',
  Share: '分享',
  Tool: '部件',
  AppPage: 'page-App',
  AboutPage: 'page-About',
  ServicePage: 'page-Service'
}

export default {
  Language,
  Theme,
  Route,
  ImageExt,
  StorageField,
  GAEventActions,
  GAEventTags
}
