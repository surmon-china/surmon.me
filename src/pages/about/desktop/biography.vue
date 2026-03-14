<script lang="ts" setup>
  import { computed } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'
  import { renderMarkdownToHTML } from '/@/effects/markdown'

  const { globalState, appConfig, isZhLang } = useEnhancer()
  const isEnHachDevice = globalState.userAgent.isFirefox || globalState.userAgent.isSafari
  const markdownHtml = computed(() => {
    const markdown = isZhLang.value ? appConfig.value.ABOUT_BIOGRAPHY_ZH : appConfig.value.ABOUT_BIOGRAPHY_EN
    return renderMarkdownToHTML(markdown ?? '', { sanitize: false })
  })
</script>

<template>
  <div
    class="biography"
    :class="isZhLang ? 'zh' : isEnHachDevice ? 'en-hack' : 'en'"
    v-html="markdownHtml"
  ></div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .biography {
    margin: 0;
    padding-block: $gap-sm * 1.8;
    padding-inline: $gap;
    text-indent: 2em;
    font-weight: 600;
    color: $color-text-secondary;
    @include mix.color-transition($motion-duration-mid);
    &:hover {
      color: $color-text;
    }

    &.zh {
      font-size: $font-size-base + 1;
      line-height: $line-height-base * 1.9;
    }

    &.en {
      font-size: $font-size-base + 2;
      line-height: $line-height-base * 1.8;
    }

    &.en-hack {
      font-size: $font-size-base + 1.4;
      line-height: $line-height-base * 1.9;
    }

    &::first-letter {
      line-height: 1;
      font-weight: bold;
      font-size: $font-size-h2;
      color: $color-text-darker;
    }

    :deep(a) {
      text-decoration: underline;
      text-underline-offset: 0.4em;
      text-decoration-style: dotted;
    }

    :deep(p) {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
