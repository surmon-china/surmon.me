<template>
  <span>
    <span class="os">
      <i
        v-if="osIconName"
        class="iconfont"
        :class="'icon-' + osIconName"
      />
      <span>{{ uaResult.result.os.name }}</span>
      <span>{{ uaResult.result.os.version }}</span>
    </span>
    <span class="browser">
      <i
        class="iconfont"
        :class="'icon-' + (browserIconName || 'internet')"
      />
      <span>{{ uaResult.result.browser.name }}</span>
      <span>{{ uaResult.result.browser.major }}</span>
    </span>
  </span>
</template>

<script>
  import { uaParser } from '~/transformers/ua'

  // https://github.com/faisalman/ua-parser-js#methods
  const osIconsNameMap = {
    'Mac OS': 'mac',
    'Windows': 'windows',
    'Android': 'android',
    'Ubuntu': 'ubuntu',
    'Linux': 'linux',
    'iOS': 'mac',
    'Unix': 'unix'
  }

  const browersIconsNameMap = {
    'Chrome': 'chrome',
    'Chromium': 'chrome',
    'WeChat': 'wechat',
    'Safari': 'safari',
    'Mobile Safari': 'safari',
    'UCBrowser': 'uc',
    'Maxthon': 'maxthon',
    'Firefox': 'firefox',
    'IE': 'ie',
    'Opera': 'opera',
    'Edge': 'edge'
  }

  export default {
    name: 'CommentUa',
    props: {
      ua: String
    },
    computed: {
      uaResult() {
        return uaParser(this.ua)
      },
      osIconName() {
        const osName = this.uaResult.result.os.name
        return osName && osIconsNameMap[osName]
      },
      browserIconName() {
        const browserName = this.uaResult.result.browser.name
        return browserName && browersIconsNameMap[browserName]
      }
    }
  }
</script>
