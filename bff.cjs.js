/*!
* Surmon.me v3.3.4
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon <https://surmon.me>
*/
'use strict';var express=require('express'),RSS=require('rss'),axios=require('axios'),path=require('path'),stream=require('stream'),sitemap=require('sitemap'),WonderfulBingWallpaper=require('wonderful-bing-wallpaper'),NeteaseMusic=require('simple-netease-cloud-music'),fs=require('fs'),vite=require('vite'),LRU=require('lru-cache'),http=require('http'),compression=require('compression'),cookieParser=require('cookie-parser');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var express__default=/*#__PURE__*/_interopDefaultLegacy(express);var RSS__default=/*#__PURE__*/_interopDefaultLegacy(RSS);var axios__default=/*#__PURE__*/_interopDefaultLegacy(axios);var path__default=/*#__PURE__*/_interopDefaultLegacy(path);var WonderfulBingWallpaper__default=/*#__PURE__*/_interopDefaultLegacy(WonderfulBingWallpaper);var NeteaseMusic__default=/*#__PURE__*/_interopDefaultLegacy(NeteaseMusic);var fs__default=/*#__PURE__*/_interopDefaultLegacy(fs);var LRU__default=/*#__PURE__*/_interopDefaultLegacy(LRU);var http__default=/*#__PURE__*/_interopDefaultLegacy(http);var compression__default=/*#__PURE__*/_interopDefaultLegacy(compression);var cookieParser__default=/*#__PURE__*/_interopDefaultLegacy(cookieParser);/**
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
 * @file Tunnel constant
 * @module constant.tunnel
 * @author Surmon <https://github.com/surmon-china>
 */
var TunnelModule;
(function (TunnelModule) {
    TunnelModule["Instagram"] = "instagram";
    TunnelModule["BiliBili"] = "bilibili";
    TunnelModule["Wallpaper"] = "wallpaper";
    TunnelModule["GitHub"] = "gitHub";
    TunnelModule["Music"] = "music";
})(TunnelModule || (TunnelModule = {}));/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */
const API_TUNNEL_PREFIX = '/_tunnel';
const getBFFServerPort = () => Number(process.env.PORT || 3000);/**
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
    sub_title: '来苏之望',
    domain: 'surmon.me',
    url: 'https://surmon.me',
    author: 'Surmon'
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
    SURMON_ME: 'https://github.com/surmon-china/surmon.me',
    GITHUB_BLOG_LIST: 'https://github.com/stars/surmon-china/lists/surmon-me',
    VUNIVERSAL: 'https://github.com/surmon-china/vuniversal',
    NODEPRESS: 'https://github.com/surmon-china/nodepress',
    SURMON_ME_NATIVE: 'https://github.com/surmon-china/surmon.me.native',
    APP_APK_FILE: 'https://raw.githubusercontent.com/surmon-china/surmon.me.native/master/dist/android/surmon.me.apk',
    THROW_ERROR: 'https://throwerror.io',
    FOX_FINDER: 'https://foxfinder.io',
    GITHUB: 'https://github.com/surmon-china',
    GITHUB_SPONSORS: 'https://github.com/sponsors/surmon-china',
    PAYPAL: 'https://www.paypal.me/surmon',
    UPWORK: 'https://www.upwork.com/freelancers/~0142e621258ac1770d',
    MARKDOWN: 'https://daringfireball.net/projects/markdown/',
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
        description: META.sub_title,
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
        guid: getArticleURL(article.id),
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
    return sitemap.streamToPromise(stream.Readable.from(sitemapItemList).pipe(sitemapStream));
};/**
 * @file Outside
 * @module service.outside
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
 * @file BFF ghchart getter
 * @module server.getter.ghchart
 * @author Surmon <https://github.com/surmon-china>
 * @repo https://github.com/sallar/github-contributions-chart
 */
const getGitHubChartSVG = async () => {
    const response = await axios__default["default"].get(`https://ghchart.rshah.org/${GITHUB_UID}`, {
        timeout: 8000
    });
    if (response.status === 200) {
        return response.data;
    }
    else {
        throw response.data;
    }
};/**
 * @file BFF bilibili getter
 * @module server.getter.bilibili
 * @author Surmon <https://github.com/surmon-china>
 */
