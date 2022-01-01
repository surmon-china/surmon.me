/*!
* Surmon.me v3.3.4
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon <https://surmon.me>
*/
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var fs=require('fs'),path=require('path'),http=require('http'),express=require('express'),compression=require('compression'),cookieParser=require('cookie-parser');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var fs__default=/*#__PURE__*/_interopDefaultLegacy(fs);var path__default=/*#__PURE__*/_interopDefaultLegacy(path);var http__default=/*#__PURE__*/_interopDefaultLegacy(http);var express__default=/*#__PURE__*/_interopDefaultLegacy(express);var compression__default=/*#__PURE__*/_interopDefaultLegacy(compression);var cookieParser__default=/*#__PURE__*/_interopDefaultLegacy(cookieParser);/**
 * @file BFF server config
 * @module config.bff
 * @author Surmon <https://github.com/surmon-china>
 */
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
"production" === NodeEnv.Production;
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
