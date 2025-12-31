<br />

<p align="center">
  <a href="https://github.com/surmon-china/surmon.me" target="blank">
    <img src="/branding/logo.svg" height="48" alt="surmon.me logo" />
  </a>
</p>

# Surmon.me

[![nodepress](https://raw.githubusercontent.com/surmon-china/nodepress/main/branding/badge.svg)](https://github.com/surmon-china/nodepress)
&nbsp;
[![vue](https://img.shields.io/badge/MADE%20WITH-VUE-42a97a?style=for-the-badge&labelColor=35495d)](https://vuejs.org)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/surmon.me.svg?style=for-the-badge)](https://github.com/surmon-china/surmon.me/stargazers)
&nbsp;
[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m791570495-ed407f6804efd6c9f3cd1d18?style=for-the-badge)](https://stats.uptimerobot.com/Q2k7OTXxJN/791570495)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/surmon-china/surmon.me.svg?style=for-the-badge)](/LICENSE)

**My personal website and blog, built with [Vue](https://vuejs.org). API services are provided by [NodePress](https://github.com/surmon-china/nodepress).**

**[surmon.me](https://surmon.me)**

**[Related projects](https://github.com/stars/surmon-china/lists/surmon-me)**

- **RESTful API service:** [`NodePress`](https://github.com/surmon-china/nodepress) built with NestJS.
- **Blog admin site:** [`surmon.me.admin`](https://github.com/surmon-china/surmon.me.admin) built with React and [`Veact`](https://github.com/veactjs/veact).
- **Blog native app:** [`surmon.me.native`](https://github.com/surmon-china/surmon.me.native) built with React Native.

## Screenshot

![](/screenshots/desktop.png)

![](/screenshots/mobile.png)

## Development Setup

```bash
# install dependencies
$ pnpm install

$ pnpm run dev
$ pnpm run build
$ pnpm run start

# lint test
$ pnpm run lint

# release
$ pnpm run release
```

## Actions setup

- Any PR opened → [`CI:Build test`](.github/workflows/test.yml)
- New tag `v*` → [`CI:Create Release`](.github/workflows/release.yml)
- New Release created → [`CI:Deploy`](.github/workflows/deploy.yml) → Execute server [deploy script](./scripts)

### Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

Licensed under the [MIT](/LICENSE) License.
