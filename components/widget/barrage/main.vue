<template>
  <div id="barrage" :class="{ active: onBarrage }">
    <div v-if="onBarrage" class="barrage-box">
      <ul class="barrages-list-box">
        <barrage-item
          v-for="_barrage in barrages"
          :id="_barrage.id"
          :key="_barrage.id"
          :barrage="_barrage"
          :delay="config.delay"
          @end="handleBarrageItemAnimationEnd"
        />
      </ul>
      <div
        class="input-box filter"
        :class="{ 'motion-blur-vertical': transitioning }"
        @animationstart="handleInputAnimationStart"
        @animationend="handleInputAnimationEnd"
      >
        <div class="input-inner">
          <div class="size">
            <div class="active size" :class="'s-' + sizeIndex">{{ currentSize }}</div>
            <ul class="size list">
              <li
                v-for="(size, index) in sizes"
                :key="index"
                class="item"
                :class="'s-' + index"
                @click="sizeIndex = index"
              >{{ size }}</li>
            </ul>
          </div>
          <div class="color">
            <div class="active color" :class="'color-' + colorIndex">{{ currentColor }}</div>
            <ul class="color list">
              <li
                v-for="(color, index) in colors"
                :key="index"
                class="item"
                :class="'barrage-color-' + index"
                @click="colorIndex = index"
              >{{ color }}</li>
            </ul>
          </div>
          <input
            v-model="barrage"
            type="text"
            class="input"
            placeholder="Here we go"
            @keyup.enter="sendbarrage"
          >
          <div class="count">
            <span>{{ counts.users }} {{ isEnLang ? 'U' : '人' }}</span>
            <span>&nbsp;|&nbsp;</span>
            <span>{{ counts.count }} {{ isEnLang ? 'C' : ' 发' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import socket from '~/plugins/socket.io'
  import BarrageItem from './item'
  export default {
    name: 'Barrage',
    components: {
      BarrageItem
    },
    data() {
      const sizes = this.isEnLang ? ['Strong', 'Large', 'Normal'] : ['粗大', '很大', '大'];
      const colors = this.isEnLang
        ? ['Green', 'Green2', 'Red', 'Purple', 'Pink', 'Yellow', 'White', 'Black']
        : ['老王绿', '原谅绿', '姨妈红', '友情紫', '百合粉', '东莞黄', '李太白', '非常黑'];
      return {
        sizes,
        colors,
        counts: {
          users: 0,
          count: 0
        },
        config: {
          delay: 10,
          moveDelay: 4
        },
        barrage: '',
        barrages: [],
        moveTimer: null,
        barrageLimit: 0,
        sizeIndex: sizes.length - 1,
        colorIndex: colors.length - 1,
        transitioning: false
      }
    },
    computed: {
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      onBarrage() {
        return this.$store.state.global.onBarrage
      },
      currentColor() {
        return this.colors[this.colorIndex]
      },
      currentSize() {
        return this.sizes[this.sizeIndex]
      }
    },
    methods: {
      // 弹幕输入容器动画周期
      handleInputAnimationStart() {
        this.transitioning = true
      },
      handleInputAnimationEnd() {
        this.transitioning = false
      },
      handleBarrageItemAnimationEnd(id) {
        const targetIndex = this.barrages.findIndex(barrage => barrage.id === id)
        if (targetIndex > -1) {
          this.barrages.splice(targetIndex, 1)
        }
      },
      // 发布弹幕
      sendbarrage() {
        const text = this.barrage.trim()
        if (!text) return
        const barrage = {
          text: text.slice(0, 40),
          style: {
            size: this.sizeIndex,
            color: this.colorIndex
          },
          date: new Date().getTime()
        }
        socket.emit('barrage-send', barrage)
        barrage.id = this.barrageLimit++
        this.barrages.push(barrage)
        this.counts.count += 1
        this.barrage = ''
      },
      // 时间转换
      transferDate(timestamp) {
        return new Date(timestamp).toLocaleString()
      },
      // 计算随机数
      randomPer(pre = 3) {
        const step1 = new Date().getTime() * 9301 + 49297
        const step2 = (step1 % 233280) / 233280.0
        return step2 * pre + Math.random()
      },
      // 清空动画队列
      clearBarrages() {
        this.barrages = []
      }
    },
    watch: {
      onBarrage(onBarrage) {
        // 当用户关闭弹幕时，清空所有队列中的（UI 上正在展示的）消息
        onBarrage || this.clearBarrages()
      }
    },
    mounted() {
      socket.emit('barrage-last-list', barrages => {
        barrages.forEach((barrage, index) => {
          barrage.id = index + 1
        })
        // 生成随机的时间，push 进不同的内容，而不是一次性赋值
        const moveBarrages = () => {
          if (barrages.length) {
            // console.log('moveBarrages， 还有', barrages.length)
            this.barrages.push(barrages[0])
            barrages.splice(0, 1)
            if (barrages.length) {
              this.moveTimer = setTimeout( 
                moveBarrages,
                parseInt(
                  this.randomPer(this.config.moveDelay), 0
                ) * 100
              )
            }
          }
        }
        moveBarrages()
        this.barrageLimit = barrages.length + 2
      })
      socket.emit('barrage-count', counts => {
        this.counts = counts
      })
      socket.on('barrage-update-count', counts => {
        this.counts = counts
      })
      socket.on('barrage-create', barrage => {
        this.barrages.push({
          ...barrage,
          // 得到新消息时，若此刻弹幕窗未开启，则将此消息标记为过时消息，过时消息有不同的 UI 特征
          outdated: !this.onBarrage
        })
      })
    },
    beforeDestroy() {
      if (this.moveTimer) {
        clearTimeout(this.moveTimer)
      }
      this.clearBarrages()
    }
  }
</script>

<style lang="scss">
  // 字体尺寸
  .barrage-size-0 {
    font-size: 3em;
    font-weight: bolder;
  }
  .barrage-size-1 {
    font-size: 3em;
  }
  .barrage-size-2 {
    font-size: 2em;
  }

  // 字体颜色
  .barrage-color-0 {
    color: chartreuse;
  }
  .barrage-color-1 {
    color: green;
  }
  .barrage-color-2 {
    color: red;
  }
  .barrage-color-3 {
    color: darkviolet;
  }
  .barrage-color-4 {
    color: pink;
  }
  .barrage-color-5 {
    color: yellow;
  }
  .barrage-color-6 {
    color: white;
  }
  .barrage-color-7 {
    color: black;
  }
</style>

<style lang="scss" scoped>
  @keyframes input-box-in {
    0% { transform: translate3d(0, -2000%, 0) }
    65% { transform: translate3d(0, 100%, 0) }
    80% { transform: translate3d(0, -80%, 0) }
    100% { transform: translate3d(0, 0, 0) }
  }

  #barrage {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: $z-index-toolbox - 1;
    background-color: $module-hover-bg-darken-20;
    // 由于使用 backdrop-blur，会导致 animation 性能并不好，所以都移除了
    transform: translate3d(0, -100%, 0);
    @include backdrop-blur();
    @include hidden();
    transition:
      opacity $transition-time-normal,
      visibility $transition-time-normal,
      transform $transition-time-normal
    ;

    &.active {
      @include visible();
      transform: translate3d(0, 0, 0);

      > .barrage-box {
        > .input-box {
          animation-delay: $transition-time-slow;
          animation-duration: $transition-time-slow * 1.5; 
          animation-fill-mode: both; 
          animation-name: input-box-in;
          animation-timing-function: ease;
        }
      }
    }

    > .barrage-box {
      width: 100%;
      height: 100%;
      display: block;
      position: relative;
      padding-top: $header-height;

      > .barrages-list-box {
        display: block;
        position: relative;
        height: 100%;
        width: 100%;
        list-style: square;
        padding: 0;
        margin: 0;
        user-select: none;

        @keyframes barrages-list-out {
          0% { transform: translate3d(100%, 0, 0) }
          90% { transform: translate3d(-100%, 0, 0) }
        }

        .barrages-list-leave-active {
          animation-duration: 30s; 
          animation-fill-mode: both; 
          animation-name: barrages-list-out;
        }
      }

      > .input-box {
        display: block;
        position: absolute;
        bottom: 40%;
        width: 100%;
        z-index: $z-index-header;
        transition: transform 5s;
        transform: translate3d(0, -2000%, 0);

        > .input-inner {
          display: flex;
          margin: 0 auto;
          width: 42rem;
          height: 4rem;
          background-color: $module-bg-opacity-8;

          > .count {
            width: auto;
            height: 4rem;
            line-height: 4rem;
            padding: 0 $gap;
            text-align: center;
          }

          > .size,
          > .color {
            width: 7rem;
            position: relative;

            &:hover {
              > .list {
                @include visible();
              }
            }

            > .active {
              cursor: pointer;
              display: block;
              width: 100%;
              height: 4rem;
              line-height: 4rem;
              text-align: center;
            }

            > .list {
              margin: 0;
              padding: 0;
              list-style: none;
              position: absolute;
              bottom: 4rem;
              left: 0;
              width: 100%;
              height: auto;
              background-color: $module-bg-opacity-8;
              @include hidden();
              @include visibility-transition();

              > .item {
                height: 3rem;
                line-height: 3rem;
                text-align: center;
                cursor: pointer;
                @include background-transition();

                &:hover {
                  background-color: $module-bg-opacity-8;
                }
              }
            }
          }

          > .input {
            width: auto;
            margin: 0 auto;
            flex-grow: 1;
            padding: 1rem;
            background-color: $module-bg-opacity-5;

            &:hover,
            &:focus {
              background-color: $module-bg-opacity-9;
            }
          }
        }
      }
    }
  }
</style>
