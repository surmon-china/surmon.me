<template>
  <div id="wallpaper">
    <div class="wallpaper-box" @click="onWallpaper">
      <div class="up">
        <span class="title">山河入梦</span>
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

    $offset: .5rem;

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


      @keyframes wall-paper-y {
        0% { transform: translateY(-$offset) }
        50% { transform: translateY($offset) }
        100% { transform: translateY(-$offset) }
      }

      @keyframes wall-paper-down {
        0% {
          transform: translateY(-1rem);
        }
        50% {
          transform: translateY(1rem);
        }
        100% {
          transform: translateY(-1rem);
        }
      }

      > .up,
      > .down {
        width: 3rem;
        height: 6.8rem;
        position: absolute;
      }

      > .up {
        top: 0;
        left: 0;
        z-index: 2;
        background-color: $yellow;
        animation: wall-paper-y 1.5s 0s infinite;

        > .title {
          display: block;
          float: right;
          width: 2rem;
          height: 100%;
          line-height: 1.6rem;
          padding-top: .2rem;
          font-family: webfont-bolder;
          text-align: center;
          color: $primary;
        }
      }

      > .down {
        top: 0;
        left: $offset;
        z-index: 1;
        background-color: $primary;
        animation: wall-paper-y 1.5s .75s infinite;
      }
    }
  }
</style>
