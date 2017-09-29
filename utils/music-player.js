
import howler from '~/plugins/howler'
import Service from '~/plugins/axios'

export default state => {

  if (!state.player) {

    // console.log('init player!', state.list.data)
    // return false

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
        html5: true,
        name: song.name,
        album: song.al || {},
        artists: song.ar || [],
        duration: song.dt || 200,
        src: null
      }
    })
    state.list.data.tracks = playerList

    // 进度条的一帧帧更新
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

    // console.log(playerList)

    // 实例化player
    state.player = {

      // 播放
      play (index) {

        // 实例前拦截
        index = Object.is(typeof index, 'number') ? index : state.playerState.index

        // 目标歌曲
        state.playerState.targetIndex = index
        const currentOldSong = playerList[state.playerState.index]

        // console.log('播放', index, currentOldSong, currentOldSong.howl)

        // 如果目标歌曲已存在实例
        if (currentOldSong && currentOldSong.howl) {

          // 如果目标歌曲和正在当前实例歌曲相同，且处于播放状态，则终止
          // console.log(index, state.playerState.index, Object.is(index, state.playerState.index))
          if (Object.is(index, state.playerState.index)) {

            if (!currentOldSong.howl.playing()) {
              currentOldSong.song_id = currentOldSong.howl.play()
              currentOldSong.howl.fade(0, state.playerState.volume, 1000, currentOldSong.song_id)
            }
            return false
            
          // 否则停止当前正在播放歌曲，停止所有正在播放的歌曲
          } else if (currentOldSong.howl.playing()) {
            currentOldSong.howl.stop()
            Howler._howls.forEach(h => h.stop())
          }
        }

        // 实例化播放轨
        const song = playerList[index]

        // 如果目标歌曲不存在则不进行
        if (!song) return false

        // 从播放列表移除无效歌曲
        const errAndNextSong = song => {
          if (song.howl) {
            song.howl.stop()
            song.howl.unload()
          }
          song.howl = null
          playerList.splice(playerList.findIndex(s => Object.is(s.id, song.id)), 1)
          state.list.data.tracks.splice(state.list.data.tracks.findIndex(s => Object.is(s.name, song.name)), 1)
          state.playerState.wave = false
          state.playerState.playing = true
          let index = state.playerState.index - 1
          state.playerState.index = (index < 0) ? 0 : index
          state.player.nextSong()
          state.playerState.ready = true
        } 

        // 实例播放轨方法
        const buildHowl = song => {
          song.howl = song.howl || new Howl({
            loop: false,
            html5: true,
            autoplay: false,
            volume: state.playerState.volume,
            src: [(song.src || ' ').replace(/(http:\/\/|https:\/\/)/ig, proxyPath)],
            onplay() {
              state.playerState.ready = true
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
              errAndNextSong(song)
            },
            onvolume() {
              state.playerState.volume = Howler.volume()
            }
          })

          // Begin playing the sound.
          // console.log('播放歌曲', song.src)
          song.song_id = song.howl.play()
          song.howl.fade(0, state.playerState.volume, 3000, song.song_id)

          // 更新播放器状态
          if (song.howl.state() === 'loaded') {
            state.playerState.loading = false
            state.playerState.playing = true
          } else {
            state.playerState.loading = true
            state.playerState.playing = false
          }

          // 更新当前活动歌曲的索引（在歌曲实例并播放成功的情况下才完成）
          state.playerState.index = index
          state.playerState.targetIndex = index
        }

        // 如果已有有效地址，则进入实例阶段，否则请求地址后进行
        if (song.src) {
          buildHowl(song)
        } else {
          state.playerState.ready = false
          // console.log('请求这首音乐地址', song)
          Service.get(`/music/url/${ song.id }`).then(response => {
            const success = response.status && 
                            response.data && 
                            Object.is(response.data.code, 1) && 
                            Object.is(response.data.result.code, 200) &&
                            !!response.data.result.data.length
            if (success) {
              // console.log('地址有效', response)
              song.src = response.data.result.data[0].url

              // console.log('得到异步数据', '要播放这一首：', state.playerState.targetIndex, '异步数据的id是：', song.id, '目标歌曲的id是', playerList[state.playerState.targetIndex].id)
              // 用户可能是在频繁切换，这里判断如果当前歌曲下标不是请求的歌曲，则仅仅赋值src，不做播放器构建
              if (song.id == playerList[state.playerState.targetIndex].id) {
                buildHowl(song)
              }
            } else {
              // console.log('地址无效', response)
              errAndNextSong(song)
            }
          }, err => {
            // console.log('请求失败', err)
            errAndNextSong(song)
          })
        }
      },
      
      // 暂停
      pause() {
        // pause current track
        let sound = playerList[state.playerState.index]
        if (sound.howl && sound.howl.playing()) {
          // sound.howl.fade(state.playerState.volume, 0, 200, sound.song_id)
          sound.howl.pause()
        }

        // pause all track
        Howler._howls.forEach(h => h.pause())
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

        // stop all track
        Howler._howls.forEach(h => h.stop())

        // Reset progress.
        state.playerState.progress = 0

        // Play the new track.
        state.player.play(index)
      },

      // 上一首
      prevSong() {
        // let index = state.playerState.index - 1
        let index = state.playerState.targetIndex - 1
        index = (index < 0) ? playerList.length - 1 : index
        state.player.skipToSong(index)
      },

      // 下一首
      nextSong() {
        // let index = state.playerState.index + 1
        let index = state.playerState.targetIndex + 1
        index = (index >= playerList.length) ? 0 : index
        state.player.skipToSong(index)
      }
    }

    // state.player.play()
    state.playerState.ready = true
  }
}
