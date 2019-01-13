<template>
  <li
    class="flower-item"
    :style="styles"
    :class="playing ? 'playing' : ''"
    v-text="options.text"
  ></li>
</template>

<script>
  export default {
    name: 'flower-item',
    props: {
      options: {
        type: Object,
        required: true
      },
      zindex: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        // 播放时长
        delay: 1,
        // 定时器
        timer: null,
        // 播放状态
        playing: false,
      }
    },
    computed: {
      styles() {
        return {
          top: this.options.y + 'px',
          left: this.options.x + 'px',
          'z-index': 99999 + this.zindex,
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
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    methods: {
      startAnimation() {
        this.$nextTick(() => {

          // 开始动画
          setTimeout(() => {
            this.playing = true
          })

          // 结束动画
          this.timer = setTimeout(() => {
            this.playing = false
            this.$nextTick(() => {
              this.$emit('end', this.options.id)
            })
          }, this.delay * 1000)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .flower-item {
    position: fixed;
    opacity: 1;
    display: block;
    transform: translate3d(-50%, -50%, 0);
    transition: opacity .5s;
    color: $primary;
    font-family: webfont-bolder;
    font-size: $font-size-h2;

    @keyframes flower-playing {
      0%  { transform: translate3d(-50%, -50%, 0); }
      80% { transform: translate3d(-50%, -400%, 0); opacity: .8; }
      100%  { transform: translate3d(-50%, -500%, 0); opacity: 0; }
    }

    &.playing {
      animation: flower-playing 1s ease 0s forwards;
    }
  }
</style>
