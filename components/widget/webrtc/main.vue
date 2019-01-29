<template>
  <div id="global-webrtc">
    <div class="webrtc-box" :class="aligenLeft ? 'aligenLeft' : ''">
      <div
        class="stream-box"
        :key="index"
        :class="stream.local ? 'local' : 'remote'"
        v-for="(stream, index) in streams"
      >
        <div class="empty-msg">
          <!-- 本机用户 -->
          <span class="text" v-if="stream.local">
            <span v-if="localStream.ok">Long time no see.</span>
            <span v-else>Ice 失败</span>
          </span>
          <!-- 远程用户 -->
          <span class="text" v-else>{{ stream.name }}</span>
        </div>
        <div class="content-box" :class="`filter-${filters[stream.filter]}`">
          <video
            autoplay
            playsinline
            preload="auto"
            :id="stream.id"
            :ref="stream.id"
            :src="stream.src"
            :width="getVideoElementSize(index).width"
            :height="getVideoElementSize(index).height"
          />
          <!-- 当前视频的美颜功能是否开启 -->
          <face-ctracker
            class="face-mask"
            v-if="!localStream.disabledCarema && !!stream.beauty"
            :ref-id="stream.id"
            :width="getVideoElementSize(index).width"
            :height="getVideoElementSize(index).height"
          />
        </div>
        <div class="name" v-if="!stream.local">
          <span>{{ stream.name }}</span>
          <span class="state">
            <span v-if="!stream.state">正在赶来的路上</span>
            <span v-else-if="stream.state === stream.checking">连接中</span>
            <span v-else-if="stream.state === stream.connected">连接成功</span>
            <span v-else-if="stream.state === stream.disconnected">失败</span>
            <span v-else-if="stream.state === stream.closed">已离开</span>
            <span v-else-if="stream.state === stream.failed">各种失败，来不了了</span>
          </span>
        </div>
        <meter
          class="volume"
          min="-45"
          max="-20"
          high="-25"
          low="-40"
          :value="stream.local ? localStream.volume : stream.volume"
        ></meter>
        <!-- 仅本机用户 -->
        <div class="tools" v-if="stream.local">
          <button
            class="video"
            :class="{ active: !localStream.disabledCarema }"
            @click="toggleCarema(!localStream.disabledCarema)"
          >
            <i class="iconfont" :class="localStream.disabledCarema ? 'icon-carema-disabled' : 'icon-carema'"></i>
          </button>
          <button
            class="audio"
            :class="{ active: !localStream.disabledMic }"
            @click="toggleMute(!localStream.disabledMic)"
          >
            <i class="iconfont" :class="localStream.disabledMic ? 'icon-mic-disabled' : 'icon-mic'"></i>
          </button>
          <button
            class="beauty"
            :class="{ active: !localStream.disabledBeauty }"
            @click="toggleBeauty()"
          >
            <i class="iconfont icon-meiyan"></i>
            <span>美颜</span>
          </button>
          <div class="filter" :class="{ active: stream.filter !== 0 }">
            <span class="current">
              <i class="iconfont icon-filter"></i>
              <span class="name">{{ filters[stream.filter] }}</span>
            </span>
            <ul class="filter-list">
              <li class="item" @click="sendFilterToAll(index)" :key="index" v-for="(filter, index) in filters">
                <span>{{ filter }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 仅远程媒体 -->
        <div class="tools" v-else>
          <button class="video" disabled :class="{ active: !stream.disabledCarema }">
            <i class="iconfont" :class="stream.disabledCarema ? 'icon-carema-disabled' : 'icon-carema'"></i>
          </button>
          <button class="audio" disabled :class="{ active: !stream.disabledMic }">
            <i class="iconfont" :class="stream.disabledMic ? 'icon-mic-disabled' : 'icon-mic'"></i>
          </button>
          <button class="beauty" disabled :class="{ active: stream.beauty }">
            <i class="iconfont icon-meiyan"></i>
          </button>
          <span class="filter">
            <span class="current">
              <i class="iconfont icon-filter"></i>
              <span class="name">{{ filters[stream.filter] }}</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { states } from './util'
  import { isDevMode } from '~/environment/esm'
  import appConfig from '~/config/app.config'
  import socketio from '~/plugins/socket.io'
  import SimpleWebRTC from '~/plugins/webrtc'
  import faceCtracker from './face-ctracker'
  
  export default {
    name: 'webrtc',
    components: {
      faceCtracker
    },
    data() {
      return {
        clmtrackrLibLoading: false,
        clmtrackrLoaded: false,
        localStream: {
          ok: true,
          volume: -45,
          peerId: null,
          disabledMic: false,
          disabledCarema: false,
          disabledBeauty: true
        },
        remoteFilters: [],
        remoteBeautys: [],
        streams: [],
        filters: ['normal', 'grayscale', 'sepia', 'hue-rotate', 'invert', 'blur'],
        names: ['吴彦祖', '王祖贤', '刘恺威', '奥黛丽 赫本', '任达华', '陈冠希', '张曼玉', '刘青云', '甄子丹', '刘德华', '张学友', '黎明', '周润发', '王杰', '黄家驹', '吴孟达', '周星驰', '鹿晗', '黄子韬', '李易峰', '薛之谦', '韩红', '张柏芝', '谢霆锋', '成龙', '梁朝伟', '刘嘉玲', '张家辉', '梁家辉', '吴镇宇', '黄秋生', '古天乐', '余文乐']
      }
    },
    methods: {
      // 计算 video 元素的尺寸
      getVideoElementSize(index) {
        if (index === 0) {
          return { width: 540, height: 345 }
        }
        if (index === 1 || index === 2) {
          return { width: 400, height: 345 }
        }
        return { width: 270, height: 200 }
      },
      toggleMute(disable) {
        disable ? this.webrtc.mute() : this.webrtc.unmute()
        this.localStream.disabledMic = disable
      },
      toggleCarema(disable) {
        disable ? this.webrtc.pauseVideo() : this.webrtc.resumeVideo()
        this.localStream.disabledCarema = disable
      },
      toggleBeauty() {
        if (window.clm && window.clm.tracker) {
          this.localStream.disabledBeauty = !this.localStream.disabledBeauty
          if (this.streams.length && this.streams[0] && this.streams[0].local) {
            this.streams[0].beauty = !this.localStream.disabledBeauty
          }
          if (this.localStream.peerId) {
            this.webrtc.connection.connection.emit('webrtc-set-beauty', {
              beauty: this.streams[0].beauty,
              peerId: this.localStream.peerId,
            })
          }
        } else if (!this.clmtrackrLoaded && !this.clmtrackrLibLoading) {
          const self = this
          window.addLoadedTask(() => {
            const clmtrackrScript = document.createElement('script')
            clmtrackrScript.onload = () => {
              self.clmtrackrLibLoading = false
              self.clmtrackrLoaded = true
              alert('人脸识别库加载成功！期待吴彦祖王祖贤的现身~')
              self.toggleBeauty()
            }
            clmtrackrScript.defer = 'defer'
            clmtrackrScript.src = `${self.$apiConfig.cdnUrl}/scripts/clmtrackr.js`
            document.body.appendChild(clmtrackrScript)
          })
          this.clmtrackrLibLoading = true
          alert('人脸识别库加载中...大概半分钟，稍后再打开美颜~')
        } else {
          alert('不是说过了！人脸识别库加载中...大概半分钟，半分钟很久吗！！!')
        }
      },
      getStreamByPeerId(id) {
        return this.streams.find(stream => stream.id.includes(id))
      },
      // 向所有媒体广播滤镜
      sendFilterToAll(type) {
        if (this.streams.length && this.streams[0] && this.streams[0].local) {
          this.streams[0].filter = type
        }
        // console.log('切换滤镜', this.localStream.peerId, this.localStream);
        if (this.localStream.peerId) {
          this.webrtc.connection.connection.emit('webrtc-set-filter', {
            peerId: this.localStream.peerId,
            filter: type
          })
        }
      }
    },
    computed: {
      states() {
        return states
      },
      aligenLeft() {
        const count = this.streams.length
        return !!(count > 3 && (count - 3) % 5 > 0)
      }
    },
    beforeDestroy() {
      if (this.webrtc) {
        this.webrtc.stopLocalVideo()
        this.webrtc.leaveRoom()
        // this.webrtc.disconnect()
        this.webrtc = null
      }
      this.streams = []
    },
    mounted() {

      let getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia

      if (!getUserMedia && (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        getUserMedia = navigator.mediaDevices.getUserMedia
      }

      if (!getUserMedia) {
        window.alert('不支持我有什么办法')
        this.$store.commit('global/updateWebRtcOnState', false)
        return false
      } else {
        navigator.getUserMedia = getUserMedia
      }

      const self = this
      const room = appConfig.webrtc.room

      // 用于唯一标识符
      const buildStreamId = peer => `remote-video-${webrtc.getDomId(peer)}`

      // 解析音量变化
      const parseVol = volume => {
        if (volume < -45) volume = -45
        if (volume > -20) volume = -20
        return volume
      }

      // 创建 webrtc 实例连接
      const webrtc = this.webrtc = new SimpleWebRTC({
        socketio: {},
        connection: {
          connection: socketio,
          on: socketio.on,
          disconnect: socketio.disconnect,
          getSessionid: () => socketio.id,
          emit() {
            socketio.emit.apply(socketio, arguments)
          }
        },
        localVideoEl: '',
        remoteVideosEl: '',
        debug: false,
        // debug: isDevMode,
        autoAdjustMic: true,
        autoRequestMedia: true,
        detectSpeakingEvents: true,
        url: self.$apiConfig.socketHost,
        // 自动选择流模式
        // iceTransportPolicy: 'relay',
        peerConnectionConfig:{
          // 自动选择流模式
          // iceTransports: 'relay',
          iceServers: [
            {
              urls: [
                'stun:47.96.19.254:3478',
                'turn:47.96.19.254:3478'
              ],
              username: appConfig.webrtc.iceServerUsername,
              credential: appConfig.webrtc.iceServerCredential,
            }
          ]
        }
      })

      // console.log('socketio', socketio, 'connection', webrtc.connection)

      // 远程滤镜改变
      webrtc.connection.connection.on('webrtc-set-filter', filterDetail => {
        const peerId = filterDetail.peerId
        const filter = filterDetail.filter
        const targetStream = self.getStreamByPeerId(peerId)
        if (targetStream) {
          targetStream.filter = filter
        }
      })

      // 远程美颜改变
      webrtc.connection.connection.on('webrtc-set-beauty', beautyDetail => {
        const peerId = beautyDetail.peerId
        const beauty = beautyDetail.beauty
        const targetStream = self.getStreamByPeerId(peerId)
        if (targetStream) {
          targetStream.beauty = beauty
        }
      })

      // 远程滤镜们
      webrtc.connection.connection.emit('webrtc-filters', filters => {
        // console.log('收到 webrtc-filters', filters)
        this.remoteFilters = filters
      })

      // 远程美颜们
      webrtc.connection.connection.emit('webrtc-beautys', beautys => {
        // console.log('收到 webrtc-beautys', beautys)
        this.remoteBeautys = beautys
      })

      // 存储本地流 id
      webrtc.on('connectionReady', sessionId => {
        // console.log('本机 connectionReady')
        self.localStream.peerId = sessionId
      })

      // 本地的一切准备好时
      webrtc.on('readyToCall', () => {
        // console.log('本机一切就绪')
        webrtc.joinRoom(room)
      })

      // 当媒体请求被允许可用时
      webrtc.on('localStream', stream => {
        // console.log('本机媒体可用')
        self.localStream.ok = true
        self.streams.unshift({
          local: true,
          filter: 0,
          beauty: false,
          id: 'localVideo',
          ref: 'localVideo',
          src: URL.createObjectURL(stream)
        })

        // 因为组件被激活时，socket 极有可能链接，所以库内部的逻辑转移到此处判断和处理
        // https://github.com/andyet/SimpleWebRTC/blob/master/src/simplewebrtc.js#L441
        if (webrtc.connection.connection.connected) {
          if (webrtc.connection.connection.id) {
            self.localStream.peerId = webrtc.connection.connection.id
            webrtc.sessionReady = true
            webrtc.testReadiness()
            // console.log('搞事情了', webrtc)
          }
        }

        // 模拟远程用户
        /*
        const names = self.names
        const mockStream = {
          src: URL.createObjectURL(stream),
          name: names[Math.floor(Math.random() * names.length)],
          filter: 0,
          volume: 0,
          beauty: true,
          id: 'remoteVideo',
          ref: 'remoteVideo'
        }
        self.streams.push(...[mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream, mockStream])
        */
      })

      // 媒体请求被拒绝
      webrtc.on('localMediaError', err => {
        window.alert('切')
        self.$store.commit('global/updateWebRtcOnState', false)
      })

      // 接收到一个信号源
      webrtc.on('videoAdded', (video, peer) => {
        // console.log('接收新的信号源', peer, self.remoteFilters)
        const filter = self.remoteFilters[peer.id]
        const beauty = self.remoteBeautys[peer.id]
        const id = buildStreamId(peer)
        const names = self.names
        const remoteStream = {
          id: id, 
          ref: id,
          state: states.checking,
          volume: 0,
          filter: filter || 0,
          beauty: beauty || false,
          disabledMic: false,
          disabledCarema: false,
          src: URL.createObjectURL(peer.stream),
          name: names[Math.floor(Math.random() * names.length)]
        }

        // show the ice connection state
        if (peer && peer.pc) {
          peer.pc.on('iceConnectionStateChange', event => {
            const stream = self.getStreamByPeerId(peer.id)
            if (stream) {
              const state = peer.pc.iceConnectionState
              const stateCode = states[state]
              if (stateCode !== undefined) {
                stream.state = stateCode
              }
            }
          })
        }
        self.streams.push(remoteStream)
      })

      // 信号源移除
      webrtc.on('videoRemoved', (video, peer) => {
        const id = buildStreamId(peer)
        const index = self.streams.findIndex(s => s.id === id)
        if (index > -1) {
          self.streams.splice(index, 1)
        }
      })

      // local p2p/ice failure
      webrtc.on('iceFailed', peer => {
        self.localStream.ok = false
      })

      // remote p2p/ice failure
      webrtc.on('connectivityError', peer => {
        // console.log('远程媒体链接失败')
        const targetStream = self.getStreamByPeerId(peer.id)
        if (targetStream) {
          targetStream.state = states.failed
        }
      })

      // 本地信号源音量改变
      webrtc.on('volumeChange', (volume, treshold) => {
        if (String(volume) !== '-Infinity') {
          self.localStream.volume = parseVol(volume)
        }
      })

      // 远程信号源音量改变
      webrtc.on('remoteVolumeChange', (peer, volume) => {
        if (String(volume) !== '-Infinity') {
          const stream = self.getStreamByPeerId(peer.id)
          if (stream) {
            stream.volume = parseVol(volume)
          }
        }
      })

      // 远程的信号源静音
      webrtc.on('mute', data => {
        webrtc.getPeers(data.id).forEach(peer =>  {
          const stream = self.getStreamByPeerId(peer.id)
          if (stream) {
            if (data.name === 'audio') {
              stream.disabledMic = true
            } else if (data.name === 'video') {
              stream.disabledCarema = true
            }
          }
        })
      })

      // 远程的信号源取消静音或视频
      webrtc.on('unmute', data => {
        webrtc.getPeers(data.id).forEach(peer =>  {
          const stream = self.getStreamByPeerId(peer.id)
          if (stream) {
            if (data.name === 'audio') {
              stream.disabledMic = false
            } else if (data.name === 'video') {
              stream.disabledCarema = false
            }
          }
        })
      })

      /*
      webrtc.on('stunservers', stunservers => {
        console.log('client stunservers', stunservers)
      })

      webrtc.on('turnservers', turnservers => {
        console.log('client turnservers', turnservers)
      })
      */
    }
  }
</script>

<style lang="scss" scoped>
  #global-webrtc {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 8;
    padding-top: $header-height * 2;
    background-color: $module-hover-bg-darken-20;

    > .webrtc-box {
      position: relative;
      margin: 0 auto;
      overflow: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      max-width: 80%;
      max-height: calc(100vh - 16rem);

      &.aligenLeft {
        justify-content: start;
      }

      > .stream-box {
        height: auto;
        margin-right: 1rem;
        margin-bottom: 1rem;
        display: flex;
        justify-content: center;
        position: relative;
        background-color: $module-bg;
        border: .666rem solid $module-bg-opacity-5;
        overflow-y: hidden;

        &.local {
          width: 40.5%;
          height: 30rem;
        }

        &.remote {
          width: 19%;
          height: 16rem;

          > .volume,
          > .tools {
            opacity: 0.3;
          }

          &:hover {
            > .volume,
            > .tools {
              opacity: 1;
            }
          }

          > .volume {
            bottom: 9rem;
            left: -2rem;
            transform: rotate(270deg);
          }

          > .tools {

            > button {
              width: 3rem;
              border-radius: 100%;
            }

            > .filter {
              border-radius: 3rem;
            }
          }
        }

        &:nth-child(2),
        &:nth-child(3) {
          width: 28%;
          height: 30rem;

          > .volume {
            bottom: 2rem;
            left: 18rem;
            transform: none;
            width: calc(100% - 20rem);
          }
        }

        > .content-box {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;

          &.filter-grayscale {
            filter: grayscale(1);
          }
          &.filter-sepia {
            filter: sepia(1);
          }
          &.filter-hue-rotate {
            filter: hue-rotate(180deg);
          }
          &.filter-invert {
            filter: invert(1);
          }
          &.filter-blur {
            filter: blur(1rem);
          }

          > video {
            width: 100%;
            // height: auto;
            object-fit: cover;
          }

          > .face-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
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
            color: $secondary;
          }
        }

        > .name {
          position: absolute;
          top: 0;
          right: 0;
          background-color: $module-bg;
          height: 2.2rem;
          line-height: 2.1rem;
          padding: 0 1rem;
          font-size: 1.2rem;
          opacity: .6;
        }

        > .volume {
          position: absolute;
          left: 1rem;
          bottom: 6rem;
          width: 9rem;
          height: 1rem;
          opacity: .7;
        }

        > .tools {
          left: 1rem;
          bottom: 1rem;

          > button,
          > .beauty,
          > .filter {
            width: 4rem;
            height: 3rem;
            line-height: 3rem;
            text-align: center;
            margin-right: 1rem;
            background-color: $module-bg;

            &:hover {
              background-color: $module-bg-opacity-8;
            }

            &.active {
              background-color: $module-bg-opacity-9;
            }
          }

          > .beauty {
            width: auto;
            padding: 0 1rem;

            > .iconfont {
              margin-right: 1rem;
            }
          }

          > .filter {
            width: auto;
            padding: 0 1rem;
            margin: 0;
            float: right;
            display: block;
            position: relative;

            &:hover {

              > .filter-list {
                visibility: visible;
                opacity: 1;
              }
            }

            > .current {

              > .name {
                margin-left: 1rem;
              }
            }

            > .filter-list {
              opacity: 0;
              visibility: hidden;
              position: absolute;
              bottom: 3rem;
              left: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              list-style: none;
              background-color: $module-bg;

              > li {
                cursor: pointer;

                &:hover {
                  background-color: $module-bg-opacity-8;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
