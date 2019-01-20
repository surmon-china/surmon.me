<template>
  <aside class="aside">
    <div class="aside-user">
      <div class="avatar">
        <img :src="gravatar" alt="Surmon">
      </div>
      <div class="profile">
        <h3 class="name">Surmon</h3>
        <p class="email" v-text="$i18n.text.slogan"></p>
      </div>
    </div>
    <div class="aside-nav">
      <nav class="nav-list">
        <nuxt-link :to="'/'" class="item" exact>
          <i class="iconfont icon-home"></i>
          <span v-text="$i18n.nav.home"></span>
        </nuxt-link>
        <nuxt-link to="/category/code" class="item">
          <i class="iconfont icon-code"></i>
          <span v-text="$i18n.nav.code"></span>
        </nuxt-link>
        <nuxt-link to="/project" class="item">
          <i class="iconfont icon-tool"></i>
          <span v-text="$i18n.nav.project"></span>
        </nuxt-link>
        <nuxt-link to="/category/think" class="item">
          <i class="iconfont icon-think"></i>
          <span v-text="$i18n.nav.think"></span>
        </nuxt-link>
        <nuxt-link to="/sitemap" class="item">
          <i class="iconfont icon-peachblossom"></i>
          <span v-text="$i18n.nav.map"></span>
        </nuxt-link>
        <nuxt-link to="/vlog" class="item">
          <i class="iconfont icon-vlog"></i>
          <span v-text="$i18n.nav.vlog"></span>
        </nuxt-link>
        <nuxt-link to="/about" class="item">
          <i class="iconfont icon-user"></i>
          <span v-text="$i18n.nav.about"></span>
        </nuxt-link>
        <nuxt-link to="/service" class="item">
          <i class="iconfont icon-zan"></i>
          <span v-text="$i18n.nav.service"></span>
        </nuxt-link>
        <nuxt-link to="/guestbook" class="item guestbook">
          <i class="iconfont icon-comment"></i>
          <span v-text="$i18n.nav.guestbook"></span>
        </nuxt-link>
        <a
          :href="ads.taobao"
          v-if="false"
          rel="external nofollow noopener"
          class="item ad taobao"
          target="_blank"
        >
          <i class="iconfont icon-taobao"></i>
          <span v-text="$i18n.nav.taobao"></span>
        </a>
        <a
          :href="ads.aliyun"
          v-if="false"
          rel="external nofollow noopener"
          class="item ad aliyun"
          target="_blank"
        >
          <i class="iconfont icon-aliyun"></i>
          <span v-text="$i18n.nav.aliyun"></span>
        </a>
        <a
          href="https://errend.io"
          rel="external nofollow noopener"
          class="item ad errend"
          v-if="false"
          target="_blank"
        >
          <i class="iconfont icon-debug"></i>
          <span>Errend.io</span>
        </a>
        <nuxt-link to="/app" class="item app">
          <i class="iconfont icon-app"></i>
          <span v-text="$i18n.nav.app"></span>
        </nuxt-link>
      </nav>
    </div>
  </aside>
</template>

<script>
  import adConfig from '~/config/ad.config'
  export default {
    name: 'mobile-aside',
    mounted() {
      return this.$store.dispatch('global/fetchAdminInfo')
    },
    computed: {
      ads: () => adConfig.mobile.aside,
      gravatar() {
        const gravatar = this.$store.state.global.adminInfo.gravatar
        return gravatar 
          ? `${gravatar}?imageView2/1/w/180/h/180/interlace/1/q/75|imageslim` 
          : `${this.cdnUrl}/images/gravatar.jpg`
      }
    }
  }
</script>

<style lang="scss" scoped>
  aside {
    display: block;
    overflow: auto;
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    transform: scale(0.8, 0.8);
    transition: $mobile-aisde-transition;

    &.open {
      opacity: 1;
      transform: scale(1, 1);
      transition: $mobile-aisde-transition;
    }

    > .aside-user {
      width: 100%;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      padding: 1em;
      border-bottom: 1px solid darken($mobile-aside-bg, 5%);

      > .avatar {
        width: 35%;

        > img {
          max-width: 100%;
          border: 2px solid $module-bg;
        }
      }

      > .profile {
        color: $body-bg;
        width: 100%;

        > .name {
          font-weight: bold;
          margin-bottom: 1rem;
        }

        > .email {
          color: $primary;
          margin: 0;
          @include text-overflow();
        }
      }
    }

    > .aside-nav {
      width: 100%;

      .nav-list {
        padding: 0;
        margin: 0;

        .item {
          border: none;
          display: block;
          width: 100%;
          height: 3em;
          line-height: 3em;
          padding: 0 1em;
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 700;
          border-radius: 1px;
          color: $module-bg;
          margin-bottom: .5em;

          &.ad {
            height: 4rem;
            line-height: 4rem;
            margin: 0;
            border-bottom: 1px solid darken($mobile-aside-bg, 5%);
          }

          &.taobao {
            color: #ff5000;
            background: $module-bg;
            border-top: 1px solid darken($mobile-aside-bg, 5%);

            > .iconfont {
              color: #ff5000;
            }
          }

          &.aliyun {
            color: black;
            background: $module-bg;

            > .iconfont {
              color: black;
            }
          }

          &.app {
            margin-top: 1rem;
            color: $primary;

            &.link-active {
              background-color: transparent;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }

          &:hover {
            color: $primary;
            background-color: $body-bg;
          }

          &.link-active {
            color: $primary;
            font-weight: bold;
            background-color: $body-bg;
          }

          .iconfont {
            width: 1em;
            margin-right: 1em;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
