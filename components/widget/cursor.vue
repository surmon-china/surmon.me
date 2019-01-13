<template>
  <div class="global-cursor" :style="positionStyle">
    <div class="cursor">
      <div class="follower follower1"></div>
      <div class="follower follower2"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'global-cursor',
    data() {
      return { x: 0, y: 0 }
    },
    mounted() {
      document.addEventListener('mousemove', this.getCursorPosition)
    },
    beforeDestroy() {
      document.removeEventListener('mousemove', this.getCursorPosition)
    },
    methods: {
      getCursorPosition(event) {
        this.x = event.clientY
        this.y = event.clientX
      }
    },
    computed: {
      positionStyle() {
        return {
          transform: `translate3d(${this.y}px, ${this.x}px, 0)`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .global-cursor {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    animation: transform 0s;

    .cursor {
      position: relative;

      @keyframes pulse {
        0% {
          opacity: 0.2;
          transform: scale(.5);
        }
        50% {
          opacity: 0.9;
          transform: scale(1);
        }
        100% {
          opacity: 0.2;
          transform: scale(.5);
        }
      }

      .follower {
        position: absolute;
        border-radius: 50%;
        top: -1rem;
        left: -1rem;
        width: 2rem;
        height: 2rem;
        animation: all 0s;
      }

      .follower1 {
        animation: pulse 2s infinite;;
        background: $white;
      }

      .follower2 {
        animation: pulse 4s infinite;;
        background: $primary;
      }
    }
  }
</style>
