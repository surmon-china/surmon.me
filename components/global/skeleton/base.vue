<template>
  <div class="skeleton base" :style="style"></div>
</template>

<script>
  export default {
    name: 'skeleton-base',
    props: {
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      circle: {
        type: Boolean,
        default: false
      },
      radius: {
        type: Number,
        default: 2
      }
    },
    computed: {
      style() {
        const style = {
          'border-radius': this.circle ? '100%' : `${this.radius}px`,
        }
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

  $skeleton-background: $body-bg;
  $skeleton-spinner: $module-hover-bg-opacity-3;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0
    }
    100% {
      background-position: 350px 50px
    }
  }
  
  .skeleton.base {
    width: 100%;
    height: 100%;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background-color: $skeleton-spinner;
    background-image: linear-gradient(to right, $skeleton-background 8%, $skeleton-spinner 18%, $skeleton-background 33%);
    background-repeat: repeat;
    background-size: 800px 104px;
  }
</style>
