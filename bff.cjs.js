/*!
* Surmon.me v3.22.0
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon
*/
'use strict';var express=require('express'),RSS=require('rss'),axios=require('axios'),path=require('path'),stream=require('stream'),sitemap=require('sitemap'),WonderfulBingWallpaper=require('wonderful-bing-wallpaper'),fastXmlParser=require('fast-xml-parser'),yargs=require('yargs'),fs=require('fs-extra'),Fontmin=require('fontmin'),fs$1=require('fs'),vite=require('vite'),http=require('http'),compression=require('compression'),cookieParser=require('cookie-parser'),httpProxy=require('http-proxy'),LRU=require('lru-cache'),redis=require('redis');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var express__default=/*#__PURE__*/_interopDefaultLegacy(express);var RSS__default=/*#__PURE__*/_interopDefaultLegacy(RSS);var axios__default=/*#__PURE__*/_interopDefaultLegacy(axios);var path__default=/*#__PURE__*/_interopDefaultLegacy(path);var WonderfulBingWallpaper__default=/*#__PURE__*/_interopDefaultLegacy(WonderfulBingWallpaper);var fs__default=/*#__PURE__*/_interopDefaultLegacy(fs);var Fontmin__default=/*#__PURE__*/_interopDefaultLegacy(Fontmin);var fs__default$1=/*#__PURE__*/_interopDefaultLegacy(fs$1);var http__default=/*#__PURE__*/_interopDefaultLegacy(http);var compression__default=/*#__PURE__*/_interopDefaultLegacy(compression);var cookieParser__default=/*#__PURE__*/_interopDefaultLegacy(cookieParser);var LRU__default=/*#__PURE__*/_interopDefaultLegacy(LRU);/**
 * @file Dev environment
 * @module environment
 * @author Surmon <https://github.com/surmon-china>
 */
var NodeEnv;
(function (NodeEnv) {
    NodeEnv["Development"] = "development";
    NodeEnv["Production"] = "production";
    NodeEnv["Test"] = "test";
})(NodeEnv || (NodeEnv = {}));
const NODE_ENV = "production";
const isDev = "production" === NodeEnv.Development;
const isProd = "production" === NodeEnv.Production;
"production" === NodeEnv.Test;/**
 * @file Tunnel constant
 * @module constant.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */
var TunnelModule;
(function (TunnelModule) {
    TunnelModule["WebFont"] = "webfont";
    TunnelModule["MyGoogleMap"] = "my_google_map";
    TunnelModule["TwitterUserInfo"] = "twitter_userinfo";
    TunnelModule["TwitterTweets"] = "twitter_tweets";
    TunnelModule["TwitterCalendar"] = "twitter_calendar";
    TunnelModule["YouTubePlaylist"] = "youtube_playlist";
    TunnelModule["YouTubeVideoList"] = "youtube_video_list";
    TunnelModule["InstagramMedias"] = "instagram_medias";
    TunnelModule["InstagramCalendar"] = "instagram_calendar";
    TunnelModule["BingWallpaper"] = "bing_wallpaper";
    TunnelModule["GitHubSponsors"] = "github_sponsors";
    TunnelModule["GitHubContributions"] = "github_contributions";
    TunnelModule["NetEaseMusic"] = "netease_music";
    TunnelModule["DoubanMovies"] = "douban_movies";
    TunnelModule["OpenSeaAssets"] = "opensea_assets";
    TunnelModule["OpenSeaCollections"] = "opensea_collections";
    TunnelModule["OpenSourceGitHubStatistic"] = "open_source_github_statistic";
    TunnelModule["OpenSourceNPMStatistic"] = "open_source_npm_statistic";
})(TunnelModule || (TunnelModule = {}));/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */
const BFF_TUNNEL_PREFIX = '/_tunnel';
const BFF_PROXY_PREFIX = '/_proxy';
const BFF_PROXY_ALLOWLIST = ['https://surmon.me', 'https://cdn.surmon.me'];
const getBFFServerPort = () => Number(process.env.PORT || 3000);/**
 * @file App config
 * @module config.app
 * @author Surmon <https://github.com/surmon-china>
 */
const META = Object.freeze({
    title: 'Surmon.me',
    zh_sub_title: '来苏之望',
    en_sub_title: 'Come into the wild',
    zh_biography: '本是浪蝶游蜂，自留半亩石池，但求直抒胸臆，挥墨九云之中',
    en_biography: 'Either write something worth reading or do something worth writing.',
    url: 'https://surmon.me',
    domain: 'surmon.me',
    author: 'Surmon',
    primary: '#0088f5'
});
Object.freeze({
    zh_title: '居东半球，靠近赤道',
    en_title: 'UTC +08:00',
    coordinates: [103.830391822121, 1.340863]
});
Object.freeze({
    // readonly token
    TOKEN: 'pk.eyJ1Ijoic3VybW9uIiwiYSI6ImNsNDE4YmkzNjB2Z2wzY3F5dWg2M2tqeWIifQ.JhgYGFI4zsuNiX9dH-pBDg',
    STYLE_LIGHT: 'mapbox://styles/surmon/cl41fktzn000f14pet94oo1u4',
    STYLE_DARK: 'mapbox://styles/surmon/cl41gy1qo000l15ry20j5ae0k',
    ZOOM: 11.337439,
    CENTER: [121.4930539351185, 31.227570979004497]
});
const IDENTITIES = Object.freeze({
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
    ETH_ADDRESS: '0xaD556974D449126efdeF23f4FF581861C301cB77',
    OPENSEA_ETH: '0xaD556974D449126efdeF23f4FF581861C301cB77'
});
const VALUABLE_LINKS = Object.freeze({
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
    APP_APK_FILE: 'https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/android/surmon.me.apk',
    MARKDOWN: 'https://daringfireball.net/projects/markdown/',
    GOOGLE_MY_MAP: `https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3`,
    GOOGLE_MY_MAP_KML: `https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w`,
    DISCORD_GROUP: 'https://discord.surmon.me',
    TELEGRAM_GROUP: 'https://t.me/+Z2wsxogVbYM2ZmE1',
    MUSIC_163: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
    YOUTUBE_CHANNEL: `https://www.youtube.com/channel/${IDENTITIES.YOUTUBE_CHANNEL_ID}`,
    TELEGRAM: 'https://t.me/surmon',
    OPENSEA: 'https://opensea.io/Surmon',
    DOUBAN: 'https://www.douban.com/people/nocower',
    DOUBAN_MOVIE: `https://m.douban.com/people/${IDENTITIES.DOUBAN_USER_ID}/movie_charts`,
    QUORA: 'https://www.quora.com/profile/Surmon',
    LINKEDIN: 'https://www.linkedin.com/in/surmon',
    INSTAGRAM: `https://www.instagram.com/${IDENTITIES.INSTAGRAM_USERNAME}`,
    TWITTER: `https://twitter.com/${IDENTITIES.TWITTER_USER_NAME}`
});/**
 * @file BFF Server helper
 * @module server.helper
 * @author Surmon <https://github.com/surmon-china>
 */
