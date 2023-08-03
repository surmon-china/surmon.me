import serialize from "serialize-javascript";
import { useRoute, useRouter, createRouter, RouterLink, createMemoryHistory } from "vue-router";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderVNode, ssrGetDirectiveProps, ssrLooseEqual, ssrRenderSuspense, renderToString } from "vue/server-renderer";
import { renderSSRHead } from "@unhead/ssr";
import { inject, ref, reactive, computed, readonly, onServerPrefetch, shallowRef, watch, unref, getCurrentInstance, useSSRContext, onMounted, onBeforeUnmount, defineComponent, mergeProps, nextTick, resolveComponent, withCtx, createTextVNode, toDisplayString, onBeforeMount, createVNode, openBlock, createBlock, Fragment, renderList, TransitionGroup, createCommentVNode, Transition, renderSlot, toRaw, createSlots, onUnmounted, onUpdated, h, resolveDynamicComponent, resolveDirective, withDirectives, shallowReactive, cloneVNode, onErrorCaptured, Suspense, createSSRApp } from "vue";
import { defineStore, createPinia, storeToRefs } from "pinia";
import parser from "ua-parser-js";
import axios, { isAxiosError } from "axios";
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
import { markedHighlight } from "marked-highlight";
import { markedXhtml } from "marked-xhtml";
import { mangle } from "marked-mangle";
import { sanitizeUrl } from "@braintree/sanitize-url";
import lozad from "lozad";
import _escape from "lodash-es/escape.js";
import _unescape from "lodash-es/unescape.js";
import _capitalize from "lodash-es/capitalize.js";
import _padStart from "lodash-es/padStart.js";
import { useHead as useHead$1, createHead } from "@unhead/vue";
import cookies from "js-cookie";
import BezierEasing from "bezier-easing";
import { Swiper } from "swiper";
import { Grid, Pagination, Navigation, Mousewheel, Autoplay, A11y, EffectFade } from "swiper/modules";
import { Swiper as Swiper$1, SwiperSlide } from "swiper/vue";
import qs from "qs";
import QRCode from "qrcode";
/* empty css           */var LanguageKey = /* @__PURE__ */ ((LanguageKey2) => {
  LanguageKey2["APP_SLOGAN"] = "app-slogan";
  LanguageKey2["CATEGORY_INSIGHT"] = "insight";
  LanguageKey2["CATEGORY_CODE"] = "code";
  LanguageKey2["PAGE_HOME"] = "home";
  LanguageKey2["PAGE_GITHUB"] = "github";
  LanguageKey2["PAGE_PHOTOGRAPHY"] = "photography";
  LanguageKey2["PAGE_ABOUT"] = "about";
  LanguageKey2["PAGE_SPONSOR"] = "sponsor";
  LanguageKey2["PAGE_GUESTBOOK"] = "guestbook";
  LanguageKey2["PAGE_APP"] = "app";
  LanguageKey2["PAGE_ARCHIVE"] = "archive";
  LanguageKey2["STATISTIC_ARTICLES"] = "statistic-articles";
  LanguageKey2["STATISTIC_COMMENTS"] = "statistic-comments";
  LanguageKey2["STATISTIC_TAGS"] = "statistic-tags";
  LanguageKey2["STATISTIC_TODAY_VIEWS"] = "statistic-today-views";
  LanguageKey2["STATISTIC_TOTAL_VIEWS"] = "statistic-total-views";
  LanguageKey2["STATISTIC_TOTAL_UPVOTES"] = "statistic-total-upvotes";
  LanguageKey2["STATISTIC_AVERAGE_EMOTION"] = "statistic-average-emotion";
  LanguageKey2["EMPTY_PLACEHOLDER"] = "common-empty-placeholder";
  LanguageKey2["NOT_FOUND"] = "not-found";
  LanguageKey2["BACK_TO_HOME_PAGE"] = "back-to-home-page";
  LanguageKey2["GUESTBOOK_SLOGAN"] = "guestbook-banner-slogan";
  LanguageKey2["AD"] = "ad";
  LanguageKey2["FEEDBACK"] = "feedback";
  LanguageKey2["TO_TOP"] = "to-page-top";
  LanguageKey2["TO_BOTTOM"] = "to-page-bottom";
  LanguageKey2["ORIGIN_ORIGINAL"] = "original";
  LanguageKey2["ORIGIN_REPRINT"] = "reprint";
  LanguageKey2["ORIGIN_HYBRID"] = "hybrid";
  LanguageKey2["ACTION_ON"] = "on";
  LanguageKey2["ACTION_OFF"] = "off";
  LanguageKey2["MUSIC_PLACEHOLDER"] = "music-placeholder";
  LanguageKey2["SEARCH_PLACEHOLDER"] = "search-input-placeholder";
  LanguageKey2["HOT_ARTICLE_LIST_TITLE"] = "hot-article-list-title";
  LanguageKey2["ANNOUNCEMENT_PLACEHOLDER"] = "announcement-empty-placeholder";
  LanguageKey2["CATEGORY_UNCATEGORIZED"] = "category-uncategorized";
  LanguageKey2["TAG_PLACEHOLDER"] = "tag-placeholder";
  LanguageKey2["ARTICLE_TITLE"] = "article-title";
  LanguageKey2["ARTICLE_VIEWS"] = "article-views";
  LanguageKey2["ARTICLE_PLACEHOLDER"] = "article-empty-placeholder";
  LanguageKey2["ARTICLE_READ_ALL"] = "read-all-article-content";
  LanguageKey2["ARTICLE_RENDERING"] = "rendering";
  LanguageKey2["ARTICLE_LIST_LOADMORE"] = "loadmore";
  LanguageKey2["ARTICLE_LIST_LOADING"] = "loading";
  LanguageKey2["ARTICLE_LIST_NO_MORE"] = "no-more";
  LanguageKey2["COMMENT_LIST_EMPTY"] = "comment-list-placeholder";
  LanguageKey2["COMMENT_UPVOTE"] = "comment-likes";
  LanguageKey2["COMMENT_DOWNVOTE"] = "comment-dislikes";
  LanguageKey2["COMMENT_REPLY"] = "reply-comment";
  LanguageKey2["COMMENT_DELETE"] = "delete-comment";
  LanguageKey2["COMMENT_DELETE_CONFIRM"] = "delete-comment-confirm";
  LanguageKey2["COMMENT_REPLY_CANCEL"] = "cancel-reply-comment";
  LanguageKey2["COMMENT_MODERATOR"] = "comment-moderator";
  LanguageKey2["COMMENT_SORT_OLD"] = "oldest-comments";
  LanguageKey2["COMMENT_SORT_NEW"] = "newest-comments";
  LanguageKey2["COMMENT_SORT_HOT"] = "hottest-comments";
  LanguageKey2["COMMENT_POST_NAME"] = "comment-author-name";
  LanguageKey2["COMMENT_POST_EMAIL"] = "comment-author-email";
  LanguageKey2["COMMENT_POST_SITE"] = "comment-author-site-url";
  LanguageKey2["COMMENT_POST_CONTENT"] = "comment-content";
  LanguageKey2["COMMENT_POST_PLACEHOLDER"] = "comment-box-placeholder";
  LanguageKey2["COMMENT_POST_ERROR_CONTENT"] = "comment-submit-failed-of-content-error";
  LanguageKey2["QUERY_PARAMS_ERROR"] = "query-params-error";
  LanguageKey2["POST_ACTION_ERROR"] = "post-requiest-failed-of-other-error";
  LanguageKey2["SUBMIT"] = "submit-data";
  LanguageKey2["SUBMITTING"] = "submitting";
  LanguageKey2["MOMENT_AM"] = "moment-am";
  LanguageKey2["MOMENT_PM"] = "moment-pm";
  LanguageKey2["MOMENT_JUST_NOW"] = "moment-just-now";
  LanguageKey2["MOMENT_MINUTES"] = "moment-minutes";
  LanguageKey2["MOMENT_HOURS"] = "moment-hours";
  LanguageKey2["MOMENT_WEEKS"] = "moment-weeks";
  LanguageKey2["MOMENT_DAYS"] = "moment-days";
  LanguageKey2["MOMENT_MONTHS"] = "moment-months";
  LanguageKey2["MOMENT_YEAR"] = "moment-year";
  LanguageKey2["MOMENT_AGO"] = "moment-ago";
  return LanguageKey2;
})(LanguageKey || {});
const DEFAULT_DELAY = 468;
const LONG_ARTICLE_THRESHOLD = 16688;
const META = Object.freeze({
  title: "Surmon.me",
  zh_sub_title: "斯是陋室，唯吾芳馨",
  en_sub_title: `Surmon's digital garden`,
  zh_description: "本是浪蝶游蜂，自留半亩石池，但求直抒胸臆，挥墨九云之中",
  en_description: "Either write something worth reading or do something worth writing.",
  url: "https://surmon.me",
  domain: "surmon.me",
  author: "Surmon",
  primary: "#0088f5"
});
const GEO_INFO = Object.freeze({
  zh_title: "长居亚洲，游走热带",
  en_title: "UTC +08:00 ~ +09:00",
  coordinates: [103.830391822121, 1.340863]
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
  DOUBAN_USER_ID: "56647958",
  GITHUB_USER_NAME: "surmon-china",
  TWITTER_USER_NAME: "surmon7788",
  INSTAGRAM_USERNAME: "surmon666",
  BTC_ADDRESS: "bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze",
  ETH_ADDRESS: "0xaD556974D449126efdeF23f4FF581861C301cB77"
});
const VALUABLE_LINKS = Object.freeze({
  RSS: "/rss.xml",
  SITE_MAP: "/sitemap.xml",
  UPTIME_STATUS: "https://stats.uptimerobot.com/Q2k7OTXxJN",
  NPM_HOMEPAGE: "https://www.npmjs.com/~surmon",
  PAYPAL: "https://paypal.me/surmon",
  GITHUB_SPONSORS: `https://github.com/sponsors/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB: `https://github.com/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB_SURMON_ME: "https://github.com/surmon-china/surmon.me",
  GITHUB_NODEPRESS: "https://github.com/surmon-china/nodepress",
  GITHUB_SURMON_ME_NATIVE: "https://github.com/surmon-china/surmon.me.native",
  GITHUB_BLOG_STAR_LIST: "https://github.com/stars/surmon-china/lists/surmon-me",
  MARKDOWN: "https://daringfireball.net/projects/markdown/",
  GOOGLE_MY_MAP: `https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3`,
  GOOGLE_MY_MAP_KML: `https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w`,
  DISCORD_GROUP: "https://discord.surmon.me",
  TELEGRAM_GROUP: "https://t.me/+Z2wsxogVbYM2ZmE1",
  MUSIC_163: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
  YOUTUBE_CHANNEL: `https://www.youtube.com/${IDENTITIES.YOUTUBE_CHANNEL_SHORT_ID}`,
  TELEGRAM: "https://t.me/surmon",
  OPENSEA: "https://opensea.io/Surmon",
  DOUBAN: "https://www.douban.com/people/nocower",
  DOUBAN_MOVIE: `https://movie.douban.com/people/nocower/collect`,
  QUORA: "https://www.quora.com/profile/Surmon",
  LINKEDIN: "https://www.linkedin.com/in/surmon",
  INSTAGRAM: `https://www.instagram.com/${IDENTITIES.INSTAGRAM_USERNAME}`,
  TWITTER: `https://twitter.com/${IDENTITIES.TWITTER_USER_NAME}`
});
const zhLangMap = {
  [LanguageKey.APP_SLOGAN]: META.zh_sub_title,
  [LanguageKey.PAGE_HOME]: "明殿",
  [LanguageKey.CATEGORY_INSIGHT]: "无色庵",
  [LanguageKey.CATEGORY_CODE]: "宁静寺",
  [LanguageKey.PAGE_GITHUB]: "丹青阁",
  [LanguageKey.PAGE_ARCHIVE]: "藏经阁",
  [LanguageKey.PAGE_GUESTBOOK]: "四方馆",
  [LanguageKey.PAGE_ABOUT]: "狂浪生",
  [LanguageKey.PAGE_SPONSOR]: "赞助",
  [LanguageKey.PAGE_PHOTOGRAPHY]: "大千界",
  [LanguageKey.PAGE_APP]: "客户端",
  [LanguageKey.STATISTIC_ARTICLES]: "全站文章",
  [LanguageKey.STATISTIC_COMMENTS]: "全站评论",
  [LanguageKey.STATISTIC_TAGS]: "全站标签",
  [LanguageKey.STATISTIC_TODAY_VIEWS]: "今日阅读",
  [LanguageKey.STATISTIC_TOTAL_VIEWS]: "累计阅读",
  [LanguageKey.STATISTIC_TOTAL_UPVOTES]: "共获点赞",
  [LanguageKey.STATISTIC_AVERAGE_EMOTION]: "匿名评分",
  [LanguageKey.EMPTY_PLACEHOLDER]: "空空如也",
  [LanguageKey.NOT_FOUND]: "众里寻他 我已不再",
  [LanguageKey.BACK_TO_HOME_PAGE]: "山河万里 长歌归故",
  [LanguageKey.GUESTBOOK_SLOGAN]: "此心光明 亦复何言",
  [LanguageKey.AD]: "广而告之",
  [LanguageKey.FEEDBACK]: "反馈",
  [LanguageKey.TO_TOP]: "回到顶部",
  [LanguageKey.TO_BOTTOM]: "下一屏",
  [LanguageKey.ORIGIN_ORIGINAL]: "原创",
  [LanguageKey.ORIGIN_REPRINT]: "转载",
  [LanguageKey.ORIGIN_HYBRID]: "衍生",
  [LanguageKey.ACTION_ON]: "开",
  [LanguageKey.ACTION_OFF]: "关",
  [LanguageKey.MUSIC_PLACEHOLDER]: "五音六律，七弦八度",
  [LanguageKey.SEARCH_PLACEHOLDER]: "上下求索",
  [LanguageKey.ANNOUNCEMENT_PLACEHOLDER]: "空空如也",
  [LanguageKey.CATEGORY_UNCATEGORIZED]: "未分类",
  [LanguageKey.TAG_PLACEHOLDER]: "无标签",
  [LanguageKey.ARTICLE_TITLE]: "文不加点",
  [LanguageKey.ARTICLE_VIEWS]: "次阅读",
  [LanguageKey.ARTICLE_PLACEHOLDER]: "空空如也",
  [LanguageKey.ARTICLE_READ_ALL]: "阅读余下全文",
  [LanguageKey.ARTICLE_RENDERING]: "渲染中..",
  [LanguageKey.HOT_ARTICLE_LIST_TITLE]: "群贤毕至",
  [LanguageKey.ARTICLE_LIST_LOADMORE]: "加载更多",
  [LanguageKey.ARTICLE_LIST_LOADING]: "正在加载",
  [LanguageKey.ARTICLE_LIST_NO_MORE]: "没有更多",
  [LanguageKey.COMMENT_LIST_EMPTY]: "期待你的捷足先登",
  [LanguageKey.COMMENT_UPVOTE]: "赞",
  [LanguageKey.COMMENT_DOWNVOTE]: "踩",
  [LanguageKey.COMMENT_DELETE]: "删除",
  [LanguageKey.COMMENT_DELETE_CONFIRM]: "确定要删除此评论吗？此操作不可恢复",
  [LanguageKey.COMMENT_REPLY]: "回复",
  [LanguageKey.COMMENT_REPLY_CANCEL]: "取消回复",
  [LanguageKey.COMMENT_MODERATOR]: "博主",
  [LanguageKey.COMMENT_SORT_OLD]: "最早",
  [LanguageKey.COMMENT_SORT_NEW]: "最新",
  [LanguageKey.COMMENT_SORT_HOT]: "最热",
  [LanguageKey.COMMENT_POST_NAME]: "名字",
  [LanguageKey.COMMENT_POST_EMAIL]: "邮箱",
  [LanguageKey.COMMENT_POST_SITE]: "网址",
  [LanguageKey.COMMENT_POST_CONTENT]: "内容",
  [LanguageKey.COMMENT_POST_PLACEHOLDER]: "愿你的见解一针见血",
  [LanguageKey.COMMENT_POST_ERROR_CONTENT]: "内容需要在 3000 字以内",
  [LanguageKey.QUERY_PARAMS_ERROR]: "请求参数错误：",
  [LanguageKey.POST_ACTION_ERROR]: "操作失败，详细原因 > 控制台",
  [LanguageKey.SUBMIT]: "提交",
  [LanguageKey.SUBMITTING]: "提交中...",
  [LanguageKey.MOMENT_AM]: "上午",
  [LanguageKey.MOMENT_PM]: "下午",
  [LanguageKey.MOMENT_JUST_NOW]: "刚刚",
  [LanguageKey.MOMENT_MINUTES]: "分钟",
  [LanguageKey.MOMENT_HOURS]: "小时",
  [LanguageKey.MOMENT_WEEKS]: "周",
  [LanguageKey.MOMENT_DAYS]: "天",
  [LanguageKey.MOMENT_MONTHS]: "个月",
  [LanguageKey.MOMENT_YEAR]: "年",
  [LanguageKey.MOMENT_AGO]: (args) => `${args.date}前`
};
const enLangMap = {
  [LanguageKey.APP_SLOGAN]: META.en_sub_title,
  [LanguageKey.PAGE_HOME]: "Home",
  [LanguageKey.CATEGORY_INSIGHT]: "Insight",
  [LanguageKey.CATEGORY_CODE]: "Code",
  [LanguageKey.PAGE_ARCHIVE]: "Archive",
  [LanguageKey.PAGE_GITHUB]: "GitHub",
  [LanguageKey.PAGE_ABOUT]: "About",
  [LanguageKey.PAGE_GUESTBOOK]: "Guestbook",
  [LanguageKey.PAGE_SPONSOR]: "Sponsor",
  [LanguageKey.PAGE_APP]: "APP",
  [LanguageKey.PAGE_PHOTOGRAPHY]: "Photog",
  [LanguageKey.STATISTIC_ARTICLES]: "Articles",
  [LanguageKey.STATISTIC_COMMENTS]: "Comments",
  [LanguageKey.STATISTIC_TAGS]: "Tags",
  [LanguageKey.STATISTIC_TODAY_VIEWS]: "Today views",
  [LanguageKey.STATISTIC_TOTAL_VIEWS]: "Total views",
  [LanguageKey.STATISTIC_TOTAL_UPVOTES]: "Total upvotes",
  [LanguageKey.STATISTIC_AVERAGE_EMOTION]: "Rating",
  [LanguageKey.EMPTY_PLACEHOLDER]: "NULL",
  [LanguageKey.NOT_FOUND]: "Arrives here at last",
  [LanguageKey.BACK_TO_HOME_PAGE]: "Drive by",
  [LanguageKey.GUESTBOOK_SLOGAN]: "You have come a long way",
  [LanguageKey.AD]: "AD",
  [LanguageKey.FEEDBACK]: "Feedback",
  [LanguageKey.TO_TOP]: "To top",
  [LanguageKey.TO_BOTTOM]: "Next screen",
  [LanguageKey.ORIGIN_ORIGINAL]: "OG",
  [LanguageKey.ORIGIN_REPRINT]: "RPT",
  [LanguageKey.ORIGIN_HYBRID]: "HY",
  [LanguageKey.ACTION_ON]: "on",
  [LanguageKey.ACTION_OFF]: "off",
  [LanguageKey.MUSIC_PLACEHOLDER]: "Music player",
  [LanguageKey.SEARCH_PLACEHOLDER]: "Search...",
  [LanguageKey.CATEGORY_UNCATEGORIZED]: "Uncategorized",
  [LanguageKey.ANNOUNCEMENT_PLACEHOLDER]: "No announcements",
  [LanguageKey.TAG_PLACEHOLDER]: "No tags",
  [LanguageKey.HOT_ARTICLE_LIST_TITLE]: "Hottest",
  [LanguageKey.ARTICLE_PLACEHOLDER]: "No articles",
  [LanguageKey.ARTICLE_TITLE]: "Articles",
  [LanguageKey.ARTICLE_VIEWS]: "views",
  [LanguageKey.ARTICLE_READ_ALL]: "Show Full Article",
  [LanguageKey.ARTICLE_RENDERING]: "Rendering...",
  [LanguageKey.ARTICLE_LIST_LOADMORE]: "Loadmore",
  [LanguageKey.ARTICLE_LIST_LOADING]: "Loading...",
  [LanguageKey.ARTICLE_LIST_NO_MORE]: "No more",
  [LanguageKey.COMMENT_LIST_EMPTY]: "Be the first to comment",
  [LanguageKey.COMMENT_UPVOTE]: "upvote",
  [LanguageKey.COMMENT_DOWNVOTE]: "downvote",
  [LanguageKey.COMMENT_DELETE]: "delete",
  [LanguageKey.COMMENT_DELETE_CONFIRM]: "Are you sure you want to delete this comment? You cannot undo this action.",
  [LanguageKey.COMMENT_REPLY]: "reply",
  [LanguageKey.COMMENT_REPLY_CANCEL]: "cancel reply",
  [LanguageKey.COMMENT_MODERATOR]: "Moderator",
  [LanguageKey.COMMENT_SORT_OLD]: "Oldest",
  [LanguageKey.COMMENT_SORT_NEW]: "Newest",
  [LanguageKey.COMMENT_SORT_HOT]: "Hottest",
  [LanguageKey.COMMENT_POST_NAME]: "name",
  [LanguageKey.COMMENT_POST_EMAIL]: "email",
  [LanguageKey.COMMENT_POST_SITE]: "site",
  [LanguageKey.COMMENT_POST_CONTENT]: "content",
  [LanguageKey.COMMENT_POST_PLACEHOLDER]: "Hit the nail on the head",
  [LanguageKey.COMMENT_POST_ERROR_CONTENT]: "Content requirements are within 3000 words!",
  [LanguageKey.QUERY_PARAMS_ERROR]: "Invalid query params: ",
  [LanguageKey.POST_ACTION_ERROR]: "Failed! Get error detail in console",
  [LanguageKey.SUBMIT]: "Submit",
  [LanguageKey.SUBMITTING]: "Submitting...",
  [LanguageKey.MOMENT_AM]: "AM",
  [LanguageKey.MOMENT_PM]: "PM",
  [LanguageKey.MOMENT_JUST_NOW]: "Just now",
  [LanguageKey.MOMENT_MINUTES]: "minutes",
  [LanguageKey.MOMENT_HOURS]: "hours",
  [LanguageKey.MOMENT_WEEKS]: "weeks",
  [LanguageKey.MOMENT_DAYS]: "days",
  [LanguageKey.MOMENT_MONTHS]: "months",
  [LanguageKey.MOMENT_YEAR]: "year",
  [LanguageKey.MOMENT_AGO]: (args) => `${args.date} ago`
};
var Language = /* @__PURE__ */ ((Language2) => {
  Language2["English"] = "en";
  Language2["Chinese"] = "zh";
  return Language2;
})(Language || {});
const languages$1 = [
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
const APP_VERSION = "4.14.6";
const APP_ENV = "production";
const isDev = false;
const isServer = true;
const isClient = !isServer;
const SSR_STATE_KEY = "__INITIAL_SSR_STATE__";
const renderSSRStateScript = (data) => {
  return `<script>window.${SSR_STATE_KEY} = ${data}<\/script>`;
};
const getSSRStateValue = (key) => {
  var _a;
  return (_a = window[SSR_STATE_KEY]) == null ? void 0 : _a[key];
};
const SSR_CONTEXT_KEY = "__SSR_CONTEXT__";
const renderSSRContextScript = (data) => {
  return `<script>window.${SSR_CONTEXT_KEY} = ${data}<\/script>`;
};
const SUCCESS = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INVALID_ERROR = 500;
const uaParser = (userAgent) => {
  const parseResult = parser(userAgent || "");
  const browserName = String(parseResult.browser.name).toLowerCase();
  const isTargetDevice = (browsers) => {
    return browsers.some((browser) => browser.toLowerCase() === browserName);
  };
  return {
    result: parseResult,
    isIE: isTargetDevice(["compatible", "MSIE", "IE"]),
    isEdge: isTargetDevice(["Edge"]),
    isFirefox: isTargetDevice(["Firefox"]),
    isChrome: isTargetDevice(["Chrome", "Chromium"]),
    isSafari: isTargetDevice(["Safari"]),
    isWechat: isTargetDevice(["Wechat"]),
    isIos: parseResult.os.name === "iOS",
    isAndroid: parseResult.os.name === "Android",
    isMobile: parseResult.device.type === "mobile"
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
  return language ? isTargetLanguageUser(language, Language.Chinese) : true;
};
var LayoutColumn = /* @__PURE__ */ ((LayoutColumn2) => {
  LayoutColumn2[LayoutColumn2["Normal"] = 0] = "Normal";
  LayoutColumn2[LayoutColumn2["Wide"] = 1] = "Wide";
  LayoutColumn2[LayoutColumn2["Full"] = 2] = "Full";
  return LayoutColumn2;
})(LayoutColumn || {});
const GlobalStateSymbol = Symbol("globalState");
const createGlobalState = (config) => {
  const renderError2 = ref(config.error ?? null);
  const defaultError = { code: INVALID_ERROR };
  const setRenderError = (error) => {
    if (!error) {
      renderError2.value = null;
    } else if (error instanceof Error) {
      renderError2.value = {
        code: error.code ?? defaultError.code,
        message: error.message
      };
    } else if (typeof error === "string") {
      renderError2.value = {
        ...defaultError,
        message: error
      };
    } else {
      renderError2.value = {
        ...error,
        code: error.status || error.code || defaultError.code
      };
    }
  };
  const isHydrated = ref(false);
  const setHydrate = () => {
    isHydrated.value = true;
  };
  const userAgent = reactive({
    original: config.userAgent,
    language: config.language,
    isZhUser: isZhUser(config.language),
    ...uaParser(config.userAgent)
  });
  const layoutValue = ref(config.layout);
  const layoutColumn = computed(() => ({
    layout: layoutValue.value,
    isNormal: layoutValue.value === 0,
    isWide: layoutValue.value === 1,
    isFull: layoutValue.value === 2
    /* Full */
  }));
  const setLayoutColumn = (layout) => {
    if (layout !== layoutValue.value) {
      layoutValue.value = layout;
    }
  };
  const imageExt = computed(() => {
    const imageExtValue = userAgent.isMobile && (userAgent.isWechat || userAgent.isSafari) ? "jpeg" : "webp";
    return {
      ext: imageExtValue,
      isJpg: imageExtValue === "jpeg",
      isWebP: imageExtValue === "webp"
      /* WebP */
    };
  });
  const switcher = reactive({
    sponsor: false,
    feedback: false,
    statement: false
  });
  const toggleSwitcher = (key, value) => {
    switcher[key] = value;
  };
  const toRawState = () => ({
    renderError: renderError2.value,
    userAgent: userAgent.original,
    language: userAgent.language,
    layout: layoutValue.value
  });
  const globalState = {
    toRawState,
    // Render error state
    renderError: readonly(renderError2),
    setRenderError,
    // Hydrate state
    isHydrated: readonly(isHydrated),
    setHydrate,
    // Layout state
    layoutColumn,
    setLayoutColumn,
    // Device state
    userAgent: readonly(userAgent),
    imageExt,
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
        globalState.setRenderError(error);
        return Promise.reject(error);
      });
    });
  }
};
const NULL = null;
const UNDEFINED = void 0;
const isNull = (value) => value === NULL;
const isUndefined = (value) => value === UNDEFINED;
const isNil = (value) => isNull(value) || isUndefined(value);
const useFetchStore = (options) => {
  const isShallow = isUndefined(options.shallow) ? true : options.shallow;
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
const API_LOCAL_URL = "http://localhost:8000";
const PROD_API = API_LOCAL_URL;
const API_CONFIG = {
  NODEPRESS: PROD_API,
  FE: "https://surmon.me",
  STATIC: "https://static.surmon.me",
  CDN_CN: "https://cdn.cn.surmon.me",
  CDN_GLOBAL: "https://cdn.surmon.me"
};
const nodepress = axios.create({
  baseURL: API_CONFIG.NODEPRESS,
  withCredentials: true
});
nodepress.interceptors.response.use(
  (response) => {
    var _a, _b;
    if ((_b = (_a = response.headers) == null ? void 0 : _a["content-type"]) == null ? void 0 : _b.includes("json")) {
      if (response.data.status !== "success") {
        return Promise.reject(response.data);
      }
    }
    return response.data;
  },
  (error) => {
    var _a, _b, _c, _d, _e, _f;
    const errorJSON = error.toJSON();
    const errorInfo = {
      ...errorJSON,
      config: error.config,
      code: errorJSON.status || ((_a = error.response) == null ? void 0 : _a.status) || BAD_REQUEST,
      message: ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.error) || ((_d = error.response) == null ? void 0 : _d.statusText) || errorJSON.message
    };
    const serverErrorInfo = {
      axiosName: errorJSON.name,
      axiosMessage: errorJSON.message,
      npError: errorInfo.message,
      npMessage: ((_f = (_e = error.response) == null ? void 0 : _e.data) == null ? void 0 : _f.message) || "",
      status: errorInfo.code,
      method: errorJSON.config.method,
      baseURL: errorJSON.config.baseURL,
      url: errorJSON.config.url,
      params: errorJSON.config.params,
      data: errorJSON.config.data,
      headers: errorJSON.config.headers
    };
    console.debug("axios error:", serverErrorInfo);
    return Promise.reject(errorInfo);
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
    var _a, _b, _c;
    if (user.type === 1) {
      return user.localProfile;
    }
    if (user.type === 2) {
      return {
        name: (_a = user.disqusProfile) == null ? void 0 : _a.name,
        site: ((_b = user.disqusProfile) == null ? void 0 : _b.url) || ((_c = user.disqusProfile) == null ? void 0 : _c.profileUrl)
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
    await nodepress$1.get("/disqus/oauth-logout");
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
const useSSRContextValue = (key) => {
  var _a;
  {
    if (!getCurrentInstance()) {
      console.warn(`useSSRContextValue() can only be used inside setup().`);
    }
    return (_a = useSSRContext()) == null ? void 0 : _a[key];
  }
};
const useCountry = () => useSSRContextValue("country");
const useCDNDomain = () => {
  const domain = useSSRContextValue("cdnDomain");
  if (!domain) {
    throw new Error("CDN domain is not defined.");
  } else {
    return domain;
  }
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
const getArticleContentHeadingElementId = (level, heading) => {
  return `${ARTICLE_CONTENT_HEADING_ELEMENT_ID_PREFIX}_${level}_${heading}`;
};
const COMMENT_ELEMENT_ID = "A_comment_warpper";
const COMMENT_PUBLISHER_ELEMENT_ID = "A_comment_publisher";
const COMMENT_REPLY_PUBLISHER_ELEMENT_ID = "A_comment_reply_publisher";
const COMMENT_FOOTER_ELEMENT_ID = "A_comment_footer";
const COMMENT_ITEM_ELEMENT_ID_PREFIX = "A_comment_content_item";
const getCommentItemElementId = (commentId) => {
  return `${COMMENT_ITEM_ELEMENT_ID_PREFIX}_${commentId}`;
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
  // new FontFace(...)
  // Since FontFace does not support the size-adjest parameter,
  // if you use JavaScript to manipulate the side effects,
  // you will need to manually maintain the lifecycle to add the global class name
  // MARK: No custom fonts for now
  /*
    style(element) {
      const nodes = Array.from(element.querySelectorAll<HTMLParagraphElement>('p.verse[zh]'))
      const string = nodes.map((node) => node.innerText).join('')
      const words = Array.from(new Set(string.split('')))
      if (!words.length) {
        return null
      }
  
      const textParams = encodeURIComponent(words.join(''))
      const fontnameParams = encodeURIComponent(VERSE_ZH_FONT_FILENAME)
      const url = `${BFF_TUNNEL_PREFIX}/${TunnelModule.WebFont}?fontname=${fontnameParams}&text=${textParams}`
      // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust
      // https://caniuse.com/?search=size-adjust
      return `
        @font-face {
          font-family: ${VERSE_ZH_FONT_FAMILY};
          font-weight: 700;
          font-display: swap;
          size-adjust: 136%;
          src: url('${url}');
        }
      `
    }
    */
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
    var _a;
    const tagretClass = (options == null ? void 0 : options.className) || LOZAD_CLASS_NAME;
    const targetElement = ((_a = options == null ? void 0 : options.elementor) == null ? void 0 : _a.call(options)) || container.value;
    if (targetElement == null ? void 0 : targetElement.querySelectorAll) {
      const lozadElements = targetElement.querySelectorAll(`.${tagretClass}`);
      if (lozadElements == null ? void 0 : lozadElements.length) {
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
    if ((options == null ? void 0 : options.immediate) ?? true) {
      observe();
    }
  });
  onBeforeUnmount(() => {
    unobserve();
  });
  return { element: container, observer, observe, unobserve };
};
const BFF_TUNNEL_PREFIX = "/_tunnel";
const BFF_PROXY_PREFIX = "/_proxy";
const getBFFServerPort = () => Number(process.env.PORT || 3e3);
var CDNPrefix = /* @__PURE__ */ ((CDNPrefix2) => {
  CDNPrefix2["Proxy"] = "proxy";
  CDNPrefix2["Assets"] = "assets";
  CDNPrefix2["Static"] = "static";
  CDNPrefix2["ImgProxy"] = "imgproxy";
  return CDNPrefix2;
})(CDNPrefix || {});
const getCDNPrefixURL = (domain, prefix) => {
  return `${domain}/${prefix}`;
};
const normalizePath = (path) => {
  return path.startsWith("/") ? path : `/${path}`;
};
const getAssetURL = (domain, path) => {
  const normalizedPath = normalizePath(path);
  return `${getCDNPrefixURL(
    domain,
    "assets"
    /* Assets */
  )}${normalizedPath}`;
};
const getImgProxyURL = (domain, path) => {
  return `${getCDNPrefixURL(
    domain,
    "imgproxy"
    /* ImgProxy */
  )}${normalizePath(path)}`;
};
const getOriginalProxyURL = (url) => {
  return `${BFF_PROXY_PREFIX}/${btoa(url)}`;
};
const getProxyURL = (domain, url) => {
  return `${getCDNPrefixURL(
    domain,
    "proxy"
    /* Proxy */
  )}/${btoa(url)}`;
};
const getPageURL = (path) => {
  return `${API_CONFIG.FE}${normalizePath(path)}`;
};
const escape = _escape;
const unescape = _unescape;
const padStart = _padStart;
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
  pedantic: false,
  headerIds: false
});
const sanitizeHTML = (content) => content;
const trimHTML = (html) => html.replace(/\s+/g, " ").replace(/\n/g, " ");
const createRenderer = (options) => {
  const renderer = new Renderer();
  renderer.text = (text) => {
    return (options == null ? void 0 : options.text) ? options.text(text) : text;
  };
  renderer.html = (html) => {
    const trimmed = html.trim();
    const transformed = CUSTOM_ELEMENT_LIST.reduce((result, ce) => ce.transform(result), trimmed);
    return (options == null ? void 0 : options.sanitize) ? sanitizeHTML(escape(transformed)) : transformed;
  };
  renderer.heading = (html, level, raw) => {
    const idText = (options == null ? void 0 : options.headingId) ? `id="${options.headingId(html, level, raw)}"` : "";
    const safeedRaw = escape(raw);
    return `<h${level} ${idText} alt="${safeedRaw}" title="${safeedRaw}">${html}</h${level}>`;
  };
  renderer.paragraph = (text) => {
    const trimmed = text.trim();
    const isBlockChild = ["p", "div", "figure"].some((tag) => {
      return trimmed.startsWith(`<${tag}`) && trimmed.endsWith(`</${tag}>`);
    });
    return isBlockChild ? text : `<p>${text}</p>`;
  };
  renderer.checkbox = (checked) => {
    return checked ? `<i class="checkbox checked iconfont icon-checkbox-selected"></i>` : `<i class="checkbox iconfont icon-checkbox-unselected"></i>`;
  };
  renderer.link = (href, title, text) => {
    const isSelf = href == null ? void 0 : href.startsWith(META.url);
    const isImageLink = text.includes("<img");
    const textValue = (options == null ? void 0 : options.sanitize) ? escape(text) : text;
    const hrefValue = (options == null ? void 0 : options.sanitize) ? sanitizeUrl(href) : href;
    const titleValue = (options == null ? void 0 : options.sanitize) ? escape(title) : title;
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
  renderer.image = (src, title, alt) => {
    const titleValue = sanitizeHTML(escape(title || alt));
    const altValue = sanitizeHTML(escape(alt));
    const sanitized = sanitizeUrl(src);
    const source = sanitized.startsWith("http://") ? getOriginalProxyURL(sanitized) : sanitized;
    const sourceValue = (options == null ? void 0 : options.imageSource) ? options.imageSource(source) : source;
    return trimHTML(`
      <div class="figure-wrapper">
        <figure class="image ${altValue ? "caption" : ""}" data-status="loading">
          <div class="placeholder error">
            <i class="iconfont icon-image-error"></i>
          </div>
          <div class="placeholder loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <img
            class="${LOZAD_CLASS_NAME}"
            data-src="${sourceValue}"
            ${altValue ? `alt="${altValue}"` : ""}
            ${titleValue ? `title="${titleValue}"` : ""}
            onload="this.parentElement.dataset.status = 'loaded'"
            onerror="this.parentElement.dataset.status = 'error'"
            onclick="window.$popup.vImage(this.src)"
          />
          ${altValue ? `<figcaption>${altValue}</figcaption>` : ""}
        </figure>
      </div>
    `);
  };
  renderer.code = function(code, lang, isEscaped) {
    const lineNumbers = code.split("\n").map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, " ")).join("");
    const readOnlyAttrs = `
      contenteditable="true"
      oncut="return false"
      onpaste="return false"
      onkeydown="if(event.metaKey) return true; return false;"
    `;
    return lang ? `
        <pre data-lang="${lang}">
          <ul class="code-lines">${lineNumbers}</ul>
          <code ${readOnlyAttrs} class="${highlightLangPrefix}${encodeURI(lang)}">${isEscaped ? code : encodeURI(code)}
</code>
        </pre>

      ` : `
        <pre>
          <ul class="code-lines">${lineNumbers}</ul>
          <code ${readOnlyAttrs}>${isEscaped ? code : encodeURI(code)}
</code>
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
    sanitize: (options == null ? void 0 : options.sanitize) ?? false,
    headingId: options == null ? void 0 : options.headingIdGetter,
    imageSource: options == null ? void 0 : options.imageSourceGetter
  };
  return marked.parse(markdown, { renderer: createRenderer(renderOptions) });
};
const delayer = (ms = DEFAULT_DELAY) => {
  const start = (/* @__PURE__ */ new Date()).getTime();
  return (action) => {
    if (!ms) {
      action();
      return;
    }
    const time = (/* @__PURE__ */ new Date()).getTime() - start;
    const timeout = ms - time;
    const isDelay = timeout > 0;
    isDelay ? setTimeout(action, timeout) : action();
  };
};
const delayPromise = (ms, promise) => {
  const delay = delayer(ms);
  return new Promise((resolve, reject) => {
    promise.then((value) => delay(() => resolve(value))).catch(reject);
  });
};
const ARTICLE_API_PATH = "/article";
const useHottestArticleListStore = defineStore("hottestArticleList", () => {
  return useFetchStore({
    once: true,
    data: [],
    async fetcher() {
      const response = await nodepress$1.get(`${ARTICLE_API_PATH}/hottest`);
      return response.result;
    }
  });
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
    headingIdGetter: (_, level, raw) => {
      const text = raw.toLowerCase().replace(/[^a-zA-Z0-9\u4E00-\u9FA5]+/g, "-");
      const id = getArticleContentHeadingElementId(level, text);
      headings.push({ level, id, text: raw });
      return id;
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
    var _a;
    return ((_a = article.value) == null ? void 0 : _a.content.length) || 0;
  });
  const readMinutes = computed(() => {
    const minutes = Math.round(contentLength.value / 400);
    return minutes < 1 ? 1 : minutes;
  });
  const isLongContent = computed(() => {
    return Boolean(article.value && contentLength.value >= LONG_ARTICLE_THRESHOLD);
  });
  const splitIndex = computed(() => {
    if (!article.value || !isLongContent.value) {
      return null;
    }
    const splitLength = Math.min(LONG_ARTICLE_THRESHOLD, Math.floor(contentLength.value / 2));
    const shortContent = article.value.content.substring(0, splitLength);
    const lastH5Index = shortContent.lastIndexOf("\n##### ");
    const lastH4Index = shortContent.lastIndexOf("\n#### ");
    const lastH3Index = shortContent.lastIndexOf("\n### ");
    const lastLineIndex = shortContent.lastIndexOf("\n\n\n");
    const splitIndex2 = Math.max(lastH5Index, lastH4Index, lastH3Index, lastLineIndex);
    return splitIndex2;
  });
  const optimizeImageSource = (src) => {
    if (src.startsWith(API_CONFIG.STATIC)) {
      return src.replace(API_CONFIG.STATIC, getCDNPrefixURL(useCDNDomain(), CDNPrefix.Static));
    } else {
      return src;
    }
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
    return nodepress$1.post(`/vote/post`, { post_id: articleId, vote: 1, author: identityStore.author }).then((response) => {
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
const useAnnouncementStore = defineStore("announcement", () => {
  return useFetchStore({
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
  const fetchStore = useFetchStore({
    data: null,
    once: true,
    async fetcher() {
      const response = await nodepress$1.get("/archive");
      return response.result;
    }
  });
  const tree = computed(() => {
    var _a;
    const rootTree = [];
    (_a = fetchStore.data.value) == null ? void 0 : _a.articles.sort(({ created_at: a }, { created_at: b }) => {
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
      return !target ? UNDEFINED : target.pid === CommentParentId.Self ? target.id : findRootParentId(target.pid);
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
  return useFetchStore({
    data: [],
    once: true,
    fetcher() {
      return nodepress$1.get("/category", { params: { per_page: 50 } }).then((response) => response.result.data);
    }
  });
});
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
  const fetchStore = useFetchStore({
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
var TunnelModule = /* @__PURE__ */ ((TunnelModule2) => {
  TunnelModule2["WebFont"] = "webfont";
  TunnelModule2["ChatGPT"] = "chatgpt";
  TunnelModule2["MyGoogleMap"] = "my_google_map";
  TunnelModule2["TwitterAggregate"] = "twitter_aggregate";
  TunnelModule2["YouTubePlaylist"] = "youtube_playlist";
  TunnelModule2["YouTubeVideoList"] = "youtube_video_list";
  TunnelModule2["InstagramProfile"] = "instagram_profile";
  TunnelModule2["InstagramMedias"] = "instagram_medias";
  TunnelModule2["InstagramMediaChildren"] = "instagram_media_children";
  TunnelModule2["InstagramCalendar"] = "instagram_calendar";
  TunnelModule2["BingWallpaper"] = "bing_wallpaper";
  TunnelModule2["GitHubSponsors"] = "github_sponsors";
  TunnelModule2["GitHubContributions"] = "github_contributions";
  TunnelModule2["NetEaseMusic"] = "netease_music";
  TunnelModule2["DoubanMovies"] = "douban_movies";
  TunnelModule2["OpenSourceGitHubStatistic"] = "open_source_github_statistic";
  TunnelModule2["OpenSourceNPMStatistic"] = "open_source_npm_statistic";
  return TunnelModule2;
})(TunnelModule || {});
const tunnel = axios.create({
  baseURL: `http://localhost:${getBFFServerPort()}${BFF_TUNNEL_PREFIX}`
});
tunnel.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(isAxiosError(error) ? error.toJSON() : error)
);
const tunnel$1 = {
  $: tunnel,
  request: (...args) => tunnel.request(...args),
  dispatch: (module, params) => tunnel.get(module, { params })
};
const useWallpaperStore = defineStore("wallpaper", () => {
  const fetchStore = useFetchStore({
    fetcher: () => tunnel$1.dispatch(TunnelModule.BingWallpaper),
    once: true,
    data: null
  });
  const papers = computed(() => {
    return (language) => {
      var _a;
      return (_a = fetchStore.data.value) == null ? void 0 : _a[language];
    };
  });
  return { ...fetchStore, papers };
});
const useSponsorStore = defineStore("githubSponsor", () => {
  const fetchStore = useFetchStore({
    fetcher: () => tunnel$1.dispatch(TunnelModule.GitHubSponsors),
    once: true,
    data: null
  });
  const activeSponsors = computed(() => {
    var _a;
    return ((_a = fetchStore.data.value) == null ? void 0 : _a.sponsors.edges.map((edge) => edge.node)) || [];
  });
  const inactiveSponsors = computed(() => {
    var _a;
    const result = [];
    const activeSponsorLogins = activeSponsors.value.map((item) => item.login);
    (_a = fetchStore.data.value) == null ? void 0 : _a.sponsorsActivities.nodes.forEach((node) => {
      if (node && node.sponsor.login !== "ghost") {
        if (node.action === "CANCELLED_SPONSORSHIP" || node.sponsorsTier.isOneTime) {
          if (!activeSponsorLogins.includes(node.sponsor.login)) {
            result.push(node.sponsor);
          }
        }
      }
    });
    return result;
  });
  return {
    ...fetchStore,
    activeSponsors,
    inactiveSponsors
  };
});
const useAdminInfoStore = defineStore("adminInfo", () => {
  return useFetchStore({
    data: null,
    async fetcher() {
      const response = await nodepress$1.get("/auth/admin");
      return response.result;
    }
  });
});
const useAppOptionStore = defineStore("appOption", () => {
  const fetchStore = useFetchStore({
    shallow: false,
    data: null,
    async fetcher() {
      const response = await nodepress$1.get("/option");
      return response.result;
    }
  });
  const adConfig = computed(() => {
    var _a;
    const adConfig2 = (_a = fetchStore.data.value) == null ? void 0 : _a.ad_config;
    return {
      PC_CARROUSEL: UNDEFINED,
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
    var _a, _b;
    const identityStore = useIdentityStore();
    const authorName = ((_a = identityStore.author) == null ? void 0 : _a.name) || null;
    return nodepress$1.post("/feedback", {
      ...feedback,
      tid: 0,
      user_name: authorName ? `${authorName} (${UserType[identityStore.user.type]})` : null,
      user_email: ((_b = identityStore.author) == null ? void 0 : _b.email) || null
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
  return useFetchStore({
    data: null,
    fetcher: async () => {
      const response = await nodepress$1.get("/expansion/statistic");
      return response.result;
    }
  });
});
const useGitHubStatisticStore = defineStore("githubStatistic", () => {
  return useFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.dispatch(TunnelModule.OpenSourceGitHubStatistic)
  });
});
const useNpmStatisticStore = defineStore("npmStatistic", () => {
  const fetchStore = useFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.dispatch(TunnelModule.OpenSourceNPMStatistic)
  });
  const totalPackages = computed(() => {
    return fetchStore.data.value ? Object.keys(fetchStore.data.value.downloads).length : 0;
  });
  const totalDownloads = computed(() => {
    return fetchStore.data.value ? Object.values(fetchStore.data.value.downloads).reduce((p, c) => p + c, 0) : 0;
  });
  const averageScore = computed(() => {
    var _a;
    const packages = (_a = fetchStore.data.value) == null ? void 0 : _a.packages;
    if (!(packages == null ? void 0 : packages.length)) {
      return 0;
    }
    const totalScore = packages.reduce((p, c) => p + c.score.final, 0);
    return (totalScore / packages.length).toFixed(3);
  });
  return {
    ...fetchStore,
    totalPackages,
    totalDownloads,
    averageScore
  };
});
const useArticleCalendarStore = defineStore("articleCalendar", () => {
  return useFetchStore({
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
  return useFetchStore({
    once: true,
    data: [],
    fetcher: () => {
      return tunnel$1.dispatch(TunnelModule.InstagramCalendar);
    }
  });
});
const useGitHubCalendarStore = defineStore("githubContributionsCalendar", () => {
  const fetchStore = useFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.dispatch(TunnelModule.GitHubContributions)
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
  return useFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.dispatch(TunnelModule.DoubanMovies)
  });
});
const useInstagramTimelineStore = defineStore("instagramTimeline", () => {
  return useFetchStore({
    data: null,
    fetcher: () => {
      const request = tunnel$1.dispatch(TunnelModule.InstagramMedias);
      return request;
    }
  });
});
const useInstagramProfileStore = defineStore("instagramProfile", () => {
  return useFetchStore({
    data: null,
    fetcher: () => tunnel$1.dispatch(TunnelModule.InstagramProfile)
  });
});
const useYouTubePlayListStore = defineStore("youtubePlaylist", () => {
  return useFetchStore({
    data: [],
    async fetcher() {
      const response = await tunnel$1.dispatch(TunnelModule.YouTubePlaylist);
      response.sort((a, b) => a.snippet.position - b.snippet.position);
      return response;
    }
  });
});
const fetchYouTubeVideoList = (playlistId) => {
  const fetch = tunnel$1.dispatch(TunnelModule.YouTubeVideoList, { id: playlistId });
  return fetch;
};
const useTwitterStore = defineStore("twitterAggregate", () => {
  return useFetchStore({
    data: null,
    fetcher: () => {
      return tunnel$1.dispatch(TunnelModule.TwitterAggregate);
    }
  });
});
const useMyGoogleMapStore = defineStore("myGoogleMap", () => {
  return useFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.dispatch(TunnelModule.MyGoogleMap)
  });
});
const useStores = (pinia) => ({
  articleList: useArticleListStore(pinia),
  articleDetail: useArticleDetailStore(pinia),
  hottestArticleList: useHottestArticleListStore(pinia),
  announcement: useAnnouncementStore(pinia),
  category: useCategoryStore(pinia),
  tag: useTagStore(pinia),
  comment: useCommentStore(pinia),
  archive: useArchiveStore(pinia),
  identity: useIdentityStore(pinia),
  adminInfo: useAdminInfoStore(pinia),
  appOption: useAppOptionStore(pinia),
  wallpaper: useWallpaperStore(pinia),
  sponsor: useSponsorStore(pinia),
  nodepressStatistic: useNodepressStatisticStore(pinia),
  githubStatistic: useGitHubStatisticStore(pinia),
  npmStatistic: useNpmStatisticStore(pinia),
  articleCalendar: useArticleCalendarStore(pinia),
  instagramCalendar: useInstagramCalendarStore(pinia),
  githubCalendar: useGitHubCalendarStore(pinia),
  doubanMovies: useDoubanMoviesStore(pinia),
  instagramProfile: useInstagramProfileStore(pinia),
  instagramTimeline: useInstagramTimelineStore(pinia),
  youtubePlayList: useYouTubePlayListStore(pinia),
  twitter: useTwitterStore(pinia)
});
const createUniversalStore = (config) => {
  const pinia = createPinia();
  const fetchBasicStore = () => {
    const stores = useStores(pinia);
    const initFetchTasks = [
      // app basic configuration
      stores.appOption.fetch(),
      // basic data
      stores.category.fetch(),
      stores.tag.fetch()
    ];
    if (!config.globalState.userAgent.isMobile) {
      initFetchTasks.push(stores.hottestArticleList.fetch());
    }
    return Promise.all(initFetchTasks);
  };
  return {
    get stores() {
      return useStores(pinia);
    },
    state: pinia.state,
    install: pinia.install,
    serverPrefetch: fetchBasicStore,
    hydrate() {
      const contextStore = getSSRStateValue("store");
      if (contextStore) {
        pinia.state.value = contextStore;
      } else {
        fetchBasicStore();
      }
    }
  };
};
const I18nSymbol = Symbol("i18n");
const createI18nStore = (config) => {
  const language = ref(config.default);
  const languageCodes = config.languages.map((lang) => lang.code);
  const l = computed(() => config.languages.find((l2) => l2.code === language.value));
  const languageMap = config.keys.reduce(
    (map, key) => ({
      ...map,
      [key]: config.languages.reduce(
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
    var _a;
    const content = (_a = languageMap[key]) == null ? void 0 : _a[targetLanguage ?? language.value];
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
      var _a, _b;
      if (this.$props.k) {
        return i18nStore.t(this.$props.k, null, this.$attrs);
      } else {
        const lang = i18nStore.language.value;
        return this.$attrs[lang] || ((_b = (_a = this.$slots)[lang]) == null ? void 0 : _b.call(_a));
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
const _sfc_main$1I = /* @__PURE__ */ defineComponent({
  __name: "progress",
  __ssrInlineRender: true,
  props: {
    spin: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const loading = useLoading();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "progress-bar",
        class: { show: unref(loading).state.show }
      }, _attrs))} data-v-c7348b21><div style="${ssrRenderStyle({ width: unref(loading).state.percent + "%" })}" class="${ssrRenderClass([{
        notransition: unref(loading).state.skipTimerCount > 0,
        failed: !unref(loading).state.canSucceed
      }, "progress"])}" data-v-c7348b21></div>`);
      if (props.spin) {
        _push(`<div class="${ssrRenderClass([{ failed: !unref(loading).state.canSucceed }, "spin"])}" data-v-c7348b21><div class="lds-ring" data-v-c7348b21><div data-v-c7348b21></div><div data-v-c7348b21></div><div data-v-c7348b21></div><div data-v-c7348b21></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const progress_vue_vue_type_style_index_0_scoped_c7348b21_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$1I = _sfc_main$1I.setup;
_sfc_main$1I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/composables/loading/progress.vue");
  return _sfc_setup$1I ? _sfc_setup$1I(props, ctx) : void 0;
};
const LoadingSymbol = Symbol("loading");
const useLoading = () => {
  return inject(LoadingSymbol);
};
const useEnhancer = () => {
  const route = useRoute();
  const router = useRouter();
  const i18n = useI18n();
  const theme = useTheme();
  const globalState = useGlobalState();
  const appOptionStore = useAppOptionStore();
  const adConfig = computed(() => appOptionStore.adConfig);
  const isMobile = computed(() => globalState.userAgent.isMobile);
  const isDarkTheme = computed(() => theme.theme.value === Theme.Dark);
  const isZhLang = computed(() => i18n.language.value === Language.Chinese);
  return {
    route,
    router,
    i18n,
    theme,
    head: useHead,
    seoMeta: useSeoMeta,
    gState: globalState,
    cdnDomain: useCDNDomain(),
    adConfig,
    isMobile,
    isDarkTheme,
    isZhLang,
    defer: UNDEFINED,
    popup: UNDEFINED,
    gtag: UNDEFINED,
    loading: UNDEFINED
  };
};
const useHead = (source) => {
  return useHead$1(
    computed(() => {
      return typeof source === "function" ? source() : source;
    })
  );
};
const DEFAULT_TITLER = (title) => `${title} | ${META.title}`;
const DEFAULT_OG_IMAGE = getPageURL("/images/og-social-card.jpg");
function useSeoMeta(source) {
  const { i18n, route } = useEnhancer();
  const input = computed(() => {
    const value = typeof source === "function" ? source() : source;
    const { title, pageTitle, description, keywords, ...rest } = value;
    const pureTitle = title ?? pageTitle;
    const fullTitle = title ? title : pageTitle ? DEFAULT_TITLER(pageTitle) : "";
    return { pureTitle, fullTitle, description, keywords, _: rest };
  });
  return useHead({
    title: computed(() => input.value.fullTitle),
    meta: [
      { name: "description", content: () => input.value.description ?? "" },
      { name: "keywords", content: () => input.value.keywords ?? "" },
      { name: "twitter:site", content: `@${IDENTITIES.TWITTER_USER_NAME}` },
      { name: "twitter:creator", content: IDENTITIES.TWITTER_USER_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: () => input.value._.ogImage ?? DEFAULT_OG_IMAGE },
      { name: "twitter:title", content: () => input.value._.ogTitle ?? input.value.fullTitle ?? "" },
      { name: "twitter:description", content: () => input.value._.ogDescription ?? input.value.description ?? "" },
      { property: "og:site_name", content: () => META.title },
      { property: "og:type", content: () => input.value._.ogType ?? "object" },
      { property: "og:title", content: () => input.value._.ogTitle ?? input.value.pureTitle ?? "" },
      { property: "og:description", content: () => input.value._.ogDescription ?? input.value.description ?? "" },
      { property: "og:url", content: () => input.value._.ogUrl ?? getPageURL(route.fullPath) },
      { property: "og:image", content: () => input.value._.ogImage ?? DEFAULT_OG_IMAGE },
      { property: "og:image:alt", content: () => input.value._.ogImageAlt ?? input.value._.ogTitle ?? input.value.fullTitle ?? "" },
      { property: "og:image:width", content: () => input.value._.ogImageWidth ?? (input.value._.ogImage ? "" : "1000") },
      { property: "og:image:height", content: () => input.value._.ogImageHeight ?? (input.value._.ogImage ? "" : "526") },
      { property: "og:locale", content: () => {
        var _a;
        return ((_a = i18n.l.value) == null ? void 0 : _a.iso) ?? "";
      } }
    ]
  });
}
const NODE_ENV = process.env.NODE_ENV;
process.env.NODE_ENV === "development";
process.env.NODE_ENV === "production";
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
  linear: [0, 0, 1, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1]
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
    abort ? onCancel == null ? void 0 : onCancel() : onDone == null ? void 0 : onDone();
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
      offset: offset ?? -74
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
      easing: Easing.easeIn
    });
  });
};
const _sfc_main$1H = /* @__PURE__ */ defineComponent({
  __name: "loadmore",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean },
    finished: { type: Boolean }
  },
  setup(__props, { emit }) {
    const props = __props;
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
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "loadmore",
        ref_key: "element",
        ref: element
      }, _attrs))} data-v-ecbe8858>`);
      if (_ctx.loading) {
        _push(`<div class="loading" data-v-ecbe8858><div data-v-ecbe8858></div><div data-v-ecbe8858></div><div data-v-ecbe8858></div><div data-v-ecbe8858></div></div>`);
      } else if (!_ctx.finished) {
        _push(`<button class="normal" data-v-ecbe8858><i class="iconfont icon-loadmore" data-v-ecbe8858></i></button>`);
      } else {
        _push(`<span class="finised" data-v-ecbe8858>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ARTICLE_LIST_NO_MORE
        }, null, _parent));
        _push(`</span>`);
      }
      _push(`</div>`);
    };
  }
});
const loadmore_vue_vue_type_style_index_0_scoped_ecbe8858_lang = "";
const _sfc_setup$1H = _sfc_main$1H.setup;
_sfc_main$1H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/flow/mobile/loadmore.vue");
  return _sfc_setup$1H ? _sfc_setup$1H(props, ctx) : void 0;
};
const Loadmore = /* @__PURE__ */ _export_sfc(_sfc_main$1H, [["__scopeId", "data-v-ecbe8858"]]);
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
const isSearchFlow = (name) => name === RouteName.SearchFlow;
const WebPFormat = `@webp`;
const getImgProxyPath = (path, options) => {
  const resize = `resize:fill:${options.width}:${options.height}:0`;
  const format = options.webp ? WebPFormat : "";
  const watermark = options.watermark ? `/${options.watermark}` : "";
  return `/${resize}${watermark}/plain${normalizePath(path)}${format}`;
};
const isOriginalType = (originState) => {
  return isNull(originState) || isUndefined(null) || originState === OriginState.Original;
};
const isHybridType = (originState) => {
  return originState === OriginState.Hybrid;
};
const isReprintType = (originState) => {
  return originState === OriginState.Reprint;
};
const getExtendsObject = (kvs) => {
  return (kvs == null ? void 0 : kvs.length) ? kvs.reduce((v, c) => ({ ...v, [c.name]: c.value }), {}) : {};
};
const getExtendValue = (kvs, key) => {
  return kvs.length ? getExtendsObject(kvs)[key] : UNDEFINED;
};
const _sfc_main$1G = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const { router, gState, cdnDomain } = useEnhancer();
    const identityStore = useIdentityStore();
    const isLiked = computed(() => identityStore.isLikedPage(props.article.id));
    const isHybrid = computed(() => isHybridType(props.article.origin));
    const isReprint = computed(() => isReprintType(props.article.origin));
    const isOriginal = computed(() => isOriginalType(props.article.origin));
    const getThumbnailURL = (url) => {
      if (!url) {
        return "";
      }
      if (!url.startsWith(API_CONFIG.STATIC)) {
        return url;
      }
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(url.replace(API_CONFIG.STATIC, ""), {
          width: 700,
          height: 247,
          webp: gState.imageExt.value.isWebP,
          watermark: `watermark:0.38:sowe:18:16:0.16`
        })
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-item" }, _attrs))} data-v-f4361c3d><div class="thumbnail" data-v-f4361c3d><span class="${ssrRenderClass([{
        original: isOriginal.value,
        reprint: isReprint.value,
        hybrid: isHybrid.value
      }, "oirigin"])}" data-v-f4361c3d>`);
      if (isOriginal.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ORIGIN_ORIGINAL
        }, null, _parent));
      } else if (isReprint.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ORIGIN_REPRINT
        }, null, _parent));
      } else if (isHybrid.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ORIGIN_HYBRID
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</span><div class="image" loading="lazy" style="${ssrRenderStyle({ backgroundImage: `url(${getThumbnailURL(_ctx.article.thumbnail)})` })}"${ssrRenderAttr("alt", _ctx.article.title)}${ssrRenderAttr("title", _ctx.article.title)} data-v-f4361c3d></div></div><div class="content" data-v-f4361c3d><div class="body" data-v-f4361c3d><h4 class="title" data-v-f4361c3d>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "link",
        title: _ctx.article.title,
        to: unref(getArticleDetailRoute)(_ctx.article.id)
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
      _push(`</h4><p class="description" style="${ssrRenderStyle({ "-webkit-box-orient": "vertical" })}" data-v-f4361c3d>${_ctx.article.description}</p></div><div class="meta" data-v-f4361c3d><span class="date" data-v-f4361c3d><i class="iconfont icon-clock" data-v-f4361c3d></i>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: _ctx.article.created_at
      }, null, _parent));
      _push(`</span><span class="views" data-v-f4361c3d><i class="iconfont icon-eye" data-v-f4361c3d></i><span data-v-f4361c3d>${ssrInterpolate(unref(numberSplit)(_ctx.article.meta.views))}</span></span><span class="comments" data-v-f4361c3d><i class="iconfont icon-comment" data-v-f4361c3d></i><span data-v-f4361c3d>${ssrInterpolate(_ctx.article.meta.comments)}</span></span><span class="likes" data-v-f4361c3d><i class="${ssrRenderClass([{ liked: isLiked.value }, "iconfont icon-like"])}" data-v-f4361c3d></i><span data-v-f4361c3d>${ssrInterpolate(_ctx.article.meta.likes)}</span></span></div></div></div>`);
    };
  }
});
const item_vue_vue_type_style_index_0_scoped_f4361c3d_lang = "";
const _sfc_setup$1G = _sfc_main$1G.setup;
_sfc_main$1G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/flow/mobile/item.vue");
  return _sfc_setup$1G ? _sfc_setup$1G(props, ctx) : void 0;
};
const ListItem$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1G, [["__scopeId", "data-v-f4361c3d"]]);
const _sfc_main$1F = /* @__PURE__ */ defineComponent({
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
    const { i18n: _i18n, seoMeta, isZhLang } = useEnhancer();
    const tagStore = useTagStore();
    const categoryStore = useCategoryStore();
    const articleListStore = useArticleListStore();
    const appOptionStore = useAppOptionStore();
    const category = computed(() => {
      return props.categorySlug ? categoryStore.data.find((category2) => category2.slug === props.categorySlug) : null;
    });
    const tag = computed(() => {
      return props.tagSlug ? tagStore.data.find((tag2) => tag2.slug === props.tagSlug) : null;
    });
    const hasMoreArticles = computed(() => {
      const pagination = articleListStore.pagination;
      return pagination ? pagination.current_page < pagination.total_page : false;
    });
    seoMeta(() => {
      var _a;
      const titles = Object.values(props).filter(Boolean).map((prop) => firstUpperCase(prop));
      if (titles.length) {
        return {
          pageTitle: titles.join(" | ")
        };
      }
      return {
        title: `${META.title} - ${_i18n.t(LanguageKey.APP_SLOGAN)}`,
        description: isZhLang.value ? META.zh_description : META.en_description,
        keywords: (_a = appOptionStore.data) == null ? void 0 : _a.keywords.join(","),
        ogType: "website"
      };
    });
    const fetchArticles = async (params = {}) => {
      await articleListStore.fetch({
        category_slug: props.categorySlug,
        tag_slug: props.tagSlug,
        date: props.date,
        keyword: props.searchKeyword,
        ...params
      });
    };
    const loadmoreArticles = async () => {
      await fetchArticles({
        page: articleListStore.pagination.current_page + 1
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles" }, _attrs))} data-v-1e7d62da>`);
      if (_ctx.tagSlug || _ctx.categorySlug || _ctx.date || _ctx.searchKeyword) {
        _push(`<div class="header" data-v-1e7d62da><div class="content" data-v-1e7d62da>`);
        if (_ctx.categorySlug) {
          _push(`<!--[-->`);
          if (category.value) {
            _push(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`分类 “${ssrInterpolate(category.value.name)}” 的过滤结果`);
                } else {
                  return [
                    createTextVNode("分类 “" + toDisplayString(category.value.name) + "” 的过滤结果", 1)
                  ];
                }
              }),
              en: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Category &quot;${ssrInterpolate(unref(firstUpperCase)(category.value.slug))}&quot; &#39;s result`);
                } else {
                  return [
                    createTextVNode('Category "' + toDisplayString(unref(firstUpperCase)(category.value.slug)) + `" 's result`, 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<span data-v-1e7d62da>${ssrInterpolate(_ctx.categorySlug)}</span>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.tagSlug) {
          _push(`<!--[-->`);
          if (tag.value) {
            _push(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`标签 “${ssrInterpolate(tag.value.name)}” 的过滤结果`);
                } else {
                  return [
                    createTextVNode("标签 “" + toDisplayString(tag.value.name) + "” 的过滤结果", 1)
                  ];
                }
              }),
              en: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Tag &quot;${ssrInterpolate(unref(getTagEnName)(tag.value))}&quot; &#39;s result`);
                } else {
                  return [
                    createTextVNode('Tag "' + toDisplayString(unref(getTagEnName)(tag.value)) + `" 's result`, 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<span data-v-1e7d62da>${ssrInterpolate(_ctx.tagSlug)}</span>`);
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
              _push2(`<i class="iconfont icon-cancel" data-v-1e7d62da${_scopeId}></i>`);
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
            _push2(`<ul class="skeletons" data-v-1e7d62da${_scopeId}><!--[-->`);
            ssrRenderList(3, (item) => {
              _push2(`<li class="item" data-v-1e7d62da${_scopeId}><div class="thumbnail" data-v-1e7d62da${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
              _push2(`</div><div class="content" data-v-1e7d62da${_scopeId}><div class="title" data-v-1e7d62da${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
              _push2(`</div><div class="description" data-v-1e7d62da${_scopeId}>`);
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
              class: "empty",
              "i18n-key": unref(LanguageKey).ARTICLE_PLACEHOLDER
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "empty",
                "i18n-key": unref(LanguageKey).ARTICLE_PLACEHOLDER
              }, null, 8, ["i18n-key"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-1e7d62da${_scopeId}><div${ssrRenderAttrs({
              key: "list",
              name: "list-fade",
              class: "list"
            })}>`);
            ssrRenderList(unref(articleListStore).data, (article, index) => {
              _push2(ssrRenderComponent(ListItem$1, {
                class: "list-item",
                article,
                key: index
              }, null, _parent2, _scopeId));
            });
            _push2(`</div>`);
            _push2(ssrRenderComponent(Loadmore, {
              loading: unref(articleListStore).fetching,
              finished: !hasMoreArticles.value,
              onLoadmore: loadmoreArticles
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(TransitionGroup, {
                  key: "list",
                  name: "list-fade",
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
                  loading: unref(articleListStore).fetching,
                  finished: !hasMoreArticles.value,
                  onLoadmore: loadmoreArticles
                }, null, 8, ["loading", "finished"])
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
const index_vue_vue_type_style_index_0_scoped_1e7d62da_lang = "";
const _sfc_setup$1F = _sfc_main$1F.setup;
_sfc_main$1F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/flow/mobile/index.vue");
  return _sfc_setup$1F ? _sfc_setup$1F(props, ctx) : void 0;
};
const MobileFlow = /* @__PURE__ */ _export_sfc(_sfc_main$1F, [["__scopeId", "data-v-1e7d62da"]]);
const _sfc_main$1E = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const { gState, cdnDomain } = useEnhancer();
    const identity = useIdentityStore();
    const isLiked = computed(() => identity.isLikedPage(props.article.id));
    const isHybrid = computed(() => isHybridType(props.article.origin));
    const isReprint = computed(() => isReprintType(props.article.origin));
    const isOriginal = computed(() => isOriginalType(props.article.origin));
    const getLanguageText = (language) => {
      return language === Language.Chinese ? "中文" : "EN";
    };
    const getThumbnailURL = (url) => {
      if (!url) {
        return "";
      }
      if (!url.startsWith(API_CONFIG.STATIC)) {
        return url;
      }
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(url.replace(API_CONFIG.STATIC, ""), {
          width: 350,
          height: 238,
          webp: gState.imageExt.value.isWebP
        })
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      const _component_placeholder = resolveComponent("placeholder");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-item" }, _attrs))} data-v-4e6dca42><div class="item-background" style="${ssrRenderStyle({ backgroundImage: `url(${getThumbnailURL(_ctx.article.thumbnail)})` })}" data-v-4e6dca42></div><div class="item-content" data-v-4e6dca42>`);
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
            }, "item-oirigin"])}" data-v-4e6dca42${_scopeId}>`);
            if (isOriginal.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LanguageKey).ORIGIN_ORIGINAL
              }, null, _parent2, _scopeId));
            } else if (isReprint.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LanguageKey).ORIGIN_REPRINT
              }, null, _parent2, _scopeId));
            } else if (isHybrid.value) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LanguageKey).ORIGIN_HYBRID
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span><div class="image" loading="lazy" style="${ssrRenderStyle({ backgroundImage: `url(${getThumbnailURL(_ctx.article.thumbnail)})` })}"${ssrRenderAttr("alt", _ctx.article.title)}${ssrRenderAttr("title", _ctx.article.title)} data-v-4e6dca42${_scopeId}></div>`);
          } else {
            return [
              createVNode("span", {
                class: ["item-oirigin", {
                  original: isOriginal.value,
                  hybrid: isHybrid.value,
                  reprint: isReprint.value
                }]
              }, [
                isOriginal.value ? (openBlock(), createBlock(_component_i18n, {
                  key: 0,
                  k: unref(LanguageKey).ORIGIN_ORIGINAL
                }, null, 8, ["k"])) : isReprint.value ? (openBlock(), createBlock(_component_i18n, {
                  key: 1,
                  k: unref(LanguageKey).ORIGIN_REPRINT
                }, null, 8, ["k"])) : isHybrid.value ? (openBlock(), createBlock(_component_i18n, {
                  key: 2,
                  k: unref(LanguageKey).ORIGIN_HYBRID
                }, null, 8, ["k"])) : createCommentVNode("", true)
              ], 2),
              createVNode("div", {
                class: "image",
                loading: "lazy",
                style: { backgroundImage: `url(${getThumbnailURL(_ctx.article.thumbnail)})` },
                alt: _ctx.article.title,
                title: _ctx.article.title
              }, null, 12, ["alt", "title"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="item-body" data-v-4e6dca42><div class="item-content" data-v-4e6dca42><h5 class="title" data-v-4e6dca42>`);
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
      _push(`<span class="language" data-v-4e6dca42>${ssrInterpolate(getLanguageText(_ctx.article.lang))}</span></h5><p class="description" style="${ssrRenderStyle({ "-webkit-box-orient": "vertical" })}" data-v-4e6dca42>${_ctx.article.description}</p></div><div class="item-meta" data-v-4e6dca42><span class="date" data-v-4e6dca42><i class="iconfont icon-clock" data-v-4e6dca42></i>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: _ctx.article.created_at
      }, null, _parent));
      _push(`</span><span class="views" data-v-4e6dca42><i class="iconfont icon-eye" data-v-4e6dca42></i><span data-v-4e6dca42>${ssrInterpolate(unref(numberSplit)(_ctx.article.meta.views))}</span></span><span class="comments" data-v-4e6dca42><i class="iconfont icon-comment" data-v-4e6dca42></i><span data-v-4e6dca42>${ssrInterpolate(_ctx.article.meta.comments)}</span></span><span class="likes" data-v-4e6dca42><i class="${ssrRenderClass([{ liked: isLiked.value }, "iconfont icon-like"])}" data-v-4e6dca42></i><span data-v-4e6dca42>${ssrInterpolate(_ctx.article.meta.likes)}</span></span><span class="categories" data-v-4e6dca42><i class="iconfont icon-category" data-v-4e6dca42></i>`);
      _push(ssrRenderComponent(_component_placeholder, {
        transition: false,
        data: _ctx.article.categories.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).EMPTY_PLACEHOLDER
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LanguageKey).EMPTY_PLACEHOLDER
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
const item_vue_vue_type_style_index_0_scoped_4e6dca42_lang = "";
const _sfc_setup$1E = _sfc_main$1E.setup;
_sfc_main$1E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/flow/desktop/item.vue");
  return _sfc_setup$1E ? _sfc_setup$1E(props, ctx) : void 0;
};
const ListItem = /* @__PURE__ */ _export_sfc(_sfc_main$1E, [["__scopeId", "data-v-4e6dca42"]]);
const _sfc_main$1D = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    articles: {},
    pagination: {},
    fetching: { type: Boolean },
    mammon: { type: Boolean, default: true }
  },
  setup(__props, { emit }) {
    const props = __props;
    const { isDarkTheme, isZhLang } = useEnhancer();
    const isLoadMoreEnabled = computed(() => {
      if (!props.pagination)
        return false;
      return props.pagination.current_page < props.pagination.total_page;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_empty = resolveComponent("empty");
      const _component_client_only = resolveComponent("client-only");
      const _component_Adsense = resolveComponent("Adsense");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles" }, _attrs))} data-v-d23edec5><div class="article-list" data-v-d23edec5>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: _ctx.articles.length,
        loading: !_ctx.articles.length && _ctx.fetching
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="article-list-skeleton" data-v-d23edec5${_scopeId}><!--[-->`);
            ssrRenderList(6, (item) => {
              _push2(`<li class="item" data-v-d23edec5${_scopeId}><div class="thumbnail" data-v-d23edec5${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
              _push2(`</div><div class="content" data-v-d23edec5${_scopeId}><div class="title" data-v-d23edec5${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
              _push2(`</div><div class="description" data-v-d23edec5${_scopeId}><!--[-->`);
              ssrRenderList(2, (line) => {
                _push2(`<div class="line-item" data-v-d23edec5${_scopeId}>`);
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
              "i18n-key": unref(LanguageKey).ARTICLE_PLACEHOLDER
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "empty",
                "i18n-key": unref(LanguageKey).ARTICLE_PLACEHOLDER
              }, null, 8, ["i18n-key"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-d23edec5${_scopeId}>`);
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
                createVNode(TransitionGroup, { name: "list-fade" }, {
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
      _push(`</div><button class="article-load"${ssrIncludeBooleanAttr(_ctx.fetching || !isLoadMoreEnabled.value) ? " disabled" : ""} data-v-d23edec5><div class="background" data-v-d23edec5><span class="left" data-v-d23edec5></span><span class="right" data-v-d23edec5></span></div><div class="content" data-v-d23edec5><span class="left" data-v-d23edec5>`);
      if (_ctx.fetching) {
        _push(`<!--[-->•••<!--]-->`);
      } else {
        _push(`<!--[-->${ssrInterpolate(_ctx.articles.length)} / ${ssrInterpolate((_a = _ctx.pagination) == null ? void 0 : _a.total)}<!--]-->`);
      }
      _push(`</span><span class="right" data-v-d23edec5><span class="${ssrRenderClass([{ zh: unref(isZhLang) }, "text"])}" data-v-d23edec5>`);
      if (_ctx.fetching) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ARTICLE_LIST_LOADING
        }, null, _parent));
      } else if (isLoadMoreEnabled.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ARTICLE_LIST_LOADMORE
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ARTICLE_LIST_NO_MORE
        }, null, _parent));
      }
      _push(`</span><i class="iconfont icon-loadmore" data-v-d23edec5></i></span></div></button></div>`);
    };
  }
});
const list_vue_vue_type_style_index_0_scoped_d23edec5_lang = "";
const _sfc_setup$1D = _sfc_main$1D.setup;
_sfc_main$1D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/flow/desktop/list.vue");
  return _sfc_setup$1D ? _sfc_setup$1D(props, ctx) : void 0;
};
const ArticleList = /* @__PURE__ */ _export_sfc(_sfc_main$1D, [["__scopeId", "data-v-d23edec5"]]);
Swiper.use([Grid, Pagination, Navigation, Mousewheel, Autoplay, A11y, EffectFade]);
const _sfc_main$1C = /* @__PURE__ */ defineComponent({
  __name: "carrousel",
  __ssrInlineRender: true,
  props: {
    articles: {},
    fetching: { type: Boolean },
    count: { default: 9 }
  },
  setup(__props) {
    const props = __props;
    const { gState, adConfig, cdnDomain, isDarkTheme } = useEnhancer();
    const getThumbnailURL = (url) => {
      if (!url) {
        return getAssetURL(cdnDomain, "/images/thumbnail/carrousel.jpg");
      }
      if (!url.startsWith(API_CONFIG.STATIC)) {
        return url;
      }
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(url.replace(API_CONFIG.STATIC, ""), {
          width: 1190,
          height: 420,
          webp: gState.imageExt.value.isWebP,
          watermark: `watermark:0.36:sowe:18:18:0.15`
        })
      );
    };
    const slides = computed(() => {
      const result = props.articles.slice(0, props.count).map((article) => ({
        ad: false,
        title: article.title,
        route: getArticleDetailRoute(article.id),
        image: getThumbnailURL(article.thumbnail)
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
          ad: true
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
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["carrousel", { dark: unref(isDarkTheme) }]
      }, _attrs))} data-v-d20228ee>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: slides.value.length,
        loading: _ctx.fetching
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "article-empty",
              key: "empty"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).ARTICLE_PLACEHOLDER
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
                key: "empty"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="article-skeleton" data-v-d20228ee${_scopeId}><div class="title" data-v-d20228ee${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div><div class="content" data-v-d20228ee${_scopeId}><div class="first" data-v-d20228ee${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div><!--[-->`);
            ssrRenderList(3, (index) => {
              _push2(`<div class="line" data-v-d20228ee${_scopeId}>`);
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
              loop: true,
              "set-wrapper-size": true,
              mousewheel: true,
              "observe-parents": true,
              "grab-cursor": false,
              "simulate-touch": false,
              pagination: { clickable: true },
              autoplay: { delay: 3500, disableOnInteraction: false }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(slides.value.slice(0, 9), (slide, index) => {
                    _push3(ssrRenderComponent(unref(SwiperSlide), { key: index }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="content" data-v-d20228ee${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ulink, {
                            class: "link",
                            href: slide.url,
                            to: slide.route
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.title)} draggable="false" loading="lazy" data-v-d20228ee${_scopeId4}><div class="title"${ssrRenderAttr("title", slide.title)} data-v-d20228ee${_scopeId4}><div class="background" data-v-d20228ee${_scopeId4}></div><div class="prospect" data-v-d20228ee${_scopeId4}><span class="text" style="${ssrRenderStyle({ backgroundImage: `url('${slide.image}')` })}" data-v-d20228ee${_scopeId4}>${ssrInterpolate(slide.title)}</span></div></div>`);
                                if (slide.ad) {
                                  _push5(`<span class="ad-symbol" data-v-d20228ee${_scopeId4}>`);
                                  _push5(ssrRenderComponent(_component_i18n, {
                                    k: unref(LanguageKey).AD
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</span>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode("img", {
                                    src: slide.image,
                                    alt: slide.title,
                                    draggable: "false",
                                    loading: "lazy"
                                  }, null, 8, ["src", "alt"]),
                                  createVNode("div", {
                                    class: "title",
                                    title: slide.title
                                  }, [
                                    createVNode("div", { class: "background" }),
                                    createVNode("div", { class: "prospect" }, [
                                      createVNode("span", {
                                        class: "text",
                                        style: { backgroundImage: `url('${slide.image}')` }
                                      }, toDisplayString(slide.title), 5)
                                    ])
                                  ], 8, ["title"]),
                                  slide.ad ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "ad-symbol"
                                  }, [
                                    createVNode(_component_i18n, {
                                      k: unref(LanguageKey).AD
                                    }, null, 8, ["k"])
                                  ])) : createCommentVNode("", true)
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
                                  createVNode("img", {
                                    src: slide.image,
                                    alt: slide.title,
                                    draggable: "false",
                                    loading: "lazy"
                                  }, null, 8, ["src", "alt"]),
                                  createVNode("div", {
                                    class: "title",
                                    title: slide.title
                                  }, [
                                    createVNode("div", { class: "background" }),
                                    createVNode("div", { class: "prospect" }, [
                                      createVNode("span", {
                                        class: "text",
                                        style: { backgroundImage: `url('${slide.image}')` }
                                      }, toDisplayString(slide.title), 5)
                                    ])
                                  ], 8, ["title"]),
                                  slide.ad ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "ad-symbol"
                                  }, [
                                    createVNode(_component_i18n, {
                                      k: unref(LanguageKey).AD
                                    }, null, 8, ["k"])
                                  ])) : createCommentVNode("", true)
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
                                createVNode("img", {
                                  src: slide.image,
                                  alt: slide.title,
                                  draggable: "false",
                                  loading: "lazy"
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", {
                                  class: "title",
                                  title: slide.title
                                }, [
                                  createVNode("div", { class: "background" }),
                                  createVNode("div", { class: "prospect" }, [
                                    createVNode("span", {
                                      class: "text",
                                      style: { backgroundImage: `url('${slide.image}')` }
                                    }, toDisplayString(slide.title), 5)
                                  ])
                                ], 8, ["title"]),
                                slide.ad ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "ad-symbol"
                                }, [
                                  createVNode(_component_i18n, {
                                    k: unref(LanguageKey).AD
                                  }, null, 8, ["k"])
                                ])) : createCommentVNode("", true)
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
                loop: true,
                "set-wrapper-size": true,
                mousewheel: true,
                "observe-parents": true,
                "grab-cursor": false,
                "simulate-touch": false,
                pagination: { clickable: true },
                autoplay: { delay: 3500, disableOnInteraction: false }
              }, {
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
                              createVNode("img", {
                                src: slide.image,
                                alt: slide.title,
                                draggable: "false",
                                loading: "lazy"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", {
                                class: "title",
                                title: slide.title
                              }, [
                                createVNode("div", { class: "background" }),
                                createVNode("div", { class: "prospect" }, [
                                  createVNode("span", {
                                    class: "text",
                                    style: { backgroundImage: `url('${slide.image}')` }
                                  }, toDisplayString(slide.title), 5)
                                ])
                              ], 8, ["title"]),
                              slide.ad ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "ad-symbol"
                              }, [
                                createVNode(_component_i18n, {
                                  k: unref(LanguageKey).AD
                                }, null, 8, ["k"])
                              ])) : createCommentVNode("", true)
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
const carrousel_vue_vue_type_style_index_0_scoped_d20228ee_lang = "";
const _sfc_setup$1C = _sfc_main$1C.setup;
_sfc_main$1C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/carrousel.vue");
  return _sfc_setup$1C ? _sfc_setup$1C(props, ctx) : void 0;
};
const Carrousel = /* @__PURE__ */ _export_sfc(_sfc_main$1C, [["__scopeId", "data-v-d20228ee"]]);
var GAEventCategories = /* @__PURE__ */ ((GAEventCategories2) => {
  GAEventCategories2["Comment"] = "comment";
  GAEventCategories2["Share"] = "share";
  GAEventCategories2["Widget"] = "widget";
  GAEventCategories2["Universal"] = "global";
  GAEventCategories2["Article"] = "page_article";
  GAEventCategories2["Index"] = "page_index";
  GAEventCategories2["App"] = "page_app";
  GAEventCategories2["About"] = "page_about";
  GAEventCategories2["YouTube"] = "page_youtube";
  GAEventCategories2["Photography"] = "page_photography";
  return GAEventCategories2;
})(GAEventCategories || {});
const isVideoMediaIns = (media) => {
  return media.media_type === "VIDEO";
};
const isAlbumMediaIns = (media) => {
  return media.media_type === "CAROUSEL_ALBUM";
};
const getInstagramCoverURL = (media) => {
  return isVideoMediaIns(media) ? media.thumbnail_url : media.media_url;
};
const getInstagramThumbnail = (media, size) => {
  return `${media.permalink}media/?size=${size}`;
};
const getYouTubePlaylistURL = (id) => {
  return `https://www.youtube.com/playlist?list=${id}`;
};
const getYouTubeVideoEmbedURL = (id, list) => {
  const listParam = list ? `?list=${list}` : "";
  return `https://www.youtube.com/embed/${id}${listParam}`;
};
const getTwitterTweetDetailURL = (username, id) => {
  return `https://twitter.com/${username}/status/${id}`;
};
const get163MusicSongDetailURL = (songId) => {
  return `https://music.163.com/#/song?id=${songId}`;
};
const _sfc_main$1B = /* @__PURE__ */ defineComponent({
  __name: "twitter",
  __ssrInlineRender: true,
  props: {
    aggregate: {},
    fetching: { type: Boolean }
  },
  setup(__props) {
    const { gtag } = useEnhancer();
    const swiperRef = shallowRef();
    const prevSlide = () => {
      var _a;
      return (_a = swiperRef.value) == null ? void 0 : _a.slidePrev();
    };
    const nextSlide = () => {
      var _a;
      return (_a = swiperRef.value) == null ? void 0 : _a.slideNext();
    };
    const handleSwiperReady = (_swiper) => {
      swiperRef.value = _swiper;
    };
    const activeIndex = ref(0);
    const handleSwiperTransitionStart = () => {
      var _a;
      activeIndex.value = ((_a = swiperRef.value) == null ? void 0 : _a.activeIndex) || 0;
    };
    const handleGtagEvent = (name) => {
      gtag == null ? void 0 : gtag.event(name, {
        event_category: GAEventCategories.Index
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_i18n = resolveComponent("i18n");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "twitter" }, _attrs))} data-v-e3da4504>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: !!((_a = _ctx.aggregate) == null ? void 0 : _a.tweets.length),
        loading: _ctx.fetching
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="twitter-empty" data-v-e3da4504${_scopeId}>`);
            _push2(ssrRenderComponent(_component_empty, { class: "empty-content" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).EMPTY_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).EMPTY_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "twitter-empty",
                key: "empty"
              }, [
                createVNode(_component_empty, { class: "empty-content" }, {
                  default: withCtx(() => [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).EMPTY_PLACEHOLDER
                    }, null, 8, ["k"])
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="twitter-skeleton" data-v-e3da4504${_scopeId}><div class="left" data-v-e3da4504${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div><div class="right" data-v-e3da4504${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "twitter-skeleton",
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
          var _a2, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="twitter-content" data-v-e3da4504${_scopeId}>`);
            if ((_a2 = _ctx.aggregate) == null ? void 0 : _a2.userinfo) {
              _push2(`<div class="userinfo"${ssrRenderAttr("title", _ctx.aggregate.userinfo.name)} data-v-e3da4504${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ulink, {
                class: "link",
                href: unref(VALUABLE_LINKS).TWITTER,
                onMousedown: ($event) => handleGtagEvent("twitter_homepage")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_uimage, {
                      class: "avatar",
                      proxy: "",
                      src: _ctx.aggregate.userinfo.avatar
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="logo" data-v-e3da4504${_scopeId2}><i class="iconfont icon-twitter" data-v-e3da4504${_scopeId2}></i></span>`);
                  } else {
                    return [
                      createVNode(_component_uimage, {
                        class: "avatar",
                        proxy: "",
                        src: _ctx.aggregate.userinfo.avatar
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "logo" }, [
                        createVNode("i", { class: "iconfont icon-twitter" })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="count" data-v-e3da4504${_scopeId}><p class="title" data-v-e3da4504${_scopeId}>`);
              if (_ctx.aggregate.userinfo.tweetCount) {
                _push2(`<!--[-->${ssrInterpolate(unref(padStart)(unref(numberSplit)(_ctx.aggregate.userinfo.tweetCount), 3, "0"))}<!--]-->`);
              } else {
                _push2(ssrRenderComponent(_component_i18n, {
                  en: "Latest",
                  zh: "碎碎"
                }, null, _parent2, _scopeId));
              }
              _push2(`</p><p class="secondary" data-v-e3da4504${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                en: "tweets",
                zh: _ctx.aggregate.userinfo.tweetCount ? "碎碎念" : "念念"
              }, null, _parent2, _scopeId));
              _push2(`</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_b = _ctx.aggregate) == null ? void 0 : _b.tweets.length) {
              _push2(ssrRenderComponent(unref(Swiper$1), {
                class: "tweets",
                direction: "vertical",
                height: 66,
                mousewheel: true,
                "allow-touch-move": false,
                "slides-per-view": 1,
                "prevent-clicks": false,
                autoplay: { delay: 3500, disableOnInteraction: false },
                onTransitionStart: handleSwiperTransitionStart,
                onSwiper: handleSwiperReady
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(_ctx.aggregate.tweets, (tweet, index) => {
                      _push3(ssrRenderComponent(unref(SwiperSlide), {
                        class: "tweet-item",
                        key: index
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="content"${ssrRenderAttr("title", tweet.text)} data-v-e3da4504${_scopeId3}>`);
                            if (tweet.text) {
                              _push4(`<div class="${ssrRenderClass(["main", { "has-media": tweet.mediaCount }])}" data-v-e3da4504${_scopeId3}>${unref(unescape)(tweet.text)}</div>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            if (tweet.mediaCount) {
                              _push4(ssrRenderComponent(_component_ulink, {
                                class: ["medias", { empty: !tweet.text }],
                                href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                                onMousedown: ($event) => handleGtagEvent("twitter_image_link")
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    if (tweet.hasVideo) {
                                      _push5(`<i class="iconfont media icon-video" data-v-e3da4504${_scopeId4}></i>`);
                                    } else if (tweet.hasImage) {
                                      _push5(`<i class="iconfont media icon-image" data-v-e3da4504${_scopeId4}></i>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    _push5(`<span class="count" data-v-e3da4504${_scopeId4}>[${ssrInterpolate(tweet.mediaCount)}]</span><i class="iconfont window icon-new-window-s" data-v-e3da4504${_scopeId4}></i>`);
                                  } else {
                                    return [
                                      tweet.hasVideo ? (openBlock(), createBlock("i", {
                                        key: 0,
                                        class: "iconfont media icon-video"
                                      })) : tweet.hasImage ? (openBlock(), createBlock("i", {
                                        key: 1,
                                        class: "iconfont media icon-image"
                                      })) : createCommentVNode("", true),
                                      createVNode("span", { class: "count" }, "[" + toDisplayString(tweet.mediaCount) + "]", 1),
                                      createVNode("i", { class: "iconfont window icon-new-window-s" })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div><div class="meta" data-v-e3da4504${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_ulink, {
                              class: "item link",
                              title: "To Tweet",
                              href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                              onMousedown: ($event) => handleGtagEvent("twitter_detail_link")
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (tweet.isQuote || tweet.isRetweet) {
                                    _push5(`<i class="iconfont icon-retweet" data-v-e3da4504${_scopeId4}></i>`);
                                  } else if (tweet.isReply) {
                                    _push5(`<i class="iconfont icon-follow-up" data-v-e3da4504${_scopeId4}></i>`);
                                  } else {
                                    _push5(`<i class="iconfont twitter icon-twitter" data-v-e3da4504${_scopeId4}></i>`);
                                  }
                                  _push5(`<span data-v-e3da4504${_scopeId4}>Tweet</span><i class="iconfont window icon-new-window-s" data-v-e3da4504${_scopeId4}></i>`);
                                } else {
                                  return [
                                    tweet.isQuote || tweet.isRetweet ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "iconfont icon-retweet"
                                    })) : tweet.isReply ? (openBlock(), createBlock("i", {
                                      key: 1,
                                      class: "iconfont icon-follow-up"
                                    })) : (openBlock(), createBlock("i", {
                                      key: 2,
                                      class: "iconfont twitter icon-twitter"
                                    })),
                                    createVNode("span", null, "Tweet"),
                                    createVNode("i", { class: "iconfont window icon-new-window-s" })
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            if (tweet.commentCount) {
                              _push4(`<span class="item reply" data-v-e3da4504${_scopeId3}><i class="iconfont icon-comment" data-v-e3da4504${_scopeId3}></i><span data-v-e3da4504${_scopeId3}>${ssrInterpolate(tweet.commentCount)}</span></span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            if (Number.isInteger(tweet.favoriteCount)) {
                              _push4(`<span class="item like" data-v-e3da4504${_scopeId3}><i class="iconfont icon-heart" data-v-e3da4504${_scopeId3}></i><span data-v-e3da4504${_scopeId3}>${ssrInterpolate(tweet.favoriteCount)}</span></span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            if (tweet.date) {
                              _push4(`<span class="item date" data-v-e3da4504${_scopeId3}><i class="iconfont icon-clock" data-v-e3da4504${_scopeId3}></i>`);
                              _push4(ssrRenderComponent(_component_udate, {
                                to: "ago",
                                date: tweet.date
                              }, null, _parent4, _scopeId3));
                              _push4(`</span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            if (tweet.location) {
                              _push4(`<span class="item location"${ssrRenderAttr("title", tweet.location)} data-v-e3da4504${_scopeId3}><i class="iconfont icon-location" data-v-e3da4504${_scopeId3}></i><span data-v-e3da4504${_scopeId3}>${ssrInterpolate(tweet.location)}</span></span>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</div>`);
                          } else {
                            return [
                              createVNode("div", {
                                class: "content",
                                title: tweet.text
                              }, [
                                tweet.text ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  innerHTML: unref(unescape)(tweet.text),
                                  class: ["main", { "has-media": tweet.mediaCount }]
                                }, null, 10, ["innerHTML"])) : createCommentVNode("", true),
                                tweet.mediaCount ? (openBlock(), createBlock(_component_ulink, {
                                  key: 1,
                                  class: ["medias", { empty: !tweet.text }],
                                  href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                                  onMousedown: ($event) => handleGtagEvent("twitter_image_link")
                                }, {
                                  default: withCtx(() => [
                                    tweet.hasVideo ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "iconfont media icon-video"
                                    })) : tweet.hasImage ? (openBlock(), createBlock("i", {
                                      key: 1,
                                      class: "iconfont media icon-image"
                                    })) : createCommentVNode("", true),
                                    createVNode("span", { class: "count" }, "[" + toDisplayString(tweet.mediaCount) + "]", 1),
                                    createVNode("i", { class: "iconfont window icon-new-window-s" })
                                  ]),
                                  _: 2
                                }, 1032, ["class", "href", "onMousedown"])) : createCommentVNode("", true)
                              ], 8, ["title"]),
                              createVNode("div", { class: "meta" }, [
                                createVNode(_component_ulink, {
                                  class: "item link",
                                  title: "To Tweet",
                                  href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                                  onMousedown: ($event) => handleGtagEvent("twitter_detail_link")
                                }, {
                                  default: withCtx(() => [
                                    tweet.isQuote || tweet.isRetweet ? (openBlock(), createBlock("i", {
                                      key: 0,
                                      class: "iconfont icon-retweet"
                                    })) : tweet.isReply ? (openBlock(), createBlock("i", {
                                      key: 1,
                                      class: "iconfont icon-follow-up"
                                    })) : (openBlock(), createBlock("i", {
                                      key: 2,
                                      class: "iconfont twitter icon-twitter"
                                    })),
                                    createVNode("span", null, "Tweet"),
                                    createVNode("i", { class: "iconfont window icon-new-window-s" })
                                  ]),
                                  _: 2
                                }, 1032, ["href", "onMousedown"]),
                                tweet.commentCount ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "item reply"
                                }, [
                                  createVNode("i", { class: "iconfont icon-comment" }),
                                  createVNode("span", null, toDisplayString(tweet.commentCount), 1)
                                ])) : createCommentVNode("", true),
                                Number.isInteger(tweet.favoriteCount) ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "item like"
                                }, [
                                  createVNode("i", { class: "iconfont icon-heart" }),
                                  createVNode("span", null, toDisplayString(tweet.favoriteCount), 1)
                                ])) : createCommentVNode("", true),
                                tweet.date ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "item date"
                                }, [
                                  createVNode("i", { class: "iconfont icon-clock" }),
                                  createVNode(_component_udate, {
                                    to: "ago",
                                    date: tweet.date
                                  }, null, 8, ["date"])
                                ])) : createCommentVNode("", true),
                                tweet.location ? (openBlock(), createBlock("span", {
                                  key: 3,
                                  class: "item location",
                                  title: tweet.location
                                }, [
                                  createVNode("i", { class: "iconfont icon-location" }),
                                  createVNode("span", null, toDisplayString(tweet.location), 1)
                                ], 8, ["title"])) : createCommentVNode("", true)
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
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.aggregate.tweets, (tweet, index) => {
                        return openBlock(), createBlock(unref(SwiperSlide), {
                          class: "tweet-item",
                          key: index
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: "content",
                              title: tweet.text
                            }, [
                              tweet.text ? (openBlock(), createBlock("div", {
                                key: 0,
                                innerHTML: unref(unescape)(tweet.text),
                                class: ["main", { "has-media": tweet.mediaCount }]
                              }, null, 10, ["innerHTML"])) : createCommentVNode("", true),
                              tweet.mediaCount ? (openBlock(), createBlock(_component_ulink, {
                                key: 1,
                                class: ["medias", { empty: !tweet.text }],
                                href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                                onMousedown: ($event) => handleGtagEvent("twitter_image_link")
                              }, {
                                default: withCtx(() => [
                                  tweet.hasVideo ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "iconfont media icon-video"
                                  })) : tweet.hasImage ? (openBlock(), createBlock("i", {
                                    key: 1,
                                    class: "iconfont media icon-image"
                                  })) : createCommentVNode("", true),
                                  createVNode("span", { class: "count" }, "[" + toDisplayString(tweet.mediaCount) + "]", 1),
                                  createVNode("i", { class: "iconfont window icon-new-window-s" })
                                ]),
                                _: 2
                              }, 1032, ["class", "href", "onMousedown"])) : createCommentVNode("", true)
                            ], 8, ["title"]),
                            createVNode("div", { class: "meta" }, [
                              createVNode(_component_ulink, {
                                class: "item link",
                                title: "To Tweet",
                                href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                                onMousedown: ($event) => handleGtagEvent("twitter_detail_link")
                              }, {
                                default: withCtx(() => [
                                  tweet.isQuote || tweet.isRetweet ? (openBlock(), createBlock("i", {
                                    key: 0,
                                    class: "iconfont icon-retweet"
                                  })) : tweet.isReply ? (openBlock(), createBlock("i", {
                                    key: 1,
                                    class: "iconfont icon-follow-up"
                                  })) : (openBlock(), createBlock("i", {
                                    key: 2,
                                    class: "iconfont twitter icon-twitter"
                                  })),
                                  createVNode("span", null, "Tweet"),
                                  createVNode("i", { class: "iconfont window icon-new-window-s" })
                                ]),
                                _: 2
                              }, 1032, ["href", "onMousedown"]),
                              tweet.commentCount ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "item reply"
                              }, [
                                createVNode("i", { class: "iconfont icon-comment" }),
                                createVNode("span", null, toDisplayString(tweet.commentCount), 1)
                              ])) : createCommentVNode("", true),
                              Number.isInteger(tweet.favoriteCount) ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "item like"
                              }, [
                                createVNode("i", { class: "iconfont icon-heart" }),
                                createVNode("span", null, toDisplayString(tweet.favoriteCount), 1)
                              ])) : createCommentVNode("", true),
                              tweet.date ? (openBlock(), createBlock("span", {
                                key: 2,
                                class: "item date"
                              }, [
                                createVNode("i", { class: "iconfont icon-clock" }),
                                createVNode(_component_udate, {
                                  to: "ago",
                                  date: tweet.date
                                }, null, 8, ["date"])
                              ])) : createCommentVNode("", true),
                              tweet.location ? (openBlock(), createBlock("span", {
                                key: 3,
                                class: "item location",
                                title: tweet.location
                              }, [
                                createVNode("i", { class: "iconfont icon-location" }),
                                createVNode("span", null, toDisplayString(tweet.location), 1)
                              ], 8, ["title"])) : createCommentVNode("", true)
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
              _push2(`<!---->`);
            }
            _push2(`<div class="navigation" data-v-e3da4504${_scopeId}><button class="button prev"${ssrIncludeBooleanAttr(activeIndex.value === 0) ? " disabled" : ""} data-v-e3da4504${_scopeId}><i class="iconfont icon-totop" data-v-e3da4504${_scopeId}></i></button><button class="button next"${ssrIncludeBooleanAttr(!!_ctx.aggregate && activeIndex.value === ((_c = _ctx.aggregate) == null ? void 0 : _c.tweets.length) - 1) ? " disabled" : ""} data-v-e3da4504${_scopeId}><i class="iconfont icon-tobottom" data-v-e3da4504${_scopeId}></i></button></div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "twitter-content",
                key: "content"
              }, [
                ((_d = _ctx.aggregate) == null ? void 0 : _d.userinfo) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "userinfo",
                  title: _ctx.aggregate.userinfo.name
                }, [
                  createVNode(_component_ulink, {
                    class: "link",
                    href: unref(VALUABLE_LINKS).TWITTER,
                    onMousedown: ($event) => handleGtagEvent("twitter_homepage")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_uimage, {
                        class: "avatar",
                        proxy: "",
                        src: _ctx.aggregate.userinfo.avatar
                      }, null, 8, ["src"]),
                      createVNode("span", { class: "logo" }, [
                        createVNode("i", { class: "iconfont icon-twitter" })
                      ])
                    ]),
                    _: 1
                  }, 8, ["href", "onMousedown"]),
                  createVNode("div", { class: "count" }, [
                    createVNode("p", { class: "title" }, [
                      _ctx.aggregate.userinfo.tweetCount ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(unref(padStart)(unref(numberSplit)(_ctx.aggregate.userinfo.tweetCount), 3, "0")), 1)
                      ], 64)) : (openBlock(), createBlock(_component_i18n, {
                        key: 1,
                        en: "Latest",
                        zh: "碎碎"
                      }))
                    ]),
                    createVNode("p", { class: "secondary" }, [
                      createVNode(_component_i18n, {
                        en: "tweets",
                        zh: _ctx.aggregate.userinfo.tweetCount ? "碎碎念" : "念念"
                      }, null, 8, ["zh"])
                    ])
                  ])
                ], 8, ["title"])) : createCommentVNode("", true),
                ((_e = _ctx.aggregate) == null ? void 0 : _e.tweets.length) ? (openBlock(), createBlock(unref(Swiper$1), {
                  key: 1,
                  class: "tweets",
                  direction: "vertical",
                  height: 66,
                  mousewheel: true,
                  "allow-touch-move": false,
                  "slides-per-view": 1,
                  "prevent-clicks": false,
                  autoplay: { delay: 3500, disableOnInteraction: false },
                  onTransitionStart: handleSwiperTransitionStart,
                  onSwiper: handleSwiperReady
                }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.aggregate.tweets, (tweet, index) => {
                      return openBlock(), createBlock(unref(SwiperSlide), {
                        class: "tweet-item",
                        key: index
                      }, {
                        default: withCtx(() => [
                          createVNode("div", {
                            class: "content",
                            title: tweet.text
                          }, [
                            tweet.text ? (openBlock(), createBlock("div", {
                              key: 0,
                              innerHTML: unref(unescape)(tweet.text),
                              class: ["main", { "has-media": tweet.mediaCount }]
                            }, null, 10, ["innerHTML"])) : createCommentVNode("", true),
                            tweet.mediaCount ? (openBlock(), createBlock(_component_ulink, {
                              key: 1,
                              class: ["medias", { empty: !tweet.text }],
                              href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                              onMousedown: ($event) => handleGtagEvent("twitter_image_link")
                            }, {
                              default: withCtx(() => [
                                tweet.hasVideo ? (openBlock(), createBlock("i", {
                                  key: 0,
                                  class: "iconfont media icon-video"
                                })) : tweet.hasImage ? (openBlock(), createBlock("i", {
                                  key: 1,
                                  class: "iconfont media icon-image"
                                })) : createCommentVNode("", true),
                                createVNode("span", { class: "count" }, "[" + toDisplayString(tweet.mediaCount) + "]", 1),
                                createVNode("i", { class: "iconfont window icon-new-window-s" })
                              ]),
                              _: 2
                            }, 1032, ["class", "href", "onMousedown"])) : createCommentVNode("", true)
                          ], 8, ["title"]),
                          createVNode("div", { class: "meta" }, [
                            createVNode(_component_ulink, {
                              class: "item link",
                              title: "To Tweet",
                              href: unref(getTwitterTweetDetailURL)(tweet.owner, tweet.id),
                              onMousedown: ($event) => handleGtagEvent("twitter_detail_link")
                            }, {
                              default: withCtx(() => [
                                tweet.isQuote || tweet.isRetweet ? (openBlock(), createBlock("i", {
                                  key: 0,
                                  class: "iconfont icon-retweet"
                                })) : tweet.isReply ? (openBlock(), createBlock("i", {
                                  key: 1,
                                  class: "iconfont icon-follow-up"
                                })) : (openBlock(), createBlock("i", {
                                  key: 2,
                                  class: "iconfont twitter icon-twitter"
                                })),
                                createVNode("span", null, "Tweet"),
                                createVNode("i", { class: "iconfont window icon-new-window-s" })
                              ]),
                              _: 2
                            }, 1032, ["href", "onMousedown"]),
                            tweet.commentCount ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "item reply"
                            }, [
                              createVNode("i", { class: "iconfont icon-comment" }),
                              createVNode("span", null, toDisplayString(tweet.commentCount), 1)
                            ])) : createCommentVNode("", true),
                            Number.isInteger(tweet.favoriteCount) ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: "item like"
                            }, [
                              createVNode("i", { class: "iconfont icon-heart" }),
                              createVNode("span", null, toDisplayString(tweet.favoriteCount), 1)
                            ])) : createCommentVNode("", true),
                            tweet.date ? (openBlock(), createBlock("span", {
                              key: 2,
                              class: "item date"
                            }, [
                              createVNode("i", { class: "iconfont icon-clock" }),
                              createVNode(_component_udate, {
                                to: "ago",
                                date: tweet.date
                              }, null, 8, ["date"])
                            ])) : createCommentVNode("", true),
                            tweet.location ? (openBlock(), createBlock("span", {
                              key: 3,
                              class: "item location",
                              title: tweet.location
                            }, [
                              createVNode("i", { class: "iconfont icon-location" }),
                              createVNode("span", null, toDisplayString(tweet.location), 1)
                            ], 8, ["title"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode("div", { class: "navigation" }, [
                  createVNode("button", {
                    class: "button prev",
                    disabled: activeIndex.value === 0,
                    onClick: prevSlide
                  }, [
                    createVNode("i", { class: "iconfont icon-totop" })
                  ], 8, ["disabled"]),
                  createVNode("button", {
                    class: "button next",
                    disabled: !!_ctx.aggregate && activeIndex.value === ((_f = _ctx.aggregate) == null ? void 0 : _f.tweets.length) - 1,
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
const twitter_vue_vue_type_style_index_0_scoped_e3da4504_lang = "";
const _sfc_setup$1B = _sfc_main$1B.setup;
_sfc_main$1B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/twitter.vue");
  return _sfc_setup$1B ? _sfc_setup$1B(props, ctx) : void 0;
};
const Twitter = /* @__PURE__ */ _export_sfc(_sfc_main$1B, [["__scopeId", "data-v-e3da4504"]]);
const _sfc_main$1A = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { seoMeta, i18n: _i18n, isZhLang } = useEnhancer();
    const { appOption, articleList: articleListStore, twitter: twitterStore } = useStores();
    seoMeta(() => {
      var _a;
      return {
        title: `${META.title} - ${_i18n.t(LanguageKey.APP_SLOGAN).replaceAll("，", " ")}`,
        description: isZhLang.value ? META.zh_description : META.en_description,
        keywords: (_a = appOption.data) == null ? void 0 : _a.keywords.join(",")
      };
    });
    const loadmoreArticles = async () => {
      const targetPage = articleListStore.pagination.current_page + 1;
      await articleListStore.fetch({ page: targetPage });
    };
    useUniversalFetch(() => {
      return Promise.all([articleListStore.fetch(), twitterStore.fetch().catch(() => {
      })]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index-page" }, _attrs))} data-v-648d28c5>`);
      _push(ssrRenderComponent(Carrousel, {
        class: "carrousel",
        articles: unref(articleListStore).data,
        fetching: unref(articleListStore).fetching
      }, null, _parent));
      _push(ssrRenderComponent(Twitter, {
        class: "twitter",
        aggregate: unref(twitterStore).data,
        fetching: unref(twitterStore).fetching || unref(articleListStore).fetching
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
const index_vue_vue_type_style_index_0_scoped_648d28c5_lang = "";
const _sfc_setup$1A = _sfc_main$1A.setup;
_sfc_main$1A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/index.vue");
  return _sfc_setup$1A ? _sfc_setup$1A(props, ctx) : void 0;
};
const IndexFlowPage = /* @__PURE__ */ _export_sfc(_sfc_main$1A, [["__scopeId", "data-v-648d28c5"]]);
const _sfc_main$1z = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  props: {
    icon: {},
    backgroundColor: {},
    backgroundImage: {}
  },
  setup(__props) {
    const cdnDomain = useCDNDomain();
    const defaultImage = getAssetURL(cdnDomain, "/images/thumbnail/carrousel.jpg");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-1aa1d3cd><div class="background" style="${ssrRenderStyle({
        backgroundColor: _ctx.backgroundColor,
        backgroundImage: `url(${_ctx.backgroundImage ?? unref(defaultImage)})`
      })}" data-v-1aa1d3cd></div><div class="content" data-v-1aa1d3cd><div class="logo" data-v-1aa1d3cd><i class="${ssrRenderClass([_ctx.icon, "iconfont"])}" data-v-1aa1d3cd></i></div><div class="title" data-v-1aa1d3cd><div class="text" data-v-1aa1d3cd>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div></div>`);
    };
  }
});
const header_vue_vue_type_style_index_0_scoped_1aa1d3cd_lang = "";
const _sfc_setup$1z = _sfc_main$1z.setup;
_sfc_main$1z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/flow/desktop/header.vue");
  return _sfc_setup$1z ? _sfc_setup$1z(props, ctx) : void 0;
};
const ArticleListHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1z, [["__scopeId", "data-v-1aa1d3cd"]]);
const _sfc_main$1y = /* @__PURE__ */ defineComponent({
  __name: "category",
  __ssrInlineRender: true,
  props: {
    categorySlug: {}
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, seoMeta, isZhLang } = useEnhancer();
    const { articleList: articleListStore, category: categoryStore } = useStores();
    const currentCategory = computed(() => {
      return categoryStore.data.find((category) => category.slug === props.categorySlug);
    });
    const currentCategoryIcon = computed(() => {
      var _a;
      return getExtendValue(((_a = currentCategory.value) == null ? void 0 : _a.extends) || [], "icon") || "icon-category";
    });
    const currentCategoryImage = computed(() => {
      var _a;
      return getExtendValue(((_a = currentCategory.value) == null ? void 0 : _a.extends) || [], "background");
    });
    const currentCategoryColor = computed(() => {
      var _a;
      return getExtendValue(((_a = currentCategory.value) == null ? void 0 : _a.extends) || [], "bgcolor");
    });
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        category_slug: props.categorySlug,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    seoMeta(() => {
      var _a;
      const enTitle = firstUpperCase(props.categorySlug);
      const zhTitle = _i18n.t(props.categorySlug);
      const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle];
      const description = ((_a = currentCategory.value) == null ? void 0 : _a.description) || titles.join(",");
      return {
        pageTitle: titles.join(" | "),
        description,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-flow-page" }, _attrs))} data-v-694c54f7>`);
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
                    _push3(`<span data-v-694c54f7${_scopeId2}>${ssrInterpolate(currentCategory.value.name)}</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-694c54f7${_scopeId2}>${ssrInterpolate(currentCategory.value.description || "...")}</span>`);
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
                    _push3(`<span data-v-694c54f7${_scopeId2}>Category</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-694c54f7${_scopeId2}>${ssrInterpolate(unref(firstUpperCase)(currentCategory.value.slug))}</span>`);
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
const category_vue_vue_type_style_index_0_scoped_694c54f7_lang = "";
const _sfc_setup$1y = _sfc_main$1y.setup;
_sfc_main$1y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/category.vue");
  return _sfc_setup$1y ? _sfc_setup$1y(props, ctx) : void 0;
};
const CategoryFlowPage = /* @__PURE__ */ _export_sfc(_sfc_main$1y, [["__scopeId", "data-v-694c54f7"]]);
const _sfc_main$1x = /* @__PURE__ */ defineComponent({
  __name: "tag",
  __ssrInlineRender: true,
  props: {
    tagSlug: {}
  },
  setup(__props) {
    const props = __props;
    const { seoMeta, isZhLang } = useEnhancer();
    const articleListStore = useArticleListStore();
    const tagStore = useTagStore();
    const currentTag = computed(() => tagStore.data.find((tag) => tag.slug === props.tagSlug));
    const currentTagIcon = computed(() => {
      var _a;
      return getExtendValue(((_a = currentTag.value) == null ? void 0 : _a.extends) || [], "icon") || "icon-tag";
    });
    const currentTagImage = computed(() => {
      var _a;
      return getExtendValue(((_a = currentTag.value) == null ? void 0 : _a.extends) || [], "background");
    });
    const currentTagColor = computed(() => {
      var _a;
      return getExtendValue(((_a = currentTag.value) == null ? void 0 : _a.extends) || [], "bgcolor");
    });
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        tag_slug: props.tagSlug,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    seoMeta(() => {
      var _a, _b;
      const enTitle = firstUpperCase(props.tagSlug);
      const zhTitle = (_a = currentTag.value) == null ? void 0 : _a.name;
      const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, "Tag"];
      const description = ((_b = currentTag.value) == null ? void 0 : _b.description) || titles.join(",");
      return {
        pageTitle: titles.join(" | "),
        description
      };
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tag-flow-page" }, _attrs))} data-v-db42cf1e>`);
      _push(ssrRenderComponent(ArticleListHeader, {
        "background-color": currentTagColor.value,
        "background-image": currentTagImage.value,
        icon: currentTagIcon.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (currentTag.value) {
              _push2(`<span class="header" data-v-db42cf1e${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, null, {
                zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-db42cf1e${_scopeId2}>#${ssrInterpolate(currentTag.value.name)}</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-db42cf1e${_scopeId2}>${ssrInterpolate(currentTag.value.description || "...")}</span>`);
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
                    _push3(`<span data-v-db42cf1e${_scopeId2}>Tag</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-db42cf1e${_scopeId2}>#${ssrInterpolate(unref(getTagEnName)(currentTag.value))}</span>`);
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
const tag_vue_vue_type_style_index_0_scoped_db42cf1e_lang = "";
const _sfc_setup$1x = _sfc_main$1x.setup;
_sfc_main$1x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tag.vue");
  return _sfc_setup$1x ? _sfc_setup$1x(props, ctx) : void 0;
};
const TagFlowPage = /* @__PURE__ */ _export_sfc(_sfc_main$1x, [["__scopeId", "data-v-db42cf1e"]]);
const _sfc_main$1w = /* @__PURE__ */ defineComponent({
  __name: "date",
  __ssrInlineRender: true,
  props: {
    date: {}
  },
  setup(__props) {
    const props = __props;
    const { seoMeta } = useEnhancer();
    const { articleList: articleListStore } = useStores();
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        date: props.date,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    seoMeta(() => ({
      pageTitle: `${props.date} | Date`,
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
const _sfc_setup$1w = _sfc_main$1w.setup;
_sfc_main$1w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/date.vue");
  return _sfc_setup$1w ? _sfc_setup$1w(props, ctx) : void 0;
};
const _sfc_main$1v = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  props: {
    keyword: {}
  },
  setup(__props) {
    const props = __props;
    const { seoMeta } = useEnhancer();
    const articleListStore = useArticleListStore();
    const loadmoreArticles = async () => {
      await articleListStore.fetch({
        keyword: props.keyword,
        page: articleListStore.pagination.current_page + 1
      });
      scrollToNextScreen();
    };
    seoMeta(() => ({
      pageTitle: `${props.keyword} | Search`,
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
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/search.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const _sfc_main$1u = /* @__PURE__ */ defineComponent({
  __name: "banner",
  __ssrInlineRender: true,
  props: {
    image: {},
    position: { default: 20 },
    blur: { default: 0 },
    isMobile: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { isDarkTheme, cdnDomain } = useEnhancer();
    const backgroundImage = computed(() => getAssetURL(cdnDomain, props.image));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["banner", { mobile: _ctx.isMobile }]
      }, _attrs))} data-v-8c9ea973><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "background"])}" style="${ssrRenderStyle({ backgroundImage: `url(${backgroundImage.value})`, backgroundPositionY: `${_ctx.position}%` })}" data-v-8c9ea973></div><div class="${ssrRenderClass([{ blur: Boolean(_ctx.blur) }, "content"])}" style="${ssrRenderStyle({ "--blur": `${_ctx.blur}px` })}" data-v-8c9ea973><h2 class="title" data-v-8c9ea973>`);
      ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      _push(`</h2><div class="description" data-v-8c9ea973>`);
      ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const banner_vue_vue_type_style_index_0_scoped_8c9ea973_lang = "";
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/banner.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const PageBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1u, [["__scopeId", "data-v-8c9ea973"]]);
const _sfc_main$1t = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-tree" }, _attrs))} data-v-abe9f2f9><!--[-->`);
      ssrRenderList(props.tree, (node) => {
        _push(`<ul class="month-list" data-v-abe9f2f9><!--[-->`);
        ssrRenderList(node.months, (mn) => {
          _push(`<li class="month" data-v-abe9f2f9>`);
          ssrRenderSlot(_ctx.$slots, "title", {
            title: !unref(isZhLang) ? `${node.year} #${getMonthNameI18n(mn.month).en} (${mn.articles.length})` : `${unref(numberToChinese)(node.year)} #${getMonthNameI18n(mn.month).zh}（${mn.articles.length}）`
          }, null, _push, _parent);
          _push(`<ul class="article-list" data-v-abe9f2f9><!--[-->`);
          ssrRenderList(mn.articles, (article, index) => {
            _push(`<li class="article" data-v-abe9f2f9>`);
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
const tree_vue_vue_type_style_index_0_scoped_abe9f2f9_lang = "";
const _sfc_setup$1t = _sfc_main$1t.setup;
_sfc_main$1t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/tree.vue");
  return _sfc_setup$1t ? _sfc_setup$1t(props, ctx) : void 0;
};
const ArchiveTree = /* @__PURE__ */ _export_sfc(_sfc_main$1t, [["__scopeId", "data-v-abe9f2f9"]]);
const i18ns$1 = {
  title: {
    [Language.Chinese]: "万物之中，希望至美",
    [Language.English]: "Hope is a good thing"
  },
  description: {
    [Language.Chinese]: "至美之物，永不凋零",
    [Language.English]: "Maybe the best of things and no good thing ever dies"
  }
};
const useArchivePageMeta = () => {
  const { i18n, seoMeta, isZhLang } = useEnhancer();
  seoMeta(() => {
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ARCHIVE, Language.English));
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ARCHIVE), enTitle] : [enTitle];
    return {
      pageTitle: titles.join(" | "),
      description: `${META.title} ${isZhLang.value ? "数据归档" : "archives"}`
    };
  });
};
const useArchivePageStatistics = () => {
  const { i18n } = useEnhancer();
  const store = useNodepressStatisticStore();
  const statistics = computed(() => {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
      tags: {
        icon: "icon-quill",
        title: i18n.t(LanguageKey.STATISTIC_TAGS),
        content: numberSplit(((_a = store.data) == null ? void 0 : _a.tags) || 0)
      },
      articles: {
        icon: "icon-quill",
        title: i18n.t(LanguageKey.STATISTIC_ARTICLES),
        content: numberSplit(((_b = store.data) == null ? void 0 : _b.articles) || 0)
      },
      comments: {
        icon: "icon-comment",
        title: i18n.t(LanguageKey.STATISTIC_COMMENTS),
        content: numberSplit(((_c = store.data) == null ? void 0 : _c.comments) || 0)
      },
      todayViews: {
        icon: "icon-eye",
        title: i18n.t(LanguageKey.STATISTIC_TODAY_VIEWS),
        content: numberSplit(((_d = store.data) == null ? void 0 : _d.todayViews) || 0)
      },
      totalViews: {
        icon: "icon-like",
        title: i18n.t(LanguageKey.STATISTIC_TOTAL_VIEWS),
        content: numberSplit(((_e = store.data) == null ? void 0 : _e.totalViews) || 0)
      },
      totalLikes: {
        icon: "icon-like",
        title: i18n.t(LanguageKey.STATISTIC_TOTAL_UPVOTES),
        content: numberSplit(((_f = store.data) == null ? void 0 : _f.totalLikes) || 0)
      },
      averageEmotion: {
        icon: "icon-emoji",
        title: i18n.t(LanguageKey.STATISTIC_AVERAGE_EMOTION),
        content: String(((_g = store.data) == null ? void 0 : _g.averageEmotion) ?? "-")
      }
    };
  });
  return {
    statistics,
    fetch: store.fetch
  };
};
const _sfc_main$1s = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-page" }, _attrs))} data-v-29eec810>`);
      _push(ssrRenderComponent(PageBanner, {
        position: 46,
        image: "/images/page-archive/banner.jpg"
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
      _push(ssrRenderComponent(_component_container, { class: "statistic-warpper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            if (statisticFetching.value) {
              _push2(`<div class="skeletons" data-v-29eec810${_scopeId}><!--[-->`);
              ssrRenderList(statistics.value.length, (s) => {
                _push2(ssrRenderComponent(_component_skeleton_base, {
                  class: "item",
                  key: s
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="statistics" data-v-29eec810${_scopeId}><!--[-->`);
              ssrRenderList(statistics.value, (s, index) => {
                _push2(`<div class="item" data-v-29eec810${_scopeId}><p class="title" data-v-29eec810${_scopeId}><span class="text" data-v-29eec810${_scopeId}>${ssrInterpolate(s.title)}</span><i class="${ssrRenderClass([s.icon, "iconfont"])}" data-v-29eec810${_scopeId}></i></p><div class="content" data-v-29eec810${_scopeId}>${ssrInterpolate(s.content)}</div></div>`);
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
                        createVNode("p", { class: "title" }, [
                          createVNode("span", { class: "text" }, toDisplayString(s.title), 1),
                          createVNode("i", {
                            class: ["iconfont", s.icon]
                          }, null, 2)
                        ]),
                        createVNode("div", { class: "content" }, toDisplayString(s.content), 1)
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
      _push(ssrRenderComponent(_component_container, { class: "archive-warpper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, {
              data: (_a = unref(archiveStore).data) == null ? void 0 : _a.articles.length,
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
                          k: unref(LanguageKey).ARTICLE_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LanguageKey).ARTICLE_PLACEHOLDER
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
                          k: unref(LanguageKey).ARTICLE_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<ul class="archive-skeleton" data-v-29eec810${_scopeId2}><!--[-->`);
                  ssrRenderList(3, (item) => {
                    _push3(`<li class="item" data-v-29eec810${_scopeId2}><!--[-->`);
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
                      (openBlock(), createBlock(Fragment, null, renderList(3, (item) => {
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
                        _push4(`<h1 class="archive-title" data-v-29eec810${_scopeId3}>${ssrInterpolate(title)}</h1>`);
                      } else {
                        return [
                          createVNode("h1", { class: "archive-title" }, toDisplayString(title), 1)
                        ];
                      }
                    }),
                    article: withCtx(({ article, day }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="archive-article" data-v-29eec810${_scopeId3}><div class="left" data-v-29eec810${_scopeId3}><h3 class="title" data-v-29eec810${_scopeId3}><span class="date" data-v-29eec810${_scopeId3}>D${ssrInterpolate(day)}</span><a class="link" target="_blank"${ssrRenderAttr("title", article.title)}${ssrRenderAttr("href", unref(getArticleDetailRoute)(article.id))} data-v-29eec810${_scopeId3}>${ssrInterpolate(article.title)}</a></h3><p class="description" data-v-29eec810${_scopeId3}>${article.description}</p></div><div class="metas" data-v-29eec810${_scopeId3}><div class="item views" data-v-29eec810${_scopeId3}><i class="iconfont icon-eye" data-v-29eec810${_scopeId3}></i><span class="text" data-v-29eec810${_scopeId3}>${ssrInterpolate(unref(numberSplit)(article.meta.views))}</span></div>`);
                        _push4(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent4, _scopeId3));
                        _push4(`<div class="item likes" data-v-29eec810${_scopeId3}><i class="like-icon iconfont icon-like" data-v-29eec810${_scopeId3}></i><span class="text" data-v-29eec810${_scopeId3}>${ssrInterpolate(article.meta.likes)}</span></div>`);
                        _push4(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent4, _scopeId3));
                        _push4(`<div class="item comments" data-v-29eec810${_scopeId3}><i class="iconfont icon-comment" data-v-29eec810${_scopeId3}></i><span class="text" data-v-29eec810${_scopeId3}>${ssrInterpolate(article.meta.comments)}</span></div></div></div>`);
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
                data: (_b = unref(archiveStore).data) == null ? void 0 : _b.articles.length,
                loading: unref(archiveStore).fetching
              }, {
                placeholder: withCtx(() => [
                  createVNode(_component_empty, {
                    class: "archive-empty",
                    key: "empty"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LanguageKey).ARTICLE_PLACEHOLDER
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
const desktop_vue_vue_type_style_index_0_scoped_29eec810_lang = "";
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/desktop.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const DesktopArchivePage = /* @__PURE__ */ _export_sfc(_sfc_main$1s, [["__scopeId", "data-v-29eec810"]]);
const _sfc_main$1r = /* @__PURE__ */ defineComponent({
  __name: "mobile",
  __ssrInlineRender: true,
  setup(__props) {
    const archiveStore = useArchiveStore();
    const statisticState = useArchivePageStatistics();
    const statisticFetching = ref(true);
    const statistics = computed(() => [
      statisticState.statistics.value.articles,
      statisticState.statistics.value.todayViews,
      statisticState.statistics.value.comments,
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
      const _component_i18n = resolveComponent("i18n");
      const _component_container = resolveComponent("container");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-page" }, _attrs))} data-v-dc101e51>`);
      _push(ssrRenderComponent(PageBanner, {
        position: 80,
        "is-mobile": true,
        image: "/images/page-archive/banner-mobile.jpg"
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).PAGE_ARCHIVE
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LanguageKey).PAGE_ARCHIVE
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
      _push(`<div class="page-content" data-v-dc101e51>`);
      _push(ssrRenderComponent(_component_container, { class: "statistic-warpper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(``);
            if (statisticFetching.value) {
              _push2(`<div class="skeletons" data-v-dc101e51${_scopeId}><!--[-->`);
              ssrRenderList(statistics.value.length, (s) => {
                _push2(ssrRenderComponent(_component_skeleton_base, {
                  class: "skeleton",
                  key: s
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="statistics" data-v-dc101e51${_scopeId}><!--[-->`);
              ssrRenderList(statistics.value, (s, index) => {
                _push2(`<div class="item" data-v-dc101e51${_scopeId}><p class="title" data-v-dc101e51${_scopeId}>${ssrInterpolate(s.title)}</p><div class="content" data-v-dc101e51${_scopeId}>${ssrInterpolate(s.content)}</div></div>`);
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
                        class: "skeleton",
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
                        createVNode("p", { class: "title" }, toDisplayString(s.title), 1),
                        createVNode("div", { class: "content" }, toDisplayString(s.content), 1)
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
      _push(ssrRenderComponent(_component_container, { class: "archive-warpper" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, {
              data: (_a = unref(archiveStore).data) == null ? void 0 : _a.articles.length,
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
                          k: unref(LanguageKey).ARTICLE_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LanguageKey).ARTICLE_PLACEHOLDER
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
                          k: unref(LanguageKey).ARTICLE_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="archive-skeleton" data-v-dc101e51${_scopeId2}><!--[-->`);
                  ssrRenderList(6, (s) => {
                    _push3(ssrRenderComponent(_component_skeleton_line, {
                      class: "item",
                      key: s
                    }, null, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "archive-skeleton",
                      key: "skeleton"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(6, (s) => {
                        return createVNode(_component_skeleton_line, {
                          class: "item",
                          key: s
                        });
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
                        _push4(`<h3 class="archive-title" data-v-dc101e51${_scopeId3}>${ssrInterpolate(title)}</h3>`);
                      } else {
                        return [
                          createVNode("h3", { class: "archive-title" }, toDisplayString(title), 1)
                        ];
                      }
                    }),
                    article: withCtx(({ article, day }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="archive-article" data-v-dc101e51${_scopeId3}><h4 class="title" data-v-dc101e51${_scopeId3}><span class="date" data-v-dc101e51${_scopeId3}>D${ssrInterpolate(day)}</span><a class="link" target="_blank"${ssrRenderAttr("title", article.title)}${ssrRenderAttr("href", unref(getArticleDetailRoute)(article.id))} data-v-dc101e51${_scopeId3}>${ssrInterpolate(article.title)}</a></h4><p class="description" data-v-dc101e51${_scopeId3}>${article.description}</p></div>`);
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
                data: (_b = unref(archiveStore).data) == null ? void 0 : _b.articles.length,
                loading: unref(archiveStore).fetching
              }, {
                placeholder: withCtx(() => [
                  createVNode(_component_empty, {
                    class: "archive-empty",
                    key: "empty"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LanguageKey).ARTICLE_PLACEHOLDER
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ]),
                loading: withCtx(() => [
                  createVNode("div", {
                    class: "archive-skeleton",
                    key: "skeleton"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(6, (s) => {
                      return createVNode(_component_skeleton_line, {
                        class: "item",
                        key: s
                      });
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
const mobile_vue_vue_type_style_index_0_scoped_dc101e51_lang = "";
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/mobile.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const MobileArchivePage = /* @__PURE__ */ _export_sfc(_sfc_main$1r, [["__scopeId", "data-v-dc101e51"]]);
const useChatGPTStore = defineStore("chatgpt", () => {
  return useFetchStore({
    data: null,
    preclean: true,
    fetcher(shareId) {
      return tunnel$1.dispatch(TunnelModule.ChatGPT, { id: shareId });
    }
  });
});
async function renderTextToQRCodeDataURL(value, options) {
  return await QRCode.toDataURL(value, {
    errorCorrectionLevel: "H",
    type: "image/jpeg",
    width: 260,
    ...options
  });
}
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
const openWindow = (targetURL, options = {}) => {
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
    _window == null ? void 0 : _window.focus();
    return _window;
  }
};
var SocialMedia = /* @__PURE__ */ ((SocialMedia2) => {
  SocialMedia2["Wechat"] = "wechat";
  SocialMedia2["Weibo"] = "weibo";
  SocialMedia2["Twitter"] = "twitter";
  SocialMedia2["douban"] = "douban";
  SocialMedia2["Evernote"] = "evernote";
  SocialMedia2["Facebook"] = "facebook";
  SocialMedia2["LinkedIn"] = "linkedin";
  return SocialMedia2;
})(SocialMedia || {});
const _sfc_main$1q = /* @__PURE__ */ defineComponent({
  __name: "share",
  __ssrInlineRender: true,
  props: {
    socials: {}
  },
  setup(__props) {
    const props = __props;
    const defaultSocials = [
      {
        id: "wechat",
        name: "微信",
        class: "wechat",
        handler: async (params) => {
          const dataURL = await renderTextToQRCodeDataURL(params.url);
          window.$popup.vImage(dataURL);
        }
      },
      {
        id: "weibo",
        name: "微博",
        class: "weibo",
        url: (params) => {
          return `https://service.weibo.com/share/share.php?` + qs.stringify({
            url: params.url,
            source: params.url,
            sourceUrl: params.url,
            title: params.title,
            content: params.description
          });
        }
      },
      {
        id: "twitter",
        name: "Twitter",
        class: "twitter",
        url: (params) => {
          return `https://twitter.com/share?` + qs.stringify({
            url: params.url,
            text: params.title
          });
        }
      },
      {
        id: "facebook",
        name: "Facebook",
        class: "facebook",
        url: (params) => {
          return `https://www.facebook.com/share.php?` + qs.stringify({
            u: encodeURI(params.url)
          });
        }
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        class: "linkedin",
        url: (params) => {
          return `https://www.linkedin.com/sharing/share-offsite/?` + qs.stringify({
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
            `https://www.douban.com/share/service?` + qs.stringify({
              href: params.url,
              name: params.title
              // image: '',
              // updated: '',
              // bm: ''
            })
          );
        }
      },
      {
        id: "evernote",
        name: "Evernote",
        class: "evernote",
        url: (params) => {
          return `https://www.evernote.com/clip.action?` + qs.stringify({
            url: params.url,
            title: params.title
          });
        }
      }
    ];
    useEnhancer();
    const enabledSocials = computed(() => {
      var _a;
      return ((_a = props.socials) == null ? void 0 : _a.length) ? defaultSocials.filter((s) => {
        var _a2;
        return (_a2 = props.socials) == null ? void 0 : _a2.includes(s.id);
      }) : defaultSocials;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "share" }, _attrs))} data-v-f9ac03a7><!--[-->`);
      ssrRenderList(enabledSocials.value, (social, index) => {
        _push(`<button${ssrRenderAttr("title", "Share to: " + social.name)} class="${ssrRenderClass([social.class, "share-ejector"])}" data-v-f9ac03a7><i class="${ssrRenderClass([`icon-${social.class}`, "iconfont"])}" data-v-f9ac03a7></i></button>`);
      });
      _push(`<!--]--><button class="share-ejector link" title="Copy link" data-v-f9ac03a7><i class="iconfont icon-link" data-v-f9ac03a7></i></button></div>`);
    };
  }
});
const share_vue_vue_type_style_index_0_scoped_f9ac03a7_lang = "";
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/share.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const Share = /* @__PURE__ */ _export_sfc(_sfc_main$1q, [["__scopeId", "data-v-f9ac03a7"]]);
const getChatGPTShareURL = (shareId) => {
  return `https://chat.openai.com/share/${shareId}`;
};
const EMOJIS = [
  ...["😃", "😂", "😅", "😉", "😌", "😔", "😓", "😢", "😍", "😘", "😜", "😡"],
  ...["😤", "😭", "😱", "😳", "😵", "🌚"],
  ...["🙏", "👆", "👇", "👌", "🤘", "👍", "👎", "💪", "👏"],
  ...["🌻", "🌹", "💊", "🐶", "❤️‍🔥", "💔", "💩", "👻", "🚩"]
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
      emoji: getAssetURL(useCDNDomain(), "/images/emojis/haha.png")
    });
  } else if (SIX_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      speed: 12,
      staggered: true,
      increaseSpeed: 0.4,
      emoji: getAssetURL(useCDNDomain(), "/images/emojis/666.png")
    });
  } else if (HEHE_KEYWORDS.find((keyword) => content.includes(keyword))) {
    luanchRain({
      staggered: false,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getAssetURL(useCDNDomain(), "/images/emojis/hehe.png")
    });
  } else if (Math.random() <= 0.5) {
    luanchRain({
      scale: 0.6,
      staggered: true,
      speed: 8,
      increaseSpeed: 0.04,
      emoji: getAssetURL(useCDNDomain(), "/images/emojis/doge.png")
    });
  }
};
const _sfc_main$1p = /* @__PURE__ */ defineComponent({
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
  setup(__props, { emit }) {
    const props = __props;
    const { gtag } = useEnhancer();
    const identity = useIdentityStore();
    const user = computed(() => identity.user);
    const statisticsText = computed(() => {
      return props.loading ? `···` : `${props.loaded} / ${props.total}`;
    });
    const disqusThreadMap = /* @__PURE__ */ new Map();
    const handleDisqusThread = async () => {
      gtag == null ? void 0 : gtag.event("disqus_thread_page", {
        event_category: GAEventCategories.Comment,
        event_label: `id: ${props.postId}`
      });
      if (!disqusThreadMap.has(props.postId)) {
        const response = await nodepress$1.get("/disqus/thread", {
          params: { post_id: props.postId }
        });
        disqusThreadMap.set(props.postId, response.result);
      }
      const forum = identity.disqusConfig.forum;
      const slug = disqusThreadMap.get(props.postId).slug;
      window.open(`https://disqus.com/home/discussion/${forum}/${slug}/`);
    };
    const handleSort = (target) => {
      gtag == null ? void 0 : gtag.event("comment_sort_switch", {
        event_category: GAEventCategories.Comment
      });
      const value = Number(target == null ? void 0 : target.value);
      if (value !== props.sort) {
        emit(CommentEvents.Sort, value);
      }
    };
    const handleDisqusLogin = () => {
      gtag == null ? void 0 : gtag.event("disqus_login", {
        event_category: GAEventCategories.Comment,
        event_label: `id: ${props.postId}`
      });
      openWindow(identity.disqusConfig.authorize_url, {
        name: `Disqus Auth ${META.title}`,
        onClose: () => {
          identity.fetchDisqusUserInfo();
          console.info("[disqus]", "logined", toRaw(identity.user));
        }
      });
    };
    const handleDisqusLogout = () => {
      identity.fetchDisqusLogout();
      console.log("[disqus]", "logout");
      gtag == null ? void 0 : gtag.event("disqus_logout", {
        event_category: GAEventCategories.Comment,
        event_label: `id: ${props.postId}`
      });
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
            _push2(`<div class="topbar-skeleton" data-v-8616ee63${_scopeId}><div class="left" data-v-8616ee63${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_line, { class: "skeleton-item count" }, null, _parent2, _scopeId));
            if (!_ctx.plain) {
              _push2(ssrRenderComponent(_component_skeleton_line, { class: "skeleton-item sort" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="right" data-v-8616ee63${_scopeId}>`);
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
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{ plain: _ctx.plain }, "topbar"])}" data-v-8616ee63${_scopeId}><div class="statistics" data-v-8616ee63${_scopeId}><div class="${ssrRenderClass([{ loading: _ctx.loading }, "total"])}" data-v-8616ee63${_scopeId}><i class="iconfont icon-discussion" data-v-8616ee63${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` 共 <span class="count" data-v-8616ee63${_scopeId2}>${ssrInterpolate(statisticsText.value)}</span> 条看法 `);
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
                  _push3(`<span class="count" data-v-8616ee63${_scopeId2}>${ssrInterpolate(statisticsText.value)}</span> comments `);
                } else {
                  return [
                    createVNode("span", { class: "count" }, toDisplayString(statisticsText.value), 1),
                    createTextVNode(" comments ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><select class="sort" name="sort"${ssrRenderAttr("value", _ctx.sort)} data-v-8616ee63${_scopeId}><option${ssrRenderAttr("value", unref(SortType).Desc)} data-v-8616ee63${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).COMMENT_SORT_NEW
            }, null, _parent2, _scopeId));
            _push2(`</option><option${ssrRenderAttr("value", unref(SortType).Hottest)} data-v-8616ee63${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).COMMENT_SORT_HOT
            }, null, _parent2, _scopeId));
            _push2(`</option><option${ssrRenderAttr("value", unref(SortType).Asc)} data-v-8616ee63${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).COMMENT_SORT_OLD
            }, null, _parent2, _scopeId));
            _push2(`</option></select><button class="disqus" data-v-8616ee63${_scopeId}><i class="iconfont icon-disqus-logo" data-v-8616ee63${_scopeId}></i></button>`);
            ssrRenderSlot(_ctx.$slots, "extra", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div class="user" data-v-8616ee63${_scopeId}>`);
            if (user.value.type === unref(UserType).Null) {
              _push2(`<div class="unlogin" data-v-8616ee63${_scopeId}><span class="guest" data-v-8616ee63${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                zh: "访客身份",
                en: "Guest"
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
              _push2(ssrRenderComponent(_component_divider, {
                type: "vertical",
                size: "sm"
              }, null, _parent2, _scopeId));
              _push2(`<button class="disqus" data-v-8616ee63${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, null, {
                zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`使用<i class="iconfont icon-disqus" data-v-8616ee63${_scopeId2}></i>登录`);
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
                    _push3(`Login by<i class="iconfont icon-disqus right" data-v-8616ee63${_scopeId2}></i>`);
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
              _push2(`<div class="logined" data-v-8616ee63${_scopeId}>`);
              if (user.value.type === unref(UserType).Local) {
                _push2(`<!--[--><div class="name" data-v-8616ee63${_scopeId}><i class="icon guest iconfont icon-user" data-v-8616ee63${_scopeId}></i><span class="text" data-v-8616ee63${_scopeId}>${ssrInterpolate(((_a = user.value.localProfile) == null ? void 0 : _a.name) || "")}</span><i class="arrow iconfont icon-down-arrow" data-v-8616ee63${_scopeId}></i></div><div class="user-menu" data-v-8616ee63${_scopeId}><ul class="menus" data-v-8616ee63${_scopeId}><li class="item" data-v-8616ee63${_scopeId}><button class="button" data-v-8616ee63${_scopeId}>`);
                _push2(ssrRenderComponent(_component_i18n, null, {
                  zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`换为<i class="iconfont icon-disqus disqus" data-v-8616ee63${_scopeId2}></i>登录`);
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
                      _push3(`Login by <i class="iconfont icon-disqus disqus" data-v-8616ee63${_scopeId2}></i>`);
                    } else {
                      return [
                        createTextVNode("Login by "),
                        createVNode("i", { class: "iconfont icon-disqus disqus" })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</button></li><li class="item" data-v-8616ee63${_scopeId}><button class="button" data-v-8616ee63${_scopeId}>`);
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: "退出本地访客身份",
                  en: "Clean local profile"
                }, null, _parent2, _scopeId));
                _push2(`</button></li></ul></div><!--]-->`);
              } else if (user.value.type === unref(UserType).Disqus) {
                _push2(`<!--[--><div class="name" data-v-8616ee63${_scopeId}><i class="icon disqus iconfont icon-disqus-logo" data-v-8616ee63${_scopeId}></i><span class="text" data-v-8616ee63${_scopeId}>${ssrInterpolate(((_b = user.value.disqusProfile) == null ? void 0 : _b.name) || "")}</span><i class="arrow iconfont icon-down-arrow" data-v-8616ee63${_scopeId}></i></div><div class="user-menu" data-v-8616ee63${_scopeId}><ul class="menus" data-v-8616ee63${_scopeId}><li class="item" data-v-8616ee63${_scopeId}>`);
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
                _push2(`</li><li class="item" data-v-8616ee63${_scopeId}><button class="button" data-v-8616ee63${_scopeId}>`);
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
                  createVNode("select", {
                    class: "sort",
                    name: "sort",
                    value: _ctx.sort,
                    onChange: ($event) => handleSort($event.target)
                  }, [
                    createVNode("option", {
                      value: unref(SortType).Desc
                    }, [
                      createVNode(_component_i18n, {
                        k: unref(LanguageKey).COMMENT_SORT_NEW
                      }, null, 8, ["k"])
                    ], 8, ["value"]),
                    createVNode("option", {
                      value: unref(SortType).Hottest
                    }, [
                      createVNode(_component_i18n, {
                        k: unref(LanguageKey).COMMENT_SORT_HOT
                      }, null, 8, ["k"])
                    ], 8, ["value"]),
                    createVNode("option", {
                      value: unref(SortType).Asc
                    }, [
                      createVNode(_component_i18n, {
                        k: unref(LanguageKey).COMMENT_SORT_OLD
                      }, null, 8, ["k"])
                    ], 8, ["value"])
                  ], 40, ["value", "onChange"]),
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
                        createVNode("span", { class: "text" }, toDisplayString(((_c = user.value.localProfile) == null ? void 0 : _c.name) || ""), 1),
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
                        createVNode("span", { class: "text" }, toDisplayString(((_d = user.value.disqusProfile) == null ? void 0 : _d.name) || ""), 1),
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
const topbar_vue_vue_type_style_index_0_scoped_8616ee63_lang = "";
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/topbar.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
const CommentTopbar = /* @__PURE__ */ _export_sfc(_sfc_main$1p, [["__scopeId", "data-v-8616ee63"]]);
const _sfc_main$1o = /* @__PURE__ */ defineComponent({
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
            _push2(`<ul class="main-skeleton" data-v-1de2c897${_scopeId}><!--[-->`);
            ssrRenderList(_ctx.skeletonCount, (item) => {
              _push2(`<li class="item" data-v-1de2c897${_scopeId}><div class="avatar" data-v-1de2c897${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
              _push2(`</div><div class="content" data-v-1de2c897${_scopeId}>`);
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
            _push2(`<div class="list-empty" data-v-1de2c897${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).COMMENT_LIST_EMPTY
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "list-empty" }, [
                createVNode(_component_i18n, {
                  k: unref(LanguageKey).COMMENT_LIST_EMPTY
                }, null, 8, ["k"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="main" data-v-1de2c897${_scopeId}>`);
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
const main_vue_vue_type_style_index_0_scoped_1de2c897_lang = "";
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/main.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const CommentMain = /* @__PURE__ */ _export_sfc(_sfc_main$1o, [["__scopeId", "data-v-1de2c897"]]);
const DEFAULT_AVATAR = "/images/gravatar.png";
const getGravatarByHash = (hash) => {
  return `https://www.gravatar.com/avatar/${hash}`;
};
const getDisqusAvatarByUsername = (username) => {
  return `https://disqus.com/api/users/avatars/${username}.jpg`;
};
const _sfc_main$1n = /* @__PURE__ */ defineComponent({
  __name: "markdown",
  __ssrInlineRender: true,
  props: {
    markdown: {},
    html: {},
    sanitize: { type: Boolean },
    plain: { type: Boolean },
    compact: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { element } = useLozad();
    const { isDarkTheme } = useEnhancer();
    const markdownHTML = computed(() => {
      if (!props.markdown) {
        return props.html || "";
      }
      return markdownToHTML(props.markdown, {
        sanitize: props.sanitize
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "element",
        ref: element,
        class: [_ctx.plain ? "global-markdown-plain" : "global-markdown-html", { compact: _ctx.compact, dark: unref(isDarkTheme) }]
      }, _attrs))}>${markdownHTML.value}</section>`);
    };
  }
});
const markdown_vue_vue_type_style_index_0_lang = "";
const _sfc_setup$1n = _sfc_main$1n.setup;
_sfc_main$1n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/markdown.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const _sfc_main$1m = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/link.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const OFFSET = 127397;
const countryCodeToEmoji = (countryCode) => {
  return countryCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET));
};
const _sfc_main$1l = /* @__PURE__ */ defineComponent({
  __name: "location",
  __ssrInlineRender: true,
  props: {
    location: {}
  },
  setup(__props) {
    const props = __props;
    const municipalitys = ["Shanghai", "Beijing", "Tianjin", "Chongqing", "Chungking"];
    const countryText = computed(() => props.location.country_code || props.location.country);
    const emojiText = computed(() => countryCodeToEmoji(props.location.country_code));
    const cityText = computed(() => {
      if (props.location.country_code === "CN") {
        if (municipalitys.includes(props.location.region)) {
          return props.location.region;
        }
      }
      return props.location.city;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "location" }, _attrs))} data-v-40674707>`);
      if (emojiText.value) {
        _push(`<span class="emoji" data-v-40674707>${ssrInterpolate(emojiText.value)}</span>`);
      } else {
        _push(`<i class="iconfont icon-earth" data-v-40674707></i>`);
      }
      _push(`<span data-v-40674707>${ssrInterpolate(countryText.value)}</span><span class="separator" data-v-40674707>•</span><span class="city" data-v-40674707>${ssrInterpolate(cityText.value)}</span></span>`);
    };
  }
});
const location_vue_vue_type_style_index_0_scoped_40674707_lang = "";
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/location.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const CommentLocation = /* @__PURE__ */ _export_sfc(_sfc_main$1l, [["__scopeId", "data-v-40674707"]]);
const _sfc_main$1k = /* @__PURE__ */ defineComponent({
  __name: "user-agent",
  __ssrInlineRender: true,
  props: {
    userAgent: {}
  },
  setup(__props) {
    const props = __props;
    const osIconsNameMap = {
      "Mac OS": "icon-apple",
      Windows: "icon-windows",
      Android: "icon-android",
      Ubuntu: "icon-ubuntu",
      Linux: "icon-linux",
      iOS: "icon-apple"
    };
    const browersIconsNameMap = {
      Chrome: "icon-chrome",
      Chromium: "icon-chrome",
      WeChat: "icon-wechat",
      QQ: "icon-qq",
      Safari: "icon-safari",
      "Mobile Safari": "icon-safari",
      UCBrowser: "icon-uc",
      Maxthon: "icon-maxthon",
      Firefox: "icon-firefox",
      IE: "icon-ie",
      Opera: "icon-opera",
      Edge: "icon-edge"
    };
    const uaResult = computed(() => uaParser(props.userAgent));
    const osIconName = computed(() => {
      const osName = uaResult.value.result.os.name;
      return osName && osIconsNameMap[osName];
    });
    const browserIconName = computed(() => {
      const browserName = uaResult.value.result.browser.name;
      return browserName ? browersIconsNameMap[browserName] : null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "user-agent" }, _attrs))} data-v-d879e09d><span class="os" data-v-d879e09d>`);
      if (osIconName.value) {
        _push(`<i class="${ssrRenderClass([osIconName.value, "iconfont"])}" data-v-d879e09d></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-d879e09d>${ssrInterpolate(uaResult.value.result.os.name)}</span></span><span class="browser" data-v-d879e09d>`);
      if (browserIconName.value) {
        _push(`<i class="${ssrRenderClass([browserIconName.value, "iconfont"])}" data-v-d879e09d></i>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-d879e09d>${ssrInterpolate(uaResult.value.result.browser.name)}</span></span></span>`);
    };
  }
});
const userAgent_vue_vue_type_style_index_0_scoped_d879e09d_lang = "";
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/user-agent.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const CommentUserAgent = /* @__PURE__ */ _export_sfc(_sfc_main$1k, [["__scopeId", "data-v-d879e09d"]]);
const _sfc_main$1j = /* @__PURE__ */ defineComponent({
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
  setup(__props, { emit }) {
    const props = __props;
    const { i18n: _i18n, cdnDomain } = useEnhancer();
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
      return disqusUsername.value ? getOriginalProxyURL(getDisqusAvatarByUsername(disqusUsername.value)) : props.comment.author.email_hash ? getProxyURL(cdnDomain, getGravatarByHash(props.comment.author.email_hash)) : getAssetURL(cdnDomain, DEFAULT_AVATAR);
    });
    const authorURL = computed(() => {
      if (props.comment.author.site) {
        return props.comment.author.site;
      }
      if (disqusUsername.value) {
        return getDisqusUserURL(disqusUsername.value);
      }
      return UNDEFINED;
    });
    const isDeleteable = computed(() => {
      var _a;
      if (identityStore.user.type === UserType.Disqus) {
        if (disqusAuthorId.value) {
          return ((_a = identityStore.user.disqusProfile) == null ? void 0 : _a.id) === disqusAuthorId.value;
        }
      }
      return false;
    });
    const getReplyParentCommentText = (parentId) => {
      var _a;
      const authorName = (_a = commentStore.comments.find((comment) => comment.id === parentId)) == null ? void 0 : _a.author.name;
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
      }, _attrs))} data-v-37223072><div data-v-37223072>`);
      if (!_ctx.hiddenAvatar) {
        _push(`<div class="cm-avatar" data-v-37223072>`);
        _push(ssrRenderComponent(_sfc_main$1m, {
          class: "link",
          href: authorURL.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", authorAvatar.value)}${ssrRenderAttr("alt", _ctx.comment.author.name)} draggable="false" data-v-37223072${_scopeId}><span class="${ssrRenderClass([isDisqusAuthor.value ? "disqus" : "anonymous", "role"])}" data-v-37223072${_scopeId}>`);
              if (isDisqusAuthor.value) {
                _push2(`<i class="iconfont icon-disqus-logo" data-v-37223072${_scopeId}></i>`);
              } else {
                _push2(`<i class="iconfont icon-user" data-v-37223072${_scopeId}></i>`);
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
      _push(`<div class="cm-body" data-v-37223072><div class="cm-header" data-v-37223072><div class="left" data-v-37223072>`);
      _push(ssrRenderComponent(_sfc_main$1m, {
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
        _push(`<span class="moderator" data-v-37223072>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).COMMENT_MODERATOR
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="author-info" data-v-37223072>`);
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
      _push(`</span></div><div class="right" data-v-37223072><span class="flool" data-v-37223072>#${ssrInterpolate(_ctx.comment.id)}</span></div></div><div class="cm-content" data-v-37223072>`);
      if (_ctx.comment.pid) {
        _push(`<p class="reply" data-v-37223072><span class="text" data-v-37223072>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).COMMENT_REPLY
        }, null, _parent));
        _push(`</span><button class="parent" data-v-37223072>${ssrInterpolate(getReplyParentCommentText(_ctx.comment.pid))}</button>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "：",
          en: ":"
        }, null, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="markdown" data-v-37223072>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        markdown: _ctx.comment.content,
        sanitize: true,
        compact: true
      }, null, _parent));
      _push(`</div></div><div class="cm-footer" data-v-37223072><div class="left" data-v-37223072><span class="create-at" data-v-37223072>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: _ctx.comment.created_at
      }, null, _parent));
      _push(`</span><button class="${ssrRenderClass([{
        actived: _ctx.liked,
        alived: Boolean(_ctx.comment.likes)
      }, "vote"])}"${ssrIncludeBooleanAttr(_ctx.liked) ? " disabled" : ""} data-v-37223072><i class="iconfont icon-like" data-v-37223072></i>`);
      if (!_ctx.plainVote) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).COMMENT_UPVOTE
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="count" data-v-37223072>(${ssrInterpolate(_ctx.comment.likes)})</span></button><button class="${ssrRenderClass([{
        actived: _ctx.disliked,
        alived: Boolean(_ctx.comment.dislikes)
      }, "vote"])}"${ssrIncludeBooleanAttr(_ctx.disliked) ? " disabled" : ""} data-v-37223072><i class="iconfont icon-dislike" data-v-37223072></i>`);
      if (!_ctx.plainVote) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).COMMENT_DOWNVOTE
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="count" data-v-37223072>(${ssrInterpolate(_ctx.comment.dislikes)})</span></button>`);
      if (_ctx.isReply) {
        _push(`<button class="reply" data-v-37223072><i class="iconfont icon-cancel" data-v-37223072></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).COMMENT_REPLY_CANCEL
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<button class="reply" data-v-37223072><i class="iconfont icon-reply" data-v-37223072></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).COMMENT_REPLY
        }, null, _parent));
        _push(`</button>`);
      }
      _push(`</div><div class="right" data-v-37223072>`);
      if (isDeleteable.value) {
        _push(`<button class="delete"${ssrIncludeBooleanAttr(isDeleting.value) ? " disabled" : ""} data-v-37223072><i class="iconfont icon-delete" data-v-37223072></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).COMMENT_DELETE
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (_ctx.isReply) {
        _push(`<div class="cm-reply" data-v-37223072>`);
        ssrRenderSlot(_ctx.$slots, "reply", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cm-children" data-v-37223072>`);
      ssrRenderSlot(_ctx.$slots, "children", {}, null, _push, _parent);
      _push(`</div></div></div></li>`);
    };
  }
});
const item_vue_vue_type_style_index_0_scoped_37223072_lang = "";
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const CommentItem = /* @__PURE__ */ _export_sfc(_sfc_main$1j, [["__scopeId", "data-v-37223072"]]);
const _sfc_main$1i = defineComponent({
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
    const { i18n: _i18n, gtag } = useEnhancer();
    const { comment: commentStore, identity } = useStores();
    const buildeCommentTree = (comments) => {
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
      gtag == null ? void 0 : gtag.event("vote_comment", {
        event_category: GAEventCategories.Comment,
        event_label: isLike ? "like" : "dislike"
      });
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
        const message = _i18n.t(LanguageKey.POST_ACTION_ERROR);
        console.warn(message, error);
        alert(message);
      }
    };
    return {
      identity,
      buildeCommentTree,
      handleReplyComment,
      handleCancelReply,
      handleDeleteComment,
      handleVoteComment
    };
  }
});
const list_vue_vue_type_style_index_0_scoped_86d32752_lang = "";
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_comment_item = resolveComponent("comment-item");
  const _component_comment_list = resolveComponent("comment-list");
  _push(`<ul${ssrRenderAttrs(mergeProps({
    class: ["comment-list", _ctx.isChildList ? "child" : "root"]
  }, _attrs))} data-v-86d32752><!--[-->`);
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
              comments: _ctx.buildeCommentTree(item.children),
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
                comments: _ctx.buildeCommentTree(item.children),
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
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/list.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const CommentList = /* @__PURE__ */ _export_sfc(_sfc_main$1i, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-86d32752"]]);
const _sfc_main$1h = /* @__PURE__ */ defineComponent({
  __name: "loadmore",
  __ssrInlineRender: true,
  props: {
    fetching: { type: Boolean },
    remain: {},
    pagination: {}
  },
  setup(__props, { emit }) {
    const props = __props;
    useEnhancer();
    const hasMore = computed(() => {
      var _a, _b, _c;
      return props.pagination && ((_a = props.pagination) == null ? void 0 : _a.total_page) > 1 && ((_b = props.pagination) == null ? void 0 : _b.current_page) !== ((_c = props.pagination) == null ? void 0 : _c.total_page);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "loadmore",
        id: unref(COMMENT_FOOTER_ELEMENT_ID)
      }, _attrs))} data-v-9a816c72>`);
      if (hasMore.value) {
        _push(`<button class="button"${ssrIncludeBooleanAttr(_ctx.fetching) ? " disabled" : ""} data-v-9a816c72>`);
        if (_ctx.fetching) {
          _push(ssrRenderComponent(_component_i18n, {
            zh: "加载中...",
            en: "Loading..."
          }, null, _parent));
        } else {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`加载更多评论（剩 ${ssrInterpolate(_ctx.remain)} 条）`);
              } else {
                return [
                  createTextVNode("加载更多评论（剩 " + toDisplayString(_ctx.remain) + " 条）", 1)
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Loadmore (remain ${ssrInterpolate(_ctx.remain)})`);
              } else {
                return [
                  createTextVNode("Loadmore (remain " + toDisplayString(_ctx.remain) + ")", 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<i class="iconfont icon-loadmore" data-v-9a816c72></i><!--]-->`);
        }
        _push(`</button>`);
      } else {
        _push(`<span class="no-more" data-v-9a816c72>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "水尽山穷",
          en: "NO MORE"
        }, null, _parent));
        _push(`</span>`);
      }
      _push(`</div>`);
    };
  }
});
const loadmore_vue_vue_type_style_index_0_scoped_9a816c72_lang = "";
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/loadmore.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const CommentLoadmore = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["__scopeId", "data-v-9a816c72"]]);
const _sfc_main$1g = /* @__PURE__ */ defineComponent({
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
            _push2(`<div class="publisher-skeleton" data-v-f2da7c39${_scopeId}><div class="avatar" data-v-f2da7c39${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton_base, null, null, _parent2, _scopeId));
            _push2(`</div><div class="content" data-v-f2da7c39${_scopeId}>`);
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
const main_vue_vue_type_style_index_0_scoped_f2da7c39_lang = "";
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/publisher/main.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const CommentPublisherMain = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["__scopeId", "data-v-f2da7c39"]]);
const _sfc_main$1f = /* @__PURE__ */ defineComponent({
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
  setup(__props, { emit }) {
    const props = __props;
    const { i18n: _i18n, gtag, cdnDomain } = useEnhancer();
    const { user } = storeToRefs(useIdentityStore());
    const defaultAvatar = getAssetURL(cdnDomain, DEFAULT_AVATAR);
    const avatar = computed(() => {
      var _a, _b;
      if (user.value.type === UserType.Local) {
        const hash = (_a = user.value.localProfile) == null ? void 0 : _a.email_hash;
        return hash ? getProxyURL(cdnDomain, getGravatarByHash(hash)) : defaultAvatar;
      }
      if (user.value.type === UserType.Disqus) {
        return getOriginalProxyURL(getDisqusAvatarByUsername((_b = user.value.disqusProfile) == null ? void 0 : _b.username));
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
      }, _attrs))} data-v-6966ea65>`);
      if (unref(user).type === unref(UserType).Null) {
        _push(`<div class="profile" style="${ssrRenderStyle(blossomed.value ? null : { display: "none" })}" data-v-6966ea65><div class="name" data-v-6966ea65><input${ssrRenderAttr("value", _ctx.profile.name)} required type="text" name="name" autocomplete="on"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LanguageKey).COMMENT_POST_NAME) + " *")} data-v-6966ea65></div><div class="email" data-v-6966ea65><input${ssrRenderAttr("value", _ctx.profile.email)} required type="email" name="email" autocomplete="on"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LanguageKey).COMMENT_POST_EMAIL) + " *")} data-v-6966ea65></div><div class="site" data-v-6966ea65><input${ssrRenderAttr("value", _ctx.profile.site)} type="url" name="url" autocomplete="on"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LanguageKey).COMMENT_POST_SITE))} data-v-6966ea65></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="postbox" data-v-6966ea65>`);
      if (!_ctx.hiddenAvatar) {
        _push(`<div class="avatar" data-v-6966ea65>`);
        _push(ssrRenderComponent(_component_uimage, {
          alt: _ctx.profile.name,
          src: avatar.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (blossomed.value) {
        _push(`<div class="editor" data-v-6966ea65>`);
        ssrRenderSlot(_ctx.$slots, "pen", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<div class="placeholder" data-v-6966ea65>`);
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
const publisher_vue_vue_type_style_index_0_scoped_6966ea65_lang = "";
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/publisher/publisher.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const CommentPublisher = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["__scopeId", "data-v-6966ea65"]]);
const _sfc_main$1e = /* @__PURE__ */ defineComponent({
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
  setup(__props, { emit }) {
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
      var _a;
      if (props.autoFocus) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["pen", { bordered: _ctx.bordered }]
      }, _attrs))} data-v-89f2f272><div class="editor" data-v-89f2f272><div class="input-wrapper"${ssrRenderAttr("data-replicated-value", content.value)} data-v-89f2f272><textarea class="editor-input" required${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(props.autoFocus) ? " autofocus" : ""}${ssrRenderAttr("minlength", unref(MIN_COMMENT_LENGTH))}${ssrRenderAttr("maxlength", unref(MAX_COMMENT_LENGTH))}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LanguageKey).COMMENT_POST_PLACEHOLDER))} data-v-89f2f272></textarea></div>`);
      if (isPreviewed.value) {
        _push(`<div class="preview-content" data-v-89f2f272>`);
        _push(ssrRenderComponent(_sfc_main$1n, {
          markdown: content.value,
          sanitize: true,
          compact: true
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="pencilbox" data-v-89f2f272><div class="stationery" data-v-89f2f272>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "markdown",
        title: "markdown",
        href: unref(VALUABLE_LINKS).MARKDOWN
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-markdown" data-v-89f2f272${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-markdown" })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!_ctx.hiddenStationery) {
        _push(`<!--[--><button class="emoji" title="emoji" type="button"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-89f2f272><i class="iconfont icon-emoji" data-v-89f2f272></i><div class="emoji-box" data-v-89f2f272><ul class="emoji-list" data-v-89f2f272><!--[-->`);
        ssrRenderList(unref(EMOJIS), (emoji, index) => {
          _push(`<li class="item"${ssrRenderAttr("title", emoji)} data-v-89f2f272>${ssrInterpolate(emoji)}</li>`);
        });
        _push(`<!--]--></ul></div></button><button class="image" title="image"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-89f2f272><i class="iconfont icon-image" data-v-89f2f272></i></button><button class="link" title="link"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-89f2f272><i class="iconfont icon-link" data-v-89f2f272></i></button><button class="code" title="code"${ssrIncludeBooleanAttr(_ctx.disabled || isPreviewed.value) ? " disabled" : ""} data-v-89f2f272><i class="iconfont icon-code" data-v-89f2f272></i></button><button title="preview" class="${ssrRenderClass([{ actived: isPreviewed.value }, "preview"])}"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""} data-v-89f2f272><i class="${ssrRenderClass([isPreviewed.value ? "icon-eye-close" : "icon-eye", "iconfont"])}" data-v-89f2f272></i></button><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit" class="submit"${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""} data-v-89f2f272>`);
      if (_ctx.posting) {
        _push(ssrRenderComponent(_component_i18n, {
          zh: "发布中...",
          en: "Posting..."
        }, null, _parent));
      } else if (unref(user).type === unref(UserType).Local) {
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`以 ${ssrInterpolate((_a = unref(user).localProfile) == null ? void 0 : _a.name)} 的身份发布`);
            } else {
              return [
                createTextVNode("以 " + toDisplayString((_b = unref(user).localProfile) == null ? void 0 : _b.name) + " 的身份发布", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`Post as ${ssrInterpolate((_a = unref(user).localProfile) == null ? void 0 : _a.name)}`);
            } else {
              return [
                createTextVNode("Post as " + toDisplayString((_b = unref(user).localProfile) == null ? void 0 : _b.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (unref(user).type === unref(UserType).Disqus) {
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`以 ${ssrInterpolate((_a = unref(user).disqusProfile) == null ? void 0 : _a.name)} 的身份发布`);
            } else {
              return [
                createTextVNode("以 " + toDisplayString((_b = unref(user).disqusProfile) == null ? void 0 : _b.name) + " 的身份发布", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a, _b;
            if (_push2) {
              _push2(`Post as ${ssrInterpolate((_a = unref(user).disqusProfile) == null ? void 0 : _a.name)}`);
            } else {
              return [
                createTextVNode("Post as " + toDisplayString((_b = unref(user).disqusProfile) == null ? void 0 : _b.name), 1)
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
      _push(`<i class="iconfont icon-mail-plane" data-v-89f2f272></i></button></div></div>`);
    };
  }
});
const pen_vue_vue_type_style_index_0_scoped_89f2f272_lang = "";
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/publisher/pen.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const CommentPen = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["__scopeId", "data-v-89f2f272"]]);
const _sfc_main$1d = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    postId: {},
    fetching: { type: Boolean, default: false },
    plain: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { i18n, gtag, gState } = useEnhancer();
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
      gtag == null ? void 0 : gtag.event("reply_comment", {
        event_category: GAEventCategories.Comment
      });
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
        console.warn("delete comment failed", error);
        alert(error.message);
      });
    };
    const createComment = async (payload) => {
      gtag == null ? void 0 : gtag.event("submit_comment", {
        event_category: GAEventCategories.Comment
      });
      if (!payload.content || !payload.content.trim()) {
        throw `${i18n.t(LanguageKey.COMMENT_POST_CONTENT)} ?`;
      }
      if (payload.content.length > MAX_COMMENT_LENGTH) {
        throw `${i18n.t(LanguageKey.COMMENT_POST_ERROR_CONTENT)} ?`;
      }
      const isGuest = identityStore.user.type === UserType.Null;
      const guestProfileValue = guestProfile.value;
      if (isGuest) {
        if (!guestProfileValue.name) {
          throw i18n.t(LanguageKey.COMMENT_POST_NAME) + "?";
        }
        if (!guestProfileValue.email) {
          throw i18n.t(LanguageKey.COMMENT_POST_EMAIL) + "?";
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
          agent: gState.userAgent.original,
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
        console.warn("submit comment failed:", error);
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
        postingKey.value = UNDEFINED;
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
        postingKey.value = UNDEFINED;
      }
    };
    onBeforeMount(() => {
      watch(isLoading, (isFetching2) => {
        if (isFetching2) {
          cancelCommentReply();
        }
      });
    });
    onUnmounted(() => {
      commentStore.clearList();
    });
    onBeforeUnmount(() => {
      cancelCommentReply();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: COMMENT_ELEMENT_ID,
        class: "comment-box"
      }, _attrs))} data-v-4590a078>`);
      _push(ssrRenderComponent(CommentTopbar, {
        total: (_a = unref(commentStore).pagination) == null ? void 0 : _a.total,
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
          var _a2, _b;
          if (_push2) {
            _push2(ssrRenderComponent(CommentPublisher, {
              profile: guestProfile.value,
              "onUpdate:profile": ($event) => guestProfile.value = $event,
              id: COMMENT_PUBLISHER_ELEMENT_ID,
              disabled: isLoading.value || isRootPosting.value,
              total: (_a2 = unref(commentStore).pagination) == null ? void 0 : _a2.total,
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
                total: (_b = unref(commentStore).pagination) == null ? void 0 : _b.total,
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
          var _a2, _b;
          if (_push2) {
            _push2(ssrRenderComponent(CommentLoadmore, {
              fetching: isFetching.value,
              pagination: unref(commentStore).pagination,
              remain: unref(commentStore).pagination ? ((_a2 = unref(commentStore).pagination) == null ? void 0 : _a2.total) - unref(commentStore).comments.length : 0,
              onPage: fetchPageComments
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentLoadmore, {
                fetching: isFetching.value,
                pagination: unref(commentStore).pagination,
                remain: unref(commentStore).pagination ? ((_b = unref(commentStore).pagination) == null ? void 0 : _b.total) - unref(commentStore).comments.length : 0,
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
const index_vue_vue_type_style_index_0_scoped_4590a078_lang = "";
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/index.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const Comment = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["__scopeId", "data-v-4590a078"]]);
const _sfc_main$1c = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-skeleton" }, _attrs))} data-v-1493b3f6><div class="module" data-v-1493b3f6><div class="content-skeleton" data-v-1493b3f6>`);
      _push(ssrRenderComponent(_component_skeleton_line, { class: "title" }, null, _parent));
      _push(ssrRenderComponent(_component_skeleton_paragraph, {
        class: "content",
        lines: 9,
        "line-height": "1.3em"
      }, null, _parent));
      _push(`</div></div><div class="module" data-v-1493b3f6><div class="share-skeleton" data-v-1493b3f6><!--[-->`);
      ssrRenderList(__props.socialCount, (item) => {
        _push(ssrRenderComponent(_component_skeleton_base, {
          class: "item",
          key: item
        }, null, _parent));
      });
      _push(`<!--]--></div></div><div class="module" data-v-1493b3f6><ul class="related-skeleton" style="${ssrRenderStyle({ "grid-template-columns": `repeat(${__props.relatedCount}, 1fr)` })}" data-v-1493b3f6><!--[-->`);
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
const skeleton_vue_vue_type_style_index_0_scoped_1493b3f6_lang = "";
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/skeleton.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const ArticleSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["__scopeId", "data-v-1493b3f6"]]);
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  __name: "content",
  __ssrInlineRender: true,
  props: {
    article: {},
    readmoreId: {}
  },
  setup(__props, { emit }) {
    const props = __props;
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
      var _a, _b;
      const _component_i18n = resolveComponent("i18n");
      const _component_responsive = resolveComponent("responsive");
      const _component_divider = resolveComponent("divider");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "element",
        ref: element,
        class: "detail"
      }, _attrs))} data-v-061518a6><div class="${ssrRenderClass([{
        original: isOriginal.value,
        reprint: isReprint.value,
        hybrid: isHybrid.value
      }, "oirigin"])}" data-v-061518a6>`);
      if (isOriginal.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ORIGIN_ORIGINAL
        }, null, _parent));
      } else if (isReprint.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ORIGIN_REPRINT
        }, null, _parent));
      } else if (isHybrid.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).ORIGIN_HYBRID
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="knowledge" data-v-061518a6><div class="title" data-v-061518a6><h2 class="text" data-v-061518a6>${ssrInterpolate(_ctx.article.title)}</h2><div class="meta" data-v-061518a6><i class="iconfont icon-t" data-v-061518a6></i>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: `共 ${unref(numberSplit)(unref(ctxStore).contentLength)} 字，需阅读 ${unref(ctxStore).readMinutes} 分钟`,
        en: `${unref(numberSplit)(unref(ctxStore).contentLength)} words, ${unref(ctxStore).readMinutes} min read`
      }, null, _parent));
      _push(ssrRenderComponent(_component_responsive, { desktop: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_divider, {
              type: "vertical",
              class: "vertical"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-061518a6${_scopeId}><i class="iconfont icon-clock-outline" data-v-061518a6${_scopeId}></i>`);
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
                createVNode("i", { class: "iconfont icon-clock-outline" }),
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
      _push(`<span data-v-061518a6><i class="iconfont icon-eye" data-v-061518a6></i><span data-v-061518a6>${ssrInterpolate(unref(numberSplit)(_ctx.article.meta.views))} </span>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LanguageKey).ARTICLE_VIEWS
      }, null, _parent));
      _push(`</span></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        html: (_a = unref(ctxStore).defaultContent) == null ? void 0 : _a.html
      }, null, _parent));
      if (isRenderMoreEnabled.value) {
        _push(`<div${ssrRenderAttr("id", _ctx.readmoreId)} class="readmore" data-v-061518a6><button class="readmore-btn"${ssrIncludeBooleanAttr(isRenderMoreContent.value) ? " disabled" : ""} data-v-061518a6>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: isRenderMoreContent.value ? unref(LanguageKey).ARTICLE_RENDERING : unref(LanguageKey).ARTICLE_READ_ALL
        }, null, _parent));
        _push(`<i class="iconfont icon-loadmore" data-v-061518a6></i></button></div>`);
      } else if (unref(ctxStore).renderedFullContent) {
        _push(ssrRenderComponent(_sfc_main$1n, {
          html: (_b = unref(ctxStore).moreContent) == null ? void 0 : _b.html
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const content_vue_vue_type_style_index_0_scoped_061518a6_lang = "";
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/content.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const ArticleContent = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["__scopeId", "data-v-061518a6"]]);
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
  __name: "share",
  __ssrInlineRender: true,
  props: {
    socials: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "share-box" }, _attrs))} data-v-9ee35de1>`);
      _push(ssrRenderComponent(Share, {
        class: "share",
        socials: __props.socials
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const share_vue_vue_type_style_index_0_scoped_9ee35de1_lang = "";
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/share.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const ArticleShare = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["__scopeId", "data-v-9ee35de1"]]);
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-4d178c75><div class="actions" data-v-4d178c75>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
      _push(`</div><div class="line" data-v-4d178c75>`);
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
        _push(`<span data-v-4d178c75>`);
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
          _push(`<span data-v-4d178c75>`);
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
        _push(`<span data-v-4d178c75>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "未知分类下",
          en: "(no catgory)"
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.plain) {
        _push(`<br data-v-4d178c75>`);
      } else {
        _push(ssrRenderComponent(_component_divider, {
          type: "vertical",
          size: "sm"
        }, null, _parent));
      }
      _push(`<!--[-->`);
      ssrRenderList(_ctx.article.tags, (tag, index) => {
        _push(`<span data-v-4d178c75>`);
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
          _push(`<span data-v-4d178c75>`);
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
      _push(`<!--]--></div><div class="line" data-v-4d178c75><i class="icon iconfont icon-creative-commons" data-v-4d178c75></i>`);
      _push(ssrRenderComponent(_component_i18n, null, {
        zh: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link copyright",
              href: "https://creativecommons.org/licenses/by-nc/4.0/deed.zh"
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
                href: "https://creativecommons.org/licenses/by-nc/4.0/deed.zh"
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
        _push(`<br data-v-4d178c75>`);
      } else {
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
      }
      _push(`<span class="link permalink" data-v-4d178c75>${ssrInterpolate(articleURL.value)}</span></div></div>`);
    };
  }
});
const meta_vue_vue_type_style_index_0_scoped_4d178c75_lang = "";
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/meta.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const ArticleMeta = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["__scopeId", "data-v-4d178c75"]]);
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "upvote",
  __ssrInlineRender: true,
  props: {
    likes: {},
    isLiked: { type: Boolean },
    hiddenSponsor: { type: Boolean },
    enabledParkinson: { type: Boolean }
  },
  setup(__props, { emit }) {
    const newliked = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "upvote" }, _attrs))} data-v-b5f92408><div class="wrapper" data-v-b5f92408><button class="${ssrRenderClass([{ liked: _ctx.isLiked, parkinson: _ctx.enabledParkinson, newliked: newliked.value }, "button like"])}"${ssrIncludeBooleanAttr(_ctx.isLiked) ? " disabled" : ""} data-v-b5f92408><i class="icon iconfont icon-like" data-v-b5f92408></i><span class="text" data-v-b5f92408>`);
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
        _push(`<!--[--><span class="parkinson-mask" data-v-b5f92408><i class="${ssrRenderClass([newliked.value ? "icon-like" : "icon-like-pre", "iconfont"])}" data-v-b5f92408></i></span><div class="parkinson-likes" data-v-b5f92408>+ 1</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (!_ctx.hiddenSponsor) {
        _push(`<button class="button sponsor" data-v-b5f92408><i class="icon iconfont icon-heart" data-v-b5f92408></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const upvote_vue_vue_type_style_index_0_scoped_b5f92408_lang = "";
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/upvote.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const ArticleUpvote = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["__scopeId", "data-v-b5f92408"]]);
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "related",
  __ssrInlineRender: true,
  props: {
    articles: { default: () => [] },
    columns: { default: 4 },
    count: { default: 8 }
  },
  setup(__props) {
    const props = __props;
    const { gState, cdnDomain } = useEnhancer();
    const getThumbnailURL = (url) => {
      if (!url) {
        return "";
      }
      if (!url.startsWith(API_CONFIG.STATIC)) {
        return url;
      }
      return getImgProxyURL(
        cdnDomain,
        getImgProxyPath(url.replace(API_CONFIG.STATIC, ""), {
          width: 466,
          height: 168,
          webp: gState.imageExt.value.isWebP
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
          title: "-",
          description: "",
          id: null,
          _id: "",
          thumbnail: ""
        })
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "related" }, _attrs))} data-v-b0b5cad9><ul class="articles" style="${ssrRenderStyle({ gridTemplateColumns: `repeat(${_ctx.columns}, 1fr)` })}" data-v-b0b5cad9><!--[-->`);
      ssrRenderList(articleList.value, (article, index) => {
        _push(`<li class="${ssrRenderClass([{ disabled: !article.id }, "item"])}" data-v-b0b5cad9>`);
        _push(ssrRenderComponent(_component_router_link, {
          class: "item-article",
          title: article.title,
          to: unref(getArticleDetailRoute)(article.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="thumbnail" style="${ssrRenderStyle({ backgroundImage: `url(${getThumbnailURL(article.thumbnail)})` })}" data-v-b0b5cad9${_scopeId}></div><div class="title" data-v-b0b5cad9${_scopeId}>${ssrInterpolate(article.title)}</div><div class="description" data-v-b0b5cad9${_scopeId}>${ssrInterpolate(article.description)}</div>`);
            } else {
              return [
                createVNode("div", {
                  class: "thumbnail",
                  style: { backgroundImage: `url(${getThumbnailURL(article.thumbnail)})` }
                }, null, 4),
                createVNode("div", { class: "title" }, toDisplayString(article.title), 1),
                createVNode("div", { class: "description" }, toDisplayString(article.description), 1)
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
const related_vue_vue_type_style_index_0_scoped_b0b5cad9_lang = "";
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/related.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const ArticleRelated = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__scopeId", "data-v-b0b5cad9"]]);
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "neighbour" }, _attrs))} data-v-d4fcd861>`);
      if (_ctx.prev) {
        _push(ssrRenderComponent(_component_router_link, {
          class: "link prev",
          title: _ctx.prev.title,
          to: unref(getArticleDetailRoute)(_ctx.prev.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="icon" data-v-d4fcd861${_scopeId}><i class="iconfont icon-prev" data-v-d4fcd861${_scopeId}></i></div><div class="content" data-v-d4fcd861${_scopeId}><p class="title" data-v-d4fcd861${_scopeId}>${ssrInterpolate(_ctx.prev.title)}</p><p class="description" data-v-d4fcd861${_scopeId}>${ssrInterpolate(_ctx.prev.description)}</p></div>`);
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
        _push(`<div class="null" data-v-d4fcd861>`);
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
              _push2(`<div class="content" data-v-d4fcd861${_scopeId}><p class="title" data-v-d4fcd861${_scopeId}>${ssrInterpolate(_ctx.next.title)}</p><p class="description" data-v-d4fcd861${_scopeId}>${ssrInterpolate(_ctx.next.description)}</p></div><div class="icon" data-v-d4fcd861${_scopeId}><i class="iconfont icon-next" data-v-d4fcd861${_scopeId}></i></div>`);
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
        _push(`<div class="null" data-v-d4fcd861>`);
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
const neighbour_vue_vue_type_style_index_0_scoped_d4fcd861_lang = "";
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/neighbour.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const ArticleNeighbour = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-d4fcd861"]]);
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "chatgpt",
  __ssrInlineRender: true,
  props: {
    shareId: {},
    data: {},
    hiddenAvatar: { type: Boolean }
  },
  emits: ["click-link"],
  setup(__props, { emit }) {
    const props = __props;
    const handleLinkClick = () => {
      emit("click-link");
    };
    const avatarURL = computed(() => {
      const fileName = props.data.model.includes("4") ? "4.0" : "3.5";
      return `/images/chatgpt/${fileName}.png`;
    });
    const htmlContent = computed(() => {
      const content = props.data.first_answer ?? "";
      return "<p>" + content.replaceAll("\n\n", "</p><p>") + "</p>";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["gpt-comment", { "hide-avatar": _ctx.hiddenAvatar }]
      }, _attrs))} data-v-3296b32d>`);
      if (!_ctx.hiddenAvatar) {
        _push(`<div class="gpt-avatar" data-v-3296b32d>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "link",
          href: unref(getChatGPTShareURL)(_ctx.shareId),
          onClick: handleLinkClick
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_uimage, {
                cdn: "",
                src: avatarURL.value,
                alt: _ctx.data.model,
                draggable: "false"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_uimage, {
                  cdn: "",
                  src: avatarURL.value,
                  alt: _ctx.data.model,
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
      _push(`<div class="gpt-body" data-v-3296b32d><div class="gpt-header" data-v-3296b32d><div class="left" data-v-3296b32d>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "username",
        href: unref(getChatGPTShareURL)(_ctx.shareId),
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
      _push(`<span class="model" data-v-3296b32d><i class="iconfont icon-cpu" data-v-3296b32d></i><span data-v-3296b32d>${ssrInterpolate(_ctx.data.model)}</span></span></div><div class="right" data-v-3296b32d><span class="created" data-v-3296b32d>`);
      _push(ssrRenderComponent(_component_udate, {
        date: _ctx.data.created_at * 1e3,
        to: "ago"
      }, null, _parent));
      _push(`</span></div></div><div class="gpt-content" data-v-3296b32d><div class="markdown" data-v-3296b32d>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        html: htmlContent.value,
        sanitize: true,
        compact: true
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const chatgpt_vue_vue_type_style_index_0_scoped_3296b32d_lang = "";
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/chatgpt.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const ArticleChatgpt = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-3296b32d"]]);
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    articleId: {},
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, head, seoMeta, gtag, gState } = useEnhancer();
    const { identity, sponsor, comment: commentStore, articleDetail: articleDetailStore } = useStores();
    const { article, fetching, prevArticle, nextArticle, relatedArticles } = storeToRefs(articleDetailStore);
    const isLiked = computed(() => Boolean(article.value && identity.isLikedPage(article.value.id)));
    const chatgptStore = useChatGPTStore();
    const articleChatGPTShareId = computed(() => {
      var _a;
      return getExtendValue(((_a = article.value) == null ? void 0 : _a.extends) || [], "chatgpt-share-id");
    });
    const handleCommentTopBarChatGPTClick = () => {
      gtag == null ? void 0 : gtag.event("chatgpt_comemnt_top_bar", {
        event_category: GAEventCategories.Comment
      });
    };
    const handleCommentUsernameChatGPTClick = () => {
      gtag == null ? void 0 : gtag.event("chatgpt_comemnt_name_link", {
        event_category: GAEventCategories.Comment
      });
    };
    const handleSponsor = () => {
      sponsor.fetch();
      gState.toggleSwitcher("sponsor", true);
      gtag == null ? void 0 : gtag.event("article_sponsor", {
        event_category: GAEventCategories.Article
      });
    };
    const handleLike = async (callback) => {
      if (isLiked.value) {
        return false;
      }
      gtag == null ? void 0 : gtag.event("article_like", {
        event_category: GAEventCategories.Article
      });
      try {
        await articleDetailStore.postArticleLike(article.value.id);
        identity.likePage(article.value.id);
        callback == null ? void 0 : callback();
      } catch (error) {
        const message = _i18n.t(LanguageKey.POST_ACTION_ERROR);
        console.warn(message, error);
        alert(message);
      }
    };
    const fetchArticleDetail = (articleId) => {
      const commentRequest = commentStore.fetchList({ post_id: articleId });
      const articleRequest = articleDetailStore.fetchCompleteArticle(articleId).then(() => {
        if (articleChatGPTShareId.value) {
          return chatgptStore.fetch(articleChatGPTShareId.value).catch((error) => {
            console.warn("[Article] fetch chatgpt error", (error == null ? void 0 : error.message) ?? error);
          });
        }
      });
      return Promise.all([articleRequest, commentRequest]);
    };
    const customElementsStyle = shallowRef(null);
    const handleContentRendered = (element) => {
      var _a, _b, _c, _d;
      (_b = (_a = CUSTOM_ELEMENTS.verse).effect) == null ? void 0 : _b.call(_a, element);
      customElementsStyle.value = ((_d = (_c = CUSTOM_ELEMENTS.verse).style) == null ? void 0 : _d.call(_c, element)) ?? null;
    };
    head(() => ({
      style: customElementsStyle.value ? [{ children: customElementsStyle.value }] : []
    }));
    seoMeta(() => {
      var _a, _b, _c, _d, _e, _f;
      return {
        pageTitle: (_a = article.value) == null ? void 0 : _a.title,
        description: ((_b = article.value) == null ? void 0 : _b.description) || "",
        keywords: ((_d = (_c = article.value) == null ? void 0 : _c.keywords) == null ? void 0 : _d.join(",")) || ((_e = article.value) == null ? void 0 : _e.title),
        ogType: "article",
        ogImage: (_f = article.value) == null ? void 0 : _f.thumbnail,
        ogImageWidth: 1190,
        ogImageHeight: 420
      };
    });
    onBeforeMount(() => {
      watch(
        () => props.articleId,
        (articleId) => fetchArticleDetail(articleId),
        { flush: "post" }
      );
    });
    useUniversalFetch(() => {
      return fetchArticleDetail(props.articleId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-page" }, _attrs))} data-v-86946de5>`);
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
          var _a, _b, _c, _d;
          if (_push2) {
            if (unref(article)) {
              _push2(`<div data-v-86946de5${_scopeId}><div class="module margin background overflow" data-v-86946de5${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleContent, {
                id: ARTICLE_CONTENT_ELEMENT_ID,
                "readmore-id": ARTICLE_READMORE_ELEMENT_ID,
                article: unref(article),
                onRendered: handleContentRendered
              }, null, _parent2, _scopeId));
              _push2(`<div class="divider" data-v-86946de5${_scopeId}></div>`);
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
                      "enabled-parkinson": !_ctx.isMobile && (unref(gState).userAgent.isChrome || unref(gState).userAgent.isFirefox),
                      onLike: handleLike,
                      onSponsor: handleSponsor
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(ArticleUpvote, {
                        likes: unref(article).meta.likes,
                        "is-liked": isLiked.value,
                        "hidden-sponsor": _ctx.isMobile,
                        "enabled-parkinson": !_ctx.isMobile && (unref(gState).userAgent.isChrome || unref(gState).userAgent.isFirefox),
                        onLike: handleLike,
                        onSponsor: handleSponsor
                      }, null, 8, ["likes", "is-liked", "hidden-sponsor", "enabled-parkinson"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="module margin background" data-v-86946de5${_scopeId}><div class="bridge left" data-v-86946de5${_scopeId}></div><div class="bridge right" data-v-86946de5${_scopeId}></div>`);
              _push2(ssrRenderComponent(ArticleShare, {
                id: ARTICLE_SHARE_ELEMENT_ID,
                "article-id": _ctx.articleId,
                likes: ((_b = (_a = unref(article)) == null ? void 0 : _a.meta) == null ? void 0 : _b.likes) || 0,
                socials: _ctx.isMobile ? [unref(SocialMedia).Wechat, unref(SocialMedia).Weibo, unref(SocialMedia).Twitter] : []
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="module margin overflow" data-v-86946de5${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleNeighbour, {
                prev: unref(prevArticle),
                next: unref(nextArticle)
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="module margin overflow" data-v-86946de5${_scopeId}>`);
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
                        "enabled-parkinson": !_ctx.isMobile && (unref(gState).userAgent.isChrome || unref(gState).userAgent.isFirefox),
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
                    "article-id": _ctx.articleId,
                    likes: ((_d = (_c = unref(article)) == null ? void 0 : _c.meta) == null ? void 0 : _d.likes) || 0,
                    socials: _ctx.isMobile ? [unref(SocialMedia).Wechat, unref(SocialMedia).Weibo, unref(SocialMedia).Twitter] : []
                  }, null, 8, ["id", "article-id", "likes", "socials"])
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
      _push(`<div class="comment" data-v-86946de5>`);
      _push(ssrRenderComponent(Comment, {
        plain: _ctx.isMobile,
        fetching: unref(fetching),
        "post-id": _ctx.articleId
      }, createSlots({ _: 2 }, [
        articleChatGPTShareId.value ? {
          name: "topbar-extra",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_ulink, {
                class: "chat-gpt-link",
                href: unref(getChatGPTShareURL)(articleChatGPTShareId.value),
                onClick: handleCommentTopBarChatGPTClick
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="iconfont icon-chat-gpt" data-v-86946de5${_scopeId2}></i>`);
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
                  href: unref(getChatGPTShareURL)(articleChatGPTShareId.value),
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
        articleChatGPTShareId.value && unref(chatgptStore).data ? {
          name: "list-top-extra",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(ArticleChatgpt, {
                "share-id": articleChatGPTShareId.value,
                data: unref(chatgptStore).data,
                "hidden-avatar": _ctx.isMobile,
                onClickLink: handleCommentUsernameChatGPTClick
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(ArticleChatgpt, {
                  "share-id": articleChatGPTShareId.value,
                  data: unref(chatgptStore).data,
                  "hidden-avatar": _ctx.isMobile,
                  onClickLink: handleCommentUsernameChatGPTClick
                }, null, 8, ["share-id", "data", "hidden-avatar"])
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
const index_vue_vue_type_style_index_0_scoped_86946de5_lang = "";
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/index.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const ArticleDetailPage = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-86946de5"]]);
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "instagram",
  __ssrInlineRender: true,
  setup(__props) {
    const fetching = ref(true);
    const igTimelineStore = useInstagramTimelineStore();
    const igMedias = computed(() => {
      var _a;
      return ((_a = igTimelineStore.data) == null ? void 0 : _a.data.slice(0, 23)) ?? [];
    });
    const getMediaThumbnail = (media) => {
      return getOriginalProxyURL(
        isVideoMediaIns(media) ? getInstagramCoverURL(media) : getInstagramThumbnail(media, "t")
      );
    };
    onMounted(() => {
      igTimelineStore.fetch().finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({
        "i18n-key": unref(LanguageKey).EMPTY_PLACEHOLDER,
        loading: fetching.value,
        data: igMedias.value
      }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="list" data-v-3acbed62${_scopeId}><!--[-->`);
            ssrRenderList(24, (i) => {
              _push2(`<li class="item" data-v-3acbed62${_scopeId}>`);
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
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="list" data-v-3acbed62${_scopeId}><!--[-->`);
            ssrRenderList(igMedias.value, (media, index) => {
              _push2(`<li class="item" data-v-3acbed62${_scopeId}>`);
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
                    _push3(`<div class="type-icon" data-v-3acbed62${_scopeId2}>`);
                    if (unref(isVideoMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-video" data-v-3acbed62${_scopeId2}></i>`);
                    } else if (unref(isAlbumMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-album" data-v-3acbed62${_scopeId2}></i>`);
                    } else {
                      _push3(`<i class="iconfont icon-camera" data-v-3acbed62${_scopeId2}></i>`);
                    }
                    _push3(`</div><div class="mask" data-v-3acbed62${_scopeId2}>`);
                    if (unref(isVideoMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-music-play" data-v-3acbed62${_scopeId2}></i>`);
                    } else {
                      _push3(`<i class="iconfont icon-eye" data-v-3acbed62${_scopeId2}></i>`);
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
            _push2(`<!--]--><li class="item" data-v-3acbed62${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link more",
              href: unref(VALUABLE_LINKS).INSTAGRAM
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
                    href: unref(VALUABLE_LINKS).INSTAGRAM
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
const instagram_vue_vue_type_style_index_0_scoped_3acbed62_lang = "";
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/media/instagram.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const InstagramMedia = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__scopeId", "data-v-3acbed62"]]);
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "youtube",
  __ssrInlineRender: true,
  setup(__props) {
    const youtubeStore = useYouTubePlayListStore();
    onMounted(() => youtubeStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube" }, _attrs))} data-v-42f69325>`);
      if (unref(youtubeStore).fetching) {
        _push(`<span data-v-42f69325></span>`);
      } else {
        _push(`<ul class="list" data-v-42f69325><!--[-->`);
        ssrRenderList(unref(youtubeStore).data.slice(0, 5), (item, index) => {
          _push(`<li class="item"${ssrRenderAttr("title", item.snippet.title)} data-v-42f69325>`);
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
                _push2(`<span class="count" data-v-42f69325${_scopeId}><i class="iconfont icon-video" data-v-42f69325${_scopeId}></i><span class="number" data-v-42f69325${_scopeId}>${ssrInterpolate(item.contentDetails.itemCount)}</span></span><p class="title" data-v-42f69325${_scopeId}><i class="iconfont icon-playlist" data-v-42f69325${_scopeId}></i><span class="text" data-v-42f69325${_scopeId}>${ssrInterpolate(item.snippet.title)}</span></p><div class="mask" data-v-42f69325${_scopeId}><i class="iconfont icon-eye" data-v-42f69325${_scopeId}></i></div>`);
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
        _push(`<!--]--><li class="item" data-v-42f69325>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "link more",
          href: unref(VALUABLE_LINKS).YOUTUBE_CHANNEL
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="iconfont icon-youtube" data-v-42f69325${_scopeId}></i><span class="username" data-v-42f69325${_scopeId}>${ssrInterpolate(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID)}</span><span class="text" data-v-42f69325${_scopeId}>•••</span>`);
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
const youtube_vue_vue_type_style_index_0_scoped_42f69325_lang = "";
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/media/youtube.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const YoutubeMedia = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-42f69325"]]);
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
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
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
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["statistic", [_ctx.brand, { dark: unref(isDarkTheme) }]]
      }, _attrs))} data-v-b864e91a>`);
      _push(ssrRenderComponent(_component_placeholder, {
        "i18n-key": unref(LanguageKey).EMPTY_PLACEHOLDER,
        loading: _ctx.fetching,
        data: _ctx.data
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="skeletons" data-v-b864e91a${_scopeId}><!--[-->`);
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
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="content" data-v-b864e91a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "title",
              href: _ctx.href
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="left" data-v-b864e91a${_scopeId2}><i class="${ssrRenderClass([_ctx.icon, "iconfont"])}" data-v-b864e91a${_scopeId2}></i><span class="text" data-v-b864e91a${_scopeId2}>${ssrInterpolate(_ctx.platform)}</span></span><span class="right" data-v-b864e91a${_scopeId2}><i class="iconfont icon-next" data-v-b864e91a${_scopeId2}></i></span>`);
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
const base_vue_vue_type_style_index_0_scoped_b864e91a_lang = "";
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/statistic/base.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const StatisticBase = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-b864e91a"]]);
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "douban",
  __ssrInlineRender: true,
  setup(__props) {
    const { isZhLang } = useEnhancer();
    const store = useDoubanMoviesStore();
    const totalSpent = computed(() => {
      var _a;
      return Math.trunc(((_a = store.data) == null ? void 0 : _a.total_spent) ?? 0);
    });
    const weeklyAvg = computed(() => {
      var _a;
      return (((_a = store.data) == null ? void 0 : _a.weekly_avg) ?? 0).toFixed(2);
    });
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
        href: unref(VALUABLE_LINKS).DOUBAN_MOVIE,
        platform: unref(isZhLang) ? "我在豆瓣" : "Douban Movie"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p${_scopeId}><i class="iconfont icon-video-outline"${_scopeId}></i>`);
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
            _push2(`</p><p${_scopeId}><i class="iconfont icon-clock-outline"${_scopeId}></i>`);
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
                createVNode("i", { class: "iconfont icon-video-outline" }),
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
                createVNode("i", { class: "iconfont icon-clock-outline" }),
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
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/statistic/douban.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "github",
  __ssrInlineRender: true,
  setup(__props) {
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
        href: unref(VALUABLE_LINKS).GITHUB,
        platform: unref(isZhLang) ? "我在 GitHub" : "GitHub"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<p${_scopeId}><i class="iconfont icon-star-outline"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>共获得</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: (_a = unref(store).data) == null ? void 0 : _a.statistics.stars
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
              count: (_b = unref(store).data) == null ? void 0 : _b.repositories.length
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
              count: (_c = unref(store).data) == null ? void 0 : _c.organizations.length
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
                createVNode("i", { class: "iconfont icon-star-outline" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "共获得")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  large: "",
                  primary: "",
                  split: "",
                  count: (_d = unref(store).data) == null ? void 0 : _d.statistics.stars
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个 star")) : (openBlock(), createBlock("span", { key: 2 }, "stars earned"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-repository" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "共维护")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: (_e = unref(store).data) == null ? void 0 : _e.repositories.length
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个开源项目")) : (openBlock(), createBlock("span", { key: 2 }, "open-source repos"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-organization" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "维护/发起")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: (_f = unref(store).data) == null ? void 0 : _f.organizations.length
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
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/statistic/github.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "twitter",
  __ssrInlineRender: true,
  setup(__props) {
    const { isZhLang } = useEnhancer();
    const store = useTwitterStore();
    const fetching = ref(true);
    onMounted(() => {
      store.fetch().finally(() => {
        fetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StatisticBase, mergeProps({
        brand: "twitter",
        icon: "icon-twitter",
        data: unref(store).data,
        fetching: fetching.value,
        href: unref(VALUABLE_LINKS).TWITTER,
        platform: unref(isZhLang) ? "我在推特" : "Twitter"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<p${_scopeId}><i class="iconfont icon-edit"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>发布了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: ((_a = unref(store).data) == null ? void 0 : _a.userinfo.tweetCount) || "-"
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>条推文</span>`);
            } else {
              _push2(`<span${_scopeId}>tweets</span>`);
            }
            _push2(`</p><p${_scopeId}><i class="iconfont icon-following"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>关注了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              split: "",
              count: ((_b = unref(store).data) == null ? void 0 : _b.userinfo.followingCount) || "-"
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>位推友</span>`);
            } else {
              _push2(`<span${_scopeId}>followings</span>`);
            }
            _push2(`</p><p${_scopeId}><i class="iconfont icon-follower"${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>收获了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              split: "",
              count: ((_c = unref(store).data) == null ? void 0 : _c.userinfo.followerCount) || "-"
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span${_scopeId}>个粉丝</span>`);
            } else {
              _push2(`<span${_scopeId}>followers</span>`);
            }
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-edit" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "发布了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  large: "",
                  primary: "",
                  split: "",
                  count: ((_d = unref(store).data) == null ? void 0 : _d.userinfo.tweetCount) || "-"
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "条推文")) : (openBlock(), createBlock("span", { key: 2 }, "tweets"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-following" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "关注了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  split: "",
                  count: ((_e = unref(store).data) == null ? void 0 : _e.userinfo.followingCount) || "-"
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "位推友")) : (openBlock(), createBlock("span", { key: 2 }, "followings"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-follower" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "收获了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  split: "",
                  count: ((_f = unref(store).data) == null ? void 0 : _f.userinfo.followerCount) || "-"
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个粉丝")) : (openBlock(), createBlock("span", { key: 2 }, "followers"))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/statistic/twitter.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "npm",
  __ssrInlineRender: true,
  setup(__props) {
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
        href: unref(VALUABLE_LINKS).NPM_HOMEPAGE,
        platform: unref(isZhLang) ? "我在 NPM" : "NPM"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="line-1" data-v-409e1bf5${_scopeId}><i class="iconfont icon-package" data-v-409e1bf5${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-409e1bf5${_scopeId}>发布了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(store).totalPackages
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-409e1bf5${_scopeId}>个公共软件包</span>`);
            } else {
              _push2(`<span data-v-409e1bf5${_scopeId}>packages</span>`);
            }
            _push2(`</p><p data-v-409e1bf5${_scopeId}><i class="iconfont icon-download" data-v-409e1bf5${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-409e1bf5${_scopeId}>被下载</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(store).totalDownloads
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-409e1bf5${_scopeId}>次</span>`);
            } else {
              _push2(`<span data-v-409e1bf5${_scopeId}>downs</span>`);
            }
            _push2(`</p><p data-v-409e1bf5${_scopeId}><i class="iconfont icon-score" data-v-409e1bf5${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-409e1bf5${_scopeId}>平均评分</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(store).averageScore
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-409e1bf5${_scopeId}>分</span>`);
            } else {
              _push2(`<span data-v-409e1bf5${_scopeId}>average score</span>`);
            }
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", { class: "line-1" }, [
                createVNode("i", { class: "iconfont icon-package" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "发布了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(store).totalPackages
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
                  count: unref(store).totalDownloads
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "次")) : (openBlock(), createBlock("span", { key: 2 }, "downs"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-score" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "平均评分")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(store).averageScore
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
const npm_vue_vue_type_style_index_0_scoped_409e1bf5_lang = "";
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/statistic/npm.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const NpmStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-409e1bf5"]]);
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "day",
  __ssrInlineRender: true,
  props: {
    date: {},
    tweets: {},
    instagrams: {},
    articles: {},
    contributions: {},
    githubColor: {}
  },
  setup(__props) {
    const props = __props;
    const { isDarkTheme } = useEnhancer();
    const total = computed(() => props.articles + props.tweets + props.contributions + props.instagrams);
    const getPointHeightStyle = (value) => {
      return isNaN(value) ? 0 : `${Math.floor(value * 100)}%`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["day", { dark: unref(isDarkTheme) }],
        "data-date": _ctx.date,
        "data-total-count": total.value,
        "data-article-count": _ctx.articles,
        "data-tweet-count": _ctx.tweets,
        "data-instagram-count": _ctx.instagrams,
        "data-contribution-count": _ctx.contributions
      }, _attrs))} data-v-6234f1db><div class="point" data-v-6234f1db><div class="item article" style="${ssrRenderStyle({ height: getPointHeightStyle(_ctx.articles / total.value) })}" data-v-6234f1db></div><div class="item tweet" style="${ssrRenderStyle({ height: getPointHeightStyle(_ctx.tweets / total.value) })}" data-v-6234f1db></div><div class="item instagram" style="${ssrRenderStyle({ height: getPointHeightStyle(_ctx.instagrams / total.value) })}" data-v-6234f1db></div><div class="item contribution" style="${ssrRenderStyle({
        height: getPointHeightStyle(_ctx.contributions / total.value),
        backgroundColor: _ctx.githubColor
      })}" data-v-6234f1db></div></div>`);
      if (total.value) {
        _push(`<div class="tooltip" data-v-6234f1db><p class="date" data-v-6234f1db>${ssrInterpolate(_ctx.date)}</p><ul class="counts" data-v-6234f1db><li class="item article" data-v-6234f1db><i class="iconfont icon-quill" data-v-6234f1db></i><span class="count" data-v-6234f1db>${ssrInterpolate(_ctx.articles)}</span> articles </li><li class="item tweet" data-v-6234f1db><i class="iconfont icon-twitter" data-v-6234f1db></i><span class="count" data-v-6234f1db>${ssrInterpolate(_ctx.tweets)}</span> tweets </li><li class="item instagram" data-v-6234f1db><i class="iconfont icon-instagram" data-v-6234f1db></i><span class="count" data-v-6234f1db>${ssrInterpolate(_ctx.instagrams)}</span> instagrams </li><li class="item contribution" data-v-6234f1db><i class="iconfont icon-github" data-v-6234f1db></i><span class="count" data-v-6234f1db>${ssrInterpolate(_ctx.contributions)}</span> contributions </li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const day_vue_vue_type_style_index_0_scoped_6234f1db_lang = "";
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/calendar/day.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const CalendarDay = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-6234f1db"]]);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useEnhancer();
    const { articleCalendar, instagramCalendar, githubCalendar } = useStores();
    const githubContributionsMap = computed(() => {
      return new Map(githubCalendar.days.map((day) => [day.date, day]));
    });
    const getDayContributions = (date) => {
      var _a;
      return ((_a = githubContributionsMap.value.get(date)) == null ? void 0 : _a.count) || 0;
    };
    const getDayGitHubColor = (date) => {
      var _a;
      return (_a = githubContributionsMap.value.get(date)) == null ? void 0 : _a.color;
    };
    const getDayInstagrams = (date) => {
      var _a;
      return ((_a = instagramCalendar.data.find((i) => i.date === date)) == null ? void 0 : _a.count) || 0;
    };
    const getDayArticles = (date) => {
      var _a;
      return ((_a = articleCalendar.data.find((i) => i.date === date)) == null ? void 0 : _a.count) || 0;
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
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "aggregate-calendar" }, _attrs))} data-v-8146b157><!--[-->`);
      ssrRenderList(months, (month, index) => {
        _push(`<li class="month" data-v-8146b157><!--[-->`);
        ssrRenderList(month, (day, i) => {
          _push(ssrRenderComponent(CalendarDay, {
            key: i,
            date: day,
            tweets: 0,
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
const index_vue_vue_type_style_index_0_scoped_8146b157_lang = "";
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/calendar/index.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const AggregateCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-8146b157"]]);
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
const useAdminAvatar = (avatar) => {
  return avatar || getAssetURL(useCDNDomain(), "/images/anonymous.png");
};
const i18ns = {
  footprint: {
    [Language.Chinese]: "路为纸，地成册，行作笔，心当墨；思无界，行有疆",
    [Language.English]: "Every path i went astray built up my Rome."
  },
  sponsor: {
    [Language.Chinese]: "向我赞助",
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
      `嗨！我是 Surmon，一名靠摸爬滚打自学的野生工程师，曾在美图秀秀、七牛云、字节跳动、加密交易所工作过；`,
      `如你所见，我有着还不错的设计灵感和编码能力，我经常会开源一些 “没用” 或 “有用” 的小物件，你都可以在 GitHub 找到。`,
      `在不远的未来，我可能会制作一些公共产品，希望得到你的关注和支持。`,
      `如果我的任何输出帮助了你，也期待你的慷慨赞助。`,
      `我把这里称之为自己的数字花园，祝你在这儿玩得愉快！`,
      `（另外：如果你对我个人的成长轨迹感兴趣，可以阅读<a href="https://surmon.me/article/144" target="_blank">《何以为家》</a>`
    ].join(""),
    [Language.English]: [
      `Hi! I'm Surmon, a software engineer who has worked at Meitu Inc., Qiniu Cloud, ByteDance, and Crypto Exchange.`,
      `I have developed strong design inspiration and coding skills.`,
      `I'm passionate about open-source software and problem-solving, and I hope my contributions can help you.`,
      `I've been a self-taught programmer since 2015, and if you're interested in my journey, you can find the answers in this <a href="https://surmon.me/article/144" target="_blank">article</a> (Chinese).`,
      `I call this place my own digital garden. Have fun here!`
    ].join(" ")
  }
};
const useAboutPageMeta = () => {
  const { i18n, seoMeta, isZhLang } = useEnhancer();
  const { adminInfo } = useStores();
  return seoMeta(() => {
    var _a;
    const enTitle = firstUpperCase(i18n.t(LanguageKey.PAGE_ABOUT, Language.English));
    const titles = isZhLang.value ? [i18n.t(LanguageKey.PAGE_ABOUT), enTitle] : [enTitle];
    const description = `${isZhLang.value ? "关于" : "About"} ${META.author}`;
    return {
      pageTitle: titles.join(" | "),
      description,
      ogType: "profile",
      ogImage: (_a = adminInfo.data) == null ? void 0 : _a.avatar
    };
  });
};
const SPECIAL_LINKS = Object.freeze([
  {
    name: "GitHub",
    url: "https://github.com"
  },
  {
    name: `Vite`,
    url: "https://vitejs.dev/"
  },
  {
    name: `Disqus`,
    url: "https://disqus.com/"
  }
]);
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "mapbox",
  __ssrInlineRender: true,
  props: {
    gmGeoJson: {}
  },
  emits: ["ready"],
  setup(__props, { emit }) {
    const props = __props;
    const { isDarkTheme } = useEnhancer();
    const mapboxRef = shallowRef();
    const lib = shallowRef();
    const map = shallowRef();
    const loaded = shallowRef(false);
    const getMapStyle = () => {
      return isDarkTheme.value ? MAPBOX_CONFIG.STYLE_DARK : MAPBOX_CONFIG.STYLE_LIGHT;
    };
    const makeSureSourceLayer = () => {
      var _a;
      if (loaded.value) {
        if ((_a = props.gmGeoJson) == null ? void 0 : _a.features.length) {
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
        () => {
          var _a;
          return (_a = map.value) == null ? void 0 : _a.setStyle(getMapStyle());
        }
      );
    });
    onBeforeMount(() => {
      watch(
        () => props.gmGeoJson,
        () => makeSureSourceLayer()
      );
    });
    onMounted(() => {
      Promise.all([
        import("mapbox-gl").then((result) => result.default),
        new Promise((resolve) => window.setTimeout(resolve, 600))
      ]).then(([mapboxgl]) => {
        mapboxgl.accessToken = MAPBOX_CONFIG.TOKEN;
        lib.value = mapboxgl;
        map.value = new mapboxgl.Map({
          container: mapboxRef.value,
          center: MAPBOX_CONFIG.CENTER,
          zoom: MAPBOX_CONFIG.ZOOM,
          attributionControl: false,
          style: getMapStyle()
        });
        new mapboxgl.Marker({
          color: META.primary,
          anchor: "bottom"
        }).setLngLat(GEO_INFO.coordinates).addTo(map.value);
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
      var _a;
      (_a = map.value) == null ? void 0 : _a.remove();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "mapbox",
        ref_key: "mapboxRef",
        ref: mapboxRef
      }, _attrs))} data-v-148642d7></div>`);
    };
  }
});
const mapbox_vue_vue_type_style_index_0_scoped_148642d7_lang = "";
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/footprint/mapbox.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const Mapbox = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-148642d7"]]);
const _sfc_main$V = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))} data-v-19fccf59>`);
      _push(ssrRenderComponent(Mapbox, {
        class: "mapbox",
        "gm-geo-json": _ctx.gmGeoJson,
        onReady: handleMapboxReady
      }, null, _parent));
      _push(`<div class="panel" data-v-19fccf59><div class="info" data-v-19fccf59><h3 class="title" data-v-19fccf59>${ssrInterpolate(_ctx.name ?? "-")}</h3><p class="description" data-v-19fccf59>${ssrInterpolate(_ctx.description ?? "-")}</p></div><ul class="folders" data-v-19fccf59><!--[-->`);
      ssrRenderList(_ctx.gmFolders, (folder, index) => {
        _push(`<li class="folder" data-v-19fccf59><div class="title" data-v-19fccf59><i class="iconfont icon-route" data-v-19fccf59></i><span class="text" data-v-19fccf59>${ssrInterpolate(folder.name)}</span><span class="count" data-v-19fccf59>(${ssrInterpolate(folder.placemarks.length)})</span></div>`);
        if (!folder.placemarks.length) {
          _push(`<div class="empty" data-v-19fccf59>null</div>`);
        } else {
          _push(`<ul class="placemarks" data-v-19fccf59><!--[-->`);
          ssrRenderList(folder.placemarks, (placemark, i) => {
            _push(`<li class="placemark" data-v-19fccf59>`);
            _push(ssrRenderComponent(_component_uimage, {
              class: "icon",
              cdn: true,
              src: `/images/third-party/mapbox-${placemark.image ? "attraction" : "veterinary"}.svg`
            }, null, _parent));
            _push(`<span class="text" data-v-19fccf59>${ssrInterpolate(placemark.name)}</span></li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const modal_vue_vue_type_style_index_0_scoped_19fccf59_lang = "";
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/footprint/modal.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const FootprintModal = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-19fccf59"]]);
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const map = shallowRef();
    const modalVisible = shallowRef(false);
    const gmStore = useMyGoogleMapStore();
    const { isZhLang } = useEnhancer();
    const gmFolders = computed(() => {
      var _a;
      const folders = [...((_a = gmStore.data) == null ? void 0 : _a.Folder) ?? []];
      folders.reverse();
      return folders.map((folder, fi) => {
        const placemark = folder.Placemark ?? [];
        const placemarks = Array.isArray(placemark) ? placemark : [placemark];
        return {
          name: folder.name,
          placemarks: placemarks.map((placemark2, pi) => {
            var _a2;
            const [longitude, latitude] = placemark2.Point.coordinates.split(",").map(Number);
            const extendedData = (_a2 = placemark2.ExtendedData) == null ? void 0 : _a2.Data;
            return {
              index: pi,
              id: `placemark-${fi}-${pi}`,
              name: placemark2.name,
              description: placemark2.description,
              coordinates: [longitude, latitude],
              image: (extendedData == null ? void 0 : extendedData["@name"]) === "gx_media_links" ? extendedData == null ? void 0 : extendedData.value : null
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "footprint-map" }, _attrs))} data-v-755cf9ee>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: modalVisible.value,
              "onUpdate:visible": ($event) => modalVisible.value = $event,
              "scroll-close": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d;
                if (_push3) {
                  _push3(ssrRenderComponent(FootprintModal, {
                    class: "footprint-modal",
                    name: (_a = unref(gmStore).data) == null ? void 0 : _a.name,
                    description: (_b = unref(gmStore).data) == null ? void 0 : _b.description,
                    "gm-folders": gmFolders.value,
                    "gm-geo-json": gmGeoJson.value
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(FootprintModal, {
                      class: "footprint-modal",
                      name: (_c = unref(gmStore).data) == null ? void 0 : _c.name,
                      description: (_d = unref(gmStore).data) == null ? void 0 : _d.description,
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
                default: withCtx(() => {
                  var _a, _b;
                  return [
                    createVNode(FootprintModal, {
                      class: "footprint-modal",
                      name: (_a = unref(gmStore).data) == null ? void 0 : _a.name,
                      description: (_b = unref(gmStore).data) == null ? void 0 : _b.description,
                      "gm-folders": gmFolders.value,
                      "gm-geo-json": gmGeoJson.value
                    }, null, 8, ["name", "description", "gm-folders", "gm-geo-json"])
                  ];
                }),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mapbox-wrapper"${ssrRenderAttr("placeholder", unref(isZhLang) ? unref(i18ns).footprint.zh : unref(i18ns).footprint.en)} data-v-755cf9ee>`);
      _push(ssrRenderComponent(Mapbox, {
        class: "mapbox",
        "gm-geo-json": gmGeoJson.value,
        onReady: handleMapboxReady
      }, null, _parent));
      _push(`<div class="toolbar" data-v-755cf9ee>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: unref(VALUABLE_LINKS).GOOGLE_MY_MAP
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-google-maps" data-v-755cf9ee${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-google-maps" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="button" data-v-755cf9ee><i class="iconfont icon-fullscreen" data-v-755cf9ee></i></button></div></div><div class="legends" data-v-755cf9ee><div class="now" data-v-755cf9ee><i class="iconfont icon-location" data-v-755cf9ee></i><span class="text" data-v-755cf9ee>${ssrInterpolate(unref(isZhLang) ? unref(GEO_INFO).zh_title : unref(GEO_INFO).en_title)}</span></div>`);
      if (unref(gmStore).data) {
        _push(`<ul class="folders" data-v-755cf9ee><!--[-->`);
        ssrRenderList(gmFolders.value.slice(0, 4), (folder, index) => {
          _push(`<li class="item" data-v-755cf9ee><i class="iconfont icon-route" data-v-755cf9ee></i><span class="text" data-v-755cf9ee>${ssrInterpolate(folder.name)}</span><span class="count" data-v-755cf9ee>(${ssrInterpolate(folder.placemarks.length)})</span></li>`);
        });
        _push(`<!--]--><li class="item" data-v-755cf9ee><i class="iconfont icon-route" data-v-755cf9ee></i><span class="text" data-v-755cf9ee>•••</span></li></ul>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const index_vue_vue_type_style_index_0_scoped_755cf9ee_lang = "";
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/footprint/index.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const FootprintMap = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-755cf9ee"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "desktop",
  __ssrInlineRender: true,
  setup(__props) {
    const { gtag, gState, isZhLang, cdnDomain } = useEnhancer();
    const { adminInfo, appOption, sponsor } = useStores();
    const handleGTagEvent = (event) => {
      gtag == null ? void 0 : gtag.event(event, {
        event_category: GAEventCategories.About
      });
    };
    const modalState = reactive({
      wechat: false
    });
    const handleSponsor = () => {
      sponsor.fetch();
      gState.toggleSwitcher("sponsor", true);
      handleGTagEvent("sponsor_modal");
    };
    const handleStatement = () => {
      gState.toggleSwitcher("statement", true);
      handleGTagEvent("statement_modal");
    };
    const handleFeedback = () => {
      gState.toggleSwitcher("feedback", true);
      handleGTagEvent("feedback_modal");
    };
    const backgroundVideo = getAssetURL(cdnDomain, "/images/page-about/background.mp4");
    useAboutPageMeta();
    useUniversalFetch(() => Promise.all([adminInfo.fetch(), appOption.fetch()]));
    const links = [
      {
        class: "photography",
        icon: "icon-lens",
        i18n: i18ns.photography,
        route: getPageRoute(RouteName.Photography)
      },
      {
        class: "nft",
        icon: "icon-opensea",
        i18n: i18ns.nft,
        href: VALUABLE_LINKS.OPENSEA
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
        href: VALUABLE_LINKS.TELEGRAM_GROUP
      },
      {
        class: "discord",
        icon: "icon-discord",
        i18n: i18ns.discordGroup,
        href: VALUABLE_LINKS.DISCORD_GROUP
      },
      {
        class: "sponsor",
        icon: "icon-heart",
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
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_ulink = resolveComponent("ulink");
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      const _component_container = resolveComponent("container");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-7ae5086c><div class="page-banner" data-v-7ae5086c><div class="background" data-v-7ae5086c><video class="video" loop muted autoplay${ssrIncludeBooleanAttr(false) ? " controls" : ""} data-v-7ae5086c><source${ssrRenderAttr("src", unref(backgroundVideo))} type="video/mp4" data-v-7ae5086c></video></div><div class="content" data-v-7ae5086c><div class="profile" data-v-7ae5086c>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "avatar",
        src: unref(useAdminAvatar)((_a = unref(adminInfo).data) == null ? void 0 : _a.avatar)
      }, null, _parent));
      _push(`<h1 class="name" data-v-7ae5086c>${ssrInterpolate(((_b = unref(adminInfo).data) == null ? void 0 : _b.name) || "-")}</h1><p class="slogan" data-v-7ae5086c>${ssrInterpolate(((_c = unref(adminInfo).data) == null ? void 0 : _c.slogan) || "-")}</p></div><p class="description" data-v-7ae5086c>`);
      _push(ssrRenderComponent(_component_webfont, { bolder: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isZhLang) ? unref(META).zh_description : unref(META).en_description)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isZhLang) ? unref(META).zh_description : unref(META).en_description), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><div class="socials" data-v-7ae5086c><span class="normal" data-v-7ae5086c>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item github",
        href: unref(VALUABLE_LINKS).GITHUB
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-7ae5086c${_scopeId}></i><span class="text" data-v-7ae5086c${_scopeId}>GitHub</span>`);
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
        class: "item twitter",
        href: unref(VALUABLE_LINKS).TWITTER
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-twitter" data-v-7ae5086c${_scopeId}></i><span class="text" data-v-7ae5086c${_scopeId}>Twitter</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-twitter" }),
              createVNode("span", { class: "text" }, "Twitter")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item instagram",
        href: unref(VALUABLE_LINKS).INSTAGRAM
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-instagram" data-v-7ae5086c${_scopeId}></i><span class="text" data-v-7ae5086c${_scopeId}>Instagram</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-instagram" }),
              createVNode("span", { class: "text" }, "Instagram")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item youtube",
        href: unref(VALUABLE_LINKS).YOUTUBE_CHANNEL
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-youtube" data-v-7ae5086c${_scopeId}></i><span class="text" data-v-7ae5086c${_scopeId}>YouTube</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-youtube" }),
              createVNode("span", { class: "text" }, "YouTube")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><span class="mini" data-v-7ae5086c>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item telegram",
        href: unref(VALUABLE_LINKS).TELEGRAM
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-7ae5086c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-telegram" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="item wechat" data-v-7ae5086c><i class="iconfont icon-wechat" data-v-7ae5086c></i>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: modalState.wechat,
              "onUpdate:visible": ($event) => modalState.wechat = $event,
              "scroll-close": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="qrcode-modal wechat" data-v-7ae5086c${_scopeId2}><div class="background" data-v-7ae5086c${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(_component_uimage, {
                    class: "image",
                    cdn: "",
                    src: "/images/qrcodes/wechat.jpg"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text" data-v-7ae5086c${_scopeId2}> 👋   `);
                  _push3(ssrRenderComponent(_component_i18n, {
                    en: "Friend me on WeChat",
                    zh: "扫码加微，解锁灵魂"
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "qrcode-modal wechat" }, [
                      createVNode("div", { class: "background" }),
                      createVNode(_component_uimage, {
                        class: "image",
                        cdn: "",
                        src: "/images/qrcodes/wechat.jpg"
                      }),
                      createVNode("span", { class: "text" }, [
                        createTextVNode(" 👋   "),
                        createVNode(_component_i18n, {
                          en: "Friend me on WeChat",
                          zh: "扫码加微，解锁灵魂"
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
                visible: modalState.wechat,
                "onUpdate:visible": ($event) => modalState.wechat = $event,
                "scroll-close": false
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "qrcode-modal wechat" }, [
                    createVNode("div", { class: "background" }),
                    createVNode(_component_uimage, {
                      class: "image",
                      cdn: "",
                      src: "/images/qrcodes/wechat.jpg"
                    }),
                    createVNode("span", { class: "text" }, [
                      createTextVNode(" 👋   "),
                      createVNode(_component_i18n, {
                        en: "Friend me on WeChat",
                        zh: "扫码加微，解锁灵魂"
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
        class: "item linkedin",
        href: unref(VALUABLE_LINKS).LINKEDIN
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-linkedin" data-v-7ae5086c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-linkedin" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item douban",
        href: unref(VALUABLE_LINKS).DOUBAN
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-douban" data-v-7ae5086c${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-douban" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span></div>`);
      _push(ssrRenderComponent(_component_divider, { dashed: "" }, null, _parent));
      _push(`<p class="biography" data-v-7ae5086c>${unref(isZhLang) ? unref(i18ns).biography.zh : unref(i18ns).biography.en}</p></div></div>`);
      _push(ssrRenderComponent(_component_container, { class: "page-content" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="links" data-v-7ae5086c${_scopeId}><!--[-->`);
            ssrRenderList(links, (item, index) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.onClick ? "button" : "ulink"), {
                class: ["item", item.class],
                href: item.href,
                to: item.route,
                onClick: item.onClick
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="left" data-v-7ae5086c${_scopeId2}><i class="${ssrRenderClass([item.icon, "iconfont"])}" data-v-7ae5086c${_scopeId2}></i><span class="text" data-v-7ae5086c${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_i18n, item.i18n, null, _parent3, _scopeId2));
                    _push3(`</span></span><span class="right" data-v-7ae5086c${_scopeId2}><i class="iconfont icon-next" data-v-7ae5086c${_scopeId2}></i></span>`);
                  } else {
                    return [
                      createVNode("span", { class: "left" }, [
                        createVNode("i", {
                          class: ["iconfont", item.icon]
                        }, null, 2),
                        createVNode("span", { class: "text" }, [
                          createVNode(_component_i18n, item.i18n, null, 16)
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
            _push2(`<!--]--></div><div class="statistics" data-v-7ae5086c${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$$, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(NpmStatistic, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$_, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$10, null, null, _parent2, _scopeId));
            _push2(`</div><div class="plogs" data-v-7ae5086c${_scopeId}>`);
            _push2(ssrRenderComponent(InstagramMedia, null, null, _parent2, _scopeId));
            _push2(`</div><div class="vlogs" data-v-7ae5086c${_scopeId}>`);
            _push2(ssrRenderComponent(YoutubeMedia, null, null, _parent2, _scopeId));
            _push2(`</div><div class="footprint" data-v-7ae5086c${_scopeId}>`);
            _push2(ssrRenderComponent(FootprintMap, null, null, _parent2, _scopeId));
            _push2(`</div><div class="calendar" data-v-7ae5086c${_scopeId}>`);
            _push2(ssrRenderComponent(AggregateCalendar, null, null, _parent2, _scopeId));
            _push2(`</div><div class="footer-links" data-v-7ae5086c${_scopeId}><div class="friendlinks" data-v-7ae5086c${_scopeId}><!--[-->`);
            ssrRenderList(((_a2 = unref(appOption).data) == null ? void 0 : _a2.friend_links) || [], (link, index) => {
              _push2(`<!--[-->`);
              if (index !== 0) {
                _push2(ssrRenderComponent(_component_divider, {
                  type: "vertical",
                  size: "lg"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<a${ssrRenderAttr("href", link.value)} class="item" target="_blank" rel="external nofollow noopener" data-v-7ae5086c${_scopeId}>${ssrInterpolate(link.name)}</a><!--]-->`);
            });
            _push2(`<!--]--></div><div class="speciallinks" data-v-7ae5086c${_scopeId}><!--[-->`);
            ssrRenderList(unref(SPECIAL_LINKS), (item, index) => {
              _push2(`<!--[-->`);
              if (index !== 0) {
                _push2(ssrRenderComponent(_component_divider, {
                  type: "vertical",
                  size: "lg"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<a${ssrRenderAttr("href", item.url)} class="item" target="_blank" rel="external nofollow noopener" data-v-7ae5086c${_scopeId}>${ssrInterpolate(item.name)}</a><!--]-->`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "links" }, [
                (openBlock(), createBlock(Fragment, null, renderList(links, (item, index) => {
                  return createVNode(resolveDynamicComponent(item.onClick ? "button" : "ulink"), {
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
                          createVNode(_component_i18n, item.i18n, null, 16)
                        ])
                      ]),
                      createVNode("span", { class: "right" }, [
                        createVNode("i", { class: "iconfont icon-next" })
                      ])
                    ]),
                    _: 2
                  }, 1032, ["class", "href", "to", "onClick"]);
                }), 64))
              ]),
              createVNode("div", { class: "statistics" }, [
                createVNode(_sfc_main$$),
                createVNode(NpmStatistic),
                createVNode(_sfc_main$_),
                createVNode(_sfc_main$10)
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
                createVNode("div", { class: "friendlinks" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(((_b2 = unref(appOption).data) == null ? void 0 : _b2.friend_links) || [], (link, index) => {
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
                createVNode("div", { class: "speciallinks" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(SPECIAL_LINKS), (item, index) => {
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
const desktop_vue_vue_type_style_index_0_scoped_7ae5086c_lang = "";
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const DesktopAboutPage = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-7ae5086c"]]);
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "mobile",
  __ssrInlineRender: true,
  setup(__props) {
    const { isZhLang } = useEnhancer();
    const adminInfo = useAdminInfoStore();
    useAboutPageMeta();
    useUniversalFetch(() => adminInfo.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_i18n = resolveComponent("i18n");
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_divider = resolveComponent("divider");
      const _component_router_link = resolveComponent("router-link");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-625d7f05>`);
      _push(ssrRenderComponent(PageBanner, {
        position: 70,
        "is-mobile": true,
        image: "/images/page-about/banner-mobile.jpg"
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).PAGE_ABOUT
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LanguageKey).PAGE_ABOUT
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="profile" data-v-625d7f05><div class="avatar" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "image",
        src: unref(useAdminAvatar)((_a = unref(adminInfo).data) == null ? void 0 : _a.avatar)
      }, null, _parent));
      _push(`</div><h2 class="name" data-v-625d7f05>${ssrInterpolate(((_b = unref(adminInfo).data) == null ? void 0 : _b.name) || "-")}</h2><h5 class="slogan" data-v-625d7f05>${ssrInterpolate(((_c = unref(adminInfo).data) == null ? void 0 : _c.slogan) || "-")}</h5><h4 class="description" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_webfont, { bolder: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isZhLang) ? unref(META).zh_description : unref(META).en_description)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isZhLang) ? unref(META).zh_description : unref(META).en_description), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h4>`);
      _push(ssrRenderComponent(_component_divider, { dashed: "" }, null, _parent));
      _push(`<p class="biography" data-v-625d7f05>${unref(isZhLang) ? unref(i18ns).biography.zh : unref(i18ns).biography.en}</p></div><div class="links" data-v-625d7f05><div class="list col-2" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "item text-only",
        to: unref(getPageRoute)(unref(RouteName).Archive)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-quill" data-v-625d7f05${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).archive, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-quill" }),
              createVNode(_component_i18n, unref(i18ns).archive, null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "item text-only",
        to: unref(getPageRoute)(unref(RouteName).Guestbook)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-comment" data-v-625d7f05${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).guestbook, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-comment" }),
              createVNode(_component_i18n, unref(i18ns).guestbook, null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_divider, { dashed: "" }, null, _parent));
      _push(`<div class="list col-2" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item discord",
        href: unref(VALUABLE_LINKS).DISCORD_GROUP
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-discord" data-v-625d7f05${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).discordGroup, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-discord" }),
              createVNode(_component_i18n, unref(i18ns).discordGroup, null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item telegram",
        href: unref(VALUABLE_LINKS).TELEGRAM_GROUP
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-625d7f05${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, unref(i18ns).telegramGroup, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-telegram" }),
              createVNode(_component_i18n, unref(i18ns).telegramGroup, null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="links" data-v-625d7f05><div class="list col-3" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item center github",
        href: unref(VALUABLE_LINKS).GITHUB
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-625d7f05${_scopeId}></i><span class="text" data-v-625d7f05${_scopeId}>GitHub</span>`);
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
        class: "item center twitter",
        href: unref(VALUABLE_LINKS).TWITTER
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-twitter" data-v-625d7f05${_scopeId}></i><span class="text" data-v-625d7f05${_scopeId}>Twitter</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-twitter" }),
              createVNode("span", { class: "text" }, "Twitter")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item center instagram",
        href: unref(VALUABLE_LINKS).INSTAGRAM
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-instagram" data-v-625d7f05${_scopeId}></i><span class="text" data-v-625d7f05${_scopeId}>Instagram</span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-instagram" }),
              createVNode("span", { class: "text" }, "Instagram")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_divider, { dashed: "" }, null, _parent));
      _push(`<div class="list col-4" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item telegram icon-only",
        href: unref(VALUABLE_LINKS).TELEGRAM
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-625d7f05${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-telegram" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item linkedin icon-only",
        href: unref(VALUABLE_LINKS).LINKEDIN
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-linkedin" data-v-625d7f05${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-linkedin" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item youtube icon-only",
        href: unref(VALUABLE_LINKS).YOUTUBE_CHANNEL
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-youtube" data-v-625d7f05${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-youtube" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item douban icon-only",
        href: unref(VALUABLE_LINKS).DOUBAN_MOVIE
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-douban" data-v-625d7f05${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-douban" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="qrcodes" data-v-625d7f05><div class="item" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "image",
        src: "/images/qrcodes/wechat.jpg"
      }, null, _parent));
      _push(`</div><div class="item" data-v-625d7f05>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "image",
        src: "/images/qrcodes/wechat-channel.png"
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const mobile_vue_vue_type_style_index_0_scoped_625d7f05_lang = "";
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/mobile.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const MobileAboutPage = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-625d7f05"]]);
const bannerImage = `/images/page-guestbook/banner.jpg`;
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "guestbook",
  __ssrInlineRender: true,
  props: {
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, seoMeta, gtag, gState, isDarkTheme, isZhLang } = useEnhancer();
    const { identity, appOption, comment: commentStore } = useStores();
    const isLiked = computed(() => identity.isLikedPage(CommentPostId.Guestbook));
    const siteLikes = computed(() => {
      var _a;
      return ((_a = appOption.data) == null ? void 0 : _a.meta.likes) || 0;
    });
    const isLoading = ref(isClient);
    const handleLike = async () => {
      if (isLiked.value) {
        return false;
      }
      gtag == null ? void 0 : gtag.event("like_site", {
        event_category: GAEventCategories.Universal
      });
      try {
        await appOption.postSiteLike();
        identity.likePage(CommentPostId.Guestbook);
      } catch (error) {
        const message = _i18n.t(LanguageKey.POST_ACTION_ERROR);
        console.warn(message, error);
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
    seoMeta(() => {
      const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_GUESTBOOK, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_GUESTBOOK), enTitle] : [enTitle];
      const description = isZhLang.value ? `给 ${META.author} 留言` : "Leave a comment";
      return {
        pageTitle: titles.join(" | "),
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "guestbook-page" }, _attrs))} data-v-e69482a1>`);
      _push(ssrRenderComponent(_component_responsive, null, {
        desktop: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="desktop-banner" data-v-e69482a1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_uimage, {
              cdn: "",
              class: "image",
              src: bannerImage
            }, null, _parent2, _scopeId));
            _push2(`<button class="${ssrRenderClass([{ liked: isLiked.value }, "like"])}"${ssrIncludeBooleanAttr(isLiked.value) ? " disabled" : ""} data-v-e69482a1${_scopeId}><i class="icon iconfont icon-heart" data-v-e69482a1${_scopeId}></i><span class="count" data-v-e69482a1${_scopeId}>${ssrInterpolate(isLiked.value ? `${siteLikes.value - 1} + 1` : siteLikes.value)}</span></button><span class="slogan" data-v-e69482a1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_webfont, {
              class: ["text", { dark: unref(isDarkTheme) }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).GUESTBOOK_SLOGAN
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).GUESTBOOK_SLOGAN
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
                  cdn: "",
                  class: "image",
                  src: bannerImage
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
                  createVNode(_component_webfont, {
                    class: ["text", { dark: unref(isDarkTheme) }]
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LanguageKey).GUESTBOOK_SLOGAN
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  }, 8, ["class"])
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
              position: 70,
              image: bannerImage
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_GUESTBOOK
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_GUESTBOOK
                    }, null, 8, ["k"])
                  ];
                }
              }),
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).GUESTBOOK_SLOGAN
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).GUESTBOOK_SLOGAN
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
                position: 70,
                image: bannerImage
              }, {
                title: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).PAGE_GUESTBOOK
                  }, null, 8, ["k"])
                ]),
                description: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).GUESTBOOK_SLOGAN
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="comment" data-v-e69482a1>`);
      _push(ssrRenderComponent(Comment, {
        "post-id": 0,
        plain: props.isMobile,
        fetching: isLoading.value
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const guestbook_vue_vue_type_style_index_0_scoped_e69482a1_lang = "";
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/guestbook.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const GuestbookPage = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-e69482a1"]]);
const APP_LOGO_URL = "/images/page-app/logo.png";
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  props: {
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { i18n: _i18n, seoMeta, gtag, isZhLang } = useEnhancer();
    const handleAppEvent = (name) => {
      gtag == null ? void 0 : gtag.event(name, {
        event_category: GAEventCategories.App
      });
    };
    seoMeta(() => {
      const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_APP, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_APP), enTitle] : [enTitle];
      return {
        pageTitle: titles.join(" | "),
        description: `${META.title} App ${isZhLang.value ? "下载" : "download"}`,
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
      }, _attrs))} data-v-091fbefa><div class="app" data-v-091fbefa><div class="logo" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_uimage, {
        alt: "app-logo",
        src: APP_LOGO_URL,
        cdn: ""
      }, null, _parent));
      _push(`</div><h2 class="title" data-v-091fbefa>${ssrInterpolate(unref(META).title)}</h2><p class="description" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_webfont, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LanguageKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><div class="screen" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        alt: "app-hot",
        class: "screen-img",
        src: "/images/page-app/hot.png"
      }, null, _parent));
      _push(`<div class="download" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "qrcode",
        alt: "qrcode",
        src: "/images/page-app/qrcode.png"
      }, null, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: unref(VALUABLE_LINKS).GITHUB_SURMON_ME_NATIVE + "#android",
        onMousedown: ($event) => handleAppEvent("download_android_app")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon iconfont icon-android" data-v-091fbefa${_scopeId}></i><span class="text" data-v-091fbefa${_scopeId}>Android</span><i class="new-window iconfont icon-new-window-s" data-v-091fbefa${_scopeId}></i>`);
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
        onMousedown: ($event) => handleAppEvent("download_ios_app")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon iconfont icon-apple" data-v-091fbefa${_scopeId}></i><span class="text" data-v-091fbefa${_scopeId}>iOS</span><i class="new-window iconfont icon-new-window-s" data-v-091fbefa${_scopeId}></i>`);
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
        onMousedown: ($event) => handleAppEvent("app_source_code")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-git" data-v-091fbefa${_scopeId}></i> Source Code `);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-git" }),
              createTextVNode(" Source Code ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><p class="rss" data-v-091fbefa><span class="prefix" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "（",
        en: "["
      }, null, _parent));
      _push(`</span><span class="deprecated" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "此项目已废弃！",
        en: "DEPRECATED!"
      }, null, _parent));
      _push(`</span>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "建议使用",
        en: "Recommend"
      }, null, _parent));
      _push(`<a class="link"${ssrRenderAttr("href", unref(VALUABLE_LINKS).RSS)} target="_blank" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "RSS 订阅",
        en: "RSS subscription"
      }, null, _parent));
      _push(`</a><span class="suffix" data-v-091fbefa>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "）",
        en: "]"
      }, null, _parent));
      _push(`</span></p></div></div>`);
    };
  }
});
const app_vue_vue_type_style_index_0_scoped_091fbefa_lang = "";
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/app.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const AppPage = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-091fbefa"]]);
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
    link: VALUABLE_LINKS.PAYPAL,
    logo: "/images/third-party/paypal-logo.svg",
    qrcode: "/images/third-party/paypal-qrcode.png"
  },
  {
    id: "alipay",
    title: "支付宝",
    text: "通过支付宝客户端扫码",
    logo: "/images/third-party/alipay-logo.svg",
    qrcode: "/images/third-party/alipay-qrcode.png"
  },
  {
    id: "wechat-pay",
    title: "微信赞赏",
    text: "通过微信客户端扫码",
    logo: "/images/third-party/wechat-pay-logo.svg",
    qrcode: "/images/third-party/wechat-pay-qrcode.jpg"
  },
  {
    id: "bitcoin",
    title: "BTC",
    address: IDENTITIES.BTC_ADDRESS,
    logo: "/images/third-party/btc-logo.svg",
    qrcode: "/images/third-party/btc-qrcode.png"
  },
  {
    id: "ethereum",
    title: "ETH",
    address: IDENTITIES.ETH_ADDRESS,
    logo: "/images/third-party/eth-logo.svg",
    qrcode: "/images/third-party/eth-qrcode.png"
  }
];
const useSponsorState = (initId) => {
  const { gtag } = useEnhancer();
  const githubSponsor = useSponsorStore();
  const activeId = ref(initId && PROVIDER_IDS.includes(initId) ? initId : PROVIDERS[0].id);
  const activeProvider = computed(() => PROVIDERS.find((t) => t.id === activeId.value));
  const setProviderId = (id) => {
    if (PROVIDER_IDS.includes(id)) {
      activeId.value = id;
      gtag == null ? void 0 : gtag.event("sponsor_tab_switch", {
        event_category: GAEventCategories.Widget
      });
    }
  };
  return {
    activeId,
    activeProvider,
    setProviderId,
    githubSponsor
  };
};
const _sfc_main$P = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-c19ca129><!--[-->`);
      ssrRenderList(unref(PROVIDERS), (provider, index) => {
        _push(`<button class="${ssrRenderClass([[provider.id, { active: _ctx.state.activeId.value === provider.id }], "item"])}"${ssrRenderAttr("title", provider.title)} data-v-c19ca129><span class="logo" data-v-c19ca129>`);
        _push(ssrRenderComponent(_component_uimage, {
          class: "image",
          alt: provider.title,
          src: provider.logo,
          cdn: ""
        }, null, _parent));
        _push(`</span>`);
        if (!_ctx.hideTitle) {
          _push(`<span class="title" data-v-c19ca129>${ssrInterpolate(provider.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const tabs_vue_vue_type_style_index_0_scoped_c19ca129_lang = "";
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/sponsor/tabs.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const SponsorTabs = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-c19ca129"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "provider",
  __ssrInlineRender: true,
  props: {
    state: {},
    maxSponsors: { default: 19 }
  },
  setup(__props) {
    const props = __props;
    useEnhancer();
    const activeProvider = computed(() => props.state.activeProvider.value);
    const allGitHubSponsors = computed(() => {
      return [
        ...props.state.githubSponsor.activeSponsors.map((sponsor) => ({
          active: true,
          _: sponsor
        })),
        ...props.state.githubSponsor.inactiveSponsors.map((sponsor) => ({
          active: false,
          _: sponsor
        }))
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["sponsor-provider", activeProvider.value.id]
      }, _attrs))} data-v-49f9d048>`);
      if (activeProvider.value.link || activeProvider.value.address || activeProvider.value.text) {
        _push(`<p class="external" data-v-49f9d048>`);
        if (activeProvider.value.link) {
          _push(`<!--[-->`);
          _push(ssrRenderComponent(_component_ulink, {
            class: "link",
            href: activeProvider.value.link
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<code data-v-49f9d048${_scopeId}>${ssrInterpolate(activeProvider.value.link)}</code>`);
              } else {
                return [
                  createVNode("code", null, toDisplayString(activeProvider.value.link), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`<i class="iconfont icon-new-window-s" data-v-49f9d048></i><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (activeProvider.value.address) {
          _push(`<!--[--><code class="link" data-v-49f9d048>${ssrInterpolate(activeProvider.value.address)}</code><i class="iconfont icon-copy" data-v-49f9d048></i><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (activeProvider.value.text) {
          _push(`<!--[-->${ssrInterpolate(activeProvider.value.text)} <i class="iconfont icon-qrcode" data-v-49f9d048></i><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.qrcode) {
        _push(ssrRenderComponent(_component_uimage, {
          class: "qrcode",
          src: activeProvider.value.qrcode,
          cdn: ""
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.id == unref(ProviderId).GitHub) {
        _push(`<div class="github-sponsors" data-v-49f9d048>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "link",
          href: unref(VALUABLE_LINKS).GITHUB_SPONSORS
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="iconfont icon-heart" data-v-49f9d048${_scopeId}></i><span class="text" data-v-49f9d048${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                en: "Sponsor me on GitHub",
                zh: "通过 GitHub Sponsor 赞助我"
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              return [
                createVNode("i", { class: "iconfont icon-heart" }),
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
        if (allGitHubSponsors.value.length) {
          _push(`<div class="sponsor-box" data-v-49f9d048><p class="total" data-v-49f9d048>`);
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 我在 GitHub Sponsors 累计已得到 <span class="active-total" data-v-49f9d048${_scopeId}>${ssrInterpolate(_ctx.state.githubSponsor.activeSponsors.length)}</span> + ${ssrInterpolate(_ctx.state.githubSponsor.inactiveSponsors.length)} 位赞助者的支持 `);
              } else {
                return [
                  createTextVNode(" 我在 GitHub Sponsors 累计已得到 "),
                  createVNode("span", { class: "active-total" }, toDisplayString(_ctx.state.githubSponsor.activeSponsors.length), 1),
                  createTextVNode(" + " + toDisplayString(_ctx.state.githubSponsor.inactiveSponsors.length) + " 位赞助者的支持 ", 1)
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` I have accumulated <span class="active-total" data-v-49f9d048${_scopeId}>${ssrInterpolate(_ctx.state.githubSponsor.activeSponsors.length)}</span> + ${ssrInterpolate(_ctx.state.githubSponsor.inactiveSponsors.length)} backers on GitHub Sponsors `);
              } else {
                return [
                  createTextVNode(" I have accumulated "),
                  createVNode("span", { class: "active-total" }, toDisplayString(_ctx.state.githubSponsor.activeSponsors.length), 1),
                  createTextVNode(" + " + toDisplayString(_ctx.state.githubSponsor.inactiveSponsors.length) + " backers on GitHub Sponsors ", 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</p><div class="sponsors" data-v-49f9d048><!--[-->`);
          ssrRenderList(allGitHubSponsors.value.slice(0, _ctx.maxSponsors), ({ _: item, active }, index) => {
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
          if (allGitHubSponsors.value.length > _ctx.maxSponsors) {
            _push(ssrRenderComponent(_component_ulink, {
              class: "more-link",
              href: unref(VALUABLE_LINKS).GITHUB_SPONSORS
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` + ${ssrInterpolate(allGitHubSponsors.value.length - _ctx.maxSponsors)}`);
                } else {
                  return [
                    createTextVNode(" + " + toDisplayString(allGitHubSponsors.value.length - _ctx.maxSponsors), 1)
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
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const provider_vue_vue_type_style_index_0_scoped_49f9d048_lang = "";
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/sponsor/provider.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const SponsorProvider = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-49f9d048"]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "sponsor",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, seoMeta, route, isZhLang } = useEnhancer();
    const sponsorState = useSponsorState();
    seoMeta(() => {
      const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_SPONSOR, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_SPONSOR), enTitle] : [enTitle];
      return { pageTitle: titles.join(" | ") };
    });
    onBeforeMount(() => {
      sponsorState.githubSponsor.fetch();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sponsor-page" }, _attrs))} data-v-b2f7f930>`);
      _push(ssrRenderComponent(PageBanner, { image: "/images/page-sponsor/banner.webp" }, {
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
      _push(`<div class="page-content" data-v-b2f7f930>`);
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
        state: unref(sponsorState)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const sponsor_vue_vue_type_style_index_0_scoped_b2f7f930_lang = "";
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/sponsor.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const SponsorPage = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-b2f7f930"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-773679c4><!--[-->`);
      ssrRenderList(_ctx.columns * _ctx.rows, (item) => {
        _push(`<div class="item" style="${ssrRenderStyle({ height: `${_ctx.height}px` })}" data-v-773679c4>`);
        _push(ssrRenderComponent(_component_skeleton_base, null, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const skeleton_vue_vue_type_style_index_0_scoped_773679c4_lang = "";
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/skeleton.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const YoutubeSkeleton = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-773679c4"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
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
    const handleSwiperReady = (_swiper) => {
      swiperRef.value = _swiper;
      handleSlideChange(_swiper);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-swiper" }, _attrs))} data-v-3e398d31><div class="navigation prev" data-v-3e398d31><button class="button"${ssrIncludeBooleanAttr(!swiperState.canPrev) ? " disabled" : ""} data-v-3e398d31><i class="iconfont icon-prev" data-v-3e398d31></i></button></div><div class="navigation next" data-v-3e398d31><button class="button"${ssrIncludeBooleanAttr(!swiperState.canNext) ? " disabled" : ""} data-v-3e398d31><i class="iconfont icon-next" data-v-3e398d31></i></button></div>`);
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
        onSwiper: handleSwiperReady,
        onSlideChange: handleSlideChange
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
                    ssrRenderSlot(_ctx.$slots, "item", { item, index }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "item", { item, index }, void 0, true)
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
                    renderSlot(_ctx.$slots, "item", { item, index }, void 0, true)
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
const swiper_vue_vue_type_style_index_0_scoped_3e398d31_lang = "";
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/swiper.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const ListSwiper = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-3e398d31"]]);
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "videos",
  __ssrInlineRender: true,
  props: {
    playlistId: {}
  },
  setup(__props, { emit }) {
    const props = __props;
    const { gtag, cdnDomain } = useEnhancer();
    const videos = ref([]);
    const fetching = ref(true);
    const fetchVideos = async () => {
      try {
        fetching.value = true;
        videos.value = await fetchYouTubeVideoList(props.playlistId);
      } catch (error) {
        videos.value = [];
      } finally {
        fetching.value = false;
      }
    };
    const getThumbnailURL = (thumbnails) => {
      var _a, _b, _c;
      const url = ((_a = thumbnails.high) == null ? void 0 : _a.url) || ((_b = thumbnails.medium) == null ? void 0 : _b.url) || ((_c = thumbnails.defult) == null ? void 0 : _c.url);
      return url ? getProxyURL(cdnDomain, url) : "";
    };
    const handleView = (video) => {
      emit("view", video);
      gtag == null ? void 0 : gtag.event("youtube_view", {
        event_category: GAEventCategories.YouTube
      });
    };
    onMounted(() => fetchVideos());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_udate = resolveComponent("udate");
      const _directive_lozad = resolveDirective("lozad");
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
                  _push3(`<div class="video" data-v-49898d9e${_scopeId2}><div class="thumbnail" data-v-49898d9e${_scopeId2}><div class="mask" data-v-49898d9e${_scopeId2}><div class="button" data-v-49898d9e${_scopeId2}><i class="iconfont icon-music-play" data-v-49898d9e${_scopeId2}></i></div></div><span class="published-at" data-v-49898d9e${_scopeId2}><i class="iconfont icon-clock" data-v-49898d9e${_scopeId2}></i><span class="text" data-v-49898d9e${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_udate, {
                    to: "ago",
                    date: item.snippet.publishedAt
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></span><div${ssrRenderAttrs(mergeProps({
                    class: "background",
                    "data-background-image": getThumbnailURL(item.snippet.thumbnails)
                  }, ssrGetDirectiveProps(_ctx, _directive_lozad)))} data-v-49898d9e${_scopeId2}></div></div><h5 class="title" data-v-49898d9e${_scopeId2}>${ssrInterpolate(item.snippet.title)}</h5><div class="description" data-v-49898d9e${_scopeId2}>${ssrInterpolate(item.snippet.description || "-")}</div></div>`);
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
                          createVNode("span", { class: "text" }, [
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
                        createVNode("span", { class: "text" }, [
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
const videos_vue_vue_type_style_index_0_scoped_49898d9e_lang = "";
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/videos.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const YoutubeVideoList = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-49898d9e"]]);
const _sfc_main$J = /* @__PURE__ */ defineComponent({
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
      return video ? getYouTubeVideoEmbedURL(video.snippet.resourceId.videoId, video.snippet.playlistId) : UNDEFINED;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-playlist" }, _attrs))} data-v-df930883><ul class="playlist" data-v-df930883><!--[-->`);
      ssrRenderList(_ctx.playlists, (list, index) => {
        _push(`<li class="item"${ssrRenderAttr("title", list.title)} data-v-df930883>`);
        ssrRenderSlot(_ctx.$slots, "title", { list, index }, null, _push, _parent);
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
                  _push3(`<div class="youtube-modal" data-v-df930883${_scopeId2}><iframe class="youtube-iframe"${ssrRenderAttr("src", youTubeModalURL.value)} data-v-df930883${_scopeId2}></iframe>`);
                  if (!modelIframeLoaded.value) {
                    _push3(`<div class="loading" data-v-df930883${_scopeId2}>`);
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
const playlist_vue_vue_type_style_index_0_scoped_df930883_lang = "";
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/playlist.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const YoutubePlaylist = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-df930883"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { seoMeta, isZhLang } = useEnhancer();
    const { youtubePlayList } = useStores();
    const youtubePlaylistData = computed(() => {
      return youtubePlayList.data.filter((list) => list.contentDetails.itemCount > 1);
    });
    seoMeta(() => {
      return {
        pageTitle: "YouTube",
        description: isZhLang.value ? `${META.author} 的视频` : `${META.author}'s YouTube`
      };
    });
    useUniversalFetch(() => youtubePlayList.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_container = resolveComponent("container");
      const _component_ulink = resolveComponent("ulink");
      const _component_empty = resolveComponent("empty");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-page" }, _attrs))} data-v-fb7a206b>`);
      _push(ssrRenderComponent(PageBanner, {
        class: "page-banner",
        position: 32,
        image: "/images/page-photography/banner.jpg"
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "欢喜勇猛，向死而生",
                    en: "Because it's there"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "欢喜勇猛，向死而生",
                      en: "Because it's there"
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
                    zh: "欢喜勇猛，向死而生",
                    en: "Because it's there"
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`鲜衣怒马，不负韶华`);
                } else {
                  return [
                    createTextVNode("鲜衣怒马，不负韶华")
                  ];
                }
              }),
              en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`&quot;why did you want to climb mount Everest?&quot;`);
                } else {
                  return [
                    createTextVNode('"why did you want to climb mount Everest?"')
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, null, {
                zh: withCtx(() => [
                  createTextVNode("鲜衣怒马，不负韶华")
                ]),
                en: withCtx(() => [
                  createTextVNode('"why did you want to climb mount Everest?"')
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-bridge" }, null, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-content" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module-content" data-v-fb7a206b${_scopeId}>`);
            _push2(ssrRenderComponent(YoutubePlaylist, { playlists: youtubePlaylistData.value }, {
              title: withCtx(({ list }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h4 class="module-title youtube" data-v-fb7a206b${_scopeId2}>`);
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
                    href: unref(VALUABLE_LINKS).YOUTUBE_CHANNEL
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<i class="iconfont icon-youtube" data-v-fb7a206b${_scopeId3}></i><span class="text" data-v-fb7a206b${_scopeId3}>YouTube · Channel</span>`);
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
                        href: unref(VALUABLE_LINKS).YOUTUBE_CHANNEL
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
                          k: unref(LanguageKey).EMPTY_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LanguageKey).EMPTY_PLACEHOLDER
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
                          k: unref(LanguageKey).EMPTY_PLACEHOLDER
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
                        href: unref(VALUABLE_LINKS).YOUTUBE_CHANNEL
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
                          k: unref(LanguageKey).EMPTY_PLACEHOLDER
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
const index_vue_vue_type_style_index_0_scoped_fb7a206b_lang = "";
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/index.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const YoutubePage = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-fb7a206b"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "banner",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      _push(ssrRenderComponent(PageBanner, mergeProps({
        class: "page-banner",
        position: 32,
        image: "/images/page-photography/banner.jpg"
      }, _attrs), {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "大千同在，万象共栖",
                    en: `${unref(META).author}'s photographs`
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "大千同在，万象共栖",
                      en: `${unref(META).author}'s photographs`
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
                    en: `${unref(META).author}'s photographs`
                  }, null, 8, ["en"])
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-64632919${_scopeId2}>在我的 `);
                  _push3(ssrRenderComponent(_component_ulink, {
                    href: unref(VALUABLE_LINKS).INSTAGRAM,
                    class: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Instagram`);
                      } else {
                        return [
                          createTextVNode("Instagram")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(` 主页查看更多</span>`);
                } else {
                  return [
                    createVNode("span", null, [
                      createTextVNode("在我的 "),
                      createVNode(_component_ulink, {
                        href: unref(VALUABLE_LINKS).INSTAGRAM,
                        class: "link"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Instagram")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createTextVNode(" 主页查看更多")
                    ])
                  ];
                }
              }),
              en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` View all photographs on my `);
                  _push3(ssrRenderComponent(_component_ulink, {
                    href: unref(VALUABLE_LINKS).INSTAGRAM,
                    class: "link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Instagram`);
                      } else {
                        return [
                          createTextVNode("Instagram")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createTextVNode(" View all photographs on my "),
                    createVNode(_component_ulink, {
                      href: unref(VALUABLE_LINKS).INSTAGRAM,
                      class: "link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Instagram")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, null, {
                zh: withCtx(() => [
                  createVNode("span", null, [
                    createTextVNode("在我的 "),
                    createVNode(_component_ulink, {
                      href: unref(VALUABLE_LINKS).INSTAGRAM,
                      class: "link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Instagram")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createTextVNode(" 主页查看更多")
                  ])
                ]),
                en: withCtx(() => [
                  createTextVNode(" View all photographs on my "),
                  createVNode(_component_ulink, {
                    href: unref(VALUABLE_LINKS).INSTAGRAM,
                    class: "link"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Instagram")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const banner_vue_vue_type_style_index_0_scoped_64632919_lang = "";
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/banner.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const InstagramBanner = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-64632919"]]);
const isCNCode = (code) => {
  return code === "CN";
};
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "album",
  __ssrInlineRender: true,
  props: {
    media: {}
  },
  emits: ["load"],
  setup(__props, { emit }) {
    const props = __props;
    const mediaChildren = shallowRef([]);
    const fetchMediaChildren = async (mediaId) => {
      const tm = TunnelModule.InstagramMediaChildren;
      const response = await tunnel$1.dispatch(tm, { id: mediaId });
      mediaChildren.value = response;
    };
    const activeIndex = shallowRef(0);
    const canGoPrev = computed(() => activeIndex.value > 0);
    const canGoNext = computed(() => activeIndex.value < mediaChildren.value.length - 1);
    onMounted(() => {
      fetchMediaChildren(props.media.id).finally(() => emit("load"));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "album-box" }, _attrs))} data-v-da05acb9><div class="navigation prev" data-v-da05acb9><button class="button"${ssrIncludeBooleanAttr(!canGoPrev.value) ? " disabled" : ""} data-v-da05acb9><i class="iconfont icon-prev" data-v-da05acb9></i></button></div><div class="navigation next" data-v-da05acb9><button class="button"${ssrIncludeBooleanAttr(!canGoNext.value) ? " disabled" : ""} data-v-da05acb9><i class="iconfont icon-next" data-v-da05acb9></i></button></div><div class="pagination" data-v-da05acb9><!--[-->`);
      ssrRenderList(mediaChildren.value.length, (index) => {
        _push(`<span class="${ssrRenderClass([{ active: index === activeIndex.value + 1 }, "index"])}" data-v-da05acb9></span>`);
      });
      _push(`<!--]--></div>`);
      ssrRenderSlot(_ctx.$slots, "child", { activeIndex: activeIndex.value, activeMedia: mediaChildren.value[activeIndex.value] }, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const album_vue_vue_type_style_index_0_scoped_da05acb9_lang = "";
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/album.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const InstagramAlbum = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-da05acb9"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "gallery",
  __ssrInlineRender: true,
  props: {
    media: {},
    index: {},
    count: {}
  },
  setup(__props) {
    const { cdnDomain } = useEnhancer();
    const isLoaded = ref(false);
    const mediaLoaded = () => {
      isLoaded.value = true;
    };
    const getMediaUrl = (url) => {
      const countryCode = useCountry();
      const isCNUser = Boolean(countryCode && isCNCode(countryCode));
      return isCNUser ? getProxyURL(cdnDomain, url) : url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_ulink = resolveComponent("ulink");
      const _component_udate = resolveComponent("udate");
      const _component_spin = resolveComponent("spin");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "instagram-gallery" }, _attrs))} data-v-fcdb5131><div class="topbar" data-v-fcdb5131><div class="left" data-v-fcdb5131>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "type-link",
        href: _ctx.media.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isVideoMediaIns)(_ctx.media)) {
              _push2(`<i class="iconfont icon-video" data-v-fcdb5131${_scopeId}></i>`);
            } else if (unref(isAlbumMediaIns)(_ctx.media)) {
              _push2(`<i class="iconfont icon-album" data-v-fcdb5131${_scopeId}></i>`);
            } else {
              _push2(`<i class="iconfont icon-camera" data-v-fcdb5131${_scopeId}></i>`);
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
      _push(ssrRenderComponent(_component_ulink, {
        class: "username-link",
        href: _ctx.media.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-fcdb5131${_scopeId}>@${ssrInterpolate(unref(IDENTITIES).INSTAGRAM_USERNAME)}</span>`);
          } else {
            return [
              createVNode("span", null, "@" + toDisplayString(unref(IDENTITIES).INSTAGRAM_USERNAME), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="center" data-v-fcdb5131><span class="pagination" data-v-fcdb5131>${ssrInterpolate(_ctx.index + 1)} / ${ssrInterpolate(_ctx.count)}</span></div><div class="right" data-v-fcdb5131><span class="timestamp" data-v-fcdb5131>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "YMDm",
        date: _ctx.media.timestamp,
        separator: "/"
      }, null, _parent));
      _push(`</span></div></div><div class="content" data-v-fcdb5131>`);
      if (!isLoaded.value) {
        _push(`<div class="loading" data-v-fcdb5131>`);
        _push(ssrRenderComponent(_component_spin, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isVideoMediaIns)(_ctx.media)) {
        _push(`<video class="video"${ssrRenderAttr("src", getMediaUrl(_ctx.media.media_url))} autoplay data-v-fcdb5131></video>`);
      } else if (unref(isAlbumMediaIns)(_ctx.media)) {
        _push(ssrRenderComponent(InstagramAlbum, {
          class: "album",
          media: _ctx.media,
          onLoad: mediaLoaded
        }, {
          child: withCtx(({ activeMedia }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img class="image"${ssrRenderAttr("src", getMediaUrl(activeMedia == null ? void 0 : activeMedia.media_url))}${ssrRenderAttr("alt", activeMedia == null ? void 0 : activeMedia.caption)} loading="lazy" draggable="false" data-v-fcdb5131${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  class: "image",
                  src: getMediaUrl(activeMedia == null ? void 0 : activeMedia.media_url),
                  alt: activeMedia == null ? void 0 : activeMedia.caption,
                  loading: "lazy",
                  draggable: "false"
                }, null, 8, ["src", "alt"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<img class="image"${ssrRenderAttr("src", getMediaUrl((_a = _ctx.media) == null ? void 0 : _a.media_url))}${ssrRenderAttr("alt", _ctx.media.caption)} draggable="false" loading="lazy" data-v-fcdb5131>`);
      }
      if (_ctx.media.caption) {
        _push(`<p class="caption" data-v-fcdb5131>${_ctx.media.caption.replaceAll("\n", "<br>")}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const gallery_vue_vue_type_style_index_0_scoped_fcdb5131_lang = "";
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/gallery.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const InsGallery = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-fcdb5131"]]);
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "grid",
  __ssrInlineRender: true,
  props: {
    medias: {}
  },
  setup(__props) {
    const props = __props;
    const { gtag, cdnDomain } = useEnhancer();
    const galleryActiveIndex = ref();
    const galleryActiveMedia = computed(() => {
      return isNil(galleryActiveIndex.value) ? null : props.medias[galleryActiveIndex.value];
    });
    const closeMediaGallery = () => {
      galleryActiveIndex.value = UNDEFINED;
    };
    const getPureCaption = (caption) => {
      const text = caption == null ? void 0 : caption.split("#")[0].trim().replaceAll("\n", " ");
      return (text ? text : caption) || "-";
    };
    const getMediaThumbnail = (media) => {
      const url = getInstagramCoverURL(media);
      const countryCode = useCountry();
      const isCNUser = Boolean(countryCode && isCNCode(countryCode));
      return isCNUser ? getProxyURL(cdnDomain, url) : url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _directive_lozad = resolveDirective("lozad");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "instagram-grid" }, _attrs))} data-v-fa701643><ul class="medias" data-v-fa701643><!--[-->`);
      ssrRenderList(_ctx.medias, (media, index) => {
        _push(`<li${ssrRenderAttr("title", getPureCaption(media.caption))} class="${ssrRenderClass([unref(isVideoMediaIns)(media) ? "video" : "photo", "item"])}" data-v-fa701643><div class="content" data-v-fa701643><div${ssrRenderAttrs(mergeProps({
          class: "background",
          "data-background-image": getMediaThumbnail(media)
        }, ssrGetDirectiveProps(_ctx, _directive_lozad)))} data-v-fa701643></div><div class="mask" data-v-fa701643><span class="icon" data-v-fa701643>`);
        if (unref(isVideoMediaIns)(media)) {
          _push(`<i class="iconfont icon-music-play" data-v-fa701643></i>`);
        } else {
          _push(`<i class="iconfont icon-eye" data-v-fa701643></i>`);
        }
        _push(`</span></div><div class="type-icon" data-v-fa701643>`);
        if (unref(isVideoMediaIns)(media)) {
          _push(`<i class="iconfont icon-video" data-v-fa701643></i>`);
        } else if (unref(isAlbumMediaIns)(media)) {
          _push(`<i class="iconfont icon-album" data-v-fa701643></i>`);
        } else {
          _push(`<i class="iconfont icon-camera" data-v-fa701643></i>`);
        }
        _push(`</div></div></li>`);
      });
      _push(`<!--]--></ul>`);
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
const grid_vue_vue_type_style_index_0_scoped_fa701643_lang = "";
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/grid.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const InstagramGrid = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-fa701643"]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "loadmore",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean }
  },
  setup(__props, { emit }) {
    const props = __props;
    const element = ref(null);
    const observer = ref(null);
    const emitLoadEvent = () => {
      if (!props.loading) {
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
      }, _attrs))} data-v-13de7d52>`);
      if (_ctx.loading) {
        _push(`<div class="loading" data-v-13de7d52><div data-v-13de7d52></div><div data-v-13de7d52></div><div data-v-13de7d52></div><div data-v-13de7d52></div></div>`);
      } else {
        _push(`<button class="normal" data-v-13de7d52><i class="iconfont icon-loadmore" data-v-13de7d52></i></button>`);
      }
      _push(`</div>`);
    };
  }
});
const loadmore_vue_vue_type_style_index_0_scoped_13de7d52_lang = "";
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/loadmore.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const InstagramLoadmore = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-13de7d52"]]);
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { instagramTimeline } = useStores();
    const { i18n: _i18n, seoMeta, isZhLang } = useEnhancer();
    const loading = ref(false);
    const medias = shallowReactive([]);
    const lastPaging = shallowRef(null);
    const finished = computed(() => Boolean(lastPaging.value && !lastPaging.value.next));
    const fetchMoreMedias = async () => {
      var _a, _b, _c;
      try {
        loading.value = true;
        const response = await tunnel$1.dispatch(TunnelModule.InstagramMedias, {
          after: ((_a = lastPaging.value) == null ? void 0 : _a.cursors.after) ?? ((_c = (_b = instagramTimeline.data) == null ? void 0 : _b.paging) == null ? void 0 : _c.cursors.after)
        });
        medias.push(...response.data);
        lastPaging.value = response.paging;
      } finally {
        loading.value = false;
      }
    };
    const allMedias = computed(() => {
      var _a;
      const timeline = ((_a = instagramTimeline.data) == null ? void 0 : _a.data) ?? [];
      return [...timeline, ...medias];
    });
    seoMeta(() => {
      const enTitle = firstUpperCase(_i18n.t(LanguageKey.PAGE_PHOTOGRAPHY, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LanguageKey.PAGE_PHOTOGRAPHY), enTitle] : [enTitle];
      const description = isZhLang.value ? `${META.author} 的摄影作品` : `${META.author}'s photographs`;
      return {
        pageTitle: titles.join(" | "),
        description
      };
    });
    useUniversalFetch(() => instagramTimeline.fetch().catch(() => {
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_container = resolveComponent("container");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_i18n = resolveComponent("i18n");
      const _component_skeleton_base = resolveComponent("skeleton-base");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "photography-page" }, _attrs))} data-v-0637748b>`);
      _push(ssrRenderComponent(InstagramBanner, null, null, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-bridge" }, null, _parent));
      _push(ssrRenderComponent(_component_container, { class: "page-content" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(_component_placeholder, {
              data: (_a = unref(instagramTimeline).data) == null ? void 0 : _a.data,
              loading: unref(instagramTimeline).fetching
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
                          k: unref(LanguageKey).EMPTY_PLACEHOLDER
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LanguageKey).EMPTY_PLACEHOLDER
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
                          k: unref(LanguageKey).EMPTY_PLACEHOLDER
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="module-loading" data-v-0637748b${_scopeId2}><!--[-->`);
                  ssrRenderList(4 * 2, (item) => {
                    _push3(`<div class="item" data-v-0637748b${_scopeId2}>`);
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
                  _push3(`<div data-v-0637748b${_scopeId2}>`);
                  _push3(ssrRenderComponent(InstagramGrid, { medias: allMedias.value }, null, _parent3, _scopeId2));
                  if (!unref(instagramTimeline).fetching && !finished.value) {
                    _push3(ssrRenderComponent(InstagramLoadmore, {
                      class: "loadmore",
                      loading: loading.value,
                      onLoadmore: fetchMoreMedias
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(InstagramGrid, { medias: allMedias.value }, null, 8, ["medias"]),
                      !unref(instagramTimeline).fetching && !finished.value ? (openBlock(), createBlock(InstagramLoadmore, {
                        key: 0,
                        class: "loadmore",
                        loading: loading.value,
                        onLoadmore: fetchMoreMedias
                      }, null, 8, ["loading"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_placeholder, {
                data: (_b = unref(instagramTimeline).data) == null ? void 0 : _b.data,
                loading: unref(instagramTimeline).fetching
              }, {
                placeholder: withCtx(() => [
                  createVNode(_component_empty, {
                    class: "module-empty",
                    key: "empty"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LanguageKey).EMPTY_PLACEHOLDER
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
                    !unref(instagramTimeline).fetching && !finished.value ? (openBlock(), createBlock(InstagramLoadmore, {
                      key: 0,
                      class: "loadmore",
                      loading: loading.value,
                      onLoadmore: fetchMoreMedias
                    }, null, 8, ["loading"])) : createCommentVNode("", true)
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
const index_vue_vue_type_style_index_0_scoped_0637748b_lang = "";
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/index.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const PhotographyPage = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-0637748b"]]);
var CategorySlug = /* @__PURE__ */ ((CategorySlug2) => {
  CategorySlug2["Code"] = "code";
  CategorySlug2["Insight"] = "insight";
  return CategorySlug2;
})(CategorySlug || {});
var RouteName = /* @__PURE__ */ ((RouteName2) => {
  RouteName2["Home"] = "home";
  RouteName2["Article"] = "article-detail";
  RouteName2["CategoryFlow"] = "category-flow";
  RouteName2["TagFlow"] = "tag-flow";
  RouteName2["DateFlow"] = "date-flow";
  RouteName2["SearchFlow"] = "search-flow";
  RouteName2["Archive"] = "archive";
  RouteName2["Guestbook"] = "guestbook";
  RouteName2["About"] = "about";
  RouteName2["App"] = "app";
  RouteName2["Sponsor"] = "sponsor";
  RouteName2["Photography"] = "photography";
  RouteName2["YouTube"] = "youtube";
  RouteName2["Error"] = "error";
  return RouteName2;
})(RouteName || {});
const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: IndexFlowPage,
      mobile: MobileFlow
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
            message: i18n.t(LanguageKey.QUERY_PARAMS_ERROR) + "Article ID → <number>"
          });
        }
      }
    }
  },
  {
    path: "/category/:category_slug",
    name: "category-flow",
    components: {
      default: CategoryFlowPage,
      mobile: MobileFlow
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
            message: i18n.t(LanguageKey.QUERY_PARAMS_ERROR) + "Category slug → <string>"
          });
        }
      }
    }
  },
  {
    path: "/tag/:tag_slug",
    name: "tag-flow",
    components: {
      default: TagFlowPage,
      mobile: MobileFlow
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
            message: i18n.t(LanguageKey.QUERY_PARAMS_ERROR) + "Tag slug → <string>"
          });
        }
      }
    }
  },
  {
    path: "/date/:date",
    name: "date-flow",
    components: {
      default: _sfc_main$1w,
      mobile: MobileFlow
    },
    props: {
      default: (to) => ({ date: to.params.date }),
      mobile: (to) => ({ date: to.params.date })
    },
    meta: {
      responsive: true,
      ssrCacheTTL: 60 * 60 * 24,
      // 24 hours
      async validator({ route, i18n }) {
        const { date } = route.params;
        if (!date || !isValidDateParam(date)) {
          return Promise.reject({
            code: BAD_REQUEST,
            message: i18n.t(LanguageKey.QUERY_PARAMS_ERROR) + `Invalid date ${date || ""}`
          });
        }
      }
    }
  },
  {
    path: "/search/:keyword",
    name: "search-flow",
    components: {
      default: _sfc_main$1v,
      mobile: MobileFlow
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
            message: i18n.t(LanguageKey.QUERY_PARAMS_ERROR) + "Keywords ?"
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
      layout: LayoutColumn.Full,
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
      layout: LayoutColumn.Full,
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
      layout: LayoutColumn.Full,
      ssrCacheTTL: Infinity
    }
  },
  {
    path: "/photography",
    name: "photography",
    component: PhotographyPage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
      ssrCacheTTL: 60 * 60 * 1
      // 1 hours
    }
  },
  {
    path: "/youtube",
    name: "youtube",
    component: YoutubePage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
      ssrCacheTTL: 60 * 60 * 1
      // 1 hours
    }
  },
  {
    path: "/sponsor",
    name: "sponsor",
    component: SponsorPage,
    meta: {
      responsive: false,
      layout: LayoutColumn.Full,
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
          message: i18n.t(LanguageKey.NOT_FOUND)
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
const _sfc_main$B = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-985ff19f>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const webfont_vue_vue_type_style_index_0_scoped_985ff19f_lang = "";
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/webfont.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const Webfont = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-985ff19f"]]);
const _sfc_main$A = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-94e22883><div class="spinner-inner" data-v-94e22883><div class="la-ball-beat" data-v-94e22883><div style="${ssrRenderStyle(spinnerStyle.value)}" data-v-94e22883></div><div style="${ssrRenderStyle(spinnerStyle.value)}" data-v-94e22883></div><div style="${ssrRenderStyle(spinnerStyle.value)}" data-v-94e22883></div></div></div></div>`);
    };
  }
});
const spin_vue_vue_type_style_index_0_scoped_94e22883_lang = "";
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/spin.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const Spin = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-94e22883"]]);
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "empty",
  __ssrInlineRender: true,
  props: {
    placeholder: {},
    i18nKey: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "empty" }, _attrs))} data-v-8245bbd6>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        if (_ctx.placeholder) {
          _push(`<!--[-->${ssrInterpolate(_ctx.placeholder)}<!--]-->`);
        } else {
          _push(ssrRenderComponent(_component_i18n, {
            k: _ctx.i18nKey || unref(LanguageKey).EMPTY_PLACEHOLDER
          }, null, _parent));
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const empty_vue_vue_type_style_index_0_scoped_8245bbd6_lang = "";
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/empty.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const Empty = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-8245bbd6"]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "divider",
  __ssrInlineRender: true,
  props: {
    type: { default: "horizontal" },
    size: { default: "default" },
    dashed: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        role: "separator",
        class: ["divider", [_ctx.type, _ctx.size, { dashed: _ctx.dashed }, { slot: !!_ctx.$slots.default }]]
      }, _attrs))} data-v-59d5e242>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const divider_vue_vue_type_style_index_0_scoped_59d5e242_lang = "";
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/divider.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-59d5e242"]]);
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
        const meridiem = date.getHours() > 11 ? i18n.t(LanguageKey.MOMENT_PM) : i18n.t(LanguageKey.MOMENT_AM);
        return `${ymd} ${meridiem}`;
      }
      if (props.to === "ago") {
        const pluralize = (time, label) => {
          const ago = `${time} ${label}`;
          return i18n.t(LanguageKey.MOMENT_AGO, null, { date: ago });
        };
        const between = Date.now() / 1e3 - Number(date) / 1e3;
        const hourS = 3600;
        const dayS = hourS * 24;
        const weekS = dayS * 7;
        const monthS = dayS * 30;
        const yearS = monthS * 12;
        if (between < hourS) {
          return ~~(between / 60) === 0 ? i18n.t(LanguageKey.MOMENT_JUST_NOW) : pluralize(~~(between / 60), i18n.t(LanguageKey.MOMENT_MINUTES));
        }
        if (between < dayS) {
          return pluralize(~~(between / hourS), i18n.t(LanguageKey.MOMENT_HOURS));
        }
        if (between < weekS) {
          return pluralize(~~(between / dayS), i18n.t(LanguageKey.MOMENT_DAYS));
        }
        if (between < monthS) {
          return pluralize(~~(between / weekS), i18n.t(LanguageKey.MOMENT_WEEKS));
        }
        if (between < yearS) {
          return pluralize(~~(between / monthS), i18n.t(LanguageKey.MOMENT_MONTHS));
        }
        return pluralize(~~(between / yearS), i18n.t(LanguageKey.MOMENT_YEAR));
      }
      return null;
    };
  }
});
const Ulink = defineComponent({
  name: "Ulink",
  props: {
    // @ts-ignore
    ...RouterLink.props,
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
    }
  },
  setup(props, context) {
    return () => {
      var _a, _b;
      const { to, href, external, blank, ...routerLinkProps } = props;
      const customAttrs = { ...context.attrs };
      if (to && !to.startsWith("http")) {
        const ps = {
          to,
          ...routerLinkProps
        };
        return h(RouterLink, ps, context.slots.default);
      }
      if (external) {
        customAttrs.rel = "external nofollow noopener";
      }
      if (blank) {
        customAttrs.target = "_blank";
      }
      return h("a", { ...customAttrs, href }, (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a));
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
    const { defer, cdnDomain } = useEnhancer();
    const deferRenderable = ref(false);
    if (props.defer)
      ;
    return () => {
      const { src, cdn, proxy, defer: defer2, ...restProps } = props;
      let imageSrc = src;
      if (cdn) {
        imageSrc = getAssetURL(cdnDomain, src);
      }
      if (proxy) {
        imageSrc = getProxyURL(cdnDomain, src);
      }
      if (defer2 && !deferRenderable.value) {
        return null;
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
      const isEmptyData = !isUndefined(data) && (Array.isArray(data) && !data.length || !data);
      const getPlaceholderView = () => {
        var _a, _b;
        return placeholder || i18nKey ? h(Empty, { placeholder, i18nKey }) : (_b = (_a = context.slots).placeholder) == null ? void 0 : _b.call(_a);
      };
      const getDataView = () => {
        var _a, _b;
        return isEmptyData ? getPlaceholderView() : (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      };
      const getLoadingView = () => {
        var _a, _b;
        return ((_b = (_a = context.slots).loading) == null ? void 0 : _b.call(_a)) || h(Spin, { loading: true });
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
    const { gState } = useEnhancer();
    const mounted = ref(gState.isHydrated.value ? true : false);
    onMounted(() => {
      if (!gState.isHydrated.value) {
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
      var _a, _b;
      if (mounted.value) {
        return renderResult((_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a), "result");
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
      var _a, _b;
      return h(props.tag, [h("div", { class: "container" }, [(_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a)])]);
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
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      if (props.both) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      if (props.desktop && !globalState.userAgent.isMobile) {
        return (_d = (_c = context.slots).default) == null ? void 0 : _d.call(_c);
      }
      if (props.mobile && globalState.userAgent.isMobile) {
        return (_f = (_e = context.slots).default) == null ? void 0 : _f.call(_e);
      }
      return globalState.userAgent.isMobile ? (_h = (_g = context.slots).mobile) == null ? void 0 : _h.call(_g) : (_j = (_i = context.slots).desktop) == null ? void 0 : _j.call(_i);
    };
  }
});
const DesktopOnly = defineComponent({
  name: "DesktopOnly",
  setup(_, context) {
    const globalState = useGlobalState();
    return () => {
      var _a, _b;
      return !globalState.userAgent.isMobile && ((_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a));
    };
  }
});
const _sfc_main$x = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-64cb8c6f></div>`);
    };
  }
});
const base_vue_vue_type_style_index_0_scoped_64cb8c6f_lang = "";
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/skeleton/base.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const SkeletonBase = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-64cb8c6f"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
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
const line_vue_vue_type_style_index_0_scoped_fcaf01ec_lang = "";
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/skeleton/line.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const SkeletonLine = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-fcaf01ec"]]);
const _sfc_main$v = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/skeleton/paragraph.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
function components(app) {
  app.component("Webfont", Webfont);
  app.component("Spin", Spin);
  app.component("Empty", Empty);
  app.component("Divider", Divider);
  app.component("Udate", Udate);
  app.component("Ulink", Ulink);
  app.component("Uimage", Uimage);
  app.component("Placeholder", Placeholder);
  app.component("ClientOnly", ClientOnly);
  app.component("Responsive", Responsive);
  app.component("DesktopOnly", DesktopOnly);
  app.component("Container", Container);
  app.component("SkeletonBase", SkeletonBase);
  app.component("SkeletonLine", SkeletonLine);
  app.component("SkeletonParagraph", _sfc_main$v);
}
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "emoji-rain",
  __ssrInlineRender: true,
  setup(__props) {
    const emojiImage = getAssetURL(useCDNDomain(), "/images/emojis/funny.png");
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
      }, _attrs))} data-v-f13c3623>`);
      if (state.chambering) {
        _push(`<canvas class="rain-base" data-v-f13c3623></canvas>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const emojiRain_vue_vue_type_style_index_0_scoped_f13c3623_lang = "";
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/emoji-rain.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const EmojiRain = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-f13c3623"]]);
const getLayoutByRouteMeta = (routeMeta) => {
  return routeMeta.layout === LayoutColumn.Wide ? LayoutColumn.Wide : routeMeta.layout === LayoutColumn.Full ? LayoutColumn.Full : LayoutColumn.Normal;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  emits: ["resolve"],
  setup(__props, { emit }) {
    const props = __props;
    const { isDarkTheme } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["error", { dark: unref(isDarkTheme) }]
      }, _attrs))} data-v-038af2a9><h1 class="code" data-v-038af2a9>${ssrInterpolate(props.error.code)}</h1><h3 class="message" data-v-038af2a9>`);
      if (props.error.message) {
        _push(`<!--[-->${ssrInterpolate(props.error.message)}<!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).NOT_FOUND
        }, null, _parent));
      }
      _push(`</h3><p class="link" data-v-038af2a9>`);
      ssrRenderSlot(_ctx.$slots, "resolve-text", {}, null, _push, _parent);
      _push(`</p>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "logo",
        src: "/images/logo.svg"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const error_vue_vue_type_style_index_0_scoped_038af2a9_lang = "";
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/root/error.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const ErrorComponent = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-038af2a9"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "captured",
  __ssrInlineRender: true,
  setup(__props) {
    const { router, gState } = useEnhancer();
    const handleResolveRoute = () => {
      router.push({ name: RouteName.Home }).then(() => {
        gState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta));
        gState.setRenderError(null);
      });
    };
    onErrorCaptured((_error) => {
      gState.setRenderError(_error);
      return false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "captured" }, _attrs))}>`);
      if (unref(gState).renderError.value) {
        _push(ssrRenderComponent(ErrorComponent, {
          error: unref(gState).renderError.value,
          onResolve: handleResolveRoute
        }, {
          "resolve-text": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LanguageKey).BACK_TO_HOME_PAGE
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_i18n, {
                  k: unref(LanguageKey).BACK_TO_HOME_PAGE
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
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/root/captured.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const MusicPlayerSymbol = Symbol("music-player");
const useMusic = () => {
  return inject(MusicPlayerSymbol);
};
const useCoverArtURL = (url) => {
  return url ? getProxyURL(useCDNDomain(), `${url}?param=300y300`) : url;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
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
        (index) => {
          var _a;
          return (_a = songsRef.value[index]) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
        }
      );
      nextTick(() => {
        var _a;
        (_a = songsRef.value[state.index]) == null ? void 0 : _a.scrollIntoView({ behavior: "instant" });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "music-player" }, _attrs))} data-v-5fc00f38><div class="panel" data-v-5fc00f38><div class="song" data-v-5fc00f38><img class="cover"${ssrRenderAttr("src", unref(useCoverArtURL)((_a = unref(currentSong)) == null ? void 0 : _a.cover_art_url))} draggable="false" data-v-5fc00f38>`);
      if (unref(currentSong)) {
        _push(`<div class="info" data-v-5fc00f38><p class="title" data-v-5fc00f38><span class="name" data-v-5fc00f38>${ssrInterpolate(unref(currentSong).name)}</span><span class="artist" data-v-5fc00f38>${ssrInterpolate(unref(currentSong).artist)}</span></p><p class="duration" data-v-5fc00f38><span data-v-5fc00f38>${ssrInterpolate(getSecondsView(unref(state).currentTime))}</span><span data-v-5fc00f38> / </span><span data-v-5fc00f38>${ssrInterpolate(getSecondsView(unref(currentSong).duration / 1e3))}</span></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="control" data-v-5fc00f38><button class="cut-song prev"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-5fc00f38><i class="iconfont icon-music-prev" data-v-5fc00f38></i></button><button class="toggle-play"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-5fc00f38><i class="${ssrRenderClass([unref(state).playing ? "icon-music-pause" : "icon-music-play", "iconfont"])}" data-v-5fc00f38></i></button><button class="cut-song next"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-5fc00f38><i class="iconfont icon-music-next" data-v-5fc00f38></i></button></div><div class="tools" data-v-5fc00f38><span class="indexed" data-v-5fc00f38>${ssrInterpolate(unref(state).index + 1)} / ${ssrInterpolate(unref(playlist).total)}</span>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "playlist-link",
        href: unref(VALUABLE_LINKS).MUSIC_163
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-new-window-s" data-v-5fc00f38${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-new-window-s" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="toggle-muted"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-5fc00f38><i class="${ssrRenderClass([unref(state).muted ? "icon-music-muted" : "icon-music-unmuted", "iconfont"])}" data-v-5fc00f38></i></button><input class="volume" type="range" min="0.1" max="1" step="0.1"${ssrRenderAttr("value", unref(state).volume)} data-v-5fc00f38></div></div><div class="progress" data-v-5fc00f38><div class="played" style="${ssrRenderStyle({ width: `${unref(state).progress * 100}%` })}" data-v-5fc00f38></div></div><div class="songs" data-v-5fc00f38><ul class="list" data-v-5fc00f38><!--[-->`);
      ssrRenderList(unref(playlist).songs, (song, index) => {
        _push(`<li class="${ssrRenderClass([{ playing: unref(state).index === index, unplayable: isUnPlayableSong(index) }, "item"])}" data-v-5fc00f38><div class="index" data-v-5fc00f38>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</div>`);
        if (unref(state).index === index) {
          _push(`<span class="play" data-v-5fc00f38><i class="iconfont icon-music-unmuted" data-v-5fc00f38></i></span>`);
        } else {
          _push(`<button class="play"${ssrIncludeBooleanAttr(isUnPlayableSong(index)) ? " disabled" : ""} data-v-5fc00f38><i class="iconfont icon-music-play" data-v-5fc00f38></i></button>`);
        }
        _push(ssrRenderComponent(_component_ulink, {
          class: "name",
          title: song.name,
          href: unref(get163MusicSongDetailURL)(song.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text" data-v-5fc00f38${_scopeId}>${ssrInterpolate(song.name)}</span><i class="iconfont icon-new-window-s" data-v-5fc00f38${_scopeId}></i>`);
            } else {
              return [
                createVNode("span", { class: "text" }, toDisplayString(song.name), 1),
                createVNode("i", { class: "iconfont icon-new-window-s" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="artist"${ssrRenderAttr("title", song.artist)} data-v-5fc00f38>${ssrInterpolate(song.artist)}</div><div class="duration" data-v-5fc00f38>${ssrInterpolate(getSecondsView(song.duration / 1e3))}</div></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const player_vue_vue_type_style_index_0_scoped_5fc00f38_lang = "";
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/music-player/player.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const MusicPlayer = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-5fc00f38"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
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
      var _a;
      const _component_i18n = resolveComponent("i18n");
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      _push(`<!--[--><div id="player" class="${ssrRenderClass({ playing: unref(state).playing })}" data-v-09ff990d><div class="panel" data-v-09ff990d><div class="control" data-v-09ff990d><button class="prev-song button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-09ff990d><i class="iconfont icon-music-prev" data-v-09ff990d></i></button><button class="next-song button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-09ff990d><i class="iconfont icon-music-next" data-v-09ff990d></i></button><button class="muted-toggle button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-09ff990d><i class="${ssrRenderClass([unref(state).muted ? "icon-music-muted" : "icon-music-unmuted", "iconfont"])}" data-v-09ff990d></i></button><button class="player button" data-v-09ff990d><i class="iconfont icon-netease-music" data-v-09ff990d></i></button></div><button class="song-link" data-v-09ff990d>`);
      if (unref(currentSong)) {
        _push(`<span data-v-09ff990d>${ssrInterpolate(unref(currentSong).name)}</span>`);
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LanguageKey).MUSIC_PLACEHOLDER
        }, null, _parent));
      }
      _push(`</button></div><div class="cd" data-v-09ff990d><img class="image"${ssrRenderAttr("src", unref(useCoverArtURL)((_a = unref(currentSong)) == null ? void 0 : _a.cover_art_url))} data-v-09ff990d><button class="toggle-button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-09ff990d><i class="${ssrRenderClass([unref(state).playing ? "icon-music-pause" : "icon-music-play", "iconfont"])}" data-v-09ff990d></i></button></div><div class="trigger" data-v-09ff990d><i class="iconfont icon-music" data-v-09ff990d></i></div></div>`);
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
const handle_vue_vue_type_style_index_0_scoped_09ff990d_lang = "";
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/music-player/handle.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const MusicPlayerHandle = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-09ff990d"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
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
  setup(__props, { emit }) {
    const props = __props;
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
      }, _attrs))} data-v-aab00827>`);
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
const flower_vue_vue_type_style_index_0_scoped_aab00827_lang = "";
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/wallflower/flower.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const Flower = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-aab00827"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "garden",
  __ssrInlineRender: true,
  setup(__props) {
    const EN_FLOWERS = ["💙", "🤍", "❤️"];
    const ZH_FLOWERS = [
      ...["富强", "民主", "文明", "和谐", "自由", "平等"],
      ...["公正", "法治", "爱国", "敬业", "诚信", "友善"]
    ];
    const { isZhLang } = useEnhancer();
    const state = reactive({
      id: 0,
      contentIndex: -1,
      flowers: []
    });
    const handleClick = (event) => {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "wallflower" }, _attrs))} data-v-6acc29ac>`);
      if (state.flowers.length) {
        _push(`<ul class="garden-box" data-v-6acc29ac><!--[-->`);
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
const garden_vue_vue_type_style_index_0_scoped_6acc29ac_lang = "";
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/wallflower/garden.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const Wallflower = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-6acc29ac"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "wall",
  __ssrInlineRender: true,
  setup(__props, { emit }) {
    const { i18n: _i18n } = useEnhancer();
    const wallpaperStore = useWallpaperStore();
    const wallpapers = computed(() => wallpaperStore.papers(_i18n.language.value));
    const index = ref(0);
    const activePaper = computed(() => {
      var _a;
      return (_a = wallpapers.value) == null ? void 0 : _a[index.value];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wall" }, _attrs))} data-v-0e9a9a43><div class="picture-box"${ssrRenderAttr("title", activePaper.value.copyright)} style="${ssrRenderStyle({ backgroundImage: `url(${activePaper.value.humanizedImageUrl})` })}" data-v-0e9a9a43></div><div class="story-box" data-v-0e9a9a43>`);
      if (activePaper.value.title) {
        _push(`<!--[--><h2 class="title" data-v-0e9a9a43>${ssrInterpolate(activePaper.value.title)}</h2><p class="sub-title" data-v-0e9a9a43>${ssrInterpolate(activePaper.value.copyright)}</p><!--]-->`);
      } else {
        _push(`<h2 class="title lonely" data-v-0e9a9a43>${ssrInterpolate(activePaper.value.copyright)}</h2>`);
      }
      _push(`<p class="desc" data-v-0e9a9a43>${ssrInterpolate(activePaper.value.desc)}</p><div class="tools" data-v-0e9a9a43>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: activePaper.value.humanizedCopyrightUrl,
        title: activePaper.value.bsTitle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-bing" data-v-0e9a9a43${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-bing" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="button" title="Prev"${ssrIncludeBooleanAttr(index.value <= 0) ? " disabled" : ""} data-v-0e9a9a43><i class="iconfont icon-prev" data-v-0e9a9a43></i></button><button class="button" title="Next"${ssrIncludeBooleanAttr(index.value >= wallpapers.value.length - 1) ? " disabled" : ""} data-v-0e9a9a43><i class="iconfont icon-next" data-v-0e9a9a43></i></button><button class="button" title="Close" data-v-0e9a9a43><i class="iconfont icon-cancel" data-v-0e9a9a43></i></button></div></div></div>`);
    };
  }
});
const wall_vue_vue_type_style_index_0_scoped_0e9a9a43_lang = "";
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/wallpaper/wall.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const Wallpapers = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-0e9a9a43"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "switcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, gtag, isDarkTheme } = useEnhancer();
    const wallpaperStore = useWallpaperStore();
    computed(() => wallpaperStore.papers(_i18n.language.value));
    const isOnWallpaper = ref(false);
    const handleCloseWallpaper = () => {
      isOnWallpaper.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      _push(`<!--[--><div id="wallpaper" data-v-03a75543><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "switcher"])}" data-v-03a75543><div class="title" data-v-03a75543><i class="iconfont icon-bing" data-v-03a75543></i><span class="text" data-v-03a75543>BING</span></div></div></div>`);
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
const switcher_vue_vue_type_style_index_0_scoped_03a75543_lang = "";
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/wallpaper/switcher.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const Wallpaper = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-03a75543"]]);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "background",
  __ssrInlineRender: true,
  setup(__props) {
    const { isDarkTheme } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "background" }, _attrs))} data-v-1f6e3f9b><div class="${ssrRenderClass([{ dark: unref(isDarkTheme) }, "image"])}" data-v-1f6e3f9b></div></div>`);
    };
  }
});
const background_vue_vue_type_style_index_0_scoped_1f6e3f9b_lang = "";
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/background.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const Background = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-1f6e3f9b"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "toolbox",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, gtag, gState } = useEnhancer();
    ref(0);
    ref(false);
    ref(false);
    const handleRSS = () => {
      gtag == null ? void 0 : gtag.event("rss", {
        event_category: GAEventCategories.Widget
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "toolbox" }, _attrs))} data-v-df26e765><div class="container" data-v-df26e765><div class="tools" data-v-df26e765>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "rss",
        href: unref(VALUABLE_LINKS).RSS,
        onMousedown: handleRSS
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-rss" data-v-df26e765${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-rss" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="feedback"${ssrRenderAttr("title", unref(_i18n).t(unref(LanguageKey).FEEDBACK))} data-v-df26e765><i class="iconfont icon-mail-plane" data-v-df26e765></i></button><button class="to-page-top"${ssrRenderAttr("title", unref(_i18n).t(unref(LanguageKey).TO_TOP))} data-v-df26e765><i class="iconfont icon-totop" data-v-df26e765></i></button><button class="to-page-bottom"${ssrRenderAttr("title", unref(_i18n).t(unref(LanguageKey).TO_BOTTOM))} data-v-df26e765><i class="iconfont icon-tobottom" data-v-df26e765></i></button></div></div></div>`);
    };
  }
});
const toolbox_vue_vue_type_style_index_0_scoped_df26e765_lang = "";
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/toolbox.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const Toolbox = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-df26e765"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "feedback",
  __ssrInlineRender: true,
  setup(__props, { emit }) {
    const EMOTIONS = [
      { emoji: "😠", value: 1, en: "Terrible", zh: "差劲" },
      { emoji: "🙁", value: 2, en: "Bad", zh: "不喜欢" },
      { emoji: "😐", value: 3, en: "Neutral", zh: "无感" },
      { emoji: "😃", value: 4, en: "Great", zh: "喜欢" },
      { emoji: "🥰", value: 5, en: "Amazing", zh: "太棒了" }
    ];
    const { appOption, identity } = useStores();
    const { gtag, isZhLang } = useEnhancer();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "feedback" }, _attrs))} data-v-3cf17bb5>`);
      if (state.submitted) {
        _push(`<div class="submitted" data-v-3cf17bb5><div class="icon" data-v-3cf17bb5><i class="iconfont icon-success" data-v-3cf17bb5></i></div><div class="text" data-v-3cf17bb5>`);
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
        _push(`</div><button class="close" data-v-3cf17bb5>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "关闭窗口",
          en: "Close"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!--[--><div class="title" data-v-3cf17bb5>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`你认为 ${ssrInterpolate(unref(META).title)} 整体怎么样？`);
            } else {
              return [
                createTextVNode("你认为 " + toDisplayString(unref(META).title) + " 整体怎么样？", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`How would you rate ${ssrInterpolate(unref(META).title)}?`);
            } else {
              return [
                createTextVNode("How would you rate " + toDisplayString(unref(META).title) + "?", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="emotions" data-v-3cf17bb5><!--[-->`);
        ssrRenderList(EMOTIONS, (emotion) => {
          _push(`<li class="item" data-v-3cf17bb5><label data-v-3cf17bb5><input class="radio" type="radio"${ssrRenderAttr("value", emotion.value)}${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""}${ssrIncludeBooleanAttr(ssrLooseEqual(state.emotion, emotion.value)) ? " checked" : ""} data-v-3cf17bb5><div class="${ssrRenderClass([{ activated: state.emotion === emotion.value }, "button"])}" data-v-3cf17bb5><span class="emoji" data-v-3cf17bb5>${ssrInterpolate(emotion.emoji)}</span><span class="text" data-v-3cf17bb5>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: emotion.zh,
            en: emotion.en
          }, null, _parent));
          _push(`</span></div></label>`);
          if (state.emotion === emotion.value) {
            _push(`<div class="arrow" data-v-3cf17bb5></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></div><div class="input" data-v-3cf17bb5><textarea class="textarea" name="feedback" id="feedback" rows="10"${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(isZhLang) ? "你可在此畅所欲言，这将仅对博主可见" : "Tell me about your opinion...")} data-v-3cf17bb5>${ssrInterpolate(state.content)}</textarea><div class="buttons" data-v-3cf17bb5><button class="item cancel"${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""} data-v-3cf17bb5><span class="text" data-v-3cf17bb5>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "取消",
          en: "Cancel"
        }, null, _parent));
        _push(`</span></button><button class="item submit"${ssrIncludeBooleanAttr(!isSubmitable.value || state.submitting) ? " disabled" : ""} data-v-3cf17bb5><i class="iconfont icon-mail-plane" data-v-3cf17bb5></i><span class="text" data-v-3cf17bb5>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: state.submitting ? unref(LanguageKey).SUBMITTING : unref(LanguageKey).SUBMIT
        }, null, _parent));
        _push(`</span></button></div></div><!--]-->`);
      }
      if (unref(identity).feedbacks.length) {
        _push(`<div class="history" data-v-3cf17bb5>`);
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
const feedback_vue_vue_type_style_index_0_scoped_3cf17bb5_lang = "";
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/feedback.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const Feedback = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-3cf17bb5"]]);
const emailLink = (email) => {
  if (typeof email === "string") {
    return `mailto:${email}`;
  }
  const { email: _email, ...content } = email;
  return `mailto:${_email}?` + qs.stringify(content);
};
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "statement",
  __ssrInlineRender: true,
  setup(__props) {
    const { appOption } = useStores();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "statement" }, _attrs))} data-v-a70a439b><div class="content" data-v-a70a439b>`);
      _push(ssrRenderComponent(_sfc_main$1n, {
        markdown: (_a = unref(appOption).data) == null ? void 0 : _a.statement,
        compact: true
      }, null, _parent));
      _push(`<br data-v-a70a439b><hr data-v-a70a439b>`);
      if (unref(appOption).data) {
        _push(`<p class="email" data-v-a70a439b><a${ssrRenderAttr("href", unref(emailLink)(unref(appOption).data.site_email))} class="link" target="_blank" data-v-a70a439b><i class="iconfont icon-mail" data-v-a70a439b></i><span class="text" data-v-a70a439b>${ssrInterpolate(unref(appOption).data.site_email)}</span></a></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const statement_vue_vue_type_style_index_0_scoped_a70a439b_lang = "";
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/statement.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const Statement = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-a70a439b"]]);
const menus = [
  {
    id: RouteName.Home,
    route: "/",
    icon: "icon-home",
    i18nKey: LanguageKey.PAGE_HOME
  },
  {
    id: CategorySlug.Code,
    route: getCategoryFlowRoute(CategorySlug.Code),
    icon: "icon-code",
    i18nKey: LanguageKey.CATEGORY_CODE
  },
  {
    id: CategorySlug.Insight,
    route: getCategoryFlowRoute(CategorySlug.Insight),
    icon: "icon-insight",
    i18nKey: LanguageKey.CATEGORY_INSIGHT
  },
  {
    id: "github",
    url: VALUABLE_LINKS.GITHUB,
    icon: "icon-github",
    i18nKey: LanguageKey.PAGE_GITHUB,
    newWindow: true
  },
  {
    id: RouteName.Photography,
    route: getPageRoute(RouteName.Photography),
    icon: "icon-lens",
    i18nKey: LanguageKey.PAGE_PHOTOGRAPHY
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    icon: "icon-swordsman",
    i18nKey: LanguageKey.PAGE_ABOUT
  },
  {
    id: RouteName.Guestbook,
    route: getPageRoute(RouteName.Guestbook),
    i18nKey: LanguageKey.PAGE_GUESTBOOK,
    icon: "icon-comment"
  },
  {
    id: RouteName.App,
    route: getPageRoute(RouteName.App),
    imageIcon: getPageURL("/images/page-app/logo.png"),
    i18nKey: LanguageKey.PAGE_APP,
    divider: true
  },
  {
    id: "sponsor",
    route: getPageRoute(RouteName.Sponsor),
    icon: "icon-peachblossom",
    i18nKey: LanguageKey.PAGE_SPONSOR,
    hot: true,
    divider: true
  }
];
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "nav",
  __ssrInlineRender: true,
  setup(__props) {
    const { adConfig } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(NAV_ELEMENT_ID),
        class: "desktop-nav"
      }, _attrs))} data-v-65408c24><nav class="nav-list" data-v-65408c24><!--[-->`);
      ssrRenderList(unref(menus), (menu) => {
        _push(`<!--[-->`);
        if (menu.divider) {
          _push(`<span class="divider" data-v-65408c24></span>`);
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
                _push2(`<i class="${ssrRenderClass([menu.icon, "font-icon iconfont"])}" data-v-65408c24${_scopeId}></i>`);
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
                _push2(`<span class="superscript new-window" data-v-65408c24${_scopeId}><i class="iconfont icon-new-window-s" data-v-65408c24${_scopeId}></i></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (menu.hot) {
                _push2(`<span class="superscript hot" data-v-65408c24${_scopeId}><i class="iconfont icon-hot-fill" data-v-65408c24${_scopeId}></i></span>`);
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
        _push(`<!--[--><span class="divider" data-v-65408c24></span>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "item",
          href: ad.url,
          style: { color: ad.color }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass([ad.icon, "font-icon iconfont"])}" data-v-65408c24${_scopeId}></i><span class="ad-text" data-v-65408c24${_scopeId}>`);
              if (ad.i18n) {
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: ad.i18n.zh,
                  en: ad.i18n.en
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!--[-->${ssrInterpolate(ad.text)}<!--]-->`);
              }
              _push2(`</span><span class="superscript" data-v-65408c24${_scopeId}><i class="iconfont icon-ad" data-v-65408c24${_scopeId}></i></span>`);
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
const nav_vue_vue_type_style_index_0_scoped_65408c24_lang = "";
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/nav.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const NavView = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-65408c24"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, gtag, route, router } = useEnhancer();
    ref();
    const keyword = ref("");
    onMounted(() => {
      if (isSearchFlow(route.name)) {
        keyword.value = route.params.keyword;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search" }, _attrs))} data-v-d355d98f><form class="search-box" data-v-d355d98f><input id="keyword" required type="search" name="search" maxlength="16" autocomplete="off"${ssrRenderAttr("value", keyword.value)} class="${ssrRenderClass([unref(_i18n).language, "search-input"])}"${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LanguageKey).SEARCH_PLACEHOLDER))} data-v-d355d98f><button type="submit" class="search-btn" data-v-d355d98f><i class="iconfont icon-search" data-v-d355d98f></i></button></form>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "extra-btn",
        to: { name: unref(RouteName).Sponsor }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-peachblossom" data-v-d355d98f${_scopeId}></i>`);
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
const search_vue_vue_type_style_index_0_scoped_d355d98f_lang = "";
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/search.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const AsideSearch = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-d355d98f"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
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
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="item" data-v-2e611067${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticSkeleton), {
              fetching: fetching.value,
              count: (_a = unref(statisticStore).data) == null ? void 0 : _a.articles
            }, null, _parent2, _scopeId));
            _push2(`<span class="title" data-v-2e611067${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).STATISTIC_ARTICLES
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-2e611067${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticSkeleton), {
              fetching: fetching.value,
              count: (_b = unref(statisticStore).data) == null ? void 0 : _b.todayViews
            }, null, _parent2, _scopeId));
            _push2(`<span class="title" data-v-2e611067${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).STATISTIC_TODAY_VIEWS
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-2e611067${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticSkeleton), {
              fetching: fetching.value,
              count: (_c = unref(statisticStore).data) == null ? void 0 : _c.comments
            }, null, _parent2, _scopeId));
            _push2(`<span class="title" data-v-2e611067${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).STATISTIC_COMMENTS
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
          } else {
            return [
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticSkeleton), {
                  fetching: fetching.value,
                  count: (_d = unref(statisticStore).data) == null ? void 0 : _d.articles
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "title" }, [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).STATISTIC_ARTICLES
                  }, null, 8, ["k"])
                ])
              ]),
              createVNode(_component_divider, { type: "vertical" }),
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticSkeleton), {
                  fetching: fetching.value,
                  count: (_e = unref(statisticStore).data) == null ? void 0 : _e.todayViews
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "title" }, [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).STATISTIC_TODAY_VIEWS
                  }, null, 8, ["k"])
                ])
              ]),
              createVNode(_component_divider, { type: "vertical" }),
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticSkeleton), {
                  fetching: fetching.value,
                  count: (_f = unref(statisticStore).data) == null ? void 0 : _f.comments
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "title" }, [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).STATISTIC_COMMENTS
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
const statistic_vue_vue_type_style_index_0_scoped_2e611067_lang = "";
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/statistic.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const AsideStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-2e611067"]]);
const PER_PAGE = 8;
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "article",
  __ssrInlineRender: true,
  setup(__props) {
    const hottestArticleListStore = useHottestArticleListStore();
    const articleFullList = computed(() => {
      return hottestArticleListStore.data.slice(0, PER_PAGE * 2).map((a, i) => ({ ...a, i: i + 1 }));
    });
    const hotPage = ref(0);
    const articles = computed(() => {
      const perPage = hotPage.value * PER_PAGE;
      return articleFullList.value.map((a, i) => ({ ...a, i: i + 1 })).slice(perPage, perPage + PER_PAGE);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article" }, _attrs))} data-v-c1708cc0><div class="header" data-v-c1708cc0><span class="title" data-v-c1708cc0><i class="iconfont icon-hotfill" data-v-c1708cc0></i>`);
      _push(ssrRenderComponent(_component_webfont, { class: "text" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).HOT_ARTICLE_LIST_TITLE
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LanguageKey).HOT_ARTICLE_LIST_TITLE
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span><button class="switch" data-v-c1708cc0><i class="iconfont icon-switch" data-v-c1708cc0></i></button></div>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: articles.value,
        loading: unref(hottestArticleListStore).fetching,
        "i18n-key": unref(LanguageKey).ARTICLE_PLACEHOLDER
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="article-list-skeleton" data-v-c1708cc0${_scopeId}><!--[-->`);
            ssrRenderList(5, (item) => {
              _push2(`<li class="item" data-v-c1708cc0${_scopeId}>`);
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
            _push2(`<ul class="article-list" data-v-c1708cc0${_scopeId}><!--[-->`);
            ssrRenderList(articles.value, (item) => {
              _push2(`<li class="item" data-v-c1708cc0${_scopeId}><span class="${ssrRenderClass([{ small: item.i >= 10 }, "index"])}"${ssrRenderAttr("data-index", item.i)} data-v-c1708cc0${_scopeId}>${ssrInterpolate(item.i)}</span><div class="content" data-v-c1708cc0${_scopeId}>`);
              _push2(ssrRenderComponent(_component_router_link, {
                class: "title",
                to: unref(getArticleDetailRoute)(item.id),
                title: item.title
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(item.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(item.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<div class="meta" data-v-c1708cc0${_scopeId}><span class="item date" data-v-c1708cc0${_scopeId}>${ssrInterpolate(unref(dateToYMD)(item.created_at))}</span><span class="item views" data-v-c1708cc0${_scopeId}><i class="iconfont icon-eye" data-v-c1708cc0${_scopeId}></i> ${ssrInterpolate(unref(numberToKilo)(item.meta.views))}</span><span class="item comments" data-v-c1708cc0${_scopeId}><i class="iconfont icon-comment" data-v-c1708cc0${_scopeId}></i> ${ssrInterpolate(item.meta.comments)}</span></div></div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", {
                class: "article-list",
                key: "list"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(articles.value, (item) => {
                  return openBlock(), createBlock("li", {
                    key: item.id,
                    class: "item"
                  }, [
                    createVNode("span", {
                      class: ["index", { small: item.i >= 10 }],
                      "data-index": item.i
                    }, toDisplayString(item.i), 11, ["data-index"]),
                    createVNode("div", { class: "content" }, [
                      createVNode(_component_router_link, {
                        class: "title",
                        to: unref(getArticleDetailRoute)(item.id),
                        title: item.title
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(item.title), 1)
                        ]),
                        _: 2
                      }, 1032, ["to", "title"]),
                      createVNode("div", { class: "meta" }, [
                        createVNode("span", { class: "item date" }, toDisplayString(unref(dateToYMD)(item.created_at)), 1),
                        createVNode("span", { class: "item views" }, [
                          createVNode("i", { class: "iconfont icon-eye" }),
                          createTextVNode(" " + toDisplayString(unref(numberToKilo)(item.meta.views)), 1)
                        ]),
                        createVNode("span", { class: "item comments" }, [
                          createVNode("i", { class: "iconfont icon-comment" }),
                          createTextVNode(" " + toDisplayString(item.meta.comments), 1)
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
const article_vue_vue_type_style_index_0_scoped_c1708cc0_lang = "";
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/article.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const AsideArticle = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-c1708cc0"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "mammon",
  __ssrInlineRender: true,
  props: {
    index: { default: 0 }
  },
  setup(__props, { emit }) {
    const props = __props;
    const { adConfig } = useEnhancer();
    const swiperRef = shallowRef();
    const updateSwiper = (_swiper) => {
      swiperRef.value = _swiper;
      emit("ready", swiperRef.value);
    };
    const handleSlideChange = () => {
      var _a;
      const realIndex = (_a = swiperRef.value) == null ? void 0 : _a.realIndex;
      emit("update:index", realIndex);
      emit("index-change", realIndex);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mammon" }, _attrs))} data-v-cde6c85f>`);
      _push(ssrRenderComponent(unref(Swiper$1), {
        class: "swiper",
        direction: "vertical",
        "initial-slide": props.index,
        loop: true,
        "simulate-touch": false,
        autoplay: { delay: 2800, disableOnInteraction: false },
        pagination: { clickable: true },
        "set-wrapper-size": true,
        "auto-height": true,
        mousewheel: true,
        "observe-parents": true,
        onSwiper: updateSwiper,
        onSlideChangeTransitionEnd: handleSlideChange
      }, {
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
                          _push4(`<i class="iconfont icon-ad" data-v-cde6c85f${_scopeId3}></i>`);
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
const mammon_vue_vue_type_style_index_0_scoped_cde6c85f_lang = "";
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/mammon.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const AsideMammon = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-cde6c85f"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "tag",
  __ssrInlineRender: true,
  setup(__props) {
    const tagStore = useTagStore();
    const getTagIcon = (tag) => {
      return getExtendValue(tag.extends || [], "icon") || "icon-tag";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton_line = resolveComponent("skeleton-line");
      const _component_router_link = resolveComponent("router-link");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tags" }, _attrs))} data-v-80ce773a>`);
      _push(ssrRenderComponent(_component_placeholder, {
        data: unref(tagStore).sorted.length,
        fetching: unref(tagStore).fetching,
        "i18n-key": unref(LanguageKey).TAG_PLACEHOLDER
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="tag-list-skeleton" data-v-80ce773a${_scopeId}><!--[-->`);
            ssrRenderList(14, (item) => {
              _push2(`<li class="item" data-v-80ce773a${_scopeId}>`);
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
            _push2(`<div class="tag-list" data-v-80ce773a${_scopeId}><!--[-->`);
            ssrRenderList(unref(tagStore).sorted, (tag, index) => {
              _push2(ssrRenderComponent(_component_router_link, {
                class: "item",
                title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
                to: unref(getTagFlowRoute)(tag.slug),
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="${ssrRenderClass([getTagIcon(tag), "iconfont"])}" data-v-80ce773a${_scopeId2}></i><span class="name" data-v-80ce773a${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_i18n, {
                      zh: tag.name,
                      en: unref(getTagEnName)(tag)
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="count" data-v-80ce773a${_scopeId2}>(${ssrInterpolate(tag.article_count || 0)})</span></span>`);
                  } else {
                    return [
                      createVNode("i", {
                        class: ["iconfont", getTagIcon(tag)]
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
                        class: ["iconfont", getTagIcon(tag)]
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
const tag_vue_vue_type_style_index_0_scoped_80ce773a_lang = "";
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/tag.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const AsideTag = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-80ce773a"]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "anchor",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useArticleDetailStore();
    const headings = computed(() => {
      var _a, _b;
      const result = [...((_a = store.defaultContent) == null ? void 0 : _a.headings) || []];
      if (store.isLongContent && store.renderedFullContent) {
        result.push(...((_b = store.moreContent) == null ? void 0 : _b.headings) || []);
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "anchor" }, _attrs))} data-v-3ce744ec><button class="header"${ssrRenderAttr("title", unref(store).article.title)} data-v-3ce744ec><div class="title" data-v-3ce744ec>${ssrInterpolate(unref(store).article.title)}</div><div class="read" data-v-3ce744ec>`);
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
              _push2(`${ssrInterpolate(unref(numberSplit)(unref(store).contentLength))} words, ${ssrInterpolate(unref(store).readMinutes)} min read`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(numberSplit)(unref(store).contentLength)) + " words, " + toDisplayString(unref(store).readMinutes) + " min read", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></button>`);
        if (headings.value.length) {
          _push(`<div class="catalogue" data-v-3ce744ec><ul class="${ssrRenderClass([`indent-${minHeadingLevel.value}`, "list"])}" data-v-3ce744ec><!--[-->`);
          ssrRenderList(headings.value, (heading, index) => {
            _push(`<li${ssrRenderAttr("title", heading.text)} class="${ssrRenderClass([`level-${heading.level}`, "item"])}" data-v-3ce744ec><i class="${ssrRenderClass([`icon-h-${heading.level}`, "level iconfont"])}" data-v-3ce744ec></i><span class="text" data-v-3ce744ec>${ssrInterpolate(heading.text)}</span></li>`);
          });
          _push(`<!--]-->`);
          if (unref(store).isLongContent && !unref(store).renderedFullContent) {
            _push(`<li class="${ssrRenderClass([`level-${minHeadingLevel.value}`, "item readmore"])}" data-v-3ce744ec><i class="level iconfont icon-loadmore" data-v-3ce744ec></i><span class="text" data-v-3ce744ec>`);
            _push(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).ARTICLE_READ_ALL
            }, null, _parent));
            _push(`</span></li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="link" data-v-3ce744ec><i class="iconfont icon-heart" data-v-3ce744ec></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "摁赞",
          en: "Meta"
        }, null, _parent));
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="meta" data-v-3ce744ec><i class="iconfont icon-like" data-v-3ce744ec></i><span class="count" data-v-3ce744ec>${ssrInterpolate(unref(store).article.meta.likes)}</span></span>`);
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="meta" data-v-3ce744ec><i class="iconfont icon-eye" data-v-3ce744ec></i><span class="count" data-v-3ce744ec>${ssrInterpolate(unref(numberSplit)(unref(store).article.meta.views))}</span></span></button><button class="link" data-v-3ce744ec><i class="iconfont icon-category" data-v-3ce744ec></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "相关",
          en: "Related"
        }, null, _parent));
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="count" data-v-3ce744ec>${ssrInterpolate(unref(store).relatedArticles.length)}</span></button><button class="link" data-v-3ce744ec><i class="iconfont icon-comment" data-v-3ce744ec></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "评论",
          en: "Comments"
        }, null, _parent));
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<span class="count" data-v-3ce744ec>${ssrInterpolate(unref(store).article.meta.comments)}</span></button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const anchor_vue_vue_type_style_index_0_scoped_3ce744ec_lang = "";
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/anchor.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const AsideAnchor = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-3ce744ec"]]);
const _sfc_main$a = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "calendar" }, _attrs))} data-v-ead14c8a><div class="header" data-v-ead14c8a><button class="item arrow" data-v-ead14c8a><i class="iconfont icon-prev" data-v-ead14c8a></i></button><span class="item year-month" data-v-ead14c8a>${ssrInterpolate(headerText.value)}</span><button class="item arrow" data-v-ead14c8a><i class="iconfont icon-next" data-v-ead14c8a></i></button></div><ul class="weekdays" data-v-ead14c8a><!--[-->`);
      ssrRenderList(weekDayTexts.value, (day, index) => {
        _push(`<li data-v-ead14c8a>${ssrInterpolate(day)}</li>`);
      });
      _push(`<!--]--></ul><ul class="days" data-v-ead14c8a><!--[-->`);
      ssrRenderList(tableView.table, (item, index) => {
        _push(`<li data-v-ead14c8a><div class="${ssrRenderClass([{ today: isToday(item), other: item.month !== tableView.month }, "item"])}" data-v-ead14c8a>`);
        ssrRenderSlot(_ctx.$slots, "day", item, () => {
          _push(`${ssrInterpolate(item.day)}`);
        }, _push, _parent);
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const calendar_vue_vue_type_style_index_0_scoped_ead14c8a_lang = "";
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/widget/calendar.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-ead14c8a"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  setup(__props) {
    const { articleCalendar } = useStores();
    const articlesIn = (targetDate) => {
      var _a;
      const ymd = humanDateToYMD(targetDate);
      return ((_a = articleCalendar.data.find((item) => item.date === ymd)) == null ? void 0 : _a.count) || 0;
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
              _push2(`<span class="date-span" data-v-b7d53c96${_scopeId}>${ssrInterpolate(humanDate.day)}</span>`);
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
const calendar_vue_vue_type_style_index_0_scoped_b7d53c96_lang = "";
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/calendar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const AsideCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-b7d53c96"]]);
const ASIDE_STICKY_ELEMENT_ID = "aside-sticky-module";
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isArticlePage = computed(() => isArticleDetail(route.name));
    let stickyEvents = null;
    const element = ref(null);
    const handleStickyStateChange = () => {
      var _a, _b;
      (_b = (_a = document.getElementById(MAIN_CONTENT_ELEMENT_ID)) == null ? void 0 : _a.children) == null ? void 0 : _b[0];
    };
    onMounted(() => {
      nextTick(() => {
        var _a, _b;
        stickyEvents = new window.$StickyEvents({
          enabled: true,
          stickySelector: `#${ASIDE_STICKY_ELEMENT_ID}`
        });
        (_b = (_a = stickyEvents.stickyElements) == null ? void 0 : _a[0]) == null ? void 0 : _b.addEventListener(window.$StickyEvents.CHANGE, handleStickyStateChange);
      });
    });
    onBeforeUnmount(() => {
      var _a, _b;
      (_b = (_a = stickyEvents.stickyElements) == null ? void 0 : _a[0]) == null ? void 0 : _b.removeEventListener(window.$StickyEvents.CHANGE, handleStickyStateChange);
      stickyEvents.disableEvents(false);
      stickyEvents = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_Adsense = resolveComponent("Adsense");
      _push(`<aside${ssrRenderAttrs(mergeProps({
        id: unref(ASIDE_ELEMENT_ID),
        class: "desktop-aside",
        ref_key: "element",
        ref: element
      }, _attrs))} data-v-10d6f735><div class="module" data-v-10d6f735>`);
      _push(ssrRenderComponent(AsideSearch, null, null, _parent));
      _push(`</div><div class="module" data-v-10d6f735>`);
      _push(ssrRenderComponent(AsideStatistic, null, null, _parent));
      _push(`</div><div class="module" data-v-10d6f735>`);
      _push(ssrRenderComponent(AsideArticle, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_client_only, { transition: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module mammon" data-v-10d6f735${_scopeId}>`);
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
      _push(`<div class="module" data-v-10d6f735>`);
      _push(ssrRenderComponent(AsideCalendar, null, null, _parent));
      _push(`</div><div${ssrRenderAttr("id", ASIDE_STICKY_ELEMENT_ID)} class="aside-sticky-box" data-v-10d6f735><div class="module mammon-square" data-v-10d6f735>`);
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
      _push(`</div><div class="module" data-v-10d6f735>`);
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
const index_vue_vue_type_style_index_0_scoped_10d6f735_lang = "";
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/aside/index.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const AsideView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-10d6f735"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, gtag, theme, gState } = useEnhancer();
    const isEnabledNav = computed(() => !gState.layoutColumn.value.isNormal);
    const themeIcon = computed(() => {
      const themeIconMap = {
        [Theme.Light]: "icon-sun",
        [Theme.Dark]: "icon-moon"
      };
      return themeIconMap[theme.theme.value];
    });
    const handleRootNavEvent = () => {
      gtag == null ? void 0 : gtag.event("root_header_home_nav", {
        event_category: GAEventCategories.Universal
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      const _component_ulink = resolveComponent("ulink");
      _push(`<header${ssrRenderAttrs(mergeProps({
        id: unref(HEADER_ELEMENT_ID),
        class: ["header", { "enable-nav": isEnabledNav.value }]
      }, _attrs))} data-v-65a201c4><div class="header-container container" data-v-65a201c4><div class="header-header" data-v-65a201c4>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        src: "/images/logo.svg",
        class: "header-logo",
        alt: unref(META).title
      }, null, _parent));
      _push(ssrRenderComponent(_component_webfont, { class: "header-slogan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LanguageKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "header-link",
        title: unref(META).title,
        onMousedown: handleRootNavEvent
      }, null, _parent));
      _push(`</div><div class="toolbox" data-v-65a201c4>`);
      if (isEnabledNav.value) {
        _push(`<button class="button menu" data-v-65a201c4><i class="iconfont icon-top-menu" data-v-65a201c4></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="button language" title="Switch language" data-v-65a201c4>${ssrInterpolate(unref(_i18n).language.value || "-")}</button><button class="${ssrRenderClass([unref(theme).theme.value, "button theme"])}" data-v-65a201c4><i class="${ssrRenderClass([themeIcon.value, "iconfont"])}" data-v-65a201c4></i></button></div></div><div class="header-nav" data-v-65a201c4><nav class="nav-list container" data-v-65a201c4><!--[-->`);
      ssrRenderList(unref(menus), (menu, index) => {
        _push(`<!--[-->`);
        if (index > 0) {
          _push(`<span class="divider" data-v-65a201c4></span>`);
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
                _push2(`<i class="${ssrRenderClass([menu.icon, "font-icon iconfont"])}" data-v-65a201c4${_scopeId}></i>`);
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
                _push2(`<span class="superscript" data-v-65a201c4${_scopeId}><i class="iconfont icon-hot-fill" data-v-65a201c4${_scopeId}></i></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (menu.newWindow) {
                _push2(`<span class="new-window" data-v-65a201c4${_scopeId}><i class="iconfont icon-new-window-s" data-v-65a201c4${_scopeId}></i></span>`);
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
const header_vue_vue_type_style_index_0_scoped_65a201c4_lang = "";
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/header.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const HeaderView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-65a201c4"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { gState, gtag } = useEnhancer();
    const handleStatementModal = () => {
      gState.toggleSwitcher("statement", true);
      gtag == null ? void 0 : gtag.event("statement_modal", {
        event_category: GAEventCategories.Universal
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_container = resolveComponent("container");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_i18n = resolveComponent("i18n");
      _push(ssrRenderComponent(_component_container, mergeProps({
        tag: "footer",
        id: unref(FOOTER_ELEMENT_ID),
        class: "footer"
      }, _attrs), {
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
            _push2(`<a class="statement" href="javascript:void(0)" data-v-8a503d55${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "周知",
              en: "FAQ"
            }, null, _parent2, _scopeId));
            _push2(`</a>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              href: unref(VALUABLE_LINKS).UPTIME_STATUS
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
                href: unref(VALUABLE_LINKS).UPTIME_STATUS
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
const footer_vue_vue_type_style_index_0_scoped_8a503d55_lang = "";
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/footer.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const FooterView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-8a503d55"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const sponsorState = useSponsorState();
    const wallpaperStore = useWallpaperStore();
    const { route, gState } = useEnhancer();
    const { switcher, layoutColumn } = gState;
    const handlePageTransitionDone = () => {
      gState.setLayoutColumn(getLayoutByRouteMeta(route.meta));
    };
    const handleSponsorModalClose = () => {
      gState.toggleSwitcher("sponsor", false);
    };
    const handleFeedbackModalClose = () => {
      gState.toggleSwitcher("feedback", false);
    };
    const handleStatementModalClose = () => {
      gState.toggleSwitcher("statement", false);
    };
    onMounted(() => {
      wallpaperStore.fetch().catch((error) => {
        console.warn("[main component] bing wallpaper fetch failed!", error);
      });
      useMusic().init().catch((error) => {
        console.warn("[main component] player init failed!", error);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_router_view = resolveComponent("router-view");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "desktop-main" }, _attrs))} data-v-25cdc7c5>`);
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
                  _push3(`<div class="sponsor-modal" data-v-25cdc7c5${_scopeId2}><div class="sponsor" data-v-25cdc7c5${_scopeId2}>`);
                  _push3(ssrRenderComponent(SponsorTabs, {
                    class: "tabs",
                    state: unref(sponsorState),
                    "hide-title": true
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(SponsorProvider, {
                    class: "provider",
                    state: unref(sponsorState),
                    "max-sponsors": 9
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
                          "max-sponsors": 9
                        }, null, 8, ["state"])
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
                        "max-sponsors": 9
                      }, null, 8, ["state"])
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
      if (!unref(layoutColumn).isFull) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(Share, { class: "main-share" }, null, _parent));
        _push(ssrRenderComponent(Wallpaper, null, null, _parent));
        _push(ssrRenderComponent(Toolbox, null, null, _parent));
        _push(ssrRenderComponent(_component_client_only, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(MusicPlayerHandle, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(MusicPlayerHandle)
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
      _push(`<main${ssrRenderAttr("id", unref(MAIN_ELEMENT_ID))} class="${ssrRenderClass([{ "full-page": unref(layoutColumn).isFull }, "main-container"])}" data-v-25cdc7c5>`);
      if (unref(layoutColumn).isNormal) {
        _push(ssrRenderComponent(NavView, { class: "nav-view" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(layoutColumn).isNormal) {
        _push(ssrRenderComponent(AsideView$1, { class: "aside-view" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttr("id", unref(MAIN_CONTENT_ELEMENT_ID))} class="${ssrRenderClass([{
        "layout-normal": unref(layoutColumn).isNormal,
        "layout-wide": unref(layoutColumn).isWide,
        "layout-full": unref(layoutColumn).isFull
      }, "main-view"])}" data-v-25cdc7c5>`);
      _push(ssrRenderComponent(_component_router_view, null, {
        default: withCtx(({ Component, route: r }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="router-view" data-v-25cdc7c5${_scopeId}>`);
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
              createVNode("div", { class: "router-view" }, [
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
const main_vue_vue_type_style_index_0_scoped_25cdc7c5_lang = "";
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/desktop/main.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const DesktopMain = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-25cdc7c5"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  props: {
    opened: { type: Boolean }
  },
  setup(__props, { emit }) {
    const { route, router, i18n: _i18n } = useEnhancer();
    ref(null);
    const searchState = reactive({
      open: false,
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
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-4ec048e5><div class="${ssrRenderClass([{ actived: searchState.open }, "search"])}" data-v-4ec048e5><input class="input" autocomplete="off" type="text" maxlength="16" required${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LanguageKey).SEARCH_PLACEHOLDER))}${ssrRenderAttr("value", searchState.keyword)} data-v-4ec048e5><span class="close" data-v-4ec048e5><i class="iconfont icon-cancel" data-v-4ec048e5></i></span></div>`);
      if (searchState.open) {
        _push(`<div class="search-mask" data-v-4ec048e5></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="navbar" data-v-4ec048e5><button class="navbar-menu" data-v-4ec048e5><i class="iconfont icon-menu" data-v-4ec048e5></i></button>`);
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
      _push(`<button class="navbar-search" data-v-4ec048e5><i class="iconfont icon-search" data-v-4ec048e5></i></button></nav></header>`);
    };
  }
});
const header_vue_vue_type_style_index_0_scoped_4ec048e5_lang = "";
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HeaderView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-4ec048e5"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const title = META.title;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-6842ceee><div class="footer-content" data-v-6842ceee>©${ssrInterpolate(unref(year))}  ${ssrInterpolate(unref(title))}</div></footer>`);
    };
  }
});
const footer_vue_vue_type_style_index_0_scoped_6842ceee_lang = "";
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const FooterView = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-6842ceee"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "aside",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n, theme, cdnDomain } = useEnhancer();
    const adminInfoStore = useAdminInfoStore();
    const defaultAvatar = getAssetURL(cdnDomain, "/images/anonymous.png");
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
    useUniversalFetch(() => adminInfoStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      const _component_ulink = resolveComponent("ulink");
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "aside" }, _attrs))} data-v-1c5105ce><div class="aside-user" data-v-1c5105ce>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "avatar",
        src: ((_a = unref(adminInfoStore).data) == null ? void 0 : _a.avatar) || unref(defaultAvatar),
        alt: unref(META).author
      }, null, _parent));
      _push(`<div class="profile" data-v-1c5105ce><h3 class="name" data-v-1c5105ce>${ssrInterpolate(unref(META).author)}</h3>`);
      _push(ssrRenderComponent(_component_webfont, { class: "slogan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LanguageKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LanguageKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="aside-tool" data-v-1c5105ce><div class="item" data-v-1c5105ce><i class="${ssrRenderClass([themeIcon.value, "iconfont"])}" data-v-1c5105ce></i></div><div class="item" data-v-1c5105ce><i class="${ssrRenderClass([languageIcon.value, "iconfont"])}" data-v-1c5105ce></i></div></div><div class="aside-nav" data-v-1c5105ce><nav class="nav-list" data-v-1c5105ce>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-home" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_HOME
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_HOME
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
                    k: unref(LanguageKey).PAGE_HOME
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
            _push2(`<i class="iconfont icon-code" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).CATEGORY_CODE
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).CATEGORY_CODE
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
                    k: unref(LanguageKey).CATEGORY_CODE
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
            _push2(`<i class="iconfont icon-insight" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).CATEGORY_INSIGHT
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).CATEGORY_INSIGHT
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
                    k: unref(LanguageKey).CATEGORY_INSIGHT
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item",
        href: unref(VALUABLE_LINKS).GITHUB
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_GITHUB
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_GITHUB
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="newscript" data-v-1c5105ce${_scopeId}><i class="iconfont icon-new-window-s" data-v-1c5105ce${_scopeId}></i></span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-github" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).PAGE_GITHUB
                  }, null, 8, ["k"])
                ]),
                _: 1
              }),
              createVNode("span", { class: "newscript" }, [
                createVNode("i", { class: "iconfont icon-new-window-s" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item",
        href: unref(VALUABLE_LINKS).INSTAGRAM
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-instagram" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_PHOTOGRAPHY
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_PHOTOGRAPHY
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="newscript" data-v-1c5105ce${_scopeId}><i class="iconfont icon-new-window-s" data-v-1c5105ce${_scopeId}></i></span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-instagram" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).PAGE_PHOTOGRAPHY
                  }, null, 8, ["k"])
                ]),
                _: 1
              }),
              createVNode("span", { class: "newscript" }, [
                createVNode("i", { class: "iconfont icon-new-window-s" })
              ])
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
            _push2(`<i class="iconfont icon-quill" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_ARCHIVE
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_ARCHIVE
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
                    k: unref(LanguageKey).PAGE_ARCHIVE
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
        to: unref(getPageRoute)(unref(RouteName).About)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-swordsman" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_ABOUT
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_ABOUT
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("i", { class: "iconfont icon-swordsman" }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).PAGE_ABOUT
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
        class: "item guestbook",
        to: unref(getPageRoute)(unref(RouteName).Guestbook)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-comment" data-v-1c5105ce${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_GUESTBOOK
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_GUESTBOOK
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
                    k: unref(LanguageKey).PAGE_GUESTBOOK
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
        class: "item app",
        to: unref(getPageRoute)(unref(RouteName).App)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_uimage, {
              cdn: "",
              class: "icon",
              src: "/images/page-app/logo.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LanguageKey).PAGE_APP
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LanguageKey).PAGE_APP
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_uimage, {
                cdn: "",
                class: "icon",
                src: "/images/page-app/logo.png"
              }),
              createVNode(_component_webfont, {
                bolder: "",
                uppercase: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LanguageKey).PAGE_APP
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div></aside>`);
    };
  }
});
const aside_vue_vue_type_style_index_0_scoped_1c5105ce_lang = "";
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/aside.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AsideView = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1c5105ce"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const { route } = useEnhancer();
    const pageURL = computed(() => getPageURL(route.fullPath));
    const isOpenedAside = ref(false);
    const openAside = () => isOpenedAside.value = true;
    const closeAside = () => isOpenedAside.value = false;
    onMounted(() => {
      watch(isOpenedAside, (opened) => {
        document.body.style.overflow = opened ? "hidden" : "auto";
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-main" }, _attrs))} data-v-79e58447><div class="${ssrRenderClass([{ opened: isOpenedAside.value }, "asider"])}" data-v-79e58447>`);
      _push(ssrRenderComponent(AsideView, { class: "aside" }, null, _parent));
      _push(`</div><div class="${ssrRenderClass([{ opened: isOpenedAside.value }, "main"])}" data-v-79e58447>`);
      if (isOpenedAside.value) {
        _push(`<div class="close-mask" data-v-79e58447></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(HeaderView, {
        opened: isOpenedAside.value,
        onClose: closeAside,
        onOpen: openAside
      }, null, _parent));
      _push(`<main class="main-container" data-v-79e58447>`);
      _push(ssrRenderComponent(_component_router_view, { name: "mobile" }, {
        default: withCtx(({ Component, route: route2 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (route2.meta.responsive) {
              _push2(`<div class="route-view" data-v-79e58447${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), {
                key: route2.name
              }, null), _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<div class="fallback" data-v-79e58447${_scopeId}><i class="iconfont icon-desktop" data-v-79e58447${_scopeId}></i><p class="text" data-v-79e58447${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                zh: "请在 PC 端访问以获得最佳体验",
                en: "This page only support visit on PC"
              }, null, _parent2, _scopeId));
              _push2(`</p><a class="link"${ssrRenderAttr("href", pageURL.value)} data-v-79e58447${_scopeId}>${ssrInterpolate(pageURL.value)}</a></div>`);
            }
          } else {
            return [
              route2.meta.responsive ? (openBlock(), createBlock("div", {
                key: 0,
                class: "route-view"
              }, [
                (openBlock(), createBlock(resolveDynamicComponent(Component), {
                  key: route2.name
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
const main_vue_vue_type_style_index_0_scoped_79e58447_lang = "";
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/layout/mobile/main.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MobileMain = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-79e58447"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isMobile } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_progress_bar = resolveComponent("progress-bar");
      const _component_popup_root = resolveComponent("popup-root");
      const _component_responsive = resolveComponent("responsive");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-root" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_progress_bar, {
              spin: !unref(isMobile)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(EmojiRain, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_popup_root, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_progress_bar, {
                spin: !unref(isMobile)
              }, null, 8, ["spin"]),
              createVNode(EmojiRain),
              createVNode(_component_popup_root)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$s, null, {
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
const index_vue_vue_type_style_index_0_lang = "";
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/app/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
console.group(`[APP INIT]:`);
console.table({
  APP_VERSION,
  APP_ENV,
  NODE_ENV,
  "---": "-",
  ...API_CONFIG
});
console.groupEnd();
const createMainApp = (context) => {
  var _a, _b;
  const app = createSSRApp(_sfc_main);
  const globalState = createGlobalState({
    userAgent: context.userAgent || "",
    language: context.language || "",
    layout: context.layout ?? LayoutColumn.Normal,
    error: context.error
  });
  const store = createUniversalStore({ globalState });
  const router = createUniversalRouter({
    beforeMiddleware: (_a = context.routerBeforeMiddleware) == null ? void 0 : _a.call(context, globalState),
    afterMiddleware: (_b = context.routerAfterMiddleware) == null ? void 0 : _b.call(context, globalState),
    history: context.historyCreator()
  });
  const head = createHead();
  const theme = createTheme(context.theme);
  const i18n = createI18n({
    default: globalState.userAgent.isZhUser ? Language.Chinese : Language.English,
    keys: Object.values(LanguageKey),
    languages: languages$1
  });
  const getGlobalHead = () => {
    var _a2;
    return {
      htmlAttrs: {
        lang: ((_a2 = i18n.l.value) == null ? void 0 : _a2.iso) ?? "",
        "data-region": context.region,
        "data-theme": theme.theme.value,
        "data-device": globalState.userAgent.isMobile ? "mobile" : "desktop"
      }
    };
  };
  app.config.errorHandler = (error) => globalState.setRenderError(error);
  router.onError(globalState.setRenderError);
  router.beforeEach((to, _, next) => {
    if (to.meta.validator) {
      to.meta.validator({ route: to, i18n, store }).then(next).catch((error) => {
        const newError = new Error();
        newError.code = error.code;
        newError.message = error.message;
        next(newError);
      });
    } else {
      next();
    }
  });
  app.use(router);
  app.use(store);
  app.use(globalState);
  app.use(i18n);
  app.use(head);
  app.use(theme);
  app.use(components);
  return {
    app,
    router,
    store,
    globalState,
    i18n,
    head,
    theme,
    getGlobalHead
  };
};
const devDebug = (...args) => isDev;
const createSSRContext = (request, error) => {
  const { headers, cookies: cookies2, originalUrl } = request;
  const country = headers["country-code"];
  const cdnDomain = isCNCode(country) ? API_CONFIG.CDN_CN : API_CONFIG.CDN_GLOBAL;
  const assetsPrefix = getCDNPrefixURL(cdnDomain, CDNPrefix.Assets);
  return {
    requestURL: originalUrl,
    country,
    language: headers["accept-language"],
    userAgent: headers["user-agent"],
    cookieTheme: cookies2[THEME_STORAGE_KEY],
    cdnDomain,
    assetsPrefix,
    error
  };
};
const getRegionByCode = (code) => {
  return code && isCNCode(code) ? "cn" : "global";
};
const getCacheKey = (vueApp, ssrContext) => {
  const { i18n, theme, globalState } = vueApp;
  const language = i18n.language.value;
  const themeValue = theme.theme.value;
  const device = globalState.userAgent.isMobile ? "mobile" : "desktop";
  const region = getRegionByCode(ssrContext.country);
  return `ssr_${language}_${region}_${device}_${themeValue}_${ssrContext.requestURL}`;
};
const createApp = (ssrContext) => {
  const mainApp = createMainApp({
    historyCreator: createMemoryHistory,
    language: ssrContext.language,
    userAgent: ssrContext.userAgent,
    theme: ssrContext.cookieTheme || Theme.Light,
    region: getRegionByCode(ssrContext.country),
    error: ssrContext.error
  });
  const hackDirectives = ["lozad"];
  const hackComponents = ["progress-bar", "popup-root", "popup", "Adsense"];
  hackDirectives.forEach((d) => mainApp.app.directive(d, {}));
  hackComponents.forEach((c) => mainApp.app.component(c, {}));
  mainApp.head.push(mainApp.getGlobalHead(), { mode: "server" });
  return mainApp;
};
const renderHTML = async (mainApp, ssrContext) => {
  devDebug(`renderHTML: ${ssrContext.requestURL}`);
  const { app, router, store, head, theme, globalState } = mainApp;
  await router.push(ssrContext.requestURL);
  await router.isReady();
  await store.serverPrefetch();
  globalState.setLayoutColumn(getLayoutByRouteMeta(router.currentRoute.value.meta));
  const html = await renderToString(app, ssrContext);
  if (globalState.renderError.value) {
    const newError = new Error(globalState.renderError.value.message);
    newError.code = globalState.renderError.value.code;
    throw newError;
  }
  const heads = await renderSSRHead(head);
  const stateScripts = renderSSRStateScript(
    serialize({
      store: store.state.value,
      theme: theme.theme.value,
      layout: globalState.layoutColumn.value.layout,
      region: getRegionByCode(ssrContext.country)
    })
  );
  const contextScripts = renderSSRContextScript(
    serialize({
      ...ssrContext,
      cacheStatus: "miss"
    })
  );
  return {
    html,
    heads,
    stateScripts,
    contextScripts,
    assetsPrefix: ssrContext.assetsPrefix
  };
};
const renderError = async (request, error) => {
  const renderError2 = {
    code: error.code ?? INVALID_ERROR,
    message: error instanceof Error ? error.message : String(error)
  };
  const ssrContext = createSSRContext(request, renderError2);
  const { app, head, theme } = createApp(ssrContext);
  head.push({ title: `Server Error: ${renderError2.message || "unknow"}` });
  return {
    code: renderError2.code,
    html: await renderToString(app, ssrContext),
    heads: await renderSSRHead(head),
    assetsPrefix: ssrContext.assetsPrefix,
    contextScripts: renderSSRContextScript(serialize(ssrContext)),
    stateScripts: renderSSRStateScript(
      serialize({
        theme: theme.theme.value,
        region: getRegionByCode(ssrContext.country)
      })
    )
  };
};
const renderApp = async (request, cache) => {
  var _a;
  const ssrContext = createSSRContext(request);
  const app = createApp(ssrContext);
  const cacheKey = getCacheKey(app, ssrContext);
  const isCached = await cache.has(cacheKey);
  if (isCached) {
    return {
      ...await cache.get(cacheKey),
      contextScripts: renderSSRContextScript(serialize({ ...ssrContext, cacheStatus: "hit" })),
      code: SUCCESS
    };
  }
  try {
    const rendered = await renderHTML(app, ssrContext);
    const cacheTTL = (_a = app.router.currentRoute.value.meta) == null ? void 0 : _a.ssrCacheTTL;
    if (cacheTTL !== false && typeof cacheTTL === "number" && cacheTTL > 0) {
      const { contextScripts, ...rest } = rendered;
      if (cacheTTL === Infinity) {
        cache.set(cacheKey, rest);
      } else {
        cache.set(cacheKey, rest, cacheTTL);
      }
    }
    return {
      ...rendered,
      code: SUCCESS
    };
  } catch (error) {
    return renderError(request, error);
  }
};
export {
  renderApp,
  renderError
};
//# sourceMappingURL=ssr.js.map
