import * as __WEBPACK_EXTERNAL_MODULE_dotenv__ from "dotenv";
import * as __WEBPACK_EXTERNAL_MODULE_express__ from "express";
import * as __WEBPACK_EXTERNAL_MODULE_rss__ from "rss";
import * as __WEBPACK_EXTERNAL_MODULE_axios__ from "axios";
import * as __WEBPACK_EXTERNAL_MODULE_path__ from "path";
import * as __WEBPACK_EXTERNAL_MODULE_stream__ from "stream";
import * as __WEBPACK_EXTERNAL_MODULE_sitemap__ from "sitemap";
import * as __WEBPACK_EXTERNAL_MODULE_wonderful_bing_wallpaper_bd315d6d__ from "wonderful-bing-wallpaper";
import * as __WEBPACK_EXTERNAL_MODULE_fast_xml_parser_352df6bd__ from "fast-xml-parser";
import * as __WEBPACK_EXTERNAL_MODULE_yargs__ from "yargs";
import * as __WEBPACK_EXTERNAL_MODULE_fs_extra_c99523cd__ from "fs-extra";
import * as __WEBPACK_EXTERNAL_MODULE_fontmin__ from "fontmin";
import * as __WEBPACK_EXTERNAL_MODULE_fs__ from "fs";
import * as __WEBPACK_EXTERNAL_MODULE_vite__ from "vite";
import * as __WEBPACK_EXTERNAL_MODULE_http__ from "http";
import * as __WEBPACK_EXTERNAL_MODULE_compression__ from "compression";
import * as __WEBPACK_EXTERNAL_MODULE_cookie_parser_591162dd__ from "cookie-parser";
import * as __WEBPACK_EXTERNAL_MODULE_http_proxy_7fedf318__ from "http-proxy";
import * as __WEBPACK_EXTERNAL_MODULE_lru_cache_883435dc__ from "lru-cache";
import * as __WEBPACK_EXTERNAL_MODULE_redis__ from "redis";
/******/ var __webpack_modules__ = ({});
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nccwpck_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "dotenv"
var x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var y = x => () => x
const external_dotenv_namespaceObject = x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_dotenv__["default"] });
;// CONCATENATED MODULE: external "express"
var external_express_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_express_y = x => () => x
const external_express_namespaceObject = external_express_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_express__["default"] });
;// CONCATENATED MODULE: ./src/server/environment.ts
/**
 * @file BFF server environment
 * @module environment
 * @author Surmon <https://github.com/surmon-china>
 */
var NodeEnv;
(function (NodeEnv) {
    NodeEnv["Development"] = "development";
    NodeEnv["Production"] = "production";
})(NodeEnv || (NodeEnv = {}));
const NODE_ENV = process.env.NODE_ENV;
const isNodeDev = process.env.NODE_ENV === NodeEnv.Development;
const isNodeProd = process.env.NODE_ENV === NodeEnv.Production;

;// CONCATENATED MODULE: ./src/config/bff.config.ts
/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */
const BFF_TUNNEL_PREFIX = '/_tunnel';
const BFF_PROXY_PREFIX = '/_proxy';
const BFF_PROXY_ALLOWLIST_REGEXP = /^https:\/\/([a-z0-9-]+\.)*surmon\.(me|cn)/;
const getBFFServerPort = () => Number(process.env.PORT || 3000);
const getOnlineApiURL = () => process.env.VITE_API_ONLINE_URL;
const getLocalApiURL = () => process.env.VITE_API_LOCAL_URL;

;// CONCATENATED MODULE: ./src/constants/tunnel.ts
/**
 * @file Tunnel constant
 * @module constant.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */
var TunnelModule;
(function (TunnelModule) {
    TunnelModule["WebFont"] = "webfont";
    TunnelModule["MyGoogleMap"] = "my_google_map";
    TunnelModule["TwitterAggregate"] = "twitter_aggregate";
    TunnelModule["YouTubePlaylist"] = "youtube_playlist";
    TunnelModule["YouTubeVideoList"] = "youtube_video_list";
    TunnelModule["InstagramProfile"] = "instagram_profile";
    TunnelModule["InstagramMedias"] = "instagram_medias";
    TunnelModule["InstagramMediaChildren"] = "instagram_media_children";
    TunnelModule["InstagramCalendar"] = "instagram_calendar";
    TunnelModule["BingWallpaper"] = "bing_wallpaper";
    TunnelModule["GitHubSponsors"] = "github_sponsors";
    TunnelModule["GitHubContributions"] = "github_contributions";
    TunnelModule["NetEaseMusic"] = "netease_music";
    TunnelModule["DoubanMovies"] = "douban_movies";
    TunnelModule["OpenSourceGitHubStatistic"] = "open_source_github_statistic";
    TunnelModule["OpenSourceNPMStatistic"] = "open_source_npm_statistic";
})(TunnelModule || (TunnelModule = {}));

;// CONCATENATED MODULE: ./src/constants/http-code.ts
/**
 * @file Error constant
 * @module constant.error
 * @author Surmon <https://github.com/surmon-china>
 */
const SUCCESS = 200;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const INVALID_ERROR = 500;

;// CONCATENATED MODULE: external "rss"
var external_rss_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_rss_y = x => () => x
const external_rss_namespaceObject = external_rss_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_rss__["default"] });
;// CONCATENATED MODULE: external "axios"
var external_axios_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_axios_y = x => () => x
const external_axios_namespaceObject = external_axios_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_axios__["default"], ["isAxiosError"]: () => __WEBPACK_EXTERNAL_MODULE_axios__.isAxiosError });
;// CONCATENATED MODULE: ./src/config/app.config.ts
/**
 * @file App config
 * @module config.app
 * @author Surmon <https://github.com/surmon-china>
 */
