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
            <button class="prev-song btn" @click="prevSong">
              <i class="iconfont icon-music-prev"></i>
            </button>
            <button class="toggle-play btn" @click="togglePlay">
                <i class="iconfont" :class="[playerState.playing ? 'icon-music-pause' : 'icon-music-play']"></i>
            </button>
            <button class="next-song btn" @click="nextSong">
              <i class="iconfont icon-music-next"></i>
            </button>
            <button class="muted-toggle btn" @click="toggleMuted">
              <i class="iconfont" :class="[playerState.muted ? 'icon-music-muted' : 'icon-music-volume']"></i>
            </button>
          </div>
          <div class="song" v-if="currentSong">
            <nuxt-link to="/music" 
                       class="link" 
                       :title="`${currentSong.name} / ${currentSong.album.type || 'unknow'}`">
              <span>{{ currentSong.name }}</span>
              <span> By </span>
              <span v-for="artist in currentSong.artists">{{ artist.name }}</span>
              <span> / </span>
              <span>{{ currentSong.album.type || 'unknow' }}</span>
            </nuxt-link>
          </div>
          <img :src="currentSongPicUrl" v-show="false">
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'header',
  computed: {
    player() {
      return this.$store.state.music.player
    },
    playerState() {
      return this.$store.state.music.playerState
    },
    currentSong() {
      return this.$store.getters['music/currentSong']
    },
    currentSongPicUrl() {
      if (this.currentSong) {
        let picUrl = this.currentSong.album.picUrl
        return picUrl ? picUrl.replace('http://', '/proxy/') : '/images/music-bg.jpg'
      } else {
        return '/images/music-bg.jpg'
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
      height: 4.5em;
      background-color: $module-bg;
      z-index: 999;

      .navbar-container {
        height: 4.5em;
        display: flex;
        justify-content: space-between;

        .navbar-header {
          height: 4.5em;
          display: flex;
          position: relative;
          align-items: center;
          padding-left: .5em;
          width: 30em;
          justify-content: space-between;

          .navbar-logo {
            width: 10em;
          }

          .navbar-slogan {
            color: $primary;
            font-family: CenturyGothic;
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
    }
  }
</style>
