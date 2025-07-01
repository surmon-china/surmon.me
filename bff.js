import "@dotenvx/dotenvx/config";
import path from "path";
import RSS from "rss";
import _axios, { isAxiosError } from "axios";
import { HttpsAgent, HttpAgent } from "agentkeepalive";
import { Readable } from "stream";
import { SitemapStream, EnumChangefreq, streamToPromise } from "sitemap";
import WonderfulBingWallpaper from "wonderful-bing-wallpaper";
import { XMLParser } from "fast-xml-parser";
import yargsArgv from "yargs-parser";
import fs from "fs";
import _isObject from "lodash-es/isObject.js";
import crypto from "crypto";
import http from "http";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { LRUCache } from "lru-cache";
import { createClient } from "@redis/client";
import https from "https";
import { pipeline } from "stream/promises";
const BFF_CONFIG = Object.freeze({
  server_port: 3e3,
  server_local_url: "http://localhost:3000",
  tunnel_url_prefix: "/_tunnel",
  proxy_url_prefix: "/_proxy",
  proxy_allow_list_regexp: /^https:\/\/([a-z0-9-]+\.)*surmon\.(me|cn)/
});
const APP_META = Object.freeze({
  title: "Surmon.me",
  zh_sub_title: "斯是陋室，唯吾芳馨",
  en_sub_title: `Surmon's digital vihara`,
  zh_description: "本是浪蝶游蜂，无智无德无明；幸闻佛道开化，志利有情众生",
  zh_description_short: "本为蝶蜂，无德无明；幸闻佛道，志利众生",
  en_description: "Either write something worth reading or do something worth writing.",
  url: "https://surmon.me",
  domain: "surmon.me",
  author: "Surmon",
  about_page_geo_zh_title: "长居亚洲，游走热带",
  about_page_geo_en_title: "UTC +07:00 ~ +09:00",
  about_page_geo_coordinates: [103.830391822121, 1.340863]
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
  GITHUB_USER_NAME: "surmon-china",
  INSTAGRAM_USERNAME: "surmon_sattva",
  BTC_ADDRESS: "bc1qhpdu03tnexkj4xsm3lqzyjdddz6z0rj2n7fsze",
  ETH_ADDRESS: "0xaD556974D449126efdeF23f4FF581861C301cB77"
});
const VALUABLE_LINKS = Object.freeze({
  RSS: "/rss.xml",
  SITE_MAP: "/sitemap.xml",
  UPTIME_STATUS: "https://redirect.surmon.me/status",
  NPM_HOMEPAGE: "https://www.npmjs.com/~surmon",
  PAYPAL: "https://paypal.me/surmon",
  GITHUB_SPONSORS: `https://github.com/sponsors/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB: `https://github.com/${IDENTITIES.GITHUB_USER_NAME}`,
  GITHUB_SURMON_ME: "https://github.com/surmon-china/surmon.me",
  GITHUB_NODEPRESS: "https://github.com/surmon-china/nodepress",
  GITHUB_SURMON_ME_NATIVE: "https://github.com/surmon-china/surmon.me.native",
  GITHUB_BLOG_STAR_LIST: "https://github.com/stars/surmon-china/lists/surmon-me",
  MARKDOWN: "https://daringfireball.net/projects/markdown/",
  GOOGLE_MY_MAP: `https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&z=3`,
  GOOGLE_MY_MAP_KML: `https://www.google.com/maps/d/u/0/kml?forcekml=1&mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w`,
  DISCORD_GROUP: "https://redirect.surmon.me/discord-server",
  TELEGRAM_GROUP: "https://redirect.surmon.me/telegram-group",
  MUSIC_163: `https://music.163.com/#/playlist?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`,
  YOUTUBE_CHANNEL: `https://www.youtube.com/${IDENTITIES.YOUTUBE_CHANNEL_SHORT_ID}`,
  TELEGRAM: "https://t.me/surmon",
  OPENSEA: "https://opensea.io/Surmon",
  XIAOHONGSHU: `https://www.xiaohongshu.com/user/profile/5f2f68cc0000000001001ad5`,
  ZHIHU: `https://www.zhihu.com/people/${IDENTITIES.ZHIHU_USERNAME}/answers`,
  DOUBAN: "https://www.douban.com/people/nocower",
  DOUBAN_MOVIE: `https://movie.douban.com/people/nocower/collect`,
  LINKEDIN: "https://www.linkedin.com/in/surmon",
  TWITTER: "https://x.com/surmon7788",
  INSTAGRAM: `https://www.instagram.com/${IDENTITIES.INSTAGRAM_USERNAME}`,
  THREADS: `https://www.threads.net/@${IDENTITIES.INSTAGRAM_USERNAME}`,
  THREADS_FOLLOW: `https://www.threads.net/intent/follow?username=${IDENTITIES.INSTAGRAM_USERNAME}`
});
const NODE_ENV = process.env.NODE_ENV;
const isNodeDev = process.env.NODE_ENV === "development";
const isNodeProd = process.env.NODE_ENV === "production";
const ROOT_PATH = process.cwd();
const DIST_PATH = path.join(ROOT_PATH, "dist");
const PROD_CLIENT_PATH = path.join(DIST_PATH, "client");
const PROD_SERVER_PATH = path.join(DIST_PATH, "server");
const PUBLIC_PATH = isNodeDev ? path.join(ROOT_PATH, "public") : PROD_CLIENT_PATH;
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const INTERNAL_SERVER_ERROR = 500;
const GATEWAY_TIMEOUT = 504;
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
  TunnelModule2["StatisticGitHubJson"] = "statistic_github_json";
  TunnelModule2["StatisticNpmJson"] = "statistic_npm_json";
  return TunnelModule2;
})(TunnelModule || {});
const axios = _axios.create({
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
const STATIC_URL = process.env.VITE_STATIC_URL;
const API_ONLINE_URL = process.env.VITE_API_ONLINE_URL;
const API_LOCAL_URL = process.env.VITE_API_LOCAL_URL;
const NODEPRESS_API_URL = isNodeDev ? API_LOCAL_URL : API_ONLINE_URL;
const getTagURL = (tag) => `${APP_META.url}/tag/${tag}`;
const getCategoryURL = (category) => `${APP_META.url}/category/${category}`;
const getArticleURL = (id) => `${APP_META.url}/article/${id}`;
const getPageURL = (page) => `${APP_META.url}/${page}`;
const getRssXml = async () => {
  const api = `${NODEPRESS_API_URL}/archive`;
  const response = await axios.get(api, { timeout: 6e3 });
  const archive = response.data.result;
  const feed = new RSS({
    title: APP_META.title,
    description: APP_META.zh_sub_title,
    site_url: APP_META.url,
    feed_url: `${APP_META.url}/rss.xml`,
    image_url: `${APP_META.url}/icon.png`,
    managingEditor: APP_META.author,
    webMaster: APP_META.author,
    generator: `${APP_META.domain}`,
    categories: archive.categories.map((category) => category.slug),
    copyright: `${(/* @__PURE__ */ new Date()).getFullYear()} ${APP_META.title}`,
    language: "zh",
    ttl: 60
  });
  archive.articles.forEach((article) => {
    return feed.item({
      title: article.title,
      description: article.description,
      url: getArticleURL(article.id),
      guid: String(article.id),
      categories: article.categories.map((category) => category.slug),
      author: APP_META.author,
      date: article.created_at,
      enclosure: {
        url: article.thumbnail
      }
    });
  });
  return feed.xml({ indent: true });
};
const getSitemapXml = async () => {
  const api = `${NODEPRESS_API_URL}/archive`;
  const response = await axios.get(api, { timeout: 6e3 });
  const archive = response.data.result;
  const sitemapStream = new SitemapStream({
    hostname: APP_META.url
  });
  const sitemapItemList = [
    { url: APP_META.url, changefreq: EnumChangefreq.ALWAYS, priority: 1 },
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
  archive.categories.forEach((category) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getCategoryURL(category.slug)
    });
  });
  archive.tags.forEach((tag) => {
    sitemapItemList.push({
      priority: 0.6,
      changefreq: EnumChangefreq.DAILY,
      url: getTagURL(tag.slug)
    });
  });
  archive.articles.forEach((article) => {
    sitemapItemList.push({
      priority: 0.8,
      changefreq: EnumChangefreq.DAILY,
      url: getArticleURL(article.id),
      lastmodISO: new Date(article.updated_at).toISOString()
    });
  });
  return streamToPromise(Readable.from(sitemapItemList).pipe(sitemapStream)).then((data) => {
    return data.toString();
  });
};
const getGaScriptURL = (measurementId) => {
  return `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
};
const getGTagScript = async () => {
  const url = getGaScriptURL(IDENTITIES.GOOGLE_ANALYTICS_MEASUREMENT_ID);
  const response = await axios.get(url, { timeout: 6e3 });
  return response.data;
};
const getWallpapers = async (params) => {
  try {
    const wbw = new WonderfulBingWallpaper();
    const wallpaperJSON = await wbw.getWallpapers({ ...params, size: 8 });
    return wbw.humanizeWallpapers(wallpaperJSON);
  } catch (error) {
    throw "wallpaper parsing JSON failed: " + String(error);
  }
};
const getZHWallpapers = () => {
  return getWallpapers({
    local: "zh-CN",
    host: "cn.bing.com",
    ensearch: 0
  });
};
const getENWallpapers = () => {
  return getWallpapers({
    local: "en-US",
    host: "bing.com",
    ensearch: 1
  });
};
const getAllWallpapers = async () => {
  const [zh, en] = await Promise.all([getZHWallpapers(), getENWallpapers()]);
  return { zh, en };
};
const getMyGoogleMap = () => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    allowBooleanAttributes: true,
    attributeNamePrefix: "@"
  });
  return axios.get(VALUABLE_LINKS.GOOGLE_MY_MAP_KML, { timeout: 6e3 }).then((response) => parser.parse(response.data).kml.Document);
};
const argv = yargsArgv(process.argv.slice(2));
const YOUTUBE_API_KEY = argv.youtube_token;
const INSTAGRAM_TOKEN = argv.instagram_token;
const THREADS_TOKEN = argv.threads_token;
const THREADS_MEDIA_FULL_FIELDS = `id,media_product_type,media_type,media_url,permalink,owner,username,text,timestamp,shortcode,thumbnail_url,children,is_quote_post`;
const getThreadsMedias = async (options) => {
  try {
    const uri = "https://graph.threads.net/v1.0/me/threads";
    const params = {
      access_token: THREADS_TOKEN,
      fields: options?.fields ?? THREADS_MEDIA_FULL_FIELDS,
      // MARK: max 100
      limit: options?.limit ?? 24
    };
    if (options?.since) {
      params.since = options.since;
    }
    if (options?.after) {
      params.after = options.after;
    }
    const response = await axios.get(uri, { timeout: 8e3, params });
    return {
      ...response.data,
      paging: {
        cursors: response.data.paging?.cursors
        // MARK: remove `next` & `previous`
      }
    };
  } catch (error) {
    throw isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error;
  }
};
const getThreadsMediaChildren = (threadsMediaId) => {
  const uri = `https://graph.threads.net/v1.0/${threadsMediaId}`;
  const params = {
    access_token: THREADS_TOKEN,
    fields: THREADS_MEDIA_FULL_FIELDS
  };
  return axios.get(uri, { timeout: 8e3, params }).then((response) => response.data).catch((error) => {
    return Promise.reject(isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error);
  });
};
const getThreadsMediaConversation = (threadsMediaId) => {
  const uri = `https://graph.threads.net/v1.0/${threadsMediaId}/conversation`;
  const params = {
    access_token: THREADS_TOKEN,
    reverse: false,
    fields: `id,text,username,permalink,timestamp,media_type,media_url,shortcode,thumbnail_url,children,is_quote_post,has_replies,root_post,replied_to,is_reply,is_reply_owned_by_me,reply_audience`
  };
  return axios.get(uri, { timeout: 8e3, params }).then((response) => response.data).catch((error) => {
    return Promise.reject(isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error);
  });
};
const getThreadsUserProfile = async () => {
  try {
    const uri = "https://graph.threads.net/v1.0/me";
    const fields = "id,username,name,threads_profile_picture_url,threads_biography";
    const response = await axios.get(uri, {
      params: { access_token: THREADS_TOKEN, fields },
      timeout: 8e3
    });
    return {
      id: response.data.id,
      name: response.data.name,
      username: response.data.username,
      avatar: response.data.threads_profile_picture_url,
      biography: response.data.threads_biography
    };
  } catch (error) {
    throw isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error;
  }
};
const getThreadsUserInsights = async () => {
  try {
    const uri = "https://graph.threads.net/v1.0/me/threads_insights";
    const metric = "likes,reposts,quotes,followers_count";
    const response = await axios.get(uri, {
      params: { access_token: THREADS_TOKEN, metric },
      timeout: 8e3
    });
    return {
      totalLikes: response.data.data[0].total_value.value,
      totalReposts: response.data.data[1].total_value.value,
      totalQuotes: response.data.data[2].total_value.value,
      followersCount: response.data.data[3].total_value.value
    };
  } catch (error) {
    throw isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error;
  }
};
const getThreadsProfile = async () => {
  const [userProfile, userInsights] = await Promise.all([getThreadsUserProfile(), getThreadsUserInsights()]);
  return {
    ...userProfile,
    ...userInsights
  };
};
const getInstagramMedias = async (options) => {
  try {
    const defaultFields = `id,username,permalink,caption,media_type,media_url,thumbnail_url,timestamp`;
    const params = {
      access_token: INSTAGRAM_TOKEN,
      fields: options?.fields ?? defaultFields,
      // MARK: max 100
      limit: options?.limit ?? 24
    };
    if (options?.since) {
      params.since = options.since;
    }
    if (options?.after) {
      params.after = options.after;
    }
    const response = await axios.get("https://graph.instagram.com/me/media", {
      timeout: 8e3,
      params
    });
    return response.data;
  } catch (error) {
    throw isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error;
  }
};
const getInstagramMediaChildren = (mediaId) => {
  const url = `https://graph.instagram.com/${mediaId}/children`;
  const params = {
    access_token: INSTAGRAM_TOKEN,
    fields: `id,media_type,media_url,thumbnail_url,timestamp`
  };
  return axios.get(url, { timeout: 8e3, params }).then((response) => response.data.data).catch((error) => {
    return Promise.reject(isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error);
  });
};
async function fetchAllMedias({
  since,
  after,
  medias = [],
  onSucceeded,
  onFailed
}) {
  try {
    const result = await getInstagramMedias({
      fields: "id,timestamp",
      limit: 100,
      since,
      after
    });
    if (result.paging.next) {
      await fetchAllMedias({
        since,
        after: result.paging.cursors.after,
        medias: [...medias, ...result.data],
        onSucceeded,
        onFailed
      });
    } else {
      onSucceeded?.([...medias, ...result.data]);
    }
  } catch (error) {
    onFailed?.(error);
  }
}
const getInstagramCalendar = () => {
  return new Promise((resolve, reject) => {
    const today = /* @__PURE__ */ new Date();
    today.setDate(1);
    today.setFullYear(today.getFullYear() - 1);
    const prevYearToday = Math.round(today.getTime() / 1e3);
    fetchAllMedias({
      since: prevYearToday,
      onFailed: reject,
      onSucceeded: (medias) => {
        const mediaMap = medias.reduce((accumulator, media) => {
          const key = media.timestamp.slice(0, 10);
          return accumulator.set(key, (accumulator.get(key) || 0) + 1);
        }, /* @__PURE__ */ new Map());
        resolve(Array.from(mediaMap, ([date, count]) => ({ date, count })));
      }
    });
  });
};
const getInstagramProfile = () => {
  const params = {
    access_token: INSTAGRAM_TOKEN,
    fields: `id,username,account_type,media_count`
  };
  return axios.get(`https://graph.instagram.com/me`, { timeout: 8e3, params }).then((response) => response.data).catch((error) => {
    return Promise.reject(isAxiosError(error) ? error.response?.data?.error ?? error.toJSON() : error);
  });
};
const getYouTubeChannelPlayLists = async () => {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlists`, {
    timeout: 8e3,
    params: {
      part: "snippet,contentDetails",
      maxResults: 50,
      channelId: IDENTITIES.YOUTUBE_CHANNEL_ID,
      key: YOUTUBE_API_KEY
    }
  });
  return response.data.items;
};
const getYouTubeVideoListByPlayerListId = async (playlistId) => {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, {
    timeout: 8e3,
    params: {
      part: "snippet,contentDetails",
      maxResults: 50,
      playlistId,
      key: YOUTUBE_API_KEY
    }
  });
  return response.data.items;
};
const fetchGitHubStatisticJSON = async (fileName) => {
  const url = `https://raw.githubusercontent.com/${IDENTITIES.GITHUB_USER_NAME}/${IDENTITIES.GITHUB_USER_NAME}/release/${fileName}`;
  const response = await axios.get(url, { timeout: 6e3 });
  return response.data;
};
const getGitHubStatistic = () => {
  return fetchGitHubStatisticJSON("github.json").then((data) => ({
    followerCount: data.userinfo.followers,
    followingCount: data.userinfo.following,
    gistCount: data.userinfo.public_gists,
    repositoryCount: data.userinfo.public_repos,
    organizationCount: data.organizations.length,
    totalStarCount: data.statistics.stars,
    totalCodeSize: data.statistics.size
  }));
};
const getGitHubSponsors = () => {
  return fetchGitHubStatisticJSON("github.sponsors.json");
};
const getGitHubContributions = () => {
  return fetchGitHubStatisticJSON("github.contributions.json");
};
const getNPMStatistic = async () => {
  const data = await fetchGitHubStatisticJSON("npm.json");
  const totalPackages = data ? Object.keys(data.downloads).length : 0;
  const totalDownloads = data ? Object.values(data.downloads).reduce((p, c) => p + c, 0) : 0;
  const averageScore = (() => {
    const packages = data?.packages;
    if (!packages?.length) {
      return 0;
    }
    const totalScore = packages.reduce((p, c) => p + c.score.final, 0);
    return (totalScore / packages.length).toFixed(3);
  })();
  return {
    totalPackages,
    totalDownloads,
    averageScore
  };
};
const getDoubanMovies = async () => {
  const api = `https://m.douban.com/rexxar/api/v2/user/${IDENTITIES.DOUBAN_USER_ID}/collection_stats?type=movie&for_mobile=1`;
  const referer = `https://m.douban.com/people/${IDENTITIES.DOUBAN_USER_ID}/movie_charts`;
  const response = await axios.get(api, {
    timeout: 1e3 * 12,
    headers: { Referer: referer }
  });
  return response.data;
};
const PLAY_LIST_LIMIT = 168;
const getSongList = async () => {
  const playlistURL = `https://music.163.com/api/v6/playlist/detail?id=${IDENTITIES.MUSIC_163_BGM_ALBUM_ID}`;
  const playlistDetail = await axios.get(playlistURL, { timeout: 6e3 });
  if (playlistDetail.data.code < 0) {
    throw new Error(playlistDetail.data.message);
  }
  const trackIds = playlistDetail.data.playlist?.trackIds || [];
  const idsParams = trackIds.slice(0, PLAY_LIST_LIMIT).map((id) => `{id:${id.id}}`).join(",");
  const songListURL = `https://music.163.com/api/v3/song/detail?c=[${idsParams}]`;
  const songListDetail = await axios.get(songListURL, { timeout: 6e3 });
  if (!songListDetail.data.songs) {
    throw new Error(songListDetail.data);
  }
  const songs = songListDetail.data.songs || [];
  return songs.filter((song) => !song.noCopyrightRcmd).slice(0, PLAY_LIST_LIMIT).map((song) => ({
    id: song.id,
    duration: song.dt,
    name: song.name,
    album: song.al?.name || "-",
    artist: (song.ar || []).map((artist) => artist.name).join(" / "),
    cover_art_url: song.al?.picUrl,
    // https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e8%8e%b7%e5%8f%96%e9%9f%b3%e4%b9%90-url
    url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
  }));
};
const createRequestContext = (request) => {
  return {
    headers: request.headers,
    cookies: request.cookies,
    url: request.originalUrl
  };
};
const resolveTemplate = ({ template, appHTML, headHTML, bodyScripts }) => {
  return template.replace(/<title>[\s\S]*<\/title>/, "").replace("<html>", () => `<html${headHTML.htmlAttrs}>`).replace("<body>", () => `<body${headHTML.bodyAttrs}>`).replace("<body>", () => `<body>${headHTML.bodyTagsOpen ? `
${headHTML.bodyTagsOpen}` : ``}`).replace("</head>", () => `${headHTML.headTags}
</head>`).replace("</body>", () => `${headHTML.bodyTags}
</body>`).replace("</body>", () => `${bodyScripts}
</body>`).replace(`<!--app-html-->`, () => appHTML);
};
const enableDevRenderer = async (app, cache) => {
  const vite = await import("vite");
  const viteServer = await vite.createServer({
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
  app.use(viteServer.middlewares);
  app.get("*all", async (request, response) => {
    const template = await viteServer.transformIndexHtml(
      request.originalUrl,
      fs.readFileSync(path.resolve(ROOT_PATH, "index.html"), "utf-8")
    );
    const { renderApp, renderError } = await viteServer.ssrLoadModule("/src/ssr.ts");
    const sendRenderedResponse = (rendered) => {
      response.status(rendered.code);
      response.set({ "Content-Type": "text/html" });
      response.end(
        resolveTemplate({
          template,
          appHTML: rendered.appHTML,
          headHTML: rendered.headHTML,
          bodyScripts: `${rendered.stateScripts}
${rendered.contextScripts}`
        })
      );
    };
    try {
      sendRenderedResponse(await renderApp(createRequestContext(request), cache));
    } catch (error) {
      viteServer.ssrFixStacktrace(error);
      sendRenderedResponse(await renderError(createRequestContext(request), error));
    }
  });
};
const getManifestFlatFiles = (manifest) => {
  const files = /* @__PURE__ */ new Set();
  Object.values(manifest).forEach((item) => {
    files.add(item.file);
    item.css?.forEach((css) => files.add(css));
    item.imports?.forEach((imports) => files.add(imports));
    item.dynamicImports?.forEach((dynamicImports) => files.add(dynamicImports));
  });
  return Array.from(files);
};
const resolveAssetsPrefix = (html, manifestFiles, filePrefix) => {
  return manifestFiles.reduce((result, file) => {
    return result.replace(new RegExp(`(href|src)="/${file}"`, "g"), `$1="${filePrefix}/${file}"`);
  }, html);
};
const enableProdRenderer = async (app, cache) => {
  const template = fs.readFileSync(path.resolve(DIST_PATH, "template.html"), "utf-8");
  const manifest = fs.readFileSync(path.resolve(DIST_PATH, "manifest.json"), "utf-8");
  const manifestJSON = JSON.parse(manifest);
  const manifestFiles = getManifestFlatFiles(manifestJSON);
  const { renderApp, renderError } = await import(path.resolve(PROD_SERVER_PATH, "ssr.js"));
  const sendRenderedResponse = (response, rendered) => {
    response.status(rendered.code);
    response.set({ "Content-Type": "text/html" });
    response.end(
      resolveTemplate({
        template: resolveAssetsPrefix(template, manifestFiles, rendered.assetsPrefix),
        appHTML: rendered.appHTML,
        headHTML: rendered.headHTML,
        bodyScripts: `${rendered.stateScripts}
${rendered.contextScripts}`
      })
    );
  };
  app.get("*all", async (request, response) => {
    const requestContext = createRequestContext(request);
    try {
      sendRenderedResponse(response, await renderApp(requestContext, cache));
    } catch (error) {
      sendRenderedResponse(response, await renderError(requestContext, error));
    }
  });
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
const logger$4 = createLogger("BFF");
const getErrorMessage = (_error) => {
  const error = isAxiosError(_error) ? _error.toJSON() : _error;
  return typeof error === "string" ? error : error instanceof Error || _isObject(error) ? error.message || error?.name : JSON.stringify(error);
};
const handleError = (response, { code, message }) => {
  logger$4.failure(`Error:`, isAxiosError(message) ? message.toJSON() : message);
  response.status(code ?? INTERNAL_SERVER_ERROR);
  response.send(getErrorMessage(message));
};
const responder = (promise) => {
  return (_, response) => {
    promise().then((data) => response.send(data)).catch((error) => handleError(response, { message: error }));
  };
};
const logger$3 = createLogger("BFF:Cacher");
const minutes = (m) => m * 60;
const hours = (h) => h * minutes(60);
const days = (d) => d * hours(24);
const humanizeSeconds = (s) => {
  const hours2 = Math.floor(s / 3600);
  const minutes2 = Math.floor(s % 3600 / 60);
  const seconds = s % 60;
  const formattedHours = hours2 > 0 ? `${hours2}h ` : "";
  const formattedMinutes = minutes2 > 0 ? `${minutes2}m ` : "";
  const formattedSeconds = seconds > 0 ? `${seconds}s` : "";
  return formattedHours + formattedMinutes + formattedSeconds;
};
const getCacheKey = (key) => `bff:${key}`;
const getLockCacheKey = (key) => `bff:interval-lock:${key}`;
const execute = async (cache, options) => {
  const data = await options.getter();
  await cache.set(options.key, data, options.ttl);
  return data;
};
const passive = async (cache, opts) => {
  const options = { ...opts, key: getCacheKey(opts.key) };
  if (await cache.has(options.key)) {
    return await cache.get(options.key);
  }
  try {
    const result = await execute(cache, options);
    logger$3.success("passive succeed:", `"${opts.key}" | ttl: ${humanizeSeconds(options.ttl)}`);
    return result;
  } catch (error) {
    logger$3.failure(
      "passive failure:",
      `"${opts.key}"`,
      `| ttl: ${humanizeSeconds(options.ttl)}`,
      `| "${getErrorMessage(error)}"`
    );
    return Promise.reject(error);
  }
};
const UNIQUE_INTERVAL_LOCK_ID = crypto.randomBytes(8).toString("hex");
const interval = (cache, opts) => {
  const options = { ...opts, key: getCacheKey(opts.key) };
  const intervalLockKey = getLockCacheKey(opts.key);
  const execInterval = async (succeedCount = 0, failureCount = 0) => {
    const lock = await cache.get(intervalLockKey);
    const executable = !lock || lock === UNIQUE_INTERVAL_LOCK_ID;
    try {
      if (executable) {
        await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID);
        await execute(cache, options);
        ++succeedCount;
        logger$3.success(
          "interval succeed:",
          `${failureCount}/${succeedCount}`,
          `| "${opts.key}"`,
          `| ttl: ${humanizeSeconds(options.ttl)}`,
          `| next: ${humanizeSeconds(options.interval)}`
        );
        await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID, options.interval + 2);
      } else {
      }
      setTimeout(() => execInterval(succeedCount, failureCount), options.interval * 1e3);
    } catch (error) {
      ++failureCount;
      logger$3.failure(
        "interval failure:",
        `${failureCount}/${succeedCount}`,
        `| "${opts.key}"`,
        `| retry: ${humanizeSeconds(options.retry)}`,
        `| "${getErrorMessage(error)}"`
      );
      setTimeout(() => execInterval(succeedCount, failureCount), options.retry * 1e3);
      await cache.set(intervalLockKey, UNIQUE_INTERVAL_LOCK_ID, options.retry + 2);
    }
  };
  execInterval();
  return async () => {
    if (await cache.has(options.key)) {
      return await cache.get(options.key);
    } else {
      throw `No cached data for "${opts.key}".`;
    }
  };
};
const cacher = {
  passive,
  interval
};
const logger$2 = createLogger("BFF:Cache");
const createLRUStore = () => {
  const lruCache = new LRUCache({ max: 500 });
  const set = async (key, value, ttl) => {
    if (ttl) {
      await lruCache.set(key, value, { ttl: ttl * 1e3 });
    } else {
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
const createRedisStore = async (options) => {
  const client = createClient();
  client.on("connect", () => logger$2.info("Redis connecting..."));
  client.on("reconnecting", () => logger$2.info("Redis reconnecting..."));
  client.on("ready", () => logger$2.success("Redis readied."));
  client.on("error", (error) => logger$2.failure("Redis client error!", error.message || error));
  await client.connect();
  const getCacheKey2 = (key) => {
    const _namespace = options?.namespace ?? "ssr_app";
    return `${_namespace}:${key}`;
  };
  const set = async (key, value, ttl) => {
    const _value = value ? JSON.stringify(value) : "";
    if (ttl) {
      await client.set(getCacheKey2(key), _value, { expiration: { type: "EX", value: ttl } });
    } else {
      await client.set(getCacheKey2(key), _value);
    }
  };
  const get = async (key) => {
    const value = await client.get(getCacheKey2(key));
    return value ? JSON.parse(value) : value;
  };
  const has = async (key) => {
    const value = await client.exists(getCacheKey2(key));
    return Boolean(value);
  };
  const del = (key) => client.del(getCacheKey2(key));
  const clear = async () => {
    const keys = await client.keys(getCacheKey2("*"));
    if (keys.length) {
      await client.del(keys);
    }
  };
  return { set, get, has, del, clear };
};
const createCacheStore = async (options) => {
  let cacheStore = null;
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
const base64Encode = btoa;
const base64Decode = atob;
const base64UrlEncode = (value) => {
  return base64Encode(value).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
};
const base64UrlDecode = (value) => {
  try {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
    return base64Decode(paddedBase64);
  } catch (error) {
    throw new Error("Illegal Base64URL string!");
  }
};
const logger$1 = createLogger("BFF:Proxy");
const PROXY_ROUTE_PATH = `${BFF_CONFIG.proxy_url_prefix}/*url`;
const PROXY_REQUEST_TIMEOUT = 1e4;
const RESPONSE_TIMEOUT = 15e3;
const PROXY_UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3223.8 Safari/";
const getProxyUrlFromRequest = (request) => base64UrlDecode(String(request.params.url));
const makeRedirectLocation = (location) => `${BFF_CONFIG.proxy_url_prefix}/${base64UrlEncode(location)}`;
const proxifier = () => {
  return async (request, response) => {
    let targetURL = null;
    let parsedURL = null;
    const sendError = (message, statusCode = INTERNAL_SERVER_ERROR) => {
      if (!response.headersSent) {
        response.writeHead(statusCode, { "Content-Type": "text/plain" });
      }
      response.end(`Proxy error: ${message}`);
    };
    try {
      targetURL = getProxyUrlFromRequest(request);
      response.setHeader("x-original-url", targetURL);
      parsedURL = new URL(targetURL);
    } catch (error) {
      sendError(error?.message || "Invalid target URL", BAD_REQUEST);
      return;
    }
    if (parsedURL.hostname.endsWith(APP_META.domain)) {
      if (parsedURL.hostname !== new URL(STATIC_URL).hostname) {
        sendError("Invalid internal URL", BAD_REQUEST);
        return;
      }
    }
    if (isNodeProd) {
      const origin = request.headers.origin;
      const referer = request.headers.referrer || request.headers.referer;
      const isAllowedReferer = !referer || BFF_CONFIG.proxy_allow_list_regexp.test(referer);
      const isAllowedOrigin = !origin || BFF_CONFIG.proxy_allow_list_regexp.test(origin);
      if (!isAllowedReferer || !isAllowedOrigin) {
        sendError("Forbidden", FORBIDDEN);
        return;
      }
    }
    const isHttps = parsedURL.protocol === "https:";
    const requestLib = isHttps ? https : http;
    const proxyRequest = requestLib.request(
      {
        protocol: parsedURL.protocol,
        hostname: parsedURL.hostname,
        path: parsedURL.pathname + (parsedURL.search || ""),
        port: parsedURL.port,
        method: request.method,
        headers: {
          ...request.headers,
          host: parsedURL.hostname,
          "user-agent": PROXY_UA
        }
      },
      async (proxyResponse) => {
        const statusCode = proxyResponse.statusCode || INTERNAL_SERVER_ERROR;
        if ([301, 302, 307, 308].includes(statusCode)) {
          const location = proxyResponse.headers.location;
          if (location) {
            proxyResponse.headers.location = makeRedirectLocation(location);
          }
        }
        if (statusCode === 200 && !proxyResponse.headers["cache-control"]) {
          proxyResponse.headers["cache-control"] = "public, max-age=31536000";
        }
        response.writeHead(proxyResponse.statusCode || INTERNAL_SERVER_ERROR, proxyResponse.headers);
        try {
          await pipeline(proxyResponse, response);
        } catch (error) {
          sendError(error.message);
        }
      }
    );
    proxyRequest.on("error", (error) => {
      logger$1.failure(`Request failed: ${error.message} > ${targetURL}`);
      sendError(error.message);
    });
    proxyRequest.setTimeout(PROXY_REQUEST_TIMEOUT, () => {
      logger$1.failure(`Proxy request timeout: ${parsedURL.href}`);
      proxyRequest.destroy();
      sendError("Proxy request timeout", GATEWAY_TIMEOUT);
    });
    response.setTimeout(RESPONSE_TIMEOUT, () => {
      if (!response.headersSent && !response.writableEnded) {
        logger$1.debug(`Response timeout`);
        sendError("Response timeout", GATEWAY_TIMEOUT);
      }
    });
    try {
      await pipeline(request, proxyRequest);
    } catch (error) {
      sendError(error.message);
    }
  };
};
const createExpressApp = async () => {
  const app = express();
  const server = http.createServer(app);
  app.use(express.json());
  app.use(cookieParser());
  app.use(compression());
  app.use(express.static(PUBLIC_PATH));
  app.get(PROXY_ROUTE_PATH, proxifier());
  const cache = await createCacheStore({
    namespace: APP_META.domain.replace(/\./gi, "_")
  });
  return {
    app,
    server,
    cache
  };
};
const logger = createLogger("BFF");
createExpressApp().then(async ({ app, server, cache }) => {
  app.get("/sitemap.xml", async (_, response) => {
    try {
      response.header("Content-Type", "application/xml");
      response.send(await getSitemapXml());
    } catch (error) {
      handleError(response, { message: error });
    }
  });
  app.get("/rss.xml", async (_, response) => {
    try {
      response.header("Content-Type", "application/xml");
      response.send(await getRssXml());
    } catch (error) {
      handleError(response, { message: error });
    }
  });
  const getGtagCache = cacher.interval(cache, {
    key: "gtag",
    ttl: days(7),
    interval: days(3),
    retry: hours(1),
    getter: getGTagScript
  });
  app.get("/gtag-script", async (_, response) => {
    try {
      response.header("Content-Type", "text/javascript");
      response.send(await getGtagCache());
    } catch (error) {
      handleError(response, { message: error });
    }
  });
  const getWallpaperCache = cacher.interval(cache, {
    key: TunnelModule.BingWallpaper,
    ttl: days(1),
    interval: hours(6),
    retry: minutes(30),
    getter: getAllWallpapers
  });
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.BingWallpaper}`,
    responder(() => getWallpaperCache())
  );
  const get163MusicCache = cacher.interval(cache, {
    key: TunnelModule.NetEaseMusic,
    ttl: days(2),
    interval: hours(12),
    retry: minutes(10),
    getter: getSongList
  });
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.NetEaseMusic}`,
    responder(() => get163MusicCache())
  );
  const getThreadsProfileCache = cacher.interval(cache, {
    key: TunnelModule.ThreadsProfile,
    ttl: days(7),
    interval: hours(12),
    retry: hours(1),
    getter: getThreadsProfile
  });
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsProfile}`,
    responder(() => getThreadsProfileCache())
  );
  const getThreadsFirstPageMediasCache = cacher.interval(cache, {
    key: "threads_medias_page_first",
    ttl: hours(12),
    interval: minutes(20),
    retry: minutes(5),
    getter: getThreadsMedias
  });
  app.get(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMedias}`, (request, response, next) => {
    const afterToken = request.query.after;
    if (afterToken && typeof afterToken !== "string") {
      handleError(response, { code: BAD_REQUEST, message: "Invalid params" });
      return;
    }
    responder(() => {
      return !afterToken ? getThreadsFirstPageMediasCache() : cacher.passive(cache, {
        key: `threads_medias_page_${afterToken}`,
        ttl: hours(12),
        getter: () => getThreadsMedias({ after: afterToken })
      });
    })(request, response, next);
  });
  app.get(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMediaChildren}`, (request, response, next) => {
    const mediaId = request.query.id;
    if (!mediaId || typeof mediaId !== "string") {
      handleError(response, { code: BAD_REQUEST, message: "Invalid params" });
      return;
    }
    responder(() => {
      return cacher.passive(cache, {
        key: `threads_media_children_${mediaId}`,
        ttl: days(7),
        getter: () => getThreadsMediaChildren(mediaId)
      });
    })(request, response, next);
  });
  app.get(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.ThreadsMediaConversation}`, (request, response, next) => {
    const mediaId = request.query.id;
    if (!mediaId || typeof mediaId !== "string") {
      handleError(response, { code: BAD_REQUEST, message: "Invalid params" });
      return;
    }
    responder(() => {
      return cacher.passive(cache, {
        key: `threads_media_conversation_${mediaId}`,
        ttl: days(7),
        getter: () => getThreadsMediaConversation(mediaId)
      });
    })(request, response, next);
  });
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramProfile}`,
    responder(() => {
      return cacher.passive(cache, {
        key: TunnelModule.InstagramProfile,
        ttl: hours(12),
        getter: getInstagramProfile
      });
    })
  );
  const getInsFirstPageMediasCache = cacher.interval(cache, {
    key: "instagram_medias_page_first",
    ttl: hours(12),
    interval: hours(3),
    retry: minutes(10),
    getter: getInstagramMedias
  });
  app.get(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramMedias}`, (request, response, next) => {
    const afterToken = request.query.after;
    if (afterToken && typeof afterToken !== "string") {
      handleError(response, { code: BAD_REQUEST, message: "Invalid params" });
      return;
    }
    responder(() => {
      return !afterToken ? getInsFirstPageMediasCache() : cacher.passive(cache, {
        key: `instagram_medias_page_${afterToken}`,
        ttl: hours(12),
        getter: () => getInstagramMedias({ after: afterToken })
      });
    })(request, response, next);
  });
  app.get(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramMediaChildren}`, (request, response, next) => {
    const mediaId = request.query.id;
    if (!mediaId || typeof mediaId !== "string") {
      handleError(response, { code: BAD_REQUEST, message: "Invalid params" });
      return;
    }
    responder(() => {
      return cacher.passive(cache, {
        key: `instagram_media_children_${mediaId}`,
        ttl: days(7),
        getter: () => getInstagramMediaChildren(mediaId)
      });
    })(request, response, next);
  });
  const getInsCalendarCache = cacher.interval(cache, {
    key: TunnelModule.InstagramCalendar,
    ttl: hours(36),
    interval: hours(18),
    retry: minutes(2),
    getter: getInstagramCalendar
  });
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.InstagramCalendar}`,
    responder(() => getInsCalendarCache())
  );
  const getYouTubePlaylistsCache = cacher.interval(cache, {
    key: TunnelModule.YouTubePlaylist,
    ttl: days(3),
    interval: hours(24),
    retry: minutes(10),
    getter: getYouTubeChannelPlayLists
  });
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.YouTubePlaylist}`,
    responder(() => getYouTubePlaylistsCache())
  );
  app.get(`${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.YouTubeVideoList}`, (request, response, next) => {
    const playlistId = request.query.id;
    if (!playlistId || typeof playlistId !== "string") {
      handleError(response, { code: BAD_REQUEST, message: "Invalid params" });
      return;
    }
    responder(() => {
      return cacher.passive(cache, {
        key: `youtube_playlist_${playlistId}`,
        ttl: hours(1),
        getter: () => getYouTubeVideoListByPlayerListId(playlistId)
      });
    })(request, response, next);
  });
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.GitHubSponsors}`,
    responder(() => {
      return cacher.passive(cache, {
        key: TunnelModule.GitHubSponsors,
        ttl: hours(4),
        getter: getGitHubSponsors
      });
    })
  );
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.GitHubContributions}`,
    responder(() => {
      return cacher.passive(cache, {
        key: TunnelModule.GitHubContributions,
        ttl: hours(4),
        getter: getGitHubContributions
      });
    })
  );
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.StatisticGitHubJson}`,
    responder(() => {
      return cacher.passive(cache, {
        key: TunnelModule.StatisticGitHubJson,
        ttl: hours(8),
        getter: getGitHubStatistic
      });
    })
  );
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.StatisticNpmJson}`,
    responder(() => {
      return cacher.passive(cache, {
        key: TunnelModule.StatisticNpmJson,
        ttl: hours(8),
        getter: getNPMStatistic
      });
    })
  );
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.DoubanMovies}`,
    responder(() => {
      return cacher.passive(cache, {
        key: TunnelModule.DoubanMovies,
        ttl: days(3),
        getter: getDoubanMovies
      });
    })
  );
  app.get(
    `${BFF_CONFIG.tunnel_url_prefix}/${TunnelModule.MyGoogleMap}`,
    responder(() => {
      return cacher.passive(cache, {
        key: TunnelModule.MyGoogleMap,
        ttl: hours(6),
        getter: getMyGoogleMap
      });
    })
  );
  await (isNodeDev ? enableDevRenderer(app, cache) : enableProdRenderer(app, cache));
  server.listen(BFF_CONFIG.server_port, () => {
    const address = server.address();
    const port = typeof address === "string" ? address : address?.port;
    logger.success(
      `${APP_META.title} app is running!`,
      `| env: ${NODE_ENV}`,
      `| port: ${port}`,
      `| ${(/* @__PURE__ */ new Date()).toLocaleString()}`
    );
  });
});
export {
  logger
};
