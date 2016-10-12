<template>
  <div class="aside-nav">
    <ul class="nav-list">
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
        <i class="iconfont icon-hulianwang"></i>
        <span>Movie</span>
      </router-link>
      <router-link to="/guestbook" class="item">
        <i class="iconfont icon-user"></i>
        <span>About</span>
      </router-link>
      <router-link to="/" class="item">
        <i class="iconfont icon-liuyan"></i>
        <span>Guestbook</span>
      </router-link>
    </ul>
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
    // position: fixed;
    // top: 5em;
    // display: inline-block;
    // width: 10em;
    // background-color: white;
    // padding: .5em;
    position: fixed;
    top: 5em;
    display: inline-block;
    width: 11em;
    background-color: #fff;

    .nav-list {
      padding: .5em;

      .item {
        // font-size: .9em;
        border: none;
        border-radius: 0;
        display: block;
        width: 100%;
        height: 3em;
        line-height: 3em;
        padding: 0 1em;
        text-decoration: none;

        &:hover {
          background-color: #eee;
        }

        &.active {
          background-color: #eee;
          font-weight: 700;
          // border-left: 3px solid #006cff;
        }

        .iconfont {
          margin-right: 1em;
        }
      }
    }
  }
</style>
