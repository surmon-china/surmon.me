<template>
  <div class="test">
    <video ref="video" width="400" height="300"></video>
    <canvas ref="canvas" width="400" height="300"></canvas>
  </div>
</template>

<script>
  if (process.browser) {
    window.clmtrackr = require('clmtrackr')
    window.clmtrackr = window.clmtrackr.default || window.clmtrackr
    console.log(window.clmtrackr)
  }
  export default {
    name: 'test',
    data() {
      return {

      }
    },
    mounted() {
      window.video = this.$refs.video
      window.canvas = this.$refs.canvas
      window.canvasCTX = canvas.getContext('2d')
      window.tracker = new clmtrackr.tracker()
      window.tracker.init()
      navigator.getUserMedia = navigator.getUserMedia || 
                               navigator.webkitGetUserMedia || 
                               navigator.mozGetUserMedia || 
                               navigator.msGetUserMedia
      window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL
      const gumFail = () => {}
      const gumSuccess = stream => {
        console.log('video', video, stream)
        // if (video.srcObject) {
          // video.srcObject = stream
        // } else {
          video.src = (window.URL && window.URL.createObjectURL(stream))
        // }
      }
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({video : true}).then(gumSuccess).catch(gumFail)
      } else if (navigator.getUserMedia) {
        navigator.getUserMedia({video : true}, gumSuccess, gumFail)
      }
      // video.addEventListener('canplay', () => {
        console.log('播放器就绪了呀', tracker)
        tracker.start(video)
        console.log(tracker)
        drawLoop()
      // }, false)

      function drawLoop() {
        requestAnimFrame(drawLoop);
        canvasCTX.clearRect(0, 0, video.width, video.height);
        //psrElement.innerHTML = "score :" + tracker.getScore().toFixed(4);
        if (tracker.getCurrentPosition()) {
          // console.log(tracker.getCurrentParameters(), tracker.getCurrentPosition())
          tracker.draw(canvas);
        }
      }
    }
  }
</script>

<style lang="scss">
  .test {
    position: relative;

    canvas,
    video {
      width: 100%;
      height: 30rem;
    }

    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>