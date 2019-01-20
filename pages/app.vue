<template>
  <div class="page" :style="{ height: height }" :class="{ mobile: isMobile }">
    <div class="app">
      <div class="logo">
        <img src="/images/app-logo.png" alt="app-logo">
      </div>
      <h2 class="title">Surmon.me</h2>
      <p class="desc" v-text="$i18n.text.slogan">Talk is cheap. Show me the code</p>
      <div class="screen">
        <img src="/images/app-hot.png" class="screen-img" alt="app-hot">
        <div class="download">
          <img src="/images/app-qrcode.png" class="qrcode" alt="qrcode">
          <a
            target="_blank"
            :href="`${cdnUrl}/app/surmon.me.apk`"
            class="btn"
            v-text="$i18n.text.device.android"
          ></a>
          <a
            target="_blank"
            :href="`${cdnUrl}/app/surmon.me.ipa`"
            class="btn"
            v-text="$i18n.text.device.ios"
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.app + ' | '}App`
      }
    },
    data() {
      return {
        height: 0
      }
    },
    computed: {
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    },
    activated() {
      this.updateScreenHeight()
      window.addEventListener('resize', this.updateScreenHeight)
    },
    deactivated() {
      window.removeEventListener('resize', this.updateScreenHeight)
    },
    methods: {
      updateScreenHeight(event) {
        if (this.isMobile) {
          this.height = 'auto'
        } else {
          const screenHeight = window.innerHeight
          const minHeight = 14 * 62
          if (screenHeight - 14 * 4 > minHeight) {
            this.height = `${screenHeight - (14 * 12)}px`
          } else {
            this.height = `${minHeight}px`
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    min-height: 62rem;

    &.mobile {
      min-height: 36rem;

      > .app {
        padding-top: 1em;

        > .screen {
          width: 100%;
          margin-top: 3rem;
          margin-bottom: 1rem;
          text-align: center;

          > .screen-img {
            opacity: .4;
            width: 90%;
          }

          > .download {
            opacity: 1;
            visibility: visible;
          }
        }
      }
    }

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

          > .screen-img {
            opacity: .4;
          }

          > .download {
            opacity: 1;
            visibility: visible;
          }
        }

        > .screen-img {
          width: 100%;
        }

        > .download {
          opacity: 0;
          visibility: hidden;
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
            line-height: 2.68rem;
            color: $primary;
            margin-top: 2rem;
            border:  1px solid;
            border-color: $primary;
            text-align: center;
            text-transform: uppercase;
            background: $module-bg;

            &:hover {
              color: $white;
              border-color: $primary-opacity-5;
              background: linear-gradient(to bottom right, $module-hover-bg-opacity-3, $primary-opacity-9, $white, rgba($accent, .7));
            }
          }
        }
      }
    }
  }
</style>