const DEFAULT_DELAY = 468;
const LONG_ARTICLE_THRESHOLD = 16688;
const META = Object.freeze({
    title: 'Surmon.me',
    zh_sub_title: '斯是陋室，唯吾芳馨',
    en_sub_title: `Surmon's digital garden`,
    zh_description: '本是浪蝶游蜂，自留半亩石池，但求直抒胸臆，挥墨九云之中',
    en_description: 'Either write something worth reading or do something worth writing.',
    url: 'https://surmon.me',
    domain: 'surmon.me',
    author: 'Surmon',
    primary: '#0088f5'
});
const GEO_INFO = Object.freeze({
    zh_title: '长居亚洲，游走热带',
    en_title: 'UTC +07:00 ~ +09:00',
    coordinates: [103.830391822121, 1.340863]
});
const MAPBOX_CONFIG = Object.freeze({
    // readonly token
    TOKEN: 'pk.eyJ1Ijoic3VybW9uIiwiYSI6ImNsNDE4YmkzNjB2Z2wzY3F5dWg2M2tqeWIifQ.JhgYGFI4zsuNiX9dH-pBDg',
    STYLE_LIGHT: 'mapbox://styles/surmon/cl41fktzn000f14pet94oo1u4',
    STYLE_DARK: 'mapbox://styles/surmon/cl41gy1qo000l15ry20j5ae0k',
    ZOOM: 12.4374,
    CENTER: [103.830391822121, 1.348463]
});
const app_config_IDENTITIES = Object.freeze({
    GOOGLE_ANALYTICS_MEASUREMENT_ID: 'G-R40DDTSYNQ',
    GOOGLE_ADSENSE_CLIENT_ID: 'ca-pub-4710915636313788',
    SENTRY_PUBLIC_DSN: 'https://4a5f194531fe4527879812e4a4d8cf89@o360897.ingest.sentry.io/4505569138966528',
    YOUTUBE_CHANNEL_ID: 'UCoL-j6T28PLSJ2U6ZdONS0w',
    YOUTUBE_CHANNEL_SHORT_ID: '@surmon_v',
    MUSIC_163_BGM_ALBUM_ID: '638949385',
    DOUBAN_USER_ID: '56647958',
    GITHUB_USER_NAME: 'surmon-china',
    TWITTER_USER_NAME: 'surmon7788',
    INSTAGRAM_USERNAME: 'surmon666',
    BTC_ADDRESS: 'bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze',
    ETH_ADDRESS: '0xaD556974D449126efdeF23f4FF581861C301cB77'
});
const VALUABLE_LINKS = Object.freeze({
    RSS: '/rss.xml',
    SITE_MAP: '/sitemap.xml',
    UPTIME_STATUS: 'https://redirect.surmon.me/status',
    NPM_HOMEPAGE: 'https://www.npmjs.com/~surmon',
    PAYPAL: 'https://paypal.me/surmon',
    GITHUB_SPONSORS: `https://github.com/sponsors/${app_config_IDENTITIES.GITHUB_USER_NAME}`,
    GITHUB: `https://github.com/${app_config_IDENTITIES.GITHUB_USER_NAME}`,
    GITHUB_SURMON_ME: 'https://github.com/surmon-china/surmon.me',
    GITHUB_NODEPRESS: 'https://github.com/surmon-china/nodepress',
    GITHUB_SURMON_ME_NATIVE: 'https://github.com/surmon-china/surmon.me.native',
    GITHUB_BLOG_STAR_LIST: 'https://github.com/stars/surmon-china/lists/surmon-me',
    MARKDOWN: 'https://daringfireball.net/projects/markdown/',
    GOOGLE_MY_MAP: `https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3`,
    GOOGLE_MY_MAP_KML: `https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w`,
    DISCORD_GROUP: 'https://redirect.surmon.me/discord-server',
    TELEGRAM_GROUP: 'https://redirect.surmon.me/telegram-group',
    MUSIC_163: `https://music.163.com/#/playlist?id=${app_config_IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
    YOUTUBE_CHANNEL: `https://www.youtube.com/${app_config_IDENTITIES.YOUTUBE_CHANNEL_SHORT_ID}`,
    TELEGRAM: 'https://t.me/surmon',
    OPENSEA: 'https://opensea.io/Surmon',
    DOUBAN: 'https://www.douban.com/people/nocower',
    DOUBAN_MOVIE: `https://movie.douban.com/people/nocower/collect`,
    QUORA: 'https://www.quora.com/profile/Surmon',
    LINKEDIN: 'https://www.linkedin.com/in/surmon',
    INSTAGRAM: `https://www.instagram.com/${app_config_IDENTITIES.INSTAGRAM_USERNAME}`,
    TWITTER: `https://twitter.com/${app_config_IDENTITIES.TWITTER_USER_NAME}`
});

;// CONCATENATED MODULE: external "path"
var external_path_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_path_y = x => () => x
const external_path_namespaceObject = external_path_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_path__["default"] });
;// CONCATENATED MODULE: ./src/server/helpers/configurer.ts
/**
 * @file BFF Server helper
 * @module server.helper.configurer
 * @author Surmon <https://github.com/surmon-china>
 */



// Keep it as a function, since the process.env variables are only valid after the application is completely run
const getNodePressAPI = () => {
    const local = getLocalApiURL();
    const online = getOnlineApiURL();
    return isNodeDev ? local : online;
};
const ROOT_PATH = process.cwd();
const DIST_PATH = external_path_namespaceObject["default"].join(ROOT_PATH, 'dist');
const PRDO_CLIENT_PATH = external_path_namespaceObject["default"].join(DIST_PATH, 'client');
const PRDO_SERVER_PATH = external_path_namespaceObject["default"].join(DIST_PATH, 'server');
const PUBLIC_PATH = isNodeDev ? external_path_namespaceObject["default"].join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH;

;// CONCATENATED MODULE: ./src/server/helpers/route.ts
/**
 * @file BFF route helper
 * @module server.helper.route
 * @author Surmon <https://github.com/surmon-china>
 */

const getTagURL = (tag) => `${META.url}/tag/${tag}`;
const getCategoryURL = (category) => `${META.url}/category/${category}`;
const getArticleURL = (id) => `${META.url}/article/${id}`;
const getPageURL = (page) => `${META.url}/${page}`;

;// CONCATENATED MODULE: ./src/server/getters/rss.ts
/**
 * @file Archive RSS generator
 * @module server.getter.rss
 * @author Surmon <https://github.com/surmon-china>
 */





const getRssXml = async () => {
    const api = `${getNodePressAPI()}/archive`;
    const response = await external_axios_namespaceObject["default"].get(api, { timeout: 6000 });
    const archive = response.data.result;
    const feed = new external_rss_namespaceObject["default"]({
        title: META.title,
        description: META.zh_sub_title,
        site_url: META.url,
        feed_url: `${META.url}/rss.xml`,
        image_url: `${META.url}/icon.png`,
        managingEditor: META.author,
        webMaster: META.author,
        generator: `${META.domain}`,
        categories: archive.categories.map((category) => category.slug),
        copyright: `${new Date().getFullYear()} ${META.title}`,
        language: 'zh',
        ttl: 60
    });
    archive.articles.forEach((article) => {
        return feed.item({
            title: article.title,
            description: article.description,
            url: getArticleURL(article.id),
            guid: String(article.id),
            categories: article.categories.map((category) => category.slug),
            author: META.author,
            date: article.created_at,
            enclosure: {
                url: article.thumbnail
            }
        });
    });
    return feed.xml({ indent: true });
};

;// CONCATENATED MODULE: external "stream"
var external_stream_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_stream_y = x => () => x
const external_stream_namespaceObject = external_stream_x({ ["Readable"]: () => __WEBPACK_EXTERNAL_MODULE_stream__.Readable });
;// CONCATENATED MODULE: external "sitemap"
var external_sitemap_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_sitemap_y = x => () => x
const external_sitemap_namespaceObject = external_sitemap_x({ ["EnumChangefreq"]: () => __WEBPACK_EXTERNAL_MODULE_sitemap__.EnumChangefreq, ["SitemapStream"]: () => __WEBPACK_EXTERNAL_MODULE_sitemap__.SitemapStream, ["streamToPromise"]: () => __WEBPACK_EXTERNAL_MODULE_sitemap__.streamToPromise });
;// CONCATENATED MODULE: ./src/server/getters/sitemap.ts
/**
 * @file Archive sitemap generator
 * @module server.getter.sitemap
 * @author Surmon <https://github.com/surmon-china>
 */






const getSitemapXml = async () => {
    const api = `${getNodePressAPI()}/archive`;
    const response = await external_axios_namespaceObject["default"].get(api, { timeout: 6000 });
    const archive = response.data.result;
    const sitemapStream = new external_sitemap_namespaceObject.SitemapStream({
        hostname: META.url
    });
    const sitemapItemList = [
        { url: META.url, changefreq: external_sitemap_namespaceObject.EnumChangefreq.ALWAYS, priority: 1 },
        {
            url: getPageURL('about'),
            changefreq: external_sitemap_namespaceObject.EnumChangefreq.YEARLY,
            priority: 1
        },
        {
            url: getPageURL('archive'),
            changefreq: external_sitemap_namespaceObject.EnumChangefreq.ALWAYS,
            priority: 1
        },
        {
            url: getPageURL('guestbook'),
            changefreq: external_sitemap_namespaceObject.EnumChangefreq.ALWAYS,
            priority: 1
        }
    ];
    archive.categories.forEach((category) => {
        sitemapItemList.push({
            priority: 0.6,
            changefreq: external_sitemap_namespaceObject.EnumChangefreq.DAILY,
            url: getCategoryURL(category.slug)
        });
    });
    archive.tags.forEach((tag) => {
        sitemapItemList.push({
            priority: 0.6,
            changefreq: external_sitemap_namespaceObject.EnumChangefreq.DAILY,
            url: getTagURL(tag.slug)
        });
    });
    archive.articles.forEach((article) => {
        sitemapItemList.push({
            priority: 0.8,
            changefreq: external_sitemap_namespaceObject.EnumChangefreq.DAILY,
            url: getArticleURL(article.id),
            lastmodISO: new Date(article.updated_at).toISOString()
        });
    });
    return (0,external_sitemap_namespaceObject.streamToPromise)(external_stream_namespaceObject.Readable.from(sitemapItemList).pipe(sitemapStream)).then((data) => {
        return data.toString();
    });
};

