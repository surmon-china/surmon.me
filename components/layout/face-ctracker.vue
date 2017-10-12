<template>
  <div class="face-ctracker">
    <canvas ref="canvas" :width="width" :height="height"></canvas>
    <canvas ref="videoCanvas" :width="width" :height="height" v-if="mode === 1"></canvas>
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
        image: null,
        video: null,
        canvas: null,
        canvasCTX: null,
        tracker: null,
        destroyed: false
      }
    },
    props: {
      refId: {
        type: String,
        required: true
      },
      width: Number,
      height: Number,
      // 识别模式：1 原生模式、2 clmtrackr
      mode: {
        type: Number,
        default: 2
      }
    },
    methods: {
      initTracker() {
        switch (this.mode) {
          case 1:
            this.buildTrackerByNative()
            break
          case 2:
            this.buildTrackerByClmtrackr()
            break
          default:
            break
        }
      },
      // 开启 chrome 原生模式
      buildTrackerByNative() {

        // 初始化检测器
        const { image, video, canvas, canvasCTX } = this.$data
        const tracker = this.tracker = new FaceDetector()
        const videoCanvas = this.$refs.videoCanvas
        const videoCanvasCTX = videoCanvas.getContext('2d')

        // 识别并处理
        const detect = image => {
          // console.log('识别并处理')
          tracker.detect(image).then(faces => {
            // faces.forEach(face => console.log(face))
            // console.log('faces', faces)
          }).catch(err => {
            // console.warn('识别发生了错误', err)
          })
        }

        video.onloadedmetadata = () => {
          setTimeout(() => {
            // console.log('视频加载成功', video)
            videoCanvasCTX.clearRect(0, 0, videoCanvas.width, videoCanvas.height)
            videoCanvasCTX.drawImage(video, 0, 0)
            image.onload = function() {
              detect(image)
            }
            image.src = videoCanvas.toDataURL('image/png')
          }, 2000)
        }
      },
      // 使用 clmtrackr
      buildTrackerByClmtrackr() {
        const { image, video, canvas, canvasCTX } = this.$data
        const tracker = this.tracker = new clmtrackr.tracker({ useWebGL : true })
        tracker.init()
        tracker.start(video)
        const hatTitles = ['闭嘴！我们很相爱！', '过来我告诉你个秘密']
        // 画椭圆
        const EllipseTwo = (context, x, y, a, b) => {
          context.save()
          const r = (a > b) ? a : b
          const ratioX = a / r
          const ratioY = b / r
          context.scale(ratioX, ratioY)
          context.beginPath()
          context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false)
          context.closePath()
          context.restore()
          context.fillStyle = 'green'
          context.fill()
          context.font = "1.2rem '微软雅黑'"
          context.fillStyle = 'white'
          context.textAlign = 'center'
          context.fillText('闭嘴！我们很相爱！', x, y)
        }
        // 画帽子
        const deawHat = positions => {
          // 中心应该位于 鼻梁顶端 - 鼻梁高度 * 2
          const hatXCenter = positions[33][0]
          const hatYCenter = positions[33][1] - ((positions[37][1] - positions[33][1]) * 2)
          // 横向半径应该为 脸部宽度
          const hatWidth = positions[14][0] - positions[0][0]
          EllipseTwo(canvasCTX, hatXCenter, hatYCenter, hatWidth / 2, 26)
        }
        // 绘制
        const drawLoop = () => {
          if (this.destroyed) return
          requestAnimFrame(drawLoop)
          canvasCTX.clearRect(0, 0, video.width, video.height)
          const positions = tracker.getCurrentPosition()
          if (positions) {
            tracker.draw(canvas)
            deawHat(positions)
          }
        }
        drawLoop()
      }
    },
    watch: {
      mode() {
        this.tracker = null
        this.initTracker()
      }
    },
    mounted() {
      console.log('face-ctracker', this)
      this.image = new Image()
      this.canvas = this.$refs.canvas
      this.canvasCTX = this.canvas.getContext('2d')
      this.video = this.$parent.$refs[this.refId][0]
      this.initTracker()
    },
    beforeDestroy() {
      this.destroyed = true
      this.tracker.stop()
      this.tracker = null
      this.image = null
      this.canvas = null
      this.canvasCTX = null
      this.video = null
    }
  }
</script>

<style lang="scss">
  .face-ctracker {

    canvas {
      width: 100%;
      height: 100%;
    }
  }
</style>