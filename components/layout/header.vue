<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <span class="navbar-blank"></span>
          <img src="/images/logo.svg" class="navbar-logo">
          <span class="navbar-slogan" v-text="$i18n.text.slogan"></span>
          <nuxt-link to="/" class="navbar-link" :title="$i18n.text.slogan"></nuxt-link>
        </div>
        <div class="navbar-player">
          <div class="panel">
            <button class="prev-song btn" @click="prevSong" :disabled="!playerState.ready">
              <i class="iconfont icon-music-prev"></i>
            </button>
            <button class="toggle-play btn" @click="togglePlay" :disabled="!playerState.ready">
              <i class="iconfont" :class="[playerState.playing ? 'icon-music-pause' : 'icon-music-play']"></i>
            </button>
            <button class="next-song btn" @click="nextSong" :disabled="!playerState.ready">
              <i class="iconfont icon-music-next"></i>
            </button>
            <button class="muted-toggle btn" @click="toggleMuted" :disabled="!playerState.ready">
              <i class="iconfont" :class="[playerState.muted ? 'icon-music-muted' : 'icon-music-volume']"></i>
            </button>
          </div>
          <div class="song" v-if="currentSong">
            <nuxt-link to="/music"
                       class="link"
                       :title="`${currentSong.name} / ${currentSong.album.name || 'unknow'}`">
              <span>{{ currentSong.name }}</span>
              <span> By </span>
              <span :key="index" v-for="(artist, index) in currentSong.artists">{{ artist.name }}</span>
              <span> / </span>
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
  import EventBus from '~/utils/event-bus'
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
      player() {
        return EventBus.player.player
      },
      playerState() {
        return EventBus.player.playerState
      },
      currentSong() {
        return EventBus.currentSong
      },
      currentSongPicUrl() {
        return EventBus.currentSongPicUrl
      }
    },
    methods: {
      togglePlay() {
        if (this.playerState.ready) {
          this.player.togglePlay()
        }
      },
      toggleMuted() {
        if (this.playerState.ready) {
          this.player.toggleMuted()
        }
      },
      prevSong() {
        if (this.playerState.ready) {
          this.player.prevSong()
        }
      },
      nextSong() {
        if (this.playerState.ready) {
          this.player.nextSong()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .header {

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: $header-height;
      background-color: $module-bg;
      z-index: 999;

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
          position: relative;
          overflow: hidden;

          @keyframes logo-blink {
            0% {
              opacity: 0;
              transform: translateX(-10%);
            }
            5% { opacity: 1 }
            35% { opacity: 1 }
            39% { opacity: 0 }
            50% { opacity: .8 }
            60% { opacity: .8 }
            65% {
              opacity: .8;
              transform: translateX(100%);
            }
            70% {
              opacity: 0;
              transform: translateX(100%);
            }
            100% {
              opacity: 0;
              transform: translateX(100%);
            }
          }

          > .navbar-blank {
            position: absolute;
            top: 0;
            left: 0;
            width: 60%;
            height: 100%;
            opacity: 0;
            animation: logo-blink 8s ease-in 1s infinite;

            &:before {
              content: '';
              width: 11rem;
              height: 3rem;
              position: absolute;
              top: 15%;
              left: 0;
              transform: rotate(-45deg);
              background: radial-gradient(white, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0));
            }
          }

          .navbar-logo {
            width: 11rem;
            margin-right: 4rem;
            filter: $theme-logo-rotate;

            .logo-st {
              fill: $primary;
            }
          }

          .navbar-slogan {
            color: $primary;
            font-family: DINRegular;
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
