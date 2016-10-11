<template>
  <div class="aside-nav">
    <ul class="list-group">
      <router-link to="/" class="list-group-item active">
        <i class="icon icon-ass"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/article/001" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>文章详情</span>
      </router-link>
      <router-link to="/data/2015-10-10" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>时间文章列表</span>
      </router-link>
      <router-link to="/category/javascript" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>分类文章列表</span>
      </router-link>
      <router-link to="/tag/javascript" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>某标签文章列表</span>
      </router-link>
      <router-link to="/guestbook" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>单独页面</span>
      </router-link>
      <router-link to="/" class="list-group-item">
        <i class="icon icon-ass"></i>
        <span>About</span>
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
    width: 10em;

    .list-group {

      .list-group-item {
        border: none;
        border-radius: 0;
      }
    }
  }
</style>