const PAGE_SIZE = 45;
const PAGE = 1;
const getBiliBiliVideos = async () => {
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
const getGitHubRepositories = async () => {
    const response = await axios__default["default"].request({
        headers: { 'User-Agent': META.title },
        url: `http://api.github.com/users/${GITHUB_UID}/repos?per_page=168`
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
};/**
 * @file BFF instagram getter
 * @module server.getter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */
const getInstagramMedias = async () => {
    return [];
};/**
 * @file BFF instagram setter
 * @module server.setter.instagram
 * @author Surmon <https://github.com/surmon-china>
 */
const setInstagramMedias = async (payload) => {
    console.log('setInstagramMedias', typeof payload, payload);
};/**
 * @file BFF music getter
 * @module server.getter.music
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
};const resolveTemplate = (config) => {
    const { template, appHTML, metas, scripts, manifest } = config;
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
    const template = fs__default["default"].readFileSync(path__default["default"].resolve(DIST_PATH, 'template.html'), 'utf-8');
    const { renderApp, renderError } = require(path__default["default"].resolve(PRDO_SERVER_PATH, 'ssr.js'));
    app.use('*', async (request, response) => {
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
 * @file Error constant
 * @module constant.error
 * @author Surmon <https://github.com/surmon-china>
 */
const INVALID_ERROR = 500;/**
 * @file BFF Server responser
 * @module server.responser
 * @author Surmon <https://github.com/surmon-china>
 */
const erroror = (response, error) => {
    console.warn(`[BFF] error:`, error);
    response.status(INVALID_ERROR);
    response.send(error?.message || String(error));
};
const responser = (promise) => {
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
const bffCache = new LRU__default["default"]({
    max: Infinity,
    maxAge: 1000 * 60 * 60 * 2 // 2 hour cache
});
const retryingMap = new Map();
const retry = (config) => {
    if (bffCache.has(config.key)) {
        retryingMap.set(config.key, false);
        return;
    }
    config
        .getter()
        .then((data) => {
        bffCache.set(config.key, data, config.age * 1000);
    })
        .catch((error) => {
        console.warn('[cacher] retry error:', error);
    })
        .finally(() => {
        retryingMap.set(config.key, false);
    });
};
const cacher = async (config) => {
    // cached
    if (bffCache.has(config.key)) {
        return bffCache.get(config.key);
    }
    try {
        const data = await config.getter();
        bffCache.set(config.key, data, config.age * 1000);
        return data;
    }
    catch (error) {
        // retry only once
        if (config.retryWhen && !retryingMap.get(config.key)) {
            retryingMap.set(config.key, true);
            setTimeout(() => retry({ ...config }), config.retryWhen * 1000);
        }
        if (typeof error === 'string') {
            return Promise.reject(`cacher error > ${error}`);
        }
        const err = error.toJSON?.() || error;
        err.name = `cacher error > ${err.name || ''}`;
        return Promise.reject(err);
    }
};/**
 * @file BFF Server main
 * @module server.index
 * @author Surmon <https://github.com/surmon-china>
 */
const createExpressApp = () => {
    // init app
    const app = express__default["default"]();
    const server = http__default["default"].createServer(app);
    // middlewares
    app.use(express__default["default"].json());
    app.use(cookieParser__default["default"]());
    app.use(compression__default["default"]());
    return {
        app,
        server
    };
};/**
 * @file BFF server entry
 * @module BFF-server
 * @author Surmon <https://github.com/surmon-china>
 */
// @ts-expect-error
process.noDeprecation = true;
// app
const { app, server } = createExpressApp();
// static
app.use(express__default["default"].static(PUBLIC_PATH));
// sitemap
app.get('/sitemap.xml', async (_, response) => {
    try {
        const data = await cacher({
            key: 'sitemap',
            age: 60 * 60,
            getter: getSitemapXML
        });
        response.header('Content-Type', 'application/xml');
        response.send(data);
    }
    catch (error) {
        erroror(response, error);
    }
});
// rss
app.get('/rss.xml', async (_, response) => {
    try {
        const data = await cacher({
            key: 'rss',
            age: 60 * 60,
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
app.get('/gtag.js', async (_, response) => {
    try {
        const data = await cacher({
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
// ghchart
app.get('/ghchart.svg', async (_, response) => {
    try {
        const data = await cacher({
            key: 'ghchart',
            age: 60 * 60 * 6,
            retryWhen: 60 * 60 * 30,
            getter: getGitHubChartSVG
        });
        response.header('Content-Type', 'image/svg+xml');
        response.send(data);
    }
    catch (error) {
        erroror(response, error);
    }
});
// tunnel services
app.get(`${API_TUNNEL_PREFIX}/${TunnelModule.BiliBili}`, responser(() => cacher({
    key: 'bilibili',
    age: 60 * 60 * 1,
    retryWhen: 60 * 5,
    getter: getBiliBiliVideos
})));
app.get(`${API_TUNNEL_PREFIX}/${TunnelModule.Wallpaper}`, responser(() => cacher({
    key: 'wallpaper',
    age: 60 * 60 * 8,
    retryWhen: 60 * 30,
    getter: getAllWallpapers
})));
app.get(`${API_TUNNEL_PREFIX}/${TunnelModule.GitHub}`, responser(() => cacher({
    key: 'github',
    age: 60 * 60 * 2,
    retryWhen: 60 * 30,
    getter: getGitHubRepositories
})));
app.get(`${API_TUNNEL_PREFIX}/${TunnelModule.Music}`, responser(() => cacher({
    key: 'music',
    age: 60 * 60 * 1,
    retryWhen: 60 * 10,
    getter: getSongList
})));
app.post(`${API_TUNNEL_PREFIX}/${TunnelModule.Instagram}`, (request, response) => {
    setInstagramMedias(request.body);
    response.send('ok');
});
app.get(`${API_TUNNEL_PREFIX}/${TunnelModule.Instagram}`, responser(() => cacher({
    key: 'instagram',
    age: 60 * 60 * 1,
    retryWhen: 60 * 10,
    getter: getInstagramMedias
})));
// app effect
isDev ? enableDevRuntime(app) : enableProdRuntime(app);
// run
server.listen(getBFFServerPort(), () => {
    const infos = [
        `in ${NODE_ENV}`,
        `at ${new Date().toLocaleString()}`,
        `listening on ${JSON.stringify(server.address())}`
    ];
    console.info('[surmon.me]', `Run! ${infos.join(', ')}.`);
});//# sourceMappingURL=bff.cjs.js.map
