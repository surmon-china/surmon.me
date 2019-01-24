[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.svg?style=flat-square)](https://github.com/surmon-china/surmon.me/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/surmon-china/surmon.me.svg?style=flat-square)](https://github.com/surmon-china/surmon.me/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/surmon.me.svg?style=flat-square)](https://github.com/surmon-china/surmon.me/network)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/surmon-china/surmon.me)
[![](https://badge.juejin.im/entry/58ff969861ff4b00667ca82e/likes.svg?style=flat-square)](https://juejin.im/post/58ff960ba22b9d0065b722cd)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/surmon.me.svg?style=flat-square)](https://twitter.com/intent/tweet?url=https://github.com/surmon-china/surmon.me)

## Surmon.me

My blog by [Nuxt.js](https://github.com/nuxt)

[Online Site - https://surmon.me](https://surmon.me/)

If you want to run the application, you need install the [nodepress](https://github.com/surmon-china/nodepress) service and [sre](https://github.com/surmon-china/sre.surmon.me) service.

### CHANGELOG

[CHANGELOG](https://github.com/surmon-china/surmon.me/blob/master/CHANGELOG.md)

## PC

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/screenshots/pc.jpg)

## Mobile

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/screenshots/mobile-full.jpg)

## Analyze

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/screenshots/analyze-2019-zip.png)

## Build Setup

```bash
# 使用 nodemon 在开发环境下工作
sudo npm i nodemon -g

# install dependencies 依赖 python2.7
$ npm install [--python=python2.7] # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# lint test
$ npm run lint
```


## 目录结构
```
nuxt.js-blog/
   |
   ├──assets/                    * 需经webpack处理的静态资源
   |
   ├──components/                * 所有组件
   │   │
   │   │──common                 * 全局公共组件
   │   │
   │   └──layout                 * 布局组件
   │   │
   │   └──*****                  * 其他复用组件
   │
   │──expansions/                * 膨胀物扩展
   │
   │──middleware/                * Nuxt.js 中间件，c/s  渲染均会在路由改变前执行，需 next/返回promise，支持异步
   |
   ├──filters/                   * 过滤器
   │
   ├──layouts/                   * Nuxt.js宿主元素布局模板，默认default，目前不可更改，error为渲染失败时的页面模板，目前不可指定layout属性
   |
   ├──pages/                     * Nuxt.js的页面文件，会根据文件生成路由
   │
   │──plugins/                   * 第三方组件 + 自有js库 + 其他插件性质的脚本
   │
   │──static/                    * 不经编译器处理的静态资源
   │
   │──store/                     * 全局数据状态管理
   │   │
   │   ├──*******                * 各数据模块
   │   │
   │   └──index                  * 根模块（因为异步操作较少，目前仅用来存放actions）
   │
   │──package.json               * 包信息
   │
   │──.eslintrc.js               * Eslint配置
   │
   │──.babelrc                   * Babel配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   │──nuxt.config.js             * Nuxt.js程序配置
   │
   │──server.js                  * Nuxt.js程序入口文件（节省内存 + 优化内存）
   │
   │──ecosystem.config           * pm2部署配置（日志文件的路径需要自行修改）
   │
   └──.editorconfig              * 编码风格配置
```
