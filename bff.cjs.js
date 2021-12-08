/*!
* Surmon.me v3.2.0
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon <https://surmon.me>
*/
'use strict';var http=require('http'),express=require('express'),cookieParser=require('cookie-parser'),fs=require('fs'),path=require('path'),axios=require('axios'),LRU=require('lru-cache'),vite=require('vite'),stream=require('stream'),sitemap=require('sitemap'),RSS=require('rss'),schedule=require('node-schedule'),WonderfulBingWallpaper=require('wonderful-bing-wallpaper'),NeteaseMusic=require('simple-netease-cloud-music'),compression=require('compression');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var http__default=/*#__PURE__*/_interopDefaultLegacy(http);var express__default=/*#__PURE__*/_interopDefaultLegacy(express);var cookieParser__default=/*#__PURE__*/_interopDefaultLegacy(cookieParser);var fs__default=/*#__PURE__*/_interopDefaultLegacy(fs);var path__default=/*#__PURE__*/_interopDefaultLegacy(path);var axios__default=/*#__PURE__*/_interopDefaultLegacy(axios);var LRU__default=/*#__PURE__*/_interopDefaultLegacy(LRU);var RSS__default=/*#__PURE__*/_interopDefaultLegacy(RSS);var schedule__default=/*#__PURE__*/_interopDefaultLegacy(schedule);var WonderfulBingWallpaper__default=/*#__PURE__*/_interopDefaultLegacy(WonderfulBingWallpaper);var NeteaseMusic__default=/*#__PURE__*/_interopDefaultLegacy(NeteaseMusic);var compression__default=/*#__PURE__*/_interopDefaultLegacy(compression);/**
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
"production" === NodeEnv.Production;
"production" === NodeEnv.Test;/**
 * @file App config
 * @module config.app
 * @author Surmon <https://github.com/surmon-china>
 */
const MUSIC_ALBUM_ID = '638949385';
const BILIBILI_UID = '27940710';
const GITHUB_UID = 'surmon-china';
const GA_MEASUREMENT_ID = 'UA-84887611-3';
const META = Object.freeze({
    title: 'Surmon.me',
    keywords: 'Surmon 博客,surmon-china,苏尔蒙,Vue 博客,前端技术开发博客,JavaScript 技术',
    description: '来苏之望',
    domain: 'surmon.me',
    url: 'https://surmon.me',
    author: 'Surmon',
    email: 'i@surmon.me'
});
Object.freeze({
    JimmyLv: '//blog.jimmylv.info'
    // SkyRover: '//skyrover.me',
    // Jooger: '//jooger.me'
});
Object.freeze({
    RSS: '/rss.xml',
    SITE_MAP: '/sitemap.xml',
    SPONSOR: '/sponsor',
    VUE: 'https://v3.vuejs.org/',
    VUNIVERSAL: 'https://github.com/surmon-china/vuniversal',
    NODEPRESS: 'https://github.com/surmon-china/nodepress',
    APP_APK_FILE: 'https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/android/surmon.me.apk',
    SURMON_APP_REPOSITORIE: 'https://github.com/surmon-china/surmon.me.native',
    THROW_ERROR: 'https://throwerror.io',
    FOX_FINDER: 'https://foxfinder.io',
    GITHUB: 'https://github.com/surmon-china',
    GITHUB_SPONSORS: 'https://github.com/sponsors/surmon-china',
    PAYPAL: 'https://www.paypal.me/surmon',
    UPWORK: 'https://www.upwork.com/freelancers/~0142e621258ac1770d',
    FUCK_IPC: 'http://www.beian.miit.gov.cn',
    GOOGLE_LIVE_MAP: 'https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w',
    QQ_GROUP: 'https://shang.qq.com/wpa/qunwpa?idkey=837dc31ccbcd49feeba19430562be7bdc06f4428880f78a391fd61c8af714ce4',
    TELEGRAM: 'https://t.me/surmon',
    TELEGRAM_GROUP: 'https://t.me/joinchat/F6wOlxYwSCUpZTYj3WTAWA',
    SPOTIFY: 'https://open.spotify.com/user/v0kz9hpwpbqnmtnrfhbyl812o',
    MUSIC_163: 'https://music.163.com/#/playlist?id=638949385',
    YOUTUBE: 'https://www.youtube.com/channel/UCoL-j6T28PLSJ2U6ZdONS0w',
    DOUBAN: 'https://www.douban.com/people/nocower',
    ZHIHU: 'https://www.zhihu.com/people/surmon',
    WEIBO: 'https://weibo.com/surmon',
    QUORA: 'https://www.quora.com/profile/Surmon',
    BILIBILI: 'https://space.bilibili.com/27940710',
    STACK_OVERFLOW: 'https://stackoverflow.com/users/6222535/surmon?tab=profile',
    LEETCODE_CN: 'https://leetcode-cn.com/u/surmon',
    LINKEDIN: 'https://www.linkedin.com/in/surmon',
    INSTAGRAM: 'https://www.instagram.com/surmon666',
    TWITTER: 'https://twitter.com/surmon_me'
});/**
 * @file Outside
 * @module service.outside
 * @author Surmon <https://github.com/surmon-china>
 */
