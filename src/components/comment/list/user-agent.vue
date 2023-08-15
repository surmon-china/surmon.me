<script lang="ts" setup>
  import { computed } from 'vue'
  import { uaParser } from '/@/transforms/ua'

  // https://github.com/faisalman/ua-parser-js#methods
  const osIconsNameMap = {
    'Mac OS': 'icon-apple',
    Windows: 'icon-windows',
    Android: 'icon-android',
    Ubuntu: 'icon-ubuntu',
    Linux: 'icon-linux',
    iOS: 'icon-apple'
  }

  const browersIconsNameMap = {
    Chrome: 'icon-chrome',
    Chromium: 'icon-chrome',
    WeChat: 'icon-wechat',
    QQ: 'icon-qq',
    Safari: 'icon-safari',
    'Mobile Safari': 'icon-safari',
    UCBrowser: 'icon-uc',
    Maxthon: 'icon-maxthon',
    Firefox: 'icon-firefox',
    IE: 'icon-ie',
    Opera: 'icon-opera',
    Edge: 'icon-edge'
  }

  const props = defineProps<{
    userAgent: string
  }>()

  const uaResult = computed(() => uaParser(props.userAgent))
  const osIconName = computed(() => {
    const osName = uaResult.value.result.os.name
    return osName && osIconsNameMap[osName]
  })
  const browserIconName = computed(() => {
    const browserName = uaResult.value.result.browser.name
    return browserName ? browersIconsNameMap[browserName] : null
  })
</script>

<template>
  <span class="user-agent">
    <span class="os">
      <i v-if="osIconName" class="iconfont" :class="osIconName" />
      <span>{{ uaResult.result.os.name }}</span>
      <!-- <span>{{ uaResult.result.os.version }}</span> -->
    </span>
    <span class="browser">
      <i v-if="browserIconName" class="iconfont" :class="browserIconName" />
      <span>{{ uaResult.result.browser.name }}</span>
      <!-- <span>{{ uaResult.result.browser.version }}</span> -->
    </span>
  </span>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .user-agent {
    white-space: nowrap;

    .iconfont {
      margin-right: $xs-gap;
    }

    .os {
      margin-right: $sm-gap;
    }
  }
</style>
