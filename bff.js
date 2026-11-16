import "@dotenvx/dotenvx/config";
import path from "path";
import http from "http";
import https from "https";
import { pipeline } from "stream/promises";
import _isNil from "lodash-es/isNil.js";
import _axios, { isAxiosError } from "axios";
import { LRUCache } from "lru-cache";
import { createClient } from "@redis/client";
import fs from "fs";
import crypto from "crypto";
import RSS from "rss";
import { HttpAgent, HttpsAgent } from "agentkeepalive";
import { Readable } from "stream";
import { EnumChangefreq, SitemapStream, streamToPromise } from "sitemap";
import WonderfulBingWallpaper from "wonderful-bing-wallpaper";
import { XMLParser } from "fast-xml-parser";
// src/configs/bff.env.ts
/**
* @file Environment variables and runtime detection for the BFF server
* @module config/bff-env
* @author Surmon <https://github.com/surmon-china>
*/
var NODE_ENV = process.env.NODE_ENV;
var isNodeDev = process.env.NODE_ENV === "development";
var isNodeProd = process.env.NODE_ENV === "production";
var ROOT_PATH = process.cwd();
var DIST_PATH = path.join(ROOT_PATH, "dist");
var PROD_CLIENT_PATH = path.join(DIST_PATH, "client");
var PROD_SERVER_PATH = path.join(DIST_PATH, "server");
var PUBLIC_PATH = isNodeDev ? path.join(ROOT_PATH, "public") : PROD_CLIENT_PATH;
var YOUTUBE_API_KEY = process.env.SU_YOUTUBE_API_KEY;
var INSTAGRAM_TOKEN = process.env.SU_INSTAGRAM_TOKEN;
var THREADS_TOKEN = process.env.SU_THREADS_TOKEN;
// src/configs/bff.api.ts
/**
* @file BFF API configuration. These environment variables are injected via the BFF `dotenvx` plugin.
* @module config/bff-api
* @author Surmon <https://github.com/surmon-china>
*/
var STATIC_URL = process.env.VITE_STATIC_URL;
var API_ONLINE_URL = process.env.VITE_API_ONLINE_URL;
var API_LOCAL_URL = process.env.VITE_API_LOCAL_URL;
var NODEPRESS_API_URL = isNodeDev ? API_LOCAL_URL : API_ONLINE_URL;
// src/configs/app.config.ts
/**
* @file App config
* @module config/app-config
* @author Surmon <https://github.com/surmon-china>
*/
var BFF_CONFIG = Object.freeze({
	server_port: 3e3,
	server_local_url: "http://localhost:3000",
	tunnel_url_prefix: "/_tunnel",
	proxy_url_prefix: "/_proxy",
	proxy_allow_list_regexp: /^https:\/\/([a-z0-9-]+\.)*surmon\.(me|cn)/,
	route_path_rss: "/rss.xml",
	route_path_sitemap: "/sitemap.xml",
	route_path_gtag_script: "/gtag-script"
});
var APP_CONFIG = Object.freeze({
	comment_content_min_length: 3,
	comment_content_max_length: 3e3,
	article_image_share_long_threshold: 6800,
	render_long_article_threshold: 18e3,
	desktop_sidebar_article_list_count: 8,
	default_error_code: 500,
	default_comment_avatar: "/images/gravatar.webp",
	default_og_image: "/images/og-social-card.jpg",
	root_title_separator: " | ",
	page_title_separator: " • ",
	primary_color: "#0088f5"
});
var APP_PROFILE = Object.freeze({
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
Object.freeze({
	TOKEN: "pk.eyJ1Ijoic3VybW9uIiwiYSI6ImNsNDE4YmkzNjB2Z2wzY3F5dWg2M2tqeWIifQ.JhgYGFI4zsuNiX9dH-pBDg",
	STYLE_LIGHT: "mapbox://styles/surmon/cl41fktzn000f14pet94oo1u4",
	STYLE_DARK: "mapbox://styles/surmon/cl41gy1qo000l15ry20j5ae0k",
	ZOOM: 12.4374,
	CENTER: [103.830391822121, 1.348463]
});
var IDENTITIES = Object.freeze({
	GOOGLE_ANALYTICS_MEASUREMENT_ID: "G-R40DDTSYNQ",
	GOOGLE_ADSENSE_CLIENT_ID: "ca-pub-4710915636313788",
	SENTRY_PUBLIC_DSN: "https://4a5f194531fe4527879812e4a4d8cf89@o360897.ingest.sentry.io/4505569138966528",
	YOUTUBE_CHANNEL_ID: "UCoL-j6T28PLSJ2U6ZdONS0w",
	YOUTUBE_CHANNEL_SHORT_ID: "surmon_v",
	MUSIC_163_BGM_ALBUM_ID: "638949385",
	ZHIHU_USERNAME: "surmon",
	DOUBAN_USER_ID: "56647958",
	INSTAGRAM_USERNAME: "surmon_sattva",
	THREADS_USERNAME: "surmon_sattva",
	THREADS_JOINED_DATE: "2024-07-06",
	BTC_ADDRESS: "bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze",
	ETH_ADDRESS: "0xaD556974D449126efdeF23f4FF581861C301cB77"
});
var RESOURCE_LINKS = Object.freeze({
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
Object.freeze(Object.fromEntries([
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
].map((key) => [key, `${RESOURCE_LINKS.GO_LINKS_MAP_ENDPOINT}/${key}`])));
// src/constants/tunnel.ts
/**
* @file Tunnel constant
* @module constant/tunnel
* @author Surmon <https://github.com/surmon-china>
*/
var TunnelModule = /* @__PURE__ */ function(TunnelModule) {
	TunnelModule["MyGoogleMap"] = "my_google_map";
	TunnelModule["YouTubePlaylist"] = "youtube_playlist";
	TunnelModule["YouTubeVideoList"] = "youtube_video_list";
	TunnelModule["ThreadsProfile"] = "threads_profile";
	TunnelModule["ThreadsMedias"] = "threads_medias";
	TunnelModule["ThreadsMediaChildren"] = "threads_media_children";
	TunnelModule["ThreadsMediaConversation"] = "threads_media_conversation";
	TunnelModule["InstagramProfile"] = "instagram_profile";
	TunnelModule["InstagramMedias"] = "instagram_medias";
	TunnelModule["InstagramMediaChildren"] = "instagram_media_children";
	TunnelModule["InstagramCalendar"] = "instagram_calendar";
	TunnelModule["BingWallpaper"] = "bing_wallpaper";
	TunnelModule["NetEaseMusic"] = "netease_music";
	TunnelModule["DoubanMovies"] = "douban_movies";
	TunnelModule["GitHubSponsors"] = "github_sponsors";
	TunnelModule["GitHubContributions"] = "github_contributions";
	TunnelModule["StatisticsGitHubJson"] = "statistics_github_json";
	TunnelModule["StatisticsNpmJson"] = "statistics_npm_json";
	return TunnelModule;
}({});
// src/constants/mime-type.ts
/**
* @file Multipurpose Internet Mail Extensions.
* @module constant/mime-type
* @author Surmon <https://github.com/surmon-china>
*/
var MIME_TYPES = {
	text: "text/plain",
	html: "text/html",
	xml: "application/xml",
	json: "application/json",
	javascript: "application/javascript",
	svg: "image/svg+xml",
	css: "text/css",
	jpg: "image/jpeg",
	png: "image/png",
	gif: "image/gif",
	mp4: "video/mp4",
	mp3: "audio/mpeg"
};
// src/transforms/base64.ts
/**
* @file Base64 and Base64URL utilities
* @module transform/base64
* @author Surmon <https://github.com/surmon-china>
*/
var base64Encode = btoa;
var base64Decode = atob;
var BASE64_STD = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var BASE64_CUSTOM = "ZYXWVUTSRQPONMLKJIHGFEDCBAabcdefghijklmnopqrstuvwxyz0123456789-_=";
var safeBase64UrlEncode = (value) => {
	return [...base64Encode(value)].map((c) => {
		const idx = BASE64_STD.indexOf(c);
		return idx === -1 ? c : BASE64_CUSTOM[idx];
	}).join("").replace(/=+$/, "");
};
var safeBase64UrlDecode = (value) => {
	try {
		return base64Decode([...value.padEnd(value.length + (4 - value.length % 4) % 4, "=")].map((c) => {
			const idx = BASE64_CUSTOM.indexOf(c);
			return idx === -1 ? c : BASE64_STD[idx];
		}).join(""));
	} catch {
		throw new Error("Illegal Base64URL string!");
	}
};
// src/utils/logger.ts
var createLogger = (scope) => ({
	log: (...messages) => console.log("⚪", `[${scope}]`, ...messages),
	info: (...messages) => console.info("🔵", `[${scope}]`, ...messages),
	warn: (...messages) => console.warn("🟠", `[${scope}]`, ...messages),
	error: (...messages) => console.error("🔴", `[${scope}]`, ...messages),
	debug: (...messages) => console.debug("🟤", `[${scope}]`, ...messages),
	success: (...messages) => console.log("🟢", `[${scope}]`, ...messages),
	failure: (...messages) => console.warn("🔴", `[${scope}]`, ...messages)
});
// src/app/error.ts
var AppErrorClass = class extends Error {
	code;
	constructor(message, code) {
		super(message);
		this.name = "AppError";
		this.code = code;
		Object.setPrototypeOf(this, new.target.prototype);
	}
};
// src/server/utils/error.ts
/**
* @file BFF Server error helper
* @module server/util/error
* @author Surmon <https://github.com/surmon-china>
*/
var getErrorMessage = (error) => {
	if (error == null) return "Unknown Error";
	if (typeof error === "string") return error;
	if (isAxiosError(error)) {
		if (error.message) return error.message;
		if (error.errors?.length) return error.errors.map((e) => e.message).join(", ");
		return error.cause?.message || "Axios Error";
	}
	if (error instanceof Error || error instanceof AppErrorClass) return error.message || error.name;
	if (typeof error === "object") return error.message;
	return JSON.stringify(error);
};
// src/server/main/responder.ts
/**
* @file BFF Server responder
* @module server/respond
* @author Surmon <https://github.com/surmon-china>
*/
var respondWith = (response, result) => {
	const headers = {
		"Content-Type": result.contentType,
		...result.headers
	};
	const body = _isNil(result.body) ? "" : Buffer.isBuffer(result.body) ? result.body : typeof result.body === "object" && headers["Content-Type"]?.includes(MIME_TYPES.json) ? JSON.stringify(result.body) : String(result.body);
	if (!response.headersSent) response.writeHead(result.status, headers);
	if (!response.writableEnded) response.end(body);
};
var respond = {
	json: (body, status = 200) => ({
		body,
		status,
		contentType: MIME_TYPES.json
	}),
	text: (body, status = 200) => ({
		body,
		status,
		contentType: MIME_TYPES.text
	}),
	html: (body, status = 200) => ({
		body,
		status,
		contentType: MIME_TYPES.html
	}),
	xml: (body, status = 200) => ({
		body,
		status,
		contentType: MIME_TYPES.xml
	}),
	javascript: (body, status = 200) => ({
		body,
		status,
		contentType: MIME_TYPES.javascript
	}),
	error: (error, status = APP_CONFIG.default_error_code) => ({
		status,
		body: getErrorMessage(error),
		contentType: MIME_TYPES.text
	})
};
// src/server/main/proxifier.ts
/**
* @file BFF Server proxy
* @module server/proxy
* @author Surmon <https://github.com/surmon-china>
*/
var logger$3 = createLogger("BFF:Proxy");
var PROXY_REQUEST_TIMEOUT = 15e3;
var RESPONSE_TIMEOUT = 15e3;
var PROXY_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/";
var createProxifier = (options) => {
	const decodeProxyUrl = (url) => safeBase64UrlDecode(url);
	const makeRedirectLocation = (location) => {
		const slash = options.prefix.endsWith("/");
		return `${options.prefix}${slash ? "" : "/"}${safeBase64UrlEncode(location)}`;
	};
	return async (context) => {
		const { request, response } = context;
		let targetURL = null;
		let parsedURL = null;
		try {
			targetURL = decodeProxyUrl(context.path.replace(options.prefix, ""));
			parsedURL = new URL(targetURL);
			response.setHeader("x-original-url", targetURL);
		} catch (error) {
			return respondWith(response, {
				status: 400,
				body: error?.message || "Invalid target URL",
				contentType: MIME_TYPES.text
			});
		}
		const { protocol, hostname } = parsedURL;
		if (protocol !== "http:" && protocol !== "https:") return respondWith(response, {
			status: 400,
			body: "Unsupported protocol",
			contentType: MIME_TYPES.text
		});
		if (!hostname || !hostname.includes(".") || hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local") || hostname.endsWith(".lan") || /^10\./.test(hostname) || /^192\.168\./.test(hostname) || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname)) return respondWith(response, {
			status: 400,
			body: "Invalid or disallowed hostname",
			contentType: MIME_TYPES.text
		});
		if (options.shouldBlockTargetUrl?.(parsedURL)) return respondWith(response, {
			status: 403,
			body: "Forbidden target URL",
			contentType: MIME_TYPES.text
		});
		if (options.allowedSourceRegexp) {
			const origin = request.headers.origin;
			const referer = request.headers.referer;
			const isAllowedReferer = !referer || options.allowedSourceRegexp.test(referer);
			const isAllowedOrigin = !origin || options.allowedSourceRegexp.test(origin);
			if (!isAllowedReferer || !isAllowedOrigin) return respondWith(response, {
				status: 403,
				body: "Forbidden source",
				contentType: MIME_TYPES.text
			});
		}
		const proxyRequest = (parsedURL.protocol === "https:" ? https : http).request({
			protocol: parsedURL.protocol,
			hostname: parsedURL.hostname,
			path: parsedURL.pathname + (parsedURL.search || ""),
			port: parsedURL.port,
			method: "GET",
			headers: {
				...request.headers,
				host: parsedURL.hostname,
				"user-agent": PROXY_UA
			}
		}, async (proxyResponse) => {
			const statusCode = proxyResponse.statusCode || 500;
			if ([
				301,
				302,
				307,
				308
			].includes(statusCode)) {
				const location = proxyResponse.headers.location;
				if (location) proxyResponse.headers.location = makeRedirectLocation(location);
			}
			if (statusCode === 200 && !proxyResponse.headers["cache-control"]) proxyResponse.headers["cache-control"] = "public, max-age=31536000";
			response.writeHead(proxyResponse.statusCode || 500, proxyResponse.headers);
			try {
				await pipeline(proxyResponse, response);
			} catch (error) {
				respondWith(response, {
					status: 500,
					body: error.message,
					contentType: MIME_TYPES.text
				});
			}
		});
		proxyRequest.on("error", (error) => {
			logger$3.failure(`Request failed: ${error.message} > ${targetURL}`);
			respondWith(response, {
				status: 500,
				body: error.message,
				contentType: MIME_TYPES.text
			});
		});
		proxyRequest.setTimeout(PROXY_REQUEST_TIMEOUT, () => {
			logger$3.failure(`Proxy request timeout: ${parsedURL.href}`);
			proxyRequest.destroy();
			respondWith(response, {
				status: 504,
				body: "Proxy request timeout",
				contentType: MIME_TYPES.text
			});
		});
		response.setTimeout(RESPONSE_TIMEOUT, () => {
			if (!response.headersSent && !response.writableEnded) {
				logger$3.debug(`Response timeout`);
				respondWith(response, {
					status: 504,
					body: "Response timeout",
					contentType: MIME_TYPES.text
				});
			}
		});
		try {
			await pipeline(request, proxyRequest);
		} catch (error) {
			respondWith(response, {
				status: 500,
				body: error.message,
				contentType: MIME_TYPES.text
			});
		}
	};
};
// src/server/main/index.ts
/**
* @file BFF Server main
* @module server/main
* @author Surmon <https://github.com/surmon-china>
*/
var createBFFServerApp = (options) => {
	const middlewares = [];
	const pathRoutes = /* @__PURE__ */ new Map();
	let wildRouteHandler = null;
	const proxifier = options.proxy ? createProxifier(options.proxy) : null;
	const server = http.createServer(async (request, response) => {
		response.setHeader("X-Powered-By", options.poweredBy ?? "Node");
		if (request.method !== "GET" && request.method !== "HEAD") return respondWith(response, {
			status: 405,
			body: "Only GET and HEAD methods are allowed",
			contentType: MIME_TYPES.text
		});
		if (!request.url) return respondWith(response, {
			status: 400,
			body: "URL is required",
			contentType: MIME_TYPES.text
		});
		try {
			const { pathname, searchParams } = new URL(request.url, "http://localhost");
			const context = {
				url: request.url,
				path: pathname,
				query: Object.fromEntries(searchParams.entries()),
				headers: request.headers,
				request,
				response
			};
			for (const middleware of middlewares) await new Promise((resolve, reject) => {
				try {
					middleware(request, response, (error) => error ? reject(error) : resolve());
				} catch (err) {
					reject(err);
				}
			});
			if (options.proxy && proxifier) {
				if (context.path.startsWith(options.proxy.prefix)) return await proxifier(context);
			}
			const handler = pathRoutes.get(context.path) ?? wildRouteHandler;
			return handler ? respondWith(response, await handler(context)) : respondWith(response, {
				status: 404,
				body: "Not Found",
				contentType: MIME_TYPES.text
			});
		} catch (error) {
			respondWith(response, options.onError?.(error, request) ?? {
				status: 500,
				body: "Internal Server Error",
				contentType: MIME_TYPES.text
			});
		}
	});
	return {
		useConnectMiddleware: (middleware) => {
			middlewares.push(middleware);
		},
		usePathRequest: (path, handler) => {
			pathRoutes.set(path, handler);
		},
		useWildRequest: (handler) => {
			wildRouteHandler = handler;
		},
		listen: (port, listeningListener) => {
			return server.listen(port, () => listeningListener(server.address()));
		}
	};
};
// src/server/services/cache.ts
/**
* @file Universal Server cache
* @module server/service/cache
* @author Surmon <https://github.com/surmon-china>
*/
var logger$2 = createLogger("BFF:Cache");
var createLRUStore = () => {
	const lruCache = new LRUCache({ max: 500 });
	const set = async (key, value, ttl) => {
		if (ttl) await lruCache.set(key, value, { ttl: ttl * 1e3 });
		else await lruCache.set(key, value);
	};
	return {
		set,
		get: async (key) => lruCache.get(key),
		has: async (key) => lruCache.has(key),
		del: async (key) => lruCache.delete(key),
		clear: async () => lruCache.clear()
	};
};
var createRedisStore = async (options) => {
	const client = createClient();
	client.on("connect", () => logger$2.info("Redis connecting..."));
	client.on("reconnecting", () => logger$2.info("Redis reconnecting..."));
	client.on("ready", () => logger$2.success("Redis readied."));
	client.on("error", (error) => logger$2.failure("Redis client error!", error.message || error));
	await client.connect();
	const buildStore = (namespace) => {
		const getCacheKey = (key) => namespace ? `${namespace}:${key}` : key;
		const set = async (key, value, ttl) => {
			const _value = value === void 0 ? "" : JSON.stringify(value);
			if (ttl) await client.set(getCacheKey(key), _value, { expiration: {
				type: "EX",
				value: ttl
			} });
			else await client.set(getCacheKey(key), _value);
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
			const keys = await client.keys(getCacheKey("*"));
			if (keys.length) await client.del(keys);
		};
		return {
			set,
			get,
			has,
			del,
			clear,
			withoutNamespace: () => buildStore()
		};
	};
	return buildStore(options?.namespace ?? "ssr_app");
};
var createCacheStore = async (options) => {
	let cacheStore;
	try {
		cacheStore = await createRedisStore(options);
		logger$2.info("Redis store readied.");
	} catch (error) {
		cacheStore = createLRUStore();
		logger$2.info("LRU store readied.");
	}
	await cacheStore.clear();
	return cacheStore;
};
// src/server/renderer/_template.ts
var resolveTemplate = ({ template, appHTML, headHTML, bodyScripts }) => {
	return template.replace(/<title>[\s\S]*<\/title>/, "").replace("<html>", () => `<html${headHTML.htmlAttrs}>`).replace("<body>", () => `<body${headHTML.bodyAttrs}>`).replace("<body>", () => `<body>${headHTML.bodyTagsOpen ? `\n${headHTML.bodyTagsOpen}` : ``}`).replace("</head>", () => `${headHTML.headTags}\n</head>`).replace("</body>", () => `${headHTML.bodyTags}\n</body>`).replace("</body>", () => `${bodyScripts}\n</body>`).replace(`<!--app-html-->`, () => appHTML);
};
// src/server/renderer/dev.ts
var createDevRenderer = async (cache) => {
	const viteServer = await (await import("vite")).createServer({
		root: process.cwd(),
		logLevel: "info",
		appType: "custom",
		server: {
			middlewareMode: true,
			watch: {
				usePolling: true,
				interval: 100
			}
		}
	});
	const render = async (context) => {
		const { renderApp, renderError } = await viteServer.ssrLoadModule("/src/server-entry.ts");
		const indexHTML = fs.readFileSync(path.resolve(ROOT_PATH, "index.html"), "utf-8");
		const template = await viteServer.transformIndexHtml(context.url, indexHTML);
		const resolveRendered = (rendered) => ({
			contentType: MIME_TYPES.html,
			status: rendered.code,
			body: resolveTemplate({
				template,
				appHTML: rendered.appHTML,
				headHTML: rendered.headHTML,
				bodyScripts: `${rendered.stateScripts}\n${rendered.contextScripts}`
			})
		});
		try {
			return resolveRendered(await renderApp(context, cache));
		} catch (error) {
			viteServer.ssrFixStacktrace(error);
			return resolveRendered(await renderError(context, error));
		}
	};
	return {
		viteServer,
		render
	};
};
// src/server/renderer/_manifest.ts
var getManifestFlatFiles = (manifest) => {
	const files = /* @__PURE__ */ new Set();
	Object.values(manifest).forEach((item) => {
		files.add(item.file);
		item.css?.forEach((css) => files.add(css));
		item.imports?.forEach((imports) => files.add(imports));
		item.dynamicImports?.forEach((dynamicImports) => files.add(dynamicImports));
	});
	return Array.from(files);
};
var resolveAssetsPrefix = (html, manifestFiles, filePrefix) => {
	return manifestFiles.reduce((result, file) => {
		return result.replace(new RegExp(`(href|src)="/${file}"`, "g"), `$1="${filePrefix}/${file}"`);
	}, html);
};
// src/server/renderer/prod.ts
var createProdRenderer = async (cache) => {
	const template = fs.readFileSync(path.resolve(DIST_PATH, "template.html"), "utf-8");
	const manifest = fs.readFileSync(path.resolve(DIST_PATH, "manifest.json"), "utf-8");
	const manifestFiles = getManifestFlatFiles(JSON.parse(manifest));
	const { renderApp, renderError } = await import(path.resolve(PROD_SERVER_PATH, "ssr.js"));
	const resolveRendered = (rendered) => ({
		contentType: MIME_TYPES.html,
		status: rendered.code,
		body: resolveTemplate({
			template: resolveAssetsPrefix(template, manifestFiles, rendered.assetsPrefix),
			appHTML: rendered.appHTML,
			headHTML: rendered.headHTML,
			bodyScripts: `${rendered.stateScripts}\n${rendered.contextScripts}`
		})
	});
	const render = async (context) => {
		try {
			return resolveRendered(await renderApp(context, cache));
		} catch (error) {
			return resolveRendered(await renderError(context, error));
		}
	};
	return { render };
};
// src/server/utils/cacher.ts
/**
* @file BFF Server cache
* @module server/util/cache
* @author Surmon <https://github.com/surmon-china>
*/
var logger$1 = createLogger("BFF:Cacher");
var minutes = (m) => m * 60;
var hours = (h) => h * minutes(60);
var days = (d) => d * hours(24);
var humanizeSeconds = (s) => {
	const hours = Math.floor(s / 3600);
	const minutes = Math.floor(s % 3600 / 60);
	const seconds = s % 60;
	const formattedHours = hours > 0 ? `${hours}h ` : "";
	const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
	const formattedSeconds = seconds > 0 ? `${seconds}s` : "";
	return formattedHours + formattedMinutes + formattedSeconds;
};
var getCacheKey = (key) => `bff:${key}`;
var getLockCacheKey = (key) => `bff:interval-lock:${key}`;
/** Execute the getter and store the data into the cache. */
var execute = async (cache, options) => {
	const data = await options.getter();
	await cache.set(options.key, data, options.ttl);
	return data;
};
var passive = async (cache, opts) => {
	const options = {
		...opts,
		key: getCacheKey(opts.key)
	};
	if (await cache.has(options.key)) return await cache.get(options.key);
	try {
		const result = await execute(cache, options);
		logger$1.success("passive succeed:", `"${opts.key}" | ttl: ${humanizeSeconds(options.ttl)}`);
		return result;
	} catch (error) {
		const message = getErrorMessage(error);
		logger$1.failure("passive failure:", `"${opts.key}" | ttl: ${humanizeSeconds(options.ttl)} | "${message}"`);
		throw error instanceof Error ? error : new Error(message);
	}
};
var UNIQUE_INTERVAL_LOCK_ID = crypto.randomBytes(8).toString("hex");
var interval = (cache, opts) => {
	const options = {
		...opts,
		key: getCacheKey(opts.key)
	};
	const intervalLockKey = getLockCacheKey(opts.key);
	const execInterval = async (succeedCount = 0, failureCount = 0) => {
		const lock = await cache.get(intervalLockKey);
		const executable = !lock || lock === UNIQUE_INTERVAL_LOCK_ID;
		try {
			if (executable) {
				await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID);
				await execute(cache, options);
				++succeedCount;
				logger$1.success("interval succeed:", `${failureCount}/${succeedCount}`, `| "${opts.key}"`, `| ttl: ${humanizeSeconds(options.ttl)}`, `| next: ${humanizeSeconds(options.interval)}`);
				await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID, options.interval + 2);
			}
			setTimeout(() => execInterval(succeedCount, failureCount), options.interval * 1e3);
		} catch (error) {
			++failureCount;
			logger$1.failure("interval failure:", `${failureCount}/${succeedCount}`, `| "${opts.key}"`, `| retry: ${humanizeSeconds(options.retry)}`, `| "${getErrorMessage(error)}"`);
			setTimeout(() => execInterval(succeedCount, failureCount), options.retry * 1e3);
			await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID, options.retry + 2);
		}
	};
	execInterval();
	return async () => {
		if (await cache.has(options.key)) return await cache.get(options.key);
		else throw new Error(`No cached data for "${opts.key}".`);
	};
};
var cacher_default = {
	passive,
	interval
};
// src/server/utils/url.ts
/**
* @file BFF route helper
* @module server/util/url
* @author Surmon <https://github.com/surmon-china>
*/
var getTagURL = (tagSlug) => `${APP_PROFILE.url}/tag/${tagSlug}`;
var getCategoryURL = (categorySlug) => `${APP_PROFILE.url}/category/${categorySlug}`;
var getArticleURL = (ArticleId) => `${APP_PROFILE.url}/article/${ArticleId}`;
var getPageURL = (pagePath) => `${APP_PROFILE.url}/${pagePath}`;
// src/server/services/axios.ts
/**
* @file BFF Server fetcher
* @module server/service/axios
* @author Surmon <https://github.com/surmon-china>
*/
var axios = _axios.create({
	httpAgent: new HttpAgent({
		keepAlive: true,
		maxSockets: 160,
		maxFreeSockets: 160,
		timeout: 6e4,
		freeSocketTimeout: 3e4,
		keepAliveMsecs: 6e4
	}),
	httpsAgent: new HttpsAgent({
		keepAlive: true,
		maxSockets: 160,
		maxFreeSockets: 160,
		timeout: 6e4,
		freeSocketTimeout: 3e4,
		keepAliveMsecs: 6e4
	})
});
// src/server/getters/sitemap.ts
/**
* @file Archive sitemap generator
* @module server/getter/sitemap
* @author Surmon <https://github.com/surmon-china>
*/
var getDataFromNodePress = async (apiPath, cache) => {
	if (cache) {
		const cached = await cache.store.withoutNamespace?.().get(`nodepress:${cache.key}`);
		if (cached) return cached;
	}
	return (await axios.get(`${NODEPRESS_API_URL}${apiPath}`)).data.result;
};
var getSitemapXml = async (store) => {
	const [articles, categories, tags] = await Promise.all([
		getDataFromNodePress("/articles/all", {
			store,
			key: "public-all-articles"
		}),
		getDataFromNodePress("/categories/all", {
			store,
			key: "public-all-categories"
		}),
		getDataFromNodePress("/tags/all", {
			store,
			key: "public-all-tags"
		})
	]);
	const sitemapStream = new SitemapStream({ hostname: APP_PROFILE.url });
	const sitemapItemList = [
		{
			url: APP_PROFILE.url,
			changefreq: EnumChangefreq.ALWAYS,
			priority: 1
		},
		{
			url: getPageURL("about"),
			changefreq: EnumChangefreq.YEARLY,
			priority: 1
		},
		{
			url: getPageURL("archive"),
			changefreq: EnumChangefreq.ALWAYS,
			priority: 1
		},
		{
			url: getPageURL("guestbook"),
			changefreq: EnumChangefreq.ALWAYS,
			priority: 1
		}
	];
	categories.forEach((category) => {
		sitemapItemList.push({
			priority: .6,
			changefreq: EnumChangefreq.DAILY,
			url: getCategoryURL(category.slug)
		});
	});
	tags.forEach((tag) => {
		sitemapItemList.push({
			priority: .6,
			changefreq: EnumChangefreq.DAILY,
			url: getTagURL(tag.slug)
		});
	});
	articles.forEach((article) => {
		sitemapItemList.push({
			priority: .8,
			changefreq: EnumChangefreq.DAILY,
			url: getArticleURL(article.id),
			lastmodISO: new Date(article.updated_at).toISOString()
		});
	});
	return (await streamToPromise(Readable.from(sitemapItemList).pipe(sitemapStream))).toString();
};
// src/server/getters/rss.ts
/**
* @file Archive RSS generator
* @module server/getter/rss
* @author Surmon <https://github.com/surmon-china>
*/
var getRssXml = async (store) => {
	const [articles, categories] = await Promise.all([getDataFromNodePress("/articles/all", {
		store,
		key: "public-all-articles"
	}), getDataFromNodePress("/categories/all", {
		store,
		key: "public-all-categories"
	})]);
	const feed = new RSS({
		title: APP_PROFILE.title,
		description: APP_PROFILE.sub_title_zh,
		site_url: APP_PROFILE.url,
		feed_url: `${APP_PROFILE.url}/rss.xml`,
		image_url: `${APP_PROFILE.url}/icon.png`,
		managingEditor: APP_PROFILE.author,
		webMaster: APP_PROFILE.author,
		generator: `${APP_PROFILE.domain}`,
		categories: categories.map((category) => category.slug),
		copyright: `${(/* @__PURE__ */ new Date()).getFullYear()} ${APP_PROFILE.title}`,
		language: "zh",
		ttl: 60
	});
	articles.forEach((article) => {
		return feed.item({
			title: article.title,
			description: article.summary,
			url: getArticleURL(article.id),
			guid: String(article.id),
			categories: article.categories.map((category) => category.slug),
			author: APP_PROFILE.author,
			date: article.created_at,
			enclosure: { url: article.thumbnail }
		});
	});
	return feed.xml({ indent: true });
};
// src/transforms/gtag.ts
/**
* @file Google Analytics
* @module transform/gtag
* @author Surmon <https://github.com/surmon-china>
*/
var getGtagScriptURL = (measurementId) => {
	return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
};
// src/server/getters/gtag.ts
/**
* @file BFF GA getter
* @module server/getter/gtag
* @author Surmon <https://github.com/surmon-china>
*/
var getGTagScript = async () => {
	const url = getGtagScriptURL(IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID);
	return (await axios.get(url, { timeout: 8e3 })).data;
};
// src/server/getters/wallpaper.ts
/**
* @file BFF wallpaper getter
* @module server/getter/wallpaper
* @author Surmon <https://github.com/surmon-china>
*/
var getWallpapers = async (params) => {
	try {
		const wbw = new WonderfulBingWallpaper();
		const wallpaperJSON = await wbw.getWallpapers({
			...params,
			size: 8
		});
		return wbw.humanizeWallpapers(wallpaperJSON);
	} catch (error) {
		throw "wallpaper parsing JSON failed: " + String(error);
	}
};
var getZHWallpapers = () => {
	return getWallpapers({
		local: "zh-CN",
		host: "cn.bing.com",
		ensearch: 0
	});
};
var getENWallpapers = () => {
	return getWallpapers({
		local: "en-US",
		host: "bing.com",
		ensearch: 1
	});
};
var getAllWallpapers = async () => {
	const [zh, en] = await Promise.all([getZHWallpapers(), getENWallpapers()]);
	return {
		zh,
		en
	};
};
// src/server/getters/my-google-map.ts
/**
* @file BFF google map getter
* @module server/getter/my-google-map
* @author Surmon <https://github.com/surmon-china>
*/
var getMyGoogleMap = () => {
	const xmlParser = new XMLParser({
		ignoreAttributes: false,
		allowBooleanAttributes: true,
		attributeNamePrefix: "@"
	});
	return axios.get(RESOURCE_LINKS.GOOGLE_MY_MAP_KML_URL, { timeout: 8e3 }).then((response) => xmlParser.parse(response.data).kml.Document);
};
// src/server/getters/github.ts
/**
* @file BFF GitHub getter
* @module server/getter/github
* @author Surmon <https://github.com/surmon-china>
*/
var fetchGitHubStatisticsJson = async (fileName) => {
	const url = `${RESOURCE_LINKS.GITHUB_STATISTICS_JSON_URL}${fileName}`;
	return (await axios.get(url, { timeout: 8e3 })).data;
};
var getGitHubStatistics = () => {
	return fetchGitHubStatisticsJson("github.json").then((data) => ({
		followerCount: data.userinfo.followers,
		followingCount: data.userinfo.following,
		gistCount: data.userinfo.public_gists,
		repositoryCount: data.userinfo.public_repos,
		organizationCount: data.organizations.length,
		totalStarCount: data.statistics.stars,
		totalCodeSize: data.statistics.size
	}));
};
var getGitHubSponsors = () => {
	return fetchGitHubStatisticsJson("github.sponsors.json");
};
var getGitHubContributions = () => {
	return fetchGitHubStatisticsJson("github.contributions.json");
};
// src/server/getters/npm.ts
/**
* @file BFF NPM getter
* @module server/getter/npm
* @author Surmon <https://github.com/surmon-china>
*/
var getNPMStatistics = async () => {
	const data = await fetchGitHubStatisticsJson("npm.json");
	return {
		totalPackages: data ? Object.keys(data.downloads).length : 0,
		totalDownloads: data ? Object.values(data.downloads).reduce((p, c) => p + c, 0) : 0,
		averageScore: (() => {
			const packages = data?.packages;
			if (!packages?.length) return 0;
			return (packages.reduce((p, c) => p + c.score.final, 0) / packages.length).toFixed(3);
		})()
	};
};
// src/server/getters/douban.ts
/**
* @file BFF douban getter
* @module server/getter/douban
* @author Surmon <https://github.com/surmon-china>
*/
var getDoubanMovies = async () => {
	const api = `https://m.douban.com/rexxar/api/v2/user/${IDENTITIES.DOUBAN_USER_ID}/collection_stats?type=movie&for_mobile=1`;
	const referer = `https://m.douban.com/people/${IDENTITIES.DOUBAN_USER_ID}/movie_charts`;
	return (await axios.get(api, {
		timeout: 12e3,
		headers: { Referer: referer }
	})).data;
};
// src/server/getters/netease-music.ts
/**
* @file BFF music getter
* @module server/getter/music
* @author Surmon <https://github.com/surmon-china>
*/
var PLAY_LIST_LIMIT = 168;
var getSongList = async () => {
	const playlistURL = `https://music.163.com/api/v6/playlist/detail?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`;
	const playlistDetail = await axios.get(playlistURL, { timeout: 8e3 });
	if (playlistDetail.data.code < 0) throw new Error(playlistDetail.data.message);
	const songListURL = `https://music.163.com/api/v3/song/detail?c=[${(playlistDetail.data.playlist?.trackIds || []).slice(0, PLAY_LIST_LIMIT).map((id) => `{id:${id.id}}`).join(",")}]`;
	const songListDetail = await axios.get(songListURL, { timeout: 8e3 });
	if (!songListDetail.data.songs) throw new Error(songListDetail.data);
	return (songListDetail.data.songs || []).filter((song) => !song.noCopyrightRcmd).slice(0, PLAY_LIST_LIMIT).map((song) => ({
		id: song.id,
		duration: song.dt,
		name: song.name,
		album: song.al?.name || "-",
		artist: (song.ar || []).map((artist) => artist.name).join(" / "),
		cover_art_url: song.al?.picUrl,
		url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
	}));
};
// src/server/getters/youtube.ts
/**
* @file BFF YouTube getter
* @module server/getter/youtube
* @author Surmon <https://github.com/surmon-china>
*/
var getYouTubeChannelPlayLists = async () => {
	return (await axios.get(`https://www.googleapis.com/youtube/v3/playlists`, {
		timeout: 8e3,
		params: {
			part: "snippet,contentDetails",
			maxResults: 50,
			channelId: IDENTITIES.YOUTUBE_CHANNEL_ID,
			key: YOUTUBE_API_KEY
		}
	})).data.items;
};
var getYouTubeVideoListByPlayerListId = async (playlistId) => {
	return (await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
		timeout: 8e3,
		params: {
			part: "snippet,contentDetails",
			maxResults: 50,
			playlistId,
			key: YOUTUBE_API_KEY
		}
	})).data.items;
};
// src/server/getters/threads/post.ts
var THREADS_MEDIA_FULL_FIELDS = `id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post`;
var getThreadsMedias = async (options) => {
	try {
		const uri = "https://graph.threads.net/v1.0/me/threads";
		const params = {
			access_token: THREADS_TOKEN,
			fields: options?.fields ?? THREADS_MEDIA_FULL_FIELDS,
			limit: options?.limit ?? 24
		};
		if (options?.since) params.since = options.since;
		if (options?.after) params.after = options.after;
		const response = await axios.get(uri, {
			timeout: 8e3,
			params
		});
		return {
			...response.data,
			paging: { cursors: response.data.paging?.cursors }
		};
	} catch (error) {
		throw error.response?.data?.error?.message ?? error;
	}
};
var getThreadsMediaChildren = (threadsMediaId) => {
	const uri = `https://graph.threads.net/v1.0/${threadsMediaId}`;
	const params = {
		access_token: THREADS_TOKEN,
		fields: THREADS_MEDIA_FULL_FIELDS
	};
	return axios.get(uri, {
		timeout: 8e3,
		params
	}).then((response) => response.data).catch((error) => Promise.reject(error.response?.data?.error?.message ?? error));
};
var getThreadsMediaConversation = (threadsMediaId) => {
	const uri = `https://graph.threads.net/v1.0/${threadsMediaId}/conversation`;
	const params = {
		access_token: THREADS_TOKEN,
		reverse: false,
		fields: `id,text,username,permalink,timestamp,media_type,media_url,shortcode,thumbnail_url,children,is_quote_post,has_replies,root_post,replied_to,is_reply,is_reply_owned_by_me,reply_audience`
	};
	return axios.get(uri, {
		timeout: 8e3,
		params
	}).then((response) => response.data).catch((error) => Promise.reject(error.response?.data?.error?.message ?? error));
};
// src/server/getters/threads/profile.ts
var getThreadsUserProfile = async () => {
	try {
		const response = await axios.get("https://graph.threads.net/v1.0/me", {
			params: {
				access_token: THREADS_TOKEN,
				fields: "id,username,name,threads_profile_picture_url,threads_biography"
			},
			timeout: 8e3
		});
		return {
			id: response.data.id,
			name: response.data.name,
			username: response.data.username,
			avatar_url: response.data.threads_profile_picture_url,
			biography: response.data.threads_biography
		};
	} catch (error) {
		throw error.response?.data?.error?.message ?? error;
	}
};
var getThreadsUserFollowersCount = async () => {
	try {
		return (await axios.get("https://graph.threads.net/v1.0/me/threads_insights", {
			params: {
				access_token: THREADS_TOKEN,
				metric: "followers_count"
			},
			timeout: 8e3
		})).data.data[0].total_value.value;
	} catch (error) {
		throw error.response?.data?.error?.message ?? error;
	}
};
var getThreadsProfile = async () => {
	const [userProfile, followersCount] = await Promise.all([getThreadsUserProfile(), getThreadsUserFollowersCount()]);
	return {
		...userProfile,
		followers_count: followersCount
	};
};
// src/server/getters/instagram/media.ts
var getInstagramMedias = async (options) => {
	try {
		const params = {
			access_token: INSTAGRAM_TOKEN,
			fields: options?.fields ?? `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp,like_count`,
			limit: options?.limit ?? 24
		};
		if (options?.since) params.since = options.since;
		if (options?.after) params.after = options.after;
		return (await axios.get("https://graph.instagram.com/me/media", {
			timeout: 8e3,
			params
		})).data;
	} catch (error) {
		throw error?.response?.data?.error?.message ?? error;
	}
};
var getInstagramMediaChildren = (mediaId) => {
	const url = `https://graph.instagram.com/${mediaId}/children`;
	const params = {
		access_token: INSTAGRAM_TOKEN,
		fields: `id,media_type,media_url,thumbnail_url,timestamp`
	};
	return axios.get(url, {
		timeout: 8e3,
		params
	}).then((response) => response.data.data).catch((error) => Promise.reject(error?.response?.data?.error?.message ?? error));
};
// src/server/getters/instagram/calendar.ts
async function fetchAllMedias({ since, after, medias = [], onSucceeded, onFailed }) {
	try {
		const result = await getInstagramMedias({
			fields: "id,timestamp",
			limit: 100,
			since,
			after
		});
		if (result.paging.next) await fetchAllMedias({
			since,
			after: result.paging.cursors.after,
			medias: [...medias, ...result.data],
			onSucceeded,
			onFailed
		});
		else onSucceeded?.([...medias, ...result.data]);
	} catch (error) {
		onFailed?.(error);
	}
}
var getInstagramCalendar = () => {
	return new Promise((resolve, reject) => {
		const today = /* @__PURE__ */ new Date();
		today.setDate(1);
		today.setFullYear(today.getFullYear() - 1);
		fetchAllMedias({
			since: Math.round(today.getTime() / 1e3),
			onFailed: reject,
			onSucceeded: (medias) => {
				const mediaMap = medias.reduce((accumulator, media) => {
					const key = media.timestamp.slice(0, 10);
					return accumulator.set(key, (accumulator.get(key) || 0) + 1);
				}, /* @__PURE__ */ new Map());
				resolve(Array.from(mediaMap, ([date, count]) => ({
					date,
					count
				})));
			}
		});
	});
};
// src/server/getters/instagram/profile.ts
var getInstagramProfile = () => {
	const params = {
		access_token: INSTAGRAM_TOKEN,
		fields: `id,username,account_type,media_count`
	};
	return axios.get(`https://graph.instagram.com/me`, {
		timeout: 8e3,
		params
	}).then((response) => response.data).catch((error) => Promise.reject(error?.response?.data?.error?.message ?? error));
};
// src/bff.ts
var logger = createLogger("BFF");
var cache = await createCacheStore({ namespace: APP_PROFILE.domain.replace(/\./gi, "_") });
var app = createBFFServerApp({
	cache,
	poweredBy: APP_PROFILE.title,
	proxy: {
		prefix: BFF_CONFIG.proxy_url_prefix + "/",
		allowedSourceRegexp: isNodeProd ? BFF_CONFIG.proxy_allow_list_regexp : void 0,
		shouldBlockTargetUrl: (url) => {
			if (url.hostname.endsWith(APP_PROFILE.domain)) return url.hostname !== new URL(STATIC_URL).hostname;
			else return false;
		}
	},
	onError: (error, request) => {
		logger.failure("Error:", `"${request.url}" >`, getErrorMessage(error));
		return respond.error(error, 500);
	}
});
app.usePathRequest(BFF_CONFIG.route_path_sitemap, async () => {
	return respond.xml(await getSitemapXml(cache));
});
app.usePathRequest(BFF_CONFIG.route_path_rss, async () => {
	return respond.xml(await getRssXml(cache));
});
var getGtagCache = cacher_default.interval(cache, {
	key: "gtag",
	ttl: days(7),
	interval: days(3),
	retry: hours(1),
	getter: getGTagScript
});
app.usePathRequest(BFF_CONFIG.route_path_gtag_script, async () => {
	return respond.javascript(await getGtagCache());
});
var getWallpaperCache = cacher_default.interval(cache, {
	key: TunnelModule.BingWallpaper,
	ttl: days(1),
	interval: hours(6),
	retry: minutes(30),
	getter: getAllWallpapers
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.BingWallpaper}`, async () => {
	return respond.json(await getWallpaperCache());
});
var get163MusicCache = cacher_default.interval(cache, {
	key: TunnelModule.NetEaseMusic,
	ttl: days(2),
	interval: hours(12),
	retry: minutes(10),
	getter: getSongList
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.NetEaseMusic}`, async () => {
	return respond.json(await get163MusicCache());
});
var getThreadsProfileCache = cacher_default.interval(cache, {
	key: TunnelModule.ThreadsProfile,
	ttl: days(7),
	interval: hours(12),
	retry: hours(1),
	getter: getThreadsProfile
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsProfile}`, async () => {
	return respond.json(await getThreadsProfileCache());
});
var threadsMediasCache = {
	firstPage: cacher_default.interval(cache, {
		key: "threads_medias_page_first",
		ttl: hours(12),
		interval: minutes(20),
		retry: minutes(5),
		getter: getThreadsMedias
	}),
	paginate: (afterToken) => {
		return cacher_default.passive(cache, {
			key: `threads_medias_page_${afterToken}`,
			ttl: hours(12),
			getter: () => getThreadsMedias({ after: afterToken })
		});
	}
};
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMedias}`, async (context) => {
	const afterToken = context.query?.after;
	if (afterToken && typeof afterToken !== "string") return respond.error("Invalid params!", 400);
	return respond.json(afterToken ? await threadsMediasCache.paginate(afterToken) : await threadsMediasCache.firstPage());
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMediaChildren}`, async (context) => {
	const mediaId = context.query?.id;
	if (!mediaId || typeof mediaId !== "string") return respond.error("Invalid params!", 400);
	return respond.json(await cacher_default.passive(cache, {
		key: `threads_media_children_${mediaId}`,
		ttl: days(7),
		getter: () => getThreadsMediaChildren(mediaId)
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMediaConversation}`, async (context) => {
	const mediaId = context.query?.id;
	if (!mediaId || typeof mediaId !== "string") return respond.error("Invalid params!", 400);
	return respond.json(await cacher_default.passive(cache, {
		key: `threads_media_conversation_${mediaId}`,
		ttl: days(7),
		getter: () => getThreadsMediaConversation(mediaId)
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramProfile}`, async () => {
	return respond.json(await cacher_default.passive(cache, {
		key: TunnelModule.InstagramProfile,
		ttl: hours(12),
		getter: getInstagramProfile
	}));
});
var instagramMediasCache = {
	firstPage: cacher_default.interval(cache, {
		key: "instagram_medias_page_first",
		ttl: hours(12),
		interval: hours(3),
		retry: minutes(10),
		getter: getInstagramMedias
	}),
	paginate: (afterToken) => {
		return cacher_default.passive(cache, {
			key: `instagram_medias_page_${afterToken}`,
			ttl: hours(12),
			getter: () => getInstagramMedias({ after: afterToken })
		});
	}
};
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramMedias}`, async (context) => {
	const afterToken = context.query?.after;
	if (afterToken && typeof afterToken !== "string") return respond.error("Invalid params!", 400);
	const result = afterToken ? await instagramMediasCache.paginate(afterToken) : await instagramMediasCache.firstPage();
	return respond.json(result);
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramMediaChildren}`, async (context) => {
	const mediaId = context.query?.id;
	if (!mediaId || typeof mediaId !== "string") return respond.error("Invalid params!", 400);
	return respond.json(await cacher_default.passive(cache, {
		key: `instagram_media_children_${mediaId}`,
		ttl: days(7),
		getter: () => getInstagramMediaChildren(mediaId)
	}));
});
var getInsCalendarCache = cacher_default.interval(cache, {
	key: TunnelModule.InstagramCalendar,
	ttl: hours(36),
	interval: hours(18),
	retry: minutes(2),
	getter: getInstagramCalendar
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramCalendar}`, async () => {
	return respond.json(await getInsCalendarCache());
});
var getYouTubePlaylistsCache = cacher_default.interval(cache, {
	key: TunnelModule.YouTubePlaylist,
	ttl: days(3),
	interval: hours(24),
	retry: minutes(10),
	getter: getYouTubeChannelPlayLists
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.YouTubePlaylist}`, async () => {
	return respond.json(await getYouTubePlaylistsCache());
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.YouTubeVideoList}`, async (context) => {
	const playlistId = context.query?.id;
	if (!playlistId || typeof playlistId !== "string") return respond.error("Invalid params!", 400);
	return respond.json(await cacher_default.passive(cache, {
		key: `youtube_playlist_${playlistId}`,
		ttl: hours(1),
		getter: () => getYouTubeVideoListByPlayerListId(playlistId)
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.GitHubSponsors}`, async () => {
	return respond.json(await cacher_default.passive(cache, {
		key: TunnelModule.GitHubSponsors,
		ttl: hours(4),
		getter: getGitHubSponsors
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.GitHubContributions}`, async () => {
	return respond.json(await cacher_default.passive(cache, {
		key: TunnelModule.GitHubContributions,
		ttl: hours(4),
		getter: getGitHubContributions
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.StatisticsGitHubJson}`, async () => {
	return respond.json(await cacher_default.passive(cache, {
		key: TunnelModule.StatisticsGitHubJson,
		ttl: hours(8),
		getter: getGitHubStatistics
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.StatisticsNpmJson}`, async () => {
	return respond.json(await cacher_default.passive(cache, {
		key: TunnelModule.StatisticsNpmJson,
		ttl: hours(8),
		getter: getNPMStatistics
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.DoubanMovies}`, async () => {
	return respond.json(await cacher_default.passive(cache, {
		key: TunnelModule.DoubanMovies,
		ttl: days(3),
		getter: getDoubanMovies
	}));
});
app.usePathRequest(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.MyGoogleMap}`, async () => {
	return respond.json(await cacher_default.passive(cache, {
		key: TunnelModule.MyGoogleMap,
		ttl: hours(6),
		getter: getMyGoogleMap
	}));
});
if (isNodeProd) {
	const { default: sirv } = await import("sirv");
	app.useConnectMiddleware(sirv(PUBLIC_PATH, { etag: true }));
	const { render } = await createProdRenderer(cache);
	app.useWildRequest((context) => render(context));
} else {
	const { render, viteServer } = await createDevRenderer(cache);
	app.useConnectMiddleware(viteServer.middlewares);
	app.useWildRequest((context) => render(context));
}
app.listen(BFF_CONFIG.server_port, (addressInfo) => {
	logger.success(`${APP_PROFILE.title} app is running!`, `| env: ${NODE_ENV}`, `| port: ${addressInfo.port}`, `| address: ${addressInfo.address}`, `| ${(/* @__PURE__ */ new Date()).toLocaleString()}`);
});
export { logger };
