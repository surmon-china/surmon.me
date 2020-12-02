<template>
  <li
    class="barrage-item"
    :style="styles"
    :class="[
      `barrage-size-${barrage.style.size}`,
      `barrage-color-${barrage.style.color}`,
      barrage.outdated && 'outdated',
      state.playing && 'playing',
      state.played && 'played'
    ]"
  >
    <span class="gravatar"></span>
    <span class="content">{{ barrage.text }}</span>
  </li>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
  import { randomPer } from './util'

  export enum Event {
    End = 'end'
  }
  export default defineComponent({
    name: 'BarrageItem',
    props: {
      id: {
        type: Number,
        required: true
      },
      delay: {
        type: Number,
        default: 10,
      },
      barrage: {
        type: Object,
        required: true
      }
    },
    emits: [Event.End],
    setup(props, context) {
      // 定时器
      const timers = {
        transform: null as null | number,
        playing: null as null | number
      }

      // 播放状态
      const state = reactive({
        played: false,
        playing: false,
      })

      const topStyle = ref()
      const styles = computed(() => ({
        top: topStyle.value,
        zIndex: (props.id + 1) * 10,
        transition: `transform ${props.delay}s linear`
      }))

      const readomTop = () => {
        const innerHeight = document.documentElement.clientHeight - 63
        const innerCount = innerHeight / 30
        let randomCount = randomPer(innerCount) - 3
        randomCount = randomCount < 0 ? 1 : randomCount
        let topPre = randomCount / innerCount * 100
        topPre = (topPre > 88) ? 86 : topPre
        return `${parseInt(String(topPre), 0)}%`
      }

      const startAnimation = () => {
        nextTick(() => {
          // 开始动画 -> 计算出一个随机高度，相对左距
          timers.transform = window.setTimeout(() => {
            state.playing = true
            topStyle.value = readomTop()
          })

          // 结束动画
          timers.playing = window.setTimeout(() => {
            state.playing = false
            state.played = true
            nextTick(() => context.emit(Event.End, props.id))
          }, props.delay * 1000)
        })
      }

      onMounted(startAnimation)
      onBeforeUnmount(() => {
        if (timers.transform) {
          clearTimeout(timers.transform)
          timers.transform = null
        }
        if (timers.playing) {
          clearTimeout(timers.playing)
          timers.playing = null
        }
      })

      return {
        styles,
        state
      }
    }
  })
</script>

<style lang="scss" scoped>
  @import 'src/assets/styles/init.scss';

  .barrage-item {
    width: auto;
    right: 0px;
    display: block;
    position: absolute;
    will-change: transform;
    transform: translate3d(100%, 0, 0);

    &.outdated {
      opacity: 0.3;
      border: 1px dotted;
    }

    &.playing {
      transform: translate3d(-110vw, 0, 0);
    }

    &.played {
      @include hidden();
    }
  }
</style>
