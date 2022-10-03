/**
 * @file App config
 * @module config.app
 * @author Surmon <https://github.com/surmon-china>
 */

export const DEFAULT_DELAY = 468
export const LONG_ARTICLE_THRESHOLD = 16688

export const META = Object.freeze({
  title: 'Surmon.me',
  zh_sub_title: '来苏之望',
  en_sub_title: 'Because the mountain is there',
  zh_biography: '本是浪蝶游蜂，自留半亩石池，但求直抒胸臆，挥墨九云之中',
  en_biography: 'Either write something worth reading or do something worth writing.',
  url: 'https://surmon.me',
  domain: 'surmon.me',
  author: 'Surmon',
  primary: '#0088f5'
})

export const GEO_INFO = Object.freeze({
  zh_title: '苟活于此，养两条狗',
  en_title: 'Omicron prison, Shanghai',
  coordinates: [121.55152956275738, 31.215855513780504]
})

export const MAPBOX_CONFIG = Object.freeze({
  TOKEN: 'pk.eyJ1Ijoic3VybW9uIiwiYSI6ImNsNDE4YmkzNjB2Z2wzY3F5dWg2M2tqeWIifQ.JhgYGFI4zsuNiX9dH-pBDg',
  STYLE_LIGHT: 'mapbox://styles/surmon/cl41fktzn000f14pet94oo1u4',
  STYLE_DARK: 'mapbox://styles/surmon/cl41gy1qo000l15ry20j5ae0k',
  ZOOM: 11.337439,
  CENTER: [121.4930539351185, 31.227570979004497]
})

export const IDENTITIES = Object.freeze({
  GOOGLE_ANALYTICS_TRACKING_ID: 'UA-84887611-3',
  GOOGLE_ADSENSE_PUBLISHER_ID: 'ca-pub-4710915636313788',
  YOUTUBE_CHANNEL_ID: 'UCoL-j6T28PLSJ2U6ZdONS0w',
  MUSIC_163_BGM_ALBUM_ID: '638949385',
  DOUBAN_USER_ID: '56647958',
  GITHUB_USER_NAME: 'surmon-china',
  TWITTER_USER_NAME: 'surmon7788',
  INSTAGRAM_USERNAME: 'surmon666',
  INSTAGRAM_FB_ID: '17841405600281893',
  BTC_ADDRESS: 'bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze',
  ETH_ADDRESS: '0xaD556974D449126efdeF23f4FF581861C301cB77'
})

export const VALUABLE_LINKS = Object.freeze({
  RSS: '/rss.xml',
  SITE_MAP: '/sitemap.xml',
  UPTIME_STATUS: 'https://stats.uptimerobot.com/Q2k7OTXxJN',
  NPM_HOMEPAGE: 'https://www.npmjs.com/~surmon',
  PAYPAL: 'https://paypal.me/surmon',
  GITHUB_SPONSORS: `https://github.com/sponsors/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB: `https://github.com/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB_SURMON_ME: 'https://github.com/surmon-china/surmon.me',
  GITHUB_NODEPRESS: 'https://github.com/surmon-china/nodepress',
  GITHUB_SURMON_ME_NATIVE: 'https://github.com/surmon-china/surmon.me.native',
  GITHUB_BLOG_STAR_LIST: 'https://github.com/stars/surmon-china/lists/surmon-me',
  APP_APK_FILE:
    'https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/android/surmon.me.apk',
  MARKDOWN: 'https://daringfireball.net/projects/markdown/',
  GOOGLE_MY_MAP: `https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3`,
  GOOGLE_MY_MAP_KML: `https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w`,
  DISCORD_GROUP: 'https://discord.surmon.me',
  TELEGRAM_GROUP: 'https://t.me/+Z2wsxogVbYM2ZmE1',
  MUSIC_163: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
  YOUTUBE_CHANNEL: `https://www.youtube.com/channel/${IDENTITIES.YOUTUBE_CHANNEL_ID}`,
  TELEGRAM: 'https://t.me/surmon',
  OPENSEA: 'https://opensea.io/surmon',
  DOUBAN: 'https://www.douban.com/people/nocower',
  DOUBAN_MOVIE: `https://m.douban.com/people/${IDENTITIES.DOUBAN_USER_ID}/movie_charts`,
  QUORA: 'https://www.quora.com/profile/Surmon',
  LINKEDIN: 'https://www.linkedin.com/in/surmon',
  INSTAGRAM: `https://www.instagram.com/${IDENTITIES.INSTAGRAM_USERNAME}`,
  TWITTER: `https://twitter.com/${IDENTITIES.TWITTER_USER_NAME}`
})
