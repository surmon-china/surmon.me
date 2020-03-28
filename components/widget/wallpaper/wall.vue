<template>
  <div id="wallpaper-wall">
    <div class="wall-box">
      <transition name="module" mode="out-in">
        <div
          ref="picture-box"
          :key="currentWallpaperUrl"
          class="picture-box"
          :title="currentWallpaper.copyright"
          :style="{
            backgroundImage: `url(${currentWallpaperUrl})`
          }"
        />
      </transition>
      <div class="story-box">
        <template v-if="currentWallpaper.title">
          <h2 class="title">{{ currentWallpaper.title }}</h2>
          <p class="sub-title">{{ currentWallpaper.copyright }}</p>
        </template>
        <template v-else>
          <h2 class="title lonely">{{ currentWallpaper.copyright }}</h2>
        </template>
        <p class="desc">{{ currentWallpaper.desc }}</p>
        <div class="tools">
          <transition name="module">
            <a
              key="location"
              class="location"
              target="_blank"
              rel="external nofollow noopenter"
              :href="currentWallpaper.humanizedCopyrightUrl"
              :title="currentWallpaper.bsTitle"
            >
              <i class="iconfont icon-location"></i>
              <span class="text">{{ currentWallpaper.bsTitle }}</span>
            </a>
          </transition>
          <button class="button" title="上一幅" :disabled="!canNext" @click="index++">
            <i class="iconfont icon-prev"></i>
          </button>
          <button class="button" title="下一幅" :disabled="!canPrev" @click="index--">
            <i class="iconfont icon-next"></i>
          </button>
          <button class="button" title="春尽江南" @click="close">
            <i class="iconfont icon-cancel"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WallpaperWall',
    data() {
      return {
        index: 0
      }
    },
    methods: {
      close() {
        this.$store.commit('global/toggleUpdateWallpaperOnState', false)
      }
    },
    computed: {
      wallpapers() {
        return this.$store.getters['wallpaper/parpers']
      },
      currentWallpaper() {
        return this.wallpapers?.length && this.wallpapers?.[this.index]
      },
      currentWallpaperUrl() {
        return this.currentWallpaper?.humanizedImageUrl
      },
      canPrev() {
        return this.index > 0
      },
      canNext() {
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
    z-index: $z-index-top;
    background-color: $module-hover-bg-darken-20;
    @include backdrop-blur();

    > .wall-box {
      position: relative;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 88vw;
      height: 88vh;
      border: solid $sm-gap $module-hover-bg;
      background-color: $module-bg;

      > .picture-box {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
      }

      > .story-box {
        position: absolute;
        padding: 2rem 4rem;
        background-color: $module-hover-bg;
        bottom: 0;
        width: 100%;
        height: auto;
        color: $text;

        > .title,
        > .sub-title,
        > .desc {
          @include title-shadow();
        }

        > .title {
          margin-top: 0;

          &.lonely {
            margin-bottom: 3rem;
          }
        }

        > .desc {
          line-height: 2rem;
        }

        > .tools {
          color: $text;

          > .location,
          > .button {
            display: block;
            float: left;
            height: 3rem;
            line-height: 3rem;
            padding: 0 $gap;
            margin-right: $gap;
            background-color: $module-bg;
            @include background-transition();

            &:hover {
              background-color: $module-hover-bg-opacity-9;
            }
          }

          > .button {
            &[disabled] {
              opacity: .6;
            }
          }
        }
      }
    }
  }
</style>
