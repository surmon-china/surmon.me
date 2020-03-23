<p align="center">
  <a href="https://github.com/nuxt/nuxt.js" target="blank">
    <img src="https://nuxtjs.org/meta_400.png" height="90" alt="nuxt logo" />
  </a>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/surmon-china/surmon.me" target="blank">
    <img src="https://raw.githubusercontent.com/surmon-china/surmon.me/master/static/icon.png" height="90" alt="surmon.me logo" />
  </a>
</p>

# Surmon.me

![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)
[![nodepress](https://img.shields.io/badge/NODE-PRESS-83BA2F?style=for-the-badge&labelColor=90C53F)](https://github.com/surmon-china/nodepress)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/stargazers)
[![GitHub issues](https://img.shields.io/github/issues-raw/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/issues)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/surmon-china/surmon.me/Deploy?style=for-the-badge&label=Deploy)](https://github.com/surmon-china/surmon.me/actions?query=workflow:%22Deploy%22)
[![GitHub license](https://img.shields.io/github/license/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/blob/master/LICENSE)


**My personal website and blog, powered by [Nuxt.js](https://github.com/nuxt/nuxt.js).** 

**使用 [Nuxt.js](https://github.com/nuxt/nuxt.js) 构建的个人网站。**

**Online site:** https://surmon.me

**其他相关项目：**
- **RESTful API service:** [nodepress](https://github.com/surmon-china/nodepress) powered by [nestjs](https://github.com/nestjs/nest)
- **web client for admin:** [angular-admin](https://github.com/surmon-china/angular-admin) powered by [Angular](https://github.com/angular/angular) & [Bootstrap](https://github.com/twbs/bootstrap)
- **native app client:** [surmon.me.native](https://github.com/surmon-china/surmon.me.native) powered by [react-native](https://github.com/facebook/react-native)

**更新记录：[CHANGELOG.md](https://github.com/surmon-china/surmon.me/blob/master/CHANGELOG.md)**

## Screenshot

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/screenshots/pc.png)

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/screenshots/mobile.png)

## Development Setup

```bash
# install nodemon
$ npm i nodemon -g

# install dependencies
$ yarn # or npm install

# serve with hot reload at localhost:3000
$ yarn dev # or npm run dev

# build for production and launch server
$ yarn build # or npm run build
$ yarn start # or npm start

# lint test
$ yarn lint
```

## Actions setup

**Rule:**
- `any PR open` -> `CI:Build test`
- `master PR closed & merged` -> `CI:Deploy to server`

**Example:**
- `local:develop -> remote:develop` -> `CI:Build test`
- `remote:develop/other -> remote:master -> merged` -> `CI:Deploy to server`