const getGAScriptUrl = (gaMeasurementID) => {
    return `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementID}`;
};/**
 * @file BFF Server helper
 * @module server.helper
 * @author Surmon <https://github.com/surmon-china>
 */
const ROOT_PATH = process.cwd();
const PRDO_CLIENT_PATH = path__default["default"].join(ROOT_PATH, 'dist', 'client');
const PRDO_SERVER_PATH = path__default["default"].join(ROOT_PATH, 'dist', 'server');
const PUBLIC_PATH = isDev ? path__default["default"].join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH;
const EFFECTS_PATH = path__default["default"].join(PUBLIC_PATH, 'effects');
const packageJSON = JSON.parse(fs__default["default"].readFileSync(path__default["default"].resolve(ROOT_PATH, 'package.json'), 'utf-8'));/**
 * @file BFF GA updater
 * @module server.gtag
 * @author Surmon <https://github.com/surmon-china>
 */
const UPDATE_TIME$2 = {
    HOURS_1: 1000 * 60 * 60 * 1,
    HOURS_24: 1000 * 60 * 60 * 24
};
const startGTagScriptUpdater = () => {
    (function doUpdate() {
        axios__default["default"]
            .get(getGAScriptUrl(GA_MEASUREMENT_ID), { timeout: 6000 })
            .then((response) => {
            if (response.status === 200) {
                fs__default["default"].writeFileSync(path__default["default"].resolve(EFFECTS_PATH, 'gtag.js'), response.data);
                console.info('[GA Script]', '更新成功', new Date());
                setTimeout(doUpdate, UPDATE_TIME$2.HOURS_24);
            }
            else {
                console.warn('[GA Script]', '更新失败', new Date(), response.data);
                setTimeout(doUpdate, UPDATE_TIME$2.HOURS_1);
            }
        })
            .catch((error) => {
            console.warn('[GA Script]', '更新网络连接失败', new Date(), error.message, error?.toJSON?.());
            setTimeout(doUpdate, UPDATE_TIME$2.HOURS_1);
        });
    })();
};/**
 * @file BFF ghchart updater
 * @module server.ghchart
 * @author Surmon <https://github.com/surmon-china>
 * @repo https://github.com/sallar/github-contributions-chart
 */
const UPDATE_TIME$1 = {
    HOURS_05: 1000 * 60 * 30,
    HOURS_6: 1000 * 60 * 60 * 6
};
const startGitHubChartUpdater = () => {
    (function doUpdate() {
        axios__default["default"]
            .get(`https://ghchart.rshah.org/${GITHUB_UID}`, { timeout: 8000 })
            .then((response) => {
            if (response.status === 200) {
                fs__default["default"].writeFileSync(path__default["default"].resolve(EFFECTS_PATH, 'ghchart.svg'), response.data);
                console.info('[GitHub Chart]', '更新成功', new Date());
                setTimeout(doUpdate, UPDATE_TIME$1.HOURS_6);
            }
            else {
                console.warn('[GitHub Chart]', '更新失败', new Date(), response.data);
                setTimeout(doUpdate, UPDATE_TIME$1.HOURS_05);
            }
        })
            .catch((error) => {
            console.warn('[GitHub Chart]', '更新网络连接失败', new Date(), error?.toJSON?.());
            setTimeout(doUpdate, UPDATE_TIME$1.HOURS_05);
        });
    })();
};/**
 * @file Archive sitemap generator
 * @module server.archive.sitemap
 * @author Surmon <https://github.com/surmon-china>
 */
