/**
 * @file BFF route helper
 * @module server/util/url
 * @author Surmon <https://github.com/surmon-china>
 */

import { APP_META } from '@/configs/app.config'

export const getTagURL = (tag: string) => `${APP_META.url}/tag/${tag}`
export const getCategoryURL = (category: string) => `${APP_META.url}/category/${category}`
export const getArticleURL = (id: string | number) => `${APP_META.url}/article/${id}`
export const getPageURL = (page: string) => `${APP_META.url}/${page}`
