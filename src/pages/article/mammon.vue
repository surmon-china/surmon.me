<template>
  <div class="mammon">
    <transition name="module" mode="out-in">
      <skeleton-paragraph
        v-if="fetching"
        key="skeleton"
        class="skeleton"
        line-height="1em"
        :lines="4"
      />
      <adsense-responsive
        v-else
        key="adsense"
        ins-class="mammon-ins"
      />
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CategoryMammon',
    props: {
      fetching: {
        type: Boolean,
        default: false
      }
    }
  })
</script>

<style lang="scss">
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