;// CONCATENATED MODULE: ./src/transforms/gtag.ts
/**
 * @file Google Analytics
 * @module transform.gtag
 * @author Surmon <https://github.com/surmon-china>
 */
const getGaScriptURL = (measurementId) => {
    return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
};

;// CONCATENATED MODULE: ./src/server/getters/gtag.ts
/**
 * @file BFF GA getter
 * @module server.getter.gtag
 * @author Surmon <https://github.com/surmon-china>
 */



const getGTagScript = async () => {
    const url = getGaScriptURL(app_config_IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID);
    const response = await external_axios_namespaceObject["default"].get(url, { timeout: 6000 });
    return response.data;
};

;// CONCATENATED MODULE: external "wonderful-bing-wallpaper"
var external_wonderful_bing_wallpaper_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_wonderful_bing_wallpaper_y = x => () => x
const external_wonderful_bing_wallpaper_namespaceObject = external_wonderful_bing_wallpaper_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_wonderful_bing_wallpaper_bd315d6d__["default"] });
;// CONCATENATED MODULE: ./src/server/getters/wallpaper.ts
/**
 * @file BFF wallpaper getter
 * @module server.getter.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */

const getWallpapers = async (params) => {
    const wbw = new external_wonderful_bing_wallpaper_namespaceObject["default"]();
    const wallpaperJSON = await wbw.getWallpapers({ ...params, size: 8 });
    try {
        return wbw.humanizeWallpapers(wallpaperJSON);
    }
    catch (error) {
        throw 'wallpaper parsing JSON failed: ' + String(error);
    }
};
// ZH cache
const getZHWallpapers = () => {
    return getWallpapers({
        local: 'zh-CN',
        host: 'cn.bing.com',
        ensearch: 0
    });
};
// EN cache
const getENWallpapers = () => {
    return getWallpapers({
        local: 'en-US',
        host: 'bing.com',
        ensearch: 1
    });
};
const getAllWallpapers = async () => {
    const [zh, en] = await Promise.all([getZHWallpapers(), getENWallpapers()]);
    return { zh, en };
};

;// CONCATENATED MODULE: external "fast-xml-parser"
var external_fast_xml_parser_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_fast_xml_parser_y = x => () => x
const external_fast_xml_parser_namespaceObject = external_fast_xml_parser_x({ ["XMLParser"]: () => __WEBPACK_EXTERNAL_MODULE_fast_xml_parser_352df6bd__.XMLParser });
;// CONCATENATED MODULE: ./src/server/getters/my-google-map.ts
/**
 * @file BFF google map getter
 * @module server.getter.my-google-map
 * @author Surmon <https://github.com/surmon-china>
 */



const getMyGoogleMap = () => {
    const parser = new external_fast_xml_parser_namespaceObject.XMLParser({
        ignoreAttributes: false,
        allowBooleanAttributes: true,
        attributeNamePrefix: '@'
    });
    return external_axios_namespaceObject["default"].get(VALUABLE_LINKS.GOOGLE_MY_MAP_KML, { timeout: 6000 })
        .then((response) => parser.parse(response.data).kml.Document);
};

;// CONCATENATED MODULE: external "yargs"
var external_yargs_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_yargs_y = x => () => x
const external_yargs_namespaceObject = external_yargs_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_yargs__["default"] });
;// CONCATENATED MODULE: ./src/config/bff.yargs.ts
/**
 * @file BFF yargs config
 * @module config.bff.yargs
 * @author Surmon <https://github.com/surmon-china>
 */

const argv = (0,external_yargs_namespaceObject["default"])(process.argv.slice(2)).argv;
const GITHUB_BEARER_TOKEN = argv.github_token;
const INSTAGRAM_TOKEN = argv.instagram_token;
const YOUTUBE_API_KEY = argv.youtube_token;
const SOTWE_SCRAPER_TOKEN = argv.sotwe_scraper_token;

;// CONCATENATED MODULE: ./src/server/getters/twitter/sotwe.ts



const improveSotweTweet = (tweet, resultHTML = false) => {
    let result = tweet.text.replaceAll('\n', ' ');
    // remove media urls
    tweet.mediaEntities?.forEach((media) => {
        result = result.replace(media.url, '');
    });
    // replace url with link
    tweet.urlEntities?.forEach((url) => {
        result = result.replace(url.url, !resultHTML
            ? url.text
            : `<a
            class="link"
            target="_blank"
            rel="external nofollow noopener"
            title="${url.expandedURL}"
            href="${url.expandedURL}"
          >${url.displayURL}</a>`);
    });
    return result;
};
// Don't try to simulate a browser request, it will be blocked by Cloudflare.
// Can't make requests based on headless browsers because it takes up too much memory
// So one has to look for third party online services, here are some of the available crawler services:
// - https://dashboard.scrape.do
// - https://apilayer.com/marketplace/adv_scraper-api
// - ...
const getSotweAggregate = async (twitterUsername) => {
    try {
        const target = `https://api.sotwe.com/v3/user/${twitterUsername}`;
        const scraper = `http://api.scrape.do/?token=${SOTWE_SCRAPER_TOKEN}&url=${target}`;
        // To avoid wasting request credits, tokens are not used in development environments
        const response = await external_axios_namespaceObject["default"].get(isNodeDev ? target : scraper);
        return response.data;
    }
    catch (error) {
        throw (0,external_axios_namespaceObject.isAxiosError)(error) ? error.toJSON() : error;
    }
};

;// CONCATENATED MODULE: ./src/server/getters/twitter/nitter.ts


const getNitterRss = async (twitterUsername) => {
    const url = `https://twiiit.com/${twitterUsername}/rss`;
    const response = await external_axios_namespaceObject["default"].get(url, { timeout: 8000 });
    const xmlParser = new external_fast_xml_parser_namespaceObject.XMLParser();
    const { rss: result } = xmlParser.parse(response.data);
    return {
        userinfo: {
            name: result.channel.title.split(' / ')?.[0]?.trim() || null,
            avatar: result.channel.image.url
        },
        tweets: result.channel.item.map((item) => {
            const linkURL = new URL(item.link);
            const urlParts = linkURL.pathname.split('/');
            return {
                id: urlParts[urlParts.length - 1],
                owner: urlParts[1],
                text: item.title.replaceAll('\n', ' '),
                html: item.description.replaceAll('\n', ' ').replaceAll('<br>', ' '),
                date: new Date(item.pubDate).getTime(),
                hasImage: item.description.includes('<img'),
                isReply: item.title.startsWith('R to '),
                isRetweet: item.title.startsWith('RT '),
                mediaCount: item.description.match(/<(img|video)/g)?.length || 0
            };
        })
    };
};

;// CONCATENATED MODULE: ./src/server/getters/twitter/index.ts
/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */



