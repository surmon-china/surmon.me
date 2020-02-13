/**
 * @file Route transformer / ES module
 * @module transforms/route
 * @author Surmon <https://github.com/surmon-china>
 */

export const getArticleDetailRoute = (articleID: string | number) => {
  return `/article/${articleID}`
}
