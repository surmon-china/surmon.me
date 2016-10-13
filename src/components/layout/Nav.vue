<template>
  <div class="aside-nav">
    <div class="user" v-if="false">
      <router-link to="/about">
        <img src="/static/images/gravatar.jpg">
      </router-link>
    </div>
    <nav class="nav-list">
      <router-link to="/" class="item active">
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/article/001" class="item">
        <i class="iconfont icon-code"></i>
        <span>Code</span>
      </router-link>
      <router-link to="/data/2015-10-10" class="item">
        <i class="iconfont icon-tag"></i>
        <span>Think</span>
      </router-link>
      <router-link to="/category/javascript" class="item">
        <i class="iconfont icon-netease-music"></i>
        <span>Music</span>
      </router-link>
      <router-link to="/tag/javascript" class="item">
        <i class="iconfont icon-movie"></i>
        <span>Movie</span>
      </router-link>
      <router-link to="/guestbook" class="item">
        <i class="iconfont icon-user"></i>
        <span>About</span>
      </router-link>
      <router-link to="/" class="item">
        <i class="iconfont icon-liuyan"></i>
        <span>上来</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'nav'
}
</script>

<style lang="scss">
  @import '../../sass/variables';
  .aside-nav {
    position: fixed;
    top: 5.5em;
    display: inline-block;
    width: 11.5em;
    // background-color: $module-bg;

    .user {
      padding: .5em;
      border-bottom: 1px dashed #eee;
    }

    .nav-list {
      padding: 0;
      margin: 0;

      .item {
        font-size: 1.1em;
        border: none;
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 500;
        border-radius: 1px;
        color: #777;

        &:hover {
          color: $primary;
        }

        // &.router-link-active
        &.active {
          background-color: #eee;
          font-weight: 700;
          color: $primary;
          background-color: $module-bg;
        }

        .iconfont {
          margin-right: 1em;
        }
      }
    }
  }
</style>
