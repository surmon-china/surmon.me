<template>
  <header id="header" class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <img src="/images/logo.svg" class="navbar-logo">
          <span class="navbar-slogan" v-text="$i18n.text.slogan"></span>
          <nuxt-link to="/" class="navbar-link" :title="$i18n.text.slogan" />
        </div>
        <div class="navbar-player">
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
        <img v-if="preload" src="/images/shang.jpg" alt="shang">
        <img v-if="preload" src="/images/app-hot.png" alt="app-download">
        <img v-if="preload" src="/images/app-logo.png" alt="app-logo">
        <img v-if="preload" src="/images/service.jpg" alt="service">
        <img v-if="preload" src="/images/about-background-be-1.jpg" alt="background">
        <img v-if="preload" src="/images/about-background-be-2.jpg" alt="background">
        <img v-if="preload" src="/images/about-background-star-1.png" alt="background">
        <img v-if="preload" src="/images/about-background-star-2.png" alt="background">
      </div>
    </nav>
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

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: $header-height;
      z-index: 999;
      background-color: $module-bg;
      @include backdrop-blur();

      .navbar-container {
        height: $header-height;
        display: flex;
        justify-content: space-between;

        .navbar-header {
          height: $header-height;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          width: 29em;
          overflow: hidden;

          @keyframes logo-blink {
            0% { mask-position: -30% }
            100% { mask-position: 666% }
          }

          .navbar-logo {
            width: 11rem;
            margin-right: 4rem;
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

          .navbar-slogan {
            color: $primary;
            font-family: webfont-normal, DINRegular;
          }

          .navbar-link {
            position: absolute;
            width: 100%;
            height: 100%;
          }
        }

        .navbar-player {
          width: 13em;
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
            margin-bottom: .2rem;

            > .btn {
              margin-right: 1em;

              &:hover {

                > .iconfont {
                  color: $link-hover-color;
                }
              }
            }
          }

          > .song {
            font-size: 1rem;
            @include text-overflow();

            > .link {
              color: $dividers;

              &:hover {
                color: $link-hover-color;
              }
            }
          }

          .iconfont {
            color: $dividers;
          }
        }
      }

      > .pre-load {
        visibility: hidden;
        width: 0;
        height: 0;
        opacity: 0;
      }
    }
  }
</style>
