/**
 * @file BFF instagram getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */

// 1. Generate long-lived access tokens for Instagram Testers (60 days)
// https://developers.facebook.com/apps/625907498725071/instagram-basic-display/basic-display/

// 2. Get medias useing API
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields

// 3. TODO: Refresh token
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/refresh_access_token

export { getInstagramMedias, getInstagramMediaChildren } from './media'
export type { InstagramMediaItem, InstagramMediaListResponse } from './media'
export { getInstagramCalendar } from './calendar'
export type { InstagramCalendarItem } from './calendar'
export { getInstagramProfile } from './profile'
export type { InstagramProfile } from './profile'
