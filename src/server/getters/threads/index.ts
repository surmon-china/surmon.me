/**
 * @file BFF threads getter
 * @module server/getter/threads
 * @author Surmon <https://github.com/surmon-china>
 */

// 1. Generate long-lived access tokens for Threads Testers (60 days)
// https://developers.facebook.com/docs/threads/overview

// 2. Get posts useing API
// https://developers.facebook.com/docs/threads/threads-media
// https://github.com/fbsamples/threads_api/blob/main/src/index.js

// 3. TODO: Refresh token
// https://developers.facebook.com/docs/threads/get-started/long-lived-tokens

export { getThreadsMedias, getThreadsMediaChildren, getThreadsMediaConversation } from './post'
export type { ThreadsMedia, ThreadsMediaListResponse } from './post'
export { getThreadsProfile } from './profile'
export type { ThreadsProfile } from './profile'
