/**
 * @file Article data transformer
 * @module transform/article
 * @author Surmon <https://github.com/surmon-china>
 */

import _isNil from 'lodash-es/isNil'
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
