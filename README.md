<p align="center">
  <a href="https://vuejs.org" target="blank">
    <img src="https://raw.githubusercontent.com/surmon-china/surmon.me/master/presses/vue-logo.png" height="90" alt="vue logo" />
  </a>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/surmon-china/surmon.me" target="blank">
    <img src="https://raw.githubusercontent.com/surmon-china/surmon.me/master/presses/logo.png" height="90" alt="surmon.me logo" />
  </a>
</p>

# Surmon.me

[![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)](https://vuejs.org)
[![nodepress](https://img.shields.io/badge/NODE-PRESS-83BA2F?style=for-the-badge&labelColor=90C53F)](https://github.com/surmon-china/nodepress)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/stargazers)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/surmon-china/surmon.me/Deploy?style=for-the-badge&label=Deploy)](https://github.com/surmon-china/surmon.me/actions?query=workflow:%22Deploy%22)
[![GitHub license](https://img.shields.io/github/license/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/blob/master/LICENSE)

<strong><samp>My personal website and blog, powered by [Vue(3)](https://vuejs.org).<samp></strong>

**使用 [Vue (3)](https://vuejs.org) 构建的个人博客网站。**

> **Online site:** https://surmon.me

**🔥 其他相关项目：**

- **RESTful API service for blog:** [`nodepress`](https://github.com/surmon-china/nodepress) powered by nestjs
- **Blog admin site:** [`veact-admin`](https://github.com/surmon-china/veact-admin) powered by React & [`Veact`](https://github.com/veactjs/veact)
- **Blog native app:** [`surmon.me.native`](https://github.com/surmon-china/surmon.me.native) powered by react-native

**更新记录：[CHANGELOG.md](https://github.com/surmon-china/surmon.me/blob/master/CHANGELOG.md)**

## Screenshot

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/presses/pc.png)

![](https://raw.githubusercontent.com/surmon-china/surmon.me/master/presses/mobile.png)

## Development Setup

```bash
# install dependencies
$ yarn

# serve with hot reload at localhost:3000
$ yarn dev

# or
$ yarn dev:spa
$ yarn dev:ssr

# build for production and launch server
$ yarn build

# or
$ yarn build:spa
$ yarn build:ssr

# run SSR
$ yarn start

# lint test
$ yarn lint
```

## Actions setup

**Rule:**

- `Any PR open` → `CI:Build test`
- `New tag v*` → `CI:Create Release`
- `New tag | Release created` → `CI:Deploy` → `CI:Execute server script`
