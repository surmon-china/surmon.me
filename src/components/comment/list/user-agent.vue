<script lang="ts" setup>
  import { computed } from 'vue'
  import { uaParser } from '/@/transforms/ua'

  // https://docs.uaparser.dev/info/os/name.html
  const osIconsNameMap = {
    'Chrome OS': 'icon-chrome',
    macOS: 'icon-apple',
    Windows: 'icon-windows',
    Android: 'icon-android',
    Ubuntu: 'icon-ubuntu',
    Linux: 'icon-linux',
    iOS: 'icon-apple'
  }

  // https://docs.uaparser.dev/info/browser/name.html
  const browsersIconsNameMap = {
    Chrome: 'icon-chrome',
    'Mobile Chrome': 'icon-chrome',
    Safari: 'icon-safari',
    'Mobile Safari': 'icon-safari',
    Firefox: 'icon-firefox',
    'Mobile Firefox': 'icon-firefox',
    Chromium: 'icon-chrome',
    IE: 'icon-ie',
    Edge: 'icon-edge',
    Opera: 'icon-opera',
    UCBrowser: 'icon-uc',
    WeChat: 'icon-wechat',
    Twitter: 'icon-twitter-x',
    Instagram: 'icon-instagram',
    Baidu: 'icon-baidu',
    QQ: 'icon-qq'
  }

  const props = defineProps<{
    userAgent: string
  }>()

  const { uap: uaParsed } = uaParser(props.userAgent)
  const osName = uaParsed.os.name
  const browserName = uaParsed.browser.name
  const osIconName = osName ? osIconsNameMap[osName] : null
  const browserIconName = browserName ? browsersIconsNameMap[browserName] : null
</script>

<template>
  <span class="user-agent">
    <span class="os" v-if="osName">
      <i v-if="osIconName" class="iconfont" :class="osIconName" />
      <span>{{ osName }}</span>
    </span>
    <span class="browser" v-if="browserName">
      <i v-if="browserIconName" class="iconfont" :class="browserIconName" />
      <i v-else class="iconfont icon-internet" />
      <span>{{ browserName }}</span>
    </span>
  </span>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .user-agent {
    white-space: nowrap;

    .iconfont {
      margin-right: $gap-xs;
    }

    .os {
      margin-right: $gap-sm;
    }
  }
</style>
