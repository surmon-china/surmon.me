<script lang="ts" setup>
  import { useEnhancer } from '/@/app/enhancer'
  const { theme } = useEnhancer()
</script>

<template>
  <client-only transition>
    <Adsense
      v-if="theme.isDark.value"
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

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .mammon {
    min-height: 16rem;
    max-height: 30rem;
    background-color: $module-bg;
    @include mix.radius-box($radius-sm);
  }
</style>
