/**
 * @file App config
 * @module config/app-config
 * @author Surmon <https://github.com/surmon-china>
 */

export const BFF_CONFIG = Object.freeze({
  server_port: 3000,
  server_local_url: 'http://localhost:3000',
  tunnel_url_prefix: '/_tunnel',
  proxy_url_prefix: '/_proxy',
  proxy_allow_list_regexp: /^https:\/\/([a-z0-9-]+\.)*surmon\.(me|cn)/,
  route_path_rss: '/rss.xml',
  route_path_sitemap: '/sitemap.xml',
  route_path_gtag_script: '/gtag-script'
})

export const APP_CONFIG = Object.freeze({
  comment_content_min_length: 3,
  comment_content_max_length: 3000,
  article_image_share_long_threshold: 6688,
  render_long_article_threshold: 16688,
  desktop_sidebar_article_list_count: 8,
  default_error_code: 500,
  default_comment_avatar: '/images/gravatar.webp',
  default_og_image: '/images/og-social-card.jpg',
  root_title_separator: ' | ',
  page_title_separator: ' • ',
  primary_color: '#0088f5'
})

export const APP_PROFILE = Object.freeze({
  title: 'Surmon.me',
  author: 'Surmon',
  domain: 'surmon.me',
  url: 'https://surmon.me',
  sub_title_zh: '足下何人，來此作甚',
  sub_title_en: `Surmon's digital vihāra`,
  description_zh: '本是浪蝶遊蜂，自留半畝石池，但求直抒胸臆，揮墨九雲之中。',
  description_en: 'Either write something worth reading or do something worth writing.',
  description_short_zh: '本為蝶蜂，自築石池；但求抒臆，揮墨雲中'
})

export const MAPBOX_CONFIG = Object.freeze({
  // readonly token: https://docs.mapbox.com/help/dive-deeper/how-to-use-mapbox-securely/#access-tokens
  TOKEN: 'pk.eyJ1Ijoic3VybW9uIiwiYSI6ImNsNDE4YmkzNjB2Z2wzY3F5dWg2M2tqeWIifQ.JhgYGFI4zsuNiX9dH-pBDg',
  STYLE_LIGHT: 'mapbox://styles/surmon/cl41fktzn000f14pet94oo1u4',
  STYLE_DARK: 'mapbox://styles/surmon/cl41gy1qo000l15ry20j5ae0k',
  ZOOM: 12.4374,
  CENTER: [103.830391822121, 1.348463]
})

export const IDENTITIES = Object.freeze({
  GOOGLE_ANALYTICS_MEASUREMENT_ID: 'G-R40DDTSYNQ',
  GOOGLE_ADSENSE_CLIENT_ID: 'ca-pub-4710915636313788',
  SENTRY_PUBLIC_DSN: 'https://4a5f194531fe4527879812e4a4d8cf89@o360897.ingest.sentry.io/4505569138966528',
  YOUTUBE_CHANNEL_ID: 'UCoL-j6T28PLSJ2U6ZdONS0w',
  YOUTUBE_CHANNEL_SHORT_ID: '@surmon_v',
  MUSIC_163_BGM_ALBUM_ID: '638949385',
  ZHIHU_USERNAME: 'surmon',
  DOUBAN_USER_ID: '56647958',
  INSTAGRAM_USERNAME: 'surmon_sattva',
  THREADS_USERNAME: 'surmon_sattva',
  THREADS_JOINED_DATE: '2024-07-06',
  BTC_ADDRESS: 'bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze',
  ETH_ADDRESS: '0xaD556974D449126efdeF23f4FF581861C301cB77'
})

export const RESOURCE_LINKS = Object.freeze({
  MARKDOWN_DOC: 'https://daringfireball.net/projects/markdown/',
  GITHUB_NODEPRESS: 'https://github.com/surmon-china/nodepress',
  GITHUB_SURMON_ME: 'https://github.com/surmon-china/surmon.me',
  GITHUB_SURMON_ME_NATIVE: 'https://github.com/surmon-china/surmon.me.native',
  GOOGLE_MY_MAP: 'https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3',
  MUSIC_163_PLAYLIST: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
  GITHUB_STATISTICS_JSON_URL: 'https://raw.githubusercontent.com/surmon-china/surmon-china/release/',
  GOOGLE_MY_MAP_KML_URL: 'https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w',
  GO_LINKS_MAP_ENDPOINT: 'https://go.surmon.me'
})

const GO_LINKS_MAP_KEYS = [
  'status',
  'npm',
  'paypal',
  'github',
  'github-sponsors',
  'discord-server',
  'telegram-group',
  'youtube',
  'telegram',
  'opensea',
  'zhihu',
  'douban',
  'douban-movie',
  'xiaohongshu',
  'linkedin',
  'instagram',
  'threads',
  'x'
] as const

export type GoLinksMap = Record<(typeof GO_LINKS_MAP_KEYS)[number], string>
export const GO_LINKS_MAP = Object.freeze(
  Object.fromEntries(GO_LINKS_MAP_KEYS.map((key) => [key, `${RESOURCE_LINKS.GO_LINKS_MAP_ENDPOINT}/${key}`]))
) as GoLinksMap
