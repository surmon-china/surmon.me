<script lang="ts" setup>
  import { computed, CSSProperties } from 'vue'
  import SkeletonBase from './base.vue'

  interface Props {
    width?: number
    height?: number
  }

  const props = defineProps<Props>()
  const style = computed<CSSProperties>(() => ({
    ...(props.width && { width: props.width + 'px' }),
    ...(props.height && { height: props.height + 'px' })
  }))
</script>

<template>
  <div class="skeleton line" :style="style">
    <skeleton-base />
  </div>
</template>

<style lang="scss" scoped>
  .skeleton.line {
    width: 100%;
    height: 100%;
  }
</style>
