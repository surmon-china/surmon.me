<template>
  <div class="face-ctracker">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
  let clmtrackr = null
  if (process.browser) {
    clmtrackr = require('clmtrackr')
    clmtrackr = clmtrackr.default || clmtrackr
    window.clmtrackr = clmtrackr
  }
  export default {
    name: 'face-ctracker',
    data() {
      return {
        clmtrackr,
        canvas: null,
        canvasCTX: null,
        tracker: null
      }
    },
    props: {
      refId: {
        type: String,
        required: true
      },
      width: Number,
      height: Number
    },
    mounted() {
      console.log('face-ctracker', this)
      // return false
      // this.$nextTick(() => {})
      
      const video = this.$parent.$refs[this.refId][0]
      const canvas = this.canvas = this.$refs.canvas
      const canvasCTX = this.canvasCTX = canvas.getContext('2d')
      const tracker = this.tracker = new clmtrackr.tracker({ useWebGL : true })

      tracker.init()
      tracker.start(video)
      drawLoop()

      function drawLoop() {
        requestAnimFrame(drawLoop);
        canvasCTX.clearRect(0, 0, video.width, video.height);
        if (tracker.getCurrentPosition()) {
          tracker.draw(canvas);
        }
      }
      
    }
  }
</script>

<style lang="scss">
  .face-ctracker {

    canvas {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>