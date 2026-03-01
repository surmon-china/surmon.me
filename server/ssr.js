import { inject, ref, computed, reactive, readonly, onServerPrefetch, shallowRef, watch, nextTick, shallowReactive, useSSRContext, defineComponent, resolveComponent, mergeProps, watchEffect, onMounted, resolveDirective, unref, onBeforeUnmount, withCtx, createVNode, openBlock, createBlock, createCommentVNode, Fragment, toDisplayString, onBeforeMount, createTextVNode, TransitionGroup, renderList, h, renderSlot, useModel, mergeModels, createSlots, toRaw, onUnmounted, onUpdated, Transition, resolveDynamicComponent, withDirectives, useSlots, cloneVNode, Suspense, onErrorCaptured, createSSRApp } from "vue";
import { UAParser } from "ua-parser-js";
import serialize from "serialize-javascript";
import { ssrRenderAttrs, ssrRenderComponent, ssrGetDirectiveProps, ssrRenderStyle, ssrRenderTeleport, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderVNode, ssrRenderSuspense, renderToString } from "vue/server-renderer";
import { useRoute, useRouter, createRouter, RouterLink, createMemoryHistory } from "vue-router";
import { renderSSRHead, createHead } from "@unhead/vue/server";
import { defineStore, createPinia, storeToRefs } from "pinia";
import _isUndefined from "lodash-es/isUndefined.js";
import axios, { isAxiosError } from "axios";
import _escape from "lodash-es/escape.js";
import _unescape from "lodash-es/unescape.js";
import _capitalize from "lodash-es/capitalize.js";
import _isNil from "lodash-es/isNil.js";
import BezierEasing from "bezier-easing";
import { useHead } from "@unhead/vue";
import { Swiper } from "swiper";
import { Autoplay, Mousewheel, Grid, EffectFade } from "swiper/modules";
import { Swiper as Swiper$1, SwiperSlide } from "swiper/vue";
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
import _lozad from "lozad";
import QRCode from "qrcode";
const APP_VERSION = "7.0.6";
const APP_MODE = "production";
const isDev = false;
const isClient = false;
var LocalesKey = /* @__PURE__ */ ((LocalesKey2) => {
  LocalesKey2["APP_SLOGAN"] = "app-slogan";
  LocalesKey2["CATEGORY_INSIGHT"] = "insight";
  LocalesKey2["CATEGORY_CODE"] = "code";
  LocalesKey2["PAGE_HOME"] = "home";
  LocalesKey2["PAGE_GITHUB"] = "github";
  LocalesKey2["PAGE_PHOTOGRAPHY"] = "photography";
  LocalesKey2["PAGE_ABOUT"] = "about";
  LocalesKey2["PAGE_SPONSOR"] = "sponsor";
  LocalesKey2["PAGE_SNIPPETS"] = "snippets";
  LocalesKey2["PAGE_GUESTBOOK"] = "guestbook";
  LocalesKey2["PAGE_APP"] = "app";
  LocalesKey2["PAGE_ARCHIVE"] = "archive";
  LocalesKey2["STATISTIC_ARTICLES"] = "statistic-articles";
  LocalesKey2["STATISTIC_COMMENTS"] = "statistic-comments";
  LocalesKey2["STATISTIC_TAGS"] = "statistic-tags";
  LocalesKey2["STATISTIC_TODAY_VIEWS"] = "statistic-today-views";
  LocalesKey2["STATISTIC_TOTAL_VIEWS"] = "statistic-total-views";
  LocalesKey2["STATISTIC_TOTAL_UPVOTES"] = "statistic-total-upvotes";
  LocalesKey2["STATISTIC_AVERAGE_EMOTION"] = "statistic-average-emotion";
  LocalesKey2["EMPTY_PLACEHOLDER"] = "common-empty-placeholder";
  LocalesKey2["NOT_FOUND"] = "not-found";
  LocalesKey2["BACK_TO_HOME_PAGE"] = "back-to-home-page";
  LocalesKey2["GUESTBOOK_SLOGAN"] = "guestbook-banner-slogan";
  LocalesKey2["AD"] = "ad";
  LocalesKey2["FEEDBACK"] = "feedback";
  LocalesKey2["PRIVACY"] = "privacy";
  LocalesKey2["TO_TOP"] = "to-page-top";
  LocalesKey2["TO_BOTTOM"] = "to-page-bottom";
  LocalesKey2["ORIGIN_ORIGINAL"] = "original";
  LocalesKey2["ORIGIN_REPRINT"] = "reprint";
  LocalesKey2["ORIGIN_HYBRID"] = "hybrid";
  LocalesKey2["ACTION_ON"] = "on";
  LocalesKey2["ACTION_OFF"] = "off";
  LocalesKey2["MUSIC_PLACEHOLDER"] = "music-placeholder";
  LocalesKey2["SEARCH_PLACEHOLDER"] = "search-input-placeholder";
  LocalesKey2["ANNOUNCEMENT_PLACEHOLDER"] = "announcement-empty-placeholder";
  LocalesKey2["CATEGORY_UNCATEGORIZED"] = "category-uncategorized";
  LocalesKey2["TAG_PLACEHOLDER"] = "tag-placeholder";
  LocalesKey2["LIST_NO_MORE_DATA"] = "no-more";
  LocalesKey2["ARTICLE_SUMMARY"] = "article-summary";
  LocalesKey2["ARTICLE_VIEWS"] = "article-views";
  LocalesKey2["ARTICLE_PLACEHOLDER"] = "article-empty-placeholder";
  LocalesKey2["ARTICLE_READ_ALL"] = "read-all-article-content";
  LocalesKey2["ARTICLE_RENDERING"] = "rendering";
  LocalesKey2["ARTICLE_LIST_LOADMORE"] = "loadmore";
  LocalesKey2["ARTICLE_LIST_LOADING"] = "loading";
  LocalesKey2["ARTICLE_FEATURED"] = "article-featured";
  LocalesKey2["ARTICLE_FEATURED_SHORT"] = "article-featured-short";
  LocalesKey2["COMMENT_LIST_EMPTY"] = "comment-list-placeholder";
  LocalesKey2["COMMENT_DISABLED"] = "comment-disabled";
  LocalesKey2["COMMENT_UPVOTE"] = "comment-likes";
  LocalesKey2["COMMENT_DOWNVOTE"] = "comment-dislikes";
  LocalesKey2["COMMENT_REPLY"] = "reply-comment";
  LocalesKey2["COMMENT_DELETE"] = "delete-comment";
  LocalesKey2["COMMENT_DELETE_CONFIRM"] = "delete-comment-confirm";
  LocalesKey2["COMMENT_REPLY_CANCEL"] = "cancel-reply-comment";
  LocalesKey2["COMMENT_AI_ASSISTANT"] = "comment-ai-assistant";
  LocalesKey2["COMMENT_MODERATOR"] = "comment-moderator";
  LocalesKey2["COMMENT_PATRON"] = "comment-patron";
  LocalesKey2["COMMENT_GHOST_USER"] = "comment-ghost-user";
  LocalesKey2["COMMENT_DELETED_COMMENT"] = "comment-deleted-comment";
  LocalesKey2["COMMENT_SORT_OLD"] = "oldest-comments";
  LocalesKey2["COMMENT_SORT_NEW"] = "newest-comments";
  LocalesKey2["COMMENT_SORT_HOT"] = "hottest-comments";
  LocalesKey2["COMMENT_AUTHOR_NAME"] = "comment-author-name";
  LocalesKey2["COMMENT_AUTHOR_EMAIL"] = "comment-author-email";
  LocalesKey2["COMMENT_AUTHOR_WEBSITE"] = "comment-author-website";
  LocalesKey2["COMMENT_AUTHOR_AVATAR"] = "comment-author-avatar";
  LocalesKey2["COMMENT_POST_CONTENT"] = "comment-content";
  LocalesKey2["COMMENT_POST_PLACEHOLDER"] = "comment-box-placeholder";
  LocalesKey2["COMMENT_POST_ERROR_CONTENT"] = "comment-submit-failed-of-content-error";
  LocalesKey2["QUERY_PARAMS_ERROR"] = "query-params-error";
  LocalesKey2["POST_ACTION_ERROR"] = "post-requiest-failed-of-other-error";
  LocalesKey2["USER_SIGN_IN"] = "user-sign-in";
  LocalesKey2["USER_SIGN_OUT"] = "user-sign-out";
  LocalesKey2["USER_IDENTITY_LINK"] = "user-identity-link";
  LocalesKey2["USER_IDENTITY_UNLINK"] = "user-identity-unlink";
  LocalesKey2["USER_IDENTITY_UNLINK_CONFIRM"] = "user-identity-unlink-confirm";
  LocalesKey2["USER_IDENTITY_UNLINK_LAST_PROVIDER_FORBIDDEN"] = "user-identity-unlink-last-provider-forbidden";
  LocalesKey2["SUBMIT"] = "submit-data";
  LocalesKey2["SUBMITTING"] = "submitting";
  LocalesKey2["MOMENT_AM"] = "moment-am";
  LocalesKey2["MOMENT_PM"] = "moment-pm";
  LocalesKey2["MOMENT_JUST_NOW"] = "moment-just-now";
  LocalesKey2["MOMENT_MINUTES"] = "moment-minutes";
  LocalesKey2["MOMENT_HOURS"] = "moment-hours";
  LocalesKey2["MOMENT_WEEKS"] = "moment-weeks";
  LocalesKey2["MOMENT_DAYS"] = "moment-days";
  LocalesKey2["MOMENT_MONTHS"] = "moment-months";
  LocalesKey2["MOMENT_YEAR"] = "moment-year";
  LocalesKey2["MOMENT_AGO"] = "moment-ago";
  return LocalesKey2;
})(LocalesKey || {});
const BFF_CONFIG = Object.freeze({
  server_port: 3e3,
  server_local_url: "http://localhost:3000",
  tunnel_url_prefix: "/_tunnel",
  proxy_url_prefix: "/_proxy",
  proxy_allow_list_regexp: /^https:\/\/([a-z0-9-]+\.)*surmon\.(me|cn)/,
  route_path_rss: "/rss.xml",
  route_path_sitemap: "/sitemap.xml",
  route_path_gtag_script: "/gtag-script"
});
const APP_CONFIG = Object.freeze({
  comment_content_min_length: 3,
  comment_content_max_length: 3e3,
  article_image_share_long_threshold: 6688,
  render_long_article_threshold: 16688,
  desktop_sidebar_article_list_count: 8,
  default_error_code: 500,
  default_comment_avatar: "/images/gravatar.webp",
  default_og_image: "/images/og-social-card.jpg",
  root_title_separator: " | ",
  page_title_separator: " • ",
  primary_color: "#0088f5"
});
const APP_PROFILE = Object.freeze({
  title: "Surmon.me",
  author: "Surmon",
  domain: "surmon.me",
  url: "https://surmon.me",
  sub_title_zh: "足下何人，來此作甚",
  sub_title_en: `Surmon's digital vihāra`,
  description_zh: "本是浪蝶遊蜂，自留半畝石池，但求直抒胸臆，揮墨九雲之中。",
  description_en: "Either write something worth reading or do something worth writing.",
  description_short_zh: "本為蝶蜂，自築石池；但求抒臆，揮墨雲中"
});
const MAPBOX_CONFIG = Object.freeze({
  // readonly token: https://docs.mapbox.com/help/dive-deeper/how-to-use-mapbox-securely/#access-tokens
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
  THREADS_USERNAME: "surmon_sattva",
  THREADS_JOINED_DATE: "2024-07-06",
  BTC_ADDRESS: "bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze",
  ETH_ADDRESS: "0xaD556974D449126efdeF23f4FF581861C301cB77"
});
const RESOURCE_LINKS = Object.freeze({
  MARKDOWN_DOC: "https://daringfireball.net/projects/markdown/",
  GITHUB_NODEPRESS: "https://github.com/surmon-china/nodepress",
  GITHUB_SURMON_ME: "https://github.com/surmon-china/surmon.me",
  GITHUB_SURMON_ME_NATIVE: "https://github.com/surmon-china/surmon.me.native",
  GOOGLE_MY_MAP: "https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3",
  MUSIC_163_PLAYLIST: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
  GITHUB_STATISTICS_JSON_URL: "https://raw.githubusercontent.com/surmon-china/surmon-china/release/",
  GOOGLE_MY_MAP_KML_URL: "https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w",
  GO_LINKS_MAP_ENDPOINT: "https://go.surmon.me"
});
const GO_LINKS_MAP_KEYS = [
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
];
const GO_LINKS_MAP = Object.freeze(
  Object.fromEntries(GO_LINKS_MAP_KEYS.map((key) => [key, `${RESOURCE_LINKS.GO_LINKS_MAP_ENDPOINT}/${key}`]))
);
const zhLangMap = {
  [LocalesKey.APP_SLOGAN]: APP_PROFILE.sub_title_zh,
  [LocalesKey.PAGE_HOME]: "明殿",
  [LocalesKey.PAGE_GITHUB]: "工巧",
  [LocalesKey.CATEGORY_INSIGHT]: "不二門",
  [LocalesKey.CATEGORY_CODE]: "無夢寺",
  [LocalesKey.PAGE_ARCHIVE]: "一切藏",
  [LocalesKey.PAGE_GUESTBOOK]: "四方館",
  [LocalesKey.PAGE_ABOUT]: "狂浪生",
  [LocalesKey.PAGE_SPONSOR]: "隨喜",
  [LocalesKey.PAGE_SNIPPETS]: "覺有情",
  [LocalesKey.PAGE_PHOTOGRAPHY]: "大千界",
  [LocalesKey.PAGE_APP]: "客戶端",
  [LocalesKey.GUESTBOOK_SLOGAN]: "此心光明，亦復何言",
  [LocalesKey.NOT_FOUND]: "众里寻他，我已不再",
  [LocalesKey.BACK_TO_HOME_PAGE]: "返回首页",
  [LocalesKey.EMPTY_PLACEHOLDER]: "空空如也",
  [LocalesKey.STATISTIC_ARTICLES]: "全站文章",
  [LocalesKey.STATISTIC_COMMENTS]: "全站评论",
  [LocalesKey.STATISTIC_TAGS]: "全站标签",
  [LocalesKey.STATISTIC_TODAY_VIEWS]: "今日阅读",
  [LocalesKey.STATISTIC_TOTAL_VIEWS]: "累计被阅读",
  [LocalesKey.STATISTIC_TOTAL_UPVOTES]: "累计获赞",
  [LocalesKey.STATISTIC_AVERAGE_EMOTION]: "平均评分",
  [LocalesKey.AD]: "广而告之",
  [LocalesKey.FEEDBACK]: "反馈",
  [LocalesKey.PRIVACY]: "隐私",
  [LocalesKey.TO_TOP]: "回到顶部",
  [LocalesKey.TO_BOTTOM]: "下一屏",
  [LocalesKey.ORIGIN_ORIGINAL]: "原创",
  [LocalesKey.ORIGIN_REPRINT]: "转载",
  [LocalesKey.ORIGIN_HYBRID]: "混合",
  [LocalesKey.ACTION_ON]: "开",
  [LocalesKey.ACTION_OFF]: "关",
  [LocalesKey.MUSIC_PLACEHOLDER]: "五音六律，七弦八度",
  [LocalesKey.SEARCH_PLACEHOLDER]: "上下求索",
  [LocalesKey.ANNOUNCEMENT_PLACEHOLDER]: "空空如也",
  [LocalesKey.CATEGORY_UNCATEGORIZED]: "未分类",
  [LocalesKey.TAG_PLACEHOLDER]: "无标签",
  [LocalesKey.ARTICLE_SUMMARY]: "摘要",
  [LocalesKey.ARTICLE_VIEWS]: "次阅读",
  [LocalesKey.ARTICLE_PLACEHOLDER]: "空空如也",
  [LocalesKey.ARTICLE_READ_ALL]: "阅读余下全文",
  [LocalesKey.ARTICLE_RENDERING]: "渲染中..",
  [LocalesKey.LIST_NO_MORE_DATA]: "没有更多",
  [LocalesKey.ARTICLE_LIST_LOADMORE]: "加载更多",
  [LocalesKey.ARTICLE_LIST_LOADING]: "加载中...",
  [LocalesKey.ARTICLE_FEATURED]: "精选",
  [LocalesKey.ARTICLE_FEATURED_SHORT]: "精选",
  [LocalesKey.COMMENT_LIST_EMPTY]: "期待你的捷足先登",
  [LocalesKey.COMMENT_DISABLED]: "当前页面的评论功能已关闭",
  [LocalesKey.COMMENT_UPVOTE]: "赞",
  [LocalesKey.COMMENT_DOWNVOTE]: "踩",
  [LocalesKey.COMMENT_DELETE]: "删除",
  [LocalesKey.COMMENT_DELETE_CONFIRM]: "确定要删除此评论吗？此操作不可恢复",
  [LocalesKey.COMMENT_REPLY]: "回复",
  [LocalesKey.COMMENT_REPLY_CANCEL]: "取消回复",
  [LocalesKey.COMMENT_AI_ASSISTANT]: "AI 助理",
  [LocalesKey.COMMENT_MODERATOR]: "博主",
  [LocalesKey.COMMENT_PATRON]: "上客",
  [LocalesKey.COMMENT_GHOST_USER]: "已删除用户",
  [LocalesKey.COMMENT_DELETED_COMMENT]: "一条已经不存在的评论",
  [LocalesKey.COMMENT_SORT_OLD]: "最早",
  [LocalesKey.COMMENT_SORT_NEW]: "最新",
  [LocalesKey.COMMENT_SORT_HOT]: "最热",
  [LocalesKey.COMMENT_AUTHOR_NAME]: "名字",
  [LocalesKey.COMMENT_AUTHOR_EMAIL]: "邮箱",
  [LocalesKey.COMMENT_AUTHOR_WEBSITE]: "网址",
  [LocalesKey.COMMENT_AUTHOR_AVATAR]: "头像",
  [LocalesKey.COMMENT_POST_CONTENT]: "内容",
  [LocalesKey.COMMENT_POST_PLACEHOLDER]: "愿你的见解一针见血",
  [LocalesKey.COMMENT_POST_ERROR_CONTENT]: "内容需要在 3000 字以内",
  [LocalesKey.QUERY_PARAMS_ERROR]: "请求参数错误：",
  [LocalesKey.POST_ACTION_ERROR]: "操作失败，详细原因 > 控制台",
  [LocalesKey.USER_SIGN_IN]: "登录",
  [LocalesKey.USER_SIGN_OUT]: "退出登录",
  [LocalesKey.USER_IDENTITY_LINK]: "立即绑定",
  [LocalesKey.USER_IDENTITY_UNLINK]: "解除绑定",
  [LocalesKey.USER_IDENTITY_UNLINK_CONFIRM]: "你确定要解绑此账户吗？",
  [LocalesKey.USER_IDENTITY_UNLINK_LAST_PROVIDER_FORBIDDEN]: `无法解除当前绑定，至少需要保留一种登录方式。`,
  [LocalesKey.SUBMIT]: "提交",
  [LocalesKey.SUBMITTING]: "提交中...",
  [LocalesKey.MOMENT_AM]: "上午",
  [LocalesKey.MOMENT_PM]: "下午",
  [LocalesKey.MOMENT_JUST_NOW]: "刚刚",
  [LocalesKey.MOMENT_MINUTES]: "分钟",
  [LocalesKey.MOMENT_HOURS]: "小时",
  [LocalesKey.MOMENT_WEEKS]: "周",
  [LocalesKey.MOMENT_DAYS]: "天",
  [LocalesKey.MOMENT_MONTHS]: "个月",
  [LocalesKey.MOMENT_YEAR]: "年",
  [LocalesKey.MOMENT_AGO]: (args) => `${args.date}前`
};
const enLangMap = {
  [LocalesKey.APP_SLOGAN]: APP_PROFILE.sub_title_en,
  [LocalesKey.PAGE_HOME]: "Home",
  [LocalesKey.CATEGORY_INSIGHT]: "Insight",
  [LocalesKey.CATEGORY_CODE]: "Code",
  [LocalesKey.PAGE_ARCHIVE]: "Archive",
  [LocalesKey.PAGE_GITHUB]: "GitHub",
  [LocalesKey.PAGE_ABOUT]: "About",
  [LocalesKey.PAGE_GUESTBOOK]: "Guestbook",
  [LocalesKey.PAGE_SPONSOR]: "Sponsor",
  [LocalesKey.PAGE_SNIPPETS]: "Snippets",
  [LocalesKey.PAGE_APP]: "APP",
  [LocalesKey.PAGE_PHOTOGRAPHY]: "Photog",
  [LocalesKey.STATISTIC_ARTICLES]: "Articles",
  [LocalesKey.STATISTIC_COMMENTS]: "Comments",
  [LocalesKey.STATISTIC_TAGS]: "Tags",
  [LocalesKey.STATISTIC_TODAY_VIEWS]: "Today views",
  [LocalesKey.STATISTIC_TOTAL_VIEWS]: "Total views",
  [LocalesKey.STATISTIC_TOTAL_UPVOTES]: "Total upvotes",
  [LocalesKey.STATISTIC_AVERAGE_EMOTION]: "Rating",
  [LocalesKey.EMPTY_PLACEHOLDER]: "NULL",
  [LocalesKey.NOT_FOUND]: "Arrives here at last",
  [LocalesKey.BACK_TO_HOME_PAGE]: "Back to home page",
  [LocalesKey.GUESTBOOK_SLOGAN]: "If a word arises, let it be here.",
  [LocalesKey.AD]: "AD",
  [LocalesKey.FEEDBACK]: "Feedback",
  [LocalesKey.PRIVACY]: "Privacy",
  [LocalesKey.TO_TOP]: "To top",
  [LocalesKey.TO_BOTTOM]: "Next screen",
  [LocalesKey.ORIGIN_ORIGINAL]: "OG",
  [LocalesKey.ORIGIN_REPRINT]: "RPT",
  [LocalesKey.ORIGIN_HYBRID]: "HY",
  [LocalesKey.ACTION_ON]: "on",
  [LocalesKey.ACTION_OFF]: "off",
  [LocalesKey.MUSIC_PLACEHOLDER]: "Music player",
  [LocalesKey.SEARCH_PLACEHOLDER]: "Search...",
  [LocalesKey.CATEGORY_UNCATEGORIZED]: "Uncategorized",
  [LocalesKey.ANNOUNCEMENT_PLACEHOLDER]: "No announcements",
  [LocalesKey.TAG_PLACEHOLDER]: "No tags",
  [LocalesKey.LIST_NO_MORE_DATA]: "No more",
  [LocalesKey.ARTICLE_SUMMARY]: "Summary",
  [LocalesKey.ARTICLE_PLACEHOLDER]: "No articles",
  [LocalesKey.ARTICLE_VIEWS]: "views",
  [LocalesKey.ARTICLE_READ_ALL]: "Read full article",
  [LocalesKey.ARTICLE_RENDERING]: "Rendering...",
  [LocalesKey.ARTICLE_LIST_LOADMORE]: "Loadmore",
  [LocalesKey.ARTICLE_LIST_LOADING]: "Loading...",
  [LocalesKey.ARTICLE_FEATURED]: "featured",
  [LocalesKey.ARTICLE_FEATURED_SHORT]: "feat",
  [LocalesKey.COMMENT_LIST_EMPTY]: "Be the first to comment",
  [LocalesKey.COMMENT_DISABLED]: "Commenting on this page is currently unavailable",
  [LocalesKey.COMMENT_UPVOTE]: "upvote",
  [LocalesKey.COMMENT_DOWNVOTE]: "downvote",
  [LocalesKey.COMMENT_DELETE]: "delete",
  [LocalesKey.COMMENT_DELETE_CONFIRM]: "Are you sure you want to delete this comment? You cannot undo this action.",
  [LocalesKey.COMMENT_REPLY]: "reply",
  [LocalesKey.COMMENT_REPLY_CANCEL]: "cancel reply",
  [LocalesKey.COMMENT_AI_ASSISTANT]: "AI Assistant",
  [LocalesKey.COMMENT_MODERATOR]: "Moderator",
  [LocalesKey.COMMENT_PATRON]: "Patron",
  [LocalesKey.COMMENT_GHOST_USER]: "Deleted user",
  [LocalesKey.COMMENT_DELETED_COMMENT]: "a deleted comment",
  [LocalesKey.COMMENT_SORT_OLD]: "Oldest",
  [LocalesKey.COMMENT_SORT_NEW]: "Newest",
  [LocalesKey.COMMENT_SORT_HOT]: "Hottest",
  [LocalesKey.COMMENT_AUTHOR_NAME]: "name",
  [LocalesKey.COMMENT_AUTHOR_EMAIL]: "email",
  [LocalesKey.COMMENT_AUTHOR_WEBSITE]: "website",
  [LocalesKey.COMMENT_AUTHOR_AVATAR]: "avatar",
  [LocalesKey.COMMENT_POST_CONTENT]: "content",
  [LocalesKey.COMMENT_POST_PLACEHOLDER]: "Hit the nail on the head",
  [LocalesKey.COMMENT_POST_ERROR_CONTENT]: "Content requirements are within 3000 characters!",
  [LocalesKey.QUERY_PARAMS_ERROR]: "Invalid query params: ",
  [LocalesKey.POST_ACTION_ERROR]: "Failed! Get error detail in console",
  [LocalesKey.USER_SIGN_IN]: "Sign in",
  [LocalesKey.USER_SIGN_OUT]: "Sign out",
  [LocalesKey.USER_IDENTITY_LINK]: "Link Account",
  [LocalesKey.USER_IDENTITY_UNLINK]: "Unlink",
  [LocalesKey.USER_IDENTITY_UNLINK_CONFIRM]: "Are you sure you want to unlink this account?",
  [LocalesKey.USER_IDENTITY_UNLINK_LAST_PROVIDER_FORBIDDEN]: `You can't unlink your last remaining sign-in method.`,
  [LocalesKey.SUBMIT]: "Submit",
  [LocalesKey.SUBMITTING]: "Submitting...",
  [LocalesKey.MOMENT_AM]: "AM",
  [LocalesKey.MOMENT_PM]: "PM",
  [LocalesKey.MOMENT_JUST_NOW]: "Just now",
  [LocalesKey.MOMENT_MINUTES]: "minutes",
  [LocalesKey.MOMENT_HOURS]: "hours",
  [LocalesKey.MOMENT_WEEKS]: "weeks",
  [LocalesKey.MOMENT_DAYS]: "days",
  [LocalesKey.MOMENT_MONTHS]: "months",
  [LocalesKey.MOMENT_YEAR]: "year",
  [LocalesKey.MOMENT_AGO]: (args) => `${args.date} ago`
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
const logger$2 = createLogger("APP");
const GlobalStateSymbol = /* @__PURE__ */ Symbol("globalState");
const createGlobalState = (options) => {
  let isHydrated = false;
  const setHydrate = () => {
    isHydrated = true;
  };
  const userAgent = {
    original: options.userAgent,
    languages: options.languages,
    isZhUser: isZhUser(options.languages),
    ...uaParser(options.userAgent)
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
    sponsorModal: false,
    feedbackModal: false,
    statementModal: false,
    privacyModal: false,
    userPanelModal: false,
    bodyScrollable: true
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
  UserType2[UserType2["Moderator"] = 1] = "Moderator";
  UserType2[UserType2["Standard"] = 2] = "Standard";
  UserType2[UserType2["Patron"] = 3] = "Patron";
  return UserType2;
})(UserType || {});
var UserIdentityProvider = /* @__PURE__ */ ((UserIdentityProvider2) => {
  UserIdentityProvider2["GitHub"] = "github";
  UserIdentityProvider2["Google"] = "google";
  return UserIdentityProvider2;
})(UserIdentityProvider || {});
const API_LOCAL_URL = "http://localhost:8000";
const PROD_API = API_LOCAL_URL;
const API_CONFIG = {
  NODEPRESS: PROD_API,
  FRONT_END: "https://surmon.me",
  STATIC: "https://static.surmon.me",
  CDN_CHINA: "https://cdn.surmon.cn",
  CDN_GLOBAL: "https://cdn.surmon.me"
};
const SUCCESS = 200;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const NETWORK_ERROR = 499;
var NodePressResponseStatus = /* @__PURE__ */ ((NodePressResponseStatus2) => {
  NodePressResponseStatus2["Error"] = "error";
  NodePressResponseStatus2["Success"] = "success";
  return NodePressResponseStatus2;
})(NodePressResponseStatus || {});
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
const request = (config) => {
  const { token, headers, ...restConfig } = config;
  const finalHeaders = {
    ...headers,
    ...token ? { Authorization: `Bearer ${token}` } : {}
  };
  return nodepress.request({ ...restConfig, headers: finalHeaders });
};
const nodepress$1 = {
  $: nodepress,
  request,
  get(url, config) {
    return this.request({ ...config, method: "get", url });
  },
  post(url, data, config) {
    return this.request({ ...config, method: "post", url, data });
  },
  put(url, data, config) {
    return this.request({ ...config, method: "put", url, data });
  },
  patch(url, data, config) {
    return this.request({ ...config, method: "patch", url, data });
  },
  delete(url, config) {
    return this.request({ ...config, method: "delete", url });
  }
};
function getMessageFromNormalError(error) {
  return error?.message || error;
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
const openPopupWindow = (targetUrl, options = {}) => {
  const {
    target = "",
    closeInterval = 268,
    onClose,
    width: customWidth,
    height: customHeight,
    params = {}
  } = options;
  const width = customWidth ?? Math.round(screen.availWidth / 6 * 2);
  const height = customHeight ?? Math.round(screen.availHeight / 5 * 2);
  const top = Math.round((screen.availHeight - height) / 2);
  const left = Math.round((screen.availWidth - width) / 2);
  const formParams = { width, height, top, left };
  const windowParams = paramsToString({
    ...baseParams,
    ...formParams,
    ...params
  });
  const popupWindow = window.open(targetUrl, target, windowParams);
  if (popupWindow) {
    if (onClose) {
      const timer = setInterval(() => {
        if (popupWindow?.closed) {
          clearInterval(timer);
          onClose();
        }
      }, closeInterval);
    }
    popupWindow?.focus();
    return popupWindow;
  }
};
const LOADING_HTML = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Connecting...</title>
    <style>
      :root {
        --bg-color: #ffffff;
        --text-color: #333333;
        --spinner-border: #f3f3f3;
        --spinner-top: ${APP_CONFIG.primary_color};
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg-color: #1a1a1a;
          --text-color: #eeeeee;
          --spinner-border: #333333;
        }
      }
      body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: -apple-system, system-ui, sans-serif;
        background-color: var(--bg-color);
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid var(--spinner-border);
        border-top: 4px solid var(--spinner-top);
        border-radius: 50%;
        animation: spin 2s linear infinite;
        margin-bottom: 32px;
      }
      .text { color: var(--text-color); }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <div class="spinner"></div>
    <div class="text">Connecting to OAuth Service...</div>
  </body>
</html>
`;
const POST_MESSAGE_SOURCE = "nodepress-oauth";
const openOAuthPopup = async (options) => {
  const { provider, nodepressApi, nodepressToken, onSuccess, onError, onClose } = options;
  const handleMessage = (event) => {
    if (event.origin !== API_CONFIG.NODEPRESS) return;
    if (event.data?.source !== POST_MESSAGE_SOURCE) return;
    window.removeEventListener("message", handleMessage);
    if (event.data.status === NodePressResponseStatus.Success) {
      onSuccess?.(event.data);
    } else {
      logger$2.warn(`Received OAuth error message for ${provider}`, event.data);
      onError?.(event.data);
    }
  };
  const windowSize = provider === UserIdentityProvider.GitHub ? { width: 700, height: 840 } : provider === UserIdentityProvider.Google ? { width: 540, height: 620 } : {};
  const popup = openPopupWindow("", {
    width: windowSize.width,
    height: windowSize.height,
    target: `${provider}_oauth`,
    onClose: () => {
      window.removeEventListener("message", handleMessage);
      onClose?.();
    }
  });
  if (popup) {
    popup.document.write(LOADING_HTML);
    popup.document.close();
  }
  try {
    window.addEventListener("message", handleMessage);
    const { result } = await nodepress$1.get(nodepressApi, { token: nodepressToken });
    if (popup && !popup.closed) {
      popup.location.href = result.url;
      popup.focus();
    }
  } catch (error) {
    window.removeEventListener("message", handleMessage);
    popup?.close();
    logger$2.error(`Failed to fetch OAuth URL for ${provider}`, error);
    alert(getMessageFromNormalError(error));
  }
  return popup;
};
const LOCAL_STORGAE_KEY = "identity-state";
const useIdentityStore = defineStore("identity", () => {
  const token = shallowRef(null);
  const userProfile = ref(null);
  const guestProfile = ref(null);
  const isUser = computed(() => !!userProfile.value);
  const isGuest = computed(() => !isUser.value && !!guestProfile.value);
  const isAnonymous = computed(() => !isUser.value && !isGuest.value);
  const profile = computed(() => {
    if (userProfile.value) {
      return {
        name: userProfile.value.name,
        email: userProfile.value.email,
        website: userProfile.value.website ?? void 0
      };
    } else if (guestProfile.value) {
      return guestProfile.value;
    } else {
      return null;
    }
  });
  const setToken = (_token) => {
    token.value = _token;
  };
  const saveGuestProfile = (profile2) => {
    guestProfile.value = { ...profile2 };
  };
  const removeGuestProfile = () => {
    guestProfile.value = null;
  };
  const fetchUserProfile = async () => {
    try {
      const response = await nodepress$1.get("/account/profile", { token: token.value });
      userProfile.value = response.result;
    } catch (error) {
      userProfile.value = null;
      token.value = null;
      throw error;
    }
  };
  const userLogout = async () => {
    await nodepress$1.post("/account/auth/logout", {}, { token: token.value });
    userProfile.value = null;
    token.value = null;
    removeGuestProfile();
  };
  const userLoginWith = async (provider) => {
    openOAuthPopup({
      provider,
      nodepressApi: `/account/auth/${provider}/login`,
      async onSuccess(message) {
        if (message.token) {
          try {
            setToken(message.token);
            await fetchUserProfile();
            await nextTick();
            removeGuestProfile();
          } catch (error) {
            logger$2.warn("Fetch user profile failed after OAuth", error);
          }
        }
      }
    });
  };
  const getState = () => ({
    token: token.value,
    guestProfile: guestProfile.value
  });
  const resetStateFromStorage = () => {
    try {
      const localState = getJSON(LOCAL_STORGAE_KEY);
      if (localState) {
        token.value = localState.token;
        guestProfile.value = localState.guestProfile;
      }
    } catch {
      remove(LOCAL_STORGAE_KEY);
    }
  };
  const initOnClient = () => {
    resetStateFromStorage();
    watch(
      () => getState(),
      (state) => setJSON(LOCAL_STORGAE_KEY, state),
      { deep: true }
    );
    window.addEventListener("storage", (event) => {
      if (event.key === LOCAL_STORGAE_KEY) {
        resetStateFromStorage();
      }
    });
    if (token.value) {
      fetchUserProfile().catch((error) => {
        logger$2.warn("Init fetch user profile failed.", error);
      });
    }
  };
  return {
    profile,
    userProfile,
    guestProfile,
    isUser,
    isGuest,
    isAnonymous,
    token,
    setToken,
    saveGuestProfile,
    removeGuestProfile,
    fetchUserProfile,
    userLoginWith,
    userLogout,
    initOnClient
  };
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
const useAppOptionsStore = defineStore("appOptions", () => {
  const identityStore = useIdentityStore();
  const fetchStore = createFetchStore({
    shallow: false,
    data: null,
    async fetcher() {
      const response = await nodepress$1.get("/options");
      return response.result;
    }
  });
  const appConfig = computed(() => {
    const configString = fetchStore.data.value?.app_config;
    const configJson = configString ? JSON.parse(configString) : {};
    return {
      AD_PC_CARROUSEL: void 0,
      AD_PC_NAV: [],
      AD_PC_SIDEBAR_SWIPER: [],
      ...configJson
    };
  });
  const postFeedback = (feedback) => {
    return nodepress$1.post(
      "/feedback",
      {
        ...feedback,
        author_name: identityStore.profile?.name,
        author_email: identityStore.profile?.email
      },
      { token: identityStore.token }
    );
  };
  return {
    ...fetchStore,
    appConfig,
    postFeedback
  };
});
var SortMode = /* @__PURE__ */ ((SortMode2) => {
  SortMode2[SortMode2["Oldest"] = 1] = "Oldest";
  SortMode2[SortMode2["Latest"] = -1] = "Latest";
  SortMode2[SortMode2["Hottest"] = 2] = "Hottest";
  return SortMode2;
})(SortMode || {});
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const delayPromise = (ms, promise) => {
  return Promise.all([promise, delay(ms)]).then(([result]) => result);
};
const ARTICLE_LIST_API_PATH = "/articles";
const useArticleListStore = defineStore("articleList", () => {
  const fetching = ref(false);
  const data = shallowReactive([]);
  const pagination = shallowRef(null);
  let fetchId = 0;
  const hasMore = computed(() => {
    return pagination.value ? pagination.value.current_page < pagination.value.total_page : false;
  });
  const clear = () => {
    data.length = 0;
    pagination.value = null;
  };
  const _fetch = async (params = {}) => {
    const currentFetchId = ++fetchId;
    fetching.value = true;
    try {
      const request2 = nodepress$1.get(ARTICLE_LIST_API_PATH, { params });
      const response = await (isClient ? delayPromise(460, request2) : request2);
      if (currentFetchId === fetchId) {
        data.push(...response.result.data);
        pagination.value = response.result.pagination;
      }
    } finally {
      if (currentFetchId === fetchId) {
        fetching.value = false;
      }
    }
  };
  const fetch = (params = {}) => {
    clear();
    return _fetch(params);
  };
  const fetchNextPage = (params = {}) => {
    if (!pagination.value) {
      const message = "No pagination data available.";
      console.warn(`[ArticleListStore] fetchMore: ${message} Please call fetch() first.`);
      return Promise.reject(message);
    }
    if (!hasMore.value) {
      const message = "No more data to load.";
      console.warn(`[ArticleListStore] fetchMore: ${message}`);
      return Promise.reject(message);
    }
    return _fetch({ ...params, page: pagination.value.current_page + 1 });
  };
  return {
    fetching,
    pagination,
    data,
    hasMore,
    clear,
    fetch,
    fetchNextPage
  };
});
const createSpecialArticleListStore = (_params) => {
  return createFetchStore({
    once: true,
    data: [],
    async fetcher() {
      const params = { ..._params, per_page: APP_CONFIG.desktop_sidebar_article_list_count };
      const response = await nodepress$1.get(ARTICLE_LIST_API_PATH, { params });
      return response.result.data;
    }
  });
};
const useLatestArticleListStore = defineStore("latestArticleList", () => {
  return createSpecialArticleListStore({});
});
const useHottestArticleListStore = defineStore("hottestArticleList", () => {
  return createSpecialArticleListStore({ sort: SortMode.Hottest });
});
const useFeaturedArticleListStore = defineStore("featuredArticleList", () => {
  return createSpecialArticleListStore({ featured: true });
});
const useCategoryStore = defineStore("category", () => {
  return createFetchStore({
    data: [],
    once: true,
    fetcher() {
      return nodepress$1.get("/categories/all").then((response) => {
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
const getTagIconName = (tagExtras) => {
  return tagExtras?.find(({ key }) => key === "icon-name")?.value ?? "icon-tag";
};
const getTagEnName = (tag) => {
  const tagEnName = tag.extras.find(({ key }) => key === "en-name");
  if (tagEnName) {
    return tagEnName.value;
  }
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
      const response = await nodepress$1.get("/tags/all");
      return response.result;
    }
  });
  const sorted = computed(() => {
    const tags = [...fetchStore.data.value];
    tags.sort((a, b) => b.article_count - a.article_count);
    return tags;
  });
  return { ...fetchStore, sorted };
});
const createUniversalStore = (config) => {
  const pinia = createPinia();
  const fetchBasicStore = () => {
    const initialFetchTasks = [
      useAppOptionsStore(pinia).fetch(),
      // app nodepress config
      useCategoryStore(pinia).fetch(),
      // basic categories data
      useTagStore(pinia).fetch()
      // basic tags data
    ];
    if (!config.globalState.userAgent.isMobile) {
      initialFetchTasks.push(useFeaturedArticleListStore(pinia).fetch());
    }
    return Promise.all(initialFetchTasks);
  };
  return {
    pinia,
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
const createI18nState = (config) => {
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
const I18nSymbol = /* @__PURE__ */ Symbol("i18n-state");
const createI18n = (config) => {
  const i18nState = createI18nState(config);
  const i18nComponent = defineComponent({
    name: "I18n",
    props: {
      k: [String, Number, Symbol]
    },
    render() {
      if (this.$props.k) {
        return i18nState.t(this.$props.k, null, this.$attrs);
      } else {
        const lang = i18nState.language.value;
        return this.$attrs[lang] || this.$slots[lang]?.();
      }
    }
  });
  return Object.assign(i18nState, {
    install(app) {
      app.provide(I18nSymbol, i18nState);
      app.component(i18nComponent.name, i18nComponent);
      app.config.globalProperties.$i18n = i18nState;
    }
  });
};
const useI18n = () => {
  return inject(I18nSymbol);
};
const THEME_STORAGE_KEY = "theme";
const ThemeSymbol = /* @__PURE__ */ Symbol("theme-state");
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2["Light"] = "light";
  Theme2["Dark"] = "dark";
  return Theme2;
})(Theme || {});
const themes = [
  "light",
  "dark"
  /* Dark */
];
const createTheme = (initialValue) => {
  const theme = ref(
    initialValue === "dark" ? "dark" : "light"
    /* Light */
  );
  const isDark = computed(
    () => theme.value === "dark"
    /* Dark */
  );
  const set2 = (newTheme) => {
    if (themes.includes(newTheme) && newTheme !== theme.value) {
      theme.value = newTheme;
      storage.set(THEME_STORAGE_KEY, newTheme);
    }
  };
  const toggle = () => set2(
    isDark.value ? "light" : "dark"
    /* Dark */
  );
  const themeState = {
    theme: readonly(theme),
    isDark,
    set: set2,
    toggle
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
const DEFAULT_POPUP_STATE = Object.freeze({
  visible: false,
  maskClosable: true,
  scrollClosable: true,
  isMedia: false
});
const _sfc_main$29 = /* @__PURE__ */ defineComponent({
  __name: "popup-media",
  __ssrInlineRender: true,
  props: {
    src: {},
    type: {},
    attrs: {}
  },
  setup(__props) {
    const props = __props;
    const mediaAspectRatio = ref("auto");
    const status = ref("loading");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "popup-media",
        "data-status": status.value,
        style: { aspectRatio: mediaAspectRatio.value }
      }, _attrs))} data-v-32b495f6>`);
      if (props.type === "image") {
        _push(`<img${ssrRenderAttrs(mergeProps({
          class: "image",
          draggable: "false",
          src: props.src
        }, props.attrs))} data-v-32b495f6>`);
      } else if (props.type === "video") {
        _push(`<video${ssrRenderAttrs(mergeProps({
          class: "video",
          autoplay: "",
          controls: "",
          src: props.src
        }, props.attrs))} data-v-32b495f6></video>`);
      } else {
        _push(`<!---->`);
      }
      if (status.value === "loading") {
        _push(`<div class="loading" data-v-32b495f6>`);
        _push(ssrRenderComponent(_component_loading_indicator, {
          gap: "lg",
          width: "1.8rem",
          height: "1.2rem"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
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
const _sfc_setup$29 = _sfc_main$29.setup;
_sfc_main$29.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/composables/popup/popup-media.vue");
  return _sfc_setup$29 ? _sfc_setup$29(props, ctx) : void 0;
};
const PopupMedia = /* @__PURE__ */ _export_sfc(_sfc_main$29, [["__scopeId", "data-v-32b495f6"]]);
const _sfc_main$28 = /* @__PURE__ */ defineComponent({
  __name: "popup-root",
  __ssrInlineRender: true,
  setup(__props) {
    const modalContainerElement = ref();
    const { state, media, hidden, $setRootContainer: setRootContainer } = usePopup();
    const handleWindowScroll = () => hidden();
    watchEffect(() => {
      state.visible && state.scrollClosable ? (
        // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#solution-the-passive-option
        window.addEventListener("scroll", handleWindowScroll, { passive: true })
      ) : window.removeEventListener("scroll", handleWindowScroll);
    });
    onMounted(() => setRootContainer(modalContainerElement.value));
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "popup" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-489ad426><div class="popup-mask" style="${ssrRenderStyle(unref(state).visible ? null : { display: "none" })}" data-v-489ad426><div class="popup-modal-container" data-v-489ad426></div>`);
      if (unref(state).isMedia && !!unref(media).src) {
        _push(ssrRenderComponent(PopupMedia, unref(media), null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$28 = _sfc_main$28.setup;
_sfc_main$28.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/composables/popup/popup-root.vue");
  return _sfc_setup$28 ? _sfc_setup$28(props, ctx) : void 0;
};
const _sfc_main$27 = /* @__PURE__ */ defineComponent({
  __name: "popup",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    bodyScrollable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: DEFAULT_POPUP_STATE.maskClosable
    },
    scrollClosable: {
      type: Boolean,
      default: DEFAULT_POPUP_STATE.scrollClosable
    }
  },
  emits: ["close", "update:visible"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const popup = usePopup();
    const { globalState } = useEnhancer();
    watch(
      // hidden modal via state
      () => popup.state.visible,
      (visible) => {
        if (!visible && props.visible) {
          emit("update:visible", false);
          emit("close");
        }
      }
    );
    watch(
      // hidden modal via props
      () => props.visible,
      (visible) => {
        visible ? popup.vModal({ maskClosable: props.maskClosable, scrollClosable: props.scrollClosable }) : popup.hidden();
      }
    );
    watchEffect(() => {
      if (!props.bodyScrollable) {
        globalState.toggleSwitcher("bodyScrollable", !props.visible);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.visible && unref(popup).container.value) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="${ssrRenderClass([{ border: __props.border }, "popup-modal"])}" data-v-b340004c>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div>`);
        }, unref(popup).container.value, false, _parent);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$27 = _sfc_main$27.setup;
_sfc_main$27.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/composables/popup/popup.vue");
  return _sfc_setup$27 ? _sfc_setup$27(props, ctx) : void 0;
};
const PopupSymbol = /* @__PURE__ */ Symbol("popup-state");
const usePopup = () => {
  return inject(PopupSymbol);
};
const vanilla = axios.create();
const useGoLinksStore = defineStore("goLinksMap", () => {
  const remoteLinksMap = shallowRef();
  const mixedLinksMap = computed(() => ({
    ...GO_LINKS_MAP,
    ...remoteLinksMap.value
  }));
  const fetchRemoteLinksMap = () => {
    return vanilla.get(RESOURCE_LINKS.GO_LINKS_MAP_ENDPOINT).then((response) => {
      remoteLinksMap.value = response.data;
    });
  };
  return { fetchRemoteLinksMap, mixedLinksMap };
});
const isCNCode = (regionCode) => {
  return regionCode === "CN";
};
const regionCodeToChineseName = (regionCode) => {
  if (regionCode === "CN") return "中国";
  if (regionCode === "HK") return "香港";
  if (regionCode === "MO") return "澳门";
  if (regionCode === "TW") return "台湾";
  const regionNames = new Intl.DisplayNames(["zh-CN"], { type: "region" });
  return regionNames.of(regionCode.toUpperCase());
};
const useEnhancer = () => {
  const route = useRoute();
  const router = useRouter();
  const i18n = useI18n();
  const theme = useTheme();
  const globalState = useGlobalState();
  const appOptionsStore = useAppOptionsStore();
  const goLinksStore = useGoLinksStore();
  const identityStore = useIdentityStore();
  const cdnDomain = useCdnDomain();
  const countryCode = useCountryCode();
  return {
    route,
    router,
    i18n,
    theme,
    globalState,
    isZhLang: computed(() => i18n.language.value === Language.Chinese),
    appOptions: computed(() => appOptionsStore.data),
    appConfig: computed(() => appOptionsStore.appConfig),
    goLinks: computed(() => goLinksStore.mixedLinksMap),
    identity: identityStore,
    cdnDomain,
    countryCode,
    isCNUser: isCNCode(countryCode || "GLOBAL"),
    defer: void 0,
    popup: void 0,
    gtag: void 0
  };
};
const base64Encode = btoa;
const BASE64_STD = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const BASE64_CUSTOM = "ZYXWVUTSRQPONMLKJIHGFEDCBAabcdefghijklmnopqrstuvwxyz0123456789-_=";
const safeBase64UrlEncode = (value) => {
  const base64 = base64Encode(value);
  const customMapped = [...base64].map((c) => {
    const idx = BASE64_STD.indexOf(c);
    return idx === -1 ? c : BASE64_CUSTOM[idx];
  }).join("");
  return customMapped.replace(/=+$/, "");
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
  return `${BFF_CONFIG.proxy_url_prefix}/${safeBase64UrlEncode(url)}`;
};
const getCdnProxyURL = (domain, url) => {
  {
    return `${getCDNPrefix(
      domain,
      "proxy"
      /* Proxy */
    )}/${safeBase64UrlEncode(url)}`;
  }
};
const getPageURL = (path, hash) => {
  const targetPath = path;
  return `${API_CONFIG.FRONT_END}${normalizePath(targetPath)}`;
};
function usePageSeo(input) {
  const { i18n, route } = useEnhancer();
  const _ = computed(() => {
    const value = typeof input === "function" ? input() : input;
    const { title, pageTitle, pageTitles, ...rest } = value;
    const pureTitle = pageTitle ?? pageTitles?.join(APP_CONFIG.page_title_separator);
    const fullTitle = title ?? (pureTitle ? [pureTitle, APP_PROFILE.title].join(APP_CONFIG.root_title_separator) : APP_PROFILE.title);
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
      { property: "og:site_name", content: () => APP_PROFILE.title },
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
const _sfc_main$26 = /* @__PURE__ */ defineComponent({
  __name: "loadmore",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean },
    finished: { type: Boolean }
  },
  emits: ["loadmore"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const element = ref(null);
    const observer = ref(null);
    const emitLoadEvent = () => {
      if (!props.loading && !props.finished) {
        emits("loadmore");
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
      }, _attrs))} data-v-15e8afeb>`);
      if (__props.loading) {
        _push(`<div class="loading-wrapper" data-v-15e8afeb>`);
        ssrRenderSlot(_ctx.$slots, "loading", {}, null, _push, _parent);
        _push(`</div>`);
      } else if (!__props.finished) {
        _push(`<div class="normal-wrapper" data-v-15e8afeb>`);
        ssrRenderSlot(_ctx.$slots, "normal", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<div class="finished-wrapper" data-v-15e8afeb>`);
        ssrRenderSlot(_ctx.$slots, "finished", {}, null, _push, _parent);
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$26 = _sfc_main$26.setup;
_sfc_main$26.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/loadmore.vue");
  return _sfc_setup$26 ? _sfc_setup$26(props, ctx) : void 0;
};
const Loadmore = /* @__PURE__ */ _export_sfc(_sfc_main$26, [["__scopeId", "data-v-15e8afeb"]]);
const LOCAL_STORAGE_KEY = "history-state";
const useHistoryStore = defineStore("history", () => {
  const feedbacks = ref([]);
  const likedArticles = reactive(/* @__PURE__ */ new Set());
  const likedComments = reactive(/* @__PURE__ */ new Set());
  const dislikedComments = reactive(/* @__PURE__ */ new Set());
  const isLikedArticle = computed(() => (id) => likedArticles.has(id));
  const isLikedComment = computed(() => (id) => likedComments.has(id));
  const isDislikedComment = computed(() => (id) => dislikedComments.has(id));
  const likeArticle = (id) => {
    likedArticles.add(id);
  };
  const likeComment = (commentId) => {
    likedComments.add(commentId);
  };
  const dislikeComment = (commentId) => {
    dislikedComments.add(commentId);
  };
  const addFeedback = (data) => {
    feedbacks.value.push(data);
  };
  const getState = () => ({
    feedbacks: feedbacks.value,
    likedArticles: Array.from(likedArticles),
    likedComments: Array.from(likedComments),
    dislikedComments: Array.from(dislikedComments)
  });
  const loadState = () => {
    const local = getJSON(LOCAL_STORAGE_KEY);
    if (local) return local;
    const legacy = getJSON("identity-state");
    if (legacy) {
      return {
        feedbacks: legacy.feedbacks ?? [],
        likedArticles: legacy.vote?.likedArticles ?? [],
        likedComments: legacy.vote?.likedComments ?? [],
        dislikedComments: legacy.vote?.dislikedComments ?? []
      };
    }
    return null;
  };
  const resetStateFromStorage = () => {
    try {
      const localState = loadState();
      if (!localState) return;
      feedbacks.value = localState.feedbacks || [];
      likedArticles.clear();
      likedComments.clear();
      dislikedComments.clear();
      localState.likedArticles?.forEach((id) => likedArticles.add(id));
      localState.likedComments?.forEach((id) => likedComments.add(id));
      localState.dislikedComments?.forEach((id) => dislikedComments.add(id));
    } catch {
      remove(LOCAL_STORAGE_KEY);
    }
  };
  const initOnClient = () => {
    resetStateFromStorage();
    watch(
      () => getState(),
      (state) => setJSON(LOCAL_STORAGE_KEY, state),
      { deep: true }
    );
    window.addEventListener("storage", (event) => {
      if (event.key === LOCAL_STORAGE_KEY) {
        resetStateFromStorage();
      }
    });
  };
  return {
    feedbacks,
    isLikedArticle,
    isLikedComment,
    isDislikedComment,
    addFeedback,
    likeArticle,
    likeComment,
    dislikeComment,
    initOnClient
  };
});
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
var ArticleOrigin = /* @__PURE__ */ ((ArticleOrigin2) => {
  ArticleOrigin2[ArticleOrigin2["Original"] = 0] = "Original";
  ArticleOrigin2[ArticleOrigin2["Reprint"] = 1] = "Reprint";
  ArticleOrigin2[ArticleOrigin2["Hybrid"] = 2] = "Hybrid";
  return ArticleOrigin2;
})(ArticleOrigin || {});
const ArticleLanguageI18n = {
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
    "mul"
    /* Multiple */
  ]: {
    [Language.Chinese]: "多语",
    [Language.English]: "MUL"
  }
};
const isOriginalArticle = (origin) => {
  return _isNil(origin) || origin === ArticleOrigin.Original;
};
const isHybridArticle = (origin) => {
  return origin === ArticleOrigin.Hybrid;
};
const isReprintArticle = (origin) => {
  return origin === ArticleOrigin.Reprint;
};
const _sfc_main$25 = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain, globalState } = useEnhancer();
    const historyStore = useHistoryStore();
    const isLiked = computed(() => historyStore.isLikedArticle(props.article.id));
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
            _push2(`<div class="thumbnail" data-v-285c4398${_scopeId}>`);
            if (unref(isOriginalArticle)(__props.article.origin)) {
              _push2(`<span class="origin original" data-v-285c4398${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocalesKey).ORIGIN_ORIGINAL
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else if (unref(isReprintArticle)(__props.article.origin)) {
              _push2(`<span class="origin reprint" data-v-285c4398${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocalesKey).ORIGIN_REPRINT
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else if (unref(isHybridArticle)(__props.article.origin)) {
              _push2(`<span class="origin hybrid" data-v-285c4398${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocalesKey).ORIGIN_HYBRID
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.article.featured) {
              _push2(`<span class="featured" data-v-285c4398${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocalesKey).ARTICLE_FEATURED
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<picture class="picture" data-v-285c4398${_scopeId}>`);
            if (unref(isOriginalStaticURL)(__props.article.thumbnail)) {
              _push2(`<!--[--><source${ssrRenderAttr("srcset", getThumbnailURL(__props.article.thumbnail, "avif"))} type="image/avif" data-v-285c4398${_scopeId}><source${ssrRenderAttr("srcset", getThumbnailURL(__props.article.thumbnail, "webp"))} type="image/webp" data-v-285c4398${_scopeId}><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<img class="image" loading="lazy" draggable="false"${ssrRenderAttr("src", getThumbnailURL(__props.article.thumbnail))}${ssrRenderAttr("alt", __props.article.title)}${ssrRenderAttr("title", __props.article.title)} data-v-285c4398${_scopeId}></picture></div><div class="content" data-v-285c4398${_scopeId}><div class="body" data-v-285c4398${_scopeId}><h4 class="title" data-v-285c4398${_scopeId}><span class="text"${ssrRenderAttr("title", __props.article.title)} data-v-285c4398${_scopeId}>${ssrInterpolate(__props.article.title)}</span><span class="language" data-v-285c4398${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, unref(ArticleLanguageI18n)[__props.article.lang], null, _parent2, _scopeId));
            _push2(`</span></h4><p class="summary" style="${ssrRenderStyle({ "-webkit-box-orient": "vertical" })}" data-v-285c4398${_scopeId}>${__props.article.summary ?? ""}</p></div><div class="meta" data-v-285c4398${_scopeId}><span class="date" data-v-285c4398${_scopeId}><i class="iconfont icon-clock" data-v-285c4398${_scopeId}></i><span class="text" data-v-285c4398${_scopeId}>`);
            _push2(ssrRenderComponent(_component_udate, {
              to: "ago",
              date: __props.article.created_at
            }, null, _parent2, _scopeId));
            _push2(`</span></span><span class="views" data-v-285c4398${_scopeId}><i class="iconfont icon-eye" data-v-285c4398${_scopeId}></i><span class="text" data-v-285c4398${_scopeId}>${ssrInterpolate(unref(numberSplit)(__props.article.stats.views))}</span></span><span class="comments" data-v-285c4398${_scopeId}><i class="iconfont icon-comment" data-v-285c4398${_scopeId}></i><span class="text" data-v-285c4398${_scopeId}>${ssrInterpolate(__props.article.stats.comments)}</span></span><span class="likes" data-v-285c4398${_scopeId}><i class="${ssrRenderClass([{ liked: isLiked.value }, "iconfont icon-like"])}" data-v-285c4398${_scopeId}></i><span class="text" data-v-285c4398${_scopeId}>${ssrInterpolate(__props.article.stats.likes)}</span></span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "thumbnail" }, [
                unref(isOriginalArticle)(__props.article.origin) ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "origin original"
                }, [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ORIGIN_ORIGINAL
                  }, null, 8, ["k"])
                ])) : unref(isReprintArticle)(__props.article.origin) ? (openBlock(), createBlock("span", {
                  key: 1,
                  class: "origin reprint"
                }, [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ORIGIN_REPRINT
                  }, null, 8, ["k"])
                ])) : unref(isHybridArticle)(__props.article.origin) ? (openBlock(), createBlock("span", {
                  key: 2,
                  class: "origin hybrid"
                }, [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ORIGIN_HYBRID
                  }, null, 8, ["k"])
                ])) : createCommentVNode("", true),
                __props.article.featured ? (openBlock(), createBlock("span", {
                  key: 3,
                  class: "featured"
                }, [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_FEATURED
                  }, null, 8, ["k"])
                ])) : createCommentVNode("", true),
                createVNode("picture", { class: "picture" }, [
                  unref(isOriginalStaticURL)(__props.article.thumbnail) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("source", {
                      srcset: getThumbnailURL(__props.article.thumbnail, "avif"),
                      type: "image/avif"
                    }, null, 8, ["srcset"]),
                    createVNode("source", {
                      srcset: getThumbnailURL(__props.article.thumbnail, "webp"),
                      type: "image/webp"
                    }, null, 8, ["srcset"])
                  ], 64)) : createCommentVNode("", true),
                  createVNode("img", {
                    class: "image",
                    loading: "lazy",
                    draggable: "false",
                    src: getThumbnailURL(__props.article.thumbnail),
                    alt: __props.article.title,
                    title: __props.article.title
                  }, null, 8, ["src", "alt", "title"])
                ])
              ]),
              createVNode("div", { class: "content" }, [
                createVNode("div", { class: "body" }, [
                  createVNode("h4", { class: "title" }, [
                    createVNode("span", {
                      class: "text",
                      title: __props.article.title
                    }, toDisplayString(__props.article.title), 9, ["title"]),
                    createVNode("span", { class: "language" }, [
                      createVNode(_component_i18n, unref(ArticleLanguageI18n)[__props.article.lang], null, 16)
                    ])
                  ]),
                  createVNode("p", {
                    class: "summary",
                    style: { "-webkit-box-orient": "vertical" },
                    innerHTML: __props.article.summary
                  }, null, 8, ["innerHTML"])
                ]),
                createVNode("div", { class: "meta" }, [
                  createVNode("span", { class: "date" }, [
                    createVNode("i", { class: "iconfont icon-clock" }),
                    createVNode("span", { class: "text" }, [
                      createVNode(_component_udate, {
                        to: "ago",
                        date: __props.article.created_at
                      }, null, 8, ["date"])
                    ])
                  ]),
                  createVNode("span", { class: "views" }, [
                    createVNode("i", { class: "iconfont icon-eye" }),
                    createVNode("span", { class: "text" }, toDisplayString(unref(numberSplit)(__props.article.stats.views)), 1)
                  ]),
                  createVNode("span", { class: "comments" }, [
                    createVNode("i", { class: "iconfont icon-comment" }),
                    createVNode("span", { class: "text" }, toDisplayString(__props.article.stats.comments), 1)
                  ]),
                  createVNode("span", { class: "likes" }, [
                    createVNode("i", {
                      class: ["iconfont icon-like", { liked: isLiked.value }]
                    }, null, 2),
                    createVNode("span", { class: "text" }, toDisplayString(__props.article.stats.likes), 1)
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
const _sfc_setup$25 = _sfc_main$25.setup;
_sfc_main$25.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mobile/listing/item.vue");
  return _sfc_setup$25 ? _sfc_setup$25(props, ctx) : void 0;
};
const ListItem$1 = /* @__PURE__ */ _export_sfc(_sfc_main$25, [["__scopeId", "data-v-285c4398"]]);
const _sfc_main$24 = /* @__PURE__ */ defineComponent({
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
    const { appOptions, isZhLang, i18n: _i18n } = useEnhancer();
    const tagStore = useTagStore();
    const categoryStore = useCategoryStore();
    const articleListStore = useArticleListStore();
    const filterCategory = computed(() => {
      return props.categorySlug ? categoryStore.data.find(({ slug }) => slug === props.categorySlug) : null;
    });
    const filterTag = computed(() => {
      return props.tagSlug ? tagStore.data.find(({ slug }) => slug === props.tagSlug) : null;
    });
    const fetchParams = computed(() => ({
      date: props.date,
      keyword: props.searchKeyword,
      category_slug: props.categorySlug,
      tag_slug: props.tagSlug
    }));
    const fetchArticles = () => {
      return articleListStore.fetch(fetchParams.value);
    };
    const fetchNextPageArticles = async () => {
      await articleListStore.fetchNextPage(fetchParams.value);
      scrollToNextScreen();
    };
    usePageSeo(() => {
      if (props.date) {
        return { pageTitles: [props.date, isZhLang.value ? "日期" : "Date"] };
      } else if (props.searchKeyword) {
        return isZhLang.value ? { pageTitles: [`“${props.searchKeyword}”`, "搜索"] } : { pageTitles: [`"${props.searchKeyword}"`, "Search"] };
      } else if (filterCategory.value) {
        return { pageTitles: [filterCategory.value.name, firstUpperCase(filterCategory.value.slug)] };
      } else if (filterTag.value) {
        const tagZhName = filterTag.value.name;
        const tagEnName = getTagEnName(filterTag.value);
        return { pageTitles: isZhLang.value ? [tagZhName, tagEnName] : [tagEnName, "Tag"] };
      }
      return {
        title: `${APP_PROFILE.title} - ${_i18n.t(LocalesKey.APP_SLOGAN)}`,
        description: isZhLang.value ? APP_PROFILE.description_zh : APP_PROFILE.description_en,
        keywords: appOptions.value?.keywords.join(","),
        ogType: "website"
      };
    });
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
      const _component_skeleton = resolveComponent("skeleton");
      const _component_empty = resolveComponent("empty");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "articles-page" }, _attrs))} data-v-6a9fa606>`);
      if (__props.tagSlug || __props.categorySlug || __props.date || __props.searchKeyword) {
        _push(`<div class="articles-list-header" data-v-6a9fa606><div class="content" data-v-6a9fa606>`);
        if (__props.categorySlug) {
          _push(`<!--[-->`);
          if (filterCategory.value) {
            _push(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`分类 “${ssrInterpolate(filterCategory.value.name)}” 下的所有文章`);
                } else {
                  return [
                    createTextVNode("分类 “" + toDisplayString(filterCategory.value.name) + "” 下的所有文章", 1)
                  ];
                }
              }),
              en: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Articles in category &quot;${ssrInterpolate(unref(firstUpperCase)(filterCategory.value.slug))}&quot;`);
                } else {
                  return [
                    createTextVNode('Articles in category "' + toDisplayString(unref(firstUpperCase)(filterCategory.value.slug)) + '"', 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<span data-v-6a9fa606>${ssrInterpolate(__props.categorySlug)}</span>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (__props.tagSlug) {
          _push(`<!--[-->`);
          if (filterTag.value) {
            _push(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`标签 “${ssrInterpolate(filterTag.value.name)}” 的相关文章`);
                } else {
                  return [
                    createTextVNode("标签 “" + toDisplayString(filterTag.value.name) + "” 的相关文章", 1)
                  ];
                }
              }),
              en: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Articles tagged &quot;${ssrInterpolate(unref(getTagEnName)(filterTag.value))}&quot;`);
                } else {
                  return [
                    createTextVNode('Articles tagged "' + toDisplayString(unref(getTagEnName)(filterTag.value)) + '"', 1)
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<span data-v-6a9fa606>${ssrInterpolate(__props.tagSlug)}</span>`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (__props.date) {
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`发布于 ${ssrInterpolate(__props.date)} 的文章`);
              } else {
                return [
                  createTextVNode("发布于 " + toDisplayString(__props.date) + " 的文章", 1)
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Articles from ${ssrInterpolate(__props.date)}`);
              } else {
                return [
                  createTextVNode("Articles from " + toDisplayString(__props.date), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (__props.searchKeyword) {
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`关键词 “${ssrInterpolate(__props.searchKeyword)}” 的搜索结果`);
              } else {
                return [
                  createTextVNode("关键词 “" + toDisplayString(__props.searchKeyword) + "” 的搜索结果", 1)
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Search results for &quot;${ssrInterpolate(__props.searchKeyword)}&quot;`);
              } else {
                return [
                  createTextVNode('Search results for "' + toDisplayString(__props.searchKeyword) + '"', 1)
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
              _push2(`<i class="iconfont icon-cancel" data-v-6a9fa606${_scopeId}></i>`);
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
        "has-data": !!unref(articleListStore).data.length,
        loading: unref(articleListStore).fetching && !unref(articleListStore).data.length
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="articles-list-skeleton" data-v-6a9fa606${_scopeId}><!--[-->`);
            ssrRenderList(3, (item) => {
              _push2(`<li class="item" data-v-6a9fa606${_scopeId}><div class="thumbnail" data-v-6a9fa606${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "skeleton" }, null, _parent2, _scopeId));
              _push2(`</div><div class="content" data-v-6a9fa606${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "line" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "line" }, null, _parent2, _scopeId));
              _push2(`</div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "articles-list-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (item) => {
                  return createVNode("li", {
                    key: item,
                    class: "item"
                  }, [
                    createVNode("div", { class: "thumbnail" }, [
                      createVNode(_component_skeleton, { class: "skeleton" })
                    ]),
                    createVNode("div", { class: "content" }, [
                      createVNode(_component_skeleton, { class: "title" }),
                      createVNode(_component_skeleton, { class: "line" }),
                      createVNode(_component_skeleton, { class: "line" })
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
              class: "articles-list-empty",
              bold: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "articles-list-empty",
                bold: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-6a9fa606${_scopeId}><div${ssrRenderAttrs({
              key: "list",
              name: "list",
              class: "articles-list-content"
            })} data-v-6a9fa606>`);
            ssrRenderList(unref(articleListStore).data, (article, index) => {
              _push2(ssrRenderComponent(ListItem$1, {
                class: "list-item",
                article,
                key: index
              }, null, _parent2, _scopeId));
            });
            _push2(`</div>`);
            _push2(ssrRenderComponent(Loadmore, {
              class: "articles-list-loadmore",
              loading: unref(articleListStore).fetching,
              finished: !unref(articleListStore).hasMore,
              onLoadmore: fetchNextPageArticles
            }, {
              normal: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button class="normal" data-v-6a9fa606${_scopeId2}><i class="iconfont icon-loadmore" data-v-6a9fa606${_scopeId2}></i></button>`);
                } else {
                  return [
                    createVNode("button", {
                      class: "normal",
                      onClick: fetchNextPageArticles
                    }, [
                      createVNode("i", { class: "iconfont icon-loadmore" })
                    ])
                  ];
                }
              }),
              loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_loading_indicator, {
                    width: "2rem",
                    height: "1rem",
                    gap: "lg"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_loading_indicator, {
                      width: "2rem",
                      height: "1rem",
                      gap: "lg"
                    })
                  ];
                }
              }),
              finished: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="finished" data-v-6a9fa606${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).LIST_NO_MORE_DATA
                  }, null, _parent3, _scopeId2));
                  _push3(`</span>`);
                } else {
                  return [
                    createVNode("span", { class: "finished" }, [
                      createVNode(_component_i18n, {
                        k: unref(LocalesKey).LIST_NO_MORE_DATA
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
                  class: "articles-list-content"
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
                  class: "articles-list-loadmore",
                  loading: unref(articleListStore).fetching,
                  finished: !unref(articleListStore).hasMore,
                  onLoadmore: fetchNextPageArticles
                }, {
                  normal: withCtx(() => [
                    createVNode("button", {
                      class: "normal",
                      onClick: fetchNextPageArticles
                    }, [
                      createVNode("i", { class: "iconfont icon-loadmore" })
                    ])
                  ]),
                  loading: withCtx(() => [
                    createVNode(_component_loading_indicator, {
                      width: "2rem",
                      height: "1rem",
                      gap: "lg"
                    })
                  ]),
                  finished: withCtx(() => [
                    createVNode("span", { class: "finished" }, [
                      createVNode(_component_i18n, {
                        k: unref(LocalesKey).LIST_NO_MORE_DATA
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
const _sfc_setup$24 = _sfc_main$24.setup;
_sfc_main$24.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mobile/listing/index.vue");
  return _sfc_setup$24 ? _sfc_setup$24(props, ctx) : void 0;
};
const MobileListing = /* @__PURE__ */ _export_sfc(_sfc_main$24, [["__scopeId", "data-v-6a9fa606"]]);
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
  TunnelModule2["StatisticsGitHubJson"] = "statistics_github_json";
  TunnelModule2["StatisticsNpmJson"] = "statistics_npm_json";
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
      const request2 = tunnel$1.fetch(TunnelModule.ThreadsMedias);
      return request2;
    }
  });
});
defineStore("instagramProfile", () => {
  return createFetchStore({
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.InstagramProfile)
  });
});
const useInstagramLatestMediasStore = defineStore("instagramLatestMedias", () => {
  return createFetchStore({
    data: null,
    fetcher: () => {
      const request2 = tunnel$1.fetch(TunnelModule.InstagramMedias);
      return request2;
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
const _sfc_main$23 = /* @__PURE__ */ defineComponent({
  __name: "list-loadmore",
  __ssrInlineRender: true,
  props: {
    hasMore: { type: Boolean },
    fetching: { type: Boolean }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const { isZhLang } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: "article-list-loadmore",
        disabled: __props.fetching || !__props.hasMore
      }, _attrs))} data-v-03049ac2><div class="background" data-v-03049ac2><span class="left" data-v-03049ac2></span><span class="right" data-v-03049ac2></span></div><div class="content" data-v-03049ac2><span class="left" data-v-03049ac2>`);
      if (__props.fetching) {
        _push(`<!--[-->•••<!--]-->`);
      } else {
        ssrRenderSlot(_ctx.$slots, "pagination", {}, null, _push, _parent);
      }
      _push(`</span><span class="right" data-v-03049ac2><span class="${ssrRenderClass([{ zh: unref(isZhLang) }, "text"])}" data-v-03049ac2>`);
      if (__props.fetching) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).ARTICLE_LIST_LOADING
        }, null, _parent));
      } else if (__props.hasMore) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).ARTICLE_LIST_LOADMORE
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).LIST_NO_MORE_DATA
        }, null, _parent));
      }
      _push(`</span>`);
      if (__props.fetching || __props.hasMore) {
        _push(`<i class="iconfont icon-loadmore" data-v-03049ac2></i>`);
      } else {
        _push(`<i class="iconfont icon-stop" data-v-03049ac2></i>`);
      }
      _push(`</span></div></button>`);
    };
  }
});
const _sfc_setup$23 = _sfc_main$23.setup;
_sfc_main$23.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/listing/list-loadmore.vue");
  return _sfc_setup$23 ? _sfc_setup$23(props, ctx) : void 0;
};
const ListLoadmore = /* @__PURE__ */ _export_sfc(_sfc_main$23, [["__scopeId", "data-v-03049ac2"]]);
const _sfc_main$22 = /* @__PURE__ */ defineComponent({
  __name: "list-item",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain, isZhLang, i18n: _i18n } = useEnhancer();
    const historyStore = useHistoryStore();
    const isLiked = computed(() => historyStore.isLikedArticle(props.article.id));
    const imageRef = shallowRef(null);
    const finallyThumbnailURL = shallowRef(null);
    const setFinallyThumbnailURL = () => {
      finallyThumbnailURL.value = imageRef.value?.currentSrc ?? null;
    };
    const getLanguageText = (language) => {
      const targetI18n = ArticleLanguageI18n[language];
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-item" }, _attrs))} data-v-ae194eee><div class="item-background" style="${ssrRenderStyle({ backgroundImage: finallyThumbnailURL.value ? `url('${finallyThumbnailURL.value}')` : "none" })}" data-v-ae194eee></div><div class="item-content" data-v-ae194eee>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "item-thumbnail",
        to: unref(getArticleDetailRoute)(__props.article.id)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isOriginalArticle)(__props.article.origin)) {
              _push2(`<span class="item-origin original" data-v-ae194eee${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocalesKey).ORIGIN_ORIGINAL
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else if (unref(isReprintArticle)(__props.article.origin)) {
              _push2(`<span class="item-origin reprint" data-v-ae194eee${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocalesKey).ORIGIN_REPRINT
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else if (unref(isHybridArticle)(__props.article.origin)) {
              _push2(`<span class="item-origin hybrid" data-v-ae194eee${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                k: unref(LocalesKey).ORIGIN_HYBRID
              }, null, _parent2, _scopeId));
              _push2(`</span>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.article.featured) {
              _push2(`<span class="item-featured"${ssrRenderAttr("title", unref(_i18n).t(unref(LocalesKey).ARTICLE_FEATURED))} data-v-ae194eee${_scopeId}><i class="iconfont icon-windmill" data-v-ae194eee${_scopeId}></i></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<picture class="picture" data-v-ae194eee${_scopeId}>`);
            if (unref(isOriginalStaticURL)(__props.article.thumbnail)) {
              _push2(`<!--[--><source${ssrRenderAttr("srcset", getThumbnailURL(__props.article.thumbnail, "avif"))} type="image/avif" data-v-ae194eee${_scopeId}><source${ssrRenderAttr("srcset", getThumbnailURL(__props.article.thumbnail, "webp"))} type="image/webp" data-v-ae194eee${_scopeId}><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<img class="image" loading="lazy" draggable="false"${ssrRenderAttr("alt", __props.article.title)}${ssrRenderAttr("title", __props.article.title)}${ssrRenderAttr("src", getThumbnailURL(__props.article.thumbnail))} data-v-ae194eee${_scopeId}></picture>`);
          } else {
            return [
              unref(isOriginalArticle)(__props.article.origin) ? (openBlock(), createBlock("span", {
                key: 0,
                class: "item-origin original"
              }, [
                createVNode(_component_i18n, {
                  k: unref(LocalesKey).ORIGIN_ORIGINAL
                }, null, 8, ["k"])
              ])) : unref(isReprintArticle)(__props.article.origin) ? (openBlock(), createBlock("span", {
                key: 1,
                class: "item-origin reprint"
              }, [
                createVNode(_component_i18n, {
                  k: unref(LocalesKey).ORIGIN_REPRINT
                }, null, 8, ["k"])
              ])) : unref(isHybridArticle)(__props.article.origin) ? (openBlock(), createBlock("span", {
                key: 2,
                class: "item-origin hybrid"
              }, [
                createVNode(_component_i18n, {
                  k: unref(LocalesKey).ORIGIN_HYBRID
                }, null, 8, ["k"])
              ])) : createCommentVNode("", true),
              __props.article.featured ? (openBlock(), createBlock("span", {
                key: 3,
                class: "item-featured",
                title: unref(_i18n).t(unref(LocalesKey).ARTICLE_FEATURED)
              }, [
                createVNode("i", { class: "iconfont icon-windmill" })
              ], 8, ["title"])) : createCommentVNode("", true),
              createVNode("picture", { class: "picture" }, [
                unref(isOriginalStaticURL)(__props.article.thumbnail) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                  createVNode("source", {
                    srcset: getThumbnailURL(__props.article.thumbnail, "avif"),
                    type: "image/avif"
                  }, null, 8, ["srcset"]),
                  createVNode("source", {
                    srcset: getThumbnailURL(__props.article.thumbnail, "webp"),
                    type: "image/webp"
                  }, null, 8, ["srcset"])
                ], 64)) : createCommentVNode("", true),
                createVNode("img", {
                  class: "image",
                  loading: "lazy",
                  draggable: "false",
                  ref_key: "imageRef",
                  ref: imageRef,
                  alt: __props.article.title,
                  title: __props.article.title,
                  src: getThumbnailURL(__props.article.thumbnail),
                  onLoad: setFinallyThumbnailURL
                }, null, 40, ["alt", "title", "src"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="item-body" data-v-ae194eee><div class="item-content" data-v-ae194eee><h5 class="title" data-v-ae194eee>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "link",
        to: unref(getArticleDetailRoute)(__props.article.id),
        title: __props.article.title
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.article.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.article.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<span class="language" data-v-ae194eee>${ssrInterpolate(getLanguageText(__props.article.lang))}</span></h5><p class="summary" style="${ssrRenderStyle({ "-webkit-box-orient": "vertical" })}" data-v-ae194eee>${__props.article.summary ?? ""}</p></div><div class="item-meta" data-v-ae194eee><span class="date" data-v-ae194eee><i class="iconfont icon-clock" data-v-ae194eee></i>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: __props.article.created_at
      }, null, _parent));
      _push(`</span><span class="views" data-v-ae194eee><i class="iconfont icon-eye" data-v-ae194eee></i><span data-v-ae194eee>${ssrInterpolate(unref(numberSplit)(__props.article.stats.views))}</span></span><span class="comments" data-v-ae194eee><i class="iconfont icon-comment" data-v-ae194eee></i><span data-v-ae194eee>${ssrInterpolate(__props.article.stats.comments)}</span></span><span class="likes" data-v-ae194eee><i class="${ssrRenderClass([{ liked: isLiked.value }, "iconfont icon-like"])}" data-v-ae194eee></i><span data-v-ae194eee>${ssrInterpolate(__props.article.stats.likes)}</span></span><span class="categories" data-v-ae194eee>`);
      if (!!__props.article.categories.length) {
        _push(`<!--[--><i class="iconfont icon-category" data-v-ae194eee></i><!--[-->`);
        ssrRenderList(__props.article.categories.slice(0, 1), (category, index) => {
          _push(ssrRenderComponent(_component_router_link, {
            key: index,
            to: unref(getCategoryFlowRoute)(category.slug)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: category.name,
                  en: category.slug
                }, null, _parent2, _scopeId));
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
          }, _parent));
        });
        _push(`<!--]--><!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          zh: "无分类",
          en: "Uncategorized"
        }, null, _parent));
      }
      _push(`</span></div></div></div></div>`);
    };
  }
});
const _sfc_setup$22 = _sfc_main$22.setup;
_sfc_main$22.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/listing/list-item.vue");
  return _sfc_setup$22 ? _sfc_setup$22(props, ctx) : void 0;
};
const ListItem = /* @__PURE__ */ _export_sfc(_sfc_main$22, [["__scopeId", "data-v-ae194eee"]]);
const _sfc_main$21 = /* @__PURE__ */ defineComponent({
  __name: "list-main",
  __ssrInlineRender: true,
  props: {
    articles: {},
    fetching: { type: Boolean },
    mammon: { type: Boolean }
  },
  setup(__props) {
    const { theme } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_i18n = resolveComponent("i18n");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_client_only = resolveComponent("client-only");
      const _component_Adsense = resolveComponent("Adsense");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-list" }, _attrs))} data-v-303b7bf7>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: __props.fetching && !__props.articles.length,
        "has-data": !!__props.articles.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "article-list-empty",
              bold: "",
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "article-list-empty",
                bold: "",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="article-list-skeleton" data-v-303b7bf7${_scopeId}><!--[-->`);
            ssrRenderList(6, (item) => {
              _push2(`<li class="item" data-v-303b7bf7${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "thumbnail" }, null, _parent2, _scopeId));
              _push2(`<div class="content" data-v-303b7bf7${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
              _push2(`<div class="description" data-v-303b7bf7${_scopeId}><!--[-->`);
              ssrRenderList(2, (i) => {
                _push2(ssrRenderComponent(_component_skeleton, {
                  class: "line",
                  key: i
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "meta" }, null, _parent2, _scopeId));
              _push2(`</div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "article-list-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(6, (item) => {
                  return createVNode("li", {
                    key: item,
                    class: "item"
                  }, [
                    createVNode(_component_skeleton, { class: "thumbnail" }),
                    createVNode("div", { class: "content" }, [
                      createVNode(_component_skeleton, { class: "title" }),
                      createVNode("div", { class: "description" }, [
                        (openBlock(), createBlock(Fragment, null, renderList(2, (i) => {
                          return createVNode(_component_skeleton, {
                            class: "line",
                            key: i
                          });
                        }), 64))
                      ]),
                      createVNode(_component_skeleton, { class: "meta" })
                    ])
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="article-list-content" data-v-303b7bf7${_scopeId}>`);
            _push2(ssrRenderComponent(_component_client_only, { transition: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.mammon) {
                    _push3(`<!--[-->`);
                    if (unref(theme).isDark.value) {
                      _push3(ssrRenderComponent(_component_Adsense, {
                        key: "dark-adsense",
                        class: "article-list-mammon",
                        "ins-class": "mammon-ins",
                        "ins-style": "display:block",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hf-e+4i-9k+38",
                        "data-ad-slot": "1765379407"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(_component_Adsense, {
                        key: "light-adsense",
                        class: "article-list-mammon",
                        "ins-class": "mammon-ins",
                        "ins-style": "display:block",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hf-e+4i-9k+38",
                        "data-ad-slot": "1148538406"
                      }, null, _parent3, _scopeId2));
                    }
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    __props.mammon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      unref(theme).isDark.value ? (openBlock(), createBlock(_component_Adsense, {
                        key: "dark-adsense",
                        class: "article-list-mammon",
                        "ins-class": "mammon-ins",
                        "ins-style": "display:block",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hf-e+4i-9k+38",
                        "data-ad-slot": "1765379407"
                      })) : (openBlock(), createBlock(_component_Adsense, {
                        key: "light-adsense",
                        class: "article-list-mammon",
                        "ins-class": "mammon-ins",
                        "ins-style": "display:block",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hf-e+4i-9k+38",
                        "data-ad-slot": "1148538406"
                      }))
                    ], 64)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(__props.articles, (article) => {
              _push2(ssrRenderComponent(ListItem, {
                class: "article-list-item",
                key: article.id,
                article
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "article-list-content" }, [
                createVNode(_component_client_only, { transition: "" }, {
                  default: withCtx(() => [
                    __props.mammon ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      unref(theme).isDark.value ? (openBlock(), createBlock(_component_Adsense, {
                        key: "dark-adsense",
                        class: "article-list-mammon",
                        "ins-class": "mammon-ins",
                        "ins-style": "display:block",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hf-e+4i-9k+38",
                        "data-ad-slot": "1765379407"
                      })) : (openBlock(), createBlock(_component_Adsense, {
                        key: "light-adsense",
                        class: "article-list-mammon",
                        "ins-class": "mammon-ins",
                        "ins-style": "display:block",
                        "data-ad-format": "fluid",
                        "data-ad-layout-key": "-hf-e+4i-9k+38",
                        "data-ad-slot": "1148538406"
                      }))
                    ], 64)) : createCommentVNode("", true)
                  ]),
                  _: 1
                }),
                createVNode(TransitionGroup, { name: "list" }, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.articles, (article) => {
                      return openBlock(), createBlock(ListItem, {
                        class: "article-list-item",
                        key: article.id,
                        article
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$21 = _sfc_main$21.setup;
_sfc_main$21.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/listing/list-main.vue");
  return _sfc_setup$21 ? _sfc_setup$21(props, ctx) : void 0;
};
const ListMain = /* @__PURE__ */ _export_sfc(_sfc_main$21, [["__scopeId", "data-v-303b7bf7"]]);
const _sfc_main$20 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    articles: {},
    pagination: {},
    fetching: { type: Boolean },
    hasMore: { type: Boolean },
    mammon: { type: Boolean, default: true }
  },
  emits: ["loadmore"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(ListMain, {
        class: "list-main",
        articles: __props.articles,
        fetching: __props.fetching,
        mammon: __props.mammon
      }, null, _parent));
      _push(ssrRenderComponent(ListLoadmore, {
        fetching: __props.fetching,
        "has-more": __props.hasMore,
        onClick: ($event) => emits("loadmore")
      }, {
        pagination: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.articles.length)} / ${ssrInterpolate(__props.pagination?.total)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.articles.length) + " / " + toDisplayString(__props.pagination?.total), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$20 = _sfc_main$20.setup;
_sfc_main$20.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/listing/index.vue");
  return _sfc_setup$20 ? _sfc_setup$20(props, ctx) : void 0;
};
const ArticleListMain = /* @__PURE__ */ _export_sfc(_sfc_main$20, [["__scopeId", "data-v-39e9a243"]]);
Swiper.use([Autoplay, Mousewheel, Mousewheel, Grid, EffectFade]);
const INITIAL_SLIDE_INDEX = 0;
const _sfc_main$1$ = /* @__PURE__ */ defineComponent({
  __name: "carrousel",
  __ssrInlineRender: true,
  props: {
    articles: {},
    fetching: { type: Boolean },
    count: { default: 9 }
  },
  setup(__props) {
    const props = __props;
    const { appConfig, cdnDomain, i18n: _i18n } = useEnhancer();
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
        subscript: article.featured ? _i18n.t(LocalesKey.ARTICLE_FEATURED) : void 0
      }));
      if (!result.length) {
        return [];
      }
      if (appConfig.value.AD_PC_CARROUSEL) {
        const config = appConfig.value.AD_PC_CARROUSEL;
        result.splice(config.index, 0, {
          title: config.title,
          image: config.src,
          url: config.url,
          subscript: _i18n.t(LocalesKey.AD)
        });
      }
      return result;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_i18n = resolveComponent("i18n");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_ulink = resolveComponent("ulink");
      const _component_client_only = resolveComponent("client-only");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "carrousel" }, _attrs))} data-v-46414b62>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: __props.fetching,
        "has-data": !!slides.value.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "article-empty",
              bold: "",
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).ARTICLE_PLACEHOLDER
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
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="article-skeleton" data-v-46414b62${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
            _push2(`<div class="content" data-v-46414b62${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton, { class: "first" }, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(3, (index) => {
              _push2(`<div class="lines" data-v-46414b62${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "item" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "article-skeleton" }, [
                createVNode(_component_skeleton, { class: "title" }),
                createVNode("div", { class: "content" }, [
                  createVNode(_component_skeleton, { class: "first" }),
                  (openBlock(), createBlock(Fragment, null, renderList(3, (index) => {
                    return createVNode("div", {
                      class: "lines",
                      key: index
                    }, [
                      createVNode(_component_skeleton, { class: "item" })
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
                        _push4(`<div class="swiper-pagination" data-v-46414b62${_scopeId3}><!--[-->`);
                        ssrRenderList(slides.value.slice(0, 9), (slide, index) => {
                          _push4(`<div${ssrRenderAttr("aria-label", `Go to article ${slide.title}`)} class="${ssrRenderClass([{ active: index === activatedSlideIndex.value }, "swiper-pagination-bullet"])}" role="button" data-v-46414b62${_scopeId3}><span class="bullet-progress" data-v-46414b62${_scopeId3}></span></div>`);
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
                          _push4(`<div class="content" data-v-46414b62${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_ulink, {
                            class: "link",
                            href: slide.url,
                            to: slide.route
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<picture class="picture" data-v-46414b62${_scopeId4}>`);
                                if (unref(isOriginalStaticURL)(slide.image)) {
                                  _push5(`<!--[--><source${ssrRenderAttr("srcset", getPictureURL(slide.image, "avif"))} type="image/avif" data-v-46414b62${_scopeId4}><source${ssrRenderAttr("srcset", getPictureURL(slide.image, "webp"))} type="image/webp" data-v-46414b62${_scopeId4}><!--]-->`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`<img class="image" draggable="false"${ssrRenderAttr("alt", slide.title)}${ssrRenderAttr("src", getPictureURL(slide.image))} data-v-46414b62${_scopeId4}></picture><div class="title"${ssrRenderAttr("title", slide.title)} data-v-46414b62${_scopeId4}><div class="background" data-v-46414b62${_scopeId4}></div><div class="prospect" data-v-46414b62${_scopeId4}><span class="text" data-v-46414b62${_scopeId4}>${ssrInterpolate(slide.title)}</span></div></div>`);
                                if (slide.subscript) {
                                  _push5(`<span class="subscript" data-v-46414b62${_scopeId4}>${ssrInterpolate(slide.subscript)}</span>`);
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
                                    class: "title",
                                    title: slide.title
                                  }, [
                                    createVNode("div", { class: "background" }),
                                    createVNode("div", { class: "prospect" }, [
                                      createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                    ])
                                  ], 8, ["title"]),
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
                                    class: "title",
                                    title: slide.title
                                  }, [
                                    createVNode("div", { class: "background" }),
                                    createVNode("div", { class: "prospect" }, [
                                      createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                    ])
                                  ], 8, ["title"]),
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
                                  class: "title",
                                  title: slide.title
                                }, [
                                  createVNode("div", { class: "background" }),
                                  createVNode("div", { class: "prospect" }, [
                                    createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                  ])
                                ], 8, ["title"]),
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
                                class: "title",
                                title: slide.title
                              }, [
                                createVNode("div", { class: "background" }),
                                createVNode("div", { class: "prospect" }, [
                                  createVNode("span", { class: "text" }, toDisplayString(slide.title), 1)
                                ])
                              ], 8, ["title"]),
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
const _sfc_setup$1$ = _sfc_main$1$.setup;
_sfc_main$1$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/carrousel.vue");
  return _sfc_setup$1$ ? _sfc_setup$1$(props, ctx) : void 0;
};
const Carrousel = /* @__PURE__ */ _export_sfc(_sfc_main$1$, [["__scopeId", "data-v-46414b62"]]);
const _sfc_main$1_ = /* @__PURE__ */ defineComponent({
  __name: "threads",
  __ssrInlineRender: true,
  props: {
    profile: {},
    medias: {},
    fetching: { type: Boolean }
  },
  setup(__props) {
    const { goLinks, isCNUser } = useEnhancer();
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
      const _component_skeleton = resolveComponent("skeleton");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "threads" }, _attrs))} data-v-9a16164c>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: __props.fetching,
        "has-data": !!__props.profile
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "threads-empty",
              bold: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "threads-empty",
                bold: ""
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="threads-skeleton" data-v-9a16164c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton, { class: "profile" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_skeleton, { class: "content" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "threads-skeleton" }, [
                createVNode(_component_skeleton, { class: "profile" }),
                createVNode(_component_skeleton, { class: "content" })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="threads-content" data-v-9a16164c${_scopeId}>`);
            if (__props.profile) {
              _push2(`<div class="profile" data-v-9a16164c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ulink, {
                class: "link",
                href: unref(goLinks).threads,
                title: __props.profile.name,
                onMousedown: ($event) => handleGtagEvent()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_uimage, {
                      class: "avatar",
                      src: __props.profile.avatar_url,
                      proxy: unref(isCNUser),
                      defer: ""
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="logo" data-v-9a16164c${_scopeId2}><i class="iconfont icon-threads" data-v-9a16164c${_scopeId2}></i></span>`);
                  } else {
                    return [
                      createVNode(_component_uimage, {
                        class: "avatar",
                        src: __props.profile.avatar_url,
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
              _push2(`<div class="count" data-v-9a16164c${_scopeId}><p class="title" data-v-9a16164c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                en: "Latest",
                zh: "近时"
              }, null, _parent2, _scopeId));
              _push2(`</p><p class="secondary" data-v-9a16164c${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                en: "threads",
                zh: "一念"
              }, null, _parent2, _scopeId));
              _push2(`</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="posts" data-v-9a16164c${_scopeId}>`);
            if (!__props.medias.length) {
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
                    ssrRenderList(__props.medias, (media, index) => {
                      _push3(ssrRenderComponent(unref(SwiperSlide), {
                        class: "post-item",
                        key: index
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="content" data-v-9a16164c${_scopeId3}>`);
                            if (media.text) {
                              _push4(`<div${ssrRenderAttr("title", media.text)} class="${ssrRenderClass(["main", { "has-media": isMediaPost(media) }])}" data-v-9a16164c${_scopeId3}>${unref(unescape)(media.text) ?? ""}</div>`);
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
                                      _push5(`<i class="iconfont media icon-video" data-v-9a16164c${_scopeId4}></i>`);
                                    } else if (media.media_type === "AUDIO") {
                                      _push5(`<i class="iconfont media icon-audio" data-v-9a16164c${_scopeId4}></i>`);
                                    } else if (media.media_type === "IMAGE" || media.media_type === "CAROUSEL_ALBUM") {
                                      _push5(`<i class="iconfont media icon-image" data-v-9a16164c${_scopeId4}></i>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    if (media.children?.data?.length) {
                                      _push5(`<span class="count" data-v-9a16164c${_scopeId4}>[${ssrInterpolate(media.children.data.length)}]</span>`);
                                    } else {
                                      _push5(`<!---->`);
                                    }
                                    _push5(`<i class="iconfont window icon-new-window-s" data-v-9a16164c${_scopeId4}></i>`);
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
                            _push4(`</div><div class="meta" data-v-9a16164c${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_ulink, {
                              class: "link",
                              title: "To Post",
                              href: media.permalink,
                              onMousedown: ($event) => handleGtagEvent()
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  if (media.is_quote_post) {
                                    _push5(`<i class="iconfont icon-repost" data-v-9a16164c${_scopeId4}></i>`);
                                  } else {
                                    _push5(`<i class="iconfont icon-threads" data-v-9a16164c${_scopeId4}></i>`);
                                  }
                                  _push5(`<span data-v-9a16164c${_scopeId4}>thread</span><span class="new-window-icon" data-v-9a16164c${_scopeId4}><i class="iconfont icon-new-window-s" data-v-9a16164c${_scopeId4}></i></span>`);
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
                                    createVNode("span", { class: "new-window-icon" }, [
                                      createVNode("i", { class: "iconfont icon-new-window-s" })
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`<div class="divider" data-v-9a16164c${_scopeId3}></div>`);
                            if (media.timestamp) {
                              _push4(`<span class="date" data-v-9a16164c${_scopeId3}>`);
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
                                  class: "link",
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
                                    createVNode("span", { class: "new-window-icon" }, [
                                      createVNode("i", { class: "iconfont icon-new-window-s" })
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["href", "onMousedown"]),
                                createVNode("div", { class: "divider" }),
                                media.timestamp ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "date"
                                }, [
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
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.medias, (media, index) => {
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
                                class: "link",
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
                                  createVNode("span", { class: "new-window-icon" }, [
                                    createVNode("i", { class: "iconfont icon-new-window-s" })
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["href", "onMousedown"]),
                              createVNode("div", { class: "divider" }),
                              media.timestamp ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "date"
                              }, [
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
            _push2(`</div><div class="navigation" data-v-9a16164c${_scopeId}><button class="button prev"${ssrIncludeBooleanAttr(!__props.medias.length || activeIndex.value === 0) ? " disabled" : ""} data-v-9a16164c${_scopeId}><i class="iconfont icon-totop" data-v-9a16164c${_scopeId}></i></button><button class="button next"${ssrIncludeBooleanAttr(!__props.medias.length || activeIndex.value === __props.medias.length - 1) ? " disabled" : ""} data-v-9a16164c${_scopeId}><i class="iconfont icon-tobottom" data-v-9a16164c${_scopeId}></i></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "threads-content" }, [
                __props.profile ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "profile"
                }, [
                  createVNode(_component_ulink, {
                    class: "link",
                    href: unref(goLinks).threads,
                    title: __props.profile.name,
                    onMousedown: ($event) => handleGtagEvent()
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_uimage, {
                        class: "avatar",
                        src: __props.profile.avatar_url,
                        proxy: unref(isCNUser),
                        defer: ""
                      }, null, 8, ["src", "proxy"]),
                      createVNode("span", { class: "logo" }, [
                        createVNode("i", { class: "iconfont icon-threads" })
                      ])
                    ]),
                    _: 1
                  }, 8, ["href", "title", "onMousedown"]),
                  createVNode("div", { class: "count" }, [
                    createVNode("p", { class: "title" }, [
                      createVNode(_component_i18n, {
                        en: "Latest",
                        zh: "近时"
                      })
                    ]),
                    createVNode("p", { class: "secondary" }, [
                      createVNode(_component_i18n, {
                        en: "threads",
                        zh: "一念"
                      })
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "posts" }, [
                  !__props.medias.length ? (openBlock(), createBlock(_component_empty, {
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
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.medias, (media, index) => {
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
                                class: "link",
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
                                  createVNode("span", { class: "new-window-icon" }, [
                                    createVNode("i", { class: "iconfont icon-new-window-s" })
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["href", "onMousedown"]),
                              createVNode("div", { class: "divider" }),
                              media.timestamp ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "date"
                              }, [
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
                    disabled: !__props.medias.length || activeIndex.value === 0,
                    onClick: prevSlide
                  }, [
                    createVNode("i", { class: "iconfont icon-totop" })
                  ], 8, ["disabled"]),
                  createVNode("button", {
                    class: "button next",
                    disabled: !__props.medias.length || activeIndex.value === __props.medias.length - 1,
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
const _sfc_setup$1_ = _sfc_main$1_.setup;
_sfc_main$1_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/threads.vue");
  return _sfc_setup$1_ ? _sfc_setup$1_(props, ctx) : void 0;
};
const Threads = /* @__PURE__ */ _export_sfc(_sfc_main$1_, [["__scopeId", "data-v-9a16164c"]]);
const _sfc_main$1Z = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { appOptions, isZhLang, i18n: _i18n } = useEnhancer();
    const articleListStore = useArticleListStore();
    const threadsProfileStore = useThreadsProfileStore();
    const threadsLatestMediasStore = useThreadsLatestMediasStore();
    const loadmoreArticles = async () => {
      await articleListStore.fetchNextPage();
      scrollToNextScreen();
    };
    usePageSeo(() => ({
      title: `${APP_PROFILE.title} - ${_i18n.t(LocalesKey.APP_SLOGAN)}`,
      description: isZhLang.value ? APP_PROFILE.description_zh : APP_PROFILE.description_en,
      keywords: appOptions.value?.keywords.join(",")
    }));
    useUniversalFetch(() => {
      return Promise.all([
        articleListStore.fetch(),
        threadsProfileStore.fetch().catch(() => {
        }),
        threadsLatestMediasStore.fetch().catch(() => {
        })
      ]);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index-page" }, _attrs))} data-v-8f20c3a6>`);
      _push(ssrRenderComponent(Carrousel, {
        class: "carrousel",
        articles: unref(articleListStore).data,
        fetching: unref(articleListStore).fetching
      }, null, _parent));
      _push(ssrRenderComponent(Threads, {
        class: "threads",
        profile: unref(threadsProfileStore).data,
        medias: unref(threadsLatestMediasStore).data?.data ?? [],
        fetching: unref(threadsLatestMediasStore).fetching || unref(threadsProfileStore).fetching || unref(articleListStore).fetching
      }, null, _parent));
      _push(ssrRenderComponent(ArticleListMain, {
        mammon: false,
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        fetching: unref(articleListStore).fetching,
        "has-more": unref(articleListStore).hasMore,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1Z = _sfc_main$1Z.setup;
_sfc_main$1Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/index/index.vue");
  return _sfc_setup$1Z ? _sfc_setup$1Z(props, ctx) : void 0;
};
const IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main$1Z, [["__scopeId", "data-v-8f20c3a6"]]);
const getExtrasMap = (kvs) => {
  return new Map((kvs ?? []).map((item) => [item.key, item.value]));
};
const _sfc_main$1Y = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  props: {
    iconName: {},
    backgroundColor: {},
    backgroundImage: {}
  },
  setup(__props) {
    const cdnDomain = useCdnDomain();
    const defaultImage = getAssetURL(cdnDomain, "/images/thumbnail/carrousel.jpg");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-list-header" }, _attrs))} data-v-f9d5259e><div class="background" style="${ssrRenderStyle({
        backgroundColor: __props.backgroundColor,
        backgroundImage: `url(${__props.backgroundImage ?? unref(defaultImage)})`
      })}" data-v-f9d5259e></div><div class="content" data-v-f9d5259e><div class="logo" data-v-f9d5259e><i class="${ssrRenderClass([__props.iconName, "iconfont"])}" data-v-f9d5259e></i></div><div class="title" data-v-f9d5259e>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1Y = _sfc_main$1Y.setup;
_sfc_main$1Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/listing/header.vue");
  return _sfc_setup$1Y ? _sfc_setup$1Y(props, ctx) : void 0;
};
const ArticleListHeader = /* @__PURE__ */ _export_sfc(_sfc_main$1Y, [["__scopeId", "data-v-f9d5259e"]]);
const _sfc_main$1X = /* @__PURE__ */ defineComponent({
  __name: "category",
  __ssrInlineRender: true,
  props: {
    categorySlug: {}
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain, isZhLang, i18n: _i18n } = useEnhancer();
    const articleListStore = useArticleListStore();
    const categoryStore = useCategoryStore();
    const category = computed(() => categoryStore.data.find(({ slug }) => slug === props.categorySlug));
    const categoryExtrasMap = computed(() => getExtrasMap(category.value?.extras));
    const categoryIconName = computed(() => categoryExtrasMap.value.get("icon-name") ?? "icon-category");
    const categoryBackgroundColor = computed(() => categoryExtrasMap.value.get("background-color"));
    const categoryBackgroundImage = computed(() => {
      const imageUrl = categoryExtrasMap.value.get("background-image");
      return imageUrl && isOriginalStaticURL(imageUrl) ? getStaticURL(cdnDomain, getStaticPath(imageUrl)) : imageUrl;
    });
    const loadmoreArticles = async () => {
      await articleListStore.fetchNextPage({ category_slug: props.categorySlug });
      scrollToNextScreen();
    };
    usePageSeo(() => {
      const enTitle = firstUpperCase(props.categorySlug);
      const zhTitle = _i18n.t(props.categorySlug);
      const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle];
      const description = category.value?.description || titles.join(",");
      return {
        pageTitles: titles,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "category-flow-page" }, _attrs))} data-v-74fa0412>`);
      _push(ssrRenderComponent(ArticleListHeader, {
        class: "page-header",
        "icon-name": categoryIconName.value,
        "background-color": categoryBackgroundColor.value,
        "background-image": categoryBackgroundImage.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (category.value) {
              _push2(ssrRenderComponent(_component_i18n, null, {
                zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-74fa0412${_scopeId2}>${ssrInterpolate(category.value.name)}</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-74fa0412${_scopeId2}>${ssrInterpolate(category.value.description || "...")}</span>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(category.value.name), 1),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, toDisplayString(category.value.description || "..."), 1)
                    ];
                  }
                }),
                en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-74fa0412${_scopeId2}>Category</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-74fa0412${_scopeId2}>${ssrInterpolate(unref(firstUpperCase)(category.value.slug))}</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Category"),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, toDisplayString(unref(firstUpperCase)(category.value.slug)), 1)
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
              category.value ? (openBlock(), createBlock(_component_i18n, { key: 0 }, {
                zh: withCtx(() => [
                  createVNode("span", null, toDisplayString(category.value.name), 1),
                  createVNode(_component_divider, {
                    class: "divider",
                    type: "vertical"
                  }),
                  createVNode("span", null, toDisplayString(category.value.description || "..."), 1)
                ]),
                en: withCtx(() => [
                  createVNode("span", null, "Category"),
                  createVNode(_component_divider, {
                    class: "divider",
                    type: "vertical"
                  }),
                  createVNode("span", null, toDisplayString(unref(firstUpperCase)(category.value.slug)), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleListMain, {
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        fetching: unref(articleListStore).fetching,
        "has-more": unref(articleListStore).hasMore,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1X = _sfc_main$1X.setup;
_sfc_main$1X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/category.vue");
  return _sfc_setup$1X ? _sfc_setup$1X(props, ctx) : void 0;
};
const CategoryListingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1X, [["__scopeId", "data-v-74fa0412"]]);
const _sfc_main$1W = /* @__PURE__ */ defineComponent({
  __name: "tag",
  __ssrInlineRender: true,
  props: {
    tagSlug: {}
  },
  setup(__props) {
    const props = __props;
    const tagStore = useTagStore();
    const articleListStore = useArticleListStore();
    const { cdnDomain, isZhLang } = useEnhancer();
    const tag = computed(() => tagStore.data.find(({ slug }) => slug === props.tagSlug));
    const tagIconName = computed(() => getTagIconName(tag.value?.extras));
    const tagExtrasMap = computed(() => getExtrasMap(tag.value?.extras));
    const tagBackgroundColor = computed(() => tagExtrasMap.value.get("background-color"));
    const tagBackgroundImage = computed(() => {
      const imageUrl = tagExtrasMap.value.get("background-image");
      return imageUrl && isOriginalStaticURL(imageUrl) ? getStaticURL(cdnDomain, getStaticPath(imageUrl)) : imageUrl;
    });
    const loadmoreArticles = async () => {
      await articleListStore.fetchNextPage({ tag_slug: props.tagSlug });
      scrollToNextScreen();
    };
    usePageSeo(() => {
      const _tag = tag.value;
      const zhTitle = _tag.name;
      const enTitle = getTagEnName(_tag);
      const titles = isZhLang.value ? [zhTitle, enTitle] : [enTitle, "Tag"];
      const description = _tag.description || titles.join(",");
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tag-flow-page" }, _attrs))} data-v-531620fb>`);
      _push(ssrRenderComponent(ArticleListHeader, {
        class: "page-header",
        "icon-name": tagIconName.value,
        "background-color": tagBackgroundColor.value,
        "background-image": tagBackgroundImage.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (tag.value) {
              _push2(`<span class="header" data-v-531620fb${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, null, {
                zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-531620fb${_scopeId2}>#${ssrInterpolate(tag.value.name)}</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-531620fb${_scopeId2}>${ssrInterpolate(tag.value.description || "...")}</span>`);
                  } else {
                    return [
                      createVNode("span", null, "#" + toDisplayString(tag.value.name), 1),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, toDisplayString(tag.value.description || "..."), 1)
                    ];
                  }
                }),
                en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-531620fb${_scopeId2}>Tag</span>`);
                    _push3(ssrRenderComponent(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span data-v-531620fb${_scopeId2}>#${ssrInterpolate(unref(getTagEnName)(tag.value))}</span>`);
                  } else {
                    return [
                      createVNode("span", null, "Tag"),
                      createVNode(_component_divider, {
                        class: "divider",
                        type: "vertical"
                      }),
                      createVNode("span", null, "#" + toDisplayString(unref(getTagEnName)(tag.value)), 1)
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
              tag.value ? (openBlock(), createBlock("span", {
                key: 0,
                class: "header"
              }, [
                createVNode(_component_i18n, null, {
                  zh: withCtx(() => [
                    createVNode("span", null, "#" + toDisplayString(tag.value.name), 1),
                    createVNode(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }),
                    createVNode("span", null, toDisplayString(tag.value.description || "..."), 1)
                  ]),
                  en: withCtx(() => [
                    createVNode("span", null, "Tag"),
                    createVNode(_component_divider, {
                      class: "divider",
                      type: "vertical"
                    }),
                    createVNode("span", null, "#" + toDisplayString(unref(getTagEnName)(tag.value)), 1)
                  ]),
                  _: 1
                })
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleListMain, {
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        fetching: unref(articleListStore).fetching,
        "has-more": unref(articleListStore).hasMore,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1W = _sfc_main$1W.setup;
_sfc_main$1W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/tag.vue");
  return _sfc_setup$1W ? _sfc_setup$1W(props, ctx) : void 0;
};
const TagListingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1W, [["__scopeId", "data-v-531620fb"]]);
const _sfc_main$1V = /* @__PURE__ */ defineComponent({
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
      await articleListStore.fetchNextPage({ keyword: props.keyword });
      scrollToNextScreen();
    };
    const pageDescription = computed(() => {
      return isZhLang.value ? `关键词 “${props.keyword}” 的搜索结果` : `Search results for "${props.keyword}"`;
    });
    usePageSeo(() => ({
      pageTitles: isZhLang.value ? [`“${props.keyword}”`, "搜索"] : [`"${props.keyword}"`, "Search"],
      description: pageDescription.value,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search-flow-page" }, _attrs))} data-v-a662e21b>`);
      _push(ssrRenderComponent(ArticleListHeader, {
        class: "page-header",
        "icon-name": "icon-search"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(pageDescription.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(pageDescription.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleListMain, {
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        fetching: unref(articleListStore).fetching,
        "has-more": unref(articleListStore).hasMore,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1V = _sfc_main$1V.setup;
_sfc_main$1V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/search.vue");
  return _sfc_setup$1V ? _sfc_setup$1V(props, ctx) : void 0;
};
const SearchListingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1V, [["__scopeId", "data-v-a662e21b"]]);
const _sfc_main$1U = /* @__PURE__ */ defineComponent({
  __name: "date",
  __ssrInlineRender: true,
  props: {
    date: {}
  },
  setup(__props) {
    const props = __props;
    const { isZhLang } = useEnhancer();
    const articleListStore = useArticleListStore();
    const loadmoreArticles = async () => {
      await articleListStore.fetchNextPage({ date: props.date });
      scrollToNextScreen();
    };
    const pageDescription = computed(() => {
      return isZhLang.value ? `发布于 ${props.date} 的文章` : `Articles from ${props.date}`;
    });
    usePageSeo(() => ({
      pageTitles: [props.date, isZhLang.value ? "日期" : "Date"],
      description: pageDescription.value,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "date-flow-page" }, _attrs))} data-v-bb329376>`);
      _push(ssrRenderComponent(ArticleListHeader, {
        class: "page-header",
        "icon-name": "icon-clock"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(pageDescription.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(pageDescription.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(ArticleListMain, {
        mammon: false,
        articles: unref(articleListStore).data,
        pagination: unref(articleListStore).pagination,
        fetching: unref(articleListStore).fetching,
        "has-more": unref(articleListStore).hasMore,
        onLoadmore: loadmoreArticles
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1U = _sfc_main$1U.setup;
_sfc_main$1U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/date.vue");
  return _sfc_setup$1U ? _sfc_setup$1U(props, ctx) : void 0;
};
const DateListingPage = /* @__PURE__ */ _export_sfc(_sfc_main$1U, [["__scopeId", "data-v-bb329376"]]);
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
const useNodepressStatisticsStore = defineStore("nodepressStatistics", () => {
  return createFetchStore({
    data: null,
    fetcher: async () => {
      const response = await nodepress$1.get("/system/statistics");
      return response.result;
    }
  });
});
const useGitHubStatisticsStore = defineStore("githubStatistics", () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.StatisticsGitHubJson)
  });
});
const useNpmStatisticsStore = defineStore("npmStatistics", () => {
  return createFetchStore({
    once: true,
    data: null,
    fetcher: () => tunnel$1.fetch(TunnelModule.StatisticsNpmJson)
  });
});
const monthNamesI18ns = [
  ["Jan", "一月"],
  ["Feb", "二月"],
  ["Mar", "三月"],
  ["Apr", "四月"],
  ["May", "五月"],
  ["Jun", "六月"],
  ["Jul", "七月"],
  ["Aug", "八月"],
  ["Sep", "九月"],
  ["Oct", "十月"],
  ["Nov", "十一"],
  ["Dec", "十二"]
];
const getMonthNameI18n = (number) => {
  const [en, zh] = monthNamesI18ns[number - 1];
  return { [Language.English]: en, [Language.Chinese]: zh };
};
const bannerI18ns = {
  title: {
    [Language.Chinese]: "出入平等，了了分明",
    [Language.English]: `Surmon's writing archive`
  },
  description: {
    [Language.Chinese]: "书字字之方便，开众善之法门",
    [Language.English]: "Either write something worth reading or do something worth writing"
  }
};
const useArchivePageMeta = () => {
  const { i18n, isZhLang } = useEnhancer();
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocalesKey.PAGE_ARCHIVE, Language.English));
    const titles = isZhLang.value ? [i18n.t(LocalesKey.PAGE_ARCHIVE), enTitle] : [enTitle];
    const description = `${APP_PROFILE.title} ${isZhLang.value ? "数据归档" : "archives"}`;
    return { pageTitles: titles, description };
  });
};
const useArchivePageStatistics = () => {
  const { i18n } = useEnhancer();
  const store = useNodepressStatisticsStore();
  const statistics = computed(() => ({
    tags: {
      icon: "icon-tag",
      label: i18n.t(LocalesKey.STATISTIC_TAGS),
      value: numberSplit(store.data?.tags || 0)
    },
    articles: {
      icon: "icon-quill",
      label: i18n.t(LocalesKey.STATISTIC_ARTICLES),
      value: numberSplit(store.data?.articles || 0)
    },
    comments: {
      icon: "icon-comment",
      label: i18n.t(LocalesKey.STATISTIC_COMMENTS),
      value: numberSplit(store.data?.comments || 0)
    },
    todayViews: {
      icon: "icon-eye",
      label: i18n.t(LocalesKey.STATISTIC_TODAY_VIEWS),
      value: numberSplit(store.data?.todayViews || 0)
    },
    totalViews: {
      icon: "icon-eye",
      label: i18n.t(LocalesKey.STATISTIC_TOTAL_VIEWS),
      value: numberToKilo(store.data?.totalViews || 0)
    },
    totalLikes: {
      icon: "icon-like",
      label: i18n.t(LocalesKey.STATISTIC_TOTAL_UPVOTES),
      value: numberSplit(store.data?.totalLikes || 0)
    },
    averageEmotion: {
      icon: "icon-emoji",
      label: i18n.t(LocalesKey.STATISTIC_AVERAGE_EMOTION),
      value: String(store.data?.averageEmotion ?? "-")
    }
  }));
  return {
    statistics,
    fetch: store.fetch
  };
};
const _sfc_main$1T = /* @__PURE__ */ defineComponent({
  __name: "page-banner",
  __ssrInlineRender: true,
  props: {
    backgroundImage: {},
    backgroundImageY: { default: 20 },
    backgroundVideo: {},
    backgroundVideoY: { default: 48 },
    blur: { default: 0 },
    cdn: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain } = useEnhancer();
    const backgroundVideoSource = computed(() => {
      return props.cdn && props.backgroundVideo ? getAssetURL(cdnDomain, props.backgroundVideo) : props.backgroundVideo;
    });
    const backgroundImage = computed(() => {
      return props.cdn && props.backgroundImage ? getAssetURL(cdnDomain, props.backgroundImage) : props.backgroundImage;
    });
    const backgroundImageStyle = computed(() => {
      if (!backgroundImage.value) return null;
      return {
        backgroundImage: `url(${backgroundImage.value})`,
        backgroundPositionY: `${props.backgroundImageY}%`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "desktop-page-banner" }, _attrs))} data-v-580014ee><div class="background" style="${ssrRenderStyle(backgroundImageStyle.value)}" data-v-580014ee>`);
      if (backgroundVideoSource.value) {
        _push(`<video class="video" loop muted autoplay${ssrIncludeBooleanAttr(false) ? " controls" : ""} style="${ssrRenderStyle({ objectPosition: `0% ${props.backgroundVideoY}%` })}"${ssrRenderAttr("src", backgroundVideoSource.value)} data-v-580014ee></video>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="${ssrRenderClass([{ blur: Boolean(__props.blur) }, "content"])}" style="${ssrRenderStyle({ "--blur": `${__props.blur}px` })}" data-v-580014ee><h2 class="title" data-v-580014ee>`);
      ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      _push(`</h2><div class="description" data-v-580014ee>`);
      ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1T = _sfc_main$1T.setup;
_sfc_main$1T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/page-banner.vue");
  return _sfc_setup$1T ? _sfc_setup$1T(props, ctx) : void 0;
};
const PageBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1T, [["__scopeId", "data-v-580014ee"]]);
const _sfc_main$1S = /* @__PURE__ */ defineComponent({
  __name: "tree",
  __ssrInlineRender: true,
  props: {
    tree: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-tree" }, _attrs))} data-v-911a56b3><!--[-->`);
      ssrRenderList(props.tree, (node) => {
        _push(`<ul class="month-list" data-v-911a56b3><!--[-->`);
        ssrRenderList(node.months, (mn) => {
          _push(`<li class="month" data-v-911a56b3>`);
          ssrRenderSlot(_ctx.$slots, "title", {
            count: mn.articles.length,
            year: node.year,
            month: mn.month
          }, null, _push, _parent);
          _push(`<div class="article-list" data-v-911a56b3><!--[-->`);
          ssrRenderList(mn.articles, (article, index) => {
            ssrRenderSlot(_ctx.$slots, "article", {
              index,
              article,
              day: String(article.createAt.day).padStart(2, "0"),
              key: index
            }, null, _push, _parent);
          });
          _push(`<!--]--></div></li>`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1S = _sfc_main$1S.setup;
_sfc_main$1S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/tree.vue");
  return _sfc_setup$1S ? _sfc_setup$1S(props, ctx) : void 0;
};
const ArchiveTree = /* @__PURE__ */ _export_sfc(_sfc_main$1S, [["__scopeId", "data-v-911a56b3"]]);
const _sfc_main$1R = /* @__PURE__ */ defineComponent({
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
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_empty = resolveComponent("empty");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-page" }, _attrs))} data-v-27efac45>`);
      _push(ssrRenderComponent(PageBanner, {
        "background-image": "/images/page-archive/banner.webp",
        "background-image-y": 34,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, unref(bannerI18ns).title, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, unref(bannerI18ns).title, null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, unref(bannerI18ns).title, null, 16)
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, unref(bannerI18ns).description, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, unref(bannerI18ns).description, null, 16)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="statistics-wrapper" data-v-27efac45><div class="container" data-v-27efac45>`);
      _push(ssrRenderComponent(_component_placeholder, { loading: statisticFetching.value }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="statistics-skeleton" data-v-27efac45${_scopeId}><!--[-->`);
            ssrRenderList(statistics.value.length, (s) => {
              _push2(ssrRenderComponent(_component_skeleton, {
                class: "item",
                key: s
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "statistics-skeleton" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(statistics.value.length, (s) => {
                  return openBlock(), createBlock(_component_skeleton, {
                    class: "item",
                    key: s
                  });
                }), 128))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="statistics-content" data-v-27efac45${_scopeId}><!--[-->`);
            ssrRenderList(statistics.value, (s, index) => {
              _push2(`<div class="item" data-v-27efac45${_scopeId}><i class="${ssrRenderClass([s.icon, "iconfont"])}" data-v-27efac45${_scopeId}></i><div class="content" data-v-27efac45${_scopeId}><p class="label" data-v-27efac45${_scopeId}>${ssrInterpolate(s.label)}</p><div class="value" data-v-27efac45${_scopeId}>${ssrInterpolate(s.value)}</div></div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "statistics-content" }, [
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
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="archive-wrapper" data-v-27efac45><div class="container" data-v-27efac45>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: unref(archiveStore).fetching,
        "has-data": !!unref(archiveStore).data?.articles.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "archive-empty",
              bold: "",
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "archive-empty",
                bold: "",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="archive-skeleton" data-v-27efac45${_scopeId}><!--[-->`);
            ssrRenderList(6, (i) => {
              _push2(`<li class="item" data-v-27efac45${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
              _push2(`<!--[-->`);
              ssrRenderList(3, (l) => {
                _push2(ssrRenderComponent(_component_skeleton, {
                  class: "line",
                  key: l
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "archive-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                  return createVNode("li", {
                    class: "item",
                    key: i
                  }, [
                    createVNode(_component_skeleton, { class: "title" }),
                    (openBlock(), createBlock(Fragment, null, renderList(3, (l) => {
                      return createVNode(_component_skeleton, {
                        class: "line",
                        key: l
                      });
                    }), 64))
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ArchiveTree, {
              class: "archive-content",
              tree: unref(archiveStore).tree
            }, {
              title: withCtx(({ year, month, count }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 class="archive-title" data-v-27efac45${_scopeId2}><span class="year" data-v-27efac45${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, {
                    en: String(year),
                    zh: unref(numberToChinese)(year)
                  }, null, _parent3, _scopeId2));
                  _push3(`</span><span class="month" data-v-27efac45${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, unref(getMonthNameI18n)(month), null, _parent3, _scopeId2));
                  _push3(`</span><span class="count" data-v-27efac45${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: `（${count}）`,
                    en: ` (${count})`
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></h1>`);
                } else {
                  return [
                    createVNode("h1", { class: "archive-title" }, [
                      createVNode("span", { class: "year" }, [
                        createVNode(_component_i18n, {
                          en: String(year),
                          zh: unref(numberToChinese)(year)
                        }, null, 8, ["en", "zh"])
                      ]),
                      createVNode("span", { class: "month" }, [
                        createVNode(_component_i18n, unref(getMonthNameI18n)(month), null, 16)
                      ]),
                      createVNode("span", { class: "count" }, [
                        createVNode(_component_i18n, {
                          zh: `（${count}）`,
                          en: ` (${count})`
                        }, null, 8, ["zh", "en"])
                      ])
                    ])
                  ];
                }
              }),
              article: withCtx(({ article, day }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="archive-article" data-v-27efac45${_scopeId2}><div class="left" data-v-27efac45${_scopeId2}><h3 class="title" data-v-27efac45${_scopeId2}><span class="date" data-v-27efac45${_scopeId2}>D${ssrInterpolate(day)}</span><a class="link" target="_blank"${ssrRenderAttr("title", article.title)}${ssrRenderAttr("href", unref(getArticleDetailRoute)(article.id))} data-v-27efac45${_scopeId2}>${ssrInterpolate(article.title)}</a></h3><p class="summary" data-v-27efac45${_scopeId2}>${article.summary ?? ""}</p></div><div class="metas" data-v-27efac45${_scopeId2}><div class="item views" data-v-27efac45${_scopeId2}><i class="iconfont icon-eye" data-v-27efac45${_scopeId2}></i><span class="text" data-v-27efac45${_scopeId2}>${ssrInterpolate(unref(numberSplit)(article.stats.views))}</span></div>`);
                  _push3(ssrRenderComponent(_component_divider, {
                    type: "vertical",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="item likes" data-v-27efac45${_scopeId2}><i class="like-icon iconfont icon-like" data-v-27efac45${_scopeId2}></i><span class="text" data-v-27efac45${_scopeId2}>${ssrInterpolate(article.stats.likes)}</span></div>`);
                  _push3(ssrRenderComponent(_component_divider, {
                    type: "vertical",
                    size: "sm"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="item comments" data-v-27efac45${_scopeId2}><i class="iconfont icon-comment" data-v-27efac45${_scopeId2}></i><span class="text" data-v-27efac45${_scopeId2}>${ssrInterpolate(article.stats.comments)}</span></div></div></div>`);
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
                          class: "summary",
                          innerHTML: article.summary
                        }, null, 8, ["innerHTML"])
                      ]),
                      createVNode("div", { class: "metas" }, [
                        createVNode("div", { class: "item views" }, [
                          createVNode("i", { class: "iconfont icon-eye" }),
                          createVNode("span", { class: "text" }, toDisplayString(unref(numberSplit)(article.stats.views)), 1)
                        ]),
                        createVNode(_component_divider, {
                          type: "vertical",
                          size: "sm"
                        }),
                        createVNode("div", { class: "item likes" }, [
                          createVNode("i", { class: "like-icon iconfont icon-like" }),
                          createVNode("span", { class: "text" }, toDisplayString(article.stats.likes), 1)
                        ]),
                        createVNode(_component_divider, {
                          type: "vertical",
                          size: "sm"
                        }),
                        createVNode("div", { class: "item comments" }, [
                          createVNode("i", { class: "iconfont icon-comment" }),
                          createVNode("span", { class: "text" }, toDisplayString(article.stats.comments), 1)
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(ArchiveTree, {
                class: "archive-content",
                tree: unref(archiveStore).tree
              }, {
                title: withCtx(({ year, month, count }) => [
                  createVNode("h1", { class: "archive-title" }, [
                    createVNode("span", { class: "year" }, [
                      createVNode(_component_i18n, {
                        en: String(year),
                        zh: unref(numberToChinese)(year)
                      }, null, 8, ["en", "zh"])
                    ]),
                    createVNode("span", { class: "month" }, [
                      createVNode(_component_i18n, unref(getMonthNameI18n)(month), null, 16)
                    ]),
                    createVNode("span", { class: "count" }, [
                      createVNode(_component_i18n, {
                        zh: `（${count}）`,
                        en: ` (${count})`
                      }, null, 8, ["zh", "en"])
                    ])
                  ])
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
                        class: "summary",
                        innerHTML: article.summary
                      }, null, 8, ["innerHTML"])
                    ]),
                    createVNode("div", { class: "metas" }, [
                      createVNode("div", { class: "item views" }, [
                        createVNode("i", { class: "iconfont icon-eye" }),
                        createVNode("span", { class: "text" }, toDisplayString(unref(numberSplit)(article.stats.views)), 1)
                      ]),
                      createVNode(_component_divider, {
                        type: "vertical",
                        size: "sm"
                      }),
                      createVNode("div", { class: "item likes" }, [
                        createVNode("i", { class: "like-icon iconfont icon-like" }),
                        createVNode("span", { class: "text" }, toDisplayString(article.stats.likes), 1)
                      ]),
                      createVNode(_component_divider, {
                        type: "vertical",
                        size: "sm"
                      }),
                      createVNode("div", { class: "item comments" }, [
                        createVNode("i", { class: "iconfont icon-comment" }),
                        createVNode("span", { class: "text" }, toDisplayString(article.stats.comments), 1)
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
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1R = _sfc_main$1R.setup;
_sfc_main$1R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/desktop.vue");
  return _sfc_setup$1R ? _sfc_setup$1R(props, ctx) : void 0;
};
const DesktopArchivePage = /* @__PURE__ */ _export_sfc(_sfc_main$1R, [["__scopeId", "data-v-27efac45"]]);
const _sfc_main$1Q = /* @__PURE__ */ defineComponent({
  __name: "page-banner",
  __ssrInlineRender: true,
  props: {
    backgroundImage: {},
    backgroundImageY: { default: 20 },
    cdn: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain } = useEnhancer();
    const backgroundImage = computed(() => {
      return props.cdn && props.backgroundImage ? getAssetURL(cdnDomain, props.backgroundImage) : props.backgroundImage;
    });
    const backgroundImageStyle = computed(() => {
      if (!backgroundImage.value) return null;
      return {
        backgroundImage: `url(${backgroundImage.value})`,
        backgroundPositionY: `${props.backgroundImageY}%`
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-page-banner" }, _attrs))} data-v-9d0e2bb5><div class="background" style="${ssrRenderStyle(backgroundImageStyle.value)}" data-v-9d0e2bb5></div><div class="content" data-v-9d0e2bb5><h2 class="title" data-v-9d0e2bb5>`);
      ssrRenderSlot(_ctx.$slots, "title", {}, null, _push, _parent);
      _push(`</h2><div class="description" data-v-9d0e2bb5>`);
      ssrRenderSlot(_ctx.$slots, "description", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1Q = _sfc_main$1Q.setup;
_sfc_main$1Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mobile/widgets/page-banner.vue");
  return _sfc_setup$1Q ? _sfc_setup$1Q(props, ctx) : void 0;
};
const MobileBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1Q, [["__scopeId", "data-v-9d0e2bb5"]]);
const _sfc_main$1P = /* @__PURE__ */ defineComponent({
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
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_divider = resolveComponent("divider");
      const _component_empty = resolveComponent("empty");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "archive-page" }, _attrs))} data-v-efac2822>`);
      _push(ssrRenderComponent(MobileBanner, {
        "background-image": "/images/page-archive/banner-mobile.webp",
        "background-image-y": 80,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, { bolder: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).PAGE_ARCHIVE
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_ARCHIVE
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, { bolder: "" }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).PAGE_ARCHIVE
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, unref(bannerI18ns).title, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, unref(bannerI18ns).title, null, 16)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, unref(bannerI18ns).title, null, 16)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="page-content" data-v-efac2822><div class="statistics-wrapper" data-v-efac2822><div class="container" data-v-efac2822>`);
      _push(ssrRenderComponent(_component_placeholder, { loading: statisticFetching.value }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="statistics-skeleton" data-v-efac2822${_scopeId}><!--[-->`);
            ssrRenderList(3, (s) => {
              _push2(ssrRenderComponent(_component_skeleton, {
                class: "item",
                key: s
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "statistics-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (s) => {
                  return createVNode(_component_skeleton, {
                    class: "item",
                    key: s
                  });
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="statistics-content" data-v-efac2822${_scopeId}><div class="item" data-v-efac2822${_scopeId}><p class="label" data-v-efac2822${_scopeId}>${ssrInterpolate(unref(statisticState).statistics.value.articles.label)}</p><div class="value" data-v-efac2822${_scopeId}>${ssrInterpolate(unref(statisticState).statistics.value.articles.value)}</div></div>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-efac2822${_scopeId}><p class="label" data-v-efac2822${_scopeId}>${ssrInterpolate(unref(statisticState).statistics.value.todayViews.label)}</p><div class="value" data-v-efac2822${_scopeId}>${ssrInterpolate(unref(statisticState).statistics.value.todayViews.value)}</div></div>`);
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-efac2822${_scopeId}><p class="label" data-v-efac2822${_scopeId}>${ssrInterpolate(unref(statisticState).statistics.value.comments.label)}</p><div class="value" data-v-efac2822${_scopeId}>${ssrInterpolate(unref(statisticState).statistics.value.comments.value)}</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "statistics-content" }, [
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
      }, _parent));
      _push(`</div></div><div class="archive-wrapper" data-v-efac2822><div class="container" data-v-efac2822>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: unref(archiveStore).fetching,
        "has-data": !!unref(archiveStore).data?.articles.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, { class: "archive-empty" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, { class: "archive-empty" }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="archive-skeleton" data-v-efac2822${_scopeId}><!--[-->`);
            ssrRenderList(3, (item) => {
              _push2(`<li class="item" data-v-efac2822${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
              _push2(`<!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(ssrRenderComponent(_component_skeleton, {
                  class: "line",
                  key: i
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "archive-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(3, (item) => {
                  return createVNode("li", {
                    class: "item",
                    key: item
                  }, [
                    createVNode(_component_skeleton, { class: "title" }),
                    (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                      return createVNode(_component_skeleton, {
                        class: "line",
                        key: i
                      });
                    }), 64))
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ArchiveTree, {
              class: "archive-content",
              tree: unref(archiveStore).tree
            }, {
              title: withCtx(({ year, month, count }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h3 class="archive-title" data-v-efac2822${_scopeId2}><span class="year" data-v-efac2822${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, {
                    en: String(year),
                    zh: unref(numberToChinese)(year)
                  }, null, _parent3, _scopeId2));
                  _push3(`</span><span class="month" data-v-efac2822${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, unref(getMonthNameI18n)(month), null, _parent3, _scopeId2));
                  _push3(`</span><span class="count" data-v-efac2822${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: `（${count}）`,
                    en: ` (${count})`
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></h3>`);
                } else {
                  return [
                    createVNode("h3", { class: "archive-title" }, [
                      createVNode("span", { class: "year" }, [
                        createVNode(_component_i18n, {
                          en: String(year),
                          zh: unref(numberToChinese)(year)
                        }, null, 8, ["en", "zh"])
                      ]),
                      createVNode("span", { class: "month" }, [
                        createVNode(_component_i18n, unref(getMonthNameI18n)(month), null, 16)
                      ]),
                      createVNode("span", { class: "count" }, [
                        createVNode(_component_i18n, {
                          zh: `（${count}）`,
                          en: ` (${count})`
                        }, null, 8, ["zh", "en"])
                      ])
                    ])
                  ];
                }
              }),
              article: withCtx(({ article, day }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="archive-article" data-v-efac2822${_scopeId2}><h4 class="title" data-v-efac2822${_scopeId2}><span class="date" data-v-efac2822${_scopeId2}>D${ssrInterpolate(day)}</span><a class="link" target="_blank"${ssrRenderAttr("title", article.title)}${ssrRenderAttr("href", unref(getArticleDetailRoute)(article.id))} data-v-efac2822${_scopeId2}>${ssrInterpolate(article.title)}</a></h4><p class="summary" data-v-efac2822${_scopeId2}>${article.summary ?? ""}</p></div>`);
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
                        class: "summary",
                        innerHTML: article.summary
                      }, null, 8, ["innerHTML"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(ArchiveTree, {
                class: "archive-content",
                tree: unref(archiveStore).tree
              }, {
                title: withCtx(({ year, month, count }) => [
                  createVNode("h3", { class: "archive-title" }, [
                    createVNode("span", { class: "year" }, [
                      createVNode(_component_i18n, {
                        en: String(year),
                        zh: unref(numberToChinese)(year)
                      }, null, 8, ["en", "zh"])
                    ]),
                    createVNode("span", { class: "month" }, [
                      createVNode(_component_i18n, unref(getMonthNameI18n)(month), null, 16)
                    ]),
                    createVNode("span", { class: "count" }, [
                      createVNode(_component_i18n, {
                        zh: `（${count}）`,
                        en: ` (${count})`
                      }, null, 8, ["zh", "en"])
                    ])
                  ])
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
                      class: "summary",
                      innerHTML: article.summary
                    }, null, 8, ["innerHTML"])
                  ])
                ]),
                _: 1
              }, 8, ["tree"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1P = _sfc_main$1P.setup;
_sfc_main$1P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/archive/mobile.vue");
  return _sfc_setup$1P ? _sfc_setup$1P(props, ctx) : void 0;
};
const MobileArchivePage = /* @__PURE__ */ _export_sfc(_sfc_main$1P, [["__scopeId", "data-v-efac2822"]]);
const COMMENT_API_PATH = "/comments";
const useCommentStore = defineStore("comment", () => {
  const fetching = ref(false);
  const posting = ref(false);
  const deleting = ref(false);
  const comments = ref([]);
  const pagination = ref(null);
  const hasMore = computed(() => {
    return pagination.value ? pagination.value.current_page < pagination.value.total_page : false;
  });
  const commentMap = computed(() => {
    return new Map(comments.value.map((c) => [c.id, c]));
  });
  const commentTreeList = computed(() => {
    const map = commentMap.value;
    const nodeMap = /* @__PURE__ */ new Map();
    const rootIdMap = /* @__PURE__ */ new Map();
    const roots = [];
    for (const comment of map.values()) {
      nodeMap.set(comment.id, { comment, children: [] });
    }
    const findRootId = (id) => {
      if (rootIdMap.has(id)) return rootIdMap.get(id);
      const comment = map.get(id);
      if (!comment?.parent_id || !map.has(comment.parent_id)) {
        rootIdMap.set(id, id);
        return id;
      }
      const rootId = findRootId(comment.parent_id);
      rootIdMap.set(id, rootId);
      return rootId;
    };
    for (const node of nodeMap.values()) {
      const id = node.comment.id;
      const rootId = findRootId(id);
      if (rootId === id) {
        roots.push(node);
      } else {
        nodeMap.get(rootId).children.push(node);
      }
    }
    for (const root of roots) {
      root.children.sort(
        (a, b) => new Date(a.comment.created_at).getTime() - new Date(b.comment.created_at).getTime()
      );
    }
    return roots;
  });
  const clearList = () => {
    comments.value = [];
    pagination.value = null;
  };
  const _fetchList = async (params) => {
    const fetchParams = { per_page: 50, sort: SortMode.Latest, ...params };
    fetching.value = true;
    try {
      const request2 = nodepress$1.get(COMMENT_API_PATH, {
        params: fetchParams
      });
      const response = await (isClient ? delayPromise(480, request2) : request2);
      pagination.value = response.result.pagination;
      comments.value.push(...response.result.data);
    } finally {
      fetching.value = false;
    }
  };
  const fetchList = async (params) => {
    clearList();
    return _fetchList({ ...params, page: 1 });
  };
  const fetchListNextPage = (params) => {
    if (!pagination.value) {
      const message = "No pagination data available.";
      console.warn(`[CommentStore] fetchMore: ${message} Please call fetch() first.`);
      return Promise.reject(message);
    }
    if (!hasMore.value) {
      const message = "No more data to load.";
      console.warn(`[CommentStore] fetchMore: ${message}`);
      return Promise.reject(message);
    }
    return _fetchList({ ...params, page: pagination.value.current_page + 1 });
  };
  const postComment = async (comment) => {
    const identityStore = useIdentityStore();
    try {
      posting.value = true;
      const response = await nodepress$1.post("/comments", comment, {
        token: identityStore.token
      });
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
    const identityStore = useIdentityStore();
    try {
      deleting.value = true;
      await nodepress$1.delete(`/account/comments/${commentId}`, { token: identityStore.token });
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
    await nodepress$1.post(
      `/votes/comment`,
      {
        comment_id: commentId,
        vote,
        author_name: identityStore.profile?.name,
        author_email: identityStore.profile?.email
      },
      { token: identityStore.token }
    );
    const comment = commentMap.value.get(commentId);
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
    hasMore,
    commentMap,
    commentTreeList,
    clearList,
    fetchList,
    fetchListNextPage,
    postComment,
    deleteComment,
    postCommentVote
  };
});
const HEADER_ELEMENT_ID = "A_header";
const FOOTER_ELEMENT_ID = "A_footer";
const CONTAINER_ELEMENT_ID = "A_container";
const NAV_ELEMENT_ID = "A_nav";
const SIDEBAR_ELEMENT_ID = "A_sidebar";
const MAIN_CONTENT_ELEMENT_ID = "A_main";
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
const getCommentItemElementId = (commentId) => {
  return `A_comment_content_item_${commentId}`;
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
  const observer = _lozad(target, { loaded: (element) => element.classList.add(LOADED_CLASS_NAME) });
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
const divChildCount = 4;
const rootClassName = "global-loading-indicator";
const getGapClassName = (key) => `gap-${key}`;
const getRadiusClassName = (key) => `radius-${key}`;
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
    default: "default"
  },
  radius: {
    type: String,
    default: "tiny"
  }
};
const LoadingIndicator = defineComponent({
  name: "LoadingIndicator",
  props: LoadingIndicatorProps,
  setup(props) {
    return () => {
      const style = {
        "--indicator-width": props.width,
        "--indicator-height": props.height
      };
      return h(
        "div",
        { class: [rootClassName, getGapClassName(props.gap), getRadiusClassName(props.radius)], style },
        Array.from({ length: divChildCount }).map(() => h("div"))
      );
    };
  }
});
const getLoadingIndicatorHTML = (options = {}) => {
  const classNames = [
    options.class,
    rootClassName,
    getGapClassName(options.gap ?? LoadingIndicatorProps.gap.default),
    getRadiusClassName(options.radius ?? LoadingIndicatorProps.radius.default)
  ];
  const styles = {
    "--indicator-width": options.width || LoadingIndicatorProps.width.default,
    "--indicator-height": options.height || LoadingIndicatorProps.height.default
  };
  return `
    <div class="${classNames.filter(Boolean).join(" ")}" style="${Object.entries(styles).map(([k, v]) => `${k}: ${v}`).join(";")}">
    ${Array.from({ length: divChildCount }).map(() => "<div></div>").join("")}
    </div>
  `;
};
const markdownCodeLanguageNamesMap = /* @__PURE__ */ new Map([
  ["js", "JavaScript"],
  ["javascript", "JavaScript"],
  ["ts", "TypeScript"],
  ["typescript", "TypeScript"],
  ["html", "HTML"],
  ["css", "CSS"]
]);
const marked = new Marked(
  mangle(),
  markedXhtml(),
  markedHighlight({
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
  renderer.heading = ({ depth, tokens, text }) => {
    const getAnchorWithLink = (anchor) => {
      const preventDefault = `event.preventDefault()`;
      const copy = `window.navigator.clipboard?.writeText(this.href)`;
      const onclick = `onclick="${preventDefault};${copy}"`;
      const href = `href="#${anchor}"`;
      return `<a class="anchor link" ${href} ${onclick}>#</a>`;
    };
    const html = renderer.parser.parseInline(tokens);
    const identifier = options?.headingIdentifierGetter?.(depth, text);
    const idAttr = identifier?.id ? `id="${identifier.id}"` : "";
    const titleAttr = `title="${escape(text)}"`;
    const anchorElement = identifier?.anchor ? getAnchorWithLink(identifier.anchor) : `<span class="anchor static">#</span>`;
    return `<h${depth} ${idAttr} ${titleAttr}>${anchorElement}${html}</h${depth}>`;
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
  renderer.link = ({ href, title, tokens, text: _text }) => {
    const text = renderer.parser.parseInline(tokens);
    const isCodeLink = text.includes("<code>");
    const isImageLink = text.includes("<img");
    const isSelf = href.startsWith(APP_PROFILE.url);
    const textValue = options?.sanitize ? escape(text) : text;
    const hrefValue = options?.sanitize ? sanitizeUrl(href) : href;
    const titleValue = options?.sanitize ? escape(title) : title;
    return sanitizeHTML(
      trimHTML(`
        <a
          href="${hrefValue}"
          target="_blank"
          class="${isImageLink ? "image-link" : isCodeLink ? "code-link" : "link"}"
          title="${titleValue || (isImageLink ? hrefValue : escape(_text))}"
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
      width: "1.8rem",
      height: "1rem"
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
              onclick="window.$popup?.image(this.currentSrc || this.src)"
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
    const getLineNumbersElement = () => {
      return `<ul class="code-lines">${code.split("\n").map((_, i) => `<li class="code-line-number">${i + 1}</li>`.replace(/\s+/g, " ")).join("")}</ul>`;
    };
    return `
      <pre ${langString ? `data-lang="${langString}"` : ""}>
        <div class="language-header">
          <span class="name">
            <i class="iconfont icon-code"></i>
            <span class="text">${langString ? markdownCodeLanguageNamesMap.get(langString.toLowerCase()) ?? langString : "code"}</span>
          </span>
          <button class="copy" title="Copy code" onclick="navigator.clipboard.writeText(this.parentElement.parentElement.querySelector('code').innerText)">
            <i class="iconfont icon-copy"></i>
          </button>
        </div>
        <div class="code-wrapper">
          ${options?.codeLineNumbers ? getLineNumbersElement() : ""}
          <code>${escaped ? code : escape(code)}</code>
        </div>
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
const ARTICLE_API_PATH = "/articles";
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
    const response = await nodepress$1.get(`${ARTICLE_API_PATH}/${articleId}`);
    article.value = response.result;
    renderedFullContent.value = !isLongContent.value;
  };
  const fetchArticleContext = async (articleId) => {
    prevArticle.value = null;
    nextArticle.value = null;
    relatedArticles.value = [];
    const response = await nodepress$1.get(`${ARTICLE_API_PATH}/${articleId}/context`, {
      params: { related_count: 6 }
    });
    prevArticle.value = response.result.prev_article;
    nextArticle.value = response.result.next_article;
    relatedArticles.value = response.result.related_articles;
  };
  const fetchCompleteArticle = async (articleId) => {
    fetching.value = true;
    const request2 = Promise.all([fetchArticleDetail(articleId), fetchArticleContext(articleId)]);
    await request2;
    fetching.value = false;
  };
  const postArticleLike = (articleId) => {
    const identityStore = useIdentityStore();
    return nodepress$1.post(
      "/votes/article",
      {
        article_id: articleId,
        vote: 1,
        author_name: identityStore.profile?.name,
        author_email: identityStore.profile?.email
      },
      { token: identityStore.token }
    ).then((response) => {
      if (article.value) {
        article.value.stats.likes = response.result;
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
var CommentTargetType = /* @__PURE__ */ ((CommentTargetType2) => {
  CommentTargetType2["Article"] = "article";
  CommentTargetType2["Page"] = "page";
  return CommentTargetType2;
})(CommentTargetType || {});
var CommentAuthorStatus = /* @__PURE__ */ ((CommentAuthorStatus2) => {
  CommentAuthorStatus2["Guest"] = "guest";
  CommentAuthorStatus2["Active"] = "active";
  CommentAuthorStatus2["Ghost"] = "ghost";
  return CommentAuthorStatus2;
})(CommentAuthorStatus || {});
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
const _sfc_main$1O = /* @__PURE__ */ defineComponent({
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
            window.$popup?.image(dataURL, { "data-radius": "md" });
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "share" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-7c5b6356><!--[-->`);
      ssrRenderList(enabledSocials.value, (social, index) => {
        _push(`<button${ssrRenderAttr("title", "Share to: " + social.name)} class="${ssrRenderClass([social.class, "share-ejector"])}" data-v-7c5b6356><i class="${ssrRenderClass([`icon-${social.iconfont ?? social.class}`, "iconfont"])}" data-v-7c5b6356></i></button>`);
      });
      _push(`<!--]-->`);
      if (!props.disabledImageShare) {
        _push(`<button class="share-ejector share-as-image" title="Share as image" data-v-7c5b6356><i class="iconfont icon-image-share" data-v-7c5b6356></i></button>`);
      } else {
        _push(`<!---->`);
      }
      if (!props.disabledCopyLink) {
        _push(`<button class="share-ejector copy-link" title="Copy link" data-v-7c5b6356><i class="iconfont icon-link" data-v-7c5b6356></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1O = _sfc_main$1O.setup;
_sfc_main$1O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/share.vue");
  return _sfc_setup$1O ? _sfc_setup$1O(props, ctx) : void 0;
};
const Share = /* @__PURE__ */ _export_sfc(_sfc_main$1O, [["__scopeId", "data-v-7c5b6356"]]);
const _sfc_main$1N = /* @__PURE__ */ defineComponent({
  __name: "wrapper",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean },
    plain: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton = resolveComponent("skeleton");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({ loading: __props.loading }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="topbar-skeleton" data-v-c0cc0483${_scopeId}><div class="left" data-v-c0cc0483${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton, { class: "item count" }, null, _parent2, _scopeId));
            if (!__props.plain) {
              _push2(ssrRenderComponent(_component_skeleton, { class: "item sort" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="right" data-v-c0cc0483${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton, { class: "item user" }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "topbar-skeleton" }, [
                createVNode("div", { class: "left" }, [
                  createVNode(_component_skeleton, { class: "item count" }),
                  !__props.plain ? (openBlock(), createBlock(_component_skeleton, {
                    key: 0,
                    class: "item sort"
                  })) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "right" }, [
                  createVNode(_component_skeleton, { class: "item user" })
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass([{ plain: __props.plain }, "topbar-container"])}" data-v-c0cc0483${_scopeId}><div class="left" data-v-c0cc0483${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "count", {}, null, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "sort", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div><div class="right" data-v-c0cc0483${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "user", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: ["topbar-container", { plain: __props.plain }]
              }, [
                createVNode("div", { class: "left" }, [
                  renderSlot(_ctx.$slots, "count", {}, void 0, true),
                  renderSlot(_ctx.$slots, "sort", {}, void 0, true)
                ]),
                createVNode("div", { class: "right" }, [
                  renderSlot(_ctx.$slots, "user", {}, void 0, true)
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
const _sfc_setup$1N = _sfc_main$1N.setup;
_sfc_main$1N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/topbar/wrapper.vue");
  return _sfc_setup$1N ? _sfc_setup$1N(props, ctx) : void 0;
};
const CommentTopbarWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$1N, [["__scopeId", "data-v-c0cc0483"]]);
const _sfc_main$1M = /* @__PURE__ */ defineComponent({
  __name: "count",
  __ssrInlineRender: true,
  props: {
    total: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-count" }, _attrs))} data-v-758fda92><i class="iconfont icon-discussion" data-v-758fda92></i>`);
      _push(ssrRenderComponent(_component_i18n, null, {
        zh: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`共<span class="total" data-v-758fda92${_scopeId}>${ssrInterpolate(__props.total)}</span>条评论`);
          } else {
            return [
              createTextVNode("共"),
              createVNode("span", {
                class: "total",
                key: "zh"
              }, toDisplayString(__props.total), 1),
              createTextVNode("条评论")
            ];
          }
        }),
        en: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="total en" data-v-758fda92${_scopeId}>${ssrInterpolate(__props.total)}</span>comments`);
          } else {
            return [
              createVNode("span", {
                class: "total en",
                key: "en"
              }, toDisplayString(__props.total), 1),
              createTextVNode("comments")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1M = _sfc_main$1M.setup;
_sfc_main$1M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/topbar/count.vue");
  return _sfc_setup$1M ? _sfc_setup$1M(props, ctx) : void 0;
};
const CommentTopbarCount = /* @__PURE__ */ _export_sfc(_sfc_main$1M, [["__scopeId", "data-v-758fda92"]]);
const _sfc_main$1L = /* @__PURE__ */ defineComponent({
  __name: "sort",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const sort = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "comment-sort" }, _attrs))} data-v-5de7b826><span class="icon" data-v-5de7b826>▼</span><select class="select" name="sort" data-v-5de7b826><option${ssrRenderAttr("value", unref(SortMode).Latest)} data-v-5de7b826${ssrIncludeBooleanAttr(Array.isArray(sort.value) ? ssrLooseContain(sort.value, unref(SortMode).Latest) : ssrLooseEqual(sort.value, unref(SortMode).Latest)) ? " selected" : ""}>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).COMMENT_SORT_NEW
      }, null, _parent));
      _push(`</option><option${ssrRenderAttr("value", unref(SortMode).Hottest)} data-v-5de7b826${ssrIncludeBooleanAttr(Array.isArray(sort.value) ? ssrLooseContain(sort.value, unref(SortMode).Hottest) : ssrLooseEqual(sort.value, unref(SortMode).Hottest)) ? " selected" : ""}>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).COMMENT_SORT_HOT
      }, null, _parent));
      _push(`</option><option${ssrRenderAttr("value", unref(SortMode).Oldest)} data-v-5de7b826${ssrIncludeBooleanAttr(Array.isArray(sort.value) ? ssrLooseContain(sort.value, unref(SortMode).Oldest) : ssrLooseEqual(sort.value, unref(SortMode).Oldest)) ? " selected" : ""}>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).COMMENT_SORT_OLD
      }, null, _parent));
      _push(`</option></select></label>`);
    };
  }
});
const _sfc_setup$1L = _sfc_main$1L.setup;
_sfc_main$1L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/topbar/sort.vue");
  return _sfc_setup$1L ? _sfc_setup$1L(props, ctx) : void 0;
};
const CommentTopbarSort = /* @__PURE__ */ _export_sfc(_sfc_main$1L, [["__scopeId", "data-v-5de7b826"]]);
const _sfc_main$1K = /* @__PURE__ */ defineComponent({
  __name: "user",
  __ssrInlineRender: true,
  setup(__props) {
    const { identity, theme } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-user" }, _attrs))} data-v-55c5e381>`);
      if (unref(identity).isAnonymous) {
        _push(`<div class="unlogin" data-v-55c5e381><button class="link" title="Sign in with Google" data-v-55c5e381>`);
        _push(ssrRenderComponent(_component_uimage, {
          class: "logo google",
          alt: "Google",
          src: "/images/third-party/google-g-icon.svg"
        }, null, _parent));
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).USER_SIGN_IN
        }, null, _parent));
        _push(`</button>`);
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(`<button class="link" title="Sign in with GitHub" data-v-55c5e381>`);
        _push(ssrRenderComponent(_component_uimage, {
          class: "logo github",
          alt: "GitHub",
          src: `/images/third-party/github-icon-${unref(theme).isDark.value ? "white" : "black"}.svg`
        }, null, _parent));
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).USER_SIGN_IN
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<div class="logined" data-v-55c5e381><div class="username" data-v-55c5e381><i class="icon iconfont icon-user" data-v-55c5e381></i><span class="text" data-v-55c5e381>${ssrInterpolate(unref(identity).profile?.name)}</span><i class="arrow iconfont icon-down-arrow" data-v-55c5e381></i></div><div class="user-menu" data-v-55c5e381>`);
        if (unref(identity).isGuest) {
          _push(`<ul class="menus" data-v-55c5e381><li class="item" data-v-55c5e381><button class="button" title="Sign in with GitHub" data-v-55c5e381>`);
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`切换为 <i class="iconfont icon-github" data-v-55c5e381${_scopeId}></i> <strong data-v-55c5e381${_scopeId}>GitHub</strong> 登录`);
              } else {
                return [
                  createTextVNode("切换为 "),
                  createVNode("i", { class: "iconfont icon-github" }),
                  createTextVNode(),
                  createVNode("strong", null, "GitHub"),
                  createTextVNode(" 登录")
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Sign in with <i class="iconfont icon-github" data-v-55c5e381${_scopeId}></i> <strong data-v-55c5e381${_scopeId}>GitHub</strong>`);
              } else {
                return [
                  createTextVNode("Sign in with "),
                  createVNode("i", { class: "iconfont icon-github" }),
                  createTextVNode(),
                  createVNode("strong", null, "GitHub")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</button><button class="button" title="Sign in with Google" data-v-55c5e381>`);
          _push(ssrRenderComponent(_component_i18n, null, {
            zh: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`切换为 <i class="iconfont icon-google" data-v-55c5e381${_scopeId}></i> <strong data-v-55c5e381${_scopeId}>Google</strong> 登录`);
              } else {
                return [
                  createTextVNode("切换为 "),
                  createVNode("i", { class: "iconfont icon-google" }),
                  createTextVNode(),
                  createVNode("strong", null, "Google"),
                  createTextVNode(" 登录")
                ];
              }
            }),
            en: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Sign in with <i class="iconfont icon-google" data-v-55c5e381${_scopeId}></i> <strong data-v-55c5e381${_scopeId}>Google</strong>`);
              } else {
                return [
                  createTextVNode("Sign in with "),
                  createVNode("i", { class: "iconfont icon-google" }),
                  createTextVNode(),
                  createVNode("strong", null, "Google")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</button></li><li class="item" data-v-55c5e381><button class="button" title="Clean local profile" data-v-55c5e381>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: "退出本地访客身份",
            en: "Clean local profile"
          }, null, _parent));
          _push(`</button></li></ul>`);
        } else if (unref(identity).isUser) {
          _push(`<ul class="menus" data-v-55c5e381><li class="item" data-v-55c5e381><button class="button" title="Edit profile" data-v-55c5e381>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: "管理资料",
            en: "Edit profile"
          }, null, _parent));
          _push(`</button></li><li class="item" data-v-55c5e381><button class="button" title="Sign Out" data-v-55c5e381>`);
          _push(ssrRenderComponent(_component_i18n, {
            k: unref(LocalesKey).USER_SIGN_OUT
          }, null, _parent));
          _push(`</button></li></ul>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1K = _sfc_main$1K.setup;
_sfc_main$1K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/topbar/user.vue");
  return _sfc_setup$1K ? _sfc_setup$1K(props, ctx) : void 0;
};
const CommentTopbarUser = /* @__PURE__ */ _export_sfc(_sfc_main$1K, [["__scopeId", "data-v-55c5e381"]]);
const _sfc_main$1J = /* @__PURE__ */ defineComponent({
  __name: "wrapper",
  __ssrInlineRender: true,
  props: {
    loading: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton = resolveComponent("skeleton");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({ loading: __props.loading }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="composer-skeleton" data-v-30961a11${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton, { class: "avatar" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_skeleton, { class: "content" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "composer-skeleton",
                key: "skeleton"
              }, [
                createVNode(_component_skeleton, { class: "avatar" }),
                createVNode(_component_skeleton, { class: "content" })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="composer-container" data-v-30961a11${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "composer-container",
                key: "container"
              }, [
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1J = _sfc_main$1J.setup;
_sfc_main$1J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/composer/wrapper.vue");
  return _sfc_setup$1J ? _sfc_setup$1J(props, ctx) : void 0;
};
const CommentComposerWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$1J, [["__scopeId", "data-v-30961a11"]]);
const getDisqusAvatarByUsername = (username) => {
  return `https://disqus.com/api/users/avatars/${username}.jpg`;
};
const getGravatarByHash = (hash) => {
  return `https://www.gravatar.com/avatar/${hash}`;
};
const getGravatarByEmail = async (email) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.trim().toLowerCase());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hash = Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return getGravatarByHash(hash);
};
const _sfc_main$1I = /* @__PURE__ */ defineComponent({
  __name: "markdown",
  __ssrInlineRender: true,
  props: {
    html: {},
    markdown: {},
    compact: { type: Boolean },
    renderOptions: {}
  },
  setup(__props) {
    const props = __props;
    const { element } = useLozad();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "element",
        ref: element,
        class: ["global-markdown-html", { compact: __props.compact }]
      }, _attrs))}>${(props.markdown ? unref(markdownToHTML)(props.markdown, props.renderOptions) : props.html || "") ?? ""}</section>`);
    };
  }
});
const _sfc_setup$1I = _sfc_main$1I.setup;
_sfc_main$1I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/markdown.vue");
  return _sfc_setup$1I ? _sfc_setup$1I(props, ctx) : void 0;
};
const _sfc_main$1H = /* @__PURE__ */ defineComponent({
  __name: "markdown",
  __ssrInlineRender: true,
  props: {
    content: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1I, mergeProps({
        class: "comment-markdown",
        markdown: __props.content,
        compact: true,
        "render-options": { sanitize: true, codeLineNumbers: false }
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1H = _sfc_main$1H.setup;
_sfc_main$1H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/markdown.vue");
  return _sfc_setup$1H ? _sfc_setup$1H(props, ctx) : void 0;
};
const CommentMarkdown = /* @__PURE__ */ _export_sfc(_sfc_main$1H, [["__scopeId", "data-v-8bc298be"]]);
const _sfc_main$1G = /* @__PURE__ */ defineComponent({
  __name: "emoji",
  __ssrInlineRender: true,
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const EMOJI_PAGES = [
      ["😃", "😂", "😅", "😉", "😌", "😔", "😓", "😢", "😍", "😘", "😜", "😡", "😤"],
      ["😭", "😱", "😳", "😵", "🌚", "🙏", "💪", "👌", "🤘", "👍", "👎", "👏", "🌻"],
      ["🌹", "💊", "🐶", "🐈", "✨", "❤️‍🔥", "💔", "💩", "👻", "🚩", "💡", "🛵", "🪙"]
    ];
    const TOTAL_PAGES = EMOJI_PAGES.length;
    shallowRef();
    const currentPage = shallowRef(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "editor-emoji-box" }, _attrs))} data-v-5d91b371><button class="navigate"${ssrIncludeBooleanAttr(currentPage.value === 0) ? " disabled" : ""} data-v-5d91b371><i class="iconfont icon-prev" data-v-5d91b371></i></button><div class="emoji-container" data-v-5d91b371><!--[-->`);
      ssrRenderList(EMOJI_PAGES, (page, pageIndex) => {
        _push(`<ul class="emoji-page" data-v-5d91b371><!--[-->`);
        ssrRenderList(page, (emoji) => {
          _push(`<li class="item" data-v-5d91b371>${ssrInterpolate(emoji)}</li>`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--></div><button class="navigate"${ssrIncludeBooleanAttr(currentPage.value === unref(TOTAL_PAGES) - 1) ? " disabled" : ""} data-v-5d91b371><i class="iconfont icon-next" data-v-5d91b371></i></button></div>`);
    };
  }
});
const _sfc_setup$1G = _sfc_main$1G.setup;
_sfc_main$1G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/composer/emoji.vue");
  return _sfc_setup$1G ? _sfc_setup$1G(props, ctx) : void 0;
};
const EditorEmojiBox = /* @__PURE__ */ _export_sfc(_sfc_main$1G, [["__scopeId", "data-v-5d91b371"]]);
const _sfc_main$1F = /* @__PURE__ */ defineComponent({
  __name: "editor",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    disabled: { type: Boolean },
    bordered: { type: Boolean },
    autoFocus: { type: Boolean },
    hiddenTools: { type: Boolean }
  }, {
    "modelValue": {
      default: ""
    },
    "modelModifiers": {},
    "preview": { type: Boolean, ...{
      default: false
    } },
    "previewModifiers": {}
  }),
  emits: ["update:modelValue", "update:preview"],
  setup(__props) {
    const content = useModel(__props, "modelValue");
    const preview = useModel(__props, "preview");
    const props = __props;
    const { i18n: _i18n } = useEnhancer();
    const textareaRef = shallowRef();
    const insertToContent = (before, after = "", singleCursorOffset = 0) => {
      const textarea = textareaRef.value;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const selected = value.slice(start, end);
      let nextValue;
      let nextCursorStart;
      let nextCursorEnd;
      if (start === end) {
        const newCursorPosition = start + before.length + after.length + singleCursorOffset;
        nextValue = value.slice(0, start) + before + after + value.slice(end);
        nextCursorStart = newCursorPosition;
        nextCursorEnd = newCursorPosition;
      } else if (after) {
        nextValue = value.slice(0, start) + before + selected + after + value.slice(end);
        nextCursorStart = start;
        nextCursorEnd = start + before.length + selected.length + after.length;
      } else {
        nextValue = value.slice(0, start) + before + value.slice(end);
        nextCursorStart = start;
        nextCursorEnd = start + before.length;
      }
      content.value = nextValue;
      nextTick(() => {
        textarea.focus();
        textarea.setSelectionRange(nextCursorStart, nextCursorEnd);
      });
    };
    const tools = [
      {
        id: "image",
        icon: "icon-image",
        execute: () => insertToContent(` ![`, `](https://) `, -2)
      },
      {
        id: "link",
        icon: "icon-link",
        execute: () => insertToContent(` [`, `](https://) `, -2)
      },
      {
        id: "code",
        icon: "icon-code",
        execute: () => insertToContent("\n```javascript\n", "\n```", -4)
      }
    ];
    onMounted(() => {
      if (props.autoFocus) {
        textareaRef.value?.focus();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["composer-editor", { bordered: __props.bordered }]
      }, _attrs))} data-v-1147ad38><div class="editor" data-v-1147ad38><div class="input-wrapper"${ssrRenderAttr("data-replicated-value", content.value)} data-v-1147ad38><textarea class="editor-input" required${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrIncludeBooleanAttr(props.autoFocus) ? " autofocus" : ""}${ssrRenderAttr("minlength", unref(APP_CONFIG).comment_content_min_length)}${ssrRenderAttr("maxlength", unref(APP_CONFIG).comment_content_max_length)}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_POST_PLACEHOLDER))} data-v-1147ad38>${ssrInterpolate(content.value)}</textarea></div>`);
      if (preview.value) {
        _push(`<div class="preview-content" data-v-1147ad38>`);
        _push(ssrRenderComponent(CommentMarkdown, { content: content.value }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="toolbar" data-v-1147ad38><div class="left" data-v-1147ad38>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "markdown",
        title: "markdown",
        href: unref(RESOURCE_LINKS).MARKDOWN_DOC
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-markdown" data-v-1147ad38${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-markdown" })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (!__props.hiddenTools) {
        _push(`<!--[--><button class="emoji" title="emoji" type="button"${ssrIncludeBooleanAttr(__props.disabled || preview.value) ? " disabled" : ""} data-v-1147ad38><i class="iconfont icon-emoji" data-v-1147ad38></i>`);
        _push(ssrRenderComponent(EditorEmojiBox, {
          class: "emoji-box",
          onClick: ($event) => insertToContent($event)
        }, null, _parent));
        _push(`</button><!--[-->`);
        ssrRenderList(tools, (tool) => {
          _push(`<button class="${ssrRenderClass(tool.id)}"${ssrRenderAttr("title", tool.id)}${ssrIncludeBooleanAttr(__props.disabled || preview.value) ? " disabled" : ""} data-v-1147ad38><i class="${ssrRenderClass([tool.icon, "iconfont"])}" data-v-1147ad38></i></button>`);
        });
        _push(`<!--]--><button title="preview" class="${ssrRenderClass([{ actived: preview.value }, "preview"])}"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-1147ad38><i class="${ssrRenderClass([preview.value ? "icon-eye-close" : "icon-eye", "iconfont"])}" data-v-1147ad38></i></button><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="right" data-v-1147ad38>`);
      ssrRenderSlot(_ctx.$slots, "toolbar-right-extra", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1F = _sfc_main$1F.setup;
_sfc_main$1F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/composer/editor.vue");
  return _sfc_setup$1F ? _sfc_setup$1F(props, ctx) : void 0;
};
const ComposerEditor = /* @__PURE__ */ _export_sfc(_sfc_main$1F, [["__scopeId", "data-v-1147ad38"]]);
const _sfc_main$1E = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    posting: { type: Boolean },
    disabled: { type: Boolean },
    bordered: { type: Boolean },
    hasComments: { type: Boolean },
    hiddenAvatar: { type: Boolean },
    fixedAvatar: { type: Boolean },
    editorAutoFocus: { type: Boolean },
    hiddenEditorTools: { type: Boolean }
  }, {
    "expanded": { type: Boolean, ...{
      default: false
    } },
    "expandedModifiers": {},
    "profile": {
      required: true
    },
    "profileModifiers": {},
    "content": {
      required: false,
      default: ""
    },
    "contentModifiers": {},
    "preview": { type: Boolean, ...{
      required: false,
      default: false
    } },
    "previewModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit"], ["update:expanded", "update:profile", "update:content", "update:preview"]),
  setup(__props, { emit: __emit }) {
    const expanded = useModel(__props, "expanded");
    const profile = useModel(__props, "profile");
    const editorContent = useModel(__props, "content");
    const editorPreview = useModel(__props, "preview");
    const { identity, cdnDomain, isCNUser, i18n: _i18n } = useEnhancer();
    const formRef = shallowRef();
    const defaultAvatar = getAssetURL(cdnDomain, APP_CONFIG.default_comment_avatar);
    const avatarUrl = shallowRef(defaultAvatar);
    onMounted(() => {
      watchEffect(async (onInvalidate) => {
        let cancelled = false;
        onInvalidate(() => cancelled = true);
        const userAvatar = identity.userProfile?.avatar_url;
        const guestEmail = identity.guestProfile?.email;
        if (userAvatar) {
          avatarUrl.value = isCNUser ? getOriginalProxyURL(userAvatar) : userAvatar;
          return;
        }
        if (guestEmail) {
          const guestAvatar = await getGravatarByEmail(guestEmail);
          if (!cancelled) {
            avatarUrl.value = isCNUser ? getOriginalProxyURL(guestAvatar) : guestAvatar;
            return;
          }
        }
        avatarUrl.value = defaultAvatar;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      _push(`<form${ssrRenderAttrs(mergeProps({
        class: ["comment-composer", {
          "hidden-avatar": __props.hiddenAvatar,
          "fixed-avatar": __props.fixedAvatar,
          expanded: expanded.value,
          bordered: __props.bordered
        }],
        name: "comment",
        ref_key: "formRef",
        ref: formRef
      }, _attrs))} data-v-02b73de9>`);
      if (unref(identity).isAnonymous) {
        _push(`<div class="profile" style="${ssrRenderStyle(expanded.value ? null : { display: "none" })}" data-v-02b73de9><div class="name" data-v-02b73de9><input${ssrRenderAttr("value", profile.value.name)} required type="text" name="name" autocomplete="on"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_AUTHOR_NAME) + " *")} data-v-02b73de9></div><div class="email" data-v-02b73de9><input${ssrRenderAttr("value", profile.value.email)} required type="email" name="email" autocomplete="on"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_AUTHOR_EMAIL) + " *")} data-v-02b73de9></div><div class="website" data-v-02b73de9><input${ssrRenderAttr("value", profile.value.website)} type="url" name="url" autocomplete="on"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_AUTHOR_WEBSITE))} data-v-02b73de9></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="postbox" data-v-02b73de9>`);
      if (!__props.hiddenAvatar) {
        _push(`<div class="avatar" data-v-02b73de9>`);
        _push(ssrRenderComponent(_component_uimage, {
          alt: profile.value.name,
          src: avatarUrl.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (expanded.value) {
        _push(ssrRenderComponent(ComposerEditor, {
          key: "editor",
          modelValue: editorContent.value,
          "onUpdate:modelValue": ($event) => editorContent.value = $event,
          preview: editorPreview.value,
          "onUpdate:preview": ($event) => editorPreview.value = $event,
          disabled: __props.disabled,
          bordered: __props.bordered,
          "auto-focus": __props.editorAutoFocus,
          "hidden-tools": __props.hiddenEditorTools
        }, {
          "toolbar-right-extra": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="submit" type="submit"${ssrIncludeBooleanAttr(__props.disabled || !editorContent.value.length) ? " disabled" : ""} data-v-02b73de9${_scopeId}>`);
              if (__props.posting) {
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: "发布中...",
                  en: "Posting..."
                }, null, _parent2, _scopeId));
              } else if (unref(identity).isGuest || unref(identity).isUser) {
                _push2(ssrRenderComponent(_component_i18n, null, {
                  zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`以 ${ssrInterpolate(unref(identity).profile?.name)} 的身份发布`);
                    } else {
                      return [
                        createTextVNode("以 " + toDisplayString(unref(identity).profile?.name) + " 的身份发布", 1)
                      ];
                    }
                  }),
                  en: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Post as ${ssrInterpolate(unref(identity).profile?.name)}`);
                    } else {
                      return [
                        createTextVNode("Post as " + toDisplayString(unref(identity).profile?.name), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: "发布",
                  en: "Publish"
                }, null, _parent2, _scopeId));
              }
              _push2(`</button>`);
            } else {
              return [
                createVNode("button", {
                  class: "submit",
                  type: "submit",
                  disabled: __props.disabled || !editorContent.value.length
                }, [
                  __props.posting ? (openBlock(), createBlock(_component_i18n, {
                    key: 0,
                    zh: "发布中...",
                    en: "Posting..."
                  })) : unref(identity).isGuest || unref(identity).isUser ? (openBlock(), createBlock(_component_i18n, { key: 1 }, {
                    zh: withCtx(() => [
                      createTextVNode("以 " + toDisplayString(unref(identity).profile?.name) + " 的身份发布", 1)
                    ]),
                    en: withCtx(() => [
                      createTextVNode("Post as " + toDisplayString(unref(identity).profile?.name), 1)
                    ]),
                    _: 1
                  })) : (openBlock(), createBlock(_component_i18n, {
                    key: 2,
                    zh: "发布",
                    en: "Publish"
                  }))
                ], 8, ["disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="placeholder" data-v-02b73de9>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "在下有一拙见，不知...",
          en: `${__props.hasComments ? "Join" : "Start"} the discussion...`
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup$1E = _sfc_main$1E.setup;
_sfc_main$1E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/composer/main.vue");
  return _sfc_setup$1E ? _sfc_setup$1E(props, ctx) : void 0;
};
const CommentComposerForm = /* @__PURE__ */ _export_sfc(_sfc_main$1E, [["__scopeId", "data-v-02b73de9"]]);
const _sfc_main$1D = /* @__PURE__ */ defineComponent({
  __name: "wrapper",
  __ssrInlineRender: true,
  props: {
    hasData: { type: Boolean },
    loading: { type: Boolean, default: false },
    skeletonCount: { default: 6 }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_i18n = resolveComponent("i18n");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({
        loading: __props.loading,
        "has-data": __props.hasData || !!_ctx.$slots.extra
      }, _attrs), {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="list-skeleton" data-v-8d22e677${_scopeId}><!--[-->`);
            ssrRenderList(__props.skeletonCount, (item) => {
              _push2(`<li class="item" data-v-8d22e677${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "avatar" }, null, _parent2, _scopeId));
              _push2(`<div class="right" data-v-8d22e677${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "username" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "content" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "content" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "content" }, null, _parent2, _scopeId));
              _push2(`</div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "list-skeleton" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.skeletonCount, (item) => {
                  return openBlock(), createBlock("li", {
                    class: "item",
                    key: item
                  }, [
                    createVNode(_component_skeleton, { class: "avatar" }),
                    createVNode("div", { class: "right" }, [
                      createVNode(_component_skeleton, { class: "username" }),
                      createVNode(_component_skeleton, { class: "content" }),
                      createVNode(_component_skeleton, { class: "content" }),
                      createVNode(_component_skeleton, { class: "content" })
                    ])
                  ]);
                }), 128))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="list-container" data-v-8d22e677${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "extra", {}, null, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "list", {}, null, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "pagination", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "list-container" }, [
                renderSlot(_ctx.$slots, "extra", {}, void 0, true),
                renderSlot(_ctx.$slots, "list", {}, void 0, true),
                renderSlot(_ctx.$slots, "pagination", {}, void 0, true)
              ])
            ];
          }
        }),
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="list-empty" data-v-8d22e677${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).COMMENT_LIST_EMPTY
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "list-empty" }, [
                createVNode(_component_i18n, {
                  k: unref(LocalesKey).COMMENT_LIST_EMPTY
                }, null, 8, ["k"])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1D = _sfc_main$1D.setup;
_sfc_main$1D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/wrapper.vue");
  return _sfc_setup$1D ? _sfc_setup$1D(props, ctx) : void 0;
};
const CommentListWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$1D, [["__scopeId", "data-v-8d22e677"]]);
const _sfc_main$1C = /* @__PURE__ */ defineComponent({
  __name: "item-avatar",
  __ssrInlineRender: true,
  props: {
    comment: {},
    meta: {}
  },
  setup(__props) {
    const props = __props;
    const { cdnDomain, isCNUser } = useEnhancer();
    const getAuthorAvatarUrl = () => {
      const defaultAvatar = getAssetURL(cdnDomain, APP_CONFIG.default_comment_avatar);
      if (props.meta.isGhostUser) {
        return getAssetURL(cdnDomain, "/images/anonymous.png");
      }
      if (props.comment.user) {
        const userAvatar = props.comment.user.avatar_url;
        return userAvatar ? isCNUser ? getCdnProxyURL(cdnDomain, userAvatar) : userAvatar : defaultAvatar;
      }
      if (props.meta.isDisqusAuthor && props.meta.disqusUsername) {
        const disqusAvatar = getDisqusAvatarByUsername(props.meta.disqusUsername);
        return isCNUser ? getCdnProxyURL(cdnDomain, disqusAvatar) : disqusAvatar;
      }
      if (props.comment.author_email_hash) {
        const gravatar = getGravatarByHash(props.comment.author_email_hash);
        return isCNUser ? getCdnProxyURL(cdnDomain, gravatar) : gravatar;
      }
      return defaultAvatar;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-avatar" }, _attrs))} data-v-bcf4944d>`);
      if (__props.meta.isAiGenerated) {
        _push(`<div class="ai-avatar" data-v-bcf4944d><div class="ai-brand" data-v-bcf4944d><i class="iconfont icon-robot" data-v-bcf4944d></i></div></div>`);
      } else {
        _push(`<div class="author-avatar" data-v-bcf4944d><img${ssrRenderAttr("src", getAuthorAvatarUrl())}${ssrRenderAttr("alt", __props.comment.author_name)} draggable="false" data-v-bcf4944d>`);
        if (__props.comment.user || __props.meta.isDisqusAuthor) {
          _push(`<span class="role" data-v-bcf4944d>`);
          if (__props.comment.user) {
            _push(`<i class="iconfont icon-user" data-v-bcf4944d></i>`);
          } else {
            _push(`<i class="iconfont icon-disqus" data-v-bcf4944d></i>`);
          }
          _push(`</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1C = _sfc_main$1C.setup;
_sfc_main$1C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item-avatar.vue");
  return _sfc_setup$1C ? _sfc_setup$1C(props, ctx) : void 0;
};
const CommentAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$1C, [["__scopeId", "data-v-bcf4944d"]]);
const _sfc_main$1B = /* @__PURE__ */ defineComponent({
  __name: "item-username",
  __ssrInlineRender: true,
  props: {
    comment: {},
    meta: {}
  },
  setup(__props) {
    const props = __props;
    const authorName = computed(() => {
      return props.comment.user?.name ?? props.comment.author_name;
    });
    const authorUrl = computed(() => {
      if (props.comment.author_website) {
        return props.comment.author_website;
      }
      if (props.comment.user?.website) {
        return props.comment.user?.website;
      }
      if (props.meta.disqusUsername) {
        return `https://disqus.com/by/${props.meta.disqusUsername}/`;
      }
      return null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-username" }, _attrs))} data-v-c44b2cc9>`);
      if (__props.meta.isAiGenerated) {
        _push(`<span class="username ai" data-v-c44b2cc9>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_AI_ASSISTANT
        }, null, _parent));
        _push(`</span>`);
      } else if (__props.meta.isGhostUser) {
        _push(`<span class="username ghost" data-v-c44b2cc9>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_GHOST_USER
        }, null, _parent));
        _push(`</span>`);
      } else if (authorUrl.value) {
        _push(`<a class="${ssrRenderClass([{ patron: __props.meta.isPatronUser, moderator: __props.meta.isModeratorUser }, "username link"])}" target="_blank" rel="external nofollow noopener"${ssrRenderAttr("href", authorUrl.value)} data-v-c44b2cc9>${ssrInterpolate(authorName.value)}</a>`);
      } else {
        _push(`<span class="${ssrRenderClass([{ patron: __props.meta.isPatronUser }, "username"])}" data-v-c44b2cc9>${ssrInterpolate(authorName.value)}</span>`);
      }
      if (__props.meta.isAiGenerated) {
        _push(`<span class="badge ai" data-v-c44b2cc9>AI</span>`);
      } else if (__props.meta.isPatronUser) {
        _push(`<span class="badge patron" data-v-c44b2cc9>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_PATRON
        }, null, _parent));
        _push(`</span>`);
      } else if (__props.meta.isModeratorUser) {
        _push(`<span class="badge moderator" data-v-c44b2cc9>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_MODERATOR
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1B = _sfc_main$1B.setup;
_sfc_main$1B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item-username.vue");
  return _sfc_setup$1B ? _sfc_setup$1B(props, ctx) : void 0;
};
const CommentUsername = /* @__PURE__ */ _export_sfc(_sfc_main$1B, [["__scopeId", "data-v-c44b2cc9"]]);
const OFFSET = 127397;
const regionCodeToEmoji = (regionCode) => {
  return regionCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + OFFSET));
};
const _sfc_main$1A = /* @__PURE__ */ defineComponent({
  __name: "item-location",
  __ssrInlineRender: true,
  props: {
    location: {}
  },
  setup(__props) {
    const props = __props;
    const { globalState, isZhLang } = useEnhancer();
    const countryEmoji = computed(() => regionCodeToEmoji(props.location.country_code));
    const countryText = computed(() => {
      if (props.location.country_code) {
        return isZhLang.value ? regionCodeToChineseName(props.location.country_code) ?? props.location.country_code : props.location.country_code;
      } else {
        return props.location.country;
      }
    });
    const municipalities = ["Shanghai", "Beijing", "Tianjin", "Chongqing", "Chungking"];
    const cityText = computed(() => {
      if (props.location.country_code === "CN") {
        if (municipalities.includes(props.location.region)) {
          return props.location.region;
        }
      }
      return props.location.city;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "comment-ip-location" }, _attrs))} data-v-c35b4ad5>`);
      if (countryEmoji.value) {
        _push(`<span class="${ssrRenderClass([{ safari: unref(globalState).userAgent.isSafari }, "emoji"])}"${ssrRenderAttr("title", props.location.country)} data-v-c35b4ad5>${ssrInterpolate(countryEmoji.value)}</span>`);
      } else {
        _push(`<i class="iconfont icon-earth" data-v-c35b4ad5></i>`);
      }
      _push(`<span${ssrRenderAttr("title", props.location.country)} data-allow-mismatch data-v-c35b4ad5>${ssrInterpolate(countryText.value)}</span><span class="separator" data-v-c35b4ad5>•</span><span${ssrRenderAttr("title", cityText.value)} data-v-c35b4ad5>${ssrInterpolate(cityText.value)}</span></span>`);
    };
  }
});
const _sfc_setup$1A = _sfc_main$1A.setup;
_sfc_main$1A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item-location.vue");
  return _sfc_setup$1A ? _sfc_setup$1A(props, ctx) : void 0;
};
const CommentLocation = /* @__PURE__ */ _export_sfc(_sfc_main$1A, [["__scopeId", "data-v-c35b4ad5"]]);
const _sfc_main$1z = /* @__PURE__ */ defineComponent({
  __name: "item-user-agent",
  __ssrInlineRender: true,
  props: {
    userAgent: {}
  },
  setup(__props) {
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
    uaParsed.os.name;
    const browserName = uaParsed.browser.name;
    const browserIconName = browserName ? browsersIconsNameMap[browserName] : null;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "comment-user-agent" }, _attrs))} data-v-d1b97bed>`);
      if (unref(browserName)) {
        _push(`<span class="browser" data-v-d1b97bed>`);
        if (unref(browserIconName)) {
          _push(`<i class="${ssrRenderClass([unref(browserIconName), "iconfont"])}" data-v-d1b97bed></i>`);
        } else {
          _push(`<i class="iconfont icon-internet" data-v-d1b97bed></i>`);
        }
        _push(`<span data-v-d1b97bed>${ssrInterpolate(unref(browserName))}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
    };
  }
});
const _sfc_setup$1z = _sfc_main$1z.setup;
_sfc_main$1z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item-user-agent.vue");
  return _sfc_setup$1z ? _sfc_setup$1z(props, ctx) : void 0;
};
const CommentUserAgent = /* @__PURE__ */ _export_sfc(_sfc_main$1z, [["__scopeId", "data-v-d1b97bed"]]);
const _sfc_main$1y = /* @__PURE__ */ defineComponent({
  __name: "item-reply-parent",
  __ssrInlineRender: true,
  props: {
    comment: {}
  },
  setup(__props) {
    const props = __props;
    const commentStore = useCommentStore();
    const parentId = computed(() => props.comment.parent_id);
    const parentComment = computed(() => commentStore.commentMap.get(parentId.value));
    const isGhostParent = computed(() => parentComment.value?.author_status === CommentAuthorStatus.Ghost);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<p${ssrRenderAttrs(mergeProps({ class: "comment-reply-parent" }, _attrs))} data-v-940485dd><span class="reply" data-v-940485dd>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "回复",
        en: "Reply to"
      }, null, _parent));
      _push(`</span>`);
      if (__props.comment.orphaned) {
        _push(`<span class="tombstone" data-v-940485dd>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_DELETED_COMMENT
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!--[--><button class="parent" data-v-940485dd><span class="id" data-v-940485dd>#${ssrInterpolate(parentId.value)}</span>`);
        if (isGhostParent.value) {
          _push(`<span class="at ghost" data-v-940485dd>`);
          _push(ssrRenderComponent(_component_i18n, {
            k: unref(LocalesKey).COMMENT_GHOST_USER
          }, null, _parent));
          _push(`</span>`);
        } else if (parentComment.value?.author_name) {
          _push(`<span class="at active" data-v-940485dd>@${ssrInterpolate(parentComment.value.author_name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "：",
          en: ":"
        }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</p>`);
    };
  }
});
const _sfc_setup$1y = _sfc_main$1y.setup;
_sfc_main$1y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item-reply-parent.vue");
  return _sfc_setup$1y ? _sfc_setup$1y(props, ctx) : void 0;
};
const CommentReplyParent = /* @__PURE__ */ _export_sfc(_sfc_main$1y, [["__scopeId", "data-v-940485dd"]]);
const _sfc_main$1x = /* @__PURE__ */ defineComponent({
  __name: "item-ai-info",
  __ssrInlineRender: true,
  props: {
    comment: {},
    meta: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.meta.isAiGenerated) {
        _push(`<span${ssrRenderAttrs(mergeProps({ class: "comment-ai-info" }, _attrs))} data-v-cbd10798><i class="iconfont icon-cpu" data-v-cbd10798></i><span data-v-cbd10798>${ssrInterpolate(__props.meta.aiProvider)}</span></span>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1x = _sfc_main$1x.setup;
_sfc_main$1x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item-ai-info.vue");
  return _sfc_setup$1x ? _sfc_setup$1x(props, ctx) : void 0;
};
const CommentAiInfo = /* @__PURE__ */ _export_sfc(_sfc_main$1x, [["__scopeId", "data-v-cbd10798"]]);
const _sfc_main$1w = /* @__PURE__ */ defineComponent({
  __name: "item-floor",
  __ssrInlineRender: true,
  props: {
    comment: {}
  },
  setup(__props) {
    useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({ class: "comment-floor" }, _attrs))} data-v-a3044ab5>#${ssrInterpolate(__props.comment.id)}</button>`);
    };
  }
});
const _sfc_setup$1w = _sfc_main$1w.setup;
_sfc_main$1w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item-floor.vue");
  return _sfc_setup$1w ? _sfc_setup$1w(props, ctx) : void 0;
};
const CommentFloor = /* @__PURE__ */ _export_sfc(_sfc_main$1w, [["__scopeId", "data-v-a3044ab5"]]);
const _sfc_main$1v = /* @__PURE__ */ defineComponent({
  __name: "item",
  __ssrInlineRender: true,
  props: {
    comment: {},
    isReplying: { type: Boolean },
    isInChildList: { type: Boolean },
    hasChildren: { type: Boolean },
    hiddenReply: { type: Boolean },
    hiddenAvatar: { type: Boolean },
    hiddenLocation: { type: Boolean },
    hiddenUserAgent: { type: Boolean }
  },
  emits: ["like", "dislike", "delete", "reply", "cancel-reply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { identity } = useEnhancer();
    const commentStore = useCommentStore();
    const historyStore = useHistoryStore();
    const commentMeta = computed(() => {
      const extrasMap = getExtrasMap(props.comment.extras);
      return {
        isAiGenerated: extrasMap.has("ai-generated"),
        aiProvider: extrasMap.get("ai-provider"),
        aiModel: extrasMap.get("ai-model"),
        isDisqusAuthor: !!extrasMap.get("disqus-author-id"),
        disqusUsername: extrasMap.get("disqus-author-username"),
        isModeratorUser: props.comment.user?.type === UserType.Moderator,
        isPatronUser: props.comment.user?.type === UserType.Patron,
        isGhostUser: props.comment.author_status === CommentAuthorStatus.Ghost
      };
    });
    const isDeletable = computed(() => {
      return Boolean(
        identity.isUser && identity.userProfile && props.comment.user && props.comment.user.id === identity.userProfile.id
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_udate = resolveComponent("udate");
      const _component_i18n = resolveComponent("i18n");
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["comment-item", {
          "hide-avatar": __props.hiddenAvatar,
          "in-child-list": __props.isInChildList,
          "has-children": __props.hasChildren
        }],
        id: unref(getCommentItemElementId)(__props.comment.id)
      }, _attrs))} data-v-a139da84>`);
      if (!__props.hiddenAvatar) {
        _push(ssrRenderComponent(CommentAvatar, {
          class: "cm-avatar",
          comment: __props.comment,
          meta: commentMeta.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cm-body" data-v-a139da84><div class="cm-header" data-v-a139da84><div class="left" data-v-a139da84>`);
      _push(ssrRenderComponent(CommentUsername, {
        class: "cm-username",
        comment: __props.comment,
        meta: commentMeta.value
      }, null, _parent));
      _push(`<span class="author-info" data-v-a139da84>`);
      if (commentMeta.value.isAiGenerated) {
        _push(ssrRenderComponent(CommentAiInfo, {
          comment: __props.comment,
          meta: commentMeta.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.comment.ip_location && !__props.hiddenLocation) {
        _push(ssrRenderComponent(CommentLocation, {
          location: __props.comment.ip_location
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.comment.user_agent && !__props.hiddenUserAgent) {
        _push(ssrRenderComponent(CommentUserAgent, {
          "user-agent": __props.comment.user_agent
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</span></div><div class="right" data-v-a139da84>`);
      _push(ssrRenderComponent(CommentFloor, { comment: __props.comment }, null, _parent));
      _push(`</div></div><div class="cm-content" data-v-a139da84>`);
      if (__props.comment.parent_id) {
        _push(ssrRenderComponent(CommentReplyParent, { comment: __props.comment }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(CommentMarkdown, {
        content: __props.comment.content
      }, null, _parent));
      _push(`</div><div class="cm-footer" data-v-a139da84><div class="left" data-v-a139da84><span class="create-at" data-v-a139da84>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: __props.comment.created_at
      }, null, _parent));
      _push(`</span><button${ssrRenderAttr("data-count", __props.comment.likes)} class="${ssrRenderClass([{ voted: unref(historyStore).isLikedComment(__props.comment.id) }, "vote"])}"${ssrIncludeBooleanAttr(unref(historyStore).isLikedComment(__props.comment.id)) ? " disabled" : ""} data-v-a139da84><i class="iconfont icon-like" data-v-a139da84></i><span class="count" data-v-a139da84>(${ssrInterpolate(__props.comment.likes)})</span></button><button${ssrRenderAttr("data-count", __props.comment.dislikes)} class="${ssrRenderClass([{ voted: unref(historyStore).isDislikedComment(__props.comment.id) }, "vote"])}"${ssrIncludeBooleanAttr(unref(historyStore).isDislikedComment(__props.comment.id)) ? " disabled" : ""} data-v-a139da84><i class="iconfont icon-dislike" data-v-a139da84></i><span class="count" data-v-a139da84>(${ssrInterpolate(__props.comment.dislikes)})</span></button>`);
      if (!__props.hiddenReply && !commentMeta.value.isAiGenerated) {
        _push(`<!--[-->`);
        if (__props.isReplying) {
          _push(`<button class="reply" data-v-a139da84><i class="iconfont icon-cancel" data-v-a139da84></i>`);
          _push(ssrRenderComponent(_component_i18n, {
            k: unref(LocalesKey).COMMENT_REPLY_CANCEL
          }, null, _parent));
          _push(`</button>`);
        } else {
          _push(`<button class="reply" data-v-a139da84><i class="iconfont icon-reply" data-v-a139da84></i>`);
          _push(ssrRenderComponent(_component_i18n, {
            k: unref(LocalesKey).COMMENT_REPLY
          }, null, _parent));
          _push(`</button>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="right" data-v-a139da84>`);
      if (isDeletable.value) {
        _push(`<button class="delete"${ssrIncludeBooleanAttr(unref(commentStore).deleting) ? " disabled" : ""} data-v-a139da84><i class="iconfont icon-delete" data-v-a139da84></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_DELETE
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (__props.isReplying) {
        _push(`<div class="cm-reply" data-v-a139da84>`);
        ssrRenderSlot(_ctx.$slots, "reply", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="cm-children" data-v-a139da84>`);
      ssrRenderSlot(_ctx.$slots, "children", {}, null, _push, _parent);
      _push(`</div></div></li>`);
    };
  }
});
const _sfc_setup$1v = _sfc_main$1v.setup;
_sfc_main$1v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/item.vue");
  return _sfc_setup$1v ? _sfc_setup$1v(props, ctx) : void 0;
};
const CommentItem = /* @__PURE__ */ _export_sfc(_sfc_main$1v, [["__scopeId", "data-v-a139da84"]]);
const _sfc_main$1u = /* @__PURE__ */ defineComponent({
  ...{
    name: "CommentList"
  },
  __name: "list",
  __ssrInlineRender: true,
  props: {
    level: {},
    comments: {},
    replyingParentId: {},
    hiddenReply: { type: Boolean },
    hiddenAvatar: { type: Boolean },
    hiddenUserAgent: { type: Boolean }
  },
  emits: ["like", "dislike", "delete", "reply", "cancel-reply"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_comment_list = resolveComponent("comment-list");
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: ["comment-list", __props.level]
      }, _attrs))} data-v-191e3312><!--[-->`);
      ssrRenderList(__props.comments, (item) => {
        _push(ssrRenderComponent(CommentItem, {
          key: item.comment.id,
          comment: item.comment,
          "is-replying": __props.replyingParentId === item.comment.id,
          "is-in-child-list": __props.level === "child",
          "has-children": !!item.children.length,
          "hidden-reply": __props.hiddenReply,
          "hidden-avatar": __props.hiddenAvatar,
          "hidden-user-agent": __props.hiddenUserAgent,
          onLike: ($event) => emit("like", $event),
          onDislike: ($event) => emit("dislike", $event),
          onDelete: ($event) => emit("delete", $event),
          onReply: ($event) => emit("reply", $event),
          onCancelReply: ($event) => emit("cancel-reply", $event)
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
                  level: "child",
                  comments: item.children,
                  "replying-parent-id": __props.replyingParentId,
                  "hidden-reply": __props.hiddenReply,
                  "hidden-avatar": __props.hiddenAvatar,
                  "hidden-user-agent": __props.hiddenUserAgent,
                  onLike: ($event) => emit("like", $event),
                  onDislike: ($event) => emit("dislike", $event),
                  onDelete: ($event) => emit("delete", $event),
                  onReply: ($event) => emit("reply", $event),
                  onCancelReply: ($event) => emit("cancel-reply", $event)
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
                    level: "child",
                    comments: item.children,
                    "replying-parent-id": __props.replyingParentId,
                    "hidden-reply": __props.hiddenReply,
                    "hidden-avatar": __props.hiddenAvatar,
                    "hidden-user-agent": __props.hiddenUserAgent,
                    onLike: ($event) => emit("like", $event),
                    onDislike: ($event) => emit("dislike", $event),
                    onDelete: ($event) => emit("delete", $event),
                    onReply: ($event) => emit("reply", $event),
                    onCancelReply: ($event) => emit("cancel-reply", $event)
                  }, {
                    reply: withCtx(() => [
                      renderSlot(_ctx.$slots, "reply", {
                        comment: item.comment,
                        isChild: true
                      }, void 0, true)
                    ]),
                    _: 2
                  }, 1032, ["comments", "replying-parent-id", "hidden-reply", "hidden-avatar", "hidden-user-agent", "onLike", "onDislike", "onDelete", "onReply", "onCancelReply"])
                ];
              }
            }),
            key: "0"
          } : void 0
        ]), _parent));
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$1u = _sfc_main$1u.setup;
_sfc_main$1u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/list/list.vue");
  return _sfc_setup$1u ? _sfc_setup$1u(props, ctx) : void 0;
};
const CommentList = /* @__PURE__ */ _export_sfc(_sfc_main$1u, [["__scopeId", "data-v-191e3312"]]);
const _sfc_main$1t = /* @__PURE__ */ defineComponent({
  __name: "loadmore",
  __ssrInlineRender: true,
  props: {
    fetching: { type: Boolean },
    hasMore: { type: Boolean }
  },
  emits: ["loadmore"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_loading_indicator = resolveComponent("loading-indicator");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "comment-loadmore" }, _attrs))} data-v-455371bb>`);
      if (__props.fetching) {
        _push(ssrRenderComponent(_component_loading_indicator, { class: "loading" }, null, _parent));
      } else if (__props.hasMore) {
        _push(`<button class="button" data-v-455371bb>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "加载更多评论",
          en: "loadmore comments"
        }, null, _parent));
        _push(`<i class="iconfont icon-loadmore" data-v-455371bb></i></button>`);
      } else {
        _push(`<span class="finished" data-v-455371bb>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).LIST_NO_MORE_DATA
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
const CommentLoadmore = /* @__PURE__ */ _export_sfc(_sfc_main$1t, [["__scopeId", "data-v-455371bb"]]);
const logger$1 = createLogger("APP:Comment");
function useCommentInteraction(options) {
  const { i18n } = useEnhancer();
  const identityStore = useIdentityStore();
  const historyStore = useHistoryStore();
  const commentStore = useCommentStore();
  const replyingParentId = ref(null);
  const isRootPosting = ref(false);
  const isReplyPosting = ref(false);
  const inputProfile = reactive({
    name: "",
    email: "",
    website: ""
  });
  const rootEditorState = reactive({
    content: "",
    preview: false
  });
  const resetRootEditorState = () => {
    rootEditorState.content = "";
    rootEditorState.preview = false;
  };
  const replyTo = (commentId) => {
    replyingParentId.value = commentId;
  };
  const cancelReply = () => {
    replyingParentId.value = null;
  };
  const deleteComment = (commentId) => {
    if (window.confirm(i18n.t(LocalesKey.COMMENT_DELETE_CONFIRM))) {
      commentStore.deleteComment(commentId).catch((error) => {
        logger$1.failure("delete comment failed", error);
        alert(getMessageFromNormalError(error));
      });
    }
  };
  const createComment = async (payload) => {
    if (!payload.content || !payload.content.trim()) {
      throw new Error(`${i18n.t(LocalesKey.COMMENT_POST_CONTENT)} ?`);
    }
    if (payload.content.length > APP_CONFIG.comment_content_max_length) {
      throw new Error(`${i18n.t(LocalesKey.COMMENT_POST_ERROR_CONTENT)} ?`);
    }
    if (identityStore.isAnonymous) {
      if (!inputProfile.name) throw new Error(i18n.t(LocalesKey.COMMENT_AUTHOR_NAME) + "?");
      if (!inputProfile.email) throw new Error(i18n.t(LocalesKey.COMMENT_AUTHOR_EMAIL) + "?");
    }
    const name = identityStore.isAnonymous ? inputProfile.name : identityStore.profile?.name;
    const email = identityStore.isAnonymous ? inputProfile.email : identityStore.profile?.email;
    const website = identityStore.isAnonymous ? inputProfile.website : identityStore.profile?.website;
    await commentStore.postComment({
      target_type: options.targetType,
      target_id: options.targetId,
      parent_id: payload.parent_id,
      content: payload.content,
      author_name: name,
      author_email: email || null,
      author_website: website || null
    });
    if (identityStore.isAnonymous) {
      identityStore.saveGuestProfile({ ...toRaw(inputProfile) });
    }
  };
  const submitRootComment = async (content) => {
    isRootPosting.value = true;
    try {
      await createComment({ content, parent_id: null });
      resetRootEditorState();
    } catch (error) {
      logger$1.failure("submit comment failed:", error);
      alert(getMessageFromNormalError(error));
    } finally {
      isRootPosting.value = false;
    }
  };
  const submitReplyComment = async (content) => {
    isReplyPosting.value = true;
    try {
      await createComment({ content, parent_id: replyingParentId.value });
      cancelReply();
    } catch (error) {
      logger$1.failure("submit comment failed:", error);
      alert(getMessageFromNormalError(error));
    } finally {
      isReplyPosting.value = false;
    }
  };
  const likeComment = async (commentId) => {
    if (historyStore.isLikedComment(commentId)) {
      return false;
    }
    try {
      await commentStore.postCommentVote(commentId, 1);
      historyStore.likeComment(commentId);
    } catch (error) {
      const message = i18n.t(LocalesKey.POST_ACTION_ERROR);
      logger$1.failure(message, error);
      alert(message);
    }
  };
  const dislikeComment = async (commentId) => {
    if (historyStore.isDislikedComment(commentId)) {
      return false;
    }
    try {
      await commentStore.postCommentVote(commentId, -1);
      historyStore.dislikeComment(commentId);
    } catch (error) {
      const message = i18n.t(LocalesKey.POST_ACTION_ERROR);
      logger$1.failure(message, error);
      alert(message);
    }
  };
  return {
    replyingParentId,
    inputProfile,
    rootEditorState,
    isRootPosting,
    isReplyPosting,
    replyTo,
    cancelReply,
    likeComment,
    dislikeComment,
    deleteComment,
    submitRootComment,
    submitReplyComment
  };
}
const _sfc_main$1s = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    targetType: {},
    targetId: {},
    readonly: { type: Boolean, default: false },
    fetching: { type: Boolean, default: false },
    plain: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { route } = useEnhancer();
    const commentStore = useCommentStore();
    const commentInteraction = useCommentInteraction({
      targetType: props.targetType,
      targetId: props.targetId
    });
    const commentSort = ref(SortMode.Latest);
    const fetchCommentsWithSort = async (sort) => {
      scrollToAnchor(COMMENT_ELEMENT_ID);
      await commentStore.fetchList({
        target_type: props.targetType,
        target_id: props.targetId,
        sort
      });
    };
    const fetchNextPageComments = async () => {
      const lastComment = commentStore.comments.at(-1);
      const lastCommentId = getCommentItemElementId(lastComment.id);
      await commentStore.fetchListNextPage({
        target_type: props.targetType,
        target_id: props.targetId,
        sort: commentSort.value
      });
      await nextTick();
      scrollToAnchor(lastCommentId);
    };
    onBeforeMount(() => {
      watch(commentSort, (sort) => {
        commentInteraction.cancelReply();
        fetchCommentsWithSort(sort);
      });
    });
    onBeforeUnmount(() => {
      commentInteraction.cancelReply();
    });
    onUnmounted(() => {
      commentStore.clearList();
    });
    onMounted(() => {
      const urlHash = route.hash.slice(1);
      if (urlHash.startsWith(COMMENT_ITEM_URL_HASH_PREFIX)) {
        const commentId = getCommentIdByUrlHash(urlHash);
        const elementId = getCommentItemElementId(commentId);
        if (document.getElementById(elementId)) {
          setTimeout(() => scrollToAnchor(elementId), 400);
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_divider = resolveComponent("divider");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: COMMENT_ELEMENT_ID,
        class: ["comment-box", { plain: __props.plain }]
      }, _attrs))} data-v-71edf55f>`);
      _push(ssrRenderComponent(CommentTopbarWrapper, {
        loading: __props.fetching,
        plain: __props.plain
      }, {
        count: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CommentTopbarCount, {
              total: unref(commentStore).pagination?.total
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentTopbarCount, {
                total: unref(commentStore).pagination?.total
              }, null, 8, ["total"])
            ];
          }
        }),
        sort: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CommentTopbarSort, {
              modelValue: commentSort.value,
              "onUpdate:modelValue": ($event) => commentSort.value = $event
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentTopbarSort, {
                modelValue: commentSort.value,
                "onUpdate:modelValue": ($event) => commentSort.value = $event
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        user: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_client_only, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CommentTopbarUser, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CommentTopbarUser)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  createVNode(CommentTopbarUser)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_divider, { class: "divider" }, null, _parent));
      if (__props.readonly) {
        _push(`<div class="readonly" data-v-71edf55f>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_DISABLED
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(CommentComposerWrapper, { loading: __props.fetching }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(CommentComposerForm, {
                profile: unref(commentInteraction).inputProfile,
                "onUpdate:profile": ($event) => unref(commentInteraction).inputProfile = $event,
                content: unref(commentInteraction).rootEditorState.content,
                "onUpdate:content": ($event) => unref(commentInteraction).rootEditorState.content = $event,
                preview: unref(commentInteraction).rootEditorState.preview,
                "onUpdate:preview": ($event) => unref(commentInteraction).rootEditorState.preview = $event,
                posting: unref(commentInteraction).isRootPosting.value,
                disabled: unref(commentStore).fetching || unref(commentInteraction).isRootPosting.value,
                "has-comments": !!unref(commentStore).pagination?.total,
                expanded: __props.plain ? true : false,
                "hidden-avatar": __props.plain,
                "hidden-editor-tools": __props.plain,
                "editor-auto-focus": __props.plain ? false : true,
                onSubmit: unref(commentInteraction).submitRootComment
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(CommentComposerForm, {
                  profile: unref(commentInteraction).inputProfile,
                  "onUpdate:profile": ($event) => unref(commentInteraction).inputProfile = $event,
                  content: unref(commentInteraction).rootEditorState.content,
                  "onUpdate:content": ($event) => unref(commentInteraction).rootEditorState.content = $event,
                  preview: unref(commentInteraction).rootEditorState.preview,
                  "onUpdate:preview": ($event) => unref(commentInteraction).rootEditorState.preview = $event,
                  posting: unref(commentInteraction).isRootPosting.value,
                  disabled: unref(commentStore).fetching || unref(commentInteraction).isRootPosting.value,
                  "has-comments": !!unref(commentStore).pagination?.total,
                  expanded: __props.plain ? true : false,
                  "hidden-avatar": __props.plain,
                  "hidden-editor-tools": __props.plain,
                  "editor-auto-focus": __props.plain ? false : true,
                  onSubmit: unref(commentInteraction).submitRootComment
                }, null, 8, ["profile", "onUpdate:profile", "content", "onUpdate:content", "preview", "onUpdate:preview", "posting", "disabled", "has-comments", "expanded", "hidden-avatar", "hidden-editor-tools", "editor-auto-focus", "onSubmit"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(_component_divider, { class: "divider" }, null, _parent));
      _push(ssrRenderComponent(CommentListWrapper, {
        loading: __props.fetching || !unref(commentStore).comments.length && unref(commentStore).fetching,
        "skeleton-count": __props.plain ? 3 : 5,
        "has-data": !!unref(commentStore).commentTreeList.length
      }, createSlots({
        list: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CommentList, {
              level: "root",
              comments: unref(commentStore).commentTreeList,
              "replying-parent-id": unref(commentInteraction).replyingParentId.value,
              "hidden-reply": __props.readonly,
              "hidden-avatar": __props.plain,
              "hidden-user-agent": __props.plain,
              onLike: unref(commentInteraction).likeComment,
              onDislike: unref(commentInteraction).dislikeComment,
              onDelete: unref(commentInteraction).deleteComment,
              onReply: unref(commentInteraction).replyTo,
              onCancelReply: unref(commentInteraction).cancelReply
            }, {
              reply: withCtx((payload, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(CommentComposerForm, {
                    profile: unref(commentInteraction).inputProfile,
                    "onUpdate:profile": ($event) => unref(commentInteraction).inputProfile = $event,
                    posting: unref(commentInteraction).isReplyPosting.value,
                    disabled: unref(commentInteraction).isReplyPosting.value,
                    bordered: true,
                    expanded: true,
                    "fixed-avatar": payload.isChild,
                    "hidden-avatar": __props.plain,
                    "hidden-editor-tools": __props.plain,
                    "editor-auto-focus": true,
                    onSubmit: unref(commentInteraction).submitReplyComment
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(CommentComposerForm, {
                      profile: unref(commentInteraction).inputProfile,
                      "onUpdate:profile": ($event) => unref(commentInteraction).inputProfile = $event,
                      posting: unref(commentInteraction).isReplyPosting.value,
                      disabled: unref(commentInteraction).isReplyPosting.value,
                      bordered: true,
                      expanded: true,
                      "fixed-avatar": payload.isChild,
                      "hidden-avatar": __props.plain,
                      "hidden-editor-tools": __props.plain,
                      "editor-auto-focus": true,
                      onSubmit: unref(commentInteraction).submitReplyComment
                    }, null, 8, ["profile", "onUpdate:profile", "posting", "disabled", "fixed-avatar", "hidden-avatar", "hidden-editor-tools", "onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentList, {
                level: "root",
                comments: unref(commentStore).commentTreeList,
                "replying-parent-id": unref(commentInteraction).replyingParentId.value,
                "hidden-reply": __props.readonly,
                "hidden-avatar": __props.plain,
                "hidden-user-agent": __props.plain,
                onLike: unref(commentInteraction).likeComment,
                onDislike: unref(commentInteraction).dislikeComment,
                onDelete: unref(commentInteraction).deleteComment,
                onReply: unref(commentInteraction).replyTo,
                onCancelReply: unref(commentInteraction).cancelReply
              }, {
                reply: withCtx((payload) => [
                  createVNode(CommentComposerForm, {
                    profile: unref(commentInteraction).inputProfile,
                    "onUpdate:profile": ($event) => unref(commentInteraction).inputProfile = $event,
                    posting: unref(commentInteraction).isReplyPosting.value,
                    disabled: unref(commentInteraction).isReplyPosting.value,
                    bordered: true,
                    expanded: true,
                    "fixed-avatar": payload.isChild,
                    "hidden-avatar": __props.plain,
                    "hidden-editor-tools": __props.plain,
                    "editor-auto-focus": true,
                    onSubmit: unref(commentInteraction).submitReplyComment
                  }, null, 8, ["profile", "onUpdate:profile", "posting", "disabled", "fixed-avatar", "hidden-avatar", "hidden-editor-tools", "onSubmit"])
                ]),
                _: 1
              }, 8, ["comments", "replying-parent-id", "hidden-reply", "hidden-avatar", "hidden-user-agent", "onLike", "onDislike", "onDelete", "onReply", "onCancelReply"])
            ];
          }
        }),
        pagination: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(CommentLoadmore, {
              fetching: unref(commentStore).fetching,
              pagination: unref(commentStore).pagination,
              "has-more": unref(commentStore).hasMore,
              onLoadmore: fetchNextPageComments
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(CommentLoadmore, {
                fetching: unref(commentStore).fetching,
                pagination: unref(commentStore).pagination,
                "has-more": unref(commentStore).hasMore,
                onLoadmore: fetchNextPageComments
              }, null, 8, ["fetching", "pagination", "has-more"])
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
              _push2(ssrRenderComponent(_component_divider, { class: "divider" }, null, _parent2, _scopeId));
            } else {
              return [
                renderSlot(_ctx.$slots, "list-top-extra", {}, void 0, true),
                createVNode(_component_divider, { class: "divider" })
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
const _sfc_setup$1s = _sfc_main$1s.setup;
_sfc_main$1s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/comment/index.vue");
  return _sfc_setup$1s ? _sfc_setup$1s(props, ctx) : void 0;
};
const Comment = /* @__PURE__ */ _export_sfc(_sfc_main$1s, [["__scopeId", "data-v-71edf55f"]]);
const _sfc_main$1r = /* @__PURE__ */ defineComponent({
  __name: "skeletons",
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
      const _component_skeleton = resolveComponent("skeleton");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-skeleton" }, _attrs))} data-v-3f947aa4><div class="content-skeleton" data-v-3f947aa4>`);
      _push(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(3, (p) => {
        _push(`<div class="paragraph" data-v-3f947aa4><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_skeleton, {
            class: "line",
            key: i
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div><div class="shares-skeleton" data-v-3f947aa4><!--[-->`);
      ssrRenderList(__props.socialCount, (i) => {
        _push(ssrRenderComponent(_component_skeleton, {
          class: "item",
          key: i
        }, null, _parent));
      });
      _push(`<!--]--></div><ul class="related-skeleton" style="${ssrRenderStyle({ "--count": __props.relatedCount })}" data-v-3f947aa4><!--[-->`);
      ssrRenderList(__props.relatedCount, (item) => {
        _push(`<li class="item" data-v-3f947aa4>`);
        _push(ssrRenderComponent(_component_skeleton, { class: "content" }, null, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$1r = _sfc_main$1r.setup;
_sfc_main$1r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/skeletons.vue");
  return _sfc_setup$1r ? _sfc_setup$1r(props, ctx) : void 0;
};
const ArticleSkeletons = /* @__PURE__ */ _export_sfc(_sfc_main$1r, [["__scopeId", "data-v-3f947aa4"]]);
const _sfc_main$1q = /* @__PURE__ */ defineComponent({
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
    const isHybrid = computed(() => isHybridArticle(props.article.origin));
    const isReprint = computed(() => isReprintArticle(props.article.origin));
    const isOriginal = computed(() => isOriginalArticle(props.article.origin));
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
      }, _attrs))} data-v-03ec358c><div class="${ssrRenderClass([{
        original: isOriginal.value,
        reprint: isReprint.value,
        hybrid: isHybrid.value
      }, "origin"])}" data-v-03ec358c>`);
      if (isOriginal.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).ORIGIN_ORIGINAL
        }, null, _parent));
      } else if (isReprint.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).ORIGIN_REPRINT
        }, null, _parent));
      } else if (isHybrid.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).ORIGIN_HYBRID
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="knowledge" data-v-03ec358c><h2 class="title" data-v-03ec358c><span class="text" data-v-03ec358c>${ssrInterpolate(__props.article.title)}</span>`);
      if (__props.article.featured) {
        _push(`<span class="featured" data-v-03ec358c>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).ARTICLE_FEATURED_SHORT
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h2><div class="meta" data-v-03ec358c><i class="iconfont icon-t" data-v-03ec358c></i>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: `共 ${unref(numberSplit)(unref(ctxStore).contentLength)} 字，需阅读 ${unref(ctxStore).readMinutes} 分钟`,
        en: `${unref(numberSplit)(unref(ctxStore).contentLength)} characters, ${unref(ctxStore).readMinutes} min read`
      }, null, _parent));
      _push(ssrRenderComponent(_component_responsive, { desktop: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_divider, {
              type: "vertical",
              size: "sm",
              class: "vertical"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-03ec358c${_scopeId}><i class="iconfont icon-clock-outlined" data-v-03ec358c${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_udate, {
              to: "YMDm",
              date: __props.article.created_at,
              separator: "/"
            }, null, _parent2, _scopeId));
            _push2(`</span>`);
          } else {
            return [
              createVNode(_component_divider, {
                type: "vertical",
                size: "sm",
                class: "vertical"
              }),
              createVNode("span", null, [
                createVNode("i", { class: "iconfont icon-clock-outlined" }),
                createVNode(_component_udate, {
                  to: "YMDm",
                  date: __props.article.created_at,
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
        size: "sm",
        class: "vertical"
      }, null, _parent));
      _push(`<span data-v-03ec358c><i class="iconfont icon-eye-outlined" data-v-03ec358c></i><span data-v-03ec358c>${ssrInterpolate(unref(numberSplit)(__props.article.stats.views))} </span>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).ARTICLE_VIEWS
      }, null, _parent));
      _push(`</span></div>`);
      ssrRenderSlot(_ctx.$slots, "body-top-extra", {}, null, _push, _parent);
      _push(ssrRenderComponent(_sfc_main$1I, {
        html: unref(ctxStore).defaultContent?.html
      }, null, _parent));
      if (isRenderMoreEnabled.value) {
        _push(`<div${ssrRenderAttr("id", __props.readmoreId)} class="readmore" data-v-03ec358c><button class="readmore-btn"${ssrIncludeBooleanAttr(isRenderMoreContent.value) ? " disabled" : ""} data-v-03ec358c>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: isRenderMoreContent.value ? unref(LocalesKey).ARTICLE_RENDERING : unref(LocalesKey).ARTICLE_READ_ALL
        }, null, _parent));
        _push(`<i class="iconfont icon-loadmore" data-v-03ec358c></i></button></div>`);
      } else if (unref(ctxStore).renderedFullContent) {
        _push(ssrRenderComponent(_sfc_main$1I, {
          html: unref(ctxStore).moreContent?.html
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1q = _sfc_main$1q.setup;
_sfc_main$1q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/content.vue");
  return _sfc_setup$1q ? _sfc_setup$1q(props, ctx) : void 0;
};
const ArticleContent = /* @__PURE__ */ _export_sfc(_sfc_main$1q, [["__scopeId", "data-v-03ec358c"]]);
const _sfc_main$1p = /* @__PURE__ */ defineComponent({
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
    const isLongArticle = computed(
      () => props.article.content.length > APP_CONFIG.article_image_share_long_threshold
    );
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "share-box" }, _attrs))} data-v-52b0e1f6>`);
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
              "body-scrollable": false,
              onClose: closeImageSharePopup
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="${ssrRenderClass([{ rendered: isRenderedShareImage.value }, "share-as-image-modal"])}" data-v-52b0e1f6${_scopeId2}>`);
                  if (!isRenderedShareImage.value) {
                    _push3(`<div class="${ssrRenderClass([unref(theme).theme.value, "share-template"])}" data-v-52b0e1f6${_scopeId2}><div class="content" data-v-52b0e1f6${_scopeId2}><div class="header" data-v-52b0e1f6${_scopeId2}><h1 class="title" data-v-52b0e1f6${_scopeId2}>${ssrInterpolate(__props.article.title)}</h1><p class="meta-info" data-v-52b0e1f6${_scopeId2}>`);
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
                    _push3(ssrRenderComponent(_sfc_main$1I, {
                      class: "markdown",
                      markdown: templateMarkdown.value,
                      "render-options": {
                        lazyLoadImage: false,
                        codeLineNumbers: false,
                        imageSourceGetter: unref(getOriginalProxyURL)
                      }
                    }, null, _parent3, _scopeId2));
                    if (isLongArticle.value) {
                      _push3(`<div class="read-more-mask" data-v-52b0e1f6${_scopeId2}></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="footer" data-v-52b0e1f6${_scopeId2}><p class="tip" data-v-52b0e1f6${_scopeId2}>`);
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
                    _push3(`<div class="share-rendering" data-v-52b0e1f6${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_loading_indicator, {
                      width: "1.8rem",
                      height: "1.2rem",
                      gap: "lg"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (isRenderedShareImage.value) {
                    _push3(`<div class="share-image" data-v-52b0e1f6${_scopeId2}><img class="image"${ssrRenderAttr("src", shareImageUrl.value)}${ssrRenderAttr("alt", __props.article.title)} data-v-52b0e1f6${_scopeId2}></div>`);
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
                          createVNode(_sfc_main$1I, {
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
                              height: "1.2rem",
                              gap: "lg"
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
                "body-scrollable": false,
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
                        createVNode(_sfc_main$1I, {
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
                            height: "1.2rem",
                            gap: "lg"
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
const _sfc_setup$1p = _sfc_main$1p.setup;
_sfc_main$1p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/share.vue");
  return _sfc_setup$1p ? _sfc_setup$1p(props, ctx) : void 0;
};
const ArticleShare = /* @__PURE__ */ _export_sfc(_sfc_main$1p, [["__scopeId", "data-v-52b0e1f6"]]);
const _sfc_main$1o = /* @__PURE__ */ defineComponent({
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
        class: ["meta", { plain: __props.plain }]
      }, _attrs))} data-v-823492bb><div class="actions" data-v-823492bb>`);
      ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
      _push(`</div><div class="line" data-v-823492bb>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "本文于",
        en: "Published at"
      }, null, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        class: "link date",
        title: __props.article.created_at,
        to: unref(getDateFlowRoute)(unref(dateToYMD)(new Date(__props.article.created_at)))
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_udate, {
              to: "YMDm",
              date: __props.article.created_at,
              separator: "/"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_udate, {
                to: "YMDm",
                date: __props.article.created_at,
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
      ssrRenderList(__props.article.categories, (category, index) => {
        _push(`<span data-v-823492bb>`);
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
        if (__props.article.categories[index + 1]) {
          _push(`<span data-v-823492bb>`);
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
      if (!__props.article.categories.length) {
        _push(`<span data-v-823492bb>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "未知分类下",
          en: "(no catgory)"
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.plain) {
        _push(`<br data-v-823492bb>`);
      } else {
        _push(ssrRenderComponent(_component_divider, {
          type: "vertical",
          size: "sm"
        }, null, _parent));
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.article.tags, (tag, index) => {
        _push(`<span data-v-823492bb>`);
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
        if (__props.article.tags[index + 1]) {
          _push(`<span data-v-823492bb>`);
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
      _push(`<!--]--></div><div class="line" data-v-823492bb><i class="icon iconfont icon-creative-commons" data-v-823492bb></i>`);
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
      if (__props.plain) {
        _push(`<br data-v-823492bb>`);
      } else {
        _push(ssrRenderComponent(_component_divider, {
          type: "vertical",
          size: "sm"
        }, null, _parent));
      }
      _push(`<span class="link permalink" data-v-823492bb>${ssrInterpolate(articleURL.value)}</span></div></div>`);
    };
  }
});
const _sfc_setup$1o = _sfc_main$1o.setup;
_sfc_main$1o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/meta.vue");
  return _sfc_setup$1o ? _sfc_setup$1o(props, ctx) : void 0;
};
const ArticleMeta = /* @__PURE__ */ _export_sfc(_sfc_main$1o, [["__scopeId", "data-v-823492bb"]]);
const _sfc_main$1n = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "upvote" }, _attrs))} data-v-59f36012><div class="wrapper" data-v-59f36012><button class="${ssrRenderClass([{ liked: __props.isLiked, parkinson: __props.enabledParkinson, newliked: newLiked.value }, "button like"])}"${ssrIncludeBooleanAttr(__props.isLiked) ? " disabled" : ""} data-v-59f36012><i class="icon iconfont icon-like" data-v-59f36012></i><span class="text" data-v-59f36012>`);
      _push(ssrRenderComponent(_component_i18n, null, {
        zh: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`真棒！${ssrInterpolate(__props.likes)}`);
          } else {
            return [
              createTextVNode("真棒！" + toDisplayString(__props.likes), 1)
            ];
          }
        }),
        en: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.isLiked ? "Upvoted" : "Upvote")} ${ssrInterpolate(__props.likes)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.isLiked ? "Upvoted" : "Upvote") + " " + toDisplayString(__props.likes), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</span>`);
      if (__props.enabledParkinson) {
        _push(`<!--[--><span class="parkinson-mask" data-v-59f36012><i class="${ssrRenderClass([newLiked.value ? "icon-like" : "icon-like-pre", "iconfont"])}" data-v-59f36012></i></span><div class="parkinson-likes" data-v-59f36012>+ 1</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      if (!__props.hiddenSponsor) {
        _push(`<button class="button sponsor" data-v-59f36012><i class="icon iconfont icon-peachblossom" data-v-59f36012></i></button>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/upvote.vue");
  return _sfc_setup$1n ? _sfc_setup$1n(props, ctx) : void 0;
};
const ArticleUpvote = /* @__PURE__ */ _export_sfc(_sfc_main$1n, [["__scopeId", "data-v-59f36012"]]);
const _sfc_main$1m = /* @__PURE__ */ defineComponent({
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
          id: null,
          title: "-",
          summary: "",
          thumbnail: null
        })
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "related" }, _attrs))} data-v-d263b723><ul class="articles" style="${ssrRenderStyle({ gridTemplateColumns: `repeat(${__props.columns}, 1fr)` })}" data-v-d263b723><!--[-->`);
      ssrRenderList(articleList.value, (article, index) => {
        _push(`<li class="${ssrRenderClass([{ disabled: !article.id }, "item"])}" data-v-d263b723>`);
        _push(ssrRenderComponent(_component_router_link, {
          class: "item-article",
          title: article.title,
          to: unref(getArticleDetailRoute)(article.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<picture class="thumbnail" data-v-d263b723${_scopeId}>`);
              if (unref(isOriginalStaticURL)(article.thumbnail)) {
                _push2(`<!--[--><source${ssrRenderAttr("srcset", getThumbnailURL(article.thumbnail, "avif"))} type="image/avif" data-v-d263b723${_scopeId}><source${ssrRenderAttr("srcset", getThumbnailURL(article.thumbnail, "webp"))} type="image/webp" data-v-d263b723${_scopeId}><!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              if (article.thumbnail) {
                _push2(`<img class="image" loading="lazy" draggable="false"${ssrRenderAttr("alt", article.title)}${ssrRenderAttr("src", unref(isOriginalStaticURL)(article.thumbnail) ? getThumbnailURL(article.thumbnail) : article.thumbnail)} data-v-d263b723${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</picture><div class="title" data-v-d263b723${_scopeId}>${ssrInterpolate(article.title)}</div><div class="summary"${ssrRenderAttr("title", article.summary)} data-v-d263b723${_scopeId}>${ssrInterpolate(article.summary)}</div>`);
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
                  class: "summary",
                  title: article.summary
                }, toDisplayString(article.summary), 9, ["title"])
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
const _sfc_setup$1m = _sfc_main$1m.setup;
_sfc_main$1m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/related.vue");
  return _sfc_setup$1m ? _sfc_setup$1m(props, ctx) : void 0;
};
const ArticleRelated = /* @__PURE__ */ _export_sfc(_sfc_main$1m, [["__scopeId", "data-v-d263b723"]]);
const _sfc_main$1l = /* @__PURE__ */ defineComponent({
  __name: "neighbour",
  __ssrInlineRender: true,
  props: {
    prev: {},
    next: {},
    plain: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["neighbour", { plain: __props.plain }]
      }, _attrs))} data-v-e98bb9c2>`);
      if (__props.prev) {
        _push(ssrRenderComponent(_component_router_link, {
          class: "link prev",
          title: __props.prev.title,
          to: unref(getArticleDetailRoute)(__props.prev.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="icon" data-v-e98bb9c2${_scopeId}><i class="iconfont icon-prev" data-v-e98bb9c2${_scopeId}></i></div><div class="content" data-v-e98bb9c2${_scopeId}><p class="title" data-v-e98bb9c2${_scopeId}>${ssrInterpolate(__props.prev.title)}</p><p class="summary" data-v-e98bb9c2${_scopeId}>${ssrInterpolate(__props.prev.summary)}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "icon" }, [
                  createVNode("i", { class: "iconfont icon-prev" })
                ]),
                createVNode("div", { class: "content" }, [
                  createVNode("p", { class: "title" }, toDisplayString(__props.prev.title), 1),
                  createVNode("p", { class: "summary" }, toDisplayString(__props.prev.summary), 1)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="null" data-v-e98bb9c2>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "已是最早",
          en: "NULL"
        }, null, _parent));
        _push(`</div>`);
      }
      if (__props.next) {
        _push(ssrRenderComponent(_component_router_link, {
          class: "link next",
          title: __props.next.title,
          to: unref(getArticleDetailRoute)(__props.next.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="content" data-v-e98bb9c2${_scopeId}><p class="title" data-v-e98bb9c2${_scopeId}>${ssrInterpolate(__props.next.title)}</p><p class="summary" data-v-e98bb9c2${_scopeId}>${ssrInterpolate(__props.next.summary)}</p></div><div class="icon" data-v-e98bb9c2${_scopeId}><i class="iconfont icon-next" data-v-e98bb9c2${_scopeId}></i></div>`);
            } else {
              return [
                createVNode("div", { class: "content" }, [
                  createVNode("p", { class: "title" }, toDisplayString(__props.next.title), 1),
                  createVNode("p", { class: "summary" }, toDisplayString(__props.next.summary), 1)
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
        _push(`<div class="null" data-v-e98bb9c2>`);
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
const _sfc_setup$1l = _sfc_main$1l.setup;
_sfc_main$1l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/neighbour.vue");
  return _sfc_setup$1l ? _sfc_setup$1l(props, ctx) : void 0;
};
const ArticleNeighbour = /* @__PURE__ */ _export_sfc(_sfc_main$1l, [["__scopeId", "data-v-e98bb9c2"]]);
const _sfc_main$1k = /* @__PURE__ */ defineComponent({
  __name: "ai-review",
  __ssrInlineRender: true,
  props: {
    content: {},
    provider: {},
    model: {},
    timestamp: {},
    link: {},
    hiddenAvatar: { type: Boolean }
  },
  emits: ["click-link"],
  setup(__props, { emit: __emit }) {
    const avatarMap = {
      chatgpt3: "/images/ai-providers/chatgpt-3.webp",
      chatgpt4: "/images/ai-providers/chatgpt-4.webp",
      deepseek: "/images/ai-providers/deepseek.svg",
      openai: "/images/ai-providers/openai.svg",
      gemini: "/images/ai-providers/gemini.svg",
      google: "/images/ai-providers/google.svg",
      microsoft: "/images/ai-providers/microsoft.svg",
      meta: "/images/ai-providers/meta.svg",
      qwen: "/images/ai-providers/qwen.svg",
      default: "/icon.normal.png"
    };
    const props = __props;
    const emit = __emit;
    const handleLinkClick = () => {
      emit("click-link");
    };
    const aiProvider = computed(() => props.provider.toLowerCase());
    const aiAvatarUrl = computed(() => {
      const provider = aiProvider.value;
      return provider === "chatgpt" ? props.model?.includes("3") ? avatarMap.chatgpt3 : avatarMap.chatgpt4 : avatarMap[provider] || avatarMap.default;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_udate = resolveComponent("udate");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["ai-review", { "hide-avatar": __props.hiddenAvatar }]
      }, _attrs))} data-v-40c8ed85>`);
      if (!__props.hiddenAvatar) {
        _push(`<div class="ai-avatar" data-v-40c8ed85>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "link",
          href: __props.link,
          onClick: handleLinkClick
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_uimage, {
                class: [aiProvider.value, aiAvatarUrl.value.endsWith(".svg") ? "svg" : "image"],
                src: aiAvatarUrl.value,
                alt: __props.model,
                draggable: "false",
                cdn: ""
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_uimage, {
                  class: [aiProvider.value, aiAvatarUrl.value.endsWith(".svg") ? "svg" : "image"],
                  src: aiAvatarUrl.value,
                  alt: __props.model,
                  draggable: "false",
                  cdn: ""
                }, null, 8, ["class", "src", "alt"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="ai-body" data-v-40c8ed85><div class="ai-header" data-v-40c8ed85><div class="left" data-v-40c8ed85>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "provider",
        href: __props.link,
        onClick: handleLinkClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.provider)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.provider), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (__props.model) {
        _push(`<span class="model" data-v-40c8ed85><i class="iconfont icon-cpu" data-v-40c8ed85></i><span data-v-40c8ed85>${ssrInterpolate(__props.model)}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="right" data-v-40c8ed85>`);
      if (__props.timestamp) {
        _push(`<span class="created" data-v-40c8ed85>`);
        _push(ssrRenderComponent(_component_udate, {
          date: Number(__props.timestamp) * 1e3,
          to: "ago"
        }, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="ai-content" data-v-40c8ed85><div class="markdown" data-v-40c8ed85>`);
      _push(ssrRenderComponent(_sfc_main$1I, {
        markdown: __props.content,
        compact: true,
        "render-options": { sanitize: true }
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1k = _sfc_main$1k.setup;
_sfc_main$1k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/ai-review.vue");
  return _sfc_setup$1k ? _sfc_setup$1k(props, ctx) : void 0;
};
const ArticleAiReview = /* @__PURE__ */ _export_sfc(_sfc_main$1k, [["__scopeId", "data-v-40c8ed85"]]);
const _sfc_main$1j = /* @__PURE__ */ defineComponent({
  __name: "ai-summary",
  __ssrInlineRender: true,
  props: {
    content: {},
    provider: {},
    model: {},
    timestamp: {}
  },
  setup(__props) {
    const iconMap = {
      deepseek: "/images/ai-providers/deepseek.svg",
      chatgpt: "/images/ai-providers/openai.svg",
      gemini: "/images/ai-providers/gemini.svg"
    };
    const props = __props;
    const iconUrl = computed(() => {
      return props.provider ? iconMap[props.provider.toLowerCase()] : null;
    });
    const isExpanded = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["ai-summary", { "is-expanded": isExpanded.value }]
      }, _attrs))} data-v-f84e0c94><div class="summary-header" data-v-f84e0c94><span class="title" data-v-f84e0c94>AI `);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).ARTICLE_SUMMARY
      }, null, _parent));
      _push(`</span>`);
      if (__props.model) {
        _push(`<span class="provider" data-v-f84e0c94>`);
        if (iconUrl.value) {
          _push(ssrRenderComponent(_component_uimage, {
            class: "icon",
            alt: __props.provider,
            title: __props.provider,
            src: iconUrl.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="model" data-v-f84e0c94>${ssrInterpolate(__props.model)}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="summary-content" data-v-f84e0c94><p class="text" data-v-f84e0c94>${ssrInterpolate(__props.content)}</p></div><div class="toggle-action" data-v-f84e0c94><button class="toggle-btn" data-v-f84e0c94>`);
      if (isExpanded.value) {
        _push(ssrRenderComponent(_component_i18n, {
          zh: "收起",
          en: "Show less"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          zh: "展开阅读",
          en: "Read more"
        }, null, _parent));
      }
      _push(`</button></div></div>`);
    };
  }
});
const _sfc_setup$1j = _sfc_main$1j.setup;
_sfc_main$1j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/ai-summary.vue");
  return _sfc_setup$1j ? _sfc_setup$1j(props, ctx) : void 0;
};
const ArticleAiSummary = /* @__PURE__ */ _export_sfc(_sfc_main$1j, [["__scopeId", "data-v-f84e0c94"]]);
const _sfc_main$1i = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    articleId: {},
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { route, globalState, i18n: _i18n } = useEnhancer();
    const historyStore = useHistoryStore();
    const commentStore = useCommentStore();
    const articleDetailStore = useArticleDetailStore();
    const { article, fetching, prevArticle, nextArticle, relatedArticles } = storeToRefs(articleDetailStore);
    const isLiked = computed(() => !!(article.value && historyStore.isLikedArticle(article.value.id)));
    const articleExtrasMap = computed(() => getExtrasMap(article.value?.extras));
    const aiReviewProvider = computed(() => articleExtrasMap.value.get("ai-review-provider"));
    const aiReviewModel = computed(() => articleExtrasMap.value.get("ai-review-model"));
    const aiReviewContent = computed(() => articleExtrasMap.value.get("ai-review-content"));
    const aiReviewTimestamp = computed(() => articleExtrasMap.value.get("ai-review-timestamp"));
    const aiReviewLink = computed(() => articleExtrasMap.value.get("ai-review-link"));
    const aiSummaryContent = computed(() => articleExtrasMap.value.get("ai-summary-content"));
    const aiSummaryProvider = computed(() => articleExtrasMap.value.get("ai-summary-provider"));
    const aiSummaryModel = computed(() => articleExtrasMap.value.get("ai-summary-model"));
    const aiSummaryTimestamp = computed(() => articleExtrasMap.value.get("ai-summary-timestamp"));
    const handleAiReviewLinkClick = () => {
    };
    const handleSponsor = () => {
      globalState.toggleSwitcher("sponsorModal", true);
    };
    const handleLike = async (callback) => {
      if (isLiked.value) {
        return false;
      }
      try {
        await articleDetailStore.postArticleLike(article.value.id);
        historyStore.likeArticle(article.value.id);
        callback?.();
      } catch (error) {
        const message = _i18n.t(LocalesKey.POST_ACTION_ERROR);
        logger$2.failure(message, error);
        alert(message);
      }
    };
    const fetchArticleDetail = (articleId) => {
      const commentRequest = commentStore.fetchList({
        target_type: CommentTargetType.Article,
        target_id: articleId
      });
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
      description: article.value?.summary,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article-page" }, _attrs))} data-v-048e5a8a>`);
      _push(ssrRenderComponent(_component_placeholder, { loading: unref(fetching) }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ArticleSkeletons, {
              "social-count": __props.isMobile ? 3 : 8,
              "related-count": __props.isMobile ? 2 : 3
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ArticleSkeletons, {
                "social-count": __props.isMobile ? 3 : 8,
                "related-count": __props.isMobile ? 2 : 3
              }, null, 8, ["social-count", "related-count"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(article)) {
              _push2(`<div data-v-048e5a8a${_scopeId}><div class="module margin background overflow radius-md" data-v-048e5a8a${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleContent, {
                id: ARTICLE_CONTENT_ELEMENT_ID,
                "readmore-id": ARTICLE_READMORE_ELEMENT_ID,
                article: unref(article),
                onRendered: handleContentRendered
              }, createSlots({ _: 2 }, [
                aiSummaryContent.value ? {
                  name: "body-top-extra",
                  fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(ArticleAiSummary, {
                        content: aiSummaryContent.value,
                        provider: aiSummaryProvider.value,
                        model: aiSummaryModel.value,
                        timestamp: aiSummaryTimestamp.value
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(ArticleAiSummary, {
                          content: aiSummaryContent.value,
                          provider: aiSummaryProvider.value,
                          model: aiSummaryModel.value,
                          timestamp: aiSummaryTimestamp.value
                        }, null, 8, ["content", "provider", "model", "timestamp"])
                      ];
                    }
                  }),
                  key: "0"
                } : void 0
              ]), _parent2, _scopeId));
              _push2(`<div class="divider" data-v-048e5a8a${_scopeId}><div class="line" data-v-048e5a8a${_scopeId}></div></div>`);
              _push2(ssrRenderComponent(ArticleMeta, {
                id: ARTICLE_META_ELEMENT_ID,
                article: unref(article),
                plain: __props.isMobile
              }, {
                action: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(ArticleUpvote, {
                      likes: unref(article).stats.likes,
                      "is-liked": isLiked.value,
                      "hidden-sponsor": __props.isMobile,
                      "enabled-parkinson": (unref(globalState).userAgent.isChrome || unref(globalState).userAgent.isFirefox) && !__props.isMobile,
                      onLike: handleLike,
                      onSponsor: handleSponsor
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(ArticleUpvote, {
                        likes: unref(article).stats.likes,
                        "is-liked": isLiked.value,
                        "hidden-sponsor": __props.isMobile,
                        "enabled-parkinson": (unref(globalState).userAgent.isChrome || unref(globalState).userAgent.isFirefox) && !__props.isMobile,
                        onLike: handleLike,
                        onSponsor: handleSponsor
                      }, null, 8, ["likes", "is-liked", "hidden-sponsor", "enabled-parkinson"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="module margin background radius-sm" data-v-048e5a8a${_scopeId}><div class="bridge left" data-v-048e5a8a${_scopeId}></div><div class="bridge right" data-v-048e5a8a${_scopeId}></div>`);
              _push2(ssrRenderComponent(ArticleShare, {
                id: ARTICLE_SHARE_ELEMENT_ID,
                article: unref(article),
                "disabled-image-share": __props.isMobile,
                socials: __props.isMobile ? [unref(SocialMedia).Wechat, unref(SocialMedia).Weibo, unref(SocialMedia).Twitter] : []
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="module margin overflow" data-v-048e5a8a${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleNeighbour, {
                plain: __props.isMobile,
                prev: unref(prevArticle),
                next: unref(nextArticle)
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="module margin overflow" data-v-048e5a8a${_scopeId}>`);
              _push2(ssrRenderComponent(ArticleRelated, {
                id: ARTICLE_RELATED_ELEMENT_ID,
                columns: __props.isMobile ? 2 : 3,
                count: __props.isMobile ? 4 : 6,
                articles: unref(relatedArticles)
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(article) ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "module margin background overflow radius-md" }, [
                  createVNode(ArticleContent, {
                    id: ARTICLE_CONTENT_ELEMENT_ID,
                    "readmore-id": ARTICLE_READMORE_ELEMENT_ID,
                    article: unref(article),
                    onRendered: handleContentRendered
                  }, createSlots({ _: 2 }, [
                    aiSummaryContent.value ? {
                      name: "body-top-extra",
                      fn: withCtx(() => [
                        createVNode(ArticleAiSummary, {
                          content: aiSummaryContent.value,
                          provider: aiSummaryProvider.value,
                          model: aiSummaryModel.value,
                          timestamp: aiSummaryTimestamp.value
                        }, null, 8, ["content", "provider", "model", "timestamp"])
                      ]),
                      key: "0"
                    } : void 0
                  ]), 1032, ["id", "readmore-id", "article"]),
                  createVNode("div", { class: "divider" }, [
                    createVNode("div", { class: "line" })
                  ]),
                  createVNode(ArticleMeta, {
                    id: ARTICLE_META_ELEMENT_ID,
                    article: unref(article),
                    plain: __props.isMobile
                  }, {
                    action: withCtx(() => [
                      createVNode(ArticleUpvote, {
                        likes: unref(article).stats.likes,
                        "is-liked": isLiked.value,
                        "hidden-sponsor": __props.isMobile,
                        "enabled-parkinson": (unref(globalState).userAgent.isChrome || unref(globalState).userAgent.isFirefox) && !__props.isMobile,
                        onLike: handleLike,
                        onSponsor: handleSponsor
                      }, null, 8, ["likes", "is-liked", "hidden-sponsor", "enabled-parkinson"])
                    ]),
                    _: 1
                  }, 8, ["id", "article", "plain"])
                ]),
                createVNode("div", { class: "module margin background radius-sm" }, [
                  createVNode("div", { class: "bridge left" }),
                  createVNode("div", { class: "bridge right" }),
                  createVNode(ArticleShare, {
                    id: ARTICLE_SHARE_ELEMENT_ID,
                    article: unref(article),
                    "disabled-image-share": __props.isMobile,
                    socials: __props.isMobile ? [unref(SocialMedia).Wechat, unref(SocialMedia).Weibo, unref(SocialMedia).Twitter] : []
                  }, null, 8, ["id", "article", "disabled-image-share", "socials"])
                ]),
                createVNode("div", { class: "module margin overflow" }, [
                  createVNode(ArticleNeighbour, {
                    plain: __props.isMobile,
                    prev: unref(prevArticle),
                    next: unref(nextArticle)
                  }, null, 8, ["plain", "prev", "next"])
                ]),
                createVNode("div", { class: "module margin overflow" }, [
                  createVNode(ArticleRelated, {
                    id: ARTICLE_RELATED_ELEMENT_ID,
                    columns: __props.isMobile ? 2 : 3,
                    count: __props.isMobile ? 4 : 6,
                    articles: unref(relatedArticles)
                  }, null, 8, ["id", "columns", "count", "articles"])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="comment" data-v-048e5a8a>`);
      _push(ssrRenderComponent(Comment, {
        "target-type": unref(CommentTargetType).Article,
        "target-id": __props.articleId,
        readonly: unref(article)?.disabled_comments,
        plain: __props.isMobile,
        fetching: unref(fetching)
      }, createSlots({ _: 2 }, [
        aiReviewContent.value && aiReviewProvider.value ? {
          name: "list-top-extra",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(ArticleAiReview, {
                provider: aiReviewProvider.value,
                content: aiReviewContent.value,
                timestamp: aiReviewTimestamp.value,
                model: aiReviewModel.value,
                link: aiReviewLink.value,
                "hidden-avatar": __props.isMobile,
                onClickLink: handleAiReviewLinkClick
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(ArticleAiReview, {
                  provider: aiReviewProvider.value,
                  content: aiReviewContent.value,
                  timestamp: aiReviewTimestamp.value,
                  model: aiReviewModel.value,
                  link: aiReviewLink.value,
                  "hidden-avatar": __props.isMobile,
                  onClickLink: handleAiReviewLinkClick
                }, null, 8, ["provider", "content", "timestamp", "model", "link", "hidden-avatar"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1i = _sfc_main$1i.setup;
_sfc_main$1i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/article/index.vue");
  return _sfc_setup$1i ? _sfc_setup$1i(props, ctx) : void 0;
};
const ArticleDetailPage = /* @__PURE__ */ _export_sfc(_sfc_main$1i, [["__scopeId", "data-v-048e5a8a"]]);
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
const _sfc_main$1h = /* @__PURE__ */ defineComponent({
  __name: "_card",
  __ssrInlineRender: true,
  props: {
    icon: {},
    platform: {},
    href: {},
    loading: { type: Boolean },
    hasData: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "statistics-card" }, _attrs))} data-v-8f64aafb>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: __props.loading,
        "has-data": __props.hasData
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "statistics-empty",
              bold: "",
              size: "large"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "statistics-empty",
                bold: "",
                size: "large"
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="statistics-skeleton" data-v-8f64aafb${_scopeId}>`);
            _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
            _push2(`<!--[-->`);
            ssrRenderList(3, (i) => {
              _push2(ssrRenderComponent(_component_skeleton, {
                class: "line",
                key: i
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "statistics-skeleton" }, [
                createVNode(_component_skeleton, { class: "title" }),
                (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                  return createVNode(_component_skeleton, {
                    class: "line",
                    key: i
                  });
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="statistics-content" data-v-8f64aafb${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "title",
              href: __props.href
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="left" data-v-8f64aafb${_scopeId2}><i class="${ssrRenderClass([__props.icon, "iconfont"])}" data-v-8f64aafb${_scopeId2}></i><span class="text" data-v-8f64aafb${_scopeId2}>${ssrInterpolate(__props.platform)}</span></span><span class="right" data-v-8f64aafb${_scopeId2}><i class="iconfont icon-next" data-v-8f64aafb${_scopeId2}></i></span>`);
                } else {
                  return [
                    createVNode("span", { class: "left" }, [
                      createVNode("i", {
                        class: ["iconfont", __props.icon]
                      }, null, 2),
                      createVNode("span", { class: "text" }, toDisplayString(__props.platform), 1)
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
              createVNode("div", { class: "statistics-content" }, [
                createVNode(_component_ulink, {
                  class: "title",
                  href: __props.href
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "left" }, [
                      createVNode("i", {
                        class: ["iconfont", __props.icon]
                      }, null, 2),
                      createVNode("span", { class: "text" }, toDisplayString(__props.platform), 1)
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
const _sfc_setup$1h = _sfc_main$1h.setup;
_sfc_main$1h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/_card.vue");
  return _sfc_setup$1h ? _sfc_setup$1h(props, ctx) : void 0;
};
const StatisticCard = /* @__PURE__ */ _export_sfc(_sfc_main$1h, [["__scopeId", "data-v-8f64aafb"]]);
const _sfc_main$1g = /* @__PURE__ */ defineComponent({
  __name: "npm",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, isZhLang } = useEnhancer();
    const npmStatisticsStore = useNpmStatisticsStore();
    const isFetching = ref(true);
    onMounted(() => {
      npmStatisticsStore.fetch().finally(() => {
        isFetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StatisticCard, mergeProps({
        class: "npm-statistic",
        icon: "icon-npm",
        loading: isFetching.value,
        "has-data": !!unref(npmStatisticsStore).data,
        href: unref(goLinks).npm,
        platform: unref(isZhLang) ? "我在 NPM" : "NPM"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="line-1" data-v-fd24d747${_scopeId}><i class="iconfont icon-package" data-v-fd24d747${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-fd24d747${_scopeId}>发布了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(npmStatisticsStore).data?.totalPackages
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-fd24d747${_scopeId}>个公共软件包</span>`);
            } else {
              _push2(`<span data-v-fd24d747${_scopeId}>packages</span>`);
            }
            _push2(`</p><p data-v-fd24d747${_scopeId}><i class="iconfont icon-download" data-v-fd24d747${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-fd24d747${_scopeId}>被下载</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(npmStatisticsStore).data?.totalDownloads
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-fd24d747${_scopeId}>次</span>`);
            } else {
              _push2(`<span data-v-fd24d747${_scopeId}> downs</span>`);
            }
            _push2(`</p><p data-v-fd24d747${_scopeId}><i class="iconfont icon-score" data-v-fd24d747${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-fd24d747${_scopeId}>平均评分</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(npmStatisticsStore).data?.averageScore
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-fd24d747${_scopeId}>分</span>`);
            } else {
              _push2(`<span data-v-fd24d747${_scopeId}>average score</span>`);
            }
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", { class: "line-1" }, [
                createVNode("i", { class: "iconfont icon-package" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "发布了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(npmStatisticsStore).data?.totalPackages
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
                  count: unref(npmStatisticsStore).data?.totalDownloads
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "次")) : (openBlock(), createBlock("span", { key: 2 }, " downs"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-score" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "平均评分")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(npmStatisticsStore).data?.averageScore
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
const _sfc_setup$1g = _sfc_main$1g.setup;
_sfc_main$1g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/npm.vue");
  return _sfc_setup$1g ? _sfc_setup$1g(props, ctx) : void 0;
};
const NpmStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$1g, [["__scopeId", "data-v-fd24d747"]]);
const _sfc_main$1f = /* @__PURE__ */ defineComponent({
  __name: "github",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, isZhLang } = useEnhancer();
    const githubStatisticsStore = useGitHubStatisticsStore();
    const isFetching = ref(true);
    onMounted(() => {
      githubStatisticsStore.fetch().finally(() => {
        isFetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(StatisticCard, mergeProps({
        class: "github-statistic",
        icon: "icon-github",
        loading: isFetching.value,
        "has-data": !!unref(githubStatisticsStore).data,
        href: unref(goLinks).github,
        platform: unref(isZhLang) ? "我在 GitHub" : "GitHub"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-1df492f9${_scopeId}><i class="iconfont icon-star-outlined" data-v-1df492f9${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-1df492f9${_scopeId}>共获得</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(githubStatisticsStore).data?.totalStarCount
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-1df492f9${_scopeId}>个 star</span>`);
            } else {
              _push2(`<span data-v-1df492f9${_scopeId}> stars earned</span>`);
            }
            _push2(`</p><p data-v-1df492f9${_scopeId}><i class="iconfont icon-repository" data-v-1df492f9${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-1df492f9${_scopeId}>共维护</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(githubStatisticsStore).data?.repositoryCount
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-1df492f9${_scopeId}>个开源项目</span>`);
            } else {
              _push2(`<span data-v-1df492f9${_scopeId}>open-source repos</span>`);
            }
            _push2(`</p><p data-v-1df492f9${_scopeId}><i class="iconfont icon-organization" data-v-1df492f9${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-1df492f9${_scopeId}>维护/发起</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              count: unref(githubStatisticsStore).data?.organizationCount
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-1df492f9${_scopeId}>个开源组织</span>`);
            } else {
              _push2(`<span data-v-1df492f9${_scopeId}>organizations</span>`);
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
                  count: unref(githubStatisticsStore).data?.totalStarCount
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个 star")) : (openBlock(), createBlock("span", { key: 2 }, " stars earned"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-repository" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "共维护")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(githubStatisticsStore).data?.repositoryCount
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个开源项目")) : (openBlock(), createBlock("span", { key: 2 }, "open-source repos"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-organization" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "维护/发起")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  count: unref(githubStatisticsStore).data?.organizationCount
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
const _sfc_setup$1f = _sfc_main$1f.setup;
_sfc_main$1f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/github.vue");
  return _sfc_setup$1f ? _sfc_setup$1f(props, ctx) : void 0;
};
const GithubStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$1f, [["__scopeId", "data-v-1df492f9"]]);
const _sfc_main$1e = /* @__PURE__ */ defineComponent({
  __name: "threads",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, isZhLang } = useEnhancer();
    const threadsProfileStore = useThreadsProfileStore();
    const isFetching = ref(true);
    const joinedDate = new Date(IDENTITIES.THREADS_JOINED_DATE);
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
      threadsProfileStore.fetch().finally(() => {
        isFetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(ssrRenderComponent(StatisticCard, mergeProps({
        class: "threads-statistic",
        icon: "icon-threads",
        loading: isFetching.value,
        "has-data": !!unref(threadsProfileStore).data,
        href: unref(goLinks).threads,
        platform: unref(isZhLang) ? "我在 Threads" : "Threads"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="line-1" data-v-1da08f3a${_scopeId}><i class="iconfont icon-calendar" data-v-1da08f3a${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_i18n, null, {
              zh: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-1da08f3a${_scopeId2}>活跃了`);
                  _push3(ssrRenderComponent(unref(StatisticCount), { count: unref(totalYears) }, null, _parent3, _scopeId2));
                  _push3(`年</span><span data-v-1da08f3a${_scopeId2}>零`);
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
                  _push3(` Joined ${ssrInterpolate(unref(joinedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" }))}`);
                } else {
                  return [
                    createTextVNode(" Joined " + toDisplayString(unref(joinedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p><p data-v-1da08f3a${_scopeId}><i class="iconfont icon-heart-outlined" data-v-1da08f3a${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-1da08f3a${_scopeId}>共收到</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(threadsProfileStore).data?.totalLikes || "-"
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-1da08f3a${_scopeId}>个按赞</span>`);
            } else {
              _push2(`<span data-v-1da08f3a${_scopeId}> likes earned</span>`);
            }
            _push2(`</p><p data-v-1da08f3a${_scopeId}><i class="iconfont icon-follower" data-v-1da08f3a${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-1da08f3a${_scopeId}>获得了</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              split: "",
              count: unref(threadsProfileStore).data?.followersCount || "-"
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-1da08f3a${_scopeId}>位关注者</span>`);
            } else {
              _push2(`<span data-v-1da08f3a${_scopeId}>followers</span>`);
            }
            _push2(`</p>`);
          } else {
            return [
              createVNode("p", { class: "line-1" }, [
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
                    createTextVNode(" Joined " + toDisplayString(unref(joinedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })), 1)
                  ]),
                  _: 1
                })
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-heart-outlined" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "共收到")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  large: "",
                  primary: "",
                  split: "",
                  count: unref(threadsProfileStore).data?.totalLikes || "-"
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "个按赞")) : (openBlock(), createBlock("span", { key: 2 }, " likes earned"))
              ]),
              createVNode("p", null, [
                createVNode("i", { class: "iconfont icon-follower" }),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 0 }, "获得了")) : createCommentVNode("", true),
                createVNode(unref(StatisticCount), {
                  split: "",
                  count: unref(threadsProfileStore).data?.followersCount || "-"
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
const _sfc_setup$1e = _sfc_main$1e.setup;
_sfc_main$1e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/threads.vue");
  return _sfc_setup$1e ? _sfc_setup$1e(props, ctx) : void 0;
};
const ThreadsStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$1e, [["__scopeId", "data-v-1da08f3a"]]);
const _sfc_main$1d = /* @__PURE__ */ defineComponent({
  __name: "douban",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, isZhLang } = useEnhancer();
    const doubanMoviesStore = useDoubanMoviesStore();
    const isFetching = ref(true);
    const totalSpent = computed(() => Math.trunc(doubanMoviesStore.data?.total_spent ?? 0));
    const weeklyAvg = computed(() => (doubanMoviesStore.data?.weekly_avg ?? 0).toFixed(2));
    onMounted(() => {
      doubanMoviesStore.fetch().finally(() => {
        isFetching.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(ssrRenderComponent(StatisticCard, mergeProps({
        class: "douban-statistic",
        icon: "icon-douban",
        loading: isFetching.value,
        "has-data": !!unref(doubanMoviesStore).data,
        href: unref(goLinks)["douban-movie"],
        platform: unref(isZhLang) ? "我在豆瓣" : "Douban Movie"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p data-v-01e6ba55${_scopeId}><i class="iconfont icon-video-outlined" data-v-01e6ba55${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-01e6ba55${_scopeId}>标记看过</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              large: "",
              primary: "",
              split: "",
              count: unref(doubanMoviesStore).data.total_collections
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-01e6ba55${_scopeId}>部影片</span>`);
            } else {
              _push2(`<span data-v-01e6ba55${_scopeId}> films marked</span>`);
            }
            _push2(`</p><p data-v-01e6ba55${_scopeId}><i class="iconfont icon-clock-outlined" data-v-01e6ba55${_scopeId}></i>`);
            if (unref(isZhLang)) {
              _push2(`<span data-v-01e6ba55${_scopeId}>累计花费</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(StatisticCount), {
              split: "",
              count: totalSpent.value
            }, null, _parent2, _scopeId));
            if (unref(isZhLang)) {
              _push2(`<span data-v-01e6ba55${_scopeId}>小时</span>`);
            } else {
              _push2(`<span data-v-01e6ba55${_scopeId}>hours watching</span>`);
            }
            _push2(`</p><p data-v-01e6ba55${_scopeId}><i class="iconfont icon-week" data-v-01e6ba55${_scopeId}></i>`);
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
                  count: unref(doubanMoviesStore).data.total_collections
                }, null, 8, ["count"]),
                unref(isZhLang) ? (openBlock(), createBlock("span", { key: 1 }, "部影片")) : (openBlock(), createBlock("span", { key: 2 }, " films marked"))
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
const _sfc_setup$1d = _sfc_main$1d.setup;
_sfc_main$1d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/statistic/douban.vue");
  return _sfc_setup$1d ? _sfc_setup$1d(props, ctx) : void 0;
};
const DoubanStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$1d, [["__scopeId", "data-v-01e6ba55"]]);
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
const _sfc_main$1c = /* @__PURE__ */ defineComponent({
  __name: "instagram",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, cdnDomain, isCNUser } = useEnhancer();
    const instagramLatestMediasStore = useInstagramLatestMediasStore();
    const isPageLoading = ref(true);
    const igMedias = computed(() => instagramLatestMediasStore.data?.data.slice(0, 23) ?? []);
    const getMediaThumbnail = (media) => {
      const url = getInstagramCoverURL(media);
      return isCNUser ? getCdnProxyURL(cdnDomain, url) : url;
    };
    onMounted(() => {
      instagramLatestMediasStore.fetch().catch(() => null).finally(() => {
        isPageLoading.value = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(ssrRenderComponent(_component_placeholder, mergeProps({
        loading: isPageLoading.value,
        "has-data": !!igMedias.value.length
      }, _attrs), {
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
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="media-skeleton" data-v-f9716c1d${_scopeId}><!--[-->`);
            ssrRenderList(24, (i) => {
              _push2(`<li class="item" data-v-f9716c1d${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "skeleton" }, null, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "media-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(24, (i) => {
                  return createVNode("li", {
                    class: "item",
                    key: i
                  }, [
                    createVNode(_component_skeleton, { class: "skeleton" })
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="media-list" data-v-f9716c1d${_scopeId}><!--[-->`);
            ssrRenderList(igMedias.value, (media, index) => {
              _push2(`<li class="item" data-v-f9716c1d${_scopeId}>`);
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
                    _push3(`<div class="type-icon" data-v-f9716c1d${_scopeId2}>`);
                    if (unref(isVideoMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-video" data-v-f9716c1d${_scopeId2}></i>`);
                    } else if (unref(isAlbumMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-album" data-v-f9716c1d${_scopeId2}></i>`);
                    } else {
                      _push3(`<i class="iconfont icon-camera" data-v-f9716c1d${_scopeId2}></i>`);
                    }
                    _push3(`</div><div class="mask" data-v-f9716c1d${_scopeId2}>`);
                    if (unref(isVideoMediaIns)(media)) {
                      _push3(`<i class="iconfont icon-music-play" data-v-f9716c1d${_scopeId2}></i>`);
                    } else {
                      _push3(`<i class="iconfont icon-eye" data-v-f9716c1d${_scopeId2}></i>`);
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
            _push2(`<!--]--><li class="item" data-v-f9716c1d${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link more",
              href: unref(goLinks).instagram
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
              createVNode("ul", { class: "media-list" }, [
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
                    href: unref(goLinks).instagram
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
const _sfc_setup$1c = _sfc_main$1c.setup;
_sfc_main$1c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/media/instagram.vue");
  return _sfc_setup$1c ? _sfc_setup$1c(props, ctx) : void 0;
};
const InstagramMedia$1 = /* @__PURE__ */ _export_sfc(_sfc_main$1c, [["__scopeId", "data-v-f9716c1d"]]);
const _sfc_main$1b = /* @__PURE__ */ defineComponent({
  __name: "youtube",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks } = useEnhancer();
    const youtubePlayListStore = useYouTubePlayListStore();
    onMounted(() => youtubePlayListStore.fetch().catch(() => []));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube" }, _attrs))} data-v-511ebff4>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: unref(youtubePlayListStore).fetching,
        "has-data": !!unref(youtubePlayListStore).data.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "playlist-empty",
              size: "large",
              bold: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "playlist-empty",
                size: "large",
                bold: ""
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="playlist-skeleton" data-v-511ebff4${_scopeId}><!--[-->`);
            ssrRenderList(6, (i) => {
              _push2(ssrRenderComponent(_component_skeleton, {
                class: "item",
                key: i
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "playlist-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                  return createVNode(_component_skeleton, {
                    class: "item",
                    key: i
                  });
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="playlist-list" data-v-511ebff4${_scopeId}><!--[-->`);
            ssrRenderList(unref(youtubePlayListStore).data.slice(0, 5), (item, index) => {
              _push2(`<li class="item"${ssrRenderAttr("title", item.snippet.title)} data-v-511ebff4${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ulink, {
                class: "link",
                href: unref(getYouTubePlaylistURL)(item.id)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_uimage, {
                      class: "cover",
                      proxy: "",
                      src: item.snippet.thumbnails.medium.url
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="count" data-v-511ebff4${_scopeId2}><i class="iconfont icon-video" data-v-511ebff4${_scopeId2}></i><span class="number" data-v-511ebff4${_scopeId2}>${ssrInterpolate(item.contentDetails.itemCount)}</span></span><p class="title" data-v-511ebff4${_scopeId2}><i class="iconfont icon-playlist" data-v-511ebff4${_scopeId2}></i><span class="text" data-v-511ebff4${_scopeId2}>${ssrInterpolate(item.snippet.title)}</span></p><div class="mask" data-v-511ebff4${_scopeId2}><i class="iconfont icon-music-play" data-v-511ebff4${_scopeId2}></i></div>`);
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
                        createVNode("i", { class: "iconfont icon-music-play" })
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--><li class="item" data-v-511ebff4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link more",
              href: unref(goLinks).youtube
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconfont icon-youtube" data-v-511ebff4${_scopeId2}></i><span class="username" data-v-511ebff4${_scopeId2}>${ssrInterpolate(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID)}</span><span class="text" data-v-511ebff4${_scopeId2}>•••</span>`);
                } else {
                  return [
                    createVNode("i", { class: "iconfont icon-youtube" }),
                    createVNode("span", { class: "username" }, toDisplayString(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID), 1),
                    createVNode("span", { class: "text" }, "•••")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li></ul>`);
          } else {
            return [
              createVNode("ul", { class: "playlist-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(youtubePlayListStore).data.slice(0, 5), (item, index) => {
                  return openBlock(), createBlock("li", {
                    class: "item",
                    title: item.snippet.title,
                    key: index
                  }, [
                    createVNode(_component_ulink, {
                      class: "link",
                      href: unref(getYouTubePlaylistURL)(item.id)
                    }, {
                      default: withCtx(() => [
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
                          createVNode("i", { class: "iconfont icon-music-play" })
                        ])
                      ]),
                      _: 2
                    }, 1032, ["href"])
                  ], 8, ["title"]);
                }), 128)),
                createVNode("li", { class: "item" }, [
                  createVNode(_component_ulink, {
                    class: "link more",
                    href: unref(goLinks).youtube
                  }, {
                    default: withCtx(() => [
                      createVNode("i", { class: "iconfont icon-youtube" }),
                      createVNode("span", { class: "username" }, toDisplayString(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID), 1),
                      createVNode("span", { class: "text" }, "•••")
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1b = _sfc_main$1b.setup;
_sfc_main$1b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/media/youtube.vue");
  return _sfc_setup$1b ? _sfc_setup$1b(props, ctx) : void 0;
};
const YoutubeMedia = /* @__PURE__ */ _export_sfc(_sfc_main$1b, [["__scopeId", "data-v-511ebff4"]]);
const useArticlesCalendarStore = defineStore("articlesCalendar", () => {
  return createFetchStore({
    once: true,
    data: [],
    async fetcher() {
      const response = await nodepress$1.get("/articles/calendar", {
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
const _sfc_main$1a = /* @__PURE__ */ defineComponent({
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
    const total = computed(() => props.articles + props.threads + props.contributions + props.instagrams);
    const getPointHeightStyle = (value) => {
      return isNaN(value) ? 0 : `${Math.floor(value * 100)}%`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "day",
        "data-date": __props.date,
        "data-total-count": total.value,
        "data-article-count": __props.articles,
        "data-thread-count": __props.threads,
        "data-instagram-count": __props.instagrams,
        "data-contribution-count": __props.contributions
      }, _attrs))} data-v-39f6ac60><div class="point" data-v-39f6ac60><div class="item article" style="${ssrRenderStyle({ height: getPointHeightStyle(__props.articles / total.value) })}" data-v-39f6ac60></div><div class="item threads" style="${ssrRenderStyle({ height: getPointHeightStyle(__props.threads / total.value) })}" data-v-39f6ac60></div><div class="item instagram" style="${ssrRenderStyle({ height: getPointHeightStyle(__props.instagrams / total.value) })}" data-v-39f6ac60></div><div class="item contribution" style="${ssrRenderStyle({
        height: getPointHeightStyle(__props.contributions / total.value),
        backgroundColor: __props.githubColor
      })}" data-v-39f6ac60></div></div>`);
      if (total.value) {
        _push(`<div class="tooltip" data-v-39f6ac60><p class="date" data-v-39f6ac60>${ssrInterpolate(__props.date)}</p><ul class="counts" data-v-39f6ac60><li class="item article" data-v-39f6ac60><i class="iconfont icon-quill" data-v-39f6ac60></i><span class="count" data-v-39f6ac60>${ssrInterpolate(__props.articles)}</span> articles </li><li class="item thread" data-v-39f6ac60><i class="iconfont icon-threads" data-v-39f6ac60></i><span class="count" data-v-39f6ac60>${ssrInterpolate(__props.threads)}</span> threads </li><li class="item instagram" data-v-39f6ac60><i class="iconfont icon-instagram" data-v-39f6ac60></i><span class="count" data-v-39f6ac60>${ssrInterpolate(__props.instagrams)}</span> instagrams </li><li class="item contribution" data-v-39f6ac60><i class="iconfont icon-github" data-v-39f6ac60></i><span class="count" data-v-39f6ac60>${ssrInterpolate(__props.contributions)}</span> contributions </li></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1a = _sfc_main$1a.setup;
_sfc_main$1a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/calendar/day.vue");
  return _sfc_setup$1a ? _sfc_setup$1a(props, ctx) : void 0;
};
const CalendarDay = /* @__PURE__ */ _export_sfc(_sfc_main$1a, [["__scopeId", "data-v-39f6ac60"]]);
const _sfc_main$19 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useEnhancer();
    const githubCalendarStore = useGitHubCalendarStore();
    const articlesCalendarStore = useArticlesCalendarStore();
    const instagramCalendarStore = useInstagramCalendarStore();
    const githubContributionsMap = computed(() => {
      return new Map(githubCalendarStore.days.map((day) => [day.date, day]));
    });
    const getDayContributions = (date) => {
      return githubContributionsMap.value.get(date)?.count || 0;
    };
    const getDayGitHubColor = (date) => {
      return githubContributionsMap.value.get(date)?.color;
    };
    const getDayInstagrams = (date) => {
      return instagramCalendarStore.data.find((i) => i.date === date)?.count || 0;
    };
    const getDayArticles = (date) => {
      return articlesCalendarStore.data.find((i) => i.date === date)?.count || 0;
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
      githubCalendarStore.fetch();
      instagramCalendarStore.fetch();
      articlesCalendarStore.fetch();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "aggregate-calendar" }, _attrs))} data-v-57d9b2df><!--[-->`);
      ssrRenderList(months, (month, index) => {
        _push(`<li class="month" data-v-57d9b2df><!--[-->`);
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
const _sfc_setup$19 = _sfc_main$19.setup;
_sfc_main$19.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/calendar/index.vue");
  return _sfc_setup$19 ? _sfc_setup$19(props, ctx) : void 0;
};
const AggregateCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$19, [["__scopeId", "data-v-57d9b2df"]]);
const importMapbox = () => {
  Promise.resolve().then(() => mapboxGl);
  return Promise.all([
    import("mapbox-gl").then((result) => result.default),
    new Promise((resolve) => window.setTimeout(resolve, 460))
  ]).then(([mapboxgl]) => mapboxgl);
};
const addLivingMarkerToMap = (lib, map, coordinates) => {
  return new lib.Marker({
    color: APP_CONFIG.primary_color,
    anchor: "bottom"
  }).setLngLat(coordinates).addTo(map);
};
const _sfc_main$18 = /* @__PURE__ */ defineComponent({
  __name: "box-base",
  __ssrInlineRender: true,
  emits: ["load", "style-load"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { theme, appConfig } = useEnhancer();
    const container = shallowRef();
    const lib = shallowRef();
    const map = shallowRef();
    const getMapStyle = () => {
      return theme.isDark.value ? MAPBOX_CONFIG.STYLE_DARK : MAPBOX_CONFIG.STYLE_LIGHT;
    };
    onBeforeMount(() => {
      watch(
        () => theme.theme.value,
        () => map.value?.setStyle(getMapStyle())
      );
    });
    onBeforeUnmount(() => {
      map.value?.remove();
    });
    onMounted(async () => {
      const _lib = await importMapbox();
      _lib.accessToken = MAPBOX_CONFIG.TOKEN;
      if (!container.value) return;
      const _map = new _lib.Map({
        container: container.value,
        center: MAPBOX_CONFIG.CENTER,
        zoom: MAPBOX_CONFIG.ZOOM,
        minZoom: 2.2,
        attributionControl: false,
        style: getMapStyle()
      });
      if (appConfig.value.ABOUT_GEO_COORDINATES) {
        addLivingMarkerToMap(_lib, _map, appConfig.value.ABOUT_GEO_COORDINATES);
      }
      _map.on("style.load", () => {
        emit("style-load", { map: _map, lib: _lib });
      });
      _map.on("load", () => {
        emit("load", { map: _map, lib: _lib });
      });
      lib.value = _lib;
      map.value = _map;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "mapbox",
        ref_key: "container",
        ref: container
      }, _attrs))} data-v-e52e76eb></div>`);
    };
  }
});
const _sfc_setup$18 = _sfc_main$18.setup;
_sfc_main$18.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/footprint/box-base.vue");
  return _sfc_setup$18 ? _sfc_setup$18(props, ctx) : void 0;
};
const Mapbox = /* @__PURE__ */ _export_sfc(_sfc_main$18, [["__scopeId", "data-v-e52e76eb"]]);
const PLACEMARK_LAYER_ID = "placemarks";
const useMapPlacemarks = () => {
  const kmlJson = shallowRef(null);
  const fetchKmlJson = () => {
    return kmlJson.value ? Promise.resolve() : tunnel$1.fetch(TunnelModule.MyGoogleMap).then((data) => {
      kmlJson.value = data;
    });
  };
  const folders = computed(() => {
    const folderData = kmlJson.value?.Folder;
    const foldersArray = Array.isArray(folderData) ? folderData : folderData ? [folderData] : [];
    foldersArray.reverse();
    return foldersArray.map((folder, fi) => {
      const placemark = folder.Placemark ?? [];
      const placemarks = Array.isArray(placemark) ? placemark : [placemark];
      return {
        name: folder.name,
        placemarks: placemarks.map((placemark2, pi) => {
          const [longitude, latitude] = placemark2.Point.coordinates.split(",").map(Number);
          return {
            index: pi,
            id: `placemark-${fi}-${pi}`,
            icon: "veterinary",
            name: placemark2.name,
            description: placemark2.description,
            coordinates: [longitude, latitude]
          };
        })
      };
    });
  });
  const geoJson = computed(() => ({
    type: "FeatureCollection",
    features: folders.value.map((folder) => folder.placemarks).flat().map((placemark) => {
      const { coordinates, ...properties } = placemark;
      return {
        type: "Feature",
        properties,
        geometry: {
          type: "Point",
          coordinates
        }
      };
    })
  }));
  return {
    kmlJson,
    fetchKmlJson,
    folders,
    geoJson
  };
};
const createPlacemarkPopup = (lib, coordinates, content) => {
  return new lib.Popup({ closeButton: false, offset: [0, -16], maxWidth: `280px` }).setLngLat(coordinates).setHTML(content ? markdownToHTML(content) : "-");
};
const addPlacemarksLayerToMap = (lib, map, geoJson) => {
  if (!geoJson.features.length) return;
  if (map.getLayer(PLACEMARK_LAYER_ID)) return;
  map.addLayer({
    id: PLACEMARK_LAYER_ID,
    source: {
      type: "geojson",
      data: geoJson
    },
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
  });
  map.on("mouseenter", PLACEMARK_LAYER_ID, () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", PLACEMARK_LAYER_ID, () => {
    map.getCanvas().style.cursor = "";
  });
  map.on("click", PLACEMARK_LAYER_ID, (event) => {
    const coordinates = event.features[0].geometry.coordinates.slice();
    const description = event.features[0].properties.description;
    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    createPlacemarkPopup(lib, coordinates, description).addTo(map);
  });
};
const getTransportIconName = (transport) => {
  if (transport === -1) return "icon-meditation";
  if (transport === 0) return "icon-route";
  if (transport === 1) return "icon-transport-flight";
  if (transport === 2) return "icon-transport-train";
  if (transport === 3) return "icon-transport-bus";
  if (transport === 4) return "icon-transport-ship";
  if (transport === 5) return "icon-transport-motocycle";
  if (transport === 6) return "icon-transport-bicycle";
  if (transport === 7) return "icon-transport-walk";
  if (transport === 8) return "icon-transport-hiking";
  return "icon-route";
};
const getCoordinatesBounds = (coordinates) => {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  for (const [lng, lat] of coordinates) {
    if (lng < minLng) minLng = lng;
    if (lat < minLat) minLat = lat;
    if (lng > maxLng) maxLng = lng;
    if (lat > maxLat) maxLat = lat;
  }
  return [
    [minLng, minLat],
    [maxLng, maxLat]
  ];
};
const getFlatSegmentId = (tripId, index) => `${tripId}-${index}`;
const getSegmentLineId = (segmentId) => `trip-segment-line-${segmentId}`;
const getSegmentLineHighlightId = (segmentId) => `${getSegmentLineId(segmentId)}-highlight`;
const getSegmentLineActiveId = (segmentId) => `${getSegmentLineId(segmentId)}-active`;
const getSegmentPointsId = (segmentId) => `trip-segment-points-${segmentId}}`;
const getSegmentPointsActiveId = (segmentId) => `${getSegmentPointsId(segmentId)}-active`;
const lastActiveSegmentId = shallowRef(null);
const resetActiveTripSegment = (map) => {
  if (lastActiveSegmentId.value) {
    map.setLayoutProperty(getSegmentLineHighlightId(lastActiveSegmentId.value), "visibility", "none");
    map.setLayoutProperty(getSegmentLineActiveId(lastActiveSegmentId.value), "visibility", "none");
    map.setLayoutProperty(getSegmentPointsActiveId(lastActiveSegmentId.value), "visibility", "none");
    lastActiveSegmentId.value = null;
  }
};
const activateTripSegment = (map, segment) => {
  resetActiveTripSegment(map);
  if (!segment.coordinates.length) return;
  lastActiveSegmentId.value = segment.id;
  map.setLayoutProperty(getSegmentLineHighlightId(segment.id), "visibility", "visible");
  map.setLayoutProperty(getSegmentLineActiveId(segment.id), "visibility", "visible");
  map.setLayoutProperty(getSegmentPointsActiveId(segment.id), "visibility", "visible");
  map.fitBounds(getCoordinatesBounds(segment.coordinates), {
    maxDuration: 8e3,
    padding: {
      top: 80,
      bottom: 80,
      left: 80,
      right: 380
    }
  });
};
const useMapTripSegments = () => {
  const configJson = shallowRef([]);
  const fetchConfigJson = () => {
    return configJson.value.length ? Promise.resolve() : vanilla.get(`${API_CONFIG.STATIC}/data/footprint-trips.json`).then((result) => {
      configJson.value = result.data;
    });
  };
  const flatSegments = computed(() => {
    return configJson.value.flatMap((trip) => {
      return trip.segments.map((segment, index) => ({
        ...segment,
        id: getFlatSegmentId(trip.id, index),
        tripId: trip.id,
        tripName: trip.name
      }));
    });
  });
  const flatSegmentsMap = computed(() => {
    return new Map(flatSegments.value.map((r) => [r.id, r]));
  });
  const geoJson = computed(() => {
    return flatSegments.value.map((segment) => {
      const { coordinates, ...baseProperties } = segment;
      const startPoint = segment.coordinates[0];
      const endPoint = segment.coordinates.at(-1);
      return {
        id: segment.id,
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            id: getSegmentLineId(segment.id),
            properties: {
              ...baseProperties,
              role: "line"
            },
            geometry: {
              type: "LineString",
              coordinates
            }
          },
          {
            type: "Feature",
            id: getSegmentPointsId(segment.id),
            properties: {
              ...baseProperties,
              role: "points"
            },
            geometry: {
              type: "MultiPoint",
              coordinates: [startPoint, endPoint]
            }
          }
        ]
      };
    });
  });
  return {
    configJson,
    fetchConfigJson,
    flatSegments,
    flatSegmentsMap,
    geoJson
  };
};
const addTripSegmentsLayersToMap = (map, flatSegments, segmentsMap, geoJson) => {
  geoJson.forEach((collection) => {
    if (!map.getSource(collection.id)) {
      map.addSource(collection.id, {
        type: "geojson",
        data: collection
      });
    }
    if (!map.getLayer(getSegmentLineId(collection.id))) {
      map.addLayer({
        id: getSegmentLineId(collection.id),
        type: "line",
        source: collection.id,
        filter: ["==", ["get", "role"], "line"],
        layout: {
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": APP_CONFIG.primary_color,
          "line-width": 3,
          "line-dasharray": [1, 2],
          "line-opacity": 0.2
        }
      });
      map.addLayer({
        id: getSegmentLineHighlightId(collection.id),
        type: "line",
        source: collection.id,
        filter: ["==", ["get", "role"], "line"],
        layout: {
          visibility: "none",
          "line-join": "round",
          "line-cap": "round"
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 6,
          "line-opacity": 0.8
        }
      });
      map.addLayer({
        id: getSegmentLineActiveId(collection.id),
        type: "line",
        source: collection.id,
        filter: ["==", ["get", "role"], "line"],
        layout: {
          visibility: "none"
        },
        paint: {
          "line-color": APP_CONFIG.primary_color,
          "line-width": 4,
          "line-opacity": 1
        }
      });
      map.addLayer({
        id: getSegmentPointsId(collection.id),
        type: "circle",
        source: collection.id,
        filter: ["==", ["get", "role"], "points"],
        paint: {
          "circle-radius": 6,
          "circle-color": APP_CONFIG.primary_color,
          "circle-opacity": 0.4,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2,
          "circle-stroke-opacity": 0.3
        }
      });
      map.addLayer({
        id: getSegmentPointsActiveId(collection.id),
        type: "circle",
        source: collection.id,
        filter: ["==", ["get", "role"], "points"],
        layout: {
          visibility: "none"
        },
        paint: {
          "circle-radius": 8,
          "circle-color": APP_CONFIG.primary_color,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 3
        }
      });
    }
  });
  const touchableLayerIds = geoJson.map((collection) => collection.id).flatMap((id) => [
    getSegmentLineId(id),
    getSegmentLineHighlightId(id),
    getSegmentLineActiveId(id),
    getSegmentPointsId(id),
    getSegmentPointsActiveId(id)
  ]);
  map.on("click", (e) => {
    const features = map.queryRenderedFeatures(e.point, { layers: touchableLayerIds });
    if (features.length) {
      const segmentId = features[0].properties?.id;
      const segment = segmentsMap.get(segmentId);
      if (segment) {
        activateTripSegment(map, segment);
      }
    } else {
      resetActiveTripSegment(map);
    }
  });
};
const useAdminAvatar = (avatar) => {
  return avatar || getAssetURL(useCdnDomain(), "/images/anonymous.png");
};
const useAboutPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer();
  const adminProfileStore = useAdminProfileStore();
  return usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocalesKey.PAGE_ABOUT, Language.English));
    const titles = isZhLang.value ? [i18n.t(LocalesKey.PAGE_ABOUT), enTitle] : [enTitle];
    const description = `${isZhLang.value ? "关于" : "About"} ${APP_PROFILE.author}`;
    return {
      pageTitles: titles,
      description,
      ogType: "profile",
      ogImage: adminProfileStore.data?.avatar_url
    };
  });
};
const i18ns = {
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
  footprintTitle: {
    [Language.Chinese]: "行脚所至",
    [Language.English]: "On the Way"
  },
  footprintDescription: {
    [Language.Chinese]: "路为纸，地成册；思无界，行有疆",
    [Language.English]: "Not arrival, but passing through."
  }
};
const _sfc_main$17 = /* @__PURE__ */ defineComponent({
  __name: "box-modal",
  __ssrInlineRender: true,
  setup(__props) {
    const loaded = shallowRef(false);
    const lib = shallowRef();
    const map = shallowRef();
    const mapPms = useMapPlacemarks();
    const mapTss = useMapTripSegments();
    const handleMapboxLoad = (payload) => {
      lib.value = payload.lib;
      map.value = payload.map;
      const pmsRequest = mapPms.fetchKmlJson();
      const tssRequest = mapTss.fetchConfigJson().then(() => {
        addTripSegmentsLayersToMap(
          payload.map,
          mapTss.flatSegments.value,
          mapTss.flatSegmentsMap.value,
          mapTss.geoJson.value
        );
      });
      Promise.all([pmsRequest, tssRequest]).finally(() => {
        addPlacemarksLayerToMap(payload.lib, payload.map, mapPms.geoJson.value);
        loaded.value = true;
      });
    };
    onMounted(() => {
      mapPms.fetchKmlJson();
      mapTss.fetchConfigJson();
    });
    onBeforeUnmount(() => {
      resetActiveTripSegment(map.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "modal" }, _attrs))} data-v-3d13333b>`);
      _push(ssrRenderComponent(Mapbox, {
        class: "mapbox",
        onLoad: handleMapboxLoad
      }, null, _parent));
      _push(`<div class="panel" data-v-3d13333b><div class="head" data-v-3d13333b><h3 class="title" data-v-3d13333b>`);
      _push(ssrRenderComponent(_component_i18n, unref(i18ns).footprintTitle, null, _parent));
      _push(`</h3><p class="description" data-v-3d13333b>`);
      _push(ssrRenderComponent(_component_i18n, unref(i18ns).footprintDescription, null, _parent));
      _push(`</p></div>`);
      if (!loaded.value) {
        _push(`<div class="content-skeleton" data-v-3d13333b><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(ssrRenderComponent(_component_skeleton, {
            class: "line",
            key: i
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="content" data-v-3d13333b><ul class="group-list" data-v-3d13333b><!--[-->`);
        ssrRenderList(unref(mapTss).configJson.value, (trip) => {
          _push(`<li class="group" data-v-3d13333b><h5 class="title" data-v-3d13333b><i class="iconfont icon-route" data-v-3d13333b></i><span class="text" data-v-3d13333b>${ssrInterpolate(trip.name)}</span></h5><ul class="child-list" data-v-3d13333b><!--[-->`);
          ssrRenderList(trip.segments, (segment, index) => {
            _push(`<li class="${ssrRenderClass([{ actived: unref(getFlatSegmentId)(trip.id, index) === unref(lastActiveSegmentId) }, "item"])}"${ssrRenderAttr("title", segment.name)} data-v-3d13333b><i class="${ssrRenderClass([unref(getTransportIconName)(segment.transport), "iconfont"])}" data-v-3d13333b></i><span class="text" data-v-3d13333b>${ssrInterpolate(segment.name)}</span></li>`);
          });
          _push(`<!--]--></ul></li>`);
        });
        _push(`<!--]--></ul><ul class="group-list" data-v-3d13333b><!--[-->`);
        ssrRenderList(unref(mapPms).folders.value, (folder, index) => {
          _push(`<li class="group" data-v-3d13333b><h5 class="title" data-v-3d13333b><i class="iconfont icon-map" data-v-3d13333b></i><span class="text" data-v-3d13333b>${ssrInterpolate(folder.name)}</span><span class="count" data-v-3d13333b>(${ssrInterpolate(folder.placemarks.length)})</span></h5>`);
          if (!folder.placemarks.length) {
            _push(`<div class="empty" data-v-3d13333b>null</div>`);
          } else {
            _push(`<ul class="child-list placemarks" data-v-3d13333b><!--[-->`);
            ssrRenderList(folder.placemarks, (placemark, i) => {
              _push(`<li class="item"${ssrRenderAttr("title", placemark.name)} data-v-3d13333b>`);
              _push(ssrRenderComponent(_component_uimage, {
                class: "img-icon",
                cdn: true,
                src: "/images/third-party/mapbox-veterinary.svg"
              }, null, _parent));
              _push(`<span class="text" data-v-3d13333b>${ssrInterpolate(placemark.name)}</span></li>`);
            });
            _push(`<!--]--></ul>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$17 = _sfc_main$17.setup;
_sfc_main$17.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/footprint/box-modal.vue");
  return _sfc_setup$17 ? _sfc_setup$17(props, ctx) : void 0;
};
const MapboxModal = /* @__PURE__ */ _export_sfc(_sfc_main$17, [["__scopeId", "data-v-3d13333b"]]);
const _sfc_main$16 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { appConfig } = useEnhancer();
    const modalVisible = shallowRef(false);
    const map = shallowRef();
    const handleMapboxLoad = (payload) => {
      map.value = payload.map;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_ulink = resolveComponent("ulink");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "footprint-map" }, _attrs))} data-v-74d6b531>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: modalVisible.value,
              "onUpdate:visible": ($event) => modalVisible.value = $event,
              "body-scrollable": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(MapboxModal, { class: "footprint-modal" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(MapboxModal, { class: "footprint-modal" })
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
                "body-scrollable": false
              }, {
                default: withCtx(() => [
                  createVNode(MapboxModal, { class: "footprint-modal" })
                ]),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mapbox-wrapper" data-v-74d6b531>`);
      _push(ssrRenderComponent(Mapbox, {
        class: "mapbox",
        onLoad: handleMapboxLoad
      }, null, _parent));
      _push(`<div class="toolbar" data-v-74d6b531>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: unref(RESOURCE_LINKS).GOOGLE_MY_MAP
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-google-maps" data-v-74d6b531${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-google-maps" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="button" data-v-74d6b531><i class="iconfont icon-fullscreen" data-v-74d6b531></i></button></div></div><div class="legends" data-v-74d6b531><div class="buttons" data-v-74d6b531><button class="item" data-v-74d6b531><i class="iconfont icon-location" data-v-74d6b531></i><span class="text" data-v-74d6b531>`);
      if (unref(appConfig).ABOUT_GEO_TITLE_ZH || unref(appConfig).ABOUT_GEO_TITLE_EN) {
        _push(ssrRenderComponent(_component_i18n, {
          zh: unref(appConfig).ABOUT_GEO_TITLE_ZH,
          en: unref(appConfig).ABOUT_GEO_TITLE_EN
        }, null, _parent));
      } else {
        _push(`<!--[-->-<!--]-->`);
      }
      _push(`</span></button><div class="divider" data-v-74d6b531></div><button class="item" data-v-74d6b531><i class="iconfont icon-route" data-v-74d6b531></i><span class="text" data-v-74d6b531>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "我的旅行足迹",
        en: "My Journeys"
      }, null, _parent));
      _push(`</span></button></div><div class="links" data-v-74d6b531>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item",
        href: "https://goo.gl/maps/fzHHMCjuSbbJgBVt9"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-map" data-v-74d6b531${_scopeId}></i><span class="text" data-v-74d6b531${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "我的美食地图",
              en: "My Foodie Map"
            }, null, _parent2, _scopeId));
            _push2(`<i class="new-window-icon iconfont icon-new-window-s" data-v-74d6b531${_scopeId}></i></span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-map" }),
              createVNode("span", { class: "text" }, [
                createVNode(_component_i18n, {
                  zh: "我的美食地图",
                  en: "My Foodie Map"
                }),
                createVNode("i", { class: "new-window-icon iconfont icon-new-window-s" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item",
        href: "https://google.com/maps/contrib/101107919754452588990/reviews"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-map" data-v-74d6b531${_scopeId}></i><span class="text" data-v-74d6b531${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "我的环球点评",
              en: "My Map Reviews"
            }, null, _parent2, _scopeId));
            _push2(`<i class="new-window-icon iconfont icon-new-window-s" data-v-74d6b531${_scopeId}></i></span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-map" }),
              createVNode("span", { class: "text" }, [
                createVNode(_component_i18n, {
                  zh: "我的环球点评",
                  en: "My Map Reviews"
                }),
                createVNode("i", { class: "new-window-icon iconfont icon-new-window-s" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item",
        href: "https://goo.gl/maps/kLVRWTMhZbbY4DNa7"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-map" data-v-74d6b531${_scopeId}></i><span class="text" data-v-74d6b531${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "我去过的地方",
              en: "Places I've Been"
            }, null, _parent2, _scopeId));
            _push2(`<i class="new-window-icon iconfont icon-new-window-s" data-v-74d6b531${_scopeId}></i></span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-map" }),
              createVNode("span", { class: "text" }, [
                createVNode(_component_i18n, {
                  zh: "我去过的地方",
                  en: "Places I've Been"
                }),
                createVNode("i", { class: "new-window-icon iconfont icon-new-window-s" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "item",
        href: "https://goo.gl/maps/SpB4JJm9HYUiqjtc6"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-map" data-v-74d6b531${_scopeId}></i><span class="text" data-v-74d6b531${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "我想去的地方",
              en: "Places I Want to Go"
            }, null, _parent2, _scopeId));
            _push2(`<i class="new-window-icon iconfont icon-new-window-s" data-v-74d6b531${_scopeId}></i></span>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-map" }),
              createVNode("span", { class: "text" }, [
                createVNode(_component_i18n, {
                  zh: "我想去的地方",
                  en: "Places I Want to Go"
                }),
                createVNode("i", { class: "new-window-icon iconfont icon-new-window-s" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$16 = _sfc_main$16.setup;
_sfc_main$16.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/footprint/index.vue");
  return _sfc_setup$16 ? _sfc_setup$16(props, ctx) : void 0;
};
const FootprintMap = /* @__PURE__ */ _export_sfc(_sfc_main$16, [["__scopeId", "data-v-74d6b531"]]);
const getEmailLink = (email) => {
  if (typeof email === "string") {
    return `mailto:${email}`;
  }
  const { email: _email, ...content } = email;
  return `mailto:${_email}?` + stringify(content);
};
const _sfc_main$15 = /* @__PURE__ */ defineComponent({
  __name: "banner",
  __ssrInlineRender: true,
  emits: ["gTagEvent"],
  setup(__props, { emit: __emit }) {
    const { globalState, appOptions, appConfig, goLinks, cdnDomain, isZhLang } = useEnhancer();
    const adminProfileStore = useAdminProfileStore();
    const emailLink = getEmailLink({
      email: appOptions.value?.site_email,
      subject: `Hello, ${APP_PROFILE.author}!`,
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-banner" }, _attrs))} data-v-f2416b14><div class="background" data-v-f2416b14><video class="video" loop muted autoplay${ssrIncludeBooleanAttr(false) ? " controls" : ""}${ssrRenderAttr("src", unref(getAssetURL)(unref(cdnDomain), "/videos/clips/ocean-6.mp4"))} data-v-f2416b14></video></div><div class="content" data-v-f2416b14><div class="fullwidth" data-v-f2416b14><div class="profile" data-v-f2416b14><div class="avatar" data-v-f2416b14>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "image",
        src: unref(useAdminAvatar)(unref(adminProfileStore).data?.avatar_url)
      }, null, _parent));
      _push(`</div><div class="infos" data-v-f2416b14><h1 class="name" data-v-f2416b14>${ssrInterpolate(unref(adminProfileStore).data?.name || "-")}</h1><h4 class="slogan" data-v-f2416b14>${ssrInterpolate(unref(adminProfileStore).data?.slogan || "-")}</h4></div></div><h3 class="description" data-v-f2416b14>`);
      _push(ssrRenderComponent(_component_webfont, { bolder: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isZhLang) ? unref(APP_PROFILE).description_zh : unref(APP_PROFILE).description_en)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isZhLang) ? unref(APP_PROFILE).description_zh : unref(APP_PROFILE).description_en), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h3><div class="socials" data-v-f2416b14>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item icon-only instagram",
        title: "Instagram",
        href: unref(goLinks).instagram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-instagram" data-v-f2416b14${_scopeId}></i>`);
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
        href: unref(goLinks).threads
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-threads" data-v-f2416b14${_scopeId}></i>`);
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
        href: unref(goLinks).github
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-f2416b14${_scopeId}></i><span class="text" data-v-f2416b14${_scopeId}>GitHub</span>`);
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
        href: unref(goLinks).youtube
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-youtube" data-v-f2416b14${_scopeId}></i>`);
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
        href: unref(goLinks).telegram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-f2416b14${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-telegram" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="item icon-only wechat" title="WeChat" data-v-f2416b14><i class="iconfont icon-wechat" data-v-f2416b14></i>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: wechatModalOpened.value,
              "onUpdate:visible": ($event) => wechatModalOpened.value = $event,
              "body-scrollable": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="qrcode-modal wechat" data-v-f2416b14${_scopeId2}><div class="background" data-v-f2416b14${_scopeId2}></div>`);
                  _push3(ssrRenderComponent(_component_uimage, {
                    class: "image",
                    cdn: "",
                    src: "/images/qrcodes/wechat.webp"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span class="text" data-v-f2416b14${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_i18n, null, {
                    en: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Friend me on WeChat`);
                      } else {
                        return [
                          createTextVNode("Friend me on WeChat")
                        ];
                      }
                    }),
                    zh: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`扫码加微 ｜ 解锁灵魂`);
                      } else {
                        return [
                          createTextVNode("扫码加微 ｜ 解锁灵魂")
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
                            createTextVNode("Friend me on WeChat")
                          ]),
                          zh: withCtx(() => [
                            createTextVNode("扫码加微 ｜ 解锁灵魂")
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
                "body-scrollable": false
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
                          createTextVNode("Friend me on WeChat")
                        ]),
                        zh: withCtx(() => [
                          createTextVNode("扫码加微 ｜ 解锁灵魂")
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
        href: unref(goLinks).linkedin
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-linkedin" data-v-f2416b14${_scopeId}></i>`);
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
        href: unref(goLinks).zhihu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-zhihu" data-v-f2416b14${_scopeId}></i>`);
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
        href: unref(goLinks).douban
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-douban" data-v-f2416b14${_scopeId}></i>`);
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
            _push2(`<i class="iconfont icon-mail" data-v-f2416b14${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-mail" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="container" data-v-f2416b14><div class="${ssrRenderClass([
        unref(isZhLang) ? "zh" : unref(globalState).userAgent.isFirefox || unref(globalState).userAgent.isSafari ? "en-hack" : "en",
        "biography"
      ])}" data-v-f2416b14>${unref(markdownToHTML)((unref(isZhLang) ? unref(appConfig).ABOUT_BIOGRAPHY_ZH : unref(appConfig).ABOUT_BIOGRAPHY_EN) ?? "", {
        sanitize: false
      }) ?? ""}</div></div></div></div>`);
    };
  }
});
const _sfc_setup$15 = _sfc_main$15.setup;
_sfc_main$15.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/banner.vue");
  return _sfc_setup$15 ? _sfc_setup$15(props, ctx) : void 0;
};
const AboutPageBanner = /* @__PURE__ */ _export_sfc(_sfc_main$15, [["__scopeId", "data-v-f2416b14"]]);
const _sfc_main$14 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { globalState, appConfig, goLinks } = useEnhancer();
    const appOptionsStore = useAppOptionsStore();
    const adminProfileStore = useAdminProfileStore();
    const handleGTagEvent = (event) => {
    };
    const handleSponsor = () => {
      globalState.toggleSwitcher("sponsorModal", true);
    };
    const handleStatement = () => {
      globalState.toggleSwitcher("statementModal", true);
    };
    const handleFeedback = () => {
      globalState.toggleSwitcher("feedbackModal", true);
    };
    useAboutPageMeta();
    useUniversalFetch(() => Promise.all([adminProfileStore.fetch(), appOptionsStore.fetch()]));
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
        icon: "icon-feedback",
        i18n: i18ns.feedback,
        onClick: handleFeedback
      },
      {
        class: "telegram",
        icon: "icon-telegram",
        i18n: i18ns.telegramGroup,
        href: goLinks.value["telegram-group"]
      },
      {
        class: "discord",
        icon: "icon-discord",
        i18n: i18ns.discordGroup,
        href: goLinks.value["discord-server"]
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
        href: BFF_CONFIG.route_path_rss
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-6aab51b9>`);
      _push(ssrRenderComponent(AboutPageBanner, { onGTagEvent: handleGTagEvent }, null, _parent));
      _push(`<div class="page-content" data-v-6aab51b9><div class="container" data-v-6aab51b9><div class="module-buttons" data-v-6aab51b9><!--[-->`);
      ssrRenderList(moduleButtons.value, (item, index) => {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.onClick ? "button" : "ulink"), {
          class: ["item", item.class],
          href: item.href,
          to: item.route,
          onClick: item.onClick
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="left" data-v-6aab51b9${_scopeId}><i class="${ssrRenderClass([item.icon, "iconfont"])}" data-v-6aab51b9${_scopeId}></i><span class="text" data-v-6aab51b9${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, mergeProps({ ref_for: true }, item.i18n), null, _parent2, _scopeId));
              _push2(`</span></span><span class="right" data-v-6aab51b9${_scopeId}><i class="iconfont icon-next" data-v-6aab51b9${_scopeId}></i></span>`);
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
        }), _parent);
      });
      _push(`<!--]--></div><div class="statistics" data-v-6aab51b9>`);
      _push(ssrRenderComponent(GithubStatistic, null, null, _parent));
      _push(ssrRenderComponent(NpmStatistic, null, null, _parent));
      _push(ssrRenderComponent(ThreadsStatistic, null, null, _parent));
      _push(ssrRenderComponent(DoubanStatistic, null, null, _parent));
      _push(`</div><div class="plogs" data-v-6aab51b9>`);
      _push(ssrRenderComponent(InstagramMedia$1, null, null, _parent));
      _push(`</div><div class="footprint" data-v-6aab51b9>`);
      _push(ssrRenderComponent(FootprintMap, null, null, _parent));
      _push(`</div><div class="vlogs" data-v-6aab51b9>`);
      _push(ssrRenderComponent(YoutubeMedia, null, null, _parent));
      _push(`</div><div class="calendar" data-v-6aab51b9>`);
      _push(ssrRenderComponent(AggregateCalendar, null, null, _parent));
      _push(`</div><div class="footer-links" data-v-6aab51b9><div class="friend-links" data-v-6aab51b9><!--[-->`);
      ssrRenderList(unref(appOptionsStore).data?.friend_links ?? [], (link, index) => {
        _push(`<!--[-->`);
        if (index !== 0) {
          _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<a${ssrRenderAttr("href", link.url)} class="item" target="_blank" rel="external nofollow noopener" data-v-6aab51b9>${ssrInterpolate(link.name)}</a><!--]-->`);
      });
      _push(`<!--]--></div><div class="special-links" data-v-6aab51b9><!--[-->`);
      ssrRenderList(unref(appConfig).ABOUT_SPECIAL_LINKS ?? [], (item, index) => {
        _push(`<!--[-->`);
        if (index !== 0) {
          _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<a${ssrRenderAttr("href", item.url)} class="item" target="_blank" rel="external nofollow noopener" data-v-6aab51b9>${ssrInterpolate(item.name)}</a><!--]-->`);
      });
      _push(`<!--]--></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$14 = _sfc_main$14.setup;
_sfc_main$14.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/desktop/index.vue");
  return _sfc_setup$14 ? _sfc_setup$14(props, ctx) : void 0;
};
const DesktopAboutPage = /* @__PURE__ */ _export_sfc(_sfc_main$14, [["__scopeId", "data-v-6aab51b9"]]);
const _sfc_main$13 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { appConfig, goLinks, isZhLang } = useEnhancer();
    const adminProfileStore = useAdminProfileStore();
    useAboutPageMeta();
    useUniversalFetch(() => adminProfileStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_uimage = resolveComponent("uimage");
      const _component_ulink = resolveComponent("ulink");
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-page" }, _attrs))} data-v-42080a72>`);
      _push(ssrRenderComponent(MobileBanner, {
        "background-image": "/images/page-about/mobile-banner-2.webp",
        "background-image-y": 58,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, { bolder: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).PAGE_ABOUT
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_ABOUT
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, { bolder: "" }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).PAGE_ABOUT
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="profile" data-v-42080a72><div class="avatar" data-v-42080a72>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "image",
        src: unref(useAdminAvatar)(unref(adminProfileStore).data?.avatar_url)
      }, null, _parent));
      _push(`</div><h2 class="name" data-v-42080a72>${ssrInterpolate(unref(adminProfileStore).data?.name || "-")}</h2><h5 class="slogan" data-v-42080a72>${ssrInterpolate(unref(adminProfileStore).data?.slogan || "-")}</h5><h4 class="description" data-v-42080a72>`);
      _push(ssrRenderComponent(_component_webfont, { bolder: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(isZhLang) ? unref(APP_PROFILE).description_short_zh : unref(APP_PROFILE).description_en)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(isZhLang) ? unref(APP_PROFILE).description_short_zh : unref(APP_PROFILE).description_en), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</h4><div class="socials" data-v-42080a72>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "item github",
        href: unref(goLinks).github
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-42080a72${_scopeId}></i>`);
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
        href: unref(goLinks).instagram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-instagram" data-v-42080a72${_scopeId}></i>`);
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
        href: unref(goLinks).threads
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-threads" data-v-42080a72${_scopeId}></i>`);
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
        href: unref(goLinks).telegram
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-42080a72${_scopeId}></i>`);
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
        href: unref(goLinks).zhihu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-zhihu" data-v-42080a72${_scopeId}></i>`);
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
        href: unref(goLinks)["douban-movie"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-douban" data-v-42080a72${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-douban" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="biography" data-v-42080a72><div class="bridge left" data-v-42080a72></div><div class="bridge right" data-v-42080a72></div><div class="${ssrRenderClass([unref(isZhLang) ? "zh" : "en", "content"])}" data-v-42080a72>${unref(markdownToHTML)((unref(isZhLang) ? unref(appConfig).ABOUT_BIOGRAPHY_ZH : unref(appConfig).ABOUT_BIOGRAPHY_EN) ?? "", {
        sanitize: false
      }) ?? ""}</div></div><div class="buttons" data-v-42080a72>`);
      _push(ssrRenderComponent(_component_router_link, {
        class: "item",
        to: unref(getPageRoute)(unref(RouteName).Archive)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-quill" data-v-42080a72${_scopeId}></i><span class="label" data-v-42080a72${_scopeId}>`);
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
            _push2(`<i class="iconfont icon-buddhism" data-v-42080a72${_scopeId}></i><span class="label" data-v-42080a72${_scopeId}>`);
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
            _push2(`<i class="iconfont icon-comment" data-v-42080a72${_scopeId}></i><span class="label" data-v-42080a72${_scopeId}>`);
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
        href: unref(goLinks)["discord-server"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-discord" data-v-42080a72${_scopeId}></i><span class="label" data-v-42080a72${_scopeId}>`);
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
        href: unref(goLinks)["telegram-group"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-telegram" data-v-42080a72${_scopeId}></i><span class="label" data-v-42080a72${_scopeId}>`);
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
        href: unref(BFF_CONFIG).route_path_rss
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-rss" data-v-42080a72${_scopeId}></i><span class="label" data-v-42080a72${_scopeId}>`);
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
      _push(`</div><div class="qrcodes" data-v-42080a72><div class="item" data-v-42080a72>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "image",
        src: "/images/qrcodes/whatsapp.webp"
      }, null, _parent));
      _push(`</div><div class="item" data-v-42080a72>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        class: "image",
        src: "/images/qrcodes/wechat.webp"
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$13 = _sfc_main$13.setup;
_sfc_main$13.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/about/mobile/index.vue");
  return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
const MobileAboutPage = /* @__PURE__ */ _export_sfc(_sfc_main$13, [["__scopeId", "data-v-42080a72"]]);
var PageIds = /* @__PURE__ */ ((PageIds2) => {
  PageIds2[PageIds2["Guestbook"] = 0] = "Guestbook";
  return PageIds2;
})(PageIds || {});
const bannerImage = "/images/page-guestbook/banner.webp";
const _sfc_main$12 = /* @__PURE__ */ defineComponent({
  __name: "guestbook",
  __ssrInlineRender: true,
  props: {
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { isZhLang, i18n: _i18n } = useEnhancer();
    const commentStore = useCommentStore();
    const isLoading = ref(isClient);
    const fetchComments = () => {
      return commentStore.fetchList({ target_type: CommentTargetType.Page, target_id: PageIds.Guestbook }).then(() => {
        isLoading.value = false;
      });
    };
    usePageSeo(() => {
      const enTitle = firstUpperCase(_i18n.t(LocalesKey.PAGE_GUESTBOOK, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_GUESTBOOK), enTitle] : [enTitle];
      const description = isZhLang.value ? `给 ${APP_PROFILE.author} 留言` : "Leave a comment";
      return {
        pageTitles: titles,
        description,
        ogType: "website",
        ogImage: getPageURL(bannerImage),
        ogImageWidth: 1200,
        ogImageHeight: 675
      };
    });
    useUniversalFetch(() => fetchComments());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_responsive = resolveComponent("responsive");
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "guestbook-page" }, _attrs))} data-v-305f6ae1>`);
      _push(ssrRenderComponent(_component_responsive, null, {
        desktop: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="desktop-banner" data-v-305f6ae1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_uimage, {
              class: "image",
              src: bannerImage,
              cdn: ""
            }, null, _parent2, _scopeId));
            _push2(`<span class="slogan" data-v-305f6ae1${_scopeId}>`);
            _push2(ssrRenderComponent(_component_webfont, { class: "text" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).GUESTBOOK_SLOGAN
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).GUESTBOOK_SLOGAN
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
                createVNode("span", { class: "slogan" }, [
                  createVNode(_component_webfont, { class: "text" }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocalesKey).GUESTBOOK_SLOGAN
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
            _push2(ssrRenderComponent(MobileBanner, {
              class: "mobile-banner",
              "background-image": bannerImage,
              "background-image-y": 70,
              cdn: ""
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_webfont, { bolder: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_i18n, {
                          k: unref(LocalesKey).PAGE_GUESTBOOK
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LocalesKey).PAGE_GUESTBOOK
                          }, null, 8, ["k"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_webfont, { bolder: "" }, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocalesKey).PAGE_GUESTBOOK
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              description: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_webfont, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_i18n, {
                          k: unref(LocalesKey).GUESTBOOK_SLOGAN
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_i18n, {
                            k: unref(LocalesKey).GUESTBOOK_SLOGAN
                          }, null, 8, ["k"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_webfont, null, {
                      default: withCtx(() => [
                        createVNode(_component_i18n, {
                          k: unref(LocalesKey).GUESTBOOK_SLOGAN
                        }, null, 8, ["k"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(MobileBanner, {
                class: "mobile-banner",
                "background-image": bannerImage,
                "background-image-y": 70,
                cdn: ""
              }, {
                title: withCtx(() => [
                  createVNode(_component_webfont, { bolder: "" }, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocalesKey).PAGE_GUESTBOOK
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ]),
                description: withCtx(() => [
                  createVNode(_component_webfont, null, {
                    default: withCtx(() => [
                      createVNode(_component_i18n, {
                        k: unref(LocalesKey).GUESTBOOK_SLOGAN
                      }, null, 8, ["k"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="comment" data-v-305f6ae1>`);
      _push(ssrRenderComponent(Comment, {
        "target-type": unref(CommentTargetType).Page,
        "target-id": 0,
        plain: props.isMobile,
        fetching: isLoading.value
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$12 = _sfc_main$12.setup;
_sfc_main$12.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/guestbook.vue");
  return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
const GuestbookPage = /* @__PURE__ */ _export_sfc(_sfc_main$12, [["__scopeId", "data-v-305f6ae1"]]);
const APP_LOGO_URL = "/images/page-app/logo.png";
const _sfc_main$11 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  props: {
    isMobile: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { isZhLang, i18n: _i18n } = useEnhancer();
    const handleAppEvent = (name) => {
    };
    usePageSeo(() => {
      const enTitle = firstUpperCase(_i18n.t(LocalesKey.PAGE_APP, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_APP), enTitle] : [enTitle];
      const description = `${APP_PROFILE.title} App ${isZhLang.value ? "下载" : "download"}`;
      return {
        pageTitles: titles,
        description,
        ogImage: getPageURL(APP_LOGO_URL),
        ogImageWidth: 180,
        ogImageHeight: 180
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["app-page", { mobile: props.isMobile }]
      }, _attrs))} data-v-4eb6bc5f><div class="app" data-v-4eb6bc5f><div class="logo" data-v-4eb6bc5f>`);
      _push(ssrRenderComponent(_component_uimage, {
        alt: "app-logo",
        src: APP_LOGO_URL,
        cdn: ""
      }, null, _parent));
      _push(`</div><h2 class="title" data-v-4eb6bc5f>${ssrInterpolate(unref(APP_PROFILE).title)}</h2><p class="description" data-v-4eb6bc5f>`);
      _push(ssrRenderComponent(_component_webfont, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocalesKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p><div class="screen" data-v-4eb6bc5f>`);
      _push(ssrRenderComponent(_component_uimage, {
        alt: "app-hot",
        class: "screen-img",
        src: "/images/page-app/hot.webp",
        cdn: ""
      }, null, _parent));
      _push(`<div class="download" data-v-4eb6bc5f>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "qrcode",
        alt: "qrcode",
        src: "/images/page-app/qrcode.png",
        cdn: ""
      }, null, _parent));
      _push(`<button class="button android-download" disabled data-v-4eb6bc5f><i class="icon iconfont icon-android" data-v-4eb6bc5f></i><span class="text" data-v-4eb6bc5f>Android</span><i class="iconfont icon-download" data-v-4eb6bc5f></i></button><button class="button ios-download" disabled data-v-4eb6bc5f><i class="icon iconfont icon-apple" data-v-4eb6bc5f></i><span class="text" data-v-4eb6bc5f>iOS</span><i class="iconfont icon-download" data-v-4eb6bc5f></i></button>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button source-code",
        href: unref(RESOURCE_LINKS).GITHUB_SURMON_ME_NATIVE,
        onMousedown: ($event) => handleAppEvent()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="icon iconfont icon-github" data-v-4eb6bc5f${_scopeId}></i><span class="text" data-v-4eb6bc5f${_scopeId}>Source Code</span><i class="new-window iconfont icon-new-window-s" data-v-4eb6bc5f${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "icon iconfont icon-github" }),
              createVNode("span", { class: "text" }, "Source Code"),
              createVNode("i", { class: "new-window iconfont icon-new-window-s" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><p class="rss" data-v-4eb6bc5f>`);
      _push(ssrRenderComponent(_component_i18n, null, {
        zh: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` （ 此项目已废弃！建议使用 <a class="link"${ssrRenderAttr("href", unref(BFF_CONFIG).route_path_rss)} target="_blank" data-v-4eb6bc5f${_scopeId}>RSS 订阅</a> ） `);
          } else {
            return [
              createTextVNode(" （ 此项目已废弃！建议使用 "),
              createVNode("a", {
                class: "link",
                href: unref(BFF_CONFIG).route_path_rss,
                target: "_blank"
              }, "RSS 订阅", 8, ["href"]),
              createTextVNode(" ） ")
            ];
          }
        }),
        en: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` [ DEPRECATED! Use <a class="link"${ssrRenderAttr("href", unref(BFF_CONFIG).route_path_rss)} target="_blank" data-v-4eb6bc5f${_scopeId}>RSS subscription</a> ] `);
          } else {
            return [
              createTextVNode(" [ DEPRECATED! Use "),
              createVNode("a", {
                class: "link",
                href: unref(BFF_CONFIG).route_path_rss,
                target: "_blank"
              }, "RSS subscription", 8, ["href"]),
              createTextVNode(" ] ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/app.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const AppPage = /* @__PURE__ */ _export_sfc(_sfc_main$11, [["__scopeId", "data-v-4eb6bc5f"]]);
const useGitHubSponsorsStore = defineStore("githubSponsors", () => {
  return createFetchStore({
    fetcher: () => tunnel$1.fetch(TunnelModule.GitHubSponsors),
    once: true,
    data: null
  });
});
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
    qrcode: "/images/page-sponsor/qrcode-paypal.webp",
    link: GO_LINKS_MAP.paypal
  },
  {
    id: "alipay",
    title: "支付宝",
    logo: "/images/third-party/alipay-logo.svg",
    qrcode: "/images/page-sponsor/qrcode-alipay.webp",
    text: "通过支付宝扫码"
  },
  {
    id: "wechat-pay",
    title: "微信赞赏",
    logo: "/images/third-party/wechat-pay-logo.svg",
    qrcode: "/images/page-sponsor/qrcode-wechat-pay.webp",
    text: "通过微信扫码"
  },
  {
    id: "bitcoin",
    title: "BTC",
    logo: "/images/third-party/btc-logo.svg",
    address: IDENTITIES.BTC_ADDRESS
  },
  {
    id: "ethereum",
    title: "ETH",
    logo: "/images/third-party/eth-logo.svg",
    address: IDENTITIES.ETH_ADDRESS
  }
];
const useSponsorState = (initialId) => {
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
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "_crypto",
  __ssrInlineRender: true,
  props: {
    address: {}
  },
  setup(__props) {
    const props = __props;
    useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "crypto-provider" }, _attrs))} data-v-d1745d8e><code class="address" data-v-d1745d8e>${ssrInterpolate(props.address)}</code><i class="iconfont icon-qrcode" data-v-d1745d8e></i></div>`);
    };
  }
});
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/providers/_crypto.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const CryptoProvider = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-d1745d8e"]]);
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "_qrcode",
  __ssrInlineRender: true,
  props: {
    qrcode: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "qrcode-provider" }, _attrs))} data-v-20064460>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "qrcode",
        src: props.qrcode,
        cdn: ""
      }, null, _parent));
      _push(`<div class="content" data-v-20064460>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/providers/_qrcode.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const QrcodeProvider = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-20064460"]]);
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
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
                  _push3(`<i class="iconfont icon-link" data-v-df4ecb3a${_scopeId2}></i>`);
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
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/providers/paypal.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const PaypalProvider = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-df4ecb3a"]]);
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
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
            _push2(`<div class="text" data-v-08e5f2a2${_scopeId}><i class="iconfont icon-qrcode" data-v-08e5f2a2${_scopeId}></i><span data-v-08e5f2a2${_scopeId}>${ssrInterpolate(props.text)}</span></div>`);
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
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/providers/alipay.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const AlipayProvider = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-08e5f2a2"]]);
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
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
            _push2(`<div class="text" data-v-7d7c8c79${_scopeId}><i class="iconfont icon-qrcode" data-v-7d7c8c79${_scopeId}></i><span data-v-7d7c8c79${_scopeId}>${ssrInterpolate(props.text)}</span></div>`);
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
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/providers/wechat-pay.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const WechatpayProvider = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-7d7c8c79"]]);
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "github-sponsors",
  __ssrInlineRender: true,
  props: {
    maxCount: {},
    listData: {}
  },
  setup(__props) {
    const props = __props;
    const { goLinks } = useEnhancer();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "github-sponsors" }, _attrs))} data-v-df7a1f2d>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: unref(goLinks)["github-sponsors"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_uimage, {
              class: "icon",
              src: "/images/third-party/github-sponsors-heart.svg",
              alt: "GitHub Sponsors"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text" data-v-df7a1f2d${_scopeId}>`);
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
        _push(`<div class="sponsor-box" data-v-df7a1f2d><p class="total" data-v-df7a1f2d>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` 我在 GitHub Sponsors 累计已得到 <span class="active-total" data-v-df7a1f2d${_scopeId}>${ssrInterpolate(props.listData.currentSponsors.length)}</span> + ${ssrInterpolate(props.listData.pastSponsors.length)} 位赞助者的支持 `);
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
              _push2(` I have accumulated <span class="active-total" data-v-df7a1f2d${_scopeId}>${ssrInterpolate(props.listData.currentSponsors.length)}</span> + ${ssrInterpolate(props.listData.pastSponsors.length)} backers on GitHub Sponsors `);
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
        _push(`</p><div class="sponsors" data-v-df7a1f2d><!--[-->`);
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
            href: unref(goLinks)["github-sponsors"]
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
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/providers/github-sponsors.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const GithubSponsorsProvider = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-df7a1f2d"]]);
const _sfc_main$W = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-60b3bb02>`);
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
          address: activeProvider.value.address
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (activeProvider.value.id == unref(ProviderId).Ethereum) {
        _push(ssrRenderComponent(CryptoProvider, {
          address: activeProvider.value.address
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/provider.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const SponsorProvider = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["__scopeId", "data-v-60b3bb02"]]);
const _sfc_main$V = /* @__PURE__ */ defineComponent({
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
        class: ["sponsor-tabs", __props.state.activeId]
      }, _attrs))} data-v-5856393b><!--[-->`);
      ssrRenderList(unref(PROVIDERS), (provider, index) => {
        _push(`<button class="${ssrRenderClass([[provider.id, { active: __props.state.activeId.value === provider.id }], "item"])}"${ssrRenderAttr("title", provider.title)} data-v-5856393b><span class="logo" data-v-5856393b>`);
        _push(ssrRenderComponent(_component_uimage, {
          class: "image",
          alt: provider.title,
          src: provider.logo,
          cdn: ""
        }, null, _parent));
        _push(`</span>`);
        if (!__props.hideTitle) {
          _push(`<span class="title" data-v-5856393b>${ssrInterpolate(provider.title)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/sponsor/tabs.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const SponsorTabs = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-5856393b"]]);
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "sponsor",
  __ssrInlineRender: true,
  setup(__props) {
    const { route, isZhLang, i18n: _i18n } = useEnhancer();
    const githubSponsorsStore = useGitHubSponsorsStore();
    const sponsorState = useSponsorState();
    usePageSeo(() => {
      const enTitle = firstUpperCase(_i18n.t(LocalesKey.PAGE_SPONSOR, Language.English));
      const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_SPONSOR), enTitle] : [enTitle];
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sponsor-page" }, _attrs))} data-v-79c30318>`);
      _push(ssrRenderComponent(PageBanner, {
        "background-image": "/images/page-sponsor/banner.webp",
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "隨喜一念，各得其安",
                    en: "Become a sponsor to me"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "隨喜一念，各得其安",
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
                    zh: "隨喜一念，各得其安",
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
      _push(`<div class="page-content" data-v-79c30318><div class="tabs-wrapper" data-v-79c30318><div class="container" data-v-79c30318>`);
      _push(ssrRenderComponent(SponsorTabs, {
        class: "sponsor-tabs",
        state: unref(sponsorState)
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(SponsorProvider, {
        class: "sponsor-provider",
        state: unref(sponsorState),
        "github-sponsors-data": unref(githubSponsorsStore).data
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/sponsor.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const SponsorPage = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["__scopeId", "data-v-79c30318"]]);
const _sfc_main$T = /* @__PURE__ */ defineComponent({
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
        "slides-per-view": __props.columns,
        "slides-per-group": __props.columns,
        grid: { rows: __props.rows, fill: "row" },
        "space-between": 24,
        onSlideChange: handleSlideChange,
        onSwiper: setSwiper
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.data, (item, index) => {
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
              (openBlock(true), createBlock(Fragment, null, renderList(__props.data, (item, index) => {
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
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/swiper.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const ListSwiper = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-5fa9a393"]]);
const _sfc_main$S = /* @__PURE__ */ defineComponent({
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
        const request2 = tunnel$1.fetch(TunnelModule.YouTubeVideoList, { id: props.playlistId });
        videos.value = await (isClient ? delayPromise(480, request2) : request2);
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
        loading: fetching.value,
        "has-data": !!videos.value.length
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
                  _push3(`<div class="video" data-v-79c20a4c${_scopeId2}><div class="thumbnail" data-v-79c20a4c${_scopeId2}><div class="mask" data-v-79c20a4c${_scopeId2}><div class="button" data-v-79c20a4c${_scopeId2}><i class="iconfont icon-music-play" data-v-79c20a4c${_scopeId2}></i></div></div><span class="published-at" data-v-79c20a4c${_scopeId2}><i class="iconfont icon-clock" data-v-79c20a4c${_scopeId2}></i><span class="text" data-v-79c20a4c${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_udate, {
                    to: "ago",
                    date: item.snippet.publishedAt
                  }, null, _parent3, _scopeId2));
                  _push3(`</span></span><div${ssrRenderAttrs(_temp0 = mergeProps({
                    class: "background",
                    "data-background-image": getThumbnailURL(item.snippet.thumbnails)
                  }, ssrGetDirectiveProps(_ctx, _directive_lozad)))} data-v-79c20a4c${_scopeId2}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</div></div><h5 class="title" data-v-79c20a4c${_scopeId2}>${ssrInterpolate(item.snippet.title)}</h5><div class="description" data-v-79c20a4c${_scopeId2}>${ssrInterpolate(item.snippet.description || "-")}</div></div>`);
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
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/videos.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const YoutubeVideoList = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-79c20a4c"]]);
const _sfc_main$R = /* @__PURE__ */ defineComponent({
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
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-playlist" }, _attrs))} data-v-4e9d774e><ul class="playlist" data-v-4e9d774e><!--[-->`);
      ssrRenderList(__props.playlists, (list, index) => {
        _push(`<li class="item"${ssrRenderAttr("title", list.title)} data-v-4e9d774e>`);
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
              "body-scrollable": false,
              onClose: closeYouTubeModal
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="youtube-modal" data-v-4e9d774e${_scopeId2}><iframe class="youtube-iframe"${ssrRenderAttr("src", youTubeModalURL.value)} data-v-4e9d774e${_scopeId2}></iframe>`);
                  if (!modelIframeLoaded.value) {
                    _push3(`<div class="loading" data-v-4e9d774e${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_loading_indicator, {
                      gap: "lg",
                      width: "2.4rem",
                      height: "1.2rem"
                    }, null, _parent3, _scopeId2));
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
                            createVNode(_component_loading_indicator, {
                              gap: "lg",
                              width: "2.4rem",
                              height: "1.2rem"
                            })
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
                "body-scrollable": false,
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
                          createVNode(_component_loading_indicator, {
                            gap: "lg",
                            width: "2.4rem",
                            height: "1.2rem"
                          })
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
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/playlist.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const YoutubePlaylist = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-4e9d774e"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, isZhLang } = useEnhancer();
    const youtubePlayListStore = useYouTubePlayListStore();
    const youtubePlaylistData = computed(() => {
      return youtubePlayListStore.data.filter((list) => list.contentDetails.itemCount > 1);
    });
    usePageSeo(() => {
      return {
        pageTitle: "YouTube",
        description: isZhLang.value ? `${APP_PROFILE.author} 发布的长视频` : `${APP_PROFILE.author}'s YouTube`
      };
    });
    useUniversalFetch(() => youtubePlayListStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton = resolveComponent("skeleton");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "youtube-page" }, _attrs))} data-v-64b11419>`);
      _push(ssrRenderComponent(PageBanner, {
        class: "page-banner",
        "background-video": "/videos/clips/lake-1.mp4",
        "background-video-y": 58,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "山河入夢，春盡江南",
                    en: `${unref(APP_PROFILE).author}'s YouTube videos`
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "山河入夢，春盡江南",
                      en: `${unref(APP_PROFILE).author}'s YouTube videos`
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
                    zh: "山河入夢，春盡江南",
                    en: `${unref(APP_PROFILE).author}'s YouTube videos`
                  }, null, 8, ["en"])
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="links" data-v-64b11419${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item youtube",
              title: "YouTube Channel",
              href: unref(goLinks).youtube
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="username" data-v-64b11419${_scopeId2}>${ssrInterpolate(unref(IDENTITIES).YOUTUBE_CHANNEL_SHORT_ID)}</span>`);
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
                  href: unref(goLinks).youtube
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
      _push(`<div class="page-bridge" data-v-64b11419></div><div class="page-content" data-v-64b11419><div class="container" data-v-64b11419><div class="module-content" data-v-64b11419>`);
      _push(ssrRenderComponent(YoutubePlaylist, { playlists: youtubePlaylistData.value }, {
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "module-empty",
              bold: "",
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).EMPTY_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).EMPTY_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "module-empty",
                bold: "",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).EMPTY_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="module-skeleton" data-v-64b11419${_scopeId}><!--[-->`);
            ssrRenderList(5 * 2, (item) => {
              _push2(`<div class="item" data-v-64b11419${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "thumbnail" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "module-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(5 * 2, (item) => {
                  return createVNode("div", {
                    class: "item",
                    key: item
                  }, [
                    createVNode(_component_skeleton, { class: "thumbnail" })
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        title: withCtx(({ list }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h4 class="module-title" data-v-64b11419${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "link",
              href: unref(getYouTubePlaylistURL)(list.id)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(list.snippet.title)} (${ssrInterpolate(list.contentDetails.itemCount)}) `);
                } else {
                  return [
                    createTextVNode(toDisplayString(list.snippet.title) + " (" + toDisplayString(list.contentDetails.itemCount) + ") ", 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              class: "brand",
              href: unref(goLinks).youtube
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconfont icon-youtube" data-v-64b11419${_scopeId2}></i><span class="text" data-v-64b11419${_scopeId2}>YouTube · Channel</span>`);
                } else {
                  return [
                    createVNode("i", { class: "iconfont icon-youtube" }),
                    createVNode("span", { class: "text" }, "YouTube · Channel")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`</h4>`);
          } else {
            return [
              createVNode("h4", { class: "module-title" }, [
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
                  href: unref(goLinks).youtube
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
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/youtube/index.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const YoutubePage = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-64b11419"]]);
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "media",
  __ssrInlineRender: true,
  props: {
    media: {},
    objectFit: { default: "contain" },
    lazyImage: { type: Boolean },
    videoLoop: { type: Boolean },
    videoMuted: { type: Boolean },
    videoAutoPlay: { type: Boolean }
  },
  emits: ["load"],
  setup(__props, { emit: __emit }) {
    const { cdnDomain, isCNUser } = useEnhancer();
    const getMediaUrl = (url) => {
      return isCNUser ? getCdnProxyURL(cdnDomain, url) : url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "media-wrapper" }, _attrs))} data-v-7fb60527>`);
      if (unref(isImageMediaIns)(__props.media)) {
        _push(`<img draggable="false" class="${ssrRenderClass([__props.objectFit, "image"])}"${ssrRenderAttr("src", getMediaUrl(__props.media?.media_url))}${ssrRenderAttr("alt", __props.media.caption)}${ssrRenderAttr("loading", __props.lazyImage ? "lazy" : "eager")} data-v-7fb60527>`);
      } else if (unref(isVideoMediaIns)(__props.media)) {
        _push(`<video class="${ssrRenderClass([__props.objectFit, "video"])}"${ssrIncludeBooleanAttr(false) ? " controls" : ""}${ssrIncludeBooleanAttr(__props.videoLoop) ? " loop" : ""}${ssrIncludeBooleanAttr(__props.videoMuted) ? " muted" : ""}${ssrIncludeBooleanAttr(__props.videoAutoPlay) ? " autoplay" : ""}${ssrRenderAttr("src", getMediaUrl(__props.media.media_url))} data-v-7fb60527></video>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/media.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const InstagramMedia = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-7fb60527"]]);
const _sfc_main$O = /* @__PURE__ */ defineComponent({
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
      fetchMediaChildren(props.media.id).then(() => emit("load"));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "album-box" }, _attrs))} data-v-f2d2e9c8><div class="navigation" data-v-f2d2e9c8><button class="button"${ssrIncludeBooleanAttr(!canGoPrev.value) ? " disabled" : ""} data-v-f2d2e9c8><i class="iconfont icon-prev" data-v-f2d2e9c8></i></button><span class="page" data-v-f2d2e9c8>${ssrInterpolate(activeIndex.value + 1)} / ${ssrInterpolate(mediaChildren.value.length)}</span><button class="button"${ssrIncludeBooleanAttr(!canGoNext.value) ? " disabled" : ""} data-v-f2d2e9c8><i class="iconfont icon-next" data-v-f2d2e9c8></i></button></div>`);
      ssrRenderSlot(_ctx.$slots, "content", { activeIndex: activeIndex.value, activeMedia: mediaChildren.value[activeIndex.value], ghostMedia: mediaChildren.value[0] }, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/album.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const InstagramAlbum = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-f2d2e9c8"]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "gallery",
  __ssrInlineRender: true,
  props: {
    media: {}
  },
  setup(__props) {
    const isLoaded = ref(false);
    const mediaAspectRatio = ref("auto");
    const handleMediaLoad = async (payload) => {
      if (!isLoaded.value) {
        isLoaded.value = true;
        mediaAspectRatio.value = `${payload.width} / ${payload.height}`;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_udate = resolveComponent("udate");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "instagram-gallery" }, _attrs))} data-v-16f6a2d1><div class="topbar" data-v-16f6a2d1>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "type-link",
        href: __props.media.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isVideoMediaIns)(__props.media)) {
              _push2(`<i class="iconfont icon-video" data-v-16f6a2d1${_scopeId}></i>`);
            } else if (unref(isAlbumMediaIns)(__props.media)) {
              _push2(`<i class="iconfont icon-album" data-v-16f6a2d1${_scopeId}></i>`);
            } else {
              _push2(`<i class="iconfont icon-camera" data-v-16f6a2d1${_scopeId}></i>`);
            }
          } else {
            return [
              unref(isVideoMediaIns)(__props.media) ? (openBlock(), createBlock("i", {
                key: 0,
                class: "iconfont icon-video"
              })) : unref(isAlbumMediaIns)(__props.media) ? (openBlock(), createBlock("i", {
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
      _push(`<span class="timestamp" data-v-16f6a2d1>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "YMDm",
        date: __props.media.timestamp,
        separator: "/"
      }, null, _parent));
      _push(`</span></div><div class="content" data-v-16f6a2d1>`);
      if (!isLoaded.value) {
        _push(`<div class="loading" data-v-16f6a2d1>`);
        _push(ssrRenderComponent(_component_loading_indicator, {
          gap: "lg",
          width: "1.8rem",
          height: "1.2rem"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isImageMediaIns)(__props.media) || unref(isVideoMediaIns)(__props.media)) {
        _push(ssrRenderComponent(InstagramMedia, {
          class: ["root-media", { loaded: isLoaded.value }],
          style: { aspectRatio: mediaAspectRatio.value },
          media: __props.media,
          "lazy-image": true,
          "video-muted": false,
          "video-loop": true,
          "video-auto-play": true,
          onLoad: handleMediaLoad
        }, null, _parent));
      } else if (unref(isAlbumMediaIns)(__props.media)) {
        _push(ssrRenderComponent(InstagramAlbum, { media: __props.media }, {
          content: withCtx(({ activeMedia, ghostMedia }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([{ loaded: isLoaded.value }, "album-media"])}" style="${ssrRenderStyle({ aspectRatio: mediaAspectRatio.value })}" data-v-16f6a2d1${_scopeId}>`);
              if (ghostMedia) {
                _push2(ssrRenderComponent(InstagramMedia, {
                  class: "album-ghost-media",
                  media: ghostMedia,
                  "lazy-image": false,
                  "video-muted": true,
                  "video-loop": false,
                  "video-auto-play": false,
                  onLoad: handleMediaLoad
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (activeMedia) {
                _push2(ssrRenderComponent(InstagramMedia, {
                  key: activeMedia.id,
                  class: "album-active-media",
                  "object-fit": "cover",
                  media: activeMedia,
                  "lazy-image": false,
                  "video-muted": false,
                  "video-loop": false,
                  "video-auto-play": true
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["album-media", { loaded: isLoaded.value }],
                  style: { aspectRatio: mediaAspectRatio.value }
                }, [
                  ghostMedia ? (openBlock(), createBlock(InstagramMedia, {
                    key: 0,
                    class: "album-ghost-media",
                    media: ghostMedia,
                    "lazy-image": false,
                    "video-muted": true,
                    "video-loop": false,
                    "video-auto-play": false,
                    onLoad: handleMediaLoad
                  }, null, 8, ["media"])) : createCommentVNode("", true),
                  createVNode(Transition, {
                    name: "album-active-media",
                    mode: "out-in"
                  }, {
                    default: withCtx(() => [
                      activeMedia ? (openBlock(), createBlock(InstagramMedia, {
                        key: activeMedia.id,
                        class: "album-active-media",
                        "object-fit": "cover",
                        media: activeMedia,
                        "lazy-image": false,
                        "video-muted": false,
                        "video-loop": false,
                        "video-auto-play": true
                      }, null, 8, ["media"])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024)
                ], 6)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.media.caption) {
        _push(`<p class="caption" data-v-16f6a2d1>${__props.media.caption.replaceAll("\n", "<br>") ?? ""}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_ulink, {
        class: "username-link",
        href: __props.media.permalink
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
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/gallery.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const InsGallery = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["__scopeId", "data-v-16f6a2d1"]]);
const _sfc_main$M = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "instagram-grid" }, _attrs))} data-v-4f35850c><ul${ssrRenderAttrs({
        name: "list",
        class: "medias"
      })} data-v-4f35850c>`);
      ssrRenderList(__props.medias, (media, index) => {
        _push(`<li${ssrRenderAttr("title", getPureCaption(media.caption))} class="${ssrRenderClass([unref(isVideoMediaIns)(media) ? "video" : "photo", "item"])}" data-v-4f35850c><div class="content" data-v-4f35850c><div${ssrRenderAttrs(_temp0 = mergeProps({
          class: "background",
          "data-background-image": getMediaThumbnail(media)
        }, ssrGetDirectiveProps(_ctx, _directive_lozad)))} data-v-4f35850c>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : _temp0.innerHTML ?? ""}</div><div class="mask" data-v-4f35850c><span class="icon" data-v-4f35850c>`);
        if (unref(isVideoMediaIns)(media)) {
          _push(`<i class="iconfont icon-music-play" data-v-4f35850c></i>`);
        } else {
          _push(`<i class="iconfont icon-eye" data-v-4f35850c></i>`);
        }
        _push(`</span></div><div class="type-icon" data-v-4f35850c>`);
        if (unref(isVideoMediaIns)(media)) {
          _push(`<i class="iconfont icon-video" data-v-4f35850c></i>`);
        } else if (unref(isAlbumMediaIns)(media)) {
          _push(`<i class="iconfont icon-album" data-v-4f35850c></i>`);
        } else {
          _push(`<i class="iconfont icon-camera" data-v-4f35850c></i>`);
        }
        _push(`</div><span class="date" data-v-4f35850c>`);
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
              "body-scrollable": false,
              onClose: closeMediaGallery
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!!galleryActiveMedia.value) {
                    _push3(ssrRenderComponent(InsGallery, { media: galleryActiveMedia.value }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    !!galleryActiveMedia.value ? (openBlock(), createBlock(InsGallery, {
                      key: 0,
                      media: galleryActiveMedia.value
                    }, null, 8, ["media"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                visible: !!galleryActiveMedia.value,
                "body-scrollable": false,
                onClose: closeMediaGallery
              }, {
                default: withCtx(() => [
                  !!galleryActiveMedia.value ? (openBlock(), createBlock(InsGallery, {
                    key: 0,
                    media: galleryActiveMedia.value
                  }, null, 8, ["media"])) : createCommentVNode("", true)
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
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/grid.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const InstagramGrid = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-4f35850c"]]);
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, isZhLang, i18n: _i18n } = useEnhancer();
    const instagramLatestMediasStore = useInstagramLatestMediasStore();
    const medias = shallowReactive([]);
    const allMedias = computed(() => {
      const latestMedias = instagramLatestMediasStore.data?.data ?? [];
      return [...latestMedias, ...medias];
    });
    const lastPaging = shallowRef(null);
    const finished = computed(() => Boolean(lastPaging.value && !lastPaging.value.next));
    const isLoadingMore = ref(false);
    const fetchMoreMedias = async () => {
      try {
        isLoadingMore.value = true;
        const request2 = tunnel$1.fetch(TunnelModule.InstagramMedias, {
          after: lastPaging.value?.cursors.after ?? instagramLatestMediasStore.data?.paging?.cursors.after
        });
        const response = await (isClient ? delayPromise(360, request2) : request2);
        medias.push(...response.data);
        lastPaging.value = response.paging;
      } finally {
        isLoadingMore.value = false;
      }
    };
    usePageSeo(() => {
      const enTitle = "Photography";
      const titles = isZhLang.value ? [_i18n.t(LocalesKey.PAGE_PHOTOGRAPHY), enTitle] : [enTitle];
      const description = isZhLang.value ? `${APP_PROFILE.author} 的摄影作品` : `${APP_PROFILE.author}'s photographs`;
      return {
        pageTitles: titles,
        description
      };
    });
    useUniversalFetch(() => instagramLatestMediasStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "photography-page" }, _attrs))} data-v-ce139882>`);
      _push(ssrRenderComponent(PageBanner, {
        class: "page-banner",
        "background-video": "/videos/clips/ocean-5.mp4",
        "background-video-y": 72,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    zh: "大千同在，萬象共棲",
                    en: `${unref(APP_PROFILE).author}'s photographs`
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      zh: "大千同在，萬象共棲",
                      en: `${unref(APP_PROFILE).author}'s photographs`
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
                    zh: "大千同在，萬象共棲",
                    en: `${unref(APP_PROFILE).author}'s photographs`
                  }, null, 8, ["en"])
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="links" data-v-ce139882${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item instagram",
              title: "Instagram",
              href: unref(goLinks).instagram
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="username" data-v-ce139882${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).INSTAGRAM_USERNAME)}</span>`);
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
              href: unref(goLinks).xiaohongshu
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconfont icon-xiaohongshu" data-v-ce139882${_scopeId2}></i>`);
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
                  href: unref(goLinks).instagram
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
                  href: unref(goLinks).xiaohongshu
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
      _push(`<div class="page-bridge" data-v-ce139882></div><div class="page-content" data-v-ce139882><div class="container" data-v-ce139882>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: unref(instagramLatestMediasStore).fetching,
        "has-data": !!unref(instagramLatestMediasStore).data?.data.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "module-empty",
              bold: "",
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).EMPTY_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).EMPTY_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "module-empty",
                bold: "",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).EMPTY_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module-skeleton" data-v-ce139882${_scopeId}><!--[-->`);
            ssrRenderList(8, (i) => {
              _push2(ssrRenderComponent(_component_skeleton, {
                class: "item",
                key: i
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "module-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(8, (i) => {
                  return createVNode(_component_skeleton, {
                    class: "item",
                    key: i
                  });
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-ce139882${_scopeId}>`);
            _push2(ssrRenderComponent(InstagramGrid, { medias: allMedias.value }, null, _parent2, _scopeId));
            if (!unref(instagramLatestMediasStore).fetching && !finished.value) {
              _push2(ssrRenderComponent(Loadmore, {
                class: "loadmore",
                loading: isLoadingMore.value,
                onLoadmore: fetchMoreMedias
              }, {
                normal: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button class="normal" data-v-ce139882${_scopeId2}><i class="iconfont icon-loadmore" data-v-ce139882${_scopeId2}></i></button>`);
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
                loading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_loading_indicator, {
                      class: "loading",
                      width: "2.2rem",
                      height: "1.2rem",
                      gap: "lg"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_loading_indicator, {
                        class: "loading",
                        width: "2.2rem",
                        height: "1.2rem",
                        gap: "lg"
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
              createVNode("div", null, [
                createVNode(InstagramGrid, { medias: allMedias.value }, null, 8, ["medias"]),
                !unref(instagramLatestMediasStore).fetching && !finished.value ? (openBlock(), createBlock(Loadmore, {
                  key: 0,
                  class: "loadmore",
                  loading: isLoadingMore.value,
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
                      width: "2.2rem",
                      height: "1.2rem",
                      gap: "lg"
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
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/photography/index.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const PhotographyPage = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-ce139882"]]);
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
      const request2 = tunnel$1.fetch(TunnelModule.ThreadsMedias, {
        after: afterToken
      });
      return await (isClient ? delayPromise(360, request2) : request2);
    } finally {
      fetching.value = false;
    }
  };
  return {
    fetching,
    fetchMedias
  };
};
const mobileBannerImageUrl = "/images/page-snippets/banner-mobile.webp";
const i18nTitle = {
  [Language.Chinese]: "廣行饒益，利樂有情",
  [Language.English]: `${APP_PROFILE.author}'s snippets`
};
const useSnippetsPageMeta = () => {
  const { i18n, isZhLang } = useEnhancer();
  usePageSeo(() => {
    const enTitle = firstUpperCase(i18n.t(LocalesKey.PAGE_SNIPPETS, Language.English));
    const titles = isZhLang.value ? [i18n.t(LocalesKey.PAGE_SNIPPETS), enTitle] : [enTitle];
    const description = isZhLang.value ? `${APP_PROFILE.author} 近期发布的片段` : `${APP_PROFILE.author}'s snippets`;
    return {
      pageTitles: titles,
      description,
      ogImage: getPageURL(mobileBannerImageUrl),
      ogImageWidth: 1070,
      ogImageHeight: 600
    };
  });
};
const _sfc_main$K = /* @__PURE__ */ defineComponent({
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
    let innerItems = [...props.initialItems];
    const element = shallowRef(null);
    const columnsTree = ref(createColumns(props.columns));
    const filledIndex = ref(0);
    let currentRedrawId = 0;
    const fillColumns = async (startIndex, assignedRedrawId) => {
      if (!element.value) return;
      const columnDivs = [...element.value.children];
      for (let i = startIndex; i < innerItems.length; i++) {
        await nextTick();
        if (currentRedrawId !== assignedRedrawId) return;
        const target = columnDivs.reduce(
          (prev, curr) => curr.getBoundingClientRect().height < prev.getBoundingClientRect().height ? curr : prev
        );
        const colIndex = +target.dataset.index;
        columnsTree.value[colIndex].push(i);
      }
      filledIndex.value = innerItems.length;
    };
    const resetItems = async (items = []) => {
      columnsTree.value = createColumns(props.columns);
      innerItems = [...items];
      filledIndex.value = 0;
      await fillColumns(filledIndex.value, ++currentRedrawId);
    };
    const appendItems = async (newItems) => {
      const start = innerItems.length;
      innerItems.push(...newItems);
      await fillColumns(start, ++currentRedrawId);
    };
    const removeItems = (predicate) => {
      const map = /* @__PURE__ */ new Map();
      innerItems.forEach((item, i) => {
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
      innerItems = [...props.initialItems];
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
      }, _attrs))} data-v-9d34e8d5><!--[-->`);
      ssrRenderList(columnsTree.value, (column, columnIndex) => {
        _push(`<ul${ssrRenderAttrs({
          name: "list",
          class: "masonry-column",
          key: columnIndex,
          "data-index": columnIndex,
          style: { gap: props.colGap }
        })} data-v-9d34e8d5>`);
        ssrRenderList(column, (itemIndex, row) => {
          _push(`<li class="masonry-item" data-v-9d34e8d5>`);
          ssrRenderSlot(_ctx.$slots, "default", {
            item: unref(innerItems)[itemIndex],
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
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/masonry-wall.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const MasonryWall = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-9d34e8d5"]]);
const _sfc_main$J = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "list-item-card" }, _attrs))} data-v-82ea19f8><div class="header" data-v-82ea19f8>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        title: props.username,
        href: props.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([props.icon, "iconfont"])}" data-v-82ea19f8${_scopeId}></i><span class="username" data-v-82ea19f8${_scopeId}>${ssrInterpolate(props.username)}</span>`);
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
      _push(`<div class="timestamp" data-v-82ea19f8>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: props.timestamp
      }, null, _parent));
      _push(`</div></div><div class="body" data-v-82ea19f8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/desktop/card.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const ListItemCard = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-82ea19f8"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "body-threads",
  __ssrInlineRender: true,
  props: {
    media: {}
  },
  emits: ["click-image", "click-video"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const mediaUrl = useThreadsMediaUrl(props.media.media_url);
    const thumbnailUrl = useThreadsMediaUrl(props.media.thumbnail_url);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "threads-media-body" }, _attrs))} data-v-6f0299b7>`);
      _push(ssrRenderComponent(_sfc_main$1I, {
        class: "text",
        compact: "",
        markdown: __props.media.text,
        "render-options": { codeLineNumbers: false }
      }, null, _parent));
      if (unref(mediaUrl)) {
        _push(`<div class="${ssrRenderClass([{ audio: __props.media.media_type === "AUDIO" }, "media"])}" data-v-6f0299b7>`);
        if (__props.media.media_type === "AUDIO") {
          _push(`<audio class="audio"${ssrRenderAttr("src", unref(mediaUrl))} controls data-v-6f0299b7></audio>`);
        } else if (__props.media.media_type === "VIDEO") {
          _push(`<div class="video" data-v-6f0299b7><button class="play-button" data-v-6f0299b7><i class="iconfont icon-video-play" data-v-6f0299b7></i></button><img class="poster"${ssrRenderAttr("alt", unref(thumbnailUrl) ?? "")}${ssrRenderAttr("src", unref(thumbnailUrl) ?? "")} loading="lazy" draggable="false" data-v-6f0299b7></div>`);
        } else {
          _push(`<img class="image"${ssrRenderAttr("alt", unref(mediaUrl))}${ssrRenderAttr("src", unref(mediaUrl))} loading="lazy" draggable="false" data-v-6f0299b7>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/desktop/body-threads.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const ThreadsBody = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-6f0299b7"]]);
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { popup, goLinks } = useEnhancer();
    const threadsLatestMediasStore = useThreadsLatestMediasStore();
    const masonryRef = shallowRef();
    const lastPaging = shallowRef(null);
    const noMoreData = shallowRef(false);
    const { fetchMedias, fetching } = useThreadsMediasRequest();
    const fetchNextPageThreadsMedias = async () => {
      if (threadsLatestMediasStore.fetching || fetching.value || noMoreData.value) return;
      const secondPage = threadsLatestMediasStore.data?.paging.cursors.after;
      const nextPage = lastPaging.value?.cursors?.after;
      const response = await fetchMedias(nextPage ?? secondPage);
      lastPaging.value = response.paging;
      noMoreData.value = !response.paging.cursors?.after;
      masonryRef.value?.appendItems(response.data);
    };
    useSnippetsPageMeta();
    useUniversalFetch(() => threadsLatestMediasStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "snippets-page" }, _attrs))} data-v-4cb96047>`);
      _push(ssrRenderComponent(PageBanner, {
        class: "page-banner",
        "background-video": "/videos/clips/forest-1.mp4",
        "background-video-y": 72,
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
            _push2(`<div class="links" data-v-4cb96047${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item threads",
              title: "Threads",
              href: unref(goLinks).threads
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="username" data-v-4cb96047${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).THREADS_USERNAME)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).THREADS_USERNAME), 1)
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
              href: unref(goLinks).zhihu
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconfont icon-zhihu-full" data-v-4cb96047${_scopeId2}></i>`);
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
                  href: unref(goLinks).threads
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).THREADS_USERNAME), 1)
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
                  href: unref(goLinks).zhihu
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
      _push(`<div class="page-bridge" data-v-4cb96047></div><div class="page-content" data-v-4cb96047><div class="container" data-v-4cb96047>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: unref(threadsLatestMediasStore).fetching,
        "has-data": !!unref(threadsLatestMediasStore).data?.data.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, {
              class: "module-empty",
              bold: "",
              size: "large"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).EMPTY_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).EMPTY_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, {
                class: "module-empty",
                bold: "",
                size: "large"
              }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).EMPTY_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module-skeleton" data-v-4cb96047${_scopeId}><!--[-->`);
            ssrRenderList(9, (item) => {
              _push2(`<div class="item" data-v-4cb96047${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
              _push2(`<!--[-->`);
              ssrRenderList(3, (i) => {
                _push2(ssrRenderComponent(_component_skeleton, {
                  class: "line",
                  key: i
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "module-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(9, (item) => {
                  return createVNode("div", {
                    class: "item",
                    key: item
                  }, [
                    createVNode(_component_skeleton, { class: "title" }),
                    (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                      return createVNode(_component_skeleton, {
                        class: "line",
                        key: i
                      });
                    }), 64))
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div data-v-4cb96047${_scopeId}>`);
            _push2(ssrRenderComponent(MasonryWall, {
              "row-gap": "2.2rem",
              "col-gap": "2rem",
              columns: 3,
              "initial-items": unref(threadsLatestMediasStore).data?.data || [],
              "ssr-initial-render": true,
              onMounted: ($event) => masonryRef.value = $event
            }, {
              default: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ListItemCard, {
                    icon: "icon-threads",
                    username: item.username,
                    permalink: item.permalink,
                    timestamp: item.timestamp
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(ThreadsBody, {
                          media: item,
                          onClickImage: (url) => unref(popup).image(url),
                          onClickVideo: (url) => unref(popup).video(url)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(ThreadsBody, {
                            media: item,
                            onClickImage: (url) => unref(popup).image(url),
                            onClickVideo: (url) => unref(popup).video(url)
                          }, null, 8, ["media", "onClickImage", "onClickVideo"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
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
                          onClickImage: (url) => unref(popup).image(url),
                          onClickVideo: (url) => unref(popup).video(url)
                        }, null, 8, ["media", "onClickImage", "onClickVideo"])
                      ]),
                      _: 2
                    }, 1032, ["username", "permalink", "timestamp"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(threadsLatestMediasStore).fetching && !noMoreData.value) {
              _push2(ssrRenderComponent(Loadmore, {
                class: "loadmore",
                loading: unref(fetching),
                onLoadmore: fetchNextPageThreadsMedias
              }, {
                normal: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button class="normal" data-v-4cb96047${_scopeId2}><i class="iconfont icon-loadmore" data-v-4cb96047${_scopeId2}></i></button>`);
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
                      width: "2.2rem",
                      height: "1.2rem",
                      gap: "lg"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_loading_indicator, {
                        class: "loading",
                        width: "2.2rem",
                        height: "1.2rem",
                        gap: "lg"
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
              createVNode("div", null, [
                createVNode(MasonryWall, {
                  "row-gap": "2.2rem",
                  "col-gap": "2rem",
                  columns: 3,
                  "initial-items": unref(threadsLatestMediasStore).data?.data || [],
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
                          onClickImage: (url) => unref(popup).image(url),
                          onClickVideo: (url) => unref(popup).video(url)
                        }, null, 8, ["media", "onClickImage", "onClickVideo"])
                      ]),
                      _: 2
                    }, 1032, ["username", "permalink", "timestamp"])
                  ]),
                  _: 1
                }, 8, ["initial-items", "onMounted"]),
                !unref(threadsLatestMediasStore).fetching && !noMoreData.value ? (openBlock(), createBlock(Loadmore, {
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
                      width: "2.2rem",
                      height: "1.2rem",
                      gap: "lg"
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
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/desktop/index.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const DesktopSnippetsPage = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-4cb96047"]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "threads-media-card" }, _attrs))} data-v-81670194>`);
      if (unref(mediaUrl)) {
        _push(`<div class="${ssrRenderClass([{ audio: __props.media.media_type === "AUDIO" }, "media"])}" data-v-81670194>`);
        if (__props.media.media_type === "AUDIO") {
          _push(`<audio class="audio"${ssrRenderAttr("src", unref(mediaUrl))} controls data-v-81670194></audio>`);
        } else if (__props.media.media_type === "VIDEO") {
          _push(`<video class="video"${ssrRenderAttr("src", unref(mediaUrl))} controls data-v-81670194></video>`);
        } else {
          _push(`<img class="image"${ssrRenderAttr("alt", __props.media.text)}${ssrRenderAttr("src", unref(mediaUrl))} loading="lazy" draggable="false" data-v-81670194>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$1I, {
        class: "content",
        compact: "",
        title: __props.media.text,
        markdown: __props.media.text,
        "render-options": { codeLineNumbers: false }
      }, null, _parent));
      _push(`<div class="footer" data-v-81670194>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        title: __props.media.username,
        href: __props.media.permalink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.media.is_quote_post) {
              _push2(`<i class="iconfont icon-repost" data-v-81670194${_scopeId}></i>`);
            } else {
              _push2(`<i class="iconfont icon-threads" data-v-81670194${_scopeId}></i>`);
            }
            _push2(`<span class="username" data-v-81670194${_scopeId}>thread</span>`);
          } else {
            return [
              __props.media.is_quote_post ? (openBlock(), createBlock("i", {
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
      _push(`<div class="timestamp" data-v-81670194>`);
      _push(ssrRenderComponent(_component_udate, {
        to: "ago",
        date: __props.media.timestamp
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/mobile/card-threads.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const ThreadsCard = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-81670194"]]);
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { goLinks, popup } = useEnhancer();
    const threadsLatestMediasStore = useThreadsLatestMediasStore();
    const masonryRef = shallowRef();
    const lastPaging = shallowRef(null);
    const noMoreData = shallowRef(false);
    const { fetchMedias, fetching } = useThreadsMediasRequest();
    const fetchNextPageThreadsMedias = async () => {
      if (threadsLatestMediasStore.fetching || fetching.value || noMoreData.value) return;
      const secondPage = threadsLatestMediasStore.data?.paging.cursors.after;
      const nextPage = lastPaging.value?.cursors?.after;
      const response = await fetchMedias(nextPage ?? secondPage);
      lastPaging.value = response.paging;
      noMoreData.value = !response.paging.cursors?.after;
      masonryRef.value?.appendItems(response.data);
    };
    useSnippetsPageMeta();
    useUniversalFetch(() => threadsLatestMediasStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_loading_indicator = resolveComponent("loading-indicator");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "snippets-page" }, _attrs))} data-v-03024b8e>`);
      _push(ssrRenderComponent(MobileBanner, {
        "background-image": unref(mobileBannerImageUrl),
        "background-image-y": 80,
        cdn: ""
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_webfont, { bolder: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).PAGE_SNIPPETS
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_SNIPPETS
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_webfont, { bolder: "" }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).PAGE_SNIPPETS
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        description: withCtx((_, _push2, _parent2, _scopeId) => {
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
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_placeholder, {
        loading: unref(threadsLatestMediasStore).fetching,
        "has-data": !!unref(threadsLatestMediasStore).data?.data.length
      }, {
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="snippets-skeleton" data-v-03024b8e${_scopeId}><div class="socials" data-v-03024b8e${_scopeId}><!--[-->`);
            ssrRenderList(3, (i) => {
              _push2(ssrRenderComponent(_component_skeleton, {
                class: "item",
                key: i
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><div class="cards" data-v-03024b8e${_scopeId}><!--[-->`);
            ssrRenderList(6, (i) => {
              _push2(`<div class="item" data-v-03024b8e${_scopeId}>`);
              _push2(ssrRenderComponent(_component_skeleton, { class: "title" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "line" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "line" }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_skeleton, { class: "line" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "snippets-skeleton" }, [
                createVNode("div", { class: "socials" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(3, (i) => {
                    return createVNode(_component_skeleton, {
                      class: "item",
                      key: i
                    });
                  }), 64))
                ]),
                createVNode("div", { class: "cards" }, [
                  (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                    return createVNode("div", {
                      class: "item",
                      key: i
                    }, [
                      createVNode(_component_skeleton, { class: "title" }),
                      createVNode(_component_skeleton, { class: "line" }),
                      createVNode(_component_skeleton, { class: "line" }),
                      createVNode(_component_skeleton, { class: "line" })
                    ]);
                  }), 64))
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="snippets-content" data-v-03024b8e${_scopeId}><div class="socials" data-v-03024b8e${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item",
              href: unref(goLinks).threads
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="label" data-v-03024b8e${_scopeId2}><i class="iconfont icon-threads" data-v-03024b8e${_scopeId2}></i><span class="text" data-v-03024b8e${_scopeId2}>Threads</span></p><p class="username" data-v-03024b8e${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).THREADS_USERNAME)}</p>`);
                } else {
                  return [
                    createVNode("p", { class: "label" }, [
                      createVNode("i", { class: "iconfont icon-threads" }),
                      createVNode("span", { class: "text" }, "Threads")
                    ]),
                    createVNode("p", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).THREADS_USERNAME), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_ulink, {
              class: "item",
              href: unref(goLinks).zhihu
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="label" data-v-03024b8e${_scopeId2}><i class="iconfont icon-zhihu-full" data-v-03024b8e${_scopeId2}></i><span class="text" data-v-03024b8e${_scopeId2}>回答</span></p><p class="username" data-v-03024b8e${_scopeId2}>@${ssrInterpolate(unref(IDENTITIES).ZHIHU_USERNAME)}</p>`);
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
              "row-gap": "1rem",
              "col-gap": "1rem",
              columns: 2,
              "initial-items": unref(threadsLatestMediasStore).data?.data || [],
              "ssr-initial-render": true,
              onMounted: ($event) => masonryRef.value = $event
            }, {
              default: withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(ThreadsCard, {
                    media: item,
                    onClickImage: (url) => unref(popup).image(url)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(ThreadsCard, {
                      media: item,
                      onClickImage: (url) => unref(popup).image(url)
                    }, null, 8, ["media", "onClickImage"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(threadsLatestMediasStore).fetching && !noMoreData.value) {
              _push2(ssrRenderComponent(Loadmore, {
                class: "loadmore",
                loading: unref(fetching),
                onLoadmore: fetchNextPageThreadsMedias
              }, {
                normal: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<button class="normal" data-v-03024b8e${_scopeId2}><i class="iconfont icon-loadmore" data-v-03024b8e${_scopeId2}></i></button>`);
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
                      width: "2rem",
                      height: "1rem",
                      gap: "lg"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_loading_indicator, {
                        width: "2rem",
                        height: "1rem",
                        gap: "lg"
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
                    href: unref(goLinks).threads
                  }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "label" }, [
                        createVNode("i", { class: "iconfont icon-threads" }),
                        createVNode("span", { class: "text" }, "Threads")
                      ]),
                      createVNode("p", { class: "username" }, "@" + toDisplayString(unref(IDENTITIES).THREADS_USERNAME), 1)
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(_component_divider, { type: "vertical" }),
                  createVNode(_component_ulink, {
                    class: "item",
                    href: unref(goLinks).zhihu
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
                  "row-gap": "1rem",
                  "col-gap": "1rem",
                  columns: 2,
                  "initial-items": unref(threadsLatestMediasStore).data?.data || [],
                  "ssr-initial-render": true,
                  onMounted: ($event) => masonryRef.value = $event
                }, {
                  default: withCtx(({ item }) => [
                    createVNode(ThreadsCard, {
                      media: item,
                      onClickImage: (url) => unref(popup).image(url)
                    }, null, 8, ["media", "onClickImage"])
                  ]),
                  _: 1
                }, 8, ["initial-items", "onMounted"]),
                !unref(threadsLatestMediasStore).fetching && !noMoreData.value ? (openBlock(), createBlock(Loadmore, {
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
                      width: "2rem",
                      height: "1rem",
                      gap: "lg"
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
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/snippets/mobile/index.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const MobileSnippetsPage = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-03024b8e"]]);
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
            message: i18n.t(LocalesKey.QUERY_PARAMS_ERROR) + "Invalid Article ID (number)"
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
            message: i18n.t(LocalesKey.QUERY_PARAMS_ERROR) + "Invalid Category slug (string)"
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
            message: i18n.t(LocalesKey.QUERY_PARAMS_ERROR) + "Invalid Tag slug (string)"
          });
        }
      }
    }
  },
  {
    path: "/date/:date",
    name: "date-listing",
    components: {
      default: DateListingPage,
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
            message: i18n.t(LocalesKey.QUERY_PARAMS_ERROR) + "Invalid date (YYYY-MM-DD)"
          });
        }
      }
    }
  },
  {
    path: "/search/:keyword",
    name: "search-listing",
    components: {
      default: SearchListingPage,
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
            message: i18n.t(LocalesKey.QUERY_PARAMS_ERROR) + "Missing search keywords"
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
          message: i18n.t(LocalesKey.NOT_FOUND)
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
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "empty",
  __ssrInlineRender: true,
  props: {
    bold: { type: Boolean },
    size: {},
    placeholder: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["empty", [__props.size, { bold: __props.bold }]]
      }, _attrs))} data-v-5c4924d8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        if (__props.placeholder) {
          _push(`<!--[-->${ssrInterpolate(__props.placeholder)}<!--]-->`);
        } else {
          _push(ssrRenderComponent(_component_i18n, {
            k: unref(LocalesKey).EMPTY_PLACEHOLDER
          }, null, _parent));
        }
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/empty.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const Empty = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-5c4924d8"]]);
const _sfc_main$D = /* @__PURE__ */ defineComponent({
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
          __props.bolder ? "bolder" : "medium",
          unref(isZhLang) ? "zh" : "en",
          { boldZh: __props.boldZh },
          { boldEn: __props.boldEn },
          { uppercase: __props.uppercase }
        ]
      }, _attrs))} data-v-e296427a>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/webfont.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const Webfont = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-e296427a"]]);
const _sfc_main$C = /* @__PURE__ */ defineComponent({
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
        class: ["divider", [__props.type, __props.size, { dashed: __props.dashed }, { slot: !!_ctx.$slots.default }]],
        style: __props.color ? { "--border-color": __props.color } : {}
      }, _attrs))} data-v-72be5ff0>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/divider.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const Divider = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["__scopeId", "data-v-72be5ff0"]]);
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
      let resultText = "";
      if (props.to === "YMD") {
        resultText = dateToYMD(date, props.separator);
      }
      if (props.to === "YMDm") {
        const ymd = dateToYMD(date, props.separator);
        const meridiem = date.getHours() > 11 ? i18n.t(LocalesKey.MOMENT_PM) : i18n.t(LocalesKey.MOMENT_AM);
        resultText = `${ymd} ${meridiem}`;
      }
      if (props.to === "ago") {
        const pluralize = (time, label) => {
          const ago = `${time} ${label}`;
          return i18n.t(LocalesKey.MOMENT_AGO, null, { date: ago });
        };
        const between = Date.now() / 1e3 - Number(date) / 1e3;
        const hourS = 3600;
        const dayS = hourS * 24;
        const weekS = dayS * 7;
        const monthS = dayS * 30;
        const yearS = monthS * 12;
        if (between < hourS) {
          resultText = ~~(between / 60) === 0 ? i18n.t(LocalesKey.MOMENT_JUST_NOW) : pluralize(~~(between / 60), i18n.t(LocalesKey.MOMENT_MINUTES));
        } else if (between < dayS) {
          resultText = pluralize(~~(between / hourS), i18n.t(LocalesKey.MOMENT_HOURS));
        } else if (between < weekS) {
          resultText = pluralize(~~(between / dayS), i18n.t(LocalesKey.MOMENT_DAYS));
        } else if (between < monthS) {
          resultText = pluralize(~~(between / weekS), i18n.t(LocalesKey.MOMENT_WEEKS));
        } else if (between < yearS) {
          resultText = pluralize(~~(between / monthS), i18n.t(LocalesKey.MOMENT_MONTHS));
        } else {
          resultText = pluralize(~~(between / yearS), i18n.t(LocalesKey.MOMENT_YEAR));
        }
      }
      return h(
        "time",
        {
          datetime: date.toISOString(),
          ...props.to === "ago" ? { "data-allow-mismatch": "text" } : {}
        },
        resultText
      );
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
const Placeholder = defineComponent({
  name: "Placeholder",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    hasData: {
      type: Boolean,
      default: void 0
    },
    transitionName: {
      type: String,
      default: "module"
    },
    transitionMode: {
      type: String,
      default: "out-in"
    }
  },
  emits: [
    "after-enter"
    /* AfterEnter */
  ],
  setup(props, { slots, emit }) {
    return () => {
      const { loading, hasData, transitionName, transitionMode } = props;
      let currentKey;
      let currentSlot;
      if (loading) {
        currentKey = "loading";
        currentSlot = slots.loading?.();
      } else if (hasData === true || _isUndefined(hasData)) {
        currentKey = "default";
        currentSlot = slots.default?.();
      } else {
        currentKey = "placeholder";
        currentSlot = slots.placeholder?.();
      }
      return h(
        Transition,
        {
          name: transitionName,
          mode: transitionMode,
          onAfterEnter(...args) {
            emit("after-enter", ...args);
          }
        },
        () => h("div", { key: currentKey, class: "placeholder-wrapper" }, currentSlot)
      );
    };
  }
});
const _sfc_main$B = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "skeleton" }, _attrs))} data-v-1db237db></div>`);
}
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/skeleton.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const Skeleton = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-1db237db"]]);
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
  app.directive(DIRECTIVE_NAME, vDisabledWallflower);
  app.component("Webfont", Webfont);
  app.component("Empty", Empty);
  app.component("Udate", Udate);
  app.component("Ulink", Ulink);
  app.component("Uimage", Uimage);
  app.component("Divider", Divider);
  app.component("Placeholder", Placeholder);
  app.component("ClientOnly", ClientOnly);
  app.component("Responsive", Responsive);
  app.component("DesktopOnly", DesktopOnly);
  app.component("LoadingIndicator", LoadingIndicator);
  app.component("Skeleton", Skeleton);
}
const DEFAULT_OPTIONS = Object.freeze({
  duration: 3e3,
  throttle: 200
});
const CSS_HIDDEN_TRANSITION_DURATION = 200;
const createNavigationProgressState = (options) => {
  const duration = DEFAULT_OPTIONS.duration;
  const throttle = DEFAULT_OPTIONS.throttle;
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
    if (throttle) {
      _throttle = setTimeout(() => _startTimer(), throttle);
    } else {
      _startTimer();
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
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    spin: Boolean,
    height: {
      type: Number,
      default: 3
    }
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const state = createNavigationProgressState();
    const teardownBefore = router.beforeEach(() => state.start());
    const teardownAfter = router.afterEach(() => state.finish());
    const teardownError = router.onError(() => state.finish());
    onBeforeUnmount(() => {
      state.clear();
      teardownBefore();
      teardownAfter();
      teardownError();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: "navigation-progress",
        class: { visible: unref(state).isLoading.value },
        style: { "--height": props.height + "px" }
      }, _attrs))} data-v-5b82a1d6><div class="progress" style="${ssrRenderStyle({ transform: `scaleX(${unref(state).progress.value / 100})` })}" data-v-5b82a1d6></div>`);
      if (props.spin) {
        _push(`<div class="spin" data-v-5b82a1d6><div class="spin-ring" data-v-5b82a1d6><div data-v-5b82a1d6></div><div data-v-5b82a1d6></div><div data-v-5b82a1d6></div><div data-v-5b82a1d6></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/common/navigation-progress/index.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const NavProgress = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-5b82a1d6"]]);
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
const logger = createLogger("APP:User");
var TabKeys = /* @__PURE__ */ ((TabKeys2) => {
  TabKeys2["Profile"] = "profile";
  TabKeys2["Connections"] = "connections";
  TabKeys2["Comments"] = "comments";
  return TabKeys2;
})(TabKeys || {});
const TABS = [
  {
    id: "profile",
    i18n: { zh: "个人资料", en: "Profile" }
  },
  {
    id: "connections",
    i18n: { zh: "账号绑定", en: "Connections" }
  },
  {
    id: "comments",
    i18n: { zh: "我的评论", en: "Comments" }
  }
];
const useTabState = (initialTabKey) => {
  useEnhancer();
  const activeId = ref(initialTabKey);
  const activeTab = computed(() => TABS.find((t) => t.id === activeId.value));
  const setTabKey = (id) => {
    activeId.value = id;
  };
  return {
    activeId,
    activeProvider: activeTab,
    setTabKey
  };
};
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  setup(__props) {
    const { identity, i18n: _i18n } = useEnhancer();
    const isUpdating = ref(false);
    const createProfileState = (profile) => ({
      name: profile?.name || "",
      email: profile?.email || "",
      website: profile?.website || "",
      avatar_url: profile?.avatar_url || ""
    });
    const localProfile = reactive(createProfileState(identity.userProfile));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "user-profile" }, _attrs))} data-v-d5dca0d7><label class="item" data-v-d5dca0d7><h5 class="title" data-v-d5dca0d7>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).COMMENT_AUTHOR_NAME
      }, null, _parent));
      _push(` *</h5><input${ssrRenderAttr("value", localProfile.name)} required type="text" name="name" class="input" autocomplete="on"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_AUTHOR_NAME) + " *")} data-v-d5dca0d7><p class="extra" data-v-d5dca0d7>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "名字将公开显示在评论区",
        en: "Displayed publicly in comments"
      }, null, _parent));
      _push(`</p></label><label class="item" data-v-d5dca0d7><h5 class="title" data-v-d5dca0d7>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).COMMENT_AUTHOR_EMAIL
      }, null, _parent));
      _push(` *</h5><input${ssrRenderAttr("value", localProfile.email)} required type="email" name="email" class="input" autocomplete="on"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_AUTHOR_EMAIL) + " *")} data-v-d5dca0d7><p class="extra" data-v-d5dca0d7>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "此邮箱不作验证使用，仅用于接收回复通知",
        en: "No verification required. Used only for notifications"
      }, null, _parent));
      _push(`</p></label><label class="item" data-v-d5dca0d7><h5 class="title" data-v-d5dca0d7>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).COMMENT_AUTHOR_WEBSITE
      }, null, _parent));
      _push(`</h5><input${ssrRenderAttr("value", localProfile.website)} type="url" name="website" class="input" autocomplete="off"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_AUTHOR_WEBSITE))} data-v-d5dca0d7></label><label class="item" data-v-d5dca0d7><h5 class="title" data-v-d5dca0d7>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).COMMENT_AUTHOR_AVATAR
      }, null, _parent));
      _push(`</h5><input${ssrRenderAttr("value", localProfile.avatar_url)} type="url" name="avatar" class="input" autocomplete="off"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).COMMENT_AUTHOR_AVATAR))} data-v-d5dca0d7></label><button type="submit" class="submit"${ssrIncludeBooleanAttr(isUpdating.value) ? " disabled" : ""} data-v-d5dca0d7>`);
      if (isUpdating.value) {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).SUBMITTING
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).SUBMIT
        }, null, _parent));
      }
      _push(`</button></form>`);
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/user-panel/profile.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const UserProfile = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-d5dca0d7"]]);
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "connections",
  __ssrInlineRender: true,
  setup(__props) {
    const isProcessing = ref(false);
    const { identity } = useEnhancer();
    const identityList = computed(() => {
      const ids = identity.userProfile?.identities ?? [];
      const googleInfo = ids.find((id) => id.provider === UserIdentityProvider.Google);
      const gitHubInfo = ids.find((id) => id.provider === UserIdentityProvider.GitHub);
      return [
        {
          title: "Google",
          icon: "icon-google",
          provider: UserIdentityProvider.Google,
          linked: !!googleInfo,
          displayId: googleInfo?.email || googleInfo?.display_name
        },
        {
          title: "GitHub",
          icon: "icon-github",
          provider: UserIdentityProvider.GitHub,
          linked: !!gitHubInfo,
          displayId: gitHubInfo?.username || gitHubInfo?.display_name
        }
      ];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "user-connections" }, _attrs))} data-v-6d2d7b2d><!--[-->`);
      ssrRenderList(identityList.value, (item) => {
        _push(`<div class="item" data-v-6d2d7b2d><h5 class="title" data-v-6d2d7b2d><i class="${ssrRenderClass([item.icon, "iconfont"])}" data-v-6d2d7b2d></i><span class="provider" data-v-6d2d7b2d>${ssrInterpolate(item.title)}</span></h5><div class="info" data-v-6d2d7b2d>`);
        if (item.linked) {
          _push(`<div data-v-6d2d7b2d><p data-v-6d2d7b2d>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: "已绑定：",
            en: "Linked: "
          }, null, _parent));
          _push(`${ssrInterpolate(item.displayId)}</p><button class="unlink-btn"${ssrIncludeBooleanAttr(isProcessing.value) ? " disabled" : ""} data-v-6d2d7b2d>`);
          _push(ssrRenderComponent(_component_i18n, {
            k: unref(LocalesKey).USER_IDENTITY_UNLINK
          }, null, _parent));
          _push(`</button></div>`);
        } else {
          _push(`<button class="link-btn"${ssrIncludeBooleanAttr(isProcessing.value) ? " disabled" : ""} data-v-6d2d7b2d>`);
          _push(ssrRenderComponent(_component_i18n, {
            k: unref(LocalesKey).USER_IDENTITY_LINK
          }, null, _parent));
          _push(`</button>`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/user-panel/connections.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const UserConnections = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-6d2d7b2d"]]);
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "comments",
  __ssrInlineRender: true,
  setup(__props) {
    const { identity } = useEnhancer();
    const isFetching = shallowRef(false);
    const isDeleting = shallowRef(false);
    const comments = shallowRef([]);
    const fetchComments = async () => {
      try {
        isFetching.value = true;
        const response = await nodepress$1.get("/account/comments", { token: identity.token });
        comments.value = response.result;
      } catch (error) {
        logger.failure(`Fetch user's commnts failed.`, error);
        alert(getMessageFromNormalError(error));
      } finally {
        isFetching.value = false;
      }
    };
    onMounted(() => fetchComments());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_udate = resolveComponent("udate");
      _push(`<!--[-->`);
      if (isFetching.value) {
        _push(`<p class="loading" data-v-994a690e>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).ARTICLE_LIST_LOADING
        }, null, _parent));
        _push(`</p>`);
      } else if (!comments.value.length) {
        _push(`<p class="empty" data-v-994a690e>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).EMPTY_PLACEHOLDER
        }, null, _parent));
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ul class="user-comments" data-v-994a690e><!--[-->`);
      ssrRenderList(comments.value, (comment, index) => {
        _push(`<li class="item" data-v-994a690e><p class="context" data-v-994a690e><span class="floor" data-v-994a690e>#${ssrInterpolate(comment.id)}</span></p><p class="content" data-v-994a690e>${ssrInterpolate(comment.content)}</p><p class="meta" data-v-994a690e>`);
        _push(ssrRenderComponent(_component_udate, {
          to: "ago",
          date: comment.created_at
        }, null, _parent));
        _push(`<button class="delete"${ssrIncludeBooleanAttr(isFetching.value || isDeleting.value) ? " disabled" : ""} data-v-994a690e>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).COMMENT_DELETE
        }, null, _parent));
        _push(`</button></p></li>`);
      });
      _push(`<!--]--></ul><!--]-->`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/user-panel/comments.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const UserComments = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-994a690e"]]);
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { identity } = useEnhancer();
    const { activeId } = useTabState(TabKeys.Profile);
    onMounted(() => {
      identity.fetchUserProfile();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_uimage = resolveComponent("uimage");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "user-panel-modal" }, _attrs))} data-v-bd1661d8><div class="sidebar" data-v-bd1661d8><div class="avatar" data-v-bd1661d8>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: ["image", {
          moderator: unref(identity).userProfile?.type === unref(UserType).Moderator,
          patron: unref(identity).userProfile?.type === unref(UserType).Patron
        }],
        src: unref(identity).userProfile?.avatar_url || ""
      }, null, _parent));
      _push(`</div><div class="menus" data-v-bd1661d8><!--[-->`);
      ssrRenderList(unref(TABS), (item) => {
        _push(`<button class="${ssrRenderClass([{ active: item.id === unref(activeId) }, "item"])}" data-v-bd1661d8>`);
        _push(ssrRenderComponent(_component_i18n, mergeProps({ ref_for: true }, item.i18n), null, _parent));
        _push(`</button>`);
      });
      _push(`<!--]--></div></div><div class="content" data-v-bd1661d8>`);
      if (unref(activeId) === unref(TabKeys).Profile) {
        _push(ssrRenderComponent(UserProfile, null, null, _parent));
      } else if (unref(activeId) === unref(TabKeys).Connections) {
        _push(ssrRenderComponent(UserConnections, null, null, _parent));
      } else if (unref(activeId) === unref(TabKeys).Comments) {
        _push(ssrRenderComponent(UserComments, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="close" title="Close" data-v-bd1661d8><i class="iconfont icon-cancel" data-v-bd1661d8></i></button></div>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/user-panel/index.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const UserPanel = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-bd1661d8"]]);
const createMusicPlayer = (config) => {
  const initIndex = config.index ?? 0;
  const initVolume = config.volume ?? 0.6;
  const state = reactive({
    initialized: false,
    index: initIndex,
    // current playing song index
    volume: initVolume,
    muted: false,
    playing: false,
    duration: 0,
    currentTime: 0,
    progress: 0
  });
  const playlist = reactive({
    fetching: false,
    songs: [],
    total: 0,
    unplayableIndexs: []
  });
  const currentSong = computed(() => {
    if (state.initialized && !_isUndefined(state.index)) {
      return playlist.songs[state.index];
    } else {
      return void 0;
    }
  });
  const audio = new Audio();
  audio.preload = "metadata";
  audio.autoplay = false;
  audio.loop = false;
  audio.volume = initVolume;
  const pause = () => {
    audio.pause();
  };
  const play = (index) => {
    if (index != null) {
      state.index = index;
      state.currentTime = 0;
      state.progress = 0;
      audio.src = playlist.songs[index].url;
      audio.play().catch(() => {
      });
    } else {
      audio.play().catch(() => {
      });
    }
  };
  const prevSong = () => {
    play(state.index > 0 ? state.index - 1 : playlist.total - 1);
  };
  const nextSong = () => {
    play(state.index < playlist.total - 1 ? state.index + 1 : 0);
  };
  const setVolume = (volume) => {
    audio.volume = volume;
  };
  const toggleMuted = () => {
    audio.muted = !audio.muted;
  };
  const togglePlay = () => {
    audio.paused ? play() : pause();
  };
  audio.addEventListener("play", () => {
    state.playing = true;
  });
  audio.addEventListener("pause", () => {
    state.playing = false;
  });
  audio.addEventListener("ended", () => {
    state.playing = false;
    {
      window.setTimeout(nextSong, config.delay);
    }
  });
  audio.addEventListener("volumechange", () => {
    state.volume = audio.volume;
    state.muted = audio.muted;
  });
  audio.addEventListener("durationchange", () => {
    state.duration = audio.duration;
  });
  audio.addEventListener("timeupdate", () => {
    state.currentTime = audio.currentTime;
    state.progress = audio.currentTime / audio.duration;
  });
  audio.addEventListener("error", () => {
    config.logger.warn("something error! auto next", toRaw(unref(currentSong.value)));
    state.playing = false;
    playlist.unplayableIndexs.push(state.index);
    window.setTimeout(nextSong, 1668);
  });
  const init = async () => {
    try {
      playlist.fetching = true;
      playlist.songs = await tunnel$1.fetch(TunnelModule.NetEaseMusic);
      playlist.total = playlist.songs.length;
      if (playlist.total) {
        audio.src = playlist.songs[state.index].url;
        state.initialized = true;
      } else {
        throw "Empty playlist!";
      }
    } finally {
      playlist.fetching = false;
    }
  };
  return {
    audio,
    state: readonly(state),
    playlist: readonly(playlist),
    currentSong,
    init,
    play,
    pause,
    setVolume,
    toggleMuted,
    togglePlay,
    prevSong,
    nextSong
  };
};
const useCoverArtURL = (url) => {
  return url ? getCdnProxyURL(useCdnDomain(), `${url}?param=300y300`) : url;
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "handle",
  __ssrInlineRender: true,
  props: {
    player: {}
  },
  emits: ["operate", "open-modal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { state, currentSong } = props.player;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["music-player-handle", { playing: unref(state).playing }]
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-36cd9371><div class="panel" data-v-36cd9371><div class="control" data-v-36cd9371><button class="button prev-song"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-36cd9371><i class="iconfont icon-music-prev" data-v-36cd9371></i></button><button class="button next-song"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-36cd9371><i class="iconfont icon-music-next" data-v-36cd9371></i></button><button class="button muted-toggle"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-36cd9371><i class="${ssrRenderClass([unref(state).muted ? "icon-music-muted" : "icon-music-unmuted", "iconfont"])}" data-v-36cd9371></i></button><button class="button player" data-v-36cd9371><i class="iconfont icon-netease-music" data-v-36cd9371></i></button></div><button class="song-link" data-v-36cd9371>`);
      if (unref(currentSong)) {
        _push(`<span data-v-36cd9371>${ssrInterpolate(unref(currentSong).name)}</span>`);
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).MUSIC_PLACEHOLDER
        }, null, _parent));
      }
      _push(`</button></div><div class="cd" data-v-36cd9371><img class="${ssrRenderClass([{ spinning: __props.player.state.playing }, "image"])}"${ssrRenderAttr("src", unref(useCoverArtURL)(unref(currentSong)?.cover_art_url))} data-v-36cd9371><button class="toggle-button"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-36cd9371><i class="${ssrRenderClass([unref(state).playing ? "icon-music-pause" : "icon-music-play", "iconfont"])}" data-v-36cd9371></i></button></div><div class="trigger" data-v-36cd9371><i class="iconfont icon-music" data-v-36cd9371></i></div></div>`);
    };
  }
});
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/music-player/handle.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const MusicPlayerHandle = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-36cd9371"]]);
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "player",
  __ssrInlineRender: true,
  props: {
    player: {}
  },
  setup(__props) {
    const props = __props;
    const { state, playlist, currentSong } = props.player;
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "music-player-main" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-593d0044><div class="panel" data-v-593d0044><div class="song" data-v-593d0044><img class="cover"${ssrRenderAttr("src", unref(useCoverArtURL)(unref(currentSong)?.cover_art_url))} draggable="false" data-v-593d0044>`);
      if (unref(currentSong)) {
        _push(`<div class="info" data-v-593d0044><p class="title" data-v-593d0044><span class="name" data-v-593d0044>${ssrInterpolate(unref(currentSong).name)}</span><span class="artist" data-v-593d0044>${ssrInterpolate(unref(currentSong).artist)}</span></p><p class="duration" data-v-593d0044><span data-v-593d0044>${ssrInterpolate(getSecondsView(unref(state).currentTime))}</span><span data-v-593d0044> / </span><span data-v-593d0044>${ssrInterpolate(getSecondsView(unref(currentSong).duration / 1e3))}</span></p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="control" data-v-593d0044><button class="current-song prev"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-593d0044><i class="iconfont icon-music-prev" data-v-593d0044></i></button><button class="toggle-play"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-593d0044><i class="${ssrRenderClass([unref(state).playing ? "icon-music-pause" : "icon-music-play", "iconfont"])}" data-v-593d0044></i></button><button class="current-song next"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-593d0044><i class="iconfont icon-music-next" data-v-593d0044></i></button></div><div class="tools" data-v-593d0044>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "indexed-link",
        href: unref(RESOURCE_LINKS).MUSIC_163_PLAYLIST
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(state).index + 1)} / ${ssrInterpolate(unref(playlist).total)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(state).index + 1) + " / " + toDisplayString(unref(playlist).total), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="toggle-muted"${ssrIncludeBooleanAttr(!unref(state).initialized) ? " disabled" : ""} data-v-593d0044><i class="${ssrRenderClass([unref(state).muted ? "icon-music-muted" : "icon-music-unmuted", "iconfont"])}" data-v-593d0044></i></button><input class="volume" type="range" min="0.1" max="1" step="0.1"${ssrRenderAttr("value", unref(state).volume)} data-v-593d0044></div></div><div class="progress" data-v-593d0044><div class="played" style="${ssrRenderStyle({ width: `${unref(state).progress * 100}%` })}" data-v-593d0044></div></div><div class="songs" data-v-593d0044><ul class="list" data-v-593d0044><!--[-->`);
      ssrRenderList(unref(playlist).songs, (song, index) => {
        _push(`<li class="${ssrRenderClass([{ playing: unref(state).index === index, unplayable: isUnPlayableSong(index) }, "item"])}" data-v-593d0044><div class="index" data-v-593d0044>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</div>`);
        if (unref(state).index === index) {
          _push(`<span class="play" data-v-593d0044><i class="iconfont icon-music-unmuted" data-v-593d0044></i></span>`);
        } else {
          _push(`<button class="play"${ssrIncludeBooleanAttr(isUnPlayableSong(index)) ? " disabled" : ""} data-v-593d0044><i class="iconfont icon-music-play" data-v-593d0044></i></button>`);
        }
        _push(ssrRenderComponent(_component_ulink, {
          class: "name",
          title: song.name,
          href: unref(get163MusicSongDetailURL)(song.id)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text" data-v-593d0044${_scopeId}>${ssrInterpolate(song.name)}</span><i class="iconfont icon-new-window-s" data-v-593d0044${_scopeId}></i>`);
            } else {
              return [
                createVNode("span", { class: "text" }, toDisplayString(song.name), 1),
                createVNode("i", { class: "iconfont icon-new-window-s" })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="artist"${ssrRenderAttr("title", song.artist)} data-v-593d0044>${ssrInterpolate(song.artist)}</div><div class="duration" data-v-593d0044>${ssrInterpolate(getSecondsView(song.duration / 1e3))}</div></li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/music-player/player.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const MusicPlayerMain = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-593d0044"]]);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useEnhancer();
    const logger2 = createLogger("APP:MusicPlayer");
    const musicPlayerConfig = {
      logger: logger2,
      delay: 668
    };
    const globalProps = window.$app?.config.globalProperties;
    const player = globalProps?.$musicPlayer ?? createMusicPlayer(musicPlayerConfig);
    if (globalProps) globalProps.$musicPlayer ??= player;
    const isOnPlayerModel = ref(false);
    const openPlayerModel = () => isOnPlayerModel.value = true;
    const closePlayerModel = () => isOnPlayerModel.value = false;
    const handleHandleOperate = (label) => {
    };
    onMounted(() => {
      if (!player.state.initialized) {
        player.init().catch((error) => {
          logger2.failure("player init failed!", error);
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_popup = resolveComponent("popup");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(MusicPlayerHandle, {
        player: unref(player),
        onOperate: handleHandleOperate,
        onOpenModal: openPlayerModel
      }, null, _parent));
      _push(ssrRenderComponent(_component_popup, {
        visible: isOnPlayerModel.value,
        "onUpdate:visible": ($event) => isOnPlayerModel.value = $event,
        "body-scrollable": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(MusicPlayerMain, {
              player: unref(player),
              onClose: closePlayerModel
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(MusicPlayerMain, {
                player: unref(player),
                onClose: closePlayerModel
              }, null, 8, ["player"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/music-player/index.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const MusicPlayerEntry = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-2adfef5c"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
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
      }, _attrs))} data-v-ef6bd3f3>`);
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
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/wallflower/flower.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const Flower = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-ef6bd3f3"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "garden",
  __ssrInlineRender: true,
  setup(__props) {
    const EN_FLOWERS = ["💙", "🤍", "❤️"];
    const ZH_FLOWERS = ["布施", "持戒", "忍辱", "精進", "禪定", "般若"];
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
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "wallflower" }, _attrs))} data-v-f79d4469>`);
      if (state.flowers.length) {
        _push(`<ul class="garden-box" data-v-f79d4469><!--[-->`);
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
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/wallflower/garden.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const Wallflower = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-f79d4469"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "wall",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const { i18n: _i18n } = useEnhancer();
    const wallpaperStore = useWallpaperStore();
    const wallpapers = computed(() => wallpaperStore.papers(_i18n.language.value));
    const index = ref(0);
    const activePaper = computed(() => wallpapers.value?.[index.value]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "wall" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-fc749c9b><div class="picture-box"${ssrRenderAttr("title", activePaper.value.copyright)} style="${ssrRenderStyle({ backgroundImage: `url(${activePaper.value.humanizedImageUrl})` })}" data-v-fc749c9b></div><div class="story-box" data-v-fc749c9b>`);
      if (activePaper.value.title) {
        _push(`<!--[--><h2 class="title" data-v-fc749c9b>${ssrInterpolate(activePaper.value.title)}</h2><p class="sub-title" data-v-fc749c9b>${ssrInterpolate(activePaper.value.copyright)}</p><!--]-->`);
      } else {
        _push(`<h2 class="title lonely" data-v-fc749c9b>${ssrInterpolate(activePaper.value.copyright)}</h2>`);
      }
      _push(`<p class="description" data-v-fc749c9b>${ssrInterpolate(activePaper.value.desc)}</p><div class="tools" data-v-fc749c9b>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "button",
        href: activePaper.value.humanizedCopyrightUrl,
        title: activePaper.value.bsTitle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-bing" data-v-fc749c9b${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-bing" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="button" title="Prev"${ssrIncludeBooleanAttr(index.value <= 0) ? " disabled" : ""} data-v-fc749c9b><i class="iconfont icon-prev" data-v-fc749c9b></i></button><button class="button" title="Next"${ssrIncludeBooleanAttr(index.value >= wallpapers.value.length - 1) ? " disabled" : ""} data-v-fc749c9b><i class="iconfont icon-next" data-v-fc749c9b></i></button><button class="button" title="Close" data-v-fc749c9b><i class="iconfont icon-cancel" data-v-fc749c9b></i></button></div></div></div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/wallpaper/wall.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const Wallpapers = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-fc749c9b"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "switcher",
  __ssrInlineRender: true,
  setup(__props) {
    useEnhancer();
    useWallpaperStore();
    const isOnWallpaper = ref(false);
    const handleCloseWallpaper = () => {
      isOnWallpaper.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({ id: "wallpaper" }, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-a1de7c49><div class="switcher" data-v-a1de7c49><div class="title" data-v-a1de7c49><i class="iconfont icon-bing" data-v-a1de7c49></i><span class="text" data-v-a1de7c49>BING</span></div></div></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              visible: isOnWallpaper.value,
              "onUpdate:visible": ($event) => isOnWallpaper.value = $event,
              "body-scrollable": false,
              "mask-closable": false
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
                "body-scrollable": false,
                "mask-closable": false
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
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/wallpaper/switcher.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const Wallpaper = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-a1de7c49"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "background",
  __ssrInlineRender: true,
  setup(__props) {
    const { cdnDomain } = useEnhancer();
    const backgroundImage = getAssetURL(cdnDomain, "/images/background.png");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "background" }, _attrs))} data-v-04b977dc><div class="image" style="${ssrRenderStyle({ backgroundImage: `url('${unref(backgroundImage)}')` })}" data-v-04b977dc></div></div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/background.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const Background = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-04b977dc"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "toolbox",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n } = useEnhancer();
    ref(0);
    ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ id: "toolbox" }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-9877e3cb><div class="container" data-v-9877e3cb><div class="tools" data-v-9877e3cb><button class="ai" disabled data-v-9877e3cb><i class="iconfont icon-robot" data-v-9877e3cb></i></button><button class="to-page-top"${ssrRenderAttr("title", unref(_i18n).t(unref(LocalesKey).TO_TOP))} data-v-9877e3cb><i class="iconfont icon-totop" data-v-9877e3cb></i></button><button class="to-page-bottom"${ssrRenderAttr("title", unref(_i18n).t(unref(LocalesKey).TO_BOTTOM))} data-v-9877e3cb><i class="iconfont icon-tobottom" data-v-9877e3cb></i></button></div></div></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/toolbox.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const Toolbox = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-9877e3cb"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
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
    const { isZhLang } = useEnhancer();
    useAppOptionsStore();
    const historyStore = useHistoryStore();
    const state = reactive({
      emotion: 5,
      content: "",
      submitting: false,
      submitted: false
    });
    const isSubmitable = computed(() => {
      return Number.isInteger(state.emotion) && Boolean(state.content);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "feedback" }, _attrs))} data-v-a023f9b9>`);
      if (state.submitted) {
        _push(`<div class="submitted" data-v-a023f9b9><div class="icon" data-v-a023f9b9><i class="iconfont icon-success" data-v-a023f9b9></i></div><div class="text" data-v-a023f9b9>`);
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
        _push(`</div><button class="close" data-v-a023f9b9>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "关闭窗口",
          en: "Close"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!--[--><div class="title" data-v-a023f9b9>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`你认为 ${ssrInterpolate(unref(APP_PROFILE).title)} 整体怎么样？`);
            } else {
              return [
                createTextVNode("你认为 " + toDisplayString(unref(APP_PROFILE).title) + " 整体怎么样？", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`How would you rate ${ssrInterpolate(unref(APP_PROFILE).title)}?`);
            } else {
              return [
                createTextVNode("How would you rate " + toDisplayString(unref(APP_PROFILE).title) + "?", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="emotions" data-v-a023f9b9><!--[-->`);
        ssrRenderList(EMOTIONS, (emotion) => {
          _push(`<li class="item" data-v-a023f9b9><label data-v-a023f9b9><input class="radio" type="radio"${ssrRenderAttr("value", emotion.value)}${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""}${ssrIncludeBooleanAttr(ssrLooseEqual(state.emotion, emotion.value)) ? " checked" : ""} data-v-a023f9b9><div class="${ssrRenderClass([{ activated: state.emotion === emotion.value }, "button"])}" data-v-a023f9b9><span class="emoji" data-v-a023f9b9>${ssrInterpolate(emotion.emoji)}</span><span class="text" data-v-a023f9b9>`);
          _push(ssrRenderComponent(_component_i18n, {
            zh: emotion.zh,
            en: emotion.en
          }, null, _parent));
          _push(`</span></div></label>`);
          if (state.emotion === emotion.value) {
            _push(`<div class="arrow" data-v-a023f9b9></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></div><div class="input" data-v-a023f9b9><textarea class="textarea" name="feedback" id="feedback" rows="10" autofocus="true"${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(isZhLang) ? "你可在此畅所欲言，这将仅对博主可见" : "Tell me about your opinion...")} data-v-a023f9b9>${ssrInterpolate(state.content)}</textarea><div class="buttons" data-v-a023f9b9><button class="item cancel"${ssrIncludeBooleanAttr(state.submitting) ? " disabled" : ""} data-v-a023f9b9><span class="text" data-v-a023f9b9>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "取消",
          en: "Cancel"
        }, null, _parent));
        _push(`</span></button><button class="item submit"${ssrIncludeBooleanAttr(!isSubmitable.value || state.submitting) ? " disabled" : ""} data-v-a023f9b9><i class="iconfont icon-mail-plane" data-v-a023f9b9></i><span class="text" data-v-a023f9b9>`);
        _push(ssrRenderComponent(_component_i18n, {
          k: state.submitting ? unref(LocalesKey).SUBMITTING : unref(LocalesKey).SUBMIT
        }, null, _parent));
        _push(`</span></button></div></div><!--]-->`);
      }
      if (unref(historyStore).feedbacks.length) {
        _push(`<div class="history" data-v-a023f9b9>`);
        _push(ssrRenderComponent(_component_i18n, null, {
          zh: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`你已进行过 ${ssrInterpolate(unref(historyStore).feedbacks.length)} 次反馈。`);
            } else {
              return [
                createTextVNode("你已进行过 " + toDisplayString(unref(historyStore).feedbacks.length) + " 次反馈。", 1)
              ];
            }
          }),
          en: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`You have ${ssrInterpolate(unref(historyStore).feedbacks.length)} feedback history.`);
            } else {
              return [
                createTextVNode("You have " + toDisplayString(unref(historyStore).feedbacks.length) + " feedback history.", 1)
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
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/feedback.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const Feedback = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-a023f9b9"]]);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "statement",
  __ssrInlineRender: true,
  setup(__props) {
    const { appOptions } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "statement" }, _attrs))} data-v-3e394444><div class="content" data-v-3e394444>`);
      _push(ssrRenderComponent(_sfc_main$1I, {
        markdown: unref(appOptions)?.statement,
        compact: true
      }, null, _parent));
      _push(`<br data-v-3e394444><hr data-v-3e394444>`);
      if (unref(appOptions)) {
        _push(`<p class="email" data-v-3e394444><a${ssrRenderAttr("href", unref(getEmailLink)(unref(appOptions).site_email))} class="link" target="_blank" data-v-3e394444><i class="iconfont icon-mail" data-v-3e394444></i><span class="text" data-v-3e394444>${ssrInterpolate(unref(appOptions).site_email)}</span></a></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/statement.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const Statement = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-3e394444"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "privacy",
  __ssrInlineRender: true,
  setup(__props) {
    const content = shallowRef();
    const fetchPrivacyMarkdown = () => {
      vanilla("/privacy/index.md").then((respnse) => {
        content.value = respnse.data;
      });
    };
    onMounted(() => fetchPrivacyMarkdown());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "privacy" }, _attrs))} data-v-9a86b1fb>`);
      _push(ssrRenderComponent(_sfc_main$1I, {
        class: "content",
        markdown: content.value,
        compact: true
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/privacy.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const Privacy = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-9a86b1fb"]]);
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const { route, i18n: _i18n } = useEnhancer();
    shallowRef();
    const keyword = ref("");
    onMounted(() => {
      if (isSearchFlow(route.name)) {
        keyword.value = route.params.keyword;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "search" }, _attrs))} data-v-c1b3506f><form class="search-box" data-v-c1b3506f><input id="keyword" required type="search" name="search" maxlength="16" autocomplete="off"${ssrRenderAttr("value", keyword.value)} class="${ssrRenderClass([unref(_i18n).language, "search-input"])}"${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).SEARCH_PLACEHOLDER))} data-v-c1b3506f><button type="submit" class="search-btn" data-v-c1b3506f><i class="iconfont icon-search" data-v-c1b3506f></i></button></form>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "rss-btn",
        external: false,
        href: unref(BFF_CONFIG).route_path_rss
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-rss" data-v-c1b3506f${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", { class: "iconfont icon-rss" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/search.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const SidebarSearch = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-c1b3506f"]]);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "statistic",
  __ssrInlineRender: true,
  setup(__props) {
    const StatisticsSkeleton = defineComponent({
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
    const statisticStore = useNodepressStatisticsStore();
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
            _push2(`<div class="item" data-v-698f4f4b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticsSkeleton), {
              fetching: fetching.value,
              count: unref(statisticStore).data?.articles
            }, null, _parent2, _scopeId));
            _push2(`<span class="label" data-v-698f4f4b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).STATISTIC_ARTICLES
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
            _push2(ssrRenderComponent(_component_divider, {
              type: "vertical",
              size: "sm"
            }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-698f4f4b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticsSkeleton), {
              fetching: fetching.value,
              count: unref(statisticStore).data?.todayViews
            }, null, _parent2, _scopeId));
            _push2(`<span class="label" data-v-698f4f4b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).STATISTIC_TODAY_VIEWS
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
            _push2(ssrRenderComponent(_component_divider, {
              type: "vertical",
              size: "sm"
            }, null, _parent2, _scopeId));
            _push2(`<div class="item" data-v-698f4f4b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(StatisticsSkeleton), {
              fetching: fetching.value,
              count: unref(statisticStore).data?.comments
            }, null, _parent2, _scopeId));
            _push2(`<span class="label" data-v-698f4f4b${_scopeId}>`);
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).STATISTIC_COMMENTS
            }, null, _parent2, _scopeId));
            _push2(`</span></div>`);
          } else {
            return [
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticsSkeleton), {
                  fetching: fetching.value,
                  count: unref(statisticStore).data?.articles
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "label" }, [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).STATISTIC_ARTICLES
                  }, null, 8, ["k"])
                ])
              ]),
              createVNode(_component_divider, {
                type: "vertical",
                size: "sm"
              }),
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticsSkeleton), {
                  fetching: fetching.value,
                  count: unref(statisticStore).data?.todayViews
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "label" }, [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).STATISTIC_TODAY_VIEWS
                  }, null, 8, ["k"])
                ])
              ]),
              createVNode(_component_divider, {
                type: "vertical",
                size: "sm"
              }),
              createVNode("div", { class: "item" }, [
                createVNode(unref(StatisticsSkeleton), {
                  fetching: fetching.value,
                  count: unref(statisticStore).data?.comments
                }, null, 8, ["fetching", "count"]),
                createVNode("span", { class: "label" }, [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).STATISTIC_COMMENTS
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/statistic.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const SidebarStatistic = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-698f4f4b"]]);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "articles",
  __ssrInlineRender: true,
  setup(__props) {
    const { i18n: _i18n } = useEnhancer();
    const hottestArticleListStore = useHottestArticleListStore();
    const latestArticleListStore = useLatestArticleListStore();
    const featuredArticleListStore = useFeaturedArticleListStore();
    const tabs = computed(() => [
      {
        zh_title: "最近更新",
        en_title: "Latest",
        zh_label: "最新",
        en_label: "latest",
        icon: "icon-clock",
        store: latestArticleListStore
      },
      {
        zh_title: "热门趋势",
        en_title: "Trending",
        zh_label: "热门",
        en_label: "trend",
        icon: "icon-fire",
        store: hottestArticleListStore
      },
      {
        zh_title: "群贤毕至",
        en_title: "Featured",
        zh_label: _i18n.t(LocalesKey.ARTICLE_FEATURED_SHORT, Language.Chinese),
        en_label: _i18n.t(LocalesKey.ARTICLE_FEATURED_SHORT, Language.English),
        icon: "icon-windmill",
        store: featuredArticleListStore
      }
    ]);
    const activatedTabIndex = ref(tabs.value.length - 1);
    const activatedTab = computed(() => tabs.value[activatedTabIndex.value]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      const _component_divider = resolveComponent("divider");
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_skeleton = resolveComponent("skeleton");
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "article" }, _attrs))} data-v-29f09fca><div class="header" data-v-29f09fca><span class="title" data-v-29f09fca><i class="${ssrRenderClass([activatedTab.value.icon, "iconfont"])}" data-v-29f09fca></i><span class="text" data-v-29f09fca>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: activatedTab.value.zh_title,
        en: activatedTab.value.en_title
      }, null, _parent));
      _push(`</span></span><div class="tabs" data-v-29f09fca><!--[-->`);
      ssrRenderList(tabs.value, (tab, index) => {
        _push(`<!--[--><span class="${ssrRenderClass([{ activated: index === activatedTabIndex.value }, "item"])}" data-v-29f09fca>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: tab.zh_label,
          en: tab.en_label
        }, null, _parent));
        _push(`</span>`);
        if (index !== tabs.value.length - 1) {
          _push(ssrRenderComponent(_component_divider, {
            type: "vertical",
            size: "sm"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_placeholder, {
        loading: activatedTab.value.store.fetching,
        "has-data": !!activatedTab.value.store.data.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, { class: "article-list-empty" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, { class: "article-list-empty" }, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).ARTICLE_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        loading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="article-list-skeleton" data-v-29f09fca${_scopeId}><!--[-->`);
            ssrRenderList(5, (item) => {
              _push2(ssrRenderComponent(_component_skeleton, {
                key: item,
                class: "item"
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "article-list-skeleton" }, [
                (openBlock(), createBlock(Fragment, null, renderList(5, (item) => {
                  return createVNode(_component_skeleton, {
                    key: item,
                    class: "item"
                  });
                }), 64))
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="article-list" data-v-29f09fca${_scopeId}><!--[-->`);
            ssrRenderList(activatedTab.value.store.data.slice(0, unref(APP_CONFIG).desktop_sidebar_article_list_count), (article, i) => {
              _push2(`<li class="item" data-v-29f09fca${_scopeId}><span class="index"${ssrRenderAttr("data-index", i + 1)} data-v-29f09fca${_scopeId}>${ssrInterpolate(i + 1)}${ssrInterpolate(i > 2 ? "." : "")}</span><div class="content" data-v-29f09fca${_scopeId}>`);
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
              _push2(`<div class="meta" data-v-29f09fca${_scopeId}><span class="item date" data-v-29f09fca${_scopeId}>${ssrInterpolate(unref(dateToYMD)(article.created_at).slice(0, -3))}</span><span class="item views" data-v-29f09fca${_scopeId}><i class="iconfont icon-eye" data-v-29f09fca${_scopeId}></i> ${ssrInterpolate(unref(numberToKilo)(article.stats.views))}</span><span class="item comments" data-v-29f09fca${_scopeId}><i class="iconfont icon-comment" data-v-29f09fca${_scopeId}></i> ${ssrInterpolate(article.stats.comments)}</span><span class="item likes" data-v-29f09fca${_scopeId}><i class="iconfont icon-like" data-v-29f09fca${_scopeId}></i> ${ssrInterpolate(article.stats.likes)}</span></div></div></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "article-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(activatedTab.value.store.data.slice(0, unref(APP_CONFIG).desktop_sidebar_article_list_count), (article, i) => {
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
                          createTextVNode(" " + toDisplayString(unref(numberToKilo)(article.stats.views)), 1)
                        ]),
                        createVNode("span", { class: "item comments" }, [
                          createVNode("i", { class: "iconfont icon-comment" }),
                          createTextVNode(" " + toDisplayString(article.stats.comments), 1)
                        ]),
                        createVNode("span", { class: "item likes" }, [
                          createVNode("i", { class: "iconfont icon-like" }),
                          createTextVNode(" " + toDisplayString(article.stats.likes), 1)
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
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/articles.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const SidebarArticles = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-29f09fca"]]);
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "mammon",
  __ssrInlineRender: true,
  props: {
    index: { default: 0 }
  },
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { appConfig } = useEnhancer();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mammon" }, _attrs))} data-v-9d2a6c99>`);
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
            _push2(`<div class="swiper-pagination" data-v-9d2a6c99${_scopeId}><!--[-->`);
            ssrRenderList(unref(appConfig).AD_PC_SIDEBAR_SWIPER, (__, _index) => {
              _push2(`<div${ssrRenderAttr("aria-label", `Go to slide ${_index}`)} class="${ssrRenderClass([{ active: _index === activeIndex.value }, "swiper-pagination-bullet"])}" role="button" data-v-9d2a6c99${_scopeId}><span class="bullet-progress" data-v-9d2a6c99${_scopeId}></span></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "swiper-pagination" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(appConfig).AD_PC_SIDEBAR_SWIPER, (__, _index) => {
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
            ssrRenderList(unref(appConfig).AD_PC_SIDEBAR_SWIPER, (ad, _index) => {
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
                          _push4(`<i class="iconfont icon-ad" data-v-9d2a6c99${_scopeId3}></i>`);
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
              (openBlock(true), createBlock(Fragment, null, renderList(unref(appConfig).AD_PC_SIDEBAR_SWIPER, (ad, _index) => {
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
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/mammon.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const SidebarMammon = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-9d2a6c99"]]);
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  setup(__props) {
    const today = dateToHuman(/* @__PURE__ */ new Date());
    const isToday = (target) => isSameHumanDay(target, today);
    const { isZhLang, i18n: _i18n } = useEnhancer();
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "calendar" }, _attrs))} data-v-0f581bb2><div class="header" data-v-0f581bb2><button class="item arrow" data-v-0f581bb2><i class="iconfont icon-prev" data-v-0f581bb2></i></button><span class="item year-month" data-v-0f581bb2>${ssrInterpolate(headerText.value)}</span><button class="item arrow" data-v-0f581bb2><i class="iconfont icon-next" data-v-0f581bb2></i></button></div><ul class="weekdays" data-v-0f581bb2><!--[-->`);
      ssrRenderList(weekDayTexts.value, (day, index) => {
        _push(`<li data-v-0f581bb2>${ssrInterpolate(day)}</li>`);
      });
      _push(`<!--]--></ul><ul class="days" data-v-0f581bb2><!--[-->`);
      ssrRenderList(tableView.table, (item, index) => {
        _push(`<li data-v-0f581bb2><div class="${ssrRenderClass([{ today: isToday(item), other: item.month !== tableView.month }, "item"])}" data-v-0f581bb2>`);
        ssrRenderSlot(_ctx.$slots, "day", mergeProps({ ref_for: true }, item), () => {
          _push(`${ssrInterpolate(item.day)}`);
        }, _push, _parent);
        _push(`</div></li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/widgets/calendar.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-0f581bb2"]]);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "calendar",
  __ssrInlineRender: true,
  setup(__props) {
    const articlesCalendarStore = useArticlesCalendarStore();
    const hasArticlesIn = (targetDate) => {
      const ymd = humanDateToYMD(targetDate);
      return articlesCalendarStore.data.find((item) => item.date === ymd)?.count || 0;
    };
    onMounted(() => articlesCalendarStore.fetch());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_link = resolveComponent("router-link");
      _push(ssrRenderComponent(Calendar, mergeProps({ class: "calendar" }, _attrs), {
        day: withCtx((humanDate, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (hasArticlesIn(humanDate) > 0) {
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
              _push2(`<span class="date-span" data-v-2a5aca4c${_scopeId}>${ssrInterpolate(humanDate.day)}</span>`);
            }
          } else {
            return [
              hasArticlesIn(humanDate) > 0 ? (openBlock(), createBlock(_component_router_link, {
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
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/calendar.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const SidebarCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-2a5aca4c"]]);
const _sfc_main$d = /* @__PURE__ */ defineComponent({
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
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "anchor" }, _attrs))} data-v-32376931><button class="header"${ssrRenderAttr("title", unref(store).article.title)} data-v-32376931><div class="title" data-v-32376931>${ssrInterpolate(unref(store).article.title)}</div><div class="read" data-v-32376931>`);
        _push(ssrRenderComponent(_component_i18n, unref(ArticleLanguageI18n)[unref(store).article.lang], null, _parent));
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
          _push(`<div class="catalogue" data-v-32376931><ul class="${ssrRenderClass([`indent-${minHeadingLevel.value}`, "list"])}" data-v-32376931><!--[-->`);
          ssrRenderList(headings.value, (heading, index) => {
            _push(`<li${ssrRenderAttr("title", heading.text)} class="${ssrRenderClass([`level-${heading.level}`, "item"])}" data-v-32376931><i class="${ssrRenderClass([`icon-h-${heading.level}`, "level iconfont"])}" data-v-32376931></i><span class="text" data-v-32376931>${ssrInterpolate(heading.text)}</span></li>`);
          });
          _push(`<!--]-->`);
          if (unref(store).isLongContent && !unref(store).renderedFullContent) {
            _push(`<li class="${ssrRenderClass([`level-${minHeadingLevel.value}`, "item readmore"])}" data-v-32376931><i class="level iconfont icon-loadmore" data-v-32376931></i><span class="text" data-v-32376931>`);
            _push(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).ARTICLE_READ_ALL
            }, null, _parent));
            _push(`</span></li>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</ul></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="button" data-v-32376931><i class="iconfont icon-like" data-v-32376931></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "按赞",
          en: "Upvote"
        }, null, _parent));
        _push(`<span class="count" data-v-32376931>${ssrInterpolate(unref(store).article.stats.likes)}</span>`);
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(ssrRenderComponent(_component_i18n, {
          zh: "随喜",
          en: "Sponsor"
        }, null, _parent));
        _push(`</button><button class="button" data-v-32376931><i class="iconfont icon-discussion" data-v-32376931></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "评论",
          en: "Comments"
        }, null, _parent));
        _push(`<span class="count" data-v-32376931>${ssrInterpolate(unref(store).article.stats.comments)}</span>`);
        _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
        _push(ssrRenderComponent(_component_i18n, {
          zh: "AI 点评",
          en: "AI Review"
        }, null, _parent));
        _push(`</button><button class="button" data-v-32376931><i class="iconfont icon-share" data-v-32376931></i>`);
        _push(ssrRenderComponent(_component_i18n, {
          zh: "分享",
          en: "Share"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/anchor.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const SidebarAnchor = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-32376931"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "tags",
  __ssrInlineRender: true,
  setup(__props) {
    const tagStore = useTagStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_placeholder = resolveComponent("placeholder");
      const _component_empty = resolveComponent("empty");
      const _component_i18n = resolveComponent("i18n");
      const _component_router_link = resolveComponent("router-link");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tags" }, _attrs))} data-v-d487bed2>`);
      _push(ssrRenderComponent(_component_placeholder, {
        "has-data": !!unref(tagStore).sorted.length
      }, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_empty, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).TAG_PLACEHOLDER
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).TAG_PLACEHOLDER
                    }, null, 8, ["k"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_empty, null, {
                default: withCtx(() => [
                  createVNode(_component_i18n, {
                    k: unref(LocalesKey).TAG_PLACEHOLDER
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tag-list" data-v-d487bed2${_scopeId}><!--[-->`);
            ssrRenderList(unref(tagStore).sorted, (tag, index) => {
              _push2(ssrRenderComponent(_component_router_link, {
                class: "item",
                title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
                to: unref(getTagFlowRoute)(tag.slug),
                key: index
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<i class="${ssrRenderClass([unref(getTagIconName)(tag.extras), "iconfont"])}" data-v-d487bed2${_scopeId2}></i><span class="name" data-v-d487bed2${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_i18n, {
                      zh: tag.name,
                      en: unref(getTagEnName)(tag)
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="count" data-v-d487bed2${_scopeId2}>(${ssrInterpolate(tag.article_count || 0)})</span></span>`);
                  } else {
                    return [
                      createVNode("i", {
                        class: ["iconfont", unref(getTagIconName)(tag.extras)]
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
              createVNode("div", { class: "tag-list" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(tagStore).sorted, (tag, index) => {
                  return openBlock(), createBlock(_component_router_link, {
                    class: "item",
                    title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
                    to: unref(getTagFlowRoute)(tag.slug),
                    key: index
                  }, {
                    default: withCtx(() => [
                      createVNode("i", {
                        class: ["iconfont", unref(getTagIconName)(tag.extras)]
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/tags.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const SidebarTags = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-d487bed2"]]);
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const isArticlePage = computed(() => isArticleDetail(route.name));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_Adsense = resolveComponent("Adsense");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(SIDEBAR_ELEMENT_ID),
        class: "desktop-sidebar"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-38c7f66d><div class="module" data-v-38c7f66d>`);
      _push(ssrRenderComponent(SidebarSearch, null, null, _parent));
      _push(`</div><div class="module" data-v-38c7f66d>`);
      _push(ssrRenderComponent(SidebarStatistic, null, null, _parent));
      _push(`</div><div class="module" data-v-38c7f66d>`);
      _push(ssrRenderComponent(SidebarArticles, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_client_only, { transition: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="module mammon" data-v-38c7f66d${_scopeId}>`);
            _push2(ssrRenderComponent(SidebarMammon, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "module mammon" }, [
                createVNode(SidebarMammon)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="module" data-v-38c7f66d>`);
      _push(ssrRenderComponent(SidebarCalendar, null, null, _parent));
      _push(`</div><div class="sidebar-sticky-box" data-v-38c7f66d><div class="module mammon-square" data-v-38c7f66d>`);
      _push(ssrRenderComponent(_component_client_only, { transition: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Adsense, {
              class: "content",
              "ins-style": "display:inline-block;width:250px;height:250px",
              "data-ad-slot": "6138120718"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Adsense, {
                class: "content",
                "ins-style": "display:inline-block;width:250px;height:250px",
                "data-ad-slot": "6138120718"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="module" data-v-38c7f66d>`);
      if (isArticlePage.value) {
        _push(ssrRenderComponent(_component_client_only, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(SidebarAnchor, { class: "sticky-module" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(SidebarAnchor, { class: "sticky-module" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(SidebarTags, { class: "sticky-module" }, null, _parent));
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/sidebar/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const SidebarView = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-38c7f66d"]]);
const menus = [
  {
    id: RouteName.Home,
    route: "/",
    icon: "icon-home",
    i18nKey: LocalesKey.PAGE_HOME
  },
  {
    id: CategorySlug.Code,
    route: getCategoryFlowRoute(CategorySlug.Code),
    icon: "icon-code",
    i18nKey: LocalesKey.CATEGORY_CODE
  },
  {
    id: CategorySlug.Insight,
    route: getCategoryFlowRoute(CategorySlug.Insight),
    icon: "icon-insight",
    i18nKey: LocalesKey.CATEGORY_INSIGHT
  },
  {
    id: "github",
    url: GO_LINKS_MAP.github,
    icon: "icon-github",
    i18nKey: LocalesKey.PAGE_GITHUB,
    newWindow: true
  },
  {
    id: RouteName.Photography,
    route: getPageRoute(RouteName.Photography),
    icon: "icon-lens",
    i18nKey: LocalesKey.PAGE_PHOTOGRAPHY
  },
  {
    id: RouteName.Snippets,
    route: getPageRoute(RouteName.Snippets),
    i18nKey: LocalesKey.PAGE_SNIPPETS,
    icon: "icon-buddhism"
  },
  {
    id: RouteName.About,
    route: getPageRoute(RouteName.About),
    icon: "icon-swordsman",
    i18nKey: LocalesKey.PAGE_ABOUT
  },
  {
    id: RouteName.Guestbook,
    route: getPageRoute(RouteName.Guestbook),
    i18nKey: LocalesKey.PAGE_GUESTBOOK,
    icon: "icon-comment"
  },
  {
    id: "sponsor",
    route: getPageRoute(RouteName.Sponsor),
    icon: "icon-peachblossom",
    i18nKey: LocalesKey.PAGE_SPONSOR,
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
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "header",
  __ssrInlineRender: true,
  props: {
    enabledNav: { type: Boolean }
  },
  setup(__props) {
    const { theme, i18n: _i18n } = useEnhancer();
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
      const _component_client_only = resolveComponent("client-only");
      const _component_ulink = resolveComponent("ulink");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<header${ssrRenderAttrs(mergeProps({
        id: unref(HEADER_ELEMENT_ID),
        class: "header"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-35b8fb22><div class="header-container container" data-v-35b8fb22><div class="header-brand" data-v-35b8fb22>`);
      _push(ssrRenderComponent(_component_uimage, {
        cdn: "",
        src: "/images/logo.svg",
        class: "header-logo",
        alt: unref(APP_PROFILE).title
      }, null, _parent));
      _push(ssrRenderComponent(_component_webfont, { class: "header-slogan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocalesKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "header-link",
        title: unref(APP_PROFILE).title,
        onMousedown: handleRootNavEvent
      }, null, _parent));
      _push(`</div><div class="headers-tools" data-v-35b8fb22>`);
      if (__props.enabledNav) {
        _push(`<button class="button menu" data-v-35b8fb22><i class="iconfont icon-top-menu" data-v-35b8fb22></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="button language" title="Switch language" data-v-35b8fb22><i class="${ssrRenderClass([languageIcon.value, "iconfont"])}" data-v-35b8fb22></i></button><button class="button theme" data-v-35b8fb22>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([themeIcon.value, "iconfont"])}"${ssrRenderAttr("data-value", unref(theme).theme.value)} data-v-35b8fb22${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", {
                class: ["iconfont", themeIcon.value],
                "data-value": unref(theme).theme.value
              }, null, 10, ["data-value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div></div>`);
      if (__props.enabledNav) {
        _push(`<div class="header-nav" data-v-35b8fb22><nav class="nav-list container" data-v-35b8fb22><!--[-->`);
        ssrRenderList(unref(menus), (menu, index) => {
          _push(`<!--[-->`);
          if (index > 0) {
            _push(`<span class="divider" data-v-35b8fb22></span>`);
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
                  _push2(`<i class="${ssrRenderClass([menu.icon, "font-icon iconfont"])}" data-v-35b8fb22${_scopeId}></i>`);
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
                  _push2(`<span class="new-window" data-v-35b8fb22${_scopeId}><i class="iconfont icon-new-window-s" data-v-35b8fb22${_scopeId}></i></span>`);
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
        _push(`<!--]--></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/header.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const HeaderView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-35b8fb22"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { globalState, goLinks } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_divider = resolveComponent("divider");
      const _component_i18n = resolveComponent("i18n");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<footer${ssrRenderAttrs(mergeProps({
        id: unref(FOOTER_ELEMENT_ID),
        class: "footer"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-b2e57d6b><div class="container" data-v-b2e57d6b>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        href: unref(BFF_CONFIG).route_path_sitemap
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`sitemap.xml`);
          } else {
            return [
              createTextVNode("sitemap.xml")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
      _push(ssrRenderComponent(_component_i18n, {
        zh: "构建于 ",
        en: "Built with "
      }, null, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        href: unref(RESOURCE_LINKS).GITHUB_SURMON_ME
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Vue`);
          } else {
            return [
              createTextVNode("Vue")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_i18n, {
        zh: " 和 日月星辰",
        en: ""
      }, null, _parent));
      _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
      _push(`<button class="button" data-v-b2e57d6b>`);
      _push(ssrRenderComponent(_component_i18n, {
        zh: "周知",
        en: "FAQ"
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
      _push(`<button class="button" data-v-b2e57d6b>`);
      _push(ssrRenderComponent(_component_i18n, {
        k: unref(LocalesKey).FEEDBACK
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        href: "/privacy/index.html",
        onClick: ($event) => unref(globalState).toggleSwitcher("privacyModal", true)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).PRIVACY
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocalesKey).PRIVACY
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_divider, { type: "vertical" }, null, _parent));
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        href: unref(goLinks).status
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              zh: "实态",
              en: "STATUS"
            }, null, _parent2, _scopeId));
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
      }, _parent));
      _push(`</div></footer>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/footer.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const FooterView$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-b2e57d6b"]]);
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "nav",
  __ssrInlineRender: true,
  setup(__props) {
    const { appConfig } = useEnhancer();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ulink = resolveComponent("ulink");
      const _component_uimage = resolveComponent("uimage");
      const _component_webfont = resolveComponent("webfont");
      const _component_i18n = resolveComponent("i18n");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({
        id: unref(NAV_ELEMENT_ID),
        class: "desktop-nav"
      }, _attrs, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-4e379361><nav class="nav-list" data-v-4e379361><!--[-->`);
      ssrRenderList(unref(menus), (menu) => {
        _push(`<!--[-->`);
        if (menu.divider) {
          _push(`<span class="divider" data-v-4e379361></span>`);
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
                _push2(`<i class="${ssrRenderClass([menu.icon, "font-icon iconfont"])}" data-v-4e379361${_scopeId}></i>`);
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
                _push2(`<span class="new-window-icon" data-v-4e379361${_scopeId}><i class="iconfont icon-new-window-s" data-v-4e379361${_scopeId}></i></span>`);
              } else {
                _push2(`<!---->`);
              }
              if (menu.hot) {
                _push2(`<span class="superscript hot" data-v-4e379361${_scopeId}><i class="iconfont icon-hot" data-v-4e379361${_scopeId}></i></span>`);
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
                  class: "new-window-icon"
                }, [
                  createVNode("i", { class: "iconfont icon-new-window-s" })
                ])) : createCommentVNode("", true),
                menu.hot ? (openBlock(), createBlock("span", {
                  key: 3,
                  class: "superscript hot"
                }, [
                  createVNode("i", { class: "iconfont icon-hot" })
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<!--]-->`);
      });
      _push(`<!--]--><!--[-->`);
      ssrRenderList(unref(appConfig).AD_PC_NAV, (ad, index) => {
        _push(`<!--[--><span class="divider" data-v-4e379361></span>`);
        _push(ssrRenderComponent(_component_ulink, {
          class: "item",
          href: ad.url,
          style: { color: ad.color }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass([ad.icon, "font-icon iconfont"])}" data-v-4e379361${_scopeId}></i><span class="ad-text" data-v-4e379361${_scopeId}>`);
              if (ad.i18n) {
                _push2(ssrRenderComponent(_component_i18n, {
                  zh: ad.i18n.zh,
                  en: ad.i18n.en
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!--[-->${ssrInterpolate(ad.text)}<!--]-->`);
              }
              _push2(`</span><span class="superscript ad" data-v-4e379361${_scopeId}><i class="iconfont icon-ad" data-v-4e379361${_scopeId}></i></span>`);
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
                createVNode("span", { class: "superscript ad" }, [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/nav.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const NavView = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-4e379361"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const { route, globalState, isCNUser } = useEnhancer();
    const { pageLayout, switcher, toggleSwitcher } = globalState;
    const sponsorState = useSponsorState();
    const gitHubSponsorsStore = useGitHubSponsorsStore();
    const wallpaperStore = useWallpaperStore();
    const handlePageTransitionDone = () => {
      globalState.setPageLayout(resolvePageLayout(route.meta.layout));
    };
    onMounted(() => {
      wallpaperStore.fetch().catch((error) => {
        logger$2.failure("bing wallpaper fetch failed!", error);
      });
      gitHubSponsorsStore.fetch().catch((error) => {
        logger$2.failure("GitHub sponsors fetch failed!", error);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = resolveComponent("client-only");
      const _component_popup = resolveComponent("popup");
      const _component_router_view = resolveComponent("router-view");
      const _directive_disabled_wallflower = resolveDirective("disabled-wallflower");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "desktop-layout" }, _attrs))} data-v-1ffaf84a>`);
      _push(ssrRenderComponent(Background, null, null, _parent));
      _push(ssrRenderComponent(Wallflower, null, null, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_popup, {
              "body-scrollable": false,
              visible: unref(switcher).sponsorModal,
              onClose: ($event) => unref(toggleSwitcher)("sponsorModal", false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="sponsor-modal" data-v-1ffaf84a${_scopeId2}><div class="sponsor" data-v-1ffaf84a${_scopeId2}>`);
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
              "mask-closable": false,
              "body-scrollable": false,
              visible: unref(switcher).feedbackModal,
              onClose: ($event) => unref(toggleSwitcher)("feedbackModal", false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Feedback, {
                    onClose: ($event) => unref(toggleSwitcher)("feedbackModal", false)
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Feedback, {
                      onClose: ($event) => unref(toggleSwitcher)("feedbackModal", false)
                    }, null, 8, ["onClose"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_popup, {
              "body-scrollable": false,
              visible: unref(switcher).statementModal,
              onClose: ($event) => unref(toggleSwitcher)("statementModal", false)
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
            _push2(ssrRenderComponent(_component_popup, {
              "body-scrollable": false,
              visible: unref(switcher).privacyModal,
              onClose: ($event) => unref(toggleSwitcher)("privacyModal", false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(Privacy, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(Privacy)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_popup, {
              visible: unref(switcher).userPanelModal,
              "onUpdate:visible": ($event) => unref(switcher).userPanelModal = $event,
              "body-scrollable": false,
              "mask-closable": false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(UserPanel, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(UserPanel)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_popup, {
                "body-scrollable": false,
                visible: unref(switcher).sponsorModal,
                onClose: ($event) => unref(toggleSwitcher)("sponsorModal", false)
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
              }, 8, ["visible", "onClose"]),
              createVNode(_component_popup, {
                "mask-closable": false,
                "body-scrollable": false,
                visible: unref(switcher).feedbackModal,
                onClose: ($event) => unref(toggleSwitcher)("feedbackModal", false)
              }, {
                default: withCtx(() => [
                  createVNode(Feedback, {
                    onClose: ($event) => unref(toggleSwitcher)("feedbackModal", false)
                  }, null, 8, ["onClose"])
                ]),
                _: 1
              }, 8, ["visible", "onClose"]),
              createVNode(_component_popup, {
                "body-scrollable": false,
                visible: unref(switcher).statementModal,
                onClose: ($event) => unref(toggleSwitcher)("statementModal", false)
              }, {
                default: withCtx(() => [
                  createVNode(Statement)
                ]),
                _: 1
              }, 8, ["visible", "onClose"]),
              createVNode(_component_popup, {
                "body-scrollable": false,
                visible: unref(switcher).privacyModal,
                onClose: ($event) => unref(toggleSwitcher)("privacyModal", false)
              }, {
                default: withCtx(() => [
                  createVNode(Privacy)
                ]),
                _: 1
              }, 8, ["visible", "onClose"]),
              createVNode(_component_popup, {
                visible: unref(switcher).userPanelModal,
                "onUpdate:visible": ($event) => unref(switcher).userPanelModal = $event,
                "body-scrollable": false,
                "mask-closable": false
              }, {
                default: withCtx(() => [
                  createVNode(UserPanel)
                ]),
                _: 1
              }, 8, ["visible", "onUpdate:visible"])
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
                _push2(ssrRenderComponent(MusicPlayerEntry, null, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                unref(isCNUser) || unref(isDev) ? (openBlock(), createBlock(MusicPlayerEntry, { key: 0 })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(HeaderView$1, {
        "enabled-nav": !unref(pageLayout).isNormal
      }, null, _parent));
      _push(`<main${ssrRenderAttr("id", unref(CONTAINER_ELEMENT_ID))} class="${ssrRenderClass([{ "full-page": unref(pageLayout).isFull }, "main-container"])}" data-v-1ffaf84a>`);
      if (unref(pageLayout).isNormal) {
        _push(ssrRenderComponent(NavView, { class: "nav-view" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(pageLayout).isNormal) {
        _push(ssrRenderComponent(SidebarView, { class: "sidebar-view" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div${ssrRenderAttr("id", unref(MAIN_CONTENT_ELEMENT_ID))} class="${ssrRenderClass([{
        "layout-normal": unref(pageLayout).isNormal,
        "layout-wide": unref(pageLayout).isWide,
        "layout-full": unref(pageLayout).isFull
      }, "main-view"])}" data-v-1ffaf84a>`);
      _push(ssrRenderComponent(_component_router_view, null, {
        default: withCtx(({ Component, route: r }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({ class: "router-view" }, ssrGetDirectiveProps(_ctx, _directive_disabled_wallflower)))} data-v-1ffaf84a${_scopeId}>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/desktop/layout/main.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const DesktopMain = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-1ffaf84a"]]);
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
    ref();
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
      }, _attrs))} data-v-6a0c5b33><nav class="navbar" data-v-6a0c5b33><button class="navbar-menu" data-v-6a0c5b33><i class="iconfont icon-menu" data-v-6a0c5b33></i></button>`);
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
      _push(`<button class="navbar-search" data-v-6a0c5b33><i class="iconfont icon-search" data-v-6a0c5b33></i></button></nav>`);
      if (searchState.open) {
        _push(`<div class="search" data-v-6a0c5b33><div class="search-bar" data-v-6a0c5b33><input class="input" autocomplete="off" type="text" maxlength="24" required${ssrRenderAttr("placeholder", unref(_i18n).t(unref(LocalesKey).SEARCH_PLACEHOLDER))}${ssrRenderAttr("value", searchState.keyword)} data-v-6a0c5b33><span class="close" data-v-6a0c5b33><i class="iconfont icon-cancel" data-v-6a0c5b33></i></span></div><div class="search-tags" data-v-6a0c5b33>`);
        if (unref(tagStore).sorted) {
          _push(`<div class="${ssrRenderClass([{ "input-focused": searchState.focused }, "tag-list"])}" data-v-6a0c5b33><!--[-->`);
          ssrRenderList(unref(tagStore).sorted, (tag, index) => {
            _push(ssrRenderComponent(_component_router_link, {
              class: "item",
              title: `${unref(getTagEnName)(tag)} | ${tag.description}`,
              to: unref(getTagFlowRoute)(tag.slug),
              key: index
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<i class="${ssrRenderClass([unref(getTagIconName)(tag.extras), "iconfont"])}" data-v-6a0c5b33${_scopeId}></i><span class="name" data-v-6a0c5b33${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_i18n, {
                    zh: tag.name,
                    en: unref(getTagEnName)(tag)
                  }, null, _parent2, _scopeId));
                  _push2(`</span><span class="count" data-v-6a0c5b33${_scopeId}>${ssrInterpolate(tag.article_count || 0)}</span>`);
                } else {
                  return [
                    createVNode("i", {
                      class: ["iconfont", unref(getTagIconName)(tag.extras)]
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mobile/layout/header.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HeaderView = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-6a0c5b33"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    const title = APP_PROFILE.title;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-4302900a><div class="footer-content" data-v-4302900a>©${ssrInterpolate(unref(year))}  ${ssrInterpolate(unref(title))}</div></footer>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mobile/layout/footer.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const FooterView = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-4302900a"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "drawer",
  __ssrInlineRender: true,
  setup(__props) {
    const { theme, cdnDomain, i18n: _i18n } = useEnhancer();
    const adminProfileStore = useAdminProfileStore();
    const adminAvatar = computed(() => {
      return adminProfileStore.data?.avatar_url || getAssetURL(cdnDomain, "/images/anonymous.png");
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
      const _component_client_only = resolveComponent("client-only");
      const _component_router_link = resolveComponent("router-link");
      const _component_ulink = resolveComponent("ulink");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "drawer" }, _attrs))} data-v-c8ad6854><div class="drawer-user" data-v-c8ad6854>`);
      _push(ssrRenderComponent(_component_uimage, {
        class: "avatar",
        src: adminAvatar.value,
        alt: unref(APP_PROFILE).author
      }, null, _parent));
      _push(`<div class="profile" data-v-c8ad6854><h3 class="name" data-v-c8ad6854>${ssrInterpolate(unref(APP_PROFILE).author)}</h3>`);
      _push(ssrRenderComponent(_component_webfont, { class: "slogan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n, {
              k: unref(LocalesKey).APP_SLOGAN
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n, {
                k: unref(LocalesKey).APP_SLOGAN
              }, null, 8, ["k"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="drawer-tool" data-v-c8ad6854><button class="item" data-v-c8ad6854>`);
      _push(ssrRenderComponent(_component_client_only, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="${ssrRenderClass([themeIcon.value, "iconfont"])}" data-v-c8ad6854${_scopeId}></i>`);
          } else {
            return [
              createVNode("i", {
                class: ["iconfont", themeIcon.value]
              }, null, 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button><div class="separator" data-v-c8ad6854></div><button class="item" data-v-c8ad6854><i class="${ssrRenderClass([languageIcon.value, "iconfont"])}" data-v-c8ad6854></i></button></div><div class="drawer-nav" data-v-c8ad6854><nav class="nav-list" data-v-c8ad6854>`);
      _push(ssrRenderComponent(_component_router_link, {
        to: "/",
        class: "item"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-home" data-v-c8ad6854${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).PAGE_HOME
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_HOME
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
                    k: unref(LocalesKey).PAGE_HOME
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
            _push2(`<i class="iconfont icon-code" data-v-c8ad6854${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).CATEGORY_CODE
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).CATEGORY_CODE
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
                    k: unref(LocalesKey).CATEGORY_CODE
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
            _push2(`<i class="iconfont icon-insight" data-v-c8ad6854${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).CATEGORY_INSIGHT
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).CATEGORY_INSIGHT
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
                    k: unref(LocalesKey).CATEGORY_INSIGHT
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
            _push2(`<i class="iconfont icon-buddhism" data-v-c8ad6854${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).PAGE_SNIPPETS
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_SNIPPETS
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
                    k: unref(LocalesKey).PAGE_SNIPPETS
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
            _push2(`<i class="iconfont icon-quill" data-v-c8ad6854${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).PAGE_ARCHIVE
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_ARCHIVE
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
                    k: unref(LocalesKey).PAGE_ARCHIVE
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
            _push2(`<i class="iconfont icon-comment" data-v-c8ad6854${_scopeId}></i>`);
            _push2(ssrRenderComponent(_component_webfont, {
              bolder: "",
              uppercase: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_i18n, {
                    k: unref(LocalesKey).PAGE_GUESTBOOK
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_GUESTBOOK
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
                    k: unref(LocalesKey).PAGE_GUESTBOOK
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
                    k: unref(LocalesKey).PAGE_ABOUT
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_i18n, {
                      k: unref(LocalesKey).PAGE_ABOUT
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
                    k: unref(LocalesKey).PAGE_ABOUT
                  }, null, 8, ["k"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div><div class="drawer-source-link" data-v-c8ad6854>`);
      _push(ssrRenderComponent(_component_ulink, {
        class: "link",
        href: unref(RESOURCE_LINKS).GITHUB_SURMON_ME
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconfont icon-github" data-v-c8ad6854${_scopeId}></i><span class="label" data-v-c8ad6854${_scopeId}>Source Code</span><span class="new-window" data-v-c8ad6854${_scopeId}><i class="iconfont icon-new-window-s" data-v-c8ad6854${_scopeId}></i></span>`);
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
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mobile/layout/drawer.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const DrawerView = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c8ad6854"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const { route } = useEnhancer();
    const pageURL = computed(() => getPageURL(route.fullPath));
    const isLoaded = ref(false);
    const isOpenedDrawer = ref(false);
    const openDrawer = () => isOpenedDrawer.value = true;
    const closeDrawer = () => isOpenedDrawer.value = false;
    onMounted(() => {
      isLoaded.value = true;
      watch(isOpenedDrawer, (opened) => {
        document.body.style.overflow = opened ? "hidden" : "auto";
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-layout" }, _attrs))} data-v-9048e9ab><div class="${ssrRenderClass([{ loaded: isLoaded.value, opened: isOpenedDrawer.value }, "layout-drawer"])}" data-v-9048e9ab>`);
      _push(ssrRenderComponent(DrawerView, { class: "drawer" }, null, _parent));
      _push(`</div><div class="${ssrRenderClass([{ opened: isOpenedDrawer.value }, "layout-main"])}" data-v-9048e9ab>`);
      if (isOpenedDrawer.value) {
        _push(`<div class="close-mask" data-v-9048e9ab></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(HeaderView, {
        opened: isOpenedDrawer.value,
        onClose: closeDrawer,
        onOpen: openDrawer
      }, null, _parent));
      _push(`<main class="main-container" data-v-9048e9ab>`);
      _push(ssrRenderComponent(_component_router_view, { name: "mobile" }, {
        default: withCtx(({ Component, route: r }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (r.meta.responsive) {
              _push2(`<div class="route-view" data-v-9048e9ab${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(Component), {
                key: r.name
              }, null), _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<div class="fallback" data-v-9048e9ab${_scopeId}><i class="iconfont icon-desktop" data-v-9048e9ab${_scopeId}></i><p class="text" data-v-9048e9ab${_scopeId}>`);
              _push2(ssrRenderComponent(_component_i18n, {
                zh: "请在 PC 端访问以获得最佳体验",
                en: "This page only support visit on PC"
              }, null, _parent2, _scopeId));
              _push2(`</p><a class="link"${ssrRenderAttr("href", pageURL.value)} data-v-9048e9ab${_scopeId}>${ssrInterpolate(pageURL.value)}</a></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/mobile/layout/main.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MobileMain = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-9048e9ab"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  emits: ["resolve"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n = resolveComponent("i18n");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "app-error" }, _attrs))} data-v-eaf1e463><h1 class="code" data-v-eaf1e463>${ssrInterpolate(props.error.code)}</h1><h3 class="message" data-v-eaf1e463>`);
      if (props.error.message) {
        _push(`<!--[-->${ssrInterpolate(props.error.message)}<!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_i18n, {
          k: unref(LocalesKey).NOT_FOUND
        }, null, _parent));
      }
      _push(`</h3><p class="link" data-v-eaf1e463>`);
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
const AppError = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-eaf1e463"]]);
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
                k: unref(LocalesKey).BACK_TO_HOME_PAGE
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_i18n, {
                  k: unref(LocalesKey).BACK_TO_HOME_PAGE
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
            _push2(ssrRenderComponent(_component_popup_root, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(NavProgress, {
                spin: !unref(globalState).userAgent.isMobile
              }, null, 8, ["spin"]),
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
    keys: Object.values(LocalesKey),
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
  router.beforeEach(async (to) => {
    if (to.meta.validator) {
      try {
        await to.meta.validator({ route: to, i18n, store });
      } catch (error) {
        throw createAppError(error.message, error.code);
      }
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
    theme: Theme.Light,
    // Any initial value set here will be overwritten in the client-side HTML <head>.
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
  const [{ app }, head] = createSSRMainApp(ssrContext);
  head.push({ title: `Server Error: ${appError.message}` });
  return {
    code: appError.code,
    appHTML: await renderToString(app, ssrContext),
    headHTML: await renderSSRHead(head),
    assetsPrefix: ssrContext.assetsPrefix,
    contextScripts: renderSSRContextScript(serialize(ssrContext)),
    stateScripts: renderSSRStateScript(
      serialize({
        region: getRegionByCountryCode(ssrContext.countryCode)
      })
    )
  };
};
const renderApp = async (context, cache) => {
  const ssrContext = createSSRContext(context);
  const [{ app, router, store, i18n, globalState }, head] = createSSRMainApp(ssrContext);
  const language = i18n.language.value;
  const deviceType = globalState.userAgent.isMobile ? "mobile" : "desktop";
  const regionCode = getRegionByCountryCode(ssrContext.countryCode);
  const cacheKey = `ssr:${language}_${regionCode}_${deviceType}_${ssrContext.requestUrl}`;
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
