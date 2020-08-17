<template>
  <div class="skeleton line" :style="style">
    <skeleton-base />
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, CSSProperties } from 'vue'
  import SkeletonBase from './base.vue'
  export default defineComponent({
    name: 'SkeletonLine',
    components: {
      SkeletonBase
    },
    props: {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      }
    },
    setup(props) {
      const style = computed<CSSProperties>(() => ({
        ...(props.width && { width: props.width + 'px' }),
        ...(props.height && { height: props.height + 'px' })
      }))
      return { style }
    }
  })
</script>

<style lang="scss" scoped>
  .skeleton.line {
    width: 100%;
    height: 100%;
  }
</style>
