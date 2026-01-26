/**
 * @file State constant
 * @module constant/biz-state
 * @author Surmon <https://github.com/surmon-china>
 */

export enum SortMode {
  Oldest = 1, // 升序（从旧到新）
  Latest = -1, // 降序（从新到旧）
  Hottest = 2 // 热序
}

// comment.post_id
export enum CommentPostId {
  Guestbook = 0 // 留言板
}

// comment.pid
export enum CommentParentId {
  Self = 0 // `0` means no parent comment
}
