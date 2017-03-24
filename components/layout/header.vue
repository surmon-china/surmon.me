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
            <transition name="module" mode="out-in">
              <button class="toggle-play btn" @click="togglePlay" v-if="playerState.playing">
                <i class="iconfont icon-music-pause"></i>
              </button>
              <button class="toggle-play btn" @click="togglePlay" v-else>
                <i class="iconfont icon-music-play"></i>
              </button>
            </transition>
            <button class="next-song btn" @click="nextSong">
              <i class="iconfont icon-music-next"></i>
            </button>
            <button class="muted-toggle btn" @click="toggleMuted">
              <i class="iconfont" :class="[playerState.muted ? 'icon-music-muted' : 'icon-music-volume']"></i>
            </button>
            <button class="muted-toggle btn" @click="toggleMuted">
              <i class="iconfont icon-music-dance"></i>
            </button>
          </div>
          <div class="song" v-if="currentSong">
            <nuxt-link to="/music" class="link">{{ currentSong.name || 'unknow' }}</nuxt-link>
          </div>
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
    }
  },
  methods: {
    togglePlay() {
      this.player.togglePlay()
    },
    toggleMuted() {
      this.player.toggleMuted()
    },
    prevSong() {
      this.player.prevSong()
    },
    nextSong() {
      this.player.nextSong()
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
          color: $dividers;
          width: 13em;
          display: flex;
          flex-direction: column;
          align-items: inherit;
          justify-content: center;
          @include text-overflow();

          > .panel {

            > .btn {
              
            }
          }

          .iconfont {
            color: $dividers;
          }

          > .song {
            font-size: 1rem;
            @include text-overflow();
          }
        }
      }
    }
  }
</style>