const getTwitterAggregate = async () => {
    // Use of different public services to ensure high availability
    const [nitter, sotwe] = await Promise.all([
        getNitterRss(app_config_IDENTITIES.TWITTER_USER_NAME).catch((error) => {
            console.warn('[Twitter] nitter rss is empty.', error?.message ?? String(error));
            return null;
        }),
        getSotweAggregate(app_config_IDENTITIES.TWITTER_USER_NAME).catch((error) => {
            console.warn('[Twitter] sotwe aggregate is empty.', error?.message ?? String(error));
            return null;
        })
    ]);
    if (!nitter && !sotwe) {
        return Promise.reject('[Twitter] aggregate data is empty.');
    }
    const tweets = [];
    const userinfo = {
        name: sotwe?.info?.name || nitter?.userinfo.name || app_config_IDENTITIES.TWITTER_USER_NAME,
        avatar: sotwe?.info?.profileImageOriginal || nitter?.userinfo.avatar || '',
        description: sotwe?.info.description || void 0,
        location: sotwe?.info.location || void 0,
        tweetCount: sotwe?.info.postCount ?? void 0,
        followerCount: sotwe?.info.followerCount ?? void 0,
        followingCount: sotwe?.info.followingCount ?? void 0
    };
    // sotwe all tweets
    const sotweTweets = [];
    if (sotwe?.data.length) {
        sotwe.data.forEach((item) => {
            sotweTweets.push(item);
            if (item.conversation?.length) {
                sotweTweets.push(...item.conversation);
            }
        });
    }
    // 1. nitter & sotwe > mix
    // 2. nitter only
    if (nitter?.tweets.length) {
        nitter.tweets.forEach((tweet) => {
            // No longer reserved for reprinting retweet, as it causes data to be inconsistent in both the model and the front-end
            if (tweet.isRetweet) {
                return;
            }
            const found = sotweTweets.find((item) => item.id === tweet.id);
            tweets.push({
                id: tweet.id,
                owner: tweet.owner,
                text: found ? improveSotweTweet(found, false) : tweet.text,
                html: found ? improveSotweTweet(found, true) : tweet.html,
                date: found?.createdAt || tweet.date,
                location: found?.location?.name || void 0,
                favoriteCount: found?.favoriteCount ?? void 0,
                retweetCount: found?.retweetCount ?? void 0,
                mediaCount: found?.mediaEntities?.length ?? tweet.mediaCount ?? 0,
                isReply: (found?.inReplyToUserId ? true : tweet.isReply) ?? void 0,
                isQuote: found ? !!found?.quotedStatus : void 0,
                isRetweet: (found?.retweetedStatus ? true : tweet.isRetweet) ?? void 0,
                hasVideo: found?.mediaEntities?.some((media) => media.type === 'video'),
                hasImage: found?.mediaEntities?.some((media) => media.type === 'photo') || tweet.hasImage
            });
        });
        // 3. sotwe only
    }
    else if (sotwe && sotweTweets.length) {
        sotweTweets.forEach((tweet) => {
            // not retweet
            if (tweet.retweetedStatus) {
                return;
            }
            // not reply to other
            if (tweet.inReplyToUserId && tweet.inReplyToUserId !== sotwe.info.id) {
                return;
            }
            // not your own tweet
            if (tweet.user && tweet.user.id !== sotwe.info.id) {
                return;
            }
            tweets.push({
                id: tweet.id,
                owner: app_config_IDENTITIES.TWITTER_USER_NAME,
                text: improveSotweTweet(tweet, false),
                html: improveSotweTweet(tweet, true),
                date: tweet.createdAt,
                location: tweet.location?.name || void 0,
                favoriteCount: tweet.favoriteCount ?? void 0,
                retweetCount: tweet.retweetCount ?? void 0,
                mediaCount: tweet.mediaEntities?.length ?? 0,
                isReply: !!tweet.inReplyToUserId,
                isQuote: !!tweet.quotedStatus,
                isRetweet: !!tweet.retweetedStatus,
                hasVideo: tweet.mediaEntities?.some((media) => media.type === 'video'),
                hasImage: tweet.mediaEntities?.some((media) => media.type === 'photo')
            });
        });
    }
    return { userinfo, tweets };
};

;// CONCATENATED MODULE: ./src/server/getters/github.ts
/**
 * @file BFF GitHub getter
 * @module server.getter.github
 * @author Surmon <https://github.com/surmon-china>
 */



const graphqlGitHub = (query) => {
    return external_axios_namespaceObject["default"].request({
        // https://github.com/settings/tokens
        headers: { Authorization: `bearer ${GITHUB_BEARER_TOKEN}` },
        url: `https://api.github.com/graphql`,
        method: 'POST',
        data: JSON.stringify({
            query: `query {
        user(login: "${app_config_IDENTITIES.GITHUB_USER_NAME}") {
          ${query}
        }
      }`
        })
    })
        .then((response) => {
        return response.data.errors
            ? Promise.reject(response.data.errors.map((error) => error.message).join('; '))
            : Promise.resolve(response.data.data.user);
    });
};
const getGitHubSponsors = () => {
    const SPONSOR_NODE_QUERY = `
    ... on User {
      login
      name
      url
      avatarUrl
      websiteUrl
    }
    ... on Organization {
      login
      name
      url
      avatarUrl
      websiteUrl
    }
  `;
    // https://github.com/orgs/community/discussions/37234#discussioncomment-4047906
    // https://github.com/dohooo/get-past-sponsors
    // https://github.com/community/community/discussions/3818#discussioncomment-2155340
    // https://docs.github.com/en/graphql/reference/objects#sponsorsactivity
    // https://docs.github.com/en/graphql/reference/enums#sponsorsactivityaction
    return graphqlGitHub(`
    sponsorsActivities(first:100, period: ALL, orderBy: { direction: DESC, field: TIMESTAMP }, actions: [NEW_SPONSORSHIP, CANCELLED_SPONSORSHIP]) {
      nodes {
        action,
        sponsorsTier {
          isOneTime
        },
        sponsor {
          ${SPONSOR_NODE_QUERY}
        }
      }
    },
    sponsors(first: 100) {
      totalCount
      edges {
        node {
          ${SPONSOR_NODE_QUERY}
        }
      }
    }
  `);
};
const isISODateString = (dateString) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(dateString))
        return false;
    return new Date(dateString).toISOString() === dateString;
};
const getGitHubContributions = async (from, to) => {
    if (!isISODateString(from) || !isISODateString(to)) {
        return Promise.reject('Invalid date string!');
    }
    const result = await graphqlGitHub(`
    contributionsCollection(from: "${from}", to: "${to}") {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            weekday
            date
            contributionCount
            color
          }
        }
      }
    }
  `);
    return result.contributionsCollection.contributionCalendar;
};

;// CONCATENATED MODULE: ./src/server/getters/instagram/media.ts


// https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media#reading
const getInstagramMedias = async (options) => {
    try {
        const defaultFields = `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp`;
        const params = {
            access_token: INSTAGRAM_TOKEN,
            fields: options?.fields ?? defaultFields,
            // MARK: max 100
            limit: options?.limit ?? 24
        };
        // MARK: unix timestamp
        if (options?.since) {
            params.since = options.since;
        }
        // MARK: cursor
        if (options?.after) {
            params.after = options.after;
        }
        const response = await external_axios_namespaceObject["default"].get('https://graph.instagram.com/me/media', {
            timeout: 8000,
            params
        });
        return response.data;
    }
    catch (error) {
        throw (0,external_axios_namespaceObject.isAxiosError)(error) ? error.response?.data?.error ?? error.toJSON() : error;
    }
};
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media/children
const getInstagramMediaChildren = (mediaId) => {
    const url = `https://graph.instagram.com/${mediaId}/children`;
    const params = {
        access_token: INSTAGRAM_TOKEN,
        fields: `id,media_type,media_url,thumbnail_url,timestamp`
    };
    return external_axios_namespaceObject["default"].get(url, { timeout: 8000, params })
        .then((response) => response.data.data)
        .catch((error) => {
        return Promise.reject((0,external_axios_namespaceObject.isAxiosError)(error) ? error.response?.data?.error ?? error.toJSON() : error);
    });
};

;// CONCATENATED MODULE: ./src/server/getters/instagram/calendar.ts

function doFetchAllMedias({ since, after, medias = [], onSucceed, onFailed }) {
    getInstagramMedias({ fields: 'id,timestamp', limit: 100, since, after })
        .then((result) => {
        medias.push(...result.data);
        if (result.paging.next) {
            doFetchAllMedias({
                medias,
                since,
                after: result.paging.cursors.after,
                onSucceed,
                onFailed
            });
        }
        else {
            onSucceed?.(medias);
        }
    })
        .catch(onFailed);
}
const calendarTemp = {
    data: []
};
function fetchAllMedias() {
    console.info('[BFF] instagram.fetchAllMedias...');
    calendarTemp.data = [];
    // startTime: Only get the most recent 12 months of data
    const today = new Date();
    today.setDate(1);
    today.setFullYear(today.getFullYear() - 1);
    const prevYearToday = Math.round(today.getTime() / 1000);
    doFetchAllMedias({
        since: prevYearToday,
        onSucceed: (medias) => {
            console.info(`[BFF] instagram.fetchAllMedias done, ${medias.length} medias. refetch when after 18h`);
            setTimeout(() => fetchAllMedias(), 18 * 60 * 60 * 1000);
            const map = new Map();
            medias.forEach((media) => {
                const key = media.timestamp.slice(0, 10);
                map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1);
            });
            calendarTemp.data = Array.from(map, ([date, count]) => ({ date, count }));
        },
        onFailed: (error) => {
            console.warn(`[BFF] instagram.fetchAllMedias failed, retry when after 30s`, error);
            setTimeout(() => fetchAllMedias(), 30 * 1000);
        }
    });
}
const initInstagramCalendar = () => fetchAllMedias();
const getInstagramCalendar = async () => calendarTemp.data;