const getSitemapXML = (archive) => {
    const sitemapStream = new sitemap.SitemapStream({
        hostname: META.url
    });
    const sitemapItemList = [
        { url: META.url, changefreq: sitemap.EnumChangefreq.ALWAYS, priority: 1 },
        {
            url: getPageUrl('about'),
            changefreq: sitemap.EnumChangefreq.YEARLY,
            priority: 1
        },
        {
            url: getPageUrl('merch'),
            changefreq: sitemap.EnumChangefreq.YEARLY,
            priority: 1
        },
        {
            url: getPageUrl('archive'),
            changefreq: sitemap.EnumChangefreq.ALWAYS,
            priority: 1
        },
        {
            url: getPageUrl('guestbook'),
            changefreq: sitemap.EnumChangefreq.ALWAYS,
            priority: 1
        }
    ];
    archive.categories.forEach((category) => {
        sitemapItemList.push({
            priority: 0.6,
            changefreq: sitemap.EnumChangefreq.DAILY,
            url: getCategoryUrl(category.slug)
        });
    });
    archive.tags.forEach((tag) => {
        sitemapItemList.push({
            priority: 0.6,
            changefreq: sitemap.EnumChangefreq.DAILY,
            url: getTagUrl(tag.slug)
        });
    });
    archive.articles.forEach((article) => {
        sitemapItemList.push({
            priority: 0.8,
            changefreq: sitemap.EnumChangefreq.DAILY,
            url: getArticleUrl(article.id),
            lastmodISO: new Date(article.update_at).toISOString()
        });
    });
    return sitemap.streamToPromise(stream.Readable.from(sitemapItemList).pipe(sitemapStream));
};/**
 * @file Archive RSS generator
 * @module server.archive.rss
 * @author Surmon <https://github.com/surmon-china>
 */
const getRSSXML = (archive) => {
    const feed = new RSS__default["default"]({
        title: META.title,
        description: META.description,
        site_url: META.url,
        feed_url: `${META.url}/rss.xml`,
        image_url: `${META.url}/icon.png`,
        managingEditor: META.author,
        webMaster: META.author,
        generator: `${packageJSON.name} ${packageJSON.version}`,
        categories: archive.categories.map((category) => category.slug),
        copyright: `${new Date().getFullYear()} ${META.title}`,
        language: 'zh',
        ttl: 60
    });
    archive.articles.forEach((article) => feed.item({
        title: article.title,
        description: article.description,
        url: getArticleUrl(article.id),
        guid: getArticleUrl(article.id),
        categories: article.category.map((category) => category.slug),
        author: META.author,
        date: article.create_at,
        enclosure: {
            url: article.thumb
        }
    }));
    return feed.xml({ indent: true });
};/**
 * @file BFF archive cacher
 * @module server.archive
 * @author Surmon <https://github.com/surmon-china>
 */
