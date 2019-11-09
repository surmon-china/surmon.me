<template>
  <header id="header" class="header">
    <div class="header-container container">
      <div class="header-header">
        <img :src="'/images/logo.svg' | byCDN" class="header-logo">
        <span class="header-slogan" v-text="$i18n.text.slogan"></span>
        <nuxt-link to="/" class="header-link" :title="$i18n.text.slogan" />
      </div>
      <div class="header-player">
        <div class="panel">
          <button class="prev-song btn" @click="prevSong" :disabled="!playerState.ready">
            <i class="iconfont icon-music-prev"></i>
          </button>
          <button class="toggle-play btn" @click="togglePlay" :disabled="!playerState.ready">
            <i class="iconfont" :class="playerState.playing ? 'icon-music-pause' : 'icon-music-play'"></i>
          </button>
          <button class="next-song btn" @click="nextSong" :disabled="!playerState.ready">
            <i class="iconfont icon-music-next"></i>
          </button>
          <button class="muted-toggle btn" @click="toggleMuted" :disabled="!playerState.ready">
            <i class="iconfont" :class="playerState.muted ? 'icon-music-muted' : 'icon-music-volume'"></i>
          </button>
        </div>
        <div class="song" v-if="currentSong">
          <nuxt-link
            to="/music"
            class="link"
            :title="`${currentSong.name} / ${currentSong.album.name || 'unknow'}`"
          >
            <span>{{ currentSong.name }}</span>
            <span>By</span>
            <span :key="index" v-for="(artist, index) in currentSong.artists" v-text="artist.name"></span>
            <span>/</span>
            <span>{{ currentSong.album.name || 'unknow' }}</span>
          </nuxt-link>
        </div>
        <div class="song" v-else>{{ $i18n.text.music.empty }}</div>
      </div>
    </div>
    <div class="pre-load">
      <img v-if="preload" :src="currentSongPicUrl" alt="song-thumb">
      <img v-if="preload" :src="'/images/sponsor.jpg' | byCDN" alt="sponsor">
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
  import music from '~/services/music'
  import { isBrowser } from '~/environment'
  export default {
    name: 'layout-header',
    data() {
      return {
        preload: false
      }
    },
    mounted() {
      if (isBrowser) {
        window.addLoadedTask(() => {
          this.preload = true;
        })
      }
    },
    computed: {
      playerState() {
        return music.state
      },
      currentSong() {
        return music.currentSong
      },
      currentSongPicUrl() {
        return music.currentSongPicUrl
      }
    },
    methods: {
      togglePlay() {
        music.humanizeOperation(music.player.togglePlay)
      },
      toggleMuted() {
        music.humanizeOperation(music.player.toggleMuted)
      },
      prevSong() {
        music.humanizeOperation(music.player.prevSong)
      },
      nextSong() {
        music.humanizeOperation(music.player.nextSong)
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
    z-index: 999;
    background-color: $module-bg;
    user-select: none;
    @include backdrop-blur();

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
          font-family: webfont-normal, DINRegular;
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
        @include text-overflow();
        opacity: .2;

        &:hover {
          opacity: 1;
        }

        > .panel {
          display: flex;
          justify-content: flex-start;
          margin-bottom: $xs-gap;

          > .btn {
            margin-right: $lg-gap;

            &:hover {

              > .iconfont {
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

            &:hover {
              color: $link-hover-color;
            }
          }
        }

        .iconfont {
          color: $text-dividers;
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
