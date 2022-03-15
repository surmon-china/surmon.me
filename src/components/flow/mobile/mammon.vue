<template>
  <client-only transition>
    <Adsense
      v-if="isDarkTheme"
      key="dark-mammon"
      ins-class="mammon-ins"
      data-ad-format="fluid"
      data-ad-layout-key="-6e+e3+1s-2k+2w"
      data-ad-slot="1512607272"
      class="mammon"
    />
    <Adsense
      v-else
      key="default-mammon"
      ins-class="mammon-ins"
      data-ad-format="fluid"
      data-ad-layout-key="-6t+e6+1w-2w+2b"
      data-ad-slot="5090380893"
      class="mammon"
    />
  </client-only>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useEnhancer } from '/@/app/enhancer'

  export default defineComponent({
    name: 'MobileFlowMammon',
    setup() {
      const { isDarkTheme } = useEnhancer()
      return {
        isDarkTheme
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .mammon {
    min-height: 16rem;
    max-height: 30rem;
    background-color: $module-bg;
    @include radius-box($sm-radius);
  }
</style>
