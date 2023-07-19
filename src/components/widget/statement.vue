<script lang="ts" setup>
  import { useStores } from '/@/stores'
  import { emailLink } from '/@/transforms/email'
  import Markdown from '/@/components/common/markdown.vue'

  const { appOption } = useStores()
</script>

<template>
  <div class="statement">
    <div class="content">
      <markdown :markdown="appOption.data?.statement" :compact="true" />
      <br />
      <hr />
      <p v-if="appOption.data" class="email">
        <a :href="emailLink(appOption.data.site_email)" class="link" target="_blank">
          <i class="iconfont icon-mail"></i>
          <span class="text">{{ appOption.data.site_email }}</span>
        </a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .statement {
    background-color: $module-bg-opaque !important;
    overflow-y: scroll !important;

    .content {
      padding: 0 2em;
      width: 60rem;
      min-height: 70rem;

      .email {
        .link {
          color: $text-secondary;

          .iconfont {
            margin-right: $xs-gap;
          }
          .text {
            font-weight: bold;
          }

          &:hover {
            color: $link-hover;
          }
        }
      }
    }
  }
</style>
