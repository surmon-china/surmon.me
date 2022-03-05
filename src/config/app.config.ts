/**
 * @file App config
 * @module config.app
 * @author Surmon <https://github.com/surmon-china>
 */

export const DEFAULT_DELAY = 468
export const LONG_ARTICLE_THRESHOLD = 16688
export const PRIMARY_COLOR = '#0088f5'
export const GA_MEASUREMENT_ID = 'UA-84887611-3'
export const ADSENSE_CLIENT_ID = 'ca-pub-4710915636313788'

export const META = Object.freeze({
  title: 'Surmon.me',
  zh_sub_title: '来苏之望',
  en_sub_title: 'Because the mountain is there',
  url: 'https://surmon.me',
  domain: 'surmon.me',
  author: 'Surmon'
})

export const SPECIAL_LINKS = Object.freeze([
  {
    name: 'iconfont',
    url: 'https://www.iconfont.cn/'
  },
  {
    name: `GitHub`,
    url: 'https://github.com'
  },
  {
    name: `PM2`,
    url: 'https://pm2.keymetrics.io/'
  },
  {
    name: `Vite`,
    url: 'https://vitejs.dev/'
  },
  {
    name: `Disqus`,
    url: 'https://disqus.com/'
  }
])

export const THIRD_IDS = Object.freeze({
  YOUTUBE_CHANNEL_ID: `UCoL-j6T28PLSJ2U6ZdONS0w`,
  MUSIC_163_BGM_ALBUM_ID: '638949385',
  GITHUB_USER_ID: 'surmon-china',
  TWITTER_USER_ID: 'surmon7788',
  INSTAGRAM_USERNAME: 'surmon666',
  INSTAGRAM_FB_ID: '17841405600281893'
})

export const VALUABLE_LINKS = Object.freeze({
  RSS: '/rss.xml',
  SITE_MAP: '/sitemap.xml',
  SPONSOR: '/sponsor',

  GITHUB_SURMON_ME: 'https://github.com/surmon-china/surmon.me',
  GITHUB_NODEPRESS: 'https://github.com/surmon-china/nodepress',
  GITHUB_SURMON_ME_NATIVE: 'https://github.com/surmon-china/surmon.me.native',
  GITHUB_BLOG_STAR_LIST: 'https://github.com/stars/surmon-china/lists/surmon-me',
  APP_APK_FILE:
    'https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/android/surmon.me.apk',

  THROW_ERROR: 'https://throwerror.io',
  FOX_FINDER: 'https://foxfinder.io',
  GITHUB: 'https://github.com/surmon-china',
  GITHUB_SPONSORS: 'https://github.com/sponsors/surmon-china',
  PAYPAL: 'https://www.paypal.me/surmon',
  UPWORK: 'https://www.upwork.com/freelancers/~0142e621258ac1770d',
  MARKDOWN: 'https://daringfireball.net/projects/markdown/',
  GOOGLE_LIVE_MAP: 'https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3',
  DISCORD_GROUP: 'https://discord.gg/cXdGT7Gx86',
  TELEGRAM: 'https://t.me/surmon',
  TELEGRAM_GROUP: 'https://t.me/joinchat/F6wOlxYwSCUpZTYj3WTAWA',
  SPOTIFY: 'https://open.spotify.com/user/v0kz9hpwpbqnmtnrfhbyl812o',
  MUSIC_163: `https://music.163.com/#/playlist?id=${THIRD_IDS.MUSIC_163_BGM_ALBUM_ID}`,
  YOUTUBE_CHANNEL: `https://www.youtube.com/channel/${THIRD_IDS.YOUTUBE_CHANNEL_ID}`,
  DOUBAN: 'https://www.douban.com/people/nocower',
  ZHIHU: 'https://www.zhihu.com/people/surmon',
  QUORA: 'https://www.quora.com/profile/Surmon',
  STACK_OVERFLOW: 'https://stackoverflow.com/users/6222535/surmon',
  LEETCODE: 'https://leetcode.com/Surmon',
  LINKEDIN: 'https://www.linkedin.com/in/surmon',
  INSTAGRAM: `https://www.instagram.com/${THIRD_IDS.INSTAGRAM_USERNAME}`,
  TWITTER: `https://twitter.com/${THIRD_IDS.TWITTER_USER_ID}`
})