// MARK: 与非生产资料解耦
const NODEPRESS_API = `https://api.surmon.me`;
const ROOT_PATH = process.cwd();
const DIST_PATH = path__default["default"].join(ROOT_PATH, 'dist');
const PRDO_CLIENT_PATH = path__default["default"].join(DIST_PATH, 'client');
const PRDO_SERVER_PATH = path__default["default"].join(DIST_PATH, 'server');
const PUBLIC_PATH = isDev ? path__default["default"].join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH;/**
 * @file BFF archive getter
 * @module server.getter.archive
 * @author Surmon <https://github.com/surmon-china>
 */
const getPageURL = (page) => `${META.url}/${page}`;
const getTagURL = (tag) => `${META.url}/tag/${tag}`;
const getCategoryURL = (category) => `${META.url}/category/${category}`;
const getArticleURL = (id) => `${META.url}/article/${id}`;
const getArchiveData = () => {
    return axios__default["default"]
        .get(`${NODEPRESS_API}/archive`, { timeout: 6000 })
        .then((response) => {
        if (response.status === 200) {
            return response.data.result;
        }
        else {
            return Promise.reject(response.statusText);
        }
    })
        .catch((error) => {
        return Promise.reject(error.toJSON?.() || error);
    });
};/**
 * @file Archive RSS generator
 * @module server.getter.rss
 * @author Surmon <https://github.com/surmon-china>
 */
const getRSSXML = async (archiveData) => {
    const archive = archiveData || (await getArchiveData());
    const feed = new RSS__default["default"]({
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
    archive.articles.forEach((article) => feed.item({
        title: article.title,
        description: article.description,
        url: getArticleURL(article.id),
        guid: String(article.id),
        categories: article.category.map((category) => category.slug),
        author: META.author,
        date: article.create_at,
        enclosure: {
            url: article.thumb
        }
    }));
    return feed.xml({ indent: true });
};/**
 * @file Archive sitemap generator
 * @module server.getter.sitemap
 * @author Surmon <https://github.com/surmon-china>
 */
const getSitemapXML = async (archiveData) => {
    const archive = archiveData || (await getArchiveData());
    const sitemapStream = new sitemap.SitemapStream({
        hostname: META.url
    });
    const sitemapItemList = [
        { url: META.url, changefreq: sitemap.EnumChangefreq.ALWAYS, priority: 1 },
        {
            url: getPageURL('about'),
            changefreq: sitemap.EnumChangefreq.YEARLY,
            priority: 1
        },
        {
            url: getPageURL('archive'),
            changefreq: sitemap.EnumChangefreq.ALWAYS,
            priority: 1
        },
        {
            url: getPageURL('guestbook'),
            changefreq: sitemap.EnumChangefreq.ALWAYS,
            priority: 1
        }
    ];
    archive.categories.forEach((category) => {
        sitemapItemList.push({
            priority: 0.6,
            changefreq: sitemap.EnumChangefreq.DAILY,
            url: getCategoryURL(category.slug)
        });
    });
    archive.tags.forEach((tag) => {
        sitemapItemList.push({
            priority: 0.6,
            changefreq: sitemap.EnumChangefreq.DAILY,
            url: getTagURL(tag.slug)
        });
    });
    archive.articles.forEach((article) => {
        sitemapItemList.push({
            priority: 0.8,
            changefreq: sitemap.EnumChangefreq.DAILY,
            url: getArticleURL(article.id),
            lastmodISO: new Date(article.update_at).toISOString()
        });
    });
    return sitemap.streamToPromise(stream.Readable.from(sitemapItemList).pipe(sitemapStream)).then((data) => {
        return data.toString();
    });
};/**
 * @file Outside
 * @module transform.outside
 * @author Surmon <https://github.com/surmon-china>
 */
const getGAScriptURL = (measurementID) => {
    return `https://www.googletagmanager.com/gtag/js?id=${measurementID}`;
};/**
 * @file BFF GA getter
 * @module server.getter.gtag
 * @author Surmon <https://github.com/surmon-china>
 */
const getGTagScript = async () => {
    const response = await axios__default["default"].get(getGAScriptURL(IDENTITIES.GOOGLE_ANALYTICS_TRACKING_ID), {
        timeout: 6000
    });
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw response.data;
    }
};/**
 * @file BFF wallpaper getter
 * @module server.getter.wallpaper
 * @author Surmon <https://github.com/surmon-china>
 */
const wbw = new WonderfulBingWallpaper__default["default"]();
// 获取今日壁纸
const getWallpapers = async (params) => {
    const wallpaperJSON = await wbw.getWallpapers({ ...params, size: 8 });
    try {
        return wbw.humanizeWallpapers(wallpaperJSON);
    }
    catch (error) {
        throw 'wallpaper 控制器解析 JSON 失败' + error;
    }
};
// 今日壁纸缓存（ZH）
const getZHWallpapers = () => {
    return getWallpapers({
        local: 'zh-CN',
        host: 'cn.bing.com',
        ensearch: 0
    });
};
// 今日壁纸缓存（EN）
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
};/**
 * @file BFF google map getter
 * @module server.getter.my-google-map
 * @author Surmon <https://github.com/surmon-china>
 */
