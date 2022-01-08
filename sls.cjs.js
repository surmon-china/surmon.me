/*!
* Surmon.me v3.4.22
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon <https://surmon.me>
*/
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var fs=require('fs'),path=require('path'),http=require('http'),express=require('express'),compression=require('compression'),cookieParser=require('cookie-parser'),httpProxy=require('http-proxy');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var fs__default=/*#__PURE__*/_interopDefaultLegacy(fs);var path__default=/*#__PURE__*/_interopDefaultLegacy(path);var http__default=/*#__PURE__*/_interopDefaultLegacy(http);var express__default=/*#__PURE__*/_interopDefaultLegacy(express);var compression__default=/*#__PURE__*/_interopDefaultLegacy(compression);var cookieParser__default=/*#__PURE__*/_interopDefaultLegacy(cookieParser);/**
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
const BAD_REQUEST = 400;
const FORBIDDEN = 403;/**
 * @file Proxy constant
 * @module constant.proxy
 * @author Surmon <https://github.com/surmon-china>
 */
var ProxyModule;
(function (ProxyModule) {
    ProxyModule["Default"] = "default";
    ProxyModule["BiliBili"] = "bilibili";
    ProxyModule["Instagram"] = "instagram";
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
        module: ProxyModule.BiliBili,
        origin: 'https://www.bilibili.com',
        referer: 'https://www.bilibili.com/'
    },
    {
        module: ProxyModule.Instagram,
        origin: 'https://www.instagram.com',
        referer: 'https://www.instagram.com/'
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
 * @file BFF Server main
 * @module server.index
 * @author Surmon <https://github.com/surmon-china>
 */
const createExpressApp = () => {
    // init app
    const app = express__default["default"]();
    const server = http__default["default"].createServer(app);
    // proxy
    app.use(PROXY_ROUTE_PATH, proxyer());
    // middlewares
    app.use(express__default["default"].json());
    app.use(cookieParser__default["default"]());
    app.use(compression__default["default"]());
    return {
        app,
        server
    };
};/**
 * @file Serverless server entry
 * @module Serverless
 * @author Surmon <https://github.com/surmon-china>
 */
const { app, server } = createExpressApp();
// TODO
enableProdRuntime(app);
server.listen(getBFFServerPort());
// MARK
const initializer = (context, callback) => {
    console.log('serverless initializing');
    callback(null, '');
};
// MARK
const handler = (request, response, context) => {
    console.log('hello world');
    response.send('hello world');
};exports.handler=handler;exports.initializer=initializer;//# sourceMappingURL=sls.cjs.js.map
