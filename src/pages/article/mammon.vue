<template>
  <div class="mammon">
    <placeholder :loading="fetching">
      <skeleton-paragraph
        #loading
        key="skeleton"
        class="skeleton"
        line-height="1em"
        :lines="4"
      />
      <adsense-responsive
        #default
        key="adsense"
        class="mammon-box"
        ins-class="mammon-ins"
      />
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import AdsenseResponsive from '/@/components/adsense/responsive.vue'
  export default defineComponent({
    name: 'ArticleMammon',
    components: {
      AdsenseResponsive
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
  @import 'src/assets/styles/init.scss';

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


