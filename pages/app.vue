<template>
  <div class="page" :style="{ height: height + 'px' }">
    <div class="app">
      <div class="logo">
        <img src="/images/app-logo.png" alt="app-logo">
      </div>
      <h2 class="title">Surmon.me</h2>
      <p class="desc">Talk is cheap. Show me the code</p>
      <div class="screen">
        <img src="/images/app-hot.png" class="screen" alt="app-hot">
        <div class="download">
          <img src="/images/app-qrcode.png" class="qrcode" alt="qrcode">
          <a target="_blank" href="/app/surmon.me.apk" class="btn">Android</a>
          <a target="_blank" href="/app/surmon.me.ipa" class="btn">Ios</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    head: {
      title: 'App',
    },
    data() {
      return {
        height: 0
      }
    },
    mounted() {
      this.updateScreenHeight()
      window.addEventListener('resize', this.updateScreenHeight)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateScreenHeight)
    },
    methods: {
      updateScreenHeight(event) {
        const screenHeight = window.innerHeight
        const minHeight = 14 * 62
        if (screenHeight - 14 * 4 > minHeight) {
          this.height = screenHeight - (14 * 12)
        } else {
          this.height = minHeight
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/sass/mixins';
  @import '~assets/sass/variables';
  .page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    > .app {

      > .logo {
        text-align: center;

        > img {
          width: 6rem;
          border-radius: 1em;
        }
      }

      > .title {
        color: $primary;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
      }

      > .desc {
        text-align: center;
      }

      > .screen {
        margin-top: 5rem;
        width: 36rem;
        position: relative;

        &:hover {

          > .screen {
            opacity: .4;
          }

          > .download {
            opacity: 1;
            visibility: visible;
          }
        }

        > .screen {
          width: 100%;
        }

        > .download {
          opacity: 0;
          visible: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          > .qrcode {
            width: 12rem;
            height: auto;
          }

          > .btn {
            width: 12rem;
            height: 2.8rem;
            line-height: 2.6rem;
            color: $primary;
            background-color: $white;
            margin-top: 2rem;
            border:  1px solid $primary;
            border-radius: .2rem;
            text-align: center;
            text-transform: uppercase;

            &:hover {
              color: $white;
              background-color: darken($primary, 5%);
            }
          }
        }
      }
    }
  }
</style>