const parser = new fastXmlParser.XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: '@'
});
const getMyGoogleMap = () => {
    return axios__default["default"]
        .get(VALUABLE_LINKS.GOOGLE_MY_MAP_KML, {
        timeout: 6000
    })
        .then((response) => {
        if (response.status === 200) {
            return parser.parse(response.data).kml.Document;
        }
        else {
            return Promise.reject(response.data);
        }
    })
        .catch((error) => {
        return Promise.reject(error.toJSON?.() || error);
    });
};/**
 * @file BFF argv config
 * @module config.bff.argv
 * @author Surmon <https://github.com/surmon-china>
 */
const GITHUB_BEARER_TOKEN = yargs.argv.github_token;
const TWITTER_BEARER_TOKEN = yargs.argv.twitter_bearer_token;
const INSTAGRAM_TOKEN = yargs.argv.instagram_token;
const YOUTUBE_API_KEY = yargs.argv.youtube_token;/**
 * @file BFF GitHub getter
 * @module server.getter.github
 * @author Surmon <https://github.com/surmon-china>
 */
const graphqlGitHub = (query) => {
    return axios__default["default"]
        .request({
        // https://github.com/settings/tokens
        headers: { Authorization: `bearer ${GITHUB_BEARER_TOKEN}` },
        url: `https://api.github.com/graphql`,
        method: 'POST',
        data: JSON.stringify({
            query: `query {
        user(login: "${IDENTITIES.GITHUB_USER_NAME}") {
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
};/**
 * @file BFF Twitter getter
 * @module server.getter.twitter
 * @author Surmon <https://github.com/surmon-china>
 */
// 1. Generate tokens
// https://developer.twitter.com/en/portal/projects-and-apps
// 2. Get userinfo
// https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username
const getTwitterUserinfoByUsername = async (username) => {
    const response = await axios__default["default"].get(`https://api.twitter.com/2/users/by/username/${username}`, {
        timeout: 8000,
        params: {
            'user.fields': `location,url,description,profile_image_url,public_metrics`
        },
        headers: {
            Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
        }
    });
    if (response.status === 200 && response.data.data) {
        return response.data.data;
    }
    else {
        throw response.data;
    }
};
// 3. Get tweets
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
const getTwitterTweetsByUID = async (UID) => {
    const response = await axios__default["default"].get(`https://api.twitter.com/2/users/${UID}/tweets`, {
        timeout: 8000,
        params: {
            exclude: 'replies',
            expansions: `attachments.media_keys,author_id,entities.mentions.username,geo.place_id,in_reply_to_user_id,referenced_tweets.id,referenced_tweets.id.author_id`,
            'tweet.fields': `attachments,author_id,context_annotations,conversation_id,created_at,entities,id,in_reply_to_user_id,lang,possibly_sensitive,public_metrics,referenced_tweets,reply_settings,source,text,withheld`,
            'user.fields': `created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`,
            'place.fields': `contained_within,country,country_code,full_name,id,name,place_type`,
            'media.fields': `duration_ms,height,media_key,preview_image_url,type,url,width,public_metrics`,
            max_results: 46
        },
        headers: {
            Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
        }
    });
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw response.data;
    }
};
const getTwitterUserinfo = () => {
    return getTwitterUserinfoByUsername(IDENTITIES.TWITTER_USER_NAME);
};
let uidCache = null;
const ensureUID = async () => {
    if (uidCache) {
        return uidCache;
    }
    else {
        uidCache = (await getTwitterUserinfo()).id;
        return uidCache;
    }
};
const getTwitterTweets = async () => {
    const uid = await ensureUID();
    return await getTwitterTweetsByUID(uid);
};
// ---------------------------------------------------------
// Tweets calendar
const fetchPageTweets = async (startTime, pagination_token) => {
    const uid = await ensureUID();
    return axios__default["default"]
        .get(`https://api.twitter.com/2/users/${uid}/tweets`, {
        timeout: 8000,
        params: {
            'tweet.fields': `id,created_at`,
            start_time: startTime,
            pagination_token,
            max_results: 100
        },
        headers: {
            Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
        }
    })
        .then((response) => {
        if (response.status === 200) {
            return response.data;
        }
        else {
            return Promise.reject(response.data);
        }
    })
        .catch((error) => {
        return Promise.reject(error.toJSON());
    });
};
function doFetchAllTweets({ startTime, nextToken, tweets = [], onSucceed, onFailed }) {
    fetchPageTweets(startTime, nextToken)
        .then((result) => {
        if (result.data) {
            tweets.push(...result.data);
        }
        if (result.meta.next_token) {
            doFetchAllTweets({
                startTime,
                nextToken: result.meta.next_token,
                tweets,
                onSucceed,
                onFailed
            });
        }
        else {
            onSucceed?.(tweets);
        }
    })
        .catch(onFailed);
}
const calendarTemp$1 = {
    tweets: [],
    calendar: []
};
function fetchAllTweets() {
    console.info(`[BFF] twitter.fetchAllTweets`);
    calendarTemp$1.tweets = [];
    calendarTemp$1.calendar = [];
    // startTime
    const today = new Date();
    today.setDate(1);
    today.setFullYear(today.getFullYear() - 1);
    const prevYearToday = today.toISOString();
    doFetchAllTweets({
        startTime: prevYearToday,
        onSucceed: (tweets) => {
            console.info(`[BFF] twitter.fetchAllTweets done, ${tweets.length} tweets. refetch when after 18h`);
            setTimeout(() => fetchAllTweets(), 18 * 60 * 60 * 1000);
            const map = new Map();
            tweets.forEach((tweet) => {
                const key = tweet.created_at.slice(0, 10);
                map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1);
            });
            calendarTemp$1.calendar = Array.from(map, ([date, count]) => ({ date, count }));
        },
        onFailed: (error) => {
            console.warn(`[BFF] twitter.fetchAllTweets error, retry when after 30s`, error);
            setTimeout(() => fetchAllTweets(), 30 * 1000);
        }
    });
}
const initTwitterCalendar = () => fetchAllTweets();
const getTwitterCalendar = async () => calendarTemp$1.calendar;/**
 * @file BFF instagram getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */
const getInstagramMedias = async () => {
    const fields = `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp`;
    const response = await axios__default["default"].get(`https://graph.instagram.com/me/media?fields=${fields}&access_token=${INSTAGRAM_TOKEN}`, { timeout: 8000 });
    if (response.status === 200 && response.data.data) {
        return response.data.data;
    }
    else {
        throw response.data;
    }
};
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/user/media
const fetchPageMedias = (sinceUnix, nextToken) => {
    return axios__default["default"]
        .get(`https://graph.instagram.com/v13.0/${IDENTITIES.INSTAGRAM_FB_ID}/media`, {
        timeout: 8000,
        params: {
            access_token: INSTAGRAM_TOKEN,
            fields: `id,timestamp`,
            limit: 100,
            since: sinceUnix,
            after: nextToken
        }
    })
        .then((response) => {
        if (response.status === 200 && response.data.data) {
            return response.data;
        }
        else {
            return Promise.reject(response.data);
        }
    })
        .catch((error) => {
        return Promise.reject(error.toJSON());
    });
};
function doFetchAllMedias({ sinceUnix, nextToken, medias = [], onSucceed, onFailed }) {
    fetchPageMedias(sinceUnix, nextToken)
        .then((result) => {
        medias.push(...result.data);
        if (result.paging.next) {
            doFetchAllMedias({
                sinceUnix,
                nextToken: result.paging.cursors.after,
                medias,
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
    console.info(`[BFF] instagram.fetchAllMedias`);
    calendarTemp.data = [];
    // startTime
    const today = new Date();
    today.setDate(1);
    today.setFullYear(today.getFullYear() - 1);
    const prevYearToday = Math.round(today.getTime() / 1000);
    doFetchAllMedias({
        sinceUnix: prevYearToday,
        onSucceed: (medias) => {
            console.info(`[BFF] instagram.fetchAllMedias done, ${medias.length} medias. refetch when after 18h`);
            setTimeout(() => fetchAllMedias(), 18 * 60 * 60 * 1000);
            const map = new Map();
            medias.forEach((tweet) => {
                const key = tweet.timestamp.slice(0, 10);
                map.has(key) ? map.set(key, map.get(key) + 1) : map.set(key, 1);
            });
            calendarTemp.data = Array.from(map, ([date, count]) => ({ date, count }));
        },
        onFailed: (error) => {
            console.warn(`[BFF] instagram.fetchAllMedias error, retry when after 30s`, error);
            setTimeout(() => fetchAllMedias(), 30 * 1000);
        }
    });
}
const initInstagramCalendar = () => fetchAllMedias();
const getInstagramCalendar = async () => calendarTemp.data;/**
 * @file BFF YouTube getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */
// 1. Generate API key
// https://console.cloud.google.com/apis/credentials
// 2. Get playlist by Channel ID
// https://developers.google.com/youtube/v3/docs/playlists/list
const getYouTubeChannelPlayLists = async () => {
    const response = await axios__default["default"].get(`https://www.googleapis.com/youtube/v3/playlists`, {
        timeout: 8000,
        params: {
            part: 'snippet,contentDetails',
            maxResults: 50,
            channelId: IDENTITIES.YOUTUBE_CHANNEL_ID,
            key: YOUTUBE_API_KEY
        }
    });
    if (response.status === 200 && response.data.items) {
        return response.data.items;
    }
    else {
        throw response.data;
    }
};
// 3. Get video list by playlist ID
// https://developers.google.com/youtube/v3/docs/playlistItems/list
// MARK: can't order by date, max results 50
const getYouTubeVideoListByPlayerlistID = async (playlistID) => {
    const response = await axios__default["default"].get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
        timeout: 8000,
        params: {
            part: 'snippet,contentDetails',
            maxResults: 50,
            playlistId: playlistID,
            key: YOUTUBE_API_KEY
        }
    });
    if (response.status === 200 && response.data.items) {
        return response.data.items;
    }
    else {
        throw response.data;
    }
};/**
 * @file BFF open-srouce getter
 * @module server.getter.open-srouce
 * @author Surmon <https://github.com/surmon-china>
 */
const fetchStatisticJSON = async (fileName) => {
    const url = `https://raw.githubusercontent.com/${IDENTITIES.GITHUB_USER_NAME}/${IDENTITIES.GITHUB_USER_NAME}/release/${fileName}`;
    const response = await axios__default["default"].get(url, { timeout: 6000 });
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw response.data;
    }
};
const getGitHubStatistic = () => fetchStatisticJSON('github.json');
const getNPMStatistic = () => fetchStatisticJSON('npm.json');/**
 * @file BFF opensea getter
 * @module server.getter.opensea
 * @author Surmon <https://github.com/surmon-china>
 */
const getOpenSeaAssets = async (cursor) => {
    // https://docs.opensea.io/reference/getting-assets
    const response = await axios__default["default"].get(`https://api.opensea.io/api/v1/assets`, {
        params: {
            // cursor,
            owner: IDENTITIES.OPENSEA_ETH,
            order_direction: 'desc',
            include_orders: 'false',
            limit: '30',
            format: 'json'
        },
        headers: {
            // https://docs.opensea.io/reference/request-an-api-key
            'x-api-key': ''
        }
    });
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw response.data;
    }
};
const getOpenSeaCollections = async () => {
    // https://docs.opensea.io/reference/retrieving-collections
    const response = await axios__default["default"].get(`https://api.opensea.io/api/v1/collections`, {
        params: {
            asset_owner: IDENTITIES.OPENSEA_ETH,
            limit: '300',
            format: 'json'
        },
        headers: {
            // https://docs.opensea.io/reference/request-an-api-key
            'x-api-key': ''
        }
    });
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw response.data;
    }
};/**
 * @file BFF douban getter
 * @module server.getter.douban
 * @author Surmon <https://github.com/surmon-china>
 */
