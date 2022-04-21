/*!
* Surmon.me v3.9.4
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon <https://surmon.me>
*/
'use strict';var express=require('express'),RSS=require('rss'),axios=require('axios'),path=require('path'),stream=require('stream'),sitemap=require('sitemap'),WonderfulBingWallpaper=require('wonderful-bing-wallpaper'),yargs=require('yargs'),fs=require('fs'),vite=require('vite'),http=require('http'),compression=require('compression'),cookieParser=require('cookie-parser'),httpProxy=require('http-proxy'),LRU=require('lru-cache'),redis=require('redis');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var express__default=/*#__PURE__*/_interopDefaultLegacy(express);var RSS__default=/*#__PURE__*/_interopDefaultLegacy(RSS);var axios__default=/*#__PURE__*/_interopDefaultLegacy(axios);var path__default=/*#__PURE__*/_interopDefaultLegacy(path);var WonderfulBingWallpaper__default=/*#__PURE__*/_interopDefaultLegacy(WonderfulBingWallpaper);var fs__default=/*#__PURE__*/_interopDefaultLegacy(fs);var http__default=/*#__PURE__*/_interopDefaultLegacy(http);var compression__default=/*#__PURE__*/_interopDefaultLegacy(compression);var cookieParser__default=/*#__PURE__*/_interopDefaultLegacy(cookieParser);var LRU__default=/*#__PURE__*/_interopDefaultLegacy(LRU);/**
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
const GA_MEASUREMENT_ID = 'UA-84887611-3';
const META = Object.freeze({
    title: 'Surmon.me',
    zh_sub_title: '来苏之望',
    en_sub_title: 'Because the mountain is there',
    url: 'https://surmon.me',
    domain: 'surmon.me',
    author: 'Surmon'
});
const THIRD_IDS = Object.freeze({
    YOUTUBE_CHANNEL_ID: `UCoL-j6T28PLSJ2U6ZdONS0w`,
    MUSIC_163_BGM_ALBUM_ID: '638949385',
    GITHUB_USER_ID: 'surmon-china',
    TWITTER_USER_ID: 'surmon7788',
    INSTAGRAM_USERNAME: 'surmon666',
    INSTAGRAM_FB_ID: '17841405600281893'
});
Object.freeze({
    PAYPAL: 'https://paypal.me/surmon',
    GITHUB_SPONSORS: 'https://github.com/sponsors/surmon-china',
    BTC_ADDRESS: 'bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze',
    ETH_ADDRESS: '0xaD556974D449126efdeF23f4FF581861C301cB77'
});
Object.freeze({
    RSS: '/rss.xml',
    SITE_MAP: '/sitemap.xml',
    GITHUB_SURMON_ME: 'https://github.com/surmon-china/surmon.me',
    GITHUB_NODEPRESS: 'https://github.com/surmon-china/nodepress',
    GITHUB_SURMON_ME_NATIVE: 'https://github.com/surmon-china/surmon.me.native',
    GITHUB_BLOG_STAR_LIST: 'https://github.com/stars/surmon-china/lists/surmon-me',
    APP_APK_FILE: 'https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/android/surmon.me.apk',
    GITHUB: 'https://github.com/surmon-china',
    UPWORK: 'https://www.upwork.com/freelancers/~0142e621258ac1770d',
    MARKDOWN: 'https://daringfireball.net/projects/markdown/',
    GOOGLE_ROAD_MAP: 'https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3',
    DISCORD_GROUP: 'https://discord.gg/cXdGT7Gx86',
    TELEGRAM_GROUP: 'https://t.me/joinchat/F6wOlxYwSCUpZTYj3WTAWA',
    SPOTIFY: 'https://open.spotify.com/user/v0kz9hpwpbqnmtnrfhbyl812o',
    MUSIC_163: `https://music.163.com/#/playlist?id=${THIRD_IDS.MUSIC_163_BGM_ALBUM_ID}`,
    YOUTUBE_CHANNEL: `https://www.youtube.com/channel/${THIRD_IDS.YOUTUBE_CHANNEL_ID}`,
    TELEGRAM: 'https://t.me/surmon',
    DOUBAN: 'https://www.douban.com/people/nocower',
    ZHIHU: 'https://www.zhihu.com/people/surmon',
    QUORA: 'https://www.quora.com/profile/Surmon',
    LINKEDIN: 'https://www.linkedin.com/in/surmon',
    INSTAGRAM: `https://www.instagram.com/${THIRD_IDS.INSTAGRAM_USERNAME}`,
    TWITTER: `https://twitter.com/${THIRD_IDS.TWITTER_USER_ID}`
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
            url: getPageURL('merch'),
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
    return sitemap.streamToPromise(stream.Readable.from(sitemapItemList).pipe(sitemapStream)).then((data) => data.toString());
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
    const response = await axios__default["default"].get(getGAScriptURL(GA_MEASUREMENT_ID), { timeout: 6000 });
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
 * @file BFF GitHub getter
 * @module server.getter.github
 * @author Surmon <https://github.com/surmon-china>
 */
