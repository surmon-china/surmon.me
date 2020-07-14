<template>
  <div class="mammon">
    <placeholder :loading="fetching">
      <template #loading>
        <skeleton-paragraph
          v-if="fetching"
          key="skeleton"
          class="skeleton"
          line-height="1em"
          :lines="4"
        />
      </template>
      <template #default>
        <adsense-responsive
          key="adsense"
          ins-class="mammon-ins"
        />
      </template>
    </placeholder>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ArticleMammon',
    props: {
      fetching: {
        type: Boolean,
        default: false
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

    .mammon-ins {
      width: 100%;
      height: 16rem;
      min-height: 16rem;
    }

    .skeleton {
      width: 100%;
    }
  }
</style>


