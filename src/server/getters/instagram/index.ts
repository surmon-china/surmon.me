/**
 * @file BFF instagram getter
 * @module server/getter/instagram
 * @author Surmon <https://github.com/surmon-china>
 */

// Although the Instagram Basic Display API is no longer in service, the API endpoints continue to be available.
// https://lightwidget.com/basic-display-api-deprecation

// 1. Generate long-lived access tokens for Instagram Testers (60 days)
// https://developers.facebook.com/apps/1308707530127503/instagram-business/API-Setup/?business_id=277570526188879

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
