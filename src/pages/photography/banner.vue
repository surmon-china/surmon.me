<script lang="ts" setup>
  import { META, VALUABLE_LINKS } from '/@/config/app.config'
  import PageBanner from '/@/components/common/banner.vue'
</script>

<template>
  <page-banner class="page-banner" :position="32" image="/images/page-photography/banner.jpg">
    <template #title>
      <webfont>
        <i18n zh="大千同在，万象共栖" :en="`${META.author}'s photographs`" />
      </webfont>
    </template>
    <template #description>
      <i18n>
        <template #zh>
          <span>在我的 <ulink :href="VALUABLE_LINKS.INSTAGRAM" class="link">Instagram</ulink> 主页查看更多</span>
        </template>
        <template #en>
          View all photographs on my <ulink :href="VALUABLE_LINKS.INSTAGRAM" class="link">Instagram</ulink>
        </template>
      </i18n>
    </template>
  </page-banner>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .page-banner {
    .link {
      color: $white;
      text-decoration: underline;
    }
  }
</style>