const getPageUrl = (page) => `${META.url}/${page}`;
const getTagUrl = (tag) => `${META.url}/tag/${tag}`;
const getCategoryUrl = (category) => `${META.url}/category/${category}`;
const getArticleUrl = (id) => `${META.url}/article/${id}`;
const appProdENV = vite.loadEnv('production', ROOT_PATH);
const archiveURL = `${appProdENV.VITE_API_ONLINE_URL}/archive`;
const UPDATE_TIME = {
    HOURS_05: 1000 * 60 * 30,
    HOURS_1: 1000 * 60 * 60
};
var ArchiveCacheKey;
(function (ArchiveCacheKey) {
    ArchiveCacheKey["Data"] = "data";
    ArchiveCacheKey["Sitemap"] = "sitemap";
    ArchiveCacheKey["RSS"] = "rss";
})(ArchiveCacheKey || (ArchiveCacheKey = {}));
const archiveCache = new LRU__default["default"]({
    max: Infinity,
    maxAge: 1000 * 60 * 60 * 2 // 2 hour cache
});
const handleSitemapRequest = (_, response) => {
    response.header('Content-Type', 'application/xml');
    response.send(archiveCache.get(ArchiveCacheKey.Sitemap));
};
const handleRSSRequest = (_, response) => {
    response.header('Content-Type', 'application/xml');
    response.send(archiveCache.get(ArchiveCacheKey.RSS));
};
const fecthArchiveData = async () => {
    const response = await axios__default["default"].get(archiveURL, { timeout: 6000 });
    if (response.status === 200) {
        return response.data.result;
    }
    else {
        throw new Error(response.statusText);
    }
};
const startArchiveUpdater = () => {
    (function doUpdate() {
        fecthArchiveData()
            .then(async (archive) => {
            const sitemap = await getSitemapXML(archive);
            archiveCache.set(ArchiveCacheKey.Data, archive);
            archiveCache.set(ArchiveCacheKey.RSS, getRSSXML(archive));
            archiveCache.set(ArchiveCacheKey.Sitemap, sitemap.toString());
            setTimeout(doUpdate, UPDATE_TIME.HOURS_1);
        })
            .catch((error) => {
            console.warn('[archive]', '更新失败', new Date(), error);
            setTimeout(doUpdate, UPDATE_TIME.HOURS_05);
        });
    })();
};/**
 * @file Error constant
 * @module constant.error
 * @author Surmon <https://github.com/surmon-china>
 */
const INVALID_ERROR = 500;/**
 * @file Tunnel constant
 * @module constant.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */
var TunnelModule;
(function (TunnelModule) {
    TunnelModule["BiliBili"] = "bilibili";
    TunnelModule["Wallpaper"] = "wallpaper";
    TunnelModule["GitHub"] = "gitHub";
    TunnelModule["Music"] = "music";
})(TunnelModule || (TunnelModule = {}));
const getTunnelApiPath = (moduleName) => {
    return `/${moduleName}`;
};/**
 * @file BFF Server bilibili
 * @module server.tunnel.bilibili
 * @author Surmon <https://github.com/surmon-china>
 */
const PAGE_SIZE = 45;
const PAGE = 1;
const getVideoList = async () => {
    const videosResult = await axios__default["default"].request({
        headers: { 'User-Agent': META.title },
        url: `https://api.bilibili.com/x/space/arc/search?mid=${BILIBILI_UID}&ps=${PAGE_SIZE}&tid=0&pn=${PAGE}&order=pubdate&jsonp=jsonp`
    });
    if (videosResult.data.code === 0) {
        return videosResult.data.data.list.vlist;
    }
    else {
        throw new Error(String(videosResult.status + videosResult.statusText));
    }
};
const autoUpdateData$3 = () => {
    getVideoList()
        .then((data) => {
        tunnelCache.set(TunnelModule.BiliBili, data);
        // 成功后 1 小时更新一次数据
        setTimeout(autoUpdateData$3, 1000 * 60 * 60 * 1);
    })
        .catch((error) => {
        // 失败后 5 分钟更新一次数据
        console.warn('[Tunnel BiliBili]', '请求失败', error);
        setTimeout(autoUpdateData$3, 1000 * 60 * 5);
    });
};
autoUpdateData$3();
const bilibiliService = async () => {
    if (tunnelCache.has(TunnelModule.BiliBili)) {
        return tunnelCache.get(TunnelModule.BiliBili);
    }
    else {
        const data = await getVideoList();
        tunnelCache.set(TunnelModule.BiliBili, data);
        return data;
    }
};/**
 * @file BFF Server wallpaper
 * @module server.tunnel.wallpaper
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
const getZhWallpapers = () => getWallpapers({
    local: 'zh-CN',
    host: 'cn.bing.com',
    ensearch: 0
});
// 今日壁纸缓存（EN）
const getEnWallpapers = () => getWallpapers({
    local: 'en-US',
    host: 'bing.com',
    ensearch: 1
});
const getAllWallpapers = async () => {
    const [zh, en] = await Promise.all([getZhWallpapers(), getEnWallpapers()]);
    return { zh, en };
};
const autoUpdateData$2 = () => {
    getAllWallpapers()
        .then((data) => {
        // 成功后，仅 set cache
        tunnelCache.set(TunnelModule.Wallpaper, data);
    })
        .catch((error) => {
        // 失败后 10 分钟更新一次数据
        console.warn('[Tunnel Wallpaper]', '请求失败', error);
        setTimeout(autoUpdateData$2, 1000 * 60 * 10);
    });
};
// 初始化默认拉取数据
autoUpdateData$2();
// 周期时间定为每天的 0:00:10 重新获取数据
schedule__default["default"].scheduleJob('10 0 0 * * *', autoUpdateData$2);
const wallpaperService = async () => {
    if (tunnelCache.has(TunnelModule.Wallpaper)) {
        return tunnelCache.get(TunnelModule.Wallpaper);
    }
    else {
        const data = await getAllWallpapers();
        tunnelCache.set(TunnelModule.Wallpaper, data);
        return data;
    }
};/**
 * @file BFF Server github
 * @module server.tunnel.github
 * @author Surmon <https://github.com/surmon-china>
 */
