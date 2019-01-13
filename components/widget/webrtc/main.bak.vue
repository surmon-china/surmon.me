<template>
  <div>
    <p>i don't know.</p>
    <div class="localSteam">
      <video id="local-steam" autoplay :src="localSteam" v-if="localSteam"></video>
    </div>
    <video id="video" autoplay :src="video" :key="index" v-for="(video, index) in videos"></video>
  </div>
</template>

<script>
  import socket from '~/plugins/socket.io'
  export default {
    name: 'webrtc',
    data() {
      return {
        socket,
        localSteam: null,
        videos: []
      }
    },
    mounted() {
      console.log('i am webrtc', this.socket)

      // init
      const self = this
      const RTCPeerConnection = window.PeerConnection || 
                                window.webkitRTCPeerConnection || 
                                window.mozRTCPeerConnection
      const RTCIceCandidate = window.RTCIceCandidate || 
                              window.webkitRTCIceCandidate || 
                              window.mozRTCIceCandidate
      const RTCSessionDescription = window.RTCSessionDescription || 
                                    window.webkitRTCSessionDescription || 
                                    window.mozRTCSessionDescription
      navigator.getUserMedia = navigator.getUserMedia || 
                               navigator.webkitGetUserMedia || 
                               navigator.mozGetUserMedia || 
                               navigator.msGetUserMedia

      // RTCPeerConnection 用于 p2p 数据传输
      const peerConnection = new RTCPeerConnection({
        iceServers: [
          // { urls: 'stun:23.21.150.121' },
          { urls: 'stun:stun.l.google.com:19302' },
          // { urls: 'turn:numb.viagenie.ca', credential: 'webrtcdemo', username: 'louis%40mozilla.com' }
        ]
      })

      // 发送ICE候选到其他客户端
      peerConnection.onicecandidate = event => {
        if (!event.candidate) return
        console.log('客户端发送 candidate 给服务端', event)
        self.socket.emit('rtc-ice-candidate', event.candidate)
      }

      // 如果检测到有新的数据源，将其绑定到一个video标签上输出
      peerConnection.onaddstream = event => {
        console.log('有新的数据流进来了')
        self.videos.push(URL.createObjectURL(event.stream))
      }

      // 初始化本地数据流 steam
      navigator.getUserMedia({
        video: true,
        audio: true
      }, stream => {
        
        // 将本地流输出至本地播放器
        self.localSteam = URL.createObjectURL(stream)
        // console.log('本地播放器已就绪', peerConnection)

        // 向PeerConnection中加入需要发送的流
        peerConnection.addStream(stream)

        // 如果是发送方则发送一个offer信令，否则发送一个answer信令（发送本地session描述）
        if (true) {
          peerConnection.createOffer(desc => {
            console.log('createOffer success', desc)
            peerConnection.setLocalDescription(desc)
            self.socket.emit('rtc-offer', desc)
          }, err => {
            console.log('createOffer faile', err)
          })
        } else {
          peerConnection.createAnswer(desc => {
            console.log('createAnswer success', desc)
            peerConnection.setLocalDescription(desc)
            self.socket.emit('rtc-answer', desc)
          }, err => {
            console.log('createAnswer faile', err)
          })
        }

      // 媒体流创建失败
      }, err => {
        console.warn('媒体流创建失败!', err)
      })

      // 处理到来的信令
      self.socket.on('rtc-ice-candidate', candidate => {
        console.log('客户端收到 rtc-ice-candidate', candidate)
        // 如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(err => {
          console.warn('信令通信失败', err)
        })
      })

      self.socket.on('rtc-offer', sdp => {
        console.log('客户端收到 rtc-offer', sdp)
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
      })

      self.socket.on('rtc-answer', sdp => {
        console.log('客户端收到 rtc-answer', sdp)
        peerConnection.setRemoteDescription(new RTCSessionDescription(sdp))
      })
    }
  }
</script>