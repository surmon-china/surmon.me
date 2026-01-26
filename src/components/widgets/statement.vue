<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { getEmailLink } from '/@/transforms/email'
  import Markdown from '/@/components/common/markdown.vue'

  const { appOptionsStore } = useStores()
</script>

<template>
  <div class="statement">
    <div class="content">
      <markdown :markdown="appOptionsStore.data?.statement" :compact="true" />
      <br />
      <hr />
      <p v-if="appOptionsStore.data" class="email">
        <a :href="getEmailLink(appOptionsStore.data.site_email)" class="link" target="_blank">
          <i class="iconfont icon-mail"></i>
          <span class="text">{{ appOptionsStore.data.site_email }}</span>
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
      width: 60rem;
      min-height: 70rem;

      .email {
        .link {
          color: $color-text-secondary;

          .iconfont {
            margin-right: $gap-xs;
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
