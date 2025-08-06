import { inject, ref, computed, reactive, readonly, onServerPrefetch, shallowRef, watch, unref, useSSRContext, onMounted, onBeforeUnmount, defineComponent, h, nextTick, mergeProps, resolveComponent, withCtx, createVNode, createBlock, createCommentVNode, openBlock, Fragment, toDisplayString, onBeforeMount, createTextVNode, TransitionGroup, renderList, Transition, resolveDirective, renderSlot, toRaw, createSlots, onUnmounted, onUpdated, resolveDynamicComponent, withDirectives, shallowReactive, useSlots, cloneVNode, Suspense, onErrorCaptured, createSSRApp } from "vue";
import { UAParser } from "ua-parser-js";
import serialize from "serialize-javascript";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr, ssrGetDirectiveProps, ssrRenderVNode, ssrLooseEqual, ssrRenderSuspense, renderToString } from "vue/server-renderer";
import { useRoute, useRouter, createRouter, RouterLink, createMemoryHistory } from "vue-router";
import { renderSSRHead, createHead } from "@unhead/vue/server";
import { defineStore, createPinia, storeToRefs } from "pinia";
import _isUndefined from "lodash-es/isUndefined.js";
import axios, { isAxiosError } from "axios";
import _escape from "lodash-es/escape.js";
import _unescape from "lodash-es/unescape.js";
import _capitalize from "lodash-es/capitalize.js";
import _isNil from "lodash-es/isNil.js";
import hljs from "highlight.js/lib/core";
import go from "highlight.js/lib/languages/go";
import css from "highlight.js/lib/languages/css";
import sql from "highlight.js/lib/languages/sql";
import php from "highlight.js/lib/languages/php";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import less from "highlight.js/lib/languages/less";
import scss from "highlight.js/lib/languages/scss";
import rust from "highlight.js/lib/languages/rust";
import shell from "highlight.js/lib/languages/shell";
import nginx from "highlight.js/lib/languages/nginx";
import stylus from "highlight.js/lib/languages/stylus";
import python from "highlight.js/lib/languages/python";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import { Marked, Renderer } from "marked";
import { mangle } from "marked-mangle";
import { markedXhtml } from "marked-xhtml";
import { markedHighlight } from "marked-highlight";
import { sanitizeUrl } from "@braintree/sanitize-url";
import lozad from "lozad";
import BezierEasing from "bezier-easing";
import cookies from "js-cookie";
import { useHead } from "@unhead/vue";
import { Swiper } from "swiper";
import { Autoplay, Mousewheel, Grid, EffectFade } from "swiper/modules";
import { Swiper as Swiper$1, SwiperSlide } from "swiper/vue";
import QRCode from "qrcode";
const APP_VERSION = "5.3.1";
const APP_MODE = "production";
const isDev = false;
const isClient = false;
var LocaleKey = /* @__PURE__ */ ((LocaleKey2) => {
  LocaleKey2["APP_SLOGAN"] = "app-slogan";
  LocaleKey2["CATEGORY_INSIGHT"] = "insight";
  LocaleKey2["CATEGORY_CODE"] = "code";
  LocaleKey2["PAGE_HOME"] = "home";
  LocaleKey2["PAGE_GITHUB"] = "github";
  LocaleKey2["PAGE_PHOTOGRAPHY"] = "photography";
  LocaleKey2["PAGE_ABOUT"] = "about";
  LocaleKey2["PAGE_SPONSOR"] = "sponsor";
  LocaleKey2["PAGE_SNIPPETS"] = "snippets";
  LocaleKey2["PAGE_GUESTBOOK"] = "guestbook";
  LocaleKey2["PAGE_APP"] = "app";
  LocaleKey2["PAGE_ARCHIVE"] = "archive";
  LocaleKey2["STATISTIC_ARTICLES"] = "statistic-articles";
  LocaleKey2["STATISTIC_COMMENTS"] = "statistic-comments";
  LocaleKey2["STATISTIC_TAGS"] = "statistic-tags";
  LocaleKey2["STATISTIC_TODAY_VIEWS"] = "statistic-today-views";
  LocaleKey2["STATISTIC_TOTAL_VIEWS"] = "statistic-total-views";
  LocaleKey2["STATISTIC_TOTAL_UPVOTES"] = "statistic-total-upvotes";
  LocaleKey2["STATISTIC_AVERAGE_EMOTION"] = "statistic-average-emotion";
  LocaleKey2["EMPTY_PLACEHOLDER"] = "common-empty-placeholder";
  LocaleKey2["NOT_FOUND"] = "not-found";
  LocaleKey2["BACK_TO_HOME_PAGE"] = "back-to-home-page";
  LocaleKey2["GUESTBOOK_SLOGAN"] = "guestbook-banner-slogan";
  LocaleKey2["AD"] = "ad";
  LocaleKey2["FEEDBACK"] = "feedback";
  LocaleKey2["TO_TOP"] = "to-page-top";
  LocaleKey2["TO_BOTTOM"] = "to-page-bottom";
  LocaleKey2["ORIGIN_ORIGINAL"] = "original";
  LocaleKey2["ORIGIN_REPRINT"] = "reprint";
  LocaleKey2["ORIGIN_HYBRID"] = "hybrid";
  LocaleKey2["ACTION_ON"] = "on";
  LocaleKey2["ACTION_OFF"] = "off";
  LocaleKey2["MUSIC_PLACEHOLDER"] = "music-placeholder";
  LocaleKey2["SEARCH_PLACEHOLDER"] = "search-input-placeholder";
  LocaleKey2["ANNOUNCEMENT_PLACEHOLDER"] = "announcement-empty-placeholder";
  LocaleKey2["CATEGORY_UNCATEGORIZED"] = "category-uncategorized";
  LocaleKey2["TAG_PLACEHOLDER"] = "tag-placeholder";
  LocaleKey2["LIST_NO_MORE_DATA"] = "no-more";
  LocaleKey2["ARTICLE_TITLE"] = "article-title";
  LocaleKey2["ARTICLE_VIEWS"] = "article-views";
  LocaleKey2["ARTICLE_PLACEHOLDER"] = "article-empty-placeholder";
  LocaleKey2["ARTICLE_READ_ALL"] = "read-all-article-content";
  LocaleKey2["ARTICLE_RENDERING"] = "rendering";
  LocaleKey2["ARTICLE_LIST_LOADMORE"] = "loadmore";
  LocaleKey2["ARTICLE_LIST_LOADING"] = "loading";
  LocaleKey2["ARTICLE_FEATURED"] = "article-featured";
  LocaleKey2["ARTICLE_FEATURED_SHORT"] = "article-featured-short";
  LocaleKey2["COMMENT_LIST_EMPTY"] = "comment-list-placeholder";
  LocaleKey2["COMMENT_UPVOTE"] = "comment-likes";
  LocaleKey2["COMMENT_DOWNVOTE"] = "comment-dislikes";
  LocaleKey2["COMMENT_REPLY"] = "reply-comment";
  LocaleKey2["COMMENT_DELETE"] = "delete-comment";
  LocaleKey2["COMMENT_DELETE_CONFIRM"] = "delete-comment-confirm";
  LocaleKey2["COMMENT_REPLY_CANCEL"] = "cancel-reply-comment";
  LocaleKey2["COMMENT_MODERATOR"] = "comment-moderator";
  LocaleKey2["COMMENT_SORT_OLD"] = "oldest-comments";
  LocaleKey2["COMMENT_SORT_NEW"] = "newest-comments";
  LocaleKey2["COMMENT_SORT_HOT"] = "hottest-comments";
  LocaleKey2["COMMENT_POST_NAME"] = "comment-author-name";
  LocaleKey2["COMMENT_POST_EMAIL"] = "comment-author-email";
  LocaleKey2["COMMENT_POST_SITE"] = "comment-author-site-url";
  LocaleKey2["COMMENT_POST_CONTENT"] = "comment-content";
  LocaleKey2["COMMENT_POST_PLACEHOLDER"] = "comment-box-placeholder";
  LocaleKey2["COMMENT_POST_ERROR_CONTENT"] = "comment-submit-failed-of-content-error";
  LocaleKey2["QUERY_PARAMS_ERROR"] = "query-params-error";
  LocaleKey2["POST_ACTION_ERROR"] = "post-requiest-failed-of-other-error";
  LocaleKey2["SUBMIT"] = "submit-data";
  LocaleKey2["SUBMITTING"] = "submitting";
  LocaleKey2["MOMENT_AM"] = "moment-am";
  LocaleKey2["MOMENT_PM"] = "moment-pm";
  LocaleKey2["MOMENT_JUST_NOW"] = "moment-just-now";
  LocaleKey2["MOMENT_MINUTES"] = "moment-minutes";
  LocaleKey2["MOMENT_HOURS"] = "moment-hours";
  LocaleKey2["MOMENT_WEEKS"] = "moment-weeks";
  LocaleKey2["MOMENT_DAYS"] = "moment-days";
  LocaleKey2["MOMENT_MONTHS"] = "moment-months";
  LocaleKey2["MOMENT_YEAR"] = "moment-year";
  LocaleKey2["MOMENT_AGO"] = "moment-ago";
  return LocaleKey2;
})(LocaleKey || {});
const BFF_CONFIG = Object.freeze({
  server_port: 3e3,
  server_local_url: "http://localhost:3000",
  tunnel_url_prefix: "/_tunnel",
  proxy_url_prefix: "/_proxy",
  proxy_allow_list_regexp: /^https:\/\/([a-z0-9-]+\.)*surmon\.(me|cn)/
});
const APP_CONFIG = Object.freeze({
  article_image_share_long_threshold: 6688,
  render_long_article_threshold: 16688,
  desktop_aside_article_list_count: 8,
  default_error_code: 500,
  default_comment_avatar: "/images/gravatar.png",
  default_og_image: "/images/og-social-card.jpg",
  title_separator: " | ",
  primary_color: "#0088f5"
});
const APP_META = Object.freeze({
  title: "Surmon.me",
  zh_sub_title: "斯是陋室，唯吾芳馨",
  en_sub_title: `Surmon's digital vihara`,
  zh_description: "本是浪蝶游蜂，无智无德无明；幸闻佛道开化，志利有情众生",
  zh_description_short: "本为蝶蜂，无德无明；幸闻佛道，志利众生",
  en_description: "Either write something worth reading or do something worth writing.",
  url: "https://surmon.me",
  domain: "surmon.me",
  author: "Surmon",
  about_page_geo_zh_title: "长居亚洲，游走热带",
  about_page_geo_en_title: "UTC +07:00 ~ +09:00",
  about_page_geo_coordinates: [103.830391822121, 1.340863]
});
const MAPBOX_CONFIG = Object.freeze({
  // readonly token
  TOKEN: "pk.eyJ1Ijoic3VybW9uIiwiYSI6ImNsNDE4YmkzNjB2Z2wzY3F5dWg2M2tqeWIifQ.JhgYGFI4zsuNiX9dH-pBDg",
  STYLE_LIGHT: "mapbox://styles/surmon/cl41fktzn000f14pet94oo1u4",
  STYLE_DARK: "mapbox://styles/surmon/cl41gy1qo000l15ry20j5ae0k",
  ZOOM: 12.4374,
  CENTER: [103.830391822121, 1.348463]
});
const IDENTITIES = Object.freeze({
  GOOGLE_ANALYTICS_MEASUREMENT_ID: "G-R40DDTSYNQ",
  GOOGLE_ADSENSE_CLIENT_ID: "ca-pub-4710915636313788",
  SENTRY_PUBLIC_DSN: "https://4a5f194531fe4527879812e4a4d8cf89@o360897.ingest.sentry.io/4505569138966528",
  YOUTUBE_CHANNEL_ID: "UCoL-j6T28PLSJ2U6ZdONS0w",
  YOUTUBE_CHANNEL_SHORT_ID: "@surmon_v",
  MUSIC_163_BGM_ALBUM_ID: "638949385",
  ZHIHU_USERNAME: "surmon",
  DOUBAN_USER_ID: "56647958",
  INSTAGRAM_USERNAME: "surmon_sattva",
  BTC_ADDRESS: "bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze",
  ETH_ADDRESS: "0xaD556974D449126efdeF23f4FF581861C301cB77"
});
const VALUABLE_LINKS = Object.freeze({
  RSS: "/rss.xml",
  SITE_MAP: "/sitemap.xml",
  MARKDOWN_DOC: "https://daringfireball.net/projects/markdown/",
  GITHUB_NODEPRESS: "https://github.com/surmon-china/nodepress",
  GITHUB_SURMON_ME: "https://github.com/surmon-china/surmon.me",
  GITHUB_SURMON_ME_NATIVE: "https://github.com/surmon-china/surmon.me.native",
  GITHUB_BLOG_STAR_LIST: "https://github.com/stars/surmon-china/lists/surmon-me",
  GOOGLE_MY_MAP: "https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3",
  MUSIC_163_PLAYLIST: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
  GITHUB_STATISTIC_JSON_URL: "https://raw.githubusercontent.com/surmon-china/surmon-china/release/",
  GOOGLE_MY_MAP_KML_URL: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w",
  GO_LINK_MAP_ENDPOINT: "https://go.surmon.me"
});
const GO_LINK_MAP_KEYS = Object.freeze([
  "status",
  "npm",
  "paypal",
  "github",
  "github-sponsors",
  "discord-server",
  "telegram-group",
  "youtube",
  "telegram",
  "opensea",
  "zhihu",
  "douban",
  "douban-movie",
  "xiaohongshu",
  "linkedin",
  "instagram",
  "threads",
  "x"
]);
const GO_LINK_MAP = GO_LINK_MAP_KEYS.reduce(
  (map, key) => ({ ...map, [key]: `${VALUABLE_LINKS.GO_LINK_MAP_ENDPOINT}/${key}` }),
  {}
);
const zhLangMap = {
  [LocaleKey.APP_SLOGAN]: APP_META.zh_sub_title,
  [LocaleKey.PAGE_HOME]: "明殿",
  [LocaleKey.CATEGORY_INSIGHT]: "无色庵",
  [LocaleKey.CATEGORY_CODE]: "宁静寺",
  [LocaleKey.PAGE_GITHUB]: "丹青阁",
  [LocaleKey.PAGE_ARCHIVE]: "海藏林",
  [LocaleKey.PAGE_GUESTBOOK]: "四方馆",
  [LocaleKey.PAGE_ABOUT]: "狂浪生",
  [LocaleKey.PAGE_SPONSOR]: "随喜",
  [LocaleKey.PAGE_SNIPPETS]: "觉有情",
  [LocaleKey.PAGE_PHOTOGRAPHY]: "大千界",
  [LocaleKey.PAGE_APP]: "客户端",
  [LocaleKey.STATISTIC_ARTICLES]: "全站文章",
  [LocaleKey.STATISTIC_COMMENTS]: "全站评论",
  [LocaleKey.STATISTIC_TAGS]: "全站标签",
  [LocaleKey.STATISTIC_TODAY_VIEWS]: "今日阅读",
  [LocaleKey.STATISTIC_TOTAL_VIEWS]: "累计被阅读",
  [LocaleKey.STATISTIC_TOTAL_UPVOTES]: "累计获赞",
  [LocaleKey.STATISTIC_AVERAGE_EMOTION]: "平均评分",
  [LocaleKey.EMPTY_PLACEHOLDER]: "空空如也",
  [LocaleKey.NOT_FOUND]: "众里寻他，我已不再",
  [LocaleKey.BACK_TO_HOME_PAGE]: "山河万里，长歌归故",
  [LocaleKey.GUESTBOOK_SLOGAN]: "此心光明，亦复何言",
  [LocaleKey.AD]: "广而告之",
  [LocaleKey.FEEDBACK]: "反馈",
  [LocaleKey.TO_TOP]: "回到顶部",
  [LocaleKey.TO_BOTTOM]: "下一屏",
  [LocaleKey.ORIGIN_ORIGINAL]: "原创",
  [LocaleKey.ORIGIN_REPRINT]: "转载",
  [LocaleKey.ORIGIN_HYBRID]: "衍生",
  [LocaleKey.ACTION_ON]: "开",
  [LocaleKey.ACTION_OFF]: "关",
  [LocaleKey.MUSIC_PLACEHOLDER]: "五音六律，七弦八度",
  [LocaleKey.SEARCH_PLACEHOLDER]: "上下求索",
  [LocaleKey.ANNOUNCEMENT_PLACEHOLDER]: "空空如也",
  [LocaleKey.CATEGORY_UNCATEGORIZED]: "未分类",
  [LocaleKey.TAG_PLACEHOLDER]: "无标签",
  [LocaleKey.ARTICLE_TITLE]: "文不加点",
  [LocaleKey.ARTICLE_VIEWS]: "次阅读",
  [LocaleKey.ARTICLE_PLACEHOLDER]: "空空如也",
  [LocaleKey.ARTICLE_READ_ALL]: "阅读余下全文",
  [LocaleKey.ARTICLE_RENDERING]: "渲染中..",
  [LocaleKey.LIST_NO_MORE_DATA]: "没有更多",
  [LocaleKey.ARTICLE_LIST_LOADMORE]: "加载更多",
  [LocaleKey.ARTICLE_LIST_LOADING]: "加载中...",
  [LocaleKey.ARTICLE_FEATURED]: "精选",
  [LocaleKey.ARTICLE_FEATURED_SHORT]: "精选",
  [LocaleKey.COMMENT_LIST_EMPTY]: "期待你的捷足先登",
  [LocaleKey.COMMENT_UPVOTE]: "赞",
  [LocaleKey.COMMENT_DOWNVOTE]: "踩",
  [LocaleKey.COMMENT_DELETE]: "删除",
  [LocaleKey.COMMENT_DELETE_CONFIRM]: "确定要删除此评论吗？此操作不可恢复",
  [LocaleKey.COMMENT_REPLY]: "回复",
  [LocaleKey.COMMENT_REPLY_CANCEL]: "取消回复",
  [LocaleKey.COMMENT_MODERATOR]: "博主",
  [LocaleKey.COMMENT_SORT_OLD]: "最早",
  [LocaleKey.COMMENT_SORT_NEW]: "最新",
  [LocaleKey.COMMENT_SORT_HOT]: "最热",
  [LocaleKey.COMMENT_POST_NAME]: "名字",
  [LocaleKey.COMMENT_POST_EMAIL]: "邮箱",
  [LocaleKey.COMMENT_POST_SITE]: "网址",
  [LocaleKey.COMMENT_POST_CONTENT]: "内容",
  [LocaleKey.COMMENT_POST_PLACEHOLDER]: "愿你的见解一针见血",
  [LocaleKey.COMMENT_POST_ERROR_CONTENT]: "内容需要在 3000 字以内",
  [LocaleKey.QUERY_PARAMS_ERROR]: "请求参数错误：",
  [LocaleKey.POST_ACTION_ERROR]: "操作失败，详细原因 > 控制台",
  [LocaleKey.SUBMIT]: "提交",
  [LocaleKey.SUBMITTING]: "提交中...",
  [LocaleKey.MOMENT_AM]: "上午",
  [LocaleKey.MOMENT_PM]: "下午",
  [LocaleKey.MOMENT_JUST_NOW]: "刚刚",
  [LocaleKey.MOMENT_MINUTES]: "分钟",
  [LocaleKey.MOMENT_HOURS]: "小时",
  [LocaleKey.MOMENT_WEEKS]: "周",
  [LocaleKey.MOMENT_DAYS]: "天",
  [LocaleKey.MOMENT_MONTHS]: "个月",
  [LocaleKey.MOMENT_YEAR]: "年",
  [LocaleKey.MOMENT_AGO]: (args) => `${args.date}前`
};
const enLangMap = {
  [LocaleKey.APP_SLOGAN]: APP_META.en_sub_title,
  [LocaleKey.PAGE_HOME]: "Home",
  [LocaleKey.CATEGORY_INSIGHT]: "Insight",
  [LocaleKey.CATEGORY_CODE]: "Code",
  [LocaleKey.PAGE_ARCHIVE]: "Archive",
  [LocaleKey.PAGE_GITHUB]: "GitHub",
  [LocaleKey.PAGE_ABOUT]: "About",
  [LocaleKey.PAGE_GUESTBOOK]: "Guestbook",
  [LocaleKey.PAGE_SPONSOR]: "Sponsor",
  [LocaleKey.PAGE_SNIPPETS]: "Snippets",
  [LocaleKey.PAGE_APP]: "APP",
  [LocaleKey.PAGE_PHOTOGRAPHY]: "Photog",
  [LocaleKey.STATISTIC_ARTICLES]: "Articles",
  [LocaleKey.STATISTIC_COMMENTS]: "Comments",
  [LocaleKey.STATISTIC_TAGS]: "Tags",
  [LocaleKey.STATISTIC_TODAY_VIEWS]: "Today views",
  [LocaleKey.STATISTIC_TOTAL_VIEWS]: "Total views",
  [LocaleKey.STATISTIC_TOTAL_UPVOTES]: "Total upvotes",
  [LocaleKey.STATISTIC_AVERAGE_EMOTION]: "Rating",
  [LocaleKey.EMPTY_PLACEHOLDER]: "NULL",
  [LocaleKey.NOT_FOUND]: "Arrives here at last",
  [LocaleKey.BACK_TO_HOME_PAGE]: "Back to home page",
  [LocaleKey.GUESTBOOK_SLOGAN]: "Chop wood, Carry water",
  [LocaleKey.AD]: "AD",
  [LocaleKey.FEEDBACK]: "Feedback",
  [LocaleKey.TO_TOP]: "To top",
  [LocaleKey.TO_BOTTOM]: "Next screen",
  [LocaleKey.ORIGIN_ORIGINAL]: "OG",
  [LocaleKey.ORIGIN_REPRINT]: "RPT",
  [LocaleKey.ORIGIN_HYBRID]: "HY",
  [LocaleKey.ACTION_ON]: "on",
  [LocaleKey.ACTION_OFF]: "off",
  [LocaleKey.MUSIC_PLACEHOLDER]: "Music player",
  [LocaleKey.SEARCH_PLACEHOLDER]: "Search...",
  [LocaleKey.CATEGORY_UNCATEGORIZED]: "Uncategorized",
  [LocaleKey.ANNOUNCEMENT_PLACEHOLDER]: "No announcements",
  [LocaleKey.TAG_PLACEHOLDER]: "No tags",
  [LocaleKey.LIST_NO_MORE_DATA]: "No more",
  [LocaleKey.ARTICLE_PLACEHOLDER]: "No articles",
  [LocaleKey.ARTICLE_TITLE]: "Articles",
  [LocaleKey.ARTICLE_VIEWS]: "views",
  [LocaleKey.ARTICLE_READ_ALL]: "Show Full Article",
  [LocaleKey.ARTICLE_RENDERING]: "Rendering...",
  [LocaleKey.ARTICLE_LIST_LOADMORE]: "Loadmore",
  [LocaleKey.ARTICLE_LIST_LOADING]: "Loading...",
  [LocaleKey.ARTICLE_FEATURED]: "featured",
  [LocaleKey.ARTICLE_FEATURED_SHORT]: "feat",
  [LocaleKey.COMMENT_LIST_EMPTY]: "Be the first to comment",
  [LocaleKey.COMMENT_UPVOTE]: "upvote",
  [LocaleKey.COMMENT_DOWNVOTE]: "downvote",
  [LocaleKey.COMMENT_DELETE]: "delete",
  [LocaleKey.COMMENT_DELETE_CONFIRM]: "Are you sure you want to delete this comment? You cannot undo this action.",
  [LocaleKey.COMMENT_REPLY]: "reply",
  [LocaleKey.COMMENT_REPLY_CANCEL]: "cancel reply",
  [LocaleKey.COMMENT_MODERATOR]: "Moderator",
  [LocaleKey.COMMENT_SORT_OLD]: "Oldest",
  [LocaleKey.COMMENT_SORT_NEW]: "Newest",
  [LocaleKey.COMMENT_SORT_HOT]: "Hottest",
  [LocaleKey.COMMENT_POST_NAME]: "name",
  [LocaleKey.COMMENT_POST_EMAIL]: "email",
  [LocaleKey.COMMENT_POST_SITE]: "site",
  [LocaleKey.COMMENT_POST_CONTENT]: "content",
  [LocaleKey.COMMENT_POST_PLACEHOLDER]: "Hit the nail on the head",
  [LocaleKey.COMMENT_POST_ERROR_CONTENT]: "Content requirements are within 3000 characters!",
  [LocaleKey.QUERY_PARAMS_ERROR]: "Invalid query params: ",
  [LocaleKey.POST_ACTION_ERROR]: "Failed! Get error detail in console",
  [LocaleKey.SUBMIT]: "Submit",
  [LocaleKey.SUBMITTING]: "Submitting...",
  [LocaleKey.MOMENT_AM]: "AM",
  [LocaleKey.MOMENT_PM]: "PM",
  [LocaleKey.MOMENT_JUST_NOW]: "Just now",
  [LocaleKey.MOMENT_MINUTES]: "minutes",
  [LocaleKey.MOMENT_HOURS]: "hours",
  [LocaleKey.MOMENT_WEEKS]: "weeks",
  [LocaleKey.MOMENT_DAYS]: "days",
  [LocaleKey.MOMENT_MONTHS]: "months",
  [LocaleKey.MOMENT_YEAR]: "year",
  [LocaleKey.MOMENT_AGO]: (args) => `${args.date} ago`
};
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["English"] = "en";
  Language2["Chinese"] = "zh";
  return Language2;
})(Language || {});
const locales = [
  {
    code: "zh",
    iso: "zh-CN",
    name: "简体中文",
    data: zhLangMap
  },
  {
    code: "en",
    iso: "en-US",
    name: "English",
    data: enLangMap
  }
];
const uaParser = (userAgent) => {
  const parsed = UAParser(userAgent || "");
  const browserName = String(parsed.browser.name).toLowerCase();
  const isBrowserMatched = (browsers) => {
    return browsers.some((browser) => browser.toLowerCase() === browserName);
  };
  return {
    uap: parsed,
    isIE: isBrowserMatched(["compatible", "MSIE", "IE", "IEMobile"]),
    isEdge: isBrowserMatched(["Edge"]),
    isFirefox: isBrowserMatched(["Firefox"]),
    isChrome: isBrowserMatched(["Chrome", "Chromium"]),
    isSafari: isBrowserMatched(["Safari"]),
    isWechat: isBrowserMatched(["Wechat"]),
    isIos: parsed.os.is("iOS"),
    isAndroid: parsed.os.is("Android"),
    isMobile: parsed.device.is("mobile")
  };
};
const isTargetLanguageUser = (language, targetLang) => {
  if (typeof language === "string") {
    return language.includes(targetLang);
  }
  if (Array.isArray(language)) {
    return language.some((lang) => lang.includes(targetLang));
  }
  return false;
};
const isZhUser = (language) => {
  return Array.isArray(language) ? language.length ? isTargetLanguageUser(language, Language.Chinese) : true : language ? isTargetLanguageUser(language, Language.Chinese) : true;
};
var PageLayout = /* @__PURE__ */ ((PageLayout2) => {
  PageLayout2[PageLayout2["Normal"] = 0] = "Normal";
  PageLayout2[PageLayout2["Wide"] = 1] = "Wide";
  PageLayout2[PageLayout2["Full"] = 2] = "Full";
  return PageLayout2;
})(PageLayout || {});
const PAGE_LAYOUTS = Object.freeze([
  0,
  1,
  2
  /* Full */
]);
const resolvePageLayout = (input) => {
  if (_isNil(input)) {
    return 0;
  } else {
    return PAGE_LAYOUTS.includes(input) ? input : 0;
  }
};
class AppErrorClass extends Error {
  code;
  constructor(message, code) {
    super(message);
    this.name = "AppError";
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
const createAppError = (message, code) => {
  return new AppErrorClass(message, code);
};
const formatErrorToAppError = (error, fallbackError) => {
  if (isAxiosError(error)) {
    return {
      code: error.status ?? fallbackError.code,
      message: error.response?.data?.message || error.message || fallbackError.message
    };
  }
  if (error instanceof AppErrorClass) {
    return {
      code: error.code ?? fallbackError.code,
      message: error.message
    };
  }
  if (error instanceof Error) {
    return {
      code: error.code ?? fallbackError.code,
      message: error.message
    };
  }
  if (typeof error === "string") {
    return { ...fallbackError, message: error };
  }
  if (typeof error === "object") {
    return {
      code: error.code ?? fallbackError.code,
      message: error.message || fallbackError.message
    };
  }
  return {
    code: fallbackError.code,
    message: JSON.stringify(error)
  };
};
const createLogger = (scope) => ({
  // levels
  log: (...messages) => console.log("⚪", `[${scope}]`, ...messages),
  info: (...messages) => console.info("🔵", `[${scope}]`, ...messages),
  warn: (...messages) => console.warn("🟠", `[${scope}]`, ...messages),
  error: (...messages) => console.error("🔴", `[${scope}]`, ...messages),
  debug: (...messages) => console.debug("🟤", `[${scope}]`, ...messages),
  // aliases
  success: (...messages) => console.log("🟢", `[${scope}]`, ...messages),
  failure: (...messages) => console.warn("🔴", `[${scope}]`, ...messages)
});
const logger$1 = createLogger("APP");
const GlobalStateSymbol = Symbol("globalState");
const createGlobalState = (options) => {
  const userAgent = {
    original: options.userAgent,
    languages: options.languages,
    isZhUser: isZhUser(options.languages),
    ...uaParser(options.userAgent)
  };
  let isHydrated = false;
  const setHydrate = () => {
    isHydrated = true;
  };
  const error = ref(options.error ?? null);
  const setError = (_error) => {
    error.value = !_error ? null : formatErrorToAppError(_error, {
      code: APP_CONFIG.default_error_code,
      message: "Unknown Error"
    });
  };
  const pageLayoutValue = ref(options.layout);
  const pageLayout = computed(() => ({
    layout: pageLayoutValue.value,
    isNormal: pageLayoutValue.value === PageLayout.Normal,
    isWide: pageLayoutValue.value === PageLayout.Wide,
    isFull: pageLayoutValue.value === PageLayout.Full
  }));
  const setPageLayout = (layout) => {
    if (layout !== pageLayoutValue.value) {
      pageLayoutValue.value = layout;
    }
  };
  const switcher = reactive({
    sponsor: false,
    feedback: false,
    statement: false
  });
  const toggleSwitcher = (key, value) => {
    switcher[key] = value;
  };
  const globalState = {
    // Device state
    userAgent,
    // Hydrate state
    setHydrate,
    get isHydrated() {
      return isHydrated;
    },
    // App error state
    error: readonly(error),
    setError,
    // Layout state
    pageLayout,
    setPageLayout,
    // Global switchers
    switcher: readonly(switcher),
    toggleSwitcher
  };
  return {
    ...globalState,
    install(app) {
      app.provide(GlobalStateSymbol, globalState);
    }
  };
};
const useGlobalState = () => {
  return inject(GlobalStateSymbol);
};
const useUniversalFetch = (fetcher) => {
  const globalState = useGlobalState();
  {
    onServerPrefetch(() => {
      return fetcher().catch((error) => {
        globalState.setError(error);
        return Promise.reject(error);
      });
    });
  }
};
const SSR_STATE_KEY = "__INITIAL_SSR_STATE__";
const renderSSRStateScript = (data) => {
  return `<script>window.${SSR_STATE_KEY} = ${data}<\/script>`;
};
const getSSRStateValue = (key) => {
  return window[SSR_STATE_KEY]?.[key];
};
const SSR_CONTEXT_KEY = "__SSR_CONTEXT__";
const renderSSRContextScript = (data) => {
  return `<script>window.${SSR_CONTEXT_KEY} = ${data}<\/script>`;
};
const createFetchStore = (options) => {
  const isShallow = _isUndefined(options.shallow) ? true : options.shallow;
  const refWrapper = isShallow ? shallowRef : ref;
  const fetching = ref(false);
  const fetched = ref(false);
  const data = refWrapper(options.data);
  const fetch = async (...args) => {
    if (options.once && fetched.value) {
      return;
    }
    fetching.value = true;
    if (options.preclean) {
      data.value = options.data;
    }
    try {
      const result = await options.fetcher(...args);
      data.value = result;
      fetched.value = true;
    } finally {
      fetching.value = false;
    }
  };
  return {
    data,
    fetching,
    fetched,
    fetch
  };
};
const SUCCESS = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const NETWORK_ERROR = 499;
const API_LOCAL_URL = "http://localhost:8000";
const PROD_API = API_LOCAL_URL;
const API_CONFIG = {
  NODEPRESS: PROD_API,
  FRONT_END: "https://surmon.me",
  STATIC: "https://static.surmon.me",
  CDN_CHINA: "https://cdn.surmon.cn",
  CDN_GLOBAL: "https://cdn.surmon.me"
};
const nodepress = axios.create({
  baseURL: API_CONFIG.NODEPRESS,
  withCredentials: true
});
nodepress.interceptors.response.use(
  (response) => {
    if (response.headers?.["content-type"]?.includes("json")) {
      if (response.data.status !== "success") {
        return Promise.reject(response.data);
      }
    }
    return response.data;
  },
  (error) => {
    const fallbackCode = error.code === "ECONNABORTED" || error.code === "ERR_NETWORK" ? NETWORK_ERROR : BAD_REQUEST;
    return Promise.reject({
      code: error?.status ?? error.response?.status ?? fallbackCode,
      message: error.response?.data?.message || error.response?.statusText || error?.message
    });
  }
);
const overwrite = (method) => {
  return (...args) => {
    return nodepress[method](...args);
  };
};
const nodepress$1 = {
  $: nodepress,
  request: overwrite("request"),
  head: overwrite("head"),
  get: overwrite("get"),
  post: overwrite("post"),
  put: overwrite("put"),
  patch: overwrite("patch"),
  delete: overwrite("delete"),
  options: overwrite("options")
};
const useAnnouncementStore = defineStore("announcement", () => {
  return createFetchStore({
    data: [],
    preclean: true,
    async fetcher(params) {
      const response = await nodepress$1.get("/announcement", { params });
      return response.result.data;
    }
  });
});
const cloneDate = (date) => {
  return new Date(date.getTime());
};
const dateToHuman = (date) => {
  const week = date.getDay();
  return {
    day: date.getDate(),
    week: week === 0 ? 7 : week,
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
};
const isSameHumanDay = (target, target2) => {
  const isSameDay = target.day === target2.day;
  const isSameMonth = target.month === target2.month;
  const isSameYear = target.year === target2.year;
  return isSameDay && isSameMonth && isSameYear;
};
const humanToDate = (humanDate) => {
  const date = /* @__PURE__ */ new Date();
  date.setDate(humanDate.day);
  date.setFullYear(humanDate.year);
  date.setMonth(humanDate.month - 1);
  return date;
};
const humanDateToYMD = ({ year, month, day }, separator = "-") => {
  const _month = month ? separator + String(month).padStart(2, "0") : "";
  const _day = day ? separator + String(day).padStart(2, "0") : "";
  return `${year}${_month}${_day}`;
};
const dateToYMD = (date, separator) => {
  const _date = typeof date === "string" ? new Date(date) : date;
  return humanDateToYMD(dateToHuman(_date), separator);
};
const useArchiveStore = defineStore("archive", () => {
  const fetchStore = createFetchStore({
    data: null,
    once: true,
    async fetcher() {
      const response = await nodepress$1.get("/archive");
      return response.result;
    }
  });
  const tree = computed(() => {
    const rootTree = [];
    fetchStore.data.value?.articles.sort(({ created_at: a }, { created_at: b }) => {
      return Date.parse(b) - Date.parse(a);
    }).map((article) => ({
      ...article,
      createAt: dateToHuman(new Date(article.created_at))
    })).forEach((article) => {
      const { createAt } = article;
      const yearTree = rootTree.find((ye) => ye.year === createAt.year);
      let targetYear = yearTree;
      if (!targetYear) {
        targetYear = { year: createAt.year, months: [] };
        rootTree.push(targetYear);
      }
      const monthTree = targetYear.months.find((mo) => mo.month === createAt.month);
      let targetMonth = monthTree;
      if (!targetMonth) {
        targetMonth = { month: createAt.month, articles: [] };
        targetYear.months.push(targetMonth);
      }
      targetMonth.articles.push(article);
    });
    return rootTree;
  });
  return {
    ...fetchStore,
    tree
  };
});
var OriginState = /* @__PURE__ */ ((OriginState2) => {
  OriginState2[OriginState2["Original"] = 0] = "Original";
  OriginState2[OriginState2["Reprint"] = 1] = "Reprint";
  OriginState2[OriginState2["Hybrid"] = 2] = "Hybrid";
  return OriginState2;
})(OriginState || {});
var CommentPostId = /* @__PURE__ */ ((CommentPostId2) => {
  CommentPostId2[CommentPostId2["Guestbook"] = 0] = "Guestbook";
  return CommentPostId2;
})(CommentPostId || {});
var CommentParentId = /* @__PURE__ */ ((CommentParentId2) => {
  CommentParentId2[CommentParentId2["Self"] = 0] = "Self";
  return CommentParentId2;
})(CommentParentId || {});
var SortType = /* @__PURE__ */ ((SortType2) => {
  SortType2[SortType2["Asc"] = 1] = "Asc";
  SortType2[SortType2["Desc"] = -1] = "Desc";
  SortType2[SortType2["Hottest"] = 2] = "Hottest";
  return SortType2;
})(SortType || {});
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const delayPromise = (ms, promise) => {
  return Promise.all([promise, delay(ms)]).then(([result]) => result);
};
const get = (key) => localStorage.getItem(key);
const set = (key, data) => localStorage.setItem(key, data);
const remove = (key) => localStorage.removeItem(key);
const setJSON = (key, data) => set(key, JSON.stringify(data));
const getJSON = (key) => {
  const data = get(key);
  return typeof data === "string" ? JSON.parse(data) : null;
};
const storage = {
  get,
  set,
  remove,
  setJSON,
  getJSON
};
var UserType = /* @__PURE__ */ ((UserType2) => {
  UserType2[UserType2["Null"] = 0] = "Null";
  UserType2[UserType2["Local"] = 1] = "Local";
  UserType2[UserType2["Disqus"] = 2] = "Disqus";
  return UserType2;
})(UserType || {});
const LOCAL_STORGAE_KEY = "identity-state";
const useIdentityStore = defineStore("identity", () => {
  const disqusConfig = shallowRef(null);
  const user = reactive({
    type: 0,
    localProfile: null,
    disqusProfile: null
  });
  const vote = reactive({
    likedPages: [],
    likedComments: [],
    dislikedComments: []
  });
  const feedbacks = reactive([]);
  const isLikedPage = computed(() => (id) => vote.likedPages.includes(id));
  const isLikedComment = computed(() => (id) => vote.likedComments.includes(id));
  const isDislikedComment = computed(() => (id) => vote.dislikedComments.includes(id));
  const author = computed(() => {
    if (user.type === 1) {
      return user.localProfile;
    }
    if (user.type === 2) {
      return {
        name: user.disqusProfile?.name,
        site: user.disqusProfile?.url || user.disqusProfile?.profileUrl
      };
    }
    return null;
  });
  const likeComment = (commentId) => {
    vote.likedComments.push(commentId);
  };
  const dislikeComment = (commentId) => {
    vote.dislikedComments.push(commentId);
  };
  const likePage = (id) => {
    vote.likedPages.push(id);
  };
  const addFeedback = (data) => {
    feedbacks.push(data);
  };
  const saveLocalUser = (profile) => {
    user.localProfile = { ...profile };
    user.type = 1;
  };
  const removeLocalUser = () => {
    user.type = 0;
    user.localProfile = null;
  };
  const fetchDisqusLogout = async () => {
    await nodepress$1.post("/disqus/oauth-logout");
    user.type = 0;
    user.disqusProfile = null;
  };
  const fetchDisqusUserInfo = async () => {
    const response = await nodepress$1.get("/disqus/user-info");
    user.disqusProfile = response.result;
    user.type = 2;
  };
  const fetchDisqusConfig = async () => {
    const response = await nodepress$1.get("/disqus/config");
    disqusConfig.value = response.result;
  };
  const getStoreState = () => ({
    disqusConfig: unref(disqusConfig),
    user,
    vote,
    feedbacks
  });
  const setStoreState = (state) => {
    disqusConfig.value = state.disqusConfig;
    user.type = state.user.type;
    user.localProfile = state.user.localProfile;
    user.disqusProfile = state.user.disqusProfile;
    vote.likedPages = state.vote.likedPages;
    vote.likedComments = state.vote.likedComments;
    vote.dislikedComments = state.vote.dislikedComments;
    feedbacks.splice(0, feedbacks.length, ...state.feedbacks);
  };
  const resetStateFromStorage = () => {
    try {
      const localState = getJSON(LOCAL_STORGAE_KEY);
      if (localState) {
        setStoreState(localState);
      }
    } catch (error) {
      remove(LOCAL_STORGAE_KEY);
    }
  };
  const initOnClient = () => {
    fetchDisqusConfig();
    resetStateFromStorage();
    watch(
      () => getStoreState(),
      (state) => setJSON(LOCAL_STORGAE_KEY, state),
      { deep: true }
    );
    window.addEventListener("storage", (event) => {
      if (event.key === LOCAL_STORGAE_KEY) {
        resetStateFromStorage();
      }
    });
    if (user.type === 2) {
      fetchDisqusUserInfo().catch(() => {
        user.disqusProfile = null;
        user.type = 0;
      });
    } else {
      user.disqusProfile = null;
    }
  };
  return {
    disqusConfig,
    user,
    vote,
    feedbacks,
    author,
    isLikedPage,
    isLikedComment,
    isDislikedComment,
    likeComment,
    dislikeComment,
    likePage,
    addFeedback,
    saveLocalUser,
    removeLocalUser,
    fetchDisqusLogout,
    fetchDisqusUserInfo,
    fetchDisqusConfig,
    initOnClient
  };
});
const COMMENT_API_PATH = "/comment";
const useCommentStore = defineStore("comment", () => {
  const fetching = ref(false);
  const posting = ref(false);
  const deleting = ref(false);
  const comments = ref([]);
  const pagination = ref(null);
  const commentTreeList = computed(() => {
    const ids = comments.value.map((comment) => comment.id);
    const roots = comments.value.filter((comment) => {
      return comment.pid === CommentParentId.Self || !ids.includes(comment.pid);
    });
    const children = comments.value.filter((comment) => {
      return comment.pid !== CommentParentId.Self && ids.includes(comment.pid);
    });
    const fullMap = new Map(comments.value.map((comment) => [comment.id, comment]));
    const treeMap = new Map(
      roots.map((comment) => [comment.id, { comment, children: [] }])
    );
    const findRootParentId = (pid) => {
      const target = fullMap.get(pid);
      return !target ? void 0 : target.pid === CommentParentId.Self ? target.id : findRootParentId(target.pid);
    };
    children.forEach((comment) => {
      const rootPid = findRootParentId(comment.pid);
      if (rootPid) {
        if (treeMap.has(rootPid)) {
          const target = treeMap.get(rootPid);
          treeMap.set(rootPid, { ...target, children: [comment, ...target.children] });
        }
      }
    });
    return Array.from(treeMap.values());
  });
  const clearList = () => {
    comments.value = [];
    pagination.value = null;
  };
  const fetchList = async (params = {}, loadmore = false) => {
    params = {
      page: 1,
      per_page: 50,
      sort: SortType.Desc,
      ...params
    };
    if (params.page === 1) {
      clearList();
    }
    try {
      fetching.value = true;
      const request = nodepress$1.get(COMMENT_API_PATH, { params });
      const response = await (isClient ? delayPromise(480, request) : request);
      pagination.value = response.result.pagination;
      if (loadmore) {
        comments.value.push(...response.result.data);
      } else {
        comments.value = response.result.data;
      }
    } finally {
      fetching.value = false;
    }
  };
  const postComment = async (comment) => {
    try {
      posting.value = true;
      const response = await nodepress$1.post("/disqus/comment", comment);
      comments.value.unshift(response.result);
      if (pagination.value) {
        pagination.value.total++;
      }
      return response.result;
    } finally {
      posting.value = false;
    }
  };
  const deleteComment = async (commentId) => {
    try {
      deleting.value = true;
      await nodepress$1.delete("/disqus/comment", { data: { comment_id: commentId } });
      const index = comments.value.findIndex((comment) => comment.id === commentId);
      if (index > -1) {
        comments.value.splice(index, 1);
        pagination.value.total--;
      }
    } finally {
      deleting.value = false;
    }
  };
  const postCommentVote = async (commentId, vote) => {
    const identityStore = useIdentityStore();
    await nodepress$1.post(`/vote/comment`, { comment_id: commentId, vote, author: identityStore.author });
    const comment = comments.value.find((comment2) => comment2.id === commentId);
    if (comment) {
      vote > 0 ? comment.likes++ : comment.dislikes++;
    }
  };
  return {
    comments,
    pagination,
    fetching,
    posting,
    deleting,
    commentTreeList,
    clearList,
    fetchList,
    postComment,
    deleteComment,
    postCommentVote
  };
});
const useCategoryStore = defineStore("category", () => {
  return createFetchStore({
    data: [],
    once: true,
    fetcher() {
      return nodepress$1.get("/category/all").then((response) => {
        return response.result;
      });
    }
  });
});
const escape = _escape;
const unescape = _unescape;
const firstUpperCase = _capitalize;
function numberToKilo(count) {
  return count > 1e3 ? `${parseFloat((count / 1e3).toFixed(2))}k` : String(count);
}
function numberSplit(number) {
  return String(number).replace(/.{1,3}(?=(.{3})+$)/g, "$&,");
}
const CHINESE_NUMBER_TEXT = "〇一二三四五六七八九十".split("");
const CHINESE_NUMBER_CAPITAL_TEXT = "零壹贰叁肆伍陆柒捌玖拾".split("");
const numberToChinese = (text, capital = false) => {
  const targetText = capital ? CHINESE_NUMBER_CAPITAL_TEXT : CHINESE_NUMBER_TEXT;
  return String(text).split("").map((number) => targetText[Number(number)]).join("");
};
const isOriginalType = (originState) => {
  return _isNil(originState) || originState === OriginState.Original;
};
const isHybridType = (originState) => {
  return originState === OriginState.Hybrid;
};
const isReprintType = (originState) => {
  return originState === OriginState.Reprint;
};
const getExtendsObject = (kvs) => {
  return kvs?.length ? kvs.reduce((v, c) => ({ ...v, [c.name]: c.value }), {}) : {};
};
const getExtendValue = (kvs, key) => {
  return kvs.length ? getExtendsObject(kvs)[key] : void 0;
};
const getTagIconName = (tag) => {
  return getExtendValue(tag.extends || [], "icon") || "icon-tag";
};
const getTagEnName = (tag) => {
  if (!/.*[\u4e00-\u9fa5]+.*$/.test(tag.name)) {
    return tag.name;
  }
  if (tag.slug.includes("-")) {
    return tag.slug;
  }
  return firstUpperCase(tag.slug);
};
const useTagStore = defineStore("tag", () => {
  const fetchStore = createFetchStore({
    once: true,
    data: [],
    fetcher: async () => {
      const response = await nodepress$1.get("/tag/all");
      return response.result;
    }
  });
  const sorted = computed(() => {
    const tags = [...fetchStore.data.value];
    tags.sort((a, b) => b.article_count - a.article_count);
    return tags;
  });
  const fullNameTags = computed(() => {
    const tagMap = /* @__PURE__ */ new Map();
    fetchStore.data.value.forEach((tag) => {
      tagMap.set(tag.name, tag);
      tagMap.set(tag.name.toLowerCase(), tag);
      tagMap.set(tag.name.toUpperCase(), tag);
      tagMap.set(firstUpperCase(tag.name), tag);
    });
    return tagMap;
  });
  return { ...fetchStore, sorted, fullNameTags };
});
const vanilla = axios.create();
const useGoLinkStore = defineStore("goLinkMap", () => {
  const remoteLinkMap = shallowRef();
  const fetchRemoteLinkMap = () => {
    return vanilla.get(VALUABLE_LINKS.GO_LINK_MAP_ENDPOINT).then((response) => {
      remoteLinkMap.value = response.data;
    });
  };
  const map = computed(() => ({
    ...GO_LINK_MAP,
    ...remoteLinkMap.value
  }));
  return { fetchRemoteLinkMap, map };
});
var TunnelModule = /* @__PURE__ */ ((TunnelModule2) => {
  TunnelModule2["WebFont"] = "webfont";
  TunnelModule2["MyGoogleMap"] = "my_google_map";
  TunnelModule2["YouTubePlaylist"] = "youtube_playlist";
  TunnelModule2["YouTubeVideoList"] = "youtube_video_list";
  TunnelModule2["ThreadsProfile"] = "threads_profile";
  TunnelModule2["ThreadsMedias"] = "threads_medias";
  TunnelModule2["ThreadsMediaChildren"] = "threads_media_children";
  TunnelModule2["ThreadsMediaConversation"] = "threads_media_conversation";
  TunnelModule2["InstagramProfile"] = "instagram_profile";
  TunnelModule2["InstagramMedias"] = "instagram_medias";
  TunnelModule2["InstagramMediaChildren"] = "instagram_media_children";
  TunnelModule2["InstagramCalendar"] = "instagram_calendar";
  TunnelModule2["BingWallpaper"] = "bing_wallpaper";
  TunnelModule2["NetEaseMusic"] = "netease_music";
  TunnelModule2["DoubanMovies"] = "douban_movies";
  TunnelModule2["GitHubSponsors"] = "github_sponsors";
  TunnelModule2["GitHubContributions"] = "github_contributions";
  TunnelModule2["StatisticGitHubJson"] = "statistic_github_json";
  TunnelModule2["StatisticNpmJson"] = "statistic_npm_json";
  return TunnelModule2;
})(TunnelModule || {});
const tunnel = axios.create({
  baseURL: `${BFF_CONFIG.server_local_url}${BFF_CONFIG.tunnel_url_prefix}`
});
tunnel.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject({
      code: error?.status,
      message: error.response?.data ?? error.response?.statusText ?? error?.message
    });
  }
);
const tunnel$1 = {
  $: tunnel,
  request: (...args) => tunnel.request(...args),
  fetch: (module, params) => tunnel.get(module, { params })
};
const useWallpaperStore = defineStore("wallpaper", () => {
  const fetchStore = createFetchStore({
    fetcher: () => tunnel$1.fetch(TunnelModule.BingWallpaper),
    once: true,
    data: null
  });
  const papers = computed(() => {
    return (language) => fetchStore.data.value?.[language];
  });
  return { ...fetchStore, papers };
});
const useGitHubSponsorsStore = defineStore("githubSponsors", () => {
  return createFetchStore({
    fetcher: () => tunnel$1.fetch(TunnelModule.GitHubSponsors),
    once: true,
    data: null
  });
});
const useAdminProfileStore = defineStore("adminProfile", () => {
  return createFetchStore({
    data: null,
    async fetcher() {
      const response = await nodepress$1.get("/admin/profile");
      return response.result;
    }
  });
});
const useAppOptionStore = defineStore("appOption", () => {
  const fetchStore = createFetchStore({
    shallow: false,
    data: null,
    async fetcher() {
      const response = await nodepress$1.get("/option");
      return response.result;
    }
  });
  const adConfig = computed(() => {
    const adConfig2 = fetchStore.data.value?.ad_config;
    return {
      PC_CARROUSEL: void 0,
      PC_NAV: [],
      PC_ASIDE_SWIPER: [],
      ...adConfig2 ? JSON.parse(adConfig2) : {}
    };
  });
  const postSiteLike = () => {
    const identityStore = useIdentityStore();
    return nodepress$1.post("/vote/post", {
      vote: 1,
      post_id: CommentPostId.Guestbook,
      author: identityStore.author
    }).then((response) => {
      if (fetchStore.data.value) {
        fetchStore.data.value.meta.likes = response.result;
      }
    });
  };
  const postFeedback = (feedback) => {
    const identityStore = useIdentityStore();
    const authorName = identityStore.author?.name || null;
    return nodepress$1.post("/feedback", {
      ...feedback,
      tid: 0,
      user_name: authorName ? `${authorName} (${UserType[identityStore.user.type]})` : null,
      user_email: identityStore.author?.email || null
    });
  };
  return {
    ...fetchStore,
    adConfig,
    postSiteLike,
    postFeedback
  };
});
const useNodepressStatisticStore = defineStore("nodepressStatistic", () => {
  return createFetchStore({
    data: null,
    fetcher: async () => {
      const response = await nodepress$1.get("/extension/statistic");
      return response.result;
    }
  });
});
const useGitHubStatisticStore = defineStore("githubStatistic", () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.StatisticGitHubJson)
  });
});
const useNpmStatisticStore = defineStore("npmStatistic", () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.StatisticNpmJson)
  });
});
const useArticleCalendarStore = defineStore("articleCalendar", () => {
  return createFetchStore({
    once: true,
    data: [],
    async fetcher() {
      const response = await nodepress$1.get("/article/calendar", {
        params: { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }
      });
      return response.result;
    }
  });
});
const useInstagramCalendarStore = defineStore("instagramCalendar", () => {
  return createFetchStore({
    once: true,
    data: [],
    fetcher: () => tunnel$1.fetch(TunnelModule.InstagramCalendar)
  });
});
const useGitHubCalendarStore = defineStore("githubContributionsCalendar", () => {
  const fetchStore = createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.GitHubContributions)
  });
  const days = computed(() => {
    if (!fetchStore.data.value) {
      return [];
    }
    return fetchStore.data.value.weeks.map((week) => week.contributionDays).flat().map((day) => ({
      date: day.date,
      count: day.contributionCount,
      color: day.color
    }));
  });
  return { ...fetchStore, days };
});
const useDoubanMoviesStore = defineStore("doubanMovies", () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.DoubanMovies)
  });
});
const useThreadsProfileStore = defineStore("threadsProfile", () => {
  return createFetchStore({
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.ThreadsProfile)
  });
});
const useThreadsLatestMediasStore = defineStore("threadsLatestMedias", () => {
  return createFetchStore({
    data: null,
    fetcher: () => {
      const request = tunnel$1.fetch(TunnelModule.ThreadsMedias);
      return request;
    }
  });
});
const useInstagramProfileStore = defineStore("instagramProfile", () => {
  return createFetchStore({
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.InstagramProfile)
  });
});
const useInstagramLatestMediasStore = defineStore("instagramLatestMedias", () => {
  return createFetchStore({
    data: null,
    fetcher: () => {
      const request = tunnel$1.fetch(TunnelModule.InstagramMedias);
      return request;
    }
  });
});
const useYouTubePlayListStore = defineStore("youtubePlaylist", () => {
  return createFetchStore({
    data: [],
    async fetcher() {
      const response = await tunnel$1.fetch(TunnelModule.YouTubePlaylist);
      response.sort((a, b) => a.snippet.position - b.snippet.position);
      return response;
    }
  });
});
const useMyGoogleMapStore = defineStore("myGoogleMap", () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.MyGoogleMap)
  });
});
const useSSRContextValue = (key) => {
  {
    return useSSRContext()?.[key];
  }
};
const useCdnDomain = () => {
  const domain = useSSRContextValue("cdnDomain");
  if (!domain) throw new Error("CDN domain is not defined.");
  return domain;
};
const useCountryCode = () => {
  return useSSRContextValue("countryCode");
};
const HEADER_ELEMENT_ID = "A_header";
const NAV_ELEMENT_ID = "A_nav";
const MAIN_ELEMENT_ID = "A_main";
const MAIN_CONTENT_ELEMENT_ID = "A_main";
const ASIDE_ELEMENT_ID = "A_aside";
const FOOTER_ELEMENT_ID = "A_footer";
const ARTICLE_CONTENT_ELEMENT_ID = "A_article_content";
const ARTICLE_READMORE_ELEMENT_ID = "A_article_readmore";
const ARTICLE_META_ELEMENT_ID = "A_article_meta";
const ARTICLE_SHARE_ELEMENT_ID = "A_article_share";
const ARTICLE_RELATED_ELEMENT_ID = "A_article_related";
const ARTICLE_CONTENT_HEADING_ELEMENT_ID_PREFIX = "A_article_content_heading";
const getArticleContentHeadingElementId = (level, anchor) => {
  return `${ARTICLE_CONTENT_HEADING_ELEMENT_ID_PREFIX}_${level}_${anchor}`;
};
const getArticleHeadingUrlHash = (heading) => {
  return heading.replace(/[^\p{L}\d\s\-_]/gu, "").toLowerCase().replace(/\s+/g, "-");
};
const COMMENT_ELEMENT_ID = "A_comment_wrapper";
const COMMENT_PUBLISHER_ELEMENT_ID = "A_comment_publisher";
const COMMENT_REPLY_PUBLISHER_ELEMENT_ID = "A_comment_reply_publisher";
const COMMENT_FOOTER_ELEMENT_ID = "A_comment_footer";
const COMMENT_ITEM_ELEMENT_ID_PREFIX = "A_comment_content_item";
const getCommentItemElementId = (commentId) => {
  return `${COMMENT_ITEM_ELEMENT_ID_PREFIX}_${commentId}`;
};
const COMMENTS_URL_HASH = "comments";
const COMMENT_ITEM_URL_HASH_PREFIX = "comment-";
const getCommentIdByUrlHash = (hash) => {
  return hash.replace(COMMENT_ITEM_URL_HASH_PREFIX, "");
};
const languages = {
  go,
  css,
  sql,
  php,
  xml,
  yaml,
  json,
  bash,
  less,
  scss,
  rust,
  shell,
  nginx,
  stylus,
  python,
  javascript,
  typescript
};
Object.keys(languages).forEach((name) => hljs.registerLanguage(name, languages[name]));
const verseConfig = {
  transform(html) {
    if (html.startsWith("<verse ")) {
      return html.replace("<verse ", '<p class="verse" ');
    }
    if (html.startsWith("</verse>")) {
      return html.replace("</verse>", "</p>");
    }
    return html;
  }
};
const CUSTOM_ELEMENTS = {
  [
    "verse"
    /* Verse */
  ]: verseConfig
};
const CUSTOM_ELEMENT_LIST = Object.values(CUSTOM_ELEMENTS);
const LOZAD_CLASS_NAME = "lozad";
const LOADED_CLASS_NAME = "loaded";
const lozadObserve = (target) => {
  const observer = lozad(target, { loaded: (element) => element.classList.add(LOADED_CLASS_NAME) });
  observer.observe();
  return observer;
};
const useLozad = (options) => {
  const container = ref();
  const observer = ref(null);
  const observe = () => {
    const targetClass = LOZAD_CLASS_NAME;
    const targetElement = container.value;
    if (targetElement?.querySelectorAll) {
      const lozadElements = targetElement.querySelectorAll(`.${targetClass}`);
      if (lozadElements?.length) {
        observer.value = lozadObserve(lozadElements);
      }
    }
  };
  const unobserve = () => {
    if (observer.value) {
      observer.value.observer.disconnect();
      observer.value = null;
    }
  };
  onMounted(() => {
    {
      observe();
    }
  });
  onBeforeUnmount(() => {
    unobserve();
  });
  return { element: container, observer, observe, unobserve };
};
const LoadingIndicatorProps = {
  width: {
    type: String,
    default: "1.6rem"
  },
  height: {
    type: String,
    default: "1rem"
  },
  gap: {
    type: String,
    default: "1rem"
  },
  radius: {
    type: String,
    default: "1px"
  }
};
const LoadingIndicator = defineComponent({
  name: "LoadingIndicator",
  props: LoadingIndicatorProps,
  setup(props) {
    return () => {
      const style = {
        "--indicator-width": props.width,
        "--indicator-height": props.height,
        "--indicator-gap": props.gap,
        "--indicator-radius": props.radius
      };
      return h(
        "div",
        { class: "global-loading-indicator", style },
        Array.from({ length: 4 }).map(() => h("div"))
      );
    };
  }
});
const getLoadingIndicatorHTML = (options = {}) => {
  const classNames = ["global-loading-indicator", options.class].filter(Boolean).join(" ");
  const styles = {
    "--indicator-width": options.width || LoadingIndicatorProps.width.default,
    "--indicator-height": options.height || LoadingIndicatorProps.height.default,
    "--indicator-gap": options.gap || LoadingIndicatorProps.gap.default,
    "--indicator-radius": options.radius || LoadingIndicatorProps.radius.default
  };
  return `
    <div class="${classNames}" style="${Object.entries(styles).map(([k, v]) => `${k}: ${v}`).join(";")}">
    ${Array.from({ length: 4 }).map(() => "<div></div>").join("")}
    </div>
  `;
};
const base64Encode = btoa;
const base64UrlEncode = (value) => {
  return base64Encode(value).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
var CDNPrefix = /* @__PURE__ */ ((CDNPrefix2) => {
  CDNPrefix2["Proxy"] = "proxy";
  CDNPrefix2["Assets"] = "assets";
  CDNPrefix2["Static"] = "static";
  CDNPrefix2["ImgProxy"] = "imgproxy";
  return CDNPrefix2;
})(CDNPrefix || {});
const getCDNPrefix = (domain, prefix) => {
  return `${domain}/${prefix}`;
};
const normalizePath = (path) => {
  return path.startsWith("/") ? path : `/${path}`;
};
const getAssetURL = (domain, path) => {
  const normalizedPath = normalizePath(path);
  return `${getCDNPrefix(
    domain,
    "assets"
    /* Assets */
  )}${normalizedPath}`;
};
const getStaticURL = (domain, path) => {
  return `${getCDNPrefix(
    domain,
    "static"
    /* Static */
  )}${normalizePath(path)}`;
};
const getImgProxyURL = (domain, path) => {
  return `${getCDNPrefix(
    domain,
    "imgproxy"
    /* ImgProxy */
  )}${normalizePath(path)}`;
};
const isOriginalStaticURL = (url) => {
  return url?.startsWith(API_CONFIG.STATIC);
};
const getStaticPath = (url) => {
  return url.replace(API_CONFIG.STATIC, "");
};
const getOriginalProxyURL = (url) => {
  return `${BFF_CONFIG.proxy_url_prefix}/${base64UrlEncode(url)}`;
};
const getCdnProxyURL = (domain, url) => {
  {
    return `${getCDNPrefix(
      domain,
      "proxy"
      /* Proxy */
    )}/${base64UrlEncode(url)}`;
  }
};
const getPageURL = (path, hash) => {
  const targetPath = path;
  return `${API_CONFIG.FRONT_END}${normalizePath(targetPath)}`;
};
const highlightLangPrefix = "language-";
const marked = new Marked(
  mangle(),
  markedXhtml(),
  markedHighlight({
    langPrefix: highlightLangPrefix,
    highlight(code, language) {
      return hljs.getLanguage(language) ? hljs.highlight(code, { language }).value : hljs.highlightAuto(code).value;
    }
  })
);
marked.setOptions({
  gfm: true,
  breaks: false,
  pedantic: false
});
const sanitizeHTML = (content) => content;
const trimHTML = (html) => html.replace(/\s+/g, " ").replace(/\n/g, " ");
const createRenderer = (options) => {
  const renderer = new Renderer();
  renderer.html = ({ text }) => {
    const trimmed = text.trim();
    const transformed = CUSTOM_ELEMENT_LIST.reduce((result, ce) => ce.transform(result), trimmed);
    return options?.sanitize ? sanitizeHTML(escape(transformed)) : transformed;
  };
  renderer.heading = ({ depth, tokens }) => {
    const getAnchorWithLink = (anchor) => {
      const preventDefault = `event.preventDefault()`;
      const copy = `window.navigator.clipboard?.writeText(this.href)`;
      const onclick = `onclick="${preventDefault};${copy}"`;
      const href = `href="#${anchor}"`;
      return `<a class="anchor link" ${href} ${onclick}>#</a>`;
    };
    const text = renderer.parser.parseInline(tokens);
    const identifier = options?.headingIdentifierGetter?.(depth, text);
    const idAttr = identifier?.id ? `id="${identifier.id}"` : "";
    const titleAttr = `title="${escape(text)}"`;
    const anchorElement = identifier?.anchor ? getAnchorWithLink(identifier.anchor) : `<span class="anchor static">#</span>`;
    return `<h${depth} ${idAttr} ${titleAttr}>${anchorElement}${text}</h${depth}>`;
  };
  renderer.paragraph = ({ tokens }) => {
    const html = renderer.parser.parseInline(tokens);
    const trimmed = html.trim();
    const isBlockChild = ["p", "div", "figure"].some((tag) => {
      return trimmed.startsWith(`<${tag}`) && trimmed.endsWith(`</${tag}>`);
    });
    return isBlockChild ? html : `<p>${html}</p>`;
  };
  renderer.checkbox = ({ checked }) => {
    return checked ? `<i class="checkbox checked iconfont icon-checkbox-selected"></i>` : `<i class="checkbox iconfont icon-checkbox-unselected"></i>`;
  };
  renderer.link = ({ href, title, tokens }) => {
    const text = renderer.parser.parseInline(tokens);
    const isImageLink = text.includes("<img");
    const isSelf = href.startsWith(APP_META.url);
    const textValue = options?.sanitize ? escape(text) : text;
    const hrefValue = options?.sanitize ? sanitizeUrl(href) : href;
    const titleValue = options?.sanitize ? escape(title) : title;
    return sanitizeHTML(
      trimHTML(`
        <a
          href="${hrefValue}"
          target="_blank"
          class="${isImageLink ? "image-link" : "link"}"
          title="${titleValue || (isImageLink ? hrefValue : textValue)}"
          ${isSelf ? "" : 'rel="external nofollow noopener"'}
        >${textValue}</a>
      `)
    );
  };
  renderer.image = ({ href, title, text }) => {
    const titleValue = sanitizeHTML(escape(title || text));
    const altValue = sanitizeHTML(escape(text));
    const sanitized = sanitizeUrl(href);
    const original = sanitized.startsWith("http://") ? getOriginalProxyURL(sanitized) : sanitized;
    const parsed = options?.imageSourceGetter ? options.imageSourceGetter(original) : original;
    const srcValue = typeof parsed === "object" ? parsed.src : parsed;
    const sourcesValue = typeof parsed === "object" ? parsed.sources : [];
    return trimHTML(`
      <div class="figure-wrapper">
        <figure class="image ${altValue ? "caption" : ""}" data-status="loading">
          <div class="placeholder error">
            <i class="iconfont icon-image-error"></i>
          </div>
          ${getLoadingIndicatorHTML({
      class: "placeholder loading",
      width: "2rem",
      height: "1.2rem",
      gap: "0.62rem",
      radius: "1px"
    })}
          <picture>
            ${sourcesValue.map((s) => `<source srcset="${s.srcset}" type="${s.type}" />`).join("\n")}
            <img
              draggable="false"
              class="${options?.lazyLoadImage ? LOZAD_CLASS_NAME : ""}"
              ${options?.lazyLoadImage ? `data-src="${srcValue}"` : `src="${srcValue}"`}
              ${altValue ? `alt="${altValue}"` : ""}
              ${titleValue ? `title="${titleValue}"` : ""}
              onload="this.parentElement.parentElement.dataset.status = 'loaded'"
              onerror="this.parentElement.parentElement.dataset.status = 'error'"
              onclick="window.$popup.vImage(this.currentSrc || this.src)"
            />
          </picture>
          ${altValue ? `<figcaption>${altValue}</figcaption>` : ""}
        </figure>
      </div>
    `);
  };
  renderer.code = function({ text, lang, escaped }) {
    const code = text.replace(/\n$/, "");
    const langString = (lang || "").match(/^\S*/)?.[0];
    const readOnlyAttrs = [
      `contenteditable="true"`,
      `spellcheck="false"`,
      `oncut="return false"`,
      `onpaste="return false"`,
      `onbeforeinput="return false"`,
      `onkeydown="if(event.metaKey) return true; return false;"`
    ].join(" ");
    const escapedCode = escaped ? code : escape(code);
    const preClassName = options?.codeLineNumbers ? "with-line-numbers" : "default";
    const lineNumbersList = options?.codeLineNumbers ? `<ul class="code-lines">${code.split("\n").map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, " ")).join("")}</ul>` : "";
    return langString ? `
        <pre class="${preClassName}" data-lang="${langString}">
          ${lineNumbersList}
          <code ${readOnlyAttrs} class="${highlightLangPrefix}${escape(langString)}">${escapedCode}</code>
        </pre>
      ` : `
        <pre class="${preClassName}">
          ${lineNumbersList}
          <code ${readOnlyAttrs}>${escapedCode}</code>
        </pre>
      `;
  };
  return renderer;
};
const markdownToHTML = (markdown, options) => {
  if (!markdown || typeof markdown !== "string") {
    return "";
  }
  const renderOptions = {
    ...options,
    sanitize: options?.sanitize ?? false,
    lazyLoadImage: options?.lazyLoadImage ?? true,
    codeLineNumbers: options?.codeLineNumbers ?? true
  };
  return marked.parse(markdown, { renderer: createRenderer(renderOptions) });
};
const getMarkdownSplitIndex = (markdown, index) => {
  const shortContent = markdown.substring(0, index);
  const lastH5Index = shortContent.lastIndexOf("\n##### ");
  const lastH4Index = shortContent.lastIndexOf("\n#### ");
  const lastH3Index = shortContent.lastIndexOf("\n### ");
  const lastLineIndex = shortContent.lastIndexOf("\n\n\n");
  const splitIndex = Math.max(lastH5Index, lastH4Index, lastH3Index, lastLineIndex);
  return splitIndex;
};
const ARTICLE_API_PATH = "/article";
const createSpecialArticleListStore = (_params) => {
  return createFetchStore({
    once: true,
    data: [],
    async fetcher() {
      const params = { ..._params, per_page: APP_CONFIG.desktop_aside_article_list_count };
      const response = await nodepress$1.get(ARTICLE_API_PATH, { params });
      return response.result.data;
    }
  });
};
const useLatestArticleListStore = defineStore("latestArticleList", () => {
  return createSpecialArticleListStore({});
});
const useHottestArticleListStore = defineStore("hottestArticleList", () => {
  return createSpecialArticleListStore({ sort: SortType.Hottest });
});
const useFeaturedArticleListStore = defineStore("featuredArticleList", () => {
  return createSpecialArticleListStore({ featured: true });
});
const useArticleListStore = defineStore("articleList", () => {
  const fetching = ref(false);
  const data = shallowRef([]);
  const pagination = shallowRef(null);
  const fetch = async (params = {}) => {
    const isFirstPage = !params.page || params.page === 1;
    const isLoadMore = !isFirstPage && params.page > 1;
    if (isFirstPage) {
      data.value = [];
      pagination.value = null;
    }
    fetching.value = true;
    try {
      const request = nodepress$1.get(ARTICLE_API_PATH, { params });
      const response = await (isClient ? delayPromise(520, request) : request);
      if (isLoadMore) {
        data.value.push(...response.result.data);
        pagination.value = response.result.pagination;
      } else {
        data.value = response.result.data;
        pagination.value = response.result.pagination;
      }
    } finally {
      fetching.value = false;
    }
  };
  return {
    fetch,
    fetching,
    pagination,
    data
  };
});
const renderArticleMarkdown = (markdown, imageSourceGetter) => {
  const headings = [];
  const html = markdownToHTML(markdown, {
    sanitize: false,
    imageSourceGetter,
    headingIdentifierGetter: (level, text) => {
      const anchor = getArticleHeadingUrlHash(text);
      const id = getArticleContentHeadingElementId(level, anchor);
      headings.push({ level, text, id, anchor });
      return { id, anchor };
    }
  });
  return { html, headings };
};
const useArticleDetailStore = defineStore("articleDetail", () => {
  const fetching = ref(false);
  const article = ref(null);
  const prevArticle = shallowRef(null);
  const nextArticle = shallowRef(null);
  const relatedArticles = shallowRef([]);
  const renderedFullContent = ref(true);
  const contentLength = computed(() => {
    return article.value?.content.length || 0;
  });
  const readMinutes = computed(() => {
    const minutes = Math.round(contentLength.value / 400);
    return minutes < 1 ? 1 : minutes;
  });
  const isLongContent = computed(() => {
    return Boolean(article.value && contentLength.value >= APP_CONFIG.render_long_article_threshold);
  });
  const splitIndex = computed(() => {
    if (!article.value || !isLongContent.value) {
      return null;
    }
    return getMarkdownSplitIndex(
      article.value.content,
      Math.min(APP_CONFIG.render_long_article_threshold, Math.floor(contentLength.value / 2))
    );
  });
  const optimizeImageSource = (src) => {
    if (!isOriginalStaticURL(src)) {
      return src;
    }
    const cdnDomain = useCdnDomain();
    const path = getStaticPath(src);
    return getStaticURL(cdnDomain, path);
  };
  const defaultContent = computed(() => {
    if (!article.value) {
      return null;
    }
    const markdown = isLongContent.value ? article.value.content.substring(0, splitIndex.value) : article.value.content;
    const { html, headings } = renderArticleMarkdown(markdown, optimizeImageSource);
    return { markdown, html, headings };
  });
  const moreContent = computed(() => {
    if (!article.value || !isLongContent.value) {
      return null;
    }
    const markdown = article.value.content.substring(splitIndex.value);
    const { html, headings } = renderArticleMarkdown(markdown, optimizeImageSource);
    return { markdown, html, headings };
  });
  const renderFullContent = () => {
    renderedFullContent.value = true;
  };
  const fetchArticleDetail = async (articleId) => {
    article.value = null;
    const request = nodepress$1.get(`${ARTICLE_API_PATH}/${articleId}`);
    const response = await request;
    article.value = response.result;
    renderedFullContent.value = !isLongContent.value;
  };
  const fetchArticleContext = async (articleId) => {
    prevArticle.value = null;
    nextArticle.value = null;
    relatedArticles.value = [];
    const request = nodepress$1.get(`${ARTICLE_API_PATH}/${articleId}/context`);
    const response = await request;
    prevArticle.value = response.result.prev_article;
    nextArticle.value = response.result.next_article;
    relatedArticles.value = response.result.related_articles;
  };
  const fetchCompleteArticle = (articleId) => {
    fetching.value = true;
    return Promise.all([fetchArticleDetail(articleId), fetchArticleContext(articleId)]).then(() => {
      fetching.value = false;
    });
  };
  const postArticleLike = (articleId) => {
    const identityStore = useIdentityStore();
    return nodepress$1.post("/vote/post", { post_id: articleId, vote: 1, author: identityStore.author }).then((response) => {
      if (article.value) {
        article.value.meta.likes = response.result;
      }
    });
  };
  return {
    fetching,
    article,
    prevArticle,
    nextArticle,
    relatedArticles,
    defaultContent,
    moreContent,
    renderedFullContent,
    isLongContent,
    contentLength,
    readMinutes,
    splitIndex,
    renderFullContent,
    fetchCompleteArticle,
    postArticleLike
  };
});
const useStores = (pinia) => ({
  hottestArticleList: useHottestArticleListStore(pinia),
  featuredArticleList: useFeaturedArticleListStore(pinia),
  latestArticleList: useLatestArticleListStore(pinia),
  // BIZ
  articleList: useArticleListStore(pinia),
  articleDetail: useArticleDetailStore(pinia),
  announcement: useAnnouncementStore(pinia),
  category: useCategoryStore(pinia),
  tag: useTagStore(pinia),
  comment: useCommentStore(pinia),
  archive: useArchiveStore(pinia),
  identity: useIdentityStore(pinia),
  adminProfile: useAdminProfileStore(pinia),
  appOption: useAppOptionStore(pinia),
  wallpaper: useWallpaperStore(pinia),
  // link map
  goLink: useGoLinkStore(pinia),
  // sponsor
  githubSponsors: useGitHubSponsorsStore(pinia),
  // statistic
  nodepressStatistic: useNodepressStatisticStore(pinia),
  githubStatistic: useGitHubStatisticStore(pinia),
  npmStatistic: useNpmStatisticStore(pinia),
  // calendar
  articleCalendar: useArticleCalendarStore(pinia),
  instagramCalendar: useInstagramCalendarStore(pinia),
  githubCalendar: useGitHubCalendarStore(pinia),
  // third
  doubanMovies: useDoubanMoviesStore(pinia),
  threadsProfile: useThreadsProfileStore(pinia),
  threadsLatestMedias: useThreadsLatestMediasStore(pinia),
  instagramProfile: useInstagramProfileStore(pinia),
  instagramLatestMedias: useInstagramLatestMediasStore(pinia),
  youtubePlayList: useYouTubePlayListStore(pinia)
});
const createUniversalStore = (config) => {
  const pinia = createPinia();
  const fetchBasicStore = () => {
    const stores = useStores(pinia);
    const initFetchTasks = [
      stores.appOption.fetch(),
      // app basic configuration
      stores.category.fetch(),
      // basic categories data
      stores.tag.fetch()
      // basic tags data
    ];
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(stores.featuredArticleList.fetch());
    }
    return Promise.all(initFetchTasks);
  };
  return {
    get stores() {
      return useStores(pinia);
    },
    state: pinia.state,
    install: pinia.install,
    prefetchOnServer: fetchBasicStore,
    hydrateOnClient() {
      const contextStore = getSSRStateValue("store");
      if (contextStore) {
        pinia.state.value = contextStore;
      } else {
        fetchBasicStore();
      }
    }
  };
};
const isValidDateParam = (date) => {
  const dates = date.split("-");
  if (dates.length !== 3) {
    return false;
  }
  if (!dates.every((d) => Number.isInteger(Number(d)))) {
    return false;
  }
  const [year, month, day] = dates;
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
    return false;
  }
  return true;
};
const Easing = {
  ease: [0.25, 0.1, 0.25, 1],
  easeOut: [0, 0, 0.58, 1]
};
const triggerEvents = [
  "scroll",
  "mousedown",
  "wheel",
  "DOMMouseScroll",
  "mousewheel",
  "keyup",
  "touchmove"
];
const listener = {
  on(element, events, handler) {
    events.forEach((event) => {
      element.addEventListener(event, handler, { passive: true });
    });
  },
  off(element, events, handler) {
    events.forEach((event) => {
      element.removeEventListener(event, handler);
    });
  }
};
const scrollToElement = (options) => {
  const { target, onCancel, onDone } = options;
  const offset = options.offset ?? 0;
  const duration = options.duration ?? 500;
  const optionEasing = options.easing ?? Easing.ease;
  const targetElement = typeof target === "string" ? document.querySelector(target) : target;
  const bodyElement = document.body;
  let abort = false;
  const whenAbort = () => {
    abort = true;
  };
  listener.on(bodyElement, triggerEvents, whenAbort);
  const whenDone = () => {
    listener.off(bodyElement, triggerEvents, whenAbort);
    abort ? onCancel?.() : onDone?.();
  };
  const initialY = window.pageYOffset;
  const elementY = initialY + targetElement.getBoundingClientRect().top;
  const targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY;
  const diff = targetY + offset - initialY;
  if (!diff) {
    return;
  }
  const easing = Reflect.apply(BezierEasing, BezierEasing, optionEasing);
  let start;
  window.requestAnimationFrame(function step(timestamp) {
    if (abort) {
      return whenDone();
    }
    if (!start) {
      start = timestamp;
    }
    const time = timestamp - start;
    let progress = Math.min(time / duration, 1);
    progress = easing(progress);
    window.scrollTo(0, initialY + diff * progress);
    if (time < duration) {
      window.requestAnimationFrame(step);
    } else {
      whenDone();
    }
  });
};
const scrollToAnchor = (elementId, offset) => {
  const targetElement = document.getElementById(elementId);
  if (targetElement) {
    scrollToElement({
      target: targetElement,
      duration: 200,
      // default offset: header height
      offset: -74
    });
  }
};
const scrollToPageTop = () => {
  scrollToElement({
    target: document.body,
    duration: 280,
    offset: 0,
    // MARK: keep ease
    easing: Easing.ease
  });
};
const scrollToNextScreen = () => {
  nextTick(() => {
    scrollToElement({
      target: document.body,
      offset: window.scrollY + window.innerHeight * 0.68,
      duration: 300,
      easing: Easing.easeOut
    });
  });
};
const I18nSymbol = Symbol("i18n");
const createI18nStore = (config) => {
  const language = ref(config.default);
  const languageCodes = config.locales.map((lang) => lang.code);
  const l = computed(() => config.locales.find((l2) => l2.code === language.value));
  const localeMap = config.keys.reduce(
    (map, key) => ({
      ...map,
      [key]: config.locales.reduce(
        (result, language2) => ({
          ...result,
          [language2.code]: language2.data[key]
        }),
        {}
      )
    }),
    {}
  );
  const set2 = (lang) => {
    if (languageCodes.includes(lang) && language.value !== lang) {
      language.value = lang;
    }
  };
  const toggle = () => {
    const currentIndex = languageCodes.findIndex((langCode) => langCode === language.value);
    const nextIndex = currentIndex < languageCodes.length - 1 ? currentIndex + 1 : 0;
    if (currentIndex !== nextIndex) {
      set2(languageCodes[nextIndex]);
    }
  };
  const translate = (key, targetLanguage, ...args) => {
    const content = localeMap[key]?.[targetLanguage ?? language.value];
    if (!content) {
      return;
    }
    return typeof content === "string" ? content : content(...args);
  };
  return {
    language: readonly(language),
    l,
    set: set2,
    toggle,
    translate,
    t: translate
  };
};
const createI18n = (config) => {
  const i18nStore = createI18nStore(config);
  const i18nComponent = defineComponent({
    name: "I18n",
    props: {
      k: [String, Number, Symbol]
    },
    render() {
      if (this.$props.k) {
        return i18nStore.t(this.$props.k, null, this.$attrs);
      } else {
        const lang = i18nStore.language.value;
        return this.$attrs[lang] || this.$slots[lang]?.();
      }
    }
  });
  return {
    ...i18nStore,
    install(app) {
      app.config.globalProperties.$i18n = i18nStore;
      app.provide(I18nSymbol, i18nStore);
      app.component(i18nComponent.name, i18nComponent);
    }
  };
};
const useI18n = () => {
  return inject(I18nSymbol);
};
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2["Light"] = "light";
  Theme2["Dark"] = "dark";
  return Theme2;
})(Theme || {});
const DARK_THEME_QUERY = "(prefers-color-scheme: dark)";
const LIGHT_THEME_QUERY = "(prefers-color-scheme: light)";
const THEME_STORAGE_KEY = "theme";
const ThemeSymbol = Symbol("theme");
const themes = [
  "light",
  "dark"
  /* Dark */
];
const createTheme = (initTheme) => {
  const theme = ref(
    initTheme === "dark" ? "dark" : "light"
    /* Light */
  );
  const set2 = (newTheme) => {
    if (themes.includes(newTheme) && newTheme !== theme.value) {
      theme.value = newTheme;
      cookies.set(THEME_STORAGE_KEY, newTheme);
      storage.set(THEME_STORAGE_KEY, newTheme);
    }
  };
  const toggle = () => set2(
    theme.value === "dark" ? "light" : "dark"
    /* Dark */
  );
  const bindClientSystem = () => {
    window.matchMedia(DARK_THEME_QUERY).addEventListener("change", ({ matches }) => matches && set2(
      "dark"
      /* Dark */
    ));
    window.matchMedia(LIGHT_THEME_QUERY).addEventListener("change", ({ matches }) => matches && set2(
      "light"
      /* Light */
    ));
  };
  const themeState = {
    theme: readonly(theme),
    set: set2,
    toggle,
    bindClientSystem
  };
  return {
    ...themeState,
    install(app) {
      app.provide(ThemeSymbol, themeState);
    }
  };
};
const useTheme = () => {
  return inject(ThemeSymbol);
};
const isCNCode = (code) => {
  return code === "CN";
};
const useEnhancer = () => {
  const route = useRoute();
  const router = useRouter();
  const i18n = useI18n();
  const theme = useTheme();
  const globalState = useGlobalState();
  const appOptionStore = useAppOptionStore();
  const cdnDomain = useCdnDomain();
  const countryCode = useCountryCode();
  const adConfig = computed(() => appOptionStore.adConfig);
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark);
  const isZhLang = computed(() => i18n.language.value === Language.Chinese);
  return {
    route,
    router,
    i18n,
    theme,
    globalState,
    cdnDomain,
    countryCode,
    isCNUser: isCNCode(countryCode || "GLOBAL"),
    adConfig,
    isDarkTheme,
    isZhLang,
    defer: void 0,
    popup: void 0,
    gtag: void 0
  };
};
function usePageSeo(input) {
  const { i18n, route } = useEnhancer();
  const _ = computed(() => {
    const value = typeof input === "function" ? input() : input;
    const { title, pageTitle, pageTitles, ...rest } = value;
    const separator = APP_CONFIG.title_separator;
    const pureTitle = pageTitle ?? pageTitles?.join(separator);
    const fullTitle = title ?? (pureTitle ? [pureTitle, APP_META.title].join(separator) : APP_META.title);
    return { pureTitle, fullTitle, ...rest };
  });
  return useHead({
    title: computed(() => _.value.fullTitle),
    meta: [
      { name: "description", content: () => _.value.description },
      { name: "keywords", content: () => _.value.keywords },
      { property: "og:type", content: () => _.value.ogType ?? "website" },
      { property: "og:title", content: () => _.value.ogTitle ?? _.value.pureTitle },
      { property: "og:description", content: () => _.value.ogDescription ?? _.value.description },
      { property: "og:url", content: () => _.value.ogUrl ?? getPageURL(route.fullPath) },
      { property: "og:image", content: () => _.value.ogImage ?? getPageURL(APP_CONFIG.default_og_image) },
      { property: "og:image:alt", content: () => _.value.ogImageAlt ?? _.value.ogTitle ?? _.value.fullTitle },
      { property: "og:image:width", content: () => _.value.ogImageWidth ?? (_.value.ogImage ? null : "1000") },
      { property: "og:image:height", content: () => _.value.ogImageHeight ?? (_.value.ogImage ? null : "526") },
      { property: "og:site_name", content: () => APP_META.title },
      { property: "og:locale", content: () => i18n.l.value?.iso },
      { name: "twitter:title", content: () => _.value.ogTitle ?? _.value.fullTitle },
      { name: "twitter:description", content: () => _.value.ogDescription ?? _.value.description },
      { name: "twitter:image", content: () => _.value.ogImage ?? getPageURL(APP_CONFIG.default_og_image) },
      { name: "twitter:image:alt", content: () => _.value.ogImageAlt ?? _.value.ogTitle ?? _.value.fullTitle },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "article:published_time", content: () => _.value.articlePublishedTime },
      { property: "article:modified_time", content: () => _.value.articleModifiedTime },
      { property: "article:section", content: () => _.value.articleCategory },
      { property: "article:tag", content: () => _.value.articleTags }
    ]
  });
}
const _sfc_main$1T = /* @__PURE__ */ defineComponent({
  __name: "loadmore",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean },
    finished: { type: Boolean }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const element = ref(null);
    const observer = ref(null);
    const emitLoadEvent = () => {
      if (!props.loading && !props.finished) {
        emit(
          "loadmore"
          /* Loadmore */
        );
      }
    };
    onMounted(() => {
      if (element.value) {
        observer.value = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              emitLoadEvent();
            }
          },
          { threshold: 0.1 }
        );
        observer.value.observe(element.value);
      }
    });
    onBeforeUnmount(() => {
      if (element.value && observer.value) {
        observer.value.unobserve(element.value);
        observer.value.disconnect();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "loadmore",
        ref_key: "element",
        ref: element
      }, _attrs))} data-v-47040ab6>`);
      if (_ctx.loading) {
        _push(`<div class="loading-wrapper" data-v-47040ab6>`);
        ssrRenderSlot(_ctx.$slots, "loading", {}, null, _push, _parent);
        _push(`</div>`);
      } else if (!_ctx.finished) {
        _push(`<div class="normal-wrapper" data-v-47040ab6>`);
        ssrRenderSlot(_ctx.$slots, "normal", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<div class="finished-wrapper" data-v-47040ab6>`);
        ssrRenderSlot(_ctx.$slots, "finished", {}, null, _push, _parent);
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$1T = _sfc_main$1T.setup;
_sfc_main$1T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/loadmore.vue");
  return _sfc_setup$1T ? _sfc_setup$1T(props, ctx) : void 0;
};
const Loadmore = /* @__PURE__ */ _export_sfc(_sfc_main$1T, [["__scopeId", "data-v-47040ab6"]]);
const ArticleLangI18n = {
  [
    "zh"
    /* Chinese */
  ]: {
    [Language.Chinese]: "中文",
    [Language.English]: "ZH"
  },
  [
    "en"
    /* English */
  ]: {
    [Language.Chinese]: "英文",
    [Language.English]: "EN"
  },
  [
    "mix"
    /* Mixed */
  ]: {
    [Language.Chinese]: "多语",
    [Language.English]: "MIX"
  }
};
const getTagFlowRoute = (tagSlug) => {
  return `/tag/${tagSlug}`;
};
const getCategoryFlowRoute = (categorySlug) => {
  return `/category/${categorySlug}`;
};
const getDateFlowRoute = (date) => {
  return `/date/${date}`;
};
const getArticleDetailRoute = (articleId) => {
  return `/article/${articleId}`;
};
const getPageRoute = (routeName) => {
  return `/${routeName}`;
};
const isArticleDetail = (name) => name === RouteName.Article;
const isSearchFlow = (name) => name === RouteName.SearchListing;
const getImgProxyPath = (path, options) => {
  const resize = options.resize ? `resize:fill:${options.width || ""}:${options.height || ""}:0` : "";
  const watermark = options.watermark ? `/${options.watermark}` : "";
  const format = options.format ? `@${options.format}` : "";
  return `/${resize}${watermark}/plain${normalizePath(path)}${format}`.replaceAll("//", "/");
};
const _sfc_main$1S = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain, globalState } = useEnhancer();
    const identityStore = useIdentityStore();
    const isLiked = computed(() => identityStore.isLikedPage(props.article.id));
    const isHybrid = computed(() => isHybridType(props.article.origin));
    const isReprint = computed(() => isReprintType(props.article.origin));
    const isOriginal = computed(() => isOriginalType(props.article.origin));
    const detailRoutePath = getArticleDetailRoute(props.article.id);
    const getThumbnailURL = (url, format) => {
      if (!isOriginalStaticURL(url)) {
        return url;
      }
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(getStaticPath(url), {
          resize: true,
          width: 700,
          height: 247,
          watermark: `watermark:0.38:sowe:18:16:0.16`,
          format
        })
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      _push(ssrRenderComponent(_component_ulink, mergeProps({
        class: "article-item",
        to: unref(globalState).userAgent.isWechat ? unref(detailRoutePath) : void 0,
        href: !unref(globalState).userAgent.isWechat ? unref(detailRoutePath) : void 0,
        blank: !unref(globalState).userAgent.isWechat,
        external: false
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="thumbnail" data-v-f5c50d13${_scopeId}><span class="${ssrRenderClass([{
              original: isOriginal.value,
              reprint: isReprint.value,
              hybrid: isHybrid.value
            }, "origin"])}" data-v-f5c50d13${_scopeId}>`);
            if (isOriginal.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).ORIGIN_ORIGINAL
              }, null, _parent2, _scopeId));
            } else if (isReprint.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).ORIGIN_REPRINT
              }, null, _parent2, _scopeId));
            } else if (isHybrid.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).ORIGIN_HYBRID
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
            if (_ctx.article.featured) {
              _push2(`<span class="featured" data-v-f5c50d13${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).ARTICLE_FEATURED
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<picture class="picture" data-v-f5c50d13${_scopeId}>`);
            if (unref(isOriginalStaticURL)(_ctx.article.thumbnail)) {
              _push2(`<!--[--><source${ssrRenderAttr("srcset", getThumbnailURL(_ctx.article.thumbnail, "avif"))} type="image/avif" data-v-f5c50d13${_scopeId}><source${ssrRenderAttr("srcset", getThumbnailURL(_ctx.article.thumbnail, "webp"))} type="image/webp" data-v-f5c50d13${_scopeId}><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<img class="image" loading="lazy" draggable="false"${ssrRenderAttr("src", getThumbnailURL(_ctx.article.thumbnail))}${ssrRenderAttr("alt", _ctx.article.title)}${ssrRenderAttr("title", _ctx.article.title)} data-v-f5c50d13${_scopeId}></picture></div><div class="content" data-v-f5c50d13${_scopeId}><div class="body" data-v-f5c50d13${_scopeId}><h4 class="title" data-v-f5c50d13${_scopeId}><span class="text"${ssrRenderAttr("title", _ctx.article.title)} data-v-f5c50d13${_scopeId}>${ssrInterpolate(_ctx.article.title)}</span><span class="language" data-v-f5c50d13${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(ArticleLangI18n)[_ctx.article.lang], null, _parent2, _scopeId));
            _push2(`</span></h4><p class="description" style="${ssrRenderStyle({ "-webkit-box-orient": "vertical" })}" data-v-f5c50d13${_scopeId}>${_ctx.article.description ?? ""}</p></div><div class="meta" data-v-f5c50d13${_scopeId}><span class="date" data-allow-mismatch data-v-f5c50d13${_scopeId}><i class="iconfont icon-clock" data-v-f5c50d13${_scopeId}></i><span class="text" data-v-f5c50d13${_scopeId}>`);
            _push2(ssrRenderComponent(_component_udate, {
              to: "ago",
              date: _ctx.article.created_at
            }, null, _parent2, _scopeId));
            _push2(`</span></span><span class="views" data-v-f5c50d13${_scopeId}><i class="iconfont icon-eye" data-v-f5c50d13${_scopeId}></i><span class="text" data-v-f5c50d13${_scopeId}>${ssrInterpolate(unref(numberSplit)(_ctx.article.meta.views))}</span></span><span class="comments" data-v-f5c50d13${_scopeId}><i class="iconfont icon-comment" data-v-f5c50d13${_scopeId}></i><span class="text" data-v-f5c50d13${_scopeId}>${ssrInterpolate(_ctx.article.meta.comments)}</span></span><span class="likes" data-v-f5c50d13${_scopeId}><i class="${ssrRenderClass([{ liked: isLiked.value }, "iconfont icon-like"])}" data-v-f5c50d13${_scopeId}></i><span class="text" data-v-f5c50d13${_scopeId}>${ssrInterpolate(_ctx.article.meta.likes)}</span></span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "thumbnail" }, [
                createVNode("span", {
                  class: ["origin", {
                    original: isOriginal.value,
                    reprint: isReprint.value,
                    hybrid: isHybrid.value
                  }]
                }, [
                  isOriginal.value ? (openBlock(), createBlock(_component_i18n, {
                    key: 0,
                    k: unref(LocaleKey).ORIGIN_ORIGINAL
                  }, null, 8, ["k"])) : isReprint.value ? (openBlock(), createBlock(_component_i18n, {
                    key: 1,
                    k: unref(LocaleKey).ORIGIN_REPRINT
                  }, null, 8, ["k"])) : isHybrid.value ? (openBlock(), createBlock(_component_i18n, {
                    key: 2,
                    k: unref(LocaleKey).ORIGIN_HYBRID
                  }, null, 8, ["k"])) : createCommentVNode("", true)
                ], 2),
                _ctx.article.featured ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "featured"
                }, [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).ARTICLE_FEATURED
                  }, null, 8, ["k"])
                ])) : createCommentVNode("", true),
                createVNode("picture", { class: "picture" }, [
                  unref(isOriginalStaticURL)(_ctx.article.thumbnail) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("source", {
                      srcset: getThumbnailURL(_ctx.article.thumbnail, "avif"),
                      type: "image/avif"
                    }, null, 8, ["srcset"]),
                    createVNode("source", {
                      srcset: getThumbnailURL(_ctx.article.thumbnail, "webp"),
                      type: "image/webp"
                    }, null, 8, ["srcset"])
                  ], 64)) : createCommentVNode("", true),
                  createVNode("img", {
                    class: "image",
                    loading: "lazy",
                    draggable: "false",
                    src: getThumbnailURL(_ctx.article.thumbnail),
                    alt: _ctx.article.title,
                    title: _ctx.article.title
                  }, null, 8, ["src", "alt", "title"])
                ])
              ]),
              createVNode("div", { class: "content" }, [
                createVNode("div", { class: "body" }, [
                  createVNode("h4", { class: "title" }, [
                    createVNode("span", {
                      class: "text",
                      title: _ctx.article.title
                    }, toDisplayString(_ctx.article.title), 9, ["title"]),
                    createVNode("span", { class: "language" }, [
                      createVNode(_component_i18n, unref(ArticleLangI18n)[_ctx.article.lang], null, 16)
                    ])
                  ]),
                  createVNode("p", {
                    class: "description",
                    style: { "-webkit-box-orient": "vertical" },
                    innerHTML: _ctx.article.description
                  }, null, 8, ["innerHTML"])
                ]),
                createVNode("div", { class: "meta" }, [
                  createVNode("span", {
                    class: "date",
                    "data-allow-mismatch": ""
                  }, [
                    createVNode("i", { class: "iconfont icon-clock" }),
                    createVNode("span", { class: "text" }, [
                      createVNode(_component_udate, {
                        to: "ago",
                        date: _ctx.article.created_at
                      }, null, 8, ["date"])
                    ])
                  ]),
                  createVNode("span", { class: "views" }, [
                    createVNode("i", { class: "iconfont icon-eye" }),
                    createVNode("span", { class: "text" }, toDisplayString(unref(numberSplit)(_ctx.article.meta.views)), 1)
                  ]),
                  createVNode("span", { class: "comments" }, [
                    createVNode("i", { class: "iconfont icon-comment" }),
                    createVNode("span", { class: "text" }, toDisplayString(_ctx.article.meta.comments), 1)
                  ]),
                  createVNode("span", { class: "likes" }, [
                    createVNode("i", {
                      class: ["iconfont icon-like", { liked: isLiked.value }]
                    }, null, 2),
                    createVNode("span", { class: "text" }, toDisplayString(_ctx.article.meta.likes), 1)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1S = _sfc_main$1S.setup;
_sfc_main$1S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/listing/mobile/item.vue");
  return _sfc_setup$1S ? _sfc_setup$1S(props, ctx) : void 0;
};
const ListItem$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1S, [["__scopeId", "data-v-f5c50d13"]]);
const _sfc_main$1R = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    tagSlug: {},
    categorySlug: {},
    searchKeyword: {},
    date: {}
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, isZhLang } = useEnhancer();
    const tagStore = useTagStore();
    const categoryStore = useCategoryStore();
    const articleListStore = useArticleListStore();
    const appOptionStore = useAppOptionStore();
    const filterCategory = computed(() => {
      return props.categorySlug ? categoryStore.data.find((category) => category.slug === props.categorySlug) : null;
    });
    const filterTag = computed(() => {
      return props.tagSlug ? tagStore.data.find((tag) => tag.slug === props.tagSlug) : null;
    });
    const hasMoreArticles = computed(() => {
      const pagination = articleListStore.pagination;
      return pagination ? pagination.current_page < pagination.total_page : false;
    });
    usePageSeo(() => {
      if (props.date) {
        return { pageTitles: [props.date, "Date"] };
      } else if (props.searchKeyword) {
        return { pageTitles: [`"${props.searchKeyword}"`, "Search"] };
      } else if (filterCategory.value) {
        return { pageTitles: [filterCategory.value.name, filterCategory.value.slug] };
      } else if (filterTag.value) {
        return { pageTitles: [filterTag.value.name, filterTag.value.slug] };
      }
      return {
        title: `${APP_META.title} - ${_i18n.t(LocaleKey.APP_SLOGAN)}`,
        description: isZhLang.value ? APP_META.zh_description : APP_META.en_description,
        keywords: appOptionStore.data?.keywords.join(","),
        ogType: "website"
      };
    });
    const fetchArticles = (params = {}) => {
      return articleListStore.fetch({
        category_slug: props.categorySlug,
        tag_slug: props.tagSlug,
        date: props.date,
        keyword: props.searchKeyword,
        ...params
      });
    };
    const loadmoreArticles = () => {
      fetchArticles({
        page: articleListStore.pagination.current_page + 1
      }).then(() => {
      });
    };
    onBeforeMount(() => {
      watch(
        () => props,
        () => fetchArticles(),
        { flush: "post", deep: true }
      );
    });
    useUniversalFetch(() => fetchArticles());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_empty = resolveComponent("empty");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles" }, _attrs))} data-v-9e8bbf7b>`);
      if (_ctx.tagSlug || _ctx.categorySlug || _ctx.date || _ctx.searchKeyword) {
        _push(`<div class="header" data-v-9e8bbf7b><div class="content" data-v-9e8bbf7b>`);
        if (_ctx.categorySlug) {
          _push(`<!--[-->`);
          if (filterCategory.value) {
            _push(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`分类 “${ssrInterpolate(filterCategory.value.name)}” 的过滤结果`);
                } else {
                  return [
                    createTextVNode("分类 “" + toDisplayString(filterCategory.value.name) + "” 的过滤结果", 1)
                  ];
                }
              }),
              en: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Category &quot;${ssrInterpolate(unref(firstUpperCase)(filterCategory.value.slug))}&quot; &#39;s result`);
                } else {
                  return [
                    createTextVNode('Category "' + toDisplayString(unref(firstUpperCase)(filterCategory.value.slug)) + `" 's result`, 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<span data-v-9e8bbf7b>${ssrInterpolate(_ctx.categorySlug)}</span>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.tagSlug) {
          _push(`<!--[-->`);
          if (filterTag.value) {
            _push(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`标签 “${ssrInterpolate(filterTag.value.name)}” 的过滤结果`);
                } else {
                  return [
                    createTextVNode("标签 “" + toDisplayString(filterTag.value.name) + "” 的过滤结果", 1)
                  ];
                }
              }),
              en: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Tag &quot;${ssrInterpolate(unref(getTagEnName)(filterTag.value))}&quot; &#39;s result`);
                } else {
                  return [
                    createTextVNode('Tag "' + toDisplayString(unref(getTagEnName)(filterTag.value)) + `" 's result`, 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<span data-v-9e8bbf7b>${ssrInterpolate(_ctx.tagSlug)}</span>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.date) {
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`日期 “${ssrInterpolate(_ctx.date)}” 的过滤结果`);
              } else {
                return [
                  createTextVNode("日期 “" + toDisplayString(_ctx.date) + "” 的过滤结果", 1)
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Date &quot;${ssrInterpolate(_ctx.date)}&quot; &#39;s result`);
              } else {
                return [
                  createTextVNode('Date "' + toDisplayString(_ctx.date) + `" 's result`, 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.searchKeyword) {
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`关键词 “${ssrInterpolate(_ctx.searchKeyword)}” 的过滤结果`);
              } else {
                return [
                  createTextVNode("关键词 “" + toDisplayString(_ctx.searchKeyword) + "” 的过滤结果", 1)
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Search keyword &quot;${ssrInterpolate(_ctx.searchKeyword)}&quot; &#39;s result`);
              } else {
                return [
                  createTextVNode('Search keyword "' + toDisplayString(_ctx.searchKeyword) + `" 's result`, 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        _push(ssrRenderComponent(_component_router_link, {
          to: "/",
          class: "close"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="iconfont icon-cancel" data-v-9e8bbf7b${_scopeId}></i>`);
            } else {
              return [
                createVNode("i", { class: "iconfont icon-cancel" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_placeholder, {
        data: unref(articleListStore).data.length,
        loading: !unref(articleListStore).data.length && unref(articleListStore).fetching
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="skeletons" data-v-9e8bbf7b${_scopeId}><!--[-->`);
            ssrRenderList(3, (item) => {
              _push2(`<li class="item" data-v-9e8bbf7b${_scopeId}><div class="thumbnail" data-v-9e8bbf7b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
              _push2(`</div><div class="content" data-v-9e8bbf7b${_scopeId}><div class="title" data-v-9e8bbf7b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
              _push2(`</div><div class="description" data-v-9e8bbf7b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
              _push2(`</div></div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                class: "skeletons",
                key: "skeleton"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (item) => {
                  return createVNode("li", {
                    key: item,
                    class: "item"
                  }, [
                    createVNode("div", { class: "thumbnail" }, [
                      createVNode(_component_skeleton_base)
                    ]),
                    createVNode("div", { class: "content" }, [
                      createVNode("div", { class: "title" }, [
                        createVNode(_component_skeleton_line)
                      ]),
                      createVNode("div", { class: "description" }, [
                        createVNode(_component_skeleton_line)
                      ])
                    ])
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              bold: "",
              "i18n-key": unref(LocaleKey).ARTICLE_PLACEHOLDER
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                bold: "",
                "i18n-key": unref(LocaleKey).ARTICLE_PLACEHOLDER
              }, null, 8, ["i18n-key"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-9e8bbf7b${_scopeId}><div${ssrRenderAttrs({
              key: "list",
              name: "list",
              class: "list"
            })} data-v-9e8bbf7b>`);
            ssrRenderList(unref(articleListStore).data, (article, index) => {
              _push2(ssrRenderComponent(ListItem$1, {
                class: "list-item",
                article,
                key: index
              }, null, _parent2, _scopeId));
            });
            _push2(`</div>`);
            _push2(ssrRenderComponent(Loadmore, {
              class: "loadmore",
              loading: unref(articleListStore).fetching,
              finished: !hasMoreArticles.value,
              onLoadmore: loadmoreArticles
            }, {
              normal: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button class="normal" data-v-9e8bbf7b${_scopeId2}><i class="iconfont icon-loadmore" data-v-9e8bbf7b${_scopeId2}></i></button>`);
                } else {
                  return [
                    createVNode("button", {
                      class: "normal",
                      onClick: loadmoreArticles
                    }, [
                      createVNode("i", { class: "iconfont icon-loadmore" })
                    ])
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_loading_indicator, {
                    class: "loading",
                    width: "2rem",
                    height: "1.2rem",
                    gap: "0.68rem"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_loading_indicator, {
                      class: "loading",
                      width: "2rem",
                      height: "1.2rem",
                      gap: "0.68rem"
                    })
                  ];
                }
              }),
              finished: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="finished" data-v-9e8bbf7b${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).LIST_NO_MORE_DATA
                  }, null, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "finished" }, [
                      createVNode(_component_i18n, {
                        k: unref(LocaleKey).LIST_NO_MORE_DATA
                      }, null, 8, ["k"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(TransitionGroup, {
                  key: "list",
                  name: "list",
                  tag: "div",
                  class: "list"
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(articleListStore).data, (article, index) => {
                      return openBlock(), createBlock(ListItem$1, {
                        class: "list-item",
                        article,
                        key: index
                      }, null, 8, ["article"]);
                    }), 128))
                  ]),
                  _: 1
                }),
                createVNode(Loadmore, {
                  class: "loadmore",
                  loading: unref(articleListStore).fetching,
                  finished: !hasMoreArticles.value,
                  onLoadmore: loadmoreArticles
                }, {
                  normal: withCtx(() => [
                    createVNode("button", {
                      class: "normal",
                      onClick: loadmoreArticles
                    }, [
                      createVNode("i", { class: "iconfont icon-loadmore" })
                    ])
                  ]),
                  loading: withCtx(() => [
                    createVNode(_component_loading_indicator, {
                      class: "loading",
                      width: "2rem",
                      height: "1.2rem",
                      gap: "0.68rem"
                    })
                  ]),
                  finished: withCtx(() => [
                    createVNode("span", { class: "finished" }, [
                      createVNode(_component_i18n, {
                        k: unref(LocaleKey).LIST_NO_MORE_DATA
                      }, null, 8, ["k"])
                    ])
                  ]),
                  _: 1
                }, 8, ["loading", "finished"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1R = _sfc_main$1R.setup;
_sfc_main$1R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/listing/mobile/index.vue");
  return _sfc_setup$1R ? _sfc_setup$1R(props, ctx) : void 0;
};
const MobileListing = /* @__PURE__ */ _export_sfc(_sfc_main$1R, [["__scopeId", "data-v-9e8bbf7b"]]);
const _sfc_main$1Q = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, cdnDomain, isZhLang } = useEnhancer();
    const identity = useIdentityStore();
    const isLiked = computed(() => identity.isLikedPage(props.article.id));
    const isHybrid = computed(() => isHybridType(props.article.origin));
    const isReprint = computed(() => isReprintType(props.article.origin));
    const isOriginal = computed(() => isOriginalType(props.article.origin));
    const imageRef = shallowRef(null);
    const finallyThumbnailURL = shallowRef(null);
    const setFinallyThumbnailURL = () => {
      finallyThumbnailURL.value = imageRef.value?.currentSrc ?? null;
    };
    const getLanguageText = (language) => {
      const targetI18n = ArticleLangI18n[language];
      return isZhLang.value ? targetI18n.zh : targetI18n.en;
    };
    const getThumbnailURL = (url, format) => {
      if (!isOriginalStaticURL(url)) {
        return url;
      }
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(getStaticPath(url), {
          resize: true,
          width: 350,
          height: 238,
          format
        })
      );
    };
    onMounted(() => {
      if (imageRef.value?.complete) {
        setFinallyThumbnailURL();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      const _component_placeholder = resolveComponent("placeholder");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-item" }, _attrs))} data-v-72815239><div class="item-background" style="${ssrRenderStyle({ backgroundImage: finallyThumbnailURL.value ? `url('${finallyThumbnailURL.value}')` : "none" })}" data-v-72815239></div><div class="item-content" data-v-72815239>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "item-thumbnail",
        to: unref(getArticleDetailRoute)(_ctx.article.id)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="${ssrRenderClass([{
              original: isOriginal.value,
              hybrid: isHybrid.value,
              reprint: isReprint.value
            }, "item-origin"])}" data-v-72815239${_scopeId}>`);
            if (isOriginal.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).ORIGIN_ORIGINAL
              }, null, _parent2, _scopeId));
            } else if (isReprint.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).ORIGIN_REPRINT
              }, null, _parent2, _scopeId));
            } else if (isHybrid.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).ORIGIN_HYBRID
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
            if (_ctx.article.featured) {
              _push2(`<span class="item-featured"${ssrRenderAttr("title", unref(_i18n).t(unref(LocaleKey).ARTICLE_FEATURED))} data-v-72815239${_scopeId}><i class="iconfont icon-windmill" data-v-72815239${_scopeId}></i></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<picture class="picture" data-v-72815239${_scopeId}>`);
            if (unref(isOriginalStaticURL)(_ctx.article.thumbnail)) {
              _push2(`<!--[--><source${ssrRenderAttr("srcset", getThumbnailURL(_ctx.article.thumbnail, "avif"))} type="image/avif" data-v-72815239${_scopeId}><source${ssrRenderAttr("srcset", getThumbnailURL(_ctx.article.thumbnail, "webp"))} type="image/webp" data-v-72815239${_scopeId}><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<img class="image" loading="lazy" draggable="false"${ssrRenderAttr("alt", _ctx.article.title)}${ssrRenderAttr("title", _ctx.article.title)}${ssrRenderAttr("src", getThumbnailURL(_ctx.article.thumbnail))} data-v-72815239${_scopeId}></picture>`);
          } else {
            return [
              createVNode("span", {
                class: ["item-origin", {
                  original: isOriginal.value,
                  hybrid: isHybrid.value,
                  reprint: isReprint.value
                }]
              }, [
                isOriginal.value ? (openBlock(), createBlock(_component_i18n, {
                  key: 0,
                  k: unref(LocaleKey).ORIGIN_ORIGINAL
                }, null, 8, ["k"])) : isReprint.value ? (openBlock(), createBlock(_component_i18n, {
                  key: 1,
                  k: unref(LocaleKey).ORIGIN_REPRINT
                }, null, 8, ["k"])) : isHybrid.value ? (openBlock(), createBlock(_component_i18n, {
                  key: 2,
                  k: unref(LocaleKey).ORIGIN_HYBRID
                }, null, 8, ["k"])) : createCommentVNode("", true)
              ], 2),
              _ctx.article.featured ? (openBlock(), createBlock("span", {
                key: 0,
                class: "item-featured",
                title: unref(_i18n).t(unref(LocaleKey).ARTICLE_FEATURED)
              }, [
                createVNode("i", { class: "iconfont icon-windmill" })
              ], 8, ["title"])) : createCommentVNode("", true),
              createVNode("picture", { class: "picture" }, [
                unref(isOriginalStaticURL)(_ctx.article.thumbnail) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("source", {
                    srcset: getThumbnailURL(_ctx.article.thumbnail, "avif"),
                    type: "image/avif"
                  }, null, 8, ["srcset"]),
                  createVNode("source", {
                    srcset: getThumbnailURL(_ctx.article.thumbnail, "webp"),
                    type: "image/webp"
                  }, null, 8, ["srcset"])
                ], 64)) : createCommentVNode("", true),
                createVNode("img", {
                  class: "image",
                  loading: "lazy",
                  draggable: "false",
                  ref_key: "imageRef",
                  ref: imageRef,
                  alt: _ctx.article.title,
                  title: _ctx.article.title,
                  src: getThumbnailURL(_ctx.article.thumbnail),
                  onLoad: setFinallyThumbnailURL
                }, null, 40, ["alt", "title", "src"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="item-body" data-v-72815239><div class="item-content" data-v-72815239><h5 class="title" data-v-72815239>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "link",
        to: unref(getArticleDetailRoute)(_ctx.article.id),
        title: _ctx.article.title
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.article.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.article.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="language" data-v-72815239>${ssrInterpolate(getLanguageText(_ctx.article.lang))}</span></h5><p class="description" style="${ssrRenderStyle({ "-webkit-box-orient": "vertical" })}" data-v-72815239>${_ctx.article.description ?? ""}</p></div><div class="item-meta" data-v-72815239><span class="date" data-allow-mismatch data-v-72815239><i class="iconfont icon-clock" data-v-72815239></i>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: _ctx.article.created_at
      }, null, _parent));
      _push(`</span><span class="views" data-v-72815239><i class="iconfont icon-eye" data-v-72815239></i><span data-v-72815239>${ssrInterpolate(unref(numberSplit)(_ctx.article.meta.views))}</span></span><span class="comments" data-v-72815239><i class="iconfont icon-comment" data-v-72815239></i><span data-v-72815239>${ssrInterpolate(_ctx.article.meta.comments)}</span></span><span class="likes" data-v-72815239><i class="${ssrRenderClass([{ liked: isLiked.value }, "iconfont icon-like"])}" data-v-72815239></i><span data-v-72815239>${ssrInterpolate(_ctx.article.meta.likes)}</span></span><span class="categories" data-v-72815239><i class="iconfont icon-category" data-v-72815239></i>`);
      _push(ssrRenderComponent(_component_placeholder, {
        transition: false,
        data: _ctx.article.categories.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).EMPTY_PLACEHOLDER
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocaleKey).EMPTY_PLACEHOLDER
              }, null, 8, ["k"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.article.categories.slice(0, 1), (category, index) => {
              _push2(ssrRenderComponent(_component_router_link, {
                key: index,
                to: unref(getCategoryFlowRoute)(category.slug)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_i18n, {
                      zh: category.name,
                      en: category.slug
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_i18n, {
                        zh: category.name,
                        en: category.slug
                      }, null, 8, ["zh", "en"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.article.categories.slice(0, 1), (category, index) => {
                return openBlock(), createBlock(_component_router_link, {
                  key: index,
                  to: unref(getCategoryFlowRoute)(category.slug)
                }, {
                  default: withCtx(() => [
                    createVNode(_component_i18n, {
                      zh: category.name,
                      en: category.slug
                    }, null, 8, ["zh", "en"])
                  ]),
                  _: 2
                }, 1032, ["to"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1Q = _sfc_main$1Q.setup;
_sfc_main$1Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/listing/desktop/item.vue");
  return _sfc_setup$1Q ? _sfc_setup$1Q(props, ctx) : void 0;
};
const ListItem = /* @__PURE__ */ _export_sfc(_sfc_main$1Q, [["__scopeId", "data-v-72815239"]]);
const _sfc_main$1P = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    articles: {},
    pagination: {},
    fetching: { type: Boolean },
    mammon: { type: Boolean, default: true }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { isDarkTheme, isZhLang } = useEnhancer();
    const hasMoreData = computed(() => {
      if (!props.pagination) return false;
      return props.pagination.current_page < props.pagination.total_page;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_empty = resolveComponent("empty");
      const _component_client_only = resolveComponent("client-only");
      const _component_Adsense = resolveComponent("Adsense");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles" }, _attrs))} data-v-76fcdb14><div class="article-list" data-v-76fcdb14>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: _ctx.articles.length,
        loading: !_ctx.articles.length && _ctx.fetching
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="article-list-skeleton" data-v-76fcdb14${_scopeId}><!--[-->`);
            ssrRenderList(6, (item) => {
              _push2(`<li class="item" data-v-76fcdb14${_scopeId}><div class="thumbnail" data-v-76fcdb14${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
              _push2(`</div><div class="content" data-v-76fcdb14${_scopeId}><div class="title" data-v-76fcdb14${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
              _push2(`</div><div class="description" data-v-76fcdb14${_scopeId}><!--[-->`);
              ssrRenderList(2, (line) => {
                _push2(`<div class="line-item" data-v-76fcdb14${_scopeId}>`);
                _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
              _push2(ssrRenderComponent(_component_skeleton_line, { class: "meta" }, null, _parent2, _scopeId));
              _push2(`</div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                class: "article-list-skeleton",
                key: "skeleton"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(6, (item) => {
                  return createVNode("li", {
                    key: item,
                    class: "item"
                  }, [
                    createVNode("div", { class: "thumbnail" }, [
                      createVNode(_component_skeleton_base)
                    ]),
                    createVNode("div", { class: "content" }, [
                      createVNode("div", { class: "title" }, [
                        createVNode(_component_skeleton_line)
                      ]),
                      createVNode("div", { class: "description" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(2, (line) => {
                          return createVNode("div", {
                            class: "line-item",
                            key: line
                          }, [
                            createVNode(_component_skeleton_line)
                          ]);
                        }), 64))
                      ]),
                      createVNode(_component_skeleton_line, { class: "meta" })
                    ])
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "empty",
              bold: "",
              size: "large",
              "i18n-key": unref(LocaleKey).ARTICLE_PLACEHOLDER
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "empty",
                bold: "",
                size: "large",
                "i18n-key": unref(LocaleKey).ARTICLE_PLACEHOLDER
              }, null, 8, ["i18n-key"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-76fcdb14${_scopeId}>`);
            _push2(ssrRenderComponent(_component_client_only, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.mammon) {
                    _push3(`<!--[-->`);
                    if (unref(isDarkTheme)) {
                      _push3(ssrRenderComponent(_component_Adsense, {
                        "ins-class": "mammon-ins",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hj-9+3a-97+6s",
                        "data-ad-slot": "1765379407",
                        class: "article-list-mammon"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_Adsense, {
                        "ins-class": "mammon-ins",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hj-9+3a-97+6s",
                        "data-ad-slot": "1148538406",
                        class: "article-list-mammon"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    _ctx.mammon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      unref(isDarkTheme) ? (openBlock(), createBlock(_component_Adsense, {
                        key: 0,
                        "ins-class": "mammon-ins",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hj-9+3a-97+6s",
                        "data-ad-slot": "1765379407",
                        class: "article-list-mammon"
                      })) : (openBlock(), createBlock(_component_Adsense, {
                        key: 1,
                        "ins-class": "mammon-ins",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hj-9+3a-97+6s",
                        "data-ad-slot": "1148538406",
                        class: "article-list-mammon"
                      }))
                    ], 64)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.articles, (articleItem) => {
              _push2(ssrRenderComponent(ListItem, {
                class: "list-item",
                key: articleItem.id,
                article: articleItem
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { key: "list" }, [
                createVNode(_component_client_only, null, {
                  default: withCtx(() => [
                    _ctx.mammon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      unref(isDarkTheme) ? (openBlock(), createBlock(_component_Adsense, {
                        key: 0,
                        "ins-class": "mammon-ins",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hj-9+3a-97+6s",
                        "data-ad-slot": "1765379407",
                        class: "article-list-mammon"
                      })) : (openBlock(), createBlock(_component_Adsense, {
                        key: 1,
                        "ins-class": "mammon-ins",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hj-9+3a-97+6s",
                        "data-ad-slot": "1148538406",
                        class: "article-list-mammon"
                      }))
                    ], 64)) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(TransitionGroup, { name: "list" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.articles, (articleItem) => {
                      return openBlock(), createBlock(ListItem, {
                        class: "list-item",
                        key: articleItem.id,
                        article: articleItem
                      }, null, 8, ["article"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="article-load"${ssrIncludeBooleanAttr(_ctx.fetching || !hasMoreData.value) ? " disabled" : ""} data-v-76fcdb14><div class="background" data-v-76fcdb14><span class="left" data-v-76fcdb14></span><span class="right" data-v-76fcdb14></span></div><div class="content" data-v-76fcdb14><span class="left" data-v-76fcdb14>`);
      if (_ctx.fetching) {
        _push(`<!--[-->•••<!--]-->`);
      } else {
        _push(`<!--[-->${ssrInterpolate(_ctx.articles.length)} / ${ssrInterpolate(_ctx.pagination?.total)}<!--]-->`);
      }
      _push(`</span><span class="right" data-v-76fcdb14><span class="${ssrRenderClass([{ zh: unref(isZhLang) }, "text"])}" data-v-76fcdb14>`);
      if (_ctx.fetching) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).ARTICLE_LIST_LOADING
        }, null, _parent));
      } else if (hasMoreData.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).ARTICLE_LIST_LOADMORE
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).LIST_NO_MORE_DATA
        }, null, _parent));
      }
      _push(`</span>`);
      if (_ctx.fetching || hasMoreData.value) {
        _push(`<i class="iconfont icon-loadmore" data-v-76fcdb14></i>`);
      } else {
        _push(`<i class="iconfont icon-stop" data-v-76fcdb14></i>`);
      }
      _push(`</span></div></button></div>`);
    };
  }
});
const _sfc_setup$1P = _sfc_main$1P.setup;
_sfc_main$1P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/listing/desktop/list.vue");
  return _sfc_setup$1P ? _sfc_setup$1P(props, ctx) : void 0;
};
const ArticleList = /* @__PURE__ */ _export_sfc(_sfc_main$1P, [["__scopeId", "data-v-76fcdb14"]]);
Swiper.use([Autoplay, Mousewheel, Mousewheel, Grid, EffectFade]);
const INITIAL_SLIDE_INDEX = 0;
const _sfc_main$1O = /* @__PURE__ */ defineComponent({
  __name: "carrousel",
  __ssrInlineRender: true,
  props: {
    articles: {},
    fetching: { type: Boolean },
    count: { default: 9 }
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, adConfig, cdnDomain, isDarkTheme } = useEnhancer();
    const getPictureURL = (url, format) => {
      if (!isOriginalStaticURL(url)) {
        return url;
      }
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(getStaticPath(url), {
          resize: true,
          width: 1190,
          height: 420,
          watermark: `watermark:0.36:sowe:18:18:0.15`,
          format
        })
      );
    };
    const swiperRef = shallowRef();
    const activatedSlideIndex = shallowRef(INITIAL_SLIDE_INDEX);
    const setSwiper = (_swiper) => {
      swiperRef.value = _swiper;
    };
    const goToSlide = (index) => {
      if (swiperRef.value) {
        swiperRef.value.slideToLoop(index);
      }
    };
    const updateActivatedSlideIndex = () => {
      if (swiperRef.value) {
        activatedSlideIndex.value = swiperRef.value.realIndex;
      }
    };
    const slides = computed(() => {
      const result = props.articles.slice(0, props.count).map((article) => ({
        title: article.title,
        route: getArticleDetailRoute(article.id),
        image: article.thumbnail || getAssetURL(cdnDomain, "/images/thumbnail/carrousel.jpg"),
        subscript: article.featured ? _i18n.t(LocaleKey.ARTICLE_FEATURED) : void 0
      }));
      if (!result.length) {
        return [];
      }
      if (adConfig.value.PC_CARROUSEL) {
        const config = adConfig.value.PC_CARROUSEL;
        result.splice(config.index, 0, {
          title: config.title,
          image: config.src,
          route: config.url,
          subscript: _i18n.t(LocaleKey.AD)
        });
      }
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_i18n = resolveComponent("i18n");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_ulink = resolveComponent("ulink");
      const _component_client_only = resolveComponent("client-only");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "carrousel" }, _attrs))} data-v-6cd91920>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: slides.value.length,
        loading: _ctx.fetching
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "article-empty",
              bold: "",
              key: "empty"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "article-empty",
                bold: "",
                key: "empty"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="article-skeleton" data-v-6cd91920${_scopeId}><div class="title" data-v-6cd91920${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div><div class="content" data-v-6cd91920${_scopeId}><div class="first" data-v-6cd91920${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div><!--[-->`);
            ssrRenderList(3, (index) => {
              _push2(`<div class="line" data-v-6cd91920${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, { class: "line-item" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "article-skeleton",
                key: "skeleton"
              }, [
                createVNode("div", { class: "title" }, [
                  createVNode(_component_skeleton_line)
                ]),
                createVNode("div", { class: "content" }, [
                  createVNode("div", { class: "first" }, [
                    createVNode(_component_skeleton_line)
                  ]),
                  (openBlock(), createBlock(Fragment, null, renderList(3, (index) => {
                    return createVNode("div", {
                      class: "line",
                      key: index
                    }, [
                      createVNode(_component_skeleton_line, { class: "line-item" })
                    ]);
                  }), 64))
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Swiper$1), {
              class: "swiper",
              autoplay: { delay: 3500, disableOnInteraction: false },
              style: { "--slide-delay": `${3500}ms` },
              loop: true,
              "set-wrapper-size": true,
              mousewheel: true,
              "observe-parents": true,
              "grab-cursor": false,
              "simulate-touch": false,
              "initial-slide": INITIAL_SLIDE_INDEX,
              onSlideChange: updateActivatedSlideIndex,
              onSwiper: setSwiper
            }, {
              "container-end": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_client_only, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="swiper-pagination" data-v-6cd91920${_scopeId3}><!--[-->`);
                        ssrRenderList(slides.value.slice(0, 9), (slide, index) => {
                          _push4(`<div${ssrRenderAttr("aria-label", `Go to article ${slide.title}`)} class="${ssrRenderClass([{ active: index === activatedSlideIndex.value }, "swiper-pagination-bullet"])}" role="button" data-v-6cd91920${_scopeId3}><span class="bullet-progress" data-v-6cd91920${_scopeId3}></span></div>`);
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "swiper-pagination" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(slides.value.slice(0, 9), (slide, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                "aria-label": `Go to article ${slide.title}`,
                                class: [{ active: index === activatedSlideIndex.value }, "swiper-pagination-bullet"],
                                role: "button",
                                onClick: ($event) => goToSlide(index)
                              }, [
                                createVNode("span", { class: "bullet-progress" })
                              ], 10, ["aria-label", "onClick"]);
                            }), 128))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_client_only, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "swiper-pagination" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(slides.value.slice(0, 9), (slide, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              "aria-label": `Go to article ${slide.title}`,
                              class: [{ active: index === activatedSlideIndex.value }, "swiper-pagination-bullet"],
                              role: "button",
                              onClick: ($event) => goToSlide(index)
                            }, [
                              createVNode("span", { class: "bullet-progress" })
                            ], 10, ["aria-label", "onClick"]);
                          }), 128))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(slides.value.slice(0, 9), (slide, index) => {
                    _push3(ssrRenderComponent(unref(SwiperSlide), { key: index }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="content" data-v-6cd91920${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ulink, {
                            class: "link",
                            href: slide.url,
                            to: slide.route
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<picture class="picture" data-v-6cd91920${_scopeId4}>`);
                                if (unref(isOriginalStaticURL)(slide.image)) {
                                  _push5(`<!--[--><source${ssrRenderAttr("srcset", getPictureURL(slide.image, "avif"))} type="image/avif" data-v-6cd91920${_scopeId4}><source${ssrRenderAttr("srcset", getPictureURL(slide.image, "webp"))} type="image/webp" data-v-6cd91920${_scopeId4}><!--]-->`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<img class="image" draggable="false"${ssrRenderAttr("alt", slide.title)}${ssrRenderAttr("src", getPictureURL(slide.image))} data-v-6cd91920${_scopeId4}></picture><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "title"])}"${ssrRenderAttr("title", slide.title)} data-v-6cd91920${_scopeId4}><div class="background" data-v-6cd91920${_scopeId4}></div><div class="prospect" data-v-6cd91920${_scopeId4}><span class="text" data-v-6cd91920${_scopeId4}>${ssrInterpolate(slide.title)}</span></div></div>`);
                                if (slide.subscript) {
                                  _push5(`<span class="subscript" data-v-6cd91920${_scopeId4}>${ssrInterpolate(slide.subscript)}</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode("picture", { class: "picture" }, [
                                    unref(isOriginalStaticURL)(slide.image) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createVNode("source", {
                                        srcset: getPictureURL(slide.image, "avif"),
                                        type: "image/avif"
                                      }, null, 8, ["srcset"]),
                                      createVNode("source", {
                                        srcset: getPictureURL(slide.image, "webp"),
                                        type: "image/webp"
                                      }, null, 8, ["srcset"])
                                    ], 64)) : createCommentVNode("", true),
                                    createVNode("img", {
                                      class: "image",
                                      draggable: "false",
                                      alt: slide.title,
                                      src: getPictureURL(slide.image)
                                    }, null, 8, ["alt", "src"])
                                  ]),
                                  createVNode("div", {
                                    class: ["title", { dark: unref(isDarkTheme) }],
                                    title: slide.title
                                  }, [
                                    createVNode("div", { class: "background" }),
                                    createVNode("div", { class: "prospect" }, [
                                      createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                    ])
                                  ], 10, ["title"]),
                                  slide.subscript ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "subscript"
                                  }, toDisplayString(slide.subscript), 1)) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "content" }, [
                              createVNode(_component_ulink, {
                                class: "link",
                                href: slide.url,
                                to: slide.route
                              }, {
                                default: withCtx(() => [
                                  createVNode("picture", { class: "picture" }, [
                                    unref(isOriginalStaticURL)(slide.image) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createVNode("source", {
                                        srcset: getPictureURL(slide.image, "avif"),
                                        type: "image/avif"
                                      }, null, 8, ["srcset"]),
                                      createVNode("source", {
                                        srcset: getPictureURL(slide.image, "webp"),
                                        type: "image/webp"
                                      }, null, 8, ["srcset"])
                                    ], 64)) : createCommentVNode("", true),
                                    createVNode("img", {
                                      class: "image",
                                      draggable: "false",
                                      alt: slide.title,
                                      src: getPictureURL(slide.image)
                                    }, null, 8, ["alt", "src"])
                                  ]),
                                  createVNode("div", {
                                    class: ["title", { dark: unref(isDarkTheme) }],
                                    title: slide.title
                                  }, [
                                    createVNode("div", { class: "background" }),
                                    createVNode("div", { class: "prospect" }, [
                                      createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                    ])
                                  ], 10, ["title"]),
                                  slide.subscript ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "subscript"
                                  }, toDisplayString(slide.subscript), 1)) : createCommentVNode("", true)
                                ]),
                                _: 2
                              }, 1032, ["href", "to"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(slides.value.slice(0, 9), (slide, index) => {
                      return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "content" }, [
                            createVNode(_component_ulink, {
                              class: "link",
                              href: slide.url,
                              to: slide.route
                            }, {
                              default: withCtx(() => [
                                createVNode("picture", { class: "picture" }, [
                                  unref(isOriginalStaticURL)(slide.image) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createVNode("source", {
                                      srcset: getPictureURL(slide.image, "avif"),
                                      type: "image/avif"
                                    }, null, 8, ["srcset"]),
                                    createVNode("source", {
                                      srcset: getPictureURL(slide.image, "webp"),
                                      type: "image/webp"
                                    }, null, 8, ["srcset"])
                                  ], 64)) : createCommentVNode("", true),
                                  createVNode("img", {
                                    class: "image",
                                    draggable: "false",
                                    alt: slide.title,
                                    src: getPictureURL(slide.image)
                                  }, null, 8, ["alt", "src"])
                                ]),
                                createVNode("div", {
                                  class: ["title", { dark: unref(isDarkTheme) }],
                                  title: slide.title
                                }, [
                                  createVNode("div", { class: "background" }),
                                  createVNode("div", { class: "prospect" }, [
                                    createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                  ])
                                ], 10, ["title"]),
                                slide.subscript ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "subscript"
                                }, toDisplayString(slide.subscript), 1)) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["href", "to"])
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Swiper$1), {
                class: "swiper",
                autoplay: { delay: 3500, disableOnInteraction: false },
                style: { "--slide-delay": `${3500}ms` },
                loop: true,
                "set-wrapper-size": true,
                mousewheel: true,
                "observe-parents": true,
                "grab-cursor": false,
                "simulate-touch": false,
                "initial-slide": INITIAL_SLIDE_INDEX,
                onSlideChange: updateActivatedSlideIndex,
                onSwiper: setSwiper
              }, {
                "container-end": withCtx(() => [
                  createVNode(_component_client_only, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "swiper-pagination" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(slides.value.slice(0, 9), (slide, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            "aria-label": `Go to article ${slide.title}`,
                            class: [{ active: index === activatedSlideIndex.value }, "swiper-pagination-bullet"],
                            role: "button",
                            onClick: ($event) => goToSlide(index)
                          }, [
                            createVNode("span", { class: "bullet-progress" })
                          ], 10, ["aria-label", "onClick"]);
                        }), 128))
                      ])
                    ]),
                    _: 1
                  })
                ]),
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(slides.value.slice(0, 9), (slide, index) => {
                    return openBlock(), createBlock(unref(SwiperSlide), { key: index }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "content" }, [
                          createVNode(_component_ulink, {
                            class: "link",
                            href: slide.url,
                            to: slide.route
                          }, {
                            default: withCtx(() => [
                              createVNode("picture", { class: "picture" }, [
                                unref(isOriginalStaticURL)(slide.image) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                  createVNode("source", {
                                    srcset: getPictureURL(slide.image, "avif"),
                                    type: "image/avif"
                                  }, null, 8, ["srcset"]),
                                  createVNode("source", {
                                    srcset: getPictureURL(slide.image, "webp"),
                                    type: "image/webp"
                                  }, null, 8, ["srcset"])
                                ], 64)) : createCommentVNode("", true),
                                createVNode("img", {
                                  class: "image",
                                  draggable: "false",
                                  alt: slide.title,
                                  src: getPictureURL(slide.image)
                                }, null, 8, ["alt", "src"])
                              ]),
                              createVNode("div", {
                                class: ["title", { dark: unref(isDarkTheme) }],
                                title: slide.title
                              }, [
                                createVNode("div", { class: "background" }),
                                createVNode("div", { class: "prospect" }, [
                                  createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                ])
                              ], 10, ["title"]),
                              slide.subscript ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "subscript"
                              }, toDisplayString(slide.subscript), 1)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["href", "to"])
                        ])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1O = _sfc_main$1O.setup;
_sfc_main$1O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/carrousel.vue");
  return _sfc_setup$1O ? _sfc_setup$1O(props, ctx) : void 0;
};
const Carrousel = /* @__PURE__ */ _export_sfc(_sfc_main$1O, [["__scopeId", "data-v-6cd91920"]]);
const _sfc_main$1N = /* @__PURE__ */ defineComponent({
  __name: "threads",
  __ssrInlineRender: true,
  props: {
    profile: {},
    medias: {},
    fetching: { type: Boolean }
  },
  setup(__props) {
    const { goLink } = useStores();
    const { isCNUser } = useEnhancer();
    const swiperRef = shallowRef();
    const prevSlide = () => swiperRef.value?.slidePrev();
    const nextSlide = () => swiperRef.value?.slideNext();
    const setSwiper = (_swiper) => {
      swiperRef.value = _swiper;
    };
    const activeIndex = ref(0);
    const handleSwiperTransitionStart = () => {
      activeIndex.value = swiperRef.value?.activeIndex || 0;
    };
    const isMediaPost = (media) => {
      return ["AUDIO", "IMAGE", "VIDEO", "CAROUSEL_ALBUM"].includes(media.media_type);
    };
    const handleGtagEvent = (name) => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "threads" }, _attrs))} data-v-102c36a1>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: _ctx.profile ?? void 0,
        loading: _ctx.fetching
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "threads-empty",
              bold: "",
              key: "empty"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "threads-empty",
                bold: "",
                key: "empty"
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="threads-skeleton" data-v-102c36a1${_scopeId}><div class="left" data-v-102c36a1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div><div class="right" data-v-102c36a1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "threads-skeleton",
                key: "skeleton"
              }, [
                createVNode("div", { class: "left" }, [
                  createVNode(_component_skeleton_line)
                ]),
                createVNode("div", { class: "right" }, [
                  createVNode(_component_skeleton_line)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="threads-content" data-v-102c36a1${_scopeId}>`);
            if (_ctx.profile) {
              _push2(`<div class="profile"${ssrRenderAttr("title", _ctx.profile.name)} data-v-102c36a1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ulink, {
                class: "link",
                href: unref(goLink).map.threads,
                onMousedown: ($event) => handleGtagEvent()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_uimage, {
                      class: "avatar",
                      src: _ctx.profile.avatar,
                      proxy: unref(isCNUser),
                      defer: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="logo" data-v-102c36a1${_scopeId2}><i class="iconfont icon-threads" data-v-102c36a1${_scopeId2}></i></span>`);
                  } else {
                    return [
                      createVNode(_component_uimage, {
                        class: "avatar",
                        src: _ctx.profile.avatar,
                        proxy: unref(isCNUser),
                        defer: ""
                      }, null, 8, ["src", "proxy"]),
                      createVNode("span", { class: "logo" }, [
                        createVNode("i", { class: "iconfont icon-threads" })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="count" data-v-102c36a1${_scopeId}><p class="title" data-v-102c36a1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                en: "Latest",
                zh: "碎碎"
              }, null, _parent2, _scopeId));
              _push2(`</p><p class="secondary" data-v-102c36a1${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                en: "threads",
                zh: "清风念"
              }, null, _parent2, _scopeId));
              _push2(`</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="posts" data-v-102c36a1${_scopeId}>`);
            if (!_ctx.medias.length) {
              _push2(ssrRenderComponent(_component_empty, {
                class: "posts-empty",
                bold: "",
                key: "empty"
              }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Swiper$1), {
                class: "posts-swiper",
                direction: "vertical",
                height: 66,
                mousewheel: true,
                "allow-touch-move": false,
                "slides-per-view": 1,
                "prevent-clicks": false,
                autoplay: { delay: 3500, disableOnInteraction: false },
                onTransitionStart: handleSwiperTransitionStart,
                onSwiper: setSwiper
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(_ctx.medias, (media, index) => {
                      _push3(ssrRenderComponent(unref(SwiperSlide), {
                        class: "post-item",
                        key: index
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="content" data-v-102c36a1${_scopeId3}>`);
                            if (media.text) {
                              _push4(`<div${ssrRenderAttr("title", media.text)} class="${ssrRenderClass(["main", { "has-media": isMediaPost(media) }])}" data-v-102c36a1${_scopeId3}>${unref(unescape)(media.text) ?? ""}</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            if (isMediaPost(media)) {
                              _push4(ssrRenderComponent(_component_ulink, {
                                class: ["medias", { empty: !media.text }],
                                href: media.permalink,
                                onMousedown: ($event) => handleGtagEvent()
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    if (media.media_type === "VIDEO") {
                                      _push5(`<i class="iconfont media icon-video" data-v-102c36a1${_scopeId4}></i>`);
                                    } else if (media.media_type === "AUDIO") {
                                      _push5(`<i class="iconfont media icon-audio" data-v-102c36a1${_scopeId4}></i>`);
                                    } else if (media.media_type === "IMAGE" || media.media_type === "CAROUSEL_ALBUM") {
                                      _push5(`<i class="iconfont media icon-image" data-v-102c36a1${_scopeId4}></i>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (media.children?.data?.length) {
                                      _push5(`<span class="count" data-v-102c36a1${_scopeId4}>[${ssrInterpolate(media.children.data.length)}]</span>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    _push5(`<i class="iconfont window icon-new-window-s" data-v-102c36a1${_scopeId4}></i>`);
                                  } else {
                                    return [
                                      media.media_type === "VIDEO" ? (openBlock(), createBlock("i", {
                                        key: 0,
                                        class: "iconfont media icon-video"
                                      })) : media.media_type === "AUDIO" ? (openBlock(), createBlock("i", {
                                        key: 1,
                                        class: "iconfont media icon-audio"
                                      })) : media.media_type === "IMAGE" || media.media_type === "CAROUSEL_ALBUM" ? (openBlock(), createBlock("i", {
                                        key: 2,
                                        class: "iconfont media icon-image"
                                      })) : createCommentVNode("", true),
                                      media.children?.data?.length ? (openBlock(), createBlock("span", {
                                        key: 3,
                                        class: "count"
                                      }, "[" + toDisplayString(media.children.data.length) + "]", 1)) : createCommentVNode("", true),
                                      createVNode("i", { class: "iconfont window icon-new-window-s" })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div><div class="meta" data-v-102c36a1${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_ulink, {
                              class: "item link",
                              title: "To Post",
                              href: media.permalink,
                              onMousedown: ($event) => handleGtagEvent()
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (media.is_quote_post) {
                                    _push5(`<i class="iconfont icon-repost" data-v-102c36a1${_scopeId4}></i>`);
                                  } else {
                                    _push5(`<i class="iconfont icon-threads" data-v-102c36a1${_scopeId4}></i>`);
                                  }
                                  _push5(`<span data-v-102c36a1${_scopeId4}>thread</span><i class="iconfont window icon-new-window-s" data-v-102c36a1${_scopeId4}></i>`);
                                } else {
                                  return [
                                    media.is_quote_post ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "iconfont icon-repost"
                                    })) : (openBlock(), createBlock("i", {
                                      key: 1,
                                      class: "iconfont icon-threads"
                                    })),
                                    createVNode("span", null, "thread"),
                                    createVNode("i", { class: "iconfont window icon-new-window-s" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            if (media.timestamp) {
                              _push4(`<span class="item date" data-allow-mismatch data-v-102c36a1${_scopeId3}><i class="iconfont icon-clock" data-v-102c36a1${_scopeId3}></i>`);
                              _push4(ssrRenderComponent(_component_udate, {
                                to: "ago",
                                date: media.timestamp
                              }, null, _parent4, _scopeId3));
                              _push4(`</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "content" }, [
                                media.text ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  title: media.text,
                                  innerHTML: unref(unescape)(media.text),
                                  class: ["main", { "has-media": isMediaPost(media) }]
                                }, null, 10, ["title", "innerHTML"])) : createCommentVNode("", true),
                                isMediaPost(media) ? (openBlock(), createBlock(_component_ulink, {
                                  key: 1,
                                  class: ["medias", { empty: !media.text }],
                                  href: media.permalink,
                                  onMousedown: ($event) => handleGtagEvent()
                                }, {
                                  default: withCtx(() => [
                                    media.media_type === "VIDEO" ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "iconfont media icon-video"
                                    })) : media.media_type === "AUDIO" ? (openBlock(), createBlock("i", {
                                      key: 1,
                                      class: "iconfont media icon-audio"
                                    })) : media.media_type === "IMAGE" || media.media_type === "CAROUSEL_ALBUM" ? (openBlock(), createBlock("i", {
                                      key: 2,
                                      class: "iconfont media icon-image"
                                    })) : createCommentVNode("", true),
                                    media.children?.data?.length ? (openBlock(), createBlock("span", {
                                      key: 3,
                                      class: "count"
                                    }, "[" + toDisplayString(media.children.data.length) + "]", 1)) : createCommentVNode("", true),
                                    createVNode("i", { class: "iconfont window icon-new-window-s" })
                                  ]),
                                  _: 2
                                }, 1032, ["class", "href", "onMousedown"])) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "meta" }, [
                                createVNode(_component_ulink, {
                                  class: "item link",
                                  title: "To Post",
                                  href: media.permalink,
                                  onMousedown: ($event) => handleGtagEvent()
                                }, {
                                  default: withCtx(() => [
                                    media.is_quote_post ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "iconfont icon-repost"
                                    })) : (openBlock(), createBlock("i", {
                                      key: 1,
                                      class: "iconfont icon-threads"
                                    })),
                                    createVNode("span", null, "thread"),
                                    createVNode("i", { class: "iconfont window icon-new-window-s" })
                                  ]),
                                  _: 2
                                }, 1032, ["href", "onMousedown"]),
                                media.timestamp ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "item date",
                                  "data-allow-mismatch": ""
                                }, [
                                  createVNode("i", { class: "iconfont icon-clock" }),
                                  createVNode(_component_udate, {
                                    to: "ago",
                                    date: media.timestamp
                                  }, null, 8, ["date"])
                                ])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.medias, (media, index) => {
                        return openBlock(), createBlock(unref(SwiperSlide), {
                          class: "post-item",
                          key: index
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "content" }, [
                              media.text ? (openBlock(), createBlock("div", {
                                key: 0,
                                title: media.text,
                                innerHTML: unref(unescape)(media.text),
                                class: ["main", { "has-media": isMediaPost(media) }]
                              }, null, 10, ["title", "innerHTML"])) : createCommentVNode("", true),
                              isMediaPost(media) ? (openBlock(), createBlock(_component_ulink, {
                                key: 1,
                                class: ["medias", { empty: !media.text }],
                                href: media.permalink,
                                onMousedown: ($event) => handleGtagEvent()
                              }, {
                                default: withCtx(() => [
                                  media.media_type === "VIDEO" ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "iconfont media icon-video"
                                  })) : media.media_type === "AUDIO" ? (openBlock(), createBlock("i", {
                                    key: 1,
                                    class: "iconfont media icon-audio"
                                  })) : media.media_type === "IMAGE" || media.media_type === "CAROUSEL_ALBUM" ? (openBlock(), createBlock("i", {
                                    key: 2,
                                    class: "iconfont media icon-image"
                                  })) : createCommentVNode("", true),
                                  media.children?.data?.length ? (openBlock(), createBlock("span", {
                                    key: 3,
                                    class: "count"
                                  }, "[" + toDisplayString(media.children.data.length) + "]", 1)) : createCommentVNode("", true),
                                  createVNode("i", { class: "iconfont window icon-new-window-s" })
                                ]),
                                _: 2
                              }, 1032, ["class", "href", "onMousedown"])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "meta" }, [
                              createVNode(_component_ulink, {
                                class: "item link",
                                title: "To Post",
                                href: media.permalink,
                                onMousedown: ($event) => handleGtagEvent()
                              }, {
                                default: withCtx(() => [
                                  media.is_quote_post ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "iconfont icon-repost"
                                  })) : (openBlock(), createBlock("i", {
                                    key: 1,
                                    class: "iconfont icon-threads"
                                  })),
                                  createVNode("span", null, "thread"),
                                  createVNode("i", { class: "iconfont window icon-new-window-s" })
                                ]),
                                _: 2
                              }, 1032, ["href", "onMousedown"]),
                              media.timestamp ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "item date",
                                "data-allow-mismatch": ""
                              }, [
                                createVNode("i", { class: "iconfont icon-clock" }),
                                createVNode(_component_udate, {
                                  to: "ago",
                                  date: media.timestamp
                                }, null, 8, ["date"])
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div><div class="navigation" data-v-102c36a1${_scopeId}><button class="button prev"${ssrIncludeBooleanAttr(!_ctx.medias.length || activeIndex.value === 0) ? " disabled" : ""} data-v-102c36a1${_scopeId}><i class="iconfont icon-totop" data-v-102c36a1${_scopeId}></i></button><button class="button next"${ssrIncludeBooleanAttr(!_ctx.medias.length || activeIndex.value === _ctx.medias.length - 1) ? " disabled" : ""} data-v-102c36a1${_scopeId}><i class="iconfont icon-tobottom" data-v-102c36a1${_scopeId}></i></button></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "threads-content",
                key: "content"
              }, [
                _ctx.profile ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "profile",
                  title: _ctx.profile.name
                }, [
                  createVNode(_component_ulink, {
                    class: "link",
                    href: unref(goLink).map.threads,
                    onMousedown: ($event) => handleGtagEvent()
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_uimage, {
                        class: "avatar",
                        src: _ctx.profile.avatar,
                        proxy: unref(isCNUser),
                        defer: ""
                      }, null, 8, ["src", "proxy"]),
                      createVNode("span", { class: "logo" }, [
                        createVNode("i", { class: "iconfont icon-threads" })
                      ])
                    ]),
                    _: 1
                  }, 8, ["href", "onMousedown"]),
                  createVNode("div", { class: "count" }, [
                    createVNode("p", { class: "title" }, [
                      createVNode(_component_i18n, {
                        en: "Latest",
                        zh: "碎碎"
                      })
                    ]),
                    createVNode("p", { class: "secondary" }, [
                      createVNode(_component_i18n, {
                        en: "threads",
                        zh: "清风念"
                      })
                    ])
                  ])
                ], 8, ["title"])) : createCommentVNode("", true),
                createVNode("div", { class: "posts" }, [
                  !_ctx.medias.length ? (openBlock(), createBlock(_component_empty, {
                    class: "posts-empty",
                    bold: "",
                    key: "empty"
                  })) : (openBlock(), createBlock(unref(Swiper$1), {
                    key: 1,
                    class: "posts-swiper",
                    direction: "vertical",
                    height: 66,
                    mousewheel: true,
                    "allow-touch-move": false,
                    "slides-per-view": 1,
                    "prevent-clicks": false,
                    autoplay: { delay: 3500, disableOnInteraction: false },
                    onTransitionStart: handleSwiperTransitionStart,
                    onSwiper: setSwiper
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.medias, (media, index) => {
                        return openBlock(), createBlock(unref(SwiperSlide), {
                          class: "post-item",
                          key: index
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "content" }, [
                              media.text ? (openBlock(), createBlock("div", {
                                key: 0,
                                title: media.text,
                                innerHTML: unref(unescape)(media.text),
                                class: ["main", { "has-media": isMediaPost(media) }]
                              }, null, 10, ["title", "innerHTML"])) : createCommentVNode("", true),
                              isMediaPost(media) ? (openBlock(), createBlock(_component_ulink, {
                                key: 1,
                                class: ["medias", { empty: !media.text }],
                                href: media.permalink,
                                onMousedown: ($event) => handleGtagEvent()
                              }, {
                                default: withCtx(() => [
                                  media.media_type === "VIDEO" ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "iconfont media icon-video"
                                  })) : media.media_type === "AUDIO" ? (openBlock(), createBlock("i", {
                                    key: 1,
                                    class: "iconfont media icon-audio"
                                  })) : media.media_type === "IMAGE" || media.media_type === "CAROUSEL_ALBUM" ? (openBlock(), createBlock("i", {
                                    key: 2,
                                    class: "iconfont media icon-image"
                                  })) : createCommentVNode("", true),
                                  media.children?.data?.length ? (openBlock(), createBlock("span", {
                                    key: 3,
                                    class: "count"
                                  }, "[" + toDisplayString(media.children.data.length) + "]", 1)) : createCommentVNode("", true),
                                  createVNode("i", { class: "iconfont window icon-new-window-s" })
                                ]),
                                _: 2
                              }, 1032, ["class", "href", "onMousedown"])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "meta" }, [
                              createVNode(_component_ulink, {
                                class: "item link",
                                title: "To Post",
                                href: media.permalink,
                                onMousedown: ($event) => handleGtagEvent()
                              }, {
                                default: withCtx(() => [
                                  media.is_quote_post ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "iconfont icon-repost"
                                  })) : (openBlock(), createBlock("i", {
                                    key: 1,
                                    class: "iconfont icon-threads"
                                  })),
                                  createVNode("span", null, "thread"),
                                  createVNode("i", { class: "iconfont window icon-new-window-s" })
                                ]),
                                _: 2
                              }, 1032, ["href", "onMousedown"]),
                              media.timestamp ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "item date",
                                "data-allow-mismatch": ""
                              }, [
                                createVNode("i", { class: "iconfont icon-clock" }),
                                createVNode(_component_udate, {
                                  to: "ago",
                                  date: media.timestamp
                                }, null, 8, ["date"])
                              ])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  }))
                ]),
                createVNode("div", { class: "navigation" }, [
                  createVNode("button", {
                    class: "button prev",
                    disabled: !_ctx.medias.length || activeIndex.value === 0,
                    onClick: prevSlide
                  }, [
                    createVNode("i", { class: "iconfont icon-totop" })
                  ], 8, ["disabled"]),
                  createVNode("button", {
                    class: "button next",
                    disabled: !_ctx.medias.length || activeIndex.value === _ctx.medias.length - 1,
                    onClick: nextSlide
                  }, [
                    createVNode("i", { class: "iconfont icon-tobottom" })
                  ], 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1N = _sfc_main$1N.setup;
_sfc_main$1N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/threads.vue");
  return _sfc_setup$1N ? _sfc_setup$1N(props, ctx) : void 0;
};
const Threads = /* @__PURE__ */ _export_sfc(_sfc_main$1N, [["__scopeId", "data-v-102c36a1"]]);
const _sfc_main$1M = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, isZhLang } = useEnhancer();
    const { appOption, threadsProfile, threadsLatestMedias, articleList: articleListStore } = useStores();
    const loadmoreArticles = async () => {
      const targetPage = articleListStore.pagination.current_page + 1;
      await articleListStore.fetch({ page: targetPage });
      if (targetPage > 1 && isClient) {
        scrollToNextScreen();
      }
    };
    usePageSeo(() => ({
      title: `${APP_META.title} - ${_i18n.t(LocaleKey.APP_SLOGAN)}`,
      description: isZhLang.value ? APP_META.zh_description : APP_META.en_description,
      keywords: appOption.data?.keywords.join(",")
    }));
    useUniversalFetch(() => {
      return Promise.all([
        articleListStore.fetch(),
        threadsProfile.fetch().catch(() => {
        }),
        threadsLatestMedias.fetch().catch(() => {
        })
      ]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index-page" }, _attrs))} data-v-8e9e8e59>`);
      _push(ssrRenderComponent(Carrousel, {
        class: "carrousel",
        articles: unref(articleListStore).data,
        fetching: unref(articleListStore).fetching
      }, null, _parent));
      _push(ssrRenderComponent(Threads, {
        class: "threads",
        profile: unref(threadsProfile).data,
        medias: unref(threadsLatestMedias).data?.data ?? [],
        fetching: unref(threadsLatestMedias).fetching || unref(threadsProfile).fetching || unref(articleListStore).fetching
      }, null, _parent));
      _push(ssrRenderComponent(ArticleList, {
        mammon: false,
        fetching: unref(articleListStore).fetching,
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1M = _sfc_main$1M.setup;
_sfc_main$1M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/index.vue");
  return _sfc_setup$1M ? _sfc_setup$1M(props, ctx) : void 0;
};
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main$1M, [["__scopeId", "data-v-8e9e8e59"]]);
const _sfc_main$1L = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  props: {
    icon: {},
    backgroundColor: {},
    backgroundImage: {}
  },
  setup(__props) {
    const cdnDomain = useCdnDomain();
    const defaultImage = getAssetURL(cdnDomain, "/images/thumbnail/carrousel.jpg");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-3bdeb7c3><div class="background" style="${ssrRenderStyle({
        backgroundColor: _ctx.backgroundColor,
        backgroundImage: `url(${_ctx.backgroundImage ?? unref(defaultImage)})`
      })}" data-v-3bdeb7c3></div><div class="content" data-v-3bdeb7c3><div class="logo" data-v-3bdeb7c3><i class="${ssrRenderClass([_ctx.icon, "iconfont"])}" data-v-3bdeb7c3></i></div><div class="title" data-v-3bdeb7c3><div class="text" data-v-3bdeb7c3>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1L = _sfc_main$1L.setup;
_sfc_main$1L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/listing/desktop/header.vue");
  return _sfc_setup$1L ? _sfc_setup$1L(props, ctx) : void 0;
};
const ArticleListHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1L, [["__scopeId", "data-v-3bdeb7c3"]]);
const _sfc_main$1K = /* @__PURE__ */ defineComponent({
  __name: "category",
  __ssrInlineRender: true,
  props: {
    categorySlug: {}
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, cdnDomain, isZhLang } = useEnhancer();
    const { articleList: articleListStore, category: categoryStore } = useStores();
    const currentCategory = computed(() => {
      return categoryStore.data.find((category) => category.slug === props.categorySlug);
    });
    const currentCategoryIcon = computed(() => {
      return getExtendValue(currentCategory.value?.extends || [], "icon") || "icon-category";
    });
    const currentCategoryColor = computed(() => {
      return getExtendValue(currentCategory.value?.extends || [], "bgcolor");
    });
    const currentCategoryImage = computed(() => {
      const value = getExtendValue(currentCategory.value?.extends || [], "background");
      if (isOriginalStaticURL(value)) {
        return getStaticURL(cdnDomain, getStaticPath(value));
      } else {
        return value;
      }
    });
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        category_slug: props.categorySlug,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    usePageSeo(() => {
      const enTitle = firstUpperCase(props.categorySlug);
      const zhTitle = _i18n.t(props.categorySlug);
      const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle];
      return {
        pageTitles: titles,
        description: currentCategory.value?.description || titles.join(","),
        ogType: "website"
      };
    });
    onBeforeMount(() => {
      watch(
        () => props.categorySlug,
        (category_slug) => articleListStore.fetch({ category_slug }),
        { flush: "post" }
      );
    });
    useUniversalFetch(() => {
      return articleListStore.fetch({ category_slug: props.categorySlug });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-flow-page" }, _attrs))} data-v-baba6f41>`);
      _push(ssrRenderComponent(ArticleListHeader, {
        "background-color": currentCategoryColor.value,
        "background-image": currentCategoryImage.value,
        icon: currentCategoryIcon.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentCategory.value) {
              _push2(ssrRenderComponent(_component_i18n, null, {
                zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-baba6f41${_scopeId2}>${ssrInterpolate(currentCategory.value.name)}</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-baba6f41${_scopeId2}>${ssrInterpolate(currentCategory.value.description || "...")}</span>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(currentCategory.value.name), 1),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, toDisplayString(currentCategory.value.description || "..."), 1)
                    ];
                  }
                }),
                en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-baba6f41${_scopeId2}>Category</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-baba6f41${_scopeId2}>${ssrInterpolate(unref(firstUpperCase)(currentCategory.value.slug))}</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Category"),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, toDisplayString(unref(firstUpperCase)(currentCategory.value.slug)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              currentCategory.value ? (openBlock(), createBlock(_component_i18n, { key: 0 }, {
                zh: withCtx(() => [
                  createVNode("span", null, toDisplayString(currentCategory.value.name), 1),
                  createVNode(_component_divider, {
                    class: "divider",
                    type: "vertical"
                  }),
                  createVNode("span", null, toDisplayString(currentCategory.value.description || "..."), 1)
                ]),
                en: withCtx(() => [
                  createVNode("span", null, "Category"),
                  createVNode(_component_divider, {
                    class: "divider",
                    type: "vertical"
                  }),
                  createVNode("span", null, toDisplayString(unref(firstUpperCase)(currentCategory.value.slug)), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleList, {
        fetching: unref(articleListStore).fetching,
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1K = _sfc_main$1K.setup;
_sfc_main$1K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/category.vue");
  return _sfc_setup$1K ? _sfc_setup$1K(props, ctx) : void 0;
};
const CategoryListingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1K, [["__scopeId", "data-v-baba6f41"]]);
const _sfc_main$1J = /* @__PURE__ */ defineComponent({
  __name: "tag",
  __ssrInlineRender: true,
  props: {
    tagSlug: {}
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain, isZhLang } = useEnhancer();
    const tagStore = useTagStore();
    const articleListStore = useArticleListStore();
    const currentTag = computed(() => tagStore.data.find((tag) => tag.slug === props.tagSlug));
    const currentTagIcon = computed(() => getExtendValue(currentTag.value?.extends || [], "icon") || "icon-tag");
    const currentTagColor = computed(() => getExtendValue(currentTag.value?.extends || [], "bgcolor"));
    const currentTagImage = computed(() => {
      const value = getExtendValue(currentTag.value?.extends || [], "background");
      if (isOriginalStaticURL(value)) {
        return getStaticURL(cdnDomain, getStaticPath(value));
      } else {
        return value;
      }
    });
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        tag_slug: props.tagSlug,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    usePageSeo(() => {
      const enTitle = firstUpperCase(props.tagSlug);
      const zhTitle = currentTag.value?.name;
      const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, "Tag"];
      const description = currentTag.value?.description || titles.join(",");
      return { pageTitles: titles, description };
    });
    onBeforeMount(() => {
      watch(
        () => props.tagSlug,
        (tag_slug) => articleListStore.fetch({ tag_slug }),
        { flush: "post" }
      );
    });
    useUniversalFetch(() => {
      return articleListStore.fetch({ tag_slug: props.tagSlug });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tag-flow-page" }, _attrs))} data-v-3f25e4df>`);
      _push(ssrRenderComponent(ArticleListHeader, {
        "background-color": currentTagColor.value,
        "background-image": currentTagImage.value,
        icon: currentTagIcon.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentTag.value) {
              _push2(`<span class="header" data-v-3f25e4df${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, null, {
                zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-3f25e4df${_scopeId2}>#${ssrInterpolate(currentTag.value.name)}</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-3f25e4df${_scopeId2}>${ssrInterpolate(currentTag.value.description || "...")}</span>`);
                  } else {
                    return [
                      createVNode("span", null, "#" + toDisplayString(currentTag.value.name), 1),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, toDisplayString(currentTag.value.description || "..."), 1)
                    ];
                  }
                }),
                en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-3f25e4df${_scopeId2}>Tag</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-3f25e4df${_scopeId2}>#${ssrInterpolate(unref(getTagEnName)(currentTag.value))}</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Tag"),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, "#" + toDisplayString(unref(getTagEnName)(currentTag.value)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              currentTag.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "header"
              }, [
                createVNode(_component_i18n, null, {
                  zh: withCtx(() => [
                    createVNode("span", null, "#" + toDisplayString(currentTag.value.name), 1),
                    createVNode(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }),
                    createVNode("span", null, toDisplayString(currentTag.value.description || "..."), 1)
                  ]),
                  en: withCtx(() => [
                    createVNode("span", null, "Tag"),
                    createVNode(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }),
                    createVNode("span", null, "#" + toDisplayString(unref(getTagEnName)(currentTag.value)), 1)
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleList, {
        fetching: unref(articleListStore).fetching,
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1J = _sfc_main$1J.setup;
_sfc_main$1J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tag.vue");
  return _sfc_setup$1J ? _sfc_setup$1J(props, ctx) : void 0;
};
const TagListingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1J, [["__scopeId", "data-v-3f25e4df"]]);
const _sfc_main$1I = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  props: {
    keyword: {}
  },
  setup(__props) {
    const props = __props;
    const { isZhLang } = useEnhancer();
    const articleListStore = useArticleListStore();
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        keyword: props.keyword,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    usePageSeo(() => ({
      pageTitles: [`"${props.keyword}"`, isZhLang.value ? "搜索" : "Search"],
      ogType: "website"
    }));
    onBeforeMount(() => {
      watch(
        () => props.keyword,
        (keyword) => articleListStore.fetch({ keyword }),
        { flush: "post" }
      );
    });
    useUniversalFetch(() => {
      return articleListStore.fetch({ keyword: props.keyword });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-flow-page" }, _attrs))}>`);
      _push(ssrRenderComponent(ArticleListHeader, { icon: "icon-search" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              zh: `和 “${_ctx.keyword}” 有关的所有文章`,
              en: `Keyword "${_ctx.keyword}"'s result`
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                zh: `和 “${_ctx.keyword}” 有关的所有文章`,
                en: `Keyword "${_ctx.keyword}"'s result`
              }, null, 8, ["zh", "en"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleList, {
        fetching: unref(articleListStore).fetching,
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1I = _sfc_main$1I.setup;
_sfc_main$1I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/search.vue");
  return _sfc_setup$1I ? _sfc_setup$1I(props, ctx) : void 0;
};
const _sfc_main$1H = /* @__PURE__ */ defineComponent({
  __name: "date",
  __ssrInlineRender: true,
  props: {
    date: {}
  },
  setup(__props) {
    const props = __props;
    const { articleList: articleListStore } = useStores();
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        date: props.date,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    usePageSeo(() => ({
      pageTitles: [props.date, "Date"],
      ogType: "website"
    }));
    onBeforeMount(() => {
      watch(
        () => props.date,
        (date) => articleListStore.fetch({ date }),
        { flush: "post" }
      );
    });
    useUniversalFetch(() => {
      return articleListStore.fetch({ date: props.date });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "date-flow-page" }, _attrs))}>`);
      _push(ssrRenderComponent(ArticleListHeader, { icon: "icon-clock" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              zh: `发布于 ${_ctx.date} 的所有文章`,
              en: `Articles published at ${_ctx.date}`
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                zh: `发布于 ${_ctx.date} 的所有文章`,
                en: `Articles published at ${_ctx.date}`
              }, null, 8, ["zh", "en"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleList, {
        fetching: unref(articleListStore).fetching,
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1H = _sfc_main$1H.setup;
_sfc_main$1H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/date.vue");
  return _sfc_setup$1H ? _sfc_setup$1H(props, ctx) : void 0;
};
const i18ns$1 = {
  title: {
    [Language.Chinese]: "出入平等，了了分明",
    [Language.English]: `Surmon's writing archive`
  },
  description: {
    [Language.Chinese]: `书字字之方便，开众善之法门`,
    [Language.English]: "Either write something worth reading or do something worth writing"
  }
};
const useArchivePageMeta = () => {
  const { i18n, isZhLang } = useEnhancer();
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocaleKey.PAGE_ARCHIVE, Language.English));
    const titles = isZhLang.value ? [i18n.t(LocaleKey.PAGE_ARCHIVE), enTitle] : [enTitle];
    return {
      pageTitles: titles,
      description: `${APP_META.title} ${isZhLang.value ? "数据归档" : "archives"}`
    };
  });
};
const useArchivePageStatistics = () => {
  const { i18n } = useEnhancer();
  const store = useNodepressStatisticStore();
  const statistics = computed(() => ({
    tags: {
      icon: "icon-tag",
      label: i18n.t(LocaleKey.STATISTIC_TAGS),
      value: numberSplit(store.data?.tags || 0)
    },
    articles: {
      icon: "icon-quill",
      label: i18n.t(LocaleKey.STATISTIC_ARTICLES),
      value: numberSplit(store.data?.articles || 0)
    },
    comments: {
      icon: "icon-comment",
      label: i18n.t(LocaleKey.STATISTIC_COMMENTS),
      value: numberSplit(store.data?.comments || 0)
    },
    todayViews: {
      icon: "icon-eye",
      label: i18n.t(LocaleKey.STATISTIC_TODAY_VIEWS),
      value: numberSplit(store.data?.todayViews || 0)
    },
    totalViews: {
      icon: "icon-eye",
      label: i18n.t(LocaleKey.STATISTIC_TOTAL_VIEWS),
      value: numberToKilo(store.data?.totalViews || 0)
    },
    totalLikes: {
      icon: "icon-like",
      label: i18n.t(LocaleKey.STATISTIC_TOTAL_UPVOTES),
      value: numberSplit(store.data?.totalLikes || 0)
    },
    averageEmotion: {
      icon: "icon-emoji",
      label: i18n.t(LocaleKey.STATISTIC_AVERAGE_EMOTION),
      value: String(store.data?.averageEmotion ?? "-")
    }
  }));
  return {
    statistics,
    fetch: store.fetch
  };
};
const _sfc_main$1G = /* @__PURE__ */ defineComponent({
  __name: "banner",
  __ssrInlineRender: true,
  props: {
    image: {},
    imagePosition: { default: 20 },
    video: {},
    videoPosition: { default: 48 },
    blur: { default: 0 },
    cdn: { type: Boolean, default: false },
    isMobile: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { isDarkTheme, cdnDomain } = useEnhancer();
    const backgroundImage = computed(() => {
      return props.cdn && props.image ? getAssetURL(cdnDomain, props.image) : props.image;
    });
    const backgroundImageStyle = computed(() => {
      if (!backgroundImage.value) {
        return {};
      }
      return {
        backgroundImage: `url(${backgroundImage.value})`,
        backgroundPositionY: `${props.imagePosition}%`
      };
    });
    const videoSource = computed(() => {
      return props.cdn && props.video ? getAssetURL(cdnDomain, props.video) : props.video;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["banner", { mobile: _ctx.isMobile }]
      }, _attrs))} data-v-8024e433><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "background"])}" style="${ssrRenderStyle(backgroundImageStyle.value)}" data-v-8024e433>`);
      if (videoSource.value) {
        _push(`<video class="video" loop muted autoplay${ssrIncludeBooleanAttr(false) ? " controls" : ""} style="${ssrRenderStyle({ objectPosition: `0% ${props.videoPosition}%` })}"${ssrRenderAttr("src", videoSource.value)} data-v-8024e433></video>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([{ blur: Boolean(_ctx.blur) }, "content"])}" style="${ssrRenderStyle({ "--blur": `${_ctx.blur}px` })}" data-v-8024e433><h2 class="title" data-v-8024e433>`);
      ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      _push(`</h2><div class="description" data-v-8024e433>`);
      ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1G = _sfc_main$1G.setup;
_sfc_main$1G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/banner.vue");
  return _sfc_setup$1G ? _sfc_setup$1G(props, ctx) : void 0;
};
const PageBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1G, [["__scopeId", "data-v-8024e433"]]);
const _sfc_main$1F = /* @__PURE__ */ defineComponent({
  __name: "tree",
  __ssrInlineRender: true,
  props: {
    tree: {}
  },
  setup(__props) {
    const props = __props;
    const { isZhLang } = useEnhancer();
    const ms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthNameI18ns = ms.map((month, index) => ({
      [Language.English]: month,
      [Language.Chinese]: index === 9 ? "十月" : index == 10 ? "十一" : index == 11 ? "十二" : numberToChinese(index + 1) + "月"
    }));
    const getMonthNameI18n = (number) => {
      return monthNameI18ns[number - 1];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-tree" }, _attrs))} data-v-a1ee829e><!--[-->`);
      ssrRenderList(props.tree, (node) => {
        _push(`<ul class="month-list" data-v-a1ee829e><!--[-->`);
        ssrRenderList(node.months, (mn) => {
          _push(`<li class="month" data-v-a1ee829e>`);
          ssrRenderSlot(_ctx.$slots, "title", {
            title: !unref(isZhLang) ? `${node.year} #${getMonthNameI18n(mn.month).en} (${mn.articles.length})` : `${unref(numberToChinese)(node.year)} #${getMonthNameI18n(mn.month).zh}（${mn.articles.length}）`
          }, null, _push, _parent);
          _push(`<ul class="article-list" data-v-a1ee829e><!--[-->`);
          ssrRenderList(mn.articles, (article, index) => {
            _push(`<li class="article" data-v-a1ee829e>`);
            ssrRenderSlot(_ctx.$slots, "article", {
              index,
              article,
              day: String(article.createAt.day).padStart(2, "0")
            }, null, _push, _parent);
            _push(`</li>`);
          });
          _push(`<!--]--></ul></li>`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1F = _sfc_main$1F.setup;
_sfc_main$1F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/tree.vue");
  return _sfc_setup$1F ? _sfc_setup$1F(props, ctx) : void 0;
};
const ArchiveTree = /* @__PURE__ */ _export_sfc(_sfc_main$1F, [["__scopeId", "data-v-a1ee829e"]]);
const _sfc_main$1E = /* @__PURE__ */ defineComponent({
  __name: "desktop",
  __ssrInlineRender: true,
  setup(__props) {
    const archiveStore = useArchiveStore();
    const statisticState = useArchivePageStatistics();
    const statisticFetching = ref(true);
    const statistics = computed(() => [
      statisticState.statistics.value.articles,
      statisticState.statistics.value.todayViews,
      statisticState.statistics.value.comments,
      statisticState.statistics.value.totalLikes,
      statisticState.statistics.value.averageEmotion
    ]);
    useArchivePageMeta();
    useUniversalFetch(() => archiveStore.fetch());
    onMounted(() => {
      statisticState.fetch().finally(() => {
        statisticFetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_container = resolveComponent("container");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-page" }, _attrs))} data-v-db67cca5>`);
      _push(ssrRenderComponent(PageBanner, {
        image: "/images/page-archive/banner.webp",
        "image-position": 34,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, unref(i18ns$1).title, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, unref(i18ns$1).title, null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, unref(i18ns$1).title, null, 16)
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns$1).description, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, unref(i18ns$1).description, null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_container, { class: "statistic-wrapper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            if (statisticFetching.value) {
              _push2(`<div class="skeletons" data-v-db67cca5${_scopeId}><!--[-->`);
              ssrRenderList(statistics.value.length, (s) => {
                _push2(ssrRenderComponent(_component_skeleton_base, {
                  class: "item",
                  key: s
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="statistics" data-v-db67cca5${_scopeId}><!--[-->`);
              ssrRenderList(statistics.value, (s, index) => {
                _push2(`<div class="item" data-v-db67cca5${_scopeId}><i class="${ssrRenderClass([s.icon, "iconfont"])}" data-v-db67cca5${_scopeId}></i><div class="content" data-v-db67cca5${_scopeId}><p class="label" data-v-db67cca5${_scopeId}>${ssrInterpolate(s.label)}</p><div class="value" data-v-db67cca5${_scopeId}>${ssrInterpolate(s.value)}</div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              createVNode(Transition, {
                name: "module",
                mode: "out-in"
              }, {
                default: withCtx(() => [
                  statisticFetching.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "skeletons"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(statistics.value.length, (s) => {
                      return openBlock(), createBlock(_component_skeleton_base, {
                        class: "item",
                        key: s
                      });
                    }), 128))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "statistics"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(statistics.value, (s, index) => {
                      return openBlock(), createBlock("div", {
                        class: "item",
                        key: index
                      }, [
                        createVNode("i", {
                          class: ["iconfont", s.icon]
                        }, null, 2),
                        createVNode("div", { class: "content" }, [
                          createVNode("p", { class: "label" }, toDisplayString(s.label), 1),
                          createVNode("div", { class: "value" }, toDisplayString(s.value), 1)
                        ])
                      ]);
                    }), 128))
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_container, { class: "archive-wrapper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, {
              data: unref(archiveStore).data?.articles.length,
              loading: unref(archiveStore).fetching
            }, {
              placeholder: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_empty, {
                    class: "archive-empty",
                    bold: "",
                    key: "empty"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_i18n, {
                          k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                          }, null, 8, ["k"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_empty, {
                      class: "archive-empty",
                      bold: "",
                      key: "empty"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul class="archive-skeleton" data-v-db67cca5${_scopeId2}><!--[-->`);
                  ssrRenderList(9, (item) => {
                    _push3(`<li class="item" data-v-db67cca5${_scopeId2}><!--[-->`);
                    ssrRenderList(3, (i) => {
                      _push3(ssrRenderComponent(_component_skeleton_line, {
                        key: i,
                        class: "line"
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></li>`);
                  });
                  _push3(`<!--]--></ul>`);
                } else {
                  return [
                    createVNode("ul", {
                      class: "archive-skeleton",
                      key: "skeleton"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(9, (item) => {
                        return createVNode("li", {
                          key: item,
                          class: "item"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                            return createVNode(_component_skeleton_line, {
                              key: i,
                              class: "line"
                            });
                          }), 64))
                        ]);
                      }), 64))
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ArchiveTree, {
                    class: "archive-content",
                    tree: unref(archiveStore).tree,
                    key: "content"
                  }, {
                    title: withCtx(({ title }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h1 class="archive-title" data-v-db67cca5${_scopeId3}>${ssrInterpolate(title)}</h1>`);
                      } else {
                        return [
                          createVNode("h1", { class: "archive-title" }, toDisplayString(title), 1)
                        ];
                      }
                    }),
                    article: withCtx(({ article, day }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="archive-article" data-v-db67cca5${_scopeId3}><div class="left" data-v-db67cca5${_scopeId3}><h3 class="title" data-v-db67cca5${_scopeId3}><span class="date" data-v-db67cca5${_scopeId3}>D${ssrInterpolate(day)}</span><a class="link" target="_blank"${ssrRenderAttr("title", article.title)}${ssrRenderAttr("href", unref(getArticleDetailRoute)(article.id))} data-v-db67cca5${_scopeId3}>${ssrInterpolate(article.title)}</a></h3><p class="description" data-v-db67cca5${_scopeId3}>${article.description ?? ""}</p></div><div class="metas" data-v-db67cca5${_scopeId3}><div class="item views" data-v-db67cca5${_scopeId3}><i class="iconfont icon-eye" data-v-db67cca5${_scopeId3}></i><span class="text" data-v-db67cca5${_scopeId3}>${ssrInterpolate(unref(numberSplit)(article.meta.views))}</span></div>`);
                        _push4(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent4, _scopeId3));
                        _push4(`<div class="item likes" data-v-db67cca5${_scopeId3}><i class="like-icon iconfont icon-like" data-v-db67cca5${_scopeId3}></i><span class="text" data-v-db67cca5${_scopeId3}>${ssrInterpolate(article.meta.likes)}</span></div>`);
                        _push4(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent4, _scopeId3));
                        _push4(`<div class="item comments" data-v-db67cca5${_scopeId3}><i class="iconfont icon-comment" data-v-db67cca5${_scopeId3}></i><span class="text" data-v-db67cca5${_scopeId3}>${ssrInterpolate(article.meta.comments)}</span></div></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "archive-article" }, [
                            createVNode("div", { class: "left" }, [
                              createVNode("h3", { class: "title" }, [
                                createVNode("span", { class: "date" }, "D" + toDisplayString(day), 1),
                                createVNode("a", {
                                  class: "link",
                                  target: "_blank",
                                  title: article.title,
                                  href: unref(getArticleDetailRoute)(article.id)
                                }, toDisplayString(article.title), 9, ["title", "href"])
                              ]),
                              createVNode("p", {
                                class: "description",
                                innerHTML: article.description
                              }, null, 8, ["innerHTML"])
                            ]),
                            createVNode("div", { class: "metas" }, [
                              createVNode("div", { class: "item views" }, [
                                createVNode("i", { class: "iconfont icon-eye" }),
                                createVNode("span", { class: "text" }, toDisplayString(unref(numberSplit)(article.meta.views)), 1)
                              ]),
                              createVNode(_component_divider, { type: "vertical" }),
                              createVNode("div", { class: "item likes" }, [
                                createVNode("i", { class: "like-icon iconfont icon-like" }),
                                createVNode("span", { class: "text" }, toDisplayString(article.meta.likes), 1)
                              ]),
                              createVNode(_component_divider, { type: "vertical" }),
                              createVNode("div", { class: "item comments" }, [
                                createVNode("i", { class: "iconfont icon-comment" }),
                                createVNode("span", { class: "text" }, toDisplayString(article.meta.comments), 1)
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(ArchiveTree, {
                      class: "archive-content",
                      tree: unref(archiveStore).tree,
                      key: "content"
                    }, {
                      title: withCtx(({ title }) => [
                        createVNode("h1", { class: "archive-title" }, toDisplayString(title), 1)
                      ]),
                      article: withCtx(({ article, day }) => [
                        createVNode("div", { class: "archive-article" }, [
                          createVNode("div", { class: "left" }, [
                            createVNode("h3", { class: "title" }, [
                              createVNode("span", { class: "date" }, "D" + toDisplayString(day), 1),
                              createVNode("a", {
                                class: "link",
                                target: "_blank",
                                title: article.title,
                                href: unref(getArticleDetailRoute)(article.id)
                              }, toDisplayString(article.title), 9, ["title", "href"])
                            ]),
                            createVNode("p", {
                              class: "description",
                              innerHTML: article.description
                            }, null, 8, ["innerHTML"])
                          ]),
                          createVNode("div", { class: "metas" }, [
                            createVNode("div", { class: "item views" }, [
                              createVNode("i", { class: "iconfont icon-eye" }),
                              createVNode("span", { class: "text" }, toDisplayString(unref(numberSplit)(article.meta.views)), 1)
                            ]),
                            createVNode(_component_divider, { type: "vertical" }),
                            createVNode("div", { class: "item likes" }, [
                              createVNode("i", { class: "like-icon iconfont icon-like" }),
                              createVNode("span", { class: "text" }, toDisplayString(article.meta.likes), 1)
                            ]),
                            createVNode(_component_divider, { type: "vertical" }),
                            createVNode("div", { class: "item comments" }, [
                              createVNode("i", { class: "iconfont icon-comment" }),
                              createVNode("span", { class: "text" }, toDisplayString(article.meta.comments), 1)
                            ])
                          ])
                        ])
                      ]),
                      _: 1
                    }, 8, ["tree"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_placeholder, {
                data: unref(archiveStore).data?.articles.length,
                loading: unref(archiveStore).fetching
              }, {
                placeholder: withCtx(() => [
                  createVNode(_component_empty, {
                    class: "archive-empty",
                    bold: "",
                    key: "empty"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ]),
                loading: withCtx(() => [
                  createVNode("ul", {
                    class: "archive-skeleton",
                    key: "skeleton"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(9, (item) => {
                      return createVNode("li", {
                        key: item,
                        class: "item"
                      }, [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                          return createVNode(_component_skeleton_line, {
                            key: i,
                            class: "line"
                          });
                        }), 64))
                      ]);
                    }), 64))
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(ArchiveTree, {
                    class: "archive-content",
                    tree: unref(archiveStore).tree,
                    key: "content"
                  }, {
                    title: withCtx(({ title }) => [
                      createVNode("h1", { class: "archive-title" }, toDisplayString(title), 1)
                    ]),
                    article: withCtx(({ article, day }) => [
                      createVNode("div", { class: "archive-article" }, [
                        createVNode("div", { class: "left" }, [
                          createVNode("h3", { class: "title" }, [
                            createVNode("span", { class: "date" }, "D" + toDisplayString(day), 1),
                            createVNode("a", {
                              class: "link",
                              target: "_blank",
                              title: article.title,
                              href: unref(getArticleDetailRoute)(article.id)
                            }, toDisplayString(article.title), 9, ["title", "href"])
                          ]),
                          createVNode("p", {
                            class: "description",
                            innerHTML: article.description
                          }, null, 8, ["innerHTML"])
                        ]),
                        createVNode("div", { class: "metas" }, [
                          createVNode("div", { class: "item views" }, [
                            createVNode("i", { class: "iconfont icon-eye" }),
                            createVNode("span", { class: "text" }, toDisplayString(unref(numberSplit)(article.meta.views)), 1)
                          ]),
                          createVNode(_component_divider, { type: "vertical" }),
                          createVNode("div", { class: "item likes" }, [
                            createVNode("i", { class: "like-icon iconfont icon-like" }),
                            createVNode("span", { class: "text" }, toDisplayString(article.meta.likes), 1)
                          ]),
                          createVNode(_component_divider, { type: "vertical" }),
                          createVNode("div", { class: "item comments" }, [
                            createVNode("i", { class: "iconfont icon-comment" }),
                            createVNode("span", { class: "text" }, toDisplayString(article.meta.comments), 1)
                          ])
                        ])
                      ])
                    ]),
                    _: 1
                  }, 8, ["tree"])
                ]),
                _: 1
              }, 8, ["data", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1E = _sfc_main$1E.setup;
_sfc_main$1E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/desktop.vue");
  return _sfc_setup$1E ? _sfc_setup$1E(props, ctx) : void 0;
};
const DesktopArchivePage = /* @__PURE__ */ _export_sfc(_sfc_main$1E, [["__scopeId", "data-v-db67cca5"]]);
const _sfc_main$1D = /* @__PURE__ */ defineComponent({
  __name: "mobile",
  __ssrInlineRender: true,
  setup(__props) {
    const archiveStore = useArchiveStore();
    const statisticState = useArchivePageStatistics();
    const statisticFetching = ref(true);
    useArchivePageMeta();
    useUniversalFetch(() => archiveStore.fetch());
    onMounted(() => {
      statisticState.fetch().finally(() => {
        statisticFetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_container = resolveComponent("container");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_divider = resolveComponent("divider");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-page" }, _attrs))} data-v-c0c8e8c9>`);
      _push(ssrRenderComponent(PageBanner, {
        "is-mobile": true,
        image: "/images/page-archive/banner-mobile.webp",
        "image-position": 80,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).PAGE_ARCHIVE
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocaleKey).PAGE_ARCHIVE
              }, null, 8, ["k"])
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns$1).title, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, unref(i18ns$1).title, null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="page-content" data-v-c0c8e8c9>`);
      _push(ssrRenderComponent(_component_container, { class: "statistic-wrapper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, { loading: statisticFetching.value }, {
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="skeletons" data-v-c0c8e8c9${_scopeId2}><!--[-->`);
                  ssrRenderList(3, (s) => {
                    _push3(ssrRenderComponent(_component_skeleton_base, {
                      class: "skeleton",
                      key: s
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "skeletons",
                      key: "skeletons"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (s) => {
                        return createVNode(_component_skeleton_base, {
                          class: "skeleton",
                          key: s
                        });
                      }), 64))
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="statistics" data-v-c0c8e8c9${_scopeId2}><div class="item" data-v-c0c8e8c9${_scopeId2}><p class="label" data-v-c0c8e8c9${_scopeId2}>${ssrInterpolate(unref(statisticState).statistics.value.articles.label)}</p><div class="value" data-v-c0c8e8c9${_scopeId2}>${ssrInterpolate(unref(statisticState).statistics.value.articles.value)}</div></div>`);
                  _push3(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent3, _scopeId2));
                  _push3(`<div class="item" data-v-c0c8e8c9${_scopeId2}><p class="label" data-v-c0c8e8c9${_scopeId2}>${ssrInterpolate(unref(statisticState).statistics.value.todayViews.label)}</p><div class="value" data-v-c0c8e8c9${_scopeId2}>${ssrInterpolate(unref(statisticState).statistics.value.todayViews.value)}</div></div>`);
                  _push3(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent3, _scopeId2));
                  _push3(`<div class="item" data-v-c0c8e8c9${_scopeId2}><p class="label" data-v-c0c8e8c9${_scopeId2}>${ssrInterpolate(unref(statisticState).statistics.value.comments.label)}</p><div class="value" data-v-c0c8e8c9${_scopeId2}>${ssrInterpolate(unref(statisticState).statistics.value.comments.value)}</div></div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "statistics",
                      key: "statistics"
                    }, [
                      createVNode("div", { class: "item" }, [
                        createVNode("p", { class: "label" }, toDisplayString(unref(statisticState).statistics.value.articles.label), 1),
                        createVNode("div", { class: "value" }, toDisplayString(unref(statisticState).statistics.value.articles.value), 1)
                      ]),
                      createVNode(_component_divider, { type: "vertical" }),
                      createVNode("div", { class: "item" }, [
                        createVNode("p", { class: "label" }, toDisplayString(unref(statisticState).statistics.value.todayViews.label), 1),
                        createVNode("div", { class: "value" }, toDisplayString(unref(statisticState).statistics.value.todayViews.value), 1)
                      ]),
                      createVNode(_component_divider, { type: "vertical" }),
                      createVNode("div", { class: "item" }, [
                        createVNode("p", { class: "label" }, toDisplayString(unref(statisticState).statistics.value.comments.label), 1),
                        createVNode("div", { class: "value" }, toDisplayString(unref(statisticState).statistics.value.comments.value), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_placeholder, { loading: statisticFetching.value }, {
                loading: withCtx(() => [
                  createVNode("div", {
                    class: "skeletons",
                    key: "skeletons"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(3, (s) => {
                      return createVNode(_component_skeleton_base, {
                        class: "skeleton",
                        key: s
                      });
                    }), 64))
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", {
                    class: "statistics",
                    key: "statistics"
                  }, [
                    createVNode("div", { class: "item" }, [
                      createVNode("p", { class: "label" }, toDisplayString(unref(statisticState).statistics.value.articles.label), 1),
                      createVNode("div", { class: "value" }, toDisplayString(unref(statisticState).statistics.value.articles.value), 1)
                    ]),
                    createVNode(_component_divider, { type: "vertical" }),
                    createVNode("div", { class: "item" }, [
                      createVNode("p", { class: "label" }, toDisplayString(unref(statisticState).statistics.value.todayViews.label), 1),
                      createVNode("div", { class: "value" }, toDisplayString(unref(statisticState).statistics.value.todayViews.value), 1)
                    ]),
                    createVNode(_component_divider, { type: "vertical" }),
                    createVNode("div", { class: "item" }, [
                      createVNode("p", { class: "label" }, toDisplayString(unref(statisticState).statistics.value.comments.label), 1),
                      createVNode("div", { class: "value" }, toDisplayString(unref(statisticState).statistics.value.comments.value), 1)
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_container, { class: "archive-wrapper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, {
              data: unref(archiveStore).data?.articles.length,
              loading: unref(archiveStore).fetching
            }, {
              placeholder: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_empty, {
                    class: "archive-empty",
                    key: "empty"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_i18n, {
                          k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                          }, null, 8, ["k"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_empty, {
                      class: "archive-empty",
                      key: "empty"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul class="archive-skeleton" data-v-c0c8e8c9${_scopeId2}><!--[-->`);
                  ssrRenderList(3, (item) => {
                    _push3(`<li class="item" data-v-c0c8e8c9${_scopeId2}><!--[-->`);
                    ssrRenderList(2, (i) => {
                      _push3(ssrRenderComponent(_component_skeleton_line, {
                        key: i,
                        class: "line"
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></li>`);
                  });
                  _push3(`<!--]--></ul>`);
                } else {
                  return [
                    createVNode("ul", {
                      class: "archive-skeleton",
                      key: "skeleton"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3, (item) => {
                        return createVNode("li", {
                          key: item,
                          class: "item"
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                            return createVNode(_component_skeleton_line, {
                              key: i,
                              class: "line"
                            });
                          }), 64))
                        ]);
                      }), 64))
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ArchiveTree, {
                    class: "archive-content",
                    tree: unref(archiveStore).tree,
                    key: "content"
                  }, {
                    title: withCtx(({ title }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<h3 class="archive-title" data-v-c0c8e8c9${_scopeId3}>${ssrInterpolate(title)}</h3>`);
                      } else {
                        return [
                          createVNode("h3", { class: "archive-title" }, toDisplayString(title), 1)
                        ];
                      }
                    }),
                    article: withCtx(({ article, day }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="archive-article" data-v-c0c8e8c9${_scopeId3}><h4 class="title" data-v-c0c8e8c9${_scopeId3}><span class="date" data-v-c0c8e8c9${_scopeId3}>D${ssrInterpolate(day)}</span><a class="link" target="_blank"${ssrRenderAttr("title", article.title)}${ssrRenderAttr("href", unref(getArticleDetailRoute)(article.id))} data-v-c0c8e8c9${_scopeId3}>${ssrInterpolate(article.title)}</a></h4><p class="description" data-v-c0c8e8c9${_scopeId3}>${article.description ?? ""}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "archive-article" }, [
                            createVNode("h4", { class: "title" }, [
                              createVNode("span", { class: "date" }, "D" + toDisplayString(day), 1),
                              createVNode("a", {
                                class: "link",
                                target: "_blank",
                                title: article.title,
                                href: unref(getArticleDetailRoute)(article.id)
                              }, toDisplayString(article.title), 9, ["title", "href"])
                            ]),
                            createVNode("p", {
                              class: "description",
                              innerHTML: article.description
                            }, null, 8, ["innerHTML"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(ArchiveTree, {
                      class: "archive-content",
                      tree: unref(archiveStore).tree,
                      key: "content"
                    }, {
                      title: withCtx(({ title }) => [
                        createVNode("h3", { class: "archive-title" }, toDisplayString(title), 1)
                      ]),
                      article: withCtx(({ article, day }) => [
                        createVNode("div", { class: "archive-article" }, [
                          createVNode("h4", { class: "title" }, [
                            createVNode("span", { class: "date" }, "D" + toDisplayString(day), 1),
                            createVNode("a", {
                              class: "link",
                              target: "_blank",
                              title: article.title,
                              href: unref(getArticleDetailRoute)(article.id)
                            }, toDisplayString(article.title), 9, ["title", "href"])
                          ]),
                          createVNode("p", {
                            class: "description",
                            innerHTML: article.description
                          }, null, 8, ["innerHTML"])
                        ])
                      ]),
                      _: 1
                    }, 8, ["tree"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_placeholder, {
                data: unref(archiveStore).data?.articles.length,
                loading: unref(archiveStore).fetching
              }, {
                placeholder: withCtx(() => [
                  createVNode(_component_empty, {
                    class: "archive-empty",
                    key: "empty"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocaleKey).ARTICLE_PLACEHOLDER
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ]),
                loading: withCtx(() => [
                  createVNode("ul", {
                    class: "archive-skeleton",
                    key: "skeleton"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(3, (item) => {
                      return createVNode("li", {
                        key: item,
                        class: "item"
                      }, [
                        (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                          return createVNode(_component_skeleton_line, {
                            key: i,
                            class: "line"
                          });
                        }), 64))
                      ]);
                    }), 64))
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(ArchiveTree, {
                    class: "archive-content",
                    tree: unref(archiveStore).tree,
                    key: "content"
                  }, {
                    title: withCtx(({ title }) => [
                      createVNode("h3", { class: "archive-title" }, toDisplayString(title), 1)
                    ]),
                    article: withCtx(({ article, day }) => [
                      createVNode("div", { class: "archive-article" }, [
                        createVNode("h4", { class: "title" }, [
                          createVNode("span", { class: "date" }, "D" + toDisplayString(day), 1),
                          createVNode("a", {
                            class: "link",
                            target: "_blank",
                            title: article.title,
                            href: unref(getArticleDetailRoute)(article.id)
                          }, toDisplayString(article.title), 9, ["title", "href"])
                        ]),
                        createVNode("p", {
                          class: "description",
                          innerHTML: article.description
                        }, null, 8, ["innerHTML"])
                      ])
                    ]),
                    _: 1
                  }, 8, ["tree"])
                ]),
                _: 1
              }, 8, ["data", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1D = _sfc_main$1D.setup;
_sfc_main$1D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/mobile.vue");
  return _sfc_setup$1D ? _sfc_setup$1D(props, ctx) : void 0;
};
const MobileArchivePage = /* @__PURE__ */ _export_sfc(_sfc_main$1D, [["__scopeId", "data-v-c0c8e8c9"]]);
const stringify = (object, sep = "&", eq = "=") => {
  let result = "";
  for (const k in object) {
    if (object.hasOwnProperty(k)) {
      const value = object[k];
      if (value === null || value === void 0) continue;
      const encodedKey = encodeURIComponent(k);
      const encodedValue = encodeURIComponent(value);
      result += encodedKey + eq + encodedValue + sep;
    }
  }
  return result.slice(0, -1);
};
const renderTextToQRCodeDataURL = (value, options) => {
  return QRCode.toDataURL(value, {
    errorCorrectionLevel: "H",
    type: "image/png",
    width: 260,
    ...options
  });
};
const baseParams = {
  scrollbars: 0,
  status: 0,
  menubar: 0,
  resizable: 2,
  location: 0
};
const paramsToString = (params = {}) => {
  return Object.keys(params).map((k) => `${k}=${params[k]}`).join(",");
};
const openPopupWindow = (targetURL, options = {}) => {
  const { name = "", closeInterval = 268, onClose, params = {} } = options;
  const width = Math.round(screen.availWidth / 6 * 2);
  const height = Math.round(screen.availHeight / 5 * 2);
  const top = Math.round((screen.availHeight - height) / 2);
  const left = Math.round((screen.availWidth - width) / 2);
  const formParams = { width, height, top, left };
  const windowParams = paramsToString({
    ...baseParams,
    ...formParams,
    ...params
  });
  const _window = window.open(targetURL, name, windowParams);
  if (_window) {
    if (onClose) {
      const timer = setInterval(() => {
        if (_window.closed) {
          clearInterval(timer);
          onClose();
        }
      }, closeInterval);
    }
    _window?.focus();
    return _window;
  }
};
const openNewWindow = (targetURL, target) => {
  return window.open(targetURL, target);
};
var SocialMedia = /* @__PURE__ */ ((SocialMedia2) => {
  SocialMedia2["Wechat"] = "wechat";
  SocialMedia2["Twitter"] = "twitter";
  SocialMedia2["Threads"] = "threads";
  SocialMedia2["Weibo"] = "weibo";
  SocialMedia2["douban"] = "douban";
  SocialMedia2["Facebook"] = "facebook";
  SocialMedia2["LinkedIn"] = "linkedin";
  return SocialMedia2;
})(SocialMedia || {});
const _sfc_main$1C = /* @__PURE__ */ defineComponent({
  __name: "share",
  __ssrInlineRender: true,
  props: {
    socials: {},
    disabledCopyLink: { type: Boolean },
    disabledImageShare: { type: Boolean }
  },
  emits: ["shareAsImage"],
  setup(__props, { emit: __emit }) {
    const defaultSocials = [
      {
        id: "wechat",
        name: "微信",
        class: "wechat",
        handler: (params) => {
          renderTextToQRCodeDataURL(params.url).then((dataURL) => {
            window.$popup.vImage(dataURL);
          });
        }
      },
      {
        id: "weibo",
        name: "微博",
        class: "weibo",
        url: (params) => {
          return `https://service.weibo.com/share/share.php?` + stringify({
            url: params.url,
            source: params.url,
            sourceUrl: params.url,
            title: params.ogTitle,
            content: params.description
          });
        }
      },
      {
        id: "twitter",
        name: "Twitter",
        class: "twitter",
        iconfont: "twitter-x",
        url: (params) => {
          return `https://twitter.com/intent/tweet?` + stringify({
            url: params.url,
            text: params.ogTitle
          });
        }
      },
      {
        id: "threads",
        name: "Threads",
        class: "threads",
        url: (params) => {
          return `https://www.threads.net/intent/post?` + stringify({
            url: params.url,
            text: params.ogTitle
          });
        }
      },
      {
        id: "facebook",
        name: "Facebook",
        class: "facebook",
        url: (params) => {
          return `https://www.facebook.com/share.php?` + stringify({
            t: params.ogTitle,
            u: encodeURI(params.url)
          });
        }
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        class: "linkedin",
        url: (params) => {
          return `https://www.linkedin.com/shareArticle?` + stringify({
            title: params.ogTitle,
            url: params.url
          });
        }
      },
      {
        id: "douban",
        name: "豆瓣",
        class: "douban",
        url: (params) => {
          return (
            // https://www.douban.com/service/sharebutton
            `https://www.douban.com/recommend/?` + stringify({
              url: params.url,
              title: params.title
            })
          );
        }
      }
    ];
    const props = __props;
    useEnhancer();
    const enabledSocials = computed(() => {
      return props.socials?.length ? defaultSocials.filter((s) => props.socials?.includes(s.id)) : defaultSocials;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "share" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-1bbd4e95><!--[-->`);
      ssrRenderList(enabledSocials.value, (social, index) => {
        _push(`<button${ssrRenderAttr("title", "Share to: " + social.name)} class="${ssrRenderClass([social.class, "share-ejector"])}" data-v-1bbd4e95><i class="${ssrRenderClass([`icon-${social.iconfont ?? social.class}`, "iconfont"])}" data-v-1bbd4e95></i></button>`);
      });
      _push(`<!--]-->`);
      if (!props.disabledImageShare) {
        _push(`<button class="share-ejector share-as-image" title="Share as image" data-v-1bbd4e95><i class="iconfont icon-image-share" data-v-1bbd4e95></i></button>`);
      } else {
        _push(`<!---->`);
      }
      if (!props.disabledCopyLink) {
        _push(`<button class="share-ejector copy-link" title="Copy link" data-v-1bbd4e95><i class="iconfont icon-link" data-v-1bbd4e95></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1C = _sfc_main$1C.setup;
_sfc_main$1C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/share.vue");
  return _sfc_setup$1C ? _sfc_setup$1C(props, ctx) : void 0;
};
const Share = /* @__PURE__ */ _export_sfc(_sfc_main$1C, [["__scopeId", "data-v-1bbd4e95"]]);
const getChatGPTShareURL = (conversationId) => {
  return `https://chat.openai.com/share/${conversationId}`;
};
const logger = createLogger("APP:Comment");
const EMOJIS = [
  ...["😃", "😂", "😅", "😉", "😌", "😔", "😓", "😢", "😍", "😘", "😜", "😡"],
  ...["😤", "😭", "😱", "😳", "😵", "🌚"],
  ...["🙏", "💪", "👌", "🤘", "👍", "👎", "👏"],
  ...["🌻", "🌹", "💊", "🐶", "🐈", "✨", "❤️‍🔥", "💔", "💩", "👻", "🚩"]
];
var CommentEvents = /* @__PURE__ */ ((CommentEvents2) => {
  CommentEvents2["Sort"] = "sort";
  CommentEvents2["Page"] = "page";
  CommentEvents2["Vote"] = "vote";
  CommentEvents2["Blossom"] = "blossom";
  CommentEvents2["Delete"] = "delete";
  CommentEvents2["Reply"] = "reply";
  CommentEvents2["CancelReply"] = "cancelReply";
  CommentEvents2["Submit"] = "submit";
  return CommentEvents2;
})(CommentEvents || {});
const getDisqusUserURL = (username) => {
  return `https://disqus.com/by/${username}/`;
};
const MIN_COMMENT_LENGTH = 3;
const MAX_COMMENT_LENGTH = 3e3;
const HAHA_KEYWORDS = ["2333", "haha", "哈哈"];
const SIX_KEYWORDS = ["666", "赞", "棒", "优秀"];
const HEHE_KEYWORDS = ["呵呵"];
const luanchEmojiRain = (content) => {
  const luanchRain = window.$luanchEmojiRain;
  if (HAHA_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getAssetURL(useCdnDomain(), "/images/emojis/haha.png")
    });
  } else if (SIX_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getAssetURL(useCdnDomain(), "/images/emojis/666.png")
    });
  } else if (HEHE_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      staggered: false,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getAssetURL(useCdnDomain(), "/images/emojis/hehe.png")
    });
  } else if (Math.random() <= 0.5) {
    luanchRain({
      scale: 0.6,
      staggered: true,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getAssetURL(useCdnDomain(), "/images/emojis/doge.png")
    });
  }
};
const _sfc_main$1B = /* @__PURE__ */ defineComponent({
  __name: "topbar",
  __ssrInlineRender: true,
  props: {
    postId: {},
    sort: {},
    fetching: { type: Boolean },
    loading: { type: Boolean },
    loaded: { default: 0 },
    total: { default: 0 },
    plain: { type: Boolean, default: false }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useEnhancer();
    const identity = useIdentityStore();
    const user = computed(() => identity.user);
    const statisticsText = computed(() => {
      return props.loading ? `···` : `${props.loaded} / ${props.total}`;
    });
    const disqusThreadMap = /* @__PURE__ */ new Map();
    const handleDisqusThread = async () => {
      if (!disqusThreadMap.has(props.postId)) {
        const response = await nodepress$1.get("/disqus/thread", {
          params: { post_id: props.postId }
        });
        disqusThreadMap.set(props.postId, response.result);
      }
      const forum = identity.disqusConfig.forum;
      const slug = disqusThreadMap.get(props.postId).slug;
      openNewWindow(`https://disqus.com/home/discussion/${forum}/${slug}/`);
    };
    const handleSort = (target) => {
      const value = Number(target?.value);
      if (value !== props.sort) {
        emit(CommentEvents.Sort, value);
      }
    };
    const handleDisqusLogin = () => {
      openPopupWindow(identity.disqusConfig.authorize_url, {
        name: `Disqus Auth ${APP_META.title}`,
        onClose: () => {
          identity.fetchDisqusUserInfo();
          logger.info("disqus logined", toRaw(identity.user));
        }
      });
    };
    const handleDisqusLogout = () => {
      identity.fetchDisqusLogout();
      logger.log("disqus logout");
    };
    const handleClearLocalProfile = () => {
      identity.removeLocalUser();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      const _component_ulink = resolveComponent("ulink");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({ loading: _ctx.fetching }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="topbar-skeleton" data-v-556e50dd${_scopeId}><div class="left" data-v-556e50dd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, { class: "skeleton-item count" }, null, _parent2, _scopeId));
            if (!_ctx.plain) {
              _push2(ssrRenderComponent(_component_skeleton_line, { class: "skeleton-item sort" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="right" data-v-556e50dd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, { class: "skeleton-item user" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "topbar-skeleton",
                key: "skeleton"
              }, [
                createVNode("div", { class: "left" }, [
                  createVNode(_component_skeleton_line, { class: "skeleton-item count" }),
                  !_ctx.plain ? (openBlock(), createBlock(_component_skeleton_line, {
                    key: 0,
                    class: "skeleton-item sort"
                  })) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "right" }, [
                  createVNode(_component_skeleton_line, { class: "skeleton-item user" })
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{ plain: _ctx.plain }, "topbar"])}" data-v-556e50dd${_scopeId}><div class="statistics" data-v-556e50dd${_scopeId}><div class="${ssrRenderClass([{ loading: _ctx.loading }, "total"])}" data-v-556e50dd${_scopeId}><i class="iconfont icon-discussion" data-v-556e50dd${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 共 <span class="count" data-v-556e50dd${_scopeId2}>${ssrInterpolate(statisticsText.value)}</span> 条看法 `);
                } else {
                  return [
                    createTextVNode(" 共 "),
                    createVNode("span", { class: "count" }, toDisplayString(statisticsText.value), 1),
                    createTextVNode(" 条看法 ")
                  ];
                }
              }),
              en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="count" data-v-556e50dd${_scopeId2}>${ssrInterpolate(statisticsText.value)}</span> comments `);
                } else {
                  return [
                    createVNode("span", { class: "count" }, toDisplayString(statisticsText.value), 1),
                    createTextVNode(" comments ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><label class="sort" data-v-556e50dd${_scopeId}><span class="icon" data-v-556e50dd${_scopeId}>▼</span><select class="select" name="sort"${ssrRenderAttr("value", _ctx.sort)} data-v-556e50dd${_scopeId}><option${ssrRenderAttr("value", unref(SortType).Desc)} data-v-556e50dd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).COMMENT_SORT_NEW
            }, null, _parent2, _scopeId));
            _push2(`</option><option${ssrRenderAttr("value", unref(SortType).Hottest)} data-v-556e50dd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).COMMENT_SORT_HOT
            }, null, _parent2, _scopeId));
            _push2(`</option><option${ssrRenderAttr("value", unref(SortType).Asc)} data-v-556e50dd${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).COMMENT_SORT_OLD
            }, null, _parent2, _scopeId));
            _push2(`</option></select></label><button class="disqus" data-v-556e50dd${_scopeId}><i class="iconfont icon-disqus-logo" data-v-556e50dd${_scopeId}></i></button>`);
            ssrRenderSlot(_ctx.$slots, "extra", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div class="user" data-v-556e50dd${_scopeId}>`);
            if (user.value.type === unref(UserType).Null) {
              _push2(`<div class="unlogin" data-v-556e50dd${_scopeId}><span class="guest" data-v-556e50dd${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                zh: "访客身份",
                en: "Guest"
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
              _push2(ssrRenderComponent(_component_divider, {
                type: "vertical",
                size: "sm"
              }, null, _parent2, _scopeId));
              _push2(`<button class="disqus" data-v-556e50dd${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, null, {
                zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`使用<i class="iconfont icon-disqus" data-v-556e50dd${_scopeId2}></i>登录`);
                  } else {
                    return [
                      createTextVNode("使用"),
                      createVNode("i", { class: "iconfont icon-disqus" }),
                      createTextVNode("登录")
                    ];
                  }
                }),
                en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Login by<i class="iconfont icon-disqus right" data-v-556e50dd${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode("Login by"),
                      createVNode("i", { class: "iconfont icon-disqus right" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</button></div>`);
            } else {
              _push2(`<div class="logined" data-v-556e50dd${_scopeId}>`);
              if (user.value.type === unref(UserType).Local) {
                _push2(`<!--[--><div class="name" data-v-556e50dd${_scopeId}><i class="icon guest iconfont icon-user" data-v-556e50dd${_scopeId}></i><span class="text" data-v-556e50dd${_scopeId}>${ssrInterpolate(user.value.localProfile?.name || "")}</span><i class="arrow iconfont icon-down-arrow" data-v-556e50dd${_scopeId}></i></div><div class="user-menu" data-v-556e50dd${_scopeId}><ul class="menus" data-v-556e50dd${_scopeId}><li class="item" data-v-556e50dd${_scopeId}><button class="button" data-v-556e50dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_i18n, null, {
                  zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`换为<i class="iconfont icon-disqus disqus" data-v-556e50dd${_scopeId2}></i>登录`);
                    } else {
                      return [
                        createTextVNode("换为"),
                        createVNode("i", { class: "iconfont icon-disqus disqus" }),
                        createTextVNode("登录")
                      ];
                    }
                  }),
                  en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Login by <i class="iconfont icon-disqus disqus" data-v-556e50dd${_scopeId2}></i>`);
                    } else {
                      return [
                        createTextVNode("Login by "),
                        createVNode("i", { class: "iconfont icon-disqus disqus" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</button></li><li class="item" data-v-556e50dd${_scopeId}><button class="button" data-v-556e50dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: "退出本地访客身份",
                  en: "Clean local profile"
                }, null, _parent2, _scopeId));
                _push2(`</button></li></ul></div><!--]-->`);
              } else if (user.value.type === unref(UserType).Disqus) {
                _push2(`<!--[--><div class="name" data-v-556e50dd${_scopeId}><i class="icon disqus iconfont icon-disqus-logo" data-v-556e50dd${_scopeId}></i><span class="text" data-v-556e50dd${_scopeId}>${ssrInterpolate(user.value.disqusProfile?.name || "")}</span><i class="arrow iconfont icon-down-arrow" data-v-556e50dd${_scopeId}></i></div><div class="user-menu" data-v-556e50dd${_scopeId}><ul class="menus" data-v-556e50dd${_scopeId}><li class="item" data-v-556e50dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_ulink, {
                  class: "button",
                  href: user.value.disqusProfile.profileUrl
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_i18n, {
                        zh: "访问 Disqus 主页",
                        en: "Disqus profile"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_i18n, {
                          zh: "访问 Disqus 主页",
                          en: "Disqus profile"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</li><li class="item" data-v-556e50dd${_scopeId}><button class="button" data-v-556e50dd${_scopeId}>`);
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: "注销授权身份",
                  en: "Disqus logout"
                }, null, _parent2, _scopeId));
                _push2(`</button></li></ul></div><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: ["topbar", { plain: _ctx.plain }],
                key: "element"
              }, [
                createVNode("div", { class: "statistics" }, [
                  createVNode("div", {
                    class: ["total", { loading: _ctx.loading }]
                  }, [
                    createVNode("i", { class: "iconfont icon-discussion" }),
                    createVNode(_component_i18n, null, {
                      zh: withCtx(() => [
                        createTextVNode(" 共 "),
                        createVNode("span", { class: "count" }, toDisplayString(statisticsText.value), 1),
                        createTextVNode(" 条看法 ")
                      ]),
                      en: withCtx(() => [
                        createVNode("span", { class: "count" }, toDisplayString(statisticsText.value), 1),
                        createTextVNode(" comments ")
                      ]),
                      _: 1
                    })
                  ], 2),
                  createVNode("label", { class: "sort" }, [
                    createVNode("span", { class: "icon" }, "▼"),
                    createVNode("select", {
                      class: "select",
                      name: "sort",
                      value: _ctx.sort,
                      onChange: ($event) => handleSort($event.target)
                    }, [
                      createVNode("option", {
                        value: unref(SortType).Desc
                      }, [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).COMMENT_SORT_NEW
                        }, null, 8, ["k"])
                      ], 8, ["value"]),
                      createVNode("option", {
                        value: unref(SortType).Hottest
                      }, [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).COMMENT_SORT_HOT
                        }, null, 8, ["k"])
                      ], 8, ["value"]),
                      createVNode("option", {
                        value: unref(SortType).Asc
                      }, [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).COMMENT_SORT_OLD
                        }, null, 8, ["k"])
                      ], 8, ["value"])
                    ], 40, ["value", "onChange"])
                  ]),
                  createVNode("button", {
                    class: "disqus",
                    onClick: handleDisqusThread
                  }, [
                    createVNode("i", { class: "iconfont icon-disqus-logo" })
                  ]),
                  renderSlot(_ctx.$slots, "extra", {}, void 0, true)
                ]),
                createVNode("div", { class: "user" }, [
                  user.value.type === unref(UserType).Null ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "unlogin"
                  }, [
                    createVNode("span", { class: "guest" }, [
                      createVNode(_component_i18n, {
                        zh: "访客身份",
                        en: "Guest"
                      })
                    ]),
                    createVNode(_component_divider, {
                      type: "vertical",
                      size: "sm"
                    }),
                    createVNode("button", {
                      class: "disqus",
                      onClick: handleDisqusLogin
                    }, [
                      createVNode(_component_i18n, null, {
                        zh: withCtx(() => [
                          createTextVNode("使用"),
                          createVNode("i", { class: "iconfont icon-disqus" }),
                          createTextVNode("登录")
                        ]),
                        en: withCtx(() => [
                          createTextVNode("Login by"),
                          createVNode("i", { class: "iconfont icon-disqus right" })
                        ]),
                        _: 1
                      })
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "logined"
                  }, [
                    user.value.type === unref(UserType).Local ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createVNode("div", { class: "name" }, [
                        createVNode("i", { class: "icon guest iconfont icon-user" }),
                        createVNode("span", { class: "text" }, toDisplayString(user.value.localProfile?.name || ""), 1),
                        createVNode("i", { class: "arrow iconfont icon-down-arrow" })
                      ]),
                      createVNode("div", { class: "user-menu" }, [
                        createVNode("ul", { class: "menus" }, [
                          createVNode("li", { class: "item" }, [
                            createVNode("button", {
                              class: "button",
                              onClick: handleDisqusLogin
                            }, [
                              createVNode(_component_i18n, null, {
                                zh: withCtx(() => [
                                  createTextVNode("换为"),
                                  createVNode("i", { class: "iconfont icon-disqus disqus" }),
                                  createTextVNode("登录")
                                ]),
                                en: withCtx(() => [
                                  createTextVNode("Login by "),
                                  createVNode("i", { class: "iconfont icon-disqus disqus" })
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode("li", { class: "item" }, [
                            createVNode("button", {
                              class: "button",
                              onClick: handleClearLocalProfile
                            }, [
                              createVNode(_component_i18n, {
                                zh: "退出本地访客身份",
                                en: "Clean local profile"
                              })
                            ])
                          ])
                        ])
                      ])
                    ], 64)) : user.value.type === unref(UserType).Disqus ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                      createVNode("div", { class: "name" }, [
                        createVNode("i", { class: "icon disqus iconfont icon-disqus-logo" }),
                        createVNode("span", { class: "text" }, toDisplayString(user.value.disqusProfile?.name || ""), 1),
                        createVNode("i", { class: "arrow iconfont icon-down-arrow" })
                      ]),
                      createVNode("div", { class: "user-menu" }, [
                        createVNode("ul", { class: "menus" }, [
                          createVNode("li", { class: "item" }, [
                            createVNode(_component_ulink, {
                              class: "button",
                              href: user.value.disqusProfile.profileUrl
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_i18n, {
                                  zh: "访问 Disqus 主页",
                                  en: "Disqus profile"
                                })
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ]),
                          createVNode("li", { class: "item" }, [
                            createVNode("button", {
                              class: "button",
                              onClick: handleDisqusLogout
                            }, [
                              createVNode(_component_i18n, {
                                zh: "注销授权身份",
                                en: "Disqus logout"
                              })
                            ])
                          ])
                        ])
                      ])
                    ], 64)) : createCommentVNode("", true)
                  ]))
                ])
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1B = _sfc_main$1B.setup;
_sfc_main$1B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/topbar.vue");
  return _sfc_setup$1B ? _sfc_setup$1B(props, ctx) : void 0;
};
const CommentTopbar = /* @__PURE__ */ _export_sfc(_sfc_main$1B, [["__scopeId", "data-v-556e50dd"]]);
const _sfc_main$1A = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  props: {
    hasData: { type: Boolean },
    fetching: { type: Boolean, default: false },
    skeletonCount: { default: 6 }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_skeleton_paragraph = resolveComponent("skeleton-paragraph");
      const _component_i18n = resolveComponent("i18n");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({
        loading: _ctx.fetching,
        data: _ctx.hasData || !!_ctx.$slots.extra
      }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="main-skeleton" data-v-9ecf1dfc${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.skeletonCount, (item) => {
              _push2(`<li class="item" data-v-9ecf1dfc${_scopeId}><div class="avatar" data-v-9ecf1dfc${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
              _push2(`</div><div class="content" data-v-9ecf1dfc${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_paragraph, { lines: 4 }, null, _parent2, _scopeId));
              _push2(`</div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "main-skeleton" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.skeletonCount, (item) => {
                  return openBlock(), createBlock("li", {
                    key: item,
                    class: "item"
                  }, [
                    createVNode("div", { class: "avatar" }, [
                      createVNode(_component_skeleton_base)
                    ]),
                    createVNode("div", { class: "content" }, [
                      createVNode(_component_skeleton_paragraph, { lines: 4 })
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="list-empty" data-v-9ecf1dfc${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).COMMENT_LIST_EMPTY
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "list-empty" }, [
                createVNode(_component_i18n, {
                  k: unref(LocaleKey).COMMENT_LIST_EMPTY
                }, null, 8, ["k"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="main" data-v-9ecf1dfc${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "extra", {}, null, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "list", {}, null, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "pagination", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "main" }, [
                renderSlot(_ctx.$slots, "extra", {}, void 0, true),
                renderSlot(_ctx.$slots, "list", {}, void 0, true),
                renderSlot(_ctx.$slots, "pagination", {}, void 0, true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1A = _sfc_main$1A.setup;
_sfc_main$1A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/main.vue");
  return _sfc_setup$1A ? _sfc_setup$1A(props, ctx) : void 0;
};
const CommentMain = /* @__PURE__ */ _export_sfc(_sfc_main$1A, [["__scopeId", "data-v-9ecf1dfc"]]);
const getGravatarByHash = (hash) => {
  return `https://www.gravatar.com/avatar/${hash}`;
};
const getDisqusAvatarByUsername = (username) => {
  return `https://disqus.com/api/users/avatars/${username}.jpg`;
};
const _sfc_main$1z = /* @__PURE__ */ defineComponent({
  __name: "markdown",
  __ssrInlineRender: true,
  props: {
    markdown: {},
    html: {},
    plain: { type: Boolean },
    compact: { type: Boolean },
    renderOptions: {}
  },
  setup(__props) {
    const props = __props;
    const { element } = useLozad();
    const { isDarkTheme } = useEnhancer();
    const markdownHTML = computed(() => {
      if (props.markdown) {
        return markdownToHTML(props.markdown, {
          ...props.renderOptions
        });
      }
      return props.html || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "element",
        ref: element,
        class: [_ctx.plain ? "global-markdown-plain" : "global-markdown-html", { compact: _ctx.compact, dark: unref(isDarkTheme) }]
      }, _attrs))}>${markdownHTML.value ?? ""}</section>`);
    };
  }
});
const _sfc_setup$1z = _sfc_main$1z.setup;
_sfc_main$1z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/markdown.vue");
  return _sfc_setup$1z ? _sfc_setup$1z(props, ctx) : void 0;
};
const _sfc_main$1y = /* @__PURE__ */ defineComponent({
  __name: "link",
  __ssrInlineRender: true,
  props: {
    href: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.href) {
        _push(`<a${ssrRenderAttrs(mergeProps({
          target: "_blank",
          rel: "external nofollow noopener",
          href: _ctx.href
        }, _ctx.$attrs, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</a>`);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps(_ctx.$attrs, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
    };
  }
});
const _sfc_setup$1y = _sfc_main$1y.setup;
_sfc_main$1y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/link.vue");
  return _sfc_setup$1y ? _sfc_setup$1y(props, ctx) : void 0;
};
const OFFSET = 127397;
const countryCodeToEmoji = (countryCode) => {
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET));
};
const _sfc_main$1x = /* @__PURE__ */ defineComponent({
  __name: "location",
  __ssrInlineRender: true,
  props: {
    location: {}
  },
  setup(__props) {
    const props = __props;
    const municipalities = ["Shanghai", "Beijing", "Tianjin", "Chongqing", "Chungking"];
    const countryText = computed(() => props.location.country_code || props.location.country);
    const emojiText = computed(() => countryCodeToEmoji(props.location.country_code));
    const cityText = computed(() => {
      if (props.location.country_code === "CN") {
        if (municipalities.includes(props.location.region)) {
          return props.location.region;
        }
      }
      return props.location.city;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "location" }, _attrs))} data-v-62311b6d>`);
      if (emojiText.value) {
        _push(`<span class="emoji"${ssrRenderAttr("title", props.location.country)} data-v-62311b6d>${ssrInterpolate(emojiText.value)}</span>`);
      } else {
        _push(`<i class="iconfont icon-earth" data-v-62311b6d></i>`);
      }
      _push(`<span${ssrRenderAttr("title", props.location.country)} data-v-62311b6d>${ssrInterpolate(countryText.value)}</span><span class="separator" data-v-62311b6d>•</span><span${ssrRenderAttr("title", cityText.value)} data-v-62311b6d>${ssrInterpolate(cityText.value)}</span></span>`);
    };
  }
});
const _sfc_setup$1x = _sfc_main$1x.setup;
_sfc_main$1x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/location.vue");
  return _sfc_setup$1x ? _sfc_setup$1x(props, ctx) : void 0;
};
const CommentLocation = /* @__PURE__ */ _export_sfc(_sfc_main$1x, [["__scopeId", "data-v-62311b6d"]]);
const _sfc_main$1w = /* @__PURE__ */ defineComponent({
  __name: "user-agent",
  __ssrInlineRender: true,
  props: {
    userAgent: {}
  },
  setup(__props) {
    const osIconsNameMap = {
      "Chrome OS": "icon-chrome",
      macOS: "icon-apple",
      Windows: "icon-windows",
      Android: "icon-android",
      Ubuntu: "icon-ubuntu",
      Linux: "icon-linux",
      iOS: "icon-apple"
    };
    const browsersIconsNameMap = {
      Chrome: "icon-chrome",
      "Mobile Chrome": "icon-chrome",
      Safari: "icon-safari",
      "Mobile Safari": "icon-safari",
      Firefox: "icon-firefox",
      "Mobile Firefox": "icon-firefox",
      Chromium: "icon-chrome",
      IE: "icon-ie",
      Edge: "icon-edge",
      Opera: "icon-opera",
      UCBrowser: "icon-uc",
      WeChat: "icon-wechat",
      Twitter: "icon-twitter-x",
      Instagram: "icon-instagram",
      Baidu: "icon-baidu",
      QQ: "icon-qq"
    };
    const props = __props;
    const { uap: uaParsed } = uaParser(props.userAgent);
    const osName = uaParsed.os.name;
    const browserName = uaParsed.browser.name;
    const osIconName = osName ? osIconsNameMap[osName] : null;
    const browserIconName = browserName ? browsersIconsNameMap[browserName] : null;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "user-agent" }, _attrs))} data-v-777c20d6>`);
      if (unref(osName)) {
        _push(`<span class="os" data-v-777c20d6>`);
        if (unref(osIconName)) {
          _push(`<i class="${ssrRenderClass([unref(osIconName), "iconfont"])}" data-v-777c20d6></i>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-777c20d6>${ssrInterpolate(unref(osName))}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(browserName)) {
        _push(`<span class="browser" data-v-777c20d6>`);
        if (unref(browserIconName)) {
          _push(`<i class="${ssrRenderClass([unref(browserIconName), "iconfont"])}" data-v-777c20d6></i>`);
        } else {
          _push(`<i class="iconfont icon-internet" data-v-777c20d6></i>`);
        }
        _push(`<span data-v-777c20d6>${ssrInterpolate(unref(browserName))}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
    };
  }
});
const _sfc_setup$1w = _sfc_main$1w.setup;
_sfc_main$1w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/user-agent.vue");
  return _sfc_setup$1w ? _sfc_setup$1w(props, ctx) : void 0;
};
const CommentUserAgent = /* @__PURE__ */ _export_sfc(_sfc_main$1w, [["__scopeId", "data-v-777c20d6"]]);
const _sfc_main$1v = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    comment: {},
    liked: { type: Boolean },
    disliked: { type: Boolean },
    isReply: { type: Boolean },
    isChild: { type: Boolean },
    hasChild: { type: Boolean },
    hiddenAvatar: { type: Boolean },
    hiddenUa: { type: Boolean },
    hiddenLocation: { type: Boolean },
    plainVote: { type: Boolean }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { cdnDomain, isCNUser } = useEnhancer();
    const commentStore = useCommentStore();
    const identityStore = useIdentityStore();
    const isDeleting = computed(() => commentStore.deleting);
    const disqusAuthorId = computed(() => {
      return getExtendValue(props.comment.extends, "disqus-author-id");
    });
    const disqusUsername = computed(() => {
      return getExtendValue(props.comment.extends, "disqus-author-username");
    });
    const isDisqusAuthor = computed(() => Boolean(disqusAuthorId.value));
    const isAdminAuthor = computed(() => {
      return Boolean(disqusUsername.value) && Boolean(identityStore.disqusConfig) && disqusUsername.value === identityStore.disqusConfig.admin_username;
    });
    const authorAvatar = computed(() => {
      if (disqusUsername.value) {
        const avatar = getDisqusAvatarByUsername(disqusUsername.value);
        return isCNUser ? getOriginalProxyURL(avatar) : avatar;
      } else {
        const emailHash = props.comment.author.email_hash;
        if (!emailHash) return getAssetURL(cdnDomain, APP_CONFIG.default_comment_avatar);
        const gravatar = getGravatarByHash(emailHash);
        return isCNUser ? getCdnProxyURL(cdnDomain, gravatar) : gravatar;
      }
    });
    const authorURL = computed(() => {
      if (props.comment.author.site) {
        return props.comment.author.site;
      }
      if (disqusUsername.value) {
        return getDisqusUserURL(disqusUsername.value);
      }
      return void 0;
    });
    const isDeletable = computed(() => {
      if (identityStore.user.type === UserType.Disqus) {
        if (disqusAuthorId.value) {
          return identityStore.user.disqusProfile?.id === disqusAuthorId.value;
        }
      }
      return false;
    });
    const getReplyParentCommentText = (parentId) => {
      const authorName = commentStore.comments.find((comment) => comment.id === parentId)?.author.name;
      const nameText = authorName ? `@${authorName}` : "";
      const idText = `#${parentId}`;
      return `${idText} ${nameText}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["comment-item", {
          "hide-avatar": _ctx.hiddenAvatar,
          "is-child": _ctx.isChild,
          "has-child": _ctx.hasChild
        }],
        key: _ctx.comment.id,
        id: unref(getCommentItemElementId)(_ctx.comment.id)
      }, _attrs))} data-v-3e160b84><div data-v-3e160b84>`);
      if (!_ctx.hiddenAvatar) {
        _push(`<div class="cm-avatar" data-v-3e160b84>`);
        _push(ssrRenderComponent(_sfc_main$1y, {
          class: "link",
          href: authorURL.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", authorAvatar.value)}${ssrRenderAttr("alt", _ctx.comment.author.name)} draggable="false" data-v-3e160b84${_scopeId}><span class="${ssrRenderClass([isDisqusAuthor.value ? "disqus" : "anonymous", "role"])}" data-v-3e160b84${_scopeId}>`);
              if (isDisqusAuthor.value) {
                _push2(`<i class="iconfont icon-disqus-logo" data-v-3e160b84${_scopeId}></i>`);
              } else {
                _push2(`<i class="iconfont icon-user" data-v-3e160b84${_scopeId}></i>`);
              }
              _push2(`</span>`);
            } else {
              return [
                createVNode("img", {
                  src: authorAvatar.value,
                  alt: _ctx.comment.author.name,
                  draggable: "false"
                }, null, 8, ["src", "alt"]),
                createVNode("span", {
                  class: ["role", isDisqusAuthor.value ? "disqus" : "anonymous"]
                }, [
                  isDisqusAuthor.value ? (openBlock(), createBlock("i", {
                    key: 0,
                    class: "iconfont icon-disqus-logo"
                  })) : (openBlock(), createBlock("i", {
                    key: 1,
                    class: "iconfont icon-user"
                  }))
                ], 2)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cm-body" data-v-3e160b84><div class="cm-header" data-v-3e160b84><div class="left" data-v-3e160b84>`);
      _push(ssrRenderComponent(_sfc_main$1y, {
        class: ["username", { url: Boolean(authorURL.value) }],
        href: authorURL.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(firstUpperCase)(_ctx.comment.author.name))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(firstUpperCase)(_ctx.comment.author.name)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isAdminAuthor.value) {
        _push(`<span class="moderator" data-v-3e160b84>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).COMMENT_MODERATOR
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="author-info" data-v-3e160b84>`);
      if (_ctx.comment.ip_location && !_ctx.hiddenLocation) {
        _push(ssrRenderComponent(CommentLocation, {
          location: _ctx.comment.ip_location
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (_ctx.comment.agent && !_ctx.hiddenUa) {
        _push(ssrRenderComponent(CommentUserAgent, {
          "user-agent": _ctx.comment.agent
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</span></div><div class="right" data-v-3e160b84><button class="floor" data-v-3e160b84>#${ssrInterpolate(_ctx.comment.id)}</button></div></div><div class="cm-content" data-v-3e160b84>`);
      if (_ctx.comment.pid) {
        _push(`<p class="reply" data-v-3e160b84><span class="text" data-v-3e160b84>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).COMMENT_REPLY
        }, null, _parent));
        _push(`</span><button class="parent" data-v-3e160b84>${ssrInterpolate(getReplyParentCommentText(_ctx.comment.pid))}</button>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "：",
          en: ":"
        }, null, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="markdown" data-v-3e160b84>`);
      _push(ssrRenderComponent(_sfc_main$1z, {
        markdown: _ctx.comment.content,
        compact: true,
        "render-options": { sanitize: true, codeLineNumbers: false }
      }, null, _parent));
      _push(`</div></div><div class="cm-footer" data-v-3e160b84><div class="left" data-v-3e160b84><span class="create-at" data-allow-mismatch data-v-3e160b84>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: _ctx.comment.created_at
      }, null, _parent));
      _push(`</span><button class="${ssrRenderClass([{
        voted: _ctx.liked,
        "has-count": Boolean(_ctx.comment.likes)
      }, "vote"])}"${ssrIncludeBooleanAttr(_ctx.liked) ? " disabled" : ""} data-v-3e160b84><i class="iconfont icon-like" data-v-3e160b84></i>`);
      if (!_ctx.plainVote) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).COMMENT_UPVOTE
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="count" data-v-3e160b84>(${ssrInterpolate(_ctx.comment.likes)})</span></button><button class="${ssrRenderClass([{
        voted: _ctx.disliked,
        "has-count": Boolean(_ctx.comment.dislikes)
      }, "vote"])}"${ssrIncludeBooleanAttr(_ctx.disliked) ? " disabled" : ""} data-v-3e160b84><i class="iconfont icon-dislike" data-v-3e160b84></i>`);
      if (!_ctx.plainVote) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).COMMENT_DOWNVOTE
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="count" data-v-3e160b84>(${ssrInterpolate(_ctx.comment.dislikes)})</span></button>`);
      if (_ctx.isReply) {
        _push(`<button class="reply" data-v-3e160b84><i class="iconfont icon-cancel" data-v-3e160b84></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).COMMENT_REPLY_CANCEL
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<button class="reply" data-v-3e160b84><i class="iconfont icon-reply" data-v-3e160b84></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).COMMENT_REPLY
        }, null, _parent));
        _push(`</button>`);
      }
      _push(`</div><div class="right" data-v-3e160b84>`);
      if (isDeletable.value) {
        _push(`<button class="delete"${ssrIncludeBooleanAttr(isDeleting.value) ? " disabled" : ""} data-v-3e160b84><i class="iconfont icon-delete" data-v-3e160b84></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).COMMENT_DELETE
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (_ctx.isReply) {
        _push(`<div class="cm-reply" data-v-3e160b84>`);
        ssrRenderSlot(_ctx.$slots, "reply", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cm-children" data-v-3e160b84>`);
      ssrRenderSlot(_ctx.$slots, "children", {}, null, _push, _parent);
      _push(`</div></div></div></li>`);
    };
  }
});
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const CommentItem = /* @__PURE__ */ _export_sfc(_sfc_main$1v, [["__scopeId", "data-v-3e160b84"]]);
const _sfc_main$1u = defineComponent({
  name: "CommentList",
  components: {
    CommentItem
  },
  props: {
    comments: {
      type: Array,
      required: true
    },
    replyPid: {
      type: Number,
      required: true
    },
    isChildList: {
      type: Boolean,
      default: false
    },
    hiddenAvatar: {
      type: Boolean,
      default: false
    },
    hiddenUa: {
      type: Boolean,
      default: false
    },
    plainVote: {
      type: Boolean,
      default: false
    }
  },
  emits: [CommentEvents.Reply, CommentEvents.Delete, CommentEvents.CancelReply],
  setup(_, context) {
    const { i18n: _i18n } = useEnhancer();
    const { comment: commentStore, identity } = useStores();
    const buildCommentTree = (comments) => {
      return comments.map((comment) => ({
        comment,
        children: []
      }));
    };
    const handleReplyComment = (commentId) => {
      context.emit(CommentEvents.Reply, commentId);
    };
    const handleCancelReply = (commentId) => {
      context.emit(CommentEvents.CancelReply, commentId);
    };
    const handleDeleteComment = async (commentId) => {
      context.emit(CommentEvents.Delete, commentId);
    };
    const handleVoteComment = async (commentId, isLike) => {
      if (isLike && identity.isLikedComment(commentId)) {
        return false;
      }
      if (!isLike && identity.isDislikedComment(commentId)) {
        return false;
      }
      try {
        await commentStore.postCommentVote(commentId, isLike ? 1 : -1);
        isLike ? identity.likeComment(commentId) : identity.dislikeComment(commentId);
      } catch (error) {
        const message = _i18n.t(LocaleKey.POST_ACTION_ERROR);
        logger.failure(message, error);
        alert(message);
      }
    };
    return {
      identity,
      buildCommentTree,
      handleReplyComment,
      handleCancelReply,
      handleDeleteComment,
      handleVoteComment
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_comment_item = resolveComponent("comment-item");
  const _component_comment_list = resolveComponent("comment-list");
  _push(`<ul${ssrRenderAttrs(mergeProps({
    class: ["comment-list", _ctx.isChildList ? "child" : "root"]
  }, _attrs))} data-v-807bdc9e><!--[-->`);
  ssrRenderList(_ctx.comments, (item) => {
    _push(ssrRenderComponent(_component_comment_item, {
      key: item.comment.id,
      comment: item.comment,
      liked: _ctx.identity.isLikedComment(item.comment.id),
      disliked: _ctx.identity.isDislikedComment(item.comment.id),
      "has-child": !!item.children.length,
      "is-child": _ctx.isChildList,
      "is-reply": _ctx.replyPid === item.comment.id,
      "hidden-avatar": _ctx.hiddenAvatar,
      "hidden-ua": _ctx.hiddenUa,
      "plain-vote": _ctx.plainVote,
      onVote: _ctx.handleVoteComment,
      onDelete: _ctx.handleDeleteComment,
      onReply: _ctx.handleReplyComment,
      onCancelReply: _ctx.handleCancelReply
    }, createSlots({
      reply: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          ssrRenderSlot(_ctx.$slots, "reply", {
            comment: item.comment,
            isChild: false
          }, null, _push2, _parent2, _scopeId);
        } else {
          return [
            renderSlot(_ctx.$slots, "reply", {
              comment: item.comment,
              isChild: false
            }, void 0, true)
          ];
        }
      }),
      _: 2
    }, [
      item.children.length ? {
        name: "children",
        fn: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_comment_list, {
              comments: _ctx.buildCommentTree(item.children),
              "is-child-list": true,
              "hidden-avatar": _ctx.hiddenAvatar,
              "hidden-ua": _ctx.hiddenUa,
              "plain-vote": _ctx.plainVote,
              "reply-pid": _ctx.replyPid,
              onDelete: _ctx.handleDeleteComment,
              onReply: _ctx.handleReplyComment,
              onCancelReply: _ctx.handleCancelReply
            }, {
              reply: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "reply", {
                    comment: item.comment,
                    isChild: true
                  }, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "reply", {
                      comment: item.comment,
                      isChild: true
                    }, void 0, true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_comment_list, {
                comments: _ctx.buildCommentTree(item.children),
                "is-child-list": true,
                "hidden-avatar": _ctx.hiddenAvatar,
                "hidden-ua": _ctx.hiddenUa,
                "plain-vote": _ctx.plainVote,
                "reply-pid": _ctx.replyPid,
                onDelete: _ctx.handleDeleteComment,
                onReply: _ctx.handleReplyComment,
                onCancelReply: _ctx.handleCancelReply
              }, {
                reply: withCtx(() => [
                  renderSlot(_ctx.$slots, "reply", {
                    comment: item.comment,
                    isChild: true
                  }, void 0, true)
                ]),
                _: 2
              }, 1032, ["comments", "hidden-avatar", "hidden-ua", "plain-vote", "reply-pid", "onDelete", "onReply", "onCancelReply"])
            ];
          }
        }),
        key: "0"
      } : void 0
    ]), _parent));
  });
  _push(`<!--]--></ul>`);
}
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/list.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const CommentList = /* @__PURE__ */ _export_sfc(_sfc_main$1u, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-807bdc9e"]]);
const _sfc_main$1t = /* @__PURE__ */ defineComponent({
  __name: "loadmore",
  __ssrInlineRender: true,
  props: {
    fetching: { type: Boolean },
    remain: {},
    pagination: {}
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    useEnhancer();
    const hasMore = computed(() => {
      return props.pagination && props.pagination?.total_page > 1 && props.pagination?.current_page !== props.pagination?.total_page;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_loading_indicator = resolveComponent("loading-indicator");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "loadmore",
        id: unref(COMMENT_FOOTER_ELEMENT_ID)
      }, _attrs))} data-v-1671397f>`);
      if (_ctx.fetching) {
        _push(ssrRenderComponent(_component_loading_indicator, {
          class: "loading",
          width: "2rem",
          height: "1.2rem",
          gap: "0.8rem"
        }, null, _parent));
      } else if (hasMore.value) {
        _push(`<button class="button" data-v-1671397f><i class="iconfont icon-loadmore" data-v-1671397f></i>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`加载更多（${ssrInterpolate(_ctx.remain)} 条）评论`);
            } else {
              return [
                createTextVNode("加载更多（" + toDisplayString(_ctx.remain) + " 条）评论", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Loadmore (remain of ${ssrInterpolate(_ctx.remain)} comments)`);
            } else {
              return [
                createTextVNode("Loadmore (remain of " + toDisplayString(_ctx.remain) + " comments)", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</button>`);
      } else {
        _push(`<span class="finished" data-v-1671397f>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).LIST_NO_MORE_DATA
        }, null, _parent));
        _push(`</span>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1t = _sfc_main$1t.setup;
_sfc_main$1t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/loadmore.vue");
  return _sfc_setup$1t ? _sfc_setup$1t(props, ctx) : void 0;
};
const CommentLoadmore = /* @__PURE__ */ _export_sfc(_sfc_main$1t, [["__scopeId", "data-v-1671397f"]]);
const _sfc_main$1s = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  props: {
    fetching: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({ loading: _ctx.fetching }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="publisher-skeleton" data-v-1932b846${_scopeId}><div class="avatar" data-v-1932b846${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
            _push2(`</div><div class="content" data-v-1932b846${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "publisher-skeleton",
                key: "skeleton"
              }, [
                createVNode("div", { class: "avatar" }, [
                  createVNode(_component_skeleton_base)
                ]),
                createVNode("div", { class: "content" }, [
                  createVNode(_component_skeleton_base)
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/publisher/main.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const CommentPublisherMain = /* @__PURE__ */ _export_sfc(_sfc_main$1s, [["__scopeId", "data-v-1932b846"]]);
const _sfc_main$1r = /* @__PURE__ */ defineComponent({
  __name: "publisher",
  __ssrInlineRender: true,
  props: {
    id: {},
    disabled: { type: Boolean },
    profile: {},
    total: { default: 0 },
    bordered: { type: Boolean },
    defaultBlossomed: { type: Boolean, default: true },
    hiddenAvatar: { type: Boolean },
    fixedAvatar: { type: Boolean }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { i18n: _i18n, cdnDomain, isCNUser } = useEnhancer();
    const { user } = storeToRefs(useIdentityStore());
    const defaultAvatar = getAssetURL(cdnDomain, APP_CONFIG.default_comment_avatar);
    const avatar = computed(() => {
      if (user.value.type === UserType.Local) {
        const hash = user.value.localProfile?.email_hash;
        if (!hash) return defaultAvatar;
        const gravatar = getGravatarByHash(hash);
        return isCNUser ? getCdnProxyURL(cdnDomain, gravatar) : gravatar;
      }
      if (user.value.type === UserType.Disqus) {
        const avatar2 = getDisqusAvatarByUsername(user.value.disqusProfile?.username);
        return isCNUser ? getOriginalProxyURL(avatar2) : avatar2;
      }
      return defaultAvatar;
    });
    const blossomed = ref(props.defaultBlossomed);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      _push(`<form${ssrRenderAttrs(mergeProps({
        key: "publisher",
        class: ["publisher", {
          "hidden-avatar": _ctx.hiddenAvatar,
          "fixed-avatar": _ctx.fixedAvatar,
          blossomed: blossomed.value,
          bordered: _ctx.bordered
        }],
        name: "comment",
        id: _ctx.id
      }, _attrs))} data-v-a6ca960e>`);
      if (unref(user).type === unref(UserType).Null) {
        _push(`<div class="profile" style="${ssrRenderStyle(blossomed.value ? null : { display: "none" })}" data-v-a6ca960e><div class="name" data-v-a6ca960e><input${ssrRenderAttr("value", _ctx.profile.name)} required type="text" name="name" autocomplete="on"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocaleKey).COMMENT_POST_NAME) + " *")} data-v-a6ca960e></div><div class="email" data-v-a6ca960e><input${ssrRenderAttr("value", _ctx.profile.email)} required type="email" name="email" autocomplete="on"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocaleKey).COMMENT_POST_EMAIL) + " *")} data-v-a6ca960e></div><div class="site" data-v-a6ca960e><input${ssrRenderAttr("value", _ctx.profile.site)} type="url" name="url" autocomplete="on"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocaleKey).COMMENT_POST_SITE))} data-v-a6ca960e></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="postbox" data-v-a6ca960e>`);
      if (!_ctx.hiddenAvatar) {
        _push(`<div class="avatar" data-v-a6ca960e>`);
        _push(ssrRenderComponent(_component_uimage, {
          alt: _ctx.profile.name,
          src: avatar.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (blossomed.value) {
        _push(`<div class="editor" data-v-a6ca960e>`);
        ssrRenderSlot(_ctx.$slots, "pen", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<div class="placeholder" data-v-a6ca960e>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "在下有一拙见，不知...",
          en: `${_ctx.total ? "Join" : "Start"} the discussion...`
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/publisher/publisher.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const CommentPublisher = /* @__PURE__ */ _export_sfc(_sfc_main$1r, [["__scopeId", "data-v-a6ca960e"]]);
const _sfc_main$1q = /* @__PURE__ */ defineComponent({
  __name: "pen",
  __ssrInlineRender: true,
  props: {
    posting: { type: Boolean },
    modelValue: {},
    disabled: { type: Boolean },
    previewed: { type: Boolean },
    bordered: { type: Boolean },
    autoFocus: { type: Boolean },
    hiddenStationery: { type: Boolean }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { i18n: _i18n } = useEnhancer();
    const { user } = storeToRefs(useIdentityStore());
    const content = ref(props.modelValue ?? "");
    const isPreviewed = ref(props.previewed ?? false);
    const textareaRef = ref();
    onBeforeMount(() => {
      watch(
        () => props.modelValue,
        (value = "") => {
          content.value = value;
          if (textareaRef.value) {
            textareaRef.value.value = value;
          }
        }
      );
    });
    onBeforeMount(() => {
      watch(
        () => props.previewed,
        (value) => {
          if (value !== isPreviewed.value) {
            isPreviewed.value = value;
          }
        }
      );
    });
    onMounted(() => {
      if (props.autoFocus) {
        textareaRef.value?.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["pen", { bordered: _ctx.bordered }]
      }, _attrs))} data-v-1a967eff><div class="editor" data-v-1a967eff><div class="input-wrapper"${ssrRenderAttr("data-replicated-value", content.value)} data-v-1a967eff><textarea class="editor-input" required${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(props.autoFocus) ? " autofocus" : ""}${ssrRenderAttr("minlength", unref(MIN_COMMENT_LENGTH))}${ssrRenderAttr("maxlength", unref(MAX_COMMENT_LENGTH))}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocaleKey).COMMENT_POST_PLACEHOLDER))} data-v-1a967eff></textarea></div>`);
      if (isPreviewed.value) {
        _push(`<div class="preview-content" data-v-1a967eff>`);
        _push(ssrRenderComponent(_sfc_main$1z, {
          markdown: content.value,
          compact: true,
          "render-options": { sanitize: true, codeLineNumbers: false }
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="pencilbox" data-v-1a967eff><div class="stationery" data-v-1a967eff>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "markdown",
        title: "markdown",
        href: unref(VALUABLE_LINKS).MARKDOWN_DOC
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-markdown" data-v-1a967eff${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-markdown" })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!_ctx.hiddenStationery) {
        _push(`<!--[--><button class="emoji" title="emoji" type="button"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-1a967eff><i class="iconfont icon-emoji" data-v-1a967eff></i><div class="emoji-box" data-v-1a967eff><ul class="emoji-list" data-v-1a967eff><!--[-->`);
        ssrRenderList(unref(EMOJIS), (emoji, index) => {
          _push(`<li class="item" data-v-1a967eff><span data-v-1a967eff>${ssrInterpolate(emoji)}</span></li>`);
        });
        _push(`<!--]--></ul></div></button><button class="image" title="image"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-1a967eff><i class="iconfont icon-image" data-v-1a967eff></i></button><button class="link" title="link"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-1a967eff><i class="iconfont icon-link" data-v-1a967eff></i></button><button class="code" title="code"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-1a967eff><i class="iconfont icon-code" data-v-1a967eff></i></button><button title="preview" class="${ssrRenderClass([{ actived: isPreviewed.value }, "preview"])}"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""} data-v-1a967eff><i class="${ssrRenderClass([isPreviewed.value ? "icon-eye-close" : "icon-eye", "iconfont"])}" data-v-1a967eff></i></button><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="submit"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""} data-v-1a967eff>`);
      if (_ctx.posting) {
        _push(ssrRenderComponent(_component_i18n, {
          zh: "发布中...",
          en: "Posting..."
        }, null, _parent));
      } else if (unref(user).type === unref(UserType).Local) {
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`以 ${ssrInterpolate(unref(user).localProfile?.name)} 的身份发布`);
            } else {
              return [
                createTextVNode("以 " + toDisplayString(unref(user).localProfile?.name) + " 的身份发布", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Post as ${ssrInterpolate(unref(user).localProfile?.name)}`);
            } else {
              return [
                createTextVNode("Post as " + toDisplayString(unref(user).localProfile?.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(user).type === unref(UserType).Disqus) {
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`以 ${ssrInterpolate(unref(user).disqusProfile?.name)} 的身份发布`);
            } else {
              return [
                createTextVNode("以 " + toDisplayString(unref(user).disqusProfile?.name) + " 的身份发布", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Post as ${ssrInterpolate(unref(user).disqusProfile?.name)}`);
            } else {
              return [
                createTextVNode("Post as " + toDisplayString(unref(user).disqusProfile?.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          zh: "发布",
          en: "Publish"
        }, null, _parent));
      }
      _push(`<i class="iconfont icon-mail-plane" data-v-1a967eff></i></button></div></div>`);
    };
  }
});
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/publisher/pen.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const CommentPen = /* @__PURE__ */ _export_sfc(_sfc_main$1q, [["__scopeId", "data-v-1a967eff"]]);
const _sfc_main$1p = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    postId: {},
    fetching: { type: Boolean, default: false },
    plain: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { i18n, route, globalState } = useEnhancer();
    const identityStore = useIdentityStore();
    const commentStore = useCommentStore();
    const isPosting = computed(() => commentStore.posting);
    const isFetching = computed(() => commentStore.fetching);
    const isLoading = computed(() => {
      return props.fetching || !commentStore.comments.length && commentStore.fetching;
    });
    const postingKey = ref();
    const isRootPosting = computed(
      () => isPosting.value && postingKey.value === "root"
      /* Root */
    );
    const isReplyPosting = computed(
      () => isPosting.value && postingKey.value === "reply"
      /* Reply */
    );
    const commentState = reactive({
      sort: SortType.Desc,
      replyPId: 0
    });
    const guestProfile = ref({
      name: "",
      email: "",
      site: ""
    });
    const rootPenState = reactive({
      content: "",
      previewed: false
    });
    const clearRootPenContent = () => {
      rootPenState.content = "";
    };
    const closeRootPenPreview = () => {
      rootPenState.previewed = false;
    };
    const cancelCommentReply = () => {
      commentState.replyPId = 0;
    };
    const replyComment = (commentId) => {
      commentState.replyPId = commentId;
    };
    const fetchCommentList = (params = {}, loadmore) => {
      const _params = {
        ...params,
        sort: commentState.sort,
        post_id: props.postId
      };
      return commentStore.fetchList(_params, loadmore);
    };
    const fetchSortComments = (sort) => {
      if (commentState.sort !== sort) {
        commentState.sort = sort;
        fetchCommentList();
        scrollToAnchor(COMMENT_ELEMENT_ID);
      }
    };
    const fetchPageComments = (page) => {
      const comments = commentStore.comments;
      const lastCommentId = getCommentItemElementId(comments[comments.length - 2].id);
      fetchCommentList({ page }, true).then(() => {
        nextTick().then(() => {
          scrollToAnchor(lastCommentId);
        });
      });
    };
    const handleDeleteComment = (commentId) => {
      commentStore.deleteComment(commentId).catch((error) => {
        logger.failure("delete comment failed", error);
        alert(error.message);
      });
    };
    const createComment = async (payload) => {
      if (!payload.content || !payload.content.trim()) {
        throw `${i18n.t(LocaleKey.COMMENT_POST_CONTENT)} ?`;
      }
      if (payload.content.length > MAX_COMMENT_LENGTH) {
        throw `${i18n.t(LocaleKey.COMMENT_POST_ERROR_CONTENT)} ?`;
      }
      const isGuest = identityStore.user.type === UserType.Null;
      const guestProfileValue = guestProfile.value;
      if (isGuest) {
        if (!guestProfileValue.name) {
          throw i18n.t(LocaleKey.COMMENT_POST_NAME) + "?";
        }
        if (!guestProfileValue.email) {
          throw i18n.t(LocaleKey.COMMENT_POST_EMAIL) + "?";
        }
      }
      const author = isGuest ? toRaw(guestProfileValue) : identityStore.user.type === UserType.Local ? identityStore.user.localProfile : {
        name: identityStore.user.disqusProfile.name,
        site: identityStore.user.disqusProfile.url
      };
      if (!author.email) {
        Reflect.deleteProperty(author, "email");
      }
      if (!author.site) {
        Reflect.deleteProperty(author, "site");
      }
      try {
        const newComment = await commentStore.postComment({
          pid: payload.pid,
          post_id: props.postId,
          content: payload.content,
          agent: globalState.userAgent.original,
          author
        });
        if (isGuest) {
          identityStore.saveLocalUser({
            ...author,
            email_hash: newComment.author.email_hash
          });
        }
        luanchEmojiRain(payload.content);
      } catch (error) {
        logger.failure("submit comment failed:", error);
        throw error.message;
      }
    };
    const validateFormById = (formId) => {
      const formElement = document.getElementById(formId);
      const check_status = formElement.checkValidity();
      formElement.reportValidity();
      return check_status ? Promise.resolve() : Promise.reject();
    };
    const handleRootSubmit = async (content) => {
      await validateFormById(COMMENT_PUBLISHER_ELEMENT_ID);
      postingKey.value = "root";
      try {
        await createComment({ content, pid: 0 });
        closeRootPenPreview();
        clearRootPenContent();
      } catch (error) {
        alert(error);
      } finally {
        postingKey.value = void 0;
      }
    };
    const handleReplySubmit = async (content) => {
      await validateFormById(COMMENT_REPLY_PUBLISHER_ELEMENT_ID);
      postingKey.value = "reply";
      try {
        await createComment({ content, pid: commentState.replyPId });
        cancelCommentReply();
      } catch (error) {
        alert(error);
      } finally {
        postingKey.value = void 0;
      }
    };
    onBeforeMount(() => {
      watch(isLoading, (loading) => {
        if (loading) {
          cancelCommentReply();
        }
      });
    });
    onBeforeUnmount(() => {
      cancelCommentReply();
    });
    onUnmounted(() => {
      commentStore.clearList();
    });
    onMounted(() => {
      const urlHash = route.hash.slice(1);
      if (urlHash.startsWith(COMMENT_ITEM_URL_HASH_PREFIX)) {
        const commentId = getCommentIdByUrlHash(urlHash);
        const elementId = getCommentItemElementId(commentId);
        if (elementId && document.getElementById(elementId)) {
          setTimeout(() => scrollToAnchor(elementId), 400);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: COMMENT_ELEMENT_ID,
        class: ["comment-box", { plain: _ctx.plain }]
      }, _attrs))} data-v-77612e90>`);
      _push(ssrRenderComponent(CommentTopbar, {
        total: unref(commentStore).pagination?.total,
        loaded: unref(commentStore).comments.length,
        "post-id": _ctx.postId,
        fetching: _ctx.fetching,
        loading: isLoading.value,
        plain: _ctx.plain,
        sort: commentState.sort,
        onSort: fetchSortComments
      }, {
        extra: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "topbar-extra", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "topbar-extra", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(_component_divider, {
        class: "divider",
        size: "lg"
      }, null, _parent));
      _push(ssrRenderComponent(CommentPublisherMain, { fetching: _ctx.fetching }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CommentPublisher, {
              profile: guestProfile.value,
              "onUpdate:profile": ($event) => guestProfile.value = $event,
              id: COMMENT_PUBLISHER_ELEMENT_ID,
              disabled: isLoading.value || isRootPosting.value,
              total: unref(commentStore).pagination?.total,
              "default-blossomed": _ctx.plain ? true : false,
              "hidden-avatar": _ctx.plain
            }, {
              pen: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CommentPen, {
                    modelValue: rootPenState.content,
                    "onUpdate:modelValue": ($event) => rootPenState.content = $event,
                    previewed: rootPenState.previewed,
                    "onUpdate:previewed": ($event) => rootPenState.previewed = $event,
                    "auto-focus": _ctx.plain ? false : true,
                    "hidden-stationery": _ctx.plain,
                    disabled: isRootPosting.value || isLoading.value,
                    posting: isRootPosting.value,
                    onSubmit: handleRootSubmit
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CommentPen, {
                      modelValue: rootPenState.content,
                      "onUpdate:modelValue": ($event) => rootPenState.content = $event,
                      previewed: rootPenState.previewed,
                      "onUpdate:previewed": ($event) => rootPenState.previewed = $event,
                      "auto-focus": _ctx.plain ? false : true,
                      "hidden-stationery": _ctx.plain,
                      disabled: isRootPosting.value || isLoading.value,
                      posting: isRootPosting.value,
                      onSubmit: handleRootSubmit
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "previewed", "onUpdate:previewed", "auto-focus", "hidden-stationery", "disabled", "posting"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentPublisher, {
                profile: guestProfile.value,
                "onUpdate:profile": ($event) => guestProfile.value = $event,
                id: COMMENT_PUBLISHER_ELEMENT_ID,
                disabled: isLoading.value || isRootPosting.value,
                total: unref(commentStore).pagination?.total,
                "default-blossomed": _ctx.plain ? true : false,
                "hidden-avatar": _ctx.plain
              }, {
                pen: withCtx(() => [
                  createVNode(CommentPen, {
                    modelValue: rootPenState.content,
                    "onUpdate:modelValue": ($event) => rootPenState.content = $event,
                    previewed: rootPenState.previewed,
                    "onUpdate:previewed": ($event) => rootPenState.previewed = $event,
                    "auto-focus": _ctx.plain ? false : true,
                    "hidden-stationery": _ctx.plain,
                    disabled: isRootPosting.value || isLoading.value,
                    posting: isRootPosting.value,
                    onSubmit: handleRootSubmit
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "previewed", "onUpdate:previewed", "auto-focus", "hidden-stationery", "disabled", "posting"])
                ]),
                _: 1
              }, 8, ["profile", "onUpdate:profile", "id", "disabled", "total", "default-blossomed", "hidden-avatar"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_divider, {
        class: "divider",
        size: "lg"
      }, null, _parent));
      _push(ssrRenderComponent(CommentMain, {
        fetching: isLoading.value,
        "skeleton-count": _ctx.plain ? 3 : 5,
        "has-data": Boolean(unref(commentStore).commentTreeList.length)
      }, createSlots({
        list: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CommentList, {
              comments: unref(commentStore).commentTreeList,
              "reply-pid": commentState.replyPId,
              "hidden-avatar": _ctx.plain,
              "hidden-ua": _ctx.plain,
              "plain-vote": _ctx.plain,
              onDelete: handleDeleteComment,
              onReply: replyComment,
              onCancelReply: cancelCommentReply
            }, {
              reply: withCtx((payload, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CommentPublisher, {
                    profile: guestProfile.value,
                    "onUpdate:profile": ($event) => guestProfile.value = $event,
                    id: COMMENT_REPLY_PUBLISHER_ELEMENT_ID,
                    disabled: false,
                    bordered: true,
                    "default-blossomed": true,
                    "hidden-avatar": _ctx.plain,
                    "fixed-avatar": payload.isChild
                  }, {
                    pen: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(CommentPen, {
                          posting: isReplyPosting.value,
                          bordered: true,
                          "auto-focus": true,
                          "hidden-stationery": _ctx.plain,
                          onSubmit: handleReplySubmit
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(CommentPen, {
                            posting: isReplyPosting.value,
                            bordered: true,
                            "auto-focus": true,
                            "hidden-stationery": _ctx.plain,
                            onSubmit: handleReplySubmit
                          }, null, 8, ["posting", "hidden-stationery"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CommentPublisher, {
                      profile: guestProfile.value,
                      "onUpdate:profile": ($event) => guestProfile.value = $event,
                      id: COMMENT_REPLY_PUBLISHER_ELEMENT_ID,
                      disabled: false,
                      bordered: true,
                      "default-blossomed": true,
                      "hidden-avatar": _ctx.plain,
                      "fixed-avatar": payload.isChild
                    }, {
                      pen: withCtx(() => [
                        createVNode(CommentPen, {
                          posting: isReplyPosting.value,
                          bordered: true,
                          "auto-focus": true,
                          "hidden-stationery": _ctx.plain,
                          onSubmit: handleReplySubmit
                        }, null, 8, ["posting", "hidden-stationery"])
                      ]),
                      _: 2
                    }, 1032, ["profile", "onUpdate:profile", "id", "hidden-avatar", "fixed-avatar"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentList, {
                comments: unref(commentStore).commentTreeList,
                "reply-pid": commentState.replyPId,
                "hidden-avatar": _ctx.plain,
                "hidden-ua": _ctx.plain,
                "plain-vote": _ctx.plain,
                onDelete: handleDeleteComment,
                onReply: replyComment,
                onCancelReply: cancelCommentReply
              }, {
                reply: withCtx((payload) => [
                  createVNode(CommentPublisher, {
                    profile: guestProfile.value,
                    "onUpdate:profile": ($event) => guestProfile.value = $event,
                    id: COMMENT_REPLY_PUBLISHER_ELEMENT_ID,
                    disabled: false,
                    bordered: true,
                    "default-blossomed": true,
                    "hidden-avatar": _ctx.plain,
                    "fixed-avatar": payload.isChild
                  }, {
                    pen: withCtx(() => [
                      createVNode(CommentPen, {
                        posting: isReplyPosting.value,
                        bordered: true,
                        "auto-focus": true,
                        "hidden-stationery": _ctx.plain,
                        onSubmit: handleReplySubmit
                      }, null, 8, ["posting", "hidden-stationery"])
                    ]),
                    _: 2
                  }, 1032, ["profile", "onUpdate:profile", "id", "hidden-avatar", "fixed-avatar"])
                ]),
                _: 1
              }, 8, ["comments", "reply-pid", "hidden-avatar", "hidden-ua", "plain-vote"])
            ];
          }
        }),
        pagination: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CommentLoadmore, {
              fetching: isFetching.value,
              pagination: unref(commentStore).pagination,
              remain: unref(commentStore).pagination ? unref(commentStore).pagination?.total - unref(commentStore).comments.length : 0,
              onPage: fetchPageComments
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentLoadmore, {
                fetching: isFetching.value,
                pagination: unref(commentStore).pagination,
                remain: unref(commentStore).pagination ? unref(commentStore).pagination?.total - unref(commentStore).comments.length : 0,
                onPage: fetchPageComments
              }, null, 8, ["fetching", "pagination", "remain"])
            ];
          }
        }),
        _: 2
      }, [
        !!_ctx.$slots["list-top-extra"] ? {
          name: "extra",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "list-top-extra", {}, null, _push2, _parent2, _scopeId);
              _push2(ssrRenderComponent(_component_divider, {
                class: "divider",
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                renderSlot(_ctx.$slots, "list-top-extra", {}, void 0, true),
                createVNode(_component_divider, {
                  class: "divider",
                  size: "lg"
                })
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/index.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
const Comment = /* @__PURE__ */ _export_sfc(_sfc_main$1p, [["__scopeId", "data-v-77612e90"]]);
const _sfc_main$1o = /* @__PURE__ */ defineComponent({
  __name: "skeleton",
  __ssrInlineRender: true,
  props: {
    socialCount: {
      type: Number,
      required: true
    },
    relatedCount: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_skeleton_paragraph = resolveComponent("skeleton-paragraph");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-skeleton" }, _attrs))} data-v-6584ccd6><div class="module" data-v-6584ccd6><div class="content-skeleton" data-v-6584ccd6>`);
      _push(ssrRenderComponent(_component_skeleton_line, { class: "title" }, null, _parent));
      _push(ssrRenderComponent(_component_skeleton_paragraph, {
        class: "content",
        lines: 9,
        "line-height": "1.3em"
      }, null, _parent));
      _push(`</div></div><div class="module" data-v-6584ccd6><div class="share-skeleton" data-v-6584ccd6><!--[-->`);
      ssrRenderList(__props.socialCount, (item) => {
        _push(ssrRenderComponent(_component_skeleton_base, {
          class: "item",
          key: item
        }, null, _parent));
      });
      _push(`<!--]--></div></div><div class="module" data-v-6584ccd6><ul class="related-skeleton" style="${ssrRenderStyle({ "grid-template-columns": `repeat(${__props.relatedCount}, 1fr)` })}" data-v-6584ccd6><!--[-->`);
      ssrRenderList(__props.relatedCount, (item) => {
        _push(ssrRenderComponent(_component_skeleton_base, {
          key: item,
          class: "item"
        }, null, _parent));
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/skeleton.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const ArticleSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1o, [["__scopeId", "data-v-6584ccd6"]]);
const _sfc_main$1n = /* @__PURE__ */ defineComponent({
  __name: "content",
  __ssrInlineRender: true,
  props: {
    article: {},
    readmoreId: {}
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ctxStore = useArticleDetailStore();
    const isHybrid = computed(() => isHybridType(props.article.origin));
    const isReprint = computed(() => isReprintType(props.article.origin));
    const isOriginal = computed(() => isOriginalType(props.article.origin));
    const element = ref();
    const isRenderMoreContent = ref(false);
    const isRenderMoreEnabled = computed(() => ctxStore.isLongContent && !ctxStore.renderedFullContent);
    const handleFullContentRendered = () => {
      emit("rendered", element.value);
    };
    onMounted(() => handleFullContentRendered());
    onUpdated(() => handleFullContentRendered());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_responsive = resolveComponent("responsive");
      const _component_divider = resolveComponent("divider");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "element",
        ref: element,
        class: "detail"
      }, _attrs))} data-v-99ccbee9><div class="${ssrRenderClass([{
        original: isOriginal.value,
        reprint: isReprint.value,
        hybrid: isHybrid.value
      }, "origin"])}" data-v-99ccbee9>`);
      if (isOriginal.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).ORIGIN_ORIGINAL
        }, null, _parent));
      } else if (isReprint.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).ORIGIN_REPRINT
        }, null, _parent));
      } else if (isHybrid.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).ORIGIN_HYBRID
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="knowledge" data-v-99ccbee9><h2 class="title" data-v-99ccbee9><span class="text" data-v-99ccbee9>${ssrInterpolate(_ctx.article.title)}</span>`);
      if (_ctx.article.featured) {
        _push(`<span class="featured" data-v-99ccbee9>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).ARTICLE_FEATURED_SHORT
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h2><div class="meta" data-v-99ccbee9><i class="iconfont icon-t" data-v-99ccbee9></i>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: `共 ${unref(numberSplit)(unref(ctxStore).contentLength)} 字，需阅读 ${unref(ctxStore).readMinutes} 分钟`,
        en: `${unref(numberSplit)(unref(ctxStore).contentLength)} characters, ${unref(ctxStore).readMinutes} min read`
      }, null, _parent));
      _push(ssrRenderComponent(_component_responsive, { desktop: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_divider, {
              type: "vertical",
              class: "vertical"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-99ccbee9${_scopeId}><i class="iconfont icon-clock-outlined" data-v-99ccbee9${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_udate, {
              to: "YMDm",
              date: _ctx.article.created_at,
              separator: "/"
            }, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode(_component_divider, {
                type: "vertical",
                class: "vertical"
              }),
              createVNode("span", null, [
                createVNode("i", { class: "iconfont icon-clock-outlined" }),
                createVNode(_component_udate, {
                  to: "YMDm",
                  date: _ctx.article.created_at,
                  separator: "/"
                }, null, 8, ["date"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_divider, {
        type: "vertical",
        class: "vertical"
      }, null, _parent));
      _push(`<span data-v-99ccbee9><i class="iconfont icon-eye" data-v-99ccbee9></i><span data-v-99ccbee9>${ssrInterpolate(unref(numberSplit)(_ctx.article.meta.views))} </span>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocaleKey).ARTICLE_VIEWS
      }, null, _parent));
      _push(`</span></div>`);
      _push(ssrRenderComponent(_sfc_main$1z, {
        html: unref(ctxStore).defaultContent?.html
      }, null, _parent));
      if (isRenderMoreEnabled.value) {
        _push(`<div${ssrRenderAttr("id", _ctx.readmoreId)} class="readmore" data-v-99ccbee9><button class="readmore-btn"${ssrIncludeBooleanAttr(isRenderMoreContent.value) ? " disabled" : ""} data-v-99ccbee9>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: isRenderMoreContent.value ? unref(LocaleKey).ARTICLE_RENDERING : unref(LocaleKey).ARTICLE_READ_ALL
        }, null, _parent));
        _push(`<i class="iconfont icon-loadmore" data-v-99ccbee9></i></button></div>`);
      } else if (unref(ctxStore).renderedFullContent) {
        _push(ssrRenderComponent(_sfc_main$1z, {
          html: unref(ctxStore).moreContent?.html
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/content.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const ArticleContent = /* @__PURE__ */ _export_sfc(_sfc_main$1n, [["__scopeId", "data-v-99ccbee9"]]);
const _sfc_main$1m = /* @__PURE__ */ defineComponent({
  __name: "share",
  __ssrInlineRender: true,
  props: {
    article: {
      type: Object,
      required: true
    },
    socials: {
      type: Array,
      default: () => []
    },
    disabledImageShare: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const { theme } = useEnhancer();
    const isLongArticle = computed(() => props.article.content.length > APP_CONFIG.article_image_share_long_threshold);
    const templateMarkdown = computed(() => {
      const content = props.article.content;
      if (!isLongArticle.value) {
        return content;
      }
      const splitIndex = getMarkdownSplitIndex(content, APP_CONFIG.article_image_share_long_threshold);
      return content.slice(0, splitIndex);
    });
    const shareTemplateElementRef = shallowRef(null);
    const shareTemplateQRCode = shallowRef(null);
    const shareImageVisibility = shallowRef(false);
    const shareImageUrl = shallowRef(null);
    const isRenderedShareImage = computed(() => Boolean(shareImageUrl.value));
    const resolveShareTemplateImages = (element) => {
      return Promise.all(
        Array.from(element.querySelectorAll("img")).map((image) => {
          if (image.complete) return Promise.resolve();
          return new Promise((resolve) => {
            image.addEventListener("load", resolve);
            image.addEventListener("error", resolve);
          });
        })
      );
    };
    const resolveShareImage = async (element) => {
      const htmlToImage = await import("html-to-image");
      const blob = await htmlToImage.toBlob(element, {
        quality: 1,
        skipAutoScale: true,
        skipFonts: true,
        fetchRequestInit: { mode: "no-cors", cache: "no-cache" },
        filter: (element2) => !["IFRAME", "VIDEO", "AUDIO"].includes(element2.tagName)
      });
      if (!blob) {
        throw new Error("Failed to generate share image");
      } else {
        return URL.createObjectURL(blob);
      }
    };
    const closeImageSharePopup = () => {
      shareImageVisibility.value = false;
      shareTemplateQRCode.value = null;
      shareImageUrl.value = null;
    };
    const openImageSharePopup = () => {
      shareImageVisibility.value = true;
      nextTick(async () => {
        if (shareTemplateElementRef.value) {
          shareTemplateQRCode.value = await renderTextToQRCodeDataURL(
            getPageURL(getArticleDetailRoute(props.article.id)),
            { errorCorrectionLevel: "M" }
          );
          await resolveShareTemplateImages(shareTemplateElementRef.value);
          shareImageUrl.value = await resolveShareImage(shareTemplateElementRef.value);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      const _component_divider = resolveComponent("divider");
      const _component_uimage = resolveComponent("uimage");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "share-box" }, _attrs))} data-v-0eb022b7>`);
      _push(ssrRenderComponent(Share, {
        class: "share",
        socials: props.socials,
        "disabled-image-share": __props.disabledImageShare,
        onShareAsImage: openImageSharePopup
      }, null, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: shareImageVisibility.value,
              "scroll-close": false,
              onClose: closeImageSharePopup
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([{ rendered: isRenderedShareImage.value }, "share-as-image-modal"])}" data-v-0eb022b7${_scopeId2}>`);
                  if (!isRenderedShareImage.value) {
                    _push3(`<div class="${ssrRenderClass([unref(theme).theme.value, "share-template"])}" data-v-0eb022b7${_scopeId2}><div class="content" data-v-0eb022b7${_scopeId2}><div class="header" data-v-0eb022b7${_scopeId2}><h1 class="title" data-v-0eb022b7${_scopeId2}>${ssrInterpolate(__props.article.title)}</h1><p class="meta-info" data-v-0eb022b7${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_i18n, {
                      zh: "发布于 ",
                      en: "Created at "
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_udate, {
                      to: "YMDm",
                      date: __props.article.created_at,
                      separator: "/"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_divider, {
                      type: "vertical",
                      size: "sm"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_i18n, {
                      zh: `全文共 ${unref(numberSplit)(__props.article.content.length)} 字`,
                      en: `${unref(numberSplit)(__props.article.content.length)} characters`
                    }, null, _parent3, _scopeId2));
                    _push3(`</p>`);
                    if (shareTemplateQRCode.value) {
                      _push3(ssrRenderComponent(_component_uimage, {
                        class: "qrcode",
                        src: shareTemplateQRCode.value
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(_sfc_main$1z, {
                      class: "markdown",
                      markdown: templateMarkdown.value,
                      "render-options": {
                        lazyLoadImage: false,
                        codeLineNumbers: false,
                        imageSourceGetter: unref(getOriginalProxyURL)
                      }
                    }, null, _parent3, _scopeId2));
                    if (isLongArticle.value) {
                      _push3(`<div class="read-more-mask" data-v-0eb022b7${_scopeId2}></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="footer" data-v-0eb022b7${_scopeId2}><p class="tip" data-v-0eb022b7${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_i18n, {
                      zh: "长按识别二维码，阅读全文，参与评论",
                      en: "Long-press the QR code to read and discuss"
                    }, null, _parent3, _scopeId2));
                    _push3(`</p>`);
                    if (shareTemplateQRCode.value) {
                      _push3(ssrRenderComponent(_component_uimage, {
                        class: "qrcode",
                        src: shareTemplateQRCode.value
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_uimage, {
                      class: "logo",
                      src: "/images/logo.svg"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!isRenderedShareImage.value) {
                    _push3(`<div class="share-rendering" data-v-0eb022b7${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_loading_indicator, {
                      width: "1.8rem",
                      height: "1.2rem"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (isRenderedShareImage.value) {
                    _push3(`<div class="share-image" data-v-0eb022b7${_scopeId2}><img class="image"${ssrRenderAttr("src", shareImageUrl.value)}${ssrRenderAttr("alt", __props.article.title)} data-v-0eb022b7${_scopeId2}></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: ["share-as-image-modal", { rendered: isRenderedShareImage.value }]
                    }, [
                      !isRenderedShareImage.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        ref_key: "shareTemplateElementRef",
                        ref: shareTemplateElementRef,
                        class: ["share-template", unref(theme).theme.value]
                      }, [
                        createVNode("div", { class: "content" }, [
                          createVNode("div", { class: "header" }, [
                            createVNode("h1", { class: "title" }, toDisplayString(__props.article.title), 1),
                            createVNode("p", { class: "meta-info" }, [
                              createVNode(_component_i18n, {
                                zh: "发布于 ",
                                en: "Created at "
                              }),
                              createVNode(_component_udate, {
                                to: "YMDm",
                                date: __props.article.created_at,
                                separator: "/"
                              }, null, 8, ["date"]),
                              createVNode(_component_divider, {
                                type: "vertical",
                                size: "sm"
                              }),
                              createVNode(_component_i18n, {
                                zh: `全文共 ${unref(numberSplit)(__props.article.content.length)} 字`,
                                en: `${unref(numberSplit)(__props.article.content.length)} characters`
                              }, null, 8, ["zh", "en"])
                            ]),
                            shareTemplateQRCode.value ? (openBlock(), createBlock(_component_uimage, {
                              key: 0,
                              class: "qrcode",
                              src: shareTemplateQRCode.value
                            }, null, 8, ["src"])) : createCommentVNode("", true)
                          ]),
                          createVNode(_sfc_main$1z, {
                            class: "markdown",
                            markdown: templateMarkdown.value,
                            "render-options": {
                              lazyLoadImage: false,
                              codeLineNumbers: false,
                              imageSourceGetter: unref(getOriginalProxyURL)
                            }
                          }, null, 8, ["markdown", "render-options"]),
                          isLongArticle.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "read-more-mask"
                          })) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "footer" }, [
                          createVNode("p", { class: "tip" }, [
                            createVNode(_component_i18n, {
                              zh: "长按识别二维码，阅读全文，参与评论",
                              en: "Long-press the QR code to read and discuss"
                            })
                          ]),
                          shareTemplateQRCode.value ? (openBlock(), createBlock(_component_uimage, {
                            key: 0,
                            class: "qrcode",
                            src: shareTemplateQRCode.value
                          }, null, 8, ["src"])) : createCommentVNode("", true),
                          createVNode(_component_uimage, {
                            class: "logo",
                            src: "/images/logo.svg"
                          })
                        ])
                      ], 2)) : createCommentVNode("", true),
                      createVNode(Transition, { name: "module" }, {
                        default: withCtx(() => [
                          !isRenderedShareImage.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "share-rendering"
                          }, [
                            createVNode(_component_loading_indicator, {
                              width: "1.8rem",
                              height: "1.2rem"
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      isRenderedShareImage.value ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "share-image"
                      }, [
                        createVNode("img", {
                          class: "image",
                          src: shareImageUrl.value,
                          alt: __props.article.title
                        }, null, 8, ["src", "alt"])
                      ])) : createCommentVNode("", true)
                    ], 2)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: shareImageVisibility.value,
                "scroll-close": false,
                onClose: closeImageSharePopup
              }, {
                default: withCtx(() => [
                  createVNode("div", {
                    class: ["share-as-image-modal", { rendered: isRenderedShareImage.value }]
                  }, [
                    !isRenderedShareImage.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      ref_key: "shareTemplateElementRef",
                      ref: shareTemplateElementRef,
                      class: ["share-template", unref(theme).theme.value]
                    }, [
                      createVNode("div", { class: "content" }, [
                        createVNode("div", { class: "header" }, [
                          createVNode("h1", { class: "title" }, toDisplayString(__props.article.title), 1),
                          createVNode("p", { class: "meta-info" }, [
                            createVNode(_component_i18n, {
                              zh: "发布于 ",
                              en: "Created at "
                            }),
                            createVNode(_component_udate, {
                              to: "YMDm",
                              date: __props.article.created_at,
                              separator: "/"
                            }, null, 8, ["date"]),
                            createVNode(_component_divider, {
                              type: "vertical",
                              size: "sm"
                            }),
                            createVNode(_component_i18n, {
                              zh: `全文共 ${unref(numberSplit)(__props.article.content.length)} 字`,
                              en: `${unref(numberSplit)(__props.article.content.length)} characters`
                            }, null, 8, ["zh", "en"])
                          ]),
                          shareTemplateQRCode.value ? (openBlock(), createBlock(_component_uimage, {
                            key: 0,
                            class: "qrcode",
                            src: shareTemplateQRCode.value
                          }, null, 8, ["src"])) : createCommentVNode("", true)
                        ]),
                        createVNode(_sfc_main$1z, {
                          class: "markdown",
                          markdown: templateMarkdown.value,
                          "render-options": {
                            lazyLoadImage: false,
                            codeLineNumbers: false,
                            imageSourceGetter: unref(getOriginalProxyURL)
                          }
                        }, null, 8, ["markdown", "render-options"]),
                        isLongArticle.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "read-more-mask"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "footer" }, [
                        createVNode("p", { class: "tip" }, [
                          createVNode(_component_i18n, {
                            zh: "长按识别二维码，阅读全文，参与评论",
                            en: "Long-press the QR code to read and discuss"
                          })
                        ]),
                        shareTemplateQRCode.value ? (openBlock(), createBlock(_component_uimage, {
                          key: 0,
                          class: "qrcode",
                          src: shareTemplateQRCode.value
                        }, null, 8, ["src"])) : createCommentVNode("", true),
                        createVNode(_component_uimage, {
                          class: "logo",
                          src: "/images/logo.svg"
                        })
                      ])
                    ], 2)) : createCommentVNode("", true),
                    createVNode(Transition, { name: "module" }, {
                      default: withCtx(() => [
                        !isRenderedShareImage.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "share-rendering"
                        }, [
                          createVNode(_component_loading_indicator, {
                            width: "1.8rem",
                            height: "1.2rem"
                          })
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    isRenderedShareImage.value ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "share-image"
                    }, [
                      createVNode("img", {
                        class: "image",
                        src: shareImageUrl.value,
                        alt: __props.article.title
                      }, null, 8, ["src", "alt"])
                    ])) : createCommentVNode("", true)
                  ], 2)
                ]),
                _: 1
              }, 8, ["visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/share.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const ArticleShare = /* @__PURE__ */ _export_sfc(_sfc_main$1m, [["__scopeId", "data-v-0eb022b7"]]);
const _sfc_main$1l = /* @__PURE__ */ defineComponent({
  __name: "meta",
  __ssrInlineRender: true,
  props: {
    article: {},
    plain: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const articleURL = computed(() => {
      return getPageURL(getArticleDetailRoute(props.article.id));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      const _component_udate = resolveComponent("udate");
      const _component_divider = resolveComponent("divider");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["meta", { plain: _ctx.plain }]
      }, _attrs))} data-v-16245e49><div class="actions" data-v-16245e49>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
      _push(`</div><div class="line" data-v-16245e49>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "本文于",
        en: "Published at"
      }, null, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "link date",
        title: _ctx.article.created_at,
        to: unref(getDateFlowRoute)(unref(dateToYMD)(new Date(_ctx.article.created_at)))
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_udate, {
              to: "YMDm",
              date: _ctx.article.created_at,
              separator: "/"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_udate, {
                to: "YMDm",
                date: _ctx.article.created_at,
                separator: "/"
              }, null, 8, ["date"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_i18n, {
        zh: "发布在",
        en: "in"
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(_ctx.article.categories, (category, index) => {
        _push(`<span data-v-16245e49>`);
        _push(ssrRenderComponent(_component_router_link, {
          class: "link category",
          title: `${unref(firstUpperCase)(category.slug)} | ${category.description}`,
          to: unref(getCategoryFlowRoute)(category.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_i18n, {
                zh: category.name,
                en: unref(firstUpperCase)(category.slug)
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_i18n, {
                  zh: category.name,
                  en: unref(firstUpperCase)(category.slug)
                }, null, 8, ["zh", "en"])
              ];
            }
          }),
          _: 2
        }, _parent));
        if (_ctx.article.categories[index + 1]) {
          _push(`<span data-v-16245e49>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: "、",
            en: ","
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]-->`);
      if (!_ctx.article.categories.length) {
        _push(`<span data-v-16245e49>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "未知分类下",
          en: "(no catgory)"
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.plain) {
        _push(`<br data-v-16245e49>`);
      } else {
        _push(ssrRenderComponent(_component_divider, {
          type: "vertical",
          size: "sm"
        }, null, _parent));
      }
      _push(`<!--[-->`);
      ssrRenderList(_ctx.article.tags, (tag, index) => {
        _push(`<span data-v-16245e49>`);
        _push(ssrRenderComponent(_component_router_link, {
          class: "link tag",
          title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
          to: unref(getTagFlowRoute)(tag.slug)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_i18n, {
                zh: `#${tag.name}`,
                en: `#${unref(getTagEnName)(tag)}`
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_i18n, {
                  zh: `#${tag.name}`,
                  en: `#${unref(getTagEnName)(tag)}`
                }, null, 8, ["zh", "en"])
              ];
            }
          }),
          _: 2
        }, _parent));
        if (_ctx.article.tags[index + 1]) {
          _push(`<span data-v-16245e49>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: "、",
            en: ","
          }, null, _parent));
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span>`);
      });
      _push(`<!--]--></div><div class="line" data-v-16245e49><i class="icon iconfont icon-creative-commons" data-v-16245e49></i>`);
      _push(ssrRenderComponent(_component_i18n, null, {
        zh: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link copyright",
              href: "https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 署名 - 非商业性使用 4.0 国际 `);
                } else {
                  return [
                    createTextVNode(" 署名 - 非商业性使用 4.0 国际 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ulink, {
                class: "link copyright",
                href: "https://creativecommons.org/licenses/by-nc/4.0/deed.zh-hans"
              }, {
                default: withCtx(() => [
                  createTextVNode(" 署名 - 非商业性使用 4.0 国际 ")
                ]),
                _: 1
              })
            ];
          }
        }),
        en: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link copyright",
              href: "https://creativecommons.org/licenses/by-nc/4.0/deed.en"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Creative Commons BY-NC 4.0 `);
                } else {
                  return [
                    createTextVNode(" Creative Commons BY-NC 4.0 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ulink, {
                class: "link copyright",
                href: "https://creativecommons.org/licenses/by-nc/4.0/deed.en"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Creative Commons BY-NC 4.0 ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.plain) {
        _push(`<br data-v-16245e49>`);
      } else {
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
      }
      _push(`<span class="link permalink" data-v-16245e49>${ssrInterpolate(articleURL.value)}</span></div></div>`);
    };
  }
});
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/meta.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const ArticleMeta = /* @__PURE__ */ _export_sfc(_sfc_main$1l, [["__scopeId", "data-v-16245e49"]]);
const _sfc_main$1k = /* @__PURE__ */ defineComponent({
  __name: "upvote",
  __ssrInlineRender: true,
  props: {
    likes: {},
    isLiked: { type: Boolean },
    hiddenSponsor: { type: Boolean },
    enabledParkinson: { type: Boolean }
  },
  setup(__props, { emit: __emit }) {
    const newLiked = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "upvote" }, _attrs))} data-v-aebfd35f><div class="wrapper" data-v-aebfd35f><button class="${ssrRenderClass([{ liked: _ctx.isLiked, parkinson: _ctx.enabledParkinson, newliked: newLiked.value }, "button like"])}"${ssrIncludeBooleanAttr(_ctx.isLiked) ? " disabled" : ""} data-v-aebfd35f><i class="icon iconfont icon-like" data-v-aebfd35f></i><span class="text" data-v-aebfd35f>`);
      _push(ssrRenderComponent(_component_i18n, null, {
        zh: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`真棒！${ssrInterpolate(_ctx.likes)}`);
          } else {
            return [
              createTextVNode("真棒！" + toDisplayString(_ctx.likes), 1)
            ];
          }
        }),
        en: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.isLiked ? "Upvoted" : "Upvote")} ${ssrInterpolate(_ctx.likes)}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.isLiked ? "Upvoted" : "Upvote") + " " + toDisplayString(_ctx.likes), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span>`);
      if (_ctx.enabledParkinson) {
        _push(`<!--[--><span class="parkinson-mask" data-v-aebfd35f><i class="${ssrRenderClass([newLiked.value ? "icon-like" : "icon-like-pre", "iconfont"])}" data-v-aebfd35f></i></span><div class="parkinson-likes" data-v-aebfd35f>+ 1</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (!_ctx.hiddenSponsor) {
        _push(`<button class="button sponsor" data-v-aebfd35f><i class="icon iconfont icon-peachblossom" data-v-aebfd35f></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/upvote.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const ArticleUpvote = /* @__PURE__ */ _export_sfc(_sfc_main$1k, [["__scopeId", "data-v-aebfd35f"]]);
const _sfc_main$1j = /* @__PURE__ */ defineComponent({
  __name: "related",
  __ssrInlineRender: true,
  props: {
    articles: { default: () => [] },
    columns: { default: 4 },
    count: { default: 8 }
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain } = useEnhancer();
    const getThumbnailURL = (url, format) => {
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(getStaticPath(url), {
          resize: true,
          width: 466,
          height: 168,
          format
        })
      );
    };
    const articleList = computed(() => {
      const articles = [...props.articles].slice(0, props.count);
      if (articles.length >= props.count) {
        return articles;
      }
      return [
        ...articles,
        ...new Array(props.count - articles.length).fill({
          _id: "",
          id: null,
          title: "-",
          description: "",
          thumbnail: null
        })
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "related" }, _attrs))} data-v-0b3c3a9f><ul class="articles" style="${ssrRenderStyle({ gridTemplateColumns: `repeat(${_ctx.columns}, 1fr)` })}" data-v-0b3c3a9f><!--[-->`);
      ssrRenderList(articleList.value, (article, index) => {
        _push(`<li class="${ssrRenderClass([{ disabled: !article.id }, "item"])}" data-v-0b3c3a9f>`);
        _push(ssrRenderComponent(_component_router_link, {
          class: "item-article",
          title: article.title,
          to: unref(getArticleDetailRoute)(article.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<picture class="thumbnail" data-v-0b3c3a9f${_scopeId}>`);
              if (unref(isOriginalStaticURL)(article.thumbnail)) {
                _push2(`<!--[--><source${ssrRenderAttr("srcset", getThumbnailURL(article.thumbnail, "avif"))} type="image/avif" data-v-0b3c3a9f${_scopeId}><source${ssrRenderAttr("srcset", getThumbnailURL(article.thumbnail, "webp"))} type="image/webp" data-v-0b3c3a9f${_scopeId}><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              if (article.thumbnail) {
                _push2(`<img class="image" loading="lazy" draggable="false"${ssrRenderAttr("alt", article.title)}${ssrRenderAttr("src", unref(isOriginalStaticURL)(article.thumbnail) ? getThumbnailURL(article.thumbnail) : article.thumbnail)} data-v-0b3c3a9f${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</picture><div class="title" data-v-0b3c3a9f${_scopeId}>${ssrInterpolate(article.title)}</div><div class="description"${ssrRenderAttr("title", article.description)} data-v-0b3c3a9f${_scopeId}>${ssrInterpolate(article.description)}</div>`);
            } else {
              return [
                createVNode("picture", { class: "thumbnail" }, [
                  unref(isOriginalStaticURL)(article.thumbnail) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("source", {
                      srcset: getThumbnailURL(article.thumbnail, "avif"),
                      type: "image/avif"
                    }, null, 8, ["srcset"]),
                    createVNode("source", {
                      srcset: getThumbnailURL(article.thumbnail, "webp"),
                      type: "image/webp"
                    }, null, 8, ["srcset"])
                  ], 64)) : createCommentVNode("", true),
                  article.thumbnail ? (openBlock(), createBlock("img", {
                    key: 1,
                    class: "image",
                    loading: "lazy",
                    draggable: "false",
                    alt: article.title,
                    src: unref(isOriginalStaticURL)(article.thumbnail) ? getThumbnailURL(article.thumbnail) : article.thumbnail
                  }, null, 8, ["alt", "src"])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "title" }, toDisplayString(article.title), 1),
                createVNode("div", {
                  class: "description",
                  title: article.description
                }, toDisplayString(article.description), 9, ["title"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/related.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const ArticleRelated = /* @__PURE__ */ _export_sfc(_sfc_main$1j, [["__scopeId", "data-v-0b3c3a9f"]]);
const _sfc_main$1i = /* @__PURE__ */ defineComponent({
  __name: "neighbour",
  __ssrInlineRender: true,
  props: {
    prev: {},
    next: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "neighbour" }, _attrs))} data-v-3b04b0c7>`);
      if (_ctx.prev) {
        _push(ssrRenderComponent(_component_router_link, {
          class: "link prev",
          title: _ctx.prev.title,
          to: unref(getArticleDetailRoute)(_ctx.prev.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="icon" data-v-3b04b0c7${_scopeId}><i class="iconfont icon-prev" data-v-3b04b0c7${_scopeId}></i></div><div class="content" data-v-3b04b0c7${_scopeId}><p class="title" data-v-3b04b0c7${_scopeId}>${ssrInterpolate(_ctx.prev.title)}</p><p class="description" data-v-3b04b0c7${_scopeId}>${ssrInterpolate(_ctx.prev.description)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "icon" }, [
                  createVNode("i", { class: "iconfont icon-prev" })
                ]),
                createVNode("div", { class: "content" }, [
                  createVNode("p", { class: "title" }, toDisplayString(_ctx.prev.title), 1),
                  createVNode("p", { class: "description" }, toDisplayString(_ctx.prev.description), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="null" data-v-3b04b0c7>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "已是最早",
          en: "NULL"
        }, null, _parent));
        _push(`</div>`);
      }
      if (_ctx.next) {
        _push(ssrRenderComponent(_component_router_link, {
          class: "link next",
          title: _ctx.next.title,
          to: unref(getArticleDetailRoute)(_ctx.next.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="content" data-v-3b04b0c7${_scopeId}><p class="title" data-v-3b04b0c7${_scopeId}>${ssrInterpolate(_ctx.next.title)}</p><p class="description" data-v-3b04b0c7${_scopeId}>${ssrInterpolate(_ctx.next.description)}</p></div><div class="icon" data-v-3b04b0c7${_scopeId}><i class="iconfont icon-next" data-v-3b04b0c7${_scopeId}></i></div>`);
            } else {
              return [
                createVNode("div", { class: "content" }, [
                  createVNode("p", { class: "title" }, toDisplayString(_ctx.next.title), 1),
                  createVNode("p", { class: "description" }, toDisplayString(_ctx.next.description), 1)
                ]),
                createVNode("div", { class: "icon" }, [
                  createVNode("i", { class: "iconfont icon-next" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="null" data-v-3b04b0c7>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "已是最新",
          en: "NULL"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/neighbour.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const ArticleNeighbour = /* @__PURE__ */ _export_sfc(_sfc_main$1i, [["__scopeId", "data-v-3b04b0c7"]]);
const _sfc_main$1h = /* @__PURE__ */ defineComponent({
  __name: "chatgpt",
  __ssrInlineRender: true,
  props: {
    gptId: {},
    gptResponse: {},
    gptModel: {},
    gptTimestamp: {},
    hiddenAvatar: { type: Boolean }
  },
  emits: ["click-link"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleLinkClick = () => {
      emit("click-link");
    };
    const avatarURL = computed(() => {
      const fileName = props.gptModel?.includes("4") ? "4.0" : "3.5";
      return `/images/chatgpt/${fileName}.png`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["gpt-comment", { "hide-avatar": _ctx.hiddenAvatar }]
      }, _attrs))} data-v-8ddf8471>`);
      if (!_ctx.hiddenAvatar) {
        _push(`<div class="gpt-avatar" data-v-8ddf8471>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "link",
          href: unref(getChatGPTShareURL)(_ctx.gptId),
          onClick: handleLinkClick
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_uimage, {
                cdn: "",
                src: avatarURL.value,
                alt: _ctx.gptModel,
                draggable: "false"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_uimage, {
                  cdn: "",
                  src: avatarURL.value,
                  alt: _ctx.gptModel,
                  draggable: "false"
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="gpt-body" data-v-8ddf8471><div class="gpt-header" data-v-8ddf8471><div class="left" data-v-8ddf8471>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "username",
        href: unref(getChatGPTShareURL)(_ctx.gptId),
        onClick: handleLinkClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`ChatGPT`);
          } else {
            return [
              createTextVNode("ChatGPT")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.gptModel) {
        _push(`<span class="model" data-v-8ddf8471><i class="iconfont icon-cpu" data-v-8ddf8471></i><span data-v-8ddf8471>${ssrInterpolate(_ctx.gptModel)}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="right" data-v-8ddf8471>`);
      if (_ctx.gptTimestamp) {
        _push(`<span class="created" data-allow-mismatch data-v-8ddf8471>`);
        _push(ssrRenderComponent(_component_udate, {
          date: Number(_ctx.gptTimestamp) * 1e3,
          to: "ago"
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="gpt-content" data-v-8ddf8471><div class="markdown" data-v-8ddf8471>`);
      _push(ssrRenderComponent(_sfc_main$1z, {
        markdown: props.gptResponse,
        compact: true,
        "render-options": { sanitize: true }
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/chatgpt.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const ArticleChatgpt = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["__scopeId", "data-v-8ddf8471"]]);
const _sfc_main$1g = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    articleId: {},
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, route, globalState } = useEnhancer();
    const { identity, comment: commentStore, articleDetail: articleDetailStore } = useStores();
    const { article, fetching, prevArticle, nextArticle, relatedArticles } = storeToRefs(articleDetailStore);
    const isLiked = computed(() => Boolean(article.value && identity.isLikedPage(article.value.id)));
    const articleExtends = computed(() => article.value?.extends || []);
    const articleGPTId = computed(() => getExtendValue(articleExtends.value, "chatgpt-conversation-id"));
    const articleGPTResponse = computed(() => getExtendValue(articleExtends.value, "chatgpt-conversation-response"));
    const articleGPTTimestamp = computed(() => getExtendValue(articleExtends.value, "chatgpt-conversation-timestamp"));
    const articleGPTModel = computed(() => getExtendValue(articleExtends.value, "chatgpt-conversation-model"));
    const handleCommentTopBarChatGPTClick = () => {
    };
    const handleCommentUsernameChatGPTClick = () => {
    };
    const handleSponsor = () => {
      globalState.toggleSwitcher("sponsor", true);
    };
    const handleLike = async (callback) => {
      if (isLiked.value) {
        return false;
      }
      try {
        await articleDetailStore.postArticleLike(article.value.id);
        identity.likePage(article.value.id);
        callback?.();
      } catch (error) {
        const message = _i18n.t(LocaleKey.POST_ACTION_ERROR);
        logger$1.failure(message, error);
        alert(message);
      }
    };
    const fetchArticleDetail = (articleId) => {
      const commentRequest = commentStore.fetchList({ post_id: articleId });
      const articleRequest = articleDetailStore.fetchCompleteArticle(articleId);
      return Promise.all([articleRequest, commentRequest]);
    };
    const customElementsStyle = shallowRef(null);
    const handleContentRendered = (element) => {
      CUSTOM_ELEMENTS.verse.effect?.(element);
      customElementsStyle.value = CUSTOM_ELEMENTS.verse.style?.(element) ?? null;
    };
    useHead(() => ({
      style: customElementsStyle.value ? [{ children: customElementsStyle.value }] : []
    }));
    usePageSeo(() => ({
      pageTitle: article.value?.title,
      description: article.value?.description,
      keywords: article.value?.keywords?.join(",") || article.value?.title,
      ogType: "article",
      ogImage: article.value?.thumbnail,
      ogImageWidth: 1190,
      ogImageHeight: 420,
      articleTags: article.value?.tags.map((tag) => tag.name),
      articleModifiedTime: article.value?.updated_at,
      articlePublishedTime: article.value?.created_at
    }));
    useUniversalFetch(() => {
      return fetchArticleDetail(props.articleId);
    });
    onBeforeMount(() => {
      watch(
        () => props.articleId,
        (articleId) => fetchArticleDetail(articleId),
        { flush: "post" }
      );
    });
    onMounted(() => {
      const urlHash = route.hash.slice(1);
      if (!urlHash) return;
      const articleHeadings = [
        ...articleDetailStore.defaultContent?.headings ?? [],
        ...articleDetailStore.moreContent?.headings ?? []
      ];
      const elementId = urlHash === COMMENTS_URL_HASH ? COMMENT_ELEMENT_ID : articleHeadings.find(({ anchor }) => anchor === urlHash)?.id;
      if (elementId && document.getElementById(elementId)) {
        setTimeout(() => scrollToAnchor(elementId), 400);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-page" }, _attrs))} data-v-75f23f09>`);
      _push(ssrRenderComponent(_component_placeholder, { loading: unref(fetching) }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ArticleSkeleton, {
              "social-count": _ctx.isMobile ? 3 : 8,
              "related-count": _ctx.isMobile ? 2 : 3
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ArticleSkeleton, {
                "social-count": _ctx.isMobile ? 3 : 8,
                "related-count": _ctx.isMobile ? 2 : 3
              }, null, 8, ["social-count", "related-count"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(article)) {
              _push2(`<div data-v-75f23f09${_scopeId}><div class="module margin background overflow" data-v-75f23f09${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleContent, {
                id: ARTICLE_CONTENT_ELEMENT_ID,
                "readmore-id": ARTICLE_READMORE_ELEMENT_ID,
                article: unref(article),
                onRendered: handleContentRendered
              }, null, _parent2, _scopeId));
              _push2(`<div class="divider" data-v-75f23f09${_scopeId}></div>`);
              _push2(ssrRenderComponent(ArticleMeta, {
                id: ARTICLE_META_ELEMENT_ID,
                article: unref(article),
                plain: _ctx.isMobile
              }, {
                action: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(ArticleUpvote, {
                      likes: unref(article).meta.likes,
                      "is-liked": isLiked.value,
                      "hidden-sponsor": _ctx.isMobile,
                      "enabled-parkinson": !_ctx.isMobile && (unref(globalState).userAgent.isChrome || unref(globalState).userAgent.isFirefox),
                      onLike: handleLike,
                      onSponsor: handleSponsor
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(ArticleUpvote, {
                        likes: unref(article).meta.likes,
                        "is-liked": isLiked.value,
                        "hidden-sponsor": _ctx.isMobile,
                        "enabled-parkinson": !_ctx.isMobile && (unref(globalState).userAgent.isChrome || unref(globalState).userAgent.isFirefox),
                        onLike: handleLike,
                        onSponsor: handleSponsor
                      }, null, 8, ["likes", "is-liked", "hidden-sponsor", "enabled-parkinson"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="module margin background" data-v-75f23f09${_scopeId}><div class="bridge left" data-v-75f23f09${_scopeId}></div><div class="bridge right" data-v-75f23f09${_scopeId}></div>`);
              _push2(ssrRenderComponent(ArticleShare, {
                id: ARTICLE_SHARE_ELEMENT_ID,
                article: unref(article),
                "disabled-image-share": _ctx.isMobile,
                socials: _ctx.isMobile ? [unref(SocialMedia).Wechat, unref(SocialMedia).Weibo, unref(SocialMedia).Twitter] : []
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="module margin overflow" data-v-75f23f09${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleNeighbour, {
                prev: unref(prevArticle),
                next: unref(nextArticle)
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="module margin overflow" data-v-75f23f09${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleRelated, {
                id: ARTICLE_RELATED_ELEMENT_ID,
                columns: _ctx.isMobile ? 2 : 3,
                count: _ctx.isMobile ? 4 : 6,
                articles: unref(relatedArticles)
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(article) ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "module margin background overflow" }, [
                  createVNode(ArticleContent, {
                    id: ARTICLE_CONTENT_ELEMENT_ID,
                    "readmore-id": ARTICLE_READMORE_ELEMENT_ID,
                    article: unref(article),
                    onRendered: handleContentRendered
                  }, null, 8, ["id", "readmore-id", "article"]),
                  createVNode("div", { class: "divider" }),
                  createVNode(ArticleMeta, {
                    id: ARTICLE_META_ELEMENT_ID,
                    article: unref(article),
                    plain: _ctx.isMobile
                  }, {
                    action: withCtx(() => [
                      createVNode(ArticleUpvote, {
                        likes: unref(article).meta.likes,
                        "is-liked": isLiked.value,
                        "hidden-sponsor": _ctx.isMobile,
                        "enabled-parkinson": !_ctx.isMobile && (unref(globalState).userAgent.isChrome || unref(globalState).userAgent.isFirefox),
                        onLike: handleLike,
                        onSponsor: handleSponsor
                      }, null, 8, ["likes", "is-liked", "hidden-sponsor", "enabled-parkinson"])
                    ]),
                    _: 1
                  }, 8, ["id", "article", "plain"])
                ]),
                createVNode("div", { class: "module margin background" }, [
                  createVNode("div", { class: "bridge left" }),
                  createVNode("div", { class: "bridge right" }),
                  createVNode(ArticleShare, {
                    id: ARTICLE_SHARE_ELEMENT_ID,
                    article: unref(article),
                    "disabled-image-share": _ctx.isMobile,
                    socials: _ctx.isMobile ? [unref(SocialMedia).Wechat, unref(SocialMedia).Weibo, unref(SocialMedia).Twitter] : []
                  }, null, 8, ["id", "article", "disabled-image-share", "socials"])
                ]),
                createVNode("div", { class: "module margin overflow" }, [
                  createVNode(ArticleNeighbour, {
                    prev: unref(prevArticle),
                    next: unref(nextArticle)
                  }, null, 8, ["prev", "next"])
                ]),
                createVNode("div", { class: "module margin overflow" }, [
                  createVNode(ArticleRelated, {
                    id: ARTICLE_RELATED_ELEMENT_ID,
                    columns: _ctx.isMobile ? 2 : 3,
                    count: _ctx.isMobile ? 4 : 6,
                    articles: unref(relatedArticles)
                  }, null, 8, ["id", "columns", "count", "articles"])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="comment" data-v-75f23f09>`);
      _push(ssrRenderComponent(Comment, {
        plain: _ctx.isMobile,
        fetching: unref(fetching),
        "post-id": _ctx.articleId
      }, createSlots({ _: 2 }, [
        articleGPTId.value ? {
          name: "topbar-extra",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_ulink, {
                class: "chat-gpt-link",
                href: unref(getChatGPTShareURL)(articleGPTId.value),
                onClick: handleCommentTopBarChatGPTClick
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="iconfont icon-chat-gpt" data-v-75f23f09${_scopeId2}></i>`);
                  } else {
                    return [
                      createVNode("i", { class: "iconfont icon-chat-gpt" })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_ulink, {
                  class: "chat-gpt-link",
                  href: unref(getChatGPTShareURL)(articleGPTId.value),
                  onClick: handleCommentTopBarChatGPTClick
                }, {
                  default: withCtx(() => [
                    createVNode("i", { class: "iconfont icon-chat-gpt" })
                  ]),
                  _: 1
                }, 8, ["href"])
              ];
            }
          }),
          key: "0"
        } : void 0,
        articleGPTId.value && articleGPTResponse.value ? {
          name: "list-top-extra",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(ArticleChatgpt, {
                "gpt-id": articleGPTId.value,
                "gpt-response": articleGPTResponse.value,
                "gpt-timestamp": articleGPTTimestamp.value,
                "gpt-model": articleGPTModel.value,
                "hidden-avatar": _ctx.isMobile,
                onClickLink: handleCommentUsernameChatGPTClick
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(ArticleChatgpt, {
                  "gpt-id": articleGPTId.value,
                  "gpt-response": articleGPTResponse.value,
                  "gpt-timestamp": articleGPTTimestamp.value,
                  "gpt-model": articleGPTModel.value,
                  "hidden-avatar": _ctx.isMobile,
                  onClickLink: handleCommentUsernameChatGPTClick
                }, null, 8, ["gpt-id", "gpt-response", "gpt-timestamp", "gpt-model", "hidden-avatar"])
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/index.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const ArticleDetailPage = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["__scopeId", "data-v-75f23f09"]]);
const StatisticCount = defineComponent({
  name: "StatisticCount",
  props: {
    count: [Number, String],
    primary: Boolean,
    large: Boolean,
    kilo: Boolean,
    split: Boolean
  },
  render() {
    const number = Number(this.$props.count);
    const content = this.kilo ? numberToKilo(number) : this.split ? numberSplit(number) : String(number);
    const classNames = { primary: this.$props.primary, large: this.large };
    return h("span", { class: ["count", classNames] }, content);
  }
});
const _sfc_main$1f = /* @__PURE__ */ defineComponent({
  __name: "base",
  __ssrInlineRender: true,
  props: {
    brand: {},
    icon: {},
    platform: {},
    href: {},
    fetching: { type: Boolean },
    data: {}
  },
  setup(__props) {
    const { isDarkTheme } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_empty = resolveComponent("empty");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["statistic", [_ctx.brand, { dark: unref(isDarkTheme) }]]
      }, _attrs))} data-v-9de8a844>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: _ctx.fetching,
        data: _ctx.data
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="skeletons" data-v-9de8a844${_scopeId}><!--[-->`);
            ssrRenderList(3, (i) => {
              _push2(ssrRenderComponent(_component_skeleton_base, {
                key: i,
                class: "item"
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "skeletons" }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                  return createVNode(_component_skeleton_base, {
                    key: i,
                    class: "item"
                  });
                }), 64))
              ])
            ];
          }
        }),
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              bold: "",
              size: "large"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                bold: "",
                size: "large"
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content" data-v-9de8a844${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "title",
              href: _ctx.href
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="left" data-v-9de8a844${_scopeId2}><i class="${ssrRenderClass([_ctx.icon, "iconfont"])}" data-v-9de8a844${_scopeId2}></i><span class="text" data-v-9de8a844${_scopeId2}>${ssrInterpolate(_ctx.platform)}</span></span><span class="right" data-v-9de8a844${_scopeId2}><i class="iconfont icon-next" data-v-9de8a844${_scopeId2}></i></span>`);
                } else {
                  return [
                    createVNode("span", { class: "left" }, [
                      createVNode("i", {
                        class: ["iconfont", _ctx.icon]
                      }, null, 2),
                      createVNode("span", { class: "text" }, toDisplayString(_ctx.platform), 1)
                    ]),
                    createVNode("span", { class: "right" }, [
                      createVNode("i", { class: "iconfont icon-next" })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "content" }, [
                createVNode(_component_ulink, {
                  class: "title",
                  href: _ctx.href
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "left" }, [
                      createVNode("i", {
                        class: ["iconfont", _ctx.icon]
                      }, null, 2),
                      createVNode("span", { class: "text" }, toDisplayString(_ctx.platform), 1)
                    ]),
                    createVNode("span", { class: "right" }, [
                      createVNode("i", { class: "iconfont icon-next" })
                    ])
                  ]),
                  _: 1
                }, 8, ["href"]),
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/base.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const StatisticBase = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["__scopeId", "data-v-9de8a844"]]);
const _sfc_main$1e = /* @__PURE__ */ defineComponent({
  __name: "npm",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const { isZhLang } = useEnhancer();
    const store = useNpmStatisticStore();
    const fetching = ref(true);
    onMounted(() => {
      store.fetch().finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StatisticBase, mergeProps({
        brand: "npm",
        icon: "icon-npm",
        data: unref(store).data,
        fetching: fetching.value,
        href: unref(goLink).map.npm,
        platform: unref(isZhLang) ? "我在 NPM" : "NPM"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="line-1" data-v-62acb73d${_scopeId}><i class="iconfont icon-package" data-v-62acb73d${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-62acb73d${_scopeId}>发布了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(store).data?.totalPackages
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-62acb73d${_scopeId}>个公共软件包</span>`);
            } else {
              _push2(`<span data-v-62acb73d${_scopeId}>packages</span>`);
            }
            _push2(`</p><p data-v-62acb73d${_scopeId}><i class="iconfont icon-download" data-v-62acb73d${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-62acb73d${_scopeId}>被下载</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(store).data?.totalDownloads
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-62acb73d${_scopeId}>次</span>`);
            } else {
              _push2(`<span data-v-62acb73d${_scopeId}>downs</span>`);
            }
            _push2(`</p><p data-v-62acb73d${_scopeId}><i class="iconfont icon-score" data-v-62acb73d${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-62acb73d${_scopeId}>平均评分</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(store).data?.averageScore
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-62acb73d${_scopeId}>分</span>`);
            } else {
              _push2(`<span data-v-62acb73d${_scopeId}>average score</span>`);
            }
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", { class: "line-1" }, [
                createVNode("i", { class: "iconfont icon-package" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "发布了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(store).data?.totalPackages
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个公共软件包")) : (openBlock(), createBlock("span", { key: 2 }, "packages"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-download" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "被下载")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  large: "",
                  primary: "",
                  split: "",
                  count: unref(store).data?.totalDownloads
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "次")) : (openBlock(), createBlock("span", { key: 2 }, "downs"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-score" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "平均评分")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(store).data?.averageScore
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "分")) : (openBlock(), createBlock("span", { key: 2 }, "average score"))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/npm.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const NpmStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["__scopeId", "data-v-62acb73d"]]);
const _sfc_main$1d = /* @__PURE__ */ defineComponent({
  __name: "github",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const { isZhLang } = useEnhancer();
    const store = useGitHubStatisticStore();
    const fetching = ref(true);
    onMounted(() => {
      store.fetch().finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StatisticBase, mergeProps({
        brand: "github",
        icon: "icon-github",
        data: unref(store).data,
        fetching: fetching.value,
        href: unref(goLink).map.github,
        platform: unref(isZhLang) ? "我在 GitHub" : "GitHub"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}><i class="iconfont icon-star-outlined"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>共获得</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(store).data?.totalStarCount
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>个 star</span>`);
            } else {
              _push2(`<span${_scopeId}>stars earned</span>`);
            }
            _push2(`</p><p${_scopeId}><i class="iconfont icon-repository"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>共维护</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(store).data?.repositoryCount
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>个开源项目</span>`);
            } else {
              _push2(`<span${_scopeId}>open-source repos</span>`);
            }
            _push2(`</p><p${_scopeId}><i class="iconfont icon-organization"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>维护/发起</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(store).data?.organizationCount
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>个开源组织</span>`);
            } else {
              _push2(`<span${_scopeId}>organizations</span>`);
            }
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-star-outlined" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "共获得")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  large: "",
                  primary: "",
                  split: "",
                  count: unref(store).data?.totalStarCount
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个 star")) : (openBlock(), createBlock("span", { key: 2 }, "stars earned"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-repository" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "共维护")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(store).data?.repositoryCount
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个开源项目")) : (openBlock(), createBlock("span", { key: 2 }, "open-source repos"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-organization" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "维护/发起")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(store).data?.organizationCount
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个开源组织")) : (openBlock(), createBlock("span", { key: 2 }, "organizations"))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/github.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const _sfc_main$1c = /* @__PURE__ */ defineComponent({
  __name: "threads",
  __ssrInlineRender: true,
  setup(__props) {
    const { isZhLang } = useEnhancer();
    const { goLink, threadsProfile } = useStores();
    const fetching = ref(true);
    const joinedDate = /* @__PURE__ */ new Date("2024-07-06");
    const now = /* @__PURE__ */ new Date();
    const years = now.getFullYear() - joinedDate.getFullYear();
    const months = now.getMonth() - joinedDate.getMonth();
    let totalYears = years;
    let totalMonths = months;
    if (months < 0) {
      totalYears -= 1;
      totalMonths += 12;
    }
    onMounted(() => {
      threadsProfile.fetch().finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(ssrRenderComponent(StatisticBase, mergeProps({
        brand: "threads",
        icon: "icon-threads",
        fetching: fetching.value,
        data: unref(threadsProfile).data,
        href: unref(goLink).map.threads,
        platform: unref(isZhLang) ? "我在 Threads" : "Threads"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}><i class="iconfont icon-calendar"${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>活跃了`);
                  _push3(ssrRenderComponent(unref(StatisticCount), { count: unref(totalYears) }, null, _parent3, _scopeId2));
                  _push3(`年</span><span${_scopeId2}>零`);
                  _push3(ssrRenderComponent(unref(StatisticCount), { count: unref(totalMonths) }, null, _parent3, _scopeId2));
                  _push3(`个月</span>`);
                } else {
                  return [
                    createVNode("span", null, [
                      createTextVNode("活跃了"),
                      createVNode(unref(StatisticCount), { count: unref(totalYears) }, null, 8, ["count"]),
                      createTextVNode("年")
                    ]),
                    createVNode("span", null, [
                      createTextVNode("零"),
                      createVNode(unref(StatisticCount), { count: unref(totalMonths) }, null, 8, ["count"]),
                      createTextVNode("个月")
                    ])
                  ];
                }
              }),
              en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Joined ${ssrInterpolate(unref(joinedDate)?.toLocaleDateString("en-US", { year: "numeric", month: "long" }))}`);
                } else {
                  return [
                    createTextVNode(" Joined " + toDisplayString(unref(joinedDate)?.toLocaleDateString("en-US", { year: "numeric", month: "long" })), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p><p${_scopeId}><i class="iconfont icon-threads"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>发布了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: "NaN"
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>篇帖子</span>`);
            } else {
              _push2(`<span${_scopeId}>threads</span>`);
            }
            _push2(`</p><p${_scopeId}><i class="iconfont icon-follower"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>获得了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              split: "",
              count: unref(threadsProfile).data?.followersCount || "-"
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>位关注者</span>`);
            } else {
              _push2(`<span${_scopeId}>followers</span>`);
            }
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-calendar" }),
                createVNode(_component_i18n, null, {
                  zh: withCtx(() => [
                    createVNode("span", null, [
                      createTextVNode("活跃了"),
                      createVNode(unref(StatisticCount), { count: unref(totalYears) }, null, 8, ["count"]),
                      createTextVNode("年")
                    ]),
                    createVNode("span", null, [
                      createTextVNode("零"),
                      createVNode(unref(StatisticCount), { count: unref(totalMonths) }, null, 8, ["count"]),
                      createTextVNode("个月")
                    ])
                  ]),
                  en: withCtx(() => [
                    createTextVNode(" Joined " + toDisplayString(unref(joinedDate)?.toLocaleDateString("en-US", { year: "numeric", month: "long" })), 1)
                  ]),
                  _: 1
                })
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-threads" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "发布了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  large: "",
                  primary: "",
                  split: "",
                  count: "NaN"
                }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "篇帖子")) : (openBlock(), createBlock("span", { key: 2 }, "threads"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-follower" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "获得了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  split: "",
                  count: unref(threadsProfile).data?.followersCount || "-"
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "位关注者")) : (openBlock(), createBlock("span", { key: 2 }, "followers"))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/threads.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  __name: "douban",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const { isZhLang } = useEnhancer();
    const store = useDoubanMoviesStore();
    const totalSpent = computed(() => Math.trunc(store.data?.total_spent ?? 0));
    const weeklyAvg = computed(() => (store.data?.weekly_avg ?? 0).toFixed(2));
    const fetching = ref(true);
    onMounted(() => {
      store.fetch().finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(ssrRenderComponent(StatisticBase, mergeProps({
        brand: "douban",
        icon: "icon-douban",
        data: unref(store).data,
        fetching: fetching.value,
        href: unref(goLink).map["douban-movie"],
        platform: unref(isZhLang) ? "我在豆瓣" : "Douban Movie"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}><i class="iconfont icon-video-outlined"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>标记看过</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(store).data.total_collections
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>部影片</span>`);
            } else {
              _push2(`<span${_scopeId}>films marked</span>`);
            }
            _push2(`</p><p${_scopeId}><i class="iconfont icon-clock-outlined"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>累计花费</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              split: "",
              count: totalSpent.value
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>小时</span>`);
            } else {
              _push2(`<span${_scopeId}>hours watching</span>`);
            }
            _push2(`</p><p${_scopeId}><i class="iconfont icon-week"${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`平均每周 `);
                  _push3(ssrRenderComponent(unref(StatisticCount), { count: weeklyAvg.value }, null, _parent3, _scopeId2));
                  _push3(` 部影片`);
                } else {
                  return [
                    createTextVNode("平均每周 "),
                    createVNode(unref(StatisticCount), { count: weeklyAvg.value }, null, 8, ["count"]),
                    createTextVNode(" 部影片")
                  ];
                }
              }),
              en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(StatisticCount), { count: weeklyAvg.value }, null, _parent3, _scopeId2));
                  _push3(` films per week`);
                } else {
                  return [
                    createVNode(unref(StatisticCount), { count: weeklyAvg.value }, null, 8, ["count"]),
                    createTextVNode(" films per week")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-video-outlined" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "标记看过")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  large: "",
                  primary: "",
                  split: "",
                  count: unref(store).data.total_collections
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "部影片")) : (openBlock(), createBlock("span", { key: 2 }, "films marked"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-clock-outlined" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "累计花费")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  split: "",
                  count: totalSpent.value
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "小时")) : (openBlock(), createBlock("span", { key: 2 }, "hours watching"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-week" }),
                createVNode(_component_i18n, null, {
                  zh: withCtx(() => [
                    createTextVNode("平均每周 "),
                    createVNode(unref(StatisticCount), { count: weeklyAvg.value }, null, 8, ["count"]),
                    createTextVNode(" 部影片")
                  ]),
                  en: withCtx(() => [
                    createVNode(unref(StatisticCount), { count: weeklyAvg.value }, null, 8, ["count"]),
                    createTextVNode(" films per week")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/douban.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const isImageMediaIns = (media) => {
  return media.media_type === "IMAGE";
};
const isVideoMediaIns = (media) => {
  return media.media_type === "VIDEO";
};
const isAlbumMediaIns = (media) => {
  return media.media_type === "CAROUSEL_ALBUM";
};
const getInstagramCoverURL = (media) => {
  return isVideoMediaIns(media) ? media.thumbnail_url : media.media_url;
};
const getYouTubePlaylistURL = (id) => {
  return `https://www.youtube.com/playlist?list=${id}`;
};
const getYouTubeVideoEmbedURL = (id, list) => {
  const listParam = list ? `?list=${list}` : "";
  return `https://www.youtube.com/embed/${id}${listParam}`;
};
const get163MusicSongDetailURL = (songId) => {
  return `https://music.163.com/#/song?id=${songId}`;
};
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  __name: "instagram",
  __ssrInlineRender: true,
  setup(__props) {
    const fetching = ref(true);
    const { goLink } = useStores();
    const { cdnDomain, isCNUser } = useEnhancer();
    const igLatestMediasStore = useInstagramLatestMediasStore();
    const igMedias = computed(() => igLatestMediasStore.data?.data.slice(0, 23) ?? []);
    const getMediaThumbnail = (media) => {
      const url = getInstagramCoverURL(media);
      return isCNUser ? getCdnProxyURL(cdnDomain, url) : url;
    };
    onMounted(() => {
      igLatestMediasStore.fetch().catch(() => null).finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_empty = resolveComponent("empty");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({
        loading: fetching.value,
        data: igMedias.value
      }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="list" data-v-da4e1522${_scopeId}><!--[-->`);
            ssrRenderList(24, (i) => {
              _push2(`<li class="item" data-v-da4e1522${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "list" }, [
                (openBlock(), createBlock(Fragment, null, renderList(24, (i) => {
                  return createVNode("li", {
                    class: "item",
                    key: i
                  }, [
                    createVNode(_component_skeleton_base)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              size: "large",
              bold: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                size: "large",
                bold: ""
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="list" data-v-da4e1522${_scopeId}><!--[-->`);
            ssrRenderList(igMedias.value, (media, index) => {
              _push2(`<li class="item" data-v-da4e1522${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ulink, {
                class: "link",
                href: media.permalink,
                title: media.caption
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_uimage, {
                      class: "cover",
                      alt: media.caption,
                      src: getMediaThumbnail(media)
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="type-icon" data-v-da4e1522${_scopeId2}>`);
                    if (unref(isVideoMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-video" data-v-da4e1522${_scopeId2}></i>`);
                    } else if (unref(isAlbumMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-album" data-v-da4e1522${_scopeId2}></i>`);
                    } else {
                      _push3(`<i class="iconfont icon-camera" data-v-da4e1522${_scopeId2}></i>`);
                    }
                    _push3(`</div><div class="mask" data-v-da4e1522${_scopeId2}>`);
                    if (unref(isVideoMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-music-play" data-v-da4e1522${_scopeId2}></i>`);
                    } else {
                      _push3(`<i class="iconfont icon-eye" data-v-da4e1522${_scopeId2}></i>`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode(_component_uimage, {
                        class: "cover",
                        alt: media.caption,
                        src: getMediaThumbnail(media)
                      }, null, 8, ["alt", "src"]),
                      createVNode("div", { class: "type-icon" }, [
                        unref(isVideoMediaIns)(media) ? (openBlock(), createBlock("i", {
                          key: 0,
                          class: "iconfont icon-video"
                        })) : unref(isAlbumMediaIns)(media) ? (openBlock(), createBlock("i", {
                          key: 1,
                          class: "iconfont icon-album"
                        })) : (openBlock(), createBlock("i", {
                          key: 2,
                          class: "iconfont icon-camera"
                        }))
                      ]),
                      createVNode("div", { class: "mask" }, [
                        unref(isVideoMediaIns)(media) ? (openBlock(), createBlock("i", {
                          key: 0,
                          class: "iconfont icon-music-play"
                        })) : (openBlock(), createBlock("i", {
                          key: 1,
                          class: "iconfont icon-eye"
                        }))
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--><li class="item" data-v-da4e1522${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link more",
              href: unref(goLink).map.instagram
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`•••`);
                } else {
                  return [
                    createTextVNode("•••")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ul>`);
          } else {
            return [
              createVNode("ul", { class: "list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(igMedias.value, (media, index) => {
                  return openBlock(), createBlock("li", {
                    class: "item",
                    key: index
                  }, [
                    createVNode(_component_ulink, {
                      class: "link",
                      href: media.permalink,
                      title: media.caption
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_uimage, {
                          class: "cover",
                          alt: media.caption,
                          src: getMediaThumbnail(media)
                        }, null, 8, ["alt", "src"]),
                        createVNode("div", { class: "type-icon" }, [
                          unref(isVideoMediaIns)(media) ? (openBlock(), createBlock("i", {
                            key: 0,
                            class: "iconfont icon-video"
                          })) : unref(isAlbumMediaIns)(media) ? (openBlock(), createBlock("i", {
                            key: 1,
                            class: "iconfont icon-album"
                          })) : (openBlock(), createBlock("i", {
                            key: 2,
                            class: "iconfont icon-camera"
                          }))
                        ]),
                        createVNode("div", { class: "mask" }, [
                          unref(isVideoMediaIns)(media) ? (openBlock(), createBlock("i", {
                            key: 0,
                            class: "iconfont icon-music-play"
                          })) : (openBlock(), createBlock("i", {
                            key: 1,
                            class: "iconfont icon-eye"
                          }))
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href", "title"])
                  ]);
                }), 128)),
                createVNode("li", { class: "item" }, [
                  createVNode(_component_ulink, {
                    class: "link more",
                    href: unref(goLink).map.instagram
                  }, {
                    default: withCtx(() => [
                      createTextVNode("•••")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/media/instagram.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const InstagramMedia = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["__scopeId", "data-v-da4e1522"]]);
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  __name: "youtube",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const youtubeStore = useYouTubePlayListStore();
    onMounted(() => youtubeStore.fetch().catch(() => []));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_empty = resolveComponent("empty");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube" }, _attrs))} data-v-52bd9243>`);
      if (unref(youtubeStore).fetching) {
        _push(`<span data-v-52bd9243></span>`);
      } else if (!unref(youtubeStore).data.length) {
        _push(ssrRenderComponent(_component_empty, {
          size: "large",
          bold: ""
        }, null, _parent));
      } else {
        _push(`<ul class="list" data-v-52bd9243><!--[-->`);
        ssrRenderList(unref(youtubeStore).data.slice(0, 5), (item, index) => {
          _push(`<li class="item"${ssrRenderAttr("title", item.snippet.title)} data-v-52bd9243>`);
          _push(ssrRenderComponent(_component_ulink, {
            class: "link",
            href: unref(getYouTubePlaylistURL)(item.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_uimage, {
                  class: "cover",
                  proxy: "",
                  src: item.snippet.thumbnails.medium.url
                }, null, _parent2, _scopeId));
                _push2(`<span class="count" data-v-52bd9243${_scopeId}><i class="iconfont icon-video" data-v-52bd9243${_scopeId}></i><span class="number" data-v-52bd9243${_scopeId}>${ssrInterpolate(item.contentDetails.itemCount)}</span></span><p class="title" data-v-52bd9243${_scopeId}><i class="iconfont icon-playlist" data-v-52bd9243${_scopeId}></i><span class="text" data-v-52bd9243${_scopeId}>${ssrInterpolate(item.snippet.title)}</span></p><div class="mask" data-v-52bd9243${_scopeId}><i class="iconfont icon-eye" data-v-52bd9243${_scopeId}></i></div>`);
              } else {
                return [
                  createVNode(_component_uimage, {
                    class: "cover",
                    proxy: "",
                    src: item.snippet.thumbnails.medium.url
                  }, null, 8, ["src"]),
                  createVNode("span", { class: "count" }, [
                    createVNode("i", { class: "iconfont icon-video" }),
                    createVNode("span", { class: "number" }, toDisplayString(item.contentDetails.itemCount), 1)
                  ]),
                  createVNode("p", { class: "title" }, [
                    createVNode("i", { class: "iconfont icon-playlist" }),
                    createVNode("span", { class: "text" }, toDisplayString(item.snippet.title), 1)
                  ]),
                  createVNode("div", { class: "mask" }, [
                    createVNode("i", { class: "iconfont icon-eye" })
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--><li class="item" data-v-52bd9243>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "link more",
          href: unref(goLink).map.youtube
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="iconfont icon-youtube" data-v-52bd9243${_scopeId}></i><span class="username" data-v-52bd9243${_scopeId}>${ssrInterpolate(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID)}</span><span class="text" data-v-52bd9243${_scopeId}>•••</span>`);
            } else {
              return [
                createVNode("i", { class: "iconfont icon-youtube" }),
                createVNode("span", { class: "username" }, toDisplayString(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID), 1),
                createVNode("span", { class: "text" }, "•••")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li></ul>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/media/youtube.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const YoutubeMedia = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["__scopeId", "data-v-52bd9243"]]);
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "day",
  __ssrInlineRender: true,
  props: {
    date: {},
    threads: {},
    instagrams: {},
    articles: {},
    contributions: {},
    githubColor: {}
  },
  setup(__props) {
    const props = __props;
    const { isDarkTheme } = useEnhancer();
    const total = computed(() => props.articles + props.threads + props.contributions + props.instagrams);
    const getPointHeightStyle = (value) => {
      return isNaN(value) ? 0 : `${Math.floor(value * 100)}%`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["day", { dark: unref(isDarkTheme) }],
        "data-date": _ctx.date,
        "data-total-count": total.value,
        "data-article-count": _ctx.articles,
        "data-thread-count": _ctx.threads,
        "data-instagram-count": _ctx.instagrams,
        "data-contribution-count": _ctx.contributions
      }, _attrs))} data-v-da750b92><div class="point" data-v-da750b92><div class="item article" style="${ssrRenderStyle({ height: getPointHeightStyle(_ctx.articles / total.value) })}" data-v-da750b92></div><div class="item threads" style="${ssrRenderStyle({ height: getPointHeightStyle(_ctx.threads / total.value) })}" data-v-da750b92></div><div class="item instagram" style="${ssrRenderStyle({ height: getPointHeightStyle(_ctx.instagrams / total.value) })}" data-v-da750b92></div><div class="item contribution" style="${ssrRenderStyle({
        height: getPointHeightStyle(_ctx.contributions / total.value),
        backgroundColor: _ctx.githubColor
      })}" data-v-da750b92></div></div>`);
      if (total.value) {
        _push(`<div class="tooltip" data-v-da750b92><p class="date" data-v-da750b92>${ssrInterpolate(_ctx.date)}</p><ul class="counts" data-v-da750b92><li class="item article" data-v-da750b92><i class="iconfont icon-quill" data-v-da750b92></i><span class="count" data-v-da750b92>${ssrInterpolate(_ctx.articles)}</span> articles </li><li class="item thread" data-v-da750b92><i class="iconfont icon-threads" data-v-da750b92></i><span class="count" data-v-da750b92>${ssrInterpolate(_ctx.threads)}</span> threads </li><li class="item instagram" data-v-da750b92><i class="iconfont icon-instagram" data-v-da750b92></i><span class="count" data-v-da750b92>${ssrInterpolate(_ctx.instagrams)}</span> instagrams </li><li class="item contribution" data-v-da750b92><i class="iconfont icon-github" data-v-da750b92></i><span class="count" data-v-da750b92>${ssrInterpolate(_ctx.contributions)}</span> contributions </li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/calendar/day.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const CalendarDay = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["__scopeId", "data-v-da750b92"]]);
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useEnhancer();
    const { articleCalendar, instagramCalendar, githubCalendar } = useStores();
    const githubContributionsMap = computed(() => {
      return new Map(githubCalendar.days.map((day) => [day.date, day]));
    });
    const getDayContributions = (date) => {
      return githubContributionsMap.value.get(date)?.count || 0;
    };
    const getDayGitHubColor = (date) => {
      return githubContributionsMap.value.get(date)?.color;
    };
    const getDayInstagrams = (date) => {
      return instagramCalendar.data.find((i) => i.date === date)?.count || 0;
    };
    const getDayArticles = (date) => {
      return articleCalendar.data.find((i) => i.date === date)?.count || 0;
    };
    const today = /* @__PURE__ */ new Date();
    const todayHuman = dateToHuman(today);
    const currentMonthDays = Array.from({ length: todayHuman.day }).map((_, i) => {
      return humanDateToYMD({ ...todayHuman, day: i + 1 });
    });
    const getPrevMonthFullDays = (date, prevMonths) => {
      const targetMonth = new Date(date.year, date.month - prevMonths, 0);
      const daysCount = targetMonth.getDate();
      return Array.from({ length: daysCount }).map((d, i) => {
        return humanDateToYMD({ ...dateToHuman(targetMonth), day: i + 1 });
      });
    };
    const months = [
      getPrevMonthFullDays(todayHuman, 11),
      getPrevMonthFullDays(todayHuman, 10),
      getPrevMonthFullDays(todayHuman, 9),
      getPrevMonthFullDays(todayHuman, 8),
      getPrevMonthFullDays(todayHuman, 7),
      getPrevMonthFullDays(todayHuman, 6),
      getPrevMonthFullDays(todayHuman, 5),
      getPrevMonthFullDays(todayHuman, 4),
      getPrevMonthFullDays(todayHuman, 3),
      getPrevMonthFullDays(todayHuman, 2),
      getPrevMonthFullDays(todayHuman, 1),
      currentMonthDays
    ];
    onMounted(() => {
      articleCalendar.fetch();
      githubCalendar.fetch();
      instagramCalendar.fetch();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "aggregate-calendar" }, _attrs))} data-v-0f6ba0ff><!--[-->`);
      ssrRenderList(months, (month, index) => {
        _push(`<li class="month" data-v-0f6ba0ff><!--[-->`);
        ssrRenderList(month, (day, i) => {
          _push(ssrRenderComponent(CalendarDay, {
            key: i,
            date: day,
            threads: 0,
            articles: getDayArticles(day),
            instagrams: getDayInstagrams(day),
            contributions: getDayContributions(day),
            "github-color": getDayGitHubColor(day)
          }, null, _parent));
        });
        _push(`<!--]--></li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/calendar/index.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const AggregateCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__scopeId", "data-v-0f6ba0ff"]]);
const gmmFoldersToGeoJSON = (folders) => ({
  type: "FeatureCollection",
  features: folders.map((folder) => folder.placemarks).flat().map((placemark) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: placemark.coordinates
      },
      properties: {
        ...placemark,
        icon: placemark.image ? "attraction" : "veterinary"
      }
    };
  })
});
const geoJSONFeatureToLayer = (layerId, source) => {
  return {
    id: layerId,
    source,
    type: "symbol",
    layout: {
      "icon-allow-overlap": true,
      "icon-size": 1.2,
      "icon-image": ["get", "icon"],
      "text-field": ["get", "name"],
      "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
      "text-size": 11,
      "text-letter-spacing": 0.05,
      "text-offset": [0, 1],
      "text-anchor": "top"
    },
    paint: {
      "text-color": "#202",
      "text-halo-color": "#fff",
      "text-halo-width": 2
    }
  };
};
const newMapboxPopup = (mapboxgl, coordinates, html) => {
  return new mapboxgl.Popup({ closeButton: false, offset: [0, -16], maxWidth: `280px` }).setLngLat(coordinates).setHTML(html);
};
const GOOGLE_MAP_LINKS = [
  {
    zh: "我的美食地图",
    en: `My Foodie Map`,
    url: "https://goo.gl/maps/fzHHMCjuSbbJgBVt9"
  },
  {
    zh: "我的地图点评",
    en: "My map reviews",
    url: "https://google.com/maps/contrib/101107919754452588990/reviews"
  },
  {
    zh: "我去过的地方",
    en: `Places I've been to`,
    url: "https://goo.gl/maps/kLVRWTMhZbbY4DNa7"
  },
  {
    zh: "我想去的地方",
    en: `Places I want to go`,
    url: "https://goo.gl/maps/SpB4JJm9HYUiqjtc6"
  }
];
const useAdminAvatar = (avatar) => {
  return avatar || getAssetURL(useCdnDomain(), "/images/anonymous.png");
};
const useAboutPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer();
  const { adminProfile } = useStores();
  return usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocaleKey.PAGE_ABOUT, Language.English));
    const titles = isZhLang.value ? [i18n.t(LocaleKey.PAGE_ABOUT), enTitle] : [enTitle];
    return {
      pageTitles: titles,
      description: `${isZhLang.value ? "关于" : "About"} ${APP_META.author}`,
      ogType: "profile",
      ogImage: adminProfile.data?.avatar
    };
  });
};
const i18ns = {
  footprint: {
    [Language.Chinese]: "路为纸，地成册，行作笔，心当墨；思无界，行有疆",
    [Language.English]: "Every path i went astray built up my Rome."
  },
  sponsor: {
    [Language.Chinese]: "随喜赞助",
    [Language.English]: "Sponsor"
  },
  statement: {
    [Language.Chinese]: "众而周知",
    [Language.English]: "Statement"
  },
  feedback: {
    [Language.Chinese]: "向我反馈",
    [Language.English]: "Feedback"
  },
  archive: {
    [Language.Chinese]: "笔文存档",
    [Language.English]: "Archive"
  },
  photography: {
    [Language.Chinese]: "行行摄摄",
    [Language.English]: "PhotoGram"
  },
  guestbook: {
    [Language.Chinese]: "给我留言",
    [Language.English]: "Guestbook"
  },
  snippets: {
    [Language.Chinese]: "利乐有情",
    [Language.English]: "Snippets"
  },
  nft: {
    [Language.Chinese]: "数字藏品",
    [Language.English]: "NFTs"
  },
  rss: {
    [Language.Chinese]: "长期订阅",
    [Language.English]: "Subscribe"
  },
  discordGroup: {
    [Language.Chinese]: "国际联谊",
    [Language.English]: "Discord"
  },
  telegramGroup: {
    [Language.Chinese]: "自由报社",
    [Language.English]: "TG Group"
  },
  biography: {
    [Language.Chinese]: [
      `嗨！我是 Surmon，法名觉了（jué liǎo），一名野生软件工程师，曾供职于美图秀秀、七牛云、字节跳动、加密交易所。`,
      `如你所见，我有着还不错的设计灵感和编码能力，经常在 GitHub 上开源一些 “没用” 或 “有用” 的小物件。`,
      `当然，如果某些输出恰好帮助了你，也期待你的随喜赞助。`,
      `在流动的当下，我有时亦以 <a href="https://en.wikipedia.org/wiki/Theravada" target="_blank">上座部佛教</a> 僧侣的形象示现。`,
      `而这里，我把它称作自己的数字 <a href="https://zh.wikipedia.org/wiki/%E7%B2%BE%E8%88%8D" target="_blank">精舍</a>，随缘记录。`,
      `祝你在这儿玩得愉快！`,
      `（俗生履历参考：<a href="https://surmon.me/article/144" target="_blank">《何以为家》</a>`
    ].join(""),
    [Language.English]: [
      `Hi! I'm Surmon, a software engineer who has worked at Meitu Inc., Qiniu Cloud, ByteDance, and Crypto Exchange.`,
      `I have developed strong design inspiration and coding skills.`,
      `I'm passionate about open-source software and problem-solving, and I hope my contributions can help you.`,
      `I've been a self-taught programmer since 2015, and if you're interested in my journey, you can find the answers in this <a href="https://surmon.me/article/144" target="_blank">article</a> (Chinese).`,
      `I call this place my own digital vihara. Have fun here!`
    ].join(" ")
  }
};
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "mapbox",
  __ssrInlineRender: true,
  props: {
    gmGeoJson: {}
  },
  emits: ["ready"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { isDarkTheme } = useEnhancer();
    const mapboxRef = shallowRef();
    const lib = shallowRef();
    const map = shallowRef();
    const loaded = shallowRef(false);
    const getMapStyle = () => {
      return isDarkTheme.value ? MAPBOX_CONFIG.STYLE_DARK : MAPBOX_CONFIG.STYLE_LIGHT;
    };
    const makeSureSourceLayer = () => {
      if (loaded.value) {
        if (props.gmGeoJson?.features.length) {
          const _map = map.value;
          const layerId = "placemarks";
          if (!_map.getLayer(layerId)) {
            _map.addLayer(
              geoJSONFeatureToLayer(layerId, {
                type: "geojson",
                data: props.gmGeoJson
              })
            );
            _map.on("mouseenter", layerId, () => {
              _map.getCanvas().style.cursor = "pointer";
            });
            _map.on("mouseleave", layerId, () => {
              _map.getCanvas().style.cursor = "";
            });
            _map.on("click", layerId, (event) => {
              const coordinates = event.features[0].geometry.coordinates.slice();
              const description = event.features[0].properties.description;
              while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
              }
              newMapboxPopup(lib.value, coordinates, description).addTo(_map);
            });
          }
        }
      }
    };
    onBeforeMount(() => {
      watch(
        () => isDarkTheme.value,
        () => map.value?.setStyle(getMapStyle())
      );
    });
    onBeforeMount(() => {
      watch(
        () => props.gmGeoJson,
        () => makeSureSourceLayer()
      );
    });
    onMounted(() => {
      Promise.resolve().then(() => mapboxGl);
      Promise.all([
        // dynamic import lib
        import("mapbox-gl").then((result) => result.default),
        new Promise((resolve) => window.setTimeout(resolve, 600))
      ]).then(([mapboxgl]) => {
        mapboxgl.accessToken = MAPBOX_CONFIG.TOKEN;
        lib.value = mapboxgl;
        map.value = new mapboxgl.Map({
          container: mapboxRef.value,
          center: MAPBOX_CONFIG.CENTER,
          zoom: MAPBOX_CONFIG.ZOOM,
          minZoom: 2.2,
          attributionControl: false,
          style: getMapStyle()
        });
        new mapboxgl.Marker({
          color: APP_CONFIG.primary_color,
          anchor: "bottom"
        }).setLngLat(APP_META.about_page_geo_coordinates).addTo(map.value);
        map.value.on("style.load", () => {
          makeSureSourceLayer();
        });
        map.value.on("load", () => {
          loaded.value = true;
          makeSureSourceLayer();
          emit("ready", { map: map.value, lib: lib.value });
        });
      });
    });
    onBeforeUnmount(() => {
      map.value?.remove();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "mapbox",
        ref_key: "mapboxRef",
        ref: mapboxRef
      }, _attrs))} data-v-e260a998></div>`);
    };
  }
});
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/footprint/mapbox.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const Mapbox = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-e260a998"]]);
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "modal",
  __ssrInlineRender: true,
  props: {
    name: {},
    description: {},
    gmGeoJson: {},
    gmFolders: {}
  },
  setup(__props) {
    const lib = shallowRef();
    const map = shallowRef();
    const handleMapboxReady = (payload) => {
      lib.value = payload.lib;
      map.value = payload.map;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))} data-v-ed6eeb46>`);
      _push(ssrRenderComponent(Mapbox, {
        class: "mapbox",
        "gm-geo-json": _ctx.gmGeoJson,
        onReady: handleMapboxReady
      }, null, _parent));
      _push(`<div class="panel" data-v-ed6eeb46><div class="info" data-v-ed6eeb46><h3 class="title" data-v-ed6eeb46>${ssrInterpolate(_ctx.name ?? "-")}</h3><p class="description" data-v-ed6eeb46>${ssrInterpolate(_ctx.description ?? "-")}</p></div><ul class="folders" data-v-ed6eeb46><!--[-->`);
      ssrRenderList(_ctx.gmFolders, (folder, index) => {
        _push(`<li class="folder" data-v-ed6eeb46><div class="title" data-v-ed6eeb46><i class="iconfont icon-route" data-v-ed6eeb46></i><span class="text" data-v-ed6eeb46>${ssrInterpolate(folder.name)}</span><span class="count" data-v-ed6eeb46>(${ssrInterpolate(folder.placemarks.length)})</span></div>`);
        if (!folder.placemarks.length) {
          _push(`<div class="empty" data-v-ed6eeb46>null</div>`);
        } else {
          _push(`<ul class="placemarks" data-v-ed6eeb46><!--[-->`);
          ssrRenderList(folder.placemarks, (placemark, i) => {
            _push(`<li class="placemark" data-v-ed6eeb46>`);
            _push(ssrRenderComponent(_component_uimage, {
              class: "icon",
              cdn: true,
              src: `/images/third-party/mapbox-${placemark.image ? "attraction" : "veterinary"}.svg`
            }, null, _parent));
            _push(`<span class="text" data-v-ed6eeb46>${ssrInterpolate(placemark.name)}</span></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/footprint/modal.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const FootprintModal = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-ed6eeb46"]]);
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const map = shallowRef();
    const modalVisible = shallowRef(false);
    const gmStore = useMyGoogleMapStore();
    const { isZhLang } = useEnhancer();
    const gmFolders = computed(() => {
      const folders = [...gmStore.data?.Folder ?? []];
      folders.reverse();
      return folders.map((folder, fi) => {
        const placemark = folder.Placemark ?? [];
        const placemarks = Array.isArray(placemark) ? placemark : [placemark];
        return {
          name: folder.name,
          placemarks: placemarks.map((placemark2, pi) => {
            const [longitude, latitude] = placemark2.Point.coordinates.split(",").map(Number);
            const extendedData = placemark2.ExtendedData?.Data;
            return {
              index: pi,
              id: `placemark-${fi}-${pi}`,
              name: placemark2.name,
              description: placemark2.description,
              coordinates: [longitude, latitude],
              image: extendedData?.["@name"] === "gx_media_links" ? extendedData?.value : null
            };
          })
        };
      });
    });
    const gmGeoJson = computed(() => {
      return gmmFoldersToGeoJSON(gmFolders.value);
    });
    const handleMapboxReady = (payload) => {
      map.value = payload.map;
    };
    onMounted(() => gmStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_ulink = resolveComponent("ulink");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "footprint-map" }, _attrs))} data-v-d2b2b8d3>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: modalVisible.value,
              "onUpdate:visible": ($event) => modalVisible.value = $event,
              "scroll-close": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(FootprintModal, {
                    class: "footprint-modal",
                    name: unref(gmStore).data?.name,
                    description: unref(gmStore).data?.description,
                    "gm-folders": gmFolders.value,
                    "gm-geo-json": gmGeoJson.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(FootprintModal, {
                      class: "footprint-modal",
                      name: unref(gmStore).data?.name,
                      description: unref(gmStore).data?.description,
                      "gm-folders": gmFolders.value,
                      "gm-geo-json": gmGeoJson.value
                    }, null, 8, ["name", "description", "gm-folders", "gm-geo-json"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: modalVisible.value,
                "onUpdate:visible": ($event) => modalVisible.value = $event,
                "scroll-close": false
              }, {
                default: withCtx(() => [
                  createVNode(FootprintModal, {
                    class: "footprint-modal",
                    name: unref(gmStore).data?.name,
                    description: unref(gmStore).data?.description,
                    "gm-folders": gmFolders.value,
                    "gm-geo-json": gmGeoJson.value
                  }, null, 8, ["name", "description", "gm-folders", "gm-geo-json"])
                ]),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mapbox-wrapper"${ssrRenderAttr("placeholder", unref(isZhLang) ? unref(i18ns).footprint.zh : unref(i18ns).footprint.en)} data-v-d2b2b8d3>`);
      _push(ssrRenderComponent(Mapbox, {
        class: "mapbox",
        "gm-geo-json": gmGeoJson.value,
        onReady: handleMapboxReady
      }, null, _parent));
      _push(`<div class="toolbar" data-v-d2b2b8d3>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: unref(VALUABLE_LINKS).GOOGLE_MY_MAP
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-google-maps" data-v-d2b2b8d3${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-google-maps" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="button" data-v-d2b2b8d3><i class="iconfont icon-fullscreen" data-v-d2b2b8d3></i></button></div></div><div class="legends" data-v-d2b2b8d3><div class="now" data-v-d2b2b8d3><i class="iconfont icon-location" data-v-d2b2b8d3></i><span class="text" data-v-d2b2b8d3>${ssrInterpolate(unref(isZhLang) ? unref(APP_META).about_page_geo_zh_title : unref(APP_META).about_page_geo_en_title)}</span></div><ul class="folders" data-v-d2b2b8d3><li class="item" data-v-d2b2b8d3><i class="iconfont icon-route" data-v-d2b2b8d3></i><span class="text" data-v-d2b2b8d3>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "我的旅行足迹",
        en: "My footprints"
      }, null, _parent));
      _push(`</span></li><!--[-->`);
      ssrRenderList(unref(GOOGLE_MAP_LINKS), (link, index) => {
        _push(`<li class="item" data-v-d2b2b8d3><i class="iconfont icon-map" data-v-d2b2b8d3></i><span class="text" data-v-d2b2b8d3>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: link.zh,
          en: link.en
        }, null, _parent));
        _push(`<i class="new-window-icon iconfont icon-new-window-s" data-v-d2b2b8d3></i></span></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/footprint/index.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const FootprintMap = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-d2b2b8d3"]]);
const getEmailLink = (email) => {
  if (typeof email === "string") {
    return `mailto:${email}`;
  }
  const { email: _email, ...content } = email;
  return `mailto:${_email}?` + stringify(content);
};
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "banner",
  __ssrInlineRender: true,
  emits: ["gTagEvent"],
  setup(__props, { emit: __emit }) {
    const { isZhLang, isDarkTheme, cdnDomain } = useEnhancer();
    const { adminProfile, appOption, goLink } = useStores();
    const emailLink = getEmailLink({
      email: appOption.data?.site_email,
      subject: `Hello, ${APP_META.author}!`,
      body: "Hi, I am writing to you from your website."
    });
    const wechatModalOpened = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_ulink = resolveComponent("ulink");
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-banner" }, _attrs))} data-v-92fb7137><div class="background" data-v-92fb7137><video class="video" loop muted autoplay${ssrIncludeBooleanAttr(false) ? " controls" : ""}${ssrRenderAttr("src", unref(getAssetURL)(unref(cdnDomain), "/videos/clips/ocean-1.mp4"))} data-v-92fb7137></video></div><div class="content" data-v-92fb7137><div class="fullwidth" data-v-92fb7137><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "profile"])}" data-v-92fb7137>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "avatar",
        src: unref(useAdminAvatar)(unref(adminProfile).data?.avatar)
      }, null, _parent));
      _push(`<div class="right" data-v-92fb7137><h1 class="name" data-v-92fb7137>${ssrInterpolate(unref(adminProfile).data?.name || "-")}</h1><p class="slogan" data-v-92fb7137>${ssrInterpolate(unref(adminProfile).data?.slogan || "-")}</p></div></div><p class="description" data-v-92fb7137>`);
      _push(ssrRenderComponent(_component_webfont, { bolder: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isZhLang) ? unref(APP_META).zh_description : unref(APP_META).en_description)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isZhLang) ? unref(APP_META).zh_description : unref(APP_META).en_description), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><div class="socials" data-v-92fb7137>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only instagram",
        title: "Instagram",
        href: unref(goLink).map.instagram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-instagram" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-instagram" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only threads",
        title: "Threads",
        href: unref(goLink).map.threads
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-threads" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-threads" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item with-text github",
        href: unref(goLink).map.github
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-92fb7137${_scopeId}></i><span class="text" data-v-92fb7137${_scopeId}>GitHub</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-github" }),
              createVNode("span", { class: "text" }, "GitHub")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only youtube",
        title: "YouTube",
        href: unref(goLink).map.youtube
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-youtube" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-youtube" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only telegram",
        title: "Telegram",
        href: unref(goLink).map.telegram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-telegram" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="item icon-only wechat" title="WeChat" data-v-92fb7137><i class="iconfont icon-wechat" data-v-92fb7137></i>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: wechatModalOpened.value,
              "onUpdate:visible": ($event) => wechatModalOpened.value = $event,
              "scroll-close": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="qrcode-modal wechat" data-v-92fb7137${_scopeId2}><div class="background" data-v-92fb7137${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(_component_uimage, {
                    class: "image",
                    cdn: "",
                    src: "/images/qrcodes/wechat.webp"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text" data-v-92fb7137${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, null, {
                    en: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Friend me on WeChat | Channel`);
                      } else {
                        return [
                          createTextVNode("Friend me on WeChat | Channel")
                        ];
                      }
                    }),
                    zh: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`扫码加微 ｜ 关注视频号`);
                      } else {
                        return [
                          createTextVNode("扫码加微 ｜ 关注视频号")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "qrcode-modal wechat" }, [
                      createVNode("div", { class: "background" }),
                      createVNode(_component_uimage, {
                        class: "image",
                        cdn: "",
                        src: "/images/qrcodes/wechat.webp"
                      }),
                      createVNode("span", { class: "text" }, [
                        createVNode(_component_i18n, null, {
                          en: withCtx(() => [
                            createTextVNode("Friend me on WeChat | Channel")
                          ]),
                          zh: withCtx(() => [
                            createTextVNode("扫码加微 ｜ 关注视频号")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: wechatModalOpened.value,
                "onUpdate:visible": ($event) => wechatModalOpened.value = $event,
                "scroll-close": false
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "qrcode-modal wechat" }, [
                    createVNode("div", { class: "background" }),
                    createVNode(_component_uimage, {
                      class: "image",
                      cdn: "",
                      src: "/images/qrcodes/wechat.webp"
                    }),
                    createVNode("span", { class: "text" }, [
                      createVNode(_component_i18n, null, {
                        en: withCtx(() => [
                          createTextVNode("Friend me on WeChat | Channel")
                        ]),
                        zh: withCtx(() => [
                          createTextVNode("扫码加微 ｜ 关注视频号")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only linkedin",
        title: "LinkedIn",
        href: unref(goLink).map.linkedin
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-linkedin" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-linkedin" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only zhihu",
        title: "知乎回答",
        href: unref(goLink).map.zhihu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-zhihu" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-zhihu" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only douban",
        title: "豆瓣",
        href: unref(goLink).map.douban
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-douban" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-douban" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only email",
        title: "Email me",
        href: unref(emailLink)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-mail" data-v-92fb7137${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-mail" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="container" data-v-92fb7137><p class="biography" data-v-92fb7137>${(unref(isZhLang) ? unref(i18ns).biography.zh : unref(i18ns).biography.en) ?? ""}</p></div></div></div>`);
    };
  }
});
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/banner.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const AboutPageBanner = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__scopeId", "data-v-92fb7137"]]);
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { globalState } = useEnhancer();
    const { adminProfile, appOption, goLink } = useStores();
    const handleGTagEvent = (event) => {
    };
    const handleSponsor = () => {
      globalState.toggleSwitcher("sponsor", true);
    };
    const handleStatement = () => {
      globalState.toggleSwitcher("statement", true);
    };
    const handleFeedback = () => {
      globalState.toggleSwitcher("feedback", true);
    };
    useAboutPageMeta();
    useUniversalFetch(() => Promise.all([adminProfile.fetch(), appOption.fetch()]));
    const moduleButtons = computed(() => [
      {
        class: "photography",
        icon: "icon-lens",
        i18n: i18ns.photography,
        route: getPageRoute(RouteName.Photography)
      },
      {
        class: "snippets",
        icon: "icon-buddhism",
        i18n: i18ns.snippets,
        route: getPageRoute(RouteName.Snippets)
      },
      {
        class: "archive",
        icon: "icon-quill",
        i18n: i18ns.archive,
        route: getPageRoute(RouteName.Archive)
      },
      {
        class: "guestbook",
        icon: "icon-comment",
        i18n: i18ns.guestbook,
        route: getPageRoute(RouteName.Guestbook)
      },
      {
        class: "feedback",
        icon: "icon-mail-plane",
        i18n: i18ns.feedback,
        onClick: handleFeedback
      },
      {
        class: "telegram",
        icon: "icon-telegram",
        i18n: i18ns.telegramGroup,
        href: goLink.map["telegram-group"]
      },
      {
        class: "discord",
        icon: "icon-discord",
        i18n: i18ns.discordGroup,
        href: goLink.map["discord-server"]
      },
      {
        class: "sponsor",
        icon: "icon-peachblossom",
        i18n: i18ns.sponsor,
        onClick: handleSponsor
      },
      {
        class: "statement",
        icon: "icon-faq",
        i18n: i18ns.statement,
        onClick: handleStatement
      },
      {
        class: "rss",
        icon: "icon-rss",
        i18n: i18ns.rss,
        href: VALUABLE_LINKS.RSS
      }
    ]);
    const specialLinks = Object.freeze([
      {
        name: "GitHub",
        url: "https://github.com"
      },
      {
        name: "Vite",
        url: "https://vitejs.dev/"
      },
      {
        name: "Disqus",
        url: "https://disqus.com/"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_container = resolveComponent("container");
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-92031b7b>`);
      _push(ssrRenderComponent(AboutPageBanner, { onGTagEvent: handleGTagEvent }, null, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-content" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module-buttons" data-v-92031b7b${_scopeId}><!--[-->`);
            ssrRenderList(moduleButtons.value, (item, index) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.onClick ? "button" : "ulink"), {
                class: ["item", item.class],
                href: item.href,
                to: item.route,
                onClick: item.onClick
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="left" data-v-92031b7b${_scopeId2}><i class="${ssrRenderClass([item.icon, "iconfont"])}" data-v-92031b7b${_scopeId2}></i><span class="text" data-v-92031b7b${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_i18n, mergeProps({ ref_for: true }, item.i18n), null, _parent3, _scopeId2));
                    _push3(`</span></span><span class="right" data-v-92031b7b${_scopeId2}><i class="iconfont icon-next" data-v-92031b7b${_scopeId2}></i></span>`);
                  } else {
                    return [
                      createVNode("span", { class: "left" }, [
                        createVNode("i", {
                          class: ["iconfont", item.icon]
                        }, null, 2),
                        createVNode("span", { class: "text" }, [
                          createVNode(_component_i18n, mergeProps({ ref_for: true }, item.i18n), null, 16)
                        ])
                      ]),
                      createVNode("span", { class: "right" }, [
                        createVNode("i", { class: "iconfont icon-next" })
                      ])
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
            });
            _push2(`<!--]--></div><div class="statistics" data-v-92031b7b${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$1d, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(NpmStatistic, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1c, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1b, null, null, _parent2, _scopeId));
            _push2(`</div><div class="plogs" data-v-92031b7b${_scopeId}>`);
            _push2(ssrRenderComponent(InstagramMedia, null, null, _parent2, _scopeId));
            _push2(`</div><div class="vlogs" data-v-92031b7b${_scopeId}>`);
            _push2(ssrRenderComponent(YoutubeMedia, null, null, _parent2, _scopeId));
            _push2(`</div><div class="footprint" data-v-92031b7b${_scopeId}>`);
            _push2(ssrRenderComponent(FootprintMap, null, null, _parent2, _scopeId));
            _push2(`</div><div class="calendar" data-v-92031b7b${_scopeId}>`);
            _push2(ssrRenderComponent(AggregateCalendar, null, null, _parent2, _scopeId));
            _push2(`</div><div class="footer-links" data-v-92031b7b${_scopeId}><div class="friend-links" data-v-92031b7b${_scopeId}><!--[-->`);
            ssrRenderList(unref(appOption).data?.friend_links || [], (link, index) => {
              _push2(`<!--[-->`);
              if (index !== 0) {
                _push2(ssrRenderComponent(_component_divider, {
                  type: "vertical",
                  size: "lg"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<a${ssrRenderAttr("href", link.value)} class="item" target="_blank" rel="external nofollow noopener" data-v-92031b7b${_scopeId}>${ssrInterpolate(link.name)}</a><!--]-->`);
            });
            _push2(`<!--]--></div><div class="special-links" data-v-92031b7b${_scopeId}><!--[-->`);
            ssrRenderList(unref(specialLinks), (item, index) => {
              _push2(`<!--[-->`);
              if (index !== 0) {
                _push2(ssrRenderComponent(_component_divider, {
                  type: "vertical",
                  size: "lg"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<a${ssrRenderAttr("href", item.url)} class="item" target="_blank" rel="external nofollow noopener" data-v-92031b7b${_scopeId}>${ssrInterpolate(item.name)}</a><!--]-->`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "module-buttons" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(moduleButtons.value, (item, index) => {
                  return openBlock(), createBlock(resolveDynamicComponent(item.onClick ? "button" : "ulink"), {
                    key: index,
                    class: ["item", item.class],
                    href: item.href,
                    to: item.route,
                    onClick: item.onClick
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "left" }, [
                        createVNode("i", {
                          class: ["iconfont", item.icon]
                        }, null, 2),
                        createVNode("span", { class: "text" }, [
                          createVNode(_component_i18n, mergeProps({ ref_for: true }, item.i18n), null, 16)
                        ])
                      ]),
                      createVNode("span", { class: "right" }, [
                        createVNode("i", { class: "iconfont icon-next" })
                      ])
                    ]),
                    _: 2
                  }, 1032, ["class", "href", "to", "onClick"]);
                }), 128))
              ]),
              createVNode("div", { class: "statistics" }, [
                createVNode(_sfc_main$1d),
                createVNode(NpmStatistic),
                createVNode(_sfc_main$1c),
                createVNode(_sfc_main$1b)
              ]),
              createVNode("div", { class: "plogs" }, [
                createVNode(InstagramMedia)
              ]),
              createVNode("div", { class: "vlogs" }, [
                createVNode(YoutubeMedia)
              ]),
              createVNode("div", { class: "footprint" }, [
                createVNode(FootprintMap)
              ]),
              createVNode("div", { class: "calendar" }, [
                createVNode(AggregateCalendar)
              ]),
              createVNode("div", { class: "footer-links" }, [
                createVNode("div", { class: "friend-links" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(appOption).data?.friend_links || [], (link, index) => {
                    return openBlock(), createBlock(Fragment, { key: index }, [
                      index !== 0 ? (openBlock(), createBlock(_component_divider, {
                        key: 0,
                        type: "vertical",
                        size: "lg"
                      })) : createCommentVNode("", true),
                      createVNode("a", {
                        href: link.value,
                        class: "item",
                        target: "_blank",
                        rel: "external nofollow noopener"
                      }, toDisplayString(link.name), 9, ["href"])
                    ], 64);
                  }), 128))
                ]),
                createVNode("div", { class: "special-links" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(specialLinks), (item, index) => {
                    return openBlock(), createBlock(Fragment, { key: index }, [
                      index !== 0 ? (openBlock(), createBlock(_component_divider, {
                        key: 0,
                        type: "vertical",
                        size: "lg"
                      })) : createCommentVNode("", true),
                      createVNode("a", {
                        href: item.url,
                        class: "item",
                        target: "_blank",
                        rel: "external nofollow noopener"
                      }, toDisplayString(item.name), 9, ["href"])
                    ], 64);
                  }), 128))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/index.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const DesktopAboutPage = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-92031b7b"]]);
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const { isZhLang } = useEnhancer();
    const adminProfile = useAdminProfileStore();
    useAboutPageMeta();
    useUniversalFetch(() => adminProfile.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_ulink = resolveComponent("ulink");
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-a88e744c>`);
      _push(ssrRenderComponent(PageBanner, {
        "is-mobile": true,
        image: "/images/page-about/banner-mobile.webp",
        "image-position": 70,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).PAGE_ABOUT
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocaleKey).PAGE_ABOUT
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="profile" data-v-a88e744c><div class="avatar" data-v-a88e744c>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "image",
        src: unref(useAdminAvatar)(unref(adminProfile).data?.avatar)
      }, null, _parent));
      _push(`</div><h2 class="name" data-v-a88e744c>${ssrInterpolate(unref(adminProfile).data?.name || "-")}</h2><h5 class="slogan" data-v-a88e744c>${ssrInterpolate(unref(adminProfile).data?.slogan || "-")}</h5><h4 class="description" data-v-a88e744c>`);
      _push(ssrRenderComponent(_component_webfont, { bolder: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isZhLang) ? unref(APP_META).zh_description_short : unref(APP_META).en_description)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isZhLang) ? unref(APP_META).zh_description_short : unref(APP_META).en_description), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h4><div class="socials" data-v-a88e744c>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item github",
        href: unref(goLink).map.github
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-a88e744c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-github" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item instagram",
        href: unref(goLink).map.instagram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-instagram" data-v-a88e744c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-instagram" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item threads",
        href: unref(goLink).map.threads
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-threads" data-v-a88e744c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-threads" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item telegram",
        href: unref(goLink).map.telegram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-a88e744c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-telegram" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item zhihu",
        href: unref(goLink).map.zhihu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-zhihu" data-v-a88e744c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-zhihu" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item douban",
        href: unref(goLink).map["douban-movie"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-douban" data-v-a88e744c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-douban" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="biography" data-v-a88e744c><div class="bridge left" data-v-a88e744c></div><div class="bridge right" data-v-a88e744c></div><p class="content" data-v-a88e744c>${(unref(isZhLang) ? unref(i18ns).biography.zh : unref(i18ns).biography.en) ?? ""}</p></div><div class="buttons" data-v-a88e744c>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getPageRoute)(unref(RouteName).Archive)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-quill" data-v-a88e744c${_scopeId}></i><span class="label" data-v-a88e744c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).archive, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-quill" }),
              createVNode("span", { class: "label" }, [
                createVNode(_component_i18n, unref(i18ns).archive, null, 16)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getPageRoute)(unref(RouteName).Snippets)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-buddhism" data-v-a88e744c${_scopeId}></i><span class="label" data-v-a88e744c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).snippets, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-buddhism" }),
              createVNode("span", { class: "label" }, [
                createVNode(_component_i18n, unref(i18ns).snippets, null, 16)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getPageRoute)(unref(RouteName).Guestbook)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-comment" data-v-a88e744c${_scopeId}></i><span class="label" data-v-a88e744c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).guestbook, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-comment" }),
              createVNode("span", { class: "label" }, [
                createVNode(_component_i18n, unref(i18ns).guestbook, null, 16)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item discord",
        href: unref(goLink).map["discord-server"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-discord" data-v-a88e744c${_scopeId}></i><span class="label" data-v-a88e744c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).discordGroup, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-discord" }),
              createVNode("span", { class: "label" }, [
                createVNode(_component_i18n, unref(i18ns).discordGroup, null, 16)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item telegram",
        href: unref(goLink).map["telegram-group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-a88e744c${_scopeId}></i><span class="label" data-v-a88e744c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).telegramGroup, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-telegram" }),
              createVNode("span", { class: "label" }, [
                createVNode(_component_i18n, unref(i18ns).telegramGroup, null, 16)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item rss",
        href: unref(VALUABLE_LINKS).RSS
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-rss" data-v-a88e744c${_scopeId}></i><span class="label" data-v-a88e744c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).rss, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-rss" }),
              createVNode("span", { class: "label" }, [
                createVNode(_component_i18n, unref(i18ns).rss, null, 16)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="qrcodes" data-v-a88e744c><div class="item" data-v-a88e744c>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "image",
        src: "/images/qrcodes/whatsapp.webp"
      }, null, _parent));
      _push(`</div><div class="item" data-v-a88e744c>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "image",
        src: "/images/qrcodes/wechat.webp"
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/mobile/index.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const MobileAboutPage = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-a88e744c"]]);
const bannerImage = `/images/page-guestbook/banner.webp`;
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "guestbook",
  __ssrInlineRender: true,
  props: {
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, isZhLang } = useEnhancer();
    const { identity, appOption, comment: commentStore } = useStores();
    const isLiked = computed(() => identity.isLikedPage(CommentPostId.Guestbook));
    const siteLikes = computed(() => appOption.data?.meta.likes || 0);
    const isLoading = ref(isClient);
    const handleLike = async () => {
      if (isLiked.value) {
        return false;
      }
      try {
        await appOption.postSiteLike();
        identity.likePage(CommentPostId.Guestbook);
      } catch (error) {
        const message = _i18n.t(LocaleKey.POST_ACTION_ERROR);
        logger$1.warn(message, error);
        alert(message);
      }
    };
    const fetchAllData = () => {
      const appOptionRequest = appOption.fetch();
      const commentRequest = commentStore.fetchList({ post_id: CommentPostId.Guestbook });
      return Promise.all([appOptionRequest, commentRequest]).then(() => {
        isLoading.value = false;
      });
    };
    usePageSeo(() => {
      const enTitle = firstUpperCase(_i18n.t(LocaleKey.PAGE_GUESTBOOK, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LocaleKey.PAGE_GUESTBOOK), enTitle] : [enTitle];
      const description = isZhLang.value ? `给 ${APP_META.author} 留言` : "Leave a comment";
      return {
        pageTitles: titles,
        description,
        ogType: "website",
        ogImage: bannerImage,
        ogImageWidth: 620,
        ogImageHeight: 350
      };
    });
    useUniversalFetch(() => fetchAllData());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_responsive = resolveComponent("responsive");
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "guestbook-page" }, _attrs))} data-v-5b88984b>`);
      _push(ssrRenderComponent(_component_responsive, null, {
        desktop: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="desktop-banner" data-v-5b88984b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_uimage, {
              class: "image",
              src: bannerImage,
              cdn: ""
            }, null, _parent2, _scopeId));
            _push2(`<button class="${ssrRenderClass([{ liked: isLiked.value }, "like"])}"${ssrIncludeBooleanAttr(isLiked.value) ? " disabled" : ""} data-v-5b88984b${_scopeId}><i class="icon iconfont icon-heart" data-v-5b88984b${_scopeId}></i><span class="count" data-v-5b88984b${_scopeId}>${ssrInterpolate(isLiked.value ? `${siteLikes.value - 1} + 1` : siteLikes.value)}</span></button><span class="slogan" data-v-5b88984b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_webfont, { class: "text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).GUESTBOOK_SLOGAN
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).GUESTBOOK_SLOGAN
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span></div>`);
          } else {
            return [
              createVNode("div", { class: "desktop-banner" }, [
                createVNode(_component_uimage, {
                  class: "image",
                  src: bannerImage,
                  cdn: ""
                }),
                createVNode("button", {
                  class: ["like", { liked: isLiked.value }],
                  disabled: isLiked.value,
                  onClick: handleLike
                }, [
                  createVNode("i", { class: "icon iconfont icon-heart" }),
                  createVNode("span", { class: "count" }, toDisplayString(isLiked.value ? `${siteLikes.value - 1} + 1` : siteLikes.value), 1)
                ], 10, ["disabled"]),
                createVNode("span", { class: "slogan" }, [
                  createVNode(_component_webfont, { class: "text" }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocaleKey).GUESTBOOK_SLOGAN
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        mobile: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PageBanner, {
              class: "mobile-banner",
              "is-mobile": true,
              image: bannerImage,
              "image-position": 70,
              cdn: ""
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).PAGE_GUESTBOOK
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).PAGE_GUESTBOOK
                    }, null, 8, ["k"])
                  ];
                }
              }),
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).GUESTBOOK_SLOGAN
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).GUESTBOOK_SLOGAN
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(PageBanner, {
                class: "mobile-banner",
                "is-mobile": true,
                image: bannerImage,
                "image-position": 70,
                cdn: ""
              }, {
                title: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).PAGE_GUESTBOOK
                  }, null, 8, ["k"])
                ]),
                description: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).GUESTBOOK_SLOGAN
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="comment" data-v-5b88984b>`);
      _push(ssrRenderComponent(Comment, {
        "post-id": 0,
        plain: props.isMobile,
        fetching: isLoading.value
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/guestbook.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const GuestbookPage = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-5b88984b"]]);
const APP_LOGO_URL = "/images/page-app/logo.png";
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  props: {
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, isZhLang } = useEnhancer();
    const handleAppEvent = (name) => {
    };
    usePageSeo(() => {
      const enTitle = firstUpperCase(_i18n.t(LocaleKey.PAGE_APP, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LocaleKey.PAGE_APP), enTitle] : [enTitle];
      return {
        pageTitles: titles,
        description: `${APP_META.title} App ${isZhLang.value ? "下载" : "download"}`,
        ogImage: APP_LOGO_URL
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["app-page", { mobile: props.isMobile }]
      }, _attrs))} data-v-b9d7d693><div class="app" data-v-b9d7d693><div class="logo" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_uimage, {
        alt: "app-logo",
        src: APP_LOGO_URL,
        cdn: ""
      }, null, _parent));
      _push(`</div><h2 class="title" data-v-b9d7d693>${ssrInterpolate(unref(APP_META).title)}</h2><p class="description" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_webfont, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocaleKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><div class="screen" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_uimage, {
        alt: "app-hot",
        class: "screen-img",
        src: "/images/page-app/hot.webp",
        cdn: ""
      }, null, _parent));
      _push(`<div class="download" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "qrcode",
        alt: "qrcode",
        src: "/images/page-app/qrcode.png",
        cdn: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: unref(VALUABLE_LINKS).GITHUB_SURMON_ME_NATIVE + "#android",
        onMousedown: ($event) => handleAppEvent()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon iconfont icon-android" data-v-b9d7d693${_scopeId}></i><span class="text" data-v-b9d7d693${_scopeId}>Android</span><i class="new-window iconfont icon-new-window-s" data-v-b9d7d693${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "icon iconfont icon-android" }),
              createVNode("span", { class: "text" }, "Android"),
              createVNode("i", { class: "new-window iconfont icon-new-window-s" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: unref(VALUABLE_LINKS).GITHUB_SURMON_ME_NATIVE + "#ios",
        onMousedown: ($event) => handleAppEvent()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon iconfont icon-apple" data-v-b9d7d693${_scopeId}></i><span class="text" data-v-b9d7d693${_scopeId}>iOS</span><i class="new-window iconfont icon-new-window-s" data-v-b9d7d693${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "icon iconfont icon-apple" }),
              createVNode("span", { class: "text" }, "iOS"),
              createVNode("i", { class: "new-window iconfont icon-new-window-s" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "source-code",
        href: unref(VALUABLE_LINKS).GITHUB_SURMON_ME_NATIVE,
        onMousedown: ($event) => handleAppEvent()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-git" data-v-b9d7d693${_scopeId}></i> Source Code `);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-git" }),
              createTextVNode(" Source Code ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><p class="rss" data-v-b9d7d693><span class="prefix" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "（",
        en: "["
      }, null, _parent));
      _push(`</span><span class="deprecated" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "此项目已废弃！",
        en: "DEPRECATED!"
      }, null, _parent));
      _push(`</span>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "建议使用",
        en: "Recommend"
      }, null, _parent));
      _push(`<a class="link"${ssrRenderAttr("href", unref(VALUABLE_LINKS).RSS)} target="_blank" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "RSS 订阅",
        en: "RSS subscription"
      }, null, _parent));
      _push(`</a><span class="suffix" data-v-b9d7d693>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "）",
        en: "]"
      }, null, _parent));
      _push(`</span></p></div></div>`);
    };
  }
});
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/app.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const AppPage = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-b9d7d693"]]);
var ProviderId = /* @__PURE__ */ ((ProviderId2) => {
  ProviderId2["GitHub"] = "github";
  ProviderId2["PayPal"] = "paypal";
  ProviderId2["Alipay"] = "alipay";
  ProviderId2["WeChatPay"] = "wechat-pay";
  ProviderId2["BitCoin"] = "bitcoin";
  ProviderId2["Ethereum"] = "ethereum";
  return ProviderId2;
})(ProviderId || {});
const PROVIDER_IDS = Object.values(ProviderId);
const PROVIDERS = [
  {
    id: "github",
    title: "GitHub Sponsors",
    logo: "/images/third-party/github-sponsors-logo.svg"
  },
  {
    id: "paypal",
    title: "PayPal me",
    logo: "/images/third-party/paypal-logo.svg",
    qrcode: "/images/third-party/paypal-qrcode.webp",
    link: GO_LINK_MAP.paypal
  },
  {
    id: "alipay",
    title: "支付宝",
    logo: "/images/third-party/alipay-logo.svg",
    qrcode: "/images/third-party/alipay-qrcode.webp",
    text: "通过支付宝扫码"
  },
  {
    id: "wechat-pay",
    title: "微信赞赏",
    logo: "/images/third-party/wechat-pay-logo.svg",
    qrcode: "/images/third-party/wechat-pay-qrcode.webp",
    text: "通过微信扫码"
  },
  {
    id: "bitcoin",
    title: "BTC",
    logo: "/images/third-party/btc-logo.svg",
    address: IDENTITIES.BTC_ADDRESS,
    qrcode: "/images/third-party/btc-qrcode.webp"
  },
  {
    id: "ethereum",
    title: "ETH",
    logo: "/images/third-party/eth-logo.svg",
    address: IDENTITIES.ETH_ADDRESS,
    qrcode: "/images/third-party/eth-qrcode.webp"
  }
];
const useSponsorState = (initId) => {
  useEnhancer();
  const activeId = ref(PROVIDERS[0].id);
  const activeProvider = computed(() => PROVIDERS.find((t) => t.id === activeId.value));
  const setProviderId = (id) => {
    if (PROVIDER_IDS.includes(id)) {
      activeId.value = id;
    }
  };
  return {
    activeId,
    activeProvider,
    setProviderId
  };
};
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "tabs",
  __ssrInlineRender: true,
  props: {
    state: {},
    hideTitle: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["sponsor-tabs", _ctx.state.activeId]
      }, _attrs))} data-v-706f35ac><!--[-->`);
      ssrRenderList(unref(PROVIDERS), (provider, index) => {
        _push(`<button class="${ssrRenderClass([[provider.id, { active: _ctx.state.activeId.value === provider.id }], "item"])}"${ssrRenderAttr("title", provider.title)} data-v-706f35ac><span class="logo" data-v-706f35ac>`);
        _push(ssrRenderComponent(_component_uimage, {
          class: "image",
          alt: provider.title,
          src: provider.logo,
          cdn: ""
        }, null, _parent));
        _push(`</span>`);
        if (!_ctx.hideTitle) {
          _push(`<span class="title" data-v-706f35ac>${ssrInterpolate(provider.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/tabs.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const SponsorTabs = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-706f35ac"]]);
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "_crypto",
  __ssrInlineRender: true,
  props: {
    address: {},
    qrcode: {}
  },
  setup(__props) {
    const props = __props;
    useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "crypto-provider" }, _attrs))} data-v-686dab3f><code class="address" data-v-686dab3f>${ssrInterpolate(props.address)}</code><i class="iconfont icon-qrcode" data-v-686dab3f></i></div>`);
    };
  }
});
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/providers/_crypto.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const CryptoProvider = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-686dab3f"]]);
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "_qrcode",
  __ssrInlineRender: true,
  props: {
    qrcode: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qrcode-provider" }, _attrs))} data-v-0c3e2eef>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "qrcode",
        src: props.qrcode,
        cdn: ""
      }, null, _parent));
      _push(`<div class="content" data-v-0c3e2eef>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/providers/_qrcode.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const QrcodeProvider = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-0c3e2eef"]]);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "paypal",
  __ssrInlineRender: true,
  props: {
    qrcode: {},
    link: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      _push(ssrRenderComponent(QrcodeProvider, mergeProps({
        class: "paypal-provider",
        qrcode: props.qrcode
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link",
              href: props.link
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconfont icon-link" data-v-ea9fdc4e${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "iconfont icon-link" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ulink, {
                class: "link",
                href: props.link
              }, {
                default: withCtx(() => [
                  createVNode("i", { class: "iconfont icon-link" })
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/providers/paypal.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const PaypalProvider = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-ea9fdc4e"]]);
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "alipay",
  __ssrInlineRender: true,
  props: {
    qrcode: {},
    text: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(QrcodeProvider, mergeProps({
        class: "alipay-provider",
        qrcode: props.qrcode
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text" data-v-0ee50abf${_scopeId}><i class="iconfont icon-qrcode" data-v-0ee50abf${_scopeId}></i><span data-v-0ee50abf${_scopeId}>${ssrInterpolate(props.text)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "text" }, [
                createVNode("i", { class: "iconfont icon-qrcode" }),
                createVNode("span", null, toDisplayString(props.text), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/providers/alipay.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const AlipayProvider = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-0ee50abf"]]);
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "wechat-pay",
  __ssrInlineRender: true,
  props: {
    qrcode: {},
    text: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(QrcodeProvider, mergeProps({
        class: "alipay-provider",
        qrcode: props.qrcode
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text" data-v-d4191234${_scopeId}><i class="iconfont icon-qrcode" data-v-d4191234${_scopeId}></i><span data-v-d4191234${_scopeId}>${ssrInterpolate(props.text)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "text" }, [
                createVNode("i", { class: "iconfont icon-qrcode" }),
                createVNode("span", null, toDisplayString(props.text), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/providers/wechat-pay.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const WechatpayProvider = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-d4191234"]]);
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "github-sponsors",
  __ssrInlineRender: true,
  props: {
    maxCount: {},
    listData: {}
  },
  setup(__props) {
    const props = __props;
    const { goLink } = useStores();
    const allSponsors = computed(() => {
      if (!props.listData) {
        return [];
      }
      return [
        ...props.listData.currentSponsors.map((sponsor) => ({
          active: true,
          _: sponsor
        })),
        ...props.listData.pastSponsors.map((sponsor) => ({
          active: false,
          _: sponsor
        }))
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "github-sponsors" }, _attrs))} data-v-92435f8e>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        href: unref(goLink).map["github-sponsors"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_uimage, {
              class: "icon",
              src: "/images/third-party/github-sponsors-heart.svg",
              alt: "GitHub Sponsors"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text" data-v-92435f8e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              en: "Sponsor me on GitHub",
              zh: "通过 GitHub Sponsor 赞助我"
            }, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode(_component_uimage, {
                class: "icon",
                src: "/images/third-party/github-sponsors-heart.svg",
                alt: "GitHub Sponsors"
              }),
              createVNode("span", { class: "text" }, [
                createVNode(_component_i18n, {
                  en: "Sponsor me on GitHub",
                  zh: "通过 GitHub Sponsor 赞助我"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (props.listData && allSponsors.value.length) {
        _push(`<div class="sponsor-box" data-v-92435f8e><p class="total" data-v-92435f8e>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 我在 GitHub Sponsors 累计已得到 <span class="active-total" data-v-92435f8e${_scopeId}>${ssrInterpolate(props.listData.currentSponsors.length)}</span> + ${ssrInterpolate(props.listData.pastSponsors.length)} 位赞助者的支持 `);
            } else {
              return [
                createTextVNode(" 我在 GitHub Sponsors 累计已得到 "),
                createVNode("span", { class: "active-total" }, toDisplayString(props.listData.currentSponsors.length), 1),
                createTextVNode(" + " + toDisplayString(props.listData.pastSponsors.length) + " 位赞助者的支持 ", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` I have accumulated <span class="active-total" data-v-92435f8e${_scopeId}>${ssrInterpolate(props.listData.currentSponsors.length)}</span> + ${ssrInterpolate(props.listData.pastSponsors.length)} backers on GitHub Sponsors `);
            } else {
              return [
                createTextVNode(" I have accumulated "),
                createVNode("span", { class: "active-total" }, toDisplayString(props.listData.currentSponsors.length), 1),
                createTextVNode(" + " + toDisplayString(props.listData.pastSponsors.length) + " backers on GitHub Sponsors ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><div class="sponsors" data-v-92435f8e><!--[-->`);
        ssrRenderList(allSponsors.value.slice(0, props.maxCount), ({ _: item, active }, index) => {
          _push(ssrRenderComponent(_component_ulink, {
            href: item.url,
            title: item.name,
            class: ["item", active ? "active" : "inactive"],
            key: index
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_uimage, {
                  class: "avatar",
                  src: item.avatarUrl,
                  alt: "@" + item.login
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_uimage, {
                    class: "avatar",
                    src: item.avatarUrl,
                    alt: "@" + item.login
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (allSponsors.value.length > props.maxCount) {
          _push(ssrRenderComponent(_component_ulink, {
            class: "more-link",
            href: unref(goLink).map["github-sponsors"]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` + ${ssrInterpolate(allSponsors.value.length - props.maxCount)}`);
              } else {
                return [
                  createTextVNode(" + " + toDisplayString(allSponsors.value.length - props.maxCount), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/providers/github-sponsors.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const GithubSponsorsProvider = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-92435f8e"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "provider",
  __ssrInlineRender: true,
  props: {
    state: {},
    githubSponsorsData: {},
    githubSponsorsMaxCount: { default: 19 }
  },
  setup(__props) {
    const props = __props;
    const activeProvider = computed(() => props.state.activeProvider.value);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["sponsor-provider", activeProvider.value.id]
      }, _attrs))} data-v-8f352464>`);
      if (activeProvider.value.id == unref(ProviderId).GitHub) {
        _push(ssrRenderComponent(GithubSponsorsProvider, {
          "list-data": props.githubSponsorsData,
          "max-count": props.githubSponsorsMaxCount
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.id == unref(ProviderId).PayPal) {
        _push(ssrRenderComponent(PaypalProvider, {
          qrcode: activeProvider.value.qrcode,
          link: activeProvider.value.link
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.id == unref(ProviderId).Alipay) {
        _push(ssrRenderComponent(AlipayProvider, {
          qrcode: activeProvider.value.qrcode,
          text: activeProvider.value.text
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.id == unref(ProviderId).WeChatPay) {
        _push(ssrRenderComponent(WechatpayProvider, {
          qrcode: activeProvider.value.qrcode,
          text: activeProvider.value.text
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.id == unref(ProviderId).BitCoin) {
        _push(ssrRenderComponent(CryptoProvider, {
          qrcode: activeProvider.value.qrcode,
          address: activeProvider.value.address
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.id == unref(ProviderId).Ethereum) {
        _push(ssrRenderComponent(CryptoProvider, {
          qrcode: activeProvider.value.qrcode,
          address: activeProvider.value.address
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/sponsor/provider.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const SponsorProvider = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-8f352464"]]);
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "sponsor",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, route, isZhLang } = useEnhancer();
    const sponsorState = useSponsorState();
    const githubSponsorsStore = useGitHubSponsorsStore();
    usePageSeo(() => {
      const enTitle = firstUpperCase(_i18n.t(LocaleKey.PAGE_SPONSOR, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LocaleKey.PAGE_SPONSOR), enTitle] : [enTitle];
      return { pageTitles: titles };
    });
    onBeforeMount(() => {
      githubSponsorsStore.fetch();
    });
    onMounted(() => {
      const targetId = route.hash.replace("#", "");
      if (targetId) {
        sponsorState.setProviderId(targetId);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_container = resolveComponent("container");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sponsor-page" }, _attrs))} data-v-7496cbdd>`);
      _push(ssrRenderComponent(PageBanner, {
        image: "/images/page-sponsor/banner.webp",
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "赠吾玫瑰，手留余香",
                    en: "Become a sponsor to me"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "赠吾玫瑰，手留余香",
                      en: "Become a sponsor to me"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    zh: "赠吾玫瑰，手留余香",
                    en: "Become a sponsor to me"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "你的慷慨赞助将是我持续输出的不竭动力",
              en: "Your generous financial support is my motivation to keep moving forward"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                zh: "你的慷慨赞助将是我持续输出的不竭动力",
                en: "Your generous financial support is my motivation to keep moving forward"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="page-content" data-v-7496cbdd>`);
      _push(ssrRenderComponent(_component_container, { class: "tabs-wrapper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(SponsorTabs, {
              class: "sponsor-tabs",
              state: unref(sponsorState)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(SponsorTabs, {
                class: "sponsor-tabs",
                state: unref(sponsorState)
              }, null, 8, ["state"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(SponsorProvider, {
        class: "sponsor-provider",
        state: unref(sponsorState),
        "github-sponsors-data": unref(githubSponsorsStore).data
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/sponsor.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const SponsorPage = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-7496cbdd"]]);
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "skeleton",
  __ssrInlineRender: true,
  props: {
    columns: {},
    height: {},
    rows: { default: 2 }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_skeleton_base = resolveComponent("skeleton-base");
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: "skeletons",
        style: { gridTemplateColumns: `repeat(${_ctx.columns}, 1fr)` }
      }, _attrs))} data-v-f6c02fee><!--[-->`);
      ssrRenderList(_ctx.columns * _ctx.rows, (item) => {
        _push(`<div class="item" style="${ssrRenderStyle({ height: `${_ctx.height}px` })}" data-v-f6c02fee>`);
        _push(ssrRenderComponent(_component_skeleton_base, null, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/skeleton.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const YoutubeSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-f6c02fee"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "swiper",
  __ssrInlineRender: true,
  props: {
    data: {},
    rows: { default: 2 },
    columns: { default: 5 }
  },
  setup(__props) {
    const swiperRef = shallowRef();
    const swiperState = reactive({ canPrev: false, canNext: true });
    const handleSlideChange = (_swiper) => {
      swiperState.canNext = !_swiper.isEnd;
      swiperState.canPrev = !_swiper.isBeginning;
    };
    const setSwiper = (_swiper) => {
      swiperRef.value = _swiper;
      handleSlideChange(_swiper);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-swiper" }, _attrs))} data-v-5fa9a393><div class="navigation prev" data-v-5fa9a393><button class="button"${ssrIncludeBooleanAttr(!swiperState.canPrev) ? " disabled" : ""} data-v-5fa9a393><i class="iconfont icon-prev" data-v-5fa9a393></i></button></div><div class="navigation next" data-v-5fa9a393><button class="button"${ssrIncludeBooleanAttr(!swiperState.canNext) ? " disabled" : ""} data-v-5fa9a393><i class="iconfont icon-next" data-v-5fa9a393></i></button></div>`);
      _push(ssrRenderComponent(unref(Swiper$1), {
        class: "swiper",
        autoplay: true,
        mousewheel: false,
        "grab-cursor": false,
        "allow-touch-move": false,
        "slides-per-view": _ctx.columns,
        "slides-per-group": _ctx.columns,
        grid: { rows: _ctx.rows, fill: "row" },
        "space-between": 24,
        onSlideChange: handleSlideChange,
        onSwiper: setSwiper
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.data, (item, index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                class: "slide-item",
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index }), null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index }), void 0, true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.data, (item, index) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  class: "slide-item",
                  key: index
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index }), void 0, true)
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/swiper.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const ListSwiper = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-5fa9a393"]]);
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "videos",
  __ssrInlineRender: true,
  props: {
    playlistId: {}
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { cdnDomain } = useEnhancer();
    const videos = ref([]);
    const fetching = ref(true);
    const fetchVideos = async () => {
      try {
        fetching.value = true;
        const request = tunnel$1.fetch(TunnelModule.YouTubeVideoList, { id: props.playlistId });
        videos.value = await (isClient ? delayPromise(480, request) : request);
      } catch (error) {
        videos.value = [];
      } finally {
        fetching.value = false;
      }
    };
    const getThumbnailURL = (thumbnails) => {
      const url = thumbnails.high?.url || thumbnails.medium?.url || thumbnails.defult?.url;
      return url ? getCdnProxyURL(cdnDomain, url) : "";
    };
    const handleView = (video) => {
      emit("view", video);
    };
    onMounted(() => fetchVideos());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_udate = resolveComponent("udate");
      const _directive_lozad = resolveDirective("lozad");
      let _temp0;
      _push(ssrRenderComponent(_component_placeholder, mergeProps({
        data: videos.value,
        loading: fetching.value
      }, _attrs), {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "empty", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "empty", {}, void 0, true)
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "loading", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "loading", {}, void 0, true)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ListSwiper, { data: videos.value }, {
              item: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="video" data-v-ebed2d58${_scopeId2}><div class="thumbnail" data-v-ebed2d58${_scopeId2}><div class="mask" data-v-ebed2d58${_scopeId2}><div class="button" data-v-ebed2d58${_scopeId2}><i class="iconfont icon-music-play" data-v-ebed2d58${_scopeId2}></i></div></div><span class="published-at" data-v-ebed2d58${_scopeId2}><i class="iconfont icon-clock" data-v-ebed2d58${_scopeId2}></i><span class="text" data-allow-mismatch data-v-ebed2d58${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_udate, {
                    to: "ago",
                    date: item.snippet.publishedAt
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></span><div${ssrRenderAttrs(_temp0 = mergeProps({
                    class: "background",
                    "data-background-image": getThumbnailURL(item.snippet.thumbnails)
                  }, ssrGetDirectiveProps(_ctx, _directive_lozad)))} data-v-ebed2d58${_scopeId2}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</div></div><h5 class="title" data-v-ebed2d58${_scopeId2}>${ssrInterpolate(item.snippet.title)}</h5><div class="description" data-v-ebed2d58${_scopeId2}>${ssrInterpolate(item.snippet.description || "-")}</div></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "video",
                      onClick: ($event) => handleView(item)
                    }, [
                      createVNode("div", { class: "thumbnail" }, [
                        createVNode("div", { class: "mask" }, [
                          createVNode("div", { class: "button" }, [
                            createVNode("i", { class: "iconfont icon-music-play" })
                          ])
                        ]),
                        createVNode("span", { class: "published-at" }, [
                          createVNode("i", { class: "iconfont icon-clock" }),
                          createVNode("span", {
                            class: "text",
                            "data-allow-mismatch": ""
                          }, [
                            createVNode(_component_udate, {
                              to: "ago",
                              date: item.snippet.publishedAt
                            }, null, 8, ["date"])
                          ])
                        ]),
                        withDirectives(createVNode("div", {
                          class: "background",
                          "data-background-image": getThumbnailURL(item.snippet.thumbnails)
                        }, null, 8, ["data-background-image"]), [
                          [_directive_lozad]
                        ])
                      ]),
                      createVNode("h5", { class: "title" }, toDisplayString(item.snippet.title), 1),
                      createVNode("div", { class: "description" }, toDisplayString(item.snippet.description || "-"), 1)
                    ], 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(ListSwiper, { data: videos.value }, {
                item: withCtx(({ item }) => [
                  createVNode("div", {
                    class: "video",
                    onClick: ($event) => handleView(item)
                  }, [
                    createVNode("div", { class: "thumbnail" }, [
                      createVNode("div", { class: "mask" }, [
                        createVNode("div", { class: "button" }, [
                          createVNode("i", { class: "iconfont icon-music-play" })
                        ])
                      ]),
                      createVNode("span", { class: "published-at" }, [
                        createVNode("i", { class: "iconfont icon-clock" }),
                        createVNode("span", {
                          class: "text",
                          "data-allow-mismatch": ""
                        }, [
                          createVNode(_component_udate, {
                            to: "ago",
                            date: item.snippet.publishedAt
                          }, null, 8, ["date"])
                        ])
                      ]),
                      withDirectives(createVNode("div", {
                        class: "background",
                        "data-background-image": getThumbnailURL(item.snippet.thumbnails)
                      }, null, 8, ["data-background-image"]), [
                        [_directive_lozad]
                      ])
                    ]),
                    createVNode("h5", { class: "title" }, toDisplayString(item.snippet.title), 1),
                    createVNode("div", { class: "description" }, toDisplayString(item.snippet.description || "-"), 1)
                  ], 8, ["onClick"])
                ]),
                _: 1
              }, 8, ["data"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/videos.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const YoutubeVideoList = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-ebed2d58"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "playlist",
  __ssrInlineRender: true,
  props: {
    playlists: {}
  },
  setup(__props) {
    const modelIframeLoaded = ref(false);
    const youtubeModalVideo = ref(null);
    const isOnYouTubeModal = computed(() => Boolean(youtubeModalVideo.value));
    const youTubeModalURL = computed(() => {
      const video = youtubeModalVideo.value;
      return video ? getYouTubeVideoEmbedURL(video.snippet.resourceId.videoId, video.snippet.playlistId) : void 0;
    });
    const openYouTubeModal = (video) => {
      modelIframeLoaded.value = false;
      youtubeModalVideo.value = video;
    };
    const closeYouTubeModal = () => {
      youtubeModalVideo.value = null;
      modelIframeLoaded.value = false;
    };
    const handleVideoIframeLoaded = () => {
      modelIframeLoaded.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_spin = resolveComponent("spin");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-playlist" }, _attrs))} data-v-26a57776><ul class="playlist" data-v-26a57776><!--[-->`);
      ssrRenderList(_ctx.playlists, (list, index) => {
        _push(`<li class="item"${ssrRenderAttr("title", list.title)} data-v-26a57776>`);
        ssrRenderSlot(_ctx.$slots, "title", mergeProps({ ref_for: true }, { list, index }), null, _push, _parent);
        _push(ssrRenderComponent(YoutubeVideoList, {
          "playlist-id": list.id,
          onView: openYouTubeModal
        }, {
          empty: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "empty", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "empty", {}, void 0, true)
              ];
            }
          }),
          loading: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "loading", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "loading", {}, void 0, true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: isOnYouTubeModal.value,
              "scroll-close": false,
              onClose: closeYouTubeModal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="youtube-modal" data-v-26a57776${_scopeId2}><iframe class="youtube-iframe"${ssrRenderAttr("src", youTubeModalURL.value)} data-v-26a57776${_scopeId2}></iframe>`);
                  if (!modelIframeLoaded.value) {
                    _push3(`<div class="loading" data-v-26a57776${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_spin, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "youtube-modal" }, [
                      createVNode("iframe", {
                        class: "youtube-iframe",
                        src: youTubeModalURL.value,
                        onLoad: handleVideoIframeLoaded,
                        onError: handleVideoIframeLoaded
                      }, null, 40, ["src"]),
                      createVNode(Transition, { name: "module" }, {
                        default: withCtx(() => [
                          !modelIframeLoaded.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "loading"
                          }, [
                            createVNode(_component_spin)
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: isOnYouTubeModal.value,
                "scroll-close": false,
                onClose: closeYouTubeModal
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "youtube-modal" }, [
                    createVNode("iframe", {
                      class: "youtube-iframe",
                      src: youTubeModalURL.value,
                      onLoad: handleVideoIframeLoaded,
                      onError: handleVideoIframeLoaded
                    }, null, 40, ["src"]),
                    createVNode(Transition, { name: "module" }, {
                      default: withCtx(() => [
                        !modelIframeLoaded.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "loading"
                        }, [
                          createVNode(_component_spin)
                        ])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              }, 8, ["visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/playlist.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const YoutubePlaylist = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-26a57776"]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isZhLang } = useEnhancer();
    const { youtubePlayList, goLink } = useStores();
    const youtubePlaylistData = computed(() => {
      return youtubePlayList.data.filter((list) => list.contentDetails.itemCount > 1);
    });
    usePageSeo(() => {
      return {
        pageTitle: "YouTube",
        description: isZhLang.value ? `${APP_META.author} 的视频` : `${APP_META.author}'s YouTube`
      };
    });
    useUniversalFetch(() => youtubePlayList.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      const _component_container = resolveComponent("container");
      const _component_empty = resolveComponent("empty");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-page" }, _attrs))} data-v-e245f0c1>`);
      _push(ssrRenderComponent(PageBanner, {
        class: "page-banner",
        video: "/videos/clips/lake-1.mp4",
        "video-position": 58,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "山河入梦，春尽江南",
                    en: `${unref(APP_META).author}'s YouTube videos`
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "山河入梦，春尽江南",
                      en: `${unref(APP_META).author}'s YouTube videos`
                    }, null, 8, ["en"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    zh: "山河入梦，春尽江南",
                    en: `${unref(APP_META).author}'s YouTube videos`
                  }, null, 8, ["en"])
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="links" data-v-e245f0c1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item youtube",
              title: "YouTube Channel",
              href: unref(goLink).map.youtube
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="username" data-v-e245f0c1${_scopeId2}>${ssrInterpolate(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "username" }, toDisplayString(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "links" }, [
                createVNode(_component_ulink, {
                  class: "item youtube",
                  title: "YouTube Channel",
                  href: unref(goLink).map.youtube
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "username" }, toDisplayString(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID), 1)
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-bridge" }, null, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-content" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module-content" data-v-e245f0c1${_scopeId}>`);
            _push2(ssrRenderComponent(YoutubePlaylist, { playlists: youtubePlaylistData.value }, {
              title: withCtx(({ list }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h4 class="module-title youtube" data-v-e245f0c1${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_ulink, {
                    class: "link",
                    href: unref(getYouTubePlaylistURL)(list.id)
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(list.snippet.title)} (${ssrInterpolate(list.contentDetails.itemCount)}) `);
                      } else {
                        return [
                          createTextVNode(toDisplayString(list.snippet.title) + " (" + toDisplayString(list.contentDetails.itemCount) + ") ", 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_ulink, {
                    class: "brand",
                    href: unref(goLink).map.youtube
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<i class="iconfont icon-youtube" data-v-e245f0c1${_scopeId3}></i><span class="text" data-v-e245f0c1${_scopeId3}>YouTube · Channel</span>`);
                      } else {
                        return [
                          createVNode("i", { class: "iconfont icon-youtube" }),
                          createVNode("span", { class: "text" }, "YouTube · Channel")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`</h4>`);
                } else {
                  return [
                    createVNode("h4", { class: "module-title youtube" }, [
                      createVNode(_component_ulink, {
                        class: "link",
                        href: unref(getYouTubePlaylistURL)(list.id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(list.snippet.title) + " (" + toDisplayString(list.contentDetails.itemCount) + ") ", 1)
                        ]),
                        _: 2
                      }, 1032, ["href"]),
                      createVNode(_component_ulink, {
                        class: "brand",
                        href: unref(goLink).map.youtube
                      }, {
                        default: withCtx(() => [
                          createVNode("i", { class: "iconfont icon-youtube" }),
                          createVNode("span", { class: "text" }, "YouTube · Channel")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(YoutubeSkeleton, {
                    columns: 5,
                    rows: 1,
                    height: 166,
                    key: "loading",
                    class: "module-loading"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(YoutubeSkeleton, {
                      columns: 5,
                      rows: 1,
                      height: 166,
                      key: "loading",
                      class: "module-loading"
                    })
                  ];
                }
              }),
              empty: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_empty, {
                    class: "module-empty",
                    key: "empty"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_i18n, {
                          k: unref(LocaleKey).EMPTY_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LocaleKey).EMPTY_PLACEHOLDER
                          }, null, 8, ["k"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_empty, {
                      class: "module-empty",
                      key: "empty"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).EMPTY_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "module-content" }, [
                createVNode(YoutubePlaylist, { playlists: youtubePlaylistData.value }, {
                  title: withCtx(({ list }) => [
                    createVNode("h4", { class: "module-title youtube" }, [
                      createVNode(_component_ulink, {
                        class: "link",
                        href: unref(getYouTubePlaylistURL)(list.id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(list.snippet.title) + " (" + toDisplayString(list.contentDetails.itemCount) + ") ", 1)
                        ]),
                        _: 2
                      }, 1032, ["href"]),
                      createVNode(_component_ulink, {
                        class: "brand",
                        href: unref(goLink).map.youtube
                      }, {
                        default: withCtx(() => [
                          createVNode("i", { class: "iconfont icon-youtube" }),
                          createVNode("span", { class: "text" }, "YouTube · Channel")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  loading: withCtx(() => [
                    createVNode(YoutubeSkeleton, {
                      columns: 5,
                      rows: 1,
                      height: 166,
                      key: "loading",
                      class: "module-loading"
                    })
                  ]),
                  empty: withCtx(() => [
                    createVNode(_component_empty, {
                      class: "module-empty",
                      key: "empty"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).EMPTY_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["playlists"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/index.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const YoutubePage = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-e245f0c1"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "album",
  __ssrInlineRender: true,
  props: {
    media: {}
  },
  emits: ["load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const mediaChildren = shallowRef([]);
    const fetchMediaChildren = async (mediaId) => {
      mediaChildren.value = await tunnel$1.fetch(TunnelModule.InstagramMediaChildren, {
        id: mediaId
      });
    };
    const activeIndex = shallowRef(0);
    const canGoPrev = computed(() => activeIndex.value > 0);
    const canGoNext = computed(() => activeIndex.value < mediaChildren.value.length - 1);
    onMounted(() => {
      fetchMediaChildren(props.media.id).finally(() => emit("load"));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "album-box" }, _attrs))} data-v-fd882815><div class="navigation prev" data-v-fd882815><button class="button"${ssrIncludeBooleanAttr(!canGoPrev.value) ? " disabled" : ""} data-v-fd882815><i class="iconfont icon-prev" data-v-fd882815></i></button></div><div class="navigation next" data-v-fd882815><button class="button"${ssrIncludeBooleanAttr(!canGoNext.value) ? " disabled" : ""} data-v-fd882815><i class="iconfont icon-next" data-v-fd882815></i></button></div><div class="pagination" data-v-fd882815><!--[-->`);
      ssrRenderList(mediaChildren.value.length, (index) => {
        _push(`<span class="${ssrRenderClass([{ active: index === activeIndex.value + 1 }, "index"])}" data-v-fd882815></span>`);
      });
      _push(`<!--]--></div>`);
      if (mediaChildren.value[activeIndex.value]) {
        ssrRenderSlot(_ctx.$slots, "child", { activeIndex: activeIndex.value, activeMedia: mediaChildren.value[activeIndex.value] }, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/album.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const InstagramAlbum = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-fd882815"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "gallery",
  __ssrInlineRender: true,
  props: {
    media: {},
    index: {},
    count: {}
  },
  setup(__props) {
    const { cdnDomain, isCNUser } = useEnhancer();
    const isLoaded = ref(false);
    const mediaLoaded = () => {
      isLoaded.value = true;
    };
    const getMediaUrl = (url) => {
      return isCNUser ? getCdnProxyURL(cdnDomain, url) : url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_udate = resolveComponent("udate");
      const _component_spin = resolveComponent("spin");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "instagram-gallery" }, _attrs))} data-v-f2b0cb55><div class="topbar" data-v-f2b0cb55><div class="left" data-v-f2b0cb55>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "type-link",
        href: _ctx.media.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isVideoMediaIns)(_ctx.media)) {
              _push2(`<i class="iconfont icon-video" data-v-f2b0cb55${_scopeId}></i>`);
            } else if (unref(isAlbumMediaIns)(_ctx.media)) {
              _push2(`<i class="iconfont icon-album" data-v-f2b0cb55${_scopeId}></i>`);
            } else {
              _push2(`<i class="iconfont icon-camera" data-v-f2b0cb55${_scopeId}></i>`);
            }
          } else {
            return [
              unref(isVideoMediaIns)(_ctx.media) ? (openBlock(), createBlock("i", {
                key: 0,
                class: "iconfont icon-video"
              })) : unref(isAlbumMediaIns)(_ctx.media) ? (openBlock(), createBlock("i", {
                key: 1,
                class: "iconfont icon-album"
              })) : (openBlock(), createBlock("i", {
                key: 2,
                class: "iconfont icon-camera"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="center" data-v-f2b0cb55><span class="pagination" data-v-f2b0cb55>${ssrInterpolate(_ctx.index + 1)} / ${ssrInterpolate(_ctx.count)}</span></div><div class="right" data-v-f2b0cb55><span class="timestamp" data-v-f2b0cb55>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "YMDm",
        date: _ctx.media.timestamp,
        separator: "/"
      }, null, _parent));
      _push(`</span></div></div><div class="${ssrRenderClass([{ loaded: isLoaded.value }, "content"])}" data-v-f2b0cb55>`);
      if (!isLoaded.value) {
        _push(`<div class="loading" data-v-f2b0cb55>`);
        _push(ssrRenderComponent(_component_spin, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isVideoMediaIns)(_ctx.media)) {
        _push(`<video class="video"${ssrRenderAttr("src", getMediaUrl(_ctx.media.media_url))} autoplay data-v-f2b0cb55></video>`);
      } else if (unref(isAlbumMediaIns)(_ctx.media)) {
        _push(ssrRenderComponent(InstagramAlbum, {
          class: "album",
          media: _ctx.media,
          onLoad: mediaLoaded
        }, {
          child: withCtx(({ activeMedia }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(isImageMediaIns)(activeMedia)) {
                _push2(`<img class="image"${ssrRenderAttr("src", getMediaUrl(activeMedia?.media_url))}${ssrRenderAttr("alt", activeMedia?.caption)} draggable="false" data-v-f2b0cb55${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(isVideoMediaIns)(activeMedia)) {
                _push2(`<video class="video" autoplay${ssrRenderAttr("src", getMediaUrl(activeMedia?.media_url))} data-v-f2b0cb55${_scopeId}></video>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(isImageMediaIns)(activeMedia) ? (openBlock(), createBlock("img", {
                  key: 0,
                  class: "image",
                  src: getMediaUrl(activeMedia?.media_url),
                  alt: activeMedia?.caption,
                  draggable: "false"
                }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                unref(isVideoMediaIns)(activeMedia) ? (openBlock(), createBlock("video", {
                  key: 1,
                  class: "video",
                  autoplay: "",
                  src: getMediaUrl(activeMedia?.media_url)
                }, null, 8, ["src"])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<img class="image"${ssrRenderAttr("src", getMediaUrl(_ctx.media?.media_url))}${ssrRenderAttr("alt", _ctx.media.caption)} draggable="false" loading="lazy" data-v-f2b0cb55>`);
      }
      if (_ctx.media.caption) {
        _push(`<p class="caption" data-v-f2b0cb55>${_ctx.media.caption.replaceAll("\n", "<br>") ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ulink, {
        class: "username-link",
        href: _ctx.media.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`@${ssrInterpolate(unref(IDENTITIES).INSTAGRAM_USERNAME)}`);
          } else {
            return [
              createTextVNode("@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/gallery.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const InsGallery = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-f2b0cb55"]]);
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "grid",
  __ssrInlineRender: true,
  props: {
    medias: {}
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain, isCNUser } = useEnhancer();
    const galleryActiveIndex = ref();
    const galleryActiveMedia = computed(() => {
      return _isNil(galleryActiveIndex.value) ? null : props.medias[galleryActiveIndex.value];
    });
    const closeMediaGallery = () => {
      galleryActiveIndex.value = void 0;
    };
    const getPureCaption = (caption) => {
      const text = caption?.split("#")[0].trim().replaceAll("\n", " ");
      return (text ? text : caption) || "-";
    };
    const getMediaThumbnail = (media) => {
      const url = getInstagramCoverURL(media);
      return isCNUser ? getCdnProxyURL(cdnDomain, url) : url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_udate = resolveComponent("udate");
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _directive_lozad = resolveDirective("lozad");
      let _temp0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "instagram-grid" }, _attrs))} data-v-06de8fdb><ul${ssrRenderAttrs({
        name: "list",
        class: "medias"
      })} data-v-06de8fdb>`);
      ssrRenderList(_ctx.medias, (media, index) => {
        _push(`<li${ssrRenderAttr("title", getPureCaption(media.caption))} class="${ssrRenderClass([unref(isVideoMediaIns)(media) ? "video" : "photo", "item"])}" data-v-06de8fdb><div class="content" data-v-06de8fdb><div${ssrRenderAttrs(_temp0 = mergeProps({
          class: "background",
          "data-background-image": getMediaThumbnail(media)
        }, ssrGetDirectiveProps(_ctx, _directive_lozad)))} data-v-06de8fdb>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</div><div class="mask" data-v-06de8fdb><span class="icon" data-v-06de8fdb>`);
        if (unref(isVideoMediaIns)(media)) {
          _push(`<i class="iconfont icon-music-play" data-v-06de8fdb></i>`);
        } else {
          _push(`<i class="iconfont icon-eye" data-v-06de8fdb></i>`);
        }
        _push(`</span></div><div class="type-icon" data-v-06de8fdb>`);
        if (unref(isVideoMediaIns)(media)) {
          _push(`<i class="iconfont icon-video" data-v-06de8fdb></i>`);
        } else if (unref(isAlbumMediaIns)(media)) {
          _push(`<i class="iconfont icon-album" data-v-06de8fdb></i>`);
        } else {
          _push(`<i class="iconfont icon-camera" data-v-06de8fdb></i>`);
        }
        _push(`</div><span class="date" data-v-06de8fdb>`);
        _push(ssrRenderComponent(_component_udate, {
          to: "YMD",
          date: media.timestamp,
          separator: "/"
        }, null, _parent));
        _push(`</span></div></li>`);
      });
      _push(`</ul>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: !!galleryActiveMedia.value,
              "scroll-close": false,
              onClose: closeMediaGallery
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (galleryActiveMedia.value) {
                    _push3(ssrRenderComponent(InsGallery, {
                      media: galleryActiveMedia.value,
                      index: galleryActiveIndex.value,
                      count: _ctx.medias.length
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    galleryActiveMedia.value ? (openBlock(), createBlock(InsGallery, {
                      key: 0,
                      media: galleryActiveMedia.value,
                      index: galleryActiveIndex.value,
                      count: _ctx.medias.length
                    }, null, 8, ["media", "index", "count"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: !!galleryActiveMedia.value,
                "scroll-close": false,
                onClose: closeMediaGallery
              }, {
                default: withCtx(() => [
                  galleryActiveMedia.value ? (openBlock(), createBlock(InsGallery, {
                    key: 0,
                    media: galleryActiveMedia.value,
                    index: galleryActiveIndex.value,
                    count: _ctx.medias.length
                  }, null, 8, ["media", "index", "count"])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/grid.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const InstagramGrid = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-06de8fdb"]]);
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, isZhLang } = useEnhancer();
    const { instagramLatestMedias, goLink } = useStores();
    const loading = ref(false);
    const medias = shallowReactive([]);
    const lastPaging = shallowRef(null);
    const finished = computed(() => Boolean(lastPaging.value && !lastPaging.value.next));
    const fetchMoreMedias = async () => {
      try {
        loading.value = true;
        const request = tunnel$1.fetch(TunnelModule.InstagramMedias, {
          after: lastPaging.value?.cursors.after ?? instagramLatestMedias.data?.paging?.cursors.after
        });
        const response = await (isClient ? delayPromise(360, request) : request);
        medias.push(...response.data);
        lastPaging.value = response.paging;
      } finally {
        loading.value = false;
      }
    };
    const allMedias = computed(() => {
      const latestMedias = instagramLatestMedias.data?.data ?? [];
      return [...latestMedias, ...medias];
    });
    usePageSeo(() => {
      const enTitle = firstUpperCase(_i18n.t(LocaleKey.PAGE_PHOTOGRAPHY, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LocaleKey.PAGE_PHOTOGRAPHY), enTitle] : [enTitle];
      const description = isZhLang.value ? `${APP_META.author} 的摄影作品` : `${APP_META.author}'s photographs`;
      return {
        pageTitles: titles,
        description
      };
    });
    useUniversalFetch(() => instagramLatestMedias.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_container = resolveComponent("container");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "photography-page" }, _attrs))} data-v-220b9da4>`);
      _push(ssrRenderComponent(PageBanner, {
        class: "page-banner",
        video: "/videos/clips/ocean-5.mp4",
        "video-position": 72,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "大千同在，万象共栖",
                    en: `${unref(APP_META).author}'s photographs`
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "大千同在，万象共栖",
                      en: `${unref(APP_META).author}'s photographs`
                    }, null, 8, ["en"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    zh: "大千同在，万象共栖",
                    en: `${unref(APP_META).author}'s photographs`
                  }, null, 8, ["en"])
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="links" data-v-220b9da4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item instagram",
              title: "Instagram",
              href: unref(goLink).map.instagram
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="username" data-v-220b9da4${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).INSTAGRAM_USERNAME)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_divider, {
              type: "vertical",
              size: "lg",
              color: "#ffffffcc"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item xiaohongshu",
              title: "小红书",
              href: unref(goLink).map.xiaohongshu
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconfont icon-xiaohongshu" data-v-220b9da4${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "iconfont icon-xiaohongshu" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "links" }, [
                createVNode(_component_ulink, {
                  class: "item instagram",
                  title: "Instagram",
                  href: unref(goLink).map.instagram
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_component_divider, {
                  type: "vertical",
                  size: "lg",
                  color: "#ffffffcc"
                }),
                createVNode(_component_ulink, {
                  class: "item xiaohongshu",
                  title: "小红书",
                  href: unref(goLink).map.xiaohongshu
                }, {
                  default: withCtx(() => [
                    createVNode("i", { class: "iconfont icon-xiaohongshu" })
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-bridge" }, null, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-content" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, {
              data: unref(instagramLatestMedias).data?.data,
              loading: unref(instagramLatestMedias).fetching
            }, {
              placeholder: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_empty, {
                    class: "module-empty",
                    key: "empty"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_i18n, {
                          k: unref(LocaleKey).EMPTY_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LocaleKey).EMPTY_PLACEHOLDER
                          }, null, 8, ["k"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_empty, {
                      class: "module-empty",
                      key: "empty"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).EMPTY_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="module-loading" data-v-220b9da4${_scopeId2}><!--[-->`);
                  ssrRenderList(4 * 2, (item) => {
                    _push3(`<div class="item" data-v-220b9da4${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_skeleton_base, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", {
                      key: "loading",
                      class: "module-loading"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(4 * 2, (item) => {
                        return createVNode("div", {
                          class: "item",
                          key: item
                        }, [
                          createVNode(_component_skeleton_base)
                        ]);
                      }), 64))
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-220b9da4${_scopeId2}>`);
                  _push3(ssrRenderComponent(InstagramGrid, { medias: allMedias.value }, null, _parent3, _scopeId2));
                  if (!unref(instagramLatestMedias).fetching && !finished.value) {
                    _push3(ssrRenderComponent(Loadmore, {
                      class: "loadmore",
                      loading: loading.value,
                      onLoadmore: fetchMoreMedias
                    }, {
                      normal: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button class="normal" data-v-220b9da4${_scopeId3}><i class="iconfont icon-loadmore" data-v-220b9da4${_scopeId3}></i></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              class: "normal",
                              onClick: fetchMoreMedias
                            }, [
                              createVNode("i", { class: "iconfont icon-loadmore" })
                            ])
                          ];
                        }
                      }),
                      loading: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_loading_indicator, {
                            class: "loading",
                            width: "2.4rem",
                            height: "1.4rem",
                            gap: "1rem"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_loading_indicator, {
                              class: "loading",
                              width: "2.4rem",
                              height: "1.4rem",
                              gap: "1rem"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(InstagramGrid, { medias: allMedias.value }, null, 8, ["medias"]),
                      !unref(instagramLatestMedias).fetching && !finished.value ? (openBlock(), createBlock(Loadmore, {
                        key: 0,
                        class: "loadmore",
                        loading: loading.value,
                        onLoadmore: fetchMoreMedias
                      }, {
                        normal: withCtx(() => [
                          createVNode("button", {
                            class: "normal",
                            onClick: fetchMoreMedias
                          }, [
                            createVNode("i", { class: "iconfont icon-loadmore" })
                          ])
                        ]),
                        loading: withCtx(() => [
                          createVNode(_component_loading_indicator, {
                            class: "loading",
                            width: "2.4rem",
                            height: "1.4rem",
                            gap: "1rem"
                          })
                        ]),
                        _: 1
                      }, 8, ["loading"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_placeholder, {
                data: unref(instagramLatestMedias).data?.data,
                loading: unref(instagramLatestMedias).fetching
              }, {
                placeholder: withCtx(() => [
                  createVNode(_component_empty, {
                    class: "module-empty",
                    key: "empty"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocaleKey).EMPTY_PLACEHOLDER
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ]),
                loading: withCtx(() => [
                  createVNode("div", {
                    key: "loading",
                    class: "module-loading"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(4 * 2, (item) => {
                      return createVNode("div", {
                        class: "item",
                        key: item
                      }, [
                        createVNode(_component_skeleton_base)
                      ]);
                    }), 64))
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(InstagramGrid, { medias: allMedias.value }, null, 8, ["medias"]),
                    !unref(instagramLatestMedias).fetching && !finished.value ? (openBlock(), createBlock(Loadmore, {
                      key: 0,
                      class: "loadmore",
                      loading: loading.value,
                      onLoadmore: fetchMoreMedias
                    }, {
                      normal: withCtx(() => [
                        createVNode("button", {
                          class: "normal",
                          onClick: fetchMoreMedias
                        }, [
                          createVNode("i", { class: "iconfont icon-loadmore" })
                        ])
                      ]),
                      loading: withCtx(() => [
                        createVNode(_component_loading_indicator, {
                          class: "loading",
                          width: "2.4rem",
                          height: "1.4rem",
                          gap: "1rem"
                        })
                      ]),
                      _: 1
                    }, 8, ["loading"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }, 8, ["data", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/index.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const PhotographyPage = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-220b9da4"]]);
const useThreadsMediaUrl = (url) => {
  if (!url) return null;
  const { cdnDomain, isCNUser } = useEnhancer();
  return isCNUser ? getCdnProxyURL(cdnDomain, url) : url;
};
const useThreadsMediasRequest = () => {
  const fetching = shallowRef(false);
  const fetchMedias = async (afterToken) => {
    try {
      fetching.value = true;
      const request = tunnel$1.fetch(TunnelModule.ThreadsMedias, {
        after: afterToken
      });
      return await (isClient ? delayPromise(360, request) : request);
    } finally {
      fetching.value = false;
    }
  };
  return {
    fetching,
    fetchMedias
  };
};
const i18nTitle = {
  [Language.Chinese]: "广行饶益，利乐有情",
  [Language.English]: `${APP_META.author}'s snippets`
};
const useSnippetsPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer();
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocaleKey.PAGE_SNIPPETS, Language.English));
    const titles = isZhLang.value ? [i18n.t(LocaleKey.PAGE_SNIPPETS), enTitle] : [enTitle];
    const description = isZhLang.value ? `${APP_META.author} 的清风念` : `${APP_META.author}'s snippets`;
    return {
      pageTitles: titles,
      description
    };
  });
};
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "masonry-wall",
  __ssrInlineRender: true,
  props: {
    initialItems: {},
    columns: {},
    rowGap: { default: "1rem" },
    colGap: { default: "1rem" },
    ssrInitialRender: { type: Boolean }
  },
  emits: ["mounted"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    useSlots();
    const createColumns = (count) => {
      return Array.from({ length: count }).map(() => []);
    };
    const element = shallowRef(null);
    const innerItems = shallowRef([...props.initialItems]);
    const columnsTree = ref(createColumns(props.columns));
    const filledIndex = ref(0);
    let currentRedrawId = 0;
    const fillColumns = async (startIndex, assignedRedrawId) => {
      if (!element.value) return;
      const columnDivs = [...element.value.children];
      for (let i = startIndex; i < innerItems.value.length; i++) {
        await nextTick();
        if (currentRedrawId !== assignedRedrawId) return;
        const target = columnDivs.reduce(
          (prev, curr) => curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev
        );
        const colIndex = +target.dataset.index;
        columnsTree.value[colIndex].push(i);
      }
      filledIndex.value = innerItems.value.length;
    };
    const resetItems = async (items = []) => {
      columnsTree.value = createColumns(props.columns);
      innerItems.value = [...items];
      filledIndex.value = 0;
      await fillColumns(filledIndex.value, ++currentRedrawId);
    };
    const appendItems = async (newItems) => {
      const start = innerItems.value.length;
      innerItems.value.push(...newItems);
      await fillColumns(start, ++currentRedrawId);
    };
    const removeItems = (predicate) => {
      const map = /* @__PURE__ */ new Map();
      innerItems.value.forEach((item, i) => {
        if (predicate(item)) map.set(i, true);
      });
      for (const col of columnsTree.value) {
        for (let i = col.length - 1; i >= 0; i--) {
          if (map.has(col[i])) {
            col.splice(i, 1);
          }
        }
      }
    };
    if (props.ssrInitialRender) {
      const columns = createColumns(props.columns);
      for (let i = 0; i < props.initialItems.length; i++) {
        columns[i % props.columns].push(i);
      }
      columnsTree.value = columns;
      innerItems.value = [...props.initialItems];
      filledIndex.value = props.initialItems.length;
    }
    onMounted(async () => {
      if (!props.ssrInitialRender) {
        await resetItems(props.initialItems);
      }
      emit("mounted", {
        element: element.value,
        resetItems,
        appendItems,
        removeItems
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "element",
        ref: element,
        class: "masonry-wall",
        style: { "--grid-columns": props.columns, gap: props.rowGap },
        "data-allow-mismatch": ""
      }, _attrs))} data-v-7508d26c><!--[-->`);
      ssrRenderList(columnsTree.value, (column, columnIndex) => {
        _push(`<ul${ssrRenderAttrs({
          name: "list",
          class: "masonry-column",
          key: columnIndex,
          "data-index": columnIndex,
          style: { gap: props.colGap }
        })} data-v-7508d26c>`);
        ssrRenderList(column, (itemIndex, row) => {
          _push(`<li class="masonry-item" data-v-7508d26c>`);
          ssrRenderSlot(_ctx.$slots, "default", {
            item: innerItems.value[itemIndex],
            column: columnIndex,
            row,
            index: itemIndex
          }, null, _push, _parent);
          _push(`</li>`);
        });
        _push(`</ul>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/masonry-wall.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const MasonryWall = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-7508d26c"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "card",
  __ssrInlineRender: true,
  props: {
    icon: {},
    username: {},
    permalink: {},
    timestamp: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-item-card" }, _attrs))} data-v-af6ca73a><div class="header" data-v-af6ca73a>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        title: props.username,
        href: props.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([props.icon, "iconfont"])}" data-v-af6ca73a${_scopeId}></i><span class="username" data-v-af6ca73a${_scopeId}>${ssrInterpolate(props.username)}</span>`);
          } else {
            return [
              createVNode("i", {
                class: ["iconfont", props.icon]
              }, null, 2),
              createVNode("span", { class: "username" }, toDisplayString(props.username), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="timestamp" data-v-af6ca73a>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: props.timestamp
      }, null, _parent));
      _push(`</div></div><div class="body" data-v-af6ca73a>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/desktop/card.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const ListItemCard = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-af6ca73a"]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "body-threads",
  __ssrInlineRender: true,
  props: {
    media: {}
  },
  emits: ["click-image"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const mediaUrl = useThreadsMediaUrl(props.media.media_url);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "threads-media-body" }, _attrs))} data-v-7ba5f903>`);
      _push(ssrRenderComponent(_sfc_main$1z, {
        class: "text",
        compact: "",
        markdown: _ctx.media.text,
        "render-options": { codeLineNumbers: false }
      }, null, _parent));
      if (unref(mediaUrl)) {
        _push(`<div class="${ssrRenderClass([{ audio: _ctx.media.media_type === "AUDIO" }, "media"])}" data-v-7ba5f903>`);
        if (_ctx.media.media_type === "AUDIO") {
          _push(`<audio class="audio"${ssrRenderAttr("src", unref(mediaUrl))} controls data-v-7ba5f903></audio>`);
        } else if (_ctx.media.media_type === "VIDEO") {
          _push(`<video class="video"${ssrRenderAttr("src", unref(mediaUrl))} controls data-v-7ba5f903></video>`);
        } else {
          _push(`<img class="image"${ssrRenderAttr("alt", unref(mediaUrl))}${ssrRenderAttr("src", unref(mediaUrl))} loading="lazy" draggable="false" data-v-7ba5f903>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/desktop/body-threads.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const ThreadsBody = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-7ba5f903"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const { popup } = useEnhancer();
    const { fetching, fetchMedias } = useThreadsMediasRequest();
    const latestThreadsStore = useThreadsLatestMediasStore();
    const masonryRef = shallowRef();
    const lastPaging = shallowRef(null);
    const noMoreData = shallowRef(false);
    const fetchNextPageThreadsMedias = async () => {
      if (latestThreadsStore.fetching || fetching.value || noMoreData.value) return;
      const secondPage = latestThreadsStore.data?.paging.cursors.after;
      const nextPage = lastPaging.value?.cursors?.after;
      const response = await fetchMedias(nextPage ?? secondPage);
      lastPaging.value = response.paging;
      noMoreData.value = !response.paging.cursors?.after;
      masonryRef.value?.appendItems(response.data);
    };
    useSnippetsPageMeta();
    useUniversalFetch(() => latestThreadsStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_container = resolveComponent("container");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "snippets-page" }, _attrs))} data-v-4c8fc777>`);
      _push(ssrRenderComponent(PageBanner, {
        class: "page-banner",
        video: "/videos/clips/forest-1.mp4",
        "video-position": 72,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, unref(i18nTitle), null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, unref(i18nTitle), null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, unref(i18nTitle), null, 16)
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="links" data-v-4c8fc777${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item threads",
              title: "Threads",
              href: unref(goLink).map.threads
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="username" data-v-4c8fc777${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).INSTAGRAM_USERNAME)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_divider, {
              type: "vertical",
              size: "lg",
              color: "#ffffffcc"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item zhihu",
              title: "知乎",
              href: unref(goLink).map.zhihu
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconfont icon-zhihu-full" data-v-4c8fc777${_scopeId2}></i>`);
                } else {
                  return [
                    createVNode("i", { class: "iconfont icon-zhihu-full" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "links" }, [
                createVNode(_component_ulink, {
                  class: "item threads",
                  title: "Threads",
                  href: unref(goLink).map.threads
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode(_component_divider, {
                  type: "vertical",
                  size: "lg",
                  color: "#ffffffcc"
                }),
                createVNode(_component_ulink, {
                  class: "item zhihu",
                  title: "知乎",
                  href: unref(goLink).map.zhihu
                }, {
                  default: withCtx(() => [
                    createVNode("i", { class: "iconfont icon-zhihu-full" })
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-bridge" }, null, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-content" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, {
              data: unref(latestThreadsStore).data?.data,
              loading: unref(latestThreadsStore).fetching
            }, {
              placeholder: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_empty, {
                    class: "data-empty",
                    key: "empty"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_i18n, {
                          k: unref(LocaleKey).EMPTY_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LocaleKey).EMPTY_PLACEHOLDER
                          }, null, 8, ["k"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_empty, {
                      class: "data-empty",
                      key: "empty"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocaleKey).EMPTY_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="data-loading" data-v-4c8fc777${_scopeId2}><!--[-->`);
                  ssrRenderList(3 * 3, (item) => {
                    _push3(`<div class="item" data-v-4c8fc777${_scopeId2}><!--[-->`);
                    ssrRenderList(3, (i) => {
                      _push3(`<div class="item-skeleton" data-v-4c8fc777${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_skeleton_line, null, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", {
                      key: "loading",
                      class: "data-loading"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(3 * 3, (item) => {
                        return createVNode("div", {
                          class: "item",
                          key: item
                        }, [
                          (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                            return createVNode("div", {
                              class: "item-skeleton",
                              key: i
                            }, [
                              createVNode(_component_skeleton_line)
                            ]);
                          }), 64))
                        ]);
                      }), 64))
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div data-v-4c8fc777${_scopeId2}>`);
                  _push3(ssrRenderComponent(MasonryWall, {
                    columns: 3,
                    "row-gap": "2.8rem",
                    "col-gap": "2.4rem",
                    "initial-items": unref(latestThreadsStore).data?.data || [],
                    "ssr-initial-render": true,
                    onMounted: ($event) => masonryRef.value = $event
                  }, {
                    default: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(ListItemCard, {
                          icon: "icon-threads",
                          username: item.username,
                          permalink: item.permalink,
                          timestamp: item.timestamp
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(ThreadsBody, {
                                media: item,
                                onClickImage: (url) => unref(popup).vImage(url)
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(ThreadsBody, {
                                  media: item,
                                  onClickImage: (url) => unref(popup).vImage(url)
                                }, null, 8, ["media", "onClickImage"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(ListItemCard, {
                            icon: "icon-threads",
                            username: item.username,
                            permalink: item.permalink,
                            timestamp: item.timestamp
                          }, {
                            default: withCtx(() => [
                              createVNode(ThreadsBody, {
                                media: item,
                                onClickImage: (url) => unref(popup).vImage(url)
                              }, null, 8, ["media", "onClickImage"])
                            ]),
                            _: 2
                          }, 1032, ["username", "permalink", "timestamp"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (!unref(latestThreadsStore).fetching && !noMoreData.value) {
                    _push3(ssrRenderComponent(Loadmore, {
                      class: "loadmore",
                      loading: unref(fetching),
                      onLoadmore: fetchNextPageThreadsMedias
                    }, {
                      normal: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button class="normal" data-v-4c8fc777${_scopeId3}><i class="iconfont icon-loadmore" data-v-4c8fc777${_scopeId3}></i></button>`);
                        } else {
                          return [
                            createVNode("button", {
                              class: "normal",
                              onClick: fetchNextPageThreadsMedias
                            }, [
                              createVNode("i", { class: "iconfont icon-loadmore" })
                            ])
                          ];
                        }
                      }),
                      loading: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_loading_indicator, {
                            class: "loading",
                            width: "2.4rem",
                            height: "1.4rem",
                            gap: "1rem"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_loading_indicator, {
                              class: "loading",
                              width: "2.4rem",
                              height: "1.4rem",
                              gap: "1rem"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(MasonryWall, {
                        columns: 3,
                        "row-gap": "2.8rem",
                        "col-gap": "2.4rem",
                        "initial-items": unref(latestThreadsStore).data?.data || [],
                        "ssr-initial-render": true,
                        onMounted: ($event) => masonryRef.value = $event
                      }, {
                        default: withCtx(({ item }) => [
                          createVNode(ListItemCard, {
                            icon: "icon-threads",
                            username: item.username,
                            permalink: item.permalink,
                            timestamp: item.timestamp
                          }, {
                            default: withCtx(() => [
                              createVNode(ThreadsBody, {
                                media: item,
                                onClickImage: (url) => unref(popup).vImage(url)
                              }, null, 8, ["media", "onClickImage"])
                            ]),
                            _: 2
                          }, 1032, ["username", "permalink", "timestamp"])
                        ]),
                        _: 1
                      }, 8, ["initial-items", "onMounted"]),
                      !unref(latestThreadsStore).fetching && !noMoreData.value ? (openBlock(), createBlock(Loadmore, {
                        key: 0,
                        class: "loadmore",
                        loading: unref(fetching),
                        onLoadmore: fetchNextPageThreadsMedias
                      }, {
                        normal: withCtx(() => [
                          createVNode("button", {
                            class: "normal",
                            onClick: fetchNextPageThreadsMedias
                          }, [
                            createVNode("i", { class: "iconfont icon-loadmore" })
                          ])
                        ]),
                        loading: withCtx(() => [
                          createVNode(_component_loading_indicator, {
                            class: "loading",
                            width: "2.4rem",
                            height: "1.4rem",
                            gap: "1rem"
                          })
                        ]),
                        _: 1
                      }, 8, ["loading"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_placeholder, {
                data: unref(latestThreadsStore).data?.data,
                loading: unref(latestThreadsStore).fetching
              }, {
                placeholder: withCtx(() => [
                  createVNode(_component_empty, {
                    class: "data-empty",
                    key: "empty"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocaleKey).EMPTY_PLACEHOLDER
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ]),
                loading: withCtx(() => [
                  createVNode("div", {
                    key: "loading",
                    class: "data-loading"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(3 * 3, (item) => {
                      return createVNode("div", {
                        class: "item",
                        key: item
                      }, [
                        (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                          return createVNode("div", {
                            class: "item-skeleton",
                            key: i
                          }, [
                            createVNode(_component_skeleton_line)
                          ]);
                        }), 64))
                      ]);
                    }), 64))
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(MasonryWall, {
                      columns: 3,
                      "row-gap": "2.8rem",
                      "col-gap": "2.4rem",
                      "initial-items": unref(latestThreadsStore).data?.data || [],
                      "ssr-initial-render": true,
                      onMounted: ($event) => masonryRef.value = $event
                    }, {
                      default: withCtx(({ item }) => [
                        createVNode(ListItemCard, {
                          icon: "icon-threads",
                          username: item.username,
                          permalink: item.permalink,
                          timestamp: item.timestamp
                        }, {
                          default: withCtx(() => [
                            createVNode(ThreadsBody, {
                              media: item,
                              onClickImage: (url) => unref(popup).vImage(url)
                            }, null, 8, ["media", "onClickImage"])
                          ]),
                          _: 2
                        }, 1032, ["username", "permalink", "timestamp"])
                      ]),
                      _: 1
                    }, 8, ["initial-items", "onMounted"]),
                    !unref(latestThreadsStore).fetching && !noMoreData.value ? (openBlock(), createBlock(Loadmore, {
                      key: 0,
                      class: "loadmore",
                      loading: unref(fetching),
                      onLoadmore: fetchNextPageThreadsMedias
                    }, {
                      normal: withCtx(() => [
                        createVNode("button", {
                          class: "normal",
                          onClick: fetchNextPageThreadsMedias
                        }, [
                          createVNode("i", { class: "iconfont icon-loadmore" })
                        ])
                      ]),
                      loading: withCtx(() => [
                        createVNode(_component_loading_indicator, {
                          class: "loading",
                          width: "2.4rem",
                          height: "1.4rem",
                          gap: "1rem"
                        })
                      ]),
                      _: 1
                    }, 8, ["loading"])) : createCommentVNode("", true)
                  ])
                ]),
                _: 1
              }, 8, ["data", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/desktop/index.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const DesktopSnippetsPage = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-4c8fc777"]]);
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "card-threads",
  __ssrInlineRender: true,
  props: {
    media: {}
  },
  emits: ["click-image"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const mediaUrl = useThreadsMediaUrl(props.media.media_url);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "threads-media-card" }, _attrs))} data-v-623bd0cc>`);
      if (unref(mediaUrl)) {
        _push(`<div class="${ssrRenderClass([{ audio: _ctx.media.media_type === "AUDIO" }, "media"])}" data-v-623bd0cc>`);
        if (_ctx.media.media_type === "AUDIO") {
          _push(`<audio class="audio"${ssrRenderAttr("src", unref(mediaUrl))} controls data-v-623bd0cc></audio>`);
        } else if (_ctx.media.media_type === "VIDEO") {
          _push(`<video class="video"${ssrRenderAttr("src", unref(mediaUrl))} controls data-v-623bd0cc></video>`);
        } else {
          _push(`<img class="image"${ssrRenderAttr("alt", _ctx.media.text)}${ssrRenderAttr("src", unref(mediaUrl))} loading="lazy" draggable="false" data-v-623bd0cc>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1z, {
        class: "content",
        compact: "",
        title: _ctx.media.text,
        markdown: _ctx.media.text,
        "render-options": { codeLineNumbers: false }
      }, null, _parent));
      _push(`<div class="footer" data-v-623bd0cc>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        title: _ctx.media.username,
        href: _ctx.media.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.media.is_quote_post) {
              _push2(`<i class="iconfont icon-repost" data-v-623bd0cc${_scopeId}></i>`);
            } else {
              _push2(`<i class="iconfont icon-threads" data-v-623bd0cc${_scopeId}></i>`);
            }
            _push2(`<span class="username" data-v-623bd0cc${_scopeId}>thread</span>`);
          } else {
            return [
              _ctx.media.is_quote_post ? (openBlock(), createBlock("i", {
                key: 0,
                class: "iconfont icon-repost"
              })) : (openBlock(), createBlock("i", {
                key: 1,
                class: "iconfont icon-threads"
              })),
              createVNode("span", { class: "username" }, "thread")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="timestamp" data-v-623bd0cc>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: _ctx.media.timestamp
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/mobile/card-threads.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const ThreadsCard = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-623bd0cc"]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const { popup } = useEnhancer();
    const { fetching, fetchMedias } = useThreadsMediasRequest();
    const latestThreadsStore = useThreadsLatestMediasStore();
    const masonryRef = shallowRef();
    const lastPaging = shallowRef(null);
    const noMoreData = shallowRef(false);
    const fetchNextPageThreadsMedias = async () => {
      if (latestThreadsStore.fetching || fetching.value || noMoreData.value) return;
      const secondPage = latestThreadsStore.data?.paging.cursors.after;
      const nextPage = lastPaging.value?.cursors?.after;
      const response = await fetchMedias(nextPage ?? secondPage);
      lastPaging.value = response.paging;
      noMoreData.value = !response.paging.cursors?.after;
      masonryRef.value?.appendItems(response.data);
    };
    useSnippetsPageMeta();
    useUniversalFetch(() => latestThreadsStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_skeleton_paragraph = resolveComponent("skeleton-paragraph");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "snippets-page" }, _attrs))} data-v-31856150>`);
      _push(ssrRenderComponent(PageBanner, {
        "is-mobile": true,
        image: "/images/page-snippets/banner-mobile.webp",
        "image-position": 80,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).PAGE_SNIPPETS
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocaleKey).PAGE_SNIPPETS
              }, null, 8, ["k"])
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, unref(i18nTitle), null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, unref(i18nTitle), null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_placeholder, {
        data: unref(latestThreadsStore).data?.data,
        loading: unref(latestThreadsStore).fetching
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="snippets-loading" data-v-31856150${_scopeId}><div class="socials" data-v-31856150${_scopeId}><!--[-->`);
            ssrRenderList(3, (s) => {
              _push2(ssrRenderComponent(_component_skeleton_base, {
                class: "item",
                key: s
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><div class="cards" data-v-31856150${_scopeId}><!--[-->`);
            ssrRenderList(4, (i) => {
              _push2(`<div class="item" data-v-31856150${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_paragraph, {
                lines: 4,
                "line-height": "1.2rem"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "snippets-loading",
                key: "loading"
              }, [
                createVNode("div", { class: "socials" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(3, (s) => {
                    return createVNode(_component_skeleton_base, {
                      class: "item",
                      key: s
                    });
                  }), 64))
                ]),
                createVNode("div", { class: "cards" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(4, (i) => {
                    return createVNode("div", {
                      class: "item",
                      key: i
                    }, [
                      createVNode(_component_skeleton_paragraph, {
                        lines: 4,
                        "line-height": "1.2rem"
                      })
                    ]);
                  }), 64))
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="snippets-content" data-v-31856150${_scopeId}><div class="socials" data-v-31856150${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item",
              href: unref(goLink).map.threads
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="label" data-v-31856150${_scopeId2}><i class="iconfont icon-threads" data-v-31856150${_scopeId2}></i><span class="text" data-v-31856150${_scopeId2}>Threads</span></p><p class="username" data-v-31856150${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).INSTAGRAM_USERNAME)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "label" }, [
                      createVNode("i", { class: "iconfont icon-threads" }),
                      createVNode("span", { class: "text" }, "Threads")
                    ]),
                    createVNode("p", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item",
              href: unref(goLink).map.zhihu
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="label" data-v-31856150${_scopeId2}><i class="iconfont icon-zhihu-full" data-v-31856150${_scopeId2}></i><span class="text" data-v-31856150${_scopeId2}>回答</span></p><p class="username" data-v-31856150${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).ZHIHU_USERNAME)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "label" }, [
                      createVNode("i", { class: "iconfont icon-zhihu-full" }),
                      createVNode("span", { class: "text" }, "回答")
                    ]),
                    createVNode("p", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).ZHIHU_USERNAME), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(MasonryWall, {
              "row-gap": "1.2rem",
              "col-gap": "1.4rem",
              columns: 2,
              "initial-items": unref(latestThreadsStore).data?.data || [],
              "ssr-initial-render": true,
              onMounted: ($event) => masonryRef.value = $event
            }, {
              default: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ThreadsCard, {
                    media: item,
                    onClickImage: (url) => unref(popup).vImage(url)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(ThreadsCard, {
                      media: item,
                      onClickImage: (url) => unref(popup).vImage(url)
                    }, null, 8, ["media", "onClickImage"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(latestThreadsStore).fetching && !noMoreData.value) {
              _push2(ssrRenderComponent(Loadmore, {
                class: "loadmore",
                loading: unref(fetching),
                onLoadmore: fetchNextPageThreadsMedias
              }, {
                normal: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button class="normal" data-v-31856150${_scopeId2}><i class="iconfont icon-loadmore" data-v-31856150${_scopeId2}></i></button>`);
                  } else {
                    return [
                      createVNode("button", {
                        class: "normal",
                        onClick: fetchNextPageThreadsMedias
                      }, [
                        createVNode("i", { class: "iconfont icon-loadmore" })
                      ])
                    ];
                  }
                }),
                loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_loading_indicator, {
                      class: "loading",
                      width: "2rem",
                      height: "1.2rem",
                      gap: "0.68rem"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_loading_indicator, {
                        class: "loading",
                        width: "2rem",
                        height: "1.2rem",
                        gap: "0.68rem"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "snippets-content" }, [
                createVNode("div", { class: "socials" }, [
                  createVNode(_component_ulink, {
                    class: "item",
                    href: unref(goLink).map.threads
                  }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "label" }, [
                        createVNode("i", { class: "iconfont icon-threads" }),
                        createVNode("span", { class: "text" }, "Threads")
                      ]),
                      createVNode("p", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_component_divider, { type: "vertical" }),
                  createVNode(_component_ulink, {
                    class: "item",
                    href: unref(goLink).map.zhihu
                  }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "label" }, [
                        createVNode("i", { class: "iconfont icon-zhihu-full" }),
                        createVNode("span", { class: "text" }, "回答")
                      ]),
                      createVNode("p", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).ZHIHU_USERNAME), 1)
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                createVNode(MasonryWall, {
                  "row-gap": "1.2rem",
                  "col-gap": "1.4rem",
                  columns: 2,
                  "initial-items": unref(latestThreadsStore).data?.data || [],
                  "ssr-initial-render": true,
                  onMounted: ($event) => masonryRef.value = $event
                }, {
                  default: withCtx(({ item }) => [
                    createVNode(ThreadsCard, {
                      media: item,
                      onClickImage: (url) => unref(popup).vImage(url)
                    }, null, 8, ["media", "onClickImage"])
                  ]),
                  _: 1
                }, 8, ["initial-items", "onMounted"]),
                !unref(latestThreadsStore).fetching && !noMoreData.value ? (openBlock(), createBlock(Loadmore, {
                  key: 0,
                  class: "loadmore",
                  loading: unref(fetching),
                  onLoadmore: fetchNextPageThreadsMedias
                }, {
                  normal: withCtx(() => [
                    createVNode("button", {
                      class: "normal",
                      onClick: fetchNextPageThreadsMedias
                    }, [
                      createVNode("i", { class: "iconfont icon-loadmore" })
                    ])
                  ]),
                  loading: withCtx(() => [
                    createVNode(_component_loading_indicator, {
                      class: "loading",
                      width: "2rem",
                      height: "1.2rem",
                      gap: "0.68rem"
                    })
                  ]),
                  _: 1
                }, 8, ["loading"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/mobile/index.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const MobileSnippetsPage = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-31856150"]]);
var CategorySlug = /* @__PURE__ */ ((CategorySlug2) => {
  CategorySlug2["Code"] = "code";
  CategorySlug2["Insight"] = "insight";
  return CategorySlug2;
})(CategorySlug || {});
var RouteName = /* @__PURE__ */ ((RouteName2) => {
  RouteName2["Home"] = "home";
  RouteName2["Article"] = "article-detail";
  RouteName2["CategoryListing"] = "category-listing";
  RouteName2["TagListing"] = "tag-listing";
  RouteName2["DateListing"] = "date-listing";
  RouteName2["SearchListing"] = "search-listing";
  RouteName2["Archive"] = "archive";
  RouteName2["Guestbook"] = "guestbook";
  RouteName2["About"] = "about";
  RouteName2["App"] = "app";
  RouteName2["Sponsor"] = "sponsor";
  RouteName2["Photography"] = "photography";
  RouteName2["YouTube"] = "youtube";
  RouteName2["Snippets"] = "snippets";
  RouteName2["Error"] = "error";
  return RouteName2;
})(RouteName || {});
const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: IndexPage,
      mobile: MobileListing
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 60 * 2
      // 2 mins
    }
  },
  {
    path: "/article/:article_id",
    name: "article-detail",
    components: {
      default: ArticleDetailPage,
      mobile: ArticleDetailPage
    },
    props: {
      default: (to) => ({ articleId: Number(to.params.article_id) }),
      mobile: (to) => ({
        isMobile: true,
        articleId: Number(to.params.article_id)
      })
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 30,
      // 30 seconds
      async validator({ route, i18n }) {
        if (!Number.isInteger(Number(route.params.article_id))) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LocaleKey.QUERY_PARAMS_ERROR) + "Article ID → <number>"
          });
        }
      }
    }
  },
  {
    path: "/category/:category_slug",
    name: "category-listing",
    components: {
      default: CategoryListingPage,
      mobile: MobileListing
    },
    props: {
      default: (to) => ({ categorySlug: to.params.category_slug }),
      mobile: (to) => ({ categorySlug: to.params.category_slug })
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 60 * 2,
      // 2 mins
      async validator({ route, i18n }) {
        const { category_slug } = route.params;
        if (!category_slug) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LocaleKey.QUERY_PARAMS_ERROR) + "Category slug → <string>"
          });
        }
      }
    }
  },
  {
    path: "/tag/:tag_slug",
    name: "tag-listing",
    components: {
      default: TagListingPage,
      mobile: MobileListing
    },
    props: {
      default: (to) => ({ tagSlug: to.params.tag_slug }),
      mobile: (to) => ({ tagSlug: to.params.tag_slug })
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 60 * 2,
      // 2 mins
      async validator({ route, i18n }) {
        const { tag_slug } = route.params;
        if (!tag_slug) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LocaleKey.QUERY_PARAMS_ERROR) + "Tag slug → <string>"
          });
        }
      }
    }
  },
  {
    path: "/date/:date",
    name: "date-listing",
    components: {
      default: _sfc_main$1H,
      mobile: MobileListing
    },
    props: {
      default: (to) => ({ date: to.params.date }),
      mobile: (to) => ({ date: to.params.date })
    },
    meta: {
      responsive: true,
      ssrCacheTTL: false,
      async validator({ route, i18n }) {
        const { date } = route.params;
        if (!date || !isValidDateParam(date)) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LocaleKey.QUERY_PARAMS_ERROR) + `Invalid date ${date || ""}`
          });
        }
      }
    }
  },
  {
    path: "/search/:keyword",
    name: "search-listing",
    components: {
      default: _sfc_main$1I,
      mobile: MobileListing
    },
    props: {
      default: (to) => ({ keyword: to.params.keyword }),
      mobile: (to) => ({ searchKeyword: to.params.keyword })
    },
    meta: {
      responsive: true,
      ssrCacheTTL: false,
      async validator({ route, i18n }) {
        if (!route.params.keyword) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LocaleKey.QUERY_PARAMS_ERROR) + "Keywords ?"
          });
        }
      }
    }
  },
  {
    path: "/archive",
    name: "archive",
    components: {
      default: DesktopArchivePage,
      mobile: MobileArchivePage
    },
    meta: {
      responsive: true,
      layout: PageLayout.Full,
      ssrCacheTTL: 60 * 60
      // 1 hours
    }
  },
  {
    path: "/about",
    name: "about",
    components: {
      default: DesktopAboutPage,
      mobile: MobileAboutPage
    },
    meta: {
      responsive: true,
      layout: PageLayout.Full,
      ssrCacheTTL: 60 * 60 * 4
      // 4 hours
    }
  },
  {
    path: "/guestbook",
    name: "guestbook",
    components: {
      default: GuestbookPage,
      mobile: GuestbookPage
    },
    props: {
      mobile: {
        isMobile: true
      }
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 60 * 1
      // 1 mins
    }
  },
  {
    path: "/app",
    name: "app",
    components: {
      default: AppPage,
      mobile: AppPage
    },
    props: {
      mobile: {
        isMobile: true
      }
    },
    meta: {
      responsive: true,
      layout: PageLayout.Full,
      ssrCacheTTL: Infinity
    }
  },
  {
    path: "/photography",
    name: "photography",
    component: PhotographyPage,
    meta: {
      responsive: false,
      layout: PageLayout.Full,
      ssrCacheTTL: 60 * 60 * 1
      // 1 hours
    }
  },
  {
    path: "/snippets",
    name: "snippets",
    components: {
      default: DesktopSnippetsPage,
      mobile: MobileSnippetsPage
    },
    meta: {
      responsive: true,
      layout: PageLayout.Full,
      ssrCacheTTL: 60 * 60 * 6
      // 6 hours
    }
  },
  {
    path: "/youtube",
    name: "youtube",
    component: YoutubePage,
    meta: {
      responsive: false,
      layout: PageLayout.Full,
      ssrCacheTTL: false
    }
  },
  {
    path: "/sponsor",
    name: "sponsor",
    component: SponsorPage,
    meta: {
      responsive: false,
      layout: PageLayout.Full,
      ssrCacheTTL: Infinity
    }
  },
  {
    name: "error",
    path: "/:error(.*)",
    component: {},
    meta: {
      ssrCacheTTL: false,
      async validator({ i18n }) {
        return Promise.reject({
          code: NOT_FOUND,
          message: i18n.t(LocaleKey.NOT_FOUND)
        });
      }
    }
  }
];
const createUniversalRouter = (options) => {
  const router = createRouter({
    routes,
    strict: true,
    history: options.history,
    linkActiveClass: "link-active",
    scrollBehavior: () => scrollToPageTop()
  });
  if (options.beforeMiddleware) {
    Array.isArray(options.beforeMiddleware) ? options.beforeMiddleware.forEach(router.beforeResolve) : router.beforeResolve(options.beforeMiddleware);
  }
  if (options.afterMiddleware) {
    Array.isArray(options.afterMiddleware) ? options.afterMiddleware.forEach(router.afterEach) : router.afterEach(options.afterMiddleware);
  }
  return router;
};
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "webfont",
  __ssrInlineRender: true,
  props: {
    bolder: { type: Boolean, default: false },
    boldZh: { type: Boolean, default: false },
    boldEn: { type: Boolean, default: true },
    uppercase: { type: Boolean, default: false }
  },
  setup(__props) {
    const { isZhLang } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: [
          "webfont",
          _ctx.bolder ? "bolder" : "medium",
          unref(isZhLang) ? "zh" : "en",
          { boldZh: _ctx.boldZh },
          { boldEn: _ctx.boldEn },
          { uppercase: _ctx.uppercase }
        ]
      }, _attrs))} data-v-e296427a>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/webfont.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const Webfont = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-e296427a"]]);
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "spin",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean, default: true },
    color: { default: "rgba(197, 197, 197, 0.4)" },
    height: { default: "15px" },
    width: { default: "15px" },
    margin: { default: "5px" }
  },
  setup(__props) {
    const props = __props;
    const spinnerStyle = computed(() => ({
      backgroundColor: props.color,
      height: props.height,
      width: props.width,
      margin: props.margin
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: _ctx.loading ? null : { display: "none" },
        class: "spinner-box"
      }, _attrs))} data-v-a9d81968><div class="spinner-inner" data-v-a9d81968><div class="la-ball-beat" data-v-a9d81968><div style="${ssrRenderStyle(spinnerStyle.value)}" data-v-a9d81968></div><div style="${ssrRenderStyle(spinnerStyle.value)}" data-v-a9d81968></div><div style="${ssrRenderStyle(spinnerStyle.value)}" data-v-a9d81968></div></div></div></div>`);
    };
  }
});
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/spin.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const Spin = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-a9d81968"]]);
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "empty",
  __ssrInlineRender: true,
  props: {
    placeholder: {},
    i18nKey: {},
    bold: { type: Boolean },
    size: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["empty", [_ctx.size, { bold: _ctx.bold }]]
      }, _attrs))} data-v-c37d2bd1>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        if (_ctx.placeholder) {
          _push(`<!--[-->${ssrInterpolate(_ctx.placeholder)}<!--]-->`);
        } else {
          _push(ssrRenderComponent(_component_i18n, {
            k: _ctx.i18nKey || unref(LocaleKey).EMPTY_PLACEHOLDER
          }, null, _parent));
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/empty.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const Empty = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-c37d2bd1"]]);
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "divider",
  __ssrInlineRender: true,
  props: {
    type: { default: "horizontal" },
    size: { default: "default" },
    dashed: { type: Boolean, default: false },
    color: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "separator",
        class: ["divider", [_ctx.type, _ctx.size, { dashed: _ctx.dashed }, { slot: !!_ctx.$slots.default }]],
        style: _ctx.color ? { "--border-color": _ctx.color } : {}
      }, _attrs))} data-v-e06190df>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/divider.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-e06190df"]]);
const Udate = defineComponent({
  name: "Udate",
  props: {
    to: {
      type: String,
      required: true
    },
    date: {
      type: [String, Number, Date],
      required: true
    },
    separator: {
      type: String,
      default: "-"
    }
  },
  setup(props) {
    const { i18n } = useEnhancer();
    return () => {
      const date = props.date instanceof Date ? props.date : new Date(props.date);
      if (props.to === "YMD") {
        return dateToYMD(date, props.separator);
      }
      if (props.to === "YMDm") {
        const ymd = dateToYMD(date, props.separator);
        const meridiem = date.getHours() > 11 ? i18n.t(LocaleKey.MOMENT_PM) : i18n.t(LocaleKey.MOMENT_AM);
        return `${ymd} ${meridiem}`;
      }
      if (props.to === "ago") {
        const pluralize = (time, label) => {
          const ago = `${time} ${label}`;
          return i18n.t(LocaleKey.MOMENT_AGO, null, { date: ago });
        };
        const between = Date.now() / 1e3 - Number(date) / 1e3;
        const hourS = 3600;
        const dayS = hourS * 24;
        const weekS = dayS * 7;
        const monthS = dayS * 30;
        const yearS = monthS * 12;
        if (between < hourS) {
          return ~~(between / 60) === 0 ? i18n.t(LocaleKey.MOMENT_JUST_NOW) : pluralize(~~(between / 60), i18n.t(LocaleKey.MOMENT_MINUTES));
        }
        if (between < dayS) {
          return pluralize(~~(between / hourS), i18n.t(LocaleKey.MOMENT_HOURS));
        }
        if (between < weekS) {
          return pluralize(~~(between / dayS), i18n.t(LocaleKey.MOMENT_DAYS));
        }
        if (between < monthS) {
          return pluralize(~~(between / weekS), i18n.t(LocaleKey.MOMENT_WEEKS));
        }
        if (between < yearS) {
          return pluralize(~~(between / monthS), i18n.t(LocaleKey.MOMENT_MONTHS));
        }
        return pluralize(~~(between / yearS), i18n.t(LocaleKey.MOMENT_YEAR));
      }
      return null;
    };
  }
});
const Ulink = defineComponent({
  name: "Ulink",
  props: {
    to: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: false
    },
    external: {
      type: Boolean,
      default: true
    },
    blank: {
      type: Boolean,
      default: true
    },
    routerLink: {
      type: Object
    }
  },
  setup(props, context) {
    return () => {
      const customAttrs = { ...context.attrs };
      if (props.to && !props.to.startsWith("http")) {
        const linkProps = {
          to: props.to,
          ...props.routerLink ?? {}
        };
        return h(RouterLink, linkProps, context.slots.default);
      }
      if (props.external) {
        customAttrs.rel = "external nofollow noopener";
      }
      if (props.blank) {
        customAttrs.target = "_blank";
      }
      return h("a", { ...customAttrs, href: props.href }, context.slots.default?.());
    };
  }
});
const Uimage = defineComponent({
  name: "Uimage",
  props: {
    src: {
      type: String,
      required: true
    },
    cdn: {
      type: Boolean,
      default: false
    },
    proxy: {
      type: Boolean,
      default: false
    },
    defer: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { cdnDomain } = useEnhancer();
    const deferRenderable = ref(false);
    if (props.defer) ;
    return () => {
      const { src, cdn, proxy, defer: defer2, ...restProps } = props;
      let imageSrc = src;
      if (cdn) {
        imageSrc = getAssetURL(cdnDomain, src);
      }
      if (proxy) {
        imageSrc = getCdnProxyURL(cdnDomain, src);
      }
      if (defer2 && !deferRenderable.value) {
        imageSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
      }
      return h("img", {
        draggable: false,
        ...restProps,
        src: imageSrc
      });
    };
  }
});
const Placeholder = defineComponent({
  name: "Placeholder",
  props: {
    data: {
      type: [Array, Object, Boolean, Number],
      default: void 0
    },
    transition: {
      type: Boolean,
      default: true
    },
    transitionName: {
      type: String,
      default: "module"
    },
    placeholder: String,
    i18nKey: String,
    loading: Boolean
  },
  emits: [
    "after-enter"
    /* AfterEnter */
  ],
  setup(props, context) {
    return () => {
      const { data, placeholder, i18nKey, loading, transition, transitionName } = props;
      const isEmptyData = !_isUndefined(data) && (Array.isArray(data) && !data.length || !data);
      const getPlaceholderView = () => {
        return placeholder || i18nKey ? h(Empty, { placeholder, i18nKey }) : context.slots.placeholder?.();
      };
      const getDataView = () => {
        return isEmptyData ? getPlaceholderView() : context.slots.default?.();
      };
      const getLoadingView = () => {
        return context.slots.loading?.() || h(Spin, { loading: true });
      };
      const getView = () => {
        return loading ? getLoadingView() : getDataView();
      };
      if (transition) {
        return h(
          Transition,
          {
            name: transitionName,
            mode: "out-in",
            onAfterEnter(...args) {
              context.emit("after-enter", ...args);
            }
          },
          () => getView()
        );
      }
      return getView();
    };
  }
});
const ClientOnly = defineComponent({
  name: "ClientOnly",
  props: {
    placeholder: String,
    placeholderTag: {
      type: String,
      default: "div"
    },
    transition: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props, context) {
    const { globalState } = useEnhancer();
    const mounted = ref(globalState.isHydrated);
    onMounted(() => {
      if (!globalState.isHydrated) {
        const setRender = () => {
          mounted.value = true;
        };
        props.delay ? setTimeout(setRender, props.delay) : setRender();
      }
    });
    const renderResult = (result, resultKey) => {
      if (!props.transition) {
        return result;
      }
      if (Array.isArray(result) && result.length > 1) {
        return result;
      }
      const singleResult = Array.isArray(result) ? result[0] : result;
      return h(
        Transition,
        { name: "client-only", mode: "out-in" },
        () => singleResult ? cloneVNode(singleResult, { key: resultKey }) : h("div", { key: "empty", class: "client-only-empty" })
      );
    };
    return () => {
      if (mounted.value) {
        return renderResult(context.slots.default?.(), "result");
      }
      if (context.slots.placeholder) {
        return renderResult(context.slots.placeholder(), "placeholder-slot");
      }
      if (props.placeholderTag && props.placeholder) {
        return renderResult(
          h(props.placeholderTag, { class: "client-only-placeholder" }, props.placeholder),
          "placeholder"
        );
      }
      return renderResult(null);
    };
  }
});
const Container = defineComponent({
  name: "Container",
  props: {
    tag: {
      type: String,
      default: "div"
    }
  },
  setup(props, context) {
    return () => {
      return h(props.tag, [h("div", { class: "container" }, [context.slots.default?.()])]);
    };
  }
});
const Responsive = defineComponent({
  name: "Responsive",
  props: {
    both: Boolean,
    desktop: Boolean,
    mobile: Boolean
  },
  setup(props, context) {
    const globalState = useGlobalState();
    return () => {
      if (props.both) {
        return context.slots.default?.();
      }
      if (props.desktop && !globalState.userAgent.isMobile) {
        return context.slots.default?.();
      }
      if (props.mobile && globalState.userAgent.isMobile) {
        return context.slots.default?.();
      }
      return globalState.userAgent.isMobile ? context.slots.mobile?.() : context.slots.desktop?.();
    };
  }
});
const DesktopOnly = defineComponent({
  name: "DesktopOnly",
  setup(_, context) {
    const globalState = useGlobalState();
    return () => !globalState.userAgent.isMobile && context.slots.default?.();
  }
});
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "base",
  __ssrInlineRender: true,
  props: {
    width: {},
    height: {},
    circle: { type: Boolean, default: false },
    radius: { default: 2 }
  },
  setup(__props) {
    const props = __props;
    const style = computed(() => ({
      borderRadius: props.circle ? "100%" : `${props.radius}px`,
      ...props.width && { width: props.width + "px" },
      ...props.height && { height: props.height + "px" }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "skeleton base",
        style: style.value
      }, _attrs))} data-v-952f3bf7></div>`);
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/skeleton/base.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const SkeletonBase = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-952f3bf7"]]);
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "line",
  __ssrInlineRender: true,
  props: {
    width: {},
    height: {}
  },
  setup(__props) {
    const props = __props;
    const style = computed(() => ({
      ...props.width && { width: props.width + "px" },
      ...props.height && { height: props.height + "px" }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "skeleton line",
        style: style.value
      }, _attrs))} data-v-fcaf01ec>`);
      _push(ssrRenderComponent(SkeletonBase, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/skeleton/line.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const SkeletonLine = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-fcaf01ec"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "paragraph",
  __ssrInlineRender: true,
  props: {
    lines: { default: 1 },
    width: {},
    height: {},
    align: { type: Boolean, default: false },
    lineHeight: { default: "1rem" }
  },
  setup(__props) {
    const props = __props;
    const style = computed(() => ({
      ...props.width && { width: props.width + "px" },
      ...props.height && { height: props.height + "px" }
    }));
    const getLineStyle = (index) => {
      const style2 = {
        height: props.lineHeight,
        marginBottom: index === props.lines - 1 ? "0" : `calc(${props.lineHeight} * 0.75)`
      };
      const position = index % 3;
      if (position) {
        style2.width = `${100 - 15 * position}%`;
        style2.marginLeft = props.align ? "0" : "6%";
      }
      return style2;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "skeleton paragraph",
        style: style.value
      }, _attrs))}><!--[-->`);
      ssrRenderList(_ctx.lines, (line, index) => {
        _push(ssrRenderComponent(SkeletonLine, {
          key: index,
          style: getLineStyle(index),
          class: "paragraph-line"
        }, null, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/skeleton/paragraph.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const DIRECTIVE_NAME = "disabled-wallflower";
const ATTRIBUTE_NAME = "data-disabled-wallflower";
const vDisabledWallflower = {
  mounted(element) {
    element.setAttribute(ATTRIBUTE_NAME, "true");
  },
  beforeUnmount(element) {
    element.removeAttribute(ATTRIBUTE_NAME);
  }
};
function register(app) {
  app.component("Webfont", Webfont);
  app.component("Spin", Spin);
  app.component("Empty", Empty);
  app.component("Divider", Divider);
  app.component("Udate", Udate);
  app.component("Ulink", Ulink);
  app.component("Uimage", Uimage);
  app.component("Placeholder", Placeholder);
  app.component("LoadingIndicator", LoadingIndicator);
  app.component("ClientOnly", ClientOnly);
  app.component("Responsive", Responsive);
  app.component("DesktopOnly", DesktopOnly);
  app.component("Container", Container);
  app.component("SkeletonBase", SkeletonBase);
  app.component("SkeletonLine", SkeletonLine);
  app.component("SkeletonParagraph", _sfc_main$w);
  app.directive(DIRECTIVE_NAME, vDisabledWallflower);
}
const defaultOptions = {
  duration: 3e3,
  throttle: 200
};
const CSS_HIDDEN_TRANSITION_DURATION = 200;
const createNavigationProgress = (options) => {
  const duration = defaultOptions.duration;
  const throttle = defaultOptions.throttle;
  const progress = ref(0);
  const isLoading = ref(false);
  const step = computed(() => 1e4 / duration);
  let _timer = null;
  let _throttle = null;
  const _increase = (num) => {
    progress.value = Math.min(100, progress.value + num);
  };
  const _startTimer = () => {
    _timer = setInterval(() => {
      _increase(step.value);
    }, 100);
  };
  const clear = () => {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  };
  const _hide = () => {
    clear();
    setTimeout(() => {
      isLoading.value = false;
      nextTick().then(() => {
        setTimeout(() => {
          progress.value = 0;
        }, CSS_HIDDEN_TRANSITION_DURATION);
      });
    }, 360);
  };
  const start = () => {
    clear();
    progress.value = 0;
    isLoading.value = true;
    {
      _throttle = setTimeout(() => _startTimer(), throttle);
    }
  };
  const finish = () => {
    progress.value = 100;
    _hide();
  };
  return {
    isLoading,
    progress,
    start,
    finish,
    clear
  };
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    spin: Boolean,
    color: String,
    height: {
      type: Number,
      default: 3
    }
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const state = createNavigationProgress();
    router.beforeEach((_, __, next) => {
      state.start();
      next();
    });
    router.afterEach(() => state.finish());
    router.onError(() => state.finish());
    onBeforeUnmount(() => {
      state.clear();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "navigation-progress",
        class: { visible: unref(state).isLoading.value },
        style: { "--height": props.height + "px" }
      }, _attrs))} data-v-ba1126b5><div class="progress" style="${ssrRenderStyle({
        background: props.color || void 0,
        transform: `scaleX(${unref(state).progress.value}%)`
      })}" data-v-ba1126b5></div>`);
      if (props.spin) {
        _push(`<div class="spin" data-v-ba1126b5><div class="spin-ring" data-v-ba1126b5><div data-v-ba1126b5></div><div data-v-ba1126b5></div><div data-v-ba1126b5></div><div data-v-ba1126b5></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/navigation-progress/index.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const NavProgress = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-ba1126b5"]]);
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "emoji-rain",
  __ssrInlineRender: true,
  setup(__props) {
    const emojiImage = getAssetURL(useCdnDomain(), "/images/emojis/funny.png");
    const rainBase = ref(null);
    const state = reactive({
      chambering: false,
      kichikuing: false
    });
    onMounted(() => {
      window.$luanchEmojiRain = (options) => {
        if (!state.chambering && !state.kichikuing) {
          state.chambering = true;
          nextTick(() => {
            rainBase.value.width = document.documentElement.clientWidth || document.body.clientWidth;
            rainBase.value.height = document.documentElement.clientHeight || document.body.clientHeight;
            new window.$Emoji233333({
              base: rainBase.value,
              scale: 0.7,
              speed: 12,
              increaseSpeed: 0.4,
              density: 5,
              staggered: true,
              emoji: emojiImage,
              ...options,
              onStart() {
                state.kichikuing = true;
              },
              onEnded() {
                state.kichikuing = false;
                state.chambering = false;
              }
            }).launch();
          });
        }
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "emoji-rain",
        class: { active: state.kichikuing }
      }, _attrs))} data-v-48a8a783>`);
      if (state.chambering) {
        _push(`<canvas class="rain-base" data-v-48a8a783></canvas>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/emoji-rain.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const EmojiRain = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-48a8a783"]]);
const MusicPlayerSymbol = Symbol("music-player");
const useMusic = () => {
  return inject(MusicPlayerSymbol);
};
const useCoverArtURL = (url) => {
  return url ? getCdnProxyURL(useCdnDomain(), `${url}?param=300y300`) : url;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "player",
  __ssrInlineRender: true,
  setup(__props) {
    const player = useMusic();
    const { state, playlist, currentSong } = player;
    const songsRef = shallowRef([]);
    const isUnPlayableSong = (index) => {
      return playlist.unplayableIndexs.includes(index);
    };
    const getSecondsView = (seconds) => {
      const minutesText = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secondsText = String(Math.floor(seconds % 60)).padStart(2, "0");
      return `${minutesText}:${secondsText}`;
    };
    onMounted(() => {
      watch(
        () => state.index,
        (index) => songsRef.value[index]?.scrollIntoView({ behavior: "smooth" })
      );
      nextTick(() => {
        songsRef.value[state.index]?.scrollIntoView({ behavior: "instant" });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "music-player" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-42c3ee7a><div class="panel" data-v-42c3ee7a><div class="song" data-v-42c3ee7a><img class="cover"${ssrRenderAttr("src", unref(useCoverArtURL)(unref(currentSong)?.cover_art_url))} draggable="false" data-v-42c3ee7a>`);
      if (unref(currentSong)) {
        _push(`<div class="info" data-v-42c3ee7a><p class="title" data-v-42c3ee7a><span class="name" data-v-42c3ee7a>${ssrInterpolate(unref(currentSong).name)}</span><span class="artist" data-v-42c3ee7a>${ssrInterpolate(unref(currentSong).artist)}</span></p><p class="duration" data-v-42c3ee7a><span data-v-42c3ee7a>${ssrInterpolate(getSecondsView(unref(state).currentTime))}</span><span data-v-42c3ee7a> / </span><span data-v-42c3ee7a>${ssrInterpolate(getSecondsView(unref(currentSong).duration / 1e3))}</span></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="control" data-v-42c3ee7a><button class="cut-song prev"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-42c3ee7a><i class="iconfont icon-music-prev" data-v-42c3ee7a></i></button><button class="toggle-play"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-42c3ee7a><i class="${ssrRenderClass([unref(state).playing ? "icon-music-pause" : "icon-music-play", "iconfont"])}" data-v-42c3ee7a></i></button><button class="cut-song next"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-42c3ee7a><i class="iconfont icon-music-next" data-v-42c3ee7a></i></button></div><div class="tools" data-v-42c3ee7a><span class="indexed" data-v-42c3ee7a>${ssrInterpolate(unref(state).index + 1)} / ${ssrInterpolate(unref(playlist).total)}</span>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "playlist-link",
        href: unref(VALUABLE_LINKS).MUSIC_163_PLAYLIST
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-new-window-s" data-v-42c3ee7a${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-new-window-s" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="toggle-muted"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-42c3ee7a><i class="${ssrRenderClass([unref(state).muted ? "icon-music-muted" : "icon-music-unmuted", "iconfont"])}" data-v-42c3ee7a></i></button><input class="volume" type="range" min="0.1" max="1" step="0.1"${ssrRenderAttr("value", unref(state).volume)} data-v-42c3ee7a></div></div><div class="progress" data-v-42c3ee7a><div class="played" style="${ssrRenderStyle({ width: `${unref(state).progress * 100}%` })}" data-v-42c3ee7a></div></div><div class="songs" data-v-42c3ee7a><ul class="list" data-v-42c3ee7a><!--[-->`);
      ssrRenderList(unref(playlist).songs, (song, index) => {
        _push(`<li class="${ssrRenderClass([{ playing: unref(state).index === index, unplayable: isUnPlayableSong(index) }, "item"])}" data-v-42c3ee7a><div class="index" data-v-42c3ee7a>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</div>`);
        if (unref(state).index === index) {
          _push(`<span class="play" data-v-42c3ee7a><i class="iconfont icon-music-unmuted" data-v-42c3ee7a></i></span>`);
        } else {
          _push(`<button class="play"${ssrIncludeBooleanAttr(isUnPlayableSong(index)) ? " disabled" : ""} data-v-42c3ee7a><i class="iconfont icon-music-play" data-v-42c3ee7a></i></button>`);
        }
        _push(ssrRenderComponent(_component_ulink, {
          class: "name",
          title: song.name,
          href: unref(get163MusicSongDetailURL)(song.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text" data-v-42c3ee7a${_scopeId}>${ssrInterpolate(song.name)}</span><i class="iconfont icon-new-window-s" data-v-42c3ee7a${_scopeId}></i>`);
            } else {
              return [
                createVNode("span", { class: "text" }, toDisplayString(song.name), 1),
                createVNode("i", { class: "iconfont icon-new-window-s" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="artist"${ssrRenderAttr("title", song.artist)} data-v-42c3ee7a>${ssrInterpolate(song.artist)}</div><div class="duration" data-v-42c3ee7a>${ssrInterpolate(getSecondsView(song.duration / 1e3))}</div></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/music-player/player.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const MusicPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-42c3ee7a"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "handle",
  __ssrInlineRender: true,
  setup(__props) {
    useEnhancer();
    const player = useMusic();
    const { state, currentSong } = player;
    const isOnPlayerModel = ref(false);
    const togglePlayerModel = () => {
      isOnPlayerModel.value = !isOnPlayerModel.value;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({
        id: "player",
        class: { playing: unref(state).playing }
      }, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-7592e79c><div class="panel" data-v-7592e79c><div class="control" data-v-7592e79c><button class="prev-song button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-7592e79c><i class="iconfont icon-music-prev" data-v-7592e79c></i></button><button class="next-song button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-7592e79c><i class="iconfont icon-music-next" data-v-7592e79c></i></button><button class="muted-toggle button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-7592e79c><i class="${ssrRenderClass([unref(state).muted ? "icon-music-muted" : "icon-music-unmuted", "iconfont"])}" data-v-7592e79c></i></button><button class="player button" data-v-7592e79c><i class="iconfont icon-netease-music" data-v-7592e79c></i></button></div><button class="song-link" data-v-7592e79c>`);
      if (unref(currentSong)) {
        _push(`<span data-v-7592e79c>${ssrInterpolate(unref(currentSong).name)}</span>`);
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).MUSIC_PLACEHOLDER
        }, null, _parent));
      }
      _push(`</button></div><div class="cd" data-v-7592e79c><img class="image"${ssrRenderAttr("src", unref(useCoverArtURL)(unref(currentSong)?.cover_art_url))} data-v-7592e79c><button class="toggle-button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-7592e79c><i class="${ssrRenderClass([unref(state).playing ? "icon-music-pause" : "icon-music-play", "iconfont"])}" data-v-7592e79c></i></button></div><div class="trigger" data-v-7592e79c><i class="iconfont icon-music" data-v-7592e79c></i></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: isOnPlayerModel.value,
              "onUpdate:visible": ($event) => isOnPlayerModel.value = $event,
              "scroll-close": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(MusicPlayer, { onClose: togglePlayerModel }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(MusicPlayer, { onClose: togglePlayerModel })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: isOnPlayerModel.value,
                "onUpdate:visible": ($event) => isOnPlayerModel.value = $event,
                "scroll-close": false
              }, {
                default: withCtx(() => [
                  createVNode(MusicPlayer, { onClose: togglePlayerModel })
                ]),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/music-player/handle.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const MusicPlayerHandle = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-7592e79c"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "flower",
  __ssrInlineRender: true,
  props: {
    id: {},
    x: {},
    y: {},
    text: {},
    zIndex: {}
  },
  emits: ["ended"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const state = reactive({
      delay: 1,
      timer: null,
      playing: false
    });
    const styles = computed(() => ({
      top: props.y + "px",
      left: props.x + "px",
      "z-index": 99999 + props.zIndex
    }));
    const startAnimation = () => {
      nextTick(() => {
        setTimeout(() => {
          state.playing = true;
        });
        state.timer = window.setTimeout(() => {
          state.playing = false;
          nextTick(() => emit("ended", props.id));
        }, state.delay * 1e3);
      });
    };
    startAnimation();
    onMounted(startAnimation);
    onBeforeUnmount(() => {
      if (state.timer) {
        clearTimeout(state.timer);
        state.timer = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["flower-item", { playing: state.playing }],
        style: styles.value
      }, _attrs))} data-v-ee721d00>`);
      _push(ssrRenderComponent(_component_webfont, { bolder: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(props.text)}`);
          } else {
            return [
              createTextVNode(toDisplayString(props.text), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/wallflower/flower.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const Flower = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-ee721d00"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "garden",
  __ssrInlineRender: true,
  setup(__props) {
    const EN_FLOWERS = ["💙", "🤍", "❤️"];
    const ZH_FLOWERS = ["布施", "持戒", "忍辱", "精进", "禅定", "般若"];
    const { isZhLang } = useEnhancer();
    const state = reactive({
      id: 0,
      contentIndex: -1,
      flowers: []
    });
    const handleClick = (event) => {
      let currentElement = event?.target;
      while (currentElement) {
        if (currentElement.getAttribute(ATTRIBUTE_NAME) != null) {
          return;
        }
        currentElement = currentElement.parentElement;
      }
      const flowers = isZhLang.value ? ZH_FLOWERS : EN_FLOWERS;
      state.contentIndex++;
      if (state.contentIndex >= flowers.length) {
        state.contentIndex = 0;
      }
      state.flowers.push({
        id: ++state.id,
        x: event.x || event.clientX,
        y: event.y || event.clientY,
        text: flowers[state.contentIndex]
      });
    };
    const handleAnimationEnd = (id) => {
      const targetIndex = state.flowers.findIndex((flower) => flower.id === id);
      if (targetIndex > -1) {
        state.flowers.splice(targetIndex, 1);
      }
    };
    onMounted(() => window.addEventListener("click", handleClick));
    onBeforeUnmount(() => window.removeEventListener("click", handleClick));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "wallflower" }, _attrs))} data-v-8c966f2d>`);
      if (state.flowers.length) {
        _push(`<ul class="garden-box" data-v-8c966f2d><!--[-->`);
        ssrRenderList(state.flowers, (flower, index) => {
          _push(ssrRenderComponent(Flower, {
            key: flower.id,
            id: flower.id,
            x: flower.x,
            y: flower.y,
            text: flower.text,
            "z-index": index + 1,
            onEnded: handleAnimationEnd
          }, null, _parent));
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/wallflower/garden.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const Wallflower = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-8c966f2d"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "wall",
  __ssrInlineRender: true,
  setup(__props, { emit: __emit }) {
    const { i18n: _i18n } = useEnhancer();
    const wallpaperStore = useWallpaperStore();
    const wallpapers = computed(() => wallpaperStore.papers(_i18n.language.value));
    const index = ref(0);
    const activePaper = computed(() => wallpapers.value?.[index.value]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wall" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-699327c2><div class="picture-box"${ssrRenderAttr("title", activePaper.value.copyright)} style="${ssrRenderStyle({ backgroundImage: `url(${activePaper.value.humanizedImageUrl})` })}" data-v-699327c2></div><div class="story-box" data-v-699327c2>`);
      if (activePaper.value.title) {
        _push(`<!--[--><h2 class="title" data-v-699327c2>${ssrInterpolate(activePaper.value.title)}</h2><p class="sub-title" data-v-699327c2>${ssrInterpolate(activePaper.value.copyright)}</p><!--]-->`);
      } else {
        _push(`<h2 class="title lonely" data-v-699327c2>${ssrInterpolate(activePaper.value.copyright)}</h2>`);
      }
      _push(`<p class="desc" data-v-699327c2>${ssrInterpolate(activePaper.value.desc)}</p><div class="tools" data-v-699327c2>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: activePaper.value.humanizedCopyrightUrl,
        title: activePaper.value.bsTitle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-bing" data-v-699327c2${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-bing" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="button" title="Prev"${ssrIncludeBooleanAttr(index.value <= 0) ? " disabled" : ""} data-v-699327c2><i class="iconfont icon-prev" data-v-699327c2></i></button><button class="button" title="Next"${ssrIncludeBooleanAttr(index.value >= wallpapers.value.length - 1) ? " disabled" : ""} data-v-699327c2><i class="iconfont icon-next" data-v-699327c2></i></button><button class="button" title="Close" data-v-699327c2><i class="iconfont icon-cancel" data-v-699327c2></i></button></div></div></div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/wallpaper/wall.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const Wallpapers = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-699327c2"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "switcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDarkTheme } = useEnhancer();
    useWallpaperStore();
    const isOnWallpaper = ref(false);
    const handleCloseWallpaper = () => {
      isOnWallpaper.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({ id: "wallpaper" }, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-371351d4><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "switcher"])}" data-v-371351d4><div class="title" data-v-371351d4><i class="iconfont icon-bing" data-v-371351d4></i><span class="text" data-v-371351d4>BING</span></div></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: isOnWallpaper.value,
              "onUpdate:visible": ($event) => isOnWallpaper.value = $event,
              "mask-close": false,
              "scroll-close": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Wallpapers, { onClose: handleCloseWallpaper }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Wallpapers, { onClose: handleCloseWallpaper })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: isOnWallpaper.value,
                "onUpdate:visible": ($event) => isOnWallpaper.value = $event,
                "mask-close": false,
                "scroll-close": false
              }, {
                default: withCtx(() => [
                  createVNode(Wallpapers, { onClose: handleCloseWallpaper })
                ]),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/wallpaper/switcher.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const Wallpaper = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-371351d4"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "background",
  __ssrInlineRender: true,
  setup(__props) {
    const { cdnDomain, isDarkTheme } = useEnhancer();
    const backgroundImage = getAssetURL(cdnDomain, "/images/background.png");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "background" }, _attrs))} data-v-53df6962><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "image"])}" style="${ssrRenderStyle({ backgroundImage: `url('${unref(backgroundImage)}')` })}" data-v-53df6962></div></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/background.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const Background = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-53df6962"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "toolbox",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n } = useEnhancer();
    ref(0);
    ref(false);
    ref(false);
    const handleRSS = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "toolbox" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-75b8238a><div class="container" data-v-75b8238a><div class="tools" data-v-75b8238a>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "rss",
        href: unref(VALUABLE_LINKS).RSS,
        onMousedown: handleRSS
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-rss" data-v-75b8238a${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-rss" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="feedback"${ssrRenderAttr("title", unref(_i18n).t(unref(LocaleKey).FEEDBACK))} data-v-75b8238a><i class="iconfont icon-mail-plane" data-v-75b8238a></i></button><button class="to-page-top"${ssrRenderAttr("title", unref(_i18n).t(unref(LocaleKey).TO_TOP))} data-v-75b8238a><i class="iconfont icon-totop" data-v-75b8238a></i></button><button class="to-page-bottom"${ssrRenderAttr("title", unref(_i18n).t(unref(LocaleKey).TO_BOTTOM))} data-v-75b8238a><i class="iconfont icon-tobottom" data-v-75b8238a></i></button></div></div></div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/toolbox.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const Toolbox = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-75b8238a"]]);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "feedback",
  __ssrInlineRender: true,
  setup(__props, { emit: __emit }) {
    const EMOTIONS = [
      { emoji: "😠", value: 1, en: "Terrible", zh: "差劲" },
      { emoji: "🙁", value: 2, en: "Bad", zh: "不喜欢" },
      { emoji: "😐", value: 3, en: "Neutral", zh: "无感" },
      { emoji: "😃", value: 4, en: "Great", zh: "喜欢" },
      { emoji: "🥰", value: 5, en: "Amazing", zh: "太棒了" }
    ];
    const { appOption, identity } = useStores();
    const { isZhLang } = useEnhancer();
    const state = reactive({
      emotion: null,
      content: "",
      submitting: false,
      submitted: false
    });
    const isSubmitable = computed(() => {
      return Number.isInteger(state.emotion) && Boolean(state.content);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "feedback" }, _attrs))} data-v-dc15f7e0>`);
      if (state.submitted) {
        _push(`<div class="submitted" data-v-dc15f7e0><div class="icon" data-v-dc15f7e0><i class="iconfont icon-success" data-v-dc15f7e0></i></div><div class="text" data-v-dc15f7e0>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`感谢你的反馈。`);
            } else {
              return [
                createTextVNode("感谢你的反馈。")
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Thank U for your feedback.`);
            } else {
              return [
                createTextVNode("Thank U for your feedback.")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><button class="close" data-v-dc15f7e0>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "关闭窗口",
          en: "Close"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!--[--><div class="title" data-v-dc15f7e0>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`你认为 ${ssrInterpolate(unref(APP_META).title)} 整体怎么样？`);
            } else {
              return [
                createTextVNode("你认为 " + toDisplayString(unref(APP_META).title) + " 整体怎么样？", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`How would you rate ${ssrInterpolate(unref(APP_META).title)}?`);
            } else {
              return [
                createTextVNode("How would you rate " + toDisplayString(unref(APP_META).title) + "?", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="emotions" data-v-dc15f7e0><!--[-->`);
        ssrRenderList(EMOTIONS, (emotion) => {
          _push(`<li class="item" data-v-dc15f7e0><label data-v-dc15f7e0><input class="radio" type="radio"${ssrRenderAttr("value", emotion.value)}${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""}${ssrIncludeBooleanAttr(ssrLooseEqual(state.emotion, emotion.value)) ? " checked" : ""} data-v-dc15f7e0><div class="${ssrRenderClass([{ activated: state.emotion === emotion.value }, "button"])}" data-v-dc15f7e0><span class="emoji" data-v-dc15f7e0>${ssrInterpolate(emotion.emoji)}</span><span class="text" data-v-dc15f7e0>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: emotion.zh,
            en: emotion.en
          }, null, _parent));
          _push(`</span></div></label>`);
          if (state.emotion === emotion.value) {
            _push(`<div class="arrow" data-v-dc15f7e0></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></div><div class="input" data-v-dc15f7e0><textarea class="textarea" name="feedback" id="feedback" rows="10" autofocus${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(isZhLang) ? "你可在此畅所欲言，这将仅对博主可见" : "Tell me about your opinion...")} data-v-dc15f7e0>${ssrInterpolate(state.content)}</textarea><div class="buttons" data-v-dc15f7e0><button class="item cancel"${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""} data-v-dc15f7e0><span class="text" data-v-dc15f7e0>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "取消",
          en: "Cancel"
        }, null, _parent));
        _push(`</span></button><button class="item submit"${ssrIncludeBooleanAttr(!isSubmitable.value || state.submitting) ? " disabled" : ""} data-v-dc15f7e0><i class="iconfont icon-mail-plane" data-v-dc15f7e0></i><span class="text" data-v-dc15f7e0>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: state.submitting ? unref(LocaleKey).SUBMITTING : unref(LocaleKey).SUBMIT
        }, null, _parent));
        _push(`</span></button></div></div><!--]-->`);
      }
      if (unref(identity).feedbacks.length) {
        _push(`<div class="history" data-v-dc15f7e0>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`你已进行过 ${ssrInterpolate(unref(identity).feedbacks.length)} 次反馈。`);
            } else {
              return [
                createTextVNode("你已进行过 " + toDisplayString(unref(identity).feedbacks.length) + " 次反馈。", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`You have ${ssrInterpolate(unref(identity).feedbacks.length)} feedback history.`);
            } else {
              return [
                createTextVNode("You have " + toDisplayString(unref(identity).feedbacks.length) + " feedback history.", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/feedback.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const Feedback = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-dc15f7e0"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "statement",
  __ssrInlineRender: true,
  setup(__props) {
    const { appOption } = useStores();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "statement" }, _attrs))} data-v-366d2a43><div class="content" data-v-366d2a43>`);
      _push(ssrRenderComponent(_sfc_main$1z, {
        markdown: unref(appOption).data?.statement,
        compact: true
      }, null, _parent));
      _push(`<br data-v-366d2a43><hr data-v-366d2a43>`);
      if (unref(appOption).data) {
        _push(`<p class="email" data-v-366d2a43><a${ssrRenderAttr("href", unref(getEmailLink)(unref(appOption).data.site_email))} class="link" target="_blank" data-v-366d2a43><i class="iconfont icon-mail" data-v-366d2a43></i><span class="text" data-v-366d2a43>${ssrInterpolate(unref(appOption).data.site_email)}</span></a></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/statement.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const Statement = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-366d2a43"]]);
const menus = [
  {
    id: RouteName.Home,
    route: "/",
    icon: "icon-home",
    i18nKey: LocaleKey.PAGE_HOME
  },
  {
    id: CategorySlug.Code,
    route: getCategoryFlowRoute(CategorySlug.Code),
    icon: "icon-code",
    i18nKey: LocaleKey.CATEGORY_CODE
  },
  {
    id: CategorySlug.Insight,
    route: getCategoryFlowRoute(CategorySlug.Insight),
    icon: "icon-insight",
    i18nKey: LocaleKey.CATEGORY_INSIGHT
  },
  {
    id: "github",
    url: GO_LINK_MAP.github,
    icon: "icon-github",
    i18nKey: LocaleKey.PAGE_GITHUB,
    newWindow: true
  },
  {
    id: RouteName.Photography,
    route: getPageRoute(RouteName.Photography),
    icon: "icon-lens",
    i18nKey: LocaleKey.PAGE_PHOTOGRAPHY
  },
  {
    id: RouteName.Snippets,
    route: getPageRoute(RouteName.Snippets),
    i18nKey: LocaleKey.PAGE_SNIPPETS,
    icon: "icon-buddhism"
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    icon: "icon-swordsman",
    i18nKey: LocaleKey.PAGE_ABOUT
  },
  {
    id: RouteName.Guestbook,
    route: getPageRoute(RouteName.Guestbook),
    i18nKey: LocaleKey.PAGE_GUESTBOOK,
    icon: "icon-comment"
  },
  {
    id: "sponsor",
    route: getPageRoute(RouteName.Sponsor),
    icon: "icon-peachblossom",
    i18nKey: LocaleKey.PAGE_SPONSOR,
    hot: true,
    divider: true
  }
  // {
  //   id: RouteName.App,
  //   route: getPageRoute(RouteName.App),
  //   imageIcon: getPageURL('/images/page-app/logo.png'),
  //   i18nKey: LocaleKey.PAGE_APP,
  //   divider: true
  // }
];
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, theme, globalState } = useEnhancer();
    const isEnabledNav = computed(() => !globalState.pageLayout.value.isNormal);
    const themeIcon = computed(() => {
      const themeIconMap = {
        [Theme.Light]: "icon-sun",
        [Theme.Dark]: "icon-moon"
      };
      return themeIconMap[theme.theme.value];
    });
    const languageIcon = computed(() => {
      const languageIconMap = {
        [Language.Chinese]: "icon-chinese",
        [Language.English]: "icon-english"
      };
      return languageIconMap[_i18n.language.value];
    });
    const handleRootNavEvent = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      const _component_ulink = resolveComponent("ulink");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<header${ssrRenderAttrs(mergeProps({
        id: unref(HEADER_ELEMENT_ID),
        class: ["header", { "enable-nav": isEnabledNav.value }]
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-ede7e629><div class="header-container container" data-v-ede7e629><div class="header-header" data-v-ede7e629>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        src: "/images/logo.svg",
        class: "header-logo",
        alt: unref(APP_META).title
      }, null, _parent));
      _push(ssrRenderComponent(_component_webfont, { class: "header-slogan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocaleKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "header-link",
        title: unref(APP_META).title,
        onMousedown: handleRootNavEvent
      }, null, _parent));
      _push(`</div><div class="toolbox" data-v-ede7e629>`);
      if (isEnabledNav.value) {
        _push(`<button class="button menu" data-v-ede7e629><i class="iconfont icon-top-menu" data-v-ede7e629></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="button language" title="Switch language" data-v-ede7e629><i class="${ssrRenderClass([languageIcon.value, "iconfont"])}" data-v-ede7e629></i></button><button class="${ssrRenderClass([unref(theme).theme.value, "button theme"])}" data-v-ede7e629><i class="${ssrRenderClass([themeIcon.value, "iconfont"])}" data-v-ede7e629></i></button></div></div><div class="header-nav" data-v-ede7e629><nav class="nav-list container" data-v-ede7e629><!--[-->`);
      ssrRenderList(unref(menus), (menu, index) => {
        _push(`<!--[-->`);
        if (index > 0) {
          _push(`<span class="divider" data-v-ede7e629></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_ulink, {
          class: ["item", menu.id],
          to: menu.route,
          href: menu.url
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (menu.imageIcon) {
                _push2(ssrRenderComponent(_component_uimage, {
                  class: "image-icon",
                  src: menu.imageIcon
                }, null, _parent2, _scopeId));
              } else if (menu.icon) {
                _push2(`<i class="${ssrRenderClass([menu.icon, "font-icon iconfont"])}" data-v-ede7e629${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_webfont, {
                class: "text",
                bolder: "",
                uppercase: !menu.disabledUppercase
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_i18n, {
                      k: menu.i18nKey
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_i18n, {
                        k: menu.i18nKey
                      }, null, 8, ["k"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (menu.hot) {
                _push2(`<span class="superscript" data-v-ede7e629${_scopeId}><i class="iconfont icon-hot-fill" data-v-ede7e629${_scopeId}></i></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (menu.newWindow) {
                _push2(`<span class="new-window" data-v-ede7e629${_scopeId}><i class="iconfont icon-new-window-s" data-v-ede7e629${_scopeId}></i></span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                menu.imageIcon ? (openBlock(), createBlock(_component_uimage, {
                  key: 0,
                  class: "image-icon",
                  src: menu.imageIcon
                }, null, 8, ["src"])) : menu.icon ? (openBlock(), createBlock("i", {
                  key: 1,
                  class: ["font-icon iconfont", menu.icon]
                }, null, 2)) : createCommentVNode("", true),
                createVNode(_component_webfont, {
                  class: "text",
                  bolder: "",
                  uppercase: !menu.disabledUppercase
                }, {
                  default: withCtx(() => [
                    createVNode(_component_i18n, {
                      k: menu.i18nKey
                    }, null, 8, ["k"])
                  ]),
                  _: 2
                }, 1032, ["uppercase"]),
                menu.hot ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "superscript"
                }, [
                  createVNode("i", { class: "iconfont icon-hot-fill" })
                ])) : createCommentVNode("", true),
                menu.newWindow ? (openBlock(), createBlock("span", {
                  key: 3,
                  class: "new-window"
                }, [
                  createVNode("i", { class: "iconfont icon-new-window-s" })
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav></div></header>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/header.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const HeaderView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-ede7e629"]]);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLink } = useStores();
    const { globalState } = useEnhancer();
    const handleStatementModal = () => {
      globalState.toggleSwitcher("statement", true);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_container = resolveComponent("container");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_i18n = resolveComponent("i18n");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(ssrRenderComponent(_component_container, mergeProps({
        tag: "footer",
        id: unref(FOOTER_ELEMENT_ID),
        class: "footer"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ulink, {
              class: "sitemap-btn",
              href: unref(VALUABLE_LINKS).SITE_MAP
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`sitemap.xml`);
                } else {
                  return [
                    createTextVNode("sitemap.xml")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "由 ",
              en: "Powered By "
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item",
              href: unref(VALUABLE_LINKS).GITHUB_BLOG_STAR_LIST
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`NodePress`);
                } else {
                  return [
                    createTextVNode("NodePress")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "、",
              en: ", "
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item",
              href: unref(VALUABLE_LINKS).GITHUB_SURMON_ME
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Vue`);
                } else {
                  return [
                    createTextVNode("Vue")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_i18n, {
              zh: " 和 日月星辰 强力驱动",
              en: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(`<a class="statement" href="javascript:void(0)" data-v-12ff4678${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "周知",
              en: "FAQ"
            }, null, _parent2, _scopeId));
            _push2(`</a>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              href: unref(goLink).map.status
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "实态",
                    en: "STATUS"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "实态",
                      en: "STATUS"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ulink, {
                class: "sitemap-btn",
                href: unref(VALUABLE_LINKS).SITE_MAP
              }, {
                default: withCtx(() => [
                  createTextVNode("sitemap.xml")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_component_divider, { type: "vertical" }),
              createVNode(_component_i18n, {
                zh: "由 ",
                en: "Powered By "
              }),
              createVNode(_component_ulink, {
                class: "item",
                href: unref(VALUABLE_LINKS).GITHUB_BLOG_STAR_LIST
              }, {
                default: withCtx(() => [
                  createTextVNode("NodePress")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_component_i18n, {
                zh: "、",
                en: ", "
              }),
              createVNode(_component_ulink, {
                class: "item",
                href: unref(VALUABLE_LINKS).GITHUB_SURMON_ME
              }, {
                default: withCtx(() => [
                  createTextVNode("Vue")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_component_i18n, {
                zh: " 和 日月星辰 强力驱动",
                en: ""
              }),
              createVNode(_component_divider, { type: "vertical" }),
              createVNode("a", {
                class: "statement",
                href: "javascript:void(0)",
                onClick: handleStatementModal
              }, [
                createVNode(_component_i18n, {
                  zh: "周知",
                  en: "FAQ"
                })
              ]),
              createVNode(_component_divider, { type: "vertical" }),
              createVNode(_component_ulink, {
                href: unref(goLink).map.status
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    zh: "实态",
                    en: "STATUS"
                  })
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/footer.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const FooterView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-12ff4678"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, route } = useEnhancer();
    ref();
    const keyword = ref("");
    onMounted(() => {
      if (isSearchFlow(route.name)) {
        keyword.value = route.params.keyword;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search" }, _attrs))} data-v-7f5f0ac4><form class="search-box" data-v-7f5f0ac4><input id="keyword" required type="search" name="search" maxlength="16" autocomplete="off"${ssrRenderAttr("value", keyword.value)} class="${ssrRenderClass([unref(_i18n).language, "search-input"])}"${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocaleKey).SEARCH_PLACEHOLDER))} data-v-7f5f0ac4><button type="submit" class="search-btn" data-v-7f5f0ac4><i class="iconfont icon-search" data-v-7f5f0ac4></i></button></form>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "extra-btn",
        to: { name: unref(RouteName).Sponsor }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-peachblossom" data-v-7f5f0ac4${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-peachblossom" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/search.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const AsideSearch = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-7f5f0ac4"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "statistic",
  __ssrInlineRender: true,
  setup(__props) {
    const StatisticSkeleton = defineComponent({
      props: {
        fetching: Boolean,
        count: Number
      },
      setup(props) {
        return () => h(
          Transition,
          { name: "module", mode: "out-in", duration: 280 },
          () => props.fetching ? h("p", { class: "skeleton", key: "skeleton" }, "•••") : h("p", { class: "count", key: "count" }, props.count ?? "-")
        );
      }
    });
    const fetching = ref(true);
    const statisticStore = useNodepressStatisticStore();
    onMounted(() => {
      statisticStore.fetch().finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      _push(ssrRenderComponent(_component_router_link, mergeProps({
        class: "statistic",
        to: { name: unref(RouteName).Archive }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="item" data-v-132a9bb1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticSkeleton), {
              fetching: fetching.value,
              count: unref(statisticStore).data?.articles
            }, null, _parent2, _scopeId));
            _push2(`<span class="title" data-v-132a9bb1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).STATISTIC_ARTICLES
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-132a9bb1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticSkeleton), {
              fetching: fetching.value,
              count: unref(statisticStore).data?.todayViews
            }, null, _parent2, _scopeId));
            _push2(`<span class="title" data-v-132a9bb1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).STATISTIC_TODAY_VIEWS
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-132a9bb1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticSkeleton), {
              fetching: fetching.value,
              count: unref(statisticStore).data?.comments
            }, null, _parent2, _scopeId));
            _push2(`<span class="title" data-v-132a9bb1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).STATISTIC_COMMENTS
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
          } else {
            return [
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticSkeleton), {
                  fetching: fetching.value,
                  count: unref(statisticStore).data?.articles
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "title" }, [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).STATISTIC_ARTICLES
                  }, null, 8, ["k"])
                ])
              ]),
              createVNode(_component_divider, { type: "vertical" }),
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticSkeleton), {
                  fetching: fetching.value,
                  count: unref(statisticStore).data?.todayViews
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "title" }, [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).STATISTIC_TODAY_VIEWS
                  }, null, 8, ["k"])
                ])
              ]),
              createVNode(_component_divider, { type: "vertical" }),
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticSkeleton), {
                  fetching: fetching.value,
                  count: unref(statisticStore).data?.comments
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "title" }, [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).STATISTIC_COMMENTS
                  }, null, 8, ["k"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/statistic.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const AsideStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-132a9bb1"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "article",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n } = useEnhancer();
    const { hottestArticleList, latestArticleList, featuredArticleList } = useStores();
    const tabs = computed(() => [
      {
        zh_title: "最近更新",
        en_title: "Latest",
        zh_label: "最新",
        en_label: "latest",
        icon: "icon-clock",
        store: latestArticleList
      },
      {
        zh_title: "热门趋势",
        en_title: "Trending",
        zh_label: "热门",
        en_label: "trend",
        icon: "icon-fire",
        store: hottestArticleList
      },
      {
        zh_title: "群贤毕至",
        en_title: "Featured",
        zh_label: _i18n.t(LocaleKey.ARTICLE_FEATURED_SHORT, Language.Chinese),
        en_label: _i18n.t(LocaleKey.ARTICLE_FEATURED_SHORT, Language.English),
        icon: "icon-windmill",
        store: featuredArticleList
      }
    ]);
    const activatedTabIndex = ref(tabs.value.length - 1);
    const activatedTab = computed(() => tabs.value[activatedTabIndex.value]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article" }, _attrs))} data-v-831a6ba6><div class="header" data-v-831a6ba6><span class="title" data-v-831a6ba6><i class="${ssrRenderClass([activatedTab.value.icon, "iconfont"])}" data-v-831a6ba6></i><span class="text" data-v-831a6ba6>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: activatedTab.value.zh_title,
        en: activatedTab.value.en_title
      }, null, _parent));
      _push(`</span></span><div class="types" data-v-831a6ba6><!--[-->`);
      ssrRenderList(tabs.value, (tab, index) => {
        _push(`<!--[--><span class="${ssrRenderClass([{ activated: index === activatedTabIndex.value }, "item"])}" data-v-831a6ba6>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: tab.zh_label,
          en: tab.en_label
        }, null, _parent));
        _push(`</span>`);
        if (index !== tabs.value.length - 1) {
          _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: activatedTab.value.store.data,
        loading: activatedTab.value.store.fetching,
        "i18n-key": unref(LocaleKey).ARTICLE_PLACEHOLDER
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="article-list-skeleton" data-v-831a6ba6${_scopeId}><!--[-->`);
            ssrRenderList(5, (item) => {
              _push2(`<li class="item" data-v-831a6ba6${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                class: "article-list-skeleton",
                key: "skeleton"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(5, (item) => {
                  return createVNode("li", {
                    key: item,
                    class: "item"
                  }, [
                    createVNode(_component_skeleton_line)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="article-list" data-v-831a6ba6${_scopeId}><!--[-->`);
            ssrRenderList(activatedTab.value.store.data.slice(0, unref(APP_CONFIG).desktop_aside_article_list_count), (article, i) => {
              _push2(`<li class="item" data-v-831a6ba6${_scopeId}><span class="index"${ssrRenderAttr("data-index", i + 1)} data-v-831a6ba6${_scopeId}>${ssrInterpolate(i + 1)}${ssrInterpolate(i > 2 ? "." : "")}</span><div class="content" data-v-831a6ba6${_scopeId}>`);
              _push2(ssrRenderComponent(_component_router_link, {
                class: "title",
                to: unref(getArticleDetailRoute)(article.id),
                title: article.title
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(article.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(article.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="meta" data-v-831a6ba6${_scopeId}><span class="item date" data-v-831a6ba6${_scopeId}>${ssrInterpolate(unref(dateToYMD)(article.created_at).slice(0, -3))}</span><span class="item views" data-v-831a6ba6${_scopeId}><i class="iconfont icon-eye" data-v-831a6ba6${_scopeId}></i> ${ssrInterpolate(unref(numberToKilo)(article.meta.views))}</span><span class="item comments" data-v-831a6ba6${_scopeId}><i class="iconfont icon-comment" data-v-831a6ba6${_scopeId}></i> ${ssrInterpolate(article.meta.comments)}</span><span class="item likes" data-v-831a6ba6${_scopeId}><i class="iconfont icon-like" data-v-831a6ba6${_scopeId}></i> ${ssrInterpolate(article.meta.likes)}</span></div></div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                class: "article-list",
                key: "list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(activatedTab.value.store.data.slice(0, unref(APP_CONFIG).desktop_aside_article_list_count), (article, i) => {
                  return openBlock(), createBlock("li", {
                    key: article.id,
                    class: "item"
                  }, [
                    createVNode("span", {
                      class: "index",
                      "data-index": i + 1
                    }, toDisplayString(i + 1) + toDisplayString(i > 2 ? "." : ""), 9, ["data-index"]),
                    createVNode("div", { class: "content" }, [
                      createVNode(_component_router_link, {
                        class: "title",
                        to: unref(getArticleDetailRoute)(article.id),
                        title: article.title
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(article.title), 1)
                        ]),
                        _: 2
                      }, 1032, ["to", "title"]),
                      createVNode("div", { class: "meta" }, [
                        createVNode("span", { class: "item date" }, toDisplayString(unref(dateToYMD)(article.created_at).slice(0, -3)), 1),
                        createVNode("span", { class: "item views" }, [
                          createVNode("i", { class: "iconfont icon-eye" }),
                          createTextVNode(" " + toDisplayString(unref(numberToKilo)(article.meta.views)), 1)
                        ]),
                        createVNode("span", { class: "item comments" }, [
                          createVNode("i", { class: "iconfont icon-comment" }),
                          createTextVNode(" " + toDisplayString(article.meta.comments), 1)
                        ]),
                        createVNode("span", { class: "item likes" }, [
                          createVNode("i", { class: "iconfont icon-like" }),
                          createTextVNode(" " + toDisplayString(article.meta.likes), 1)
                        ])
                      ])
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/article.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const AsideArticle = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-831a6ba6"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "mammon",
  __ssrInlineRender: true,
  props: {
    index: { default: 0 }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { adConfig } = useEnhancer();
    const swiperRef = shallowRef();
    const activeIndex = shallowRef(props.index);
    const setSwiper = (_swiper) => {
      swiperRef.value = _swiper;
      emit("ready", swiperRef.value);
    };
    const handleSlideChange = () => {
      const realIndex = swiperRef.value?.realIndex;
      emit("update:index", realIndex);
      emit("index-change", realIndex);
      if (!_isNil(realIndex)) {
        activeIndex.value = realIndex;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mammon" }, _attrs))} data-v-23fb4d4e>`);
      _push(ssrRenderComponent(unref(Swiper$1), {
        class: "swiper",
        direction: "vertical",
        style: { "--slide-delay": `${2800}ms` },
        autoplay: { delay: 2800, disableOnInteraction: false },
        loop: true,
        "simulate-touch": false,
        "set-wrapper-size": true,
        "auto-height": true,
        mousewheel: true,
        "initial-slide": props.index,
        onSlideChange: handleSlideChange,
        onSwiper: setSwiper
      }, {
        "container-end": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="swiper-pagination" data-v-23fb4d4e${_scopeId}><!--[-->`);
            ssrRenderList(unref(adConfig).PC_ASIDE_SWIPER, (__, _index) => {
              _push2(`<div${ssrRenderAttr("aria-label", `Go to slide ${_index}`)} class="${ssrRenderClass([{ active: _index === activeIndex.value }, "swiper-pagination-bullet"])}" role="button" data-v-23fb4d4e${_scopeId}><span class="bullet-progress" data-v-23fb4d4e${_scopeId}></span></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "swiper-pagination" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(adConfig).PC_ASIDE_SWIPER, (__, _index) => {
                  return openBlock(), createBlock("div", {
                    key: _index,
                    "aria-label": `Go to slide ${_index}`,
                    class: [{ active: _index === activeIndex.value }, "swiper-pagination-bullet"],
                    role: "button"
                  }, [
                    createVNode("span", { class: "bullet-progress" })
                  ], 10, ["aria-label"]);
                }), 128))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(adConfig).PC_ASIDE_SWIPER, (ad, _index) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), {
                class: "swiper-slide",
                key: _index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_ulink, {
                      class: "content",
                      href: ad.url
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_uimage, {
                            src: ad.src,
                            alt: "aside-swiper-ad"
                          }, null, _parent4, _scopeId3));
                          _push4(`<i class="iconfont icon-ad" data-v-23fb4d4e${_scopeId3}></i>`);
                        } else {
                          return [
                            createVNode(_component_uimage, {
                              src: ad.src,
                              alt: "aside-swiper-ad"
                            }, null, 8, ["src"]),
                            createVNode("i", { class: "iconfont icon-ad" })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_ulink, {
                        class: "content",
                        href: ad.url
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_uimage, {
                            src: ad.src,
                            alt: "aside-swiper-ad"
                          }, null, 8, ["src"]),
                          createVNode("i", { class: "iconfont icon-ad" })
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(adConfig).PC_ASIDE_SWIPER, (ad, _index) => {
                return openBlock(), createBlock(unref(SwiperSlide), {
                  class: "swiper-slide",
                  key: _index
                }, {
                  default: withCtx(() => [
                    createVNode(_component_ulink, {
                      class: "content",
                      href: ad.url
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_uimage, {
                          src: ad.src,
                          alt: "aside-swiper-ad"
                        }, null, 8, ["src"]),
                        createVNode("i", { class: "iconfont icon-ad" })
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/mammon.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const AsideMammon = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-23fb4d4e"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "tag",
  __ssrInlineRender: true,
  setup(__props) {
    const tagStore = useTagStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_router_link = resolveComponent("router-link");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tags" }, _attrs))} data-v-deaad3b6>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: unref(tagStore).sorted.length,
        fetching: unref(tagStore).fetching,
        "i18n-key": unref(LocaleKey).TAG_PLACEHOLDER
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="tag-list-skeleton" data-v-deaad3b6${_scopeId}><!--[-->`);
            ssrRenderList(14, (item) => {
              _push2(`<li class="item" data-v-deaad3b6${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                class: "tag-list-skeleton",
                key: "skeleton"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(14, (item) => {
                  return createVNode("li", {
                    key: item,
                    class: "item"
                  }, [
                    createVNode(_component_skeleton_line)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tag-list" data-v-deaad3b6${_scopeId}><!--[-->`);
            ssrRenderList(unref(tagStore).sorted, (tag, index) => {
              _push2(ssrRenderComponent(_component_router_link, {
                class: "item",
                title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
                to: unref(getTagFlowRoute)(tag.slug),
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="${ssrRenderClass([unref(getTagIconName)(tag), "iconfont"])}" data-v-deaad3b6${_scopeId2}></i><span class="name" data-v-deaad3b6${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_i18n, {
                      zh: tag.name,
                      en: unref(getTagEnName)(tag)
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="count" data-v-deaad3b6${_scopeId2}>(${ssrInterpolate(tag.article_count || 0)})</span></span>`);
                  } else {
                    return [
                      createVNode("i", {
                        class: ["iconfont", unref(getTagIconName)(tag)]
                      }, null, 2),
                      createVNode("span", { class: "name" }, [
                        createVNode(_component_i18n, {
                          zh: tag.name,
                          en: unref(getTagEnName)(tag)
                        }, null, 8, ["zh", "en"]),
                        createVNode("span", { class: "count" }, "(" + toDisplayString(tag.article_count || 0) + ")", 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", {
                class: "tag-list",
                key: "list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(tagStore).sorted, (tag, index) => {
                  return openBlock(), createBlock(_component_router_link, {
                    class: "item",
                    title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
                    to: unref(getTagFlowRoute)(tag.slug),
                    key: index
                  }, {
                    default: withCtx(() => [
                      createVNode("i", {
                        class: ["iconfont", unref(getTagIconName)(tag)]
                      }, null, 2),
                      createVNode("span", { class: "name" }, [
                        createVNode(_component_i18n, {
                          zh: tag.name,
                          en: unref(getTagEnName)(tag)
                        }, null, 8, ["zh", "en"]),
                        createVNode("span", { class: "count" }, "(" + toDisplayString(tag.article_count || 0) + ")", 1)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["title", "to"]);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/tag.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const AsideTag = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-deaad3b6"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "anchor",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useArticleDetailStore();
    const headings = computed(() => {
      const result = [...store.defaultContent?.headings || []];
      if (store.isLongContent && store.renderedFullContent) {
        result.push(...store.moreContent?.headings || []);
      }
      return result;
    });
    const minHeadingLevel = computed(() => {
      return Math.min(...headings.value.map((heading) => heading.level));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      if (unref(store).article) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "anchor" }, _attrs))} data-v-20e332e5><button class="header"${ssrRenderAttr("title", unref(store).article.title)} data-v-20e332e5><div class="title" data-v-20e332e5>${ssrInterpolate(unref(store).article.title)}</div><div class="read" data-v-20e332e5>`);
        _push(ssrRenderComponent(_component_i18n, unref(ArticleLangI18n)[unref(store).article.lang], null, _parent));
        _push(ssrRenderComponent(_component_i18n, {
          zh: "，",
          en: ", "
        }, null, _parent));
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`共 ${ssrInterpolate(unref(numberSplit)(unref(store).contentLength))} 字，需阅读 ${ssrInterpolate(unref(store).readMinutes)} 分钟`);
            } else {
              return [
                createTextVNode("共 " + toDisplayString(unref(numberSplit)(unref(store).contentLength)) + " 字，需阅读 " + toDisplayString(unref(store).readMinutes) + " 分钟", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(numberSplit)(unref(store).contentLength))} characters, ${ssrInterpolate(unref(store).readMinutes)} min read `);
            } else {
              return [
                createTextVNode(toDisplayString(unref(numberSplit)(unref(store).contentLength)) + " characters, " + toDisplayString(unref(store).readMinutes) + " min read ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></button>`);
        if (headings.value.length) {
          _push(`<div class="catalogue" data-v-20e332e5><ul class="${ssrRenderClass([`indent-${minHeadingLevel.value}`, "list"])}" data-v-20e332e5><!--[-->`);
          ssrRenderList(headings.value, (heading, index) => {
            _push(`<li${ssrRenderAttr("title", heading.text)} class="${ssrRenderClass([`level-${heading.level}`, "item"])}" data-v-20e332e5><i class="${ssrRenderClass([`icon-h-${heading.level}`, "level iconfont"])}" data-v-20e332e5></i><span class="text" data-v-20e332e5>${ssrInterpolate(heading.text)}</span></li>`);
          });
          _push(`<!--]-->`);
          if (unref(store).isLongContent && !unref(store).renderedFullContent) {
            _push(`<li class="${ssrRenderClass([`level-${minHeadingLevel.value}`, "item readmore"])}" data-v-20e332e5><i class="level iconfont icon-loadmore" data-v-20e332e5></i><span class="text" data-v-20e332e5>`);
            _push(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).ARTICLE_READ_ALL
            }, null, _parent));
            _push(`</span></li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="link" data-v-20e332e5><i class="iconfont icon-peachblossom" data-v-20e332e5></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "随喜",
          en: "Sponsor"
        }, null, _parent));
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="meta" data-v-20e332e5><i class="iconfont icon-like" data-v-20e332e5></i><span class="count" data-v-20e332e5>${ssrInterpolate(unref(store).article.meta.likes)}</span></span>`);
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="meta" data-v-20e332e5><i class="iconfont icon-eye" data-v-20e332e5></i><span class="count" data-v-20e332e5>${ssrInterpolate(unref(numberSplit)(unref(store).article.meta.views))}</span></span></button><button class="link" data-v-20e332e5><i class="iconfont icon-category" data-v-20e332e5></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "相关",
          en: "Related"
        }, null, _parent));
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="count" data-v-20e332e5>${ssrInterpolate(unref(store).relatedArticles.length)}</span></button><button class="link" data-v-20e332e5><i class="iconfont icon-comment" data-v-20e332e5></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "评论",
          en: "Comments"
        }, null, _parent));
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="count" data-v-20e332e5>${ssrInterpolate(unref(store).article.meta.comments)}</span></button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/anchor.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const AsideAnchor = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-20e332e5"]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  setup(__props) {
    const today = dateToHuman(/* @__PURE__ */ new Date());
    const isToday = (target) => isSameHumanDay(target, today);
    const { i18n: _i18n, isZhLang } = useEnhancer();
    const tableView = reactive({
      month: 0,
      year: 1970,
      table: []
    });
    const WEEKDAYS = {
      [Language.English]: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      [Language.Chinese]: ["一", "二", "三", "四", "五", "六", "日"]
    };
    const weekDayTexts = computed(() => WEEKDAYS[_i18n.language.value]);
    const headerText = computed(() => {
      const isSameYear = tableView.year === today.year;
      const isSameMonth = tableView.month === today.month;
      const isSameTodayTable = isSameYear && isSameMonth;
      if (isZhLang.value) {
        const yearText = `${tableView.year} 年`;
        const monthText = ` ${tableView.month} 月`;
        const dayText = isSameTodayTable ? ` ${today.day} 日` : "";
        return yearText + monthText + dayText;
      }
      return humanDateToYMD(isSameTodayTable ? today : tableView, " / ");
    });
    const setTable = (humanDate) => {
      const table = [];
      const firstDayDate = humanToDate({ ...humanDate, day: 1 });
      const firstDayWeek = dateToHuman(firstDayDate).week;
      for (let i = firstDayWeek - 1; i >= 0; i--) {
        const date = cloneDate(firstDayDate);
        date.setDate(date.getDate() - i);
        table.push(dateToHuman(date));
      }
      const todoDays = 35 - table.length;
      for (let i = 1; i <= todoDays; i++) {
        const date = cloneDate(firstDayDate);
        date.setDate(date.getDate() + i);
        table.push(dateToHuman(date));
      }
      Object.assign(tableView, {
        year: humanDate.year,
        month: humanDate.month,
        table
      });
    };
    setTable({
      year: today.year,
      month: today.month
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "calendar" }, _attrs))} data-v-64e37ec2><div class="header" data-v-64e37ec2><button class="item arrow" data-v-64e37ec2><i class="iconfont icon-prev" data-v-64e37ec2></i></button><span class="item year-month" data-v-64e37ec2>${ssrInterpolate(headerText.value)}</span><button class="item arrow" data-v-64e37ec2><i class="iconfont icon-next" data-v-64e37ec2></i></button></div><ul class="weekdays" data-v-64e37ec2><!--[-->`);
      ssrRenderList(weekDayTexts.value, (day, index) => {
        _push(`<li data-v-64e37ec2>${ssrInterpolate(day)}</li>`);
      });
      _push(`<!--]--></ul><ul class="days" data-v-64e37ec2><!--[-->`);
      ssrRenderList(tableView.table, (item, index) => {
        _push(`<li data-v-64e37ec2><div class="${ssrRenderClass([{ today: isToday(item), other: item.month !== tableView.month }, "item"])}" data-v-64e37ec2>`);
        ssrRenderSlot(_ctx.$slots, "day", mergeProps({ ref_for: true }, item), () => {
          _push(`${ssrInterpolate(item.day)}`);
        }, _push, _parent);
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widgets/calendar.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-64e37ec2"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  setup(__props) {
    const { articleCalendar } = useStores();
    const articlesIn = (targetDate) => {
      const ymd = humanDateToYMD(targetDate);
      return articleCalendar.data.find((item) => item.date === ymd)?.count || 0;
    };
    onMounted(() => articleCalendar.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(ssrRenderComponent(Calendar, mergeProps({ class: "calendar" }, _attrs), {
        day: withCtx((humanDate, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (articlesIn(humanDate) > 0) {
              _push2(ssrRenderComponent(_component_router_link, {
                class: "date-link",
                to: unref(getDateFlowRoute)(unref(humanDateToYMD)(humanDate))
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(humanDate.day)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(humanDate.day), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span class="date-span" data-v-c32a8bbf${_scopeId}>${ssrInterpolate(humanDate.day)}</span>`);
            }
          } else {
            return [
              articlesIn(humanDate) > 0 ? (openBlock(), createBlock(_component_router_link, {
                key: 0,
                class: "date-link",
                to: unref(getDateFlowRoute)(unref(humanDateToYMD)(humanDate))
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(humanDate.day), 1)
                ]),
                _: 2
              }, 1032, ["to"])) : (openBlock(), createBlock("span", {
                key: 1,
                class: "date-span"
              }, toDisplayString(humanDate.day), 1))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/calendar.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const AsideCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-c32a8bbf"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isArticlePage = computed(() => isArticleDetail(route.name));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_Adsense = resolveComponent("Adsense");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<aside${ssrRenderAttrs(mergeProps({
        id: unref(ASIDE_ELEMENT_ID),
        class: "desktop-aside"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-38e6bc14><div class="module" data-v-38e6bc14>`);
      _push(ssrRenderComponent(AsideSearch, null, null, _parent));
      _push(`</div><div class="module" data-v-38e6bc14>`);
      _push(ssrRenderComponent(AsideStatistic, null, null, _parent));
      _push(`</div><div class="module" data-v-38e6bc14>`);
      _push(ssrRenderComponent(AsideArticle, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_client_only, { transition: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module mammon" data-v-38e6bc14${_scopeId}>`);
            _push2(ssrRenderComponent(AsideMammon, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "module mammon" }, [
                createVNode(AsideMammon)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="module" data-v-38e6bc14>`);
      _push(ssrRenderComponent(AsideCalendar, null, null, _parent));
      _push(`</div><div class="aside-sticky-box" data-v-38e6bc14><div class="module mammon-square" data-v-38e6bc14>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Adsense, {
              "ins-style": "display:inline-block;width:250px;height:250px",
              "data-ad-slot": "6138120718",
              class: "content"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Adsense, {
                "ins-style": "display:inline-block;width:250px;height:250px",
                "data-ad-slot": "6138120718",
                class: "content"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="module" data-v-38e6bc14>`);
      if (isArticlePage.value) {
        _push(ssrRenderComponent(_component_client_only, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(AsideAnchor, { class: "sticky-module" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(AsideAnchor, { class: "sticky-module" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(AsideTag, { class: "sticky-module" }, null, _parent));
      }
      _push(`</div></div></aside>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/index.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const AsideView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-38e6bc14"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "nav",
  __ssrInlineRender: true,
  setup(__props) {
    const { adConfig } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(NAV_ELEMENT_ID),
        class: "desktop-nav"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-a6e975f8><nav class="nav-list" data-v-a6e975f8><!--[-->`);
      ssrRenderList(unref(menus), (menu) => {
        _push(`<!--[-->`);
        if (menu.divider) {
          _push(`<span class="divider" data-v-a6e975f8></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_ulink, {
          class: ["item", menu.id],
          href: menu.url,
          to: menu.route
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (menu.imageIcon) {
                _push2(ssrRenderComponent(_component_uimage, {
                  class: "image-icon",
                  src: menu.imageIcon
                }, null, _parent2, _scopeId));
              } else if (menu.icon) {
                _push2(`<i class="${ssrRenderClass([menu.icon, "font-icon iconfont"])}" data-v-a6e975f8${_scopeId}></i>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_webfont, {
                class: "text",
                bolder: "",
                uppercase: !menu.disabledUppercase
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_i18n, {
                      k: menu.i18nKey
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_i18n, {
                        k: menu.i18nKey
                      }, null, 8, ["k"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (menu.newWindow) {
                _push2(`<span class="superscript new-window" data-v-a6e975f8${_scopeId}><i class="iconfont icon-new-window-s" data-v-a6e975f8${_scopeId}></i></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (menu.hot) {
                _push2(`<span class="superscript hot" data-v-a6e975f8${_scopeId}><i class="iconfont icon-hot-fill" data-v-a6e975f8${_scopeId}></i></span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                menu.imageIcon ? (openBlock(), createBlock(_component_uimage, {
                  key: 0,
                  class: "image-icon",
                  src: menu.imageIcon
                }, null, 8, ["src"])) : menu.icon ? (openBlock(), createBlock("i", {
                  key: 1,
                  class: ["font-icon iconfont", menu.icon]
                }, null, 2)) : createCommentVNode("", true),
                createVNode(_component_webfont, {
                  class: "text",
                  bolder: "",
                  uppercase: !menu.disabledUppercase
                }, {
                  default: withCtx(() => [
                    createVNode(_component_i18n, {
                      k: menu.i18nKey
                    }, null, 8, ["k"])
                  ]),
                  _: 2
                }, 1032, ["uppercase"]),
                menu.newWindow ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "superscript new-window"
                }, [
                  createVNode("i", { class: "iconfont icon-new-window-s" })
                ])) : createCommentVNode("", true),
                menu.hot ? (openBlock(), createBlock("span", {
                  key: 3,
                  class: "superscript hot"
                }, [
                  createVNode("i", { class: "iconfont icon-hot-fill" })
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<!--]-->`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(adConfig).PC_NAV, (ad, index) => {
        _push(`<!--[--><span class="divider" data-v-a6e975f8></span>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "item",
          href: ad.url,
          style: { color: ad.color }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass([ad.icon, "font-icon iconfont"])}" data-v-a6e975f8${_scopeId}></i><span class="ad-text" data-v-a6e975f8${_scopeId}>`);
              if (ad.i18n) {
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: ad.i18n.zh,
                  en: ad.i18n.en
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!--[-->${ssrInterpolate(ad.text)}<!--]-->`);
              }
              _push2(`</span><span class="superscript" data-v-a6e975f8${_scopeId}><i class="iconfont icon-ad" data-v-a6e975f8${_scopeId}></i></span>`);
            } else {
              return [
                createVNode("i", {
                  class: ["font-icon iconfont", ad.icon]
                }, null, 2),
                createVNode("span", { class: "ad-text" }, [
                  ad.i18n ? (openBlock(), createBlock(_component_i18n, {
                    key: 0,
                    zh: ad.i18n.zh,
                    en: ad.i18n.en
                  }, null, 8, ["zh", "en"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createTextVNode(toDisplayString(ad.text), 1)
                  ], 64))
                ]),
                createVNode("span", { class: "superscript" }, [
                  createVNode("i", { class: "iconfont icon-ad" })
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<!--]-->`);
      });
      _push(`<!--]--></nav></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/nav.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const NavView = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-a6e975f8"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const { route, globalState, isCNUser } = useEnhancer();
    const { switcher, pageLayout } = globalState;
    const sponsorState = useSponsorState();
    const gitHubSponsorsStore = useGitHubSponsorsStore();
    const wallpaperStore = useWallpaperStore();
    const handlePageTransitionDone = () => {
      globalState.setPageLayout(resolvePageLayout(route.meta.layout));
    };
    const handleSponsorModalClose = () => {
      globalState.toggleSwitcher("sponsor", false);
    };
    const handleFeedbackModalClose = () => {
      globalState.toggleSwitcher("feedback", false);
    };
    const handleStatementModalClose = () => {
      globalState.toggleSwitcher("statement", false);
    };
    onMounted(() => {
      wallpaperStore.fetch().catch((error) => {
        logger$1.failure("bing wallpaper fetch failed!", error);
      });
      gitHubSponsorsStore.fetch().catch((error) => {
        logger$1.failure("GitHub sponsors fetch failed!", error);
      });
      if (isCNUser || isDev) {
        useMusic().init().catch((error) => {
          logger$1.failure("player init failed!", error);
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_router_view = resolveComponent("router-view");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "desktop-main" }, _attrs))} data-v-3da77fe3>`);
      _push(ssrRenderComponent(Background, null, null, _parent));
      _push(ssrRenderComponent(Wallflower, null, null, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: unref(switcher).sponsor,
              onClose: handleSponsorModalClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="sponsor-modal" data-v-3da77fe3${_scopeId2}><div class="sponsor" data-v-3da77fe3${_scopeId2}>`);
                  _push3(ssrRenderComponent(SponsorTabs, {
                    class: "tabs",
                    state: unref(sponsorState),
                    "hide-title": true
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SponsorProvider, {
                    class: "provider",
                    state: unref(sponsorState),
                    "github-sponsors-data": unref(gitHubSponsorsStore).data,
                    "github-sponsors-max-count": 9
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "sponsor-modal" }, [
                      createVNode("div", { class: "sponsor" }, [
                        createVNode(SponsorTabs, {
                          class: "tabs",
                          state: unref(sponsorState),
                          "hide-title": true
                        }, null, 8, ["state"]),
                        createVNode(SponsorProvider, {
                          class: "provider",
                          state: unref(sponsorState),
                          "github-sponsors-data": unref(gitHubSponsorsStore).data,
                          "github-sponsors-max-count": 9
                        }, null, 8, ["state", "github-sponsors-data"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_popup, {
              visible: unref(switcher).feedback,
              "mask-close": false,
              "scroll-close": false,
              onClose: handleFeedbackModalClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Feedback, { onClose: handleFeedbackModalClose }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Feedback, { onClose: handleFeedbackModalClose })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_popup, {
              visible: unref(switcher).statement,
              "scroll-close": false,
              onClose: handleStatementModalClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Statement, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Statement)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: unref(switcher).sponsor,
                onClose: handleSponsorModalClose
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "sponsor-modal" }, [
                    createVNode("div", { class: "sponsor" }, [
                      createVNode(SponsorTabs, {
                        class: "tabs",
                        state: unref(sponsorState),
                        "hide-title": true
                      }, null, 8, ["state"]),
                      createVNode(SponsorProvider, {
                        class: "provider",
                        state: unref(sponsorState),
                        "github-sponsors-data": unref(gitHubSponsorsStore).data,
                        "github-sponsors-max-count": 9
                      }, null, 8, ["state", "github-sponsors-data"])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["visible"]),
              createVNode(_component_popup, {
                visible: unref(switcher).feedback,
                "mask-close": false,
                "scroll-close": false,
                onClose: handleFeedbackModalClose
              }, {
                default: withCtx(() => [
                  createVNode(Feedback, { onClose: handleFeedbackModalClose })
                ]),
                _: 1
              }, 8, ["visible"]),
              createVNode(_component_popup, {
                visible: unref(switcher).statement,
                "scroll-close": false,
                onClose: handleStatementModalClose
              }, {
                default: withCtx(() => [
                  createVNode(Statement)
                ]),
                _: 1
              }, 8, ["visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!unref(pageLayout).isFull) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(Share, {
          class: "main-share",
          "disabled-image-share": ""
        }, null, _parent));
        _push(ssrRenderComponent(Wallpaper, null, null, _parent));
        _push(ssrRenderComponent(Toolbox, null, null, _parent));
        _push(ssrRenderComponent(_component_client_only, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(isCNUser) || unref(isDev)) {
                _push2(ssrRenderComponent(MusicPlayerHandle, null, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(isCNUser) || unref(isDev) ? (openBlock(), createBlock(MusicPlayerHandle, { key: 0 })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(HeaderView$1, null, null, _parent));
      _push(`<main${ssrRenderAttr("id", unref(MAIN_ELEMENT_ID))} class="${ssrRenderClass([{ "full-page": unref(pageLayout).isFull }, "main-container"])}" data-v-3da77fe3>`);
      if (unref(pageLayout).isNormal) {
        _push(ssrRenderComponent(NavView, { class: "nav-view" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(pageLayout).isNormal) {
        _push(ssrRenderComponent(AsideView$1, { class: "aside-view" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttr("id", unref(MAIN_CONTENT_ELEMENT_ID))} class="${ssrRenderClass([{
        "layout-normal": unref(pageLayout).isNormal,
        "layout-wide": unref(pageLayout).isWide,
        "layout-full": unref(pageLayout).isFull
      }, "main-view"])}" data-v-3da77fe3>`);
      _push(ssrRenderComponent(_component_router_view, null, {
        default: withCtx(({ Component, route: r }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "router-view" }, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-3da77fe3${_scopeId}>`);
            ssrRenderSuspense(_push2, {
              default: () => {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), {
                  key: r.name
                }, null), _parent2, _scopeId);
              },
              _: 2
            });
            _push2(`</div>`);
          } else {
            return [
              withDirectives((openBlock(), createBlock("div", { class: "router-view" }, [
                createVNode(Transition, {
                  name: "page",
                  mode: "out-in",
                  onBeforeEnter: handlePageTransitionDone
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock(Suspense, null, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(resolveDynamicComponent(Component), {
                          key: r.name
                        }))
                      ]),
                      _: 2
                    }, 1024))
                  ]),
                  _: 2
                }, 1024)
              ])), [
                [_directive_disabled_wallflower]
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></main>`);
      _push(ssrRenderComponent(FooterView$1, { class: "footer-view" }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/main.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const DesktopMain = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-3da77fe3"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  props: {
    opened: { type: Boolean }
  },
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { route, router, i18n: _i18n } = useEnhancer();
    const tagStore = useTagStore();
    ref(null);
    const searchState = reactive({
      open: false,
      focused: false,
      keyword: ""
    });
    const cancelSearch = () => {
      searchState.open = false;
    };
    onBeforeMount(() => {
      watch(
        () => router.currentRoute.value,
        () => {
          nextTick(() => {
            cancelSearch();
            emit(
              "close"
              /* Close */
            );
          });
        }
      );
    });
    onMounted(() => {
      if (isSearchFlow(route.name)) {
        searchState.keyword = route.params.keyword;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["header", { search: searchState.open }]
      }, _attrs))} data-v-da4efe80><nav class="navbar" data-v-da4efe80><button class="navbar-menu" data-v-da4efe80><i class="iconfont icon-menu" data-v-da4efe80></i></button>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "navbar-logo"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_uimage, {
              class: "image",
              cdn: "",
              src: "/images/logo.svg"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_uimage, {
                class: "image",
                cdn: "",
                src: "/images/logo.svg"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="navbar-search" data-v-da4efe80><i class="iconfont icon-search" data-v-da4efe80></i></button></nav>`);
      if (searchState.open) {
        _push(`<div class="search" data-v-da4efe80><div class="search-bar" data-v-da4efe80><input class="input" autocomplete="off" type="text" maxlength="24" required${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocaleKey).SEARCH_PLACEHOLDER))}${ssrRenderAttr("value", searchState.keyword)} data-v-da4efe80><span class="close" data-v-da4efe80><i class="iconfont icon-cancel" data-v-da4efe80></i></span></div><div class="search-tags" data-v-da4efe80>`);
        if (unref(tagStore).sorted) {
          _push(`<div class="${ssrRenderClass([{ "input-focused": searchState.focused }, "tag-list"])}" data-v-da4efe80><!--[-->`);
          ssrRenderList(unref(tagStore).sorted, (tag, index) => {
            _push(ssrRenderComponent(_component_router_link, {
              class: "item",
              title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
              to: unref(getTagFlowRoute)(tag.slug),
              key: index
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="${ssrRenderClass([unref(getTagIconName)(tag), "iconfont"])}" data-v-da4efe80${_scopeId}></i><span class="name" data-v-da4efe80${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_i18n, {
                    zh: tag.name,
                    en: unref(getTagEnName)(tag)
                  }, null, _parent2, _scopeId));
                  _push2(`</span><span class="count" data-v-da4efe80${_scopeId}>${ssrInterpolate(tag.article_count || 0)}</span>`);
                } else {
                  return [
                    createVNode("i", {
                      class: ["iconfont", unref(getTagIconName)(tag)]
                    }, null, 2),
                    createVNode("span", { class: "name" }, [
                      createVNode(_component_i18n, {
                        zh: tag.name,
                        en: unref(getTagEnName)(tag)
                      }, null, 8, ["zh", "en"])
                    ]),
                    createVNode("span", { class: "count" }, toDisplayString(tag.article_count || 0), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HeaderView = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-da4efe80"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const title = APP_META.title;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-9944df09><div class="footer-content" data-v-9944df09>©${ssrInterpolate(unref(year))}  ${ssrInterpolate(unref(title))}</div></footer>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/footer.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const FooterView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-9944df09"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "aside",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, theme, cdnDomain } = useEnhancer();
    const adminProfileStore = useAdminProfileStore();
    const adminAvatar = computed(() => {
      return adminProfileStore.data?.avatar || getAssetURL(cdnDomain, "/images/anonymous.png");
    });
    const themeIcon = computed(() => {
      const themeIconMap = {
        [Theme.Light]: "icon-sun",
        [Theme.Dark]: "icon-moon"
      };
      return themeIconMap[theme.theme.value];
    });
    const languageIcon = computed(() => {
      const languageIconMap = {
        [Language.Chinese]: "icon-chinese",
        [Language.English]: "icon-english"
      };
      return languageIconMap[_i18n.language.value];
    });
    useUniversalFetch(() => adminProfileStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      const _component_ulink = resolveComponent("ulink");
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "aside" }, _attrs))} data-v-bbb3b8c6><div class="aside-user" data-v-bbb3b8c6>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "avatar",
        src: adminAvatar.value,
        alt: unref(APP_META).author
      }, null, _parent));
      _push(`<div class="profile" data-v-bbb3b8c6><h3 class="name" data-v-bbb3b8c6>${ssrInterpolate(unref(APP_META).author)}</h3>`);
      _push(ssrRenderComponent(_component_webfont, { class: "slogan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocaleKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocaleKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="aside-tool" data-v-bbb3b8c6><button class="item" data-v-bbb3b8c6><i class="${ssrRenderClass([themeIcon.value, "iconfont"])}" data-v-bbb3b8c6></i></button><div class="separator" data-v-bbb3b8c6></div><button class="item" data-v-bbb3b8c6><i class="${ssrRenderClass([languageIcon.value, "iconfont"])}" data-v-bbb3b8c6></i></button></div><div class="aside-nav" data-v-bbb3b8c6><nav class="nav-list" data-v-bbb3b8c6>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-home" data-v-bbb3b8c6${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).PAGE_HOME
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).PAGE_HOME
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-home" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).PAGE_HOME
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getCategoryFlowRoute)(unref(CategorySlug).Code)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-code" data-v-bbb3b8c6${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).CATEGORY_CODE
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).CATEGORY_CODE
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-code" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).CATEGORY_CODE
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getCategoryFlowRoute)(unref(CategorySlug).Insight)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-insight" data-v-bbb3b8c6${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).CATEGORY_INSIGHT
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).CATEGORY_INSIGHT
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-insight" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).CATEGORY_INSIGHT
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getPageRoute)(unref(RouteName).Snippets)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-buddhism" data-v-bbb3b8c6${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).PAGE_SNIPPETS
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).PAGE_SNIPPETS
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-buddhism" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).PAGE_SNIPPETS
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getPageRoute)(unref(RouteName).Archive)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-quill" data-v-bbb3b8c6${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).PAGE_ARCHIVE
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).PAGE_ARCHIVE
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-quill" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).PAGE_ARCHIVE
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getPageRoute)(unref(RouteName).Guestbook)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-comment" data-v-bbb3b8c6${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).PAGE_GUESTBOOK
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).PAGE_GUESTBOOK
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-comment" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).PAGE_GUESTBOOK
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item about",
        to: unref(getPageRoute)(unref(RouteName).About)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_uimage, {
              class: "avatar",
              src: adminAvatar.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocaleKey).PAGE_ABOUT
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocaleKey).PAGE_ABOUT
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_uimage, {
                class: "avatar",
                src: adminAvatar.value
              }, null, 8, ["src"]),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocaleKey).PAGE_ABOUT
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div><div class="aside-source-link" data-v-bbb3b8c6>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        href: unref(VALUABLE_LINKS).GITHUB_SURMON_ME
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-bbb3b8c6${_scopeId}></i><span class="label" data-v-bbb3b8c6${_scopeId}>Source Code</span><span class="new-window" data-v-bbb3b8c6${_scopeId}><i class="iconfont icon-new-window-s" data-v-bbb3b8c6${_scopeId}></i></span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-github" }),
              createVNode("span", { class: "label" }, "Source Code"),
              createVNode("span", { class: "new-window" }, [
                createVNode("i", { class: "iconfont icon-new-window-s" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/aside.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const AsideView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-bbb3b8c6"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const { route } = useEnhancer();
    const pageURL = computed(() => getPageURL(route.fullPath));
    const isLoaded = ref(false);
    const isOpenedAside = ref(false);
    const openAside = () => isOpenedAside.value = true;
    const closeAside = () => isOpenedAside.value = false;
    onMounted(() => {
      isLoaded.value = true;
      watch(isOpenedAside, (opened) => {
        document.body.style.overflow = opened ? "hidden" : "auto";
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-main" }, _attrs))} data-v-1b57236e><div class="${ssrRenderClass([{ loaded: isLoaded.value, opened: isOpenedAside.value }, "asider"])}" data-v-1b57236e>`);
      _push(ssrRenderComponent(AsideView, { class: "aside" }, null, _parent));
      _push(`</div><div class="${ssrRenderClass([{ opened: isOpenedAside.value }, "main"])}" data-v-1b57236e>`);
      if (isOpenedAside.value) {
        _push(`<div class="close-mask" data-v-1b57236e></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(HeaderView, {
        opened: isOpenedAside.value,
        onClose: closeAside,
        onOpen: openAside
      }, null, _parent));
      _push(`<main class="main-container" data-v-1b57236e>`);
      _push(ssrRenderComponent(_component_router_view, { name: "mobile" }, {
        default: withCtx(({ Component, route: r }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (r.meta.responsive) {
              _push2(`<div class="route-view" data-v-1b57236e${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), {
                key: r.name
              }, null), _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<div class="fallback" data-v-1b57236e${_scopeId}><i class="iconfont icon-desktop" data-v-1b57236e${_scopeId}></i><p class="text" data-v-1b57236e${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                zh: "请在 PC 端访问以获得最佳体验",
                en: "This page only support visit on PC"
              }, null, _parent2, _scopeId));
              _push2(`</p><a class="link"${ssrRenderAttr("href", pageURL.value)} data-v-1b57236e${_scopeId}>${ssrInterpolate(pageURL.value)}</a></div>`);
            }
          } else {
            return [
              r.meta.responsive ? (openBlock(), createBlock("div", {
                key: 0,
                class: "route-view"
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(Component), {
                  key: r.name
                }))
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "fallback"
              }, [
                createVNode("i", { class: "iconfont icon-desktop" }),
                createVNode("p", { class: "text" }, [
                  createVNode(_component_i18n, {
                    zh: "请在 PC 端访问以获得最佳体验",
                    en: "This page only support visit on PC"
                  })
                ]),
                createVNode("a", {
                  class: "link",
                  href: pageURL.value
                }, toDisplayString(pageURL.value), 9, ["href"])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(FooterView, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/main.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MobileMain = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1b57236e"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  emits: ["resolve"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { isDarkTheme } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["app-error", { dark: unref(isDarkTheme) }]
      }, _attrs))} data-v-03428de8><h1 class="code" data-v-03428de8>${ssrInterpolate(props.error.code)}</h1><h3 class="message" data-v-03428de8>`);
      if (props.error.message) {
        _push(`<!--[-->${ssrInterpolate(props.error.message)}<!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocaleKey).NOT_FOUND
        }, null, _parent));
      }
      _push(`</h3><p class="link" data-v-03428de8>`);
      ssrRenderSlot(_ctx.$slots, "resolve-text", {}, null, _push, _parent);
      _push(`</p></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/app/root/error.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AppError = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-03428de8"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "boundary",
  __ssrInlineRender: true,
  setup(__props) {
    const { router, globalState } = useEnhancer();
    const handleResolveRoute = () => {
      router.push({ name: RouteName.Home }).then(() => {
        globalState.setPageLayout(resolvePageLayout(router.currentRoute.value.meta.layout));
        globalState.setError(null);
      });
    };
    onErrorCaptured((error) => {
      globalState.setError(error);
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-boundary" }, _attrs))}>`);
      if (unref(globalState).error.value) {
        _push(ssrRenderComponent(AppError, {
          error: unref(globalState).error.value,
          onResolve: handleResolveRoute
        }, {
          "resolve-text": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocaleKey).BACK_TO_HOME_PAGE
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_i18n, {
                  k: unref(LocaleKey).BACK_TO_HOME_PAGE
                }, null, 8, ["k"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/app/root/boundary.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const { globalState } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup_root = resolveComponent("popup-root");
      const _component_responsive = resolveComponent("responsive");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-root" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(NavProgress, {
              spin: !unref(globalState).userAgent.isMobile
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(EmojiRain, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_popup_root, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(NavProgress, {
                spin: !unref(globalState).userAgent.isMobile
              }, null, 8, ["spin"]),
              createVNode(EmojiRain),
              createVNode(_component_popup_root)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_responsive, null, {
              desktop: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(DesktopMain, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(DesktopMain)
                  ];
                }
              }),
              mobile: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(MobileMain, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(MobileMain)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_responsive, null, {
                desktop: withCtx(() => [
                  createVNode(DesktopMain)
                ]),
                mobile: withCtx(() => [
                  createVNode(MobileMain)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/app/app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const consoleTable = console.info;
console.group(`🔵 [APP:INIT]`);
consoleTable({ APP_VERSION, APP_MODE, NODE_ENV: process.env.NODE_ENV });
console.groupEnd();
console.group(`🔵 [APP:API]`);
consoleTable(API_CONFIG);
console.groupEnd();
const createMainApp = (context) => {
  const app = createSSRApp(_sfc_main);
  const globalState = createGlobalState({
    userAgent: context.userAgent || "",
    languages: context.languages || [],
    layout: context.layout ?? PageLayout.Normal,
    error: context.error ?? null
  });
  const store = createUniversalStore({ globalState });
  const router = createUniversalRouter({
    beforeMiddleware: context.routerBeforeMiddleware?.(globalState),
    afterMiddleware: context.routerAfterMiddleware?.(globalState),
    history: context.routerHistoryCreator()
  });
  const theme = createTheme(context.theme);
  const i18n = createI18n({
    default: globalState.userAgent.isZhUser ? Language.Chinese : Language.English,
    keys: Object.values(LocaleKey),
    locales
  });
  const getGlobalHead = () => ({
    htmlAttrs: {
      lang: i18n.l.value?.iso ?? "",
      "data-region": context.region,
      "data-theme": theme.theme.value,
      "data-device": globalState.userAgent.isMobile ? "mobile" : "desktop"
    }
  });
  app.config.errorHandler = (error) => globalState.setError(error);
  router.onError((error) => globalState.setError(error));
  router.beforeEach((to, _, next) => {
    if (to.meta.validator) {
      to.meta.validator({ route: to, i18n, store }).then(next).catch((error) => {
        next(createAppError(error.message, error.code));
      });
    } else {
      next();
    }
  });
  app.use(router);
  app.use(store);
  app.use(globalState);
  app.use(i18n);
  app.use(theme);
  app.use(register);
  return {
    app,
    router,
    store,
    globalState,
    i18n,
    theme,
    getGlobalHead
  };
};
const parseAcceptLanguage = (header, options = {}) => {
  if (!header) return [];
  return header.split(",").map((part) => {
    const [locale, q = "q=1"] = part.trim().split(";");
    const qValue = parseFloat(q.trim().replace(/^q *= */, ""));
    return [isNaN(qValue) ? 1 : qValue, locale.trim()];
  }).sort((a, b) => b[0] - a[0]).flatMap(([_, locale]) => {
    if (locale === "*" && options.ignoreWildcard) return [];
    return locale ? [locale] : [];
  });
};
const devDebug = (...messages) => isDev;
const getRegionByCountryCode = (country) => {
  return country && isCNCode(country) ? "cn" : "global";
};
const createSSRContext = (context, error = null) => {
  const countryName = context.headers["country-name"];
  const countryCode = context.headers["country-code"];
  const cdnDomain = isCNCode(countryCode) ? API_CONFIG.CDN_CHINA : API_CONFIG.CDN_GLOBAL;
  const assetsPrefix = getCDNPrefix(cdnDomain, CDNPrefix.Assets);
  return {
    requestUrl: context.url,
    userAgent: context.headers["user-agent"],
    acceptLanguage: context.headers["accept-language"],
    cookieTheme: context.cookies[THEME_STORAGE_KEY],
    countryName,
    countryCode,
    cdnDomain,
    assetsPrefix,
    error
  };
};
const createSSRMainApp = (ssrContext) => {
  const mainApp = createMainApp({
    routerHistoryCreator: createMemoryHistory,
    languages: parseAcceptLanguage(ssrContext.acceptLanguage, { ignoreWildcard: true }),
    userAgent: ssrContext.userAgent,
    theme: ssrContext.cookieTheme ?? Theme.Light,
    region: getRegionByCountryCode(ssrContext.countryCode),
    error: ssrContext.error
  });
  const hackDirectives = ["lozad"];
  const hackComponents = ["progress-bar", "popup-root", "popup", "Adsense"];
  hackDirectives.forEach((d) => mainApp.app.directive(d, {}));
  hackComponents.forEach((c) => mainApp.app.component(c, {}));
  const head = createHead({
    disableDefaults: true,
    disableCapoSorting: true,
    init: [mainApp.getGlobalHead()]
  });
  mainApp.app.use(head);
  return [mainApp, head];
};
const renderError = async (context, error) => {
  const appError = formatErrorToAppError(error, {
    code: APP_CONFIG.default_error_code,
    message: "Unknown Render Error"
  });
  const ssrContext = createSSRContext(context, appError);
  const [{ app, theme }, head] = createSSRMainApp(ssrContext);
  head.push({ title: `Server Error: ${appError.message}` });
  return {
    code: appError.code,
    appHTML: await renderToString(app, ssrContext),
    headHTML: await renderSSRHead(head),
    assetsPrefix: ssrContext.assetsPrefix,
    contextScripts: renderSSRContextScript(serialize(ssrContext)),
    stateScripts: renderSSRStateScript(
      serialize({
        theme: theme.theme.value,
        region: getRegionByCountryCode(ssrContext.countryCode)
      })
    )
  };
};
const renderApp = async (context, cache) => {
  const ssrContext = createSSRContext(context);
  const [{ app, router, store, theme, i18n, globalState }, head] = createSSRMainApp(ssrContext);
  const language = i18n.language.value;
  const themeName = theme.theme.value;
  const deviceType = globalState.userAgent.isMobile ? "mobile" : "desktop";
  const regionCode = getRegionByCountryCode(ssrContext.countryCode);
  const cacheKey = `ssr:${language}_${regionCode}_${deviceType}_${themeName}_${ssrContext.requestUrl}`;
  const isCached = await cache.has(cacheKey);
  if (isCached) {
    return {
      ...await cache.get(cacheKey),
      contextScripts: renderSSRContextScript(serialize({ ...ssrContext, cacheStatus: "hit" })),
      code: SUCCESS
    };
  }
  try {
    const startTime = Date.now();
    devDebug(`- 1. route.push.validate: ${ssrContext.requestUrl}`);
    await router.push(ssrContext.requestUrl);
    await router.isReady();
    devDebug("- 2. store.serverInit");
    await store.prefetchOnServer();
    devDebug("- 3. set layout");
    globalState.setPageLayout(resolvePageLayout(router.currentRoute.value.meta.layout));
    devDebug("- 4. renderToString");
    const appHTML = await renderToString(app, { ...ssrContext });
    if (globalState.error.value) {
      throw toRaw(globalState.error.value);
    }
    devDebug("- 5. renderSSRHead");
    const headHTML = await renderSSRHead(head);
    devDebug("- 6. SSR State & SSR context script");
    const contextScripts = renderSSRContextScript(serialize({ ...ssrContext, cacheStatus: "miss" }));
    const stateScripts = renderSSRStateScript(
      serialize({
        store: store.state.value,
        theme: theme.theme.value,
        layout: globalState.pageLayout.value.layout,
        region: getRegionByCountryCode(ssrContext.countryCode)
      })
    );
    devDebug("rendered:", Date.now() - startTime, "ms");
    const renderedForCache = {
      appHTML,
      headHTML,
      stateScripts,
      assetsPrefix: ssrContext.assetsPrefix
    };
    const cacheTTL = router.currentRoute.value.meta?.ssrCacheTTL;
    if (cacheTTL !== false && typeof cacheTTL === "number" && cacheTTL > 0) {
      cacheTTL === Infinity ? cache.set(cacheKey, renderedForCache) : cache.set(cacheKey, renderedForCache, cacheTTL);
    }
    return {
      ...renderedForCache,
      contextScripts,
      code: SUCCESS
    };
  } catch (error) {
    return renderError(context, error);
  }
};
const mapboxGl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
export {
  renderApp,
  renderError
};
//# sourceMappingURL=ssr.js.map
