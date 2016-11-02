<template>
  <div class="project">
    我是Vue-video-player
    <video-player :options="videoOptions" @playerStateChanged="playerStateChanged"></video-player>
  </div>
</template>

<script>
  export default {
    name: 'project-vue-video-player',
    data () {
      return {
        videoOptions: {
          "source": [
            {
              "type": "video/mp4",
              "src": "http://7xkwa7.media1.z0.glb.cloauddn.com/sample_video_H",
              "label": "原画",
              "res": 1
            },
            {
              "type": "video/mp4",
              "src": "http://221.11.100.42/7xkwa7.masdedia1.z0.glb.clouddn.com/sample_video_M?wsiphost=local",
              "label": "高清",
              "res": 2
            },
            {
              "type": "video/mp4",
              "src": "http://7xkwa7.media1.z0.glb.cloudasdasddn.com/sample_video_L",
              "label": "流畅",
              "res": 3
            }
          ],
          "language": "zh-TW",
          "playbackRates": [
            0.7,
            1,
            1.3,
            1.5,
            1.7
          ],
          "poster": "http://www.freemake.com/blog/wp-content/uploads/2015/06/videojs-logo.jpg",
          "defaultSrcReId": 2,
          "height": 360,
          "autoplay": true
        }
      }
    },
    methods: {
      playerStateChanged(playerCurrentState) {
        console.log(playerCurrentState)
      }
    }
  }
</script>
