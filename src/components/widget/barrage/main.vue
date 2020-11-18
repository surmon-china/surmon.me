<template>
  <div id="barrage" :class="{ active: isOnBarrage }">
    <div v-if="isOnBarrage" class="barrage-box">
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
        :class="{ 'motion-blur-vertical': state.transitioning }"
        @animationstart="handleInputAnimationStart"
        @animationend="handleInputAnimationEnd"
      >
        <div class="input-inner">
          <div class="size">
            <div class="active size" :class="'s-' + state.sizeIndex">
              {{ currentSizeText }}
            </div>
            <ul class="size list">
              <li
                v-for="(size, index) in sizes"
                :key="index"
                class="item"
                :class="'s-' + index"
                @click="handleSetSize(index)"
              >{{ size }}</li>
            </ul>
          </div>
          <div class="color">
            <div class="active color" :class="'color-' + state.colorIndex">
              {{ currentColorText }}
            </div>
            <ul class="color list">
              <li
                v-for="(color, index) in colors"
                :key="index"
                class="item"
                :class="'barrage-color-' + index"
                @click="handleSetColor(index)"
              >{{ color }}</li>
            </ul>
          </div>
          <input
            v-model="barrageInput"
            type="text"
            class="input"
            placeholder="Here we go"
            @keyup.enter="sendBarrage"
          >
          <div class="count">
            <span>{{ counts.users }} <i18n zh="人" en="U" /></span>
            <span class="separator">|</span>
            <span>{{ counts.count }} <i18n zh="发" en="C" /></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
  import { useEnhancer } from '/@/enhancer'
  import { SocketEvent } from '/@/constants/barrage'
  import socket from '/@/services/socket.io'
  import BarrageItem from './item.vue'
  import { randomPer } from './util'

  export default defineComponent({
    name: 'Barrage',
    components: {
      BarrageItem
    },
    setup() {
      const { i18n, globalState, isZhLang } = useEnhancer()
      const sizes = isZhLang.value
        ? ['粗大', '很大', '大']
        : ['Strong', 'Large', 'Normal'];
      const colors = isZhLang.value
        ? ['老王绿', '原谅绿', '姨妈红', '友情紫', '百合粉', '东莞黄', '李太白', '非常黑']
        : ['Green', 'Green2', 'Red', 'Purple', 'Pink', 'Yellow', 'White', 'Black'];

      const counts = reactive({ users: 0, count: 0 })
      const config = reactive({ delay: 10, moveDelay: 4 })
      const barrages = reactive<Array<any>>([])
      const barrageInput = ref('')
      let barrageLimit = 0
      const state = reactive({
        sizeIndex: sizes.length - 1,
        colorIndex: colors.length - 1,
        transitioning: false,
        moveTimer: null as null | number
      })

      const isOnBarrage = computed(() => globalState.switchBox.barrage)
      const currentColorText = computed(() => colors[state.colorIndex])
      const currentSizeText = computed(() => sizes[state.sizeIndex])

      const handleSetSize = (index: number) => {
        state.sizeIndex = index
      }
      const handleSetColor = (index: number) => {
        state.colorIndex = index
      }

      // 弹幕输入容器动画周期
      const handleInputAnimationStart = () => {
        state.transitioning = true
      }
      const handleInputAnimationEnd = () => {
        state.transitioning = false
      }
      const handleBarrageItemAnimationEnd = (id: number) => {
        const targetIndex = barrages.findIndex(barrage => barrage.id === id)
        if (targetIndex > -1) {
          barrages.splice(targetIndex, 1)
        }
      }

      // 发布弹幕
      const sendBarrage = () => {
        const text = barrageInput.value.trim()
        if (text) {
          const barrage: any = {
            text: text.slice(0, 40),
            style: {
              size: state.sizeIndex,
              color: state.colorIndex
            },
            date: new Date().getTime()
          }
          socket.emit(SocketEvent.Send, barrage)
          barrage.id = barrageLimit++
          barrages.push(barrage)
          counts.count += 1
          barrageInput.value = ''
        }
      }

      // 清空动画队列
      const clearBarrages = () => {
        barrages.length = 0
      }

      const initSocket = () => {
        socket.emit(SocketEvent.LastList, _barrages => {
          const lastBarrages = _barrages.map((barrage, index) => ({
            id: index + 1,
            ...barrage
          }))
          // 生成随机的时间，push 进不同的内容，而不是一次性赋值
          const moveBarrages = () => {
            if (lastBarrages.length) {
              barrages.push(lastBarrages[0])
              lastBarrages.splice(0, 1)
              if (lastBarrages.length) {
                state.moveTimer = window.setTimeout(
                  moveBarrages,
                  parseInt(String(randomPer(config.moveDelay)), 0) * 100
                )
              }
            }
          }
          moveBarrages()
          barrageLimit = lastBarrages.length + 2
        })
        socket.emit(SocketEvent.Count, _counts => {
          Object.assign(counts, _counts)
        })
        socket.on(SocketEvent.UpdateCount, _counts => {
          Object.assign(counts, _counts)
        })
        socket.on(SocketEvent.Create, barrage => {
          barrages.push({
            ...barrage,
            id: barrageLimit++,
            // 得到新消息时，若此刻弹幕窗未开启，则将此消息标记为过时消息，过时消息有不同的 UI 特征
            outdated: !isOnBarrage.value
          })
        })
      }

      const clean = () => {
        if (state.moveTimer) {
          window.clearTimeout(state.moveTimer)
        }
        clearBarrages()
      }

      // 当用户关闭弹幕时，清空所有队列中的（UI 上正在展示的）消息
      watch(
        () => isOnBarrage.value,
        on => on || clearBarrages()
      )

      onMounted(initSocket)
      onBeforeUnmount(clean)

      return {
        sizes,
        colors,
        currentColorText,
        currentSizeText,
        state,
        counts,
        config,
        barrages,
        barrageInput,
        isOnBarrage,
        sendBarrage,
        handleSetSize,
        handleSetColor,
        handleInputAnimationStart,
        handleInputAnimationEnd,
        handleBarrageItemAnimationEnd
      }
    }
  })
</script>

<style lang="scss">
  @import 'src/assets/styles/init.scss';

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
  @import 'src/assets/styles/init.scss';

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
    background-color: $module-bg-translucent;
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
          background-color: $module-bg-darker-1;

          .count {
            width: auto;
            height: 4rem;
            line-height: 4rem;
            padding: 0 $gap;
            text-align: center;

            .separator {
              margin: 0 $sm-gap;
            }
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
              background-color: $module-bg-darker-1;
              @include hidden();
              @include visibility-transition();

              > .item {
                height: 3rem;
                line-height: 3rem;
                text-align: center;
                cursor: pointer;
                @include background-transition();
                &:hover {
                  background-color: $module-bg-darker-2;
                }
              }
            }
          }

          > .input {
            width: auto;
            margin: 0 auto;
            flex-grow: 1;
            padding: 1rem;
            background-color: $module-bg-darker-2;
            @include background-transition();

            &:hover,
            &:focus {
              background-color: $module-bg-darker-3;
            }
          }
        }
      }
    }
  }
</style>
