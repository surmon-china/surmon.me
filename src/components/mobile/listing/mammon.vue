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
      data-ad-layout-key="-hf-e+4i-9k+38"
      data-ad-slot="1765379407"
      class="mammon"
    />
    <Adsense
      v-else
      key="light-mammon"
      ins-class="mammon-ins"
      data-ad-format="fluid"
      data-ad-layout-key="-hf-e+4i-9k+38"
      data-ad-slot="1148538406"
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
