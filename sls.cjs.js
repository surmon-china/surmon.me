/*!
* Surmon.me v3.21.0
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon
*/
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var fs=require('fs'),path=require('path'),http=require('http'),express=require('express'),compression=require('compression'),cookieParser=require('cookie-parser'),httpProxy=require('http-proxy'),LRU=require('lru-cache'),redis=require('redis');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var fs__default=/*#__PURE__*/_interopDefaultLegacy(fs);var path__default=/*#__PURE__*/_interopDefaultLegacy(path);var http__default=/*#__PURE__*/_interopDefaultLegacy(http);var express__default=/*#__PURE__*/_interopDefaultLegacy(express);var compression__default=/*#__PURE__*/_interopDefaultLegacy(compression);var cookieParser__default=/*#__PURE__*/_interopDefaultLegacy(cookieParser);var LRU__default=/*#__PURE__*/_interopDefaultLegacy(LRU);/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */
const BFF_PROXY_PREFIX = '/_proxy';
const BFF_PROXY_ALLOWLIST = ['https://surmon.me', 'https://cdn.surmon.me'];
const getBFFServerPort = () => Number(process.env.PORT || 3000);/**
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
const isDev = "production" === NodeEnv.Development;
const isProd = "production" === NodeEnv.Production;
"production" === NodeEnv.Test;/**
 * @file BFF Server helper
 * @module server.helper
 * @author Surmon <https://github.com/surmon-china>
 */
const ROOT_PATH = process.cwd();
const DIST_PATH = path__default["default"].join(ROOT_PATH, 'dist');
const PRDO_CLIENT_PATH = path__default["default"].join(DIST_PATH, 'client');
const PRDO_SERVER_PATH = path__default["default"].join(DIST_PATH, 'server');
isDev ? path__default["default"].join(ROOT_PATH, 'public') : PRDO_CLIENT_PATH;const resolveTemplate = (config) => {
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
const FORBIDDEN = 403;/**
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
Object.freeze({
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
 * @file Serverless server entry
 * @module Serverless
 * @author Surmon <https://github.com/surmon-china>
 */
let slsServer = null;
// TODO
const initializer = async (context, callback) => {
    console.log('serverless initializing');
    slsServer = await createExpressApp();
    enableProdRenderer(slsServer.app, slsServer.cache);
    slsServer.server.listen(getBFFServerPort());
    callback(null, '');
};
// MARK
const handler = (request, response) => {
    // slsServer?.app
    // ...
    console.log('hello world');
    response.send('hello world');
};exports.handler=handler;exports.initializer=initializer;//# sourceMappingURL=sls.cjs.js.map
