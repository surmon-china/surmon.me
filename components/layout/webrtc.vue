<template>
  <div class="global-webrtc">
    <div class="webrtc-box">
      <div class="stream-box" 
           :class="[ stream.local ? 'local' : 'remote']"
           v-for="stream in streams">
        <div class="empty-msg">
          <!-- 本机用户 -->
          <span class="text" v-if="stream.local">Long time no see.</span>
          <!-- 远程用户 -->
          <span class="text" v-else>吴彦祖</span>
        </div>
        <video autoplay
               :id="stream.id" 
               :ref="stream.id" 
               :src="stream.src">
        </video>
        <!-- 仅本机用户 -->
        <div class="tools" v-if="stream.local">
          <button class="video">
            <i class="iconfont" :class="[true ? 'icon-carema-disabled' : 'icon-carema']"></i>
          </button>
          <button class="audio">
            <i class="iconfont" :class="[true ? 'icon-mic-disabled' : 'icon-mic']"></i>
          </button>
          <div class="filter">
            <i class="icon-filter"></i>
            <span>Blur</span>
            <ul class="filters">
              <li class="item">Blur</li>
              <li class="item">Blur</li>
              <li class="item">Blur</li>
              <li class="item">Blur</li>
              <li class="item">Blur</li>
            </ul>
          </div>
        </div>          
      </div>
    </div>
  </div>
</template>

