<template>
  <div class="skeleton line" :style="style">
    <skeleton-base />
  </div>
</template>

<script>
  import SkeletonBase from './base'
  export default {
    name: 'skeleton-line',
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
    computed: {
      style() {
        const style = {}
        if (this.width) {
          style.width = this.width + 'px'
        }
        if (this.height) {
          style.height = this.height + 'px'
        }
        return style
      }
    }
  }
</script>

<style lang="scss" scoped>
  .skeleton.line {
    width: 100%;
    height: 100%;
  }
</style>
