<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  import { getEmailLink } from '/@/transforms/email'
  import Markdown from '/@/components/common/markdown.vue'

  const { appOptions } = useEnhancer()
</script>

<template>
  <div class="statement">
    <div class="content">
      <markdown :markdown="appOptions?.statement" :compact="true" />
      <br />
      <hr />
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
    background-color: $module-bg-opaque !important;
    overflow-y: scroll !important;

    .content {
      padding: 0 2em;
      width: 46rem;
      min-height: 58rem;

      .email {
        .link {
          color: $color-text-secondary;

          .iconfont {
            margin-right: $gap-tiny;
          }
          .text {
            font-weight: bold;
          }

          &:hover {
            color: $color-link-hover;
          }
        }
      }
    }
  }
</style>