<script>
  import SimpleWebRTC from '~/plugins/webrtc.js'
  export default {
    name: 'webrtc',
    data() {
      return {
        SimpleWebRTC,
        streams: [],
        localStream: null,
        remoteStreams: []
      }
    },
    mounted() {

      const self = this

      // todo 产品功能
      // nuxt.js 升级
      // 异步组件单独打包

      // grab the room from the URL
      var room = location.search && location.search.split('?')[1]
      room = 'surmon'

      // create our webrtc connection
      var webrtc = new SimpleWebRTC({
        localVideoEl: '',
        remoteVideosEl: '',
        autoRequestMedia: true,
        debug: false,
        detectSpeakingEvents: true,
        autoAdjustMic: false
      })

      console.log('i am webrtc', webrtc)

      // when it's ready, join if we got a room from the URL
      webrtc.on('readyToCall', function () {
        // you can name it anything
        if (room) webrtc.joinRoom(room)
      })

      // 显示音量控制
      function showVolume(el, volume) {
        if (!el) return
        if (volume < -45) volume = -45
        if (volume > -20) volume = -20
        el.value = volume
      }

      // 当媒体请求被允许可用时，展示音量控制器
      webrtc.on('localStream', function (stream) {
        stream.filter = '我是滤镜啊'
        console.log('本地媒体可用', stream)
        const src = URL.createObjectURL(stream)
        self.streams.unshift({
          local: true,
          id: 'localVideo',
          ref: 'localVideo',
          src: src
        })
        // 模拟远程用户
        const mockStream = {
          id: 'remoteVideo',
          ref: 'remoteVideo',
          src: src
        }
        self.streams.push(...[mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream])
      })

      // 媒体请求被拒绝
      webrtc.on('localMediaError', function (err) {
      })

      // 接收到一个信号源
      webrtc.on('videoAdded', function (video, peer) {
        console.log('接收到的信号源', peer)
        const id = `remote-video-${webrtc.getDomId(peer)}`
        const remoteStream = { id, src: URL.createObjectURL(peer.stream) }
        self.remoteStreams.push(remoteStream)
        return 

        /*
        // suppress contextmenu
        video.oncontextmenu = function () { return false }

        // resize the video on click
        video.onclick = function () {
            container.style.width = video.videoWidth + 'px'
            container.style.height = video.videoHeight + 'px'
        }

        // show the remote volume
        var vol = document.createElement('meter')
        vol.id = 'volume_' + peer.id
        vol.className = 'volume'
        vol.min = -45
        vol.max = -20
        vol.low = -40
        vol.high = -25
        container.appendChild(vol)
        */

        // show the ice connection state
        if (peer && peer.pc) {
          var connstate = document.createElement('div');
          connstate.className = 'connectionstate';
          container.appendChild(connstate);
          peer.pc.on('iceConnectionStateChange', function (event) {
            switch (peer.pc.iceConnectionState) {
            case 'checking':
              connstate.innerText = 'Connecting to peer...'
              break
            case 'connected':
            case 'completed': // on caller side
              $(vol).show()
              connstate.innerText = 'Connection established.'
              break
            case 'disconnected':
              connstate.innerText = 'Disconnected.'
              break
            case 'failed':
              connstate.innerText = 'Connection failed.'
              break
            case 'closed':
              connstate.innerText = 'Connection closed.'
              break
            }
          })
        }
        remotes.appendChild(container)
      })

      // 信号源移除
      webrtc.on('videoRemoved', function (video, peer) {
        const id = `remote-video-${webrtc.getDomId(peer)}`
        const index = self.remoteStreams.findIndex(s => s.id === id)
        if (index > -1) {
          self.remoteStreams.splice(index, 1)
        }
      })

      // 本地信号源音量改变
      webrtc.on('volumeChange', function (volume, treshold) {
        // showVolume(document.getElementById('localVolume'), volume);
      })

      // 远程信号源音量改变
      webrtc.on('remoteVolumeChange', function (peer, volume) {
        // showVolume(document.getElementById('volume_' + peer.id), volume);
      })

      // local p2p/ice failure
      webrtc.on('iceFailed', function (peer) {
        var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate')
        console.log('local fail', connstate)
        if (connstate) {
            connstate.innerText = 'Connection failed.'
            fileinput.disabled = 'disabled'
        }
      })

      // remote p2p/ice failure
      webrtc.on('connectivityError', function (peer) {
        var connstate = document.querySelector('#container_' + webrtc.getDomId(peer) + ' .connectionstate')
        console.log('remote fail', connstate)
        if (connstate) {
            connstate.innerText = 'Connection failed.'
            fileinput.disabled = 'disabled'
        }
      })

      // listen for mute and unmute events
      webrtc.on('mute', function (data) {
        webrtc.getPeers(data.id).forEach(function (peer) {
          // if (data.name == 'audio') {
          //     $('#videocontainer_' + webrtc.getDomId(peer) + ' .muted').show()
          // } else if (data.name == 'video') {
          //     $('#videocontainer_' + webrtc.getDomId(peer) + ' .paused').show()
          //     $('#videocontainer_' + webrtc.getDomId(peer) + ' video').hide()
          // }
        })
      })

      webrtc.on('unmute', function (data) {
        webrtc.getPeers(data.id).forEach(function (peer) {
          // if (data.name == 'audio') {
          //     $('#videocontainer_' + webrtc.getDomId(peer) + ' .muted').hide()
          // } else if (data.name == 'video') {
          //     $('#videocontainer_' + webrtc.getDomId(peer) + ' video').show()
          //     $('#videocontainer_' + webrtc.getDomId(peer) + ' .paused').hide()
          // }
        })
      })

      // Since we use this twice we put it here
      function setRoom(name) {
        // document.querySelector('form').remove()
        // document.getElementById('title').innerText = 'Room: ' + name
        // document.getElementById('subTitle').innerText =  'Link to join: ' + location.href
        // $('body').addClass('active')
      }

      if (room) {
        setRoom(room)
      } else {
        // $('form').submit(function () {
        //   var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '')
        //   webrtc.createRoom(val, function (err, name) {
        //       console.log(' create room cb', arguments)

        //       var newUrl = location.pathname + '?' + name
        //       if (!err) {
        //           history.replaceState({foo: 'bar'}, null, newUrl)
        //           setRoom(name)
        //       } else {
        //           console.log(err)
        //       }
        //   })
        //   return false
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/variables';
  .global-webrtc {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 8;
    padding-top: $header-height * 2;
    background-color: rgba(183, 183, 183, 0.7);

    > .webrtc-box {
      position: relative;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      max-width: 80%;
      max-height: calc(100vh - 16rem);

      > .stream-box {
        height: auto;
        margin-right: 1rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        position: relative;
        background-color: $module-bg;
        border: .8rem solid rgba($module-bg, .2);
        overflow-y: hidden;

        &.local {
          width: 50%;
          max-width: 40rem;
          min-height: 26rem;
          max-height: 30rem;
        }

        &.remote {
          width: 20%;
          max-width: 20rem;
          min-height: 12rem;
          max-height: 16rem;
        }

        > video {
          width: 100%;
          height: auto;
          object-fit: cover;
        }

        > .empty-msg,
        > .tools {
          position: absolute;
        }

        > .empty-msg {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;

          > .text {
            color: #676767;
          }
        }

        > .tools {
          left: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