;// CONCATENATED MODULE: ./src/server/getters/instagram/profile.ts


// Unstable access to Instagram API
// https://stackoverflow.com/a/73376216/6222535
const getInstagramProfile = async () => {
    try {
        const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${IDENTITIES.INSTAGRAM_USERNAME}`;
        const agent = 'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)';
        const response = await axios.get(url, { timeout: 8000, headers: { 'User-Agent': agent } });
        if (response.data.status !== 'ok') {
            return Promise.reject(response.data);
        }
        else {
            return {
                name: response.data.data.user.full_name,
                avatar: response.data.data.user.profile_pic_url_hd,
                category: response.data.data.user.category_name,
                biography: response.data.data.user.biography,
                mediaCount: response.data.data.user.edge_owner_to_timeline_media.count,
                followerCount: response.data.data.user.edge_followed_by.count,
                followingCount: response.data.data.user.edge_follow.count
            };
        }
    }
    catch (error) {
        throw isAxiosError(error) ? error.toJSON() : error;
    }
};

;// CONCATENATED MODULE: ./src/server/getters/instagram/index.ts
/**
 * @file BFF instagram getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */
// 1. Generate long-lived access tokens for Instagram Testers (60 days)
// https://developers.facebook.com/apps/625907498725071/instagram-basic-display/basic-display/
// 2. Get medias useing API
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
// 3. TODO: Refresh token
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/refresh_access_token




;// CONCATENATED MODULE: ./src/server/getters/youtube.ts
/**
 * @file BFF YouTube getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */



// 1. Generate API key
// https://console.cloud.google.com/apis/credentials
// 2. Get playlist by Channel ID
// https://developers.google.com/youtube/v3/docs/playlists/list
const getYouTubeChannelPlayLists = async () => {
    const response = await external_axios_namespaceObject["default"].get(`https://www.googleapis.com/youtube/v3/playlists`, {
        timeout: 8000,
        params: {
            part: 'snippet,contentDetails',
            maxResults: 50,
            channelId: app_config_IDENTITIES.YOUTUBE_CHANNEL_ID,
            key: YOUTUBE_API_KEY
        }
    });
    return response.data.items;
};
// 3. Get video list by playlist ID
// https://developers.google.com/youtube/v3/docs/playlistItems/list
// MARK: can't order by date, max results 50
const getYouTubeVideoListByPlayerlistId = async (playlistId) => {
    const response = await external_axios_namespaceObject["default"].get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
        timeout: 8000,
        params: {
            part: 'snippet,contentDetails',
            maxResults: 50,
            playlistId: playlistId,
            key: YOUTUBE_API_KEY
        }
    });
    return response.data.items;
};

;// CONCATENATED MODULE: ./src/server/getters/open-srouce.ts
/**
 * @file BFF open-srouce getter
 * @module server.getter.open-srouce
 * @author Surmon <https://github.com/surmon-china>
 */


const fetchStatisticJSON = async (fileName) => {
    const url = `https://raw.githubusercontent.com/${app_config_IDENTITIES.GITHUB_USER_NAME}/${app_config_IDENTITIES.GITHUB_USER_NAME}/release/${fileName}`;
    const response = await external_axios_namespaceObject["default"].get(url, { timeout: 6000 });
    return response.data;
};
const getGitHubStatistic = () => fetchStatisticJSON('github.json');
const getNPMStatistic = () => fetchStatisticJSON('npm.json');

;// CONCATENATED MODULE: ./src/server/getters/douban.ts
/**
 * @file BFF douban getter
 * @module server.getter.douban
 * @author Surmon <https://github.com/surmon-china>
 */


const getDoubanMovies = async () => {
    const api = `https://m.douban.com/rexxar/api/v2/user/${app_config_IDENTITIES.DOUBAN_USER_ID}/collection_stats?type=movie&for_mobile=1`;
    const referer = `https://m.douban.com/people/${app_config_IDENTITIES.DOUBAN_USER_ID}/movie_charts`;
    const response = await external_axios_namespaceObject["default"].get(api, {
        timeout: 1000 * 12,
        headers: { Referer: referer }
    });
    return response.data;
};

;// CONCATENATED MODULE: ./src/server/getters/netease-music.ts
/**
 * @file BFF music getter
 * @module server.getter.music
 * @author Surmon <https://github.com/surmon-china>
 */


const PLAY_LIST_LIMIT = 168;
const getSongList = async () => {
    // https://github.com/Binaryify/NeteaseCloudMusicApi/blob/a0500ec648f22a1dd20fc7b529126f813aa26935/module/playlist_track_all.js
    const playlistURL = `https://music.163.com/api/v6/playlist/detail?id=${app_config_IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`;
    const playlistDetail = await external_axios_namespaceObject["default"].get(playlistURL, { timeout: 6000 });
    if (playlistDetail.data.code < 0) {
        throw new Error(playlistDetail.data.message);
    }
    const trackIds = playlistDetail.data.playlist?.trackIds || [];
    const idsParams = trackIds
        .slice(0, PLAY_LIST_LIMIT)
        .map((id) => `{id:${id.id}}`)
        .join(',');
    const songListURL = `https://music.163.com/api/v3/song/detail?c=[${idsParams}]`;
    const songListDetail = await external_axios_namespaceObject["default"].get(songListURL, { timeout: 6000 });
    if (!songListDetail.data.songs) {
        throw new Error(songListDetail.data);
    }
    const songs = songListDetail.data.songs || [];
    return (songs
        // Filtering to remove uncopyrighted music: https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e6%ad%8c%e5%8d%95
        .filter((song) => !song.noCopyrightRcmd)
        .slice(0, PLAY_LIST_LIMIT)
        .map((song) => ({
        id: song.id,
        duration: song.dt,
        name: song.name,
        album: song.al?.name || '-',
        artist: (song.ar || []).map((artist) => artist.name).join(' / '),
        cover_art_url: song.al?.picUrl,
        // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
        url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
    })));
};

;// CONCATENATED MODULE: external "fs-extra"
var external_fs_extra_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_fs_extra_y = x => () => x
const external_fs_extra_namespaceObject = external_fs_extra_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_fs_extra_c99523cd__["default"] });
;// CONCATENATED MODULE: external "fontmin"
var external_fontmin_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_fontmin_y = x => () => x
const external_fontmin_namespaceObject = external_fontmin_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_fontmin__["default"] });
;// CONCATENATED MODULE: ./src/server/getters/webfont.ts
/**
 * @file WebFont getter
 * @module server.getter.webfont
 * @author Surmon <https://github.com/surmon-china>
 */




const WebFontContentType = 'font/woff2';
const cacheMap = new Map();
const getWebFont = (options) => {
    const text = Array.from(new Set(options.text.split(''))).join('');
    const fontPath = __nccwpck_require__.ab + "surmon.me/" + PUBLIC_PATH + '/fonts/' + options.fontname;
    if (!external_fs_extra_namespaceObject["default"].existsSync(fontPath)) {
        return Promise.reject(`Font "${options.fontname}" not found!`);
    }
    // memory cache
    const cacheKey = `${options.fontname}_${text}`;
    if (cacheMap.has(cacheKey)) {
        return Promise.resolve(cacheMap.get(cacheKey));
    }
    // https://github.com/ecomfe/fontmin
    const fontmin = new external_fontmin_namespaceObject["default"]()
        .src(fontPath)
        .use(external_fontmin_namespaceObject["default"].glyph({ text, hinting: false }))
        .use(external_fontmin_namespaceObject["default"].ttf2woff2());
    return new Promise((resolve, reject) => {
        fontmin.run((error, files) => {
            if (error) {
                reject(error);
            }
            else {
                // @ts-ignore
                const fontData = files[0]._contents;
                cacheMap.set(cacheKey, fontData);
                resolve(fontData);
            }
        });
    });
};

