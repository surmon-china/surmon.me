<template>
  <div class="page">
    <div class="detail">
      <div class="content">
        <button @click="">上一曲</button>
        <button @click="">下一曲</button>
        <button @click="">暂停</button>
        <button @click="">播放</button>
        <button @click="">静音</button>
        <p>音量</p>
        <p>进度条</p>
        <hr>
        <div v-if="currentSong.data">
          <p>曲名 {{ currentSong.data.name }}</p>
          <p>艺术家 <span v-for="artist in currentSong.data.artists">{{ artist.name }}</span></p>
          <p>曲风 {{ currentSong.data.album.type }}</p>
          <p>封面 <img :src="currentSong.data.album.picUrl"></p>
        </div>
        <p v-if="currentSongLrc.data">歌词 {{ currentSongLrc }}</p>
        <div class="music">
          come soon
        </div>
      </div>
    </div>
    <div class="comment" v-if="false">
      <duoshuo data-thread-key="music" data-title="我是播放器"></duoshuo>
    </div>
  </div>
</template>

<script>
  import howler from '~plugins/howler'
  export default {
    name: 'music',
    head: {
      title: 'Music',
    },
    data() {
      return {
        proxyPath: 'https://surmon.me/proxy/',
        playerState: {
          ready: false
        }
      }
    },
    fetch ({ store }) {
      return store.dispatch('loadMuiscPlayerList')
    },
    created() {
      if (this.$store.state.option.mobileLayout) {
        this.$router.back()
      }
    },
    mounted() {
      if (this.playerlist.data) {
        this.playerState.ready = true
        this.initPlayer()
      }
    },
    computed: {
      player() {
        return this.$store.state.music.player
      },
      playerlist() {
        return this.$store.state.music.list
      },
      currentSong() {
        return this.$store.state.music.song
      },
      currentSongLrc() {
        return this.$store.state.music.lrc
      }
    },
    methods: {
      initPlayer() {

        // 判断全局是否存在播放器
        if (this.player) {
          return false
        }

        console.log(this.playerlist)
        const src = this.playerlist.data.tracks.map(song => {
          return song.mp3Url.replace(/(http:\/\/|https:\/\/)/ig, this.proxyPath)
        })

        this.$store.commit('music/INIT_PLAYER', new Howl({
          src,
          autoplay: false,
          loop: true,
          volume: 0.8,
        }))

        // 加载后自动播放
        this.player.once('load', () => {
          console.log('load')
          this.player.play()
        })

        // 播放时获取设置当前活动歌曲，及获取歌词
        this.player.once('play', () => {
          const currentSrc = this.player._src
          const currentSong = this.playerlist.data.tracks.find(song => {
            return song.mp3Url.includes(currentSrc.replace(this.proxyPath, ''))
          })
          if (currentSong) {
            this.$store.commit('music/SET_CURRENT_SONG', currentSong)
            this.$store.dispatch('loadMuiscSongLrc', { song_id: currentSong.id })
          }
        })

        this.player.once('end', () => {
          console.log('end')
        })

        console.log(this.player)
      },
      play() {},
      skipToSong(index) {

        // Stop the current track.
        if (this.playlist[this.index].howl) {
          this.playlist[this.index].howl.stop();
        }

        // Reset progress.
        progress.style.width = '0%'

        // Play the new track.
        this.play(index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {

    .detail {
      margin-bottom: 1em;
      background-color: $module-bg;

      .content {
        width: 100%;
        overflow:  hidden;

        .music {
          padding: 1em;
          height: 11em;
          line-height: 9em;
          text-align: center;
          font-size: 4em;
          text-transform: capitalize;
        }
      }
    }
  }
</style>
