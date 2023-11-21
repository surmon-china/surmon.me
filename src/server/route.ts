/**
 * @file BFF route helper
 * @module server.helper.route
 * @author Surmon <https://github.com/surmon-china>
 */

import { META } from '@/config/app.config'

export const getTagURL = (tag: string) => `${META.url}/tag/${tag}`
export const getCategoryURL = (category: string) => `${META.url}/category/${category}`
export const getArticleURL = (id: string | number) => `${META.url}/article/${id}`
export const getPageURL = (page: string) => `${META.url}/${page}`