const getDoubanMovies = () => {
    const URL = `https://m.douban.com/rexxar/api/v2/user/${IDENTITIES.DOUBAN_USER_ID}/collection_stats?type=movie&for_mobile=1`;
    return axios__default["default"]
        .get(URL, {
        timeout: 6000,
        headers: {
            Referer: VALUABLE_LINKS.DOUBAN_MOVIE
        }
    })
        .then((response) => {
        if (response.status === 200) {
            return response.data;
        }
        else {
            return Promise.reject(response.data);
        }
    })
        .catch((error) => {
        return Promise.reject(error.toJSON?.() || error);
    });
};/**
 * @file BFF music getter
 * @module server.getter.music
 * @author Surmon <https://github.com/surmon-china>
 */
const PLAY_LIST_LIMIT = 168;
const getSongList = async () => {
    // https://github.com/Binaryify/NeteaseCloudMusicApi/blob/a0500ec648f22a1dd20fc7b529126f813aa26935/module/playlist_track_all.js
    const playlistDetail = await axios__default["default"].get(`https://music.163.com/api/v6/playlist/detail?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`, { timeout: 6000 });
    if (playlistDetail.data.code < 0) {
        throw new Error(playlistDetail.data.message);
    }
    const trackIDs = playlistDetail.data.playlist?.trackIds || [];
    const idsParams = trackIDs
        .slice(0, PLAY_LIST_LIMIT)
        .map((id) => `{id:${id.id}}`)
        .join(',');
    const songListDetail = await axios__default["default"].get(`https://music.163.com/api/v3/song/detail?c=[${idsParams}]`, { timeout: 6000 });
    if (!songListDetail.data.songs) {
        throw new Error(songListDetail.data);
    }
    const songs = songListDetail.data.songs || [];
    return (songs
        // 过滤掉无版权音乐
        // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e6%ad%8c%e5%8d%95
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
};/**
 * @file WebFont getter
 * @module server.getter.webfont
 * @author Surmon <https://github.com/surmon-china>
 */
const WebFontContentType = 'font/woff2';
const cacheMap = new Map();
const getWebFont = (options) => {
    // https://github.com/ecomfe/fontmin
    const text = Array.from(new Set(options.text.split(''))).join('');
    const fontPath = path__default["default"].resolve(PUBLIC_PATH, 'fonts', options.fontname);
    if (!fs__default["default"].existsSync(fontPath)) {
        return Promise.reject(`Font "${options.fontname}" not found!`);
    }
    // memory cache
    const cacheKey = `${options.fontname}_${text}`;
    if (cacheMap.has(cacheKey)) {
        return Promise.resolve(cacheMap.get(cacheKey));
    }
    const fontmin = new Fontmin__default["default"]()
        .src(fontPath)
        .use(Fontmin__default["default"].glyph({ text, hinting: false }))
        .use(Fontmin__default["default"].ttf2woff2());
    return new Promise((resolve, reject) => {
        fontmin.run((error, files) => {
            if (error) {
                reject(error);
            }
            else {
                const fontData = files[0]._contents;
                cacheMap.set(cacheKey, fontData);
                resolve(fontData);
            }
        });
    });
};const resolveTemplate = (config) => {
    const { template, appHTML, heads, scripts } = config;
    const bodyScripts = [
        scripts
        // MARK: https://cn.vitejs.dev/config/#build-ssrmanifest
        // client output less assets (3 js + 1 css) & built-in HTML
        // manifest
    ].join('\n');
    const html = template
        // MARK: replace! $ sign & use function replacer
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
        // https://github.com/vueuse/head#ssr-rendering
        .replace(/<title>[\s\S]*<\/title>/, '')
        .replace(`<html`, () => `<html ${heads.htmlAttrs} `)
        .replace(`<head>`, () => `<head>\n${heads.headTags}`)
        .replace(`<!--app-html-->`, () => appHTML)
        .replace(`<body>`, () => `<body ${heads.bodyAttrs}>`)
        .replace(`</body>`, () => `\n${bodyScripts}\n</body>`);
    return html;
};const enableDevRenderer = async (app, cache) => {
    const viteServer = await vite.createServer({
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
        let template = fs__default$1["default"].readFileSync(path__default["default"].resolve(ROOT_PATH, 'index.html'), 'utf-8');
        try {
            const url = request.originalUrl;
            template = await viteServer.transformIndexHtml(url, template);
            const redered = await renderApp(request, cache);
            response
                .status(redered.code)
                .set({ 'Content-Type': 'text/html' })
                .end(resolveTemplate({
                template,
                appHTML: redered.html,
                heads: redered.heads,
                scripts: redered.scripts
            }));
        }
        catch (error) {
            viteServer.ssrFixStacktrace(error);
            const redered = await renderError(request, error);
            response.status(redered.code).end(resolveTemplate({
                template,
                appHTML: redered.html,
                heads: redered.heads,
                scripts: redered.scripts
            }));
        }
    });
};const enableProdRenderer = async (app, cache) => {
    const template = fs__default$1["default"].readFileSync(path__default["default"].resolve(DIST_PATH, 'template.html'), 'utf-8');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { renderApp, renderError } = require(path__default["default"].resolve(PRDO_SERVER_PATH, 'ssr.js'));
    app.use('*', async (request, response) => {
        try {
            const redered = await renderApp(request, cache);
            response
                .status(redered.code)
                .set({ 'Content-Type': 'text/html' })
                .end(resolveTemplate({
                template,
                appHTML: redered.html,
                heads: redered.heads,
                scripts: redered.scripts
            }));
        }
        catch (error) {
            const redered = await renderError(request, error);
            response.status(redered.code).end(resolveTemplate({
                template,
                appHTML: redered.html,
                heads: redered.heads,
                scripts: redered.scripts
            }));
        }
    });
};/**
 * @file Error constant
 * @module constant.error
 * @author Surmon <https://github.com/surmon-china>
 */
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const INVALID_ERROR = 500;/**
 * @file BFF Server responsor
 * @module server.responsor
 * @author Surmon <https://github.com/surmon-china>
 */
const erroror = (response, error) => {
    console.warn(`[BFF] error:`, error);
    response.status(INVALID_ERROR);
    response.send(error?.message || String(error));
};
const responsor = (promise) => {
    return (_, response) => {
        promise()
            .then((data) => response.send(data))
            .catch((error) => erroror(response, error));
    };
};/**
 * @file BFF Server cacher
 * @module server.cacher
 * @author Surmon <https://github.com/surmon-china>
 */
// fetch & cache
const fetchAndCache = async (config) => {
    const data = await config.getter();
    await config.cache.set(config.key, data, config.age);
    return data;
};
// timeout prefetch
const setTimeoutPreRefresh = (config, preSeconds, refreshCount = 1) => {
    const timeoutSeconds = config.age - preSeconds;
    console.info('[cacher] setTimeoutPreRefresh', `> ${config.key} + ${refreshCount}`, `> cache expire when after ${config.age}s`, `> pre refresh when after ${timeoutSeconds}s`);
    setTimeout(async () => {
        try {
            await fetchAndCache(config);
            setTimeoutPreRefresh(config, preSeconds, refreshCount + 1);
        }
        catch (error) {
            console.warn(`[cacher] setTimeoutPreRefresh ERROR!`, `> ${config.key} + ${refreshCount}`, error);
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
        console.warn('[cacher] retry error:', error);
    }
    finally {
        retryingMap.set(config.key, false);
    }
};
const cacher = async (_config) => {
    // key prefix
    const config = {
        ..._config,
        key: `bff_${_config.key}`
    };
    // cached
    if (await config.cache.has(config.key)) {
        return await config.cache.get(config.key);
    }
    try {
        // 1. fetch & cache
        const data = await fetchAndCache(config);
        // 2. set timeout pre 1 min refresh
        setTimeoutPreRefresh(config, 60);
        // 3. return data
        return data;
    }
    catch (error) {
        // retry only once
        if (config.retryWhen && !retryingMap.get(config.key)) {
            retryingMap.set(config.key, true);
            setTimeout(() => retryFetch({ ...config }), config.retryWhen * 1000);
        }
        if (typeof error === 'string') {
            return Promise.reject(`cacher error > ${error}`);
        }
        const err = error.toJSON?.() || error;
        err.name = `cacher error > ${err.name || ''}`;
        return Promise.reject(err);
    }
};/**
 * @file Proxy constant
 * @module constant.proxy
 * @author Surmon <https://github.com/surmon-china>
 */
var ProxyModule;
(function (ProxyModule) {
    ProxyModule["Default"] = "default";
    ProxyModule["Douban"] = "douban";
    ProxyModule["NetEaseMusic"] = "netease-music";
    ProxyModule["Instagram"] = "instagram";
    ProxyModule["YouTube"] = "youtube";
    ProxyModule["Disqus"] = "disqus";
})(ProxyModule || (ProxyModule = {}));/**
 * @file BFF Server proxy
 * @module server.proxy
 * @author Surmon <https://github.com/surmon-china>
 */
const proxys = [
    {
        module: ProxyModule.Default,
        origin: 'https://surmon.me',
        referer: 'https://surmon.me/'
    },
    {
        module: ProxyModule.Douban,
        origin: 'https://www.douban.com',
        referer: 'https://www.douban.com/'
    },
    {
        module: ProxyModule.Instagram,
        origin: 'https://www.instagram.com',
        referer: 'https://www.instagram.com/'
    },
    {
        module: ProxyModule.YouTube,
        origin: 'https://www.youtube.com',
        referer: 'https://www.youtube.com/'
    },
    {
        module: ProxyModule.NetEaseMusic,
        origin: 'https://music.163.com',
        referer: 'https://music.163.com/'
    },
    {
        module: ProxyModule.Disqus,
        referer: 'https://surmon.disqus.com/'
    }
];
const PROXY_ROUTE_PATH = `${BFF_PROXY_PREFIX}/:module/*`;
const proxyer = () => {
    // https://github.com/http-party/node-http-proxy
    const proxyMap = new Map(proxys.map(({ module, ...rest }) => [module, rest]));
    const proxy = httpProxy.createProxyServer({
        prependPath: true,
        ignorePath: true,
        toProxy: false,
        xfwd: true
    });
    // https://github.com/http-party/node-http-proxy/issues/813
    proxy.on('error', (error, _, response, target) => {
        console.warn(`[BFF] proxy error: ${error.message} > ${target?.href}`);
        if (!response.headersSent) {
            response.writeHead(500, { 'content-type': 'application/json' });
        }
        response.end(JSON.stringify({ error: 'proxy_error', reason: error.message }));
    });
    proxy.on('proxyReq', (proxyRequest) => {
        proxyRequest.setHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/');
    });
    proxy.on('proxyRes', (proxyResponse, request) => {
        const statusCode = proxyResponse.statusCode;
        const location = proxyResponse.headers.location;
        if ([301, 302, 307, 308].includes(statusCode) && location) {
            proxyResponse.headers.location = `${BFF_PROXY_PREFIX}/${request.params.module}/${encodeURIComponent(location)}`;
        }
        // proxy cache
        if (statusCode === 200) {
            proxyResponse.headers['cache-control'] = `max-age=315360000`;
        }
    });
    return (request, response) => {
        if (isProd) {
            const referer = request.headers.referrer || request.headers.referer;
            const origin = request.headers.origin;
            const isAllowedReferer = !referer || BFF_PROXY_ALLOWLIST.some((i) => referer.startsWith(i));
            const isAllowedOrigin = !origin || BFF_PROXY_ALLOWLIST.some((i) => origin.startsWith(i));
            if (!isAllowedReferer || !isAllowedOrigin) {
                response.status(FORBIDDEN).send();
                return;
            }
        }
        const config = proxyMap.get(request.params.module);
        const targetURL = decodeURIComponent(request.params['0']);
        let parsedURL = null;
        try {
            parsedURL = new URL(targetURL);
        }
        catch (error) {
            response.status(BAD_REQUEST).send();
            return;
        }
        const headers = {};
        if (config?.origin) {
            headers['Origin'] = config.origin;
        }
        if (config?.referer) {
            headers['Referer'] = config.referer;
        }
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
};/**
 * @file Universal Server cache
 * @module server.cache
 * @author Surmon <https://github.com/surmon-china>
 */
const getLRUClient = () => {
    // https://github.com/isaacs/node-lru-cache
    const lruCache = new LRU__default["default"]({
        max: 500,
        ttl: 0 // MARK: default 0 "no TTL" never expire
    });
    return {
        set: async (key, value, maxAge) => {
            if (maxAge) {
                lruCache.set(key, value, { ttl: maxAge * 1000 });
            }
            else {
                lruCache.set(key, value);
            }
        },
        get: async (key) => lruCache.get(key),
        has: async (key) => lruCache.has(key),
        delete: async (key) => lruCache.delete(key),
        clear: async () => lruCache.clear()
    };
};
const getRedisClient = async () => {
    // https://github.com/redis/node-redis
    const client = redis.createClient({
        socket: {
            // Only once connect! Redis error > reject
            reconnectStrategy: () => new Error(`can't connect to Redis!`)
        }
    });
    client.on('connect', () => console.info('[redis]', 'connecting...'));
    client.on('reconnecting', () => console.info('[redis]', 'reconnecting...'));
    client.on('ready', () => console.info('[redis]', 'readied!'));
    client.on('error', (error) => console.warn('[redis]', 'Client Error!', error.message || error));
    await client.connect();
    const getCacheKey = (key) => {
        const cacheKeyPrefix = META.domain.replace(/\./gi, '_');
        return `__${cacheKeyPrefix}_${key}`;
    };
    const set = async (key, value, maxAge) => {
        const _value = value ? JSON.stringify(value) : '';
        if (maxAge) {
            // https://redis.io/commands/setex
            await client.setEx(getCacheKey(key), maxAge, _value);
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
    return {
        set,
        get,
        has,
        delete: del,
        clear
    };
};
const initCacheClient = async () => {
    let cacheClient = null;
    try {
        cacheClient = await getRedisClient();
        console.info('[cache]', 'Redis store readied!');
    }
    catch (error) {
        cacheClient = getLRUClient();
        console.info('[cache]', 'LRU store readied!');
    }
    await cacheClient.clear();
    return cacheClient;
};/**
 * @file BFF Server main
 * @module server.index
 * @author Surmon <https://github.com/surmon-china>
 */
const createExpressApp = async () => {
    // init cache client
    const cache = await initCacheClient();
    // init app
    const app = express__default["default"]();
    const server = http__default["default"].createServer(app);
    // app proxy
    app.use(PROXY_ROUTE_PATH, proxyer());
    // app middlewares
    app.use(express__default["default"].json());
    app.use(cookieParser__default["default"]());
    app.use(compression__default["default"]());
    return {
        app,
        server,
        cache
    };
};/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */
// @ts-expect-error
process.noDeprecation = true;
// app
createExpressApp().then(({ app, server, cache }) => {
    // static
    app.use(express__default["default"].static(PUBLIC_PATH));
    // init thirds task
    initTwitterCalendar();
    initInstagramCalendar();
    // sitemap
    app.get('/sitemap.xml', async (_, response) => {
        try {
            const data = await cacher({
                cache,
                key: 'sitemap',
                age: 60 * 60 * 1,
                getter: getSitemapXML
            });
            response.header('Content-Type', 'application/xml');
            response.send(data);
        }
        catch (error) {
            erroror(response, error);
        }
    });
    // RSS
    app.get('/rss.xml', async (_, response) => {
        try {
            const data = await cacher({
                cache,
                key: 'rss',
                age: 60 * 60 * 1,
                getter: getRSSXML
            });
            response.header('Content-Type', 'application/xml');
            response.send(data);
        }
        catch (error) {
            erroror(response, error);
        }
    });
    // gtag
    app.get('/effects/gtag', async (_, response) => {
        try {
            const data = await cacher({
                cache,
                key: 'gtag',
                age: 60 * 60 * 24,
                retryWhen: 60 * 60 * 1,
                getter: getGTagScript
            });
            response.header('Content-Type', 'text/javascript');
            response.send(data);
        }
        catch (error) {
            erroror(response, error);
        }
    });
    // WebFont
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.WebFont}`, async (request, response) => {
        const fontname = decodeURIComponent(String(request.query.fontname)).trim();
        const text = decodeURIComponent(String(request.query.text)).trim();
        if (!text || !fontname) {
            return erroror(response, 'Invalid params');
        }
        try {
            const data = await getWebFont({ fontname, text });
            // never expired
            response.header('Cache-Control', 'public, max-age=31536000');
            response.header('Content-Type', WebFontContentType);
            response.send(data);
        }
        catch (error) {
            erroror(response, error);
        }
    });
    // Bing wallpapers
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.BingWallpaper}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.BingWallpaper,
            age: 60 * 60 * 6,
            retryWhen: 60 * 30,
            getter: getAllWallpapers
        });
    }));
    // My GoogleMap
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.MyGoogleMap}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.MyGoogleMap,
            age: 60 * 60 * 6,
            retryWhen: 60 * 30,
            getter: getMyGoogleMap
        });
    }));
    // GitHub sponsors
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubSponsors}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.GitHubSponsors,
            age: 60 * 60 * 18,
            retryWhen: 60 * 10,
            getter: getGitHubSponsors
        });
    }));
    // GitHub contributions
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubContributions}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.GitHubContributions,
            age: 60 * 60 * 12,
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
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSourceGitHubStatistic}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.OpenSourceGitHubStatistic,
            age: 60 * 60 * 8,
            retryWhen: 60 * 10,
            getter: getGitHubStatistic
        });
    }));
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSourceNPMStatistic}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.OpenSourceNPMStatistic,
            age: 60 * 60 * 8,
            retryWhen: 60 * 10,
            getter: getNPMStatistic
        });
    }));
    // 163 music BGM list
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.NetEaseMusic}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.NetEaseMusic,
            age: 60 * 60 * 12,
            retryWhen: 60 * 10,
            getter: getSongList
        });
    }));
    // Douban movies
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.DoubanMovies}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.DoubanMovies,
            age: 60 * 60 * 32,
            retryWhen: 60 * 10,
            getter: getDoubanMovies
        });
    }));
    // Twitter userinfo
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterUserInfo}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.TwitterUserInfo,
            age: 60 * 60 * 12,
            retryWhen: 60 * 10,
            getter: getTwitterUserinfo
        });
    }));
    // Twitter newest tweets
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterTweets}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.TwitterTweets,
            age: 60 * 60 * 1,
            retryWhen: 60 * 10,
            getter: getTwitterTweets
        });
    }));
    // Twitter tweets calendar
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterCalendar}`, responsor(() => getTwitterCalendar()));
    // Instagram newest medias
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramMedias}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.InstagramMedias,
            age: 60 * 60 * 2,
            retryWhen: 60 * 10,
            getter: getInstagramMedias
        });
    }));
    // Instagram calendar
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.InstagramCalendar}`, responsor(() => getInstagramCalendar()));
    // YouTube platlists
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubePlaylist}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.YouTubePlaylist,
            age: 60 * 60 * 24,
            retryWhen: 60 * 10,
            getter: getYouTubeChannelPlayLists
        });
    }));
    // YouTube videos
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.YouTubeVideoList}`, (request, response, next) => {
        const playlistID = request.query.id;
        if (!playlistID || typeof playlistID !== 'string') {
            return erroror(response, 'Invalid params');
        }
        responsor(() => {
            return cacher({
                cache,
                key: `youtube_playlist_${playlistID}`,
                age: 60 * 60 * 1,
                retryWhen: 60 * 10,
                getter: () => getYouTubeVideoListByPlayerlistID(playlistID)
            });
        })(request, response, next);
    });
    // OpenSea assets
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSeaAssets}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.OpenSeaAssets,
            age: 60 * 60 * 1,
            retryWhen: 60 * 10,
            getter: getOpenSeaAssets
        });
    }));
    // OpenSea collections
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.OpenSeaCollections}`, responsor(() => {
        return cacher({
            cache,
            key: TunnelModule.OpenSeaCollections,
            age: 60 * 60 * 0.5,
            retryWhen: 60 * 5,
            getter: getOpenSeaCollections
        });
    }));
    // vue renderer
    isDev ? enableDevRenderer(app, cache) : enableProdRenderer(app, cache);
    // run
    server.listen(getBFFServerPort(), () => {
        const infos = [
            `in ${NODE_ENV}`,
            `at ${new Date().toLocaleString()}`,
            `listening on ${JSON.stringify(server.address())}`
        ];
        console.info('[surmon.me]', `Run! ${infos.join(', ')}.`);
    });
});//# sourceMappingURL=bff.cjs.js.map