const getRepositories = async () => {
    const response = await axios__default["default"].request({
        headers: { 'User-Agent': META.title },
        url: `http://api.github.com/users/${GITHUB_UID}/repos?per_page=1000`
    });
    return response.data.map((rep) => ({
        html_url: rep.html_url,
        name: rep.name || ' ',
        fork: rep.fork,
        forks: rep.forks,
        forks_count: rep.forks_count,
        description: rep.description || ' ',
        open_issues_count: rep.open_issues_count,
        stargazers_count: rep.stargazers_count,
        created_at: rep.created_at,
        language: rep.language
    }));
};
const autoUpdateData$1 = () => {
    getRepositories()
        .then((data) => {
        tunnelCache.set(TunnelModule.GitHub, data);
        // 成功后 2 小时更新一次数据
        setTimeout(autoUpdateData$1, 1000 * 60 * 60 * 2);
    })
        .catch((error) => {
        // 失败后 10 分钟更新一次数据
        console.warn('[Tunnel GitHub]', '请求失败', error);
        setTimeout(autoUpdateData$1, 1000 * 60 * 10);
    });
};
autoUpdateData$1();
const githubService = async () => {
    if (tunnelCache.has(TunnelModule.GitHub)) {
        return tunnelCache.get(TunnelModule.GitHub);
    }
    else {
        const data = await getRepositories();
        tunnelCache.set(TunnelModule.GitHub, data);
        return data;
    }
};/**
 * @file BFF Server music
 * @module server.tunnel.music
 * @author Surmon <https://github.com/surmon-china>
 */
const PLAY_LIST_LIMIT = 68;
const neteseMusic = new NeteaseMusic__default["default"]();
// 获取歌单列表
const getSongList = async () => {
    const result = await neteseMusic._playlist(MUSIC_ALBUM_ID, PLAY_LIST_LIMIT);
    if (result.code < 0) {
        throw new Error(result.message);
    }
    return (result?.playlist?.tracks
        // 过滤掉无版权音乐
        ?.filter((track) => track?.privilege?.cp !== 0)
        // 格式化数据
        ?.map((track) => ({
        id: track.id,
        name: track.name,
        album: track?.al?.name || '-',
        artist: (track.ar || []).map((artist) => artist.name).join(' / '),
        cover_art_url: track.al?.picUrl,
        url: null
    })));
};
const autoUpdateData = () => {
    getSongList()
        .then((data) => {
        tunnelCache.set(TunnelModule.Music, data);
        // 成功后 1 小时获取新数据
        setTimeout(autoUpdateData, 1000 * 60 * 60 * 1);
    })
        .catch((error) => {
        // 失败后 5 分钟更新一次数据
        console.warn('[Tunnel Music]', '请求失败', error);
        setTimeout(autoUpdateData, 1000 * 60 * 5);
    });
};
// 初始化默认拉取数据
autoUpdateData();
const musicService = async () => {
    if (tunnelCache.has(TunnelModule.Music)) {
        return tunnelCache.get(TunnelModule.Music);
    }
    else {
        const data = await getSongList();
        tunnelCache.set(TunnelModule.Music, data);
        return data;
    }
};/**
 * @file BFF Server tunnel
 * @module server.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */
