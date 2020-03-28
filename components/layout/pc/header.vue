<template>
  <header id="header" class="header">
    <div class="header-container container">
      <div class="header-header">
        <img :src="'/images/logo.svg' | byCDN" class="header-logo">
        <span class="header-slogan">{{ $i18n.text.slogan }}</span>
        <nuxt-link to="/" class="header-link" :title="$i18n.text.slogan" />
      </div>
      <div class="header-player">
        <div class="panel">
          <button
            class="prev-song button"
            :disabled="!musicPlayer.ready || musicPlayer.index === 0"
            @click="musicPlayer.prevSong"
          >
            <i class="iconfont icon-music-prev"></i>
          </button>
          <button
            class="toggle-play button"
            :disabled="!musicPlayer.ready"
            @click="musicPlayer.togglePlay"
          >
            <i
              class="iconfont"
              :class="musicPlayer.playing ? 'icon-music-pause' : 'icon-music-play'"
            ></i>
          </button>
          <button
            class="next-song button"
            :disabled="!musicPlayer.ready"
            @click="musicPlayer.nextSong"
          >
            <i class="iconfont icon-music-next"></i>
          </button>
          <button
            class="muted-toggle button"
            :disabled="!musicPlayer.ready"
            @click="musicPlayer.toggleMuted"
          >
            <i
              class="iconfont"
              :class="musicPlayer.muted ? 'icon-music-muted' : 'icon-music-volume'"
            ></i>
          </button>
        </div>
        <div v-if="currentSong" class="song">
          <nuxt-link
            to="/music"
            class="link"
            :title="`${currentSong.name} / ${currentSong.album || 'unknow'}`"
          >
            <span>{{ currentSong.name }} By {{ currentSong.artist }} / {{ currentSong.album || 'unknow' }}</span>
          </nuxt-link>
        </div>
        <div v-else class="song">{{ $i18n.text.music.empty }}</div>
      </div>
    </div>
    <div class="pre-load">
      <img v-if="preload" :src="musicPlayer.currentSongPicUrl" alt="song-thumb">
      <img v-if="preload" :src="'/images/sponsor.png' | byCDN" alt="sponsor">
      <img v-if="preload" :src="'/images/app-hot.png' | byCDN" alt="app-download">
      <img v-if="preload" :src="'/images/app-logo.png' | byCDN" alt="app-logo">
      <img v-if="preload" :src="'/images/service.jpg' | byCDN" alt="service">
      <img v-if="preload" :src="'/images/about-background-be-1.jpg' | byCDN" alt="background">
      <img v-if="preload" :src="'/images/about-background-be-2.jpg' | byCDN" alt="background">
      <img v-if="preload" :src="'/images/about-background-star-1.png' | byCDN" alt="background">
      <img v-if="preload" :src="'/images/about-background-star-2.png' | byCDN" alt="background">
    </div>
  </header>
</template>

<script>
  import { isBrowser } from '~/environment'
  import musicPlayer from '~/services/music-player'
  export default {
    name: 'PcHeader',
    data() {
      return {
        preload: false
      }
    },
    mounted() {
      if (isBrowser) {
        window.addLoadedTask(() => {
          this.preload = true
        })
      }
    },
    computed: {
      musicPlayer() {
        return musicPlayer
      },
      currentSong() {
        return musicPlayer.currentSong
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $header-height;
    z-index: $z-index-header;
    background-color: $module-bg;
    user-select: none;
    // 过段时间再打开吧，闪屏太严重了
    // @include backdrop-blur();

    .header-container {
      height: 100%;
      display: flex;
      justify-content: space-between;

      .header-header {
        height: 100%;
        display: flex;
        position: relative;
        align-items: center;
        padding-left: $sm-gap;
        width: 29em;
        overflow: hidden;

        @keyframes logo-blink {
          0% { mask-position: -30% }
          100% { mask-position: 666% }
        }

        .header-logo {
          width: 11rem;
          margin-right: $gap * 4;
          filter: $theme-logo-rotate;
          mask-size: 88%;
          mask-position: -30%;
          mask-image: linear-gradient(
            to bottom right,
            rgba(255, 255, 255, 0.2),
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.2) 
          );
          animation: logo-blink 8s ease-in 1s infinite;

          .logo-st {
            fill: $primary;
          }
        }

        .header-slogan {
          color: $primary;
          font-family: 'webfont-normal', DINRegular;
        }

        .header-link {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }

      .header-player {
        width: 14rem;
        display: flex;
        flex-direction: column;
        align-items: inherit;
        justify-content: center;
        opacity: .3;
        @include text-overflow();
        @include visibility-transition();

        &:hover {
          opacity: 1;
        }

        > .panel {
          display: flex;
          justify-content: flex-start;
          margin-bottom: $xs-gap;

          > .button {
            margin-right: $lg-gap;

            &:hover {
              .iconfont {
                color: $link-hover-color;
              }
            }
          }
        }

        > .song {
          font-size: $font-size-small;
          @include text-overflow();

          > .link {
            color: $text-dividers;
            @include color-transition();

            &:hover {
              color: $link-hover-color;
            }
          }
        }

        .iconfont {
          color: $text-dividers;
          @include color-transition();
        }
      }
    }

    > .pre-load {
      width: 0;
      height: 0;
      @include hidden();
    }
  }
</style>
