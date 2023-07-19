<script lang="ts">
  export interface Props {
    id: number
    x: number
    y: number
    text: string
    zIndex: number
  }
</script>

<script lang="ts" setup>
  import { computed, reactive, nextTick, onMounted, onBeforeUnmount } from 'vue'

  const props = defineProps<Props>()
  const emit = defineEmits<{
    (e: 'ended', id: Props['id']): void
  }>()

  const state = reactive({
    delay: 1,
    timer: null as number | null,
    playing: false
  })

  const styles = computed(() => ({
    top: props.y + 'px',
    left: props.x + 'px',
    'z-index': 99999 + props.zIndex
  }))

  const startAnimation = () => {
    nextTick(() => {
      // start animation
      setTimeout(() => {
        state.playing = true
      })

      // end animation
      state.timer = window.setTimeout(() => {
        state.playing = false
        nextTick(() => emit('ended', props.id))
      }, state.delay * 1000)
    })
  }

  startAnimation()
  onMounted(startAnimation)
  onBeforeUnmount(() => {
    if (state.timer) {
      clearTimeout(state.timer)
      state.timer = null
    }
  })
</script>

<template>
  <li class="flower-item" :style="styles" :class="{ playing: state.playing }">
    <webfont bolder>{{ props.text }}</webfont>
  </li>
</template>

<style lang="scss" scoped>
  @import 'src/styles/variables.scss';
  @import 'src/styles/mixins.scss';

  .flower-item {
    opacity: 1;
    position: fixed;
    display: block;
    transform: translate3d(-50%, -50%, 0);
    transition: opacity 0.5s;
    color: $primary;
    font-size: $font-size-h3;
    white-space: nowrap;

    @keyframes flower-playing {
      0% {
        transform: translate3d(-50%, -50%, 0);
      }
      80% {
        transform: translate3d(-50%, -400%, 0);
        opacity: 0.6;
      }
      100% {
        transform: translate3d(-50%, -500%, 0);
        opacity: 0;
      }
    }

    &.playing {
      opacity: 0.8;
      animation: flower-playing 1s ease 0s forwards;
    }
  }
</style>
