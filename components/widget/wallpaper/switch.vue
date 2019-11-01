<template>
  <div id="wallpaper">
    <div class="wallpaper-box" @click="onWallpaper">
      <div class="up">
        <span
          class="title"
          :class="{ en: isEnLang }"
          v-text="$i18n.text.wallpaper"
        ></span>
      </div>
      <div class="down"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wallpaper-switch',
    methods: {
      onWallpaper() {
        this.$ga.event('今日壁纸', '切换', 'tool')
        if (this.wallpapers) {
          this.$store.commit('global/updateWallpaperOnState', true)
        } else {
          alert('可能 Bing 又被墙了吧我有什么办法！')
        }
      }
    },
    computed: {
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      wallpapers() {
        return this.$store.state.wallpaper.papers.data
      }
    }
  }
</script>

<style lang="scss" scoped>
  #wallpaper {
    position: fixed;
    left: 0;
    top: 74%;
    cursor: pointer;

    $offset: 6px;

    > .wallpaper-box {
      width: 4rem;
      height: 8rem;
      opacity: .6;
      display: block;
      position: relative;
      transform: translateX(-$offset * 2);
      
      &:hover {
        opacity: .8;
        transform: translateX(-$offset);
      }

      @keyframes wallpaper-y {
        0% { transform: translateY(-$offset) }
        50% { transform: translateY($offset) }
        100% { transform: translateY(-$offset) }
      }

      > .up,
      > .down {
        width: 3rem;
        height: 6.8rem;
        position: absolute;
      }

      > .down {
        top: 0;
        left: $offset;
        z-index: 1;
        background-color: $primary;
        animation: wallpaper-y 1.5s .75s infinite;
      }

      > .up {
        top: 0;
        left: 0;
        z-index: 2;
        background-color: $yellow;
        animation: wallpaper-y 1.5s 0s infinite;

        > .title {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 2rem;
          font-family: webfont-bolder, DINRegular;
          text-align: center;
          color: $primary;
          writing-mode: tb-rl;
          letter-spacing: $xs-gap;

          &.en {
            font-weight: bold;
            letter-spacing: 0px;
          }
        }
      }
    }
  }
</style>
