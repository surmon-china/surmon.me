<template>
  <div class="global-background">
    <div class="background-image"></div>
    <div id="particles-background" class="background-canvas" v-if="!onPowerSavingMode"></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'background',
    mounted() {
      this.buildBackground()
    },
    computed: {
      ...mapState('global', ['onPowerSavingMode'])
    },
    watch: {
      onPowerSavingMode(on) {
        if (!on) {
          this.$nextTick(this.buildBackground)
        }
      }
    },
    methods: {
      buildBackground() {
        // 暂时关闭动画
        return false
        window.particlesJS('particles-background', {
          "particles": {
            "number": {
              "value": 30,
              "density": {
                "enable": true,
                "value_area": 1000
              }
            },
            "color": {
              "value": "#bebebe"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#ffffff"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": true,
                "speed": 0.8,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 15,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 300,
              "color": "#c5c5c5",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": true,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "repulse"
              },
              "onclick": {
                "enable": false,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 0.8471528471528471,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .global-background {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: $body-bg;

    > .background-image {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: .3;
      background: url(/images/background.png);
    }

    > .background-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
</style>
