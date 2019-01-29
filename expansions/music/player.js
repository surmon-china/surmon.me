/**
 * @file 播放器构造器 / ES module
 * @module utils/music-player-builder
 * @author Surmon <https://github.com/surmon-china>
 */

import { proxyUrl } from '~/config/api.config.esm'
import { Howler, Howl } from 'howler'

export default music => {

  const proxyPath = proxyUrl + 'music/'
  const playList = music.list.data.tracks

  if (music.player) {
    console.warn('播放器已构建', music.player)
    return music.player
  }

  if (!playList.length) {
    console.warn('播放列表为空，无法初始化')
    return false
  }

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

  music.list.data.tracks = playerList

  // 进度条的一帧帧更新
  const playerStep = () => {

    // Get the Howl we want to manipulate.
    const sound = playerList[music.state.index].howl

    // Determine our current seek position.
    const seek = sound.seek() || 0
    music.state.seek = seek
    music.state.progress = (seek / sound.duration()) * 100

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(playerStep)
    }
  }

  // 构建播放器
  music.player = {

    // 播放
    play(index) {

      // 实例前拦截
      index = typeof index === 'number' ? index : music.state.index

      // 目标歌曲
      music.state.targetIndex = index
      const currentOldSong = playerList[music.state.index]

      // 如果目标歌曲已存在实例
      if (currentOldSong && currentOldSong.howl) {

        // 如果目标歌曲和正在当前实例歌曲相同，且处于播放状态，则终止
        if (Object.is(index, music.state.index)) {

          if (!currentOldSong.howl.playing()) {
            currentOldSong.song_id = currentOldSong.howl.play()
            currentOldSong.howl.fade(0, music.state.volume, 1000, currentOldSong.song_id)
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
      const errorAndNextSong = song => {
        if (song.howl) {
          song.howl.stop()
          song.howl.unload()
        }
        song.howl = null
        playerList.splice(playerList.findIndex(s => Object.is(s.id, song.id)), 1)
        music.list.data.tracks.splice(music.list.data.tracks.findIndex(s => Object.is(s.name, song.name)), 1)
        music.state.wave = false
        music.state.playing = true
        const index = music.state.index - 1
        music.state.index = (index < 0) ? 0 : index
        music.player.nextSong()
        music.state.ready = true
      } 

      // 实例播放轨方法
      const buildHowl = song => {
        song.howl = song.howl || new Howl({
          loop: false,
          html5: true,
          autoplay: false,
          volume: music.state.volume,
          src: [(song.src || ' ').replace(/(http:\/\/|https:\/\/)/ig, proxyPath)],
          onplay() {
            music.state.ready = true
            music.state.wave = true
            music.state.loading = false
            music.state.playing = true
            music.state.progress = 0
            requestAnimationFrame(playerStep)
          },
          onload() {
            music.state.wave = true
            music.state.playing = true
          },
          onend() {
            music.state.wave = false
            music.state.playing = true
            music.player.nextSong()
          },
          onpause() {
            music.state.wave = false
            music.state.playing = false
          },
          onstop() {
            music.state.wave = false
            music.state.playing = false
            music.state.progress = 100
          },
          onloaderror() {
            errorAndNextSong(song)
          },
          onvolume() {
            music.state.volume = Howler.volume()
          }
        })

        // Begin playing the sound.
        song.song_id = song.howl.play()
        song.howl.fade(0, music.state.volume, 3000, song.song_id)

        // 更新播放器状态
        if (song.howl.state() === 'loaded') {
          music.state.loading = false
          music.state.playing = true
        } else {
          music.state.loading = true
          music.state.playing = false
        }

        // 更新当前活动歌曲的索引（在歌曲实例并播放成功的情况下才完成）
        music.state.index = index
        music.state.targetIndex = index
      }

      // 如果已有有效地址，则进入实例阶段，否则请求地址后进行
      if (song.src) {
        buildHowl(song)
      } else {
        music.state.ready = false
        music.fetchSongUrl(song.id).then(response => {
          if (response.result.data && response.result.data.length) {
            song.src = response.result.data[0].url
            // console.log('得到异步数据', '要播放这一首：', music.state.targetIndex, '异步数据的id是：', song.id, '目标歌曲的id是', playerList[music.state.targetIndex].id)
            // 用户可能是在频繁切换，这里判断如果当前歌曲下标不是请求的歌曲，则仅仅赋值 src，不做播放器构建
            if (song.id == playerList[music.state.targetIndex].id) {
              buildHowl(song)
            }
          } else {
            errorAndNextSong(song)
          }
        }).catch(error => {
          errorAndNextSong(song)
        })
      }
    },
    
    // 暂停
    pause() {
      const sound = playerList[music.state.index]
      if (sound.howl && sound.howl.playing()) {
        // sound.howl.fade(music.state.volume, 0, 200, sound.song_id)
        sound.howl.pause()
      }
      Howler._howls.forEach(h => h.pause())
    },

    // 播放暂停切换
    togglePlay() {
      const sound = playerList[music.state.index].howl
      if (sound && sound.playing()) {
        music.player.pause()
      } else {
        music.player.play()
      }
    },

    // 更改音量
    volume(val) {
      Howler.volume(val)
    },

    // 静音切换
    toggleMuted() {
      Howler.mute(!music.state.muted)
      music.state.muted = !music.state.muted
    },

    // 跳到某首歌
    skipToSong(index) {

      // 停止当前音乐
      const currentTrack = playerList[music.state.index]
      if (currentTrack && currentTrack.howl) {
        currentTrack.howl.stop()
      }

      Howler._howls.forEach(h => h.stop())
      music.state.progress = 0
      music.player.play(index)
    },

    // 上一首
    prevSong() {
      let index = music.state.targetIndex - 1
      index = (index < 0) ? playerList.length - 1 : index
      music.player.skipToSong(index)
    },

    // 下一首
    nextSong() {
      let index = music.state.targetIndex + 1
      index = (index >= playerList.length) ? 0 : index
      music.player.skipToSong(index)
    }
  }

  // music.player.play()
  music.state.ready = true
}
