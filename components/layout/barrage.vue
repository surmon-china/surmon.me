 <template>
  <div class="global-barrage" :class="{ active: barrageState }">
    <div class="barrage-box">
      <div class="barrage-box" ref="barrageBox">
        <transition-group tag="ul" 
                          name="barrages-list" 
                          class="barrages-list" 
                          ref="barrages"
                          @enter="barrageEnter"
                          @leave="barrageLeave">
          <li class="item" 
              :key="barrage.text"
              :index="index"
              :new="barrage.new"
              v-for="(barrage, index) in barrages"
              :class="[`size-${barrage.style.size}`, `color-${barrage.style.color}`]">
            <span class="gravatar"></span>
            <span class="content" v-text="barrage.text"></span>
          </li>
        </transition-group>
      </div>
      <div class="input-box">
        <div class="input-inner">
          <div class="size">
            <div class="active size" :class="['s-' + sizeIndex]">{{ currentSize }}</div>
            <ul class="size list">
              <li class="item" 
                  :class="['s-' + index]"
                  v-for="(size, index) in sizes" 
                  @click="sizeIndex = index">{{ size }}</li>
            </ul>
          </div>
          <div class="color">
            <div class="active color" :class="['color-' + colorIndex]">{{ currentColor }}</div>
            <ul class="color list">
              <li class="item" 
                  :class="['color-' + index]"
                  v-for="(color, index) in colors"
                  @click="colorIndex = index">{{ color }}</li>
            </ul>
          </div>
          <input type="text" 
                 class="input" 
                 v-model="barrage" 
                 placeholder="Let's fuck"
                 @keyup.enter="sendbarrage"/>
          <div class="count">
            <span>{{ counts.users }}人</span>
            <span>&nbsp;|&nbsp;</span>
            <span>{{ counts.count }}发</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import socket from '~/plugins/socket.io.js'
  export default {
    data() {
      const sizes = ['粗大', '很大', '大']
      const colors = ['老王绿', '原谅绿', '姨妈红', '基佬紫', '百合粉', '东莞黄', '李太白', '木耳黑']
      return {
        counts: {
          users: 0,
          count: 0
        },
        socket,
        barrage: '',
        barrages: [],
        sizes,
        colors,
        sizeIndex: sizes.length - 1,
        colorIndex: colors.length - 1
      }
    },
    computed: {
      currentColor() {
        return this.colors[this.colorIndex]
      },
      currentSize() {
        return this.sizes[this.sizeIndex]
      },
      barrageState() {
        return this.$store.state.option.openBarrage
      }
    },
    beforeMount() {
      this.socket.emit('barrage-last-list', barrages => {
        this.barrages = barrages
      })
      this.socket.emit('barrage-count', counts => {
        this.counts = counts
      })
      this.socket.on('barrage-update-count', counts => {
        this.counts = counts
      })
      this.socket.on('barrage-create', barrage => {
        this.barrages.push(barrage)
      })
    },
    methods: {
      sendbarrage() {
        const text = this.barrage.trim()
        if (!text) return
        const barrage = {
          text,
          style: {
            size: this.sizeIndex,
            color: this.colorIndex
          },
          date: new Date().getTime()
        }
        this.socket.emit('barrage-send', barrage)
        barrage.new = true
        this.barrages.push(barrage)
        this.counts.count += 1
        this.barrage = ''
      },
      transferDate(timestamp) {
        return new Date(timestamp).toLocaleString()
      },
      randomPer(pre = 3) {
        const rnd = seed => {
            seed = (seed * 9301 + 49297) % 233280
            return seed / (233280.0)
        }
        const rand = number => {
            const seed = new Date().getTime()
            return rnd(seed) * number + Math.random()
            // return Math.ceil(rnd(seed) * number)
        }
        return rand(pre)
      },
      barrageLeave(element, done) {
        // 获取渲染容器高度
        const innerHeight = document.documentElement.clientHeight - 63
        const innerCount = innerHeight / 30
        let randomCount = this.randomPer(innerCount) - 3
        randomCount = randomCount < 0 ? 1 : randomCount
        let topPre = randomCount / innerCount * 100
        topPre = (topPre > 88) ? 86 : topPre
        element.style.top = topPre + '%'
        // 新消息不再添加左边距
        if (!element.attributes.new) {
          element.style.left = this.randomPer(6) * 10 + '%'
        }
        setTimeout(done, 28000)
      },
      barrageEnter(element, done) {
        done()
      }
    },
    watch: {
      barrages() {
        if (this.barrages.length) {
          this.$nextTick(() => {
            this.barrages.shift()
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';

  // 字体尺寸
  .size-0 {
    font-size: 3rem;
    font-weight: bolder;
  }

  .size-1 {
    font-size: 3rem;
  }

  .size-2 {
    font-size: 2rem;
  }

  // 字体颜色
  .color-0 {
    color: chartreuse;
  }

  .color-1 {
    color: green;
  }

  .color-2 {
    color: red;
  }

  .color-3 {
    color: darkviolet;
  }

  .color-4 {
    color: pink;
  }

  .color-5 {
    color: yellow;
  }

  .color-6 {
    color: white;
  }

  .color-7 {
    color: black;
  }

  @keyframes barrage-in {
    0%  { transform: translate3d(0, -100%, 0) }
    25%, 50%, 75%, 100% { transform: translate3d(0, 0, 0) }
    37%  { transform: translate3d(0, -24%, 0) }
    62% { transform: translate3d(0, -12%, 0) }
    88% { transform: translate3d(0, -5%, 0) }
  }

  @keyframes barrage-out {
    0%  { transform: translate3d(0, 0, 0) }
    100%  { transform: translate3d(0, -100%, 0) }
  }

  @keyframes input-box-in {
    0%  { transform: translate3d(0, -2000%, 0) }
    65%  { transform: translate3d(0, 100%, 0) }
    80%  { transform: translate3d(0, -80%, 0) }
    100%  { transform: translate3d(0, 0, 0) }
  }

  @keyframes inputColor {
    0%  { color: chartreuse }
    12% { color: green }
    24% { color: red }
    36% { color: darkviolet }
    60% { color: pink }
    72% { color: yellow }
    86% { color: white }
    100% { color: black }
  }

  .global-barrage {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 8;
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, -100%, 0);
    animation-duration: .5s; 
    animation-fill-mode: both; 
    animation-name: barrage-out;
    background-color: #b7b7b7c4;
    background-color: rgba(183, 183, 183, 0.7);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    perspective: 1000;
    -webkit-perspective: 1000;

    > .barrage-box {

      > .input-box {
        transition: transform 5s;
        transform: translate3d(0, -2000%, 0);
      }
    }

    &.active {
      opacity: 1;
      visibility: visible;
      animation-duration: 1.556s;
      animation-fill-mode: both; 
      animation-name: barrage-in;
      animation-timing-function: ease;

      > .barrage-box {

        > .input-box {
          // transition: transform 5s;
          animation-delay: 1.6s;
          animation-duration: .5s; 
          animation-fill-mode: both; 
          animation-name: input-box-in;
          animation-timing-function: ease;
          // transform: translate3d(0, 0, 0);
        }
      }
    }

    > .barrage-box {
      height: 100%;
      width: 100%;
      position: relative;
      display: block;
      margin-top: $header-height;

      > .barrage-box {
        height: 100%;
        width: 100%;
        display: block;
        position: relative;

        > .barrages-list {
          list-style: square;
          display: block;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;

          @keyframes barrages-list-out {
            0%  { transform: translate3d(100%, 0, 0) }
            90% { transform: translate3d(-100%, 0, 0) }
          }

          .barrages-list-leave-active {
            animation-duration: 30s; 
            animation-fill-mode: both; 
            animation-name: barrages-list-out;
          }

          > .item {
            width: auto;
            min-width: 100%;
            display: block;
            position: absolute;
            transform: translate3d(-100%, 0, 0);
          }
        }
      }

      > .input-box {
        display: block;
        position: absolute;
        bottom: 40%;
        width: 100%;

        > .input-inner {
          display: flex;
          margin: 0 auto;
          width: 42rem;
          height: 4rem;
          background-color: rgba($module-bg, .7);

          > .count {
            width: auto;
            min-width: 9rem;
            height: 4rem;
            line-height: 4rem;
            text-align: center;
            border-left: 1px dashed darken($module-bg, 10%);
          }

          > .size,
          > .color {
            width: 7rem;
            position: relative;
            border-right: 1px dashed darken($module-bg, 10%);

            &:hover {

              & > .list {
                visibility: visible;
                opacity: 1;
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
              background-color: $module-bg;
              visibility: hidden;
              opacity: 0;

              > .item {
                height: 3rem;
                line-height: 3rem;
                text-align: center;
                cursor: pointer;

                &:hover {
                  background-color: rgba($module-bg, .7);
                }
              }
            }
          }

          > .input {
            width: auto;
            margin: 0 auto;
            flex-grow: 1;
            padding: 1rem;
            background-color: rgba($module-bg, .3);

            &:hover,
            &:focus {
              background-color: rgba($module-bg, .5);
              animation: inputColor 10s infinite;
            }
          }
        }
      }
    }
  }
</style>
