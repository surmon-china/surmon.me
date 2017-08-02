<template>
  <div class="global-barrage">
    <div class="barrage-box">
      <div class="message-box">
        <ul class="barrages-list">
          <li class="chat page">
            <div class="chatArea">
              <ul class="messages" ref="messages">
                <li class="message" v-for="message in messages">
                  {{ message }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
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
                 v-model="message" 
                 placeholder="回车...射"
                 @keyup.enter="sendMessage"/>
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
        socket,
        message: '',
        messages: [],
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
      }
    },
    // asyncData (context, callback) {
    //   socket.emit('last-messages', function (messages) {
    //     callback(null, {
    //       messages,
    //       message: ''
    //     })
    //   })
    // },
    beforeMount() {
      this.socket.on('new-message', message => {
        this.messages.push(message)
      })
    },
    methods: {
      sendMessage() {
        const text = this.message.trim()
        if (!text) return
        const message = {
          text,
          style: {
            size: this.sizeIndex,
            color: this.colorIndex
          },
          date: new Date().toJSON()
        }
        this.socket.emit('send-message', message)
        this.messages.push(message)
        this.message = ''
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

  .global-barrage {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 8;
    background-color: #b7b7b7c4;

    > .barrage-box {
      height: 100%;
      width: 100%;
      position: relative;
      display: block;
      margin-top: $header-height;

      > .message-box {
        height: 100%;
        width: 100%;
      }

      > .input-box {
        display: block;
        position: absolute;
        bottom: 40%;
        width: 100%;

        > .input-inner {
          display: flex;
          margin: 0 auto;
          width: 40rem;
          height: 4rem;
          background-color: rgba($module-bg, .9);

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
          }
        }
      }
    }
  }
</style>
