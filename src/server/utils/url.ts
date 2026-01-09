/**
 * @file BFF route helper
 * @module server/util/url
 * @author Surmon <https://github.com/surmon-china>
 */

import { APP_PROFILE } from '@/configs/app.config'

export const getTagURL = (tag: string) => `${APP_PROFILE.url}/tag/${tag}`
export const getCategoryURL = (category: string) => `${APP_PROFILE.url}/category/${category}`
export const getArticleURL = (id: string | number) => `${APP_PROFILE.url}/article/${id}`
export const getPageURL = (page: string) => `${APP_PROFILE.url}/${page}`
