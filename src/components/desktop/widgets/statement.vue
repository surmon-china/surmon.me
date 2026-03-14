<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { getEmailLink } from '/@/transforms/email'
  import { Markdown } from '/@/effects/markdown'

  const { appOptions } = useEnhancer()
</script>

<template>
  <div class="statement">
    <div class="content">
      <markdown :markdown="appOptions?.statement" :compact="true" />
      <divider :dashed="true" />
      <p v-if="appOptions" class="email">
        <a :href="getEmailLink(appOptions.site_email)" class="link" target="_blank">
          <i class="iconfont icon-mail"></i>
          <span class="text">{{ appOptions.site_email }}</span>
        </a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .statement {
    width: 46rem;
    min-height: 18rem;
    max-height: 80vh;
    background-color: $module-bg-opaque;
    overflow-y: scroll;
    overscroll-behavior-y: none;
    scrollbar-width: thin;

    .content {
      padding-block: $gap;
      padding-inline: 2em;

      .email {
        margin: 0;

        .link {
          color: $color-text-secondary;
          &:hover {
            color: $color-link-hover;
          }

          .text {
            margin-left: $gap-tiny;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
