/**
 * @file App config
 * @module config.app
 * @author Surmon <https://github.com/surmon-china>
 */

export const DEFAULT_DELAY = 468
export const IMAGE_SHARE_LONG_ARTICLE_THRESHOLD = 6688
export const RENDER_LONG_ARTICLE_THRESHOLD = 16688

export const META = Object.freeze({
  title: 'Surmon.me',
  zh_sub_title: '斯是陋室，唯吾芳馨',
  en_sub_title: `Surmon's digital vihara`,
  zh_description: `本是浪蝶游蜂，无智无德无明；幸闻佛道开化，广利有情众生`,
  zh_description_short: `本是蝶蜂，无德无明；幸闻佛道，广利众生`,
  en_description: 'Either write something worth reading or do something worth writing.',
  url: 'https://surmon.me',
  domain: 'surmon.me',
  author: 'Surmon',
  primary: '#0088f5'
})

export const GEO_INFO = Object.freeze({
  zh_title: '长居亚洲，游走热带',
  en_title: 'UTC +07:00 ~ +09:00',
  coordinates: [103.830391822121, 1.340863]
})

export const MAPBOX_CONFIG = Object.freeze({
  // readonly token
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
  DOUBAN_USER_ID: '56647958',
  ZHIHU_USER_NAME: 'surmon',
  GITHUB_USER_NAME: 'surmon-china',
  INSTAGRAM_USERNAME: 'surmon666',
  TWITTER_USER_NAME: 'surmon7788',
  TWITTER_USER_ID: '706498928393359360',
  BTC_ADDRESS: 'bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze',
  ETH_ADDRESS: '0xaD556974D449126efdeF23f4FF581861C301cB77'
})

export const VALUABLE_LINKS = Object.freeze({
  RSS: '/rss.xml',
  SITE_MAP: '/sitemap.xml',
  UPTIME_STATUS: 'https://redirect.surmon.me/status',
  NPM_HOMEPAGE: 'https://www.npmjs.com/~surmon',
  PAYPAL: 'https://paypal.me/surmon',
  GITHUB_SPONSORS: `https://github.com/sponsors/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB: `https://github.com/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB_SURMON_ME: 'https://github.com/surmon-china/surmon.me',
  GITHUB_NODEPRESS: 'https://github.com/surmon-china/nodepress',
  GITHUB_SURMON_ME_NATIVE: 'https://github.com/surmon-china/surmon.me.native',
  GITHUB_BLOG_STAR_LIST: 'https://github.com/stars/surmon-china/lists/surmon-me',
  MARKDOWN: 'https://daringfireball.net/projects/markdown/',
  GOOGLE_MY_MAP: `https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3`,
  GOOGLE_MY_MAP_KML: `https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w`,
  DISCORD_GROUP: 'https://redirect.surmon.me/discord-server',
  TELEGRAM_GROUP: 'https://redirect.surmon.me/telegram-group',
  MUSIC_163: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
  YOUTUBE_CHANNEL: `https://www.youtube.com/${IDENTITIES.YOUTUBE_CHANNEL_SHORT_ID}`,
  TELEGRAM: 'https://t.me/surmon',
  OPENSEA: 'https://opensea.io/Surmon',
  ZHIHU: `https://www.zhihu.com/people/${IDENTITIES.ZHIHU_USER_NAME}/answers`,
  QUORA: `https://www.quora.com/profile/Surmon/answers`,
  DOUBAN: 'https://www.douban.com/people/nocower',
  DOUBAN_MOVIE: `https://movie.douban.com/people/nocower/collect`,
  LINKEDIN: 'https://www.linkedin.com/in/surmon',
  INSTAGRAM: `https://www.instagram.com/${IDENTITIES.INSTAGRAM_USERNAME}`,
  TWITTER: `https://twitter.com/${IDENTITIES.TWITTER_USER_NAME}`
})
