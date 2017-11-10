<template>
  <header class="header">
    <nav class="navbar">
      <div class="navbar-container container">
        <div class="navbar-header">
          <img src="/images/logo.svg" class="navbar-logo">
          <span class="navbar-slogan">Talk is cheap. Show me the code</span>
          <router-link to="/" class="navbar-link"></router-link>
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
              <span v-for="artist in currentSong.artists">{{ artist.name }}</span>
              <span> / </span>
              <span>{{ currentSong.album.name || 'unknow' }}</span>
            </nuxt-link>
          </div>
          <div class="song" v-else>Music is the eye of ear.</div>
        </div>
      </div>
      <div class="pre-load">
        <img v-if="preload" :src="currentSongPicUrl" alt="song-thumb">
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
  const apiConfig = require('~/api.config')
  import EventBus from '~/utils/event-bus'
  import consoleSlogan from '~/utils/console-slogan'
  export default {
    name: 'layout-header',
    data() {
      return {
        preload: false
      }
    },
    mounted() {
      if (process.browser) {
        const self = this
        const player = EventBus.player
        const play = () => {
          if (player.playerState.ready && player.player && player.player.play) {
            player.player.play()
            setTimeout(() => {
              consoleSlogan()
            }, 666)
          } else {
            setTimeout(play, 1666)
          }
        }
        window.addEventListener('load', event => {
          window.setTimeout(() => {
            self.preload = true
            play()
          }, 1666)
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
        if (this.currentSong) {
          let picUrl = this.currentSong.album.picUrl
          return picUrl 
                 ? picUrl.replace('http://', '/proxy/') + '?param=600y600' 
                 : `${this.cdnUrl}/images/music-bg.jpg`
        } else {
          return `${this.cdnUrl}/images/music-bg.jpg`
        }
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
          justify-content: space-between;

          .navbar-logo {
            width: 10em;
          }

          .navbar-slogan {
            color: $primary;
            font-family: DINRegular, CenturyGothic;
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
