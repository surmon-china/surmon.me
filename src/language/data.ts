/**
 * @file I18n config
 * @module i18n/config
 * @author Surmon <https://github.com/surmon-china>
 */

import { I18nLanguage, I18nMap } from '/@/services/i18n'
import { LANGUAGE_KEYS } from './key'

export enum Language {
  En = 'en',
  Zh = 'zh'
}

export const languages: I18nLanguage[] = [
  {
    code: Language.Zh,
    iso: 'zh-CN',
    name: '简体中文'
  },
  {
    code: Language.En,
    iso: 'en-US',
    name: 'English'
  }
]

export const langMap: I18nMap<LANGUAGE_KEYS, Language> = {
  [LANGUAGE_KEYS.PAGE_HOME]: {
    [Language.Zh]: '明殿',
    [Language.En]: 'home'
  },
  [LANGUAGE_KEYS.CATEGORY_INSIGHT]: {
    [Language.Zh]: '无色庵',
    [Language.En]: 'insight'
  },
  [LANGUAGE_KEYS.CATEGORY_CODE]: {
    [Language.Zh]: '宁静寺',
    [Language.En]: 'code'
  },
  [LANGUAGE_KEYS.PAGE_GITHUB]: {
    [Language.Zh]: '丹青阁',
    [Language.En]: 'github'
  },
  [LANGUAGE_KEYS.PAGE_LENS]: {
    [Language.Zh]: '天涯',
    [Language.En]: 'lens'
  },
  [LANGUAGE_KEYS.PAGE_INSTAGRAM]: {
    [Language.Zh]: '海角',
    [Language.En]: 'instagram'
  },
  [LANGUAGE_KEYS.PAGE_MUSIC]: {
    [Language.Zh]: '梨园',
    [Language.En]: 'music'
  },
  [LANGUAGE_KEYS.PAGE_JOB]: {
    [Language.Zh]: '伯乐',
    [Language.En]: 'job'
  },
  [LANGUAGE_KEYS.PAGE_ABOUT]: {
    [Language.Zh]: '狂浪生',
    [Language.En]: 'about'
  },
  [LANGUAGE_KEYS.PAGE_MERCH]: {
    [Language.Zh]: '周边',
    [Language.En]: 'merch'
  },
  [LANGUAGE_KEYS.PAGE_FREELANCER]: {
    [Language.Zh]: '得道',
    [Language.En]: 'freelancer'
  },
  [LANGUAGE_KEYS.PAGE_GUESTBOOK]: {
    [Language.Zh]: '四方馆',
    [Language.En]: 'guestbook'
  },
  [LANGUAGE_KEYS.PAGE_APP]: {
    [Language.Zh]: '客户端',
    [Language.En]: 'app'
  },
  [LANGUAGE_KEYS.PAGE_ARCHIVE]: {
    [Language.Zh]: '黄卷青灯',
    [Language.En]: 'archive'
  },
  [LANGUAGE_KEYS.SITE_MAP_XML]: {
    [Language.Zh]: '旷日积晷',
    [Language.En]: 'sitemap.xml'
  },
  [LANGUAGE_KEYS.EMPTY_PLACEHOLDER]: {
    [Language.Zh]: '空空如也',
    [Language.En]: 'No data'
  },
  [LANGUAGE_KEYS.NOT_FOUND]: {
    [Language.Zh]: '众里寻他 我已不再',
    [Language.En]: 'Arrives here at last'
  },
  [LANGUAGE_KEYS.BACK_TO_HOME_PAGE]: {
    [Language.Zh]: '山河万里 长歌归故',
    [Language.En]: 'Drive by'
  },
  [LANGUAGE_KEYS.GUESTBOOK_SLOGAN]: {
    [Language.Zh]: '此心光明 亦复何言',
    [Language.En]: 'You have come a long way'
  },
  [LANGUAGE_KEYS.WALLPAPER]: {
    [Language.Zh]: '山河入梦',
    [Language.En]: 'Gallery'
  },
  [LANGUAGE_KEYS.PAGE_FREELANCER_SLOGAN]: {
    [Language.Zh]: '为我一挥手，如临万壑松',
    [Language.En]: 'Talk is cheap. Show me the code'
  },
  [LANGUAGE_KEYS.PAGE_FREELANCER_EMAIL_ME]: {
    [Language.Zh]: '放码过来',
    [Language.En]: 'Email ME'
  },
  [LANGUAGE_KEYS.PAGE_FREELANCER_HIRE_ME]: {
    [Language.Zh]: '或在 Upwork 雇佣我',
    [Language.En]: 'Hire me on upwork.com'
  },
  [LANGUAGE_KEYS.DEVICE_ANDROID]: {
    [Language.Zh]: 'Android',
    [Language.En]: 'Android'
  },
  [LANGUAGE_KEYS.DEVICE_IOS]: {
    [Language.Zh]: 'IOS',
    [Language.En]: 'IOS'
  },
  [LANGUAGE_KEYS.AD]: {
    [Language.Zh]: '广而告之',
    [Language.En]: 'AD'
  },
  [LANGUAGE_KEYS.WEBCAM]: {
    [Language.Zh]: '见相',
    [Language.En]: 'Webcam'
  },
  [LANGUAGE_KEYS.BARRAGE]: {
    [Language.Zh]: '畅言',
    [Language.En]: 'Barrage'
  },
  [LANGUAGE_KEYS.FEEDBACK]: {
    [Language.Zh]: '反馈',
    [Language.En]: 'Feedback'
  },
  [LANGUAGE_KEYS.TO_TOP]: {
    [Language.Zh]: '从头开始',
    [Language.En]: 'To top'
  },
  [LANGUAGE_KEYS.TO_BOTTOM]: {
    [Language.Zh]: '再来一屏',
    [Language.En]: 'Next screen'
  },
  [LANGUAGE_KEYS.ORIGIN_ORIGINAL]: {
    [Language.Zh]: '原创',
    [Language.En]: 'og'
  },
  [LANGUAGE_KEYS.ORIGIN_REPRINT]: {
    [Language.Zh]: '转载',
    [Language.En]: 'rp'
  },
  [LANGUAGE_KEYS.ORIGIN_HYBRID]: {
    [Language.Zh]: '混撰',
    [Language.En]: 'hb'
  },
  [LANGUAGE_KEYS.ACTION_OPEN_DESC]: {
    [Language.Zh]: '展开描述',
    [Language.En]: 'open description'
  },
  [LANGUAGE_KEYS.ACTION_CLOSE_DESC]: {
    [Language.Zh]: '收起描述',
    [Language.En]: 'close description'
  },
  [LANGUAGE_KEYS.ACTION_ON]: {
    [Language.Zh]: '开',
    [Language.En]: 'on'
  },
  [LANGUAGE_KEYS.ACTION_OFF]: {
    [Language.Zh]: '关',
    [Language.En]: 'off'
  },
  [LANGUAGE_KEYS.APP_SLOGAN]: {
    [Language.Zh]: '来苏之望',
    [Language.En]: 'Because the mountain was there'
  },
  [LANGUAGE_KEYS.MUSIC_PLACEHOLDER]: {
    [Language.Zh]: '五音六律，七弦八度',
    [Language.En]: 'The music, the soul of man'
  },
  [LANGUAGE_KEYS.SEARCH_PLACEHOLDER]: {
    [Language.Zh]: '探索与觉知',
    [Language.En]: 'Search..'
  },
  [LANGUAGE_KEYS.PAGE_TITLE]: {
    [Language.Zh]: '黄卷青灯',
    [Language.En]: 'pages'
  },
  [LANGUAGE_KEYS.ANNOUNCEMENT_PLACEHOLDER]: {
    [Language.Zh]: '空空如也',
    [Language.En]: 'No announcements'
  },
  [LANGUAGE_KEYS.CATEGORY_PLACEHOLDER]: {
    [Language.Zh]: '未分类',
    [Language.En]: 'no cate'
  },
  [LANGUAGE_KEYS.TAG_PLACEHOLDER]: {
    [Language.Zh]: '无标签',
    [Language.En]: 'No tags'
  },
  [LANGUAGE_KEYS.ARTICLE_TITLE]: {
    [Language.Zh]: '文不加点',
    [Language.En]: 'Articles'
  },
  [LANGUAGE_KEYS.ARTICLE_PLACEHOLDER]: {
    [Language.Zh]: '空空如也',
    [Language.En]: 'No articles'
  },
  [LANGUAGE_KEYS.ARTICLE_FULL_COL_READ]: {
    [Language.Zh]: '通栏阅读',
    [Language.En]: 'Full Column'
  },
  [LANGUAGE_KEYS.ARTICLE_FULL_SCREEN_READ]: {
    [Language.Zh]: '全屏阅读',
    [Language.En]: 'Full Screen'
  },
  [LANGUAGE_KEYS.ARTICLE_READ_ALL]: {
    [Language.Zh]: '阅读余下全文',
    [Language.En]: 'Read all'
  },
  [LANGUAGE_KEYS.ARTICLE_RENDERING]: {
    [Language.Zh]: '渲染中..',
    [Language.En]: 'rendering...'
  },
  [LANGUAGE_KEYS.HOT_ARTICLE_LIST_TITLE]: {
    [Language.Zh]: '群贤毕至',
    [Language.En]: 'hot'
  },
  [LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE]: {
    [Language.Zh]: '山河入梦',
    [Language.En]: 'loadmore'
  },
  [LANGUAGE_KEYS.ARTICLE_LIST_LOADING]: {
    [Language.Zh]: '人面桃花',
    [Language.En]: 'loading'
  },
  [LANGUAGE_KEYS.ARTICLE_LIST_NO_MORE]: {
    [Language.Zh]: '春尽江南',
    [Language.En]: 'no more'
  },
  [LANGUAGE_KEYS.COMMENT_LIST_PLACEHOLDER]: {
    [Language.Zh]: '期待你的捷足先登',
    [Language.En]: 'Hit the nail on the head'
  },
  [LANGUAGE_KEYS.COMMENT_ANONYMOUS]: {
    [Language.Zh]: '匿名用户',
    [Language.En]: 'anonymous'
  },
  [LANGUAGE_KEYS.COMMENT_LIKE]: {
    [Language.Zh]: '赞',
    [Language.En]: 'like'
  },
  [LANGUAGE_KEYS.COMMENT_REPLY]: {
    [Language.Zh]: '回复',
    [Language.En]: 'reply'
  },
  [LANGUAGE_KEYS.COMMENT_PAGINATION_OLD]: {
    [Language.Zh]: '最旧',
    [Language.En]: 'old'
  },
  [LANGUAGE_KEYS.COMMENT_PAGINATION_NEW]: {
    [Language.Zh]: '最新',
    [Language.En]: 'new'
  },
  [LANGUAGE_KEYS.COMMENT_PAGINATION_HOT]: {
    [Language.Zh]: '最热',
    [Language.En]: 'hot'
  },
  [LANGUAGE_KEYS.COMMENT_PAGINATION_COOL]: {
    [Language.Zh]: '最冷',
    [Language.En]: 'cool'
  },
  [LANGUAGE_KEYS.COMMENT_LOADMORE]: {
    [Language.Zh]: '加载更多评论',
    [Language.En]: 'loadmore comments'
  },
  [LANGUAGE_KEYS.COMMENT_POST_NAME]: {
    [Language.Zh]: '名字',
    [Language.En]: 'name'
  },
  [LANGUAGE_KEYS.COMMENT_POST_EMAIL]: {
    [Language.Zh]: '邮箱',
    [Language.En]: 'email'
  },
  [LANGUAGE_KEYS.COMMENT_POST_SITE]: {
    [Language.Zh]: '网址',
    [Language.En]: 'site'
  },
  [LANGUAGE_KEYS.COMMENT_POST_CONTENT]: {
    [Language.Zh]: '内容',
    [Language.En]: 'content'
  },
  [LANGUAGE_KEYS.COMMENT_POST_PLACEHOLDER]: {
    [Language.Zh]: '愿你的见解一针见血',
    [Language.En]: 'Hit the nail on the head'
  },
  [LANGUAGE_KEYS.COMMENT_POST_SUBMIT]: {
    [Language.Zh]: '发射',
    [Language.En]: 'publish'
  },
  [LANGUAGE_KEYS.COMMENT_POST_SUBMITTING]: {
    [Language.Zh]: '发射中..',
    [Language.En]: 'publishing'
  },
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_EMAIL]: {
    [Language.Zh]: '邮箱不合法',
    [Language.En]: 'Email address is not legitimate!'
  },
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_URL]: {
    [Language.Zh]: '网址不合法',
    [Language.En]: 'Site is not legitimate!'
  },
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_CONTENT]: {
    [Language.Zh]: '内容需要在 2000字/36行 以内',
    [Language.En]: 'Content requirements are within 2000 words / 36 lines!'
  },
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_SUBMIT]: {
    [Language.Zh]: '发布失败，原因 -> 控制台',
    [Language.En]: 'Submit failed, get err in dev console!'
  },
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_ACTION]: {
    [Language.Zh]: '操作失败，原因 -> 控制台',
    [Language.En]: 'Action failed, get error in dev console!'
  },
  [LANGUAGE_KEYS.COMMENT_ACCOUNT_SETTING]: {
    [Language.Zh]: '设置账户信息',
    [Language.En]: 'account setting'
  },
  [LANGUAGE_KEYS.COMMENT_ACCOUNT_EDIT]: {
    [Language.Zh]: '编辑信息',
    [Language.En]: 'edit profile'
  },
  [LANGUAGE_KEYS.COMMENT_ACCOUNT_CLEAR]: {
    [Language.Zh]: '清空信息',
    [Language.En]: 'clear profile'
  },
  [LANGUAGE_KEYS.COMMENT_LIST_COUNT]: {
    [Language.Zh]: '条看法',
    [Language.En]: 'comments'
  },
  [LANGUAGE_KEYS.COMMENT_LIKE_COUNT]: {
    [Language.Zh]: '人觉得有点牛逼',
    [Language.En]: 'likes'
  },
  [LANGUAGE_KEYS.QUERY_PARAMS_ERROR]: {
    [Language.Zh]: '请求参数错误：',
    [Language.En]: 'Invalid query params: '
  }
}
