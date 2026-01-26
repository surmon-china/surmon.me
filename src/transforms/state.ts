/**
 * @file App state transformer
 * @module transform/state
 * @author Surmon <https://github.com/surmon-china>
 */

import _isNil from 'lodash-es/isNil'
import { ExtraKeyValue } from '/@/interfaces/common'
import { ArticleOrigin } from '/@/interfaces/article'

export const isOriginalArticle = (origin?: ArticleOrigin) => {
  return _isNil(origin) || origin === ArticleOrigin.Original
}

export const isHybridArticle = (origin: ArticleOrigin) => {
  return origin === ArticleOrigin.Hybrid
}

export const isReprintArticle = (origin: ArticleOrigin) => {
  return origin === ArticleOrigin.Reprint
}

export const getExtrasMap = (kvs: ExtraKeyValue[] | void): Map<string, string> => {
  return new Map((kvs ?? []).map((item) => [item.key, item.value]))
}
