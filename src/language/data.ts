/**
 * @file I18n config
 * @module i18n.config
 * @author Surmon <https://github.com/surmon-china>
 */

import { META } from '/@/config/app.config'
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
  [LANGUAGE_KEYS.APP_SLOGAN]: {
    [Language.Zh]: META.sub_title,
    [Language.En]: 'Because the mountain is there'
  },
  [LANGUAGE_KEYS.PAGE_HOME]: {
    [Language.Zh]: '明殿',
    [Language.En]: 'Home'
  },
  [LANGUAGE_KEYS.CATEGORY_INSIGHT]: {
    [Language.Zh]: '无色庵',
    [Language.En]: 'Insight'
  },
  [LANGUAGE_KEYS.CATEGORY_CODE]: {
    [Language.Zh]: '宁静寺',
    [Language.En]: 'Code'
  },
  [LANGUAGE_KEYS.PAGE_GITHUB]: {
    [Language.Zh]: '丹青阁',
    [Language.En]: 'GitHub'
  },
  [LANGUAGE_KEYS.PAGE_ARCHIVE]: {
    [Language.Zh]: '万象殿',
    [Language.En]: 'Archive'
  },
  [LANGUAGE_KEYS.PAGE_ABOUT]: {
    [Language.Zh]: '狂浪生',
    [Language.En]: 'About'
  },
  [LANGUAGE_KEYS.PAGE_GUESTBOOK]: {
    [Language.Zh]: '四方馆',
    [Language.En]: 'Guestbook'
  },
  [LANGUAGE_KEYS.PAGE_APP]: {
    [Language.Zh]: '客户端',
    [Language.En]: 'APP'
  },
  [LANGUAGE_KEYS.PAGE_LENS]: {
    [Language.Zh]: '茫涯',
    [Language.En]: 'Lens'
  },
  [LANGUAGE_KEYS.PAGE_MUSIC]: {
    [Language.Zh]: '梨园',
    [Language.En]: 'Music'
  },
  [LANGUAGE_KEYS.PAGE_JOB]: {
    [Language.Zh]: '伯乐',
    [Language.En]: 'Job'
  },
  [LANGUAGE_KEYS.PAGE_MERCH]: {
    [Language.Zh]: '周边',
    [Language.En]: 'Merch'
  },
  [LANGUAGE_KEYS.PAGE_FREELANCER]: {
    [Language.Zh]: '善巧堂',
    [Language.En]: 'Freelancer'
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
    [Language.En]: 'Email me'
  },
  [LANGUAGE_KEYS.AD]: {
    [Language.Zh]: '广而告之',
    [Language.En]: 'AD'
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
    [Language.En]: 'OG'
  },
  [LANGUAGE_KEYS.ORIGIN_REPRINT]: {
    [Language.Zh]: '转载',
    [Language.En]: 'RPT'
  },
  [LANGUAGE_KEYS.ORIGIN_HYBRID]: {
    [Language.Zh]: '衍生',
    [Language.En]: 'HY'
  },
  [LANGUAGE_KEYS.ACTION_ON]: {
    [Language.Zh]: '开',
    [Language.En]: 'on'
  },
  [LANGUAGE_KEYS.ACTION_OFF]: {
    [Language.Zh]: '关',
    [Language.En]: 'off'
  },
  [LANGUAGE_KEYS.MUSIC_PLACEHOLDER]: {
    [Language.Zh]: '五音六律，七弦八度',
    [Language.En]: 'The music, the soul of man'
  },
  [LANGUAGE_KEYS.SEARCH_PLACEHOLDER]: {
    [Language.Zh]: '探索与觉知',
    [Language.En]: 'Search...'
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
  [LANGUAGE_KEYS.ARTICLE_READ_ALL]: {
    [Language.Zh]: '阅读余下全文',
    [Language.En]: 'Render all'
  },
  [LANGUAGE_KEYS.ARTICLE_RENDERING]: {
    [Language.Zh]: '渲染中..',
    [Language.En]: 'Rendering...'
  },
  [LANGUAGE_KEYS.HOT_ARTICLE_LIST_TITLE]: {
    [Language.Zh]: '群贤毕至',
    [Language.En]: 'Hottest'
  },
  [LANGUAGE_KEYS.ARTICLE_LIST_LOADMORE]: {
    [Language.Zh]: '山河入梦',
    [Language.En]: 'Loadmore'
  },
  [LANGUAGE_KEYS.ARTICLE_LIST_LOADING]: {
    [Language.Zh]: '人面桃花',
    [Language.En]: 'Loading'
  },
  [LANGUAGE_KEYS.ARTICLE_LIST_NO_MORE]: {
    [Language.Zh]: '春尽江南',
    [Language.En]: 'No more'
  },
  [LANGUAGE_KEYS.COMMENT_LIST_EMPTY]: {
    [Language.Zh]: '期待你的捷足先登',
    [Language.En]: 'Be the first to comment'
  },
  [LANGUAGE_KEYS.COMMENT_LIKE]: {
    [Language.Zh]: '赞',
    [Language.En]: 'like'
  },
  [LANGUAGE_KEYS.COMMENT_DISLIKE]: {
    [Language.Zh]: '踩',
    [Language.En]: 'dislike'
  },
  [LANGUAGE_KEYS.COMMENT_DELETE]: {
    [Language.Zh]: '删除',
    [Language.En]: 'delete'
  },
  [LANGUAGE_KEYS.COMMENT_DELETE_CONFIRM]: {
    [Language.Zh]: '确定要删除此评论吗？此操作不可恢复',
    [Language.En]: 'Are you sure you want to delete this comment? You cannot undo this action.'
  },
  [LANGUAGE_KEYS.COMMENT_REPLY]: {
    [Language.Zh]: '回复',
    [Language.En]: 'reply'
  },
  [LANGUAGE_KEYS.COMMENT_REPLY_CANCEL]: {
    [Language.Zh]: '取消回复',
    [Language.En]: 'cancel reply'
  },
  [LANGUAGE_KEYS.COMMENT_MODERATOR]: {
    [Language.Zh]: '博主',
    [Language.En]: 'Moderator'
  },
  [LANGUAGE_KEYS.COMMENT_SORT_OLD]: {
    [Language.Zh]: '最早',
    [Language.En]: 'Oldest'
  },
  [LANGUAGE_KEYS.COMMENT_SORT_NEW]: {
    [Language.Zh]: '最新',
    [Language.En]: 'Newest'
  },
  [LANGUAGE_KEYS.COMMENT_SORT_HOT]: {
    [Language.Zh]: '最热',
    [Language.En]: 'Hottest'
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
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_EMAIL]: {
    [Language.Zh]: '邮箱不合法',
    [Language.En]: 'Email address is not legitimate!'
  },
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_URL]: {
    [Language.Zh]: '网址不合法',
    [Language.En]: 'Site is not legitimate!'
  },
  [LANGUAGE_KEYS.COMMENT_POST_ERROR_CONTENT]: {
    [Language.Zh]: '内容需要在 3000 字以内',
    [Language.En]: 'Content requirements are within 3000 words!'
  },
  [LANGUAGE_KEYS.QUERY_PARAMS_ERROR]: {
    [Language.Zh]: '请求参数错误：',
    [Language.En]: 'Invalid query params: '
  },
  [LANGUAGE_KEYS.POST_ACTION_ERROR]: {
    [Language.Zh]: '操作失败，详细原因 > 控制台',
    [Language.En]: 'Failed! Get error detail in console'
  }
}
