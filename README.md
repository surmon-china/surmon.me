<br />

<p align="center">
  <a href="https://vuejs.org" target="blank">
    <img src="https://raw.githubusercontent.com/surmon-china/surmon.me/main/presses/vue.png" height="90" alt="vue logo" />
  </a>
  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  <a href="https://github.com/surmon-china/surmon.me" target="blank">
    <img src="https://raw.githubusercontent.com/surmon-china/surmon.me/main/presses/logo.png" height="90" alt="surmon.me logo" />
  </a>
</p>

# Surmon.me

[![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)](https://vuejs.org)
&nbsp;
[![nodepress](https://img.shields.io/badge/NODE-PRESS-83BA2F?style=for-the-badge&labelColor=90C53F)](https://github.com/surmon-china/nodepress)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/stargazers)
&nbsp;
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/surmon-china/surmon.me/Deploy?style=for-the-badge&label=Deploy)](https://github.com/surmon-china/surmon.me/actions?query=workflow:%22Deploy%22)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/blob/main/LICENSE)

**My personal website and blog, powered by [Vue(3)](https://vuejs.org), API services provided by [NodePress](https://github.com/surmon-china/nodepress).**

**使用 [Vue (3)](https://vuejs.org) 构建的个人博客网站，服务端使用 [NodePress](https://github.com/surmon-china/nodepress) 程序。**

> **Online site: [https://surmon.me](https://surmon.me)**

> **更新记录：[CHANGELOG.md](https://github.com/surmon-china/surmon.me/blob/main/CHANGELOG.md)**

---

**🔥 其他 [相关项目](https://github.com/stars/surmon-china/lists/surmon-me)：**

- **RESTful API service for blog:** [`nodepress`](https://github.com/surmon-china/nodepress) powered by nestjs
- **Blog admin site:** [`veact-admin`](https://github.com/surmon-china/veact-admin) powered by React & [`Veact`](https://github.com/veactjs/veact)
- **Blog native app:** [`surmon.me.native`](https://github.com/surmon-china/surmon.me.native) powered by react-native

## Screenshot

![](https://raw.githubusercontent.com/surmon-china/surmon.me/main/presses/desktop.png)

![](https://raw.githubusercontent.com/surmon-china/surmon.me/main/presses/mobile.png)

## Development Setup

```bash
# install dependencies
$ yarn

# SSR mode
$ yarn dev
$ yarn build
$ yarn start

# or SPA mode
$ yarn spa:dev
$ yarn spa:build
$ yarn spa:start

# lint test
$ yarn lint

# release
$ yarn release
```

## Actions setup

**Rule:**

- `Any PR open` → `CI:Build test`
- `New tag v*` → `CI:Create Release`
- `New tag | Release created` → `CI:Deploy` → `CI:Execute server script`
