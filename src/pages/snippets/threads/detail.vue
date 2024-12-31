<script lang="ts" setup>
  import type { ThreadsMedia } from '/@/server/getters/threads'
  defineProps<{
    media: ThreadsMedia
  }>()
</script>

<template>
  <div class="threads-media-detail">
    <!-- TODO -->
  </div>
</template>

<style lang="scss" scoped>
  @use '/src/styles/base/variables' as *;
  @use '/src/styles/base/functions' as funs;
  @use '/src/styles/base/mixins' as mix;

  .threads-media-detail {
    display: block;
    width: auto;
    min-width: 38rem;
    max-width: 72rem;
    max-height: 80vh;
    overflow-y: auto;
    padding: $gap * 2;
    background-color: $module-bg-opaque;
  }
</style>
