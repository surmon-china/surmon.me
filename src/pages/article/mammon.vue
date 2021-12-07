<template>
  <div class="mammon">
    <placeholder :loading="fetching">
      <template #loading>
        <skeleton-paragraph key="skeleton" class="skeleton" line-height="1em" :lines="4" />
      </template>
      <template #default>
        <u-adsense key="adsense" class="mammon-box" ins-class="mammon-ins" />
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import UAdsense from '/@/components/common/uadsense.vue'
  export default defineComponent({
    name: 'ArticleMammon',
    components: {
      UAdsense
    },
    props: {
      fetching: {
        type: Boolean,
        required: true
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/init.scss';

  .mammon {
    padding: $gap;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .mammon-box,
    ::v-deep(.mammon-ins) {
      width: 100%;
      height: 16rem;
      min-height: 16rem;
    }

    .skeleton {
      width: 100%;
    }
  }
</style>
