/**
 * @file Element anchors
 * @module constant/element-anchor
 * @author Surmon <https://github.com/surmon-china>
 */

export const HEADER_ELEMENT_ID = 'A_header'
export const FOOTER_ELEMENT_ID = 'A_footer'
export const CONTAINER_ELEMENT_ID = 'A_container'

export const NAV_ELEMENT_ID = 'A_nav'
export const SIDEBAR_ELEMENT_ID = 'A_sidebar'
export const MAIN_CONTENT_ELEMENT_ID = 'A_main'

export const ARTICLE_CONTENT_ELEMENT_ID = 'A_article_content'
export const ARTICLE_RENDER_MORE_ELEMENT_ID = 'A_article_render_more'
export const ARTICLE_META_ELEMENT_ID = 'A_article_meta'
export const ARTICLE_SHARE_ELEMENT_ID = 'A_article_share'
export const ARTICLE_RELATED_ELEMENT_ID = 'A_article_related'

export const ARTICLE_CONTENT_HEADING_ELEMENT_ID_PREFIX = 'A_article_content_heading'
export const getArticleContentHeadingElementId = (level: number, anchor: string) => {
  return `${ARTICLE_CONTENT_HEADING_ELEMENT_ID_PREFIX}_${level}_${anchor}`
}

const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u
export const getArticleHeadingUrlHash = (heading: string) => {
  return (
    heading
      // strip everything except unicode letters, digits, whitespace, hyphens and underscores
      .replace(/[^\p{L}\d\s\-_]/gu, '')
      // insert hyphen between CJK and ASCII boundaries for readability
      .replace(new RegExp(`(${CJK.source})([a-zA-Z\\d])`, 'gu'), '$1-$2')
      .replace(new RegExp(`([a-zA-Z\\d])(${CJK.source})`, 'gu'), '$1-$2')
      .toLowerCase()
      // collapse whitespace into hyphens
      .replace(/\s+/g, '-')
  )
}

export const COMMENT_ELEMENT_ID = 'A_comment_wrapper'

export const getCommentItemElementId = (commentId: string | number) => {
  return `A_comment_content_item_${commentId}`
}

export const COMMENTS_URL_HASH = 'comments'
export const COMMENT_ITEM_URL_HASH_PREFIX = 'comment-'

export const getCommentIdByUrlHash = (hash: string) => {
  return hash.replace(COMMENT_ITEM_URL_HASH_PREFIX, '')
}

export const getCommentUrlHashById = (commentId: string | number) => {
  return `${COMMENT_ITEM_URL_HASH_PREFIX}${commentId}`
}