// cache
const tunnelCache = new LRU__default["default"]({
    max: Infinity,
    maxAge: 1000 * 60 * 60 // 1 hour cache
});
// router
const handleTunnelService = (tunnelService) => {
    return (_, response) => {
        tunnelService()
            .then((data) => response.send(data))
            .catch((error) => {
            response.status(INVALID_ERROR);
            response.send(error.message);
        });
    };
};
const tunnelRouter = express__default["default"].Router();
tunnelRouter.get(getTunnelApiPath(TunnelModule.BiliBili), handleTunnelService(bilibiliService));
tunnelRouter.get(getTunnelApiPath(TunnelModule.Wallpaper), handleTunnelService(wallpaperService));
tunnelRouter.get(getTunnelApiPath(TunnelModule.GitHub), handleTunnelService(githubService));
tunnelRouter.get(getTunnelApiPath(TunnelModule.Music), handleTunnelService(musicService));const resolveTemplate = (config) => {
    const { template, appHTML, metas, scripts, manifest } = config;
    const bodyScripts = [
        scripts
        // MARK: https://cn.vitejs.dev/config/#build-ssrmanifest
        // client output less assets (3 js + 1 css) & built-in HTML
        // manifest
    ].join('\n');
    const html = template
        .replace(/<title>[\s\S]*<\/title>/, '')
        .replace(`<html`, `<html ${metas.htmlAttrs} `)
        .replace(`<head>`, `<head>\n${metas.headTags}`)
        .replace(`<!--app-html-->`, appHTML)
        .replace(`<body>`, `<body ${metas.bodyAttrs}>`)
        .replace(`</body>`, `\n${bodyScripts}\n</body>`);
    return html;
};const enableDevRuntime = async (app) => {
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
            const redered = await renderApp(request);
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
};const enableProdRuntime = async (app) => {
    app.use(compression__default["default"]());
    const template = fs__default["default"].readFileSync(path__default["default"].resolve(PRDO_CLIENT_PATH, 'template.html'), 'utf-8');
    app.use('*', async (request, response) => {
        const { renderApp, renderError } = require(path__default["default"].resolve(PRDO_SERVER_PATH, 'ssr.js'));
        try {
            const redered = await renderApp(request);
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
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */
const API_TUNNEL_PREFIX = '/_tunnel';
const BFF_SERVER_PORT = 3000;/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */
// @ts-expect-error
process.noDeprecation = true;
// replace global console
const { log, warn, info } = console;
const color = (c) => (isDev ? c : '');
global.console = Object.assign(console, {
    log: (...args) => log('[log]', ...args),
    info: (...args) => info(color('\x1B[34m%s\x1B[0m'), '[info]', ...args),
    error: (...args) => info(color('\x1B[31m%s\x1B[0m'), '[error]', ...args),
    warn: (...args) => warn(color('\x1B[33m%s\x1B[0m'), '[warn]', ...args)
});
// init app
const app = express__default["default"]();
const server = http__default["default"].createServer(app);
// cookie
app.use(cookieParser__default["default"]());
// static
app.use(express__default["default"].static(PUBLIC_PATH));
// sitemap & rss
app.use('/sitemap.xml', handleSitemapRequest);
app.use('/rss.xml', handleRSSRequest);
// tunnel
app.use(API_TUNNEL_PREFIX, tunnelRouter);
// app effect
isDev ? enableDevRuntime(app) : enableProdRuntime(app);
// run
server.listen(BFF_SERVER_PORT, () => {
    const infos = [
        `in ${NODE_ENV}`,
        `at ${new Date().toLocaleString()}`,
        `listening on ${JSON.stringify(server.address())}`
    ];
    console.info('[surmon.me]', `Run! ${infos.join(', ')}.`);
    // 启动扩展服务
    startGTagScriptUpdater();
    startGitHubChartUpdater();
    startArchiveUpdater();
});//# sourceMappingURL=bff.cjs.js.map