;// CONCATENATED MODULE: external "fs"
var external_fs_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_fs_y = x => () => x
const external_fs_namespaceObject = external_fs_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_fs__["default"] });
;// CONCATENATED MODULE: external "vite"
var external_vite_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_vite_y = x => () => x
const external_vite_namespaceObject = external_vite_x({ ["createServer"]: () => __WEBPACK_EXTERNAL_MODULE_vite__.createServer });
;// CONCATENATED MODULE: ./src/server/renderer/template.ts
// manifest: https://vitejs.dev/guide/backend-integration.html
// render manifeat json to HTML
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderAssetsByManifest = (manifest, prefix) => {
    const item = Object.values(manifest);
    const entry = item.find((item) => item.isEntry);
    if (!entry)
        return '';
    const entryScript = entry.file;
    const entryStyles = entry.css || [];
    const entryImports = entry.imports || [];
    const entryDynamicImports = entry.dynamicImports || [];
    const importFiles = Array.from(new Set([...entryImports, ...entryDynamicImports])).map((key) => manifest[key].file);
    return [
        `<script type="module" crossorigin src="${prefix}/${entryScript}"></script>`,
        ...importFiles.map((item) => `<link rel="modulepreload" crossorigin href="${prefix}/${item}">`),
        ...entryStyles.map((item) => `<link rel="stylesheet" href="${prefix}/${item}">`)
    ].join('\n');
};
// resolve assets URL prefix
const resolveAssetsPrefixByManiFest = (html, manifest, prefix) => {
    // List all the files in the manifest, when any file is matched, replace it with the prefix
    return Object.values(manifest).reduce((result, { file }) => {
        return result.replace(new RegExp(`(href|src)="/${file}"`, 'g'), `$1="${prefix}/${file}"`);
    }, html);
};
const resolveTemplate = (input) => {
    let result = input.template;
    // deterministically changing file prefixes with manifest
    if (input.assetsPrefix && input.manifest) {
        result = resolveAssetsPrefixByManiFest(result, input.manifest, input.assetsPrefix);
    }
    return (result
        // MARK: replace! $ sign & use function replacer
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
        // https://github.com/vueuse/head#ssr-rendering
        .replace(/<title>[\s\S]*<\/title>/, '')
        .replace(`<html`, () => `<html ${input.heads.htmlAttrs} `)
        .replace(`<head>`, () => `<head>\n${input.heads.headTags}`)
        .replace(`<body>`, () => `<body ${input.heads.bodyAttrs}>`)
        .replace(`</body>`, () => `\n${input.heads.bodyTags}\n${input.scripts}\n${input.extraScripts}\n</body>`)
        .replace(`<!--app-html-->`, () => input.appHTML));
};

;// CONCATENATED MODULE: ./src/server/renderer/dev.ts





const enableDevRenderer = async (app, cache) => {
    // https://vitejs.dev/guide/ssr.html
    const viteServer = await (0,external_vite_namespaceObject.createServer)({
        root: process.cwd(),
        logLevel: 'info',
        appType: 'custom',
        server: {
            middlewareMode: true,
            watch: {
                usePolling: true,
                interval: 100
            }
        }
    });
    // use vite's connect instance as middleware
    app.use(viteServer.middlewares);
    app.use('*', async (request, response) => {
        const { renderApp, renderError } = await viteServer.ssrLoadModule('/src/ssr.ts');
        let template = external_fs_namespaceObject["default"].readFileSync(external_path_namespaceObject["default"].resolve(ROOT_PATH, 'index.html'), 'utf-8');
        try {
            const url = request.originalUrl;
            template = await viteServer.transformIndexHtml(url, template);
            const redered = await renderApp(request, cache);
            response
                .status(redered.code)
                .set({ 'Content-Type': 'text/html' })
                .end(resolveTemplate({
                template,
                heads: redered.heads,
                appHTML: redered.html,
                scripts: redered.stateScripts,
                extraScripts: redered.contextScripts
            }));
        }
        catch (error) {
            viteServer.ssrFixStacktrace(error);
            const redered = await renderError(request, error);
            response.status(redered.code).end(resolveTemplate({
                template,
                heads: redered.heads,
                appHTML: redered.html,
                scripts: redered.stateScripts,
                extraScripts: redered.contextScripts
            }));
        }
    });
};

;// CONCATENATED MODULE: ./src/server/renderer/prod.ts




const enableProdRenderer = async (app, cache) => {
    const template = external_fs_namespaceObject["default"].readFileSync(external_path_namespaceObject["default"].resolve(DIST_PATH, 'template.html'), 'utf-8');
    const manifest = external_fs_namespaceObject["default"].readFileSync(external_path_namespaceObject["default"].resolve(DIST_PATH, 'manifest.json'), 'utf-8');
    const manifestJSON = JSON.parse(manifest);
    // remove CSR entry
    // Bypass webpack rewrite dynamic import, it will be resolved at runtime.
    // https://github.com/vercel/ncc/issues/935#issuecomment-1189850042
    const _import = new Function('p', 'return import(p)');
    const { renderApp, renderError } = await _import(external_path_namespaceObject["default"].resolve(PRDO_SERVER_PATH, 'ssr.js'));
    // const { renderApp, renderError } = require(path.resolve(PRDO_SERVER_PATH, 'ssr.js'))
    app.use('*', async (request, response) => {
        try {
            const redered = await renderApp(request, cache);
            response
                .status(redered.code)
                .set({ 'Content-Type': 'text/html' })
                .end(resolveTemplate({
                template,
                manifest: manifestJSON,
                heads: redered.heads,
                appHTML: redered.html,
                scripts: redered.stateScripts,
                extraScripts: redered.contextScripts,
                assetsPrefix: redered.assetsPrefix
            }));
        }
        catch (error) {
            const redered = await renderError(request, error);
            response.status(redered.code).end(resolveTemplate({
                template,
                manifest: manifestJSON,
                heads: redered.heads,
                appHTML: redered.html,
                scripts: redered.stateScripts,
                extraScripts: redered.contextScripts,
                assetsPrefix: redered.assetsPrefix
            }));
        }
    });
};

;// CONCATENATED MODULE: ./src/server/helpers/responser.ts
/**
 * @file BFF Server responser
 * @module server.helper.responser
 * @author Surmon <https://github.com/surmon-china>
 */


const errorer = (response, { code, message }) => {
    console.warn(`[BFF] error:`, (0,external_axios_namespaceObject.isAxiosError)(message) ? message.toJSON() : message);
    response.status(code ?? INVALID_ERROR);
    response.send(typeof message === 'string'
        ? message
        : message instanceof Error
            ? message.message || message.name
            : JSON.stringify(message));
};
const responser = (promise) => {
    return (_, response) => {
        promise()
            .then((data) => response.send(data))
            .catch((error) => errorer(response, { message: error }));
    };
};

;// CONCATENATED MODULE: ./src/server/helpers/cacher.ts
/**
 * @file BFF Server cacher
 * @module server.helper.cacher
 * @author Surmon <https://github.com/surmon-china>
 */
