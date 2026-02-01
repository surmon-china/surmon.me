/**
 * @file Comment ids constant
 * @module constant/comment-id
 * @author Surmon <https://github.com/surmon-china>
 */

// comment.post_id
export enum CommentPostId {
  Guestbook = 0 // 留言板
}

// comment.pid
export enum CommentParentId {
  Self = 0 // `0` means no parent comment
}
