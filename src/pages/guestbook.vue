<template>
  <div class="guestbook-page" :class="{ mobile: isMobile }">
    <div class="detail">
      <div class="banner">
        <img
          class="image"
          draggable="false"
          :src="'/images/guestbook.jpg' | byCDN"
        >
        <span class="solgan" v-text="$i18n.text.guestbook" />
      </div>
    </div>
    <div class="comment">
      <comment-box :post-id="0" :likes="siteLikes" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Guestbook',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.guestbook + ' | '}Guestbook`
      }
    },
    fetch({ store }) {
      return Promise.all([
        store.dispatch('global/fetchAppOption', true),
        store.dispatch('comment/fetchList', { post_id: 0 })
      ])
    },
    computed: {
      siteLikes() {
        const appOption = this.$store.state.global.appOption.data
        return appOption ? appOption.meta.likes : 0
      },
      isEnLang() {
        return this.$store.getters['global/isEnLang']
      },
      isMobile() {
        return this.$store.state.global.isMobile
      }
    }
  }
</script>

<style lang="scss" scoped>
  .guestbook-page {
    &.mobile {
      > .detail {
        > .banner {
          height: 12rem;
        }
      }
    }

    .detail {
      margin-bottom: $lg-gap;
      background-color: $module-bg;

      .banner {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 19rem;
        border: 0;

        .image {
          margin-top: -$gap * 6;
          transition: all 1s;

          &:hover {
            transform: rotate(2deg) scale(1.1);
            transition: all 1s;
          }
        }

        .solgan {
          position: absolute;
          right: $lg-gap * 2;
          bottom: $lg-gap * 2;
          display: block;
          font-weight: 700;
          opacity: .5;
          cursor: progress;
          padding: 0 $sm-gap;
          padding-left: 3rem;
          height: 2em;
          line-height: 2em;
          color: $body-bg;
          background: linear-gradient(
            to left,
            $module-bg,
            $module-hover-bg-opacity-3,
            transparent
          );
        }
      }
    }
  }
</style>
