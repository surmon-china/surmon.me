<br />

<p align="center">
  <a href="https://github.com/surmon-china/surmon.me" target="blank">
    <img src="/presses/logo.png" height="90" alt="surmon.me logo" />
  </a>
</p>

# Surmon.me

[![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)](https://vuejs.org)
&nbsp;
[![nodepress](https://raw.githubusercontent.com/surmon-china/nodepress/main/badge.svg)](https://github.com/surmon-china/nodepress)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/stargazers)
&nbsp;
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/surmon-china/surmon.me/Deploy?style=for-the-badge&label=Deploy)](https://github.com/surmon-china/surmon.me/actions?query=workflow:%22Deploy%22)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/surmon-china/surmon.me.svg?style=for-the-badge)](/LICENSE)

**My personal website and blog, powered by [Vue(3)](https://vuejs.org), API services provided by [NodePress](https://github.com/surmon-china/nodepress).**


**🔗 https://surmon.me**

**🗒️ [CHANGELOG.md](/CHANGELOG.md)**

**🔥 [Related projects](https://github.com/stars/surmon-china/lists/surmon-me)**

- **RESTful API service for blog:** [`nodepress`](https://github.com/surmon-china/nodepress) powered by nestjs
- **Blog admin site:** [`veact-admin`](https://github.com/surmon-china/veact-admin) powered by React & [`Veact`](https://github.com/veactjs/veact)
- **Blog native app:** [`surmon.me.native`](https://github.com/surmon-china/surmon.me.native) powered by react-native

<img src="https://repobeats.axiom.co/api/embed/f736455d393d3b7d111eaabe4fbaf5a960ce32e8.svg" width="100%" />

## Screenshot

![](/presses/desktop.png)

![](/presses/mobile.png)

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