// fetch & cache
const fetchAndCache = async (config) => {
    const data = await config.getter();
    await config.cache.set(config.key, data, config.ttl);
    return data;
};
// timeout prefetch
const setTimeoutPreRefresh = (config, preSeconds, refreshCount = 1) => {
    const timeoutSeconds = config.ttl - preSeconds;
    console.info('[cacher] setTimeoutPreRefresh', `> ${config.key} + ${refreshCount}`, `> cache expire when after ${config.ttl}s`, `> pre refresh when after ${timeoutSeconds}s`);
    setTimeout(async () => {
        try {
            await fetchAndCache(config);
            setTimeoutPreRefresh(config, preSeconds, refreshCount + 1);
        }
        catch (error) {
            console.warn(`[cacher] setTimeoutPreRefresh error:`, `> ${config.key} + ${refreshCount}`, error);
        }
    }, timeoutSeconds * 1000);
};
const retryingMap = new Map();
const retryFetch = async (config) => {
    if (await config.cache.has(config.key)) {
        retryingMap.set(config.key, false);
        return;
    }
    try {
        await fetchAndCache(config);
    }
    catch (error) {
        console.warn('[cacher] retryFetch error:', error);
    }
    finally {
        retryingMap.set(config.key, false);
    }
};
const cacher = async (configInput) => {
    // key prefix
    const config = { ...configInput, key: `bff_${configInput.key}` };
    // cached
    if (await config.cache.has(config.key)) {
        return await config.cache.get(config.key);
    }
    try {
        // 1. fetch & cache
        const data = await fetchAndCache(config);
        // 2. refresh 1 minute before ttl expires to get the latest data,
        // This behavior is performed recursively and causes the data to never expire.
        if (config.preRefresh !== false) {
            setTimeoutPreRefresh(config, 60);
        }
        // 3. return data
        return data;
    }
    catch (error) {
        // retry only once
        if (config.retryWhen && !retryingMap.get(config.key)) {
            retryingMap.set(config.key, true);
            setTimeout(() => retryFetch({ ...config }), config.retryWhen * 1000);
        }
        // return error
        throw error;
    }
};

;// CONCATENATED MODULE: external "http"
var external_http_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_http_y = x => () => x
const external_http_namespaceObject = external_http_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_http__["default"] });
;// CONCATENATED MODULE: external "compression"
var external_compression_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_compression_y = x => () => x
const external_compression_namespaceObject = external_compression_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_compression__["default"] });
;// CONCATENATED MODULE: external "cookie-parser"
var external_cookie_parser_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_cookie_parser_y = x => () => x
const external_cookie_parser_namespaceObject = external_cookie_parser_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_cookie_parser_591162dd__["default"] });
;// CONCATENATED MODULE: external "http-proxy"
var external_http_proxy_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_http_proxy_y = x => () => x
const external_http_proxy_namespaceObject = external_http_proxy_x({ ["default"]: () => __WEBPACK_EXTERNAL_MODULE_http_proxy_7fedf318__["default"] });
;// CONCATENATED MODULE: ./src/server/proxy.ts
/**
 * @file BFF Server proxy
 * @module server.proxy
 * @author Surmon <https://github.com/surmon-china>
 */





const PROXY_ROUTE_PATH = `${BFF_PROXY_PREFIX}/*`;
const proxyer = () => {
    // https://github.com/http-party/node-http-proxy
    const proxy = external_http_proxy_namespaceObject["default"].createProxyServer({
        proxyTimeout: 10 * 1000,
        timeout: 10 * 1000,
        prependPath: true,
        ignorePath: true,
        toProxy: false,
        xfwd: true
    });
    proxy.on('proxyReq', (proxyRequest, request) => {
        // https://github.com/http-party/node-http-proxy/issues/813#issuecomment-161266263
        request._proxyRequest = proxyRequest;
        proxyRequest.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/');
    });
    proxy.on('proxyRes', (proxyResponse) => {
        const statusCode = proxyResponse.statusCode;
        const location = proxyResponse.headers.location;
        // If the target resource redirects, the proxy server still needs to encode the format of the redirection
        if ([301, 302, 307, 308].includes(statusCode) && location) {
            proxyResponse.headers.location = `${BFF_PROXY_PREFIX}/${btoa(location)}`;
        }
        if (statusCode === 200) {
            // If the target resource does not specify a Cache-Control, set it to a 1-year max-age
            if (!proxyResponse.headers['cache-control']) {
                proxyResponse.headers['cache-control'] = 'public, max-age=31536000';
            }
        }
    });
    proxy.on('error', (error, request, response, target) => {
        // https://github.com/http-party/node-http-proxy/issues/813
        // https://github.com/http-party/node-http-proxy/issues/813#issuecomment-161266263
        if (request.socket.destroyed && error.code === 'ECONNRESET') {
            request._proxyRequest?.abort?.();
        }
        console.warn(`[BFF] proxy error: ${error.message} > ${target?.href}`);
        response.writeHead(INVALID_ERROR, { 'Content-Type': 'text/plain' });
        response.end('Proxy error: ' + error.message);
    });
    return (request, response) => {
        let targetURL = null;
        let parsedURL = null;
        try {
            targetURL = atob(request.params['0']);
            response.setHeader('x-original-url', targetURL);
            parsedURL = new URL(targetURL);
        }
        catch (error) {
            return response.status(BAD_REQUEST).send(`Proxy error: "${error?.message || String(error)}"`);
        }
        if (parsedURL.hostname.endsWith(META.domain)) {
            return response.status(BAD_REQUEST).send(`Proxy error: Invalid URL`);
        }
        if (isNodeProd) {
            const referer = request.headers.referrer || request.headers.referer;
            const origin = request.headers.origin;
            const isAllowedReferer = !referer || BFF_PROXY_ALLOWLIST_REGEXP.test(referer);
            const isAllowedOrigin = !origin || BFF_PROXY_ALLOWLIST_REGEXP.test(origin);
            if (!isAllowedReferer || !isAllowedOrigin) {
                return response.status(FORBIDDEN).send('Proxy error: forbidden');
            }
        }
        const headers = {};
        proxy.web(request, response, {
            target: targetURL,
            changeOrigin: true,
            followRedirects: false,
            autoRewrite: false,
            headers: {
                host: parsedURL.hostname,
                ...headers
            }
        });
    };
};

;// CONCATENATED MODULE: external "lru-cache"
var external_lru_cache_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_lru_cache_y = x => () => x
const external_lru_cache_namespaceObject = external_lru_cache_x({ ["LRUCache"]: () => __WEBPACK_EXTERNAL_MODULE_lru_cache_883435dc__.LRUCache });
;// CONCATENATED MODULE: external "redis"
var external_redis_x = y => { var x = {}; __nccwpck_require__.d(x, y); return x; }
var external_redis_y = x => () => x
const external_redis_namespaceObject = external_redis_x({ ["createClient"]: () => __WEBPACK_EXTERNAL_MODULE_redis__.createClient });
;// CONCATENATED MODULE: ./src/server/cache.ts
/**
 * @file Universal Server cache
 * @module server.cache
 * @author Surmon <https://github.com/surmon-china>
 */


const getLRUClient = () => {
    // https://github.com/isaacs/node-lru-cache
    const lruCache = new external_lru_cache_namespaceObject.LRUCache({ max: 500 });
    const set = async (key, value, ttl) => {
        if (ttl) {
            await lruCache.set(key, value, { ttl: ttl * 1000 });
        }
        else {
            await lruCache.set(key, value);
        }
    };
    return {
        set,
        get: async (key) => lruCache.get(key),
        has: async (key) => lruCache.has(key),
        del: async (key) => lruCache.delete(key),
        clear: async () => lruCache.clear()
    };
};
const getRedisClient = async (options) => {
    // https://github.com/redis/node-redis
    const client = (0,external_redis_namespaceObject.createClient)();
    client.on('connect', () => console.info('[Redis]', 'connecting...'));
    client.on('reconnecting', () => console.info('[Redis]', 'reconnecting...'));
    client.on('ready', () => console.info('[Redis]', 'readied.'));
    client.on('error', (error) => console.warn('[Redis]', 'client error!', error.message || error));
    await client.connect();
    const getCacheKey = (key) => {
        const _namespace = options?.namespace ?? 'ssr_app';
        return `${_namespace}:${key}`;
    };
    const set = async (key, value, ttl) => {
        const _value = value ? JSON.stringify(value) : '';
        if (ttl) {
            // EX — Set the specified expire time, in seconds.
            await client.set(getCacheKey(key), _value, { EX: ttl });
        }
        else {
            await client.set(getCacheKey(key), _value);
        }
    };
    const get = async (key) => {
        const value = await client.get(getCacheKey(key));
        return value ? JSON.parse(value) : value;
    };
    const has = async (key) => {
        const value = await client.exists(getCacheKey(key));
        return Boolean(value);
    };
    const del = (key) => client.del(getCacheKey(key));
    const clear = async () => {
        const keys = await client.keys(getCacheKey('*'));
        if (keys.length) {
            await client.del(keys);
        }
    };
    return { set, get, has, del, clear };
};
const createCacheClient = async (options) => {
    let cacheClient = null;
    try {
        cacheClient = await getRedisClient(options);
        console.info('[cache]', 'Redis store readied.');
    }
    catch (error) {
        cacheClient = getLRUClient();
        console.info('[cache]', 'LRU store readied.');
    }
    await cacheClient.clear();
    return cacheClient;
};

