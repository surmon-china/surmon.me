<template>
  <div class="global-cursor" :style="positionStyle">
    <div class="cursor">
      <div class="follower follower1"></div>
      <div class="follower follower2"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
  export default defineComponent({
    name: 'GlobalCursor',
    setup() {
      const state = reactive({ x: 0, y: 0 })
      const updateCursorPosition = (event: MouseEvent) => {
        state.x = event.clientY
        state.y = event.clientX
      }

      const positionStyle = computed(() => ({
        transform: `translate3d(${state.y}px, ${state.x}px, 0)`
      }))

      onMounted(() => document.addEventListener('mousemove', updateCursorPosition))
      onBeforeUnmount(() => document.removeEventListener('mousemove', updateCursorPosition))

      return {
        positionStyle
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .global-cursor {
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index-top;
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
        background: $text-reversal;
      }

      .follower2 {
        animation: pulse 4s infinite;;
        background: $primary;
      }
    }
  }
</style>
