<template>
  <div id="wallpaper-switch" :class="{ dark: isDarkTheme }">
    <div class="switcher" @click="onWallpaper">
      <div class="up">
        <span class="title" :class="language">{{ $i18n.text.wallpaper }}</span>
      </div>
      <div class="down"></div>
    </div>
  </div>
</template>

<script>
  import systemConstants from '~/constants/system'
  export default {
    name: 'WallpaperSwitch',
    methods: {
      onWallpaper() {
        this.$ga.event(
          '今日壁纸',
          systemConstants.GAEventActions.Toggle,
          systemConstants.GAEventTags.Tool
        )
        if (this.$store.getters['wallpaper/parpers']) {
          this.$store.commit('global/toggleUpdateWallpaperOnState', true)
        } else {
          alert('可能 Bing 又被墙了吧我有什么办法！')
        }
      }
    },
    computed: {
      language() {
        return this.$store.state.global.language
      },
      isDarkTheme() {
        return this.$store.getters['global/isDarkTheme']
      }
    }
  }
</script>

<style lang="scss" scoped>
  #wallpaper-switch {
    position: fixed;
    left: 0;
    top: 70%;
    cursor: pointer;
    $offset: 6px;

    &.dark {
      .switcher .up .title {
        color: $text-reversal;
      }
    }

    > .switcher {
      width: 4rem;
      height: 8rem;
      opacity: .6;
      display: block;
      position: relative;
      transform: translateX(-$offset * 2);
      transition: opacity $transition-time-fast, transform $transition-time-fast;
      user-select: none;

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
        z-index: $z-index-normal + 1;
        background-color: $primary;
        animation: wallpaper-y 1.5s .75s infinite;
      }

      > .up {
        top: 0;
        left: 0;
        z-index: $z-index-normal + 2;
        background-color: $yellow;
        animation: wallpaper-y 1.5s 0s infinite;

        > .title {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 2rem;
          font-family: 'webfont-bolder', DINRegular;
          writing-mode: tb-rl;
          color: $primary;

          &.zh {
            letter-spacing: -2.5px;
          }

          &.en {
            text-align: center;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: $font-size-small;
          }
        }
      }
    }
  }
</style>
