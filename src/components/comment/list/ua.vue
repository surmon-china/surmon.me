<template>
  <span class="ua">
    <span class="os">
      <i v-if="osIconName" class="iconfont" :class="`icon-${osIconName}`" />
      <span>{{ uaResult.result.os.name }}</span>
      <!-- <span>{{ uaResult.result.os.version }}</span> -->
    </span>
    <span class="browser">
      <i class="iconfont" v-if="browserIconName" :class="`icon-${browserIconName}`" />
      <span>{{ uaResult.result.browser.name }}</span>
      <!-- <span>{{ uaResult.result.browser.version }}</span> -->
    </span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { uaParser } from '/@/transforms/ua'

  // https://github.com/faisalman/ua-parser-js#methods
  const osIconsNameMap = {
    'Mac OS': 'apple',
    Windows: 'windows',
    Android: 'android',
    Ubuntu: 'ubuntu',
    Linux: 'linux',
    iOS: 'apple',
    Unix: 'unix'
  }

  const browersIconsNameMap = {
    Chrome: 'chrome',
    Chromium: 'chrome',
    WeChat: 'wechat',
    QQ: 'qq',
    Safari: 'safari',
    'Mobile Safari': 'safari',
    UCBrowser: 'uc',
    Maxthon: 'maxthon',
    Firefox: 'firefox',
    IE: 'ie',
    Opera: 'opera',
    Edge: 'edge'
  }

  export default defineComponent({
    name: 'CommentItemUA',
    props: {
      ua: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const uaResult = computed(() => uaParser(props.ua))
      const osIconName = computed(() => {
        const osName = uaResult.value.result.os.name
        return osName && osIconsNameMap[osName]
      })
      const browserIconName = computed(() => {
        const browserName = uaResult.value.result.browser.name
        return browersIconsNameMap[browserName || 'internet']
      })

      return {
        uaResult,
        osIconName,
        browserIconName
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .ua {
    .iconfont {
      margin-right: $xs-gap;
    }

    .os {
      margin-right: $sm-gap;
    }
  }
</style>
