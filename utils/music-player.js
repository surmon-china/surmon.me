
import howler from '~plugins/howler'

export default state => {

  if (!state.player) {

    // config
    const playList = state.list.data.tracks
    const proxyPath = 'https://surmon.me/proxy/'

    // 如果存在有效数据，则实例化播放器
    if (!playList.length) return

    // playerlist
    const playerList = playList.map(song => {
      return {
        howl: null,
        id: song.id,
        name: song.name,
        album: song.album,
        artists: song.artists,
        duration: song.duration,
        src: song.mp3Url.replace(/(http:\/\/|https:\/\/)/ig, proxyPath)
      }
    })

    const playerStep = () => {

      // Get the Howl we want to manipulate.
      const sound = playerList[state.playerState.index].howl

      // Determine our current seek position.
      const seek = sound.seek() || 0
      state.playerState.progress = ((seek / sound.duration()) * 100) || 0

      // If the sound is still playing, continue stepping.
      if (sound.playing()) {
        requestAnimationFrame(playerStep)
      }
    }

    console.log(playerList)

    // 实例化player
    state.player = {

      play (index) {

        // 实例前拦截
        index = Object.is(typeof index, 'number') ? index : state.playerState.index
        const currentOldSong = playerList[state.playerState.index]
        // 如果目标歌曲已存在实例
        if (currentOldSong && currentOldSong.howl) {
          // 如果目标歌曲和正在当前实例歌曲相同，且处于播放状态，则终止
          if (Object.is(index, state.playerState.index) && currentOldSong.howl.playing()) {
            return false
          // 否则停止当前正在播放歌曲（停止则）
          } else if (currentOldSong.howl.playing()) {
            currentOldSong.howl.stop()
          }
        }

        // cache or instance
        const song = playerList[index]
        song.howl = song.howl || new Howl({
          src: [song.src],
          autoplay: false,
          loop: false,
          html5: true,
          volume: state.playerState.volume,
          onplay() {
            state.playerState.wave = true
            state.playerState.loading = false
            state.playerState.playing = true
            state.playerState.progress = 0
            requestAnimationFrame(playerStep)
          },
          onload() {
            state.playerState.wave = true
            state.playerState.playing = true
          },
          onend() {
            state.playerState.wave = false
            state.playerState.playing = true
            state.player.nextSong()
          },
          onpause() {
            state.playerState.wave = false
            state.playerState.playing = false
          },
          onstop() {
            state.playerState.wave = false
            state.playerState.playing = false
            state.playerState.progress = 100
          },
          onloaderror() {
            // 发现404就直接从播放列表移除
            song.howl.unload()
            playerList.splice(playerList.findIndex(s => Object.is(s.id, song.id)), 1)
            state.playerState.wave = false
            state.playerState.playing = true
            state.player.nextSong()
          },
          onvolume() {
            state.playerState.volume = Howler.volume()
          }
        })

        // Begin playing the sound.
        song.song_id = song.howl.play()
        song.howl.fade(0, state.playerState.volume, 5000, song.song_id)

        // 更新播放器状态
        if (song.howl.state() === 'loaded') {
          state.playerState.loading = false
          state.playerState.playing = true
        } else {
          state.playerState.loading = true
          state.playerState.playing = false
        }

        // 更新当前活动歌曲的索引
        state.playerState.index = index
      },
      
      // 暂停
      pause() {
        let sound = playerList[state.playerState.index]
        if (sound.howl && sound.howl.playing()) {
          sound.howl.fade(state.playerState.volume, 0, 600, sound.song_id)
          setTimeout(() => {
            sound.howl.pause()
          }, 600)
        }
      },

      // 播放暂停切换
      togglePlay() {
        const sound = playerList[state.playerState.index].howl
        if (sound && sound.playing()) {
          state.player.pause()
        } else {
          state.player.play()
        }
      },

      // 更改音量
      volume(val) {
        Howler.volume(val)
      },

      // 静音切换
      toggleMuted() {
        Howler.mute(!state.playerState.muted)
        state.playerState.muted = !state.playerState.muted
      },

      // 跳到某首歌
      skipToSong(index) {

        // Stop the current track.
        const currentTrack = playerList[state.playerState.index]
        if (currentTrack && currentTrack.howl) {
          currentTrack.howl.stop()
        }

        // Reset progress.
        state.playerState.progress = 0

        // Play the new track.
        state.player.play(index)
      },

      // 上一首
      prevSong() {
        let index = state.playerState.index - 1
        index = (index < 0) ? playerList.length - 1 : index
        state.player.skipToSong(index)
      },

      // 下一首
      nextSong() {
        let index = state.playerState.index + 1
        index = (index >= playerList.length) ? 0 : index
        state.player.skipToSong(index)
      }
    }
    state.player.play()
  }
}
