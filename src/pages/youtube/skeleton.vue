<script lang="ts" setup>
  interface Props {
    columns: number
    height: number
    rows?: number
  }

  withDefaults(defineProps<Props>(), {
    rows: 2
  })
</script>

<template>
  <ul class="skeletons" :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)` }">
    <div class="item" :style="{ height: `${height}px` }" v-for="item in columns * rows" :key="item">
      <skeleton-base />
    </div>
  </ul>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .skeletons {
    padding: 0;
    display: grid;
    grid-gap: $gap * 2;

    .item {
      padding: $gap;
      @include mix.radius-box($radius-sm);
      @include mix.common-bg-module();
    }
  }
</style>