// https://github.com/settings/tokens
const bearerToken$1 = yargs.argv.github_token;
const graphqlGitHub = (query) => {
    return axios__default["default"]
        .request({
        headers: { Authorization: `bearer ${bearerToken$1}` },
        url: `https://api.github.com/graphql`,
        method: 'POST',
        data: JSON.stringify({
            query: `query {
        user(login: "${THIRD_IDS.GITHUB_USER_ID}") {
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
const getGitHubSponsors = async () => {
    const result = await graphqlGitHub(`
    sponsors(first: 100) {
      totalCount
      edges {
        node {
          ... on User {
            login
            name
            company
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
        }
      }
    }
  `);
    return result.sponsors;
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
const bearerToken = yargs.argv.twitter_bearer_token;
// 2. Get userinfo
// https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by-username-username
const getTwitterUserinfoByUsername = async (username) => {
    const response = await axios__default["default"].get(`https://api.twitter.com/2/users/by/username/${username}`, {
        timeout: 8000,
        params: {
            'user.fields': `location,url,description,profile_image_url,public_metrics`
        },
        headers: {
            Authorization: `Bearer ${bearerToken}`
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
            Authorization: `Bearer ${bearerToken}`
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
    return getTwitterUserinfoByUsername(THIRD_IDS.TWITTER_USER_ID);
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
            Authorization: `Bearer ${bearerToken}`
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
        tweets.push(...result.data);
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
// 1. Generate long-lived access tokens for Instagram Testers (60 days)
// https://developers.facebook.com/apps/625907498725071/instagram-basic-display/basic-display/
// 2. Get medias useing API
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields
// 3. TODO: Refresh token
// https://developers.facebook.com/docs/instagram-basic-display-api/reference/refresh_access_token
const token$1 = yargs.argv.instagram_token;
const getInstagramMedias = async () => {
    const fields = `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp`;
    const response = await axios__default["default"].get(`https://graph.instagram.com/me/media?fields=${fields}&access_token=${token$1}`, { timeout: 8000 });
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
        .get(`https://graph.instagram.com/v13.0/${THIRD_IDS.INSTAGRAM_FB_ID}/media`, {
        timeout: 8000,
        params: {
            access_token: token$1,
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
const token = yargs.argv.youtube_token;
// 2. Get playlist by Channel ID
// https://developers.google.com/youtube/v3/docs/playlists/list
const getYouTubeChannelPlayLists = async () => {
    const response = await axios__default["default"].get(`https://www.googleapis.com/youtube/v3/playlists`, {
        timeout: 8000,
        params: {
            part: 'snippet,contentDetails',
            maxResults: 50,
            channelId: THIRD_IDS.YOUTUBE_CHANNEL_ID,
            key: token
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
            key: token
        }
    });
    if (response.status === 200 && response.data.items) {
        return response.data.items;
    }
    else {
        throw response.data;
    }
};/**
 * @file BFF music getter
 * @module server.getter.music
 * @author Surmon <https://github.com/surmon-china>
 */
const PLAY_LIST_LIMIT = 168;
const getSongList = async () => {
    // https://github.com/Binaryify/NeteaseCloudMusicApi/blob/a0500ec648f22a1dd20fc7b529126f813aa26935/module/playlist_track_all.js
    const playlistDetail = await axios__default["default"].get(`https://music.163.com/api/v6/playlist/detail?id=${THIRD_IDS.MUSIC_163_BGM_ALBUM_ID}`, { timeout: 6000 });
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
};const resolveTemplate = (config) => {
    const { template, appHTML, metas, scripts } = config;
    const bodyScripts = [
        scripts
        // MARK: https://cn.vitejs.dev/config/#build-ssrmanifest
        // client output less assets (3 js + 1 css) & built-in HTML
        // manifest
    ].join('\n');
    const html = template
        // MARK: replace! $ sign & use function replacer
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
        .replace(/<title>[\s\S]*<\/title>/, '')
        .replace(`<html`, () => `<html ${metas.htmlAttrs} `)
        .replace(`<head>`, () => `<head>\n${metas.headTags}`)
        .replace(`<!--app-html-->`, () => appHTML)
        .replace(`<body>`, () => `<body ${metas.bodyAttrs}>`)
        .replace(`</body>`, () => `\n${bodyScripts}\n</body>`);
    return html;
};const enableDevRenderer = async (app, cache) => {
    const viteServer = await vite.createServer({
        root: process.cwd(),
        logLevel: 'info',
        server: {
            middlewareMode: 'ssr',
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
        let template = fs__default["default"].readFileSync(path__default["default"].resolve(ROOT_PATH, 'index.html'), 'utf-8');
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
                metas: redered.metas,
                scripts: redered.scripts
            }));
        }
        catch (error) {
            viteServer.ssrFixStacktrace(error);
            const redered = await renderError(request, error);
            response.status(redered.code).end(resolveTemplate({
                template,
                appHTML: redered.html,
                metas: redered.metas,
                scripts: redered.scripts
            }));
        }
    });
};const enableProdRenderer = async (app, cache) => {
    const template = fs__default["default"].readFileSync(path__default["default"].resolve(DIST_PATH, 'template.html'), 'utf-8');
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
                metas: redered.metas,
                scripts: redered.scripts
            }));
        }
        catch (error) {
            const redered = await renderError(request, error);
            response.status(redered.code).end(resolveTemplate({
                template,
                appHTML: redered.html,
                metas: redered.metas,
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
    ProxyModule["Instagram"] = "instagram";
    ProxyModule["YouTube"] = "youtube";
    ProxyModule["NetEasyMusic"] = "163";
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
        module: ProxyModule.NetEasyMusic,
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
    // Bing wallpapers
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.BingWallpaper}`, responsor(() => {
        return cacher({
            cache,
            key: 'wallpaper',
            age: 60 * 60 * 6,
            retryWhen: 60 * 30,
            getter: getAllWallpapers
        });
    }));
    // GitHub sponsors
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubSponsors}`, responsor(() => {
        return cacher({
            cache,
            key: 'github_sponsors',
            age: 60 * 60 * 18,
            retryWhen: 60 * 10,
            getter: getGitHubSponsors
        });
    }));
    // GitHub contributions
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.GitHubContributions}`, responsor(() => {
        return cacher({
            cache,
            key: 'github_contributions',
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
    // 163 music BGM list
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.NetEaseMusic}`, responsor(() => {
        return cacher({
            cache,
            key: 'netease_music',
            age: 60 * 60 * 12,
            retryWhen: 60 * 10,
            getter: getSongList
        });
    }));
    // Twitter userinfo
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterUserInfo}`, responsor(() => {
        return cacher({
            cache,
            key: 'twitter_userinfo',
            age: 60 * 60 * 12,
            retryWhen: 60 * 10,
            getter: getTwitterUserinfo
        });
    }));
    // Twitter newest tweets
    app.get(`${BFF_TUNNEL_PREFIX}/${TunnelModule.TwitterTweets}`, responsor(() => {
        return cacher({
            cache,
            key: 'twitter_tweets',
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
            key: 'instagram',
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
            key: 'youtube_playlist',
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
