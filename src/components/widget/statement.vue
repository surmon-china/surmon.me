<template>
  <div class="statement">
    <div class="content">
      <markdown :markdown="appOptions?.statement" :compact="true" />
      <br />
      <hr />
      <p v-if="appOptions" class="email">
        <a :href="emailLink(appOptions.site_email)" class="link" target="_blank">
          <i class="iconfont icon-mail"></i>
          <span class="text">{{ appOptions.site_email }}</span>
        </a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useMetaStore } from '/@/stores/meta'
  import { emailLink } from '/@/transforms/email'
  import Markdown from '/@/components/common/markdown.vue'

  export default defineComponent({
    name: 'Statement',
    components: { Markdown },
    setup() {
      const metaStore = useMetaStore()
      const appOptions = computed(() => metaStore.appOptions.data)
      return { appOptions, emailLink }
    }
  })
</script>

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