;// CONCATENATED MODULE: ./src/server/index.ts
/**
 * @file BFF Server main
 * @module server.index
 * @author Surmon <https://github.com/surmon-china>
 */







const createExpressApp = async () => {
    // init cache client
    const cache = await createCacheClient({
        namespace: META.domain.replace(/\./gi, '_')
    });
    // init app
    const app = (0,external_express_namespaceObject["default"])();
    const server = external_http_namespaceObject["default"].createServer(app);
    // app proxy
    app.use(PROXY_ROUTE_PATH, proxyer());
    // app middlewares
    app.use(external_express_namespaceObject["default"].json());
    app.use((0,external_cookie_parser_namespaceObject["default"])());
    app.use((0,external_compression_namespaceObject["default"])());
    return {
        app,
        server,
        cache
    };
};

;// CONCATENATED MODULE: ./src/bff.ts
/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */

























// init env variables for BFF server env
external_dotenv_namespaceObject["default"].config();
// app
createExpressApp().then(async ({ app, server, cache }) => {
    // static
    app.use(external_express_namespaceObject["default"]["static"](PUBLIC_PATH));
    // init thirds task
    initInstagramCalendar();
    // sitemap
    app.get('/sitemap.xml', async (_, response) => {
        try {
            const data = await cacher({
                cache,
                key: 'sitemap',
                ttl: 60 * 60 * 1,
                getter: getSitemapXml
            });
            response.header('Content-Type', 'application/xml');
            response.send(data);
        }
        catch (error) {
            errorer(response, { message: error });
        }
    });
    // RSS
    app.get('/rss.xml', async (_, response) => {
        try {
            const data = await cacher({
                cache,
                key: 'rss',
                ttl: 60 * 60 * 1,
                getter: getRssXml
            });
            response.header('Content-Type', 'application/xml');
            response.send(data);
        }
        catch (error) {
            errorer(response, { message: error });
        }
    });
    // gtag
    app.get('/effects/gtag', async (_, response) => {
        try {
            const data = await cacher({
                cache,
                key: 'gtag',
                ttl: 60 * 60 * 48,
                retryWhen: 60 * 60 * 1,
                getter: getGTagScript
            });
            response.header('Content-Type', 'text/javascript');
            response.send(data);
        }
        catch (error) {
            errorer(response, { message: error });
        }
    });
    // WebFont
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.WebFont}`, async (request, response) => {
        const fontname = decodeURIComponent(String(request.query.fontname)).trim();
        const text = decodeURIComponent(String(request.query.text)).trim();
        if (!text || !fontname) {
            errorer(response, { code: BAD_REQUEST, message: 'Invalid params' });
            return;
        }
        try {
            const data = await getWebFont({ fontname, text });
            // never expired
            response.header('Cache-Control', 'public, max-age=31536000');
            response.header('Content-Type', WebFontContentType);
            response.send(data);
        }
        catch (error) {
            errorer(response, { message: error });
        }
    });
    // Bing wallpapers
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.BingWallpaper}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.BingWallpaper,
            ttl: 60 * 60 * 6,
            retryWhen: 60 * 30,
            getter: getAllWallpapers
        });
    }));
    // My GoogleMap
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.MyGoogleMap}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.MyGoogleMap,
            ttl: 60 * 60 * 6,
            retryWhen: 60 * 30,
            getter: getMyGoogleMap
        });
    }));
    // GitHub sponsors
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubSponsors}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.GitHubSponsors,
            ttl: 60 * 60 * 18,
            retryWhen: 60 * 10,
            getter: getGitHubSponsors
        });
    }));
    // GitHub contributions
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubContributions}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.GitHubContributions,
            ttl: 60 * 60 * 8,
            retryWhen: 60 * 10,
            getter: () => {
                const now = new Date();
                const end = now.toISOString();
                now.setFullYear(now.getFullYear() - 1);
                const start = now.toISOString();
                return getGitHubContributions(start, end);
            }
        });
    }));
    // open-source
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSourceGitHubStatistic}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.OpenSourceGitHubStatistic,
            ttl: 60 * 60 * 8,
            retryWhen: 60 * 10,
            getter: getGitHubStatistic
        });
    }));
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSourceNPMStatistic}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.OpenSourceNPMStatistic,
            ttl: 60 * 60 * 8,
            retryWhen: 60 * 10,
            getter: getNPMStatistic
        });
    }));
    // 163 music BGM list
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.NetEaseMusic}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.NetEaseMusic,
            ttl: 60 * 60 * 6,
            retryWhen: 60 * 10,
            getter: getSongList
        });
    }));
    // Douban movies
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.DoubanMovies}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.DoubanMovies,
            ttl: 60 * 60 * 32,
            retryWhen: 60 * 10,
            getter: getDoubanMovies
        });
    }));
    // Twitter aggregate
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterAggregate}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.TwitterAggregate,
            ttl: 60 * 60 * 1,
            retryWhen: 60 * 10,
            getter: getTwitterAggregate
        });
    }));
    // Instagram medias
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramMedias}`, (request, response, next) => {
        const afterToken = request.query.after;
        if (afterToken && typeof afterToken !== 'string') {
            errorer(response, { code: BAD_REQUEST, message: 'Invalid params' });
            return;
        }
        responser(() => {
            return cacher({
                cache,
                key: `instagram_medias_page_${afterToken ?? 'first'}`,
                preRefresh: !afterToken,
                ttl: 60 * 60 * 3,
                retryWhen: 60 * 10,
                getter: () => getInstagramMedias({ after: afterToken })
            });
        })(request, response, next);
    });
    // Instagram media children
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramMediaChildren}`, (request, response, next) => {
        const mediaId = request.query.id;
        if (!mediaId || typeof mediaId !== 'string') {
            errorer(response, { code: BAD_REQUEST, message: 'Invalid params' });
            return;
        }
        responser(() => {
            return cacher({
                cache,
                key: `instagram_media_children_${mediaId}`,
                ttl: 60 * 60 * 24 * 7,
                retryWhen: 60 * 10,
                getter: () => getInstagramMediaChildren(mediaId)
            });
        })(request, response, next);
    });
    // Instagram calendar
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramCalendar}`, responser(() => getInstagramCalendar()));
    // YouTube platlists
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubePlaylist}`, responser(() => {
        return cacher({
            cache,
            key: TunnelModule.YouTubePlaylist,
            ttl: 60 * 60 * 24,
            retryWhen: 60 * 10,
            getter: getYouTubeChannelPlayLists
        });
    }));
    // YouTube videos
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubeVideoList}`, (request, response, next) => {
        const playlistId = request.query.id;
        if (!playlistId || typeof playlistId !== 'string') {
            errorer(response, { code: BAD_REQUEST, message: 'Invalid params' });
            return;
        }
        responser(() => {
            return cacher({
                cache,
                key: `youtube_playlist_${playlistId}`,
                ttl: 60 * 60 * 1,
                retryWhen: 60 * 10,
                getter: () => getYouTubeVideoListByPlayerlistId(playlistId)
            });
        })(request, response, next);
    });
    // vue renderer
    await (isNodeDev ? enableDevRenderer(app, cache) : enableProdRenderer(app, cache));
    // run
    server.listen(getBFFServerPort(), () => {
        const infos = [
            `in ${NODE_ENV}`,
            `at ${new Date().toLocaleString()}`,
            `listening on ${JSON.stringify(server.address())}`
        ];
        console.info('[surmon.me]', `Run! ${infos.join(', ')}.`);
    });
});

