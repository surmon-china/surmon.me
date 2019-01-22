<template>
  <div class="page" :class="{ mobile: isMobile }">
    <div class="detail">
      <div class="content">
        <div class="guestbook-banner">
          <img src="/images/guestbook.jpg">
          <span v-text="$i18n.text.guestbook">此心光明 亦复何言</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <comment-box :post-id="0" :likes="siteLikes" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'guestbook',
    head() {
      return {
        title: `${this.isEnLang ? '' : this.$i18n.nav.guestbook + ' | '}Guestbook`
      }
    },
    fetch({ store }) {
      return Promise.all([
        store.dispatch('global/fetchAppOption'),
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
  .page {

    &.mobile {

      > .detail {

        > .content {
          height: 11em;

          > .guestbook-banner {
            height: 11em;
          }
        }
      }
    }

    .detail {
      margin-bottom: 1em;
      background-color: $module-bg;

      .content {
        width: 100%;
        height: 17em;
        overflow:  hidden;

        .guestbook-banner {
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 17em;
          border: 0;

          img {
            margin-top: -5em;
            @include css3-prefix(transition, all 1s);

            &:hover {
              margin-top: -6em;
              @include css3-prefix(transform, rotate(2deg) scale(1.1));
              @include css3-prefix(transition, all 1s);
            }
          }

          span {
            position: absolute;
            right: 2em;
            bottom: 2em;
            display: block;
            font-weight: 700;
            opacity: .5;
            cursor: progress;
            padding: 0 1em;
            padding-left: 3rem;
            height: 2em;
            line-height: 2em;
            color: $body-bg;
            background: linear-gradient(to left, $module-bg, $module-hover-bg-opacity-3, transparent);
          }
        }
      }
    }
  }
</style>
