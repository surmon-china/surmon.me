/**
 * @file BFF route helper
 * @module server/util/url
 * @author Surmon <https://github.com/surmon-china>
 */

import { APP_PROFILE } from '@/configs/app.config'

export const getTagURL = (tagSlug: string) => `${APP_PROFILE.url}/tag/${tagSlug}`
export const getCategoryURL = (categorySlug: string) => `${APP_PROFILE.url}/category/${categorySlug}`
export const getArticleURL = (ArticleId: string | number) => `${APP_PROFILE.url}/article/${ArticleId}`
export const getPageURL = (pagePath: string) => `${APP_PROFILE.url}/${pagePath}`
