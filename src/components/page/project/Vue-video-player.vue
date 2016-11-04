<template>
  <div class="project">
    我是Vue-video-player
    <video-player :options="videoOptions" @playerStateChanged="playerStateChanged"></video-player>
  </div>
</template>

<script>
  export default {
    name: 'Project-Vue-Video-Player',
    data () {
      return {
        videoOptions: {
          "source": {
            "type": "video/mp4",
            "src": "http://assets7.ign.com/videos/zencoder/2016/06/15/960/7080c56a76e2b74ec8ecfe4c224441d4-1500000-1466028542-w.mp4"
          },
          "poster": "http://assets1.ignimgs.com/thumbs/userUploaded/2016/6/15/zelda-1466028489388_large.jpg",
          "autoplay": false,
          "muted": false
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
