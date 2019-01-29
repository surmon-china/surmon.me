<template>
  <div id="wallpaper-wall">
    <div class="wall-box">
      <div class="picture-box" ref="picture-box">
        <transition name="module" mode="out-in">
          <img
            class="picture"
            :key="currentWallpaperUrl"
            :src="currentWallpaperUrl"
            :alt="subTitle"
            :class="classes[index]"
          />
        </transition>
      </div>
      <div class="story-box" :class="classes[index]">
        <div class="empty" v-if="!currentWallpaper">挂了</div>
        <div class="content" v-else>
          <h2 class="title" v-if="isToday">{{ todayStory.title }}</h2>
          <p class="subb-title" v-if="isToday">{{ subTitle }}</p>
          <h2 class="title" v-else>{{ subTitle }}</h2>
          <p class="para" v-if="isToday">{{ todayStory.para1 }}</p>
          <p class="para" v-if="isToday">{{ todayStory.para2 }}</p>
          <div class="tools">
            <transition name="module">
              <span class="location" key="location" v-if="isToday">
                <i class="iconfont icon-location"></i>
                <span>{{ todayStory.attribute }}</span>
                <span>&nbsp;|&nbsp;</span>
                <span>{{ todayStory.Continent }}</span>
              </span>
            </transition>
            <transition name="module">
              <a
                class="link"
                key="link"
                v-if="link"
                :href="link"
                target="_blank"
                rel="external nofollow noopenter"
              >
                <i class="iconfont icon-link"></i>
                <span>相关链接</span>
              </a>
            </transition>
            <button class="btn" title="上一幅" :disabled="!canNext" @click="index++">
              <i class="iconfont icon-prev"></i>
            </button>
            <button class="btn" title="下一幅" :disabled="!canPrev" @click="index--">
              <i class="iconfont icon-next"></i>
            </button>
            <button class="btn" title="春尽江南" @click="close">
              <i class="iconfont icon-cancel"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'wallpaper-wall',
    data() {
      return {
        index: 0,
        classes: {}
      }
    },
    methods: {
      close() {
        this.$store.commit('global/updateWallpaperOnState', false)
      },
      setPaperImageClass(index) {
        // 由于用户窗口可能发生变化，所以每次都重新计算
        const pictureBox = this.$refs['picture-box']
        const { clientWidth, clientHeight } = pictureBox
        const sizeRadio = clientWidth / clientHeight
        const image = new Image()
        image.onload = () => {
          const { width, height } = image
          const imageRadio = width / height
          const className = imageRadio > sizeRadio ? 'full-height' : 'full-width'
          Vue.set(this.classes, index, className)
        }
        image.src = this.currentWallpaperUrl
      }
    },
    watch: {
      index(index) {
        this.$nextTick(() => {
          this.setPaperImageClass(index)
        })
      }
    },
    mounted() {
      this.setPaperImageClass(0)
    },
    computed: {
      wallpapers() {
        return this.$store.state.wallpaper.papers.data
      },
      todayStory() {
        return this.$store.state.wallpaper.story.data
      },
      currentWallpaper() {
        return this.wallpapers && this.wallpapers.length && this.wallpapers[this.index]
      },
      currentWallpaperUrl() {
        return this.currentWallpaper ? this.currentWallpaper.defaultUrl : ''
      },
      link() {
        return this.currentWallpaper.copyrightlink || null
      },
      subTitle() {
        return this.currentWallpaper.title || this.currentWallpaper.copyright
      },
      isToday() {
        return this.index === 0
      },
      canPrev() {
        return this.index > 0
      },
      canNext()  {
        return this.wallpapers ? (this.index < this.wallpapers.length - 1) : false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #wallpaper-wall {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: $module-hover-bg-darken-20;

    > .wall-box {
      position: relative;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: calc(100vw * 0.88);
      height: calc(100vh * 0.88);
      background-color: $module-bg;
      border: solid .5rem $module-hover-bg;

      > .picture-box {
        width: 100%;
        height: 100%;
        overflow: auto;

        > .picture {

          &.full-width {
            width: 100%;
          }

          &.full-height {
            height: 100%;
          }
        }
      }

      > .story-box {
        position: absolute;
        padding: 2rem 4rem;
        background-color: $module-hover-bg;
        bottom: 5px;
        width: 100%;
        height: auto;

        &.full-width {
           bottom: 0;
        }

        > .content {
          color: $white;

          > .title {
            margin-top: 0;
          }

          > .para {
            line-height: 2rem;
          }

          > .tools {
            color: $text;

            > .link {
              text-decoration: underline;
            }

            > .location,
            > .link,
            > .btn {
              display: block;
              float: left;
              background-color: $module-bg;
              margin-right: 1rem;
              height: 3rem;
              line-height: 3rem;
              padding: 0 1rem;
            }

            > .link,
            > .btn {
              &:hover {
                background-color: $module-hover-bg-opacity-9;
              }
            }

            > .btn {

              &[disabled] {
                opacity: .6;
              }
            }
          }
        }
      }
    }
  }
</style>
