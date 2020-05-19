/**
 * @file State constant / ES module
 * @module state.constant
 * @author Surmon <https://github.com/surmon-china>
 */

// 转载状态
export const OriginState = {
  Original: 0, // 原创
  Reprint: 1, // 转载
  Hybrid: 2 // 混合
}

// 评论宿主页面的 POST_ID 类型
export const CommentPostType = {
  Guestbook: 0 // 留言板
}

// 评论本身的类型
export const CommentParentType = {
  Self: 0 // 自身一级评论
}

// 排序状态
export const SortType = {
  Asc: 1, // 升序
  Desc: -1, // 降序
  Hot: 2 // 热序
}

export default {
  OriginState,
  CommentPostType,
  CommentParentType,
  SortType
}
