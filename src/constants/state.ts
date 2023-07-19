/**
 * @file State constant
 * @module constant.state
 * @author Surmon <https://github.com/surmon-china>
 */

// article.origin
export enum OriginState {
  Original = 0, // 原创
  Reprint = 1, // 转载
  Hybrid = 2 // 混合
}

// comment.post_id
export enum CommentPostId {
  Guestbook = 0 // 留言板
}

// comment.pid
export enum CommentParentId {
  Self = 0 // `0` means no parent comment
}

export enum SortType {
  Asc = 1, // 升序
  Desc = -1, // 降序
  Hottest = 2 // 热序
}
