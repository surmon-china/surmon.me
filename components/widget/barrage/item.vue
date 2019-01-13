<template>
  <li
    class="barrage-item"
    :style="styles"
    :class="[
        `size-${barrage.style.size}`,
        `color-${barrage.style.color}`,
        playing ? 'playing' : '',
        played ? 'played' : ''
      ]"
  >
    <span class="gravatar"></span>
    <span class="content" v-text="barrage.text"></span>
  </li>
</template>

<script>
  export default {
    name: 'barrage-item',
    props: {
      id: {
        type: Number
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
    data() {
      return {
        // 定时器
        timers: {
          transform: null,
          playing: null
        },
        // 播放状态
        played: false,
        playing: false,
        styles: {
          'z-index': (this.id + 1) * 10,
          transition: `transform ${this.delay}s linear`
        }
      }
    },
    ready() {
      this.startAnimation()
    },
    mounted() {
      this.startAnimation()
    },
    beforeDestroy() {
      if (this.timers.transform) {
        clearTimeout(this.timers.transform)
        this.timers.transform = null
      }
      if (this.timers.playing) {
        clearTimeout(this.timers.playing)
        this.timers.playing = null
      }
    },
    methods: {
      readomTop() {
        const innerHeight = document.documentElement.clientHeight - 63
        const innerCount = innerHeight / 30
        let randomCount = this.$parent.randomPer(innerCount) - 3
        randomCount = randomCount < 0 ? 1 : randomCount
        let topPre = randomCount / innerCount * 100
        topPre = (topPre > 88) ? 86 : topPre
        return `${parseInt(topPre, 0)}%`
      },
      startAnimation() {

        this.$nextTick(() => {

          // 开始动画
          this.timers.transform = setTimeout(() => {
            this.playing = true
            // 计算出一个随机高度，相对左距
            this.$set(this.styles, 'top', this.readomTop())
          })

          // 结束动画
          this.timers.playing = setTimeout(() => {
            this.playing = false
            this.played = true
            this.$nextTick(() => {
              this.$emit('end', this.id)
            })
          }, this.delay * 1000)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .barrage-item {
    width: auto;
    right: 0px;
    display: block;
    position: absolute;
    transform: translate3d(100%, 0, 0);

    &.playing {
      transform: translate3d(calc(-100vw - 200%), 0, 0);
    }

    &.played {
      visibility: hidden;
    }
  }
</style>
