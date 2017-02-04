<template>
  <div class="aside-nav">
    <nav class="nav-list">
      <nuxt-link :to="'/'" class="item" exact>
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </nuxt-link>
      <nuxt-link to="/category/code" class="item">
        <i class="iconfont icon-code"></i>
        <span>Code</span>
      </nuxt-link>
      <nuxt-link to="/project" class="item">
        <i class="iconfont icon-tool"></i>
        <span>Project</span>
      </nuxt-link>
      <nuxt-link to="/category/think" class="item">
        <i class="iconfont icon-tag"></i>
        <span>Think</span>
      </nuxt-link>
      <nuxt-link to="/music" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span>Music</span>
      </nuxt-link>
      <nuxt-link to="/category/movie" class="item" v-if="false">
        <i class="iconfont icon-movie"></i>
        <span>Movie</span>
      </nuxt-link>
      <nuxt-link to="/about" class="item">
        <i class="iconfont icon-user"></i>
        <span>About</span>
      </nuxt-link>
      <nuxt-link to="/guestbook" class="item">
        <i class="iconfont icon-comment"></i>
        <span>Guestbook</span>
      </nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'nav'
}
</script>

<style lang="scss">
  @import '~assets/sass/variables';
  .aside-nav {
    position: fixed;
    top: 5.5em;
    display: inline-block;
    width: 11.5em;

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
        color: #777;
        font-family: CenturyGothic;
        margin-bottom: .5em;

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          color: $primary;
        }

        &.nuxt-link-active {
          background-color: #eee;
          font-weight: bold;
          color: $primary;
          background-color: $module-bg;
        }

        .iconfont {
          width: 1em;
          margin-right: 1em;
          display: inline-block;
        }
      }
    }
  }
</style>
